// ====================================================================
// XEP-0380: Explicit Message Encryption
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0380.html
// Version: 0.2.0 (2018-01-25)
// ====================================================================

import { attribute, DefinitionOptions } from '../jxt';

import { NS_EME_0 } from '../Namespaces';

declare module './' {
    export interface Message {
        encryptionMethod?: EncryptionMethod;
    }
}

export interface EncryptionMethod {
    name?: string;
    id: string;
}

const Protocol: DefinitionOptions = {
    element: 'encryption',
    fields: {
        id: attribute('namespace'),
        name: attribute('name')
    },
    namespace: NS_EME_0,
    path: 'message.encryptionMethod'
};
export default Protocol;
