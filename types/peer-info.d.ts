declare module 'peer-info' {
  import PeerId from 'peer-id'
  import Multiaddr from 'multiaddr'

  export default class PeerInfo {
    constructor (peerId: PeerId)

    readonly id: PeerId
    multiaddrs: MultiaddrSet

    /**
     * Stores protocols this peers supports
     */
    protocols: Set<string>

    // only stores the current multiaddr being used
    connect(ma: Multiaddr): void

    disconnect(): void
    isConnected(): Multiaddr | undefined

    static isPeerInfo(peerInfo: any): peerInfo is PeerInfo

    static create(peerId?: PeerId): Promise<PeerInfo>
  }


  export class MultiaddrSet {
    readonly size: number

    add(ma: Multiaddr): void

    // addSafe - prevent multiaddr explosion™
    // Multiaddr explosion is when you dial to a bunch of nodes and every node
    // gives you a different observed address and you start storing them all to
    // share with other peers. This seems like a good idea until you realize that
    // most of those addresses are unique to the subnet that peer is in and so,
    // they are completely worthless for all the other peers. This method is
    // exclusively used by identify.
    addSafe(ma: Multiaddr): void

    toArray(): Multiaddr[]

    forEach(fn: (ma: Multiaddr, index: number, array: Multiaddr[]) => void): void

    filterBy(maFmt: {
      /* prettier-ignore */
      matches: (ma: Multiaddr) => boolean;
      partialMatch: (ma: Multiaddr) => boolean
      toString: () => string
    }): Multiaddr[]

    has(ma: Multiaddr): boolean

    delete(ma: Multiaddr): void

    // replaces selected existing multiaddrs with new ones
    replace(existing: Multiaddr | Multiaddr[], fresh: Multiaddr | Multiaddr[]): void

    clear(): void

    // this only really helps make ip6 and ip4 multiaddrs distinct if they are
    // different
    // TODO this is not an ideal solution, probably this code should just be
    // in libp2p-tcp
    distinct(): Multiaddr[]
  }

  export interface MultiaddrSet {
    new (multiaddrs?: Multiaddr[]): MultiaddrSet
  }
}
