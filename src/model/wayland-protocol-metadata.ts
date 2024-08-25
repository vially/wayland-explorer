export enum WaylandProtocolStability {
    Stable = 'stable',
    Staging = 'staging',
    Unstable = 'unstable',
}

export enum WaylandProtocolSource {
    WaylandCore = 'core',
    WaylandProtocols = 'wayland-protocols',
    WlrProtocols = 'wlr-protocols',
    KDEProtocols = 'kde-protocols',
    CosmicProtocols = 'cosmic-protocols',
    WestonProtocols = 'weston-protocols',
    External = 'external',
}

export interface WaylandDeprecationItem {
    name: string
    reason: string
}

export interface WaylandProtocolMetadata {
    id: string
    name: string
    source: WaylandProtocolSource
    stability: WaylandProtocolStability
    externalUrl?: string
    deprecated?: WaylandDeprecationItem[]
}
