// ====================================================================
// XEP-0317: Hats
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0317.html
// Version: 0.1 (2013-01-03)
// ====================================================================
import { attribute, extendPresence, splicePath } from '../jxt';
import { NS_HATS_0 } from '../Namespaces';
const Protocol = [
    extendPresence({
        hats: splicePath(NS_HATS_0, 'hats', 'hat', true)
    }),
    {
        element: 'hat',
        fields: {
            id: attribute('name'),
            name: attribute('displayName')
        },
        namespace: NS_HATS_0,
        path: 'hat'
    }
];
export default Protocol;
