// ====================================================================
// XEP-0338: Jingle Grouping Framework
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0338.html
// Version: 0.2 (2017-09-11)
// ====================================================================
import { attribute, multipleChildAttribute } from '../jxt';
import { NS_JINGLE_GROUPING_0 } from '../Namespaces';
const Protocol = [
    {
        aliases: [{ path: 'iq.jingle.groups', multiple: true }],
        element: 'group',
        fields: {
            contents: multipleChildAttribute(null, 'content', 'name'),
            semantics: attribute('semantics')
        },
        namespace: NS_JINGLE_GROUPING_0
    }
];
export default Protocol;
