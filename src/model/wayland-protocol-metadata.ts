export enum WaylandProtocolStability {
    Stable = 'stable',
    Unstable = 'unstable',
}

export enum WaylandProtocolSource {
    WaylandCore = 'core',
    WaylandProtocols = 'wayland-protocols',
    WlrProtocols = 'wlr-protocols',
}

export interface WaylandProtocolMetadata {
    id: string
    name: string
    source: WaylandProtocolSource
    stability: WaylandProtocolStability
}

const sourceRepositoryUrls: Record<WaylandProtocolSource, string> = {
    [WaylandProtocolSource.WaylandCore]:
        'https://github.com/wayland-project/wayland',
    [WaylandProtocolSource.WaylandProtocols]:
        'https://github.com/wayland-project/wayland-protocols',
    [WaylandProtocolSource.WlrProtocols]:
        'https://github.com/swaywm/wlr-protocols',
}

export function urlForWaylandProtocolSource(
    source: WaylandProtocolSource
): string {
    return sourceRepositoryUrls[source]
}

export function urlForWaylandProtocol(
    metadata: WaylandProtocolMetadata
): string {
    if (metadata.source === WaylandProtocolSource.WaylandCore) {
        return `${urlForWaylandProtocolSource(
            metadata.source
        )}/blob/master/protocol/wayland.xml`
    } else if (metadata.source === WaylandProtocolSource.WaylandProtocols) {
        const protocolDirectoryName = waylandProtocolDirectoryNameFor(metadata)
        return `${urlForWaylandProtocolSource(metadata.source)}/tree/master/${
            metadata.stability
        }/${protocolDirectoryName}/${metadata.id}.xml`
    } else {
        return `${urlForWaylandProtocolSource(metadata.source)}/blob/master/${
            metadata.stability
        }/${metadata.id}.xml`
    }
}

export function urlForWaylandProtocolStability(
    metadata: WaylandProtocolMetadata
): string {
    return metadata.source === WaylandProtocolSource.WaylandCore
        ? `${urlForWaylandProtocolSource(metadata.source)}/tree/master/protocol`
        : `${urlForWaylandProtocolSource(metadata.source)}/tree/master/${
              metadata.stability
          }`
}

function waylandProtocolDirectoryNameFor(
    metadata: WaylandProtocolMetadata
): string {
    if (metadata.stability === WaylandProtocolStability.Stable) {
        return metadata.id
    }

    // TODO: Add directory name to metadata object and remove this hack
    const [directoryName] = metadata.id.split(`-${metadata.stability}-v`)
    return directoryName
}
