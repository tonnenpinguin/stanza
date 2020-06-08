window.XMPP = (function (e) {
    var t = {};
    function n(i) {
        if (t[i]) return t[i].exports;
        var s = (t[i] = { i: i, l: !1, exports: {} });
        return e[i].call(s.exports, s, s.exports, n), (s.l = !0), s.exports;
    }
    return (
        (n.m = e),
        (n.c = t),
        (n.d = function (e, t, i) {
            n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: i });
        }),
        (n.r = function (e) {
            'undefined' != typeof Symbol &&
                Symbol.toStringTag &&
                Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
                Object.defineProperty(e, '__esModule', { value: !0 });
        }),
        (n.t = function (e, t) {
            if ((1 & t && (e = n(e)), 8 & t)) return e;
            if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
            var i = Object.create(null);
            if (
                (n.r(i),
                Object.defineProperty(i, 'default', { enumerable: !0, value: e }),
                2 & t && 'string' != typeof e)
            )
                for (var s in e)
                    n.d(
                        i,
                        s,
                        function (t) {
                            return e[t];
                        }.bind(null, s)
                    );
            return i;
        }),
        (n.n = function (e) {
            var t =
                e && e.__esModule
                    ? function () {
                          return e.default;
                      }
                    : function () {
                          return e;
                      };
            return n.d(t, 'a', t), t;
        }),
        (n.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }),
        (n.p = ''),
        n((n.s = 21))
    );
})([
    function (e, t, n) {
        'use strict';
        n.d(t, 'a', function () {
            return i;
        });
        function i(e, t, n, i) {
            return new (n || (n = Promise))(function (s, r) {
                function a(e) {
                    try {
                        c(i.next(e));
                    } catch (e) {
                        r(e);
                    }
                }
                function o(e) {
                    try {
                        c(i.throw(e));
                    } catch (e) {
                        r(e);
                    }
                }
                function c(e) {
                    var t;
                    e.done
                        ? s(e.value)
                        : ((t = e.value),
                          t instanceof n
                              ? t
                              : new n(function (e) {
                                    e(t);
                                })).then(a, o);
                }
                c((i = i.apply(e, t || [])).next());
            });
        }
    },
    function (e, t, n) {
        'use strict';
        var i = {
            generateIdentifier: function () {
                return Math.random().toString(36).substr(2, 10);
            }
        };
        (i.localCName = i.generateIdentifier()),
            (i.splitLines = function (e) {
                return e
                    .trim()
                    .split('\n')
                    .map(function (e) {
                        return e.trim();
                    });
            }),
            (i.splitSections = function (e) {
                return e.split('\nm=').map(function (e, t) {
                    return (t > 0 ? 'm=' + e : e).trim() + '\r\n';
                });
            }),
            (i.getDescription = function (e) {
                var t = i.splitSections(e);
                return t && t[0];
            }),
            (i.getMediaSections = function (e) {
                var t = i.splitSections(e);
                return t.shift(), t;
            }),
            (i.matchPrefix = function (e, t) {
                return i.splitLines(e).filter(function (e) {
                    return 0 === e.indexOf(t);
                });
            }),
            (i.parseCandidate = function (e) {
                for (
                    var t,
                        n = {
                            foundation: (t =
                                0 === e.indexOf('a=candidate:')
                                    ? e.substring(12).split(' ')
                                    : e.substring(10).split(' '))[0],
                            component: parseInt(t[1], 10),
                            protocol: t[2].toLowerCase(),
                            priority: parseInt(t[3], 10),
                            ip: t[4],
                            address: t[4],
                            port: parseInt(t[5], 10),
                            type: t[7]
                        },
                        i = 8;
                    i < t.length;
                    i += 2
                )
                    switch (t[i]) {
                        case 'raddr':
                            n.relatedAddress = t[i + 1];
                            break;
                        case 'rport':
                            n.relatedPort = parseInt(t[i + 1], 10);
                            break;
                        case 'tcptype':
                            n.tcpType = t[i + 1];
                            break;
                        case 'ufrag':
                            (n.ufrag = t[i + 1]), (n.usernameFragment = t[i + 1]);
                            break;
                        default:
                            n[t[i]] = t[i + 1];
                    }
                return n;
            }),
            (i.writeCandidate = function (e) {
                var t = [];
                t.push(e.foundation),
                    t.push(e.component),
                    t.push(e.protocol.toUpperCase()),
                    t.push(e.priority),
                    t.push(e.address || e.ip),
                    t.push(e.port);
                var n = e.type;
                return (
                    t.push('typ'),
                    t.push(n),
                    'host' !== n &&
                        e.relatedAddress &&
                        e.relatedPort &&
                        (t.push('raddr'),
                        t.push(e.relatedAddress),
                        t.push('rport'),
                        t.push(e.relatedPort)),
                    e.tcpType &&
                        'tcp' === e.protocol.toLowerCase() &&
                        (t.push('tcptype'), t.push(e.tcpType)),
                    (e.usernameFragment || e.ufrag) &&
                        (t.push('ufrag'), t.push(e.usernameFragment || e.ufrag)),
                    'candidate:' + t.join(' ')
                );
            }),
            (i.parseIceOptions = function (e) {
                return e.substr(14).split(' ');
            }),
            (i.parseRtpMap = function (e) {
                var t = e.substr(9).split(' '),
                    n = { payloadType: parseInt(t.shift(), 10) };
                return (
                    (t = t[0].split('/')),
                    (n.name = t[0]),
                    (n.clockRate = parseInt(t[1], 10)),
                    (n.channels = 3 === t.length ? parseInt(t[2], 10) : 1),
                    (n.numChannels = n.channels),
                    n
                );
            }),
            (i.writeRtpMap = function (e) {
                var t = e.payloadType;
                void 0 !== e.preferredPayloadType && (t = e.preferredPayloadType);
                var n = e.channels || e.numChannels || 1;
                return (
                    'a=rtpmap:' +
                    t +
                    ' ' +
                    e.name +
                    '/' +
                    e.clockRate +
                    (1 !== n ? '/' + n : '') +
                    '\r\n'
                );
            }),
            (i.parseExtmap = function (e) {
                var t = e.substr(9).split(' ');
                return {
                    id: parseInt(t[0], 10),
                    direction: t[0].indexOf('/') > 0 ? t[0].split('/')[1] : 'sendrecv',
                    uri: t[1]
                };
            }),
            (i.writeExtmap = function (e) {
                return (
                    'a=extmap:' +
                    (e.id || e.preferredId) +
                    (e.direction && 'sendrecv' !== e.direction ? '/' + e.direction : '') +
                    ' ' +
                    e.uri +
                    '\r\n'
                );
            }),
            (i.parseFmtp = function (e) {
                for (
                    var t, n = {}, i = e.substr(e.indexOf(' ') + 1).split(';'), s = 0;
                    s < i.length;
                    s++
                )
                    n[(t = i[s].trim().split('='))[0].trim()] = t[1];
                return n;
            }),
            (i.writeFmtp = function (e) {
                var t = '',
                    n = e.payloadType;
                if (
                    (void 0 !== e.preferredPayloadType && (n = e.preferredPayloadType),
                    e.parameters && Object.keys(e.parameters).length)
                ) {
                    var i = [];
                    Object.keys(e.parameters).forEach(function (t) {
                        e.parameters[t] ? i.push(t + '=' + e.parameters[t]) : i.push(t);
                    }),
                        (t += 'a=fmtp:' + n + ' ' + i.join(';') + '\r\n');
                }
                return t;
            }),
            (i.parseRtcpFb = function (e) {
                var t = e.substr(e.indexOf(' ') + 1).split(' ');
                return { type: t.shift(), parameter: t.join(' ') };
            }),
            (i.writeRtcpFb = function (e) {
                var t = '',
                    n = e.payloadType;
                return (
                    void 0 !== e.preferredPayloadType && (n = e.preferredPayloadType),
                    e.rtcpFeedback &&
                        e.rtcpFeedback.length &&
                        e.rtcpFeedback.forEach(function (e) {
                            t +=
                                'a=rtcp-fb:' +
                                n +
                                ' ' +
                                e.type +
                                (e.parameter && e.parameter.length ? ' ' + e.parameter : '') +
                                '\r\n';
                        }),
                    t
                );
            }),
            (i.parseSsrcMedia = function (e) {
                var t = e.indexOf(' '),
                    n = { ssrc: parseInt(e.substr(7, t - 7), 10) },
                    i = e.indexOf(':', t);
                return (
                    i > -1
                        ? ((n.attribute = e.substr(t + 1, i - t - 1)), (n.value = e.substr(i + 1)))
                        : (n.attribute = e.substr(t + 1)),
                    n
                );
            }),
            (i.parseSsrcGroup = function (e) {
                var t = e.substr(13).split(' ');
                return {
                    semantics: t.shift(),
                    ssrcs: t.map(function (e) {
                        return parseInt(e, 10);
                    })
                };
            }),
            (i.getMid = function (e) {
                var t = i.matchPrefix(e, 'a=mid:')[0];
                if (t) return t.substr(6);
            }),
            (i.parseFingerprint = function (e) {
                var t = e.substr(14).split(' ');
                return { algorithm: t[0].toLowerCase(), value: t[1] };
            }),
            (i.getDtlsParameters = function (e, t) {
                return {
                    role: 'auto',
                    fingerprints: i.matchPrefix(e + t, 'a=fingerprint:').map(i.parseFingerprint)
                };
            }),
            (i.writeDtlsParameters = function (e, t) {
                var n = 'a=setup:' + t + '\r\n';
                return (
                    e.fingerprints.forEach(function (e) {
                        n += 'a=fingerprint:' + e.algorithm + ' ' + e.value + '\r\n';
                    }),
                    n
                );
            }),
            (i.parseCryptoLine = function (e) {
                var t = e.substr(9).split(' ');
                return {
                    tag: parseInt(t[0], 10),
                    cryptoSuite: t[1],
                    keyParams: t[2],
                    sessionParams: t.slice(3)
                };
            }),
            (i.writeCryptoLine = function (e) {
                return (
                    'a=crypto:' +
                    e.tag +
                    ' ' +
                    e.cryptoSuite +
                    ' ' +
                    ('object' == typeof e.keyParams
                        ? i.writeCryptoKeyParams(e.keyParams)
                        : e.keyParams) +
                    (e.sessionParams ? ' ' + e.sessionParams.join(' ') : '') +
                    '\r\n'
                );
            }),
            (i.parseCryptoKeyParams = function (e) {
                if (0 !== e.indexOf('inline:')) return null;
                var t = e.substr(7).split('|');
                return {
                    keyMethod: 'inline',
                    keySalt: t[0],
                    lifeTime: t[1],
                    mkiValue: t[2] ? t[2].split(':')[0] : void 0,
                    mkiLength: t[2] ? t[2].split(':')[1] : void 0
                };
            }),
            (i.writeCryptoKeyParams = function (e) {
                return (
                    e.keyMethod +
                    ':' +
                    e.keySalt +
                    (e.lifeTime ? '|' + e.lifeTime : '') +
                    (e.mkiValue && e.mkiLength ? '|' + e.mkiValue + ':' + e.mkiLength : '')
                );
            }),
            (i.getCryptoParameters = function (e, t) {
                return i.matchPrefix(e + t, 'a=crypto:').map(i.parseCryptoLine);
            }),
            (i.getIceParameters = function (e, t) {
                var n = i.matchPrefix(e + t, 'a=ice-ufrag:')[0],
                    s = i.matchPrefix(e + t, 'a=ice-pwd:')[0];
                return n && s ? { usernameFragment: n.substr(12), password: s.substr(10) } : null;
            }),
            (i.writeIceParameters = function (e) {
                return 'a=ice-ufrag:' + e.usernameFragment + '\r\na=ice-pwd:' + e.password + '\r\n';
            }),
            (i.parseRtpParameters = function (e) {
                for (
                    var t = { codecs: [], headerExtensions: [], fecMechanisms: [], rtcp: [] },
                        n = i.splitLines(e)[0].split(' '),
                        s = 3;
                    s < n.length;
                    s++
                ) {
                    var r = n[s],
                        a = i.matchPrefix(e, 'a=rtpmap:' + r + ' ')[0];
                    if (a) {
                        var o = i.parseRtpMap(a),
                            c = i.matchPrefix(e, 'a=fmtp:' + r + ' ');
                        switch (
                            ((o.parameters = c.length ? i.parseFmtp(c[0]) : {}),
                            (o.rtcpFeedback = i
                                .matchPrefix(e, 'a=rtcp-fb:' + r + ' ')
                                .map(i.parseRtcpFb)),
                            t.codecs.push(o),
                            o.name.toUpperCase())
                        ) {
                            case 'RED':
                            case 'ULPFEC':
                                t.fecMechanisms.push(o.name.toUpperCase());
                        }
                    }
                }
                return (
                    i.matchPrefix(e, 'a=extmap:').forEach(function (e) {
                        t.headerExtensions.push(i.parseExtmap(e));
                    }),
                    t
                );
            }),
            (i.writeRtpDescription = function (e, t) {
                var n = '';
                (n += 'm=' + e + ' '),
                    (n += t.codecs.length > 0 ? '9' : '0'),
                    (n += ' UDP/TLS/RTP/SAVPF '),
                    (n +=
                        t.codecs
                            .map(function (e) {
                                return void 0 !== e.preferredPayloadType
                                    ? e.preferredPayloadType
                                    : e.payloadType;
                            })
                            .join(' ') + '\r\n'),
                    (n += 'c=IN IP4 0.0.0.0\r\n'),
                    (n += 'a=rtcp:9 IN IP4 0.0.0.0\r\n'),
                    t.codecs.forEach(function (e) {
                        (n += i.writeRtpMap(e)), (n += i.writeFmtp(e)), (n += i.writeRtcpFb(e));
                    });
                var s = 0;
                return (
                    t.codecs.forEach(function (e) {
                        e.maxptime > s && (s = e.maxptime);
                    }),
                    s > 0 && (n += 'a=maxptime:' + s + '\r\n'),
                    (n += 'a=rtcp-mux\r\n'),
                    t.headerExtensions &&
                        t.headerExtensions.forEach(function (e) {
                            n += i.writeExtmap(e);
                        }),
                    n
                );
            }),
            (i.parseRtpEncodingParameters = function (e) {
                var t,
                    n = [],
                    s = i.parseRtpParameters(e),
                    r = -1 !== s.fecMechanisms.indexOf('RED'),
                    a = -1 !== s.fecMechanisms.indexOf('ULPFEC'),
                    o = i
                        .matchPrefix(e, 'a=ssrc:')
                        .map(function (e) {
                            return i.parseSsrcMedia(e);
                        })
                        .filter(function (e) {
                            return 'cname' === e.attribute;
                        }),
                    c = o.length > 0 && o[0].ssrc,
                    l = i.matchPrefix(e, 'a=ssrc-group:FID').map(function (e) {
                        return e
                            .substr(17)
                            .split(' ')
                            .map(function (e) {
                                return parseInt(e, 10);
                            });
                    });
                l.length > 0 && l[0].length > 1 && l[0][0] === c && (t = l[0][1]),
                    s.codecs.forEach(function (e) {
                        if ('RTX' === e.name.toUpperCase() && e.parameters.apt) {
                            var i = { ssrc: c, codecPayloadType: parseInt(e.parameters.apt, 10) };
                            c && t && (i.rtx = { ssrc: t }),
                                n.push(i),
                                r &&
                                    (((i = JSON.parse(JSON.stringify(i))).fec = {
                                        ssrc: c,
                                        mechanism: a ? 'red+ulpfec' : 'red'
                                    }),
                                    n.push(i));
                        }
                    }),
                    0 === n.length && c && n.push({ ssrc: c });
                var u = i.matchPrefix(e, 'b=');
                return (
                    u.length &&
                        ((u =
                            0 === u[0].indexOf('b=TIAS:')
                                ? parseInt(u[0].substr(7), 10)
                                : 0 === u[0].indexOf('b=AS:')
                                ? 1e3 * parseInt(u[0].substr(5), 10) * 0.95 - 16e3
                                : void 0),
                        n.forEach(function (e) {
                            e.maxBitrate = u;
                        })),
                    n
                );
            }),
            (i.parseRtcpParameters = function (e) {
                var t = {},
                    n = i
                        .matchPrefix(e, 'a=ssrc:')
                        .map(function (e) {
                            return i.parseSsrcMedia(e);
                        })
                        .filter(function (e) {
                            return 'cname' === e.attribute;
                        })[0];
                n && ((t.cname = n.value), (t.ssrc = n.ssrc));
                var s = i.matchPrefix(e, 'a=rtcp-rsize');
                (t.reducedSize = s.length > 0), (t.compound = 0 === s.length);
                var r = i.matchPrefix(e, 'a=rtcp-mux');
                return (t.mux = r.length > 0), t;
            }),
            (i.parseMsid = function (e) {
                var t,
                    n = i.matchPrefix(e, 'a=msid:');
                if (1 === n.length)
                    return { stream: (t = n[0].substr(7).split(' '))[0], track: t[1] };
                var s = i
                    .matchPrefix(e, 'a=ssrc:')
                    .map(function (e) {
                        return i.parseSsrcMedia(e);
                    })
                    .filter(function (e) {
                        return 'msid' === e.attribute;
                    });
                return s.length > 0
                    ? { stream: (t = s[0].value.split(' '))[0], track: t[1] }
                    : void 0;
            }),
            (i.parseSctpDescription = function (e) {
                var t,
                    n = i.parseMLine(e),
                    s = i.matchPrefix(e, 'a=max-message-size:');
                s.length > 0 && (t = parseInt(s[0].substr(19), 10)), isNaN(t) && (t = 65536);
                var r = i.matchPrefix(e, 'a=sctp-port:');
                if (r.length > 0)
                    return {
                        port: parseInt(r[0].substr(12), 10),
                        protocol: n.fmt,
                        maxMessageSize: t
                    };
                if (i.matchPrefix(e, 'a=sctpmap:').length > 0) {
                    var a = i.matchPrefix(e, 'a=sctpmap:')[0].substr(10).split(' ');
                    return { port: parseInt(a[0], 10), protocol: a[1], maxMessageSize: t };
                }
            }),
            (i.writeSctpDescription = function (e, t) {
                var n = [];
                return (
                    (n =
                        'DTLS/SCTP' !== e.protocol
                            ? [
                                  'm=' + e.kind + ' 9 ' + e.protocol + ' ' + t.protocol + '\r\n',
                                  'c=IN IP4 0.0.0.0\r\n',
                                  'a=sctp-port:' + t.port + '\r\n'
                              ]
                            : [
                                  'm=' + e.kind + ' 9 ' + e.protocol + ' ' + t.port + '\r\n',
                                  'c=IN IP4 0.0.0.0\r\n',
                                  'a=sctpmap:' + t.port + ' ' + t.protocol + ' 65535\r\n'
                              ]),
                    void 0 !== t.maxMessageSize &&
                        n.push('a=max-message-size:' + t.maxMessageSize + '\r\n'),
                    n.join('')
                );
            }),
            (i.generateSessionId = function () {
                return Math.random().toString().substr(2, 21);
            }),
            (i.writeSessionBoilerplate = function (e, t, n) {
                var s = void 0 !== t ? t : 2;
                return (
                    'v=0\r\no=' +
                    (n || 'thisisadapterortc') +
                    ' ' +
                    (e || i.generateSessionId()) +
                    ' ' +
                    s +
                    ' IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n'
                );
            }),
            (i.writeMediaSection = function (e, t, n, s) {
                var r = i.writeRtpDescription(e.kind, t);
                if (
                    ((r += i.writeIceParameters(e.iceGatherer.getLocalParameters())),
                    (r += i.writeDtlsParameters(
                        e.dtlsTransport.getLocalParameters(),
                        'offer' === n ? 'actpass' : 'active'
                    )),
                    (r += 'a=mid:' + e.mid + '\r\n'),
                    e.direction
                        ? (r += 'a=' + e.direction + '\r\n')
                        : e.rtpSender && e.rtpReceiver
                        ? (r += 'a=sendrecv\r\n')
                        : e.rtpSender
                        ? (r += 'a=sendonly\r\n')
                        : e.rtpReceiver
                        ? (r += 'a=recvonly\r\n')
                        : (r += 'a=inactive\r\n'),
                    e.rtpSender)
                ) {
                    var a = 'msid:' + s.id + ' ' + e.rtpSender.track.id + '\r\n';
                    (r += 'a=' + a),
                        (r += 'a=ssrc:' + e.sendEncodingParameters[0].ssrc + ' ' + a),
                        e.sendEncodingParameters[0].rtx &&
                            ((r += 'a=ssrc:' + e.sendEncodingParameters[0].rtx.ssrc + ' ' + a),
                            (r +=
                                'a=ssrc-group:FID ' +
                                e.sendEncodingParameters[0].ssrc +
                                ' ' +
                                e.sendEncodingParameters[0].rtx.ssrc +
                                '\r\n'));
                }
                return (
                    (r +=
                        'a=ssrc:' +
                        e.sendEncodingParameters[0].ssrc +
                        ' cname:' +
                        i.localCName +
                        '\r\n'),
                    e.rtpSender &&
                        e.sendEncodingParameters[0].rtx &&
                        (r +=
                            'a=ssrc:' +
                            e.sendEncodingParameters[0].rtx.ssrc +
                            ' cname:' +
                            i.localCName +
                            '\r\n'),
                    r
                );
            }),
            (i.getDirection = function (e, t) {
                for (var n = i.splitLines(e), s = 0; s < n.length; s++)
                    switch (n[s]) {
                        case 'a=sendrecv':
                        case 'a=sendonly':
                        case 'a=recvonly':
                        case 'a=inactive':
                            return n[s].substr(2);
                    }
                return t ? i.getDirection(t) : 'sendrecv';
            }),
            (i.getKind = function (e) {
                return i.splitLines(e)[0].split(' ')[0].substr(2);
            }),
            (i.isRejected = function (e) {
                return '0' === e.split(' ', 2)[1];
            }),
            (i.parseMLine = function (e) {
                var t = i.splitLines(e)[0].substr(2).split(' ');
                return {
                    kind: t[0],
                    port: parseInt(t[1], 10),
                    protocol: t[2],
                    fmt: t.slice(3).join(' ')
                };
            }),
            (i.parseOLine = function (e) {
                var t = i.matchPrefix(e, 'o=')[0].substr(2).split(' ');
                return {
                    username: t[0],
                    sessionId: t[1],
                    sessionVersion: parseInt(t[2], 10),
                    netType: t[3],
                    addressType: t[4],
                    address: t[5]
                };
            }),
            (i.isValidSDP = function (e) {
                if ('string' != typeof e || 0 === e.length) return !1;
                for (var t = i.splitLines(e), n = 0; n < t.length; n++)
                    if (t[n].length < 2 || '=' !== t[n].charAt(1)) return !1;
                return !0;
            }),
            (e.exports = i);
    },
    function (e, t, n) {
        (function (e, i) {
            var s;
            /*! https://mths.be/punycode v1.4.1 by @mathias */ !(function (r) {
                t && t.nodeType, e && e.nodeType;
                var a = 'object' == typeof i && i;
                a.global !== a && a.window !== a && a.self;
                var o,
                    c = 2147483647,
                    l = /^xn--/,
                    u = /[^\x20-\x7E]/,
                    p = /[\x2E\u3002\uFF0E\uFF61]/g,
                    d = {
                        overflow: 'Overflow: input needs wider integers to process',
                        'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
                        'invalid-input': 'Invalid input'
                    },
                    h = Math.floor,
                    f = String.fromCharCode;
                function m(e) {
                    throw new RangeError(d[e]);
                }
                function g(e, t) {
                    for (var n = e.length, i = []; n--; ) i[n] = t(e[n]);
                    return i;
                }
                function b(e, t) {
                    var n = e.split('@'),
                        i = '';
                    return (
                        n.length > 1 && ((i = n[0] + '@'), (e = n[1])),
                        i + g((e = e.replace(p, '.')).split('.'), t).join('.')
                    );
                }
                function y(e) {
                    for (var t, n, i = [], s = 0, r = e.length; s < r; )
                        (t = e.charCodeAt(s++)) >= 55296 && t <= 56319 && s < r
                            ? 56320 == (64512 & (n = e.charCodeAt(s++)))
                                ? i.push(((1023 & t) << 10) + (1023 & n) + 65536)
                                : (i.push(t), s--)
                            : i.push(t);
                    return i;
                }
                function v(e) {
                    return g(e, function (e) {
                        var t = '';
                        return (
                            e > 65535 &&
                                ((t += f((((e -= 65536) >>> 10) & 1023) | 55296)),
                                (e = 56320 | (1023 & e))),
                            (t += f(e))
                        );
                    }).join('');
                }
                function w(e, t) {
                    return e + 22 + 75 * (e < 26) - ((0 != t) << 5);
                }
                function _(e, t, n) {
                    var i = 0;
                    for (e = n ? h(e / 700) : e >> 1, e += h(e / t); e > 455; i += 36)
                        e = h(e / 35);
                    return h(i + (36 * e) / (e + 38));
                }
                function x(e) {
                    var t,
                        n,
                        i,
                        s,
                        r,
                        a,
                        o,
                        l,
                        u,
                        p,
                        d,
                        f = [],
                        g = e.length,
                        b = 0,
                        y = 128,
                        w = 72;
                    for ((n = e.lastIndexOf('-')) < 0 && (n = 0), i = 0; i < n; ++i)
                        e.charCodeAt(i) >= 128 && m('not-basic'), f.push(e.charCodeAt(i));
                    for (s = n > 0 ? n + 1 : 0; s < g; ) {
                        for (
                            r = b, a = 1, o = 36;
                            s >= g && m('invalid-input'),
                                ((l =
                                    (d = e.charCodeAt(s++)) - 48 < 10
                                        ? d - 22
                                        : d - 65 < 26
                                        ? d - 65
                                        : d - 97 < 26
                                        ? d - 97
                                        : 36) >= 36 ||
                                    l > h((c - b) / a)) &&
                                    m('overflow'),
                                (b += l * a),
                                !(l < (u = o <= w ? 1 : o >= w + 26 ? 26 : o - w));
                            o += 36
                        )
                            a > h(c / (p = 36 - u)) && m('overflow'), (a *= p);
                        (w = _(b - r, (t = f.length + 1), 0 == r)),
                            h(b / t) > c - y && m('overflow'),
                            (y += h(b / t)),
                            (b %= t),
                            f.splice(b++, 0, y);
                    }
                    return v(f);
                }
                function j(e) {
                    var t,
                        n,
                        i,
                        s,
                        r,
                        a,
                        o,
                        l,
                        u,
                        p,
                        d,
                        g,
                        b,
                        v,
                        x,
                        j = [];
                    for (g = (e = y(e)).length, t = 128, n = 0, r = 72, a = 0; a < g; ++a)
                        (d = e[a]) < 128 && j.push(f(d));
                    for (i = s = j.length, s && j.push('-'); i < g; ) {
                        for (o = c, a = 0; a < g; ++a) (d = e[a]) >= t && d < o && (o = d);
                        for (
                            o - t > h((c - n) / (b = i + 1)) && m('overflow'),
                                n += (o - t) * b,
                                t = o,
                                a = 0;
                            a < g;
                            ++a
                        )
                            if (((d = e[a]) < t && ++n > c && m('overflow'), d == t)) {
                                for (
                                    l = n, u = 36;
                                    !(l < (p = u <= r ? 1 : u >= r + 26 ? 26 : u - r));
                                    u += 36
                                )
                                    (x = l - p),
                                        (v = 36 - p),
                                        j.push(f(w(p + (x % v), 0))),
                                        (l = h(x / v));
                                j.push(f(w(l, 0))), (r = _(n, b, i == s)), (n = 0), ++i;
                            }
                        ++n, ++t;
                    }
                    return j.join('');
                }
                (o = {
                    version: '1.4.1',
                    ucs2: { decode: y, encode: v },
                    decode: x,
                    encode: j,
                    toASCII: function (e) {
                        return b(e, function (e) {
                            return u.test(e) ? 'xn--' + j(e) : e;
                        });
                    },
                    toUnicode: function (e) {
                        return b(e, function (e) {
                            return l.test(e) ? x(e.slice(4).toLowerCase()) : e;
                        });
                    }
                }),
                    void 0 ===
                        (s = function () {
                            return o;
                        }.call(t, n, t, e)) || (e.exports = s);
            })();
        }.call(this, n(24)(e), n(4)));
    },
    function (e, t, n) {
        'use strict';
        var i,
            s = 'object' == typeof Reflect ? Reflect : null,
            r =
                s && 'function' == typeof s.apply
                    ? s.apply
                    : function (e, t, n) {
                          return Function.prototype.apply.call(e, t, n);
                      };
        i =
            s && 'function' == typeof s.ownKeys
                ? s.ownKeys
                : Object.getOwnPropertySymbols
                ? function (e) {
                      return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
                  }
                : function (e) {
                      return Object.getOwnPropertyNames(e);
                  };
        var a =
            Number.isNaN ||
            function (e) {
                return e != e;
            };
        function o() {
            o.init.call(this);
        }
        (e.exports = o),
            (o.EventEmitter = o),
            (o.prototype._events = void 0),
            (o.prototype._eventsCount = 0),
            (o.prototype._maxListeners = void 0);
        var c = 10;
        function l(e) {
            if ('function' != typeof e)
                throw new TypeError(
                    'The "listener" argument must be of type Function. Received type ' + typeof e
                );
        }
        function u(e) {
            return void 0 === e._maxListeners ? o.defaultMaxListeners : e._maxListeners;
        }
        function p(e, t, n, i) {
            var s, r, a, o;
            if (
                (l(n),
                void 0 === (r = e._events)
                    ? ((r = e._events = Object.create(null)), (e._eventsCount = 0))
                    : (void 0 !== r.newListener &&
                          (e.emit('newListener', t, n.listener ? n.listener : n), (r = e._events)),
                      (a = r[t])),
                void 0 === a)
            )
                (a = r[t] = n), ++e._eventsCount;
            else if (
                ('function' == typeof a
                    ? (a = r[t] = i ? [n, a] : [a, n])
                    : i
                    ? a.unshift(n)
                    : a.push(n),
                (s = u(e)) > 0 && a.length > s && !a.warned)
            ) {
                a.warned = !0;
                var c = new Error(
                    'Possible EventEmitter memory leak detected. ' +
                        a.length +
                        ' ' +
                        String(t) +
                        ' listeners added. Use emitter.setMaxListeners() to increase limit'
                );
                (c.name = 'MaxListenersExceededWarning'),
                    (c.emitter = e),
                    (c.type = t),
                    (c.count = a.length),
                    (o = c),
                    console && console.warn && console.warn(o);
            }
            return e;
        }
        function d() {
            if (!this.fired)
                return (
                    this.target.removeListener(this.type, this.wrapFn),
                    (this.fired = !0),
                    0 === arguments.length
                        ? this.listener.call(this.target)
                        : this.listener.apply(this.target, arguments)
                );
        }
        function h(e, t, n) {
            var i = { fired: !1, wrapFn: void 0, target: e, type: t, listener: n },
                s = d.bind(i);
            return (s.listener = n), (i.wrapFn = s), s;
        }
        function f(e, t, n) {
            var i = e._events;
            if (void 0 === i) return [];
            var s = i[t];
            return void 0 === s
                ? []
                : 'function' == typeof s
                ? n
                    ? [s.listener || s]
                    : [s]
                : n
                ? (function (e) {
                      for (var t = new Array(e.length), n = 0; n < t.length; ++n)
                          t[n] = e[n].listener || e[n];
                      return t;
                  })(s)
                : g(s, s.length);
        }
        function m(e) {
            var t = this._events;
            if (void 0 !== t) {
                var n = t[e];
                if ('function' == typeof n) return 1;
                if (void 0 !== n) return n.length;
            }
            return 0;
        }
        function g(e, t) {
            for (var n = new Array(t), i = 0; i < t; ++i) n[i] = e[i];
            return n;
        }
        Object.defineProperty(o, 'defaultMaxListeners', {
            enumerable: !0,
            get: function () {
                return c;
            },
            set: function (e) {
                if ('number' != typeof e || e < 0 || a(e))
                    throw new RangeError(
                        'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
                            e +
                            '.'
                    );
                c = e;
            }
        }),
            (o.init = function () {
                (void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events) ||
                    ((this._events = Object.create(null)), (this._eventsCount = 0)),
                    (this._maxListeners = this._maxListeners || void 0);
            }),
            (o.prototype.setMaxListeners = function (e) {
                if ('number' != typeof e || e < 0 || a(e))
                    throw new RangeError(
                        'The value of "n" is out of range. It must be a non-negative number. Received ' +
                            e +
                            '.'
                    );
                return (this._maxListeners = e), this;
            }),
            (o.prototype.getMaxListeners = function () {
                return u(this);
            }),
            (o.prototype.emit = function (e) {
                for (var t = [], n = 1; n < arguments.length; n++) t.push(arguments[n]);
                var i = 'error' === e,
                    s = this._events;
                if (void 0 !== s) i = i && void 0 === s.error;
                else if (!i) return !1;
                if (i) {
                    var a;
                    if ((t.length > 0 && (a = t[0]), a instanceof Error)) throw a;
                    var o = new Error('Unhandled error.' + (a ? ' (' + a.message + ')' : ''));
                    throw ((o.context = a), o);
                }
                var c = s[e];
                if (void 0 === c) return !1;
                if ('function' == typeof c) r(c, this, t);
                else {
                    var l = c.length,
                        u = g(c, l);
                    for (n = 0; n < l; ++n) r(u[n], this, t);
                }
                return !0;
            }),
            (o.prototype.addListener = function (e, t) {
                return p(this, e, t, !1);
            }),
            (o.prototype.on = o.prototype.addListener),
            (o.prototype.prependListener = function (e, t) {
                return p(this, e, t, !0);
            }),
            (o.prototype.once = function (e, t) {
                return l(t), this.on(e, h(this, e, t)), this;
            }),
            (o.prototype.prependOnceListener = function (e, t) {
                return l(t), this.prependListener(e, h(this, e, t)), this;
            }),
            (o.prototype.removeListener = function (e, t) {
                var n, i, s, r, a;
                if ((l(t), void 0 === (i = this._events))) return this;
                if (void 0 === (n = i[e])) return this;
                if (n === t || n.listener === t)
                    0 == --this._eventsCount
                        ? (this._events = Object.create(null))
                        : (delete i[e],
                          i.removeListener && this.emit('removeListener', e, n.listener || t));
                else if ('function' != typeof n) {
                    for (s = -1, r = n.length - 1; r >= 0; r--)
                        if (n[r] === t || n[r].listener === t) {
                            (a = n[r].listener), (s = r);
                            break;
                        }
                    if (s < 0) return this;
                    0 === s
                        ? n.shift()
                        : (function (e, t) {
                              for (; t + 1 < e.length; t++) e[t] = e[t + 1];
                              e.pop();
                          })(n, s),
                        1 === n.length && (i[e] = n[0]),
                        void 0 !== i.removeListener && this.emit('removeListener', e, a || t);
                }
                return this;
            }),
            (o.prototype.off = o.prototype.removeListener),
            (o.prototype.removeAllListeners = function (e) {
                var t, n, i;
                if (void 0 === (n = this._events)) return this;
                if (void 0 === n.removeListener)
                    return (
                        0 === arguments.length
                            ? ((this._events = Object.create(null)), (this._eventsCount = 0))
                            : void 0 !== n[e] &&
                              (0 == --this._eventsCount
                                  ? (this._events = Object.create(null))
                                  : delete n[e]),
                        this
                    );
                if (0 === arguments.length) {
                    var s,
                        r = Object.keys(n);
                    for (i = 0; i < r.length; ++i)
                        'removeListener' !== (s = r[i]) && this.removeAllListeners(s);
                    return (
                        this.removeAllListeners('removeListener'),
                        (this._events = Object.create(null)),
                        (this._eventsCount = 0),
                        this
                    );
                }
                if ('function' == typeof (t = n[e])) this.removeListener(e, t);
                else if (void 0 !== t)
                    for (i = t.length - 1; i >= 0; i--) this.removeListener(e, t[i]);
                return this;
            }),
            (o.prototype.listeners = function (e) {
                return f(this, e, !0);
            }),
            (o.prototype.rawListeners = function (e) {
                return f(this, e, !1);
            }),
            (o.listenerCount = function (e, t) {
                return 'function' == typeof e.listenerCount ? e.listenerCount(t) : m.call(e, t);
            }),
            (o.prototype.listenerCount = m),
            (o.prototype.eventNames = function () {
                return this._eventsCount > 0 ? i(this._events) : [];
            });
    },
    function (e, t) {
        var n;
        n = (function () {
            return this;
        })();
        try {
            n = n || new Function('return this')();
        } catch (e) {
            'object' == typeof window && (n = window);
        }
        e.exports = n;
    },
    function (e, t, n) {
        'use strict';
        var i = n(12),
            s =
                Object.keys ||
                function (e) {
                    var t = [];
                    for (var n in e) t.push(n);
                    return t;
                };
        e.exports = p;
        var r = Object.create(n(7));
        r.inherits = n(8);
        var a = n(15),
            o = n(18);
        r.inherits(p, a);
        for (var c = s(o.prototype), l = 0; l < c.length; l++) {
            var u = c[l];
            p.prototype[u] || (p.prototype[u] = o.prototype[u]);
        }
        function p(e) {
            if (!(this instanceof p)) return new p(e);
            a.call(this, e),
                o.call(this, e),
                e && !1 === e.readable && (this.readable = !1),
                e && !1 === e.writable && (this.writable = !1),
                (this.allowHalfOpen = !0),
                e && !1 === e.allowHalfOpen && (this.allowHalfOpen = !1),
                this.once('end', d);
        }
        function d() {
            this.allowHalfOpen || this._writableState.ended || i.nextTick(h, this);
        }
        function h(e) {
            e.end();
        }
        Object.defineProperty(p.prototype, 'writableHighWaterMark', {
            enumerable: !1,
            get: function () {
                return this._writableState.highWaterMark;
            }
        }),
            Object.defineProperty(p.prototype, 'destroyed', {
                get: function () {
                    return (
                        void 0 !== this._readableState &&
                        void 0 !== this._writableState &&
                        this._readableState.destroyed &&
                        this._writableState.destroyed
                    );
                },
                set: function (e) {
                    void 0 !== this._readableState &&
                        void 0 !== this._writableState &&
                        ((this._readableState.destroyed = e), (this._writableState.destroyed = e));
                }
            }),
            (p.prototype._destroy = function (e, t) {
                this.push(null), this.end(), i.nextTick(t, e);
            });
    },
    function (e, t, n) {
        ((t = e.exports = n(15)).Stream = t),
            (t.Readable = t),
            (t.Writable = n(18)),
            (t.Duplex = n(5)),
            (t.Transform = n(20)),
            (t.PassThrough = n(32));
    },
    function (e, t, n) {
        (function (e) {
            function n(e) {
                return Object.prototype.toString.call(e);
            }
            (t.isArray = function (e) {
                return Array.isArray ? Array.isArray(e) : '[object Array]' === n(e);
            }),
                (t.isBoolean = function (e) {
                    return 'boolean' == typeof e;
                }),
                (t.isNull = function (e) {
                    return null === e;
                }),
                (t.isNullOrUndefined = function (e) {
                    return null == e;
                }),
                (t.isNumber = function (e) {
                    return 'number' == typeof e;
                }),
                (t.isString = function (e) {
                    return 'string' == typeof e;
                }),
                (t.isSymbol = function (e) {
                    return 'symbol' == typeof e;
                }),
                (t.isUndefined = function (e) {
                    return void 0 === e;
                }),
                (t.isRegExp = function (e) {
                    return '[object RegExp]' === n(e);
                }),
                (t.isObject = function (e) {
                    return 'object' == typeof e && null !== e;
                }),
                (t.isDate = function (e) {
                    return '[object Date]' === n(e);
                }),
                (t.isError = function (e) {
                    return '[object Error]' === n(e) || e instanceof Error;
                }),
                (t.isFunction = function (e) {
                    return 'function' == typeof e;
                }),
                (t.isPrimitive = function (e) {
                    return (
                        null === e ||
                        'boolean' == typeof e ||
                        'number' == typeof e ||
                        'string' == typeof e ||
                        'symbol' == typeof e ||
                        void 0 === e
                    );
                }),
                (t.isBuffer = e.isBuffer);
        }.call(this, n(10).Buffer));
    },
    function (e, t) {
        'function' == typeof Object.create
            ? (e.exports = function (e, t) {
                  t &&
                      ((e.super_ = t),
                      (e.prototype = Object.create(t.prototype, {
                          constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 }
                      })));
              })
            : (e.exports = function (e, t) {
                  if (t) {
                      e.super_ = t;
                      var n = function () {};
                      (n.prototype = t.prototype),
                          (e.prototype = new n()),
                          (e.prototype.constructor = e);
                  }
              });
    },
    function (e, t, n) {
        'use strict';
        function i(e) {
            return function (...t) {
                var n = t.pop();
                return e.call(this, t, n);
            };
        }
        n.d(t, 'a', function () {
            return J;
        });
        var s = 'function' == typeof setImmediate && setImmediate,
            r = 'object' == typeof process && 'function' == typeof process.nextTick;
        function a(e) {
            setTimeout(e, 0);
        }
        function o(e) {
            return (t, ...n) => e(() => t(...n));
        }
        var c = o(s ? setImmediate : r ? process.nextTick : a);
        function l(e) {
            return d(e)
                ? function (...t) {
                      const n = t.pop();
                      return u(e.apply(this, t), n);
                  }
                : i(function (t, n) {
                      var i;
                      try {
                          i = e.apply(this, t);
                      } catch (e) {
                          return n(e);
                      }
                      if (i && 'function' == typeof i.then) return u(i, n);
                      n(null, i);
                  });
        }
        function u(e, t) {
            return e.then(
                e => {
                    p(t, null, e);
                },
                e => {
                    p(t, e && e.message ? e : new Error(e));
                }
            );
        }
        function p(e, t, n) {
            try {
                e(t, n);
            } catch (e) {
                c(e => {
                    throw e;
                }, e);
            }
        }
        function d(e) {
            return 'AsyncFunction' === e[Symbol.toStringTag];
        }
        function h(e) {
            if ('function' != typeof e) throw new Error('expected a function');
            return d(e) ? l(e) : e;
        }
        function f(e, t = e.length) {
            if (!t) throw new Error('arity is undefined');
            return function (...n) {
                return 'function' == typeof n[t - 1]
                    ? e.apply(this, n)
                    : new Promise((i, s) => {
                          (n[t - 1] = (e, ...t) => {
                              if (e) return s(e);
                              i(t.length > 1 ? t : t[0]);
                          }),
                              e.apply(this, n);
                      });
            };
        }
        function m(e) {
            return function (t, ...n) {
                return f(function (i) {
                    var s = this;
                    return e(
                        t,
                        (e, t) => {
                            h(e).apply(s, n.concat(t));
                        },
                        i
                    );
                });
            };
        }
        function g(e, t, n, i) {
            t = t || [];
            var s = [],
                r = 0,
                a = h(n);
            return e(
                t,
                (e, t, n) => {
                    var i = r++;
                    a(e, (e, t) => {
                        (s[i] = t), n(e);
                    });
                },
                e => {
                    i(e, s);
                }
            );
        }
        function b(e) {
            return e && 'number' == typeof e.length && e.length >= 0 && e.length % 1 == 0;
        }
        const y = {};
        function v(e) {
            function t(...t) {
                if (null !== e) {
                    var n = e;
                    (e = null), n.apply(this, t);
                }
            }
            return Object.assign(t, e), t;
        }
        function w(e) {
            if (b(e))
                return (function (e) {
                    var t = -1,
                        n = e.length;
                    return function () {
                        return ++t < n ? { value: e[t], key: t } : null;
                    };
                })(e);
            var t,
                n,
                i,
                s,
                r = (function (e) {
                    return e[Symbol.iterator] && e[Symbol.iterator]();
                })(e);
            return r
                ? (function (e) {
                      var t = -1;
                      return function () {
                          var n = e.next();
                          return n.done ? null : (t++, { value: n.value, key: t });
                      };
                  })(r)
                : ((n = (t = e) ? Object.keys(t) : []),
                  (i = -1),
                  (s = n.length),
                  function () {
                      var e = n[++i];
                      return i < s ? { value: t[e], key: e } : null;
                  });
        }
        function _(e) {
            return function (...t) {
                if (null === e) throw new Error('Callback was already called.');
                var n = e;
                (e = null), n.apply(this, t);
            };
        }
        function x(e, t, n, i) {
            let s = !1,
                r = !1,
                a = !1,
                o = 0,
                c = 0;
            function l() {
                o >= t ||
                    a ||
                    s ||
                    ((a = !0),
                    e
                        .next()
                        .then(({ value: e, done: t }) => {
                            if (!r && !s) {
                                if (((a = !1), t)) return (s = !0), void (o <= 0 && i(null));
                                o++, n(e, c, u), c++, l();
                            }
                        })
                        .catch(p));
            }
            function u(e, t) {
                if (((o -= 1), !r))
                    return e
                        ? p(e)
                        : !1 === e
                        ? ((s = !0), void (r = !0))
                        : t === y || (s && o <= 0)
                        ? ((s = !0), i(null))
                        : void l();
            }
            function p(e) {
                r || ((a = !1), (s = !0), i(e));
            }
            l();
        }
        var j = e => (t, n, i) => {
            if (((i = v(i)), e <= 0))
                throw new RangeError('concurrency limit cannot be less than 1');
            if (!t) return i(null);
            if ('AsyncGenerator' === t[Symbol.toStringTag]) return x(t, e, n, i);
            if (
                (function (e) {
                    return 'function' == typeof e[Symbol.asyncIterator];
                })(t)
            )
                return x(t[Symbol.asyncIterator](), e, n, i);
            var s = w(t),
                r = !1,
                a = !1,
                o = 0,
                c = !1;
            function l(e, t) {
                if (!a)
                    if (((o -= 1), e)) (r = !0), i(e);
                    else if (!1 === e) (r = !0), (a = !0);
                    else {
                        if (t === y || (r && o <= 0)) return (r = !0), i(null);
                        c || u();
                    }
            }
            function u() {
                for (c = !0; o < e && !r; ) {
                    var t = s();
                    if (null === t) return (r = !0), void (o <= 0 && i(null));
                    (o += 1), n(t.value, t.key, _(l));
                }
                c = !1;
            }
            u();
        };
        var S = f(function (e, t, n, i) {
            return j(t)(e, h(n), i);
        }, 4);
        function k(e, t, n) {
            n = v(n);
            var i = 0,
                s = 0,
                { length: r } = e,
                a = !1;
            function o(e, t) {
                !1 === e && (a = !0), !0 !== a && (e ? n(e) : (++s !== r && t !== y) || n(null));
            }
            for (0 === r && n(null); i < r; i++) t(e[i], i, _(o));
        }
        function T(e, t, n) {
            return S(e, 1 / 0, t, n);
        }
        var O = f(function (e, t, n) {
            return (b(e) ? k : T)(e, h(t), n);
        }, 3);
        var I = f(function (e, t, n) {
            return g(O, e, t, n);
        }, 3);
        m(I);
        var E = f(function (e, t, n) {
            return S(e, 1, t, n);
        }, 3);
        var C = f(function (e, t, n) {
            return g(E, e, t, n);
        }, 3);
        m(C);
        Symbol('promiseCallback');
        class R {
            constructor() {
                (this.head = this.tail = null), (this.length = 0);
            }
            removeLink(e) {
                return (
                    e.prev ? (e.prev.next = e.next) : (this.head = e.next),
                    e.next ? (e.next.prev = e.prev) : (this.tail = e.prev),
                    (e.prev = e.next = null),
                    (this.length -= 1),
                    e
                );
            }
            empty() {
                for (; this.head; ) this.shift();
                return this;
            }
            insertAfter(e, t) {
                (t.prev = e),
                    (t.next = e.next),
                    e.next ? (e.next.prev = t) : (this.tail = t),
                    (e.next = t),
                    (this.length += 1);
            }
            insertBefore(e, t) {
                (t.prev = e.prev),
                    (t.next = e),
                    e.prev ? (e.prev.next = t) : (this.head = t),
                    (e.prev = t),
                    (this.length += 1);
            }
            unshift(e) {
                this.head ? this.insertBefore(this.head, e) : N(this, e);
            }
            push(e) {
                this.tail ? this.insertAfter(this.tail, e) : N(this, e);
            }
            shift() {
                return this.head && this.removeLink(this.head);
            }
            pop() {
                return this.tail && this.removeLink(this.tail);
            }
            toArray() {
                return [...this];
            }
            *[Symbol.iterator]() {
                for (var e = this.head; e; ) yield e.data, (e = e.next);
            }
            remove(e) {
                for (var t = this.head; t; ) {
                    var { next: n } = t;
                    e(t) && this.removeLink(t), (t = n);
                }
                return this;
            }
        }
        function N(e, t) {
            (e.length = 1), (e.head = e.tail = t);
        }
        function q(e, t, n) {
            if (null == t) t = 1;
            else if (0 === t) throw new RangeError('Concurrency must not be zero');
            var i = h(e),
                s = 0,
                r = [];
            const a = { error: [], drain: [], saturated: [], unsaturated: [], empty: [] };
            function o(e, t) {
                return e
                    ? t
                        ? void (a[e] = a[e].filter(e => e !== t))
                        : (a[e] = [])
                    : Object.keys(a).forEach(e => (a[e] = []));
            }
            function l(e, ...t) {
                a[e].forEach(e => e(...t));
            }
            var u = !1;
            function p(e, t, n, i) {
                if (null != i && 'function' != typeof i)
                    throw new Error('task callback must be a function');
                var s, r;
                function a(e, ...t) {
                    return e ? (n ? r(e) : s()) : t.length <= 1 ? s(t[0]) : void s(t);
                }
                b.started = !0;
                var o = { data: e, callback: n ? a : i || a };
                if (
                    (t ? b._tasks.unshift(o) : b._tasks.push(o),
                    u ||
                        ((u = !0),
                        c(() => {
                            (u = !1), b.process();
                        })),
                    n || !i)
                )
                    return new Promise((e, t) => {
                        (s = e), (r = t);
                    });
            }
            function d(e) {
                return function (t, ...n) {
                    s -= 1;
                    for (var i = 0, a = e.length; i < a; i++) {
                        var o = e[i],
                            c = r.indexOf(o);
                        0 === c ? r.shift() : c > 0 && r.splice(c, 1),
                            o.callback(t, ...n),
                            null != t && l('error', t, o.data);
                    }
                    s <= b.concurrency - b.buffer && l('unsaturated'),
                        b.idle() && l('drain'),
                        b.process();
                };
            }
            function f(e) {
                return !(0 !== e.length || !b.idle()) && (c(() => l('drain')), !0);
            }
            const m = e => t => {
                if (!t)
                    return new Promise((t, n) => {
                        !(function (e, t) {
                            const n = (...i) => {
                                o(e, n), t(...i);
                            };
                            a[e].push(n);
                        })(e, (e, i) => {
                            if (e) return n(e);
                            t(i);
                        });
                    });
                o(e),
                    (function (e, t) {
                        a[e].push(t);
                    })(e, t);
            };
            var g = !1,
                b = {
                    _tasks: new R(),
                    *[Symbol.iterator]() {
                        yield* b._tasks[Symbol.iterator]();
                    },
                    concurrency: t,
                    payload: n,
                    buffer: t / 4,
                    started: !1,
                    paused: !1,
                    push(e, t) {
                        if (Array.isArray(e)) {
                            if (f(e)) return;
                            return e.map(e => p(e, !1, !1, t));
                        }
                        return p(e, !1, !1, t);
                    },
                    pushAsync(e, t) {
                        if (Array.isArray(e)) {
                            if (f(e)) return;
                            return e.map(e => p(e, !1, !0, t));
                        }
                        return p(e, !1, !0, t);
                    },
                    kill() {
                        o(), b._tasks.empty();
                    },
                    unshift(e, t) {
                        if (Array.isArray(e)) {
                            if (f(e)) return;
                            return e.map(e => p(e, !0, !1, t));
                        }
                        return p(e, !0, !1, t);
                    },
                    unshiftAsync(e, t) {
                        if (Array.isArray(e)) {
                            if (f(e)) return;
                            return e.map(e => p(e, !0, !0, t));
                        }
                        return p(e, !0, !0, t);
                    },
                    remove(e) {
                        b._tasks.remove(e);
                    },
                    process() {
                        if (!g) {
                            for (g = !0; !b.paused && s < b.concurrency && b._tasks.length; ) {
                                var e = [],
                                    t = [],
                                    n = b._tasks.length;
                                b.payload && (n = Math.min(n, b.payload));
                                for (var a = 0; a < n; a++) {
                                    var o = b._tasks.shift();
                                    e.push(o), r.push(o), t.push(o.data);
                                }
                                (s += 1),
                                    0 === b._tasks.length && l('empty'),
                                    s === b.concurrency && l('saturated');
                                var c = _(d(e));
                                i(t, c);
                            }
                            g = !1;
                        }
                    },
                    length: () => b._tasks.length,
                    running: () => s,
                    workersList: () => r,
                    idle: () => b._tasks.length + s === 0,
                    pause() {
                        b.paused = !0;
                    },
                    resume() {
                        !1 !== b.paused && ((b.paused = !1), c(b.process));
                    }
                };
            return (
                Object.defineProperties(b, {
                    saturated: { writable: !1, value: m('saturated') },
                    unsaturated: { writable: !1, value: m('unsaturated') },
                    empty: { writable: !1, value: m('empty') },
                    drain: { writable: !1, value: m('drain') },
                    error: { writable: !1, value: m('error') }
                }),
                b
            );
        }
        f(function (e, t, n, i) {
            i = v(i);
            var s = h(n);
            return E(
                e,
                (e, n, i) => {
                    s(t, e, (e, n) => {
                        (t = n), i(e);
                    });
                },
                e => i(e, t)
            );
        }, 4);
        var A = f(function (e, t, n, i) {
            return g(j(t), e, n, i);
        }, 4);
        var F = f(function (e, t, n, i) {
            var s = h(n);
            return A(
                e,
                t,
                (e, t) => {
                    s(e, (e, ...n) => (e ? t(e) : t(e, n)));
                },
                (e, t) => {
                    for (var n = [], s = 0; s < t.length; s++) t[s] && (n = n.concat(...t[s]));
                    return i(e, n);
                }
            );
        }, 4);
        f(function (e, t, n) {
            return F(e, 1 / 0, t, n);
        }, 3);
        f(function (e, t, n) {
            return F(e, 1, t, n);
        }, 3);
        function P(e, t) {
            return (n, i, s, r) => {
                var a,
                    o = !1;
                const c = h(s);
                n(
                    i,
                    (n, i, s) => {
                        c(n, (i, r) =>
                            i || !1 === i
                                ? s(i)
                                : e(r) && !a
                                ? ((o = !0), (a = t(!0, n)), s(null, y))
                                : void s()
                        );
                    },
                    e => {
                        if (e) return r(e);
                        r(null, o ? a : t(!1));
                    }
                );
            };
        }
        f(function (e, t, n) {
            return P(
                e => e,
                (e, t) => t
            )(O, e, t, n);
        }, 3);
        f(function (e, t, n, i) {
            return P(
                e => e,
                (e, t) => t
            )(j(t), e, n, i);
        }, 4);
        f(function (e, t, n) {
            return P(
                e => e,
                (e, t) => t
            )(j(1), e, t, n);
        }, 3);
        function L(e) {
            return (t, ...n) =>
                h(t)(...n, (t, ...n) => {
                    'object' == typeof console &&
                        (t
                            ? console.error && console.error(t)
                            : console[e] && n.forEach(t => console[e](t)));
                });
        }
        L('dir');
        f(function (e, t, n) {
            n = _(n);
            var i,
                s = h(e),
                r = h(t);
            function a(e, ...t) {
                if (e) return n(e);
                !1 !== e && ((i = t), r(...t, o));
            }
            function o(e, t) {
                return e ? n(e) : !1 !== e ? (t ? void s(a) : n(null, ...i)) : void 0;
            }
            return o(null, !0);
        }, 3);
        function M(e) {
            return (t, n, i) => e(t, i);
        }
        f(function (e, t, n) {
            return O(e, M(h(t)), n);
        }, 3);
        var D = f(function (e, t, n, i) {
            return j(t)(e, M(h(n)), i);
        }, 4);
        var B = f(function (e, t, n) {
            return D(e, 1, t, n);
        }, 3);
        function U(e) {
            return d(e)
                ? e
                : function (...t) {
                      var n = t.pop(),
                          i = !0;
                      t.push((...e) => {
                          i ? c(() => n(...e)) : n(...e);
                      }),
                          e.apply(this, t),
                          (i = !1);
                  };
        }
        f(function (e, t, n) {
            return P(
                e => !e,
                e => !e
            )(O, e, t, n);
        }, 3);
        f(function (e, t, n, i) {
            return P(
                e => !e,
                e => !e
            )(j(t), e, n, i);
        }, 4);
        f(function (e, t, n) {
            return P(
                e => !e,
                e => !e
            )(E, e, t, n);
        }, 3);
        function z(e, t, n, i) {
            var s = new Array(t.length);
            e(
                t,
                (e, t, i) => {
                    n(e, (e, n) => {
                        (s[t] = !!n), i(e);
                    });
                },
                e => {
                    if (e) return i(e);
                    for (var n = [], r = 0; r < t.length; r++) s[r] && n.push(t[r]);
                    i(null, n);
                }
            );
        }
        function V(e, t, n, i) {
            var s = [];
            e(
                t,
                (e, t, i) => {
                    n(e, (n, r) => {
                        if (n) return i(n);
                        r && s.push({ index: t, value: e }), i(n);
                    });
                },
                e => {
                    if (e) return i(e);
                    i(
                        null,
                        s.sort((e, t) => e.index - t.index).map(e => e.value)
                    );
                }
            );
        }
        function $(e, t, n, i) {
            return (b(t) ? z : V)(e, t, h(n), i);
        }
        f(function (e, t, n) {
            return $(O, e, t, n);
        }, 3);
        f(function (e, t, n, i) {
            return $(j(t), e, n, i);
        }, 4);
        f(function (e, t, n) {
            return $(E, e, t, n);
        }, 3);
        f(function (e, t) {
            var n = _(t),
                i = h(U(e));
            return (function e(t) {
                if (t) return n(t);
                !1 !== t && i(e);
            })();
        }, 2);
        f(function (e, t, n, i) {
            var s = h(n);
            return A(
                e,
                t,
                (e, t) => {
                    s(e, (n, i) => (n ? t(n) : t(n, { key: i, val: e })));
                },
                (e, t) => {
                    for (
                        var n = {}, { hasOwnProperty: s } = Object.prototype, r = 0;
                        r < t.length;
                        r++
                    )
                        if (t[r]) {
                            var { key: a } = t[r],
                                { val: o } = t[r];
                            s.call(n, a) ? n[a].push(o) : (n[a] = [o]);
                        }
                    return i(e, n);
                }
            );
        }, 4);
        L('log');
        f(function (e, t, n, i) {
            i = v(i);
            var s = {},
                r = h(n);
            return j(t)(
                e,
                (e, t, n) => {
                    r(e, t, (e, i) => {
                        if (e) return n(e);
                        (s[t] = i), n(e);
                    });
                },
                e => i(e, s)
            );
        }, 4);
        o(r ? process.nextTick : s ? setImmediate : a),
            f((e, t, n) => {
                var i = b(t) ? [] : {};
                e(
                    t,
                    (e, t, n) => {
                        h(e)((e, ...s) => {
                            s.length < 2 && ([s] = s), (i[t] = s), n(e);
                        });
                    },
                    e => n(e, i)
                );
            }, 3);
        function Q(e, t) {
            var n = h(e);
            return q(
                (e, t) => {
                    n(e[0], t);
                },
                t,
                1
            );
        }
        class W {
            constructor() {
                (this.heap = []), (this.pushCount = Number.MIN_SAFE_INTEGER);
            }
            get length() {
                return this.heap.length;
            }
            empty() {
                return (this.heap = []), this;
            }
            percUp(e) {
                let t;
                for (; e > 0 && H(this.heap[e], this.heap[(t = G(e))]); ) {
                    let n = this.heap[e];
                    (this.heap[e] = this.heap[t]), (this.heap[t] = n), (e = t);
                }
            }
            percDown(e) {
                let t;
                for (
                    ;
                    (t = 1 + (e << 1)) < this.heap.length &&
                    (t + 1 < this.heap.length && H(this.heap[t + 1], this.heap[t]) && (t += 1),
                    !H(this.heap[e], this.heap[t]));

                ) {
                    let n = this.heap[e];
                    (this.heap[e] = this.heap[t]), (this.heap[t] = n), (e = t);
                }
            }
            push(e) {
                (e.pushCount = ++this.pushCount),
                    this.heap.push(e),
                    this.percUp(this.heap.length - 1);
            }
            unshift(e) {
                return this.heap.push(e);
            }
            shift() {
                let [e] = this.heap;
                return (
                    (this.heap[0] = this.heap[this.heap.length - 1]),
                    this.heap.pop(),
                    this.percDown(0),
                    e
                );
            }
            toArray() {
                return [...this];
            }
            *[Symbol.iterator]() {
                for (let e = 0; e < this.heap.length; e++) yield this.heap[e].data;
            }
            remove(e) {
                let t = 0;
                for (let n = 0; n < this.heap.length; n++)
                    e(this.heap[n]) || ((this.heap[t] = this.heap[n]), t++);
                this.heap.splice(t);
                for (let e = G(this.heap.length - 1); e >= 0; e--) this.percDown(e);
                return this;
            }
        }
        function G(e) {
            return ((e + 1) >> 1) - 1;
        }
        function H(e, t) {
            return e.priority !== t.priority ? e.priority < t.priority : e.pushCount < t.pushCount;
        }
        function J(e, t) {
            var n = Q(e, t);
            return (
                (n._tasks = new W()),
                (n.push = function (e, t = 0, i = () => {}) {
                    if ('function' != typeof i) throw new Error('task callback must be a function');
                    if (
                        ((n.started = !0),
                        Array.isArray(e) || (e = [e]),
                        0 === e.length && n.idle())
                    )
                        return c(() => n.drain());
                    for (var s = 0, r = e.length; s < r; s++) {
                        var a = { data: e[s], priority: t, callback: i };
                        n._tasks.push(a);
                    }
                    c(n.process);
                }),
                delete n.unshift,
                n
            );
        }
        f(function (e, t) {
            if (((t = v(t)), !Array.isArray(e)))
                return t(new TypeError('First argument to race must be an array of functions'));
            if (!e.length) return t();
            for (var n = 0, i = e.length; n < i; n++) h(e[n])(t);
        }, 2);
        function Y(e, t, n, i) {
            const s = h(n);
            return $(
                e,
                t,
                (e, t) => {
                    s(e, (e, n) => {
                        t(e, !n);
                    });
                },
                i
            );
        }
        f(function (e, t, n) {
            return Y(O, e, t, n);
        }, 3);
        f(function (e, t, n, i) {
            return Y(j(t), e, n, i);
        }, 4);
        f(function (e, t, n) {
            return Y(E, e, t, n);
        }, 3);
        f(function (e, t, n) {
            return P(Boolean, e => e)(O, e, t, n);
        }, 3);
        f(function (e, t, n, i) {
            return P(Boolean, e => e)(j(t), e, n, i);
        }, 4);
        f(function (e, t, n) {
            return P(Boolean, e => e)(E, e, t, n);
        }, 3);
        f(function (e, t, n) {
            var i = h(t);
            return I(
                e,
                (e, t) => {
                    i(e, (n, i) => {
                        if (n) return t(n);
                        t(n, { value: e, criteria: i });
                    });
                },
                (e, t) => {
                    if (e) return n(e);
                    n(
                        null,
                        t.sort(s).map(e => e.value)
                    );
                }
            );
            function s(e, t) {
                var n = e.criteria,
                    i = t.criteria;
                return n < i ? -1 : n > i ? 1 : 0;
            }
        }, 3);
        f(function (e, t) {
            var n,
                i = null;
            return B(
                e,
                (e, t) => {
                    h(e)((e, ...s) => {
                        if (!1 === e) return t(e);
                        s.length < 2 ? ([n] = s) : (n = s), (i = e), t(e ? null : {});
                    });
                },
                () => t(i, n)
            );
        });
        f(function (e, t, n) {
            n = _(n);
            var i = h(t),
                s = h(e),
                r = [];
            function a(e, ...t) {
                if (e) return n(e);
                (r = t), !1 !== e && s(o);
            }
            function o(e, t) {
                return e ? n(e) : !1 !== e ? (t ? void i(a) : n(null, ...r)) : void 0;
            }
            return s(o);
        }, 3);
        f(function (e, t) {
            if (((t = v(t)), !Array.isArray(e)))
                return t(new Error('First argument to waterfall must be an array of functions'));
            if (!e.length) return t();
            var n = 0;
            function i(t) {
                h(e[n++])(...t, _(s));
            }
            function s(s, ...r) {
                if (!1 !== s) return s || n === e.length ? t(s, ...r) : void i(r);
            }
            i([]);
        });
    },
    function (e, t, n) {
        'use strict';
        (function (e) {
            /*!
             * The buffer module from node.js, for the browser.
             *
             * @author   Feross Aboukhadijeh <http://feross.org>
             * @license  MIT
             */
            var i = n(22),
                s = n(23),
                r = n(14);
            function a() {
                return c.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
            }
            function o(e, t) {
                if (a() < t) throw new RangeError('Invalid typed array length');
                return (
                    c.TYPED_ARRAY_SUPPORT
                        ? ((e = new Uint8Array(t)).__proto__ = c.prototype)
                        : (null === e && (e = new c(t)), (e.length = t)),
                    e
                );
            }
            function c(e, t, n) {
                if (!(c.TYPED_ARRAY_SUPPORT || this instanceof c)) return new c(e, t, n);
                if ('number' == typeof e) {
                    if ('string' == typeof t)
                        throw new Error(
                            'If encoding is specified then the first argument must be a string'
                        );
                    return p(this, e);
                }
                return l(this, e, t, n);
            }
            function l(e, t, n, i) {
                if ('number' == typeof t)
                    throw new TypeError('"value" argument must not be a number');
                return 'undefined' != typeof ArrayBuffer && t instanceof ArrayBuffer
                    ? (function (e, t, n, i) {
                          if ((t.byteLength, n < 0 || t.byteLength < n))
                              throw new RangeError("'offset' is out of bounds");
                          if (t.byteLength < n + (i || 0))
                              throw new RangeError("'length' is out of bounds");
                          t =
                              void 0 === n && void 0 === i
                                  ? new Uint8Array(t)
                                  : void 0 === i
                                  ? new Uint8Array(t, n)
                                  : new Uint8Array(t, n, i);
                          c.TYPED_ARRAY_SUPPORT ? ((e = t).__proto__ = c.prototype) : (e = d(e, t));
                          return e;
                      })(e, t, n, i)
                    : 'string' == typeof t
                    ? (function (e, t, n) {
                          ('string' == typeof n && '' !== n) || (n = 'utf8');
                          if (!c.isEncoding(n))
                              throw new TypeError('"encoding" must be a valid string encoding');
                          var i = 0 | f(t, n),
                              s = (e = o(e, i)).write(t, n);
                          s !== i && (e = e.slice(0, s));
                          return e;
                      })(e, t, n)
                    : (function (e, t) {
                          if (c.isBuffer(t)) {
                              var n = 0 | h(t.length);
                              return 0 === (e = o(e, n)).length || t.copy(e, 0, 0, n), e;
                          }
                          if (t) {
                              if (
                                  ('undefined' != typeof ArrayBuffer &&
                                      t.buffer instanceof ArrayBuffer) ||
                                  'length' in t
                              )
                                  return 'number' != typeof t.length || (i = t.length) != i
                                      ? o(e, 0)
                                      : d(e, t);
                              if ('Buffer' === t.type && r(t.data)) return d(e, t.data);
                          }
                          var i;
                          throw new TypeError(
                              'First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.'
                          );
                      })(e, t);
            }
            function u(e) {
                if ('number' != typeof e) throw new TypeError('"size" argument must be a number');
                if (e < 0) throw new RangeError('"size" argument must not be negative');
            }
            function p(e, t) {
                if ((u(t), (e = o(e, t < 0 ? 0 : 0 | h(t))), !c.TYPED_ARRAY_SUPPORT))
                    for (var n = 0; n < t; ++n) e[n] = 0;
                return e;
            }
            function d(e, t) {
                var n = t.length < 0 ? 0 : 0 | h(t.length);
                e = o(e, n);
                for (var i = 0; i < n; i += 1) e[i] = 255 & t[i];
                return e;
            }
            function h(e) {
                if (e >= a())
                    throw new RangeError(
                        'Attempt to allocate Buffer larger than maximum size: 0x' +
                            a().toString(16) +
                            ' bytes'
                    );
                return 0 | e;
            }
            function f(e, t) {
                if (c.isBuffer(e)) return e.length;
                if (
                    'undefined' != typeof ArrayBuffer &&
                    'function' == typeof ArrayBuffer.isView &&
                    (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)
                )
                    return e.byteLength;
                'string' != typeof e && (e = '' + e);
                var n = e.length;
                if (0 === n) return 0;
                for (var i = !1; ; )
                    switch (t) {
                        case 'ascii':
                        case 'latin1':
                        case 'binary':
                            return n;
                        case 'utf8':
                        case 'utf-8':
                        case void 0:
                            return B(e).length;
                        case 'ucs2':
                        case 'ucs-2':
                        case 'utf16le':
                        case 'utf-16le':
                            return 2 * n;
                        case 'hex':
                            return n >>> 1;
                        case 'base64':
                            return U(e).length;
                        default:
                            if (i) return B(e).length;
                            (t = ('' + t).toLowerCase()), (i = !0);
                    }
            }
            function m(e, t, n) {
                var i = !1;
                if (((void 0 === t || t < 0) && (t = 0), t > this.length)) return '';
                if (((void 0 === n || n > this.length) && (n = this.length), n <= 0)) return '';
                if ((n >>>= 0) <= (t >>>= 0)) return '';
                for (e || (e = 'utf8'); ; )
                    switch (e) {
                        case 'hex':
                            return E(this, t, n);
                        case 'utf8':
                        case 'utf-8':
                            return T(this, t, n);
                        case 'ascii':
                            return O(this, t, n);
                        case 'latin1':
                        case 'binary':
                            return I(this, t, n);
                        case 'base64':
                            return k(this, t, n);
                        case 'ucs2':
                        case 'ucs-2':
                        case 'utf16le':
                        case 'utf-16le':
                            return C(this, t, n);
                        default:
                            if (i) throw new TypeError('Unknown encoding: ' + e);
                            (e = (e + '').toLowerCase()), (i = !0);
                    }
            }
            function g(e, t, n) {
                var i = e[t];
                (e[t] = e[n]), (e[n] = i);
            }
            function b(e, t, n, i, s) {
                if (0 === e.length) return -1;
                if (
                    ('string' == typeof n
                        ? ((i = n), (n = 0))
                        : n > 2147483647
                        ? (n = 2147483647)
                        : n < -2147483648 && (n = -2147483648),
                    (n = +n),
                    isNaN(n) && (n = s ? 0 : e.length - 1),
                    n < 0 && (n = e.length + n),
                    n >= e.length)
                ) {
                    if (s) return -1;
                    n = e.length - 1;
                } else if (n < 0) {
                    if (!s) return -1;
                    n = 0;
                }
                if (('string' == typeof t && (t = c.from(t, i)), c.isBuffer(t)))
                    return 0 === t.length ? -1 : y(e, t, n, i, s);
                if ('number' == typeof t)
                    return (
                        (t &= 255),
                        c.TYPED_ARRAY_SUPPORT && 'function' == typeof Uint8Array.prototype.indexOf
                            ? s
                                ? Uint8Array.prototype.indexOf.call(e, t, n)
                                : Uint8Array.prototype.lastIndexOf.call(e, t, n)
                            : y(e, [t], n, i, s)
                    );
                throw new TypeError('val must be string, number or Buffer');
            }
            function y(e, t, n, i, s) {
                var r,
                    a = 1,
                    o = e.length,
                    c = t.length;
                if (
                    void 0 !== i &&
                    ('ucs2' === (i = String(i).toLowerCase()) ||
                        'ucs-2' === i ||
                        'utf16le' === i ||
                        'utf-16le' === i)
                ) {
                    if (e.length < 2 || t.length < 2) return -1;
                    (a = 2), (o /= 2), (c /= 2), (n /= 2);
                }
                function l(e, t) {
                    return 1 === a ? e[t] : e.readUInt16BE(t * a);
                }
                if (s) {
                    var u = -1;
                    for (r = n; r < o; r++)
                        if (l(e, r) === l(t, -1 === u ? 0 : r - u)) {
                            if ((-1 === u && (u = r), r - u + 1 === c)) return u * a;
                        } else -1 !== u && (r -= r - u), (u = -1);
                } else
                    for (n + c > o && (n = o - c), r = n; r >= 0; r--) {
                        for (var p = !0, d = 0; d < c; d++)
                            if (l(e, r + d) !== l(t, d)) {
                                p = !1;
                                break;
                            }
                        if (p) return r;
                    }
                return -1;
            }
            function v(e, t, n, i) {
                n = Number(n) || 0;
                var s = e.length - n;
                i ? (i = Number(i)) > s && (i = s) : (i = s);
                var r = t.length;
                if (r % 2 != 0) throw new TypeError('Invalid hex string');
                i > r / 2 && (i = r / 2);
                for (var a = 0; a < i; ++a) {
                    var o = parseInt(t.substr(2 * a, 2), 16);
                    if (isNaN(o)) return a;
                    e[n + a] = o;
                }
                return a;
            }
            function w(e, t, n, i) {
                return z(B(t, e.length - n), e, n, i);
            }
            function _(e, t, n, i) {
                return z(
                    (function (e) {
                        for (var t = [], n = 0; n < e.length; ++n) t.push(255 & e.charCodeAt(n));
                        return t;
                    })(t),
                    e,
                    n,
                    i
                );
            }
            function x(e, t, n, i) {
                return _(e, t, n, i);
            }
            function j(e, t, n, i) {
                return z(U(t), e, n, i);
            }
            function S(e, t, n, i) {
                return z(
                    (function (e, t) {
                        for (var n, i, s, r = [], a = 0; a < e.length && !((t -= 2) < 0); ++a)
                            (n = e.charCodeAt(a)),
                                (i = n >> 8),
                                (s = n % 256),
                                r.push(s),
                                r.push(i);
                        return r;
                    })(t, e.length - n),
                    e,
                    n,
                    i
                );
            }
            function k(e, t, n) {
                return 0 === t && n === e.length
                    ? i.fromByteArray(e)
                    : i.fromByteArray(e.slice(t, n));
            }
            function T(e, t, n) {
                n = Math.min(e.length, n);
                for (var i = [], s = t; s < n; ) {
                    var r,
                        a,
                        o,
                        c,
                        l = e[s],
                        u = null,
                        p = l > 239 ? 4 : l > 223 ? 3 : l > 191 ? 2 : 1;
                    if (s + p <= n)
                        switch (p) {
                            case 1:
                                l < 128 && (u = l);
                                break;
                            case 2:
                                128 == (192 & (r = e[s + 1])) &&
                                    (c = ((31 & l) << 6) | (63 & r)) > 127 &&
                                    (u = c);
                                break;
                            case 3:
                                (r = e[s + 1]),
                                    (a = e[s + 2]),
                                    128 == (192 & r) &&
                                        128 == (192 & a) &&
                                        (c = ((15 & l) << 12) | ((63 & r) << 6) | (63 & a)) >
                                            2047 &&
                                        (c < 55296 || c > 57343) &&
                                        (u = c);
                                break;
                            case 4:
                                (r = e[s + 1]),
                                    (a = e[s + 2]),
                                    (o = e[s + 3]),
                                    128 == (192 & r) &&
                                        128 == (192 & a) &&
                                        128 == (192 & o) &&
                                        (c =
                                            ((15 & l) << 18) |
                                            ((63 & r) << 12) |
                                            ((63 & a) << 6) |
                                            (63 & o)) > 65535 &&
                                        c < 1114112 &&
                                        (u = c);
                        }
                    null === u
                        ? ((u = 65533), (p = 1))
                        : u > 65535 &&
                          ((u -= 65536),
                          i.push(((u >>> 10) & 1023) | 55296),
                          (u = 56320 | (1023 & u))),
                        i.push(u),
                        (s += p);
                }
                return (function (e) {
                    var t = e.length;
                    if (t <= 4096) return String.fromCharCode.apply(String, e);
                    var n = '',
                        i = 0;
                    for (; i < t; ) n += String.fromCharCode.apply(String, e.slice(i, (i += 4096)));
                    return n;
                })(i);
            }
            (t.Buffer = c),
                (t.SlowBuffer = function (e) {
                    +e != e && (e = 0);
                    return c.alloc(+e);
                }),
                (t.INSPECT_MAX_BYTES = 50),
                (c.TYPED_ARRAY_SUPPORT =
                    void 0 !== e.TYPED_ARRAY_SUPPORT
                        ? e.TYPED_ARRAY_SUPPORT
                        : (function () {
                              try {
                                  var e = new Uint8Array(1);
                                  return (
                                      (e.__proto__ = {
                                          __proto__: Uint8Array.prototype,
                                          foo: function () {
                                              return 42;
                                          }
                                      }),
                                      42 === e.foo() &&
                                          'function' == typeof e.subarray &&
                                          0 === e.subarray(1, 1).byteLength
                                  );
                              } catch (e) {
                                  return !1;
                              }
                          })()),
                (t.kMaxLength = a()),
                (c.poolSize = 8192),
                (c._augment = function (e) {
                    return (e.__proto__ = c.prototype), e;
                }),
                (c.from = function (e, t, n) {
                    return l(null, e, t, n);
                }),
                c.TYPED_ARRAY_SUPPORT &&
                    ((c.prototype.__proto__ = Uint8Array.prototype),
                    (c.__proto__ = Uint8Array),
                    'undefined' != typeof Symbol &&
                        Symbol.species &&
                        c[Symbol.species] === c &&
                        Object.defineProperty(c, Symbol.species, {
                            value: null,
                            configurable: !0
                        })),
                (c.alloc = function (e, t, n) {
                    return (function (e, t, n, i) {
                        return (
                            u(t),
                            t <= 0
                                ? o(e, t)
                                : void 0 !== n
                                ? 'string' == typeof i
                                    ? o(e, t).fill(n, i)
                                    : o(e, t).fill(n)
                                : o(e, t)
                        );
                    })(null, e, t, n);
                }),
                (c.allocUnsafe = function (e) {
                    return p(null, e);
                }),
                (c.allocUnsafeSlow = function (e) {
                    return p(null, e);
                }),
                (c.isBuffer = function (e) {
                    return !(null == e || !e._isBuffer);
                }),
                (c.compare = function (e, t) {
                    if (!c.isBuffer(e) || !c.isBuffer(t))
                        throw new TypeError('Arguments must be Buffers');
                    if (e === t) return 0;
                    for (var n = e.length, i = t.length, s = 0, r = Math.min(n, i); s < r; ++s)
                        if (e[s] !== t[s]) {
                            (n = e[s]), (i = t[s]);
                            break;
                        }
                    return n < i ? -1 : i < n ? 1 : 0;
                }),
                (c.isEncoding = function (e) {
                    switch (String(e).toLowerCase()) {
                        case 'hex':
                        case 'utf8':
                        case 'utf-8':
                        case 'ascii':
                        case 'latin1':
                        case 'binary':
                        case 'base64':
                        case 'ucs2':
                        case 'ucs-2':
                        case 'utf16le':
                        case 'utf-16le':
                            return !0;
                        default:
                            return !1;
                    }
                }),
                (c.concat = function (e, t) {
                    if (!r(e)) throw new TypeError('"list" argument must be an Array of Buffers');
                    if (0 === e.length) return c.alloc(0);
                    var n;
                    if (void 0 === t) for (t = 0, n = 0; n < e.length; ++n) t += e[n].length;
                    var i = c.allocUnsafe(t),
                        s = 0;
                    for (n = 0; n < e.length; ++n) {
                        var a = e[n];
                        if (!c.isBuffer(a))
                            throw new TypeError('"list" argument must be an Array of Buffers');
                        a.copy(i, s), (s += a.length);
                    }
                    return i;
                }),
                (c.byteLength = f),
                (c.prototype._isBuffer = !0),
                (c.prototype.swap16 = function () {
                    var e = this.length;
                    if (e % 2 != 0)
                        throw new RangeError('Buffer size must be a multiple of 16-bits');
                    for (var t = 0; t < e; t += 2) g(this, t, t + 1);
                    return this;
                }),
                (c.prototype.swap32 = function () {
                    var e = this.length;
                    if (e % 4 != 0)
                        throw new RangeError('Buffer size must be a multiple of 32-bits');
                    for (var t = 0; t < e; t += 4) g(this, t, t + 3), g(this, t + 1, t + 2);
                    return this;
                }),
                (c.prototype.swap64 = function () {
                    var e = this.length;
                    if (e % 8 != 0)
                        throw new RangeError('Buffer size must be a multiple of 64-bits');
                    for (var t = 0; t < e; t += 8)
                        g(this, t, t + 7),
                            g(this, t + 1, t + 6),
                            g(this, t + 2, t + 5),
                            g(this, t + 3, t + 4);
                    return this;
                }),
                (c.prototype.toString = function () {
                    var e = 0 | this.length;
                    return 0 === e
                        ? ''
                        : 0 === arguments.length
                        ? T(this, 0, e)
                        : m.apply(this, arguments);
                }),
                (c.prototype.equals = function (e) {
                    if (!c.isBuffer(e)) throw new TypeError('Argument must be a Buffer');
                    return this === e || 0 === c.compare(this, e);
                }),
                (c.prototype.inspect = function () {
                    var e = '',
                        n = t.INSPECT_MAX_BYTES;
                    return (
                        this.length > 0 &&
                            ((e = this.toString('hex', 0, n).match(/.{2}/g).join(' ')),
                            this.length > n && (e += ' ... ')),
                        '<Buffer ' + e + '>'
                    );
                }),
                (c.prototype.compare = function (e, t, n, i, s) {
                    if (!c.isBuffer(e)) throw new TypeError('Argument must be a Buffer');
                    if (
                        (void 0 === t && (t = 0),
                        void 0 === n && (n = e ? e.length : 0),
                        void 0 === i && (i = 0),
                        void 0 === s && (s = this.length),
                        t < 0 || n > e.length || i < 0 || s > this.length)
                    )
                        throw new RangeError('out of range index');
                    if (i >= s && t >= n) return 0;
                    if (i >= s) return -1;
                    if (t >= n) return 1;
                    if (this === e) return 0;
                    for (
                        var r = (s >>>= 0) - (i >>>= 0),
                            a = (n >>>= 0) - (t >>>= 0),
                            o = Math.min(r, a),
                            l = this.slice(i, s),
                            u = e.slice(t, n),
                            p = 0;
                        p < o;
                        ++p
                    )
                        if (l[p] !== u[p]) {
                            (r = l[p]), (a = u[p]);
                            break;
                        }
                    return r < a ? -1 : a < r ? 1 : 0;
                }),
                (c.prototype.includes = function (e, t, n) {
                    return -1 !== this.indexOf(e, t, n);
                }),
                (c.prototype.indexOf = function (e, t, n) {
                    return b(this, e, t, n, !0);
                }),
                (c.prototype.lastIndexOf = function (e, t, n) {
                    return b(this, e, t, n, !1);
                }),
                (c.prototype.write = function (e, t, n, i) {
                    if (void 0 === t) (i = 'utf8'), (n = this.length), (t = 0);
                    else if (void 0 === n && 'string' == typeof t)
                        (i = t), (n = this.length), (t = 0);
                    else {
                        if (!isFinite(t))
                            throw new Error(
                                'Buffer.write(string, encoding, offset[, length]) is no longer supported'
                            );
                        (t |= 0),
                            isFinite(n)
                                ? ((n |= 0), void 0 === i && (i = 'utf8'))
                                : ((i = n), (n = void 0));
                    }
                    var s = this.length - t;
                    if (
                        ((void 0 === n || n > s) && (n = s),
                        (e.length > 0 && (n < 0 || t < 0)) || t > this.length)
                    )
                        throw new RangeError('Attempt to write outside buffer bounds');
                    i || (i = 'utf8');
                    for (var r = !1; ; )
                        switch (i) {
                            case 'hex':
                                return v(this, e, t, n);
                            case 'utf8':
                            case 'utf-8':
                                return w(this, e, t, n);
                            case 'ascii':
                                return _(this, e, t, n);
                            case 'latin1':
                            case 'binary':
                                return x(this, e, t, n);
                            case 'base64':
                                return j(this, e, t, n);
                            case 'ucs2':
                            case 'ucs-2':
                            case 'utf16le':
                            case 'utf-16le':
                                return S(this, e, t, n);
                            default:
                                if (r) throw new TypeError('Unknown encoding: ' + i);
                                (i = ('' + i).toLowerCase()), (r = !0);
                        }
                }),
                (c.prototype.toJSON = function () {
                    return {
                        type: 'Buffer',
                        data: Array.prototype.slice.call(this._arr || this, 0)
                    };
                });
            function O(e, t, n) {
                var i = '';
                n = Math.min(e.length, n);
                for (var s = t; s < n; ++s) i += String.fromCharCode(127 & e[s]);
                return i;
            }
            function I(e, t, n) {
                var i = '';
                n = Math.min(e.length, n);
                for (var s = t; s < n; ++s) i += String.fromCharCode(e[s]);
                return i;
            }
            function E(e, t, n) {
                var i = e.length;
                (!t || t < 0) && (t = 0), (!n || n < 0 || n > i) && (n = i);
                for (var s = '', r = t; r < n; ++r) s += D(e[r]);
                return s;
            }
            function C(e, t, n) {
                for (var i = e.slice(t, n), s = '', r = 0; r < i.length; r += 2)
                    s += String.fromCharCode(i[r] + 256 * i[r + 1]);
                return s;
            }
            function R(e, t, n) {
                if (e % 1 != 0 || e < 0) throw new RangeError('offset is not uint');
                if (e + t > n) throw new RangeError('Trying to access beyond buffer length');
            }
            function N(e, t, n, i, s, r) {
                if (!c.isBuffer(e))
                    throw new TypeError('"buffer" argument must be a Buffer instance');
                if (t > s || t < r) throw new RangeError('"value" argument is out of bounds');
                if (n + i > e.length) throw new RangeError('Index out of range');
            }
            function q(e, t, n, i) {
                t < 0 && (t = 65535 + t + 1);
                for (var s = 0, r = Math.min(e.length - n, 2); s < r; ++s)
                    e[n + s] = (t & (255 << (8 * (i ? s : 1 - s)))) >>> (8 * (i ? s : 1 - s));
            }
            function A(e, t, n, i) {
                t < 0 && (t = 4294967295 + t + 1);
                for (var s = 0, r = Math.min(e.length - n, 4); s < r; ++s)
                    e[n + s] = (t >>> (8 * (i ? s : 3 - s))) & 255;
            }
            function F(e, t, n, i, s, r) {
                if (n + i > e.length) throw new RangeError('Index out of range');
                if (n < 0) throw new RangeError('Index out of range');
            }
            function P(e, t, n, i, r) {
                return r || F(e, 0, n, 4), s.write(e, t, n, i, 23, 4), n + 4;
            }
            function L(e, t, n, i, r) {
                return r || F(e, 0, n, 8), s.write(e, t, n, i, 52, 8), n + 8;
            }
            (c.prototype.slice = function (e, t) {
                var n,
                    i = this.length;
                if (
                    ((e = ~~e) < 0 ? (e += i) < 0 && (e = 0) : e > i && (e = i),
                    (t = void 0 === t ? i : ~~t) < 0 ? (t += i) < 0 && (t = 0) : t > i && (t = i),
                    t < e && (t = e),
                    c.TYPED_ARRAY_SUPPORT)
                )
                    (n = this.subarray(e, t)).__proto__ = c.prototype;
                else {
                    var s = t - e;
                    n = new c(s, void 0);
                    for (var r = 0; r < s; ++r) n[r] = this[r + e];
                }
                return n;
            }),
                (c.prototype.readUIntLE = function (e, t, n) {
                    (e |= 0), (t |= 0), n || R(e, t, this.length);
                    for (var i = this[e], s = 1, r = 0; ++r < t && (s *= 256); )
                        i += this[e + r] * s;
                    return i;
                }),
                (c.prototype.readUIntBE = function (e, t, n) {
                    (e |= 0), (t |= 0), n || R(e, t, this.length);
                    for (var i = this[e + --t], s = 1; t > 0 && (s *= 256); )
                        i += this[e + --t] * s;
                    return i;
                }),
                (c.prototype.readUInt8 = function (e, t) {
                    return t || R(e, 1, this.length), this[e];
                }),
                (c.prototype.readUInt16LE = function (e, t) {
                    return t || R(e, 2, this.length), this[e] | (this[e + 1] << 8);
                }),
                (c.prototype.readUInt16BE = function (e, t) {
                    return t || R(e, 2, this.length), (this[e] << 8) | this[e + 1];
                }),
                (c.prototype.readUInt32LE = function (e, t) {
                    return (
                        t || R(e, 4, this.length),
                        (this[e] | (this[e + 1] << 8) | (this[e + 2] << 16)) +
                            16777216 * this[e + 3]
                    );
                }),
                (c.prototype.readUInt32BE = function (e, t) {
                    return (
                        t || R(e, 4, this.length),
                        16777216 * this[e] +
                            ((this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3])
                    );
                }),
                (c.prototype.readIntLE = function (e, t, n) {
                    (e |= 0), (t |= 0), n || R(e, t, this.length);
                    for (var i = this[e], s = 1, r = 0; ++r < t && (s *= 256); )
                        i += this[e + r] * s;
                    return i >= (s *= 128) && (i -= Math.pow(2, 8 * t)), i;
                }),
                (c.prototype.readIntBE = function (e, t, n) {
                    (e |= 0), (t |= 0), n || R(e, t, this.length);
                    for (var i = t, s = 1, r = this[e + --i]; i > 0 && (s *= 256); )
                        r += this[e + --i] * s;
                    return r >= (s *= 128) && (r -= Math.pow(2, 8 * t)), r;
                }),
                (c.prototype.readInt8 = function (e, t) {
                    return (
                        t || R(e, 1, this.length),
                        128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
                    );
                }),
                (c.prototype.readInt16LE = function (e, t) {
                    t || R(e, 2, this.length);
                    var n = this[e] | (this[e + 1] << 8);
                    return 32768 & n ? 4294901760 | n : n;
                }),
                (c.prototype.readInt16BE = function (e, t) {
                    t || R(e, 2, this.length);
                    var n = this[e + 1] | (this[e] << 8);
                    return 32768 & n ? 4294901760 | n : n;
                }),
                (c.prototype.readInt32LE = function (e, t) {
                    return (
                        t || R(e, 4, this.length),
                        this[e] | (this[e + 1] << 8) | (this[e + 2] << 16) | (this[e + 3] << 24)
                    );
                }),
                (c.prototype.readInt32BE = function (e, t) {
                    return (
                        t || R(e, 4, this.length),
                        (this[e] << 24) | (this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3]
                    );
                }),
                (c.prototype.readFloatLE = function (e, t) {
                    return t || R(e, 4, this.length), s.read(this, e, !0, 23, 4);
                }),
                (c.prototype.readFloatBE = function (e, t) {
                    return t || R(e, 4, this.length), s.read(this, e, !1, 23, 4);
                }),
                (c.prototype.readDoubleLE = function (e, t) {
                    return t || R(e, 8, this.length), s.read(this, e, !0, 52, 8);
                }),
                (c.prototype.readDoubleBE = function (e, t) {
                    return t || R(e, 8, this.length), s.read(this, e, !1, 52, 8);
                }),
                (c.prototype.writeUIntLE = function (e, t, n, i) {
                    ((e = +e), (t |= 0), (n |= 0), i) ||
                        N(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
                    var s = 1,
                        r = 0;
                    for (this[t] = 255 & e; ++r < n && (s *= 256); ) this[t + r] = (e / s) & 255;
                    return t + n;
                }),
                (c.prototype.writeUIntBE = function (e, t, n, i) {
                    ((e = +e), (t |= 0), (n |= 0), i) ||
                        N(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
                    var s = n - 1,
                        r = 1;
                    for (this[t + s] = 255 & e; --s >= 0 && (r *= 256); )
                        this[t + s] = (e / r) & 255;
                    return t + n;
                }),
                (c.prototype.writeUInt8 = function (e, t, n) {
                    return (
                        (e = +e),
                        (t |= 0),
                        n || N(this, e, t, 1, 255, 0),
                        c.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
                        (this[t] = 255 & e),
                        t + 1
                    );
                }),
                (c.prototype.writeUInt16LE = function (e, t, n) {
                    return (
                        (e = +e),
                        (t |= 0),
                        n || N(this, e, t, 2, 65535, 0),
                        c.TYPED_ARRAY_SUPPORT
                            ? ((this[t] = 255 & e), (this[t + 1] = e >>> 8))
                            : q(this, e, t, !0),
                        t + 2
                    );
                }),
                (c.prototype.writeUInt16BE = function (e, t, n) {
                    return (
                        (e = +e),
                        (t |= 0),
                        n || N(this, e, t, 2, 65535, 0),
                        c.TYPED_ARRAY_SUPPORT
                            ? ((this[t] = e >>> 8), (this[t + 1] = 255 & e))
                            : q(this, e, t, !1),
                        t + 2
                    );
                }),
                (c.prototype.writeUInt32LE = function (e, t, n) {
                    return (
                        (e = +e),
                        (t |= 0),
                        n || N(this, e, t, 4, 4294967295, 0),
                        c.TYPED_ARRAY_SUPPORT
                            ? ((this[t + 3] = e >>> 24),
                              (this[t + 2] = e >>> 16),
                              (this[t + 1] = e >>> 8),
                              (this[t] = 255 & e))
                            : A(this, e, t, !0),
                        t + 4
                    );
                }),
                (c.prototype.writeUInt32BE = function (e, t, n) {
                    return (
                        (e = +e),
                        (t |= 0),
                        n || N(this, e, t, 4, 4294967295, 0),
                        c.TYPED_ARRAY_SUPPORT
                            ? ((this[t] = e >>> 24),
                              (this[t + 1] = e >>> 16),
                              (this[t + 2] = e >>> 8),
                              (this[t + 3] = 255 & e))
                            : A(this, e, t, !1),
                        t + 4
                    );
                }),
                (c.prototype.writeIntLE = function (e, t, n, i) {
                    if (((e = +e), (t |= 0), !i)) {
                        var s = Math.pow(2, 8 * n - 1);
                        N(this, e, t, n, s - 1, -s);
                    }
                    var r = 0,
                        a = 1,
                        o = 0;
                    for (this[t] = 255 & e; ++r < n && (a *= 256); )
                        e < 0 && 0 === o && 0 !== this[t + r - 1] && (o = 1),
                            (this[t + r] = (((e / a) >> 0) - o) & 255);
                    return t + n;
                }),
                (c.prototype.writeIntBE = function (e, t, n, i) {
                    if (((e = +e), (t |= 0), !i)) {
                        var s = Math.pow(2, 8 * n - 1);
                        N(this, e, t, n, s - 1, -s);
                    }
                    var r = n - 1,
                        a = 1,
                        o = 0;
                    for (this[t + r] = 255 & e; --r >= 0 && (a *= 256); )
                        e < 0 && 0 === o && 0 !== this[t + r + 1] && (o = 1),
                            (this[t + r] = (((e / a) >> 0) - o) & 255);
                    return t + n;
                }),
                (c.prototype.writeInt8 = function (e, t, n) {
                    return (
                        (e = +e),
                        (t |= 0),
                        n || N(this, e, t, 1, 127, -128),
                        c.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
                        e < 0 && (e = 255 + e + 1),
                        (this[t] = 255 & e),
                        t + 1
                    );
                }),
                (c.prototype.writeInt16LE = function (e, t, n) {
                    return (
                        (e = +e),
                        (t |= 0),
                        n || N(this, e, t, 2, 32767, -32768),
                        c.TYPED_ARRAY_SUPPORT
                            ? ((this[t] = 255 & e), (this[t + 1] = e >>> 8))
                            : q(this, e, t, !0),
                        t + 2
                    );
                }),
                (c.prototype.writeInt16BE = function (e, t, n) {
                    return (
                        (e = +e),
                        (t |= 0),
                        n || N(this, e, t, 2, 32767, -32768),
                        c.TYPED_ARRAY_SUPPORT
                            ? ((this[t] = e >>> 8), (this[t + 1] = 255 & e))
                            : q(this, e, t, !1),
                        t + 2
                    );
                }),
                (c.prototype.writeInt32LE = function (e, t, n) {
                    return (
                        (e = +e),
                        (t |= 0),
                        n || N(this, e, t, 4, 2147483647, -2147483648),
                        c.TYPED_ARRAY_SUPPORT
                            ? ((this[t] = 255 & e),
                              (this[t + 1] = e >>> 8),
                              (this[t + 2] = e >>> 16),
                              (this[t + 3] = e >>> 24))
                            : A(this, e, t, !0),
                        t + 4
                    );
                }),
                (c.prototype.writeInt32BE = function (e, t, n) {
                    return (
                        (e = +e),
                        (t |= 0),
                        n || N(this, e, t, 4, 2147483647, -2147483648),
                        e < 0 && (e = 4294967295 + e + 1),
                        c.TYPED_ARRAY_SUPPORT
                            ? ((this[t] = e >>> 24),
                              (this[t + 1] = e >>> 16),
                              (this[t + 2] = e >>> 8),
                              (this[t + 3] = 255 & e))
                            : A(this, e, t, !1),
                        t + 4
                    );
                }),
                (c.prototype.writeFloatLE = function (e, t, n) {
                    return P(this, e, t, !0, n);
                }),
                (c.prototype.writeFloatBE = function (e, t, n) {
                    return P(this, e, t, !1, n);
                }),
                (c.prototype.writeDoubleLE = function (e, t, n) {
                    return L(this, e, t, !0, n);
                }),
                (c.prototype.writeDoubleBE = function (e, t, n) {
                    return L(this, e, t, !1, n);
                }),
                (c.prototype.copy = function (e, t, n, i) {
                    if (
                        (n || (n = 0),
                        i || 0 === i || (i = this.length),
                        t >= e.length && (t = e.length),
                        t || (t = 0),
                        i > 0 && i < n && (i = n),
                        i === n)
                    )
                        return 0;
                    if (0 === e.length || 0 === this.length) return 0;
                    if (t < 0) throw new RangeError('targetStart out of bounds');
                    if (n < 0 || n >= this.length)
                        throw new RangeError('sourceStart out of bounds');
                    if (i < 0) throw new RangeError('sourceEnd out of bounds');
                    i > this.length && (i = this.length),
                        e.length - t < i - n && (i = e.length - t + n);
                    var s,
                        r = i - n;
                    if (this === e && n < t && t < i)
                        for (s = r - 1; s >= 0; --s) e[s + t] = this[s + n];
                    else if (r < 1e3 || !c.TYPED_ARRAY_SUPPORT)
                        for (s = 0; s < r; ++s) e[s + t] = this[s + n];
                    else Uint8Array.prototype.set.call(e, this.subarray(n, n + r), t);
                    return r;
                }),
                (c.prototype.fill = function (e, t, n, i) {
                    if ('string' == typeof e) {
                        if (
                            ('string' == typeof t
                                ? ((i = t), (t = 0), (n = this.length))
                                : 'string' == typeof n && ((i = n), (n = this.length)),
                            1 === e.length)
                        ) {
                            var s = e.charCodeAt(0);
                            s < 256 && (e = s);
                        }
                        if (void 0 !== i && 'string' != typeof i)
                            throw new TypeError('encoding must be a string');
                        if ('string' == typeof i && !c.isEncoding(i))
                            throw new TypeError('Unknown encoding: ' + i);
                    } else 'number' == typeof e && (e &= 255);
                    if (t < 0 || this.length < t || this.length < n)
                        throw new RangeError('Out of range index');
                    if (n <= t) return this;
                    var r;
                    if (
                        ((t >>>= 0),
                        (n = void 0 === n ? this.length : n >>> 0),
                        e || (e = 0),
                        'number' == typeof e)
                    )
                        for (r = t; r < n; ++r) this[r] = e;
                    else {
                        var a = c.isBuffer(e) ? e : B(new c(e, i).toString()),
                            o = a.length;
                        for (r = 0; r < n - t; ++r) this[r + t] = a[r % o];
                    }
                    return this;
                });
            var M = /[^+\/0-9A-Za-z-_]/g;
            function D(e) {
                return e < 16 ? '0' + e.toString(16) : e.toString(16);
            }
            function B(e, t) {
                var n;
                t = t || 1 / 0;
                for (var i = e.length, s = null, r = [], a = 0; a < i; ++a) {
                    if ((n = e.charCodeAt(a)) > 55295 && n < 57344) {
                        if (!s) {
                            if (n > 56319) {
                                (t -= 3) > -1 && r.push(239, 191, 189);
                                continue;
                            }
                            if (a + 1 === i) {
                                (t -= 3) > -1 && r.push(239, 191, 189);
                                continue;
                            }
                            s = n;
                            continue;
                        }
                        if (n < 56320) {
                            (t -= 3) > -1 && r.push(239, 191, 189), (s = n);
                            continue;
                        }
                        n = 65536 + (((s - 55296) << 10) | (n - 56320));
                    } else s && (t -= 3) > -1 && r.push(239, 191, 189);
                    if (((s = null), n < 128)) {
                        if ((t -= 1) < 0) break;
                        r.push(n);
                    } else if (n < 2048) {
                        if ((t -= 2) < 0) break;
                        r.push((n >> 6) | 192, (63 & n) | 128);
                    } else if (n < 65536) {
                        if ((t -= 3) < 0) break;
                        r.push((n >> 12) | 224, ((n >> 6) & 63) | 128, (63 & n) | 128);
                    } else {
                        if (!(n < 1114112)) throw new Error('Invalid code point');
                        if ((t -= 4) < 0) break;
                        r.push(
                            (n >> 18) | 240,
                            ((n >> 12) & 63) | 128,
                            ((n >> 6) & 63) | 128,
                            (63 & n) | 128
                        );
                    }
                }
                return r;
            }
            function U(e) {
                return i.toByteArray(
                    (function (e) {
                        if (
                            (e = (function (e) {
                                return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, '');
                            })(e).replace(M, '')).length < 2
                        )
                            return '';
                        for (; e.length % 4 != 0; ) e += '=';
                        return e;
                    })(e)
                );
            }
            function z(e, t, n, i) {
                for (var s = 0; s < i && !(s + n >= t.length || s >= e.length); ++s)
                    t[s + n] = e[s];
                return s;
            }
        }.call(this, n(4)));
    },
    function (e, t) {
        var n,
            i,
            s = (e.exports = {});
        function r() {
            throw new Error('setTimeout has not been defined');
        }
        function a() {
            throw new Error('clearTimeout has not been defined');
        }
        function o(e) {
            if (n === setTimeout) return setTimeout(e, 0);
            if ((n === r || !n) && setTimeout) return (n = setTimeout), setTimeout(e, 0);
            try {
                return n(e, 0);
            } catch (t) {
                try {
                    return n.call(null, e, 0);
                } catch (t) {
                    return n.call(this, e, 0);
                }
            }
        }
        !(function () {
            try {
                n = 'function' == typeof setTimeout ? setTimeout : r;
            } catch (e) {
                n = r;
            }
            try {
                i = 'function' == typeof clearTimeout ? clearTimeout : a;
            } catch (e) {
                i = a;
            }
        })();
        var c,
            l = [],
            u = !1,
            p = -1;
        function d() {
            u && c && ((u = !1), c.length ? (l = c.concat(l)) : (p = -1), l.length && h());
        }
        function h() {
            if (!u) {
                var e = o(d);
                u = !0;
                for (var t = l.length; t; ) {
                    for (c = l, l = []; ++p < t; ) c && c[p].run();
                    (p = -1), (t = l.length);
                }
                (c = null),
                    (u = !1),
                    (function (e) {
                        if (i === clearTimeout) return clearTimeout(e);
                        if ((i === a || !i) && clearTimeout)
                            return (i = clearTimeout), clearTimeout(e);
                        try {
                            i(e);
                        } catch (t) {
                            try {
                                return i.call(null, e);
                            } catch (t) {
                                return i.call(this, e);
                            }
                        }
                    })(e);
            }
        }
        function f(e, t) {
            (this.fun = e), (this.array = t);
        }
        function m() {}
        (s.nextTick = function (e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
            l.push(new f(e, t)), 1 !== l.length || u || o(h);
        }),
            (f.prototype.run = function () {
                this.fun.apply(null, this.array);
            }),
            (s.title = 'browser'),
            (s.browser = !0),
            (s.env = {}),
            (s.argv = []),
            (s.version = ''),
            (s.versions = {}),
            (s.on = m),
            (s.addListener = m),
            (s.once = m),
            (s.off = m),
            (s.removeListener = m),
            (s.removeAllListeners = m),
            (s.emit = m),
            (s.prependListener = m),
            (s.prependOnceListener = m),
            (s.listeners = function (e) {
                return [];
            }),
            (s.binding = function (e) {
                throw new Error('process.binding is not supported');
            }),
            (s.cwd = function () {
                return '/';
            }),
            (s.chdir = function (e) {
                throw new Error('process.chdir is not supported');
            }),
            (s.umask = function () {
                return 0;
            });
    },
    function (e, t, n) {
        'use strict';
        (function (t) {
            void 0 === t ||
            !t.version ||
            0 === t.version.indexOf('v0.') ||
            (0 === t.version.indexOf('v1.') && 0 !== t.version.indexOf('v1.8.'))
                ? (e.exports = {
                      nextTick: function (e, n, i, s) {
                          if ('function' != typeof e)
                              throw new TypeError('"callback" argument must be a function');
                          var r,
                              a,
                              o = arguments.length;
                          switch (o) {
                              case 0:
                              case 1:
                                  return t.nextTick(e);
                              case 2:
                                  return t.nextTick(function () {
                                      e.call(null, n);
                                  });
                              case 3:
                                  return t.nextTick(function () {
                                      e.call(null, n, i);
                                  });
                              case 4:
                                  return t.nextTick(function () {
                                      e.call(null, n, i, s);
                                  });
                              default:
                                  for (r = new Array(o - 1), a = 0; a < r.length; )
                                      r[a++] = arguments[a];
                                  return t.nextTick(function () {
                                      e.apply(null, r);
                                  });
                          }
                      }
                  })
                : (e.exports = t);
        }.call(this, n(11)));
    },
    function (e, t, n) {
        var i = n(10),
            s = i.Buffer;
        function r(e, t) {
            for (var n in e) t[n] = e[n];
        }
        function a(e, t, n) {
            return s(e, t, n);
        }
        s.from && s.alloc && s.allocUnsafe && s.allocUnsafeSlow
            ? (e.exports = i)
            : (r(i, t), (t.Buffer = a)),
            r(s, a),
            (a.from = function (e, t, n) {
                if ('number' == typeof e) throw new TypeError('Argument must not be a number');
                return s(e, t, n);
            }),
            (a.alloc = function (e, t, n) {
                if ('number' != typeof e) throw new TypeError('Argument must be a number');
                var i = s(e);
                return (
                    void 0 !== t ? ('string' == typeof n ? i.fill(t, n) : i.fill(t)) : i.fill(0), i
                );
            }),
            (a.allocUnsafe = function (e) {
                if ('number' != typeof e) throw new TypeError('Argument must be a number');
                return s(e);
            }),
            (a.allocUnsafeSlow = function (e) {
                if ('number' != typeof e) throw new TypeError('Argument must be a number');
                return i.SlowBuffer(e);
            });
    },
    function (e, t) {
        var n = {}.toString;
        e.exports =
            Array.isArray ||
            function (e) {
                return '[object Array]' == n.call(e);
            };
    },
    function (e, t, n) {
        'use strict';
        (function (t, i) {
            var s = n(12);
            e.exports = v;
            var r,
                a = n(14);
            v.ReadableState = y;
            n(3).EventEmitter;
            var o = function (e, t) {
                    return e.listeners(t).length;
                },
                c = n(16),
                l = n(13).Buffer,
                u = t.Uint8Array || function () {};
            var p = Object.create(n(7));
            p.inherits = n(8);
            var d = n(25),
                h = void 0;
            h = d && d.debuglog ? d.debuglog('stream') : function () {};
            var f,
                m = n(26),
                g = n(17);
            p.inherits(v, c);
            var b = ['error', 'close', 'destroy', 'pause', 'resume'];
            function y(e, t) {
                e = e || {};
                var i = t instanceof (r = r || n(5));
                (this.objectMode = !!e.objectMode),
                    i && (this.objectMode = this.objectMode || !!e.readableObjectMode);
                var s = e.highWaterMark,
                    a = e.readableHighWaterMark,
                    o = this.objectMode ? 16 : 16384;
                (this.highWaterMark = s || 0 === s ? s : i && (a || 0 === a) ? a : o),
                    (this.highWaterMark = Math.floor(this.highWaterMark)),
                    (this.buffer = new m()),
                    (this.length = 0),
                    (this.pipes = null),
                    (this.pipesCount = 0),
                    (this.flowing = null),
                    (this.ended = !1),
                    (this.endEmitted = !1),
                    (this.reading = !1),
                    (this.sync = !0),
                    (this.needReadable = !1),
                    (this.emittedReadable = !1),
                    (this.readableListening = !1),
                    (this.resumeScheduled = !1),
                    (this.destroyed = !1),
                    (this.defaultEncoding = e.defaultEncoding || 'utf8'),
                    (this.awaitDrain = 0),
                    (this.readingMore = !1),
                    (this.decoder = null),
                    (this.encoding = null),
                    e.encoding &&
                        (f || (f = n(19).StringDecoder),
                        (this.decoder = new f(e.encoding)),
                        (this.encoding = e.encoding));
            }
            function v(e) {
                if (((r = r || n(5)), !(this instanceof v))) return new v(e);
                (this._readableState = new y(e, this)),
                    (this.readable = !0),
                    e &&
                        ('function' == typeof e.read && (this._read = e.read),
                        'function' == typeof e.destroy && (this._destroy = e.destroy)),
                    c.call(this);
            }
            function w(e, t, n, i, s) {
                var r,
                    a = e._readableState;
                null === t
                    ? ((a.reading = !1),
                      (function (e, t) {
                          if (t.ended) return;
                          if (t.decoder) {
                              var n = t.decoder.end();
                              n &&
                                  n.length &&
                                  (t.buffer.push(n), (t.length += t.objectMode ? 1 : n.length));
                          }
                          (t.ended = !0), j(e);
                      })(e, a))
                    : (s ||
                          (r = (function (e, t) {
                              var n;
                              (i = t),
                                  l.isBuffer(i) ||
                                      i instanceof u ||
                                      'string' == typeof t ||
                                      void 0 === t ||
                                      e.objectMode ||
                                      (n = new TypeError('Invalid non-string/buffer chunk'));
                              var i;
                              return n;
                          })(a, t)),
                      r
                          ? e.emit('error', r)
                          : a.objectMode || (t && t.length > 0)
                          ? ('string' == typeof t ||
                                a.objectMode ||
                                Object.getPrototypeOf(t) === l.prototype ||
                                (t = (function (e) {
                                    return l.from(e);
                                })(t)),
                            i
                                ? a.endEmitted
                                    ? e.emit('error', new Error('stream.unshift() after end event'))
                                    : _(e, a, t, !0)
                                : a.ended
                                ? e.emit('error', new Error('stream.push() after EOF'))
                                : ((a.reading = !1),
                                  a.decoder && !n
                                      ? ((t = a.decoder.write(t)),
                                        a.objectMode || 0 !== t.length ? _(e, a, t, !1) : k(e, a))
                                      : _(e, a, t, !1)))
                          : i || (a.reading = !1));
                return (function (e) {
                    return (
                        !e.ended && (e.needReadable || e.length < e.highWaterMark || 0 === e.length)
                    );
                })(a);
            }
            function _(e, t, n, i) {
                t.flowing && 0 === t.length && !t.sync
                    ? (e.emit('data', n), e.read(0))
                    : ((t.length += t.objectMode ? 1 : n.length),
                      i ? t.buffer.unshift(n) : t.buffer.push(n),
                      t.needReadable && j(e)),
                    k(e, t);
            }
            Object.defineProperty(v.prototype, 'destroyed', {
                get: function () {
                    return void 0 !== this._readableState && this._readableState.destroyed;
                },
                set: function (e) {
                    this._readableState && (this._readableState.destroyed = e);
                }
            }),
                (v.prototype.destroy = g.destroy),
                (v.prototype._undestroy = g.undestroy),
                (v.prototype._destroy = function (e, t) {
                    this.push(null), t(e);
                }),
                (v.prototype.push = function (e, t) {
                    var n,
                        i = this._readableState;
                    return (
                        i.objectMode
                            ? (n = !0)
                            : 'string' == typeof e &&
                              ((t = t || i.defaultEncoding) !== i.encoding &&
                                  ((e = l.from(e, t)), (t = '')),
                              (n = !0)),
                        w(this, e, t, !1, n)
                    );
                }),
                (v.prototype.unshift = function (e) {
                    return w(this, e, null, !0, !1);
                }),
                (v.prototype.isPaused = function () {
                    return !1 === this._readableState.flowing;
                }),
                (v.prototype.setEncoding = function (e) {
                    return (
                        f || (f = n(19).StringDecoder),
                        (this._readableState.decoder = new f(e)),
                        (this._readableState.encoding = e),
                        this
                    );
                });
            function x(e, t) {
                return e <= 0 || (0 === t.length && t.ended)
                    ? 0
                    : t.objectMode
                    ? 1
                    : e != e
                    ? t.flowing && t.length
                        ? t.buffer.head.data.length
                        : t.length
                    : (e > t.highWaterMark &&
                          (t.highWaterMark = (function (e) {
                              return (
                                  e >= 8388608
                                      ? (e = 8388608)
                                      : (e--,
                                        (e |= e >>> 1),
                                        (e |= e >>> 2),
                                        (e |= e >>> 4),
                                        (e |= e >>> 8),
                                        (e |= e >>> 16),
                                        e++),
                                  e
                              );
                          })(e)),
                      e <= t.length ? e : t.ended ? t.length : ((t.needReadable = !0), 0));
            }
            function j(e) {
                var t = e._readableState;
                (t.needReadable = !1),
                    t.emittedReadable ||
                        (h('emitReadable', t.flowing),
                        (t.emittedReadable = !0),
                        t.sync ? s.nextTick(S, e) : S(e));
            }
            function S(e) {
                h('emit readable'), e.emit('readable'), E(e);
            }
            function k(e, t) {
                t.readingMore || ((t.readingMore = !0), s.nextTick(T, e, t));
            }
            function T(e, t) {
                for (
                    var n = t.length;
                    !t.reading &&
                    !t.flowing &&
                    !t.ended &&
                    t.length < t.highWaterMark &&
                    (h('maybeReadMore read 0'), e.read(0), n !== t.length);

                )
                    n = t.length;
                t.readingMore = !1;
            }
            function O(e) {
                h('readable nexttick read 0'), e.read(0);
            }
            function I(e, t) {
                t.reading || (h('resume read 0'), e.read(0)),
                    (t.resumeScheduled = !1),
                    (t.awaitDrain = 0),
                    e.emit('resume'),
                    E(e),
                    t.flowing && !t.reading && e.read(0);
            }
            function E(e) {
                var t = e._readableState;
                for (h('flow', t.flowing); t.flowing && null !== e.read(); );
            }
            function C(e, t) {
                return 0 === t.length
                    ? null
                    : (t.objectMode
                          ? (n = t.buffer.shift())
                          : !e || e >= t.length
                          ? ((n = t.decoder
                                ? t.buffer.join('')
                                : 1 === t.buffer.length
                                ? t.buffer.head.data
                                : t.buffer.concat(t.length)),
                            t.buffer.clear())
                          : (n = (function (e, t, n) {
                                var i;
                                e < t.head.data.length
                                    ? ((i = t.head.data.slice(0, e)),
                                      (t.head.data = t.head.data.slice(e)))
                                    : (i =
                                          e === t.head.data.length
                                              ? t.shift()
                                              : n
                                              ? (function (e, t) {
                                                    var n = t.head,
                                                        i = 1,
                                                        s = n.data;
                                                    e -= s.length;
                                                    for (; (n = n.next); ) {
                                                        var r = n.data,
                                                            a = e > r.length ? r.length : e;
                                                        if (
                                                            (a === r.length
                                                                ? (s += r)
                                                                : (s += r.slice(0, e)),
                                                            0 === (e -= a))
                                                        ) {
                                                            a === r.length
                                                                ? (++i,
                                                                  n.next
                                                                      ? (t.head = n.next)
                                                                      : (t.head = t.tail = null))
                                                                : ((t.head = n),
                                                                  (n.data = r.slice(a)));
                                                            break;
                                                        }
                                                        ++i;
                                                    }
                                                    return (t.length -= i), s;
                                                })(e, t)
                                              : (function (e, t) {
                                                    var n = l.allocUnsafe(e),
                                                        i = t.head,
                                                        s = 1;
                                                    i.data.copy(n), (e -= i.data.length);
                                                    for (; (i = i.next); ) {
                                                        var r = i.data,
                                                            a = e > r.length ? r.length : e;
                                                        if (
                                                            (r.copy(n, n.length - e, 0, a),
                                                            0 === (e -= a))
                                                        ) {
                                                            a === r.length
                                                                ? (++s,
                                                                  i.next
                                                                      ? (t.head = i.next)
                                                                      : (t.head = t.tail = null))
                                                                : ((t.head = i),
                                                                  (i.data = r.slice(a)));
                                                            break;
                                                        }
                                                        ++s;
                                                    }
                                                    return (t.length -= s), n;
                                                })(e, t));
                                return i;
                            })(e, t.buffer, t.decoder)),
                      n);
                var n;
            }
            function R(e) {
                var t = e._readableState;
                if (t.length > 0) throw new Error('"endReadable()" called on non-empty stream');
                t.endEmitted || ((t.ended = !0), s.nextTick(N, t, e));
            }
            function N(e, t) {
                e.endEmitted ||
                    0 !== e.length ||
                    ((e.endEmitted = !0), (t.readable = !1), t.emit('end'));
            }
            function q(e, t) {
                for (var n = 0, i = e.length; n < i; n++) if (e[n] === t) return n;
                return -1;
            }
            (v.prototype.read = function (e) {
                h('read', e), (e = parseInt(e, 10));
                var t = this._readableState,
                    n = e;
                if (
                    (0 !== e && (t.emittedReadable = !1),
                    0 === e && t.needReadable && (t.length >= t.highWaterMark || t.ended))
                )
                    return (
                        h('read: emitReadable', t.length, t.ended),
                        0 === t.length && t.ended ? R(this) : j(this),
                        null
                    );
                if (0 === (e = x(e, t)) && t.ended) return 0 === t.length && R(this), null;
                var i,
                    s = t.needReadable;
                return (
                    h('need readable', s),
                    (0 === t.length || t.length - e < t.highWaterMark) &&
                        h('length less than watermark', (s = !0)),
                    t.ended || t.reading
                        ? h('reading or ended', (s = !1))
                        : s &&
                          (h('do read'),
                          (t.reading = !0),
                          (t.sync = !0),
                          0 === t.length && (t.needReadable = !0),
                          this._read(t.highWaterMark),
                          (t.sync = !1),
                          t.reading || (e = x(n, t))),
                    null === (i = e > 0 ? C(e, t) : null)
                        ? ((t.needReadable = !0), (e = 0))
                        : (t.length -= e),
                    0 === t.length &&
                        (t.ended || (t.needReadable = !0), n !== e && t.ended && R(this)),
                    null !== i && this.emit('data', i),
                    i
                );
            }),
                (v.prototype._read = function (e) {
                    this.emit('error', new Error('_read() is not implemented'));
                }),
                (v.prototype.pipe = function (e, t) {
                    var n = this,
                        r = this._readableState;
                    switch (r.pipesCount) {
                        case 0:
                            r.pipes = e;
                            break;
                        case 1:
                            r.pipes = [r.pipes, e];
                            break;
                        default:
                            r.pipes.push(e);
                    }
                    (r.pipesCount += 1), h('pipe count=%d opts=%j', r.pipesCount, t);
                    var c = (!t || !1 !== t.end) && e !== i.stdout && e !== i.stderr ? u : v;
                    function l(t, i) {
                        h('onunpipe'),
                            t === n &&
                                i &&
                                !1 === i.hasUnpiped &&
                                ((i.hasUnpiped = !0),
                                h('cleanup'),
                                e.removeListener('close', b),
                                e.removeListener('finish', y),
                                e.removeListener('drain', p),
                                e.removeListener('error', g),
                                e.removeListener('unpipe', l),
                                n.removeListener('end', u),
                                n.removeListener('end', v),
                                n.removeListener('data', m),
                                (d = !0),
                                !r.awaitDrain ||
                                    (e._writableState && !e._writableState.needDrain) ||
                                    p());
                    }
                    function u() {
                        h('onend'), e.end();
                    }
                    r.endEmitted ? s.nextTick(c) : n.once('end', c), e.on('unpipe', l);
                    var p = (function (e) {
                        return function () {
                            var t = e._readableState;
                            h('pipeOnDrain', t.awaitDrain),
                                t.awaitDrain && t.awaitDrain--,
                                0 === t.awaitDrain && o(e, 'data') && ((t.flowing = !0), E(e));
                        };
                    })(n);
                    e.on('drain', p);
                    var d = !1;
                    var f = !1;
                    function m(t) {
                        h('ondata'),
                            (f = !1),
                            !1 !== e.write(t) ||
                                f ||
                                (((1 === r.pipesCount && r.pipes === e) ||
                                    (r.pipesCount > 1 && -1 !== q(r.pipes, e))) &&
                                    !d &&
                                    (h('false write response, pause', n._readableState.awaitDrain),
                                    n._readableState.awaitDrain++,
                                    (f = !0)),
                                n.pause());
                    }
                    function g(t) {
                        h('onerror', t),
                            v(),
                            e.removeListener('error', g),
                            0 === o(e, 'error') && e.emit('error', t);
                    }
                    function b() {
                        e.removeListener('finish', y), v();
                    }
                    function y() {
                        h('onfinish'), e.removeListener('close', b), v();
                    }
                    function v() {
                        h('unpipe'), n.unpipe(e);
                    }
                    return (
                        n.on('data', m),
                        (function (e, t, n) {
                            if ('function' == typeof e.prependListener)
                                return e.prependListener(t, n);
                            e._events && e._events[t]
                                ? a(e._events[t])
                                    ? e._events[t].unshift(n)
                                    : (e._events[t] = [n, e._events[t]])
                                : e.on(t, n);
                        })(e, 'error', g),
                        e.once('close', b),
                        e.once('finish', y),
                        e.emit('pipe', n),
                        r.flowing || (h('pipe resume'), n.resume()),
                        e
                    );
                }),
                (v.prototype.unpipe = function (e) {
                    var t = this._readableState,
                        n = { hasUnpiped: !1 };
                    if (0 === t.pipesCount) return this;
                    if (1 === t.pipesCount)
                        return (
                            (e && e !== t.pipes) ||
                                (e || (e = t.pipes),
                                (t.pipes = null),
                                (t.pipesCount = 0),
                                (t.flowing = !1),
                                e && e.emit('unpipe', this, n)),
                            this
                        );
                    if (!e) {
                        var i = t.pipes,
                            s = t.pipesCount;
                        (t.pipes = null), (t.pipesCount = 0), (t.flowing = !1);
                        for (var r = 0; r < s; r++) i[r].emit('unpipe', this, n);
                        return this;
                    }
                    var a = q(t.pipes, e);
                    return (
                        -1 === a ||
                            (t.pipes.splice(a, 1),
                            (t.pipesCount -= 1),
                            1 === t.pipesCount && (t.pipes = t.pipes[0]),
                            e.emit('unpipe', this, n)),
                        this
                    );
                }),
                (v.prototype.on = function (e, t) {
                    var n = c.prototype.on.call(this, e, t);
                    if ('data' === e) !1 !== this._readableState.flowing && this.resume();
                    else if ('readable' === e) {
                        var i = this._readableState;
                        i.endEmitted ||
                            i.readableListening ||
                            ((i.readableListening = i.needReadable = !0),
                            (i.emittedReadable = !1),
                            i.reading ? i.length && j(this) : s.nextTick(O, this));
                    }
                    return n;
                }),
                (v.prototype.addListener = v.prototype.on),
                (v.prototype.resume = function () {
                    var e = this._readableState;
                    return (
                        e.flowing ||
                            (h('resume'),
                            (e.flowing = !0),
                            (function (e, t) {
                                t.resumeScheduled ||
                                    ((t.resumeScheduled = !0), s.nextTick(I, e, t));
                            })(this, e)),
                        this
                    );
                }),
                (v.prototype.pause = function () {
                    return (
                        h('call pause flowing=%j', this._readableState.flowing),
                        !1 !== this._readableState.flowing &&
                            (h('pause'), (this._readableState.flowing = !1), this.emit('pause')),
                        this
                    );
                }),
                (v.prototype.wrap = function (e) {
                    var t = this,
                        n = this._readableState,
                        i = !1;
                    for (var s in (e.on('end', function () {
                        if ((h('wrapped end'), n.decoder && !n.ended)) {
                            var e = n.decoder.end();
                            e && e.length && t.push(e);
                        }
                        t.push(null);
                    }),
                    e.on('data', function (s) {
                        (h('wrapped data'),
                        n.decoder && (s = n.decoder.write(s)),
                        n.objectMode && null == s) ||
                            ((n.objectMode || (s && s.length)) &&
                                (t.push(s) || ((i = !0), e.pause())));
                    }),
                    e))
                        void 0 === this[s] &&
                            'function' == typeof e[s] &&
                            (this[s] = (function (t) {
                                return function () {
                                    return e[t].apply(e, arguments);
                                };
                            })(s));
                    for (var r = 0; r < b.length; r++) e.on(b[r], this.emit.bind(this, b[r]));
                    return (
                        (this._read = function (t) {
                            h('wrapped _read', t), i && ((i = !1), e.resume());
                        }),
                        this
                    );
                }),
                Object.defineProperty(v.prototype, 'readableHighWaterMark', {
                    enumerable: !1,
                    get: function () {
                        return this._readableState.highWaterMark;
                    }
                }),
                (v._fromList = C);
        }.call(this, n(4), n(11)));
    },
    function (e, t, n) {
        e.exports = n(3).EventEmitter;
    },
    function (e, t, n) {
        'use strict';
        var i = n(12);
        function s(e, t) {
            e.emit('error', t);
        }
        e.exports = {
            destroy: function (e, t) {
                var n = this,
                    r = this._readableState && this._readableState.destroyed,
                    a = this._writableState && this._writableState.destroyed;
                return r || a
                    ? (t
                          ? t(e)
                          : !e ||
                            (this._writableState && this._writableState.errorEmitted) ||
                            i.nextTick(s, this, e),
                      this)
                    : (this._readableState && (this._readableState.destroyed = !0),
                      this._writableState && (this._writableState.destroyed = !0),
                      this._destroy(e || null, function (e) {
                          !t && e
                              ? (i.nextTick(s, n, e),
                                n._writableState && (n._writableState.errorEmitted = !0))
                              : t && t(e);
                      }),
                      this);
            },
            undestroy: function () {
                this._readableState &&
                    ((this._readableState.destroyed = !1),
                    (this._readableState.reading = !1),
                    (this._readableState.ended = !1),
                    (this._readableState.endEmitted = !1)),
                    this._writableState &&
                        ((this._writableState.destroyed = !1),
                        (this._writableState.ended = !1),
                        (this._writableState.ending = !1),
                        (this._writableState.finished = !1),
                        (this._writableState.errorEmitted = !1));
            }
        };
    },
    function (e, t, n) {
        'use strict';
        (function (t, i, s) {
            var r = n(12);
            function a(e) {
                var t = this;
                (this.next = null),
                    (this.entry = null),
                    (this.finish = function () {
                        !(function (e, t, n) {
                            var i = e.entry;
                            e.entry = null;
                            for (; i; ) {
                                var s = i.callback;
                                t.pendingcb--, s(n), (i = i.next);
                            }
                            t.corkedRequestsFree
                                ? (t.corkedRequestsFree.next = e)
                                : (t.corkedRequestsFree = e);
                        })(t, e);
                    });
            }
            e.exports = y;
            var o,
                c =
                    !t.browser && ['v0.10', 'v0.9.'].indexOf(t.version.slice(0, 5)) > -1
                        ? i
                        : r.nextTick;
            y.WritableState = b;
            var l = Object.create(n(7));
            l.inherits = n(8);
            var u = { deprecate: n(30) },
                p = n(16),
                d = n(13).Buffer,
                h = s.Uint8Array || function () {};
            var f,
                m = n(17);
            function g() {}
            function b(e, t) {
                (o = o || n(5)), (e = e || {});
                var i = t instanceof o;
                (this.objectMode = !!e.objectMode),
                    i && (this.objectMode = this.objectMode || !!e.writableObjectMode);
                var s = e.highWaterMark,
                    l = e.writableHighWaterMark,
                    u = this.objectMode ? 16 : 16384;
                (this.highWaterMark = s || 0 === s ? s : i && (l || 0 === l) ? l : u),
                    (this.highWaterMark = Math.floor(this.highWaterMark)),
                    (this.finalCalled = !1),
                    (this.needDrain = !1),
                    (this.ending = !1),
                    (this.ended = !1),
                    (this.finished = !1),
                    (this.destroyed = !1);
                var p = !1 === e.decodeStrings;
                (this.decodeStrings = !p),
                    (this.defaultEncoding = e.defaultEncoding || 'utf8'),
                    (this.length = 0),
                    (this.writing = !1),
                    (this.corked = 0),
                    (this.sync = !0),
                    (this.bufferProcessing = !1),
                    (this.onwrite = function (e) {
                        !(function (e, t) {
                            var n = e._writableState,
                                i = n.sync,
                                s = n.writecb;
                            if (
                                ((function (e) {
                                    (e.writing = !1),
                                        (e.writecb = null),
                                        (e.length -= e.writelen),
                                        (e.writelen = 0);
                                })(n),
                                t)
                            )
                                !(function (e, t, n, i, s) {
                                    --t.pendingcb,
                                        n
                                            ? (r.nextTick(s, i),
                                              r.nextTick(S, e, t),
                                              (e._writableState.errorEmitted = !0),
                                              e.emit('error', i))
                                            : (s(i),
                                              (e._writableState.errorEmitted = !0),
                                              e.emit('error', i),
                                              S(e, t));
                                })(e, n, i, t, s);
                            else {
                                var a = x(n);
                                a ||
                                    n.corked ||
                                    n.bufferProcessing ||
                                    !n.bufferedRequest ||
                                    _(e, n),
                                    i ? c(w, e, n, a, s) : w(e, n, a, s);
                            }
                        })(t, e);
                    }),
                    (this.writecb = null),
                    (this.writelen = 0),
                    (this.bufferedRequest = null),
                    (this.lastBufferedRequest = null),
                    (this.pendingcb = 0),
                    (this.prefinished = !1),
                    (this.errorEmitted = !1),
                    (this.bufferedRequestCount = 0),
                    (this.corkedRequestsFree = new a(this));
            }
            function y(e) {
                if (((o = o || n(5)), !(f.call(y, this) || this instanceof o))) return new y(e);
                (this._writableState = new b(e, this)),
                    (this.writable = !0),
                    e &&
                        ('function' == typeof e.write && (this._write = e.write),
                        'function' == typeof e.writev && (this._writev = e.writev),
                        'function' == typeof e.destroy && (this._destroy = e.destroy),
                        'function' == typeof e.final && (this._final = e.final)),
                    p.call(this);
            }
            function v(e, t, n, i, s, r, a) {
                (t.writelen = i),
                    (t.writecb = a),
                    (t.writing = !0),
                    (t.sync = !0),
                    n ? e._writev(s, t.onwrite) : e._write(s, r, t.onwrite),
                    (t.sync = !1);
            }
            function w(e, t, n, i) {
                n ||
                    (function (e, t) {
                        0 === t.length && t.needDrain && ((t.needDrain = !1), e.emit('drain'));
                    })(e, t),
                    t.pendingcb--,
                    i(),
                    S(e, t);
            }
            function _(e, t) {
                t.bufferProcessing = !0;
                var n = t.bufferedRequest;
                if (e._writev && n && n.next) {
                    var i = t.bufferedRequestCount,
                        s = new Array(i),
                        r = t.corkedRequestsFree;
                    r.entry = n;
                    for (var o = 0, c = !0; n; )
                        (s[o] = n), n.isBuf || (c = !1), (n = n.next), (o += 1);
                    (s.allBuffers = c),
                        v(e, t, !0, t.length, s, '', r.finish),
                        t.pendingcb++,
                        (t.lastBufferedRequest = null),
                        r.next
                            ? ((t.corkedRequestsFree = r.next), (r.next = null))
                            : (t.corkedRequestsFree = new a(t)),
                        (t.bufferedRequestCount = 0);
                } else {
                    for (; n; ) {
                        var l = n.chunk,
                            u = n.encoding,
                            p = n.callback;
                        if (
                            (v(e, t, !1, t.objectMode ? 1 : l.length, l, u, p),
                            (n = n.next),
                            t.bufferedRequestCount--,
                            t.writing)
                        )
                            break;
                    }
                    null === n && (t.lastBufferedRequest = null);
                }
                (t.bufferedRequest = n), (t.bufferProcessing = !1);
            }
            function x(e) {
                return (
                    e.ending &&
                    0 === e.length &&
                    null === e.bufferedRequest &&
                    !e.finished &&
                    !e.writing
                );
            }
            function j(e, t) {
                e._final(function (n) {
                    t.pendingcb--,
                        n && e.emit('error', n),
                        (t.prefinished = !0),
                        e.emit('prefinish'),
                        S(e, t);
                });
            }
            function S(e, t) {
                var n = x(t);
                return (
                    n &&
                        (!(function (e, t) {
                            t.prefinished ||
                                t.finalCalled ||
                                ('function' == typeof e._final
                                    ? (t.pendingcb++, (t.finalCalled = !0), r.nextTick(j, e, t))
                                    : ((t.prefinished = !0), e.emit('prefinish')));
                        })(e, t),
                        0 === t.pendingcb && ((t.finished = !0), e.emit('finish'))),
                    n
                );
            }
            l.inherits(y, p),
                (b.prototype.getBuffer = function () {
                    for (var e = this.bufferedRequest, t = []; e; ) t.push(e), (e = e.next);
                    return t;
                }),
                (function () {
                    try {
                        Object.defineProperty(b.prototype, 'buffer', {
                            get: u.deprecate(
                                function () {
                                    return this.getBuffer();
                                },
                                '_writableState.buffer is deprecated. Use _writableState.getBuffer instead.',
                                'DEP0003'
                            )
                        });
                    } catch (e) {}
                })(),
                'function' == typeof Symbol &&
                Symbol.hasInstance &&
                'function' == typeof Function.prototype[Symbol.hasInstance]
                    ? ((f = Function.prototype[Symbol.hasInstance]),
                      Object.defineProperty(y, Symbol.hasInstance, {
                          value: function (e) {
                              return (
                                  !!f.call(this, e) ||
                                  (this === y && e && e._writableState instanceof b)
                              );
                          }
                      }))
                    : (f = function (e) {
                          return e instanceof this;
                      }),
                (y.prototype.pipe = function () {
                    this.emit('error', new Error('Cannot pipe, not readable'));
                }),
                (y.prototype.write = function (e, t, n) {
                    var i,
                        s = this._writableState,
                        a = !1,
                        o = !s.objectMode && ((i = e), d.isBuffer(i) || i instanceof h);
                    return (
                        o &&
                            !d.isBuffer(e) &&
                            (e = (function (e) {
                                return d.from(e);
                            })(e)),
                        'function' == typeof t && ((n = t), (t = null)),
                        o ? (t = 'buffer') : t || (t = s.defaultEncoding),
                        'function' != typeof n && (n = g),
                        s.ended
                            ? (function (e, t) {
                                  var n = new Error('write after end');
                                  e.emit('error', n), r.nextTick(t, n);
                              })(this, n)
                            : (o ||
                                  (function (e, t, n, i) {
                                      var s = !0,
                                          a = !1;
                                      return (
                                          null === n
                                              ? (a = new TypeError(
                                                    'May not write null values to stream'
                                                ))
                                              : 'string' == typeof n ||
                                                void 0 === n ||
                                                t.objectMode ||
                                                (a = new TypeError(
                                                    'Invalid non-string/buffer chunk'
                                                )),
                                          a && (e.emit('error', a), r.nextTick(i, a), (s = !1)),
                                          s
                                      );
                                  })(this, s, e, n)) &&
                              (s.pendingcb++,
                              (a = (function (e, t, n, i, s, r) {
                                  if (!n) {
                                      var a = (function (e, t, n) {
                                          e.objectMode ||
                                              !1 === e.decodeStrings ||
                                              'string' != typeof t ||
                                              (t = d.from(t, n));
                                          return t;
                                      })(t, i, s);
                                      i !== a && ((n = !0), (s = 'buffer'), (i = a));
                                  }
                                  var o = t.objectMode ? 1 : i.length;
                                  t.length += o;
                                  var c = t.length < t.highWaterMark;
                                  c || (t.needDrain = !0);
                                  if (t.writing || t.corked) {
                                      var l = t.lastBufferedRequest;
                                      (t.lastBufferedRequest = {
                                          chunk: i,
                                          encoding: s,
                                          isBuf: n,
                                          callback: r,
                                          next: null
                                      }),
                                          l
                                              ? (l.next = t.lastBufferedRequest)
                                              : (t.bufferedRequest = t.lastBufferedRequest),
                                          (t.bufferedRequestCount += 1);
                                  } else v(e, t, !1, o, i, s, r);
                                  return c;
                              })(this, s, o, e, t, n))),
                        a
                    );
                }),
                (y.prototype.cork = function () {
                    this._writableState.corked++;
                }),
                (y.prototype.uncork = function () {
                    var e = this._writableState;
                    e.corked &&
                        (e.corked--,
                        e.writing ||
                            e.corked ||
                            e.finished ||
                            e.bufferProcessing ||
                            !e.bufferedRequest ||
                            _(this, e));
                }),
                (y.prototype.setDefaultEncoding = function (e) {
                    if (
                        ('string' == typeof e && (e = e.toLowerCase()),
                        !(
                            [
                                'hex',
                                'utf8',
                                'utf-8',
                                'ascii',
                                'binary',
                                'base64',
                                'ucs2',
                                'ucs-2',
                                'utf16le',
                                'utf-16le',
                                'raw'
                            ].indexOf((e + '').toLowerCase()) > -1
                        ))
                    )
                        throw new TypeError('Unknown encoding: ' + e);
                    return (this._writableState.defaultEncoding = e), this;
                }),
                Object.defineProperty(y.prototype, 'writableHighWaterMark', {
                    enumerable: !1,
                    get: function () {
                        return this._writableState.highWaterMark;
                    }
                }),
                (y.prototype._write = function (e, t, n) {
                    n(new Error('_write() is not implemented'));
                }),
                (y.prototype._writev = null),
                (y.prototype.end = function (e, t, n) {
                    var i = this._writableState;
                    'function' == typeof e
                        ? ((n = e), (e = null), (t = null))
                        : 'function' == typeof t && ((n = t), (t = null)),
                        null != e && this.write(e, t),
                        i.corked && ((i.corked = 1), this.uncork()),
                        i.ending ||
                            i.finished ||
                            (function (e, t, n) {
                                (t.ending = !0),
                                    S(e, t),
                                    n && (t.finished ? r.nextTick(n) : e.once('finish', n));
                                (t.ended = !0), (e.writable = !1);
                            })(this, i, n);
                }),
                Object.defineProperty(y.prototype, 'destroyed', {
                    get: function () {
                        return void 0 !== this._writableState && this._writableState.destroyed;
                    },
                    set: function (e) {
                        this._writableState && (this._writableState.destroyed = e);
                    }
                }),
                (y.prototype.destroy = m.destroy),
                (y.prototype._undestroy = m.undestroy),
                (y.prototype._destroy = function (e, t) {
                    this.end(), t(e);
                });
        }.call(this, n(11), n(28).setImmediate, n(4)));
    },
    function (e, t, n) {
        'use strict';
        var i = n(31).Buffer,
            s =
                i.isEncoding ||
                function (e) {
                    switch ((e = '' + e) && e.toLowerCase()) {
                        case 'hex':
                        case 'utf8':
                        case 'utf-8':
                        case 'ascii':
                        case 'binary':
                        case 'base64':
                        case 'ucs2':
                        case 'ucs-2':
                        case 'utf16le':
                        case 'utf-16le':
                        case 'raw':
                            return !0;
                        default:
                            return !1;
                    }
                };
        function r(e) {
            var t;
            switch (
                ((this.encoding = (function (e) {
                    var t = (function (e) {
                        if (!e) return 'utf8';
                        for (var t; ; )
                            switch (e) {
                                case 'utf8':
                                case 'utf-8':
                                    return 'utf8';
                                case 'ucs2':
                                case 'ucs-2':
                                case 'utf16le':
                                case 'utf-16le':
                                    return 'utf16le';
                                case 'latin1':
                                case 'binary':
                                    return 'latin1';
                                case 'base64':
                                case 'ascii':
                                case 'hex':
                                    return e;
                                default:
                                    if (t) return;
                                    (e = ('' + e).toLowerCase()), (t = !0);
                            }
                    })(e);
                    if ('string' != typeof t && (i.isEncoding === s || !s(e)))
                        throw new Error('Unknown encoding: ' + e);
                    return t || e;
                })(e)),
                this.encoding)
            ) {
                case 'utf16le':
                    (this.text = c), (this.end = l), (t = 4);
                    break;
                case 'utf8':
                    (this.fillLast = o), (t = 4);
                    break;
                case 'base64':
                    (this.text = u), (this.end = p), (t = 3);
                    break;
                default:
                    return (this.write = d), void (this.end = h);
            }
            (this.lastNeed = 0), (this.lastTotal = 0), (this.lastChar = i.allocUnsafe(t));
        }
        function a(e) {
            return e <= 127
                ? 0
                : e >> 5 == 6
                ? 2
                : e >> 4 == 14
                ? 3
                : e >> 3 == 30
                ? 4
                : e >> 6 == 2
                ? -1
                : -2;
        }
        function o(e) {
            var t = this.lastTotal - this.lastNeed,
                n = (function (e, t, n) {
                    if (128 != (192 & t[0])) return (e.lastNeed = 0), '�';
                    if (e.lastNeed > 1 && t.length > 1) {
                        if (128 != (192 & t[1])) return (e.lastNeed = 1), '�';
                        if (e.lastNeed > 2 && t.length > 2 && 128 != (192 & t[2]))
                            return (e.lastNeed = 2), '�';
                    }
                })(this, e);
            return void 0 !== n
                ? n
                : this.lastNeed <= e.length
                ? (e.copy(this.lastChar, t, 0, this.lastNeed),
                  this.lastChar.toString(this.encoding, 0, this.lastTotal))
                : (e.copy(this.lastChar, t, 0, e.length), void (this.lastNeed -= e.length));
        }
        function c(e, t) {
            if ((e.length - t) % 2 == 0) {
                var n = e.toString('utf16le', t);
                if (n) {
                    var i = n.charCodeAt(n.length - 1);
                    if (i >= 55296 && i <= 56319)
                        return (
                            (this.lastNeed = 2),
                            (this.lastTotal = 4),
                            (this.lastChar[0] = e[e.length - 2]),
                            (this.lastChar[1] = e[e.length - 1]),
                            n.slice(0, -1)
                        );
                }
                return n;
            }
            return (
                (this.lastNeed = 1),
                (this.lastTotal = 2),
                (this.lastChar[0] = e[e.length - 1]),
                e.toString('utf16le', t, e.length - 1)
            );
        }
        function l(e) {
            var t = e && e.length ? this.write(e) : '';
            if (this.lastNeed) {
                var n = this.lastTotal - this.lastNeed;
                return t + this.lastChar.toString('utf16le', 0, n);
            }
            return t;
        }
        function u(e, t) {
            var n = (e.length - t) % 3;
            return 0 === n
                ? e.toString('base64', t)
                : ((this.lastNeed = 3 - n),
                  (this.lastTotal = 3),
                  1 === n
                      ? (this.lastChar[0] = e[e.length - 1])
                      : ((this.lastChar[0] = e[e.length - 2]),
                        (this.lastChar[1] = e[e.length - 1])),
                  e.toString('base64', t, e.length - n));
        }
        function p(e) {
            var t = e && e.length ? this.write(e) : '';
            return this.lastNeed ? t + this.lastChar.toString('base64', 0, 3 - this.lastNeed) : t;
        }
        function d(e) {
            return e.toString(this.encoding);
        }
        function h(e) {
            return e && e.length ? this.write(e) : '';
        }
        (t.StringDecoder = r),
            (r.prototype.write = function (e) {
                if (0 === e.length) return '';
                var t, n;
                if (this.lastNeed) {
                    if (void 0 === (t = this.fillLast(e))) return '';
                    (n = this.lastNeed), (this.lastNeed = 0);
                } else n = 0;
                return n < e.length ? (t ? t + this.text(e, n) : this.text(e, n)) : t || '';
            }),
            (r.prototype.end = function (e) {
                var t = e && e.length ? this.write(e) : '';
                return this.lastNeed ? t + '�' : t;
            }),
            (r.prototype.text = function (e, t) {
                var n = (function (e, t, n) {
                    var i = t.length - 1;
                    if (i < n) return 0;
                    var s = a(t[i]);
                    if (s >= 0) return s > 0 && (e.lastNeed = s - 1), s;
                    if (--i < n || -2 === s) return 0;
                    if ((s = a(t[i])) >= 0) return s > 0 && (e.lastNeed = s - 2), s;
                    if (--i < n || -2 === s) return 0;
                    if ((s = a(t[i])) >= 0)
                        return s > 0 && (2 === s ? (s = 0) : (e.lastNeed = s - 3)), s;
                    return 0;
                })(this, e, t);
                if (!this.lastNeed) return e.toString('utf8', t);
                this.lastTotal = n;
                var i = e.length - (n - this.lastNeed);
                return e.copy(this.lastChar, 0, i), e.toString('utf8', t, i);
            }),
            (r.prototype.fillLast = function (e) {
                if (this.lastNeed <= e.length)
                    return (
                        e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed),
                        this.lastChar.toString(this.encoding, 0, this.lastTotal)
                    );
                e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, e.length),
                    (this.lastNeed -= e.length);
            });
    },
    function (e, t, n) {
        'use strict';
        e.exports = a;
        var i = n(5),
            s = Object.create(n(7));
        function r(e, t) {
            var n = this._transformState;
            n.transforming = !1;
            var i = n.writecb;
            if (!i) return this.emit('error', new Error('write callback called multiple times'));
            (n.writechunk = null), (n.writecb = null), null != t && this.push(t), i(e);
            var s = this._readableState;
            (s.reading = !1),
                (s.needReadable || s.length < s.highWaterMark) && this._read(s.highWaterMark);
        }
        function a(e) {
            if (!(this instanceof a)) return new a(e);
            i.call(this, e),
                (this._transformState = {
                    afterTransform: r.bind(this),
                    needTransform: !1,
                    transforming: !1,
                    writecb: null,
                    writechunk: null,
                    writeencoding: null
                }),
                (this._readableState.needReadable = !0),
                (this._readableState.sync = !1),
                e &&
                    ('function' == typeof e.transform && (this._transform = e.transform),
                    'function' == typeof e.flush && (this._flush = e.flush)),
                this.on('prefinish', o);
        }
        function o() {
            var e = this;
            'function' == typeof this._flush
                ? this._flush(function (t, n) {
                      c(e, t, n);
                  })
                : c(this, null, null);
        }
        function c(e, t, n) {
            if (t) return e.emit('error', t);
            if ((null != n && e.push(n), e._writableState.length))
                throw new Error('Calling transform done when ws.length != 0');
            if (e._transformState.transforming)
                throw new Error('Calling transform done when still transforming');
            return e.push(null);
        }
        (s.inherits = n(8)),
            s.inherits(a, i),
            (a.prototype.push = function (e, t) {
                return (this._transformState.needTransform = !1), i.prototype.push.call(this, e, t);
            }),
            (a.prototype._transform = function (e, t, n) {
                throw new Error('_transform() is not implemented');
            }),
            (a.prototype._write = function (e, t, n) {
                var i = this._transformState;
                if (((i.writecb = n), (i.writechunk = e), (i.writeencoding = t), !i.transforming)) {
                    var s = this._readableState;
                    (i.needTransform || s.needReadable || s.length < s.highWaterMark) &&
                        this._read(s.highWaterMark);
                }
            }),
            (a.prototype._read = function (e) {
                var t = this._transformState;
                null !== t.writechunk && t.writecb && !t.transforming
                    ? ((t.transforming = !0),
                      this._transform(t.writechunk, t.writeencoding, t.afterTransform))
                    : (t.needTransform = !0);
            }),
            (a.prototype._destroy = function (e, t) {
                var n = this;
                i.prototype._destroy.call(this, e, function (e) {
                    t(e), n.emit('close');
                });
            });
    },
    function (e, t, n) {
        'use strict';
        n.r(t),
            function (e, i) {
                n.d(t, 'Client', function () {
                    return Mo;
                }),
                    n.d(t, 'Constants', function () {
                        return dr;
                    }),
                    n.d(t, 'JID', function () {
                        return X;
                    }),
                    n.d(t, 'JXT', function () {
                        return bi;
                    }),
                    n.d(t, 'Jingle', function () {
                        return Pr;
                    }),
                    n.d(t, 'Namespaces', function () {
                        return ri;
                    }),
                    n.d(t, 'RTT', function () {
                        return Bo;
                    }),
                    n.d(t, 'SASL', function () {
                        return bs;
                    }),
                    n.d(t, 'Stanzas', function () {
                        return Ao;
                    }),
                    n.d(t, 'Utils', function () {
                        return Es;
                    }),
                    n.d(t, 'VERSION', function () {
                        return Uo;
                    }),
                    n.d(t, 'core', function () {
                        return Kr;
                    }),
                    n.d(t, 'createClient', function () {
                        return zo;
                    }),
                    n.d(t, 'getHostMeta', function () {
                        return mr;
                    });
                var s = n(0),
                    r = n(9),
                    a = n(3),
                    o = n(2),
                    c = n.n(o),
                    l = n(6),
                    u = n(1);
                const p = Math.pow(2, 32),
                    d = (e, t) => ((e % t) + t) % t;
                class h extends a.EventEmitter {
                    constructor() {
                        super(),
                            (this.allowResume = !0),
                            (this.lastAck = 0),
                            (this.handled = 0),
                            (this.unacked = []),
                            (this.inboundStarted = !1),
                            (this.outboundStarted = !1),
                            (this.id = void 0),
                            (this.jid = void 0),
                            (this.allowResume = !0),
                            (this.started = !1),
                            (this.cacheHandler = () => {}),
                            this._reset();
                    }
                    get started() {
                        return this.outboundStarted && this.inboundStarted;
                    }
                    set started(e) {
                        e || ((this.outboundStarted = !1), (this.inboundStarted = !1));
                    }
                    get resumable() {
                        return this.started && this.allowResume;
                    }
                    load(e) {
                        var t;
                        (this.id = e.id),
                            (this.allowResume = null === (t = e.allowResume) || void 0 === t || t),
                            (this.handled = e.handled),
                            (this.lastAck = e.lastAck),
                            (this.unacked = e.unacked),
                            this.emit('prebound', e.jid);
                    }
                    cache(e) {
                        this.cacheHandler = e;
                    }
                    bind(e) {
                        return Object(s.a)(this, void 0, void 0, function* () {
                            (this.jid = e), yield this._cache();
                        });
                    }
                    enable() {
                        return Object(s.a)(this, void 0, void 0, function* () {
                            this.emit('send', {
                                allowResumption: this.allowResume,
                                type: 'enable'
                            });
                        });
                    }
                    resume() {
                        return Object(s.a)(this, void 0, void 0, function* () {
                            this.emit('send', {
                                handled: this.handled,
                                previousSession: this.id,
                                type: 'resume'
                            });
                        });
                    }
                    enabled(e) {
                        return Object(s.a)(this, void 0, void 0, function* () {
                            (this.id = e.id),
                                (this.handled = 0),
                                (this.inboundStarted = !0),
                                yield this._cache();
                        });
                    }
                    resumed(e) {
                        return Object(s.a)(this, void 0, void 0, function* () {
                            (this.id = e.previousSession),
                                (this.inboundStarted = !0),
                                yield this.process(e, !0),
                                yield this._cache();
                        });
                    }
                    failed(e) {
                        return Object(s.a)(this, void 0, void 0, function* () {
                            yield this.process(e);
                            for (const [e, t] of this.unacked)
                                this.emit('failed', { kind: e, stanza: t });
                            this._reset(), yield this._cache();
                        });
                    }
                    ack() {
                        this.emit('send', { handled: this.handled, type: 'ack' });
                    }
                    request() {
                        this.emit('send', { type: 'request' });
                    }
                    process(e, t = !1) {
                        return Object(s.a)(this, void 0, void 0, function* () {
                            if (void 0 === e.handled) return;
                            const n = d(e.handled - this.lastAck, p);
                            for (let e = 0; e < n && this.unacked.length > 0; e++) {
                                const [e, t] = this.unacked.shift();
                                this.emit('acked', { kind: e, stanza: t });
                            }
                            if (((this.lastAck = e.handled), t)) {
                                const e = this.unacked;
                                if (((this.unacked = []), e.length)) {
                                    this.emit('begin-resend');
                                    for (const [t, n] of e)
                                        this.emit('resend', { kind: t, stanza: n });
                                    this.emit('end-resend');
                                }
                            }
                            yield this._cache();
                        });
                    }
                    track(e, t) {
                        return Object(s.a)(this, void 0, void 0, function* () {
                            return 'sm' !== e || ('enable' !== t.type && 'resume' !== t.type)
                                ? !!this.outboundStarted &&
                                      ('message' === e || 'presence' === e || 'iq' === e) &&
                                      (this.unacked.push([e, t]), yield this._cache(), !0)
                                : ((this.handled = 0),
                                  (this.outboundStarted = !0),
                                  yield this._cache(),
                                  !1);
                        });
                    }
                    handle() {
                        return Object(s.a)(this, void 0, void 0, function* () {
                            this.inboundStarted &&
                                ((this.handled = d(this.handled + 1, p)), yield this._cache());
                        });
                    }
                    hibernate() {
                        return Object(s.a)(this, void 0, void 0, function* () {
                            if (!this.resumable) return this.shutdown();
                            for (const [e, t] of this.unacked)
                                this.emit('hibernated', { kind: e, stanza: t });
                        });
                    }
                    shutdown() {
                        return Object(s.a)(this, void 0, void 0, function* () {
                            return this.failed({ type: 'failed' });
                        });
                    }
                    _cache() {
                        return Object(s.a)(this, void 0, void 0, function* () {
                            try {
                                yield this.cacheHandler({
                                    allowResume: this.allowResume,
                                    handled: this.handled,
                                    id: this.id,
                                    jid: this.jid,
                                    lastAck: this.lastAck,
                                    unacked: this.unacked
                                });
                            } catch (e) {
                                console.error('Failed to cache stream state', e);
                            }
                        });
                    }
                    _reset() {
                        (this.id = ''),
                            (this.inboundStarted = !1),
                            (this.outboundStarted = !1),
                            (this.lastAck = 0),
                            (this.handled = 0),
                            (this.unacked = []);
                    }
                }
                const f = {
                    'A.1': {
                        r:
                            'hk:if|le:lf|nf:nv|qg:qv|rg:rj|rm:rp|rr:rt|rv:s3|vn:vv|17m:17n|17q:17v|18g:19g|1an:1ao|1cb:1cg|1e5:1ef|1fb:1ff|1fl:1gb|1gd:1gq|1gs:1gu|1hr:1hv|1im:1iv|1ne:1nf|1pd:1pf|1qb:1rv|1ti:280|29q:29r|2ae:2af|2al:2an|2bh:2c0|2cd:2ce|2ch:2ci|2dj:2dl|2dq:2dr|2e5:2e6|2e9:2ea|2ee:2em|2eo:2er|2f4:2f5|2fr:2g1|2g3:2g4|2gb:2ge|2gh:2gi|2hq:2hr|2i3:2i6|2i9:2ia|2ie:2io|2iv:2j5|2jl:2k0|2lq:2lr|2me:2mf|2mh:2mv|2n1:2n5|2ng:2o0|2od:2oe|2oh:2oi|2pk:2pl|2pq:2pr|2q4:2q6|2q9:2qa|2qe:2ql|2qo:2qr|2r2:2r5|2rh:2s1|2sb:2sd|2sm:2so|2t0:2t2|2t5:2t7|2tb:2td|2tq:2tt|2u3:2u5|2ue:2um|2uo:2v6|2vj:300|31q:31t|32e:32k|32n:32v|332:335|33g:341|35q:35t|36e:36k|36n:36t|372:375|37g:381|39q:39t|3a4:3a5|3ae:3am|3ao:3av|3b2:3b5|3bg:3c1|3cn:3cp|3du:3dv|3e7:3e9|3eb:3ee|3f0:3fh|3fl:3g0|3hr:3hu|3is:3k0|3k5:3k6|3kb:3kc|3ke:3kj|3l8:3l9|3lu:3lv|3me:3mf|3mq:3mr|3mu:3nv|3rb:3rg|3sc:3sf|3ud:3ue|3ug:3vv|41j:41l|41q:41v|42q:44v|466:46f|47p:47q|47s:47v|4aq:4au|4d3:4d7|4fq:4fv|4ie:4if|4iu:4iv|4ke:4kf|4lm:4ln|4m6:4m7|4om:4on|4qr:4r0|4rt:4sv|4vl:500|5jn:5jv|5kt:5kv|5nh:5nv|5ol:5ov|5pn:5pv|5qk:5qv|5rk:5rv|5ut:5uv|5va:5vv|60q:60v|63o:63v|65a:7fv|7ks:7kv|7nq:7nv|7om:7on|7ou:7ov|7q6:7q7|7qe:7qf|7ru:7rv|7uk:7ul|7vg:7vh|82j:82m|82o:82u|834:839|83i:83j|84f:84v|85i:86f|87b:87v|89r:89s|8ac:8ai|8c4:8cf|8uf:8vv|917:91v|92b:92v|9gk:9gl|9ju:9jv|9ka:9o0|9oa:9ob|9qj:9ql|9qv:9r0|9sl:9sn|9tv:9uf|9vc:9vf|ao0:bjv|bnk:bnv|bum:bvf|bvs:bvv|c4n:c4o|c80:c84|c9d:c9g|cdo:cff|cgt:cgv|ci4:cig|cjs:cju|cmc:cmf|crn:crq|cuu:cuv|jdm:jfv|17t6:17vv|194d:194f|1967:1avv|1lt4:1lvv|1uhe:1uhf|1ujb:1unv|1uo7:1uoi|1uoo:1uos|1uti:1uui|1va0:1vaf|1vcg:1vch|1ve8:1vef|1vft:1vfv|1vgg:1vgv|1vh4:1vhf|1vi7:1vi8|1vjc:1vjf|1vnt:1vnu|1vtv:1vu1|1vu8:1vu9|1vug:1vuh|1vuo:1vup|1vut:1vuv|1vvf:1vvo|2000:20nv|20p4:20pf|20qb:20vv|2116:2117|212e:3jvv|3k7m:3k7v|3k97:3k99|3keu:3kvv|3l50:3l51|3l53:3l54|3l57:3l58|3l8b:3l8c|3la7:3la9|3ll4:3ll7|3lua:3lud|3m00:3vvt|59mn:5tvv|5ugu:5vvt|6000:7vvt|8000:9vvt|a000:bvvt|c000:dvvt|e000:fvvt|g000:hvvt|i000:jvvt|k000:lvvt|m000:nvvt|o000:pvvt|q000:rvvt|s002:s00v|s040:tvvt',
                        s:
                            '9p8|9qc|9qe|9qn|9tg|147|bkq|3l2l|3l4t|3l5d|3l5q|3l5s|3l61|3l64|3l86|3l8l|3l8t|3l9q|3l9v|3la5|3lah|16f|c20|ccf|cnv|cvv|1b0|1c8|1d2|1dq|1h0|1nv|1oe|284|2c4|2d9|2dh|2dt|2eu|2h9|2hh|2hk|2hn|2ht|2it|2k4|2kc|2ke|2ki|2l9|2lh|2lk|2m6|2ma|2o4|2p9|2ph|2qu|2s4|2sh|2sr|2st|2tm|2u9|304|30d|30h|319|31k|325|329|344|34d|34h|359|35k|365|369|36v|384|38d|38h|399|3a9|3c4|3di|3ds|3el|3en|3k3|3k9|3ko|3l0|3l4|3l6|3lc|3lq|3m5|3m7|3q8|3so|3tt|412|418|41b|4g7|4i7|4i9|4in|4ip|4k7|4k9|4lf|4lh|4lv|4m1|4mf|4mn|4nf|4of|4oh|4ov|4q7|h1|5od|5rd|5rh|60f|1upn|1upt|1upv|1uq2|1uq5|1vij|1vj7|1vjl|1vo0|1vv7|20ov|7qo|7qq|7qs|7qu|7tl|7u5|7us|7vl|7vv|sb|sd|s000|t2|97v|uf|9go|9o5'
                    },
                    'B.1': { r: '60b:60d|80b:80d|1vg0:1vgf', s: '5d|606|1vnv|830|qf' },
                    'B.2': {
                        m:
                            '5l:ts|6v:3j;3j|9g:39;o7|a9:ls;3e|bv:3j|fg:3a;oc|q5:tp|rq:10;tp|sg:tp;o8;o1|tg:u5;o8;o1|u2:u3|ug:ti|uh:to|ui:u5|uj:ud|uk:ub|ul:u6|um:u0|vg:tq|vh:u1|vi:u3|vl:tl|1c7:1b5;1c2|7km:38;ph|7kn:3k;o8|7ko:3n;oa|7kp:3p;oa|7kq:31;lu|7kr:7j1|7qg:u5;oj|7qi:u5;oj;o0|7qk:u5;oj;o1|7qm:u5;oj;q2|7s0:7o0;tp|7s1:7o1;tp|7s2:7o2;tp|7s3:7o3;tp|7s4:7o4;tp|7s5:7o5;tp|7s6:7o6;tp|7s7:7o7;tp|7s8:7o0;tp|7s9:7o1;tp|7sa:7o2;tp|7sb:7o3;tp|7sc:7o4;tp|7sd:7o5;tp|7se:7o6;tp|7sf:7o7;tp|7sg:7p0;tp|7sh:7p1;tp|7si:7p2;tp|7sj:7p3;tp|7sk:7p4;tp|7sl:7p5;tp|7sm:7p6;tp|7sn:7p7;tp|7so:7p0;tp|7sp:7p1;tp|7sq:7p2;tp|7sr:7p3;tp|7ss:7p4;tp|7st:7p5;tp|7su:7p6;tp|7sv:7p7;tp|7t0:7r0;tp|7t1:7r1;tp|7t2:7r2;tp|7t3:7r3;tp|7t4:7r4;tp|7t5:7r5;tp|7t6:7r6;tp|7t7:7r7;tp|7t8:7r0;tp|7t9:7r1;tp|7ta:7r2;tp|7tb:7r3;tp|7tc:7r4;tp|7td:7r5;tp|7te:7r6;tp|7tf:7r7;tp|7ti:7rg;tp|7tj:th;tp|7tk:tc;tp|7tm:th;q2|7tn:th;q2;tp|7ts:th;tp|7tu:tp|7u2:7rk;tp|7u3:tn;tp|7u4:te;tp|7u6:tn;q2|7u7:tn;q2;tp|7uc:tn;tp|7ui:tp;o8;o0|7uj:tp;o8;o1|7um:tp;q2|7un:tp;o8;q2|7v2:u5;o8;o0|7v3:u5;o8;o1|7v4:u1;oj|7v6:u5;q2|7v7:u5;o8;q2|7vi:7rs;tp|7vj:u9;tp|7vk:ue;tp|7vm:u9;q2|7vn:u9;q2;tp|7vs:u9;tp|858:3i;3j|882:33|883:5g;33|887:ir|889:5g;36|88b:38|88c:38|88d:38|88g:39|88h:39|88i:3c|88l:3e|88m:3e;3f|88p:3g|88q:3h|88r:3i|88s:3i|88t:3i|890:3j;3d|891:3k;35;3c|892:3k;3d|894:3q|898:3q|89c:32|89d:33|89g:35|89h:36|89j:3d|89u:tj|89v:u0|8a5:34|crh:38;3g;31|crj:31;3l|crl:3f;3m|cs0:3g;31|cs1:3e;31|cs2:ts;31|cs3:3d;31|cs4:3b;31|cs5:3b;32|cs6:3d;32|cs7:37;32|csa:3g;36|csb:3e;36|csc:ts;36|csg:38;3q|csh:3b;38;3q|csi:3d;38;3q|csj:37;38;3q|csk:3k;38;3q|ct9:3g;31|cta:3b;3g;31|ctb:3d;3g;31|ctc:37;3g;31|ctk:3g;3m|ctl:3e;3m|ctm:ts;3m|ctn:3d;3m|cto:3b;3m|ctp:3d;3m|ctq:3g;3n|ctr:3e;3n|cts:ts;3n|ctt:3d;3n|ctu:3b;3n|ctv:3d;3n|cu0:3b;u9|cu1:3d;u9|cu3:32;3h|cu6:33;8gl;3b;37|cu7:33;3f;1e|cu8:34;32|cu9:37;3p|cub:38;3g|cud:3b;3b|cue:3b;3d|cun:3g;38|cup:3g;3g;3d|cuq:3g;3i|cus:3j;3m|cut:3n;32|1uo0:36;36|1uo1:36;39|1uo2:36;3c|1uo3:36;36;39|1uo4:36;36;3c|1uo5:3j;3k|1uo6:3j;3k|1uoj:1bk;1bm|1uok:1bk;1b5|1uol:1bk;1bb|1uom:1bu;1bm|1uon:1bk;1bd|3l00:31|3l01:32|3l02:33|3l03:34|3l04:35|3l05:36|3l06:37|3l07:38|3l08:39|3l09:3a|3l0a:3b|3l0b:3c|3l0c:3d|3l0d:3e|3l0e:3f|3l0f:3g|3l0g:3h|3l0h:3i|3l0i:3j|3l0j:3k|3l0k:3l|3l0l:3m|3l0m:3n|3l0n:3o|3l0o:3p|3l0p:3q|3l1k:31|3l1l:32|3l1m:33|3l1n:34|3l1o:35|3l1p:36|3l1q:37|3l1r:38|3l1s:39|3l1t:3a|3l1u:3b|3l1v:3c|3l20:3d|3l21:3e|3l22:3f|3l23:3g|3l24:3h|3l25:3i|3l26:3j|3l27:3k|3l28:3l|3l29:3m|3l2a:3n|3l2b:3o|3l2c:3p|3l2d:3q|3l38:31|3l39:32|3l3a:33|3l3b:34|3l3c:35|3l3d:36|3l3e:37|3l3f:38|3l3g:39|3l3h:3a|3l3i:3b|3l3j:3c|3l3k:3d|3l3l:3e|3l3m:3f|3l3n:3g|3l3o:3h|3l3p:3i|3l3q:3j|3l3r:3k|3l3s:3l|3l3t:3m|3l3u:3n|3l3v:3o|3l40:3p|3l41:3q|3l4s:31|3l4u:33|3l4v:34|3l52:37|3l55:3a|3l56:3b|3l59:3e|3l5a:3f|3l5b:3g|3l5c:3h|3l5e:3j|3l5f:3k|3l5g:3l|3l5h:3m|3l5i:3n|3l5j:3o|3l5k:3p|3l5l:3q|3l6g:31|3l6h:32|3l6i:33|3l6j:34|3l6k:35|3l6l:36|3l6m:37|3l6n:38|3l6o:39|3l6p:3a|3l6q:3b|3l6r:3c|3l6s:3d|3l6t:3e|3l6u:3f|3l6v:3g|3l70:3h|3l71:3i|3l72:3j|3l73:3k|3l74:3l|3l75:3m|3l76:3n|3l77:3o|3l78:3p|3l79:3q|3l84:31|3l85:32|3l87:34|3l88:35|3l89:36|3l8a:37|3l8d:3a|3l8e:3b|3l8f:3c|3l8g:3d|3l8h:3e|3l8i:3f|3l8j:3g|3l8k:3h|3l8m:3j|3l8n:3k|3l8o:3l|3l8p:3m|3l8q:3n|3l8r:3o|3l8s:3p|3l9o:31|3l9p:32|3l9r:34|3l9s:35|3l9t:36|3l9u:37|3la0:39|3la1:3a|3la2:3b|3la3:3c|3la4:3d|3la6:3f|3laa:3j|3lab:3k|3lac:3l|3lad:3m|3lae:3n|3laf:3o|3lag:3p|3lbc:31|3lbd:32|3lbe:33|3lbf:34|3lbg:35|3lbh:36|3lbi:37|3lbj:38|3lbk:39|3lbl:3a|3lbm:3b|3lbn:3c|3lbo:3d|3lbp:3e|3lbq:3f|3lbr:3g|3lbs:3h|3lbt:3i|3lbu:3j|3lbv:3k|3lc0:3l|3lc1:3m|3lc2:3n|3lc3:3o|3lc4:3p|3lc5:3q|3ld0:31|3ld1:32|3ld2:33|3ld3:34|3ld4:35|3ld5:36|3ld6:37|3ld7:38|3ld8:39|3ld9:3a|3lda:3b|3ldb:3c|3ldc:3d|3ldd:3e|3lde:3f|3ldf:3g|3ldg:3h|3ldh:3i|3ldi:3j|3ldj:3k|3ldk:3l|3ldl:3m|3ldm:3n|3ldn:3o|3ldo:3p|3ldp:3q|3lek:31|3lel:32|3lem:33|3len:34|3leo:35|3lep:36|3leq:37|3ler:38|3les:39|3let:3a|3leu:3b|3lev:3c|3lf0:3d|3lf1:3e|3lf2:3f|3lf3:3g|3lf4:3h|3lf5:3i|3lf6:3j|3lf7:3k|3lf8:3l|3lf9:3m|3lfa:3n|3lfb:3o|3lfc:3p|3lfd:3q|3lg8:31|3lg9:32|3lga:33|3lgb:34|3lgc:35|3lgd:36|3lge:37|3lgf:38|3lgg:39|3lgh:3a|3lgi:3b|3lgj:3c|3lgk:3d|3lgl:3e|3lgm:3f|3lgn:3g|3lgo:3h|3lgp:3i|3lgq:3j|3lgr:3k|3lgs:3l|3lgt:3m|3lgu:3n|3lgv:3o|3lh0:3p|3lh1:3q|3lhs:31|3lht:32|3lhu:33|3lhv:34|3li0:35|3li1:36|3li2:37|3li3:38|3li4:39|3li5:3a|3li6:3b|3li7:3c|3li8:3d|3li9:3e|3lia:3f|3lib:3g|3lic:3h|3lid:3i|3lie:3j|3lif:3k|3lig:3l|3lih:3m|3lii:3n|3lij:3o|3lik:3p|3lil:3q|3ljg:31|3ljh:32|3lji:33|3ljj:34|3ljk:35|3ljl:36|3ljm:37|3ljn:38|3ljo:39|3ljp:3a|3ljq:3b|3ljr:3c|3ljs:3d|3ljt:3e|3lju:3f|3ljv:3g|3lk0:3h|3lk1:3i|3lk2:3j|3lk3:3k|3lk4:3l|3lk5:3m|3lk6:3n|3lk7:3o|3lk8:3p|3lk9:3q|3ll8:th|3ll9:ti|3lla:tj|3llb:tk|3llc:tl|3lld:tm|3lle:tn|3llf:to|3llg:tp|3llh:tq|3lli:tr|3llj:ts|3llk:tt|3lll:tu|3llm:tv|3lln:u0|3llo:u1|3llp:to|3llq:u3|3llr:u4|3lls:u5|3llt:u6|3llu:u7|3llv:u8|3lm0:u9|3lmj:u3|3ln2:th|3ln3:ti|3ln4:tj|3ln5:tk|3ln6:tl|3ln7:tm|3ln8:tn|3ln9:to|3lna:tp|3lnb:tq|3lnc:tr|3lnd:ts|3lne:tt|3lnf:tu|3lng:tv|3lnh:u0|3lni:u1|3lnj:to|3lnk:u3|3lnl:u4|3lnm:u5|3lnn:u6|3lno:u7|3lnp:u8|3lnq:u9|3lod:u3|3los:th|3lot:ti|3lou:tj|3lov:tk|3lp0:tl|3lp1:tm|3lp2:tn|3lp3:to|3lp4:tp|3lp5:tq|3lp6:tr|3lp7:ts|3lp8:tt|3lp9:tu|3lpa:tv|3lpb:u0|3lpc:u1|3lpd:to|3lpe:u3|3lpf:u4|3lpg:u5|3lph:u6|3lpi:u7|3lpj:u8|3lpk:u9|3lq7:u3|3lqm:th|3lqn:ti|3lqo:tj|3lqp:tk|3lqq:tl|3lqr:tm|3lqs:tn|3lqt:to|3lqu:tp|3lqv:tq|3lr0:tr|3lr1:ts|3lr2:tt|3lr3:tu|3lr4:tv|3lr5:u0|3lr6:u1|3lr7:to|3lr8:u3|3lr9:u4|3lra:u5|3lrb:u6|3lrc:u7|3lrd:u8|3lre:u9|3ls1:u3|3lsg:th|3lsh:ti|3lsi:tj|3lsj:tk|3lsk:tl|3lsl:tm|3lsm:tn|3lsn:to|3lso:tp|3lsp:tq|3lsq:tr|3lsr:ts|3lss:tt|3lst:tu|3lsu:tv|3lsv:u0|3lt0:u1|3lt1:to|3lt2:u3|3lt3:u4|3lt4:u5|3lt5:u6|3lt6:u7|3lt7:u8|3lt8:u9|3ltr:u3',
                        r:
                            '23:2c|2i:2k|2m:2q|60:6m|6o:6u|bo:bp|c1:c2|c6:c7|c9:cb|ce:ch|cj:ck|cm:co|cs:ct|cv:d0|d6:d7|de:df|dh:dj|dn:do|e4:e5|e7:e8|ea:eb|fh:fi|fm:fo|s8:sa|se:sf|sh:t1|t3:tb|100:11f|19h:1am|7o8:7of|7oo:7ot|7p8:7pf|7po:7pv|7q8:7qd|7r8:7rf|7to:7tr|7u8:7ub|7uo:7ur|7v8:7vc|7vo:7vr|89a:89b|8b0:8bf|95m:96f|1vp1:1vpq|2100:2115',
                        s:
                            'v8|va|vc|ve|vk|130|132|134|136|138|13a|13c|13e|13g|13i|13k|13m|13o|13q|13s|13u|140|14a|14c|14e|14g|14i|14k|14m|14o|14q|14s|14u|150|152|154|156|158|15a|15c|15e|15g|15i|15k|15m|15o|15q|15s|15u|161|163|165|167|169|16b|16d|16g|16i|16k|16m|16o|16q|16s|16u|170|172|174|176|178|17a|17c|17e|17g|17i|17k|17o|180|182|184|186|188|18a|18c|18e|80|82|84|86|88|8a|8c|8e|8g|8i|8k|8m|8o|8q|8s|8u|90|92|94|96|98|9a|9c|9e|9i|9k|9m|9p|9r|9t|9v|a1|a3|a5|a7|aa|ac|ae|ag|ai|ak|am|ao|aq|as|au|b0|b2|b4|b6|b8|ba|bc|be|bg|bi|bk|bm|br|bt|c4|d2|d4|d9|dc|dl|ds|ed|ef|eh|ej|el|en|ep|er|eu|f0|f2|f4|f6|f8|fa|fc|fe|fk|fq|fs|fu|g0|g2|g4|g6|g8|ga|gc|ge|gg|gi|gk|gm|go|gq|gs|gu|h0|h2|h4|h6|h8|ha|hc|he|hg|hi|21|22|7g0|7g2|7g4|7g6|7g8|7ga|7gc|7ge|7gg|7gi|2d|7gk|7gm|7go|7gq|7gs|7gu|7h0|7h2|7h4|7h6|7h8|7ha|7hc|7he|7hg|7hi|7hk|7hm|7ho|7hq|7hs|7hu|7i0|7i2|7i4|7i6|7i8|7ia|7ic|7ie|7ig|7ii|7ik|7im|7io|7iq|7is|7iu|7j0|7j2|7j4|7j6|7j8|7ja|7jc|7je|7jg|7ji|7jk|7jm|2e|7jo|7jq|7js|7ju|7k0|7k2|7k4|7k6|7k8|7ka|7kc|7ke|7kg|7ki|7kk|7l0|7l2|7l4|7l6|7l8|7la|7lc|7le|7lg|7li|7lk|7lm|7lo|7lq|7ls|7lu|7m0|7m2|7m4|7m6|7m8|7ma|7mc|7me|7mg|7mi|7mk|7mm|7mo|7mq|2f|7ms|7mu|7n0|7n2|7n4|7n6|7n8|7na|7nc|7ne|7ng|7ni|7nk|7nm|7no|2g|7qp|7qr|7qt|7qv|2h|896|2l|s6|sc|uo|uq|us|uu|v0|v2|v4|v6'
                    },
                    'B.3': {
                        m:
                            '5l:ts|6v:3j;3j|9g:39;o7|a9:ls;3e|bv:3j|fg:3a;oc|q5:tp|sg:tp;o8;o1|tg:u5;o8;o1|u2:u3|ug:ti|uh:to|ul:u6|um:u0|vg:tq|vh:u1|vi:u3|vl:tl|1c7:1b5;1c2|7km:38;ph|7kn:3k;o8|7ko:3n;oa|7kp:3p;oa|7kq:31;lu|7kr:7j1|7qg:u5;oj|7qi:u5;oj;o0|7qk:u5;oj;o1|7qm:u5;oj;q2|7s0:7o0;tp|7s1:7o1;tp|7s2:7o2;tp|7s3:7o3;tp|7s4:7o4;tp|7s5:7o5;tp|7s6:7o6;tp|7s7:7o7;tp|7s8:7o0;tp|7s9:7o1;tp|7sa:7o2;tp|7sb:7o3;tp|7sc:7o4;tp|7sd:7o5;tp|7se:7o6;tp|7sf:7o7;tp|7sg:7p0;tp|7sh:7p1;tp|7si:7p2;tp|7sj:7p3;tp|7sk:7p4;tp|7sl:7p5;tp|7sm:7p6;tp|7sn:7p7;tp|7so:7p0;tp|7sp:7p1;tp|7sq:7p2;tp|7sr:7p3;tp|7ss:7p4;tp|7st:7p5;tp|7su:7p6;tp|7sv:7p7;tp|7t0:7r0;tp|7t1:7r1;tp|7t2:7r2;tp|7t3:7r3;tp|7t4:7r4;tp|7t5:7r5;tp|7t6:7r6;tp|7t7:7r7;tp|7t8:7r0;tp|7t9:7r1;tp|7ta:7r2;tp|7tb:7r3;tp|7tc:7r4;tp|7td:7r5;tp|7te:7r6;tp|7tf:7r7;tp|7ti:7rg;tp|7tj:th;tp|7tk:tc;tp|7tm:th;q2|7tn:th;q2;tp|7ts:th;tp|7tu:tp|7u2:7rk;tp|7u3:tn;tp|7u4:te;tp|7u6:tn;q2|7u7:tn;q2;tp|7uc:tn;tp|7ui:tp;o8;o0|7uj:tp;o8;o1|7um:tp;q2|7un:tp;o8;q2|7v2:u5;o8;o0|7v3:u5;o8;o1|7v4:u1;oj|7v6:u5;q2|7v7:u5;o8;q2|7vi:7rs;tp|7vj:u9;tp|7vk:ue;tp|7vm:u9;q2|7vn:u9;q2;tp|7vs:u9;tp|1uo0:36;36|1uo1:36;39|1uo2:36;3c|1uo3:36;36;39|1uo4:36;36;3c|1uo5:3j;3k|1uo6:3j;3k|1uoj:1bk;1bm|1uok:1bk;1b5|1uol:1bk;1bb|1uom:1bu;1bm|1uon:1bk;1bd',
                        r:
                            '23:2c|2i:2k|2m:2q|60:6m|6o:6u|bo:bp|c1:c2|c6:c7|c9:cb|ce:ch|cj:ck|cm:co|cs:ct|cv:d0|d6:d7|de:df|dh:dj|dn:do|e4:e5|e7:e8|ea:eb|fh:fi|fm:fo|s8:sa|se:sf|sh:t1|t3:tb|100:11f|19h:1am|7o8:7of|7oo:7ot|7p8:7pf|7po:7pv|7q8:7qd|7r8:7rf|7to:7tr|7u8:7ub|7uo:7ur|7v8:7vc|7vo:7vr|89a:89b|8b0:8bf|95m:96f|1vp1:1vpq|2100:2115',
                        s:
                            'v8|va|vc|ve|vk|130|132|134|136|138|13a|13c|13e|13g|13i|13k|13m|13o|13q|13s|13u|140|14a|14c|14e|14g|14i|14k|14m|14o|14q|14s|14u|150|152|154|156|158|15a|15c|15e|15g|15i|15k|15m|15o|15q|15s|15u|161|163|165|167|169|16b|16d|16g|16i|16k|16m|16o|16q|16s|16u|170|172|174|176|178|17a|17c|17e|17g|17i|17k|17o|180|182|184|186|188|18a|18c|18e|80|82|84|86|88|8a|8c|8e|8g|8i|8k|8m|8o|8q|8s|8u|90|92|94|96|98|9a|9c|9e|9i|9k|9m|9p|9r|9t|9v|a1|a3|a5|a7|aa|ac|ae|ag|ai|ak|am|ao|aq|as|au|b0|b2|b4|b6|b8|ba|bc|be|bg|bi|bk|bm|br|bt|c4|d2|d4|d9|dc|dl|ds|ed|ef|eh|ej|el|en|ep|er|eu|f0|f2|f4|f6|f8|fa|fc|fe|fk|fq|fs|fu|g0|g2|g4|g6|g8|ga|gc|ge|gg|gi|gk|gm|go|gq|gs|gu|h0|h2|h4|h6|h8|ha|hc|he|hg|hi|21|22|7g0|7g2|7g4|7g6|7g8|7ga|7gc|7ge|7gg|7gi|2d|7gk|7gm|7go|7gq|7gs|7gu|7h0|7h2|7h4|7h6|7h8|7ha|7hc|7he|7hg|7hi|7hk|7hm|7ho|7hq|7hs|7hu|7i0|7i2|7i4|7i6|7i8|7ia|7ic|7ie|7ig|7ii|7ik|7im|7io|7iq|7is|7iu|7j0|7j2|7j4|7j6|7j8|7ja|7jc|7je|7jg|7ji|7jk|7jm|2e|7jo|7jq|7js|7ju|7k0|7k2|7k4|7k6|7k8|7ka|7kc|7ke|7kg|7ki|7kk|7l0|7l2|7l4|7l6|7l8|7la|7lc|7le|7lg|7li|7lk|7lm|7lo|7lq|7ls|7lu|7m0|7m2|7m4|7m6|7m8|7ma|7mc|7me|7mg|7mi|7mk|7mm|7mo|7mq|2f|7ms|7mu|7n0|7n2|7n4|7n6|7n8|7na|7nc|7ne|7ng|7ni|7nk|7nm|7no|2g|7qp|7qr|7qt|7qv|2h|896|2l|s6|sc|uo|uq|us|uu|v0|v2|v4|v6'
                    },
                    'C.1.1': { s: '10' },
                    'C.1.2': { r: '800:80b', s: 'c00|50|5k0|81f|82v' },
                    'C.2.1': { r: '0:v', s: '3v' },
                    'C.2.2': {
                        r: '40:4v|80c:80d|818:819|830:833|83a:83f|1vvp:1vvs|3kbj:3kbq',
                        s: '1mt|1of|60e|1vnv'
                    },
                    'C.3': { r: '1o00:1u7v|u000:vvvt|10000:11vvt' },
                    'C.4': {
                        r:
                            '1veg:1vff|1vvu:1vvv|3vvu:3vvv|5vvu:5vvv|7vvu:7vvv|9vvu:9vvv|bvvu:bvvv|dvvu:dvvv|fvvu:fvvv|hvvu:hvvv|jvvu:jvvv|lvvu:lvvv|nvvu:nvvv|pvvu:pvvv|rvvu:rvvv|tvvu:tvvv|vvvu:vvvv|11vvu:11vvv'
                    },
                    'C.5': { r: '1m00:1nvv' },
                    'C.6': { r: '1vvp:1vvt' },
                    'C.7': { r: 'bvg:bvr' },
                    'C.8': { r: 'q0:q1|80e:80f|81a:81e|83a:83f' },
                    'C.9': { r: 's010:s03v', s: 's001' },
                    'D.1': {
                        r:
                            '1eg:1fa|1fg:1fk|1h1:1hq|1i0:1ia|1jd:1jf|1jh:1ml|1n5:1n6|1nq:1nu|1o0:1od|1oi:1pc|1s0:1t5|1uov:1up8|1upa:1upm|1upo:1ups|1uq0:1uq1|1uq3:1uq4|1uq6:1uth|1uuj:1v9t|1vag:1vcf|1vci:1ve7|1vfg:1vfs|1vjg:1vjk|1vjm:1vns',
                        s: '1du|1e0|1e3|1gr|1gv|1mt|1og|1th|1uot|1upu|80f'
                    },
                    'D.2': {
                        r:
                            '21:2q|31:3q|60:6m|6o:7m|7o:h0|h2:hj|ig:ld|lg:lo|lr:m1|mg:mh|n0:n4|s8:sa|se:t1|t3:ue|ug:vl|100:142|14a:16e|16g:17l|17o:17p|180:18f|19h:1am|1ap:1av|1b1:1c7|285:29p|29t:2a0|2a9:2ac|2ao:2b1|2b4:2bg|2c2:2c3|2c5:2cc|2cf:2cg|2cj:2d8|2da:2dg|2dm:2dp|2du:2e0|2e7:2e8|2eb:2ec|2es:2et|2ev:2f1|2f6:2fh|2fk:2fq|2g5:2ga|2gf:2gg|2gj:2h8|2ha:2hg|2hi:2hj|2hl:2hm|2ho:2hp|2hu:2i0|2ip:2is|2j6:2jf|2ji:2jk|2k5:2kb|2kf:2kh|2kj:2l8|2la:2lg|2li:2lj|2ll:2lp|2lt:2m0|2mb:2mc|2n6:2nf|2o2:2o3|2o5:2oc|2of:2og|2oj:2p8|2pa:2pg|2pi:2pj|2pm:2pp|2pt:2pu|2q7:2q8|2qb:2qc|2qs:2qt|2qv:2r1|2r6:2rg|2s5:2sa|2se:2sg|2si:2sl|2sp:2sq|2su:2sv|2t3:2t4|2t8:2ta|2te:2tl|2tn:2tp|2tu:2tv|2u1:2u2|2u6:2u8|2ua:2uc|2v7:2vi|301:303|305:30c|30e:30g|30i:318|31a:31j|31l:31p|321:324|330:331|336:33f|342:343|345:34c|34e:34g|34i:358|35a:35j|35l:35p|360:364|367:368|36a:36b|36l:36m|370:371|376:37f|382:383|385:38c|38e:38g|38i:398|39a:39p|39u:3a0|3a6:3a8|3aa:3ac|3b0:3b1|3b6:3bf|3c2:3c3|3c5:3cm|3cq:3dh|3dj:3dr|3e0:3e6|3ef:3eh|3eo:3ev|3fi:3fk|3g1:3hg|3hi:3hj|3i0:3i6|3if:3ir|3k1:3k2|3k7:3k8|3kk:3kn|3kp:3kv|3l1:3l3|3la:3lb|3ld:3lg|3li:3lj|3m0:3m4|3mg:3mp|3ms:3mt|3o0:3on|3oq:3pk|3pu:3q7|3q9:3ra|3s8:3sb|3tu:3u5|3u7:3uc|400:411|413:417|419:41a|420:42n|450:465|46g:47o|480:4ap|4av:4d2|4d8:4fp|4g0:4g6|4g8:4i6|4ia:4id|4ig:4im|4iq:4it|4j0:4k6|4ka:4kd|4kg:4le|4li:4ll|4lo:4lu|4m2:4m5|4m8:4me|4mg:4mm|4mo:4ne|4ng:4oe|4oi:4ol|4oo:4ou|4p0:4q6|4q8:4qq|4r1:4rs|4t0:4vk|501:5jm|5k1:5kq|5l0:5ng|5o0:5oc|5oe:5oh|5p0:5ph|5pl:5pm|5q0:5qh|5r0:5rc|5re:5rg|5s0:5tm|5tu:5u5|5u7:5u8|5uk:5uq|5v0:5v9|60g:60p|610:63n|640:658|7g0:7kr|7l0:7np|7o0:7ol|7oo:7ot|7p0:7q5|7q8:7qd|7qg:7qn|7qv:7rt|7s0:7tk|7tm:7ts|7u2:7u4|7u6:7uc|7ug:7uj|7um:7ur|7v0:7vc|7vi:7vk|7vm:7vs|88a:88j|88p:88t|89a:89d|89f:89h|89j:89p|89t:89v|8a5:8a9|8b0:8c3|8pm:8rq|94s:979|c05:c07|c11:c19|c1h:c1l|c1o:c1s|c21:c4m|c4t:c4v|c51:c7q|c7s:c7v|c85:c9c|c9h:cce|ccg:cdn|cfg:cgs|ch0:ci3|cj0:cjr|cjv:clg|cm0:cmb|cmg:cnu|co0:crm|crr:cut|cv0:cvu|d00:jdl|jg0:17t5|1800:194c|1b00:1lt3|1m00:1uhd|1uhg:1uja|1uo0:1uo6|1uoj:1uon|1vp1:1vpq|1vq1:1vqq|1vr6:1vtu|1vu2:1vu7|1vua:1vuf|1vui:1vun|1vuq:1vus|20o0:20ou|20p0:20p3|20pg:20qa|2100:2115|2118:212d|3k00:3k7l|3k80:3k96|3k9a:3kb6|3kba:3kbi|3kc3:3kc4|3kcc:3kd9|3kde:3ket|3l00:3l2k|3l2m:3l4s|3l4u:3l4v|3l55:3l56|3l59:3l5c|3l5e:3l5p|3l5t:3l60|3l62:3l63|3l65:3l85|3l87:3l8a|3l8d:3l8k|3l8m:3l8s|3l8u:3l9p|3l9r:3l9u|3la0:3la4|3laa:3lag|3lai:3ll3|3ll8:3lu9|4000:59mm|5u00:5ugt|u000:vvvt|10000:11vvt',
                        s:
                            '3l52|3l5r|3la6|1c9|5a|5l|5q|283|2ag|2di|2en|2iu|2k3|2kd|2m9|2mg|2n0|2q0|2qn|2s3|2ss|2un|35u|36u|3an|3dt|3k4|3ka|3kd|3l5|3l7|3lt|3m6|3pm|3po|3rv|3s5|3uf|41c|41h|41o|47r|4i8|4io|4k8|4lg|4m0|4og|5us|ne|7qp|7qr|7qt|7tu|80e|83h|83v|882|887|88l|894|896|898|rq|s6|sc|8sl'
                    }
                };
                class m {
                    constructor(e, t) {
                        (this.singles = new Set()), (this.ranges = []), (this.mappings = new Map());
                        const n = f[e];
                        (this.name = e),
                            n
                                ? (n.s &&
                                      (this.singles = new Set(
                                          n.s.split('|').map(e => parseInt(e, 32))
                                      )),
                                  n.r &&
                                      (this.ranges = n.r.split('|').map(e => {
                                          const [t, n] = e.split(':');
                                          return [parseInt(t, 32), parseInt(n, 32)];
                                      })),
                                  n.m &&
                                      (this.mappings = new Map(
                                          n.m.split('|').map(e => {
                                              const [t, n] = e.split(':'),
                                                  i = n.split(';').map(e => parseInt(e, 32));
                                              return [parseInt(t, 32), i];
                                          })
                                      )))
                                : t && (this.singles = new Set(t));
                    }
                    contains(e) {
                        if (this.singles.has(e)) return !0;
                        let t = 0,
                            n = this.ranges.length - 1;
                        for (; t <= n; ) {
                            const i = Math.floor((t + n) / 2),
                                s = this.ranges[i];
                            if (e < s[0]) n = i - 1;
                            else {
                                if (!(e > s[1])) return !0;
                                t = i + 1;
                            }
                        }
                        return !1;
                    }
                    hasMapping(e) {
                        return this.mappings.has(e) || this.contains(e);
                    }
                    map(e) {
                        return this.contains(e) && !this.mappings.has(e)
                            ? String.fromCodePoint(e).toLowerCase().codePointAt(0)
                            : this.mappings.get(e) || null;
                    }
                }
                const g = new m('A.1'),
                    b = new m('B.1'),
                    y = new m('B.2'),
                    v = (new m('B.3'), new m('C.1.1')),
                    w = new m('C.1.2'),
                    _ = new m('C.2.1'),
                    x = new m('C.2.2'),
                    j = new m('C.3'),
                    S = new m('C.4'),
                    k = new m('C.5'),
                    T = new m('C.6'),
                    O = new m('C.7'),
                    I = new m('C.8'),
                    E = new m('C.9'),
                    C = new m('D.1'),
                    R = new m('D.2');
                function N(e, t, n = '') {
                    const i = c.a.ucs2.decode(n);
                    let s = [];
                    for (const n of i) {
                        if (!t && e.unassigned.contains(n))
                            throw new Error('Unassigned code point: x' + n.toString(16));
                        let i = !1;
                        for (const t of e.mappings) {
                            if (!t.hasMapping(n)) continue;
                            i = !0;
                            const e = t.map(n);
                            e && (Array.isArray(e) ? (s = s.concat(e)) : s.push(e));
                        }
                        i || s.push(n);
                    }
                    let r = s;
                    if (e.normalize) {
                        const e = c.a.ucs2.encode(s).normalize('NFKC');
                        r = c.a.ucs2.decode(e);
                    }
                    let a = !1,
                        o = !1;
                    for (const n of r) {
                        for (const t of e.prohibited)
                            if (t.contains(n))
                                throw new Error('Prohibited code point: x' + n.toString(16));
                        if (!t && e.unassigned.contains(n))
                            throw new Error('Prohibited code point: x' + n.toString(16));
                        e.bidirectional && ((a = a || C.contains(n)), (o = o || R.contains(n)));
                    }
                    if (e.bidirectional) {
                        if (a && o)
                            throw new Error('String contained both LCat and RandALCat code points');
                        if (a && (!C.contains(r[0]) || !C.contains(r[r.length - 1])))
                            throw new Error(
                                'String containing RandALCat code points must start and end with RandALCat code points'
                            );
                    }
                    return c.a.ucs2.encode(r);
                }
                (b.map = () => null),
                    (v.contains = e => 32 === e),
                    (w.map = e => (w.contains(e) ? 32 : null));
                const q = {
                    bidirectional: !0,
                    mappings: [b, y],
                    normalize: !0,
                    prohibited: [w, x, j, S, k, T, O, I, E],
                    unassigned: g
                };
                const A = new m('NodePrepProhibited', [34, 38, 39, 47, 58, 60, 62, 64]),
                    F = {
                        bidirectional: !0,
                        mappings: [b, y],
                        normalize: !0,
                        prohibited: [v, w, _, x, j, S, k, T, O, I, E, A],
                        unassigned: g
                    };
                const P = {
                    bidirectional: !0,
                    mappings: [b],
                    normalize: !0,
                    prohibited: [w, _, x, j, S, k, T, O, I, E],
                    unassigned: g
                };
                const L = {
                    bidirectional: !0,
                    mappings: [w, b],
                    normalize: !0,
                    prohibited: [w, _, x, j, S, k, T, O, I, E],
                    unassigned: g
                };
                function M(e, t = !1) {
                    return N(L, t, e);
                }
                function D(e = '') {
                    return e
                        .replace(/^\s+|\s+$/g, '')
                        .replace(/\\5c/g, '\\5c5c')
                        .replace(/\\20/g, '\\5c20')
                        .replace(/\\22/g, '\\5c22')
                        .replace(/\\26/g, '\\5c26')
                        .replace(/\\27/g, '\\5c27')
                        .replace(/\\2f/g, '\\5c2f')
                        .replace(/\\3a/g, '\\5c3a')
                        .replace(/\\3c/g, '\\5c3c')
                        .replace(/\\3e/g, '\\5c3e')
                        .replace(/\\40/g, '\\5c40')
                        .replace(/ /g, '\\20')
                        .replace(/"/g, '\\22')
                        .replace(/&/g, '\\26')
                        .replace(/'/g, '\\27')
                        .replace(/\//g, '\\2f')
                        .replace(/:/g, '\\3a')
                        .replace(/</g, '\\3c')
                        .replace(/>/g, '\\3e')
                        .replace(/@/g, '\\40');
                }
                function B(e) {
                    return e
                        .replace(/\\20/g, ' ')
                        .replace(/\\22/g, '"')
                        .replace(/\\26/g, '&')
                        .replace(/\\27/g, "'")
                        .replace(/\\2f/g, '/')
                        .replace(/\\3a/g, ':')
                        .replace(/\\3c/g, '<')
                        .replace(/\\3e/g, '>')
                        .replace(/\\40/g, '@')
                        .replace(/\\5c/g, '\\');
                }
                function U(e) {
                    let t = e.local || '',
                        n = e.domain,
                        i = e.resource || '';
                    return (
                        t &&
                            (t = (function (e, t = !0) {
                                return N(F, t, e);
                            })(t)),
                        i &&
                            (i = (function (e, t = !0) {
                                return N(P, t, e);
                            })(i)),
                        '.' === n[n.length - 1] && (n = n.slice(0, n.length - 1)),
                        (n = (function (e, t = !0) {
                            return N(q, t, e);
                        })(n.split('.').map(c.a.toUnicode).join('.'))),
                        { domain: n, local: t, resource: i }
                    );
                }
                function z(e, t = {}) {
                    let n = e.local;
                    t.escaped || (n = D(e.local));
                    const i = t.prepared
                            ? e
                            : U({ local: n, domain: e.domain, resource: e.resource }),
                        s = n ? `${n}@${i.domain}` : i.domain;
                    return i.resource ? `${s}/${i.resource}` : s;
                }
                function V(e, t) {
                    return t ? `${Y(e)}/${t}` : Y(e);
                }
                function $(e = '') {
                    let t = '',
                        n = '',
                        i = '';
                    const s = e.indexOf('/');
                    s > 0 && ((i = e.slice(s + 1)), (e = e.slice(0, s)));
                    const r = e.indexOf('@');
                    r > 0 && ((t = e.slice(0, r)), (e = e.slice(r + 1))), (n = e);
                    const a = U({ domain: n, local: t, resource: i });
                    return {
                        bare: z(
                            { local: a.local, domain: a.domain },
                            { escaped: !0, prepared: !0 }
                        ),
                        domain: a.domain,
                        full: z(a, { escaped: !0, prepared: !0 }),
                        local: B(a.local),
                        resource: a.resource
                    };
                }
                function Q(e, t) {
                    const n = new Set();
                    if ((n.add(void 0), n.add(''), e)) {
                        const t = $(e);
                        n.add(t.full), n.add(t.bare), n.add(t.domain);
                    }
                    if (t) {
                        const e = $(t);
                        n.add(e.domain), n.add(e.bare), n.add(e.full);
                    }
                    return n;
                }
                function W(e, t) {
                    if (!e || !t) return !1;
                    const n = $(e),
                        i = $(t);
                    return n.local === i.local && n.domain === i.domain;
                }
                function G(e) {
                    return !!$(e).resource;
                }
                function H(e = '') {
                    return $(e).domain;
                }
                function J(e = '') {
                    return $(e).resource;
                }
                function Y(e = '') {
                    return $(e).bare;
                }
                var K,
                    X = Object.freeze({
                        __proto__: null,
                        escapeLocal: D,
                        unescapeLocal: B,
                        prepare: U,
                        create: z,
                        createFull: V,
                        parse: $,
                        allowedResponders: Q,
                        equal: function (e, t) {
                            if (!e || !t) return !1;
                            const n = $(e),
                                i = $(t);
                            return (
                                n.local === i.local &&
                                n.domain === i.domain &&
                                n.resource === i.resource
                            );
                        },
                        equalBare: W,
                        isFull: G,
                        isBare: function (e) {
                            return !G(e);
                        },
                        getLocal: function (e = '') {
                            return $(e).local;
                        },
                        getDomain: H,
                        getResource: J,
                        toBare: Y,
                        parseURI: function (e) {
                            const t = new URL(e);
                            if ('xmpp:' !== t.protocol)
                                throw new Error('Invalid XMPP URI, wrong protocol: ' + t.protocol);
                            const n = t.hostname
                                    ? t.username
                                        ? z(
                                              {
                                                  domain: decodeURIComponent(t.hostname),
                                                  local: decodeURIComponent(t.username)
                                              },
                                              { escaped: !0 }
                                          )
                                        : decodeURIComponent(t.hostname)
                                    : void 0,
                                i = $(decodeURIComponent(n ? t.pathname.substr(1) : t.pathname))
                                    .full,
                                s = t.search && t.search.indexOf(';') >= 1,
                                r = s ? t.search.substr(t.search.indexOf(';') + 1) : '',
                                a = t.search
                                    ? decodeURIComponent(
                                          t.search.substr(1, s ? t.search.indexOf(';') - 1 : void 0)
                                      )
                                    : void 0,
                                o = {};
                            for (const e of r.split(';')) {
                                const [t, n] = e.split('=').map(decodeURIComponent);
                                if (o[t]) {
                                    const e = o[t];
                                    Array.isArray(e) ? e.push(n) : (o[t] = [e, n]);
                                } else o[t] = n;
                            }
                            return { action: a, identity: n, jid: i, parameters: o };
                        },
                        toURI: function (e) {
                            const t = ['xmpp:'],
                                n = (e, n) => {
                                    const i = $(e);
                                    i.local &&
                                        (t.push(encodeURIComponent(D(i.local))), t.push('@')),
                                        t.push(encodeURIComponent(i.domain)),
                                        n &&
                                            i.resource &&
                                            (t.push('/'), t.push(encodeURIComponent(i.resource)));
                                };
                            e.identity && (t.push('//'), n(e.identity, !1), e.jid && t.push('/')),
                                e.jid && n(e.jid, !0),
                                e.action && (t.push('?'), t.push(encodeURIComponent(e.action)));
                            for (const [n, i] of Object.entries(e.parameters || {}))
                                for (const e of Array.isArray(i) ? i : [i])
                                    t.push(';'),
                                        t.push(encodeURIComponent(n)),
                                        void 0 !== e &&
                                            (t.push('='), t.push(encodeURIComponent(e)));
                            return t.join('');
                        }
                    });
                !(function (e) {
                    (e.NotWellFormed = 'not-well-formed'),
                        (e.RestrictedXML = 'restricted-xml'),
                        (e.AlreadyClosed = 'already-closed'),
                        (e.UnknownRoot = 'unknown-stream-root');
                })(K || (K = {}));
                class Z extends Error {
                    constructor(e) {
                        super(e.text),
                            (this.isJXTError = !0),
                            (this.condition = e.condition),
                            (this.text = e.text);
                    }
                    static notWellFormed(e) {
                        return new Z({ condition: K.NotWellFormed, text: e });
                    }
                    static restrictedXML(e) {
                        return new Z({ condition: K.RestrictedXML, text: e });
                    }
                    static alreadyClosed(e) {
                        return new Z({ condition: K.AlreadyClosed, text: e });
                    }
                    static unknownRoot(e) {
                        return new Z({ condition: K.UnknownRoot, text: e });
                    }
                }
                const ee = { '"': '&quot;', '&': '&amp;', "'": '&apos;', '<': '&lt;', '>': '&gt;' },
                    te = { '&amp;': '&', '&apos;': "'", '&gt;': '>', '&lt;': '<', '&quot;': '"' },
                    ne = /&([a-zA-Z0-9]+|#[0-9]+|#x[0-9a-fA-F]+);/g,
                    ie = /&|<|>|"|'/g,
                    se = /&|<|>/g;
                function re(e) {
                    return ee[e];
                }
                function ae(e) {
                    return e.replace(ie, re);
                }
                function oe(e) {
                    return e.replace(ne, e =>
                        (function (e) {
                            if (te[e]) return te[e];
                            const t = e.startsWith('&#x'),
                                n = parseInt(e.substring(t ? 3 : 2, e.length - 1), t ? 16 : 10);
                            if (
                                9 === n ||
                                10 === n ||
                                13 === n ||
                                (32 <= n && n <= 55295) ||
                                (57344 <= n && n <= 65533) ||
                                (65536 <= n && n <= 1114111)
                            )
                                return String.fromCodePoint(n);
                            throw Z.restrictedXML('Prohibited entity: ' + e);
                        })(e)
                    );
                }
                function ce(e) {
                    return e.replace(se, re);
                }
                function le(e, t = [], n = '') {
                    const i = new Set(e.map(e => e.toLowerCase()));
                    for (let e of t.map(e => e.toLowerCase()))
                        if ('*' !== e)
                            for (; e.length > 0; ) {
                                if (i.has(e)) return e;
                                (e = e.substring(0, e.lastIndexOf('-')).toLowerCase()),
                                    e.lastIndexOf('-') === e.length - 2 &&
                                        (e = e.substring(0, e.lastIndexOf('-')));
                            }
                    return n;
                }
                class ue {
                    constructor(e, t = {}, n = []) {
                        (this.name = e),
                            (this.attributes = t),
                            (this.children = []),
                            (this.optionalNamespaces = {});
                        for (const e of n)
                            if ('string' != typeof e) {
                                const t = new ue(e.name, e.attributes, e.children);
                                (t.parent = this), this.children.push(t);
                            } else this.children.push(e);
                    }
                    getName() {
                        return this.name.indexOf(':') >= 0
                            ? this.name.substr(this.name.indexOf(':') + 1)
                            : this.name;
                    }
                    getNamespace() {
                        if (this.name.indexOf(':') >= 0) {
                            const e = this.name.substr(0, this.name.indexOf(':'));
                            return this.findNamespaceForPrefix(e);
                        }
                        return this.findNamespaceForPrefix();
                    }
                    getNamespaceContext() {
                        let e = {};
                        this.parent && (e = this.parent.getNamespaceContext());
                        for (const [t, n] of Object.entries(this.attributes))
                            if (t.startsWith('xmlns:')) {
                                const i = t.substr(6);
                                e[n] = i;
                            }
                        return e;
                    }
                    getDefaultNamespace() {
                        return this.attributes.xmlns
                            ? this.attributes.xmlns
                            : this.parent
                            ? this.parent.getDefaultNamespace()
                            : '';
                    }
                    getNamespaceRoot(e) {
                        if (this.parent) {
                            const t = this.parent.getNamespaceRoot(e);
                            if (t) return t;
                        }
                        for (const [t, n] of Object.entries(this.attributes))
                            if (t.startsWith('xmlns:') && n === e) return this;
                        if (this.optionalNamespaces[e]) return this;
                    }
                    getAttribute(e, t) {
                        if (!t) return this.attributes[e];
                        const n = this.getNamespaceContext();
                        return n[t] ? this.attributes[[n[t], e].join(':')] : void 0;
                    }
                    getChild(e, t) {
                        return this.getChildren(e, t)[0];
                    }
                    getChildren(e, t) {
                        const n = [];
                        for (const i of this.children)
                            'string' == typeof i ||
                                i.getName() !== e ||
                                (t && i.getNamespace() !== t) ||
                                n.push(i);
                        return n;
                    }
                    getText() {
                        let e = '';
                        for (const t of this.children) 'string' == typeof t && (e += t);
                        return e;
                    }
                    appendChild(e) {
                        return this.children.push(e), 'string' != typeof e && (e.parent = this), e;
                    }
                    setAttribute(e, t, n = !1) {
                        (this.attributes[e] = t || void 0),
                            '' === t && n && (this.attributes[e] = t);
                    }
                    addOptionalNamespace(e, t) {
                        this.optionalNamespaces[t] = e;
                    }
                    useNamespace(e, t) {
                        return (
                            this.optionalNamespaces[t] && (e = this.optionalNamespaces[t]),
                            this.setAttribute('xmlns:' + e, t),
                            e
                        );
                    }
                    toJSON() {
                        const e = this.children
                                .map(e => ('string' == typeof e ? e : e ? e.toJSON() : void 0))
                                .filter(e => !!e),
                            t = {};
                        for (const [e, n] of Object.entries(this.attributes))
                            null != n && (t[e] = n);
                        return { attributes: t, children: e, name: this.name };
                    }
                    toString() {
                        let e = this.openTag(!0);
                        if (this.children.length) {
                            for (const t of this.children)
                                'string' == typeof t ? (e += ce(t)) : t && (e += t.toString());
                            e += this.closeTag();
                        }
                        return e;
                    }
                    openTag(e = !1) {
                        let t = '';
                        t += '<' + this.name;
                        for (const [e, n] of Object.entries(this.attributes))
                            void 0 !== n && (t += ` ${e}="${ae(n.toString())}"`);
                        return e && 0 === this.children.length ? (t += '/>') : (t += '>'), t;
                    }
                    closeTag() {
                        return `</${this.name}>`;
                    }
                    findNamespaceForPrefix(e) {
                        if (e) {
                            const t = 'xmlns:' + e;
                            if (this.attributes[t]) return this.attributes[t];
                            if (this.parent) return this.parent.findNamespaceForPrefix(e);
                        } else {
                            if (this.attributes.xmlns) return this.attributes.xmlns;
                            if (this.parent) return this.parent.findNamespaceForPrefix();
                        }
                        return '';
                    }
                }
                const pe = new Set([
                        'a',
                        'blockquote',
                        'br',
                        'cite',
                        'em',
                        'img',
                        'li',
                        'ol',
                        'p',
                        'span',
                        'strong',
                        'ul'
                    ]),
                    de = new Set(['style']),
                    he = new Map([
                        ['a', new Set(['href', 'style'])],
                        ['body', new Set(['style', 'xml:lang'])],
                        ['blockquote', de],
                        ['br', de],
                        ['cite', de],
                        ['em', de],
                        ['img', new Set(['alt', 'height', 'src', 'style', 'width'])],
                        ['li', de],
                        ['ol', de],
                        ['p', de],
                        ['span', de],
                        ['strong', de],
                        ['ul', de]
                    ]),
                    fe = new Map([
                        ['font-style', /normal|italic|oblique|inherit/i],
                        ['font-weight', /normal|bold|bolder|lighter|inherit|\d\d\d/i],
                        ['text-decoration', /none|underline|overline|line-through|blink|inherit/i]
                    ]),
                    me = e =>
                        !!e.match(
                            /^(https?|xmpp|cid|mailto|ftps?|im|ircs?|sips?|tel|geo|bitcoin|magnet):/i
                        ) && e,
                    ge = e => !!e.match(/^[0-9]*$/) && e,
                    be = {
                        alt: e => e,
                        height: ge,
                        href: me,
                        src: me,
                        style: e => {
                            const t = (';' + e)
                                    .replace(/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, '')
                                    .replace(/\/\*.*/, '')
                                    .replace(/\\([a-fA-F0-9]{1,6})\s?/, (e, t) =>
                                        String.fromCharCode(parseInt(t, 16))
                                    )
                                    .match(/;\s*([a-z-]+)\s*:\s*([^;]*[^\s;])\s*/g),
                                n = [];
                            if (!t) return !1;
                            for (const e of t) {
                                const t = e.match(/^;\s*([a-z-]+)\s*:\s*([^;]*[^\s])\s*$/);
                                if (!t) continue;
                                const i = fe.get(t[1]);
                                if (i) {
                                    const e = t[2].match(i);
                                    e && n.push(`${t[1]}:${e[0]}`);
                                }
                            }
                            return !!n.length && n.join('');
                        },
                        width: ge
                    };
                function ye(e) {
                    if ('string' == typeof e) return e;
                    if (!pe.has(e.name)) {
                        if ('script' === e.name) return;
                        return (function (e) {
                            let t = [];
                            for (const n of e.children)
                                if ('string' == typeof n) t.push(n);
                                else {
                                    const e = ye(n);
                                    e && (Array.isArray(e) ? (t = t.concat(e)) : t.push(e));
                                }
                            return t;
                        })(e);
                    }
                    const t = e.children.map(ye).filter(e => void 0 !== e),
                        n = {};
                    for (const [t, i] of Object.entries(e.attributes)) {
                        const s = he.get(e.name);
                        if (!s || !s.has(t)) continue;
                        if (!i) continue;
                        const r = be[t](i);
                        r && (n[t] = r);
                    }
                    return { attributes: n, children: t, name: e.name };
                }
                function ve(e) {
                    if ('string' == typeof e) return;
                    let t = [];
                    for (const n of e.children) {
                        if (!n) continue;
                        if ('string' == typeof n) {
                            t.push(n);
                            continue;
                        }
                        const e = ye(n);
                        Array.isArray(e) ? (t = t.concat(e)) : e && t.push(e);
                    }
                    const n = {};
                    return 'body' === e.name
                        ? (void 0 !== e.attributes.xmlns && (n.xmlns = e.attributes.xmlns),
                          e.attributes.style && (n.style = e.attributes.style),
                          void 0 !== e.attributes['xml:lang'] &&
                              (n['xml:lang'] = e.attributes['xml:lang']),
                          { attributes: n, children: t, name: 'body' })
                        : void 0;
                }
                function we(e) {
                    return (97 <= e && e <= 122) || (65 <= e && e <= 90) || 58 === e || 95 === e;
                }
                function _e(e) {
                    return (
                        (192 <= e && e <= 214) ||
                        (216 <= e && e <= 246) ||
                        (248 <= e && e <= 767) ||
                        (880 <= e && e <= 893) ||
                        (895 <= e && e <= 8191) ||
                        (8204 <= e && e <= 8205) ||
                        (8304 <= e && e <= 8591) ||
                        (11264 <= e && e <= 12271) ||
                        (12289 <= e && e <= 55295) ||
                        (65008 <= e && e <= 65533) ||
                        (65536 <= e && e <= 983039)
                    );
                }
                function xe(e) {
                    return we(e) || _e(e);
                }
                function je(e) {
                    return (
                        we(e) ||
                        45 === e ||
                        46 === e ||
                        (48 <= e && e <= 57) ||
                        183 === e ||
                        (768 <= e && e <= 879) ||
                        (8255 <= e && e <= 8256) ||
                        _e(e)
                    );
                }
                function Se(e) {
                    return 32 === e || 10 === e || 13 === e || 9 === e;
                }
                class ke extends a.EventEmitter {
                    constructor(e = {}) {
                        super(),
                            (this.allowComments = !0),
                            (this.attributes = {}),
                            (this.state = 34),
                            (this.tagName = ''),
                            (this.haveDeclaration = !1),
                            (this.recordBuffer = []),
                            void 0 !== e.allowComments && (this.allowComments = e.allowComments);
                    }
                    write(e) {
                        for (const t of e) {
                            const e = t.codePointAt(0);
                            switch (this.state) {
                                case 34:
                                    if (60 === e) {
                                        let e;
                                        try {
                                            e = oe(this.endRecord());
                                        } catch (e) {
                                            return void this.emit('error', e);
                                        }
                                        e && this.emit('text', e), this.transition(31);
                                        continue;
                                    }
                                    this.record(t);
                                    continue;
                                case 31:
                                    if (47 === e) {
                                        this.transition(7);
                                        continue;
                                    }
                                    if (33 === e) {
                                        this.transition(24);
                                        continue;
                                    }
                                    if (63 === e) {
                                        this.haveDeclaration && this.restrictedXML(),
                                            this.transition(25);
                                        continue;
                                    }
                                    if (xe(e)) {
                                        this.transition(30), this.startRecord(t);
                                        continue;
                                    }
                                    return this.notWellFormed();
                                case 30:
                                    if (je(e)) {
                                        this.record(t);
                                        continue;
                                    }
                                    if (Se(e)) {
                                        this.startTag(), this.transition(32);
                                        continue;
                                    }
                                    if (47 === e) {
                                        this.startTag(), this.transition(29);
                                        continue;
                                    }
                                    if (62 === e) {
                                        this.startTag(),
                                            this.transition(34),
                                            this.emit(
                                                'startElement',
                                                this.tagName,
                                                this.attributes
                                            );
                                        continue;
                                    }
                                    return this.notWellFormed();
                                case 29:
                                    if (62 === e) {
                                        this.emit('startElement', this.tagName, this.attributes),
                                            this.emit('endElement', this.tagName),
                                            this.transition(34);
                                        continue;
                                    }
                                    return this.notWellFormed();
                                case 33:
                                    if (Se(e)) {
                                        this.transition(32);
                                        continue;
                                    }
                                    if (47 === e) {
                                        this.transition(29);
                                        continue;
                                    }
                                    if (62 === e) {
                                        this.emit('startElement', this.tagName, this.attributes),
                                            this.transition(34);
                                        continue;
                                    }
                                    return this.notWellFormed();
                                case 32:
                                    if (Se(e)) continue;
                                    if (xe(e)) {
                                        this.startRecord(t), this.transition(0);
                                        continue;
                                    }
                                    if (47 === e) {
                                        this.transition(29);
                                        continue;
                                    }
                                    if (62 === e) {
                                        this.emit('startElement', this.tagName, this.attributes),
                                            this.transition(34);
                                        continue;
                                    }
                                    return this.notWellFormed();
                                case 7:
                                    if (xe(e)) {
                                        this.startRecord(t), this.transition(6);
                                        continue;
                                    }
                                    return this.notWellFormed();
                                case 6:
                                    if (je(e)) {
                                        this.record(t);
                                        continue;
                                    }
                                    if (Se(e)) {
                                        this.transition(8);
                                        continue;
                                    }
                                    if (62 === e) {
                                        const e = this.endRecord();
                                        this.emit('endElement', e, this.attributes),
                                            this.transition(34);
                                        continue;
                                    }
                                    return this.notWellFormed();
                                case 8:
                                    if (Se(e)) continue;
                                    if (62 === e) {
                                        const e = this.endRecord();
                                        this.emit('endElement', e, this.attributes),
                                            this.transition(34);
                                        continue;
                                    }
                                    return this.notWellFormed();
                                case 0:
                                    if (je(e)) {
                                        this.record(t);
                                        continue;
                                    }
                                    if (61 === e) {
                                        this.addAttribute(), this.transition(4);
                                        continue;
                                    }
                                    if (Se(e)) {
                                        this.addAttribute(), this.transition(3);
                                        continue;
                                    }
                                    return this.notWellFormed();
                                case 3:
                                    if (61 === e) {
                                        this.transition(4);
                                        continue;
                                    }
                                    if (Se(e)) continue;
                                    return this.notWellFormed();
                                case 4:
                                    if (34 === e) {
                                        this.startRecord(), this.transition(1);
                                        continue;
                                    }
                                    if (39 === e) {
                                        this.startRecord(), this.transition(2);
                                        continue;
                                    }
                                    if (Se(e)) continue;
                                    return this.notWellFormed();
                                case 1:
                                case 2:
                                    if (
                                        (34 === e && 1 === this.state) ||
                                        (39 === e && 2 === this.state)
                                    ) {
                                        const e = this.endRecord();
                                        (this.attributes[this.attributeName] = oe(e)),
                                            this.transition(33);
                                        continue;
                                    }
                                    if (60 === e) return this.notWellFormed();
                                    this.record(t);
                                    continue;
                                case 24:
                                    if (45 === e) {
                                        this.allowComments || this.restrictedXML(),
                                            this.transition(23);
                                        continue;
                                    }
                                    if (91 === e) {
                                        this.transition(21);
                                        continue;
                                    }
                                    return this.notWellFormed();
                                case 23:
                                    if (45 === e) {
                                        this.transition(14);
                                        continue;
                                    }
                                    return this.notWellFormed();
                                case 14:
                                    45 === e && this.transition(12);
                                    continue;
                                case 12:
                                    45 === e ? this.transition(11) : this.transition(14);
                                    continue;
                                case 11:
                                    62 === e ? this.transition(34) : this.transition(14);
                                    continue;
                                case 25:
                                    if (88 === e || 120 === e) {
                                        this.transition(28);
                                        continue;
                                    }
                                    return this.notWellFormed();
                                case 28:
                                    if (77 === e || 109 === e) {
                                        this.transition(27);
                                        continue;
                                    }
                                    return this.notWellFormed();
                                case 27:
                                    if (76 === e || 108 === e) {
                                        this.transition(26);
                                        continue;
                                    }
                                    return this.notWellFormed();
                                case 26:
                                    if (Se(e)) {
                                        (this.haveDeclaration = !0), this.transition(15);
                                        continue;
                                    }
                                    return this.notWellFormed();
                                case 13:
                                    if (62 === e) {
                                        this.transition(34);
                                        continue;
                                    }
                                    return this.notWellFormed();
                                case 15:
                                    63 === e && this.transition(13);
                                    continue;
                                case 21:
                                    this.wait(e, 67, 20);
                                    continue;
                                case 20:
                                    this.wait(e, 68, 19);
                                    continue;
                                case 19:
                                    this.wait(e, 65, 18);
                                    continue;
                                case 18:
                                    this.wait(e, 84, 17);
                                    continue;
                                case 17:
                                    this.wait(e, 65, 16);
                                    continue;
                                case 16:
                                    this.wait(e, 91, 5);
                                    continue;
                                case 5:
                                    if (93 === e) {
                                        this.transition(10);
                                        continue;
                                    }
                                    this.record(t);
                                    continue;
                                case 10:
                                    93 === e
                                        ? this.transition(9)
                                        : (this.record(String.fromCodePoint(93)),
                                          this.record(t),
                                          this.transition(5));
                                    continue;
                                case 9:
                                    if (62 === e) {
                                        const e = this.endRecord();
                                        e && this.emit('text', e), this.transition(34);
                                    } else
                                        this.record(String.fromCodePoint(93)),
                                            this.record(String.fromCodePoint(93)),
                                            this.record(t),
                                            this.transition(5);
                                    continue;
                            }
                        }
                    }
                    end(e) {
                        e && this.write(e), (this.write = () => {});
                    }
                    record(e) {
                        this.recordBuffer.push(e);
                    }
                    startRecord(e) {
                        (this.recordBuffer = []), e && this.recordBuffer.push(e);
                    }
                    endRecord() {
                        const e = this.recordBuffer;
                        return (this.recordBuffer = []), e.join('');
                    }
                    startTag() {
                        (this.tagName = this.endRecord()), (this.attributes = {});
                    }
                    addAttribute() {
                        const e = this.endRecord();
                        if (void 0 !== this.attributes[e]) return this.notWellFormed();
                        (this.attributeName = e), (this.attributes[e] = '');
                    }
                    wait(e, t, n) {
                        if (e !== t) return this.notWellFormed();
                        this.transition(n);
                    }
                    transition(e) {
                        (this.state = e), 34 === e && this.startRecord();
                    }
                    notWellFormed(e) {
                        this.emit('error', Z.notWellFormed(e));
                    }
                    restrictedXML(e) {
                        this.emit('error', Z.restrictedXML(e));
                    }
                }
                function Te(e, t = {}) {
                    const n = new ke(t);
                    let i,
                        s,
                        r = null;
                    if (
                        (n.on('text', e => {
                            s && s.children.push(e);
                        }),
                        n.on('startElement', (e, t) => {
                            const n = new ue(e, t);
                            i || (i = n), (s = s ? s.appendChild(n) : n);
                        }),
                        n.on('endElement', e => {
                            s
                                ? e === s.name
                                    ? s.parent && (s = s.parent)
                                    : n.emit('error', Z.notWellFormed('b'))
                                : n.emit('error', Z.notWellFormed('a'));
                        }),
                        n.on('error', e => {
                            r = e;
                        }),
                        n.write(e),
                        n.end(),
                        r)
                    )
                        throw r;
                    return i;
                }
                function Oe(e, t, n, i) {
                    if (i) {
                        e = e || i.getNamespace();
                        const n = i.getNamespaceRoot(e);
                        if (n) {
                            t = `${n.useNamespace('', e)}:${t}`;
                        }
                    }
                    const s = new ue(t);
                    return t.indexOf(':') < 0 && (!n || e !== n) && s.setAttribute('xmlns', e), s;
                }
                function Ie(e, t) {
                    return (e.getAttribute('xml:lang') || t || '').toLowerCase();
                }
                function Ee(e, t) {
                    const n = [];
                    for (const i of e) n.push(Ie(i, t.lang));
                    let i;
                    return (
                        (i = t.resolveLanguage
                            ? t.resolveLanguage(n, t.acceptLanguages || [], t.lang)
                            : t.lang),
                        i || ''
                    );
                }
                function Ce(e, t, n, i) {
                    const s = e.getChildren(n, t),
                        r = Ie(e);
                    return s.length
                        ? i
                            ? s.filter(e => {
                                  if (Ie(e, r) === i) return !0;
                              })
                            : s
                        : [];
                }
                function Re(e, t, n, i) {
                    t = t || e.getNamespace();
                    const s = Ce(e, t, n, i);
                    if (s.length) return s[0];
                    const r = Oe(t, n, e.getDefaultNamespace(), e),
                        a = Ie(e, i);
                    return i && a !== i && r.setAttribute('xml:lang', i), e.appendChild(r), r;
                }
                function Ne(e) {
                    return {
                        importer(t) {
                            const n = t.getAttribute(e.name, e.namespace);
                            return n
                                ? e.parseValue(n)
                                : e.dynamicDefault
                                ? e.dynamicDefault(n)
                                : e.staticDefault;
                        },
                        exporter(t, n) {
                            if (void 0 === n || n === e.staticDefault) return;
                            const i = e.writeValue(n);
                            if (i || e.emitEmpty)
                                if (e.namespace && e.prefix) {
                                    let n;
                                    const s = t.getNamespaceRoot(e.namespace);
                                    if (s) n = s.useNamespace(e.prefix, e.namespace);
                                    else {
                                        const i = t.getNamespaceContext();
                                        i[e.namespace] ||
                                            ((n = t.useNamespace(e.prefix, e.namespace)),
                                            (i[e.namespace] = n));
                                    }
                                    t.setAttribute(`${n}:${e.name}`, i, e.emitEmpty);
                                } else t.setAttribute(e.name, i, e.emitEmpty);
                        }
                    };
                }
                function qe(e, t) {
                    return (n, i, s = {}) => (
                        (s = Object.assign({ staticDefault: i }, s)),
                        Ne(Object.assign(Object.assign({ name: n }, e), t ? t(s) : s))
                    );
                }
                function Ae(e, t) {
                    return (n, i, s, r, a = {}) => (
                        (a = Object.assign({ staticDefault: r }, a)),
                        Ne(
                            Object.assign(
                                Object.assign({ name: s, namespace: i, prefix: n }, e),
                                t ? t(a) : a
                            )
                        )
                    );
                }
                function Fe(e) {
                    const t =
                        e.converter ||
                        Ne(
                            Object.assign(Object.assign({}, e), { namespace: e.attributeNamespace })
                        );
                    return {
                        importer(n, i) {
                            const s = n.getChild(e.element, e.namespace || n.getNamespace());
                            return s
                                ? t.importer(s, i)
                                : e.dynamicDefault
                                ? e.dynamicDefault()
                                : e.staticDefault;
                        },
                        exporter(n, i, s) {
                            if (void 0 !== i && i !== e.staticDefault) {
                                const r = Re(n, e.namespace || n.getNamespace(), e.element);
                                t.exporter(r, i, s);
                            }
                        }
                    };
                }
                function Pe(e, t) {
                    return (n, i, s, r, a = {}) => (
                        (a = Object.assign({ staticDefault: r }, a)),
                        Fe(
                            Object.assign(
                                Object.assign({ element: i, name: s, namespace: n }, e),
                                t ? t(a) : a
                            )
                        )
                    );
                }
                function Le(e) {
                    return {
                        importer(t) {
                            const n = t.getText();
                            return n
                                ? e.parseValue(n)
                                : e.dynamicDefault
                                ? e.dynamicDefault(n)
                                : e.staticDefault;
                        },
                        exporter(t, n) {
                            if (!n && e.emitEmpty) return void t.children.push('');
                            if (void 0 === n || n === e.staticDefault) return;
                            const i = e.writeValue(n);
                            i && t.children.push(i);
                        }
                    };
                }
                function Me(e) {
                    const t = Le(e);
                    return {
                        importer(n, i) {
                            const s = Ce(n, e.namespace || n.getNamespace(), e.element),
                                r = Ee(s, i);
                            if (!s.length)
                                return e.dynamicDefault ? e.dynamicDefault() : e.staticDefault;
                            if (e.matchLanguage)
                                for (const e of s) if (Ie(e, i.lang) === r) return t.importer(e, i);
                            return t.importer(s[0], i);
                        },
                        exporter(n, i, s) {
                            if (i || !e.emitEmpty) {
                                if (void 0 !== i && i !== e.staticDefault) {
                                    const r = Re(
                                        n,
                                        e.namespace || n.getNamespace(),
                                        e.element,
                                        e.matchLanguage ? s.lang : void 0
                                    );
                                    t.exporter(r, i, s);
                                }
                            } else
                                Re(
                                    n,
                                    e.namespace || n.getNamespace(),
                                    e.element,
                                    e.matchLanguage ? s.lang : void 0
                                );
                        }
                    };
                }
                const De = { parseValue: e => e, writeValue: e => e },
                    Be = { parseValue: e => parseInt(e, 10), writeValue: e => e.toString() },
                    Ue = { parseValue: e => parseFloat(e), writeValue: e => e.toString() },
                    ze = {
                        parseValue: e =>
                            'true' === e || '1' === e || ('false' !== e && '0' !== e && void 0),
                        writeValue: e => (e ? '1' : '0')
                    },
                    Ve = {
                        parseValue: e => new Date(e),
                        writeValue: e => ('string' == typeof e ? e : e.toISOString())
                    },
                    $e = { parseValue: e => JSON.parse(e), writeValue: e => JSON.stringify(e) },
                    Qe = (t = 'utf8') => ({
                        parseValue: n => (
                            'base64' === t && '=' === n && (n = ''), e.from(n.trim(), t)
                        ),
                        writeValue: n => {
                            let i;
                            return (
                                (i =
                                    'string' == typeof n
                                        ? e.from(n).toString(t)
                                        : n
                                        ? n.toString(t)
                                        : ''),
                                'base64' === t && (i = i || '='),
                                i
                            );
                        }
                    }),
                    We = {
                        parseValue: e => {
                            let t = -1;
                            '-' === e.charAt(0) && ((t = 1), (e = e.slice(1)));
                            const n = e.split(':');
                            return (60 * parseInt(n[0], 10) + parseInt(n[1], 10)) * t;
                        },
                        writeValue: e => {
                            if ('string' == typeof e) return e;
                            {
                                let t = '-';
                                e < 0 && ((e = -e), (t = '+'));
                                const n = e / 60,
                                    i = e % 60;
                                return (
                                    (t += (n < 10 ? '0' : '') + n + ':' + (i < 10 ? '0' : '') + i),
                                    t
                                );
                            }
                        }
                    },
                    Ge = qe(De, e =>
                        Object.assign(
                            {
                                dynamicDefault: e.emitEmpty
                                    ? t => ('' === t ? '' : e.staticDefault)
                                    : void 0
                            },
                            e
                        )
                    ),
                    He = qe(ze),
                    Je = qe(Be),
                    Ye = qe(Ue),
                    Ke = qe(Ve),
                    Xe = Ae(De),
                    Ze = Ae(ze),
                    et = Ae(Be),
                    tt = Ae(Ue),
                    nt = Ae(Ve),
                    it = Pe(De),
                    st = Pe(ze),
                    rt = Pe(Be),
                    at = Pe(Ue),
                    ot = Pe(Ve),
                    ct = e => Le(Object.assign({ staticDefault: e }, De)),
                    lt = () => Le(Object.assign({}, $e)),
                    ut = (e = 'utf8') => Le(Object.assign({}, Qe(e)));
                function pt() {
                    return {
                        importer: (e, t) => Ie(e, t.lang),
                        exporter(e, t, n) {
                            t && t.toLowerCase() !== n.lang
                                ? e.setAttribute('xml:lang', t)
                                : e.setAttribute('xml:lang', void 0);
                        }
                    };
                }
                const dt = (e, t, n, i = !1) =>
                        Me(
                            Object.assign(
                                {
                                    element: t,
                                    emitEmpty: i,
                                    matchLanguage: !0,
                                    namespace: e,
                                    staticDefault: n
                                },
                                De
                            )
                        ),
                    ht = (e, t, n = 'utf8') =>
                        Me(Object.assign({ element: t, matchLanguage: !0, namespace: e }, Qe(n))),
                    ft = (e, t) => Me(Object.assign({ element: t, namespace: e }, Ve)),
                    mt = (e, t, n) =>
                        Me(Object.assign({ element: t, namespace: e, staticDefault: n }, Be)),
                    gt = (e, t, n) =>
                        Me(Object.assign({ element: t, namespace: e, staticDefault: n }, Ue)),
                    bt = (e, t) => Me(Object.assign({ element: t, namespace: e }, $e));
                function yt(e, t) {
                    return Me(Object.assign({ element: t, namespace: e, staticDefault: 0 }, We));
                }
                function vt(e, t) {
                    return {
                        importer(n) {
                            if (n.getChild(t, e || n.getNamespace())) return !0;
                        },
                        exporter(n, i) {
                            i && Re(n, e || n.getNamespace(), t);
                        }
                    };
                }
                const wt = (e, t, n) => {
                    if (!n) return;
                    let i = t;
                    for (const t of e) i = Re(i, t.namespace || i.getNamespace(), t.element);
                    i.children.push(n.toString());
                };
                function _t(e, t) {
                    return {
                        importer(n) {
                            let i = n;
                            for (const n of e)
                                if (
                                    ((i = i.getChild(n.element, n.namespace || i.getNamespace())),
                                    !i)
                                )
                                    return t;
                            return i.getText() || t;
                        },
                        exporter(t, n) {
                            wt(e, t, n);
                        }
                    };
                }
                function xt(e, t) {
                    return {
                        importer(n) {
                            let i = n;
                            for (const t of e)
                                if (
                                    ((i = i.getChild(t.element, t.namespace || i.getNamespace())),
                                    !i)
                                )
                                    return;
                            const s = i.getText();
                            return s ? parseInt(s, 10) : t || void 0;
                        },
                        exporter(t, n) {
                            wt(e, t, n);
                        }
                    };
                }
                function jt(e) {
                    return {
                        importer(t) {
                            let n = t;
                            for (const t of e)
                                if (
                                    ((n = n.getChild(t.element, t.namespace || n.getNamespace())),
                                    !n)
                                )
                                    return !1;
                            return !0;
                        },
                        exporter(t, n) {
                            if (!n) return;
                            let i = t;
                            for (const t of e)
                                i = Re(i, t.namespace || i.getNamespace(), t.element);
                        }
                    };
                }
                function St(e) {
                    const t = e.pop();
                    return {
                        importer(n, i) {
                            let s = n;
                            for (const t of e)
                                if (
                                    ((s = s.getChild(t.element, t.namespace || s.getNamespace())),
                                    !s)
                                )
                                    return [];
                            const r = [],
                                a = Ce(s, t.namespace || s.getNamespace(), t.element),
                                o = Ee(a, i);
                            for (const e of a) Ie(e, i.lang) === o && r.push(e.getText());
                            return r;
                        },
                        exporter(n, i, s) {
                            if (!i.length) return;
                            let r = n;
                            for (const t of e)
                                r = Re(r, t.namespace || r.getNamespace(), t.element);
                            const { namespace: a, element: o } = t;
                            for (const e of i) {
                                const t = Oe(a || r.getNamespace(), o, s.namespace, r);
                                t.children.push(e), r.appendChild(t);
                            }
                        }
                    };
                }
                function kt(e, t, n) {
                    const i = new Map(),
                        s = new Map();
                    for (const e of t)
                        'string' == typeof e
                            ? (i.set(e, e), s.set(e, e))
                            : (i.set(e[1], e[0]), s.set(e[0], e[1]));
                    return {
                        importer(t) {
                            for (const n of t.children)
                                if (
                                    'string' != typeof n &&
                                    n.getNamespace() === (e || t.getNamespace()) &&
                                    i.has(n.getName())
                                )
                                    return i.get(n.getName());
                            return n;
                        },
                        exporter(t, n) {
                            s.has(n) && Re(t, e, s.get(n));
                        }
                    };
                }
                function Tt(e, t, n, i) {
                    const s = new Set(t),
                        r = new Set(n);
                    return {
                        importer(t) {
                            for (const n of t.children)
                                if (
                                    'string' != typeof n &&
                                    n.getNamespace() === (e || t.getNamespace()) &&
                                    s.has(n.getName())
                                ) {
                                    for (const i of n.children)
                                        if (
                                            'string' != typeof i &&
                                            i.getNamespace() === (e || t.getNamespace()) &&
                                            r.has(i.getName())
                                        )
                                            return [n.getName(), i.getName()];
                                    return [n.getName()];
                                }
                            return i;
                        },
                        exporter(t, n) {
                            const i = Re(t, e, n[0]);
                            n[1] && Re(i, e, n[1]);
                        }
                    };
                }
                function Ot(e, t) {
                    return {
                        importer(n, i) {
                            const s = [],
                                r = Ce(n, e || n.getNamespace(), t),
                                a = Ee(r, i);
                            for (const e of r) Ie(e, i.lang) === a && s.push(e.getText());
                            return s;
                        },
                        exporter(n, i, s) {
                            for (const r of i) {
                                const i = Oe(e || n.getNamespace(), t, s.namespace, n);
                                i.children.push(r), n.appendChild(i);
                            }
                        }
                    };
                }
                function It(e, t, n) {
                    return {
                        importer(i) {
                            const s = [],
                                r = i.getChildren(t, e || i.getNamespace());
                            for (const e of r) {
                                const t = e.getAttribute(n);
                                void 0 !== t && s.push(t);
                            }
                            return s;
                        },
                        exporter(i, s, r) {
                            for (const a of s) {
                                const s = Oe(e || i.getNamespace(), t, r.namespace, i);
                                s.setAttribute(n, a), i.appendChild(s);
                            }
                        }
                    };
                }
                function Et(e, t, n) {
                    return {
                        importer(i) {
                            const s = [],
                                r = i.getChildren(t, e || i.getNamespace());
                            for (const e of r) {
                                const t = e.getAttribute(n);
                                void 0 !== t && s.push(parseInt(t, 10));
                            }
                            return s;
                        },
                        exporter(i, s, r) {
                            for (const a of s) {
                                const s = Oe(e || i.getNamespace(), t, r.namespace, i);
                                s.setAttribute(n, a.toString()), i.appendChild(s);
                            }
                        }
                    };
                }
                function Ct(e, t) {
                    return {
                        importer(n, i) {
                            const s = [],
                                r = Ce(n, e || n.getNamespace(), t),
                                a = new Set();
                            for (const e of r) {
                                const t = e.getText();
                                if (t) {
                                    const n = Ie(e, i.lang);
                                    if (a.has(n)) continue;
                                    s.push({ lang: n, value: t }), a.add(n);
                                }
                            }
                            return a.size > 0 ? s : void 0;
                        },
                        exporter(n, i, s) {
                            for (const r of i) {
                                const i = r.value;
                                if (i) {
                                    const a = Oe(e || n.getNamespace(), t, s.namespace, n);
                                    r.lang !== s.lang && a.setAttribute('xml:lang', r.lang),
                                        a.children.push(i),
                                        n.appendChild(a);
                                }
                            }
                        }
                    };
                }
                function Rt(e, t) {
                    const n = new Map(),
                        i = new Map();
                    for (const e of t)
                        'string' == typeof e
                            ? (n.set(e, e), i.set(e, e))
                            : (n.set(e[1], e[0]), i.set(e[0], e[1]));
                    return {
                        importer(t) {
                            const i = [];
                            for (const s of t.children)
                                'string' != typeof s &&
                                    s.getNamespace() === (e || t.getNamespace()) &&
                                    n.has(s.getName()) &&
                                    i.push(n.get(s.getName()));
                            return i;
                        },
                        exporter(t, n) {
                            for (const s of n) Re(t, e, i.get(s));
                        }
                    };
                }
                function Nt(e, t, n, i = !1) {
                    return {
                        importer(s, r) {
                            const a = s.getChild(t, e || s.getNamespace());
                            if (!a) return;
                            const o = [];
                            for (const e of a.children)
                                if ('string' != typeof e && r.registry.getImportKey(e) === n) {
                                    const t = r.registry.import(e);
                                    t && o.push(t);
                                }
                            return i ? o : o[0];
                        },
                        exporter(i, s, r) {
                            let a = [];
                            a = Array.isArray(s) ? s : [s];
                            const o = [];
                            for (const t of a) {
                                const s = r.registry.export(
                                    n,
                                    t,
                                    Object.assign(Object.assign({}, r), {
                                        namespace: e || i.getNamespace() || void 0
                                    })
                                );
                                s && o.push(s);
                            }
                            if (o.length) {
                                const n = Re(i, e || i.getNamespace(), t);
                                for (const e of o) n.appendChild(e);
                            }
                        }
                    };
                }
                function qt(e) {
                    return { exporter: () => {}, importer: () => e };
                }
                function At(e, t, n) {
                    return {
                        importer(i, s) {
                            if (n && (!s.sanitizers || !s.sanitizers[n])) return;
                            const r = Ce(i, e || i.getNamespace(), t),
                                a = Ee(r, s);
                            for (const e of r)
                                if (Ie(e, s.lang) === a)
                                    return n ? s.sanitizers[n](e.toJSON()) : e.toJSON();
                            return r[0]
                                ? n
                                    ? s.sanitizers[n](r[0].toJSON())
                                    : r[0].toJSON()
                                : void 0;
                        },
                        exporter(i, s, r) {
                            if ('string' == typeof s) {
                                s = Te(
                                    `<${t} xmlns="${e || i.getNamespace()}">${s}</${t}>`
                                ).toJSON();
                            }
                            if (s && n) {
                                if (!r.sanitizers || !r.sanitizers[n]) return;
                                s = r.sanitizers[n](s);
                            }
                            if (!s) return;
                            const a = Re(i, e || i.getNamespace(), t, r.lang);
                            for (const e of s.children)
                                'string' == typeof e
                                    ? a.appendChild(e)
                                    : e && a.appendChild(new ue(e.name, e.attributes, e.children));
                        }
                    };
                }
                function Ft(e, t, n) {
                    return {
                        importer(i, s) {
                            if (n && (!s.sanitizers || !s.sanitizers[n])) return;
                            const r = [],
                                a = new Set(),
                                o = Ce(i, e || i.getNamespace(), t);
                            for (const e of o) {
                                let t = e.toJSON();
                                if ((n && (t = s.sanitizers[n](t)), t)) {
                                    const n = Ie(e, s.lang);
                                    if (a.has(n)) continue;
                                    r.push({ lang: n, value: t }), a.add(n);
                                }
                            }
                            return a.size > 0 ? r : void 0;
                        },
                        exporter(i, s, r) {
                            for (const a of s) {
                                let s = a.value;
                                if ('string' == typeof s) {
                                    s = Te(
                                        `<${t} xmlns="${e || i.getNamespace()}">${s}</${t}>`
                                    ).toJSON();
                                }
                                if (s && n) {
                                    if (!r.sanitizers || !r.sanitizers[n]) continue;
                                    s = r.sanitizers[n](s);
                                }
                                if (s) {
                                    const n = Oe(e || i.getNamespace(), t, r.namespace, i);
                                    i.appendChild(n),
                                        a.lang !== r.lang && n.setAttribute('xml:lang', a.lang);
                                    for (const e of s.children)
                                        'string' == typeof e
                                            ? n.appendChild(e)
                                            : n.appendChild(
                                                  new ue(e.name, e.attributes, e.children)
                                              );
                                }
                            }
                        }
                    };
                }
                function Pt(e, t, n, i) {
                    return {
                        importer(s, r) {
                            const a = {},
                                o = Ce(s, e, t),
                                c = Ge(n).importer,
                                l = Ge(i).importer;
                            for (const e of o) a[c(e, r)] = l(e, r);
                            return a;
                        },
                        exporter(s, r, a) {
                            const o = Ge(n).exporter,
                                c = Ge(i).exporter,
                                l = e || s.getNamespace();
                            for (const [e, n] of Object.entries(r)) {
                                const i = Oe(l, t, a.namespace, s);
                                o(i, e, a), r[e] && c(i, n, a), s.appendChild(i);
                            }
                        }
                    };
                }
                class Lt {
                    constructor() {
                        (this.parents = new Set()),
                            (this.placeholder = !1),
                            (this.typeField = ''),
                            (this.versionField = ''),
                            (this.defaultType = ''),
                            (this.defaultVersion = ''),
                            (this.languageField = 'lang'),
                            (this.typeValues = new Map()),
                            (this.typeOrders = new Map()),
                            (this.importers = new Map()),
                            (this.exporters = new Map()),
                            (this.children = new Map()),
                            (this.childrenIndex = new Map()),
                            (this.implicitChildren = new Set()),
                            (this.contexts = new Map());
                    }
                    addChild(e, t, n = !1, i, s) {
                        const r = { multiple: n || !1, name: e, selector: i, translator: t },
                            a = this.children.get(e);
                        if (!a) {
                            r.translator.parents.add(this), this.children.set(e, r);
                            for (const [n] of t.importers)
                                this.implicitChildren.has(n) || this.childrenIndex.set(n, e);
                            return void (s && this.implicitChildren.add(s));
                        }
                        const o = a.translator;
                        (a.multiple = n),
                            i && a.selector && i !== a.selector && (a.selector = void 0);
                        for (const [n, i] of t.importers) {
                            const [s, r] = (o.typeValues.get(n) || '').split('__v__');
                            o.updateDefinition({
                                contexts: t.contexts,
                                element: i.element,
                                exporterOrdering: new Map(),
                                exporters: new Map(),
                                importerOrdering: i.fieldOrders,
                                importers: i.fields,
                                namespace: i.namespace,
                                optionalNamespaces: new Map(),
                                type: s,
                                version: r
                            }),
                                this.implicitChildren.has(n) || this.childrenIndex.set(n, e);
                        }
                        for (const [e, n] of t.exporters) {
                            const [i, s] = e.split('__v__');
                            o.updateDefinition({
                                contexts: t.contexts,
                                element: n.element,
                                exporterOrdering: n.fieldOrders,
                                exporters: n.fields,
                                importerOrdering: new Map(),
                                importers: new Map(),
                                namespace: n.namespace,
                                optionalNamespaces: n.optionalNamespaces,
                                type: i,
                                version: s
                            });
                        }
                    }
                    addContext(e, t, n, i, s, r) {
                        t && (e = `${e}[${t}]`);
                        let a = this.contexts.get(e);
                        a || (a = { typeField: '', versionField: '', typeValues: new Map() }),
                            r && (a.impliedType = s),
                            (a.typeField = n || ''),
                            a.typeValues.set(i, s),
                            this.contexts.set(e, a);
                    }
                    getChild(e) {
                        const t = this.children.get(e);
                        if (t) return t.translator;
                    }
                    getImportKey(e) {
                        return this.childrenIndex.get(`{${e.getNamespace()}}${e.getName()}`);
                    }
                    updateDefinition(e) {
                        const t = `{${e.namespace}}${e.element}`,
                            n = e.type || this.defaultType,
                            i = e.version || this.defaultVersion,
                            s = i ? `${n}__v__${i}` : n,
                            r = this.importers.get(t) || {
                                element: e.element,
                                fieldOrders: new Map(),
                                fields: new Map(),
                                namespace: e.namespace
                            };
                        for (const [t, n] of e.importers) r.fields.set(t, n);
                        for (const [t, n] of e.importerOrdering) r.fieldOrders.set(t, n);
                        this.importers.set(t, r);
                        const a = this.exporters.get(s) || {
                            element: e.element,
                            fieldOrders: new Map(),
                            fields: new Map(),
                            namespace: e.namespace,
                            optionalNamespaces: e.optionalNamespaces
                        };
                        for (const [t, n] of e.exporters) a.fields.set(t, n);
                        for (const [t, n] of e.exporterOrdering) a.fieldOrders.set(t, n);
                        for (const [t, n] of e.optionalNamespaces) a.optionalNamespaces.set(t, n);
                        this.exporters.set(s, a);
                        for (const [t, n] of e.contexts) {
                            const e = this.contexts.get(t) || {
                                impliedType: void 0,
                                typeField: n.typeField,
                                versionField: n.versionField,
                                typeValues: new Map()
                            };
                            e.typeField || (e.typeField = n.typeField),
                                e.versionField || (e.versionField = n.versionField),
                                e.impliedType || (e.impliedType = n.impliedType);
                            for (const [t, i] of n.typeValues) e.typeValues.set(t, i);
                            this.contexts.set(t, e);
                        }
                        if (e.type)
                            this.typeValues.set(t, s),
                                e.typeOrder && e.type && this.typeOrders.set(e.type, e.typeOrder);
                        else if (this.typeField && !e.type) {
                            for (const [, t] of this.importers) {
                                for (const [n, i] of e.importers) t.fields.set(n, i);
                                for (const [n, i] of e.importerOrdering) t.fieldOrders.set(n, i);
                            }
                            for (const [, t] of this.exporters) {
                                for (const [n, i] of e.exporters) t.fields.set(n, i);
                                for (const [n, i] of e.exporterOrdering) t.fieldOrders.set(n, i);
                            }
                        }
                    }
                    replaceWith(e) {
                        for (const [t, n] of this.children) e.children.set(t, n);
                        for (const [t, n] of this.childrenIndex) e.childrenIndex.set(t, n);
                        for (const [t, n] of this.contexts) e.contexts.set(t, n);
                        for (const t of this.implicitChildren) e.implicitChildren.add(t);
                        for (const t of this.parents)
                            for (const n of t.children.values())
                                n.translator === this && (n.translator = e);
                        this.parents = new Set();
                    }
                    import(e, t) {
                        const n = `{${e.getNamespace()}}${e.getName()}`,
                            i = {},
                            s = this.importers.get(n);
                        if (!s) return;
                        const r = this.typeValues.get(n) || '',
                            [a, o] = r.split('__v__'),
                            c = t.path || '';
                        let l;
                        if (
                            (t.pathSelector && (l = this.contexts.get(`${c}[${t.pathSelector}]`)),
                            l || (l = this.contexts.get(c)),
                            l)
                        ) {
                            if (!l.impliedType) {
                                const e = l.typeValues.get(n) || '';
                                e && (i[l.typeField] = e);
                            }
                        } else
                            this.typeField &&
                                a &&
                                a !== this.defaultType &&
                                (i[this.typeField] = a);
                        this.versionField &&
                            o &&
                            o !== this.defaultVersion &&
                            (i[this.versionField] = o);
                        const u = Object.assign(Object.assign({}, t), {
                                data: i,
                                importer: s,
                                lang: (e.getAttribute('xml:lang') || t.lang || '').toLowerCase(),
                                pathSelector: a,
                                translator: this
                            }),
                            p = [...s.fieldOrders.entries()].sort((e, t) =>
                                e[1] > t[1] ? -1 : e[1] < t[1] ? 1 : 0
                            ),
                            d = p.filter(e => e[1] >= 0),
                            h = p.filter(e => e[1] < 0);
                        for (const [n] of d) {
                            const r = s.fields.get(n);
                            u.path = `${t.path}.${n}`;
                            const a = r(e, u);
                            null != a && (i[n] = a);
                        }
                        for (const n of e.children) {
                            if ('string' == typeof n) continue;
                            const e = `{${n.getNamespace()}}${n.getName()}`,
                                s = this.childrenIndex.get(e);
                            if (!s) continue;
                            u.path = `${t.path}.${s}`;
                            const { translator: r, multiple: o, selector: c } = this.children.get(
                                s
                            );
                            if (!c || c === a) {
                                const e = r.import(n, u);
                                void 0 !== e &&
                                    (o
                                        ? (i[s] || (i[s] = []), i[s].push(e))
                                        : i[s]
                                        ? (i[s] = r.resolveCollision(i[s], e))
                                        : (i[s] = e));
                            }
                        }
                        for (const [n] of h) {
                            const r = s.fields.get(n);
                            u.path = `${t.path}.${n}`;
                            const a = r(e, u);
                            null != a && (i[n] = a);
                        }
                        return i;
                    }
                    export(e, t) {
                        if (!e) return;
                        let n = this.defaultType,
                            i = this.defaultVersion;
                        const s = t.path || '';
                        let r;
                        t.pathSelector && (r = this.contexts.get(`${s}[${t.pathSelector}]`)),
                            r || (r = this.contexts.get(s)),
                            r
                                ? (n = r.impliedType || e[r.typeField] || this.defaultType)
                                : this.typeField && (n = e[this.typeField] || this.defaultType),
                            this.versionField && (i = e[this.versionField] || this.defaultVersion);
                        const a = i ? `${n}__v__${i}` : n,
                            o = this.exporters.get(a);
                        if (!o) return;
                        const c = Oe(o.namespace, o.element, t.namespace, t.element);
                        t.element && (c.parent = t.element);
                        for (const [e, t] of o.optionalNamespaces) c.addOptionalNamespace(e, t);
                        const l = Object.assign(Object.assign({}, t), {
                                data: e,
                                element: c,
                                exporter: o,
                                lang: (e[this.languageField] || t.lang || '').toLowerCase(),
                                namespace: c.getDefaultNamespace(),
                                pathSelector: n,
                                translator: this
                            }),
                            u = o.fields.get(this.languageField);
                        u && u(c, e[this.languageField], t);
                        const p = Object.keys(e);
                        p.sort(
                            (e, t) => (o.fieldOrders.get(e) || 1e5) - (o.fieldOrders.get(t) || 1e5)
                        );
                        for (const i of p) {
                            if (i === this.languageField) continue;
                            const s = e[i],
                                r = o.fields.get(i);
                            if (r) {
                                r(c, s, l);
                                continue;
                            }
                            const a = this.children.get(i);
                            if (!a) continue;
                            l.path = `${t.path ? t.path + '.' : ''}${i}`;
                            const { translator: u, multiple: p, selector: d } = a;
                            if (!d || d === n) {
                                let e;
                                e = p ? s : [s];
                                for (const t of e) {
                                    const e = u.export(t, l);
                                    e && c.appendChild(e);
                                }
                            }
                        }
                        return c;
                    }
                    resolveCollision(e, t) {
                        return (this.typeOrders.get(e[this.typeField] || this.defaultType) || 0) <=
                            (this.typeOrders.get(t[this.typeField] || this.defaultType) || 0)
                            ? e
                            : t;
                    }
                }
                class Mt {
                    constructor() {
                        (this.translators = new Map()),
                            (this.root = new Lt()),
                            this.setLanguageResolver(le);
                    }
                    setLanguageResolver(e) {
                        this.languageResolver = e;
                    }
                    import(e, t = { registry: this }) {
                        if (!this.hasTranslator(e.getNamespace(), e.getName())) return;
                        return (
                            t.acceptLanguages || (t.acceptLanguages = []),
                            (t.acceptLanguages = t.acceptLanguages.map(e => e.toLowerCase())),
                            t.lang && (t.lang = t.lang.toLowerCase()),
                            t.resolveLanguage || (t.resolveLanguage = this.languageResolver),
                            (t.path = this.getImportKey(e)),
                            t.sanitizers || (t.sanitizers = { xhtmlim: ve }),
                            this.getOrCreateTranslator(e.getNamespace(), e.getName()).import(
                                e,
                                Object.assign(Object.assign({}, t), { registry: this })
                            )
                        );
                    }
                    export(e, t, n = { registry: this }) {
                        n.acceptLanguages || (n.acceptLanguages = []),
                            (n.acceptLanguages = n.acceptLanguages.map(e => e.toLowerCase())),
                            n.lang && (n.lang = n.lang.toLowerCase()),
                            n.sanitizers || (n.sanitizers = { xhtmlim: ve }),
                            (n.path = e);
                        const i = e.split('.').filter(e => '' !== e);
                        let s = this.root;
                        for (const e of i) {
                            const t = s.getChild(e);
                            if (!t) return;
                            s = t;
                        }
                        return s.export(t, Object.assign(Object.assign({}, n), { registry: this }));
                    }
                    getImportKey(e, t = '') {
                        const n = t ? this.walkToTranslator(t.split('.')) : this.root;
                        if (n) return n.getImportKey(e);
                    }
                    define(e) {
                        if (Array.isArray(e)) {
                            for (const t of e) 'object' == typeof t ? this.define(t) : t(this);
                            return;
                        }
                        if ('object' != typeof e) return void e(this);
                        const t = e;
                        (t.aliases = t.aliases || []),
                            t.path && !t.aliases.includes(t.path) && t.aliases.push(t.path);
                        const n = t.aliases
                            .map(e => ('string' == typeof e ? { path: e } : e))
                            .sort((e, t) => {
                                const n = e.path.split('.').length;
                                return t.path.split('.').length - n;
                            });
                        let i;
                        if (
                            (this.hasTranslator(t.namespace, t.element) &&
                                (i = this.getOrCreateTranslator(t.namespace, t.element)),
                            !i)
                        ) {
                            let e;
                            for (const t of n) {
                                const n = this.walkToTranslator(t.path.split('.'));
                                if (n && !n.placeholder) {
                                    i = n;
                                    break;
                                }
                                n && (e = n);
                            }
                            e && !i && ((i = e), (i.placeholder = !1));
                        }
                        i || (i = this.getOrCreateTranslator(t.namespace, t.element)),
                            this.indexTranslator(t.namespace, t.element, i);
                        const s = t.fields || {},
                            r = new Map(),
                            a = new Map(),
                            o = new Map(),
                            c = new Map();
                        t.typeField && (i.typeField = t.typeField),
                            t.defaultType && (i.defaultType = t.defaultType),
                            t.versionField && (i.versionField = t.versionField),
                            t.defaultVersion && (i.defaultVersion = t.defaultVersion),
                            t.languageField && (i.languageField = t.languageField);
                        for (const [e, t] of Object.entries(s))
                            r.set(e, t.importer),
                                o.set(e, t.importOrder || t.order || 0),
                                a.set(e, t.exporter),
                                c.set(e, t.exportOrder || t.order || 0);
                        if (t.childrenExportOrder)
                            for (const [e, n] of Object.entries(t.childrenExportOrder))
                                c.set(e, n || 0);
                        const l = new Map();
                        for (const [e, n] of Object.entries(t.optionalNamespaces || {}))
                            l.set(e, n);
                        i.updateDefinition({
                            contexts: new Map(),
                            element: t.element,
                            exporterOrdering: c,
                            exporters: a,
                            importerOrdering: o,
                            importers: r,
                            namespace: t.namespace,
                            optionalNamespaces: l,
                            type: t.type,
                            version: t.version,
                            typeOrder: t.typeOrder
                        });
                        for (const e of n)
                            this.alias(
                                t.namespace,
                                t.element,
                                e.path,
                                e.multiple,
                                e.selector,
                                e.contextField,
                                t.type,
                                e.impliedType
                            );
                        for (const e of n) {
                            const t = this.walkToTranslator(e.path.split('.'));
                            t && t !== i && t.replaceWith(i);
                        }
                    }
                    alias(e, t, n, i = !1, s, r, a, o = !1) {
                        const c = this.getOrCreateTranslator(e, t);
                        c.placeholder = !1;
                        const l = n.split('.').filter(e => '' !== e),
                            u = l.pop(),
                            p = this.walkToTranslator(l, !0),
                            d = `{${e}}${t}`;
                        a && (r || o) && c.addContext(n, s, r, d, a, o), p.addChild(u, c, i, s, d);
                    }
                    walkToTranslator(e, t = !1) {
                        let n = this.root;
                        for (const i of e) {
                            let e = n.getChild(i);
                            if (!e) {
                                if (!t) return;
                                (e = new Lt()), (e.placeholder = !0), n.addChild(i, e);
                            }
                            n = e;
                        }
                        return n;
                    }
                    hasTranslator(e, t) {
                        return this.translators.has(`{${e}}${t}`);
                    }
                    getOrCreateTranslator(e, t) {
                        let n = this.translators.get(`{${e}}${t}`);
                        return n || ((n = new Lt()), this.indexTranslator(e, t, n)), n;
                    }
                    indexTranslator(e, t, n) {
                        this.translators.set(`{${e}}${t}`, n);
                    }
                }
                const Dt = 'http://www.w3.org/2005/Atom',
                    Bt = 'urn:ietf:params:xml:ns:xmpp-bind',
                    Ut = 'jabber:client',
                    zt = 'urn:ietf:params:xml:ns:xmpp-sasl',
                    Vt = 'urn:ietf:params:xml:ns:xmpp-session',
                    $t = 'urn:ietf:params:xml:ns:xmpp-stanzas',
                    Qt = 'http://etherx.jabber.org/streams',
                    Wt = 'urn:ietf:params:xml:ns:xmpp-streams',
                    Gt = 'urn:ietf:params:xml:ns:xmpp-tls',
                    Ht = 'urn:ietf:params:xml:ns:xmpp-framing',
                    Jt = 'jabber:x:data',
                    Yt = 'jabber:iq:privacy',
                    Kt = 'http://jabber.org/protocol/disco#info',
                    Xt = 'http://jabber.org/protocol/disco#items',
                    Zt = 'http://jabber.org/protocol/address',
                    en = 'http://jabber.org/protocol/muc',
                    tn = 'http://jabber.org/protocol/muc#admin',
                    nn = 'http://jabber.org/protocol/muc#owner',
                    sn = 'http://jabber.org/protocol/muc#user',
                    rn = 'http://jabber.org/protocol/ibb',
                    an = 'http://jabber.org/protocol/commands',
                    on = 'http://jabber.org/protocol/rsm',
                    cn = 'http://jabber.org/protocol/pubsub',
                    ln = 'http://jabber.org/protocol/pubsub#errors',
                    un = 'http://jabber.org/protocol/pubsub#event',
                    pn = 'http://jabber.org/protocol/pubsub#owner',
                    dn = 'http://jabber.org/protocol/bytestreams',
                    hn = 'jabber:x:oob',
                    fn = 'http://www.w3.org/1999/xhtml',
                    mn = 'http://jabber.org/protocol/xhtml-im',
                    gn = 'http://jabber.org/protocol/geoloc',
                    bn = 'urn:xmpp:avatar:data',
                    yn = 'urn:xmpp:avatar:metadata',
                    vn = 'http://jabber.org/protocol/chatstates',
                    wn = 'http://jabber.org/protocol/mood',
                    _n = 'http://jabber.org/protocol/activity',
                    xn = 'http://jabber.org/protocol/tune',
                    jn = 'http://jabber.org/protocol/xdata-validate',
                    Sn = 'http://jabber.org/protocol/httpbind',
                    kn = 'http://jabber.org/protocol/shim',
                    Tn = 'http://jabber.org/protocol/compress',
                    On = 'http://jabber.org/protocol/xdata-layout',
                    In = 'http://jabber.org/protocol/rosterx',
                    En = e => e + '+notify',
                    Cn = 'urn:xmpp:jingle:1',
                    Rn = 'urn:xmpp:jingle:apps:rtp:1',
                    Nn = 'urn:xmpp:jingle:apps:rtp:info:1',
                    qn = 'http://jabber.org/protocol/nick',
                    An = 'urn:xmpp:jingle:transports:ice-udp:1',
                    Fn = 'urn:xmpp:jingle:transports:raw-udp:1',
                    Pn = 'urn:xmpp:sm:3',
                    Ln = 'urn:xmpp:delay',
                    Mn = 'urn:xmpp:bob',
                    Dn = 'urn:xmpp:jingle:apps:file-transfer:5',
                    Bn = 'urn:xmpp:jingle:apps:xmlstream:0',
                    Un = 'urn:xmpp:jingle:transports:s5b:1',
                    zn = 'urn:xmpp:jingle:transports:ibb:1',
                    Vn = 'urn:xmpp:carbons:2',
                    $n = 'urn:xmpp:jingle:apps:rtp:rtcp-fb:0',
                    Qn = 'urn:xmpp:jingle:apps:rtp:rtp-hdrext:0',
                    Wn = 'urn:xmpp:forward:0',
                    Gn = 'urn:xmpp:hashes:2',
                    Hn = e => 'urn:xmpp:hash-function-text-names:' + e,
                    Jn = 'urn:xmpp:rtt:0',
                    Yn = 'urn:xmpp:hats:0',
                    Kn = 'urn:xmpp:chat-markers:0',
                    Xn = 'urn:xmpp:hints',
                    Zn = 'urn:xmpp:json:0',
                    ei = 'urn:xmpp:push:0',
                    ti = 'urn:xmpp:http:upload:0',
                    ni = 'urn:xmpp:jingle:transports:ice:0',
                    ii = 'eu.siacs.conversations.axolotl',
                    si = 'http://docs.oasis-open.org/ns/xri/xrd-1.0';
                var ri = Object.freeze({
                    __proto__: null,
                    NS_ATOM: Dt,
                    NS_BIND: Bt,
                    NS_CLIENT: Ut,
                    NS_SASL: zt,
                    NS_SERVER: 'jabber:server',
                    NS_SESSION: Vt,
                    NS_STANZAS: $t,
                    NS_STREAM: Qt,
                    NS_STREAMS: Wt,
                    NS_STARTTLS: Gt,
                    NS_ROSTER: 'jabber:iq:roster',
                    NS_ROSTER_VERSIONING: 'urn:xmpp:features:rosterver',
                    NS_SUBSCRIPTION_PREAPPROVAL: 'urn:xmpp:features:pre-approval',
                    NS_FRAMING: Ht,
                    NS_DATAFORM: Jt,
                    NS_RPC: 'jabber:iq:rpc',
                    NS_LAST_ACTIVITY: 'jabber:iq:last',
                    NS_PRIVACY: Yt,
                    NS_LEGACY_CHAT_EVENTS: 'jabber:x:event',
                    NS_DISCO_INFO: Kt,
                    NS_DISCO_ITEMS: Xt,
                    NS_ADDRESS: Zt,
                    NS_MUC: en,
                    NS_MUC_ADMIN: tn,
                    NS_MUC_OWNER: nn,
                    NS_MUC_USER: sn,
                    NS_IBB: rn,
                    NS_BOOKMARKS: 'storage:bookmarks',
                    NS_PRIVATE: 'jabber:iq:private',
                    NS_ADHOC_COMMANDS: an,
                    NS_VCARD_TEMP: 'vcard-temp',
                    NS_SEARCH: 'jabber:iq:search',
                    NS_RSM: on,
                    NS_PUBSUB: cn,
                    NS_PUBSUB_ERRORS: ln,
                    NS_PUBSUB_EVENT: un,
                    NS_PUBSUB_OWNER: pn,
                    NS_SOCKS5: dn,
                    NS_OOB: hn,
                    NS_OOB_TRANSFER: 'jabber:iq:oob',
                    NS_HTTP_AUTH: 'http://jabber.org/protocol/http-auth',
                    NS_XHTML: fn,
                    NS_XHTML_IM: mn,
                    NS_REGISTER: 'jabber:iq:register',
                    NS_INBAND_REGISTRATION: 'http://jabber.org/features/iq-register',
                    NS_AMP: 'http://jabber.org/protocol/amp',
                    NS_GEOLOC: gn,
                    NS_ROSTER_DELIMITER: 'roster:delimiter',
                    NS_AVATAR_DATA: bn,
                    NS_AVATAR_METADATA: yn,
                    NS_CHAT_STATES: vn,
                    NS_VERSION: 'jabber:iq:version',
                    NS_MOOD: wn,
                    NS_ACTIVITY: _n,
                    NS_COMPONENT: 'jabber:component:accept',
                    NS_DISCO_LEGACY_CAPS: 'http://jabber.org/protocol/caps',
                    NS_TUNE: xn,
                    NS_DATAFORM_VALIDATION: jn,
                    NS_BOSH: Sn,
                    NS_SHIM: kn,
                    NS_COMPRESSION_FEATURE: 'http://jabber.org/features/compress',
                    NS_COMPRESSION: Tn,
                    NS_DATAFORM_LAYOUT: On,
                    NS_ROSTER_EXCHANGE: In,
                    NS_ROSTER_NOTES: 'storage:rosternotes',
                    NS_REACH_0: 'urn:xmpp:reach:0',
                    NS_VCARD_TEMP_UPDATE: 'vcard-temp:x:update',
                    NS_ALT_CONNECTIONS_WEBSOCKET: 'urn:xmpp:alt-connections:websocket',
                    NS_ALT_CONNECTIONS_XBOSH: 'urn:xmpp:alt-connections:xbosh',
                    NS_CAPTCHA: 'urn:xmpp:captcha',
                    NS_PEP_NOTIFY: En,
                    NS_JINGLE_1: Cn,
                    NS_JINGLE_ERRORS_1: 'urn:xmpp:jingle:errors:1',
                    NS_JINGLE_RTP_1: Rn,
                    NS_JINGLE_RTP_ERRORS_1: 'urn:xmpp:jingle:apps:rtp:errors:1',
                    NS_JINGLE_RTP_INFO_1: Nn,
                    NS_JINGLE_RTP_AUDIO: 'urn:xmpp:jingle:apps:rtp:audio',
                    NS_JINGLE_RTP_VIDEO: 'urn:xmpp:jingle:apps:rtp:video',
                    NS_LANG_TRANS: 'urn:xmpp:langtrans',
                    NS_LANG_TRANS_ITEMS: 'urn:xmpp:langtrans:items',
                    NS_NICK: qn,
                    NS_JINGLE_ICE_UDP_1: An,
                    NS_JINGLE_RAW_UDP_1: Fn,
                    NS_RECEIPTS: 'urn:xmpp:receipts',
                    NS_INVISIBLE_0: 'urn:xmpp:invisible:0',
                    NS_BLOCKING: 'urn:xmpp:blocking',
                    NS_BLOCKING_ERRORS: 'urn:xmpp:blocking:errors',
                    NS_SMACKS_3: Pn,
                    NS_PING: 'urn:xmpp:ping',
                    NS_TIME: 'urn:xmpp:time',
                    NS_DELAY: Ln,
                    NS_BOSH_XMPP: 'urn:xmpp:xbosh',
                    NS_DISCO_EXTERNAL_1: 'urn:xmpp:extdisco:1',
                    NS_DISCO_EXTERNAL_2: 'urn:xmpp:extdisco:2',
                    NS_DATAFORM_MEDIA: 'urn:xmpp:media-element',
                    NS_ATTENTION_0: 'urn:xmpp:attention:0',
                    NS_BOB: Mn,
                    NS_SOFTWARE_INFO: 'urn:xmpp:dataforms:softwareinfo',
                    NS_JINGLE_FILE_TRANSFER_3: 'urn:xmpp:jingle:apps:file-transfer:3',
                    NS_JINGLE_FILE_TRANSFER_4: 'urn:xmpp:jingle:apps:file-transfer:4',
                    NS_JINGLE_FILE_TRANSFER_5: Dn,
                    NS_JINGLE_XML_0: Bn,
                    NS_MUC_DIRECT_INVITE: 'jabber:x:conference',
                    NS_SEC_LABEL_0: 'urn:xmpp:sec-label:0',
                    NS_SEC_LABEL_CATALOG_2: 'urn:xmpp:sec-label:catalog:2',
                    NS_SEC_LABEL_ESS_0: 'urn:xmpp:sec-label:ess:0',
                    NS_JINGLE_SOCKS5_1: Un,
                    NS_JINGLE_IBB_1: zn,
                    NS_JINGLE_RTP_ZRTP_1: 'urn:xmpp:jingle:apps:rtp:zrtp:1',
                    NS_THUMBS_0: 'urn:xmpp:thumbs:0',
                    NS_THUMBS_1: 'urn:xmpp:thumbs:1',
                    NS_DECLOAKING_0: 'urn:xmpp:decloaking:0',
                    NS_CARBONS_2: Vn,
                    NS_JINGLE_RTP_RTCP_FB_0: $n,
                    NS_JINGLE_RTP_HDREXT_0: Qn,
                    NS_FORWARD_0: Wn,
                    NS_HASHES_1: 'urn:xmpp:hashes:1',
                    NS_HASHES_2: Gn,
                    NS_HASH_NAME: Hn,
                    NS_RTT_0: Jn,
                    NS_MUC_UNIQUE: 'http://jabber.org/protocol/muc#unique',
                    NS_CORRECTION_0: 'urn:xmpp:message-correct:0',
                    NS_PSA: 'urn:xmpp:psa',
                    NS_MAM_TMP: 'urn:xmpp:mam:tmp',
                    NS_MAM_0: 'urn:xmpp:mam:0',
                    NS_MAM_1: 'urn:xmpp:mam:1',
                    NS_MAM_2: 'urn:xmpp:mam:2',
                    NS_HATS_0: Yn,
                    NS_IDLE_1: 'urn:xmpp:idle:1',
                    NS_JINGLE_DTLS_0: 'urn:xmpp:jingle:apps:dtls:0',
                    NS_CHAT_MARKERS_0: Kn,
                    NS_HINTS: Xn,
                    NS_JSON_0: Zn,
                    NS_JINGLE_GROUPING_0: 'urn:xmpp:jingle:apps:grouping:0',
                    NS_JINGLE_RTP_SSMA_0: 'urn:xmpp:jingle:apps:rtp:ssma:0',
                    NS_JINGLE_DTLS_SCTP_1: 'urn:xmpp:jingle:transports:dtls-sctp:1',
                    NS_CSI_0: 'urn:xmpp:csi:0',
                    NS_JINGLE_MSG_INITIATE_0: 'urn:xmpp:jingle:jingle-message:0',
                    NS_DELEGATION_1: 'urn:xmpp:delegation:1',
                    NS_PUSH_0: ei,
                    NS_JINGLE_PUB_1: 'urn:xmpp:jinglepub:1',
                    NS_SID_0: 'urn:xmpp:sid:0',
                    NS_HTTP_UPLOAD_0: ti,
                    NS_JINGLE_HTTP_0: 'urn:xmpp:jingle:transports:http:0',
                    NS_JINGLE_HTTP_UPLOAD_0: 'urn:xmpp:jingle:transports:http:upload:0',
                    NS_JINGLE_ICE_0: ni,
                    NS_REFERENCE_0: 'urn:xmpp:reference:0',
                    NS_EME_0: 'urn:xmpp:eme:0',
                    NS_SPOILER_0: 'urn:xmpp:spoiler:0',
                    NS_OMEMO_AXOLOTL: ii,
                    NS_OMEMO_AXOLOTL_DEVICELIST: 'eu.siacs.conversations.axolotl.devicelist',
                    NS_OMEMO_AXOLOTL_BUNDLES: 'eu.siacs.conversations.axolotl.bundles',
                    NS_OMEMO_AXOLOTL_BUNDLE: e => 'eu.siacs.conversations.axolotl.bundles:' + e,
                    NS_JSON_MESSAGE_0: 'urn:xmpp:json-msg:0',
                    NS_XRD: si,
                    NS_JINGLE_RTP_MSID_0: 'urn:xmpp:jingle:apps:rtp:msid:0'
                });
                const ai = Ge,
                    oi = it,
                    ci = dt;
                function li(e, t, n) {
                    return {
                        aliases: Array.isArray(n) ? n : [n],
                        element: t,
                        fields: {},
                        namespace: e
                    };
                }
                function ui(e) {
                    return { element: 'message', fields: e, namespace: Ut };
                }
                function pi(e) {
                    return { element: 'presence', fields: e, namespace: Ut };
                }
                function di(e) {
                    return { element: 'iq', fields: e, namespace: Ut };
                }
                function hi(e) {
                    return { element: 'features', fields: e, namespace: Qt };
                }
                function fi(e) {
                    return { element: 'error', fields: e, namespace: $t, path: 'stanzaError' };
                }
                function mi() {
                    return [
                        { path: 'pubsubcontent', contextField: 'itemType' },
                        { path: 'pubsubitem.content', contextField: 'itemType' },
                        { path: 'pubsubeventitem.content', contextField: 'itemType' },
                        { path: 'iq.pubsub.publish.items', contextField: 'itemType' }
                    ];
                }
                class gi extends l.Transform {
                    constructor(e) {
                        super({ objectMode: !0 }),
                            (this.closedStream = !1),
                            (this.wrappedStream = !1),
                            (this.registry = e.registry),
                            (this.acceptLanguages = e.acceptLanguages || []),
                            e.wrappedStream &&
                                ((this.wrappedStream = !0), (this.rootImportKey = e.rootKey)),
                            (this.parser = new ke({ allowComments: e.allowComments })),
                            this.parser.on('error', e => {
                                this.destroy(e);
                            }),
                            this.parser.on('startElement', (e, t) => {
                                if (this.destroyed) return;
                                if (this.closedStream) return this.destroy(Z.alreadyClosed());
                                const n = new ue(e, t),
                                    i = this.registry.getImportKey(n);
                                if (this.wrappedStream && !this.rootElement) {
                                    if (this.rootImportKey && i !== this.rootImportKey)
                                        return this.destroy(Z.unknownRoot());
                                    const e = this.registry.import(n, {
                                        acceptLanguages: this.acceptLanguages,
                                        lang: this.lang
                                    });
                                    return e
                                        ? ((this.rootElement = n),
                                          void this.push({
                                              event: 'stream-start',
                                              kind: i,
                                              stanza: e,
                                              xml: n
                                          }))
                                        : this.destroy(Z.notWellFormed());
                                }
                                this.currentElement
                                    ? (this.currentElement = this.currentElement.appendChild(n))
                                    : (this.currentElement = n);
                            }),
                            this.parser.on('endElement', e => {
                                if (!this.destroyed) {
                                    if (this.wrappedStream && !this.currentElement)
                                        return this.rootElement && e === this.rootElement.name
                                            ? ((this.closedStream = !0),
                                              this.push({
                                                  event: 'stream-end',
                                                  kind: this.rootImportKey,
                                                  stanza: {},
                                                  xml: this.rootElement
                                              }),
                                              this.end())
                                            : ((this.closedStream = !0),
                                              this.destroy(Z.notWellFormed()));
                                    if (!this.currentElement || e !== this.currentElement.name)
                                        return (
                                            (this.closedStream = !0),
                                            this.destroy(Z.notWellFormed())
                                        );
                                    if (this.currentElement.parent)
                                        this.currentElement = this.currentElement.parent;
                                    else {
                                        this.wrappedStream &&
                                            (this.currentElement.parent = this.rootElement);
                                        const e = this.registry.getImportKey(this.currentElement),
                                            t = this.registry.import(this.currentElement, {
                                                acceptLanguages: this.acceptLanguages,
                                                lang: this.lang
                                            });
                                        t &&
                                            this.push({
                                                kind: e,
                                                stanza: t,
                                                xml: this.currentElement
                                            }),
                                            (this.currentElement = void 0);
                                    }
                                }
                            }),
                            this.parser.on('text', e => {
                                this.currentElement && this.currentElement.children.push(e);
                            });
                    }
                    _transform(e, t, n) {
                        this.parser.write(e.toString()), n();
                    }
                }
                var bi = Object.freeze({
                    __proto__: null,
                    Registry: Mt,
                    Translator: Lt,
                    XMLElement: ue,
                    define: function (e) {
                        return t => {
                            t.define(e);
                        };
                    },
                    Parser: ke,
                    parse: Te,
                    StreamParser: gi,
                    escapeXML: ae,
                    unescapeXML: oe,
                    escapeXMLText: ce,
                    basicLanguageResolver: le,
                    createElement: Oe,
                    getLang: Ie,
                    getTargetLang: Ee,
                    findAll: Ce,
                    findOrCreate: Re,
                    attribute: Ge,
                    booleanAttribute: He,
                    integerAttribute: Je,
                    floatAttribute: Ye,
                    dateAttribute: Ke,
                    namespacedAttribute: Xe,
                    namespacedBooleanAttribute: Ze,
                    namespacedIntegerAttribute: et,
                    namespacedFloatAttribute: tt,
                    namespacedDateAttribute: nt,
                    childAttribute: it,
                    childBooleanAttribute: st,
                    childIntegerAttribute: rt,
                    childFloatAttribute: at,
                    childDateAttribute: ot,
                    text: ct,
                    textJSON: lt,
                    textBuffer: ut,
                    languageAttribute: pt,
                    childLanguageAttribute: (e, t) =>
                        Fe(
                            Object.assign(
                                { converter: pt(), element: t, name: 'xml:lang', namespace: e },
                                De
                            )
                        ),
                    childText: dt,
                    childTextBuffer: ht,
                    childDate: ft,
                    childInteger: mt,
                    childFloat: gt,
                    childJSON: bt,
                    childTimezoneOffset: yt,
                    childBoolean: vt,
                    deepChildText: _t,
                    deepChildInteger: xt,
                    deepChildBoolean: jt,
                    deepMultipleChildText: St,
                    childEnum: kt,
                    childDoubleEnum: Tt,
                    multipleChildText: Ot,
                    multipleChildAttribute: It,
                    multipleChildIntegerAttribute: Et,
                    childAlternateLanguageText: Ct,
                    multipleChildAlternateLanguageText: function (e, t) {
                        return {
                            importer(n, i) {
                                const s = [],
                                    r = new Map();
                                let a = !1;
                                const o = Ce(n, e || n.getNamespace(), t);
                                for (const e of o) {
                                    const t = e.getText();
                                    if (t) {
                                        const n = Ie(e, i.lang);
                                        let o = r.get(n);
                                        o || ((o = []), r.set(n, o), s.push({ lang: n, value: o })),
                                            o.push(t),
                                            (a = !0);
                                    }
                                }
                                return a ? s : void 0;
                            },
                            exporter(n, i, s) {
                                for (const r of i)
                                    for (const i of r.value) {
                                        const a = Oe(e || n.getNamespace(), t, s.namespace, n);
                                        r.lang !== s.lang && a.setAttribute('xml:lang', r.lang),
                                            a.children.push(i),
                                            n.appendChild(a);
                                    }
                            }
                        };
                    },
                    multipleChildEnum: Rt,
                    splicePath: Nt,
                    staticValue: qt,
                    childRawElement: function (e, t, n) {
                        return {
                            importer(i, s) {
                                if (n && (!s.sanitizers || !s.sanitizers[n])) return;
                                const r = i.getChild(t, e || i.getNamespace());
                                return r ? (n ? s.sanitizers[n](r.toJSON()) : r.toJSON()) : void 0;
                            },
                            exporter(i, s, r) {
                                if ('string' == typeof s) {
                                    s = Te(
                                        `<${t} xmlns="${e || i.getNamespace()}">${s}</${t}>`
                                    ).toJSON();
                                }
                                if (n) {
                                    if (!r.sanitizers || !r.sanitizers[n]) return;
                                    s = r.sanitizers[n](s);
                                }
                                s && i.appendChild(new ue(s.name, s.attributes, s.children));
                            }
                        };
                    },
                    childLanguageRawElement: At,
                    childAlternateLanguageRawElement: Ft,
                    parameterMap: Pt,
                    JIDAttribute: ai,
                    childJIDAttribute: oi,
                    childJID: ci,
                    addAlias: li,
                    extendMessage: ui,
                    extendPresence: pi,
                    extendIQ: di,
                    extendStreamFeatures: hi,
                    extendStanzaError: fi,
                    pubsubItemContentAliases: mi
                });
                class yi extends l.Transform {
                    constructor(t, n, i = 'be') {
                        super(),
                            (this._block = e.alloc(t)),
                            (this._finalSize = n),
                            (this._blockSize = t),
                            (this._bigEndian = 'be' === i),
                            (this._len = 0);
                    }
                    _transform(e, t, n) {
                        let i = null;
                        try {
                            this.update(e, t);
                        } catch (e) {
                            i = e;
                        }
                        n(i);
                    }
                    _flush(e) {
                        let t = null;
                        try {
                            this.push(this.digest());
                        } catch (e) {
                            t = e;
                        }
                        e(t);
                    }
                    update(t, n) {
                        'string' == typeof t && ((n = n || 'utf8'), (t = e.from(t, n)));
                        const i = this._block,
                            s = this._blockSize,
                            r = t.length;
                        let a = this._len;
                        for (let e = 0; e < r; ) {
                            const n = a % s,
                                o = Math.min(r - e, s - n);
                            for (let s = 0; s < o; s++) i[n + s] = t[e + s];
                            (a += o), (e += o), a % s == 0 && this._update(i);
                        }
                        return (this._len += r), this;
                    }
                    digest(e) {
                        const t = this._len % this._blockSize;
                        (this._block[t] = 128),
                            this._block.fill(0, t + 1),
                            t >= this._finalSize &&
                                (this._update(this._block), this._block.fill(0));
                        const n = 8 * this._len;
                        if (n <= 4294967295)
                            this._bigEndian
                                ? (this._block.writeUInt32BE(0, this._blockSize - 8),
                                  this._block.writeUInt32BE(n, this._blockSize - 4))
                                : (this._block.writeUInt32LE(n, this._blockSize - 8),
                                  this._block.writeUInt32LE(0, this._blockSize - 4));
                        else {
                            const e = (4294967295 & n) >>> 0,
                                t = (n - e) / 4294967296;
                            this._bigEndian
                                ? (this._block.writeUInt32BE(t, this._blockSize - 8),
                                  this._block.writeUInt32BE(e, this._blockSize - 4))
                                : (this._block.writeUInt32LE(e, this._blockSize - 8),
                                  this._block.writeUInt32LE(t, this._blockSize - 4));
                        }
                        this._update(this._block);
                        const i = this._hash();
                        return e ? i.toString(e) : i;
                    }
                    _update(e) {
                        throw new Error('_update must be implemented by subclass');
                    }
                    _hash() {
                        throw new Error('_update must be implemented by subclass');
                    }
                }
                function vi(e, t) {
                    return (e << t) | (e >>> (32 - t));
                }
                function wi(e, t, n, i, s, r, a) {
                    return (vi((e + ((t & n) | (~t & i)) + s + r) | 0, a) + t) | 0;
                }
                function _i(e, t, n, i, s, r, a) {
                    return (vi((e + ((t & i) | (n & ~i)) + s + r) | 0, a) + t) | 0;
                }
                function xi(e, t, n, i, s, r, a) {
                    return (vi((e + (t ^ n ^ i) + s + r) | 0, a) + t) | 0;
                }
                function ji(e, t, n, i, s, r, a) {
                    return (vi((e + (n ^ (t | ~i)) + s + r) | 0, a) + t) | 0;
                }
                const Si = [1518500249, 1859775393, -1894007588, -899497514];
                function ki(e) {
                    return (e << 5) | (e >>> 27);
                }
                function Ti(e) {
                    return (e << 30) | (e >>> 2);
                }
                function Oi(e, t, n, i) {
                    return 0 === e
                        ? (t & n) | (~t & i)
                        : 2 === e
                        ? (t & n) | (t & i) | (n & i)
                        : t ^ n ^ i;
                }
                class Ii extends yi {
                    constructor() {
                        super(64, 56),
                            (this._a = 1732584193),
                            (this._b = 4023233417),
                            (this._c = 2562383102),
                            (this._d = 271733878),
                            (this._e = 3285377520),
                            (this._w = new Array(80));
                    }
                    _update(e) {
                        const t = this._w;
                        let n,
                            i = 0 | this._a,
                            s = 0 | this._b,
                            r = 0 | this._c,
                            a = 0 | this._d,
                            o = 0 | this._e;
                        for (n = 0; n < 16; ++n) t[n] = e.readInt32BE(4 * n);
                        for (; n < 80; ++n)
                            t[n] =
                                ((c = t[n - 3] ^ t[n - 8] ^ t[n - 14] ^ t[n - 16]) << 1) |
                                (c >>> 31);
                        var c;
                        for (let e = 0; e < 80; ++e) {
                            const n = ~~(e / 20),
                                c = (ki(i) + Oi(n, s, r, a) + o + t[e] + Si[n]) | 0;
                            (o = a), (a = r), (r = Ti(s)), (s = i), (i = c);
                        }
                        (this._a = (i + this._a) | 0),
                            (this._b = (s + this._b) | 0),
                            (this._c = (r + this._c) | 0),
                            (this._d = (a + this._d) | 0),
                            (this._e = (o + this._e) | 0);
                    }
                    _hash() {
                        const t = e.allocUnsafe(20);
                        return (
                            t.writeInt32BE(0 | this._a, 0),
                            t.writeInt32BE(0 | this._b, 4),
                            t.writeInt32BE(0 | this._c, 8),
                            t.writeInt32BE(0 | this._d, 12),
                            t.writeInt32BE(0 | this._e, 16),
                            t
                        );
                    }
                }
                const Ei = [
                    1116352408,
                    1899447441,
                    3049323471,
                    3921009573,
                    961987163,
                    1508970993,
                    2453635748,
                    2870763221,
                    3624381080,
                    310598401,
                    607225278,
                    1426881987,
                    1925078388,
                    2162078206,
                    2614888103,
                    3248222580,
                    3835390401,
                    4022224774,
                    264347078,
                    604807628,
                    770255983,
                    1249150122,
                    1555081692,
                    1996064986,
                    2554220882,
                    2821834349,
                    2952996808,
                    3210313671,
                    3336571891,
                    3584528711,
                    113926993,
                    338241895,
                    666307205,
                    773529912,
                    1294757372,
                    1396182291,
                    1695183700,
                    1986661051,
                    2177026350,
                    2456956037,
                    2730485921,
                    2820302411,
                    3259730800,
                    3345764771,
                    3516065817,
                    3600352804,
                    4094571909,
                    275423344,
                    430227734,
                    506948616,
                    659060556,
                    883997877,
                    958139571,
                    1322822218,
                    1537002063,
                    1747873779,
                    1955562222,
                    2024104815,
                    2227730452,
                    2361852424,
                    2428436474,
                    2756734187,
                    3204031479,
                    3329325298
                ];
                function Ci(e, t, n) {
                    return n ^ (e & (t ^ n));
                }
                function Ri(e, t, n) {
                    return (e & t) | (n & (e | t));
                }
                function Ni(e) {
                    return (
                        ((e >>> 2) | (e << 30)) ^
                        ((e >>> 13) | (e << 19)) ^
                        ((e >>> 22) | (e << 10))
                    );
                }
                function qi(e) {
                    return (
                        ((e >>> 6) | (e << 26)) ^ ((e >>> 11) | (e << 21)) ^ ((e >>> 25) | (e << 7))
                    );
                }
                function Ai(e) {
                    return ((e >>> 7) | (e << 25)) ^ ((e >>> 18) | (e << 14)) ^ (e >>> 3);
                }
                class Fi extends yi {
                    constructor() {
                        super(64, 56),
                            (this._a = 1779033703),
                            (this._b = 3144134277),
                            (this._c = 1013904242),
                            (this._d = 2773480762),
                            (this._e = 1359893119),
                            (this._f = 2600822924),
                            (this._g = 528734635),
                            (this._h = 1541459225),
                            (this._w = new Array(64));
                    }
                    _update(e) {
                        const t = this._w;
                        let n,
                            i = 0 | this._a,
                            s = 0 | this._b,
                            r = 0 | this._c,
                            a = 0 | this._d,
                            o = 0 | this._e,
                            c = 0 | this._f,
                            l = 0 | this._g,
                            u = 0 | this._h;
                        for (n = 0; n < 16; ++n) t[n] = e.readInt32BE(4 * n);
                        for (; n < 64; ++n)
                            t[n] =
                                0 |
                                (((((p = t[n - 2]) >>> 17) | (p << 15)) ^
                                    ((p >>> 19) | (p << 13)) ^
                                    (p >>> 10)) +
                                    t[n - 7] +
                                    Ai(t[n - 15]) +
                                    t[n - 16]);
                        var p;
                        for (let e = 0; e < 64; ++e) {
                            const n = (u + qi(o) + Ci(o, c, l) + Ei[e] + t[e]) | 0,
                                p = (Ni(i) + Ri(i, s, r)) | 0;
                            (u = l),
                                (l = c),
                                (c = o),
                                (o = (a + n) | 0),
                                (a = r),
                                (r = s),
                                (s = i),
                                (i = (n + p) | 0);
                        }
                        (this._a = (i + this._a) | 0),
                            (this._b = (s + this._b) | 0),
                            (this._c = (r + this._c) | 0),
                            (this._d = (a + this._d) | 0),
                            (this._e = (o + this._e) | 0),
                            (this._f = (c + this._f) | 0),
                            (this._g = (l + this._g) | 0),
                            (this._h = (u + this._h) | 0);
                    }
                    _hash() {
                        const t = e.allocUnsafe(32);
                        return (
                            t.writeInt32BE(this._a, 0),
                            t.writeInt32BE(this._b, 4),
                            t.writeInt32BE(this._c, 8),
                            t.writeInt32BE(this._d, 12),
                            t.writeInt32BE(this._e, 16),
                            t.writeInt32BE(this._f, 20),
                            t.writeInt32BE(this._g, 24),
                            t.writeInt32BE(this._h, 28),
                            t
                        );
                    }
                }
                const Pi = [
                    1116352408,
                    3609767458,
                    1899447441,
                    602891725,
                    3049323471,
                    3964484399,
                    3921009573,
                    2173295548,
                    961987163,
                    4081628472,
                    1508970993,
                    3053834265,
                    2453635748,
                    2937671579,
                    2870763221,
                    3664609560,
                    3624381080,
                    2734883394,
                    310598401,
                    1164996542,
                    607225278,
                    1323610764,
                    1426881987,
                    3590304994,
                    1925078388,
                    4068182383,
                    2162078206,
                    991336113,
                    2614888103,
                    633803317,
                    3248222580,
                    3479774868,
                    3835390401,
                    2666613458,
                    4022224774,
                    944711139,
                    264347078,
                    2341262773,
                    604807628,
                    2007800933,
                    770255983,
                    1495990901,
                    1249150122,
                    1856431235,
                    1555081692,
                    3175218132,
                    1996064986,
                    2198950837,
                    2554220882,
                    3999719339,
                    2821834349,
                    766784016,
                    2952996808,
                    2566594879,
                    3210313671,
                    3203337956,
                    3336571891,
                    1034457026,
                    3584528711,
                    2466948901,
                    113926993,
                    3758326383,
                    338241895,
                    168717936,
                    666307205,
                    1188179964,
                    773529912,
                    1546045734,
                    1294757372,
                    1522805485,
                    1396182291,
                    2643833823,
                    1695183700,
                    2343527390,
                    1986661051,
                    1014477480,
                    2177026350,
                    1206759142,
                    2456956037,
                    344077627,
                    2730485921,
                    1290863460,
                    2820302411,
                    3158454273,
                    3259730800,
                    3505952657,
                    3345764771,
                    106217008,
                    3516065817,
                    3606008344,
                    3600352804,
                    1432725776,
                    4094571909,
                    1467031594,
                    275423344,
                    851169720,
                    430227734,
                    3100823752,
                    506948616,
                    1363258195,
                    659060556,
                    3750685593,
                    883997877,
                    3785050280,
                    958139571,
                    3318307427,
                    1322822218,
                    3812723403,
                    1537002063,
                    2003034995,
                    1747873779,
                    3602036899,
                    1955562222,
                    1575990012,
                    2024104815,
                    1125592928,
                    2227730452,
                    2716904306,
                    2361852424,
                    442776044,
                    2428436474,
                    593698344,
                    2756734187,
                    3733110249,
                    3204031479,
                    2999351573,
                    3329325298,
                    3815920427,
                    3391569614,
                    3928383900,
                    3515267271,
                    566280711,
                    3940187606,
                    3454069534,
                    4118630271,
                    4000239992,
                    116418474,
                    1914138554,
                    174292421,
                    2731055270,
                    289380356,
                    3203993006,
                    460393269,
                    320620315,
                    685471733,
                    587496836,
                    852142971,
                    1086792851,
                    1017036298,
                    365543100,
                    1126000580,
                    2618297676,
                    1288033470,
                    3409855158,
                    1501505948,
                    4234509866,
                    1607167915,
                    987167468,
                    1816402316,
                    1246189591
                ];
                function Li(e, t, n) {
                    return n ^ (e & (t ^ n));
                }
                function Mi(e, t, n) {
                    return (e & t) | (n & (e | t));
                }
                function Di(e, t) {
                    return (
                        ((e >>> 28) | (t << 4)) ^ ((t >>> 2) | (e << 30)) ^ ((t >>> 7) | (e << 25))
                    );
                }
                function Bi(e, t) {
                    return (
                        ((e >>> 14) | (t << 18)) ^
                        ((e >>> 18) | (t << 14)) ^
                        ((t >>> 9) | (e << 23))
                    );
                }
                function Ui(e, t) {
                    return ((e >>> 1) | (t << 31)) ^ ((e >>> 8) | (t << 24)) ^ (e >>> 7);
                }
                function zi(e, t) {
                    return (
                        ((e >>> 1) | (t << 31)) ^ ((e >>> 8) | (t << 24)) ^ ((e >>> 7) | (t << 25))
                    );
                }
                function Vi(e, t) {
                    return ((e >>> 19) | (t << 13)) ^ ((t >>> 29) | (e << 3)) ^ (e >>> 6);
                }
                function $i(e, t) {
                    return (
                        ((e >>> 19) | (t << 13)) ^ ((t >>> 29) | (e << 3)) ^ ((e >>> 6) | (t << 26))
                    );
                }
                function Qi(e, t) {
                    return e >>> 0 < t >>> 0 ? 1 : 0;
                }
                class Wi extends yi {
                    constructor() {
                        super(128, 112),
                            (this._ah = 1779033703),
                            (this._bh = 3144134277),
                            (this._ch = 1013904242),
                            (this._dh = 2773480762),
                            (this._eh = 1359893119),
                            (this._fh = 2600822924),
                            (this._gh = 528734635),
                            (this._hh = 1541459225),
                            (this._al = 4089235720),
                            (this._bl = 2227873595),
                            (this._cl = 4271175723),
                            (this._dl = 1595750129),
                            (this._el = 2917565137),
                            (this._fl = 725511199),
                            (this._gl = 4215389547),
                            (this._hl = 327033209),
                            (this._w = new Array(160));
                    }
                    _update(e) {
                        const t = this._w;
                        let n,
                            i,
                            s = 0 | this._ah,
                            r = 0 | this._bh,
                            a = 0 | this._ch,
                            o = 0 | this._dh,
                            c = 0 | this._eh,
                            l = 0 | this._fh,
                            u = 0 | this._gh,
                            p = 0 | this._hh,
                            d = 0 | this._al,
                            h = 0 | this._bl,
                            f = 0 | this._cl,
                            m = 0 | this._dl,
                            g = 0 | this._el,
                            b = 0 | this._fl,
                            y = 0 | this._gl,
                            v = 0 | this._hl,
                            w = 0;
                        for (w = 0; w < 32; w += 2)
                            (t[w] = e.readInt32BE(4 * w)), (t[w + 1] = e.readInt32BE(4 * w + 4));
                        for (; w < 160; w += 2) {
                            let e = t[w - 30],
                                s = t[w - 30 + 1];
                            const r = Ui(e, s),
                                a = zi(s, e);
                            (e = t[w - 4]), (s = t[w - 4 + 1]);
                            const o = Vi(e, s),
                                c = $i(s, e),
                                l = t[w - 14],
                                u = t[w - 14 + 1],
                                p = t[w - 32],
                                d = t[w - 32 + 1];
                            (i = (a + u) | 0),
                                (n = (r + l + Qi(i, a)) | 0),
                                (i = (i + c) | 0),
                                (n = (n + o + Qi(i, c)) | 0),
                                (i = (i + d) | 0),
                                (n = (n + p + Qi(i, d)) | 0),
                                (t[w] = n),
                                (t[w + 1] = i);
                        }
                        for (let e = 0; e < 160; e += 2) {
                            (n = t[e]), (i = t[e + 1]);
                            const w = Mi(s, r, a),
                                _ = Mi(d, h, f),
                                x = Di(s, d),
                                j = Di(d, s),
                                S = Bi(c, g),
                                k = Bi(g, c),
                                T = Pi[e],
                                O = Pi[e + 1],
                                I = Li(c, l, u),
                                E = Li(g, b, y);
                            let C = (v + k) | 0,
                                R = (p + S + Qi(C, v)) | 0;
                            (C = (C + E) | 0),
                                (R = (R + I + Qi(C, E)) | 0),
                                (C = (C + O) | 0),
                                (R = (R + T + Qi(C, O)) | 0),
                                (C = (C + i) | 0),
                                (R = (R + n + Qi(C, i)) | 0);
                            const N = (j + _) | 0,
                                q = (x + w + Qi(N, j)) | 0;
                            (p = u),
                                (v = y),
                                (u = l),
                                (y = b),
                                (l = c),
                                (b = g),
                                (g = (m + C) | 0),
                                (c = (o + R + Qi(g, m)) | 0),
                                (o = a),
                                (m = f),
                                (a = r),
                                (f = h),
                                (r = s),
                                (h = d),
                                (d = (C + N) | 0),
                                (s = (R + q + Qi(d, C)) | 0);
                        }
                        (this._al = (this._al + d) | 0),
                            (this._bl = (this._bl + h) | 0),
                            (this._cl = (this._cl + f) | 0),
                            (this._dl = (this._dl + m) | 0),
                            (this._el = (this._el + g) | 0),
                            (this._fl = (this._fl + b) | 0),
                            (this._gl = (this._gl + y) | 0),
                            (this._hl = (this._hl + v) | 0),
                            (this._ah = (this._ah + s + Qi(this._al, d)) | 0),
                            (this._bh = (this._bh + r + Qi(this._bl, h)) | 0),
                            (this._ch = (this._ch + a + Qi(this._cl, f)) | 0),
                            (this._dh = (this._dh + o + Qi(this._dl, m)) | 0),
                            (this._eh = (this._eh + c + Qi(this._el, g)) | 0),
                            (this._fh = (this._fh + l + Qi(this._fl, b)) | 0),
                            (this._gh = (this._gh + u + Qi(this._gl, y)) | 0),
                            (this._hh = (this._hh + p + Qi(this._hl, v)) | 0);
                    }
                    _hash() {
                        const t = e.allocUnsafe(64);
                        function n(e, n, i) {
                            t.writeInt32BE(e, i), t.writeInt32BE(n, i + 4);
                        }
                        return (
                            n(this._ah, this._al, 0),
                            n(this._bh, this._bl, 8),
                            n(this._ch, this._cl, 16),
                            n(this._dh, this._dl, 24),
                            n(this._eh, this._el, 32),
                            n(this._fh, this._fl, 40),
                            n(this._gh, this._gl, 48),
                            n(this._hh, this._hl, 56),
                            t
                        );
                    }
                }
                const Gi = new Map([
                    [
                        'md5',
                        class extends yi {
                            constructor() {
                                super(64, 56, 'le'),
                                    (this._a = 1732584193),
                                    (this._b = 4023233417),
                                    (this._c = 2562383102),
                                    (this._d = 271733878),
                                    (this._m = new Array(16));
                            }
                            _update(e) {
                                const t = this._m;
                                for (let n = 0; n < 16; ++n) t[n] = e.readInt32LE(4 * n);
                                let n = this._a,
                                    i = this._b,
                                    s = this._c,
                                    r = this._d;
                                (n = wi(n, i, s, r, t[0], 3614090360, 7)),
                                    (r = wi(r, n, i, s, t[1], 3905402710, 12)),
                                    (s = wi(s, r, n, i, t[2], 606105819, 17)),
                                    (i = wi(i, s, r, n, t[3], 3250441966, 22)),
                                    (n = wi(n, i, s, r, t[4], 4118548399, 7)),
                                    (r = wi(r, n, i, s, t[5], 1200080426, 12)),
                                    (s = wi(s, r, n, i, t[6], 2821735955, 17)),
                                    (i = wi(i, s, r, n, t[7], 4249261313, 22)),
                                    (n = wi(n, i, s, r, t[8], 1770035416, 7)),
                                    (r = wi(r, n, i, s, t[9], 2336552879, 12)),
                                    (s = wi(s, r, n, i, t[10], 4294925233, 17)),
                                    (i = wi(i, s, r, n, t[11], 2304563134, 22)),
                                    (n = wi(n, i, s, r, t[12], 1804603682, 7)),
                                    (r = wi(r, n, i, s, t[13], 4254626195, 12)),
                                    (s = wi(s, r, n, i, t[14], 2792965006, 17)),
                                    (i = wi(i, s, r, n, t[15], 1236535329, 22)),
                                    (n = _i(n, i, s, r, t[1], 4129170786, 5)),
                                    (r = _i(r, n, i, s, t[6], 3225465664, 9)),
                                    (s = _i(s, r, n, i, t[11], 643717713, 14)),
                                    (i = _i(i, s, r, n, t[0], 3921069994, 20)),
                                    (n = _i(n, i, s, r, t[5], 3593408605, 5)),
                                    (r = _i(r, n, i, s, t[10], 38016083, 9)),
                                    (s = _i(s, r, n, i, t[15], 3634488961, 14)),
                                    (i = _i(i, s, r, n, t[4], 3889429448, 20)),
                                    (n = _i(n, i, s, r, t[9], 568446438, 5)),
                                    (r = _i(r, n, i, s, t[14], 3275163606, 9)),
                                    (s = _i(s, r, n, i, t[3], 4107603335, 14)),
                                    (i = _i(i, s, r, n, t[8], 1163531501, 20)),
                                    (n = _i(n, i, s, r, t[13], 2850285829, 5)),
                                    (r = _i(r, n, i, s, t[2], 4243563512, 9)),
                                    (s = _i(s, r, n, i, t[7], 1735328473, 14)),
                                    (i = _i(i, s, r, n, t[12], 2368359562, 20)),
                                    (n = xi(n, i, s, r, t[5], 4294588738, 4)),
                                    (r = xi(r, n, i, s, t[8], 2272392833, 11)),
                                    (s = xi(s, r, n, i, t[11], 1839030562, 16)),
                                    (i = xi(i, s, r, n, t[14], 4259657740, 23)),
                                    (n = xi(n, i, s, r, t[1], 2763975236, 4)),
                                    (r = xi(r, n, i, s, t[4], 1272893353, 11)),
                                    (s = xi(s, r, n, i, t[7], 4139469664, 16)),
                                    (i = xi(i, s, r, n, t[10], 3200236656, 23)),
                                    (n = xi(n, i, s, r, t[13], 681279174, 4)),
                                    (r = xi(r, n, i, s, t[0], 3936430074, 11)),
                                    (s = xi(s, r, n, i, t[3], 3572445317, 16)),
                                    (i = xi(i, s, r, n, t[6], 76029189, 23)),
                                    (n = xi(n, i, s, r, t[9], 3654602809, 4)),
                                    (r = xi(r, n, i, s, t[12], 3873151461, 11)),
                                    (s = xi(s, r, n, i, t[15], 530742520, 16)),
                                    (i = xi(i, s, r, n, t[2], 3299628645, 23)),
                                    (n = ji(n, i, s, r, t[0], 4096336452, 6)),
                                    (r = ji(r, n, i, s, t[7], 1126891415, 10)),
                                    (s = ji(s, r, n, i, t[14], 2878612391, 15)),
                                    (i = ji(i, s, r, n, t[5], 4237533241, 21)),
                                    (n = ji(n, i, s, r, t[12], 1700485571, 6)),
                                    (r = ji(r, n, i, s, t[3], 2399980690, 10)),
                                    (s = ji(s, r, n, i, t[10], 4293915773, 15)),
                                    (i = ji(i, s, r, n, t[1], 2240044497, 21)),
                                    (n = ji(n, i, s, r, t[8], 1873313359, 6)),
                                    (r = ji(r, n, i, s, t[15], 4264355552, 10)),
                                    (s = ji(s, r, n, i, t[6], 2734768916, 15)),
                                    (i = ji(i, s, r, n, t[13], 1309151649, 21)),
                                    (n = ji(n, i, s, r, t[4], 4149444226, 6)),
                                    (r = ji(r, n, i, s, t[11], 3174756917, 10)),
                                    (s = ji(s, r, n, i, t[2], 718787259, 15)),
                                    (i = ji(i, s, r, n, t[9], 3951481745, 21)),
                                    (this._a = (this._a + n) | 0),
                                    (this._b = (this._b + i) | 0),
                                    (this._c = (this._c + s) | 0),
                                    (this._d = (this._d + r) | 0);
                            }
                            _hash() {
                                const t = e.allocUnsafe(16);
                                return (
                                    t.writeInt32LE(this._a, 0),
                                    t.writeInt32LE(this._b, 4),
                                    t.writeInt32LE(this._c, 8),
                                    t.writeInt32LE(this._d, 12),
                                    t
                                );
                            }
                        }
                    ],
                    ['sha-1', Ii],
                    ['sha-256', Fi],
                    ['sha-512', Wi],
                    ['sha1', Ii],
                    ['sha256', Fi],
                    ['sha512', Wi]
                ]);
                function Hi(e) {
                    e = e.toLowerCase();
                    const t = Gi.get(e);
                    if (t) return new t();
                    throw new Error('Unsupported hash algorithm: ' + e);
                }
                const Ji = e.alloc(128);
                class Yi extends l.Transform {
                    constructor(t, n) {
                        super(), 'string' == typeof n && (n = e.from(n));
                        const i = 'sha512' === t ? 128 : 64;
                        (this._alg = t),
                            n.length > i
                                ? (n = Hi(t).update(n).digest())
                                : n.length < i && (n = e.concat([n, Ji], i)),
                            (this._ipad = e.alloc(i)),
                            (this._opad = e.alloc(i));
                        for (let e = 0; e < i; e++)
                            (this._ipad[e] = 54 ^ n[e]), (this._opad[e] = 92 ^ n[e]);
                        this._hash = Hi(t).update(this._ipad);
                    }
                    _transform(e, t, n) {
                        let i;
                        try {
                            this.update(e, t);
                        } catch (e) {
                            i = e;
                        } finally {
                            n(i);
                        }
                    }
                    _flush(e) {
                        let t;
                        try {
                            this.push(this._final());
                        } catch (e) {
                            t = e;
                        }
                        e(t);
                    }
                    _final() {
                        const e = this._hash.digest();
                        return Hi(this._alg).update(this._opad).update(e).digest();
                    }
                    update(e, t) {
                        return this._hash.update(e, t), this;
                    }
                    digest(t) {
                        const n = this._final() || e.alloc(0);
                        return t ? n.toString(t) : n;
                    }
                }
                let Ki;
                function Xi(t) {
                    const n = new Uint8Array(t);
                    return t > 0 && (Ki.crypto || Ki.msCrypto).getRandomValues(n), e.from(n.buffer);
                }
                'undefined' != typeof window ? (Ki = window) : void 0 !== i && (Ki = i);
                const Zi = fetch,
                    es = WebSocket,
                    ts = Ki.RTCPeerConnection;
                class ns {
                    constructor(e) {
                        (this.authenticated = !1),
                            (this.mutuallyAuthenticated = !1),
                            (this.name = e);
                    }
                    getCacheableCredentials() {
                        return null;
                    }
                    processChallenge(e) {}
                    processSuccess(e) {
                        this.authenticated = !0;
                    }
                    finalize() {
                        const e = {
                            authenticated: this.authenticated,
                            mutuallyAuthenticated: this.mutuallyAuthenticated
                        };
                        return this.errorData && (e.errorData = this.errorData), e;
                    }
                }
                class is {
                    constructor() {
                        this.mechanisms = [];
                    }
                    register(e, t, n) {
                        this.mechanisms.push({
                            constructor: t,
                            name: e.toUpperCase(),
                            priority: n || this.mechanisms.length
                        }),
                            this.mechanisms.sort((e, t) => t.priority - e.priority);
                    }
                    disable(e) {
                        const t = e.toUpperCase();
                        this.mechanisms = this.mechanisms.filter(e => e.name !== t);
                    }
                    createMechanism(e) {
                        const t = e.map(e => e.toUpperCase());
                        for (const e of this.mechanisms)
                            for (const n of t) if (n === e.name) return new e.constructor(e.name);
                        return null;
                    }
                }
                function ss(e = 32) {
                    return Xi(e).toString('hex');
                }
                function rs(t, n) {
                    const i = [];
                    for (let e = 0; e < t.length; e++) i.push(t[e] ^ n[e]);
                    return e.from(i);
                }
                function as(e, t) {
                    return Hi(t).update(e).digest();
                }
                function os(e, t, n) {
                    return (function (e, t) {
                        return new Yi(e.toLowerCase(), t);
                    })(n, e)
                        .update(t)
                        .digest();
                }
                function cs(t, n, i, s) {
                    let r = os(t, e.concat([n, e.from('00000001', 'hex')]), s),
                        a = r;
                    for (let e = 0; e < i - 1; e++) (r = os(t, r, s)), (a = rs(a, r));
                    return a;
                }
                function ls(e) {
                    const t = {},
                        n = e.toString().split(/,(?=(?:[^"]|"[^"]*")*$)/);
                    for (let e = 0, i = n.length; e < i; e++) {
                        const i = /(\w+)=["]?([^"]+)["]?$/.exec(n[e]);
                        i && (t[i[1]] = i[2]);
                    }
                    return t;
                }
                function us(e) {
                    const t = [];
                    for (const n of e)
                        ',' === n ? t.push('=2C') : '=' === n ? t.push('=3D') : t.push(n);
                    return t.join('');
                }
                class ps extends ns {
                    getExpectedCredentials() {
                        return { optional: ['trace'], required: [] };
                    }
                    createResponse(t) {
                        return e.from(t.trace || '');
                    }
                }
                class ds extends ns {
                    getExpectedCredentials() {
                        return { optional: ['authzid'], required: [] };
                    }
                    createResponse(t) {
                        return e.from(t.authzid || '');
                    }
                }
                class hs extends ns {
                    getExpectedCredentials() {
                        return { optional: ['authzid'], required: ['username', 'password'] };
                    }
                    createResponse(t) {
                        return e.from(
                            (t.authzid || '') + '\0' + t.username + '\0' + (t.password || t.token)
                        );
                    }
                }
                class fs extends ns {
                    constructor(e) {
                        super(e), (this.failed = !1), (this.name = e);
                    }
                    getExpectedCredentials() {
                        return { optional: ['authzid'], required: ['token'] };
                    }
                    createResponse(t) {
                        if (this.failed) return e.from('');
                        const n = `n,${us(M(t.authzid))},`,
                            i = `auth=Bearer ${t.token}`;
                        return e.from(n + '' + i + '', 'utf8');
                    }
                    processChallenge(e) {
                        (this.failed = !0), (this.errorData = JSON.parse(e.toString('utf8')));
                    }
                }
                class ms extends ns {
                    constructor(e) {
                        super(e),
                            (this.providesMutualAuthentication = !1),
                            (this.state = 'INITIAL'),
                            (this.name = e);
                    }
                    processChallenge(e) {
                        this.state = 'CHALLENGE';
                        const t = ls(e);
                        (this.authenticated = !!t.rspauth),
                            (this.realm = t.realm),
                            (this.nonce = t.nonce),
                            (this.charset = t.charset);
                    }
                    getExpectedCredentials() {
                        return {
                            optional: ['authzid', 'clientNonce', 'realm'],
                            required: ['host', 'password', 'serviceName', 'serviceType', 'username']
                        };
                    }
                    createResponse(t) {
                        if ('INITIAL' === this.state || this.authenticated) return null;
                        let n = t.serviceType + '/' + t.host;
                        t.serviceName && t.host !== t.serviceName && (n += '/' + t.serviceName);
                        const i = t.realm || this.realm || '',
                            s = t.clientNonce || ss(16),
                            r = '00000001';
                        let a = '';
                        (a += 'username="' + t.username + '"'),
                            i && (a += ',realm="' + i + '"'),
                            (a += ',nonce="' + this.nonce + '"'),
                            (a += ',cnonce="' + s + '"'),
                            (a += ',nc=' + r),
                            (a += ',qop=auth'),
                            (a += ',digest-uri="' + n + '"');
                        const o = Hi('md5')
                                .update(t.username)
                                .update(':')
                                .update(i)
                                .update(':')
                                .update(t.password)
                                .digest(),
                            c = Hi('md5')
                                .update(o)
                                .update(':')
                                .update(this.nonce)
                                .update(':')
                                .update(s);
                        t.authzid && c.update(':').update(t.authzid);
                        const l = c.digest('hex'),
                            u = Hi('md5').update('AUTHENTICATE:').update(n).digest('hex');
                        return (
                            (a +=
                                ',response=' +
                                Hi('md5')
                                    .update(l)
                                    .update(':')
                                    .update(this.nonce)
                                    .update(':')
                                    .update(r)
                                    .update(':')
                                    .update(s)
                                    .update(':')
                                    .update('auth')
                                    .update(':')
                                    .update(u)
                                    .digest('hex')),
                            'utf-8' === this.charset && (a += ',charset=utf-8'),
                            t.authzid && (a += ',authzid="' + t.authzid + '"'),
                            e.from(a)
                        );
                    }
                }
                class gs {
                    constructor(e) {
                        (this.providesMutualAuthentication = !0),
                            (this.name = e),
                            (this.state = 'INITIAL'),
                            (this.useChannelBinding = this.name.toLowerCase().endsWith('-plus')),
                            (this.algorithm = this.name
                                .toLowerCase()
                                .split('scram-')[1]
                                .split('-plus')[0]);
                    }
                    getExpectedCredentials() {
                        const e = ['username', 'password'];
                        return (
                            this.useChannelBinding && e.push('tlsUnique'),
                            { optional: ['authzid', 'clientNonce'], required: e }
                        );
                    }
                    getCacheableCredentials() {
                        return this.cache;
                    }
                    createResponse(e) {
                        return 'INITIAL' === this.state
                            ? this.initialResponse(e)
                            : this.challengeResponse(e);
                    }
                    processChallenge(t) {
                        const n = ls(t);
                        (this.salt = e.from(n.s || '', 'base64')),
                            (this.iterationCount = parseInt(n.i, 10)),
                            (this.nonce = n.r),
                            (this.verifier = n.v),
                            (this.error = n.e),
                            (this.challenge = t);
                    }
                    processSuccess(e) {
                        this.processChallenge(e);
                    }
                    finalize() {
                        return this.verifier
                            ? this.serverSignature.toString('base64') !== this.verifier
                                ? {
                                      authenticated: !1,
                                      error: 'Mutual authentication failed',
                                      mutuallyAuthenticated: !1
                                  }
                                : { authenticated: !0, mutuallyAuthenticated: !0 }
                            : { authenticated: !1, error: this.error, mutuallyAuthenticated: !1 };
                    }
                    initialResponse(t) {
                        const n = us(M(t.authzid)),
                            i = us(M(t.username));
                        this.clientNonce = t.clientNonce || ss();
                        let s = 'n';
                        t.tlsUnique && (s = this.useChannelBinding ? 'p=tls-unique' : 'y'),
                            (this.gs2Header = e.from(n ? `${s},a=${n},` : s + ',,')),
                            (this.clientFirstMessageBare = e.from(`n=${i},r=${this.clientNonce}`));
                        const r = e.concat([this.gs2Header, this.clientFirstMessageBare]);
                        return (this.state = 'CHALLENGE'), r;
                    }
                    challengeResponse(t) {
                        const n = e.from('Client Key'),
                            i = e.from('Server Key'),
                            s = e
                                .concat([this.gs2Header, t.tlsUnique || e.from('')])
                                .toString('base64'),
                            r = e.from(`c=${s},r=${this.nonce}`);
                        let a, o, c;
                        const l = t.salt && 0 === e.compare(t.salt, this.salt);
                        l && t.clientKey && t.serverKey
                            ? ((o = e.from(t.clientKey)), (c = e.from(t.serverKey)))
                            : l && t.saltedPassword
                            ? ((a = e.from(t.saltedPassword)),
                              (o = os(a, n, this.algorithm)),
                              (c = os(a, i, this.algorithm)))
                            : ((a = cs(
                                  e.from(M(t.password)),
                                  this.salt,
                                  this.iterationCount,
                                  this.algorithm
                              )),
                              (o = os(a, n, this.algorithm)),
                              (c = os(a, i, this.algorithm)));
                        const u = as(o, this.algorithm),
                            p = e.from(','),
                            d = e.concat([this.clientFirstMessageBare, p, this.challenge, p, r]),
                            h = rs(o, os(u, d, this.algorithm)).toString('base64');
                        this.serverSignature = os(c, d, this.algorithm);
                        const f = e.concat([r, e.from(',p=' + h)]);
                        return (
                            (this.state = 'FINAL'),
                            (this.cache = {
                                clientKey: o,
                                salt: this.salt,
                                saltedPassword: a,
                                serverKey: c
                            }),
                            f
                        );
                    }
                }
                var bs = Object.freeze({
                    __proto__: null,
                    SimpleMech: ns,
                    Factory: is,
                    createClientNonce: ss,
                    XOR: rs,
                    H: as,
                    HMAC: os,
                    Hi: cs,
                    ANONYMOUS: ps,
                    EXTERNAL: ds,
                    PLAIN: hs,
                    OAUTH: fs,
                    DIGEST: ms,
                    SCRAM: gs
                });
                function ys(e) {
                    (e.getAccountInfo = t =>
                        Object(s.a)(this, void 0, void 0, function* () {
                            return (yield e.sendIQ({ account: {}, to: t, type: 'get' })).account;
                        })),
                        (e.updateAccount = (t, n) => e.sendIQ({ account: n, to: t, type: 'set' })),
                        (e.deleteAccount = t =>
                            e.sendIQ({ account: { remove: !0 }, to: t, type: 'set' })),
                        (e.getPrivateData = t =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                return (yield e.sendIQ({
                                    privateStorage: { [t]: {} },
                                    type: 'get'
                                })).privateStorage[t];
                            })),
                        (e.setPrivateData = (t, n) =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                return e.sendIQ({ privateStorage: { [t]: n }, type: 'set' });
                            })),
                        (e.getVCard = t =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                return (yield e.sendIQ({
                                    to: t,
                                    type: 'get',
                                    vcard: { format: 'vcard-temp' }
                                })).vcard;
                            })),
                        (e.publishVCard = t =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                yield e.sendIQ({ type: 'set', vcard: t });
                            })),
                        (e.enableNotifications = (t, n, i = []) =>
                            e.sendIQ({
                                push: {
                                    action: 'enable',
                                    form: {
                                        fields: [
                                            {
                                                name: 'FORM_TYPE',
                                                type: 'hidden',
                                                value:
                                                    'http://jabber.org/protocol/pubsub#publish-options'
                                            },
                                            ...i
                                        ],
                                        type: 'submit'
                                    },
                                    jid: t,
                                    node: n
                                },
                                type: 'set'
                            })),
                        (e.disableNotifications = (t, n) =>
                            e.sendIQ({
                                push: { action: 'disable', jid: t, node: n },
                                type: 'set'
                            }));
                }
                function vs(e) {
                    e.disco.addFeature(En(yn)),
                        e.on('pubsub:published', t => {
                            if (t.pubsub.items.node !== yn) return;
                            const n = t.pubsub.items.published[0].content;
                            e.emit('avatar', {
                                avatars: n.versions || [],
                                jid: t.from,
                                source: 'pubsub'
                            });
                        }),
                        e.on('presence', t => {
                            t.vcardAvatar &&
                                'string' == typeof t.vcardAvatar &&
                                e.emit('avatar', {
                                    avatars: [{ id: t.vcardAvatar }],
                                    jid: t.from,
                                    source: 'vcard'
                                });
                        }),
                        (e.publishAvatar = (t, n) =>
                            e.publish('', bn, { data: n, itemType: bn }, t)),
                        (e.useAvatars = (t, n = []) =>
                            e.publish(
                                '',
                                yn,
                                { itemType: yn, pointers: n, versions: t },
                                'current'
                            )),
                        (e.getAvatar = (t, n) => e.getItem(t, bn, n));
                }
                function ws(e) {
                    e.registerFeature('bind', 300, (t, n) =>
                        Object(s.a)(this, void 0, void 0, function* () {
                            try {
                                const i = yield e.sendIQ({
                                    bind: { resource: e.config.resource },
                                    type: 'set'
                                });
                                (e.features.negotiated.bind = !0),
                                    e.emit('session:prebind', i.bind.jid);
                                const s =
                                    !t.legacySession ||
                                    (t.legacySession && t.legacySession.optional);
                                return (
                                    !e.sessionStarted && s && e.emit('session:started', e.jid), n()
                                );
                            } catch (e) {
                                return console.error(e), n('disconnect', 'JID binding failed');
                            }
                        })
                    ),
                        e.registerFeature('legacySession', 1e3, (t, n) =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                if (
                                    e.sessionStarted ||
                                    (t.legacySession && t.legacySession.optional)
                                )
                                    return (e.features.negotiated.session = !0), n();
                                try {
                                    return (
                                        yield e.sendIQ({ legacySession: !0, type: 'set' }),
                                        (e.features.negotiated.session = !0),
                                        e.sessionStarted ||
                                            ((e.sessionStarted = !0),
                                            e.emit('session:started', e.jid)),
                                        n()
                                    );
                                } catch (e) {
                                    return n('disconnect', 'Session requeset failed');
                                }
                            })
                        ),
                        e.on('session:started', () => {
                            e.sessionStarted = !0;
                        }),
                        e.on('session:prebind', t => {
                            (e.jid = t), e.emit('session:bound', e.jid);
                        }),
                        e.on('--reset-stream-features', () => {
                            (e.sessionStarted = !1),
                                (e.features.negotiated.bind = !1),
                                (e.features.negotiated.session = !1);
                        });
                }
                function _s(e) {
                    e.disco.addFeature(an),
                        e.disco.addItem({ name: 'Ad-Hoc Commands', node: an }),
                        (e.getCommands = t => e.getDiscoItems(t, an));
                }
                const xs = [];
                for (let e = 0; e < 256; ++e) xs[e] = (e + 256).toString(16).substr(1);
                function js(e, t, n = () => {}) {
                    return Object(s.a)(this, void 0, void 0, function* () {
                        let i;
                        const s = yield Promise.race([
                            e,
                            new Promise((e, s) => {
                                i = setTimeout(() => s(n()), t);
                            })
                        ]);
                        return clearTimeout(i), s;
                    });
                }
                function Ss(e) {
                    return Object(s.a)(this, void 0, void 0, function* () {
                        return new Promise(t => {
                            setTimeout(() => t(), e);
                        });
                    });
                }
                function ks(t, n) {
                    const i = 'string' == typeof t ? e.from(t, 'utf8') : t,
                        s = 'string' == typeof n ? e.from(n, 'utf8') : n;
                    return i.compare(s);
                }
                function Ts() {
                    const e = Xi(16);
                    (e[6] = (15 & e[6]) | 64), (e[8] = (63 & e[8]) | 128);
                    let t = 0;
                    return [
                        xs[e[t++]],
                        xs[e[t++]],
                        xs[e[t++]],
                        xs[e[t++]],
                        '-',
                        xs[e[t++]],
                        xs[e[t++]],
                        '-',
                        xs[e[t++]],
                        xs[e[t++]],
                        '-',
                        xs[e[t++]],
                        xs[e[t++]],
                        '-',
                        xs[e[t++]],
                        xs[e[t++]],
                        xs[e[t++]],
                        xs[e[t++]],
                        xs[e[t++]],
                        xs[e[15]]
                    ].join('');
                }
                const Os = new Set([
                        'date',
                        'expires',
                        'httpUploadRetry',
                        'idleSince',
                        'published',
                        'since',
                        'stamp',
                        'timestamp',
                        'updated',
                        'utc'
                    ]),
                    Is = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)(?:Z|((\+|-)([\d|:]*)))?$/;
                var Es = Object.freeze({
                    __proto__: null,
                    timeoutPromise: js,
                    sleep: Ss,
                    octetCompare: ks,
                    uuid: Ts,
                    reviveData: function (t, n) {
                        return Os.has(t) && n && 'string' == typeof n && Is.test(n)
                            ? new Date(n)
                            : n &&
                              'object' == typeof n &&
                              'Buffer' === n.type &&
                              Array.isArray(n.data)
                            ? e.from(n)
                            : n;
                    }
                });
                function Cs(e, t) {
                    e.features.negotiated.clientStateIndication && e.send('csi', { type: t });
                }
                function Rs(e) {
                    e.disco.addFeature('urn:xmpp:ping'),
                        e.on('iq:get:ping', t => {
                            e.sendIQResult(t);
                        }),
                        e.on('--reset-stream-features', () => {
                            e.disableKeepAlive(),
                                (e.features.negotiated.streamManagement = !1),
                                (e.features.negotiated.clientStateIndication = !1);
                        }),
                        (e.markActive = () => Cs(e, 'active')),
                        (e.markInactive = () => Cs(e, 'inactive')),
                        (e.ping = t =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                yield e.sendIQ({ ping: !0, to: t, type: 'get' });
                            })),
                        (e.enableKeepAlive = (t = {}) => {
                            const n = t.interval || 300,
                                i = t.timeout || e.config.timeout || 15;
                            e._keepAliveInterval = setInterval(function () {
                                return Object(s.a)(this, void 0, void 0, function* () {
                                    if (e.sessionStarted)
                                        try {
                                            yield js(
                                                (function (e) {
                                                    return Object(s.a)(
                                                        this,
                                                        void 0,
                                                        void 0,
                                                        function* () {
                                                            if (e.sm.started)
                                                                return new Promise(t => {
                                                                    e.once(
                                                                        'stream:management:ack',
                                                                        () => t()
                                                                    ),
                                                                        e.sm.request();
                                                                });
                                                            try {
                                                                yield e.ping();
                                                            } catch (e) {
                                                                if (
                                                                    e.error &&
                                                                    'timeout' !== e.error.condition
                                                                )
                                                                    return;
                                                                throw e;
                                                            }
                                                        }
                                                    );
                                                })(e),
                                                1e3 * i
                                            );
                                        } catch (t) {
                                            e.emit('stream:error', {
                                                condition: 'connection-timeout',
                                                text: 'Server did not respond in ' + i + ' seconds'
                                            }),
                                                e.transport &&
                                                    ((e.transport.hasStream = !1),
                                                    e.transport.disconnect());
                                        }
                                });
                            }, 1e3 * n);
                        }),
                        (e.disableKeepAlive = () => {
                            e._keepAliveInterval &&
                                (clearInterval(e._keepAliveInterval), delete e._keepAliveInterval);
                        });
                    const t = (t, n) =>
                        Object(s.a)(this, void 0, void 0, function* () {
                            if (!e.config.useStreamManagement) return n();
                            const t = i =>
                                Object(s.a)(this, void 0, void 0, function* () {
                                    switch (i.type) {
                                        case 'enabled':
                                            return (
                                                yield e.sm.enabled(i),
                                                (e.features.negotiated.streamManagement = !0),
                                                e.off('sm', t),
                                                n()
                                            );
                                        case 'resumed':
                                            return (
                                                yield e.sm.resumed(i),
                                                (e.features.negotiated.streamManagement = !0),
                                                (e.features.negotiated.bind = !0),
                                                (e.sessionStarted = !0),
                                                e.off('sm', t),
                                                e.emit('stream:management:resumed', i),
                                                n('break')
                                            );
                                        case 'failed':
                                            yield e.sm.failed(i),
                                                e.off('sm', t),
                                                e.emit('session:end'),
                                                n();
                                    }
                                });
                            e.on('sm', t),
                                e.sm.id
                                    ? e.sm.id && e.sm.allowResume
                                        ? yield e.sm.resume()
                                        : (e.off('sm', t), n())
                                    : e.features.negotiated.bind
                                    ? yield e.sm.enable()
                                    : (e.off('sm', t), n());
                        });
                    e.registerFeature('streamManagement', 200, t),
                        e.registerFeature('streamManagement', 500, t),
                        e.registerFeature('clientStateIndication', 400, (t, n) => {
                            (e.features.negotiated.clientStateIndication = !0), n();
                        });
                }
                function Ns(t) {
                    return e.from(t.replace(/</g, '&lt;'), 'utf-8');
                }
                function qs(e = []) {
                    const t = [];
                    for (const n of e)
                        'FORM_TYPE' !== n.name &&
                            (n.rawValues
                                ? t.push({
                                      name: Ns(n.name),
                                      values: n.rawValues.map(e => Ns(e)).sort(ks)
                                  })
                                : Array.isArray(n.value)
                                ? t.push({
                                      name: Ns(n.name),
                                      values: n.value.map(e => Ns(e)).sort(ks)
                                  })
                                : !0 === n.value || !1 === n.value
                                ? t.push({ name: Ns(n.name), values: [Ns(n.value ? '1' : '0')] })
                                : t.push({ name: Ns(n.name), values: [Ns(n.value || '')] }));
                    t.sort((e, t) => ks(e.name, t.name));
                    const n = [];
                    for (const e of t) {
                        n.push(e.name);
                        for (const t of e.values) n.push(t);
                    }
                    return n;
                }
                function As(t, n) {
                    const i = [],
                        s = e.from('<', 'utf8'),
                        r = e => {
                            i.push(e), i.push(s);
                        },
                        a = (function (e = []) {
                            const t = [],
                                n = new Set();
                            for (const { category: i, type: s, lang: r, name: a } of e) {
                                const e = `${i}/${s}/${r || ''}/${a || ''}`;
                                if (n.has(e)) return null;
                                n.add(e), t.push(Ns(e));
                            }
                            return t.sort(ks), t;
                        })(t.identities),
                        o = (function (e = []) {
                            const t = [],
                                n = new Set();
                            for (const i of e) {
                                if (n.has(i)) return null;
                                n.add(i), t.push(Ns(i));
                            }
                            return t.sort(ks), t;
                        })(t.features),
                        c = (function (e = []) {
                            const t = [],
                                n = new Set();
                            for (const i of e) {
                                let e;
                                for (const t of i.fields || [])
                                    if ('FORM_TYPE' === t.name && 'hidden' === t.type) {
                                        if (t.rawValues && 1 === t.rawValues.length) {
                                            e = Ns(t.rawValues[0]);
                                            break;
                                        }
                                        if (t.value && 'string' == typeof t.value) {
                                            e = Ns(t.value);
                                            break;
                                        }
                                    }
                                if (e) {
                                    if (n.has(e.toString())) return null;
                                    n.add(e.toString()), t.push({ type: e, form: i });
                                }
                            }
                            t.sort((e, t) => ks(e.type, t.type));
                            const i = [];
                            for (const e of t) {
                                i.push(e.type);
                                const t = qs(e.form.fields);
                                for (const e of t) i.push(e);
                            }
                            return i;
                        })(t.extensions);
                    if (!a || !o || !c) return null;
                    for (const e of a) r(e);
                    for (const e of o) r(e);
                    for (const e of c) r(e);
                    return Hi(n).update(e.concat(i)).digest('base64');
                }
                class Fs {
                    constructor() {
                        (this.capsAlgorithms = ['sha-1']),
                            (this.features = new Map()),
                            (this.identities = new Map()),
                            (this.extensions = new Map()),
                            (this.items = new Map()),
                            (this.caps = new Map()),
                            this.features.set('', new Set()),
                            this.identities.set('', []),
                            this.extensions.set('', []);
                    }
                    getNodeInfo(e) {
                        return {
                            extensions: [...(this.extensions.get(e) || [])],
                            features: [...(this.features.get(e) || [])],
                            identities: [...(this.identities.get(e) || [])]
                        };
                    }
                    addFeature(e, t = '') {
                        this.features.has(t) || this.features.set(t, new Set()),
                            this.features.get(t).add(e);
                    }
                    addIdentity(e, t = '') {
                        this.identities.has(t) || this.identities.set(t, []),
                            this.identities.get(t).push(e);
                    }
                    addItem(e, t = '') {
                        this.items.has(t) || this.items.set(t, []), this.items.get(t).push(e);
                    }
                    addExtension(e, t = '') {
                        this.extensions.has(t) || this.extensions.set(t, []),
                            this.extensions.get(t).push(e);
                    }
                    updateCaps(e, t = this.capsAlgorithms) {
                        const n = {
                            extensions: [...this.extensions.get('')],
                            features: [...this.features.get('')],
                            identities: [...this.identities.get('')],
                            type: 'info'
                        };
                        for (const i of t) {
                            const t = As(n, i);
                            if (!t) {
                                this.caps.delete(i);
                                continue;
                            }
                            this.caps.set(i, { algorithm: i, node: e, value: t });
                            const s = `${e}#${t}`;
                            for (const e of n.features) this.addFeature(e, s);
                            for (const e of n.identities) this.addIdentity(e, s);
                            for (const e of n.extensions) this.addExtension(e, s);
                            this.identities.set(s, n.identities),
                                this.features.set(s, new Set(n.features)),
                                this.extensions.set(s, n.extensions);
                        }
                        return [...this.caps.values()];
                    }
                    getCaps() {
                        return [...this.caps.values()];
                    }
                }
                function Ps(e) {
                    (e.disco = new Fs()),
                        e.disco.addFeature(Kt),
                        e.disco.addFeature(Xt),
                        e.disco.addIdentity({ category: 'client', type: 'web' }),
                        e.registerFeature('caps', 100, (t, n) => {
                            const i = H(e.jid) || e.config.server;
                            e.emit('disco:caps', { caps: t.legacyCapabilities || [], jid: i }),
                                (e.features.negotiated.caps = !0),
                                n();
                        }),
                        (e.getDiscoInfo = (t, n) =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                const i = yield e.sendIQ({
                                    disco: { node: n, type: 'info' },
                                    to: t,
                                    type: 'get'
                                });
                                return Object.assign(
                                    { extensions: [], features: [], identities: [] },
                                    i.disco
                                );
                            })),
                        (e.getDiscoItems = (t, n) =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                const i = yield e.sendIQ({
                                    disco: { node: n, type: 'items' },
                                    to: t,
                                    type: 'get'
                                });
                                return Object.assign({ items: [] }, i.disco);
                            })),
                        (e.updateCaps = () => {
                            const t = e.config.capsNode || 'https://stanzajs.org';
                            return e.disco.updateCaps(t);
                        }),
                        (e.getCurrentCaps = () => {
                            const t = e.disco.getCaps();
                            if (!t) return;
                            const n = `${t[0].node}#${t[0].value}`;
                            return { info: e.disco.getNodeInfo(n), legacyCapabilities: t };
                        }),
                        e.on('presence', t => {
                            t.legacyCapabilities &&
                                e.emit('disco:caps', { caps: t.legacyCapabilities, jid: t.from });
                        }),
                        e.on('iq:get:disco', t => {
                            const { type: n, node: i } = t.disco;
                            'info' === n &&
                                e.sendIQResult(t, {
                                    disco: Object.assign(
                                        Object.assign({}, e.disco.getNodeInfo(i || '')),
                                        { node: i, type: 'info' }
                                    )
                                }),
                                'items' === n &&
                                    e.sendIQResult(t, {
                                        disco: {
                                            items: e.disco.items.get(i || '') || [],
                                            type: 'items'
                                        }
                                    });
                        });
                }
                const Ls = {
                        Bosh: Sn,
                        Client: Ut,
                        Component: 'jabber:component:accept',
                        Server: 'jabber:server'
                    },
                    Ms = {
                        AccountDisabled: 'account-disabled',
                        CredentialsExpired: 'credentials-expired',
                        EncryptionRequired: 'encryption-required',
                        IncorrectEncoding: 'incorrect-encoding',
                        InvalidAuthzid: 'invalid-authzid',
                        InvalidMechanism: 'invalid-mechanism',
                        MalformedRequest: 'malformed-request',
                        MechanismTooWeak: 'mechanism-too-weak',
                        NotAuthorized: 'not-authorized',
                        TemporaryAuthFailure: 'temporary-auth-failure'
                    },
                    Ds = {
                        BadFormat: 'bad-format',
                        BadNamespacePrefix: 'bad-namespace-prefix',
                        Conflict: 'conflict',
                        ConnectionTimeout: 'connection-timeout',
                        HostGone: 'host-gone',
                        HostUnknown: 'host-unknown',
                        ImproperAddressing: 'improper-addressing',
                        InternalServerError: 'internal-server-error',
                        InvalidFrom: 'invalid-from',
                        InvalidId: 'invalid-id',
                        InvalidNamespace: 'invalid-namespace',
                        InvalidXML: 'invalid-xml',
                        NotAuthorized: 'not-authorized',
                        NotWellFormed: 'not-well-formed',
                        PolicyViolation: 'policy-violation',
                        RemoteConnectionFailed: 'remote-connection-failed',
                        Reset: 'reset',
                        ResourceConstraint: 'resource-constraint',
                        RestrictedXML: 'restricted-xml',
                        SeeOtherHost: 'see-other-host',
                        SystemShutdown: 'system-shutdown',
                        UndefinedCondition: 'undefined-condition',
                        UnsupportedEncoding: 'unsupported-encoding',
                        UnsupportedStanzaType: 'unsupported-stanza-type',
                        UnsupportedVersion: 'unsupported-version'
                    },
                    Bs = {
                        BadRequest: 'bad-request',
                        Conflict: 'conflict',
                        FeatureNotImplemented: 'feature-not-implemented',
                        Forbidden: 'forbidden',
                        Gone: 'gone',
                        InternalServerError: 'internal-server-error',
                        ItemNotFound: 'item-not-found',
                        JIDMalformed: 'jid-malformed',
                        NotAcceptable: 'not-acceptable',
                        NotAllowed: 'not-allowed',
                        NotAuthorized: 'not-authorized',
                        PolicyViolation: 'policy-violation',
                        RecipientUnavailable: 'recipient-unavailable',
                        Redirect: 'redirect',
                        RegistrationRequired: 'registration-required',
                        RemoteServerNotFound: 'remote-server-not-found',
                        RemoteServerTimeout: 'remote-server-timeout',
                        ResourceConstraint: 'resource-constraint',
                        ServiceUnavailable: 'service-unavailable',
                        SubscriptionRequired: 'subscription-required',
                        UndefinedCondition: 'undefined-condition',
                        UnexpectedRequest: 'unexpected-request'
                    },
                    Us = {
                        Available: void 0,
                        Error: 'error',
                        Probe: 'probe',
                        Subscribe: 'subscribe',
                        Subscribed: 'subscribed',
                        Unavailable: 'unavailable',
                        Unsubscribe: 'unsubscribe',
                        Unsubscribed: 'unsubscribed'
                    },
                    zs = {
                        Boolean: 'boolean',
                        Fixed: 'fixed',
                        Hidden: 'hidden',
                        JID: 'jid-single',
                        JIDMultiple: 'jid-multi',
                        List: 'list-single',
                        ListMultiple: 'list-multi',
                        Password: 'text-private',
                        Text: 'text-single',
                        TextMultiple: 'text-multi',
                        TextPrivate: 'text-private'
                    },
                    Vs = {
                        AffiliationChanged: '101',
                        AffiliationLost: '321',
                        Banned: '301',
                        Error: '333',
                        Kicked: '307',
                        LoggingDisabled: '171',
                        LoggingEnabled: '170',
                        MembershipLost: '322',
                        NickChanged: '303',
                        NickChangedByService: '210',
                        NonAnonymous: '172',
                        NonAnonymousRoom: '100',
                        NonPrivacyConfigurationChange: '104',
                        RoomCreated: '201',
                        SelfPresence: '110',
                        SemiAnonymous: '173',
                        Shutdown: '332',
                        UnavailableMembersListed: '102',
                        UnavailableMembersNotListed: '103'
                    },
                    $s = {
                        ClosedNode: 'closed-node',
                        ConfigurationRequired: 'configuration-required',
                        InvalidJID: 'invalid-jid',
                        InvalidOptions: 'invalid-options',
                        InvalidPayload: 'invalid-payload',
                        InvalidSubscriptionId: 'invalid-subid',
                        ItemForbidden: 'item-forbidden',
                        ItemRequired: 'item-required',
                        JIDRequired: 'jid-required',
                        MaxItemsExceeded: 'max-items-exceeded',
                        MaxNodesExceeded: 'max-nodes-exceeded',
                        NodeIdRequired: 'nodeid-required',
                        NotInRosterGroup: 'not-in-roster-group',
                        NotSubscribed: 'not-subscribed',
                        PayloadRequired: 'payload-required',
                        PayloadTooBig: 'payload-too-big',
                        PendingSubscription: 'pending-subscription',
                        PresenceSubscriptionRequired: 'presence-subscription-required',
                        SubscriptionIdRequired: 'subid-required',
                        TooManySubscriptions: 'too-many-subscriptions',
                        Unsupported: 'unsupported',
                        UnsupportedAccessModel: 'unsupported-access-model'
                    },
                    Qs = {
                        Active: 'active',
                        Composing: 'composing',
                        Gone: 'gone',
                        Inactive: 'inactive',
                        Paused: 'paused'
                    },
                    Ws = { Initiator: 'initiator', Responder: 'responder' },
                    Gs = {
                        Inactive: 'inactive',
                        Receive: 'recvonly',
                        Send: 'sendonly',
                        SendReceive: 'sendrecv'
                    },
                    Hs = {
                        Both: 'both',
                        Initiator: 'initiator',
                        None: 'none',
                        Responder: 'responder'
                    },
                    Js = {
                        ContentAccept: 'content-accept',
                        ContentAdd: 'content-add',
                        ContentModify: 'content-modify',
                        ContentReject: 'content-reject',
                        ContentRemove: 'content-remove',
                        DescriptionInfo: 'description-info',
                        SecurityInfo: 'security-info',
                        SessionAccept: 'session-accept',
                        SessionInfo: 'session-info',
                        SessionInitiate: 'session-initiate',
                        SessionTerminate: 'session-terminate',
                        TransportAccept: 'transport-accept',
                        TransportInfo: 'transport-info',
                        TransportReject: 'transport-reject',
                        TransportReplace: 'transport-replace'
                    },
                    Ys = {
                        OutOfOrder: 'out-of-order',
                        TieBreak: 'tie-break',
                        UnknownContent: 'unknown-content',
                        UnknownSession: 'unknown-session',
                        UnsupportedInfo: 'unsupported-info'
                    },
                    Ks = {
                        AlternativeSession: 'alternative-session',
                        Busy: 'busy',
                        Cancel: 'cancel',
                        ConnectivityError: 'connectivity-error',
                        Decline: 'decline',
                        Expired: 'expired',
                        FailedApplication: 'failed-application',
                        FailedTransport: 'failed-transport',
                        GeneralError: 'general-error',
                        Gone: 'gone',
                        IncompatibleParameters: 'incompatible-parameters',
                        MediaError: 'media-error',
                        SecurityError: 'security-error',
                        Success: 'success',
                        Timeout: 'timeout',
                        UnsupportedApplications: 'unsupported-applications',
                        UnsupportedTransports: 'unsupported-transports'
                    },
                    Xs = [
                        'afraid',
                        'amazed',
                        'amorous',
                        'angry',
                        'annoyed',
                        'anxious',
                        'aroused',
                        'ashamed',
                        'bored',
                        'brave',
                        'calm',
                        'cautious',
                        'cold',
                        'confident',
                        'confused',
                        'contemplative',
                        'contented',
                        'cranky',
                        'crazy',
                        'creative',
                        'curious',
                        'dejected',
                        'depressed',
                        'disappointed',
                        'disgusted',
                        'dismayed',
                        'distracted',
                        'embarrassed',
                        'envious',
                        'excited',
                        'flirtatious',
                        'frustrated',
                        'grateful',
                        'grieving',
                        'grumpy',
                        'guilty',
                        'happy',
                        'hopeful',
                        'hot',
                        'humbled',
                        'humiliated',
                        'hungry',
                        'hurt',
                        'impressed',
                        'in_awe',
                        'in_love',
                        'indignant',
                        'interested',
                        'intoxicated',
                        'invincible',
                        'jealous',
                        'lonely',
                        'lost',
                        'lucky',
                        'mean',
                        'moody',
                        'nervous',
                        'neutral',
                        'offended',
                        'outraged',
                        'playful',
                        'proud',
                        'relaxed',
                        'relieved',
                        'remorseful',
                        'restless',
                        'sad',
                        'sarcastic',
                        'satisfied',
                        'serious',
                        'shocked',
                        'shy',
                        'sick',
                        'sleepy',
                        'spontaneous',
                        'stressed',
                        'strong',
                        'surprised',
                        'thankful',
                        'thirsty',
                        'tired',
                        'undefined',
                        'weak',
                        'worried'
                    ],
                    Zs = [
                        'doing_chores',
                        'drinking',
                        'eating',
                        'exercising',
                        'grooming',
                        'having_appointment',
                        'inactive',
                        'relaxing',
                        'talking',
                        'traveling',
                        'undefined',
                        'working'
                    ],
                    er = [
                        'at_the_spa',
                        'brushing_teeth',
                        'buying_groceries',
                        'cleaning',
                        'coding',
                        'commuting',
                        'cooking',
                        'cycling',
                        'cycling',
                        'dancing',
                        'day_off',
                        'doing_maintenance',
                        'doing_the_dishes',
                        'doing_the_laundry',
                        'driving',
                        'fishing',
                        'gaming',
                        'gardening',
                        'getting_a_haircut',
                        'going_out',
                        'hanging_out',
                        'having_a_beer',
                        'having_a_snack',
                        'having_breakfast',
                        'having_coffee',
                        'having_dinner',
                        'having_lunch',
                        'having_tea',
                        'hiding',
                        'hiking',
                        'in_a_car',
                        'in_a_meeting',
                        'in_real_life',
                        'jogging',
                        'on_a_bus',
                        'on_a_plane',
                        'on_a_train',
                        'on_a_trip',
                        'on_the_phone',
                        'on_vacation',
                        'on_video_phone',
                        'other',
                        'partying',
                        'playing_sports',
                        'praying',
                        'reading',
                        'rehearsing',
                        'running',
                        'running_an_errand',
                        'scheduled_holiday',
                        'shaving',
                        'shopping',
                        'skiing',
                        'sleeping',
                        'smoking',
                        'socializing',
                        'studying',
                        'sunbathing',
                        'swimming',
                        'taking_a_bath',
                        'taking_a_shower',
                        'thinking',
                        'walking',
                        'walking_the_dog',
                        'watching_a_movie',
                        'watching_tv',
                        'working_out',
                        'writing'
                    ],
                    tr = (e, t) => `{${e}}${t}`,
                    nr = tr(Nn, 'mute'),
                    ir = tr(Nn, 'unmute'),
                    sr = tr(Nn, 'hold'),
                    rr = tr(Nn, 'unhold'),
                    ar = tr(Nn, 'active'),
                    or = tr(Nn, 'ringing'),
                    cr = tr(Dn, 'checksum'),
                    lr = tr(Dn, 'received');
                function ur(e, t = Hs.Both) {
                    const n = e === Ws.Initiator;
                    switch (t) {
                        case Hs.Initiator:
                            return n ? Gs.Send : Gs.Receive;
                        case Hs.Responder:
                            return n ? Gs.Receive : Gs.Send;
                        case Hs.Both:
                            return Gs.SendReceive;
                    }
                    return Gs.Inactive;
                }
                function pr(e, t = Gs.SendReceive) {
                    const n = e === Ws.Initiator;
                    switch (t) {
                        case Gs.Send:
                            return n ? Hs.Initiator : Hs.Responder;
                        case Gs.Receive:
                            return n ? Hs.Responder : Hs.Initiator;
                        case Gs.SendReceive:
                            return Hs.Both;
                    }
                    return Hs.None;
                }
                var dr = Object.freeze({
                    __proto__: null,
                    VERSION: '12.13.0',
                    StreamType: Ls,
                    SASLFailureCondition: Ms,
                    StreamErrorCondition: Ds,
                    StanzaErrorCondition: Bs,
                    MessageType: {
                        Chat: 'chat',
                        Error: 'error',
                        GroupChat: 'groupchat',
                        Headline: 'headline',
                        Normal: 'normal'
                    },
                    PresenceType: Us,
                    IQType: { Error: 'error', Get: 'get', Result: 'result', Set: 'set' },
                    PresenceShow: {
                        Away: 'away',
                        Chat: 'chat',
                        DoNotDisturb: 'dnd',
                        ExtendedAway: 'xa'
                    },
                    RosterSubscription: {
                        Both: 'both',
                        From: 'from',
                        None: 'none',
                        ReceivePresenceOnly: 'to',
                        Remove: 'remove',
                        SendAndReceivePresence: 'both',
                        SendPresenceOnly: 'from',
                        To: 'to'
                    },
                    DataFormType: {
                        Cancel: 'cancel',
                        Form: 'form',
                        Result: 'result',
                        Submit: 'submit'
                    },
                    DataFormFieldType: zs,
                    MUCAffiliation: {
                        Admin: 'admin',
                        Banned: 'outcast',
                        Member: 'member',
                        None: 'none',
                        Outcast: 'outcast',
                        Owner: 'owner'
                    },
                    MUCRole: {
                        Moderator: 'moderator',
                        None: 'none',
                        Participant: 'participant',
                        Visitor: 'visitor'
                    },
                    MUCStatusCode: Vs,
                    PubsubErrorCondition: $s,
                    ChatState: Qs,
                    JingleSessionRole: Ws,
                    JingleApplicationDirection: Gs,
                    JingleContentSenders: Hs,
                    JingleAction: Js,
                    JingleErrorCondition: Ys,
                    JingleReasonCondition: Ks,
                    USER_MOODS: Xs,
                    USER_ACTIVITY_GENERAL: Zs,
                    USER_ACTIVITY_SPECIFIC: er,
                    JINGLE_INFO: tr,
                    JINGLE_INFO_MUTE: nr,
                    JINGLE_INFO_UNMUTE: ir,
                    JINGLE_INFO_HOLD: sr,
                    JINGLE_INFO_UNHOLD: rr,
                    JINGLE_INFO_ACTIVE: ar,
                    JINGLE_INFO_RINGING: or,
                    JINGLE_INFO_CHECKSUM_5: cr,
                    JINGLE_INFO_RECEIVED_5: lr,
                    sendersToDirection: ur,
                    directionToSenders: pr
                });
                function hr(e) {
                    e.disco.addFeature('jid\\20escaping'),
                        e.disco.addFeature(Ln),
                        e.disco.addFeature('urn:xmpp:eme:0'),
                        e.disco.addFeature(Wn),
                        e.disco.addFeature(Gn),
                        e.disco.addFeature('urn:xmpp:hashes:1'),
                        e.disco.addFeature('urn:xmpp:idle:1'),
                        e.disco.addFeature(Zn),
                        e.disco.addFeature(hn),
                        e.disco.addFeature('urn:xmpp:psa'),
                        e.disco.addFeature('urn:xmpp:reference:0'),
                        e.disco.addFeature(kn),
                        e.disco.addFeature(Jt),
                        e.disco.addFeature('urn:xmpp:media-element'),
                        e.disco.addFeature(jn),
                        e.disco.addFeature(On);
                    const t = ['sha-1', 'sha-256', 'sha-512', 'md5'];
                    for (const n of t) e.disco.addFeature(Hn(n));
                    e.disco.addFeature('urn:xmpp:time'),
                        e.disco.addFeature('jabber:iq:version'),
                        e.on('iq:get:softwareVersion', t =>
                            e.sendIQResult(t, {
                                softwareVersion: e.config.softwareVersion || {
                                    name: 'stanzajs.org',
                                    version: '12.13.0'
                                }
                            })
                        ),
                        e.on('iq:get:time', t => {
                            const n = new Date();
                            e.sendIQResult(t, { time: { tzo: n.getTimezoneOffset(), utc: n } });
                        }),
                        (e.getSoftwareVersion = t =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                return (yield e.sendIQ({
                                    softwareVersion: {},
                                    to: t,
                                    type: 'get'
                                })).softwareVersion;
                            })),
                        (e.getTime = t =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                return (yield e.sendIQ({ time: {}, to: t, type: 'get' })).time;
                            })),
                        (e.getLastActivity = t =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                return (yield e.sendIQ({
                                    lastActivity: {},
                                    to: t,
                                    type: 'get'
                                })).lastActivity;
                            }));
                }
                function fr(e) {
                    (e.features = {
                        handlers: Object.create(null),
                        negotiated: Object.create(null),
                        order: []
                    }),
                        (e.registerFeature = function (t, n, i) {
                            this.features.order.push({ name: t, priority: n }),
                                this.features.order.sort((e, t) => e.priority - t.priority),
                                (this.features.handlers[t] = i.bind(e));
                        }),
                        e.on('features', t =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                const n = e.features.negotiated,
                                    i = e.features.handlers,
                                    s = [];
                                for (const { name: r } of e.features.order)
                                    t[r] && i[r] && !n[r] && s.push(r);
                                function r(e) {
                                    return new Promise(n => {
                                        i[e](t, (e, t) => {
                                            e ? n({ command: e, message: t }) : n();
                                        });
                                    });
                                }
                                for (const t of s) {
                                    if (n[t]) continue;
                                    let i = '',
                                        s = '';
                                    try {
                                        const e = yield r(t);
                                        e && ((i = e.command), (s = e.message || ''));
                                    } catch (e) {
                                        (i = 'disconnect'), (s = e.message), console.error(e);
                                    }
                                    if (i)
                                        return (
                                            'restart' === i && e.transport && e.transport.restart(),
                                            void (
                                                'disconnect' === i &&
                                                (e.emit('stream:error', {
                                                    condition: 'policy-violation',
                                                    text:
                                                        'Failed to negotiate stream features: ' + s
                                                }),
                                                e.disconnect())
                                            )
                                        );
                                }
                            })
                        );
                }
                function mr(e, t) {
                    return Object(s.a)(this, void 0, void 0, function* () {
                        'string' == typeof t && (t = { host: t });
                        const n = Object.assign({ json: !0, ssl: !0, xrd: !0 }, t),
                            i = n.ssl ? 'https://' : 'http://';
                        return (function (e) {
                            return Object(s.a)(this, void 0, void 0, function* () {
                                try {
                                    const t = yield Promise.all(
                                        e.map(e =>
                                            e.then(
                                                e => Promise.reject(e),
                                                e => Promise.resolve(e)
                                            )
                                        )
                                    );
                                    return Promise.reject(t);
                                } catch (e) {
                                    return Promise.resolve(e);
                                }
                            });
                        })([
                            Zi(`${i}${n.host}/.well-known/host-meta.json`).then(e =>
                                Object(s.a)(this, void 0, void 0, function* () {
                                    if (!e.ok) throw new Error('could-not-fetch-json');
                                    return e.json();
                                })
                            ),
                            Zi(`${i}${n.host}/.well-known/host-meta`).then(t =>
                                Object(s.a)(this, void 0, void 0, function* () {
                                    if (!t.ok) throw new Error('could-not-fetch-xml');
                                    const n = Te(yield t.text());
                                    if (n) return e.import(n);
                                })
                            )
                        ]);
                    });
                }
                function gr(e, t) {
                    e.discoverBindings = e =>
                        Object(s.a)(this, void 0, void 0, function* () {
                            try {
                                const n = yield mr(t, e),
                                    i = { bosh: [], websocket: [] },
                                    s = n.links || [];
                                for (const e of s)
                                    e.href &&
                                        'urn:xmpp:alt-connections:websocket' === e.rel &&
                                        i.websocket.push(e.href),
                                        e.href &&
                                            'urn:xmpp:alt-connections:xbosh' === e.rel &&
                                            i.bosh.push(e.href);
                                return i;
                            } catch (e) {
                                return {};
                            }
                        });
                }
                function br(e) {
                    const t = Object(u.getMediaSections)(e),
                        n = Object(u.getDescription)(e),
                        i = { groups: [], media: [] };
                    Object(u.matchPrefix)(n, 'a=ice-lite').length > 0 && (i.iceLite = !0);
                    for (const e of Object(u.matchPrefix)(n, 'a=group:')) {
                        const t = e.split(' '),
                            n = t.shift().substr(8);
                        i.groups.push({ mids: t, semantics: n });
                    }
                    for (const e of t) {
                        const t = Object(u.getKind)(e),
                            s = Object(u.isRejected)(e),
                            r = Object(u.parseMLine)(e),
                            a = {
                                direction: Object(u.getDirection)(e, n),
                                kind: t,
                                mid: Object(u.getMid)(e),
                                protocol: r.protocol
                            };
                        if (
                            (s ||
                                (i.iceLite && (a.iceLite = !0),
                                (a.iceParameters = Object(u.getIceParameters)(e, n)),
                                (a.dtlsParameters = Object(u.getDtlsParameters)(e, n)),
                                (a.setup = Object(u.matchPrefix)(e, 'a=setup:')[0].substr(8))),
                            'audio' === t || 'video' === t)
                        ) {
                            (a.rtpParameters = Object(u.parseRtpParameters)(e)),
                                (a.rtpEncodingParameters = Object(u.parseRtpEncodingParameters)(e)),
                                (a.rtcpParameters = Object(u.parseRtcpParameters)(e));
                            const t = Object(u.parseMsid)(e);
                            a.streams = t ? [t] : [];
                        } else 'application' === t && (a.sctp = Object(u.parseSctpDescription)(e));
                        (a.candidates = Object(u.matchPrefix)(e, 'a=candidate:').map(
                            u.parseCandidate
                        )),
                            i.media.push(a);
                    }
                    return i;
                }
                function yr(e) {
                    const t = [];
                    t.push(
                        Object(u.writeSessionBoilerplate)(e.sessionId, e.sessionVersion),
                        'a=msid-semantic:WMS *\r\n'
                    ),
                        (e.iceLite || e.media.filter(e => e.iceLite).length > 0) &&
                            t.push('a=ice-lite\r\n');
                    for (const n of e.groups || [])
                        t.push(`a=group:${n.semantics} ${n.mids.join(' ')}\r\n`);
                    for (const n of e.media || []) {
                        const e = !(n.iceParameters && n.dtlsParameters);
                        if ('application' === n.kind && n.sctp)
                            t.push(Object(u.writeSctpDescription)(n, n.sctp));
                        else if (n.rtpParameters) {
                            let i = Object(u.writeRtpDescription)(n.kind, n.rtpParameters);
                            e && (i = i.replace(`m=${n.kind} 9 `, `m=${n.kind} 0 `)),
                                t.push(i),
                                t.push(`a=${n.direction || 'sendrecv'}\r\n`);
                            for (const e of n.streams || [])
                                t.push(`a=msid:${e.stream} ${e.track}\r\n`);
                            if (
                                n.rtcpParameters &&
                                (n.rtcpParameters.reducedSize &&
                                    -1 === i.indexOf('a=rtcp-rsize') &&
                                    t.push('a=rtcp-rsize\r\n'),
                                n.rtcpParameters.cname &&
                                    (t.push(
                                        `a=ssrc:${n.rtcpParameters.ssrc} cname:${n.rtcpParameters.cname}\r\n`
                                    ),
                                    n.rtpEncodingParameters && n.rtpEncodingParameters[0].rtx))
                            ) {
                                const e = n.rtpEncodingParameters[0];
                                t.push(`a=ssrc-group:FID ${e.ssrc} ${e.rtx.ssrc}\r\n`),
                                    t.push(
                                        `a=ssrc:${e.rtx.ssrc} cname:${n.rtcpParameters.cname}\r\n`
                                    );
                            }
                        }
                        if (
                            (void 0 !== n.mid && t.push(`a=mid:${n.mid}\r\n`),
                            n.iceParameters &&
                                t.push(Object(u.writeIceParameters)(n.iceParameters)),
                            n.dtlsParameters &&
                                n.setup &&
                                t.push(Object(u.writeDtlsParameters)(n.dtlsParameters, n.setup)),
                            n.candidates && n.candidates.length)
                        )
                            for (const e of n.candidates)
                                t.push(`a=${Object(u.writeCandidate)(e)}\r\n`);
                    }
                    return t.join('');
                }
                function vr(e, t) {
                    const n = e.rtpParameters,
                        i = e.rtcpParameters || {},
                        s = e.rtpEncodingParameters || [];
                    let r = !1;
                    s && s.length && (r = !!s[0].ssrc);
                    const a = {
                        applicationType: Rn,
                        codecs: [],
                        headerExtensions: [],
                        media: e.kind,
                        rtcpMux: i.mux,
                        rtcpReducedSize: i.reducedSize,
                        sourceGroups: [],
                        sources: [],
                        ssrc: r ? s[0].ssrc.toString() : void 0,
                        streams: []
                    };
                    for (const e of n.headerExtensions || []) {
                        const n = { id: e.id, uri: e.uri };
                        e.direction &&
                            'sendrecv' !== e.direction &&
                            (n.senders = pr(t, e.direction)),
                            a.headerExtensions.push(n);
                    }
                    i.ssrc &&
                        i.cname &&
                        (a.sources = [{ parameters: { cname: i.cname }, ssrc: i.ssrc.toString() }]),
                        r &&
                            s[0] &&
                            s[0].rtx &&
                            (a.sourceGroups = [
                                {
                                    semantics: 'FID',
                                    sources: [s[0].ssrc.toString(), s[0].rtx.ssrc.toString()]
                                }
                            ]);
                    for (const t of e.streams || [])
                        a.streams.push({ id: t.stream, track: t.track });
                    for (const e of n.codecs || []) {
                        const t = {
                            channels: e.channels,
                            clockRate: e.clockRate,
                            id: e.payloadType.toString(),
                            name: e.name,
                            parameters: e.parameters,
                            rtcpFeedback: e.rtcpFeedback
                        };
                        e.maxptime && (t.maxptime = e.maxptime),
                            e.parameters &&
                                e.parameters.ptime &&
                                (t.ptime = parseInt(e.parameters.ptime, 10)),
                            a.codecs.push(t);
                    }
                    return a;
                }
                function wr(e) {
                    return {
                        component: e.component,
                        foundation: e.foundation,
                        generation: void 0,
                        id: void 0,
                        ip: e.ip,
                        network: void 0,
                        port: e.port,
                        priority: e.priority,
                        protocol: e.protocol,
                        relatedAddress: e.relatedAddress,
                        relatedPort: e.relatedPort,
                        tcpType: e.tcpType,
                        type: e.type
                    };
                }
                function _r(e) {
                    return {
                        address: e.ip,
                        component: e.component,
                        foundation: e.foundation,
                        ip: e.ip,
                        port: e.port,
                        priority: e.priority,
                        protocol: e.protocol,
                        relatedAddress: e.relatedAddress,
                        relatedPort: e.relatedPort,
                        tcpType: e.tcpType,
                        type: e.type
                    };
                }
                function xr(e, t) {
                    const n = e.iceParameters,
                        i = e.dtlsParameters,
                        s = { candidates: [], transportType: t };
                    n &&
                        ((s.usernameFragment = n.usernameFragment),
                        (s.password = n.password),
                        e.iceLite && (s.iceLite = !0)),
                        i &&
                            (s.fingerprints = i.fingerprints.map(t => ({
                                algorithm: t.algorithm,
                                setup: e.setup,
                                value: t.value
                            }))),
                        e.sctp && (s.sctp = e.sctp);
                    for (const t of e.candidates || []) s.candidates.push(wr(t));
                    return s;
                }
                function jr(e, t, n) {
                    return {
                        contents: e.media.map(e => ({
                            application:
                                'audio' === e.kind || 'video' === e.kind
                                    ? vr(e, t)
                                    : { applicationType: 'datachannel', protocol: e.protocol },
                            creator: Ws.Initiator,
                            name: e.mid,
                            senders: pr(t, e.direction),
                            transport: xr(e, n)
                        })),
                        groups: e.groups
                            ? e.groups.map(e => ({ contents: e.mids, semantics: e.semantics }))
                            : []
                    };
                }
                function Sr(e, t) {
                    const n = e.application || {},
                        i = e.transport,
                        s = n && n.applicationType === Rn,
                        r = {
                            direction: ur(t, e.senders),
                            kind: n.media || 'application',
                            mid: e.name,
                            protocol: s ? 'UDP/TLS/RTP/SAVPF' : 'UDP/DTLS/SCTP'
                        };
                    if (s) {
                        if (
                            ((r.rtcpParameters = {
                                compound: !n.rtcpReducedSize,
                                mux: n.rtcpMux,
                                reducedSize: n.rtcpReducedSize
                            }),
                            n.sources && n.sources.length)
                        ) {
                            const e = n.sources[0];
                            (r.rtcpParameters.ssrc = parseInt(e.ssrc, 10)),
                                e.parameters && (r.rtcpParameters.cname = e.parameters.cname);
                        }
                        if (
                            ((r.rtpParameters = {
                                codecs: [],
                                fecMechanisms: [],
                                headerExtensions: [],
                                rtcp: []
                            }),
                            n.streams)
                        ) {
                            r.streams = [];
                            for (const e of n.streams)
                                r.streams.push({ stream: e.id, track: e.track });
                        }
                        if (
                            n.ssrc &&
                            ((r.rtpEncodingParameters = [{ ssrc: parseInt(n.ssrc, 10) }]),
                            n.sourceGroups && n.sourceGroups.length)
                        ) {
                            const e = n.sourceGroups[0];
                            r.rtpEncodingParameters[0].rtx = { ssrc: parseInt(e.sources[1], 10) };
                        }
                        let e = !1,
                            i = !1;
                        for (const t of n.codecs || []) {
                            const n = t.parameters || {},
                                s = [];
                            for (const e of t.rtcpFeedback || [])
                                s.push({ parameter: e.parameter, type: e.type });
                            if ('red' === t.name || 'ulpfec' === t.name) {
                                (e = e || 'red' === t.name), (i = i || 'ulpfec' === t.name);
                                const n = t.name.toUpperCase();
                                r.rtpParameters.fecMechanisms.includes(n) ||
                                    r.rtpParameters.fecMechanisms.push(n);
                            }
                            r.rtpParameters.codecs.push({
                                channels: t.channels,
                                clockRate: t.clockRate,
                                name: t.name,
                                numChannels: t.channels,
                                parameters: n,
                                payloadType: parseInt(t.id, 10),
                                rtcpFeedback: s
                            });
                        }
                        for (const e of n.headerExtensions || [])
                            r.rtpParameters.headerExtensions.push({
                                direction: ur(t, e.senders || 'both'),
                                id: e.id,
                                uri: e.uri
                            });
                    }
                    if (i) {
                        if (
                            (i.usernameFragment &&
                                i.password &&
                                ((r.iceParameters = {
                                    password: i.password,
                                    usernameFragment: i.usernameFragment
                                }),
                                i.iceLite && (r.iceLite = !0)),
                            i.fingerprints && i.fingerprints.length)
                        ) {
                            r.dtlsParameters = { fingerprints: [], role: 'auto' };
                            for (const e of i.fingerprints)
                                r.dtlsParameters.fingerprints.push({
                                    algorithm: e.algorithm,
                                    value: e.value
                                });
                            i.sctp && (r.sctp = i.sctp), (r.setup = i.fingerprints[0].setup);
                        }
                        r.candidates = (i.candidates || []).map(_r);
                    }
                    return r;
                }
                function kr(e, t) {
                    const n = { groups: [], media: [] };
                    for (const t of e.groups || [])
                        n.groups.push({ mids: t.contents, semantics: t.semantics });
                    for (const i of e.contents || []) n.media.push(Sr(i, t));
                    return n;
                }
                const Tr = { condition: Bs.BadRequest },
                    Or = {
                        condition: Bs.FeatureNotImplemented,
                        jingleError: Ys.UnsupportedInfo,
                        type: 'modify'
                    };
                class Ir {
                    constructor(e) {
                        (this.parent = e.parent),
                            (this.sid = e.sid || Ts()),
                            (this.peerID = e.peerID),
                            (this.role = e.initiator ? Ws.Initiator : Ws.Responder),
                            (this._sessionState = 'starting'),
                            (this._connectionState = 'starting'),
                            (this.pendingApplicationTypes = e.applicationTypes || []),
                            (this.pendingAction = void 0),
                            (this.processingQueue = Object(r.a)(
                                (e, t) =>
                                    Object(s.a)(this, void 0, void 0, function* () {
                                        if ('ended' === this.state)
                                            return (
                                                'local' === e.type &&
                                                    e.reject &&
                                                    e.reject(new Error('Session ended')),
                                                void (t && t())
                                            );
                                        if ('local' === e.type) {
                                            this._log('debug', 'Processing local action:', e.name);
                                            try {
                                                const t = yield e.handler();
                                                e.resolve(t);
                                            } catch (t) {
                                                e.reject(t);
                                            }
                                            return void (t && t());
                                        }
                                        const { action: n, changes: i, cb: s } = e;
                                        return (
                                            this._log('debug', 'Processing remote action:', n),
                                            new Promise(e => {
                                                const r = (n, i) => {
                                                    s(n, i), t && t(), e();
                                                };
                                                switch (n) {
                                                    case Js.ContentAccept:
                                                        return this.onContentAccept(i, r);
                                                    case Js.ContentAdd:
                                                        return this.onContentAdd(i, r);
                                                    case Js.ContentModify:
                                                        return this.onContentModify(i, r);
                                                    case Js.ContentReject:
                                                        return this.onContentReject(i, r);
                                                    case Js.ContentRemove:
                                                        return this.onContentRemove(i, r);
                                                    case Js.DescriptionInfo:
                                                        return this.onDescriptionInfo(i, r);
                                                    case Js.SecurityInfo:
                                                        return this.onSecurityInfo(i, r);
                                                    case Js.SessionAccept:
                                                        return this.onSessionAccept(i, r);
                                                    case Js.SessionInfo:
                                                        return this.onSessionInfo(i, r);
                                                    case Js.SessionInitiate:
                                                        return this.onSessionInitiate(i, r);
                                                    case Js.SessionTerminate:
                                                        return this.onSessionTerminate(i, r);
                                                    case Js.TransportAccept:
                                                        return this.onTransportAccept(i, r);
                                                    case Js.TransportInfo:
                                                        return this.onTransportInfo(i, r);
                                                    case Js.TransportReject:
                                                        return this.onTransportReject(i, r);
                                                    case Js.TransportReplace:
                                                        return this.onTransportReplace(i, r);
                                                    default:
                                                        this._log(
                                                            'error',
                                                            'Invalid or unsupported action: ' + n
                                                        ),
                                                            r({ condition: Bs.BadRequest });
                                                }
                                            })
                                        );
                                    }),
                                1
                            ));
                    }
                    get isInitiator() {
                        return this.role === Ws.Initiator;
                    }
                    get peerRole() {
                        return this.isInitiator ? Ws.Responder : Ws.Initiator;
                    }
                    get state() {
                        return this._sessionState;
                    }
                    set state(e) {
                        e !== this._sessionState &&
                            (this._log('info', 'Changing session state to: ' + e),
                            (this._sessionState = e),
                            this.parent && this.parent.emit('sessionState', this, e));
                    }
                    get connectionState() {
                        return this._connectionState;
                    }
                    set connectionState(e) {
                        e !== this._connectionState &&
                            (this._log('info', 'Changing connection state to: ' + e),
                            (this._connectionState = e),
                            this.parent && this.parent.emit('connectionState', this, e));
                    }
                    send(e, t) {
                        ((t = t || {}).sid = this.sid),
                            (t.action = e),
                            new Set([
                                Js.ContentAccept,
                                Js.ContentAdd,
                                Js.ContentModify,
                                Js.ContentReject,
                                Js.ContentRemove,
                                Js.SessionAccept,
                                Js.SessionInitiate,
                                Js.TransportAccept,
                                Js.TransportReject,
                                Js.TransportReplace
                            ]).has(e)
                                ? (this.pendingAction = e)
                                : (this.pendingAction = void 0),
                            this.parent.signal(this, {
                                id: Ts(),
                                jingle: t,
                                to: this.peerID,
                                type: 'set'
                            });
                    }
                    processLocal(e, t) {
                        return new Promise((n, i) => {
                            this.processingQueue.push(
                                { handler: t, name: e, reject: i, resolve: n, type: 'local' },
                                1
                            );
                        });
                    }
                    process(e, t, n) {
                        this.processingQueue.push(
                            { action: e, cb: n, changes: t, type: 'remote' },
                            2
                        );
                    }
                    start(e, t) {
                        this._log('error', 'Can not start base sessions'),
                            this.end('unsupported-applications', !0);
                    }
                    accept(e, t) {
                        this._log('error', 'Can not accept base sessions'),
                            this.end('unsupported-applications');
                    }
                    cancel() {
                        this.end('cancel');
                    }
                    decline() {
                        this.end('decline');
                    }
                    end(e = 'success', t = !1) {
                        (this.state = 'ended'),
                            this.processingQueue.kill(),
                            'string' == typeof e && (e = { condition: e }),
                            t || this.send('session-terminate', { reason: e }),
                            this.parent.emit('terminated', this, e),
                            this.parent.forgetSession(this);
                    }
                    _log(e, t, ...n) {
                        this.parent &&
                            ((t = this.sid + ': ' + t),
                            this.parent.emit('log', e, t, ...n),
                            this.parent.emit('log:' + e, t, ...n));
                    }
                    onSessionInitiate(e, t) {
                        t();
                    }
                    onSessionAccept(e, t) {
                        t();
                    }
                    onSessionTerminate(e, t) {
                        this.end(e.reason, !0), t();
                    }
                    onSessionInfo(e, t) {
                        e.info ? t(Or) : t();
                    }
                    onSecurityInfo(e, t) {
                        t(Or);
                    }
                    onDescriptionInfo(e, t) {
                        t(Or);
                    }
                    onTransportInfo(e, t) {
                        t(Or);
                    }
                    onContentAdd(e, t) {
                        t(),
                            this.send(Js.ContentReject, {
                                reason: {
                                    condition: Ks.FailedApplication,
                                    text: 'content-add is not supported'
                                }
                            });
                    }
                    onContentAccept(e, t) {
                        t(Tr);
                    }
                    onContentReject(e, t) {
                        t(Tr);
                    }
                    onContentModify(e, t) {
                        t(Tr);
                    }
                    onContentRemove(e, t) {
                        t(Tr);
                    }
                    onTransportReplace(e, t) {
                        t(),
                            this.send(Js.TransportReject, {
                                reason: {
                                    condition: Ks.FailedTransport,
                                    text: 'transport-replace is not supported'
                                }
                            });
                    }
                    onTransportAccept(e, t) {
                        t(Tr);
                    }
                    onTransportReject(e, t) {
                        t(Tr);
                    }
                }
                class Er extends Ir {
                    constructor(e) {
                        super(e),
                            (this.bitrateLimit = 0),
                            (this.candidateBuffer = []),
                            (this.transportType = An),
                            (this.restartingIce = !1),
                            (this.usingRelay = !1),
                            (this.maxRelayBandwidth = e.maxRelayBandwidth),
                            (this.pc = this.parent.createPeerConnection(
                                this,
                                Object.assign(Object.assign({}, e.config), {
                                    iceServers: e.iceServers
                                })
                            )),
                            (this.pc.oniceconnectionstatechange = () => {
                                this.onIceStateChange();
                            }),
                            (this.pc.onicecandidate = e => {
                                e.candidate ? this.onIceCandidate(e) : this.onIceEndOfCandidates();
                            }),
                            this.restrictRelayBandwidth();
                    }
                    end(e = 'success', t = !1) {
                        this.pc.close(), super.end(e, t);
                    }
                    restartIce() {
                        return Object(s.a)(this, void 0, void 0, function* () {
                            if (this.isInitiator) {
                                void 0 !== this._maybeRestartingIce &&
                                    clearTimeout(this._maybeRestartingIce),
                                    (this.restartingIce = !0);
                                try {
                                    yield this.processLocal('restart-ice', () =>
                                        Object(s.a)(this, void 0, void 0, function* () {
                                            const e = yield this.pc.createOffer({ iceRestart: !0 }),
                                                t = br(e.sdp);
                                            this.send(Js.TransportInfo, {
                                                contents: t.media.map(e => ({
                                                    creator: Ws.Initiator,
                                                    name: e.mid,
                                                    transport: xr(e, this.transportType)
                                                })),
                                                sid: this.sid
                                            }),
                                                yield this.pc.setLocalDescription(e);
                                        })
                                    );
                                } catch (e) {
                                    this._log('error', 'Could not create WebRTC offer', e),
                                        this.end(Ks.FailedTransport, !0);
                                }
                            }
                        });
                    }
                    setMaximumBitrate(e) {
                        return Object(s.a)(this, void 0, void 0, function* () {
                            this.maximumBitrate && (e = Math.min(e, this.maximumBitrate)),
                                (this.currentBitrate = e);
                            const t = this.pc
                                .getSenders()
                                .find(e => !!e.track && 'video' === e.track.kind);
                            if (t && t.getParameters)
                                try {
                                    yield this.processLocal('set-bitrate', () =>
                                        Object(s.a)(this, void 0, void 0, function* () {
                                            const n = t.getParameters();
                                            (n.encodings && n.encodings.length) ||
                                                (n.encodings = [{}]),
                                                0 === e
                                                    ? delete n.encodings[0].maxBitrate
                                                    : (n.encodings[0].maxBitrate = e),
                                                yield t.setParameters(n);
                                        })
                                    );
                                } catch (e) {
                                    this._log('error', 'Set maximumBitrate failed', e);
                                }
                        });
                    }
                    onTransportInfo(e, t) {
                        return Object(s.a)(this, void 0, void 0, function* () {
                            if (
                                e.contents &&
                                e.contents[0] &&
                                e.contents[0].transport.gatheringComplete
                            ) {
                                try {
                                    'stable' === this.pc.signalingState
                                        ? yield this.pc.addIceCandidate(null)
                                        : this.candidateBuffer.push(null);
                                } catch (e) {
                                    this._log('debug', 'Could not add null ICE candidate');
                                } finally {
                                    t();
                                }
                                return;
                            }
                            if (this.pc.remoteDescription) {
                                const n = this.pc.remoteDescription,
                                    i = br(n.sdp),
                                    s = i.media.find(t => t.mid === e.contents[0].name)
                                        .iceParameters.usernameFragment,
                                    r = e.contents[0].transport.usernameFragment;
                                if (r && s !== r) {
                                    for (const [t, n] of e.contents.entries()) {
                                        const e = n.transport;
                                        (i.media[t].iceParameters = {
                                            password: e.password,
                                            usernameFragment: e.usernameFragment
                                        }),
                                            (i.media[t].candidates = []);
                                    }
                                    if ('offer' === n.type) {
                                        try {
                                            yield this.pc.setRemoteDescription(n),
                                                yield this.processBufferedCandidates();
                                            const e = yield this.pc.createAnswer(),
                                                i = br(e.sdp);
                                            this.send(Js.TransportInfo, {
                                                contents: i.media.map(e => ({
                                                    creator: Ws.Initiator,
                                                    name: e.mid,
                                                    transport: xr(e, this.transportType)
                                                })),
                                                sid: this.sid
                                            }),
                                                yield this.pc.setLocalDescription(e),
                                                t();
                                        } catch (e) {
                                            this._log(
                                                'error',
                                                'Could not do remote ICE restart',
                                                e
                                            ),
                                                t(e),
                                                this.end(Ks.FailedTransport);
                                        }
                                        return;
                                    }
                                    try {
                                        yield this.pc.setRemoteDescription(n),
                                            yield this.processBufferedCandidates(),
                                            t();
                                    } catch (e) {
                                        this._log('error', 'Could not do local ICE restart', e),
                                            t(e),
                                            this.end(Ks.FailedTransport);
                                    }
                                    return;
                                }
                            }
                            const n = (e.contents || []).map(e => {
                                const t = e.name,
                                    n = (e.transport.candidates || []).map(e =>
                                        Object(s.a)(this, void 0, void 0, function* () {
                                            const n = Object(u.writeCandidate)(_r(e));
                                            if (
                                                this.pc.remoteDescription &&
                                                'stable' === this.pc.signalingState
                                            )
                                                try {
                                                    yield this.pc.addIceCandidate({
                                                        sdpMid: t,
                                                        candidate: n
                                                    });
                                                } catch (e) {
                                                    this._log(
                                                        'error',
                                                        'Could not add ICE candidate',
                                                        e
                                                    );
                                                }
                                            else
                                                this.candidateBuffer.push({
                                                    sdpMid: t,
                                                    candidate: n
                                                });
                                        })
                                    );
                                return Promise.all(n);
                            });
                            try {
                                yield Promise.all(n), t();
                            } catch (e) {
                                this._log('error', 'Could not process transport-info: ' + e), t(e);
                            }
                        });
                    }
                    onSessionAccept(e, t) {
                        return Object(s.a)(this, void 0, void 0, function* () {
                            this.state = 'active';
                            const n = yr(kr(e, this.peerRole));
                            try {
                                yield this.pc.setRemoteDescription({ type: 'answer', sdp: n }),
                                    yield this.processBufferedCandidates(),
                                    this.parent.emit('accepted', this, void 0),
                                    t();
                            } catch (e) {
                                this._log('error', 'Could not process WebRTC answer: ' + e),
                                    t({ condition: 'general-error' });
                            }
                        });
                    }
                    onSessionTerminate(e, t) {
                        this._log('info', 'Terminating session'),
                            this.pc.close(),
                            super.end(e.reason, !0),
                            t();
                    }
                    onIceCandidate(e) {
                        if (!e.candidate || !e.candidate.candidate) return;
                        const t = Object(u.parseCandidate)(e.candidate.candidate),
                            n = {
                                contents: [
                                    {
                                        creator: Ws.Initiator,
                                        name: e.candidate.sdpMid,
                                        transport: {
                                            candidates: [wr(t)],
                                            transportType: this.transportType,
                                            usernameFragment: t.usernameFragment
                                        }
                                    }
                                ]
                            };
                        this._log('info', 'Discovered new ICE candidate', n),
                            this.send(Js.TransportInfo, n);
                    }
                    onIceEndOfCandidates() {
                        this._log('info', 'ICE end of candidates');
                        const e = br(this.pc.localDescription.sdp).media[0];
                        this.send(Js.TransportInfo, {
                            contents: [
                                {
                                    creator: Ws.Initiator,
                                    name: e.mid,
                                    transport: {
                                        gatheringComplete: !0,
                                        transportType: this.transportType,
                                        usernameFragment: e.iceParameters.usernameFragment
                                    }
                                }
                            ]
                        });
                    }
                    onIceStateChange() {
                        switch (this.pc.iceConnectionState) {
                            case 'checking':
                                this.connectionState = 'connecting';
                                break;
                            case 'completed':
                            case 'connected':
                                (this.connectionState = 'connected'), (this.restartingIce = !1);
                                break;
                            case 'disconnected':
                                if (
                                    ('stable' === this.pc.signalingState
                                        ? (this.connectionState = 'interrupted')
                                        : (this.connectionState = 'disconnected'),
                                    this.restartingIce)
                                )
                                    return void this.end(Ks.FailedTransport);
                                this.maybeRestartIce();
                                break;
                            case 'failed':
                                if ('failed' === this.connectionState || this.restartingIce)
                                    return void this.end(Ks.FailedTransport);
                                (this.connectionState = 'failed'), this.restartIce();
                                break;
                            case 'closed':
                                (this.connectionState = 'disconnected'),
                                    this.restartingIce ? this.end(Ks.FailedTransport) : this.end();
                        }
                    }
                    processBufferedCandidates() {
                        return Object(s.a)(this, void 0, void 0, function* () {
                            for (const e of this.candidateBuffer)
                                try {
                                    yield this.pc.addIceCandidate(e);
                                } catch (e) {
                                    this._log('error', 'Could not add ICE candidate', e);
                                }
                            this.candidateBuffer = [];
                        });
                    }
                    restrictRelayBandwidth() {
                        this.pc.addEventListener('iceconnectionstatechange', () =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                if (
                                    'completed' !== this.pc.iceConnectionState &&
                                    'connected' !== this.pc.iceConnectionState
                                )
                                    return;
                                const e = yield this.pc.getStats();
                                let t;
                                if (
                                    (e.forEach(n => {
                                        'transport' === n.type &&
                                            (t = e.get(n.selectedCandidatePairId));
                                    }),
                                    t ||
                                        e.forEach(e => {
                                            'candidate-pair' === e.type && e.selected && (t = e);
                                        }),
                                    !t)
                                )
                                    return;
                                let n = !1,
                                    i = '',
                                    s = '';
                                if (t.remoteCandidateId) {
                                    const n = e.get(t.remoteCandidateId);
                                    n && (s = n.candidateType);
                                }
                                if (t.localCandidateId) {
                                    const n = e.get(t.localCandidateId);
                                    n && (i = n.candidateType);
                                }
                                ('relay' !== i && 'relay' !== s) || (n = !0),
                                    (this.usingRelay = n),
                                    this.parent.emit('iceConnectionType', this, {
                                        localCandidateType: i,
                                        relayed: n,
                                        remoteCandidateType: s
                                    }),
                                    n &&
                                        ((this.maximumBitrate = this.maxRelayBandwidth),
                                        this.currentBitrate
                                            ? this.setMaximumBitrate(
                                                  Math.min(this.currentBitrate, this.maximumBitrate)
                                              )
                                            : this.setMaximumBitrate(this.maximumBitrate));
                            })
                        );
                    }
                    maybeRestartIce() {
                        this.isInitiator &&
                            (void 0 !== this._maybeRestartingIce &&
                                clearTimeout(this._maybeRestartingIce),
                            (this._maybeRestartingIce = setTimeout(() => {
                                (this._maybeRestartingIce = void 0),
                                    'disconnected' === this.pc.iceConnectionState &&
                                        this.restartIce();
                            }, 2e3)));
                    }
                }
                class Cr extends a.EventEmitter {
                    constructor(e = {}) {
                        super(),
                            (this.config = Object.assign({ chunkSize: 16384, hash: 'sha-1' }, e)),
                            (this.file = void 0),
                            (this.channel = void 0),
                            (this.hash = Hi(this.config.hash));
                    }
                    send(e, t) {
                        if (this.file && this.channel) return;
                        (this.file = e),
                            (this.channel = t),
                            (this.channel.binaryType = 'arraybuffer');
                        const n = new FileReader();
                        let i = 0,
                            s = !1;
                        const r = () => {
                            if (s || i >= e.size) return;
                            s = !0;
                            const t = e.slice(i, i + this.config.chunkSize);
                            n.readAsArrayBuffer(t);
                        };
                        (t.bufferedAmountLowThreshold = 8 * this.config.chunkSize),
                            (t.onbufferedamountlow = () => {
                                r();
                            }),
                            n.addEventListener('load', t => {
                                const n = t.target.result;
                                (s = !1),
                                    (i += n.byteLength),
                                    this.channel.send(n),
                                    this.hash.update(new Uint8Array(n)),
                                    this.emit('progress', i, e.size, n),
                                    i < e.size
                                        ? this.channel.bufferedAmount <=
                                              this.channel.bufferedAmountLowThreshold && r()
                                        : (this.emit('progress', e.size, e.size, null),
                                          this.emit('sentFile', {
                                              algorithm: this.config.hash,
                                              name: e.name,
                                              size: e.size,
                                              value: this.hash.digest()
                                          }));
                            }),
                            r();
                    }
                }
                class Rr extends a.EventEmitter {
                    constructor(e = {}) {
                        super(),
                            (this.config = Object.assign({ hash: 'sha-1' }, e)),
                            (this.receiveBuffer = []),
                            (this.received = 0),
                            (this.channel = void 0),
                            (this.hash = Hi(this.config.hash));
                    }
                    receive(e, t) {
                        (this.metadata = e),
                            (this.channel = t),
                            (this.channel.binaryType = 'arraybuffer'),
                            (this.channel.onmessage = e => {
                                const t = e.data.byteLength;
                                (this.received += t),
                                    this.receiveBuffer.push(e.data),
                                    e.data && this.hash.update(new Uint8Array(e.data)),
                                    this.emit(
                                        'progress',
                                        this.received,
                                        this.metadata.size,
                                        e.data
                                    ),
                                    this.received === this.metadata.size
                                        ? ((this.metadata.actualhash = this.hash.digest('hex')),
                                          this.emit(
                                              'receivedFile',
                                              new Blob(this.receiveBuffer),
                                              this.metadata
                                          ),
                                          (this.receiveBuffer = []))
                                        : this.received > this.metadata.size &&
                                          (console.error(
                                              'received more than expected, discarding...'
                                          ),
                                          (this.receiveBuffer = []));
                            });
                    }
                }
                class Nr extends Er {
                    constructor(e) {
                        super(e),
                            (this.sender = void 0),
                            (this.receiver = void 0),
                            (this.file = void 0);
                    }
                    start(e, t) {
                        return Object(s.a)(this, void 0, void 0, function* () {
                            if (((t = t || (() => {})), !e || 'function' == typeof e))
                                throw new Error('File object required');
                            (this.state = 'pending'),
                                (this.role = 'initiator'),
                                (this.file = e),
                                (this.sender = new Cr()),
                                this.sender.on('progress', (e, t) => {
                                    this._log('info', 'Send progress ' + e + '/' + t);
                                }),
                                this.sender.on('sentFile', e => {
                                    this._log('info', 'Sent file', e.name),
                                        this.send(Js.SessionInfo, {
                                            info: {
                                                creator: Ws.Initiator,
                                                file: {
                                                    hashes: [
                                                        { algorithm: e.algorithm, value: e.value }
                                                    ]
                                                },
                                                infoType: cr,
                                                name: this.contentName
                                            }
                                        }),
                                        this.parent.emit('sentFile', this, e);
                                }),
                                (this.channel = this.pc.createDataChannel('filetransfer', {
                                    ordered: !0
                                })),
                                (this.channel.onopen = () => {
                                    this.sender.send(this.file, this.channel);
                                });
                            try {
                                yield this.processLocal(Js.SessionInitiate, () =>
                                    Object(s.a)(this, void 0, void 0, function* () {
                                        const t = yield this.pc.createOffer({
                                                offerToReceiveAudio: !1,
                                                offerToReceiveVideo: !1
                                            }),
                                            n = jr(br(t.sdp), this.role, this.transportType);
                                        (this.contentName = n.contents[0].name),
                                            (n.sid = this.sid),
                                            (n.action = Js.SessionInitiate),
                                            (n.contents[0].application = {
                                                applicationType: Dn,
                                                file: {
                                                    date: e.lastModified
                                                        ? new Date(e.lastModified)
                                                        : void 0,
                                                    hashesUsed: [{ algorithm: 'sha-1' }],
                                                    name: e.name,
                                                    size: e.size
                                                }
                                            }),
                                            this.send('session-initiate', n),
                                            yield this.pc.setLocalDescription(t);
                                    })
                                ),
                                    t();
                            } catch (e) {
                                return (
                                    this._log('error', 'Could not create WebRTC offer', e),
                                    this.end('failed-application', !0)
                                );
                            }
                        });
                    }
                    accept(e) {
                        return Object(s.a)(this, void 0, void 0, function* () {
                            this._log('info', 'Accepted incoming session'),
                                (this.role = 'responder'),
                                (this.state = 'active'),
                                (e = e || (() => {}));
                            try {
                                yield this.processLocal(Js.SessionAccept, () =>
                                    Object(s.a)(this, void 0, void 0, function* () {
                                        const e = yield this.pc.createAnswer(),
                                            t = jr(br(e.sdp), this.role, this.transportType);
                                        (t.sid = this.sid), (t.action = 'session-accept');
                                        for (const e of t.contents) e.creator = 'initiator';
                                        (this.contentName = t.contents[0].name),
                                            this.send('session-accept', t),
                                            yield this.pc.setLocalDescription(e),
                                            yield this.processBufferedCandidates();
                                    })
                                ),
                                    e();
                            } catch (e) {
                                this._log('error', 'Could not create WebRTC answer', e),
                                    this.end('failed-application');
                            }
                        });
                    }
                    onSessionInitiate(e, t) {
                        return Object(s.a)(this, void 0, void 0, function* () {
                            this._log('info', 'Initiating incoming session'),
                                (this.role = 'responder'),
                                (this.state = 'pending'),
                                (this.transportType = e.contents[0].transport.transportType);
                            const n = yr(kr(e, this.peerRole)),
                                i = e.contents[0].application,
                                s = i.file.hashesUsed ? i.file.hashesUsed : i.file.hashes || [];
                            (this.receiver = new Rr({ hash: s[0] && s[0].algorithm })),
                                this.receiver.on('progress', (e, t) => {
                                    this._log('info', 'Receive progress ' + e + '/' + t);
                                }),
                                this.receiver.on('receivedFile', e => {
                                    (this.receivedFile = e), this._maybeReceivedFile();
                                }),
                                (this.receiver.metadata = i.file),
                                this.pc.addEventListener('datachannel', e => {
                                    (this.channel = e.channel),
                                        this.receiver.receive(this.receiver.metadata, e.channel);
                                });
                            try {
                                yield this.pc.setRemoteDescription({ type: 'offer', sdp: n }),
                                    yield this.processBufferedCandidates(),
                                    t();
                            } catch (e) {
                                this._log('error', 'Could not create WebRTC answer', e),
                                    t({ condition: 'general-error' });
                            }
                        });
                    }
                    onSessionInfo(e, t) {
                        const n = e.info;
                        n &&
                            n.file &&
                            n.file.hashes &&
                            ((this.receiver.metadata.hashes = n.file.hashes),
                            this.receiver.metadata.actualhash && this._maybeReceivedFile(),
                            t());
                    }
                    _maybeReceivedFile() {
                        if (this.receiver.metadata.hashes && this.receiver.metadata.hashes.length) {
                            for (const e of this.receiver.metadata.hashes || [])
                                if (
                                    e.value &&
                                    e.value.toString('hex') === this.receiver.metadata.actualhash
                                )
                                    return (
                                        this._log('info', 'File hash matches'),
                                        this.parent.emit(
                                            'receivedFile',
                                            this,
                                            this.receivedFile,
                                            this.receiver.metadata
                                        ),
                                        void this.end('success')
                                    );
                            this._log('error', 'File hash does not match'), this.end('media-error');
                        }
                    }
                }
                function qr(e) {
                    const t = e.application;
                    if (t.streams && t.streams.length && t.sources && t.sources.length) {
                        const e = t.streams[0];
                        (t.sources[0].parameters.msid = `${e.id} ${e.track}`),
                            t.sourceGroups &&
                                t.sourceGroups.length > 0 &&
                                t.sources.push({
                                    parameters: {
                                        cname: t.sources[0].parameters.cname,
                                        msid: `${e.id} ${e.track}`
                                    },
                                    ssrc: t.sourceGroups[0].sources[1]
                                });
                    }
                }
                class Ar extends Er {
                    constructor(e) {
                        if (
                            (super(e),
                            (this.includesAudio = !1),
                            (this.includesVideo = !1),
                            (this._ringing = !1),
                            this.pc.addEventListener('track', e => {
                                this.onAddTrack(e.track, e.streams[0]);
                            }),
                            e.stream)
                        )
                            for (const t of e.stream.getTracks()) this.addTrack(t, e.stream);
                    }
                    get ringing() {
                        return this._ringing;
                    }
                    set ringing(e) {
                        e !== this._ringing && (this._ringing = e);
                    }
                    get streams() {
                        return 'closed' !== this.pc.signalingState
                            ? this.pc.getRemoteStreams()
                            : [];
                    }
                    start(e, t) {
                        return Object(s.a)(this, arguments, void 0, function* () {
                            (this.state = 'pending'),
                                1 === arguments.length &&
                                    'function' == typeof e &&
                                    ((t = e), (e = {})),
                                (t = t || (() => {})),
                                (e = e || {}),
                                (this.role = 'initiator'),
                                (this.offerOptions = e);
                            try {
                                yield this.processLocal(Js.SessionInitiate, () =>
                                    Object(s.a)(this, void 0, void 0, function* () {
                                        const t = yield this.pc.createOffer(e),
                                            n = jr(br(t.sdp), this.role, this.transportType);
                                        (n.sid = this.sid), (n.action = Js.SessionInitiate);
                                        for (const e of n.contents || [])
                                            (e.creator = 'initiator'), qr(e);
                                        yield this.pc.setLocalDescription(t),
                                            this.send('session-initiate', n);
                                    })
                                ),
                                    t();
                            } catch (e) {
                                this._log('error', 'Could not create WebRTC offer', e),
                                    this.end('failed-application', !0);
                            }
                        });
                    }
                    accept(e, t) {
                        return Object(s.a)(this, arguments, void 0, function* () {
                            1 === arguments.length && 'function' == typeof e && ((t = e), (e = {})),
                                (t = t || (() => {})),
                                (e = e || {}),
                                this._log('info', 'Accepted incoming session'),
                                (this.state = 'active'),
                                (this.role = 'responder');
                            try {
                                yield this.processLocal(Js.SessionAccept, () =>
                                    Object(s.a)(this, void 0, void 0, function* () {
                                        const t = yield this.pc.createAnswer(e),
                                            n = jr(br(t.sdp), this.role, this.transportType);
                                        (n.sid = this.sid), (n.action = Js.SessionAccept);
                                        for (const e of n.contents || []) e.creator = 'initiator';
                                        yield this.pc.setLocalDescription(t),
                                            yield this.processBufferedCandidates(),
                                            this.send('session-accept', n);
                                    })
                                ),
                                    t();
                            } catch (e) {
                                this._log('error', 'Could not create WebRTC answer', e),
                                    this.end('failed-application');
                            }
                        });
                    }
                    end(e = 'success', t = !1) {
                        for (const e of this.pc.getReceivers()) this.onRemoveTrack(e.track);
                        super.end(e, t);
                    }
                    ring() {
                        return this.processLocal('ring', () =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                this._log('info', 'Ringing on incoming session'),
                                    (this.ringing = !0),
                                    this.send(Js.SessionInfo, { info: { infoType: or } });
                            })
                        );
                    }
                    mute(e, t) {
                        return this.processLocal('mute', () =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                this._log('info', 'Muting', t),
                                    this.send(Js.SessionInfo, {
                                        info: { creator: e, infoType: nr, name: t }
                                    });
                            })
                        );
                    }
                    unmute(e, t) {
                        return this.processLocal('unmute', () =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                this._log('info', 'Unmuting', t),
                                    this.send(Js.SessionInfo, {
                                        info: { creator: e, infoType: ir, name: t }
                                    });
                            })
                        );
                    }
                    hold() {
                        return this.processLocal('hold', () =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                this._log('info', 'Placing on hold'),
                                    this.send('session-info', { info: { infoType: sr } });
                            })
                        );
                    }
                    resume() {
                        return this.processLocal('resume', () =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                this._log('info', 'Resuming from hold'),
                                    this.send('session-info', { info: { infoType: ar } });
                            })
                        );
                    }
                    addTrack(e, t, n) {
                        return (
                            'audio' === e.kind && (this.includesAudio = !0),
                            'video' === e.kind && (this.includesVideo = !0),
                            this.processLocal('addtrack', () =>
                                Object(s.a)(this, void 0, void 0, function* () {
                                    this.pc.addTrack
                                        ? this.pc.addTrack(e, t)
                                        : this.pc.addStream(t),
                                        n && n();
                                })
                            )
                        );
                    }
                    removeTrack(e, t) {
                        return Object(s.a)(this, void 0, void 0, function* () {
                            return this.processLocal('removetrack', () =>
                                Object(s.a)(this, void 0, void 0, function* () {
                                    if ((this.pc.removeTrack(e), t)) return t();
                                })
                            );
                        });
                    }
                    onAddTrack(e, t) {
                        this._log('info', 'Track added'),
                            this.parent.emit('peerTrackAdded', this, e, t);
                    }
                    onRemoveTrack(e) {
                        this._log('info', 'Track removed'),
                            this.parent.emit('peerTrackRemoved', this, e);
                    }
                    onSessionInitiate(e, t) {
                        return Object(s.a)(this, void 0, void 0, function* () {
                            this._log('info', 'Initiating incoming session'),
                                (this.state = 'pending'),
                                (this.role = 'responder'),
                                (this.transportType = e.contents[0].transport.transportType);
                            const n = kr(e, this.peerRole);
                            for (const e of n.media)
                                'audio' === e.kind && (this.includesAudio = !0),
                                    'video' === e.kind && (this.includesVideo = !0),
                                    e.streams ||
                                        (e.streams = [{ stream: 'legacy', track: e.kind }]);
                            const i = yr(n);
                            try {
                                return (
                                    yield this.pc.setRemoteDescription({ type: 'offer', sdp: i }),
                                    yield this.processBufferedCandidates(),
                                    t()
                                );
                            } catch (e) {
                                return (
                                    this._log('error', 'Could not create WebRTC answer', e),
                                    t({ condition: 'general-error' })
                                );
                            }
                        });
                    }
                    onSessionTerminate(e, t) {
                        for (const e of this.pc.getReceivers()) this.onRemoveTrack(e.track);
                        super.onSessionTerminate(e, t);
                    }
                    onSessionInfo(e, t) {
                        const n = e.info || { infoType: '' };
                        switch (n.infoType) {
                            case or:
                                return (
                                    this._log('info', 'Outgoing session is ringing'),
                                    (this.ringing = !0),
                                    this.parent.emit('ringing', this),
                                    t()
                                );
                            case sr:
                                return (
                                    this._log('info', 'On hold'),
                                    this.parent.emit('hold', this),
                                    t()
                                );
                            case rr:
                            case ar:
                                return (
                                    this._log('info', 'Resuming from hold'),
                                    this.parent.emit('resumed', this),
                                    t()
                                );
                            case nr:
                                return (
                                    this._log('info', 'Muting', n),
                                    this.parent.emit('mute', this, n),
                                    t()
                                );
                            case ir:
                                return (
                                    this._log('info', 'Unmuting', n),
                                    this.parent.emit('unmute', this, n),
                                    t()
                                );
                        }
                        return t();
                    }
                }
                class Fr extends a.EventEmitter {
                    constructor(e = {}) {
                        super(),
                            (e = e || {}),
                            (this.selfID = e.selfID),
                            (this.sessions = {}),
                            (this.peers = {}),
                            (this.iceServers = e.iceServers || []),
                            (this.prepareSession =
                                e.prepareSession ||
                                (e => {
                                    if (this.config.hasRTCPeerConnection)
                                        return e.applicationTypes.indexOf(Rn) >= 0
                                            ? new Ar(e)
                                            : e.applicationTypes.indexOf(Dn) >= 0
                                            ? new Nr(e)
                                            : void 0;
                                })),
                            (this.performTieBreak =
                                e.performTieBreak ||
                                ((e, t) => {
                                    const n = (t.jingle.contents || []).map(e => {
                                        if (e.application) return e.application.applicationType;
                                    });
                                    return (
                                        (e.pendingApplicationTypes || []).filter(e => n.includes(e))
                                            .length > 0
                                    );
                                })),
                            (this.createPeerConnection =
                                e.createPeerConnection ||
                                ((e, t) => {
                                    if (ts) return new ts(t);
                                })),
                            (this.config = Object.assign(
                                {
                                    debug: !1,
                                    hasRTCPeerConnection: !!ts,
                                    peerConnectionConfig: {
                                        bundlePolicy: e.bundlePolicy || 'balanced',
                                        iceTransportPolicy: e.iceTransportPolicy || 'all',
                                        rtcpMuxPolicy: e.rtcpMuxPolicy || 'require',
                                        sdpSemantics: e.sdpSemantics || 'plan-b'
                                    },
                                    peerConnectionConstraints: {
                                        optional: [
                                            { DtlsSrtpKeyAgreement: !0 },
                                            { RtpDataChannels: !1 }
                                        ]
                                    }
                                },
                                e
                            ));
                    }
                    addICEServer(e) {
                        if ('string' == typeof e) return void this.iceServers.push({ urls: e });
                        if (!(t = e).type && (t.urls || t.url)) return void this.iceServers.push(e);
                        var t;
                        let n = e.host || '';
                        n.indexOf(':') >= 0 && (n = `[${n}]`);
                        let i = `${e.type}:${n}`;
                        e.port && (i += ':' + e.port),
                            e.transport && (i += '?transport=' + e.transport),
                            'turn' === e.type || 'turns' === e.type
                                ? this.iceServers.push({
                                      credential: e.password,
                                      urls: [i],
                                      username: e.username
                                  })
                                : ('stun' !== e.type && 'stuns' !== e.type) ||
                                  this.iceServers.push({ urls: [i] });
                    }
                    resetICEServers() {
                        this.iceServers = [];
                    }
                    addSession(e) {
                        e.parent = this;
                        const t = e.sid,
                            n = e.peerID;
                        return (
                            (this.sessions[t] = e),
                            this.peers[n] || (this.peers[n] = []),
                            this.peers[n].push(e),
                            this.emit('createdSession', e),
                            e
                        );
                    }
                    forgetSession(e) {
                        const t = this.peers[e.peerID] || [];
                        t.length && t.splice(t.indexOf(e), 1), delete this.sessions[e.sid];
                    }
                    createMediaSession(e, t, n) {
                        const i = new Ar({
                            config: this.config.peerConnectionConfig,
                            constraints: this.config.peerConnectionConstraints,
                            iceServers: this.iceServers,
                            initiator: !0,
                            maxRelayBandwidth: 786432,
                            parent: this,
                            peerID: e,
                            sid: t,
                            stream: n
                        });
                        return this.addSession(i), i;
                    }
                    createFileTransferSession(e, t) {
                        const n = new Nr({
                            config: this.config.peerConnectionConfig,
                            constraints: this.config.peerConnectionConstraints,
                            iceServers: this.iceServers,
                            initiator: !0,
                            maxRelayBandwidth: 786432,
                            parent: this,
                            peerID: e,
                            sid: t
                        });
                        return this.addSession(n), n;
                    }
                    endPeerSessions(e, t, n = !1) {
                        const i = this.peers[e] || [];
                        delete this.peers[e];
                        for (const e of i) e.end(t || 'gone', n);
                    }
                    endAllSessions(e, t = !1) {
                        for (const n of Object.keys(this.peers)) this.endPeerSessions(n, e, t);
                    }
                    process(e) {
                        const t = e.jingle ? e.jingle.sid : void 0;
                        let n = t ? this.sessions[t] : void 0;
                        const i = e.id,
                            s = e.from;
                        if (!s) return;
                        if ('error' === e.type) {
                            if (
                                (this._log('error', 'Received error response', e),
                                n && e.error && 'unknown-session' === e.error.jingleError)
                            )
                                return n.end('gone', !0);
                            const t = e.error && 'tie-break' === e.error.jingleError;
                            return n && 'pending' === n.state && t
                                ? n.end('alternative-session', !0)
                                : void (n && (n.pendingAction = void 0));
                        }
                        if ('result' === e.type) return void (n && (n.pendingAction = void 0));
                        const r = e.jingle.action,
                            a = e.jingle.contents || [],
                            o = a.map(e =>
                                e.application ? e.application.applicationType : void 0
                            ),
                            c = a.map(e => (e.transport ? e.transport.transportType : void 0));
                        if (r !== Js.SessionInitiate) {
                            if (!n)
                                return 'session-terminate' === r
                                    ? void this.emit('send', { id: i, to: s, type: 'result' })
                                    : (this._log('error', 'Unknown session', t),
                                      this._sendError(s, i, {
                                          condition: 'item-not-found',
                                          jingleError: 'unknown-session'
                                      }));
                            if (n.peerID !== s || 'ended' === n.state)
                                return (
                                    this._log(
                                        'error',
                                        'Session has ended, or action has wrong sender'
                                    ),
                                    this._sendError(s, i, {
                                        condition: 'item-not-found',
                                        jingleError: 'unknown-session'
                                    })
                                );
                            if ('session-accept' === r && 'pending' !== n.state)
                                return (
                                    this._log('error', 'Tried to accept session twice', t),
                                    this._sendError(s, i, {
                                        condition: 'unexpected-request',
                                        jingleError: 'out-of-order'
                                    })
                                );
                            if (
                                'session-terminate' !== r &&
                                r === n.pendingAction &&
                                (this._log('error', 'Tie break during pending request'),
                                n.isInitiator)
                            )
                                return this._sendError(s, i, {
                                    condition: 'conflict',
                                    jingleError: 'tie-break'
                                });
                        } else if (n) {
                            if (n.peerID !== s)
                                return (
                                    this._log('error', 'Duplicate sid from new sender'),
                                    this._sendError(s, i, { condition: 'service-unavailable' })
                                );
                            if ('pending' !== n.state)
                                return (
                                    this._log('error', 'Someone is doing this wrong'),
                                    this._sendError(s, i, {
                                        condition: 'unexpected-request',
                                        jingleError: 'out-of-order'
                                    })
                                );
                            if (this.selfID && this.selfID > n.peerID && this.performTieBreak(n, e))
                                return (
                                    this._log(
                                        'error',
                                        'Tie break new session because of duplicate sids'
                                    ),
                                    this._sendError(s, i, {
                                        condition: 'conflict',
                                        jingleError: 'tie-break'
                                    })
                                );
                        } else if (this.peers[s] && this.peers[s].length)
                            for (let n = 0, r = this.peers[s].length; n < r; n++) {
                                const r = this.peers[s][n];
                                if (
                                    r &&
                                    'pending' === r.state &&
                                    t &&
                                    ks(r.sid, t) > 0 &&
                                    this.performTieBreak(r, e)
                                )
                                    return (
                                        this._log('info', 'Tie break session-initiate'),
                                        this._sendError(s, i, {
                                            condition: 'conflict',
                                            jingleError: 'tie-break'
                                        })
                                    );
                            }
                        if ('session-initiate' === r) {
                            if (!a.length)
                                return this._sendError(s, i, { condition: 'bad-request' });
                            n = this._createIncomingSession(
                                {
                                    applicationTypes: o,
                                    config: this.config.peerConnectionConfig,
                                    constraints: this.config.peerConnectionConstraints,
                                    iceServers: this.iceServers,
                                    initiator: !1,
                                    parent: this,
                                    peerID: s,
                                    sid: t,
                                    transportTypes: c
                                },
                                e
                            );
                        }
                        n.process(r, e.jingle, t => {
                            t
                                ? (this._log('error', 'Could not process request', e, t),
                                  this._sendError(s, i, t))
                                : (this.emit('send', { id: i, to: s, type: 'result' }),
                                  'session-initiate' === r && this.emit('incoming', n));
                        });
                    }
                    signal(e, t) {
                        const n = t.jingle && t.jingle.action;
                        e.isInitiator && n === Js.SessionInitiate && this.emit('outgoing', e),
                            this.emit('send', t);
                    }
                    _createIncomingSession(e, t) {
                        let n;
                        return (
                            this.prepareSession && (n = this.prepareSession(e, t)),
                            n || (n = new Ir(e)),
                            this.addSession(n),
                            n
                        );
                    }
                    _sendError(e, t, n) {
                        n.type || (n.type = 'cancel'),
                            this.emit('send', { error: n, id: t, to: e, type: 'error' });
                    }
                    _log(e, t, ...n) {
                        this.emit('log', e, t, ...n), this.emit('log:' + e, t, ...n);
                    }
                }
                var Pr = Object.freeze({
                    __proto__: null,
                    Session: Ir,
                    ICESession: Er,
                    MediaSession: Ar,
                    FileSession: Nr,
                    SessionManager: Fr,
                    importFromSDP: br,
                    exportToSDP: yr
                });
                function Lr(e) {
                    const t = !!ts,
                        n = {
                            advertiseAudio: t,
                            advertiseFileTransfer: t,
                            advertiseVideo: t,
                            bundlePolicy: 'balanced',
                            hasRTCPeerConnection: t,
                            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
                            iceTransportPolicy: 'all',
                            rtcpMuxPolicy: 'require',
                            trickleIce: !0
                        },
                        i = e.config.jingle,
                        r = Object.assign(Object.assign({}, n), i),
                        a = (e.jingle = new Fr(r)),
                        o = [Cn];
                    r.hasRTCPeerConnection &&
                        (o.push(
                            ni,
                            An,
                            'urn:xmpp:jingle:transports:dtls-sctp:1',
                            'urn:xmpp:jingle:apps:dtls:0',
                            'urn:ietf:rfc:5888'
                        ),
                        !1 === r.trickleIce && o.push('urn:ietf:rfc:3264'),
                        (r.advertiseAudio || r.advertiseVideo) &&
                            o.push(Rn, $n, Qn, 'urn:ietf:rfc:5576'),
                        r.advertiseAudio && o.push('urn:xmpp:jingle:apps:rtp:audio'),
                        r.advertiseVideo && o.push('urn:xmpp:jingle:apps:rtp:video'),
                        r.advertiseFileTransfer &&
                            o.push('urn:xmpp:jingle:apps:file-transfer:4', Dn));
                    for (const t of o) e.disco.addFeature(t);
                    const c = [
                        'outgoing',
                        'incoming',
                        'accepted',
                        'terminated',
                        'ringing',
                        'mute',
                        'unmute',
                        'hold',
                        'resumed'
                    ];
                    for (const t of c)
                        a.on(t, (n, i) => {
                            e.emit('jingle:' + t, n, i);
                        });
                    a.on('createdSession', t => {
                        e.emit('jingle:created', t);
                    }),
                        a.on('send', t =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                try {
                                    if ('set' === t.type) {
                                        const n = yield e.sendIQ(t);
                                        n.jingle || (n.jingle = {}),
                                            (n.jingle.sid = t.jingle.sid),
                                            a.process(n);
                                    }
                                    'result' === t.type &&
                                        e.sendIQResult({ type: 'set', id: t.id, from: t.to }, t),
                                        'error' === t.type &&
                                            e.sendIQError({ type: 'set', id: t.id, from: t.to }, t);
                                } catch (e) {
                                    e.jingle || (e.jingle = t.jingle),
                                        (e.jingle.sid = t.jingle.sid),
                                        a.process(e);
                                }
                            })
                        ),
                        e.on('session:bound', e => {
                            a.selfID = e;
                        }),
                        e.on('iq:set:jingle', e => {
                            a.process(e);
                        }),
                        e.on('unavailable', e => {
                            a.endPeerSessions(e.from, void 0, !0);
                        }),
                        (e.getServices = (t, n, i) =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                const s = (yield e.sendIQ({
                                    externalServices: { type: n, version: i },
                                    to: t,
                                    type: 'get'
                                })).externalServices;
                                return (s.services = s.services || []), s;
                            })),
                        (e.getServiceCredentials = (t, n, i, r, a) =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                return (yield e.sendIQ({
                                    externalServiceCredentials: {
                                        host: n,
                                        port: r,
                                        type: i,
                                        version: a
                                    },
                                    to: t,
                                    type: 'get'
                                })).externalServiceCredentials;
                            })),
                        (e.discoverICEServers = (t = {}) =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                try {
                                    const n =
                                            (yield e.getServices(
                                                e.config.server,
                                                void 0,
                                                t.version
                                            )).services || [],
                                        i = [];
                                    for (const t of n) e.jingle.addICEServer(t);
                                    return i;
                                } catch (e) {
                                    return [];
                                }
                            }));
                }
                function Mr(e) {
                    (e.getHistorySearchForm = (t, n = {}) =>
                        Object(s.a)(this, void 0, void 0, function* () {
                            return (yield e.sendIQ({
                                archive: { type: 'query', version: n.version },
                                to: t,
                                type: 'get'
                            })).archive.form;
                        })),
                        (e.searchHistory = (t, n = {}) =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                const i = e.nextId();
                                let s = '';
                                'string' == typeof t ? (s = t) : ((s = t.to || ''), (n = t)),
                                    (n.queryId = i);
                                const r = n.form || {};
                                r.type = 'submit';
                                const a = r.fields || [],
                                    o = [
                                        {
                                            name: 'FORM_TYPE',
                                            type: 'hidden',
                                            value: 'urn:xmpp:mam:2'
                                        }
                                    ];
                                n.with &&
                                    o.push({ name: 'with', type: 'text-single', value: n.with }),
                                    n.start &&
                                        o.push({
                                            name: 'start',
                                            type: 'text-single',
                                            value: n.start.toISOString()
                                        }),
                                    n.end &&
                                        o.push({
                                            name: 'end',
                                            type: 'text-single',
                                            value: n.end.toISOString()
                                        }),
                                    (r.fields = (function (e, t) {
                                        const n = [],
                                            i = new Map();
                                        for (const e of t) e.name && i.set(e.name, e);
                                        const s = new Set();
                                        for (const t of e)
                                            t.name && i.has(t.name)
                                                ? (n.push(
                                                      Object.assign(
                                                          Object.assign({}, t),
                                                          i.get(t.name)
                                                      )
                                                  ),
                                                  s.add(t.name))
                                                : n.push(Object.assign({}, t));
                                        for (const e of t)
                                            (!e.name || (e.name && !s.has(e.name))) &&
                                                n.push(Object.assign({}, e));
                                        return n;
                                    })(o, a)),
                                    (n.form = r);
                                const c = Q(e.jid, s),
                                    l = [],
                                    u = e => {
                                        c.has(e.from) &&
                                            e.archive &&
                                            e.archive.queryId === i &&
                                            l.push(e.archive);
                                    };
                                e.on('mam:item', u);
                                try {
                                    const t = yield e.sendIQ({
                                        archive: n,
                                        id: i,
                                        to: s,
                                        type: 'set'
                                    });
                                    return Object.assign(Object.assign({}, t.archive), {
                                        results: l
                                    });
                                } finally {
                                    e.off('mam:item', u);
                                }
                            })),
                        (e.getHistoryPreferences = () =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                return (yield e.sendIQ({
                                    archive: { type: 'preferences' },
                                    type: 'get'
                                })).archive;
                            })),
                        (e.setHistoryPreferences = t =>
                            e.sendIQ({
                                archive: Object.assign({ type: 'preferences' }, t),
                                type: 'set'
                            })),
                        e.on('message', t => {
                            t.archive && e.emit('mam:item', t);
                        });
                }
                const Dr = new Set(['chat', 'headline', 'normal']),
                    Br = new Set(['chat', 'groupchat', 'normal']),
                    Ur = (e, t) =>
                        e.marker && 'markable' === e.marker.type && !1 !== t.config.chatMarkers;
                function zr(e, t) {
                    return Object(s.a)(this, void 0, void 0, function* () {
                        yield e.sendIQ({ carbons: { action: t }, type: 'set' });
                    });
                }
                function Vr(e, t, n) {
                    if (Ur(t, e)) {
                        const i = 'groupchat' === t.type ? Y(t.from) : t.from;
                        e.sendMessage({
                            body: '',
                            marker: { id: t.id, type: n },
                            to: i,
                            type: t.type
                        });
                    }
                }
                function $r(e) {
                    e.disco.addFeature('urn:xmpp:attention:0'),
                        e.disco.addFeature(Kn),
                        e.disco.addFeature(vn),
                        e.disco.addFeature('urn:xmpp:message-correct:0'),
                        e.disco.addFeature('urn:xmpp:receipts'),
                        e.disco.addFeature(Jn),
                        (e.enableCarbons = () => zr(e, 'enable')),
                        (e.disableCarbons = () => zr(e, 'disable')),
                        (e.markReceived = t => Vr(e, t, 'received')),
                        (e.markDisplayed = t => Vr(e, t, 'displayed')),
                        (e.markAcknowledged = t => Vr(e, t, 'acknowledged')),
                        (e.getAttention = (t, n = {}) =>
                            e.sendMessage(
                                Object.assign(Object.assign({}, n), {
                                    requestingAttention: !0,
                                    to: t,
                                    type: 'headline'
                                })
                            )),
                        e.on('message', t => {
                            if (t.carbon && W(t.from, e.jid)) {
                                const n = t.carbon.forward.message;
                                n.delay ||
                                    (n.delay = t.carbon.forward.delay || {
                                        timestamp: new Date(Date.now())
                                    }),
                                    (e => !!e.carbon && 'received' === e.carbon.type)(t) &&
                                        (e.emit('carbon:received', t), e.emit('message', n)),
                                    (e => !!e.carbon && 'sent' === e.carbon.type)(t) &&
                                        (e.emit('carbon:sent', t), e.emit('message:sent', n, !0));
                            }
                            if (
                                ((e => !!e.forms && e.forms.length > 0)(t) && e.emit('dataform', t),
                                t.requestingAttention && e.emit('attention', t),
                                (e => !!e.rtt)(t) && e.emit('rtt', t),
                                (e => !!e.replace)(t) && e.emit('replace', t),
                                (e => !!e.chatState)(t) &&
                                    Br.has(t.type || 'normal') &&
                                    e.emit('chat:state', t),
                                Ur(t, e) && e.markReceived(t),
                                t.marker &&
                                    'markable' !== t.marker.type &&
                                    e.emit('marker:' + t.marker.type, t),
                                (e => !!e.receipt)(t))
                            ) {
                                !1 !== e.config.sendReceipts &&
                                    Dr.has(t.type || 'normal') &&
                                    'request' === t.receipt.type &&
                                    e.sendMessage({
                                        id: t.id,
                                        receipt: { id: t.id, type: 'received' },
                                        to: t.from,
                                        type: t.type
                                    }),
                                    'received' === t.receipt.type && e.emit('receipt', t);
                            }
                        });
                }
                function Qr(e) {
                    function t() {
                        const t = e.joiningRooms;
                        e.joiningRooms = new Map();
                        for (const [n, i] of t) e.joinRoom(n, i);
                        const n = e.joinedRooms;
                        e.joinedRooms = new Map();
                        for (const [t, i] of n) e.joinRoom(t, i);
                    }
                    e.disco.addFeature(en),
                        e.disco.addFeature('jabber:x:conference'),
                        e.disco.addFeature(Yn),
                        (e.joinedRooms = new Map()),
                        (e.joiningRooms = new Map()),
                        (e.leavingRooms = new Map()),
                        e.on('session:started', t),
                        e.on('stream:management:resumed', t),
                        e.on('message', t => {
                            if ('groupchat' === t.type && t.hasSubject)
                                e.emit('muc:topic', {
                                    from: t.from,
                                    room: Y(t.from),
                                    topic: t.subject || ''
                                });
                            else if (t.muc)
                                if (
                                    'direct-invite' === t.muc.type ||
                                    (!t.muc.invite && t.legacyMUC)
                                ) {
                                    const n = 'direct-invite' === t.muc.type ? t.muc : t.legacyMUC;
                                    e.emit('muc:invite', {
                                        from: t.from,
                                        password: n.password,
                                        reason: n.reason,
                                        room: n.jid,
                                        thread: n.thread,
                                        type: 'direct'
                                    });
                                } else
                                    t.muc.invite
                                        ? e.emit('muc:invite', {
                                              from: t.muc.invite[0].from,
                                              password: t.muc.password,
                                              reason: t.muc.invite[0].reason,
                                              room: t.from,
                                              thread: t.muc.invite[0].thread,
                                              type: 'mediated'
                                          })
                                        : t.muc.decline
                                        ? e.emit('muc:declined', {
                                              from: t.muc.decline.from,
                                              reason: t.muc.decline.reason,
                                              room: t.from
                                          })
                                        : e.emit('muc:other', t);
                        }),
                        e.on('presence', t => {
                            const n = Y(t.from);
                            if (e.joiningRooms.has(n) && 'error' === t.type)
                                return (
                                    e.joiningRooms.delete(n),
                                    e.emit('muc:failed', t),
                                    void e.emit('muc:error', t)
                                );
                            if (
                                !(function (e) {
                                    return !!e.muc;
                                })(t)
                            )
                                return;
                            const i =
                                    t.muc.statusCodes &&
                                    t.muc.statusCodes.indexOf(Vs.SelfPresence) >= 0,
                                s =
                                    t.muc.statusCodes &&
                                    t.muc.statusCodes.indexOf(Vs.NickChanged) >= 0;
                            if ('error' === t.type) return void e.emit('muc:error', t);
                            if ('unavailable' === t.type)
                                return (
                                    e.emit('muc:unavailable', t),
                                    i &&
                                        (s
                                            ? e.joinedRooms.set(n, t.muc.nick)
                                            : (e.emit('muc:leave', t),
                                              e.joinedRooms.delete(n),
                                              e.leavingRooms.delete(n))),
                                    void (
                                        t.muc.destroy &&
                                        e.emit('muc:destroyed', {
                                            newRoom: t.muc.destroy.jid,
                                            password: t.muc.destroy.password,
                                            reason: t.muc.destroy.reason,
                                            room: n
                                        })
                                    )
                                );
                            e.emit('muc:available', t);
                            const r = e.joiningRooms.has(n) || !e.joinedRooms.has(n);
                            i &&
                                (e.joinedRooms.set(n, J(t.from)),
                                r && (e.joiningRooms.delete(n), e.emit('muc:join', t)));
                        }),
                        (e.joinRoom = (t, n, i = {}) =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                if (((t = Y(t)), e.joiningRooms.set(t, n || ''), !n))
                                    try {
                                        (n = yield e.getReservedNick(t)), e.joiningRooms.set(t, n);
                                    } catch (e) {
                                        throw new Error('Room nick required');
                                    }
                                return new Promise((s, r) => {
                                    function a(n) {
                                        W(n.from, t) &&
                                            (e.off('muc:join', a), e.off('muc:failed', o), s(n));
                                    }
                                    function o(n) {
                                        W(n.from, t) &&
                                            (e.off('muc:join', a), e.off('muc:failed', o), r(n));
                                    }
                                    e.on('muc:join', a),
                                        e.on('muc:failed', o),
                                        e.sendPresence(
                                            Object.assign(Object.assign({}, i), {
                                                muc: Object.assign(Object.assign({}, i.muc), {
                                                    type: 'join'
                                                }),
                                                to: V(t, n)
                                            })
                                        );
                                });
                            })),
                        (e.leaveRoom = (t, n, i = {}) => (
                            (t = Y(t)),
                            (n = n || e.joinedRooms.get(t)),
                            e.leavingRooms.set(t, n),
                            new Promise((s, r) => {
                                const a = i.id || Ts();
                                function o(n) {
                                    W(n.from, t) &&
                                        (e.off('muc:leave', o), e.off('presence:error', c), s(n));
                                }
                                function c(n) {
                                    n.id === a &&
                                        Q(t) &&
                                        (e.joinedRooms.has(t) || e.leavingRooms.delete(t),
                                        e.off('muc:leave', o),
                                        e.off('presence:error', c),
                                        r(n));
                                }
                                e.on('muc:leave', o),
                                    e.on('presence:error', c),
                                    e.sendPresence(
                                        Object.assign(Object.assign({}, i), {
                                            id: a,
                                            to: V(t, n),
                                            type: 'unavailable'
                                        })
                                    );
                            })
                        )),
                        (e.ban = (t, n, i) => e.setRoomAffiliation(t, n, 'outcast', i)),
                        (e.kick = (t, n, i) => e.setRoomRole(t, n, 'none', i)),
                        (e.invite = (t, n = []) => {
                            Array.isArray(n) || (n = [n]),
                                e.sendMessage({ muc: { invite: n, type: 'info' }, to: t });
                        }),
                        (e.directInvite = (t, n, i = {}) => {
                            e.sendMessage({
                                muc: Object.assign(Object.assign({}, i), {
                                    jid: t,
                                    type: 'direct-invite'
                                }),
                                to: n
                            });
                        }),
                        (e.declineInvite = (t, n, i) => {
                            e.sendMessage({
                                muc: { decline: { reason: i, to: n }, type: 'info' },
                                to: t
                            });
                        }),
                        (e.changeNick = (t, n) => {
                            const i = Ts(),
                                s = V(t, n),
                                r = Q(t);
                            return new Promise((t, n) => {
                                function a(n) {
                                    r.has(Y(n.from)) &&
                                        n.muc.statusCodes &&
                                        n.muc.statusCodes.includes(Vs.SelfPresence) &&
                                        (e.off('muc:available', a),
                                        e.off('presence:id:' + i, o),
                                        t(n));
                                }
                                function o(s) {
                                    r.has(Y(s.from)) &&
                                        s.id === i &&
                                        (e.off('muc:available', a),
                                        e.off('presence:id:' + i, o),
                                        'error' === s.type ? n(s) : t(s));
                                }
                                e.on('muc:available', a),
                                    e.on('presence:id:' + i, o),
                                    e.sendPresence({ id: i, to: s });
                            });
                        }),
                        (e.setSubject = (t, n) => {
                            e.sendMessage({ subject: n, to: t, type: 'groupchat' });
                        }),
                        (e.getReservedNick = t =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                try {
                                    const n = (yield e.getDiscoInfo(t, 'x-roomuser-item'))
                                        .identities[0];
                                    if (n.name) return n.name;
                                    throw new Error('No nickname reserved');
                                } catch (e) {
                                    throw new Error('No nickname reserved');
                                }
                            })),
                        (e.requestRoomVoice = t => {
                            e.sendMessage({
                                forms: [
                                    {
                                        fields: [
                                            {
                                                name: 'FORM_TYPE',
                                                type: 'hidden',
                                                value: 'http://jabber.org/protocol/muc#request'
                                            },
                                            {
                                                name: 'muc#role',
                                                type: 'text-single',
                                                value: 'participant'
                                            }
                                        ],
                                        type: 'submit'
                                    }
                                ],
                                to: t
                            });
                        }),
                        (e.setRoomAffiliation = (t, n, i, s) =>
                            e.sendIQ({
                                muc: {
                                    type: 'user-list',
                                    users: [{ affiliation: i, jid: n, reason: s }]
                                },
                                to: t,
                                type: 'set'
                            })),
                        (e.setRoomRole = (t, n, i, s) =>
                            e.sendIQ({
                                muc: {
                                    type: 'user-list',
                                    users: [{ nick: n, reason: s, role: i }]
                                },
                                to: t,
                                type: 'set'
                            })),
                        (e.getRoomMembers = (t, n = { affiliation: 'member' }) =>
                            e.sendIQ({
                                muc: { type: 'user-list', users: [n] },
                                to: t,
                                type: 'get'
                            })),
                        (e.getRoomConfig = t =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                const n = yield e.sendIQ({
                                    muc: { type: 'configure' },
                                    to: t,
                                    type: 'get'
                                });
                                if (!n.muc.form) throw new Error('No configuration form returned');
                                return n.muc.form;
                            })),
                        (e.configureRoom = (t, n = {}) =>
                            e.sendIQ({
                                muc: {
                                    form: Object.assign(Object.assign({}, n), { type: 'submit' }),
                                    type: 'configure'
                                },
                                to: t,
                                type: 'set'
                            })),
                        (e.destroyRoom = (t, n = {}) =>
                            e.sendIQ({
                                muc: { destroy: n, type: 'configure' },
                                to: t,
                                type: 'set'
                            })),
                        (e.getUniqueRoomName = function (e) {
                            return Object(s.a)(this, void 0, void 0, function* () {
                                const t = yield this.sendIQ({
                                    muc: { type: 'unique' },
                                    to: e,
                                    type: 'get'
                                });
                                if (!t.muc.name) throw new Error('No unique name returned');
                                return t.muc.name;
                            });
                        }),
                        (e.getBookmarks = () =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                const t = yield e.getPrivateData('bookmarks');
                                return t && t.rooms ? t.rooms : [];
                            })),
                        (e.setBookmarks = t => e.setPrivateData('bookmarks', { rooms: t })),
                        (e.addBookmark = t =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                const n = yield e.getBookmarks(),
                                    i = [];
                                let s = !1;
                                for (const e of n)
                                    W(e.jid, t.jid)
                                        ? (i.push(Object.assign(Object.assign({}, e), t)), (s = !0))
                                        : i.push(e);
                                return s || i.push(t), e.setBookmarks(i);
                            })),
                        (e.removeBookmark = t =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                const n = (yield e.getBookmarks()).filter(e => !W(e.jid, t));
                                return e.setBookmarks(n);
                            }));
                }
                function Wr(e) {
                    e.disco.addFeature(_n),
                        e.disco.addFeature(gn),
                        e.disco.addFeature(wn),
                        e.disco.addFeature(qn),
                        e.disco.addFeature(xn),
                        e.disco.addFeature(En(_n)),
                        e.disco.addFeature(En(gn)),
                        e.disco.addFeature(En(wn)),
                        e.disco.addFeature(En(qn)),
                        e.disco.addFeature(En(xn)),
                        (e.publishActivity = t =>
                            e.publish('', _n, Object.assign({ itemType: _n }, t))),
                        (e.publishGeoLoc = t =>
                            e.publish('', gn, Object.assign({ itemType: gn }, t))),
                        (e.publishMood = t =>
                            e.publish('', wn, Object.assign({ itemType: wn }, t))),
                        (e.publishNick = t => e.publish('', qn, { itemType: qn, nick: t })),
                        (e.publishTune = t =>
                            e.publish('', xn, Object.assign({ itemType: xn }, t))),
                        e.on('pubsub:published', t => {
                            const n = t.pubsub.items.published[0].content;
                            switch (t.pubsub.items.node) {
                                case _n:
                                    return e.emit('activity', { activity: n, jid: t.from });
                                case gn:
                                    return e.emit('geoloc', { geoloc: n, jid: t.from });
                                case wn:
                                    return e.emit('mood', { jid: t.from, mood: n });
                                case qn:
                                    return e.emit('nick', { jid: t.from, nick: n.nick });
                                case xn:
                                    return e.emit('tune', {
                                        jid: t.from,
                                        tune: t.pubsub.items.published[0].content
                                    });
                            }
                        });
                }
                function Gr(e) {
                    e.disco.addFeature(kn + '#SubID', kn),
                        e.on('message', t => {
                            !(function (e) {
                                return (
                                    !!e.pubsub &&
                                    !(
                                        (e.pubsub.context && 'user' !== e.pubsub.context) ||
                                        !e.pubsub.affiliations
                                    )
                                );
                            })(t)
                                ? (function (e) {
                                      return !!e.pubsub;
                                  })(t) &&
                                  (e.emit('pubsub:event', t),
                                  !(function (e) {
                                      return !!e.pubsub.items && !!e.pubsub.items.published;
                                  })(t)
                                      ? !(function (e) {
                                            return !!e.pubsub.items && !!e.pubsub.items.retracted;
                                        })(t)
                                          ? !(function (e) {
                                                return 'purge' === e.pubsub.eventType;
                                            })(t)
                                              ? !(function (e) {
                                                    return 'purge' === e.pubsub.eventType;
                                                })(t)
                                                  ? !(function (e) {
                                                        return (
                                                            'subscription' === e.pubsub.eventType
                                                        );
                                                    })(t)
                                                      ? (function (e) {
                                                            return (
                                                                'configuration' ===
                                                                e.pubsub.eventType
                                                            );
                                                        })(t) && e.emit('pubsub:config', t)
                                                      : e.emit('pubsub:subscription', t)
                                                  : e.emit('pubsub:deleted', t)
                                              : e.emit('pubsub:purged', t)
                                          : e.emit('pubsub:retracted', t)
                                      : e.emit('pubsub:published', t))
                                : e.emit('pubsub:affiliations', t);
                        }),
                        (e.subscribeToNode = (t, n) =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                const i = {};
                                let s;
                                'string' == typeof n
                                    ? ((i.node = n), (i.jid = Y(e.jid)))
                                    : ((i.node = n.node),
                                      (i.jid = n.jid || (n.useBareJID ? Y(e.jid) : e.jid)),
                                      (s = n.options));
                                const r = yield e.sendIQ({
                                        pubsub: {
                                            context: 'user',
                                            subscribe: i,
                                            subscriptionOptions: s ? { form: s } : void 0
                                        },
                                        to: t,
                                        type: 'set'
                                    }),
                                    a = r.pubsub.subscription || {};
                                return (
                                    r.pubsub.subscriptionOptions &&
                                        (a.options = r.pubsub.subscriptionOptions.form),
                                    a
                                );
                            })),
                        (e.unsubscribeFromNode = (t, n) =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                const i = {};
                                'string' == typeof n
                                    ? ((i.node = n), (i.jid = Y(e.jid)))
                                    : ((i.node = n.node),
                                      (i.subid = n.subid),
                                      (i.jid = n.jid || (n.useBareJID ? Y(e.jid) : e.jid)));
                                const s = yield e.sendIQ({
                                    pubsub: { context: 'user', unsubscribe: i },
                                    to: t,
                                    type: 'set'
                                });
                                return s.pubsub && s.pubsub.subscription
                                    ? s.pubsub.subscription
                                    : Object.assign(Object.assign({}, i), { state: 'none' });
                            })),
                        (e.publish = (t, n, i, s) =>
                            e.sendIQ({
                                pubsub: {
                                    context: 'user',
                                    publish: { item: { content: i, id: s }, node: n }
                                },
                                to: t,
                                type: 'set'
                            })),
                        (e.getItem = (t, n, i) =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                return (yield e.sendIQ({
                                    pubsub: {
                                        context: 'user',
                                        fetch: { items: [{ id: i }], node: n }
                                    },
                                    to: t,
                                    type: 'get'
                                })).pubsub.fetch.items[0];
                            })),
                        (e.getItems = (t, n, i = {}) =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                return (yield e.sendIQ({
                                    pubsub: {
                                        context: 'user',
                                        fetch: { max: i.max, node: n },
                                        paging: i
                                    },
                                    to: t,
                                    type: 'get'
                                })).pubsub.fetch;
                            })),
                        (e.retract = (t, n, i, s) =>
                            e.sendIQ({
                                pubsub: { context: 'user', retract: { id: i, node: n, notify: s } },
                                to: t,
                                type: 'set'
                            })),
                        (e.purgeNode = (t, n) =>
                            e.sendIQ({
                                pubsub: { context: 'owner', purge: n },
                                to: t,
                                type: 'set'
                            })),
                        (e.deleteNode = (t, n, i) =>
                            e.sendIQ({
                                pubsub: { context: 'owner', destroy: { node: n, redirect: i } },
                                to: t,
                                type: 'set'
                            })),
                        (e.createNode = (t, n, i) =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                const s = yield e.sendIQ({
                                    pubsub: {
                                        configure: i ? { form: i } : void 0,
                                        context: 'user',
                                        create: { node: n }
                                    },
                                    to: t,
                                    type: 'set'
                                });
                                return s.pubsub && s.pubsub.create ? s.pubsub.create : { node: n };
                            })),
                        (e.getSubscriptions = (t, n = {}) =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                return (yield e.sendIQ({
                                    pubsub: { context: 'user', subscriptions: n },
                                    to: t,
                                    type: 'get'
                                })).pubsub.subscriptions;
                            })),
                        (e.getAffiliations = (t, n) =>
                            e.sendIQ({
                                pubsub: { affiliations: { node: n } },
                                to: t,
                                type: 'get'
                            })),
                        (e.getNodeSubscribers = (t, n, i = {}) => (
                            'string' == typeof n
                                ? (i.node = n)
                                : (i = Object.assign(Object.assign({}, i), n)),
                            e.sendIQ({
                                pubsub: { context: 'owner', subscriptions: i },
                                to: t,
                                type: 'get'
                            })
                        )),
                        (e.updateNodeSubscriptions = (t, n, i) =>
                            e.sendIQ({
                                pubsub: { context: 'owner', subscriptions: { items: i, node: n } },
                                to: t,
                                type: 'set'
                            })),
                        (e.getNodeAffiliations = (t, n) =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                return (yield e.sendIQ({
                                    pubsub: { affiliations: { node: n }, context: 'owner' },
                                    to: t,
                                    type: 'get'
                                })).pubsub.affiliations;
                            })),
                        (e.updateNodeAffiliations = (t, n, i) =>
                            e.sendIQ({
                                pubsub: { affiliations: { items: i, node: n }, context: 'owner' },
                                to: t,
                                type: 'set'
                            })),
                        (e.getNodeConfig = (t, n) =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                return (
                                    (yield e.sendIQ({
                                        pubsub: { configure: { node: n }, context: 'owner' },
                                        to: t,
                                        type: 'get'
                                    })).pubsub.configure.form || {}
                                );
                            })),
                        (e.getDefaultNodeConfig = t =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                return (
                                    (yield e.sendIQ({
                                        pubsub: { context: 'owner', defaultConfiguration: {} },
                                        to: t,
                                        type: 'get'
                                    })).pubsub.defaultConfiguration.form || {}
                                );
                            })),
                        (e.configureNode = (t, n, i) =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                return e.sendIQ({
                                    pubsub: { configure: { form: i, node: n }, context: 'owner' },
                                    to: t,
                                    type: 'set'
                                });
                            })),
                        (e.getDefaultSubscriptionOptions = t =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                return (
                                    (yield e.sendIQ({
                                        pubsub: { defaultSubscriptionOptions: {} },
                                        to: t,
                                        type: 'get'
                                    })).pubsub.defaultSubscriptionOptions.form || {}
                                );
                            }));
                }
                function Hr(e) {
                    function t(t, n) {
                        return Object(s.a)(this, void 0, void 0, function* () {
                            yield e.sendIQ({ blockList: { action: t, jids: [n] }, type: 'set' });
                        });
                    }
                    e.on('iq:set:roster', t => {
                        if (!Q(e.jid).has(t.from))
                            return e.sendIQError(t, {
                                error: { condition: 'service-unavailable', type: 'cancel' }
                            });
                        e.emit('roster:update', t), e.sendIQResult(t);
                    }),
                        e.on('iq:set:blockList', t => {
                            if (!Q(e.jid).has(t.from))
                                return e.sendIQError(t, {
                                    error: { condition: 'service-unavailable', type: 'cancel' }
                                });
                            const n = t.blockList;
                            e.emit(n.action, { jids: n.jids || [] }), e.sendIQResult(t);
                        }),
                        (e.getRoster = () =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                const t = yield e.sendIQ({
                                    roster: { version: e.config.rosterVer },
                                    type: 'get'
                                });
                                if (t.roster) {
                                    const n = t.roster.version;
                                    return (
                                        n && ((e.config.rosterVer = n), e.emit('roster:ver', n)),
                                        (t.roster.items = t.roster.items || []),
                                        t.roster
                                    );
                                }
                                return { items: [] };
                            })),
                        (e.updateRosterItem = t =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                yield e.sendIQ({ roster: { items: [t] }, type: 'set' });
                            })),
                        (e.removeRosterItem = t =>
                            e.updateRosterItem({ jid: t, subscription: 'remove' })),
                        (e.subscribe = t => {
                            e.sendPresence({ type: 'subscribe', to: t });
                        }),
                        (e.unsubscribe = t => {
                            e.sendPresence({ type: 'unsubscribe', to: t });
                        }),
                        (e.acceptSubscription = t => {
                            e.sendPresence({ type: 'subscribed', to: t });
                        }),
                        (e.denySubscription = t => {
                            e.sendPresence({ type: 'unsubscribed', to: t });
                        }),
                        (e.getBlocked = () =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                const t = yield e.sendIQ({
                                    blockList: { action: 'list' },
                                    type: 'get'
                                });
                                return Object.assign({ jids: [] }, t.blockList);
                            })),
                        (e.block = e =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                return t('block', e);
                            })),
                        (e.unblock = e =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                return t('unblock', e);
                            })),
                        (e.goInvisible = (t = !1) =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                yield e.sendIQ({
                                    type: 'set',
                                    visiblity: { probe: t, type: 'invisible' }
                                });
                            })),
                        (e.goVisible = () =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                yield e.sendIQ({ type: 'set', visiblity: { type: 'visible' } });
                            }));
                }
                function Jr(e) {
                    e.registerFeature('sasl', 100, (t, n) =>
                        Object(s.a)(this, void 0, void 0, function* () {
                            const i = e.sasl.createMechanism(t.sasl.mechanisms),
                                r = t =>
                                    Object(s.a)(this, void 0, void 0, function* () {
                                        if (i)
                                            switch (t.type) {
                                                case 'success':
                                                    return (
                                                        (e.features.negotiated.sasl = !0),
                                                        e.off('sasl', r),
                                                        e.emit(
                                                            'auth:success',
                                                            e.config.credentials
                                                        ),
                                                        e.transport &&
                                                            (e.transport.authenticated = !0),
                                                        void n('restart')
                                                    );
                                                case 'challenge':
                                                    i.processChallenge(t.value);
                                                    try {
                                                        const t = yield e.getCredentials(),
                                                            n = i.createResponse(t);
                                                        n || '' === n
                                                            ? e.send('sasl', {
                                                                  type: 'response',
                                                                  value: n
                                                              })
                                                            : e.send('sasl', { type: 'response' });
                                                        const s = i.getCacheableCredentials();
                                                        s &&
                                                            (e.config.credentials ||
                                                                (e.config.credentials = {}),
                                                            (e.config.credentials = Object.assign(
                                                                Object.assign(
                                                                    {},
                                                                    e.config.credentials
                                                                ),
                                                                s
                                                            )),
                                                            e.emit(
                                                                'credentials:update',
                                                                e.config.credentials
                                                            ));
                                                    } catch (t) {
                                                        console.error(t),
                                                            e.send('sasl', { type: 'abort' });
                                                    }
                                                    return;
                                                case 'failure':
                                                case 'abort':
                                                    return (
                                                        e.off('sasl', r),
                                                        e.emit('auth:failed'),
                                                        void n(
                                                            'disconnect',
                                                            'authentication failed'
                                                        )
                                                    );
                                            }
                                    });
                            if (!i)
                                return (
                                    e.off('sasl', r),
                                    e.emit('auth:failed'),
                                    n('disconnect', 'authentication failed')
                                );
                            e.on('sasl', r),
                                e.once('--reset-stream-features', () => {
                                    (e.features.negotiated.sasl = !1), e.off('sasl', r);
                                });
                            try {
                                const t = yield e.getCredentials();
                                e.send('sasl', {
                                    mechanism: i.name,
                                    type: 'auth',
                                    value: i.createResponse(t)
                                });
                            } catch (t) {
                                console.error(t), e.send('sasl', { type: 'abort' });
                            }
                        })
                    );
                }
                function Yr(e) {
                    function t(t) {
                        return Object(s.a)(this, void 0, void 0, function* () {
                            const n = yield e.getDiscoInfo(t);
                            if (!n.features || !n.features.includes(ti)) return;
                            let i;
                            for (const e of n.extensions || []) {
                                const n = e.fields || [];
                                if (n.some(e => 'FORM_TYPE' === e.name && e.value === ti)) {
                                    const e = n.find(e => 'max-file-size' === e.name);
                                    return e && (i = parseInt(e.value, 10)), { jid: t, maxSize: i };
                                }
                            }
                        });
                    }
                    e.disco.addFeature(Mn),
                        (e.getBits = (t, n) =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                return (yield e.sendIQ({
                                    bits: { cid: n },
                                    to: t,
                                    type: 'get'
                                })).bits;
                            })),
                        (e.getUploadService = (n = H(e.jid)) =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                const i = yield t(n);
                                if (i) return i;
                                const s = yield e.getDiscoItems(n);
                                for (const e of s.items || []) {
                                    if (!e.jid) continue;
                                    const n = yield t(e.jid);
                                    if (n) return n;
                                }
                                throw new Error('No upload service discovered on: ' + n);
                            })),
                        (e.getUploadSlot = (t, n) =>
                            Object(s.a)(this, void 0, void 0, function* () {
                                return (yield e.sendIQ({
                                    httpUpload: Object.assign({ type: 'request' }, n),
                                    to: t,
                                    type: 'get'
                                })).httpUpload;
                            }));
                }
                function Kr(e) {
                    e.use(fr), e.use(Ps), e.use(ws), e.use(Rs), e.use(gr), e.use(Jr);
                }
                function Xr(e) {
                    e.use(ys),
                        e.use($r),
                        e.use(vs),
                        e.use(_s),
                        e.use(hr),
                        e.use(Lr),
                        e.use(Mr),
                        e.use(Qr),
                        e.use(Wr),
                        e.use(Gr),
                        e.use(Hr),
                        e.use(Yr);
                }
                const Zr = {
                        aliases: ['features.legacySession', 'iq.legacySession'],
                        element: 'session',
                        fields: { optional: vt(null, 'optional') },
                        namespace: Vt
                    },
                    ea = [
                        {
                            aliases: [
                                'atomentry',
                                { path: 'pubsubcontent', contextField: 'itemType' },
                                { path: 'pubsubitem.content', contextField: 'itemType' },
                                { path: 'pubsubeventitem.content', contextField: 'itemType' },
                                { path: 'iq.pubsub.publish.items', contextField: 'itemType' }
                            ],
                            element: 'entry',
                            fields: {
                                id: dt(null, 'id'),
                                published: ft(null, 'published'),
                                updated: ft(null, 'updated')
                            },
                            namespace: Dt,
                            type: Dt,
                            typeField: 'itemType'
                        },
                        {
                            element: 'summary',
                            fields: { text: ct(), type: Ge('type', 'text') },
                            namespace: Dt,
                            path: 'atomentry.summary'
                        },
                        {
                            element: 'title',
                            fields: { text: ct(), type: Ge('type', 'text') },
                            namespace: Dt,
                            path: 'atomentry.title'
                        },
                        {
                            aliases: [{ path: 'atomentry.links', multiple: !0 }],
                            element: 'link',
                            fields: { href: Ge('href'), mediaType: Ge('type'), rel: Ge('rel') },
                            namespace: Dt
                        },
                        {
                            aliases: [{ path: 'atomentry.authors', multiple: !0 }],
                            element: 'author',
                            fields: {
                                name: dt(null, 'name'),
                                uri: dt(null, 'uri'),
                                email: dt(null, 'email')
                            },
                            namespace: Dt
                        },
                        {
                            aliases: [{ path: 'atomentry.contributors', multiple: !0 }],
                            element: 'contributor',
                            fields: {
                                name: dt(null, 'name'),
                                uri: dt(null, 'uri'),
                                email: dt(null, 'email')
                            },
                            namespace: Dt
                        },
                        {
                            aliases: [{ path: 'atomentry.categories', multiple: !0 }],
                            element: 'category',
                            fields: { term: Ge('term'), scheme: Ge('scheme'), label: Ge('label') },
                            namespace: Dt
                        },
                        {
                            element: 'content',
                            fields: { text: ct(), type: Ge('type', 'text') },
                            namespace: Dt,
                            path: 'atomentry.content'
                        },
                        {
                            element: 'rights',
                            fields: { text: ct(), type: Ge('type', 'text') },
                            namespace: Dt,
                            path: 'atomentry.rights'
                        }
                    ],
                    ta = {
                        defaultType: 'stream',
                        element: 'stream',
                        fields: {
                            from: Ge('from'),
                            id: Ge('id'),
                            lang: pt(),
                            to: Ge('to'),
                            version: Ge('version')
                        },
                        namespace: Qt,
                        path: 'stream',
                        type: 'stream',
                        typeField: 'action'
                    },
                    na = { element: 'features', namespace: Qt, path: 'features' },
                    ia = {
                        element: 'error',
                        fields: {
                            alternateLanguageText: Ct(Wt, 'text'),
                            condition: kt(Wt, Object.values(Ds), Ds.UndefinedCondition),
                            seeOtherHost: dt(Wt, Ds.SeeOtherHost),
                            text: dt(Wt, 'text')
                        },
                        namespace: Qt,
                        path: 'streamError'
                    },
                    sa = Object.values(Ls).map(e => ({
                        aliases: ['stanzaError', 'message.error', 'presence.error', 'iq.error'],
                        defaultType: Ut,
                        element: 'error',
                        fields: {
                            alternateLanguageText: Ct($t, 'text'),
                            by: ai('by'),
                            condition: kt($t, Object.values(Bs), Bs.UndefinedCondition),
                            gone: dt($t, Bs.Gone),
                            redirect: dt($t, Bs.Redirect),
                            text: dt($t, 'text'),
                            type: Ge('type')
                        },
                        namespace: e,
                        type: e,
                        typeField: 'streamType'
                    })),
                    ra = new Set([
                        'from',
                        'id',
                        'lang',
                        'to',
                        'type',
                        'payloadType',
                        'error',
                        'streamType'
                    ]),
                    aa = Object.values(Ls).map(e => ({
                        childrenExportOrder: { error: 2e5 },
                        defaultType: Ut,
                        element: 'iq',
                        fields: {
                            from: ai('from'),
                            id: Ge('id'),
                            lang: pt(),
                            payloadType: {
                                order: -1e4,
                                importer(e, t) {
                                    if ('get' !== t.data.type && 'set' !== t.data.type) return;
                                    if (1 !== e.children.filter(e => 'string' != typeof e).length)
                                        return 'invalid-payload-count';
                                    const n = Object.keys(t.data).filter(e => !ra.has(e));
                                    return 1 !== n.length ? 'unknown-payload' : n[0];
                                }
                            },
                            to: ai('to'),
                            type: Ge('type')
                        },
                        namespace: e,
                        path: 'iq',
                        type: e,
                        typeField: 'streamType'
                    })),
                    oa = Object.values(Ls).map(e => ({
                        childrenExportOrder: { error: 2e5 },
                        defaultType: Ut,
                        element: 'message',
                        fields: { from: ai('from'), id: Ge('id'), lang: pt(), to: ai('to') },
                        namespace: e,
                        path: 'message',
                        type: e,
                        typeField: 'streamType'
                    })),
                    ca = Object.values(Ls).map(e => ({
                        childrenExportOrder: { error: 2e5 },
                        defaultType: Ut,
                        element: 'presence',
                        fields: { from: ai('from'), id: Ge('id'), lang: pt(), to: ai('to') },
                        namespace: e,
                        path: 'presence',
                        type: e,
                        typeField: 'streamType'
                    })),
                    la = [
                        ta,
                        na,
                        ia,
                        ...sa,
                        ...[
                            {
                                element: 'mechanisms',
                                fields: { mechanisms: Ot(null, 'mechanism') },
                                namespace: zt,
                                path: 'features.sasl'
                            },
                            {
                                element: 'abort',
                                namespace: zt,
                                path: 'sasl',
                                type: 'abort',
                                typeField: 'type'
                            },
                            {
                                element: 'auth',
                                fields: { mechanism: Ge('mechanism'), value: ut('base64') },
                                namespace: zt,
                                path: 'sasl',
                                type: 'auth',
                                typeField: 'type'
                            },
                            {
                                element: 'challenge',
                                fields: { value: ut('base64') },
                                namespace: zt,
                                path: 'sasl',
                                type: 'challenge',
                                typeField: 'type'
                            },
                            {
                                element: 'response',
                                fields: { value: ut('base64') },
                                namespace: zt,
                                path: 'sasl',
                                type: 'response',
                                typeField: 'type'
                            },
                            {
                                element: 'success',
                                fields: { value: ut('base64') },
                                namespace: zt,
                                path: 'sasl',
                                type: 'success',
                                typeField: 'type'
                            },
                            {
                                element: 'failure',
                                fields: {
                                    alternateLanguageText: Ct(zt, 'text'),
                                    condition: kt(zt, Object.values(Ms)),
                                    text: dt(zt, 'text')
                                },
                                namespace: zt,
                                path: 'sasl',
                                type: 'failure',
                                typeField: 'type'
                            }
                        ],
                        ...[
                            {
                                aliases: ['features.tls'],
                                defaultType: 'start',
                                element: 'starttls',
                                fields: { required: vt(null, 'required') },
                                namespace: Gt,
                                path: 'tls',
                                type: 'start',
                                typeField: 'type'
                            },
                            {
                                element: 'proceed',
                                namespace: Gt,
                                path: 'tls',
                                type: 'proceed',
                                typeField: 'type'
                            },
                            {
                                element: 'failure',
                                namespace: Gt,
                                path: 'tls',
                                type: 'failure',
                                typeField: 'type'
                            }
                        ],
                        ...aa,
                        ...oa,
                        ...ca,
                        {
                            aliases: ['features.bind', 'iq.bind'],
                            element: 'bind',
                            fields: { jid: dt(null, 'jid'), resource: dt(null, 'resource') },
                            namespace: Bt
                        }
                    ],
                    ua = [
                        hi({
                            rosterPreApproval: vt('urn:xmpp:features:pre-approval', 'sub'),
                            rosterVersioning: vt('urn:xmpp:features:rosterver', 'ver')
                        }),
                        ui({
                            alternateLanguageBodies: Ct(null, 'body'),
                            alternateLanguageSubjects: Ct(null, 'subject'),
                            body: dt(null, 'body'),
                            hasSubject: vt(null, 'subject'),
                            parentThread: it(null, 'thread', 'parent'),
                            subject: dt(null, 'subject'),
                            thread: dt(null, 'thread'),
                            type: Ge('type')
                        }),
                        pi({
                            alternateLanguageStatuses: Ct(null, 'status'),
                            priority: mt(null, 'priority', 0),
                            show: dt(null, 'show'),
                            status: dt(null, 'status'),
                            type: Ge('type')
                        }),
                        {
                            element: 'query',
                            fields: { version: Ge('ver', void 0, { emitEmpty: !0 }) },
                            namespace: 'jabber:iq:roster',
                            path: 'iq.roster'
                        },
                        {
                            aliases: [{ path: 'iq.roster.items', multiple: !0 }],
                            element: 'item',
                            fields: {
                                groups: Ot(null, 'group'),
                                jid: ai('jid'),
                                name: Ge('name'),
                                pending: Ge('ask'),
                                preApproved: He('approved'),
                                subscription: Ge('subscription')
                            },
                            namespace: 'jabber:iq:roster'
                        }
                    ],
                    pa = [
                        {
                            element: 'open',
                            fields: {
                                from: Ge('from'),
                                id: Ge('id'),
                                lang: pt(),
                                to: Ge('to'),
                                version: Ge('version')
                            },
                            namespace: Ht,
                            path: 'stream',
                            type: 'open'
                        },
                        {
                            element: 'close',
                            fields: { seeOtherURI: Ge('see-other-uri') },
                            namespace: Ht,
                            path: 'stream',
                            type: 'close'
                        }
                    ],
                    da = [
                        {
                            aliases: [{ path: 'message.forms', multiple: !0 }],
                            element: 'x',
                            fields: {
                                instructions: Object.assign(
                                    Object.assign({}, Ot(null, 'instructions')),
                                    { exportOrder: 2 }
                                ),
                                reported: Object.assign(
                                    Object.assign({}, Nt(null, 'reported', 'dataformField', !0)),
                                    { exportOrder: 3 }
                                ),
                                title: Object.assign(Object.assign({}, dt(null, 'title')), {
                                    exportOrder: 1
                                }),
                                type: Ge('type')
                            },
                            namespace: Jt,
                            optionalNamespaces: { xdv: jn },
                            path: 'dataform'
                        },
                        {
                            aliases: [
                                { path: 'dataform.fields', multiple: !0 },
                                { path: 'dataform.items.fields', multiple: !0 }
                            ],
                            element: 'field',
                            fields: {
                                description: dt(null, 'desc'),
                                label: Ge('label'),
                                name: Ge('var'),
                                rawValues: Object.assign(Object.assign({}, Ot(null, 'value')), {
                                    exporter: () => null
                                }),
                                required: vt(null, 'required'),
                                type: Ge('type'),
                                value: {
                                    importer(e, t) {
                                        const n = e.getAttribute('type'),
                                            i = Ot(Jt, 'value').importer(e, t),
                                            s = i[0];
                                        switch (n) {
                                            case zs.TextMultiple:
                                            case zs.ListMultiple:
                                            case zs.JIDMultiple:
                                                return i;
                                            case zs.Hidden:
                                            case zs.Fixed:
                                                return 1 === i.length ? s : i;
                                            case zs.Boolean:
                                                if (s) return '1' === s || 'true' === s;
                                                break;
                                            default:
                                                return s;
                                        }
                                    },
                                    exporter(e, t, n) {
                                        const i = Ot(null, 'value');
                                        let s = [];
                                        const r =
                                            n.data && n.data.rawValues
                                                ? n.data.rawValues[0]
                                                : void 0;
                                        if ('boolean' == typeof t)
                                            s =
                                                'true' === r || 'false' === r
                                                    ? [r]
                                                    : [t ? '1' : '0'];
                                        else if (Array.isArray(t))
                                            for (const e of t) s.push(e.toString());
                                        else s = [t.toString()];
                                        i.exporter(e, s, Object.assign({}, n, { namespace: Jt }));
                                    }
                                }
                            },
                            namespace: Jt,
                            path: 'dataformField'
                        },
                        {
                            aliases: [{ path: 'dataform.fields.options', multiple: !0 }],
                            element: 'option',
                            fields: { label: Ge('label'), value: dt(null, 'value') },
                            namespace: Jt
                        },
                        {
                            aliases: [{ path: 'dataform.items', multiple: !0 }],
                            element: 'item',
                            namespace: Jt
                        },
                        {
                            element: 'validate',
                            fields: {
                                listMax: rt(null, 'list-range', 'max'),
                                listMin: rt(null, 'list-range', 'min'),
                                method: kt(null, ['basic', 'open', 'range', 'regex'], 'basic'),
                                rangeMax: it(null, 'range', 'max'),
                                rangeMin: it(null, 'range', 'min'),
                                regex: dt(null, 'regex'),
                                type: Ge('datatype', 'xs:string')
                            },
                            namespace: jn,
                            path: 'dataform.fields.validation'
                        }
                    ],
                    ha = [
                        {
                            aliases: ['presence.legacyLastActivity', 'iq.lastActivity'],
                            element: 'query',
                            fields: { seconds: Je('seconds'), status: ct() },
                            namespace: 'jabber:iq:last'
                        }
                    ],
                    fa = [
                        {
                            element: 'query',
                            fields: {
                                activeList: it(null, 'active', 'name'),
                                defaultList: it(null, 'default', 'name')
                            },
                            namespace: Yt,
                            path: 'iq.privacy'
                        },
                        {
                            aliases: [{ path: 'iq.privacy.lists', multiple: !0 }],
                            element: 'list',
                            fields: { name: Ge('name') },
                            namespace: Yt
                        },
                        {
                            aliases: [{ path: 'iq.privacy.lists.items', multiple: !0 }],
                            element: 'item',
                            fields: {
                                action: Ge('action'),
                                incomingPresence: vt(null, 'presence-in'),
                                iq: vt(null, 'iq'),
                                messages: vt(null, 'message'),
                                order: Je('order'),
                                outgoingPresence: vt(null, 'presence-out'),
                                type: Ge('type'),
                                value: Ge('value')
                            },
                            namespace: Yt
                        }
                    ],
                    ma = [
                        {
                            aliases: ['iq.disco', 'message.disco', 'features.disco'],
                            childrenExportOrder: { identities: 100 },
                            element: 'query',
                            fields: { features: It(null, 'feature', 'var'), node: Ge('node') },
                            namespace: Kt,
                            path: 'disco',
                            type: 'info',
                            typeField: 'type'
                        },
                        {
                            aliases: [{ path: 'disco.identities', selector: 'info', multiple: !0 }],
                            element: 'identity',
                            fields: {
                                category: Ge('category'),
                                lang: pt(),
                                name: Ge('name'),
                                type: Ge('type')
                            },
                            namespace: Kt
                        },
                        {
                            aliases: [{ path: 'disco.items', multiple: !0, selector: 'items' }],
                            element: 'item',
                            fields: { jid: ai('jid'), name: Ge('name'), node: Ge('node') },
                            namespace: Xt
                        },
                        {
                            aliases: [{ path: 'disco.items', multiple: !0, selector: 'info' }],
                            element: 'item',
                            fields: {
                                category: ai('category'),
                                lang: pt(),
                                name: Ge('name'),
                                type: Ge('type')
                            },
                            namespace: Kt
                        },
                        li(Jt, 'x', [{ path: 'disco.extensions', multiple: !0, selector: 'info' }]),
                        li(on, 'set', [{ path: 'disco.paging', selector: 'items' }]),
                        {
                            aliases: ['iq.disco', 'message.disco', 'features.disco'],
                            element: 'query',
                            fields: { node: Ge('node') },
                            namespace: Xt,
                            path: 'disco',
                            type: 'items',
                            typeField: 'type'
                        }
                    ],
                    ga = [
                        ui({ addresses: Nt(Zt, 'addresses', 'extendedAddress', !0) }),
                        pi({ addresses: Nt(Zt, 'addresses', 'extendedAddress', !0) }),
                        {
                            element: 'address',
                            fields: {
                                alternateLanguageDescriptions: Ct(null, 'desc'),
                                delivered: He('delivered'),
                                description: Ge('desc'),
                                jid: ai('jid'),
                                node: Ge('node'),
                                type: Ge('type'),
                                uri: Ge('uri')
                            },
                            namespace: Zt,
                            path: 'extendedAddress'
                        }
                    ],
                    ba = [
                        li(Jt, 'x', [{ path: 'iq.muc.form', selector: 'configure' }]),
                        {
                            defaultType: 'info',
                            element: 'x',
                            fields: { password: dt(null, 'password') },
                            namespace: en,
                            path: 'presence.muc',
                            type: 'join',
                            typeField: 'type'
                        },
                        {
                            aliases: [{ path: 'presence.muc.history', selector: 'join' }],
                            element: 'history',
                            fields: {
                                maxCharacters: Je('maxchars'),
                                maxStanzas: Je('maxstanzas'),
                                seconds: Je('seconds'),
                                since: Ke('since')
                            },
                            namespace: en
                        },
                        {
                            aliases: ['presence.muc', 'message.muc'],
                            defaultType: 'info',
                            element: 'x',
                            fields: {
                                action: kt(null, ['invite', 'decline', 'destroy']),
                                actor: Nt(null, 'item', 'mucactor'),
                                affiliation: it(null, 'item', 'affiliation'),
                                jid: oi(null, 'item', 'jid'),
                                nick: it(null, 'item', 'nick'),
                                password: dt(null, 'password'),
                                reason: _t([
                                    { namespace: null, element: 'item' },
                                    { namespace: null, element: 'reason' }
                                ]),
                                role: it(null, 'item', 'role'),
                                statusCodes: It(null, 'status', 'code')
                            },
                            namespace: sn,
                            type: 'info',
                            typeField: 'type',
                            typeOrder: 1
                        },
                        {
                            element: 'actor',
                            fields: { jid: ai('jid'), nick: Ge('nick') },
                            namespace: sn,
                            path: 'mucactor'
                        },
                        {
                            element: 'destroy',
                            fields: {
                                jid: ai('jid'),
                                password: dt(null, 'password'),
                                reason: dt(null, 'reason')
                            },
                            namespace: sn,
                            path: 'presence.muc.destroy'
                        },
                        {
                            aliases: [{ path: 'message.muc.invite', multiple: !0 }],
                            element: 'invite',
                            fields: {
                                continue: vt(null, 'continue'),
                                from: ai('from'),
                                reason: dt(null, 'reason'),
                                thread: it(null, 'continue', 'thread'),
                                to: ai('to')
                            },
                            namespace: sn
                        },
                        {
                            element: 'decline',
                            fields: { from: ai('from'), reason: dt(null, 'reason'), to: ai('to') },
                            namespace: sn,
                            path: 'message.muc',
                            type: 'decline'
                        },
                        {
                            element: 'query',
                            namespace: tn,
                            path: 'iq.muc',
                            type: 'user-list',
                            typeField: 'type'
                        },
                        {
                            aliases: [
                                { path: 'iq.muc.users', multiple: !0, selector: 'user-list' }
                            ],
                            element: 'item',
                            fields: {
                                affiliation: Ge('affiliation'),
                                jid: ai('jid'),
                                nick: Ge('nick'),
                                reason: dt(null, 'reason'),
                                role: Ge('role')
                            },
                            namespace: tn
                        },
                        {
                            aliases: ['iq.muc.users.actor'],
                            element: 'actor',
                            fields: { jid: ai('jid'), nick: Ge('nick') },
                            namespace: tn
                        },
                        {
                            element: 'query',
                            namespace: nn,
                            path: 'iq.muc',
                            type: 'configure',
                            typeField: 'type'
                        },
                        {
                            aliases: [{ path: 'iq.muc.destroy', selector: 'configure' }],
                            element: 'destroy',
                            fields: {
                                jid: ai('jid'),
                                password: dt(null, 'password'),
                                reason: dt(null, 'reason')
                            },
                            namespace: nn
                        },
                        {
                            element: 'x',
                            fields: {
                                action: qt('invite'),
                                continue: He('continue'),
                                jid: ai('jid'),
                                legacyReason: ct(),
                                password: Ge('password'),
                                reason: Ge('reason'),
                                thread: Ge('thread')
                            },
                            namespace: 'jabber:x:conference',
                            path: 'message.muc',
                            type: 'direct-invite',
                            typeOrder: 2
                        },
                        {
                            element: 'unique',
                            fields: { name: ct() },
                            namespace: 'http://jabber.org/protocol/muc#unique',
                            path: 'iq.muc',
                            type: 'unique'
                        },
                        ui({
                            legacyMUC: {
                                exporter(e, t, n) {
                                    const i = n.registry
                                        ? n.registry.export(
                                              'message.muc',
                                              Object.assign(Object.assign({}, t), {
                                                  type: 'direct-invite'
                                              })
                                          )
                                        : void 0;
                                    i && e.appendChild(i);
                                },
                                exportOrder: 100001,
                                importer(e, t) {
                                    if (!Ce(e, sn, 'x')[0]) return;
                                    const n = Ce(e, 'jabber:x:conference', 'x')[0];
                                    return n && t.registry
                                        ? t.registry.import(
                                              n,
                                              Object.assign(Object.assign({}, t), {
                                                  path: 'message'
                                              })
                                          )
                                        : void 0;
                                },
                                importOrder: -1
                            }
                        })
                    ],
                    ya = [
                        {
                            aliases: ['iq.ibb', 'message.ibb'],
                            element: 'open',
                            fields: {
                                ack: {
                                    importer: (e, t) =>
                                        'message' !== Ge('stanza', 'iq').importer(e, t),
                                    exporter(e, t, n) {
                                        Ge('stanza').exporter(e, t ? 'iq' : 'message', n);
                                    }
                                },
                                blockSize: Je('block-size'),
                                sid: Ge('sid')
                            },
                            namespace: rn,
                            type: 'open',
                            typeField: 'action'
                        },
                        {
                            aliases: ['iq.ibb', 'message.ibb'],
                            element: 'close',
                            fields: { sid: Ge('sid') },
                            namespace: rn,
                            type: 'close',
                            typeField: 'action'
                        },
                        {
                            aliases: ['iq.ibb', 'message.ibb'],
                            element: 'data',
                            fields: { data: ut('base64'), seq: Je('seq'), sid: Ge('sid') },
                            namespace: rn,
                            type: 'data',
                            typeField: 'action'
                        }
                    ],
                    va = [
                        {
                            aliases: [
                                { path: 'bookmarkStorage', impliedType: !0 },
                                { path: 'iq.privateStorage.bookmarks', impliedType: !0 },
                                { path: 'pubsubcontent', contextField: 'itemType' },
                                { path: 'pubsubitem.content', contextField: 'itemType' },
                                { path: 'pubsubeventitem.content', contextField: 'itemType' },
                                { path: 'iq.pubsub.publish.items', contextField: 'itemType' }
                            ],
                            element: 'storage',
                            namespace: 'storage:bookmarks',
                            type: 'storage:bookmarks',
                            typeField: 'itemType'
                        },
                        {
                            aliases: [{ path: 'bookmarkStorage.rooms', multiple: !0 }],
                            element: 'conference',
                            fields: {
                                autoJoin: He('autojoin'),
                                jid: ai('jid'),
                                name: Ge('name'),
                                nick: dt(null, 'nick'),
                                password: dt(null, 'password')
                            },
                            namespace: 'storage:bookmarks'
                        }
                    ],
                    wa = {
                        element: 'query',
                        namespace: 'jabber:iq:private',
                        path: 'iq.privateStorage'
                    },
                    _a = [
                        li(Jt, 'x', ['iq.command.form']),
                        fi({
                            commandError: kt(an, [
                                'bad-action',
                                'bad-locale',
                                'bad-payload',
                                'bad-sessionid',
                                'malformed-action',
                                'session-expired'
                            ])
                        }),
                        {
                            element: 'command',
                            fields: {
                                action: Ge('action'),
                                node: Ge('node'),
                                sid: Ge('sessionid'),
                                status: Ge('status')
                            },
                            namespace: an,
                            path: 'iq.command'
                        },
                        {
                            element: 'actions',
                            fields: {
                                complete: vt(null, 'complete'),
                                execute: Ge('execute'),
                                next: vt(null, 'next'),
                                prev: vt(null, 'prev')
                            },
                            namespace: an,
                            path: 'iq.command.availableActions'
                        },
                        {
                            aliases: [{ path: 'iq.command.notes', multiple: !0 }],
                            element: 'note',
                            fields: { type: Ge('type'), value: ct() },
                            namespace: an
                        }
                    ],
                    xa = 'vcardTemp.records';
                function ja(e, t) {
                    return {
                        aliases: [{ multiple: !0, path: xa }],
                        element: e,
                        fields: { value: ct() },
                        namespace: 'vcard-temp',
                        type: t,
                        typeField: 'type'
                    };
                }
                const Sa = [
                        {
                            aliases: [{ path: 'iq.vcard' }],
                            defaultType: 'vcard-temp',
                            element: 'vCard',
                            fields: { fullName: dt(null, 'FN') },
                            namespace: 'vcard-temp',
                            path: 'vcardTemp',
                            type: 'vcard-temp',
                            typeField: 'format'
                        },
                        {
                            element: 'N',
                            fields: {
                                additional: Object.assign(Object.assign({}, dt(null, 'MIDDLE')), {
                                    order: 3
                                }),
                                family: Object.assign(Object.assign({}, dt(null, 'FAMILY')), {
                                    order: 1
                                }),
                                given: Object.assign(Object.assign({}, dt(null, 'GIVEN')), {
                                    order: 2
                                }),
                                prefix: Object.assign(Object.assign({}, dt(null, 'PREFIX')), {
                                    order: 4
                                }),
                                suffix: Object.assign(Object.assign({}, dt(null, 'SUFFIX')), {
                                    order: 5
                                })
                            },
                            namespace: 'vcard-temp',
                            path: 'vcardTemp.name'
                        },
                        ja('NICKNAME', 'nickname'),
                        ja('BDAY', 'birthday'),
                        ja('JABBERID', 'jid'),
                        ja('TZ', 'timezone'),
                        ja('TITLE', 'title'),
                        ja('ROLE', 'role'),
                        ja('URL', 'url'),
                        ja('NOTE', 'note'),
                        ja('SORT-STRING', 'sort'),
                        ja('UID', 'uid'),
                        ja('REV', 'revision'),
                        ja('PRODID', 'productId'),
                        ja('DESC', 'description'),
                        {
                            aliases: [{ multiple: !0, path: xa }],
                            element: 'EMAIL',
                            fields: {
                                preferred: vt(null, 'PREF'),
                                types: Rt(null, [
                                    ['home', 'HOME'],
                                    ['work', 'WORK'],
                                    ['internet', 'INTERNET']
                                ]),
                                value: dt(null, 'USERID')
                            },
                            namespace: 'vcard-temp',
                            type: 'email'
                        },
                        {
                            aliases: [{ path: xa, multiple: !0 }],
                            element: 'ORG',
                            fields: {
                                units: Object.assign(Object.assign({}, Ot(null, 'ORGUNIT')), {
                                    order: 2
                                }),
                                value: Object.assign(Object.assign({}, dt(null, 'ORGNAME')), {
                                    order: 1
                                })
                            },
                            namespace: 'vcard-temp',
                            type: 'organization',
                            typeField: 'type'
                        },
                        {
                            aliases: [{ multiple: !0, path: xa }],
                            element: 'ADR',
                            fields: {
                                city: dt(null, 'LOCALITY'),
                                code: dt(null, 'PCODE'),
                                country: dt(null, 'CTRY'),
                                pobox: dt(null, 'POBOX'),
                                preferred: vt(null, 'PREF'),
                                region: dt(null, 'REGION'),
                                street: dt(null, 'STREET'),
                                street2: dt(null, 'EXTADD'),
                                types: Rt(null, [
                                    ['home', 'HOME'],
                                    ['work', 'WORK'],
                                    ['domestic', 'DOM'],
                                    ['international', 'INTL'],
                                    ['postal', 'POSTAL'],
                                    ['parcel', 'PARCEL']
                                ])
                            },
                            namespace: 'vcard-temp',
                            type: 'address',
                            typeField: 'type'
                        },
                        {
                            aliases: [{ multiple: !0, path: xa }],
                            element: 'LABEL',
                            fields: {
                                lines: Ot(null, 'LINE'),
                                preferred: vt(null, 'PREF'),
                                types: Rt(null, [
                                    ['home', 'HOME'],
                                    ['work', 'WORK']
                                ])
                            },
                            namespace: 'vcard-temp',
                            type: 'addressLabel',
                            typeField: 'type'
                        },
                        {
                            aliases: [{ multiple: !0, path: xa }],
                            element: 'TEL',
                            fields: {
                                preferred: vt(null, 'PREF'),
                                types: Rt(null, [
                                    ['home', 'HOME'],
                                    ['work', 'WORK'],
                                    ['cell', 'CELL'],
                                    ['fax', 'FAX'],
                                    ['voice', 'VOICE'],
                                    ['msg', 'MSG']
                                ]),
                                value: dt(null, 'NUMBER', '', !0)
                            },
                            namespace: 'vcard-temp',
                            type: 'tel',
                            typeField: 'type'
                        },
                        {
                            aliases: [{ multiple: !0, path: xa }],
                            element: 'PHOTO',
                            fields: {
                                data: dt(null, 'BINVAL'),
                                mediaType: dt(null, 'TYPE'),
                                url: dt(null, 'EXTVAL')
                            },
                            namespace: 'vcard-temp',
                            type: 'photo',
                            typeField: 'type'
                        },
                        {
                            aliases: [{ multiple: !0, path: xa }],
                            element: 'LOGO',
                            fields: {
                                data: dt(null, 'BINVAL'),
                                mediaType: dt(null, 'TYPE'),
                                url: dt(null, 'EXTVAL')
                            },
                            namespace: 'vcard-temp',
                            type: 'logo',
                            typeField: 'type'
                        },
                        {
                            aliases: [{ multiple: !0, path: xa }],
                            element: 'CATEGORIES',
                            fields: { value: Ot(null, 'KEYWORD') },
                            namespace: 'vcard-temp',
                            type: 'categories',
                            typeField: 'type'
                        }
                    ],
                    ka = [
                        li(Jt, 'x', ['iq.search.form']),
                        li(on, 'set', ['iq.search.paging']),
                        {
                            element: 'query',
                            fields: {
                                email: dt(null, 'email'),
                                familyName: dt(null, 'last'),
                                givenName: dt(null, 'first'),
                                instructions: dt(null, 'instructions'),
                                nick: dt(null, 'nick')
                            },
                            namespace: 'jabber:iq:search',
                            path: 'iq.search'
                        },
                        {
                            aliases: [{ path: 'iq.search.items', multiple: !0 }],
                            element: 'item',
                            fields: {
                                email: dt(null, 'email'),
                                familyName: dt(null, 'last'),
                                givenName: dt(null, 'first'),
                                jid: ai('jid'),
                                nick: dt(null, 'nick')
                            },
                            namespace: 'jabber:iq:search'
                        }
                    ],
                    Ta = {
                        aliases: ['iq.pubsub.paging'],
                        element: 'set',
                        fields: {
                            after: dt(null, 'after'),
                            before: dt(null, 'before'),
                            count: mt(null, 'count'),
                            first: dt(null, 'first'),
                            firstIndex: rt(null, 'first', 'index'),
                            index: mt(null, 'index'),
                            last: dt(null, 'last'),
                            max: mt(null, 'max')
                        },
                        namespace: on,
                        path: 'paging'
                    },
                    Oa = {
                        configurable: vt(null, 'subscribe-options'),
                        configurationRequired: jt([
                            { namespace: null, element: 'subscribe-options' },
                            { namespace: null, element: 'required' }
                        ]),
                        jid: ai('jid'),
                        node: Ge('node'),
                        state: Ge('subscription'),
                        subid: Ge('subid')
                    },
                    Ia = { node: Ge('node') },
                    Ea = [
                        {
                            aliases: ['pubsub', 'iq.pubsub', 'message.pubsub'],
                            childrenExportOrder: {
                                configure: 0,
                                create: 100,
                                publish: 100,
                                subscribe: 100,
                                subscriptionOptions: 0
                            },
                            defaultType: 'user',
                            element: 'pubsub',
                            fields: { publishOptions: Nt(null, 'publish-options', 'dataform') },
                            namespace: cn,
                            type: 'user',
                            typeField: 'context'
                        },
                        {
                            aliases: ['pubsub', 'iq.pubsub', 'message.pubsub'],
                            defaultType: 'user',
                            element: 'pubsub',
                            fields: { purge: it(null, 'purge', 'node') },
                            namespace: pn,
                            type: 'owner',
                            typeField: 'context'
                        },
                        li(Jt, 'x', [
                            'iq.pubsub.configure.form',
                            'iq.pubsub.defaultConfiguration.form',
                            'iq.pubsub.defaultSubscriptionOptions.form',
                            'iq.pubsub.subscriptionOptions.form',
                            'message.pubsub.configuration.form'
                        ]),
                        li(on, 'set', ['iq.pubsub.fetch.paging']),
                        fi({
                            pubsubError: kt(ln, Object.values($s)),
                            pubsubUnsupportedFeature: it(ln, 'unsupported', 'feature')
                        }),
                        {
                            element: 'subscribe',
                            fields: { jid: ai('jid'), node: Ge('node') },
                            namespace: cn,
                            path: 'iq.pubsub.subscribe'
                        },
                        {
                            element: 'unsubscribe',
                            fields: { jid: ai('jid'), node: Ge('node'), subid: Ge('subid') },
                            namespace: cn,
                            path: 'iq.pubsub.unsubscribe'
                        },
                        {
                            element: 'options',
                            fields: { jid: ai('jid'), node: Ge('node'), subid: Ge('subid') },
                            namespace: cn,
                            path: 'iq.pubsub.subscriptionOptions'
                        },
                        {
                            aliases: [
                                {
                                    path: 'iq.pubsub.subscriptions',
                                    selector: 'user',
                                    impliedType: !0
                                }
                            ],
                            element: 'subscriptions',
                            fields: { jid: ai('jid'), node: Ge('node') },
                            namespace: cn,
                            type: 'user'
                        },
                        {
                            aliases: [
                                {
                                    path: 'iq.pubsub.subscriptions',
                                    selector: 'owner',
                                    impliedType: !0
                                }
                            ],
                            element: 'subscriptions',
                            fields: { jid: ai('jid'), node: Ge('node') },
                            namespace: pn,
                            type: 'owner'
                        },
                        {
                            aliases: [
                                { path: 'iq.pubsub.subscription', selector: 'owner' },
                                {
                                    impliedType: !0,
                                    multiple: !0,
                                    path: 'iq.pubsub.subscriptions.items',
                                    selector: 'owner'
                                }
                            ],
                            element: 'subscription',
                            fields: Oa,
                            namespace: cn
                        },
                        {
                            aliases: [
                                { path: 'iq.pubsub.subscription', selector: 'user' },
                                {
                                    impliedType: !0,
                                    multiple: !0,
                                    path: 'iq.pubsub.subscriptions.items',
                                    selector: 'user'
                                }
                            ],
                            element: 'subscription',
                            fields: Oa,
                            namespace: cn,
                            type: 'user'
                        },
                        {
                            aliases: [
                                {
                                    impliedType: !0,
                                    multiple: !0,
                                    path: 'iq.pubsub.subscriptions.items',
                                    selector: 'owner'
                                }
                            ],
                            element: 'subscription',
                            fields: Oa,
                            namespace: pn,
                            type: 'owner'
                        },
                        {
                            aliases: [
                                {
                                    path: 'iq.pubsub.affiliations',
                                    selector: 'user',
                                    impliedType: !0
                                },
                                {
                                    path: 'message.pubsub.affiliations',
                                    selector: 'user',
                                    impliedType: !0
                                }
                            ],
                            element: 'affiliations',
                            fields: Ia,
                            namespace: cn,
                            type: 'user'
                        },
                        {
                            aliases: [
                                {
                                    path: 'iq.pubsub.affiliations',
                                    selector: 'owner',
                                    impliedType: !0
                                }
                            ],
                            element: 'affiliations',
                            fields: Ia,
                            namespace: pn,
                            type: 'owner'
                        },
                        {
                            aliases: [
                                {
                                    impliedType: !0,
                                    multiple: !0,
                                    path: 'iq.pubsub.affiliations.items',
                                    selector: 'user'
                                },
                                {
                                    impliedType: !0,
                                    multiple: !0,
                                    path: 'message.pubsub.affiliations.items',
                                    selector: 'user'
                                }
                            ],
                            element: 'affiliation',
                            fields: {
                                affiliation: Ge('affiliation'),
                                jid: ai('jid'),
                                node: Ge('node')
                            },
                            namespace: cn,
                            type: 'user'
                        },
                        {
                            aliases: [
                                {
                                    impliedType: !0,
                                    multiple: !0,
                                    path: 'iq.pubsub.affiliations.items',
                                    selector: 'owner'
                                }
                            ],
                            element: 'affiliation',
                            fields: {
                                affiliation: Ge('affiliation'),
                                jid: ai('jid'),
                                node: Ge('node')
                            },
                            namespace: pn,
                            type: 'owner'
                        },
                        { element: 'create', fields: Ia, namespace: cn, path: 'iq.pubsub.create' },
                        {
                            aliases: [{ path: 'iq.pubsub.destroy', selector: 'owner' }],
                            element: 'delete',
                            fields: { node: Ge('node'), redirect: it(null, 'redirect', 'uri') },
                            namespace: pn
                        },
                        {
                            aliases: [
                                { path: 'iq.pubsub.configure', selector: 'owner', impliedType: !0 }
                            ],
                            element: 'configure',
                            fields: Ia,
                            namespace: pn,
                            type: 'owner'
                        },
                        {
                            aliases: [
                                { path: 'iq.pubsub.configure', selector: 'user', impliedType: !0 }
                            ],
                            element: 'configure',
                            fields: Ia,
                            namespace: cn,
                            type: 'user'
                        },
                        {
                            element: 'default',
                            fields: { node: Ge('node') },
                            namespace: cn,
                            path: 'iq.pubsub.defaultSubscriptionOptions'
                        },
                        {
                            element: 'default',
                            fields: {},
                            namespace: pn,
                            path: 'iq.pubsub.defaultConfiguration'
                        },
                        {
                            element: 'publish',
                            fields: Ia,
                            namespace: cn,
                            path: 'iq.pubsub.publish'
                        },
                        {
                            element: 'retract',
                            fields: {
                                id: it(null, 'item', 'id'),
                                node: Ge('node'),
                                notify: He('notify')
                            },
                            namespace: cn,
                            path: 'iq.pubsub.retract'
                        },
                        {
                            element: 'items',
                            fields: { max: Je('max_items'), node: Ge('node') },
                            namespace: cn,
                            path: 'iq.pubsub.fetch'
                        },
                        {
                            aliases: [
                                'pubsubitem',
                                'iq.pubsub.publish.item',
                                { multiple: !0, path: 'iq.pubsub.fetch.items' }
                            ],
                            element: 'item',
                            fields: { id: Ge('id'), publisher: ai('publisher') },
                            namespace: cn
                        },
                        {
                            element: 'event',
                            fields: {
                                eventType: kt(null, [
                                    'purge',
                                    'delete',
                                    'subscription',
                                    'configuration',
                                    'items'
                                ])
                            },
                            namespace: un,
                            path: 'message.pubsub',
                            type: 'event',
                            typeField: 'context'
                        },
                        {
                            aliases: [{ path: 'message.pubsub.items.published', multiple: !0 }],
                            element: 'item',
                            fields: { id: Ge('id'), publisher: ai('publisher') },
                            namespace: un,
                            path: 'pubsubeventitem'
                        },
                        {
                            element: 'purge',
                            fields: Ia,
                            namespace: un,
                            path: 'message.pubsub.purge'
                        },
                        {
                            element: 'delete',
                            fields: { node: Ge('node'), redirect: it(null, 'redirect', 'uri') },
                            namespace: un,
                            path: 'message.pubsub.delete'
                        },
                        {
                            aliases: [
                                {
                                    path: 'message.pubsub.subscription',
                                    selector: 'event',
                                    impliedType: !0
                                }
                            ],
                            element: 'subscription',
                            fields: {
                                expires:
                                    ((Ca = 'expiry'),
                                    {
                                        importer(e) {
                                            const t = e.getAttribute(Ca);
                                            return 'presence' === t ? t : t ? new Date(t) : void 0;
                                        },
                                        exporter(e, t) {
                                            let n;
                                            (n = 'string' == typeof t ? t : t.toISOString()),
                                                e.setAttribute(Ca, n);
                                        }
                                    }),
                                jid: ai('jid'),
                                node: Ge('node'),
                                subid: Ge('subid'),
                                type: Ge('subscription')
                            },
                            namespace: un,
                            type: 'event'
                        },
                        {
                            element: 'configuration',
                            fields: Ia,
                            namespace: un,
                            path: 'message.pubsub.configuration'
                        },
                        {
                            element: 'items',
                            fields: { node: Ge('node'), retracted: It(null, 'retract', 'id') },
                            namespace: un,
                            path: 'message.pubsub.items'
                        }
                    ];
                var Ca;
                const Ra = [
                        {
                            element: 'query',
                            fields: {
                                activate: dt(null, 'activate'),
                                address: Ge('dstaddr'),
                                candidateUsed: oi(null, 'streamhost-used', 'jid'),
                                mode: Ge('mode', 'tcp'),
                                sid: Ge('sid'),
                                udpSuccess: it(null, 'udpsuccess', 'dstaddr')
                            },
                            namespace: dn,
                            path: 'iq.socks5'
                        },
                        {
                            aliases: [{ multiple: !0, path: 'iq.socks5.candidates' }],
                            element: 'streamhost',
                            fields: {
                                host: Ge('host'),
                                jid: ai('jid'),
                                port: Je('port'),
                                uri: Ge('uri')
                            },
                            namespace: dn
                        }
                    ],
                    Na = [
                        {
                            aliases: [{ multiple: !0, path: 'message.links' }],
                            element: 'x',
                            fields: { description: dt(null, 'desc'), url: dt(null, 'url') },
                            namespace: hn
                        },
                        {
                            element: 'query',
                            fields: { description: dt(null, 'desc'), url: dt(null, 'url') },
                            namespace: 'jabber:iq:oob',
                            path: 'iq.transferLink'
                        }
                    ],
                    qa = {
                        element: 'html',
                        fields: {
                            alternateLanguageBodies: Ft(fn, 'body', 'xhtmlim'),
                            body: At(fn, 'body', 'xhtmlim')
                        },
                        namespace: mn,
                        path: 'message.html'
                    },
                    Aa = [
                        hi({
                            inbandRegistration: vt(
                                'http://jabber.org/features/iq-register',
                                'register'
                            )
                        }),
                        li(Jt, 'x', ['iq.account.form']),
                        li(hn, 'x', ['iq.account.registrationLink']),
                        {
                            element: 'query',
                            fields: {
                                address: dt(null, 'address'),
                                date: ft(null, 'date'),
                                email: dt(null, 'email'),
                                familyName: dt(null, 'last'),
                                fullName: dt(null, 'name'),
                                givenName: dt(null, 'first'),
                                instructions: dt(null, 'instructions'),
                                key: dt(null, 'key'),
                                locality: dt(null, 'city'),
                                misc: dt(null, 'misc'),
                                nick: dt(null, 'nick'),
                                password: dt(null, 'password'),
                                phone: dt(null, 'phone'),
                                postalCode: dt(null, 'zip'),
                                region: dt(null, 'state'),
                                registered: vt(null, 'registered'),
                                remove: vt(null, 'remove'),
                                text: dt(null, 'text'),
                                uri: dt(null, 'uri'),
                                username: dt(null, 'username')
                            },
                            namespace: 'jabber:iq:register',
                            path: 'iq.account'
                        }
                    ],
                    Fa = {
                        aliases: [
                            { path: 'message.geoloc', impliedType: !0 },
                            { path: 'dataform.fields.geoloc', impliedType: !0 },
                            { path: 'pubsubcontent', contextField: 'itemType' },
                            { path: 'pubsubitem.content', contextField: 'itemType' },
                            { path: 'pubsubeventitem.content', contextField: 'itemType' },
                            { path: 'iq.pubsub.publish.items', contextField: 'itemType' }
                        ],
                        element: 'geoloc',
                        fields: {
                            accuracy: gt(null, 'accuracy'),
                            altitude: gt(null, 'alt'),
                            altitudeAccuracy: gt(null, 'altaccuracy'),
                            area: dt(null, 'area'),
                            building: dt(null, 'building'),
                            country: dt(null, 'country'),
                            countryCode: dt(null, 'countrycode'),
                            datum: dt(null, 'datum'),
                            description: dt(null, 'description'),
                            error: gt(null, 'error'),
                            floor: dt(null, 'floor'),
                            heading: gt(null, 'bearing'),
                            lang: pt(),
                            latitude: gt(null, 'lat'),
                            locality: dt(null, 'locality'),
                            longitude: gt(null, 'lon'),
                            postalCode: dt(null, 'postalcode'),
                            region: dt(null, 'region'),
                            room: dt(null, 'room'),
                            speed: gt(null, 'speed'),
                            street: dt(null, 'street'),
                            text: dt(null, 'text'),
                            timestamp: ft(null, 'timestamp'),
                            tzo: yt(null, 'tzo'),
                            uri: dt(null, 'uri')
                        },
                        namespace: gn,
                        type: gn
                    },
                    Pa = [
                        {
                            aliases: [
                                { path: 'pubsubcontent', contextField: 'itemType' },
                                { path: 'pubsubitem.content', contextField: 'itemType' },
                                { path: 'pubsubeventitem.content', contextField: 'itemType' },
                                { path: 'iq.pubsub.publish.items', contextField: 'itemType' }
                            ],
                            element: 'data',
                            fields: { data: ut('base64') },
                            namespace: bn,
                            path: 'avatar',
                            type: bn,
                            typeField: 'itemType'
                        },
                        {
                            aliases: [
                                { path: 'pubsubcontent', contextField: 'itemType' },
                                { path: 'pubsubitem.content', contextField: 'itemType' },
                                { path: 'pubsubeventitem.content', contextField: 'itemType' },
                                { path: 'iq.pubsub.publish.items', contextField: 'itemType' }
                            ],
                            element: 'metadata',
                            namespace: yn,
                            path: 'avatar',
                            type: yn,
                            typeField: 'itemType'
                        },
                        {
                            aliases: [{ multiple: !0, path: 'avatar.versions', selector: yn }],
                            element: 'info',
                            fields: {
                                bytes: Je('bytes'),
                                height: Je('height'),
                                id: Ge('id'),
                                mediaType: Ge('type'),
                                uri: Ge('url'),
                                width: Je('width')
                            },
                            namespace: yn
                        },
                        {
                            aliases: [{ multiple: !0, path: 'avatar.pointers', selector: yn }],
                            element: 'pointer',
                            fields: {
                                bytes: Je('bytes'),
                                height: Je('height'),
                                id: Ge('id'),
                                mediaType: Ge('type'),
                                uri: Ge('url'),
                                width: Je('width')
                            },
                            namespace: yn
                        }
                    ];
                var La = ui({ chatState: kt(vn, Object.values(Qs)) });
                const Ma = {
                        element: 'query',
                        fields: {
                            name: dt(null, 'name'),
                            os: dt(null, 'os'),
                            version: dt(null, 'version')
                        },
                        namespace: 'jabber:iq:version',
                        path: 'iq.softwareVersion'
                    },
                    Da = {
                        aliases: [
                            { path: 'message.mood', impliedType: !0 },
                            { path: 'pubsubcontent', contextField: 'itemType' },
                            { path: 'pubsubitem.content', contextField: 'itemType' },
                            { path: 'pubsubeventitem.content', contextField: 'itemType' },
                            { path: 'iq.pubsub.publish.items', contextField: 'itemType' }
                        ],
                        element: 'mood',
                        fields: {
                            alternateLanguageText: Ct(null, 'text'),
                            text: dt(null, 'text'),
                            value: kt(null, Xs)
                        },
                        namespace: wn,
                        type: wn
                    },
                    Ba = {
                        aliases: [
                            { path: 'activity', impliedType: !0 },
                            { path: 'pubsubcontent', contextField: 'itemType' },
                            { path: 'pubsubitem.content', contextField: 'itemType' },
                            { path: 'pubsubeventitem.content', contextField: 'itemType' },
                            { path: 'iq.pubsub.publish.items', contextField: 'itemType' }
                        ],
                        element: 'activity',
                        fields: {
                            activity: Tt(null, Zs, er),
                            alternateLanguageText: Ct(null, 'text'),
                            text: dt(null, 'text')
                        },
                        namespace: _n,
                        type: _n
                    },
                    Ua = {
                        element: 'handshake',
                        fields: { value: ut('hex') },
                        namespace: 'jabber:component:accept',
                        path: 'handshake'
                    },
                    za = {
                        aliases: [
                            { path: 'presence.legacyCapabilities', multiple: !0 },
                            { path: 'features.legacyCapabilities', multiple: !0 }
                        ],
                        element: 'c',
                        fields: {
                            algorithm: Ge('hash'),
                            legacy: qt(!0),
                            node: Ge('node'),
                            value: Ge('ver')
                        },
                        namespace: 'http://jabber.org/protocol/caps'
                    },
                    Va = {
                        aliases: [
                            { impliedType: !0, path: 'tune' },
                            { path: 'pubsubcontent', contextField: 'itemType' },
                            { path: 'pubsubitem.content', contextField: 'itemType' },
                            { path: 'pubsubeventitem.content', contextField: 'itemType' },
                            { path: 'iq.pubsub.publish.items', contextField: 'itemType' }
                        ],
                        element: 'tune',
                        fields: {
                            artist: dt(null, 'artist'),
                            length: mt(null, 'length'),
                            rating: mt(null, 'rating'),
                            source: dt(null, 'source'),
                            title: dt(null, 'title'),
                            track: dt(null, 'track'),
                            uri: dt(null, 'uri')
                        },
                        namespace: xn,
                        type: xn
                    },
                    $a = [
                        'dataformLayout',
                        { multiple: !0, path: 'dataformLayout.contents' },
                        { multiple: !0, path: 'dataform.layout.contents' }
                    ],
                    Qa = [
                        {
                            aliases: [{ multiple: !0, path: 'dataform.layout' }],
                            element: 'page',
                            fields: { label: Ge('label') },
                            namespace: On
                        },
                        {
                            aliases: $a,
                            element: 'section',
                            fields: { label: Ge('label') },
                            namespace: On,
                            type: 'section',
                            typeField: 'type'
                        },
                        {
                            aliases: $a,
                            element: 'text',
                            fields: { value: ct() },
                            namespace: On,
                            type: 'text',
                            typeField: 'type'
                        },
                        {
                            aliases: $a,
                            element: 'fieldref',
                            fields: { field: Ge('var') },
                            namespace: On,
                            type: 'fieldref',
                            typeField: 'type'
                        },
                        {
                            aliases: $a,
                            element: 'reportedref',
                            namespace: On,
                            type: 'reportedref',
                            typeField: 'type'
                        }
                    ],
                    Wa = {
                        element: 'body',
                        fields: {
                            acceptMediaTypes: Ge('accept'),
                            ack: Je('ack'),
                            authId: Ge('authid'),
                            characterSets: Ge('charsets'),
                            condition: Ge('condition'),
                            from: ai('from'),
                            key: Ge('key'),
                            lang: pt(),
                            maxClientRequests: Je('requests'),
                            maxHoldOpen: Je('hold'),
                            maxInactivityTime: Je('inactivity'),
                            maxSessionPause: Je('maxpause'),
                            maxWaitTime: Je('wait'),
                            mediaType: Ge('content'),
                            minPollingInterval: Je('polling'),
                            newKey: Ge('newkey'),
                            pauseSession: Je('pause'),
                            report: Je('report'),
                            rid: Je('rid'),
                            route: Ge('string'),
                            seeOtherURI: dt(null, 'uri'),
                            sid: Ge('sid'),
                            stream: Ge('stream'),
                            time: Je('time'),
                            to: ai('to'),
                            type: Ge('type'),
                            version: Ge('ver'),
                            xmppRestart: Ze('xmpp', 'urn:xmpp:xbosh', 'restart', void 0, {
                                writeValue: e => (e ? 'true' : 'false')
                            }),
                            xmppRestartLogic: Ze('xmpp', 'urn:xmpp:xbosh', 'restartlogic', void 0, {
                                writeValue: e => (e ? 'true' : 'false')
                            }),
                            xmppVersion: Xe('xmpp', 'urn:xmpp:xbosh', 'version')
                        },
                        namespace: Sn,
                        path: 'bosh'
                    },
                    Ga = [
                        ui({ headers: Nt(kn, 'headers', 'header', !0) }),
                        pi({ headers: Nt(kn, 'headers', 'header', !0) }),
                        {
                            element: 'header',
                            fields: { name: Ge('name'), value: ct() },
                            namespace: kn,
                            path: 'header'
                        }
                    ],
                    Ha = [
                        {
                            element: 'compression',
                            fields: { methods: Ot(null, 'method') },
                            namespace: 'http://jabber.org/features/compress',
                            path: 'features.compression'
                        },
                        {
                            element: 'compress',
                            fields: { method: dt(null, 'method') },
                            namespace: Tn,
                            path: 'compression',
                            type: 'start',
                            typeField: 'type'
                        },
                        {
                            aliases: ['error.compressionError'],
                            element: 'failure',
                            fields: {
                                condition: kt(null, [
                                    'unsupported-method',
                                    'setup-failed',
                                    'processing-failed'
                                ])
                            },
                            namespace: Tn,
                            path: 'compression',
                            type: 'failure',
                            typeField: 'type'
                        },
                        {
                            element: 'compressed',
                            namespace: Tn,
                            path: 'compression',
                            type: 'success',
                            typeField: 'type'
                        }
                    ],
                    Ja = [
                        ui({ rosterExchange: Nt(In, 'x', 'rosterExchange', !0) }),
                        di({ rosterExchange: Nt(In, 'x', 'rosterExchange', !0) }),
                        {
                            element: 'item',
                            fields: {
                                action: Ge('action'),
                                groups: Ot(null, 'group'),
                                jid: ai('jid'),
                                name: Ge('name')
                            },
                            namespace: In,
                            path: 'rosterExchange'
                        }
                    ];
                var Ya = pi({
                    vcardAvatar: {
                        importer(e) {
                            const t = Ce(e, 'vcard-temp:x:update', 'x');
                            if (!t.length) return;
                            const n = Ce(t[0], 'vcard-temp:x:update', 'photo');
                            return !n.length || n[0].getText();
                        },
                        exporter(e, t) {
                            const n = Re(e, 'vcard-temp:x:update', 'x');
                            if ('' === t) Re(n, 'vcard-temp:x:update', 'photo');
                            else {
                                if (!0 === t) return;
                                if (t) {
                                    Re(n, 'vcard-temp:x:update', 'photo').children.push(t);
                                }
                            }
                        }
                    }
                });
                const Ka = [
                        ui({ captcha: Nt('urn:xmpp:captcha', 'captcha', 'dataform') }),
                        di({ captcha: Nt('urn:xmpp:captcha', 'captcha', 'dataform') })
                    ],
                    Xa = [
                        fi({ jingleError: kt('urn:xmpp:jingle:errors:1', Object.values(Ys)) }),
                        {
                            element: 'jingle',
                            fields: {
                                action: Ge('action'),
                                initiator: ai('initiator'),
                                responder: ai('responder'),
                                sid: Ge('sid')
                            },
                            namespace: Cn,
                            path: 'iq.jingle'
                        },
                        {
                            aliases: [{ multiple: !0, path: 'iq.jingle.contents' }],
                            element: 'content',
                            fields: {
                                creator: Ge('creator'),
                                disposition: Ge('disposition', 'session'),
                                name: Ge('name'),
                                senders: Ge('senders', 'both')
                            },
                            namespace: Cn
                        },
                        {
                            element: 'reason',
                            fields: {
                                alternativeSession: dt(null, 'alternative-session'),
                                condition: kt(null, Object.values(Ks)),
                                text: dt(null, 'text')
                            },
                            namespace: Cn,
                            path: 'iq.jingle.reason'
                        }
                    ];
                function Za() {
                    return {
                        importer(e, t) {
                            let n = Ce(e, $n, 'rtcp-fb');
                            const i = Ge('type').importer,
                                s = Ge('subtype').importer,
                                r = Ge('value').importer,
                                a = [];
                            for (const e of n) {
                                const n = i(e, t),
                                    r = s(e, t);
                                a.push(r ? { type: n, parameter: r } : { type: n });
                            }
                            n = Ce(e, $n, 'rtcp-fb-trr-int');
                            for (const e of n) {
                                const n = r(e, t);
                                a.push(n ? { type: 'trr-int', parameter: n } : { type: 'trr-int' });
                            }
                            return a;
                        },
                        exporter(e, t, n) {
                            const i = Ge('type').exporter,
                                s = Ge('subtype').exporter,
                                r = Ge('value').exporter;
                            for (const a of t) {
                                let t;
                                'trr-int' === a.type
                                    ? ((t = Oe($n, 'rtcp-fb-trr-int', n.namespace, e)),
                                      a.parameter && r(t, a.parameter, n))
                                    : ((t = Oe($n, 'rtcp-fb', n.namespace, e)),
                                      i(t, a.type, n),
                                      a.parameter && s(t, a.parameter, n)),
                                    e.appendChild(t);
                            }
                        }
                    };
                }
                const eo = 'iq.jingle.info',
                    to = [
                        {
                            aliases: ['iq.jingle.contents.application'],
                            childrenExportOrder: {
                                codecs: 4,
                                encryption: 5,
                                headerExtensions: 6,
                                sourceGroups: 8,
                                sources: 7,
                                streams: 9
                            },
                            element: 'description',
                            fields: {
                                media: Ge('media'),
                                rtcpFeedback: Object.assign(Object.assign({}, Za()), {
                                    exportOrder: 3
                                }),
                                rtcpMux: Object.assign(Object.assign({}, vt(null, 'rtcp-mux')), {
                                    exportOrder: 1
                                }),
                                rtcpReducedSize: Object.assign(
                                    Object.assign({}, vt(null, 'rtcp-reduced-size')),
                                    { exportOrder: 2 }
                                ),
                                ssrc: Ge('ssrc')
                            },
                            namespace: Rn,
                            optionalNamespaces: { rtcpf: $n, rtph: Qn },
                            type: Rn
                        },
                        {
                            aliases: [
                                {
                                    multiple: !0,
                                    path: 'iq.jingle.contents.application.headerExtensions',
                                    selector: Rn
                                }
                            ],
                            element: 'rtp-hdrext',
                            fields: { id: Je('id'), senders: Ge('senders'), uri: Ge('uri') },
                            namespace: Qn
                        },
                        {
                            aliases: [
                                {
                                    multiple: !0,
                                    path: 'iq.jingle.contents.application.codecs',
                                    selector: Rn
                                },
                                'rtpcodec'
                            ],
                            element: 'payload-type',
                            fields: {
                                channels: Je('channels'),
                                clockRate: Je('clockrate'),
                                id: Ge('id'),
                                maxptime: Je('maxptime'),
                                name: Ge('name'),
                                parameters: Pt(Rn, 'parameter', 'name', 'value'),
                                ptime: Je('ptime'),
                                rtcpFeedback: Za()
                            },
                            namespace: Rn
                        },
                        {
                            aliases: [
                                {
                                    multiple: !0,
                                    path: 'iq.jingle.contents.application.sources',
                                    selector: Rn
                                }
                            ],
                            element: 'source',
                            fields: {
                                parameters: Pt(
                                    'urn:xmpp:jingle:apps:rtp:ssma:0',
                                    'parameter',
                                    'name',
                                    'value'
                                ),
                                ssrc: Ge('ssrc')
                            },
                            namespace: 'urn:xmpp:jingle:apps:rtp:ssma:0'
                        },
                        {
                            aliases: [
                                {
                                    multiple: !0,
                                    path: 'iq.jingle.contents.application.sourceGroups',
                                    selector: Rn
                                }
                            ],
                            element: 'ssrc-group',
                            fields: {
                                semantics: Ge('semantics'),
                                sources: It(null, 'source', 'ssrc')
                            },
                            namespace: 'urn:xmpp:jingle:apps:rtp:ssma:0'
                        },
                        {
                            aliases: [
                                {
                                    multiple: !0,
                                    path: 'iq.jingle.contents.application.streams',
                                    selector: Rn
                                }
                            ],
                            element: 'stream',
                            fields: { id: Ge('id'), track: Ge('track') },
                            namespace: 'urn:xmpp:jingle:apps:rtp:msid:0'
                        },
                        {
                            aliases: [
                                { path: 'iq.jingle.contents.application.encryption', selector: Rn }
                            ],
                            element: 'encryption',
                            fields: { required: He('required') },
                            namespace: Rn
                        },
                        {
                            aliases: [
                                {
                                    multiple: !0,
                                    path: 'iq.jingle.contents.application.encryption.sdes',
                                    selector: Rn
                                }
                            ],
                            element: 'crypto',
                            fields: {
                                cryptoSuite: Ge('crypto-suite'),
                                keyParameters: Ge('key-params'),
                                sessionParameters: Ge('session-params'),
                                tag: Je('tag')
                            },
                            namespace: Rn
                        },
                        {
                            aliases: [
                                {
                                    path: 'iq.jingle.contents.application.encryption.zrtp',
                                    selector: Rn
                                }
                            ],
                            element: 'zrtp-hash',
                            fields: { value: ut('hex'), version: Ge('version') },
                            namespace: Rn
                        },
                        {
                            element: 'mute',
                            fields: { creator: Ge('creator'), name: Ge('name') },
                            namespace: Nn,
                            path: eo,
                            type: nr
                        },
                        {
                            element: 'unmute',
                            fields: { creator: Ge('creator'), name: Ge('name') },
                            namespace: Nn,
                            path: eo,
                            type: ir
                        },
                        { element: 'hold', namespace: Nn, path: eo, type: sr },
                        { element: 'unhold', namespace: Nn, path: eo, type: rr },
                        { element: 'active', namespace: Nn, path: eo, type: ar },
                        { element: 'ringing', namespace: Nn, path: eo, type: or }
                    ],
                    no = [
                        ui({ nick: dt(qn, 'nick') }),
                        pi({ nick: dt(qn, 'nick') }),
                        {
                            aliases: [
                                { path: 'pubsubcontent', contextField: 'itemType' },
                                { path: 'pubsubitem.content', contextField: 'itemType' },
                                { path: 'pubsubeventitem.content', contextField: 'itemType' },
                                { path: 'iq.pubsub.publish.items', contextField: 'itemType' }
                            ],
                            element: 'nick',
                            fields: { nick: ct() },
                            namespace: qn,
                            type: qn
                        }
                    ],
                    io = e => [
                        {
                            element: 'transport',
                            fields: {
                                gatheringComplete: vt(null, 'gathering-complete'),
                                password: Ge('pwd'),
                                usernameFragment: Ge('ufrag')
                            },
                            namespace: e,
                            path: 'iq.jingle.contents.transport',
                            type: e,
                            typeField: 'transportType'
                        },
                        {
                            aliases: [
                                {
                                    impliedType: !0,
                                    path: 'iq.jingle.contents.transport.remoteCandidate',
                                    selector: e
                                }
                            ],
                            element: 'remote-candidate',
                            fields: { component: Je('component'), ip: Ge('ip'), port: Je('port') },
                            namespace: e,
                            type: e,
                            typeField: 'transportType'
                        },
                        {
                            aliases: [
                                {
                                    impliedType: !0,
                                    multiple: !0,
                                    path: 'iq.jingle.contents.transport.candidates',
                                    selector: e
                                }
                            ],
                            element: 'candidate',
                            fields: {
                                component: Je('component'),
                                foundation: Ge('foundation'),
                                generation: Je('generation'),
                                id: Ge('id'),
                                ip: Ge('ip'),
                                network: Je('network'),
                                port: Je('port'),
                                priority: Je('priority'),
                                protocol: Ge('protocol'),
                                relatedAddress: Ge('rel-addr'),
                                relatedPort: Ge('rel-port'),
                                tcpType: Ge('tcptype'),
                                type: Ge('type')
                            },
                            namespace: e,
                            type: e,
                            typeField: 'transportType'
                        }
                    ],
                    so = [...io(ni), ...io(An)],
                    ro = [
                        {
                            element: 'transport',
                            fields: {
                                gatheringComplete: vt(null, 'gathering-complete'),
                                password: Ge('pwd'),
                                usernameFragment: Ge('ufrag')
                            },
                            namespace: Fn,
                            path: 'iq.jingle.contents.transport',
                            type: Fn,
                            typeField: 'transportType'
                        },
                        {
                            aliases: [
                                {
                                    impliedType: !0,
                                    multiple: !0,
                                    path: 'iq.jingle.contents.transport.candidates',
                                    selector: Fn
                                }
                            ],
                            element: 'candidate',
                            fields: {
                                component: Je('component'),
                                foundation: Ge('foundation'),
                                generation: Je('generation'),
                                id: Ge('id'),
                                ip: Ge('ip'),
                                port: Je('port'),
                                type: Ge('type')
                            },
                            namespace: Fn,
                            type: Fn,
                            typeField: 'transportType'
                        }
                    ],
                    ao = [
                        {
                            element: 'request',
                            namespace: 'urn:xmpp:receipts',
                            path: 'message.receipt',
                            type: 'request',
                            typeField: 'type'
                        },
                        {
                            element: 'received',
                            fields: { id: Ge('id') },
                            namespace: 'urn:xmpp:receipts',
                            path: 'message.receipt',
                            type: 'received',
                            typeField: 'type'
                        }
                    ],
                    oo = [
                        {
                            element: 'invisible',
                            fields: { probe: He('probe') },
                            namespace: 'urn:xmpp:invisible:0',
                            path: 'iq.visibility',
                            type: 'invisible',
                            typeField: 'type'
                        },
                        {
                            element: 'visible',
                            namespace: 'urn:xmpp:invisible:0',
                            path: 'iq.visibility',
                            type: 'visible'
                        }
                    ],
                    co = [
                        fi({ blocked: vt('urn:xmpp:blocking:errors', 'blocked') }),
                        {
                            element: 'blocklist',
                            fields: { jids: It(null, 'item', 'jid') },
                            namespace: 'urn:xmpp:blocking',
                            path: 'iq.blockList',
                            type: 'list',
                            typeField: 'action'
                        },
                        {
                            element: 'block',
                            fields: { jids: It(null, 'item', 'jid') },
                            namespace: 'urn:xmpp:blocking',
                            path: 'iq.blockList',
                            type: 'block',
                            typeField: 'action'
                        },
                        {
                            element: 'unblock',
                            fields: { jids: It(null, 'item', 'jid') },
                            namespace: 'urn:xmpp:blocking',
                            path: 'iq.blockList',
                            type: 'unblock',
                            typeField: 'action'
                        }
                    ],
                    lo = [
                        hi({ streamManagement: vt(Pn, 'sm') }),
                        {
                            element: 'a',
                            fields: { handled: Je('h') },
                            namespace: Pn,
                            path: 'sm',
                            type: 'ack',
                            typeField: 'type'
                        },
                        {
                            element: 'r',
                            namespace: Pn,
                            path: 'sm',
                            type: 'request',
                            typeField: 'type'
                        },
                        {
                            element: 'enable',
                            fields: { allowResumption: He('resume') },
                            namespace: Pn,
                            path: 'sm',
                            type: 'enable',
                            typeField: 'type'
                        },
                        {
                            element: 'enabled',
                            fields: { id: Ge('id'), resume: He('resume') },
                            namespace: Pn,
                            path: 'sm',
                            type: 'enabled',
                            typeField: 'type'
                        },
                        {
                            element: 'resume',
                            fields: { handled: Je('h'), previousSession: Ge('previd') },
                            namespace: Pn,
                            path: 'sm',
                            type: 'resume',
                            typeField: 'type'
                        },
                        {
                            element: 'resumed',
                            fields: { handled: Je('h'), previousSession: Ge('previd') },
                            namespace: Pn,
                            path: 'sm',
                            type: 'resumed',
                            typeField: 'type'
                        },
                        {
                            element: 'failed',
                            fields: { handled: Je('h') },
                            namespace: Pn,
                            path: 'sm',
                            type: 'failed',
                            typeField: 'type'
                        }
                    ];
                var uo = di({ ping: vt('urn:xmpp:ping', 'ping') });
                const po = {
                        element: 'time',
                        fields: { tzo: yt(null, 'tzo'), utc: ft(null, 'utc') },
                        namespace: 'urn:xmpp:time',
                        path: 'iq.time'
                    },
                    ho = {
                        aliases: ['message.delay', 'presence.delay'],
                        element: 'delay',
                        fields: { from: ai('from'), reason: ct(), timestamp: Ke('stamp') },
                        namespace: Ln
                    },
                    fo = { 2: 'urn:xmpp:extdisco:2', 1: 'urn:xmpp:extdisco:1' },
                    mo = [];
                for (const [e, t] of Object.entries(fo))
                    mo.push(
                        {
                            aliases: ['iq.externalServiceCredentials'],
                            defaultType: '2',
                            element: 'credentials',
                            fields: {
                                expires: ot(null, 'service', 'expires'),
                                host: it(null, 'service', 'host'),
                                name: it(null, 'service', 'name'),
                                password: it(null, 'service', 'password'),
                                port: rt(null, 'service', 'port'),
                                restricted: st(null, 'service', 'restricted'),
                                transport: it(null, 'service', 'transport'),
                                type: it(null, 'service', 'type'),
                                username: it(null, 'service', 'username')
                            },
                            namespace: t,
                            type: e,
                            typeField: 'version'
                        },
                        {
                            aliases: ['iq.externalServices'],
                            defaultType: '2',
                            element: 'services',
                            fields: { type: Ge('type') },
                            namespace: t,
                            type: e,
                            typeField: 'version'
                        },
                        {
                            aliases: [{ path: 'iq.externalServices.services', multiple: !0 }],
                            defaultType: '2',
                            element: 'service',
                            fields: {
                                expires: Ke('expires'),
                                host: Ge('host'),
                                name: Ge('name'),
                                password: Ge('password'),
                                port: Je('port'),
                                restricted: He('restricted'),
                                transport: Ge('transport'),
                                type: Ge('type'),
                                username: Ge('username')
                            },
                            namespace: t,
                            type: e,
                            typeField: 'version'
                        }
                    );
                const go = [
                    {
                        element: 'media',
                        fields: { height: Je('height'), width: Je('width') },
                        namespace: 'urn:xmpp:media-element',
                        path: 'dataform.fields.media'
                    },
                    {
                        aliases: [{ multiple: !0, path: 'dataform.fields.media.sources' }],
                        element: 'uri',
                        fields: { mediaType: Ge('type'), uri: ct() },
                        namespace: 'urn:xmpp:media-element'
                    }
                ];
                var bo = ui({ requestingAttention: vt('urn:xmpp:attention:0', 'attention') });
                const yo = {
                    aliases: [
                        'iq.bits',
                        { path: 'message.bits', multiple: !0 },
                        { path: 'presence.bits', multiple: !0 },
                        { path: 'iq.jingle.bits', multiple: !0 }
                    ],
                    element: 'data',
                    fields: {
                        cid: Ge('cid'),
                        data: ut('base64'),
                        maxAge: Je('max-age'),
                        mediaType: Ge('type')
                    },
                    namespace: Mn
                };
                let vo = [
                    li(Gn, 'hash', [
                        { path: 'file.hashes', multiple: !0 },
                        { path: 'file.range.hashes', multiple: !0 }
                    ]),
                    li('urn:xmpp:hashes:1', 'hash', [
                        { path: 'file.hashes', multiple: !0 },
                        { path: 'file.range.hashes', multiple: !0 }
                    ]),
                    li(Gn, 'hash-used', [{ path: 'file.hashesUsed', multiple: !0 }]),
                    li('urn:xmpp:thumbs:1', 'thumbnail', [
                        { path: 'file.thumbnails', multiple: !0 }
                    ])
                ];
                for (const e of ['urn:xmpp:jingle:apps:file-transfer:4', Dn])
                    vo = vo.concat([
                        {
                            aliases: [
                                'file',
                                {
                                    impliedType: !0,
                                    path: 'iq.jingle.contents.application.file',
                                    selector: e
                                },
                                {
                                    impliedType: !0,
                                    path: 'iq.jingle.info.file',
                                    selector: `{${e}}checksum`
                                }
                            ],
                            defaultType: Dn,
                            element: 'file',
                            fields: {
                                date: ft(null, 'date'),
                                description: dt(null, 'desc'),
                                mediaType: dt(null, 'media-type'),
                                name: dt(null, 'name'),
                                size: mt(null, 'size')
                            },
                            namespace: e,
                            type: e,
                            typeField: 'version'
                        },
                        {
                            aliases: [{ impliedType: !0, path: 'file.range', selector: e }],
                            defaultType: Dn,
                            element: 'range',
                            fields: { length: Je('length'), offset: Je('offset', 0) },
                            namespace: e,
                            type: e,
                            typeField: 'version'
                        },
                        {
                            element: 'description',
                            namespace: e,
                            path: 'iq.jingle.contents.application',
                            type: e,
                            typeField: 'applicationType'
                        },
                        {
                            element: 'received',
                            fields: { creator: Ge('creator'), name: Ge('name') },
                            namespace: e,
                            path: 'iq.jingle.info',
                            type: `{${e}}received`,
                            typeField: 'infoType'
                        },
                        {
                            element: 'checksum',
                            fields: { creator: Ge('creator'), name: Ge('name') },
                            namespace: e,
                            path: 'iq.jingle.info',
                            type: `{${e}}checksum`,
                            typeField: 'infoType'
                        }
                    ]);
                var wo = vo;
                const _o = {
                        element: 'description',
                        namespace: Bn,
                        path: 'iq.jingle.contents.application',
                        type: Bn,
                        typeField: 'applicationType'
                    },
                    xo = [
                        {
                            element: 'transport',
                            fields: {
                                activated: it(null, 'activated', 'cid'),
                                address: Ge('dstaddr'),
                                candidateError: vt(null, 'candidate-error'),
                                candidateUsed: it(null, 'candidate-used', 'cid'),
                                mode: Ge('mode', 'tcp'),
                                proxyError: vt(null, 'proxy-error'),
                                sid: Ge('sid')
                            },
                            namespace: Un,
                            path: 'iq.jingle.contents.transport',
                            type: Un,
                            typeField: 'transportType'
                        },
                        {
                            aliases: [
                                {
                                    multiple: !0,
                                    path: 'iq.jingle.contents.transport.candidates',
                                    selector: Un
                                }
                            ],
                            element: 'candidate',
                            fields: {
                                cid: Ge('cid'),
                                host: Ge('host'),
                                jid: ai('jid'),
                                port: Je('port'),
                                priority: Je('priority'),
                                type: Ge('type'),
                                uri: Ge('uri')
                            },
                            namespace: Un
                        }
                    ],
                    jo = {
                        element: 'transport',
                        fields: {
                            ack: {
                                importer: (e, t) => 'message' !== Ge('stanza', 'iq').importer(e, t),
                                exporter(e, t, n) {
                                    !1 === t && Ge('stanza').exporter(e, 'message', n);
                                }
                            },
                            blockSize: Je('block-size'),
                            sid: Ge('sid')
                        },
                        namespace: zn,
                        path: 'iq.jingle.contents.transport',
                        type: zn,
                        typeField: 'transportType'
                    },
                    So = [
                        li(Mn, 'data', [{ path: 'iq.jingle.bits', multiple: !0 }]),
                        {
                            element: 'thumbnail',
                            fields: {
                                height: Je('height'),
                                mediaType: Ge('media-type'),
                                uri: Ge('uri'),
                                width: Je('width')
                            },
                            namespace: 'urn:xmpp:thumbs:1',
                            path: 'thumbnail'
                        }
                    ],
                    ko = [
                        li(Wn, 'forwarded', ['message.carbon.forward']),
                        {
                            element: 'enable',
                            namespace: Vn,
                            path: 'iq.carbons',
                            type: 'enable',
                            typeField: 'action'
                        },
                        {
                            element: 'disable',
                            namespace: Vn,
                            path: 'iq.carbons',
                            type: 'disable',
                            typeField: 'action'
                        },
                        {
                            element: 'sent',
                            namespace: Vn,
                            path: 'message.carbon',
                            type: 'sent',
                            typeField: 'type'
                        },
                        {
                            element: 'received',
                            namespace: Vn,
                            path: 'message.carbon',
                            type: 'received',
                            typeField: 'type'
                        }
                    ],
                    To = [
                        ...Object.values(Ls).map(e => li(e, 'message', ['forward.message'])),
                        ...Object.values(Ls).map(e => li(e, 'presence', ['forward.presence'])),
                        ...Object.values(Ls).map(e => li(e, 'iq', ['forward.iq'])),
                        li(Ln, 'delay', ['forward.delay']),
                        {
                            aliases: ['message.forward'],
                            element: 'forwarded',
                            namespace: Wn,
                            path: 'forward'
                        }
                    ],
                    Oo = [
                        {
                            defaultType: '2',
                            element: 'hash',
                            fields: {
                                algorithm: Ge('algo'),
                                value: ut('base64'),
                                version: qt('2')
                            },
                            namespace: Gn,
                            path: 'hash',
                            type: '2',
                            typeField: 'version'
                        },
                        {
                            element: 'hash-used',
                            fields: { algorithm: Ge('algo'), version: qt('2') },
                            namespace: Gn,
                            path: 'hashUsed'
                        },
                        {
                            element: 'hash',
                            fields: { algorithm: Ge('algo'), value: ut('hex'), version: qt('1') },
                            namespace: 'urn:xmpp:hashes:1',
                            path: 'hash',
                            type: '1',
                            typeField: 'version'
                        }
                    ],
                    Io = [
                        {
                            element: 'rtt',
                            fields: { event: Ge('event', 'edit'), id: Ge('id'), seq: Je('seq') },
                            namespace: Jn,
                            path: 'message.rtt'
                        },
                        {
                            aliases: [{ path: 'message.rtt.actions', multiple: !0 }],
                            element: 't',
                            fields: { position: Je('p'), text: ct() },
                            namespace: Jn,
                            type: 'insert',
                            typeField: 'type'
                        },
                        {
                            aliases: [{ path: 'message.rtt.actions', multiple: !0 }],
                            element: 'e',
                            fields: { length: Je('n', 1), position: Je('p') },
                            namespace: Jn,
                            type: 'erase',
                            typeField: 'type'
                        },
                        {
                            aliases: [{ multiple: !0, path: 'message.rtt.actions' }],
                            element: 'w',
                            fields: { duration: Je('n', 0) },
                            namespace: Jn,
                            type: 'wait',
                            typeField: 'type'
                        }
                    ];
                var Eo = ui({ replace: it('urn:xmpp:message-correct:0', 'replace', 'id') });
                const Co = { 2: 'urn:xmpp:mam:2', 1: 'urn:xmpp:mam:1' },
                    Ro = [
                        li(Jt, 'x', ['iq.archive.form']),
                        li(Wn, 'forwarded', ['message.archive.item']),
                        li(on, 'set', ['iq.archive.paging'])
                    ];
                for (const [e, t] of Object.entries(Co))
                    Ro.push(
                        {
                            defaultType: 'query',
                            defaultVersion: '2',
                            element: 'query',
                            fields: { queryId: Ge('queryid') },
                            namespace: t,
                            path: 'iq.archive',
                            type: 'query',
                            typeField: 'type',
                            version: e,
                            versionField: 'version'
                        },
                        {
                            element: 'fin',
                            fields: { complete: He('complete'), stable: He('stable') },
                            namespace: t,
                            path: 'iq.archive',
                            type: 'result',
                            version: e
                        },
                        {
                            element: 'prefs',
                            fields: {
                                default: Ge('default'),
                                always: St([
                                    { namespace: null, element: 'always' },
                                    { namespace: null, element: 'jid' }
                                ]),
                                never: St([
                                    { namespace: null, element: 'never' },
                                    { namespace: null, element: 'jid' }
                                ])
                            },
                            namespace: t,
                            path: 'iq.archive',
                            type: 'preferences',
                            version: e
                        },
                        {
                            element: 'result',
                            defaultType: '2',
                            fields: { id: Ge('id'), queryId: Ge('queryid') },
                            namespace: t,
                            path: 'message.archive',
                            type: e,
                            typeField: 'version'
                        }
                    );
                const No = 'message.marker';
                const qo = [
                    Zr,
                    ea,
                    la,
                    ua,
                    pa,
                    da,
                    ha,
                    fa,
                    ma,
                    ga,
                    ba,
                    ya,
                    va,
                    wa,
                    _a,
                    Sa,
                    ka,
                    Ta,
                    Ea,
                    Ra,
                    Na,
                    qa,
                    Aa,
                    Fa,
                    Pa,
                    La,
                    Ma,
                    Da,
                    Ba,
                    Ua,
                    za,
                    Va,
                    Wa,
                    Ga,
                    Ha,
                    Qa,
                    Ja,
                    Ya,
                    Ka,
                    Xa,
                    to,
                    no,
                    so,
                    ro,
                    ao,
                    oo,
                    co,
                    lo,
                    uo,
                    po,
                    ho,
                    mo,
                    go,
                    bo,
                    yo,
                    wo,
                    _o,
                    xo,
                    jo,
                    So,
                    ko,
                    To,
                    Oo,
                    Io,
                    Eo,
                    Ro,
                    [
                        pi({ hats: Nt(Yn, 'hats', 'hat', !0) }),
                        {
                            element: 'hat',
                            fields: { id: Ge('name'), name: Ge('displayName') },
                            namespace: Yn,
                            path: 'hat'
                        }
                    ],
                    pi({ idleSince: ft('urn:xmpp:idle:1', 'since') }),
                    {
                        aliases: [
                            {
                                multiple: !0,
                                path: 'iq.jingle.contents.transport.fingerprints',
                                selector: An
                            },
                            {
                                multiple: !0,
                                path: 'iq.jingle.contents.transport.fingerprints',
                                selector: ni
                            },
                            {
                                multiple: !0,
                                path: 'iq.jingle.contents.application.encryption.dtls',
                                selector: Rn
                            }
                        ],
                        element: 'fingerprint',
                        fields: { algorithm: Ge('hash'), setup: Ge('setup'), value: ct() },
                        namespace: 'urn:xmpp:jingle:apps:dtls:0'
                    },
                    [
                        {
                            element: 'markable',
                            namespace: Kn,
                            path: No,
                            type: 'markable',
                            typeField: 'type'
                        },
                        {
                            element: 'received',
                            fields: { id: Ge('id') },
                            namespace: Kn,
                            path: No,
                            type: 'received'
                        },
                        {
                            element: 'displayed',
                            fields: { id: Ge('id') },
                            namespace: Kn,
                            path: No,
                            type: 'displayed'
                        },
                        {
                            element: 'acknowledged',
                            fields: { id: Ge('id') },
                            namespace: Kn,
                            path: No,
                            type: 'acknowledged'
                        }
                    ],
                    ui({
                        processingHints: {
                            importer(e) {
                                const t = {};
                                let n = !1;
                                for (const i of e.children)
                                    if ('string' != typeof i && i.getNamespace() === Xn)
                                        switch (i.getName()) {
                                            case 'no-copy':
                                                (t.noCopy = !0), (n = !0);
                                                break;
                                            case 'no-permanent-store':
                                                (t.noPermanentStore = !0), (n = !0);
                                                break;
                                            case 'no-store':
                                                (t.noStore = !0), (n = !0);
                                                break;
                                            case 'store':
                                                (t.store = !0), (n = !0);
                                        }
                                return n ? t : void 0;
                            },
                            exporter(e, t, n) {
                                t.noCopy && e.appendChild(Oe(Xn, 'no-copy', n.namespace, e)),
                                    t.noPermanentStore &&
                                        e.appendChild(Oe(Xn, 'no-permanent-store', n.namespace, e)),
                                    t.noStore && e.appendChild(Oe(Xn, 'no-store', n.namespace, e)),
                                    t.store && e.appendChild(Oe(Xn, 'store', n.namespace, e));
                            }
                        }
                    }),
                    [
                        ui({ json: bt(Zn, 'json') }),
                        {
                            aliases: [
                                { path: 'pubsubcontent', contextField: 'itemType' },
                                { path: 'pubsubitem.content', contextField: 'itemType' },
                                { path: 'pubsubeventitem.content', contextField: 'itemType' },
                                { path: 'iq.pubsub.publish.items', contextField: 'itemType' }
                            ],
                            element: 'json',
                            fields: { json: lt() },
                            namespace: Zn,
                            type: Zn
                        },
                        {
                            aliases: [{ path: 'message.jsonPayloads', multiple: !0 }],
                            element: 'payload',
                            fields: { type: Ge('datatype'), data: bt(Zn, 'json') },
                            namespace: 'urn:xmpp:json-msg:0'
                        }
                    ],
                    [
                        {
                            aliases: [{ path: 'iq.jingle.groups', multiple: !0 }],
                            element: 'group',
                            fields: {
                                contents: It(null, 'content', 'name'),
                                semantics: Ge('semantics')
                            },
                            namespace: 'urn:xmpp:jingle:apps:grouping:0'
                        }
                    ],
                    {
                        aliases: [
                            { path: 'iq.jingle.contents.transport.sctp', selector: An },
                            { path: 'iq.jingle.contents.transport.sctp', selector: ni }
                        ],
                        element: 'sctpmap',
                        fields: {
                            port: Je('number'),
                            protocol: Ge('protocol'),
                            streams: Ge('streams')
                        },
                        namespace: 'urn:xmpp:jingle:transports:dtls-sctp:1'
                    },
                    [
                        {
                            element: 'active',
                            namespace: 'urn:xmpp:csi:0',
                            path: 'csi',
                            type: 'active',
                            typeField: 'state'
                        },
                        {
                            element: 'inactive',
                            namespace: 'urn:xmpp:csi:0',
                            path: 'csi',
                            type: 'inactive',
                            typeField: 'state'
                        }
                    ],
                    [
                        li(Jt, 'x', ['iq.push.form', 'pushNotification.form']),
                        {
                            element: 'enable',
                            fields: { jid: ai('jid'), node: Ge('node') },
                            namespace: ei,
                            path: 'iq.push',
                            type: 'enable',
                            typeField: 'action'
                        },
                        {
                            element: 'disable',
                            fields: { jid: ai('jid'), node: Ge('node') },
                            namespace: ei,
                            path: 'iq.push',
                            type: 'disable',
                            typeField: 'action'
                        },
                        {
                            aliases: [
                                { path: 'pubsubcontent', contextField: 'itemType' },
                                { path: 'pubsubitem.content', contextField: 'itemType' },
                                { path: 'pubsubeventitem.content', contextField: 'itemType' },
                                { path: 'iq.pubsub.publish.items', contextField: 'itemType' }
                            ],
                            element: 'notification',
                            namespace: ei,
                            path: 'pushNotification',
                            type: ei,
                            typeField: 'itemType'
                        }
                    ],
                    [
                        ui({ originId: it('urn:xmpp:sid:0', 'origin-id', 'id') }),
                        {
                            aliases: [{ path: 'message.stanzaIds', multiple: !0 }],
                            element: 'stanza-id',
                            fields: { by: ai('by'), id: Ge('id') },
                            namespace: 'urn:xmpp:sid:0'
                        }
                    ],
                    [
                        fi({
                            httpUploadError: kt(ti, ['file-too-large', 'retry']),
                            httpUploadMaxFileSize: xt([
                                { namespace: ti, element: 'file-too-large' },
                                { namespace: ti, element: 'max-file-size' }
                            ]),
                            httpUploadRetry: ot(ti, 'retry', 'stamp')
                        }),
                        {
                            element: 'request',
                            fields: {
                                mediaType: Ge('content-type'),
                                name: Ge('filename'),
                                size: Je('size')
                            },
                            namespace: ti,
                            path: 'iq.httpUpload',
                            type: 'request',
                            typeField: 'type'
                        },
                        {
                            element: 'slot',
                            fields: { download: it(null, 'get', 'url') },
                            namespace: ti,
                            path: 'iq.httpUpload',
                            type: 'slot'
                        },
                        {
                            aliases: [{ path: 'iq.httpUpload.upload', selector: 'slot' }],
                            element: 'put',
                            fields: { url: Ge('url') },
                            namespace: ti
                        },
                        {
                            aliases: [{ path: 'iq.httpUpload.upload.headers', multiple: !0 }],
                            element: 'header',
                            fields: { name: Ge('name'), value: ct() },
                            namespace: ti
                        }
                    ],
                    {
                        element: 'encryption',
                        fields: { id: Ge('namespace'), name: Ge('name') },
                        namespace: 'urn:xmpp:eme:0',
                        path: 'message.encryptionMethod'
                    },
                    [
                        {
                            aliases: ['message.omemo'],
                            element: 'encrypted',
                            fields: { payload: ht(null, 'payload', 'base64') },
                            namespace: ii,
                            path: 'omemo'
                        },
                        {
                            element: 'header',
                            fields: { iv: ht(null, 'iv', 'base64'), sid: Je('sid') },
                            namespace: ii,
                            path: 'omemo.header'
                        },
                        {
                            aliases: [{ path: 'omemo.header.keys', multiple: !0 }],
                            element: 'key',
                            fields: { preKey: He('prekey'), rid: Je('rid'), value: ut('base64') },
                            namespace: ii
                        },
                        {
                            aliases: [
                                { path: 'pubsubcontent', contextField: 'itemType' },
                                { path: 'pubsubitem.content', contextField: 'itemType' },
                                { path: 'pubsubeventitem.content', contextField: 'itemType' },
                                { path: 'iq.pubsub.publish.items', contextField: 'itemType' }
                            ],
                            element: 'list',
                            fields: { devices: Et(null, 'device', 'id') },
                            namespace: ii,
                            type: 'eu.siacs.conversations.axolotl.devicelist',
                            typeField: 'itemType'
                        },
                        {
                            element: 'preKeyPublic',
                            fields: { id: Je('preKeyId'), value: ut('base64') },
                            namespace: ii,
                            path: 'omemoPreKey'
                        },
                        {
                            element: 'signedPreKeyPublic',
                            fields: { id: Je('signedPreKeyId'), value: ut('base64') },
                            namespace: ii,
                            path: 'omemoDevice.signedPreKeyPublic'
                        },
                        {
                            aliases: [
                                { path: 'pubsubcontent', contextField: 'itemType' },
                                { path: 'pubsubitem.content', contextField: 'itemType' },
                                { path: 'pubsubeventitem.content', contextField: 'itemType' },
                                { path: 'iq.pubsub.publish.items', contextField: 'itemType' }
                            ],
                            element: 'bundle',
                            fields: {
                                identityKey: ht(null, 'identityKey', 'base64'),
                                preKeys: Nt(null, 'prekeys', 'omemoPreKey', !0),
                                signedPreKeySignature: ht(null, 'signedPreKeySignature', 'base64')
                            },
                            namespace: ii,
                            path: 'omemoDevice',
                            type: 'eu.siacs.conversations.axolotl.bundles',
                            typeField: 'itemType'
                        }
                    ],
                    [
                        {
                            element: 'XRD',
                            fields: { subject: dt(null, 'Subject') },
                            namespace: si,
                            path: 'xrd'
                        },
                        {
                            aliases: [{ path: 'xrd.links', multiple: !0 }],
                            element: 'Link',
                            fields: { href: Ge('href'), rel: Ge('rel'), type: Ge('type') },
                            namespace: si
                        }
                    ]
                ];
                var Ao = Object.freeze({ __proto__: null, default: qo });
                class Fo {
                    constructor(e) {
                        (this.active = !1),
                            (this.maxRetries = 5),
                            (this.stream = e),
                            (this.maxTimeout = 1100 * this.stream.maxWaitTime);
                    }
                    send(e, t) {
                        return Object(s.a)(this, void 0, void 0, function* () {
                            (this.rid = e), (this.active = !0);
                            let n = 0;
                            for (; n <= this.maxRetries; ) {
                                n += 1;
                                try {
                                    const e = yield js(
                                        Zi(this.stream.url, {
                                            body: t,
                                            headers: { 'Content-Type': this.stream.contentType },
                                            method: 'POST'
                                        }),
                                        this.maxTimeout,
                                        () => new Error('Request timed out')
                                    );
                                    if (!e.ok) throw new Error('HTTP Status Error: ' + e.status);
                                    const n = yield e.text();
                                    return (this.active = !1), n;
                                } catch (e) {
                                    if (1 === n) continue;
                                    if (n < this.maxRetries) {
                                        const e = Math.min(this.maxTimeout, 1e3 * Math.pow(n, 2));
                                        yield Ss(e + 1e3 * Math.random());
                                        continue;
                                    }
                                    throw ((this.active = !1), e);
                                }
                            }
                            throw new Error('Request failed');
                        });
                    }
                }
                class Po extends l.Duplex {
                    constructor(e, t, n) {
                        super({ objectMode: !0 }),
                            (this.rid = Math.floor(4294967295 * Math.random())),
                            (this.sid = ''),
                            (this.maxHoldOpen = 2),
                            (this.maxWaitTime = 30),
                            (this.contentType = 'text/xml; charset=utf-8'),
                            (this.channels = [new Fo(this), new Fo(this)]),
                            (this.activeChannelID = 0),
                            (this.queue = []),
                            (this.isEnded = !1),
                            (this.client = e),
                            (this.sm = t),
                            (this.stanzas = n),
                            this.on('data', e => {
                                this.client.emit('stream:data', e.stanza, e.kind);
                            }),
                            this.on('end', () => {
                                (this.isEnded = !0),
                                    clearTimeout(this.idleTimeout),
                                    this.client.emit('--transport-disconnected');
                            });
                    }
                    _write(e, t, n) {
                        this.queue.push([e, n]), this.scheduleRequests();
                    }
                    _writev(e, t) {
                        this.queue.push([e.map(e => e.chunk).join(''), t]), this.scheduleRequests();
                    }
                    _read() {}
                    process(e) {
                        const t = new gi({
                            acceptLanguages: this.config.acceptLanguages,
                            allowComments: !1,
                            lang: this.config.lang,
                            registry: this.stanzas,
                            rootKey: 'bosh',
                            wrappedStream: !0
                        });
                        t.on('error', e => {
                            const t = { condition: Ds.InvalidXML };
                            return (
                                this.client.emit('stream:error', t, e),
                                this.send('error', t),
                                this.disconnect()
                            );
                        }),
                            t.on('data', e => {
                                if ('stream-start' === e.event)
                                    return (
                                        (this.stream = e.stanza),
                                        void ('terminate' === e.stanza.type
                                            ? ((this.hasStream = !1),
                                              (this.rid = void 0),
                                              (this.sid = void 0),
                                              this.isEnded ||
                                                  ((this.isEnded = !0),
                                                  this.client.emit('bosh:terminate', e.stanza),
                                                  this.client.emit('stream:end'),
                                                  this.push(null)))
                                            : this.hasStream ||
                                              ((this.hasStream = !0),
                                              (this.stream = e.stanza),
                                              (this.sid = e.stanza.sid || this.sid),
                                              (this.maxWaitTime =
                                                  e.stanza.maxWaitTime || this.maxWaitTime),
                                              this.client.emit('stream:start', e.stanza)))
                                    );
                                e.event || this.push({ kind: e.kind, stanza: e.stanza });
                            }),
                            this.client.emit('raw', 'incoming', e),
                            t.write(e),
                            this.scheduleRequests();
                    }
                    connect(e) {
                        if (
                            ((this.config = e),
                            (this.url = e.url),
                            e.rid && (this.rid = e.rid),
                            e.sid && (this.sid = e.sid),
                            e.wait && (this.maxWaitTime = e.wait),
                            this.sid)
                        )
                            return (
                                (this.hasStream = !0),
                                (this.stream = {}),
                                this.client.emit('connected'),
                                this.client.emit('session:prebind', this.config.jid),
                                void this.client.emit('session:started')
                            );
                        this._send({
                            lang: e.lang,
                            maxHoldOpen: this.maxHoldOpen,
                            maxWaitTime: this.maxWaitTime,
                            to: e.server,
                            version: '1.6',
                            xmppVersion: '1.0'
                        });
                    }
                    restart() {
                        (this.hasStream = !1),
                            this._send({ to: this.config.server, xmppRestart: !0 });
                    }
                    disconnect() {
                        this.hasStream
                            ? this._send({ type: 'terminate' })
                            : ((this.stream = void 0),
                              (this.sid = void 0),
                              (this.rid = void 0),
                              this.client.emit('--transport-disconnected'));
                    }
                    send(e, t) {
                        var n;
                        return Object(s.a)(this, void 0, void 0, function* () {
                            let i;
                            if (
                                (t &&
                                    (i =
                                        null === (n = this.stanzas.export(e, t)) || void 0 === n
                                            ? void 0
                                            : n.toString()),
                                i)
                            )
                                return new Promise((e, t) => {
                                    this.write(i, 'utf8', n => (n ? t(n) : e()));
                                });
                        });
                    }
                    get sendingChannel() {
                        return this.channels[this.activeChannelID];
                    }
                    get pollingChannel() {
                        return this.channels[0 === this.activeChannelID ? 1 : 0];
                    }
                    toggleChannel() {
                        this.activeChannelID = 0 === this.activeChannelID ? 1 : 0;
                    }
                    _send(e, t = '') {
                        return Object(s.a)(this, void 0, void 0, function* () {
                            if (this.isEnded) return;
                            const n = this.rid++,
                                i = this.stanzas.export(
                                    'bosh',
                                    Object.assign(Object.assign({}, e), { rid: n, sid: this.sid })
                                );
                            let s;
                            (s = t ? [i.openTag(), t, i.closeTag()].join('') : i.toString()),
                                this.client.emit('raw', 'outgoing', s),
                                this.sendingChannel
                                    .send(n, s)
                                    .then(e => {
                                        this.process(e);
                                    })
                                    .catch(e => {
                                        this.end(e);
                                    }),
                                this.toggleChannel();
                        });
                    }
                    _poll() {
                        return Object(s.a)(this, void 0, void 0, function* () {
                            if (this.isEnded) return;
                            const e = this.rid++,
                                t = this.stanzas
                                    .export('bosh', { rid: e, sid: this.sid })
                                    .toString();
                            this.client.emit('raw', 'outgoing', t),
                                this.pollingChannel
                                    .send(e, t)
                                    .then(e => {
                                        this.process(e);
                                    })
                                    .catch(e => {
                                        this.end(e);
                                    });
                        });
                    }
                    scheduleRequests() {
                        clearTimeout(this.idleTimeout),
                            (this.idleTimeout = setTimeout(() => {
                                this.fireRequests();
                            }, 10));
                    }
                    fireRequests() {
                        if (!this.isEnded)
                            if (this.queue.length)
                                if (this.sendingChannel.active) this.scheduleRequests();
                                else {
                                    const [e, t] = this.queue.shift();
                                    this._send({}, e), t();
                                }
                            else
                                !this.authenticated ||
                                    this.channels[0].active ||
                                    this.channels[1].active ||
                                    this._poll();
                    }
                }
                class Lo extends l.Duplex {
                    constructor(e, t, n) {
                        super({ objectMode: !0 }),
                            (this.sm = t),
                            (this.stanzas = n),
                            (this.closing = !1),
                            (this.client = e),
                            this.on('data', e => {
                                this.client.emit('stream:data', e.stanza, e.kind);
                            }),
                            this.on('error', () => {
                                this.end();
                            }),
                            this.on('end', () => {
                                this.client.emit('--transport-disconnected');
                            });
                    }
                    _read() {}
                    _write(t, n, i) {
                        if (!this.socket || 1 !== this.socket.readyState)
                            return i(new Error('Socket closed'));
                        const s = e.from(t, 'utf8').toString();
                        this.client.emit('raw', 'outgoing', s), this.socket.send(s), i();
                    }
                    connect(t) {
                        (this.config = t),
                            (this.hasStream = !1),
                            (this.closing = !1),
                            (this.parser = new gi({
                                acceptLanguages: this.config.acceptLanguages,
                                allowComments: !1,
                                lang: this.config.lang,
                                registry: this.stanzas,
                                wrappedStream: !1
                            })),
                            this.parser.on('data', e => {
                                const t = e.kind,
                                    n = e.stanza;
                                if ('stream' === t) {
                                    if ('open' === n.action)
                                        return (
                                            (this.hasStream = !0),
                                            (this.stream = n),
                                            this.client.emit('stream:start', n)
                                        );
                                    if ('close' === n.action)
                                        return this.client.emit('stream:end'), this.disconnect();
                                }
                                this.push({ kind: e.kind, stanza: e.stanza });
                            }),
                            this.parser.on('error', e => {
                                const t = { condition: Ds.InvalidXML };
                                return (
                                    this.client.emit('stream:error', t, e),
                                    this.write(this.stanzas.export('error', t).toString()),
                                    this.disconnect()
                                );
                            }),
                            (this.socket = new es(t.url, 'xmpp')),
                            (this.socket.onopen = () => {
                                this.emit('connect'),
                                    (this.sm.started = !1),
                                    this.client.emit('connected'),
                                    this.write(this.startHeader());
                            }),
                            (this.socket.onmessage = t => {
                                const n = e.from(t.data, 'utf8').toString();
                                this.client.emit('raw', 'incoming', n),
                                    this.parser && this.parser.write(n);
                            }),
                            (this.socket.onclose = () => {
                                this.push(null);
                            });
                    }
                    disconnect() {
                        this.socket && !this.closing && this.hasStream
                            ? ((this.closing = !0), this.write(this.closeHeader()))
                            : ((this.hasStream = !1),
                              (this.stream = void 0),
                              this.socket && this.end(),
                              (this.socket = void 0));
                    }
                    send(e, t) {
                        var n;
                        return Object(s.a)(this, void 0, void 0, function* () {
                            let i;
                            if (
                                (t &&
                                    (i =
                                        null === (n = this.stanzas.export(e, t)) || void 0 === n
                                            ? void 0
                                            : n.toString()),
                                i)
                            )
                                return new Promise((e, t) => {
                                    this.write(i, 'utf8', n => (n ? t(n) : e()));
                                });
                        });
                    }
                    restart() {
                        (this.hasStream = !1), this.write(this.startHeader());
                    }
                    startHeader() {
                        return this.stanzas
                            .export('stream', {
                                action: 'open',
                                lang: this.config.lang,
                                to: this.config.server,
                                version: '1.0'
                            })
                            .toString();
                    }
                    closeHeader() {
                        return this.stanzas.export('stream', { action: 'close' }).toString();
                    }
                }
                class Mo extends a.EventEmitter {
                    constructor(e = {}) {
                        super(),
                            this.setMaxListeners(100),
                            (this.off = this.removeListener),
                            this.updateConfig(e),
                            (this.jid = ''),
                            (this.sasl = new is()),
                            this.sasl.register('EXTERNAL', ds, 1e3),
                            this.sasl.register('SCRAM-SHA-256-PLUS', gs, 350),
                            this.sasl.register('SCRAM-SHA-256', gs, 300),
                            this.sasl.register('SCRAM-SHA-1-PLUS', gs, 250),
                            this.sasl.register('SCRAM-SHA-1', gs, 200),
                            this.sasl.register('DIGEST-MD5', ms, 100),
                            this.sasl.register('OAUTHBEARER', fs, 100),
                            this.sasl.register('X-OAUTH2', hs, 50),
                            this.sasl.register('PLAIN', hs, 1),
                            this.sasl.register('ANONYMOUS', ps, 0),
                            (this.stanzas = new Mt()),
                            this.stanzas.define(qo),
                            this.use(Kr),
                            (this.sm = new h()),
                            void 0 !== this.config.allowResumption &&
                                (this.sm.allowResume = this.config.allowResumption),
                            this.sm.on('prebound', e => {
                                (this.jid = e), this.emit('session:bound', e);
                            }),
                            this.on('session:bound', e => this.sm.bind(e)),
                            this.sm.on('send', e => this.send('sm', e)),
                            this.sm.on('acked', e => this.emit('stanza:acked', e)),
                            this.sm.on('failed', e => this.emit('stanza:failed', e)),
                            this.sm.on('hibernated', e => this.emit('stanza:hibernated', e)),
                            this.sm.on('begin-resend', () => this.outgoingDataQueue.pause()),
                            this.sm.on('resend', ({ kind: e, stanza: t }) => this.send(e, t, !0)),
                            this.sm.on('end-resend', () => this.outgoingDataQueue.resume());
                        for (const e of ['acked', 'hibernated', 'failed'])
                            this.on('stanza:' + e, t => {
                                'message' === t.kind && this.emit('message:' + e, t.stanza);
                            });
                        (this.transports = { bosh: Po, websocket: Lo }),
                            (this.incomingDataQueue = Object(r.a)(
                                (e, t) =>
                                    Object(s.a)(this, void 0, void 0, function* () {
                                        const { kind: n, stanza: i } = e;
                                        this.emit(n, i),
                                            i.id && this.emit(n + ':id:' + i.id, i),
                                            'message' === n || 'presence' === n || 'iq' === n
                                                ? (this.emit('stanza', i), yield this.sm.handle())
                                                : 'sm' === n &&
                                                  ('ack' === i.type &&
                                                      (yield this.sm.process(i),
                                                      this.emit('stream:management:ack', i)),
                                                  'request' === i.type && this.sm.ack()),
                                            t && t();
                                    }),
                                1
                            )),
                            (this.outgoingDataQueue = Object(r.a)(
                                (e, t) =>
                                    Object(s.a)(this, void 0, void 0, function* () {
                                        var n;
                                        const { kind: i, stanza: s, replay: r } = e,
                                            a = r || (yield this.sm.track(i, s));
                                        'message' === i &&
                                            (r
                                                ? this.emit('message:retry', s)
                                                : this.emit('message:sent', s, !1));
                                        try {
                                            if (!this.transport)
                                                throw new Error('Missing transport');
                                            yield this.transport.send(i, s),
                                                a &&
                                                    (null === (n = this.transport) ||
                                                        void 0 === n ||
                                                        n.send('sm', { type: 'request' }));
                                        } catch (e) {
                                            !this.sm.started &&
                                                ['message', 'presence', 'iq'].includes(i) &&
                                                this.emit('stanza:failed', { kind: i, stanza: s });
                                        }
                                        t && t();
                                    }),
                                1
                            )),
                            this.on('stream:data', (e, t) => {
                                this.incomingDataQueue.push({ kind: t, stanza: e }, 0);
                            }),
                            this.on('--transport-disconnected', () =>
                                Object(s.a)(this, void 0, void 0, function* () {
                                    this.transport && delete this.transport;
                                    const e = [];
                                    this.incomingDataQueue.idle() ||
                                        e.push(this.incomingDataQueue.drain()),
                                        this.outgoingDataQueue.idle() ||
                                            e.push(this.outgoingDataQueue.drain()),
                                        yield Promise.all(e),
                                        yield this.sm.hibernate(),
                                        this.emit('--reset-stream-features'),
                                        this.emit('disconnected');
                                })
                            ),
                            this.on('iq', e => {
                                const t = e.type,
                                    n = e.payloadType,
                                    i = 'iq:' + t + ':' + n;
                                if ('get' === t || 'set' === t) {
                                    if ('invalid-payload-count' === n)
                                        return this.sendIQError(e, {
                                            error: { condition: 'bad-request', type: 'modify' }
                                        });
                                    if ('unknown-payload' === n || 0 === this.listenerCount(i))
                                        return this.sendIQError(e, {
                                            error: {
                                                condition: 'service-unavailable',
                                                type: 'cancel'
                                            }
                                        });
                                    this.emit(i, e);
                                }
                            }),
                            this.on('message', e => {
                                const t =
                                        (e.alternateLanguageBodies &&
                                            e.alternateLanguageBodies.length) ||
                                        (e.links && e.links.length),
                                    n = e.marker && 'markable' !== e.marker.type;
                                t &&
                                    !n &&
                                    ('chat' === e.type || 'normal' === e.type
                                        ? this.emit('chat', e)
                                        : 'groupchat' === e.type && this.emit('groupchat', e)),
                                    'error' === e.type && this.emit('message:error', e);
                            }),
                            this.on('presence', e => {
                                let t = e.type || 'available';
                                'error' === t && (t = 'presence:error'), this.emit(t, e);
                            });
                    }
                    updateConfig(e = {}) {
                        const t = this.config || {};
                        (this.config = Object.assign(
                            Object.assign(
                                {
                                    allowResumption: !0,
                                    jid: '',
                                    transports: { bosh: !0, websocket: !0 },
                                    useStreamManagement: !0
                                },
                                t
                            ),
                            e
                        )),
                            this.config.server || (this.config.server = H(this.config.jid)),
                            this.config.password &&
                                ((this.config.credentials = this.config.credentials || {}),
                                (this.config.credentials.password = this.config.password),
                                delete this.config.password);
                    }
                    get stream() {
                        return this.transport ? this.transport.stream : void 0;
                    }
                    emit(e, ...t) {
                        const n = super.emit(e, ...t);
                        return (
                            'raw' === e
                                ? (super.emit('raw:' + t[0], t[1]),
                                  super.emit('raw:*', 'raw:' + t[0], t[1]),
                                  super.emit('*', 'raw:' + t[0], t[1]))
                                : super.emit('*', e, ...t),
                            n
                        );
                    }
                    use(e) {
                        'function' == typeof e && e(this, this.stanzas, this.config);
                    }
                    nextId() {
                        return Ts();
                    }
                    getCredentials() {
                        return Object(s.a)(this, void 0, void 0, function* () {
                            return this._getConfiguredCredentials();
                        });
                    }
                    connect() {
                        return Object(s.a)(this, void 0, void 0, function* () {
                            this.emit('--reset-stream-features');
                            const e = ['websocket', 'bosh'];
                            let t;
                            for (const n of e) {
                                let e = this.config.transports[n];
                                if (e) {
                                    if ('string' == typeof e) e = { url: e };
                                    else if (!0 === e) {
                                        if (!t)
                                            try {
                                                t = yield this.discoverBindings(this.config.server);
                                            } catch (e) {
                                                console.error(e);
                                                continue;
                                            }
                                        if (
                                            ((t[n] = (t[n] || []).filter(
                                                e => e.startsWith('wss:') || e.startsWith('https:')
                                            )),
                                            !t[n] || !t[n].length)
                                        )
                                            continue;
                                        e = { url: t[n][0] };
                                    }
                                    return (
                                        (this.transport = new this.transports[n](
                                            this,
                                            this.sm,
                                            this.stanzas
                                        )),
                                        void this.transport.connect(
                                            Object.assign(
                                                {
                                                    acceptLanguages: this.config
                                                        .acceptLanguages || ['en'],
                                                    jid: this.config.jid,
                                                    lang: this.config.lang || 'en',
                                                    server: this.config.server,
                                                    url: e.url
                                                },
                                                e
                                            )
                                        )
                                    );
                                }
                            }
                            return (
                                console.error('No endpoints found for the requested transports.'),
                                this.disconnect()
                            );
                        });
                    }
                    disconnect() {
                        return Object(s.a)(this, void 0, void 0, function* () {
                            this.outgoingDataQueue.pause(),
                                this.sessionStarted && !this.sm.started && this.emit('session:end'),
                                this.emit('--reset-stream-features'),
                                (this.sessionStarted = !1),
                                this.transport
                                    ? this.transport.disconnect()
                                    : this.emit('--transport-disconnected'),
                                this.outgoingDataQueue.resume(),
                                this.outgoingDataQueue.idle() ||
                                    (yield this.outgoingDataQueue.drain()),
                                yield this.sm.shutdown();
                        });
                    }
                    send(e, t, n = !1) {
                        return Object(s.a)(this, void 0, void 0, function* () {
                            return new Promise((i, s) => {
                                this.outgoingDataQueue.push(
                                    { kind: e, stanza: t, replay: n },
                                    n ? 0 : 1,
                                    e => (e ? s(e) : i())
                                );
                            });
                        });
                    }
                    sendMessage(e) {
                        const t = e.id || this.nextId(),
                            n = Object.assign({ id: t, originId: t }, e);
                        return this.send('message', n), n.id;
                    }
                    sendPresence(e = {}) {
                        const t = Object.assign({ id: this.nextId() }, e);
                        return this.send('presence', t), t.id;
                    }
                    sendIQ(e) {
                        const t = Object.assign({ id: this.nextId() }, e),
                            n = Q(this.jid, e.to),
                            i = 'iq:id:' + t.id,
                            s = new Promise((e, t) => {
                                const s = r => {
                                    n.has(r.from) &&
                                        (('result' !== r.type && 'error' !== r.type) ||
                                            (this.off(i, s), 'result' === r.type ? e(r) : t(r)));
                                };
                                this.on(i, s);
                            });
                        return (
                            this.send('iq', t),
                            js(s, 1e3 * (this.config.timeout || 15), () => ({
                                error: { condition: 'timeout' },
                                id: t.id,
                                type: 'error'
                            }))
                        );
                    }
                    sendIQResult(e, t) {
                        this.send(
                            'iq',
                            Object.assign(Object.assign({}, t), {
                                id: e.id,
                                to: e.from,
                                type: 'result'
                            })
                        );
                    }
                    sendIQError(e, t) {
                        this.send(
                            'iq',
                            Object.assign(Object.assign({}, t), {
                                id: e.id,
                                to: e.from,
                                type: 'error'
                            })
                        );
                    }
                    sendStreamError(e) {
                        this.emit('stream:error', e), this.send('error', e), this.disconnect();
                    }
                    _getConfiguredCredentials() {
                        const e = this.config.credentials || {},
                            t = $(this.config.jid || ''),
                            n = e.username || t.local,
                            i = e.host || t.domain;
                        return Object.assign(
                            {
                                host: i,
                                password: this.config.password,
                                realm: i,
                                serviceName: i,
                                serviceType: 'xmpp',
                                username: n
                            },
                            e
                        );
                    }
                }
                function Do(e, t) {
                    const n = e.length,
                        i = t.length,
                        s = Math.min(n, i);
                    let r = 0;
                    for (r = 0; r < s && e[r] === t[r]; r++);
                    let a = 0;
                    for (a = 0; a < s - r && e[n - a - 1] === t[i - a - 1]; a++);
                    const o = r + a,
                        l = [];
                    if (
                        (o < n && l.push({ length: n - o, position: n - a, type: 'erase' }), o < i)
                    ) {
                        const e = t.slice(r, r + i - o);
                        l.push({ position: r, text: c.a.ucs2.encode(e), type: 'insert' });
                    }
                    return l;
                }
                var Bo = Object.freeze({
                    __proto__: null,
                    diff: Do,
                    DisplayBuffer: class {
                        constructor(e, t = !1) {
                            (this.synced = !1),
                                (this.cursorPosition = 0),
                                (this.ignoreWaits = !1),
                                (this.timeDeficit = 0),
                                (this.sequenceNumber = 0),
                                (this.onStateChange = e || function () {}),
                                (this.ignoreWaits = t),
                                (this.buffer = []),
                                this.resetActionQueue();
                        }
                        get text() {
                            return c.a.ucs2.encode(this.buffer.slice());
                        }
                        commit() {
                            this.resetActionQueue();
                        }
                        process(e) {
                            if ('cancel' !== e.event && 'init' !== e.event) {
                                if (
                                    ('reset' === e.event || 'new' === e.event
                                        ? (this.resetActionQueue(),
                                          void 0 !== e.seq && (this.sequenceNumber = e.seq))
                                        : e.seq !== this.sequenceNumber && (this.synced = !1),
                                    e.actions)
                                ) {
                                    const t = Date.now();
                                    let n = 0;
                                    for (const i of e.actions)
                                        (i.baseTime = t + n),
                                            'wait' === i.type && (n += i.duration),
                                            this.actionQueue.push(i, 0);
                                }
                                this.sequenceNumber = this.sequenceNumber + 1;
                            } else this.resetActionQueue();
                        }
                        insert(e = '', t = this.buffer.length) {
                            e = e.normalize('NFC');
                            const n = c.a.ucs2.decode(e);
                            this.buffer.splice(t, 0, ...n),
                                (this.cursorPosition = t + n.length),
                                this.emitState();
                        }
                        erase(e = 1, t = this.buffer.length) {
                            (t = Math.max(Math.min(t, this.buffer.length), 0)),
                                (e = Math.max(Math.min(e, this.text.length), 0)),
                                this.buffer.splice(Math.max(t - e, 0), e),
                                (this.cursorPosition = Math.max(t - e, 0)),
                                this.emitState();
                        }
                        emitState(e = {}) {
                            this.onStateChange(
                                Object.assign(
                                    {
                                        cursorPosition: this.cursorPosition,
                                        synced: this.synced,
                                        text: this.text
                                    },
                                    e
                                )
                            );
                        }
                        resetActionQueue() {
                            this.actionQueue && this.actionQueue.kill(),
                                (this.sequenceNumber = 0),
                                (this.synced = !0),
                                (this.buffer = []),
                                (this.timeDeficit = 0),
                                (this.actionQueue = Object(r.a)((e, t) => {
                                    const n = Date.now();
                                    if ('insert' === e.type)
                                        return this.insert(e.text, e.position), t();
                                    if ('erase' === e.type)
                                        return this.erase(e.length, e.position), t();
                                    if ('wait' !== e.type) return t();
                                    {
                                        if (this.ignoreWaits) return t();
                                        e.duration > 700 && (e.duration = 700);
                                        const i = e.duration - (n - e.baseTime) + this.timeDeficit;
                                        if (i <= 0) return (this.timeDeficit = i), t();
                                        (this.timeDeficit = 0), setTimeout(() => t(), i);
                                    }
                                }, 1)),
                                this.emitState();
                        }
                    },
                    InputBuffer: class {
                        constructor(e, t = !1) {
                            (this.resetInterval = 1e4),
                                (this.ignoreWaits = !1),
                                (this.isStarting = !1),
                                (this.isReset = !1),
                                (this.changedBetweenResets = !1),
                                (this.onStateChange = e || function () {}),
                                (this.ignoreWaits = t),
                                (this.buffer = []),
                                (this.actionQueue = []),
                                (this.sequenceNumber = 0);
                        }
                        get text() {
                            return c.a.ucs2.encode(this.buffer.slice());
                        }
                        update(e) {
                            let t = [];
                            if (void 0 !== e) {
                                e = e.normalize('NFC');
                                const n = c.a.ucs2.decode(e);
                                (t = Do(this.buffer, n.slice())),
                                    (this.buffer = n),
                                    this.emitState();
                            }
                            const n = Date.now();
                            if (
                                this.changedBetweenResets &&
                                n - this.lastResetTime > this.resetInterval
                            )
                                (this.actionQueue = []),
                                    this.actionQueue.push({
                                        position: 0,
                                        text: this.text,
                                        type: 'insert'
                                    }),
                                    (this.isReset = !0),
                                    (this.lastActionTime = n),
                                    (this.lastResetTime = n),
                                    (this.changedBetweenResets = !1);
                            else if (t.length) {
                                const e = n - (this.lastActionTime || n);
                                e > 0 &&
                                    !this.ignoreWaits &&
                                    this.actionQueue.push({ duration: e, type: 'wait' });
                                for (const e of t) this.actionQueue.push(e);
                                (this.lastActionTime = n), (this.changedBetweenResets = !0);
                            } else this.lastActionTime = n;
                        }
                        start(e = this.resetInterval) {
                            return (
                                this.commit(),
                                (this.isStarting = !0),
                                (this.resetInterval = e),
                                (this.sequenceNumber = Math.floor(1e4 * Math.random() + 1)),
                                { event: 'init' }
                            );
                        }
                        stop() {
                            return this.commit(), { event: 'cancel' };
                        }
                        diff() {
                            if ((this.update(), !this.actionQueue.length)) return null;
                            const e = { actions: this.actionQueue, seq: this.sequenceNumber++ };
                            return (
                                this.isStarting
                                    ? ((e.event = 'new'),
                                      (this.isStarting = !1),
                                      (this.lastResetTime = Date.now()))
                                    : this.isReset && ((e.event = 'reset'), (this.isReset = !1)),
                                (this.actionQueue = []),
                                e
                            );
                        }
                        commit() {
                            (this.sequenceNumber = 0),
                                (this.lastActionTime = 0),
                                (this.actionQueue = []),
                                (this.buffer = []);
                        }
                        emitState() {
                            this.onStateChange({ text: this.text });
                        }
                    }
                });
                const Uo = '12.13.0';
                function zo(e) {
                    const t = new Mo(e);
                    return t.use(Xr), t;
                }
            }.call(this, n(10).Buffer, n(4));
    },
    function (e, t, n) {
        'use strict';
        (t.byteLength = function (e) {
            var t = l(e),
                n = t[0],
                i = t[1];
            return (3 * (n + i)) / 4 - i;
        }),
            (t.toByteArray = function (e) {
                var t,
                    n,
                    i = l(e),
                    a = i[0],
                    o = i[1],
                    c = new r(
                        (function (e, t, n) {
                            return (3 * (t + n)) / 4 - n;
                        })(0, a, o)
                    ),
                    u = 0,
                    p = o > 0 ? a - 4 : a;
                for (n = 0; n < p; n += 4)
                    (t =
                        (s[e.charCodeAt(n)] << 18) |
                        (s[e.charCodeAt(n + 1)] << 12) |
                        (s[e.charCodeAt(n + 2)] << 6) |
                        s[e.charCodeAt(n + 3)]),
                        (c[u++] = (t >> 16) & 255),
                        (c[u++] = (t >> 8) & 255),
                        (c[u++] = 255 & t);
                2 === o &&
                    ((t = (s[e.charCodeAt(n)] << 2) | (s[e.charCodeAt(n + 1)] >> 4)),
                    (c[u++] = 255 & t));
                1 === o &&
                    ((t =
                        (s[e.charCodeAt(n)] << 10) |
                        (s[e.charCodeAt(n + 1)] << 4) |
                        (s[e.charCodeAt(n + 2)] >> 2)),
                    (c[u++] = (t >> 8) & 255),
                    (c[u++] = 255 & t));
                return c;
            }),
            (t.fromByteArray = function (e) {
                for (var t, n = e.length, s = n % 3, r = [], a = 0, o = n - s; a < o; a += 16383)
                    r.push(u(e, a, a + 16383 > o ? o : a + 16383));
                1 === s
                    ? ((t = e[n - 1]), r.push(i[t >> 2] + i[(t << 4) & 63] + '=='))
                    : 2 === s &&
                      ((t = (e[n - 2] << 8) + e[n - 1]),
                      r.push(i[t >> 10] + i[(t >> 4) & 63] + i[(t << 2) & 63] + '='));
                return r.join('');
            });
        for (
            var i = [],
                s = [],
                r = 'undefined' != typeof Uint8Array ? Uint8Array : Array,
                a = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
                o = 0,
                c = a.length;
            o < c;
            ++o
        )
            (i[o] = a[o]), (s[a.charCodeAt(o)] = o);
        function l(e) {
            var t = e.length;
            if (t % 4 > 0) throw new Error('Invalid string. Length must be a multiple of 4');
            var n = e.indexOf('=');
            return -1 === n && (n = t), [n, n === t ? 0 : 4 - (n % 4)];
        }
        function u(e, t, n) {
            for (var s, r, a = [], o = t; o < n; o += 3)
                (s = ((e[o] << 16) & 16711680) + ((e[o + 1] << 8) & 65280) + (255 & e[o + 2])),
                    a.push(
                        i[((r = s) >> 18) & 63] + i[(r >> 12) & 63] + i[(r >> 6) & 63] + i[63 & r]
                    );
            return a.join('');
        }
        (s['-'.charCodeAt(0)] = 62), (s['_'.charCodeAt(0)] = 63);
    },
    function (e, t) {
        (t.read = function (e, t, n, i, s) {
            var r,
                a,
                o = 8 * s - i - 1,
                c = (1 << o) - 1,
                l = c >> 1,
                u = -7,
                p = n ? s - 1 : 0,
                d = n ? -1 : 1,
                h = e[t + p];
            for (
                p += d, r = h & ((1 << -u) - 1), h >>= -u, u += o;
                u > 0;
                r = 256 * r + e[t + p], p += d, u -= 8
            );
            for (
                a = r & ((1 << -u) - 1), r >>= -u, u += i;
                u > 0;
                a = 256 * a + e[t + p], p += d, u -= 8
            );
            if (0 === r) r = 1 - l;
            else {
                if (r === c) return a ? NaN : (1 / 0) * (h ? -1 : 1);
                (a += Math.pow(2, i)), (r -= l);
            }
            return (h ? -1 : 1) * a * Math.pow(2, r - i);
        }),
            (t.write = function (e, t, n, i, s, r) {
                var a,
                    o,
                    c,
                    l = 8 * r - s - 1,
                    u = (1 << l) - 1,
                    p = u >> 1,
                    d = 23 === s ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                    h = i ? 0 : r - 1,
                    f = i ? 1 : -1,
                    m = t < 0 || (0 === t && 1 / t < 0) ? 1 : 0;
                for (
                    t = Math.abs(t),
                        isNaN(t) || t === 1 / 0
                            ? ((o = isNaN(t) ? 1 : 0), (a = u))
                            : ((a = Math.floor(Math.log(t) / Math.LN2)),
                              t * (c = Math.pow(2, -a)) < 1 && (a--, (c *= 2)),
                              (t += a + p >= 1 ? d / c : d * Math.pow(2, 1 - p)) * c >= 2 &&
                                  (a++, (c /= 2)),
                              a + p >= u
                                  ? ((o = 0), (a = u))
                                  : a + p >= 1
                                  ? ((o = (t * c - 1) * Math.pow(2, s)), (a += p))
                                  : ((o = t * Math.pow(2, p - 1) * Math.pow(2, s)), (a = 0)));
                    s >= 8;
                    e[n + h] = 255 & o, h += f, o /= 256, s -= 8
                );
                for (a = (a << s) | o, l += s; l > 0; e[n + h] = 255 & a, h += f, a /= 256, l -= 8);
                e[n + h - f] |= 128 * m;
            });
    },
    function (e, t) {
        e.exports = function (e) {
            return (
                e.webpackPolyfill ||
                    ((e.deprecate = function () {}),
                    (e.paths = []),
                    e.children || (e.children = []),
                    Object.defineProperty(e, 'loaded', {
                        enumerable: !0,
                        get: function () {
                            return e.l;
                        }
                    }),
                    Object.defineProperty(e, 'id', {
                        enumerable: !0,
                        get: function () {
                            return e.i;
                        }
                    }),
                    (e.webpackPolyfill = 1)),
                e
            );
        };
    },
    function (e, t) {},
    function (e, t, n) {
        'use strict';
        var i = n(13).Buffer,
            s = n(27);
        (e.exports = (function () {
            function e() {
                !(function (e, t) {
                    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
                })(this, e),
                    (this.head = null),
                    (this.tail = null),
                    (this.length = 0);
            }
            return (
                (e.prototype.push = function (e) {
                    var t = { data: e, next: null };
                    this.length > 0 ? (this.tail.next = t) : (this.head = t),
                        (this.tail = t),
                        ++this.length;
                }),
                (e.prototype.unshift = function (e) {
                    var t = { data: e, next: this.head };
                    0 === this.length && (this.tail = t), (this.head = t), ++this.length;
                }),
                (e.prototype.shift = function () {
                    if (0 !== this.length) {
                        var e = this.head.data;
                        return (
                            1 === this.length
                                ? (this.head = this.tail = null)
                                : (this.head = this.head.next),
                            --this.length,
                            e
                        );
                    }
                }),
                (e.prototype.clear = function () {
                    (this.head = this.tail = null), (this.length = 0);
                }),
                (e.prototype.join = function (e) {
                    if (0 === this.length) return '';
                    for (var t = this.head, n = '' + t.data; (t = t.next); ) n += e + t.data;
                    return n;
                }),
                (e.prototype.concat = function (e) {
                    if (0 === this.length) return i.alloc(0);
                    if (1 === this.length) return this.head.data;
                    for (var t, n, s, r = i.allocUnsafe(e >>> 0), a = this.head, o = 0; a; )
                        (t = a.data),
                            (n = r),
                            (s = o),
                            t.copy(n, s),
                            (o += a.data.length),
                            (a = a.next);
                    return r;
                }),
                e
            );
        })()),
            s &&
                s.inspect &&
                s.inspect.custom &&
                (e.exports.prototype[s.inspect.custom] = function () {
                    var e = s.inspect({ length: this.length });
                    return this.constructor.name + ' ' + e;
                });
    },
    function (e, t) {},
    function (e, t, n) {
        (function (e) {
            var i = (void 0 !== e && e) || ('undefined' != typeof self && self) || window,
                s = Function.prototype.apply;
            function r(e, t) {
                (this._id = e), (this._clearFn = t);
            }
            (t.setTimeout = function () {
                return new r(s.call(setTimeout, i, arguments), clearTimeout);
            }),
                (t.setInterval = function () {
                    return new r(s.call(setInterval, i, arguments), clearInterval);
                }),
                (t.clearTimeout = t.clearInterval = function (e) {
                    e && e.close();
                }),
                (r.prototype.unref = r.prototype.ref = function () {}),
                (r.prototype.close = function () {
                    this._clearFn.call(i, this._id);
                }),
                (t.enroll = function (e, t) {
                    clearTimeout(e._idleTimeoutId), (e._idleTimeout = t);
                }),
                (t.unenroll = function (e) {
                    clearTimeout(e._idleTimeoutId), (e._idleTimeout = -1);
                }),
                (t._unrefActive = t.active = function (e) {
                    clearTimeout(e._idleTimeoutId);
                    var t = e._idleTimeout;
                    t >= 0 &&
                        (e._idleTimeoutId = setTimeout(function () {
                            e._onTimeout && e._onTimeout();
                        }, t));
                }),
                n(29),
                (t.setImmediate =
                    ('undefined' != typeof self && self.setImmediate) ||
                    (void 0 !== e && e.setImmediate) ||
                    (this && this.setImmediate)),
                (t.clearImmediate =
                    ('undefined' != typeof self && self.clearImmediate) ||
                    (void 0 !== e && e.clearImmediate) ||
                    (this && this.clearImmediate));
        }.call(this, n(4)));
    },
    function (e, t, n) {
        (function (e, t) {
            !(function (e, n) {
                'use strict';
                if (!e.setImmediate) {
                    var i,
                        s,
                        r,
                        a,
                        o,
                        c = 1,
                        l = {},
                        u = !1,
                        p = e.document,
                        d = Object.getPrototypeOf && Object.getPrototypeOf(e);
                    (d = d && d.setTimeout ? d : e),
                        '[object process]' === {}.toString.call(e.process)
                            ? (i = function (e) {
                                  t.nextTick(function () {
                                      f(e);
                                  });
                              })
                            : !(function () {
                                  if (e.postMessage && !e.importScripts) {
                                      var t = !0,
                                          n = e.onmessage;
                                      return (
                                          (e.onmessage = function () {
                                              t = !1;
                                          }),
                                          e.postMessage('', '*'),
                                          (e.onmessage = n),
                                          t
                                      );
                                  }
                              })()
                            ? e.MessageChannel
                                ? (((r = new MessageChannel()).port1.onmessage = function (e) {
                                      f(e.data);
                                  }),
                                  (i = function (e) {
                                      r.port2.postMessage(e);
                                  }))
                                : p && 'onreadystatechange' in p.createElement('script')
                                ? ((s = p.documentElement),
                                  (i = function (e) {
                                      var t = p.createElement('script');
                                      (t.onreadystatechange = function () {
                                          f(e),
                                              (t.onreadystatechange = null),
                                              s.removeChild(t),
                                              (t = null);
                                      }),
                                          s.appendChild(t);
                                  }))
                                : (i = function (e) {
                                      setTimeout(f, 0, e);
                                  })
                            : ((a = 'setImmediate$' + Math.random() + '$'),
                              (o = function (t) {
                                  t.source === e &&
                                      'string' == typeof t.data &&
                                      0 === t.data.indexOf(a) &&
                                      f(+t.data.slice(a.length));
                              }),
                              e.addEventListener
                                  ? e.addEventListener('message', o, !1)
                                  : e.attachEvent('onmessage', o),
                              (i = function (t) {
                                  e.postMessage(a + t, '*');
                              })),
                        (d.setImmediate = function (e) {
                            'function' != typeof e && (e = new Function('' + e));
                            for (var t = new Array(arguments.length - 1), n = 0; n < t.length; n++)
                                t[n] = arguments[n + 1];
                            var s = { callback: e, args: t };
                            return (l[c] = s), i(c), c++;
                        }),
                        (d.clearImmediate = h);
                }
                function h(e) {
                    delete l[e];
                }
                function f(e) {
                    if (u) setTimeout(f, 0, e);
                    else {
                        var t = l[e];
                        if (t) {
                            u = !0;
                            try {
                                !(function (e) {
                                    var t = e.callback,
                                        n = e.args;
                                    switch (n.length) {
                                        case 0:
                                            t();
                                            break;
                                        case 1:
                                            t(n[0]);
                                            break;
                                        case 2:
                                            t(n[0], n[1]);
                                            break;
                                        case 3:
                                            t(n[0], n[1], n[2]);
                                            break;
                                        default:
                                            t.apply(void 0, n);
                                    }
                                })(t);
                            } finally {
                                h(e), (u = !1);
                            }
                        }
                    }
                }
            })('undefined' == typeof self ? (void 0 === e ? this : e) : self);
        }.call(this, n(4), n(11)));
    },
    function (e, t, n) {
        (function (t) {
            function n(e) {
                try {
                    if (!t.localStorage) return !1;
                } catch (e) {
                    return !1;
                }
                var n = t.localStorage[e];
                return null != n && 'true' === String(n).toLowerCase();
            }
            e.exports = function (e, t) {
                if (n('noDeprecation')) return e;
                var i = !1;
                return function () {
                    if (!i) {
                        if (n('throwDeprecation')) throw new Error(t);
                        n('traceDeprecation') ? console.trace(t) : console.warn(t), (i = !0);
                    }
                    return e.apply(this, arguments);
                };
            };
        }.call(this, n(4)));
    },
    function (e, t, n) {
        var i = n(10),
            s = i.Buffer;
        function r(e, t) {
            for (var n in e) t[n] = e[n];
        }
        function a(e, t, n) {
            return s(e, t, n);
        }
        s.from && s.alloc && s.allocUnsafe && s.allocUnsafeSlow
            ? (e.exports = i)
            : (r(i, t), (t.Buffer = a)),
            r(s, a),
            (a.from = function (e, t, n) {
                if ('number' == typeof e) throw new TypeError('Argument must not be a number');
                return s(e, t, n);
            }),
            (a.alloc = function (e, t, n) {
                if ('number' != typeof e) throw new TypeError('Argument must be a number');
                var i = s(e);
                return (
                    void 0 !== t ? ('string' == typeof n ? i.fill(t, n) : i.fill(t)) : i.fill(0), i
                );
            }),
            (a.allocUnsafe = function (e) {
                if ('number' != typeof e) throw new TypeError('Argument must be a number');
                return s(e);
            }),
            (a.allocUnsafeSlow = function (e) {
                if ('number' != typeof e) throw new TypeError('Argument must be a number');
                return i.SlowBuffer(e);
            });
    },
    function (e, t, n) {
        'use strict';
        e.exports = r;
        var i = n(20),
            s = Object.create(n(7));
        function r(e) {
            if (!(this instanceof r)) return new r(e);
            i.call(this, e);
        }
        (s.inherits = n(8)),
            s.inherits(r, i),
            (r.prototype._transform = function (e, t, n) {
                n(null, e);
            });
    }
]);
