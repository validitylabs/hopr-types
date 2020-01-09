declare module 'peer-book' {
  import Multiaddr from 'multiaddr'
  import PeerId from 'peer-id'
  import PeerInfo from 'peer-info'

  export class PeerBookClass {
    _peers: {
      [index: string]: PeerInfo
    }

    constructor()

    // checks if peer exists
    // peer can be PeerId, b58String or PeerInfo
    has(peer: PeerId | PeerInfo | string): boolean

    /**
     * Stores a peerInfo, if already exist, merges the new into the old.
     *
     * @param peerInfo
     * @param replace
     */
    put(peerInfo: PeerInfo, replace?: boolean): PeerInfo

    /**
     * Get the info to the given PeerId, PeerInfo or b58Str id
     *
     * @param peer
     */
    get(peer: PeerId): PeerInfo

    getAll(): this['_peers']

    getAllArray(): PeerInfo[]

    getMultiaddrs(peer: PeerInfo): Multiaddr

    remove(peer: PeerInfo): void
  }
}
