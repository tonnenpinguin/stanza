import { __awaiter } from 'tslib';
import { fetch } from 'stanza-shims';
import * as JXT from '../jxt';
import { NS_ALT_CONNECTIONS_WEBSOCKET, NS_ALT_CONNECTIONS_XBOSH } from '../Namespaces';
function promiseAny(promises) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const errors = yield Promise.all(
                promises.map(p => {
                    return p.then(
                        val => Promise.reject(val),
                        err => Promise.resolve(err)
                    );
                })
            );
            return Promise.reject(errors);
        } catch (val) {
            return Promise.resolve(val);
        }
    });
}
export function getHostMeta(registry, opts) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof opts === 'string') {
            opts = { host: opts };
        }
        const config = Object.assign({ json: true, ssl: true, xrd: true }, opts);
        const scheme = config.ssl ? 'https://' : 'http://';
        return promiseAny([
            fetch(`${scheme}${config.host}/.well-known/host-meta.json`).then(res =>
                __awaiter(this, void 0, void 0, function* () {
                    if (!res.ok) {
                        throw new Error('could-not-fetch-json');
                    }
                    return res.json();
                })
            ),
            fetch(`${scheme}${config.host}/.well-known/host-meta`).then(res =>
                __awaiter(this, void 0, void 0, function* () {
                    if (!res.ok) {
                        throw new Error('could-not-fetch-xml');
                    }
                    const data = yield res.text();
                    const xml = JXT.parse(data);
                    if (xml) {
                        return registry.import(xml);
                    }
                })
            )
        ]);
    });
}
export default function (client, stanzas) {
    client.discoverBindings = server =>
        __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield getHostMeta(stanzas, server);
                const results = {
                    bosh: [],
                    websocket: []
                };
                const links = data.links || [];
                for (const link of links) {
                    if (link.href && link.rel === NS_ALT_CONNECTIONS_WEBSOCKET) {
                        results.websocket.push(link.href);
                    }
                    if (link.href && link.rel === NS_ALT_CONNECTIONS_XBOSH) {
                        results.bosh.push(link.href);
                    }
                }
                return results;
            } catch (err) {
                return {};
            }
        });
}
