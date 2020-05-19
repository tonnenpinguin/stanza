import { Duplex } from 'readable-stream';
import { Agent, Transport, TransportConfig } from '../';
import StreamManagement from '../helpers/StreamManagement';
import { Stream } from '../protocol';
import { Registry } from '../jxt';
export default class BOSH extends Duplex implements Transport {
    hasStream?: boolean;
    stream?: Stream;
    authenticated?: boolean;
    url: string;
    rid?: number;
    sid?: string;
    maxHoldOpen: number;
    maxWaitTime: number;
    contentType: string;
    private channels;
    private activeChannelID;
    private client;
    private config;
    private sm;
    private stanzas;
    private idleTimeout;
    private queue;
    private isEnded;
    constructor(client: Agent, sm: StreamManagement, stanzas: Registry);
    _write(chunk: any, encoding: string, done: (err?: Error) => void): void;
    _writev(
        chunks: Array<{
            chunk: any;
            encoding: any;
        }>,
        done: (err?: Error) => void
    ): void;
    _read(): void;
    process(result: string): void;
    connect(opts: TransportConfig): void;
    restart(): void;
    disconnect(): void;
    send(dataOrName: string, data?: object): Promise<void>;
    private get sendingChannel();
    private get pollingChannel();
    private toggleChannel;
    private _send;
    private _poll;
    private scheduleRequests;
    private fireRequests;
}
