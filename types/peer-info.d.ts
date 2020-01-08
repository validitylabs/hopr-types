declare module 'peer-info' {
  import PeerId from 'peer-id'
  import { MultiaddrClass } from 'multiaddr'

  export default class PeerInfo {
    constructor (peerId: PeerId)

    readonly id: PeerId
    multiaddrs: MultiaddrSet

    /**
     * Stores protocols this peers supports
     */
    protocols: Set<string>

    // only stores the current multiaddr being used
    connect(ma: MultiaddrClass): void

    disconnect(): void
    isConnected(): MultiaddrClass | undefined

    static isPeerInfo(peerInfo: any): peerInfo is PeerInfo

    static create(peerId?: PeerId): Promise<PeerInfo>
  }


  export class MultiaddrSet {
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

  export interface MultiaddrSet {
    new (multiaddrs?: MultiaddrClass[]): MultiaddrSet
  }
}
