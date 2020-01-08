declare module 'peer-info' {
  import PeerId from 'peer-id'
  import { MultiaddrClass } from 'multiaddr'

  // Peer represents a peer on the IPFS network
  export default class PeerInfo {
    public id: PeerId
    public multiaddrs: MultiaddrSet

    private _connectedMultiaddr?: MultiaddrClass

    /**
     * Stores protocols this peers supports
     */
    public protocols: Set<string>

    constructor(peerId: PeerId)

    // only stores the current multiaddr being used
    connect(ma: MultiaddrClass): void

    disconnect(): void
    isConnected(): MultiaddrClass | undefined

    static isPeerInfo(peerInfo: any): peerInfo is PeerInfo

    static create(peerId?: PeerId): Promise<PeerInfo>
  }

  export class MultiaddrSet {
    private _multiaddrs?: MultiaddrClass[]
    private _observedMultiaddrs?: MultiaddrClass[]

    constructor(multiaddrs?: MultiaddrClass[])

    readonly size: number

    add(ma: MultiaddrClass): void

    // addSafe - prevent multiaddr explosion™
    // Multiaddr explosion is when you dial to a bunch of nodes and every node
    // gives you a different observed address and you start storing them all to
    // share with other peers. This seems like a good idea until you realize that
    // most of those addresses are unique to the subnet that peer is in and so,
    // they are completely worthless for all the other peers. This method is
    // exclusively used by identify.
    addSafe(ma: MultiaddrClass): void

    toArray(): MultiaddrClass[]

    forEach(fn: (ma: MultiaddrClass, index: number, array: MultiaddrClass[]) => void): void

    filterBy(maFmt: {
      /* prettier-ignore */
      matches: (ma: MultiaddrClass) => boolean;
      partialMatch: (ma: MultiaddrClass) => boolean
      toString: () => string
    }): MultiaddrClass[]

    has(ma: MultiaddrClass): boolean

    delete(ma: MultiaddrClass): void

    // replaces selected existing multiaddrs with new ones
    replace(existing: MultiaddrClass | MultiaddrClass[], fresh: MultiaddrClass | MultiaddrClass[]): void

    clear(): void

    // this only really helps make ip6 and ip4 multiaddrs distinct if they are
    // different
    // TODO this is not an ideal solution, probably this code should just be
    // in libp2p-tcp
    distinct(): MultiaddrClass[]
  }
}
