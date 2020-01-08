import Multiaddr, { MultiaddrClass } from 'multiaddr'
import PeerId from 'peer-id'
import { PeerInfoClass } from 'peer-info'

declare module 'peer-book' {
  export interface PeerBookClass {
    _peers: {
      [index: string]: PeerInfoClass
    }

    // checks if peer exists
    // peer can be PeerId, b58String or PeerInfo
    has(peer: PeerId | PeerInfoClass | string): boolean

    /**
     * Stores a peerInfo, if already exist, merges the new into the old.
     *
     * @param peerInfo
     * @param replace
     */
    put(peerInfo: PeerInfoClass, replace?: boolean): PeerInfoClass

    /**
     * Get the info to the given PeerId, PeerInfo or b58Str id
     *
     * @param peer
     */
    get(peer: PeerId): PeerInfoClass

    getAll(): this['_peers']

    getAllArray(): PeerInfoClass[]

    getMultiaddrs(peer: PeerInfoClass): MultiaddrClass

    remove(peer: PeerInfoClass): void
  }

  export interface PeerBook {
    new (): PeerBookClass
  }
}
