// ====================================================================
// XEP-0352: Client State Indication
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0352.html
// Version: 0.2.1 (2017-02-18)
// ====================================================================
import { NS_CSI_0 } from '../Namespaces';
const Protocol = [
    {
        element: 'active',
        namespace: NS_CSI_0,
        path: 'csi',
        type: 'active',
        typeField: 'state'
    },
    {
        element: 'inactive',
        namespace: NS_CSI_0,
        path: 'csi',
        type: 'inactive',
        typeField: 'state'
    }
];
export default Protocol;
