// ====================================================================
// XEP-0177: Jingle Raw UDP Transport Method
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0177.html
// Version: 1.1 (2009-12-23)
// ====================================================================
import { attribute, childBoolean, integerAttribute } from '../jxt';
import { NS_JINGLE_RAW_UDP_1 } from '../Namespaces';
const Protocol = [
    {
        element: 'transport',
        fields: {
            gatheringComplete: childBoolean(null, 'gathering-complete'),
            password: attribute('pwd'),
            usernameFragment: attribute('ufrag')
        },
        namespace: NS_JINGLE_RAW_UDP_1,
        path: 'iq.jingle.contents.transport',
        type: NS_JINGLE_RAW_UDP_1,
        typeField: 'transportType'
    },
    {
        aliases: [
            {
                impliedType: true,
                multiple: true,
                path: 'iq.jingle.contents.transport.candidates',
                selector: NS_JINGLE_RAW_UDP_1
            }
        ],
        element: 'candidate',
        fields: {
            component: integerAttribute('component'),
            foundation: attribute('foundation'),
            generation: integerAttribute('generation'),
            id: attribute('id'),
            ip: attribute('ip'),
            port: integerAttribute('port'),
            type: attribute('type')
        },
        namespace: NS_JINGLE_RAW_UDP_1,
        type: NS_JINGLE_RAW_UDP_1,
        typeField: 'transportType'
    }
];
export default Protocol;
