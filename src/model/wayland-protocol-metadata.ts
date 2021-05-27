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
    External = 'external',
}

export interface WaylandProtocolMetadata {
    id: string
    name: string
    source: WaylandProtocolSource
    stability: WaylandProtocolStability
    externalUrl?: string
}

export enum GitServiceProvider {
    GitHub = 'GitHub',
    GitLab = 'GitLab',
}
