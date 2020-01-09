declare module 'multiaddr' {
  export type NodeAddress = {
    family: 'IPv4' | 'IPv6'
    address: string
    port: string
  }

  export type MultiaddrOptions = {
    family: 'ipv4' | 'ipv6'
    host: string
    transport: 'udp' | 'tcp'
    port: number
  }

  export default class Multiaddr {
    public readonly buffer: Buffer

    public readonly className: 'Multiaddr'
    public readonly symbolName: '@multiformats/js-multiaddr/multiaddr'
    /**
     * Creates a [multiaddr](https://github.com/multiformats/multiaddr) from
     * a Buffer, String or another Multiaddr instance
     * public key.
     * @class Multiaddr
     * @param {(String|Buffer|MultiaddrClass)} addr - If String or Buffer, needs to adhere
     * to the address format of a [multiaddr](https://github.com/multiformats/multiaddr#string-format)
     * @example
     * Multiaddr('/ip4/127.0.0.1/tcp/4001')
     * // <Multiaddr 047f000001060fa1 - /ip4/127.0.0.1/tcp/4001>
     */
    constructor(addr: string | Buffer | Multiaddr)

    isMultiAddr(ma: any): ma is Multiaddr

    /**
     * Returns Multiaddr as a String
     *
     * @returns {String}
     * @example
     * Multiaddr('/ip4/127.0.0.1/tcp/4001').toString()
     * // '/ip4/127.0.0.1/tcp/4001'
     */
    toString(): string

    /**
     * Returns Multiaddr as a JSON encoded object
     *
     * @returns {String}
     * @example
     * JSON.stringify(Multiaddr('/ip4/127.0.0.1/tcp/4001'))
     * // '/ip4/127.0.0.1/tcp/4001'
     */
    toJSON(): string

    /**
     * Returns Multiaddr as a convinient options object to be used with net.createConnection
     *
     * @returns {{family: String, host: String, transport: String, port: Number}}
     * @example
     * Multiaddr('/ip4/127.0.0.1/tcp/4001').toOptions()
     * // { family: 'ipv4', host: '127.0.0.1', transport: 'tcp', port: 4001 }
     */
    toOptions(): MultiaddrOptions

    /**
     * Returns Multiaddr as a human-readable string
     *
     * @returns {String}
     * @example
     * Multiaddr('/ip4/127.0.0.1/tcp/4001').inspect()
     * // '<Multiaddr 047f000001060fa1 - /ip4/127.0.0.1/tcp/4001>'
     */
    inspect(): string

    /**
     * Returns the protocols the Multiaddr is defined with, as an array of objects, in
     * left-to-right order. Each object contains the protocol code, protocol name,
     * and the size of its address space in bits.
     * [See list of protocols](https://github.com/multiformats/multiaddr/blob/master/protocols.csv)
     *
     * @returns {Array.<Object>} protocols - All the protocols the address is composed of
     * @returns {Number} protocols[].code
     * @returns {Number} protocols[].size
     * @returns {String} protocols[].name
     * @example
     * Multiaddr('/ip4/127.0.0.1/tcp/4001').protos()
     * // [ { code: 4, size: 32, name: 'ip4' },
     * //   { code: 6, size: 16, name: 'tcp' } ]
     */
    protos(): { code: number; size: number; name: string }[]

    /**
     * Returns the codes of the protocols in left-to-right order.
     * [See list of protocols](https://github.com/multiformats/multiaddr/blob/master/protocols.csv)
     *
     * @returns {Array.<Number>} protocol codes
     * @example
     * Multiaddr('/ip4/127.0.0.1/tcp/4001').protoCodes()
     * // [ 4, 6 ]
     */
    protoCodes(): number[]

    /**
     * Returns the names of the protocols in left-to-right order.
     * [See list of protocols](https://github.com/multiformats/multiaddr/blob/master/protocols.csv)
     *
     * @return {Array.<String>} protocol names
     * @example
     * Multiaddr('/ip4/127.0.0.1/tcp/4001').protoNames()
     * // [ 'ip4', 'tcp' ]
     */
    protoNames(): string[]

    /**
     * Returns a tuple of parts
     *
     * @return {Array.<Array>} tuples
     * @return {Number} tuples[].0 code of protocol
     * @return {Buffer} tuples[].1 contents of address
     * @example
     * Multiaddr("/ip4/127.0.0.1/tcp/4001").tuples()
     * // [ [ 4, <Buffer 7f 00 00 01> ], [ 6, <Buffer 0f a1> ] ]
     */
    tuples(): [number, Buffer][]

    /**
     * Returns a tuple of string/number parts
     *
     * @return {Array.<Array>} tuples
     * @return {Number} tuples[].0 code of protocol
     * @return {(String|Number)} tuples[].1 contents of address
     * @example
     * Multiaddr("/ip4/127.0.0.1/tcp/4001").stringTuples()
     * // [ [ 4, '127.0.0.1' ], [ 6, 4001 ] ]
     */
    stringTuples(): [number, string][]

    /**
     * Encapsulates a Multiaddr in another Multiaddr
     *
     * @param {MultiaddrClass} addr - Multiaddr to add into this Multiaddr
     * @return {MultiaddrClass}
     * @example
     * const mh1 = Multiaddr('/ip4/8.8.8.8/tcp/1080')
     * // <Multiaddr 0408080808060438 - /ip4/8.8.8.8/tcp/1080>
     *
     * const mh2 = Multiaddr('/ip4/127.0.0.1/tcp/4001')
     * // <Multiaddr 047f000001060fa1 - /ip4/127.0.0.1/tcp/4001>
     *
     * const mh3 = mh1.encapsulate(mh2)
     * // <Multiaddr 0408080808060438047f000001060fa1 - /ip4/8.8.8.8/tcp/1080/ip4/127.0.0.1/tcp/4001>
     *
     * mh3.toString()
     * // '/ip4/8.8.8.8/tcp/1080/ip4/127.0.0.1/tcp/4001'
     */
    encapsulate(addr: Multiaddr): Multiaddr

    /**
     * Decapsulates a Multiaddr from another Multiaddr
     *
     * @param {MultiaddrClass} addr - Multiaddr to remove from this Multiaddr
     * @return {MultiaddrClass}
     * @example
     * const mh1 = Multiaddr('/ip4/8.8.8.8/tcp/1080')
     * // <Multiaddr 0408080808060438 - /ip4/8.8.8.8/tcp/1080>
     *
     * const mh2 = Multiaddr('/ip4/127.0.0.1/tcp/4001')
     * // <Multiaddr 047f000001060fa1 - /ip4/127.0.0.1/tcp/4001>
     *
     * const mh3 = mh1.encapsulate(mh2)
     * // <Multiaddr 0408080808060438047f000001060fa1 - /ip4/8.8.8.8/tcp/1080/ip4/127.0.0.1/tcp/4001>
     *
     * mh3.decapsulate(mh2).toString()
     * // '/ip4/8.8.8.8/tcp/1080'
     */
    decapsulate(addr: Multiaddr): Multiaddr

    /**
     * A more reliable version of `decapsulate` if you are targeting a
     * specific code, such as 421 (the `p2p` protocol code). The last index of the code
     * will be removed from the `Multiaddr`, and a new instance will be returned.
     * If the code is not present, the original `Multiaddr` is returned.
     *
     * @param {Number} code The code of the protocol to decapsulate from this Multiaddr
     * @return {MultiaddrClass}
     * @example
     * const addr = Multiaddr('/ip4/0.0.0.0/tcp/8080/p2p/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSupNKC')
     * // <Multiaddr 0400... - /ip4/0.0.0.0/tcp/8080/p2p/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSupNKC>
     *
     * addr.decapsulateCode(421).toString()
     * // '/ip4/0.0.0.0/tcp/8080'
     *
     * Multiaddr('/ip4/127.0.0.1/tcp/8080').decapsulateCode(421).toString()
     * // '/ip4/127.0.0.1/tcp/8080'
     */
    decapsulateCode(code: number): Multiaddr

    /**
     * Extract the peerId if the multiaddr contains one
     *
     * @return {String|null} peerId - The id of the peer or null if invalid or missing from the ma
     * @example
     * const mh1 = Multiaddr('/ip4/8.8.8.8/tcp/1080/ipfs/QmValidBase58string')
     * // <Multiaddr 0408080808060438 - /ip4/8.8.8.8/tcp/1080/ipfs/QmValidBase58string>
     *
     * // should return QmValidBase58string or null if the id is missing or invalid
     * const peerId = mh1.getPeerId()
     */
    getPeerId(): string

    /**
     * Extract the path if the multiaddr contains one
     *
     * @return {String|null} path - The path of the multiaddr, or null if no path protocol is present
     * @example
     * const mh1 = Multiaddr('/ip4/8.8.8.8/tcp/1080/unix/tmp/p2p.sock')
     * // <Multiaddr 0408080808060438 - /ip4/8.8.8.8/tcp/1080/unix/tmp/p2p.sock>
     *
     * // should return utf8 string or null if the id is missing or invalid
     * const path = mh1.getPath()
     */
    getPath(): string | null

    /**
     * Checks if two Multiaddrs are the same
     *
     * @param {MultiaddrClass} addr
     * @return {Bool}
     * @example
     * const mh1 = Multiaddr('/ip4/8.8.8.8/tcp/1080')
     * // <Multiaddr 0408080808060438 - /ip4/8.8.8.8/tcp/1080>
     *
     * const mh2 = Multiaddr('/ip4/127.0.0.1/tcp/4001')
     * // <Multiaddr 047f000001060fa1 - /ip4/127.0.0.1/tcp/4001>
     *
     * mh1.equals(mh1)
     * // true
     *
     * mh1.equals(mh2)
     * // false
     */
    equals(addr: Multiaddr): boolean

    /**
     * Gets a Multiaddrs node-friendly address object. Note that protocol information
     * is left out: in Node (and most network systems) the protocol is unknowable
     * given only the address.
     *
     * Has to be a ThinWaist Address, otherwise throws error
     *
     * @returns {{family: String, address: String, port: Number}}
     * @throws {Error} Throws error if Multiaddr is not a Thin Waist address
     * @example
     * Multiaddr('/ip4/127.0.0.1/tcp/4001').nodeAddress()
     * // {family: 'IPv4', address: '127.0.0.1', port: '4001'}
     */
    nodeAddress(): NodeAddress

    // TODO find a better example, not sure about it's good enough
    /**
     * Returns if a Multiaddr is a Thin Waist address or not.
     *
     * Thin Waist is if a Multiaddr adheres to the standard combination of:
     *
     * `{IPv4, IPv6}/{TCP, UDP}`
     *
     * @param {MultiaddrClass} [addr] - Defaults to using `this` instance
     * @returns {Boolean} isThinWaistAddress
     * @example
     * const mh1 = Multiaddr('/ip4/127.0.0.1/tcp/4001')
     * // <Multiaddr 047f000001060fa1 - /ip4/127.0.0.1/tcp/4001>
     * const mh2 = Multiaddr('/ip4/192.168.2.1/tcp/5001')
     * // <Multiaddr 04c0a80201061389 - /ip4/192.168.2.1/tcp/5001>
     * const mh3 = mh1.encapsulate(mh2)
     * // <Multiaddr 047f000001060fa104c0a80201061389 - /ip4/127.0.0.1/tcp/4001/ip4/192.168.2.1/tcp/5001>
     * mh1.isThinWaistAddress()
     * // true
     * mh2.isThinWaistAddress()
     * // true
     * mh3.isThinWaistAddress()
     * // false
     */
    isThinWaistAddress(addr?: Multiaddr): boolean

    /**
     * Object containing table, names and codes of all supported protocols.
     * To get the protocol values from a Multiaddr, you can use
     * [`.protos()`](#multiaddrprotos),
     * [`.protoCodes()`](#multiaddrprotocodes) or
     * [`.protoNames()`](#multiaddrprotonames)
     *
     * @instance
     * @returns {{table: Array, names: Object, codes: Object}}
     *
     */
    protocols: {
      table: any[]
      names: any
      codes: any
    }

    /**
     * Creates a Multiaddr from a node-friendly address object
     *
     * @param {{family: String, address: String, port: Number}} addr
     * @param {String} transport
     * @returns {MultiaddrClass} multiaddr
     * @throws {Error} Throws error if addr is not truthy
     * @throws {Error} Throws error if transport is not truthy
     * @example
     * Multiaddr.fromNodeAddress({address: '127.0.0.1', port: '4001'}, 'tcp')
     * // <Multiaddr 047f000001060fa1 - /ip4/127.0.0.1/tcp/4001>
     */
    static fromNodeAddress(addr: NodeAddress, transport: 'tcp' | 'udp'): Multiaddr

    /**
     * Returns if something is a Multiaddr that is a name
     *
     * @param {MultiaddrClass} addr
     * @return {Bool} isName
     */
    static isName(addr: Multiaddr): boolean

    /**
     * Returns an array of multiaddrs, by resolving the multiaddr that is a name
     *
     * @async
     * @param {MultiaddrClass} addr
     * @return {MultiaddrClass[]}
     */
    static resolve(addr: Multiaddr): Promise<Multiaddr[]>
  }

  export default function Multiaddr(addr: string | Buffer | Multiaddr): Multiaddr

}