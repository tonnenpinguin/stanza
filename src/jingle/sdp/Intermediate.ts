import * as SDP from 'sdp';

// ====================================================================
// Intermediate Object Descriptions
// ====================================================================
// These interfaces are the intermediary representations we use for
// parsed SDP data, independent of how we end up signaling it.

export interface IntermediateMediaDescription {
    direction: SDP.SDPDirection;
    kind: string;
    protocol: string;
    mid: string;
    iceParameters?: SDP.SDPIceParameters;
    dtlsParameters?: SDP.SDPDtlsParameters;
    setup?: string;
    rtpParameters?: SDP.SDPRtpCapabilities;
    rtpEncodingParameters?: SDP.SDPEncodingParameters[];
    rtcpParameters?: SDP.SDPRtcpParameters;
    streams?: SDP.SDPMediaStreamId[];
    candidates?: SDP.SDPIceCandidate[];
    sctp?: SDP.SDPSctpDescription;
}

export interface IntermediateSessionDescription {
    sessionId?: string;
    sessionVersion?: number;
    iceLite?: boolean;
    media: IntermediateMediaDescription[];
    groups: SDP.SDPGroup[];
}

export type IntermediateCandidate = SDP.SDPIceCandidate;

// ====================================================================
// Import SDP to Intermediary
// ====================================================================

export function importFromSDP(sdp: SDP.SDPBlob): IntermediateSessionDescription {
    const mediaSections = SDP.getMediaSections(sdp);
    const sessionPart = SDP.getDescription(sdp);

    const session: IntermediateSessionDescription = {
        groups: [],
        media: []
    };
    if (SDP.matchPrefix(sessionPart, 'a=ice-lite').length > 0) {
        session.iceLite = true;
    }

    for (const groupLine of SDP.matchPrefix(sessionPart, 'a=group:')) {
        const parts = groupLine.split(' ');
        const semantics = parts.shift()!.substr(8);
        session.groups.push({
            mids: parts,
            semantics
        });
    }

    for (const mediaSection of mediaSections) {
        const kind = SDP.getKind(mediaSection);
        const isRejected = SDP.isRejected(mediaSection);
        const mLine = SDP.parseMLine(mediaSection);

        const media: IntermediateMediaDescription = {
            direction: SDP.getDirection(mediaSection, sessionPart),
            kind,
            mid: SDP.getMid(mediaSection),
            protocol: mLine.protocol
            // TODO: what about end-of-candidates?
        };

        if (!isRejected) {
            media.iceParameters = SDP.getIceParameters(mediaSection, sessionPart);
            media.dtlsParameters = SDP.getDtlsParameters(mediaSection, sessionPart);
            media.setup = SDP.matchPrefix(mediaSection, 'a=setup:')[0].substr(8);
            if (session.iceLite) {
                media.iceParameters.iceLite = true;
            }
        }

        if (kind === 'audio' || kind === 'video') {
            media.rtpParameters = SDP.parseRtpParameters(mediaSection);
            media.rtpEncodingParameters = SDP.parseRtpEncodingParameters(mediaSection);
            media.rtcpParameters = SDP.parseRtcpParameters(mediaSection);
            const msid = SDP.parseMsid(mediaSection);
            media.streams = msid ? [msid] : [];
        } else if (kind === 'application') {
            media.sctp = SDP.parseSctpDescription(mediaSection);
        }

        media.candidates = SDP.matchPrefix(mediaSection, 'a=candidate:').map(SDP.parseCandidate);

        session.media.push(media);
    }

    return session;
}

// ====================================================================
// Export Intermediary to SDP
// ====================================================================

export function exportToSDP(session: IntermediateSessionDescription): string {
    const output: string[] = [];

    output.push(
        SDP.writeSessionBoilerplate(session.sessionId, session.sessionVersion),
        'a=msid-semantic:WMS *\r\n'
    );
    if (
        session.iceLite ||
        session.media.filter(m => m.iceParameters && m.iceParameters.iceLite).length > 0
    ) {
        output.push('a=ice-lite\r\n');
    }

    for (const group of session.groups || []) {
        output.push(`a=group:${group.semantics} ${group.mids.join(' ')}\r\n`);
    }

    for (const media of session.media || []) {
        const isRejected = !(media.iceParameters && media.dtlsParameters);
        if (media.kind === 'application' && media.sctp) {
            output.push(SDP.writeSctpDescription(media, media.sctp));
        } else if (media.rtpParameters) {
            let mline = SDP.writeRtpDescription(media.kind, media.rtpParameters);
            if (isRejected) {
                mline = mline.replace(`m=${media.kind} 9 `, `m=${media.kind} 0 `);
            }
            output.push(mline);

            output.push(`a=${media.direction || 'sendrecv'}\r\n`);

            for (const stream of media.streams || []) {
                output.push(`a=msid:${stream.stream} ${stream.track}\r\n`);
            }
            if (media.rtcpParameters) {
                output.push(SDP.writeRtcpParameters(media.rtcpParameters));
                if (media.rtcpParameters.cname) {
                    if (media.rtpEncodingParameters && media.rtpEncodingParameters[0].rtx) {
                        const params = media.rtpEncodingParameters[0];
                        output.push(`a=ssrc-group:FID ${params.ssrc} ${params.rtx!.ssrc}\r\n`);
                        output.push(
                            `a=ssrc:${params.rtx!.ssrc} cname:${media.rtcpParameters.cname}\r\n`
                        );
                    }
                }
            }
        }

        if (media.mid !== undefined) {
            output.push(`a=mid:${media.mid}\r\n`);
        }
        if (media.iceParameters) {
            output.push(
                SDP.writeIceParameters({
                    // Ignoring iceLite, since we already output ice-lite at session level
                    usernameFragment: media.iceParameters.usernameFragment,
                    password: media.iceParameters.password
                })
            );
        }
        if (media.dtlsParameters && media.setup) {
            output.push(SDP.writeDtlsParameters(media.dtlsParameters, media.setup));
        }
        if (media.candidates && media.candidates.length) {
            for (const candidate of media.candidates) {
                output.push(`a=${SDP.writeCandidate(candidate)}\r\n`);
            }
        }
    }

    return output.join('');
}
