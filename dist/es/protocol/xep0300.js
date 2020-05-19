// ====================================================================
// XEP-0300: Use of Cryptographic Hash Functions in XMPP
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0300.html
// Version: 0.5.3 (2018-02-14)
// ====================================================================
import { attribute, staticValue, textBuffer } from '../jxt';
import { NS_HASHES_1, NS_HASHES_2 } from '../Namespaces';
const Protocol = [
    {
        defaultType: '2',
        element: 'hash',
        fields: {
            algorithm: attribute('algo'),
            value: textBuffer('base64'),
            version: staticValue('2')
        },
        namespace: NS_HASHES_2,
        path: 'hash',
        type: '2',
        typeField: 'version'
    },
    {
        element: 'hash-used',
        fields: {
            algorithm: attribute('algo'),
            version: staticValue('2')
        },
        namespace: NS_HASHES_2,
        path: 'hashUsed'
    },
    {
        element: 'hash',
        fields: {
            algorithm: attribute('algo'),
            value: textBuffer('hex'),
            version: staticValue('1')
        },
        namespace: NS_HASHES_1,
        path: 'hash',
        type: '1',
        typeField: 'version'
    }
];
export default Protocol;
