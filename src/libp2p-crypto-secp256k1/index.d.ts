declare module 'libp2p-crypto-secp256k1' {    
    export class Secp256k1PublicKey {
        public readonly bytes: Buffer

        constructor(key: any)

        verify(data: any, sig: any): any

        marshal(): Buffer

        equals(key: Secp256k1PublicKey): boolean

        hash(): any
    }

    export class Secp256k1PrivateKey {
        public readonly bytes: Buffer

        constructor(key: any, publicKey?: Secp256k1PublicKey)

        sign(message: any): any

        public: Secp256k1PublicKey

        marshal(): any

        equals(key: Secp256k1PrivateKey): boolean

        hash(): any

        /**
         * Gets the ID of the key.
         *
         * The key id is the base58 encoding of the SHA-256 multihash of its public key.
         * The public key is a protobuf encoding containing a type and the DER encoding
         * of the PKCS SubjectPublicKeyInfo.
         */
        id(): Promise<any>
    }

    export function unmarshalSecp256k1PrivateKey(bytes: Buffer): Secp256k1PrivateKey

    export function unmarshalSecp256k1PublicKey(bytes: Buffer): Secp256k1PublicKey

    export function generateKeyPair(): Promise<Secp256k1PrivateKey>

    export type secp256k1 = {
        Secp256k1PublicKey: typeof Secp256k1PublicKey,
        Secp256k1PrivateKey: typeof Secp256k1PrivateKey,
        unmarshalSecp256k1PrivateKey: typeof unmarshalSecp256k1PrivateKey,
        unmarshalSecp256k1PublicKey: typeof unmarshalSecp256k1PublicKey,
        generateKeyPair: typeof generateKeyPair
    }
}
