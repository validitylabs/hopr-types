declare module 'peer-id' {
  export type PeerIdJSON = {
    id: string
    privKey: string
    pubKey: string
  }

  export interface PeerIdClass {
    readonly className: 'PeerId'
    readonly symbolName: '@libp2p/js-peer-id/PeerId'

    readonly id: Buffer
    privKey: any
    pubKey: any

    // Return the protobuf version of the public key, matching go ipfs formatting
    marshalPubKey(): Buffer

    // Return the protobuf version of the private key, matching go ipfs formatting
    marshalPrivKey(): Buffer

    // Return the protobuf version of the peer-id
    marshal(excludePriv?: boolean): Buffer

    toPrint(): string

    // return the jsonified version of the key, matching the formatting
    // of go-ipfs for its config file
    toJSON(): PeerIdJSON

    // encode/decode functions
    toHexString(): string

    toBytes(): Buffer

    toB58String(): string

    // return self-describing String representation
    // in default format from RFC 0001: https://github.com/libp2p/specs/pull/209
    toString(): string

    /**
     * Checks the equality of `this` peer against a given PeerId.
     * @param {Buffer|PeerId} id
     * @returns {boolean}
     */
    equals(id: Buffer | PeerId): boolean

    /**
     * Checks the equality of `this` peer against a given PeerId.
     * @deprecated Use `.equals`
     * @param {Buffer|PeerId} id
     * @returns {boolean}
     */
    isEqual(id: Buffer | PeerId): boolean

    /*
     * Check if this PeerId instance is valid (privKey -> pubKey -> Id)
     */
    isValid(): boolean
  }

  export default interface PeerId {
    new (id: Buffer, privKey?: any, pubKey?: any): PeerIdClass

    create(opts?: { bits?: number; keyType?: string }): Promise<PeerIdClass>

    createFromHexString(str: string): PeerIdClass

    createFromBytes(buf: Buffer): PeerIdClass

    createFromB58String(str: string): PeerIdClass

    createFromCID(cid: any): PeerIdClass

    createFromPubKey(key: Buffer | string): Promise<PeerIdClass>

    createFromPrivKey(key: Buffer | string): Promise<PeerIdClass>

    createFromJSON(obj: PeerIdJSON): Promise<PeerIdClass>

    createFromProtobuf(buf: Buffer | string): Promise<PeerIdClass>

    isPeerId(peerId: any): peerId is PeerIdClass
  }
}
