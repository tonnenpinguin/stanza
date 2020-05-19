import Client from './Client';
import * as Constants from './Constants';
import * as RTT from './helpers/RTT';
import * as JID from './JID';
import * as Jingle from './jingle';
import * as JXT from './jxt';
import * as LibSASL from './lib/sasl';
import * as Namespaces from './Namespaces';
import * as Stanzas from './protocol';
import * as Utils from './Utils';
export * from './helpers/StreamManagement';
export { Client, Constants, JXT, JID, Namespaces, Stanzas, Jingle, Utils, RTT, LibSASL as SASL };
export const VERSION = Constants.VERSION;
import Plugins from './plugins';
export * from './plugins';
export function createClient(opts) {
    const client = new Client(opts);
    client.use(Plugins);
    return client;
}
