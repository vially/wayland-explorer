export enum WaylandProtocolStability {
    Stable = 'stable',
    Staging = 'staging',
    Unstable = 'unstable',
    Experimental = 'experimental',
}

export enum WaylandProtocolSource {
    WaylandCore = 'core',
    WaylandProtocols = 'wayland-protocols',
    WlrProtocols = 'wlr-protocols',
    KDEProtocols = 'kde-protocols',
    HyprlandProtocols = 'hyprland-protocols',
    CosmicProtocols = 'cosmic-protocols',
    WestonProtocols = 'weston-protocols',
    TreelandProtocols ='treeland-protocols',
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
