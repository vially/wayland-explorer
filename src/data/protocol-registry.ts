import { WaylandProtocol } from '../model/wayland'
import {
    WaylandProtocolMetadata,
    WaylandProtocolSource,
    WaylandProtocolStability,
} from '../model/wayland-protocol-metadata'

export interface WaylandProtocolRegistryItem extends WaylandProtocolMetadata {
    protocol: WaylandProtocol
}

const protocols: WaylandProtocolRegistryItem[] = [
    {
        id: 'wayland',
        name: 'Wayland',
        source: WaylandProtocolSource.WaylandCore,
        stability: WaylandProtocolStability.Stable,
        protocol: require('./protocols/wayland.json'),
    },
    {
        id: 'presentation-time',
        name: 'Presentation time',
        source: WaylandProtocolSource.WaylandProtocols,
        stability: WaylandProtocolStability.Stable,
        protocol: require('./protocols/presentation-time.json'),
    },
    {
        id: 'viewporter',
        name: 'Viewporter',
        source: WaylandProtocolSource.WaylandProtocols,
        stability: WaylandProtocolStability.Stable,
        protocol: require('./protocols/viewporter.json'),
    },
    {
        id: 'xdg-shell',
        name: 'XDG shell',
        source: WaylandProtocolSource.WaylandProtocols,
        stability: WaylandProtocolStability.Stable,
        protocol: require('./protocols/xdg-shell.json'),
    },
    {
        id: 'fullscreen-shell-unstable-v1',
        name: 'Fullscreen shell',
        source: WaylandProtocolSource.WaylandProtocols,
        stability: WaylandProtocolStability.Unstable,
        protocol: require('./protocols/fullscreen-shell-unstable-v1.json'),
    },
    {
        id: 'idle-inhibit-unstable-v1',
        name: 'Idle inhibit',
        source: WaylandProtocolSource.WaylandProtocols,
        stability: WaylandProtocolStability.Unstable,
        protocol: require('./protocols/idle-inhibit-unstable-v1.json'),
    },
    {
        id: 'input-method-unstable-v1',
        name: 'Input method',
        source: WaylandProtocolSource.WaylandProtocols,
        stability: WaylandProtocolStability.Unstable,
        protocol: require('./protocols/input-method-unstable-v1.json'),
    },
    {
        id: 'input-timestamps-unstable-v1',
        name: 'Input timestamps',
        source: WaylandProtocolSource.WaylandProtocols,
        stability: WaylandProtocolStability.Unstable,
        protocol: require('./protocols/input-timestamps-unstable-v1.json'),
    },
    {
        id: 'keyboard-shortcuts-inhibit-unstable-v1',
        name: 'Keyboard shortcuts inhibit',
        source: WaylandProtocolSource.WaylandProtocols,
        stability: WaylandProtocolStability.Unstable,
        protocol: require('./protocols/keyboard-shortcuts-inhibit-unstable-v1.json'),
    },
    {
        id: 'linux-dmabuf-unstable-v1',
        name: 'Linux DMA-BUF',
        source: WaylandProtocolSource.WaylandProtocols,
        stability: WaylandProtocolStability.Unstable,
        protocol: require('./protocols/linux-dmabuf-unstable-v1.json'),
    },
    {
        id: 'linux-explicit-synchronization-unstable-v1',
        name: 'Linux explicit synchronization (dma-fence)',
        source: WaylandProtocolSource.WaylandProtocols,
        stability: WaylandProtocolStability.Unstable,
        protocol: require('./protocols/linux-explicit-synchronization-unstable-v1.json'),
    },
    {
        id: 'pointer-constraints-unstable-v1',
        name: 'Pointer constraints',
        source: WaylandProtocolSource.WaylandProtocols,
        stability: WaylandProtocolStability.Unstable,
        protocol: require('./protocols/pointer-constraints-unstable-v1.json'),
    },
    {
        id: 'pointer-gestures-unstable-v1',
        name: 'Pointer gestures',
        source: WaylandProtocolSource.WaylandProtocols,
        stability: WaylandProtocolStability.Unstable,
        protocol: require('./protocols/pointer-gestures-unstable-v1.json'),
    },
    {
        id: 'primary-selection-unstable-v1',
        name: 'Primary selection',
        source: WaylandProtocolSource.WaylandProtocols,
        stability: WaylandProtocolStability.Unstable,
        protocol: require('./protocols/primary-selection-unstable-v1.json'),
    },
    {
        id: 'relative-pointer-unstable-v1',
        name: 'Relative pointer',
        source: WaylandProtocolSource.WaylandProtocols,
        stability: WaylandProtocolStability.Unstable,
        protocol: require('./protocols/relative-pointer-unstable-v1.json'),
    },
    {
        id: 'tablet-unstable-v2',
        name: 'Tablet',
        source: WaylandProtocolSource.WaylandProtocols,
        stability: WaylandProtocolStability.Unstable,
        protocol: require('./protocols/tablet-unstable-v2.json'),
    },
    {
        id: 'text-input-unstable-v3',
        name: 'Text input',
        source: WaylandProtocolSource.WaylandProtocols,
        stability: WaylandProtocolStability.Unstable,
        protocol: require('./protocols/text-input-unstable-v3.json'),
    },
    {
        id: 'xdg-decoration-unstable-v1',
        name: 'XDG decoration',
        source: WaylandProtocolSource.WaylandProtocols,
        stability: WaylandProtocolStability.Unstable,
        protocol: require('./protocols/xdg-decoration-unstable-v1.json'),
    },
    {
        id: 'xdg-foreign-unstable-v2',
        name: 'XDG foreign',
        source: WaylandProtocolSource.WaylandProtocols,
        stability: WaylandProtocolStability.Unstable,
        protocol: require('./protocols/xdg-foreign-unstable-v2.json'),
    },
    {
        id: 'xdg-output-unstable-v1',
        name: 'XDG output',
        source: WaylandProtocolSource.WaylandProtocols,
        stability: WaylandProtocolStability.Unstable,
        protocol: require('./protocols/xdg-output-unstable-v1.json'),
    },
    {
        id: 'xwayland-keyboard-grab-unstable-v1',
        name: 'XWayland keyboard grabbing',
        source: WaylandProtocolSource.WaylandProtocols,
        stability: WaylandProtocolStability.Unstable,
        protocol: require('./protocols/xwayland-keyboard-grab-unstable-v1.json'),
    },
    {
        id: 'wlr-data-control-unstable-v1',
        name: 'wlr data control',
        source: WaylandProtocolSource.WlrProtocols,
        stability: WaylandProtocolStability.Unstable,
        protocol: require('./protocols/wlr-data-control-unstable-v1.json'),
    },
    {
        id: 'wlr-export-dmabuf-unstable-v1',
        name: 'wlr export DMA-BUF',
        source: WaylandProtocolSource.WlrProtocols,
        stability: WaylandProtocolStability.Unstable,
        protocol: require('./protocols/wlr-export-dmabuf-unstable-v1.json'),
    },
    {
        id: 'wlr-foreign-toplevel-management-unstable-v1',
        name: 'wlr foreign toplevel management',
        source: WaylandProtocolSource.WlrProtocols,
        stability: WaylandProtocolStability.Unstable,
        protocol: require('./protocols/wlr-foreign-toplevel-management-unstable-v1.json'),
    },
    {
        id: 'wlr-gamma-control-unstable-v1',
        name: 'wlr gamma control',
        source: WaylandProtocolSource.WlrProtocols,
        stability: WaylandProtocolStability.Unstable,
        protocol: require('./protocols/wlr-gamma-control-unstable-v1.json'),
    },
    {
        id: 'wlr-input-inhibitor-unstable-v1',
        name: 'wlr input inhibitor',
        source: WaylandProtocolSource.WlrProtocols,
        stability: WaylandProtocolStability.Unstable,
        protocol: require('./protocols/wlr-input-inhibitor-unstable-v1.json'),
    },
    {
        id: 'wlr-layer-shell-unstable-v1',
        name: 'wlr layer shell',
        source: WaylandProtocolSource.WlrProtocols,
        stability: WaylandProtocolStability.Unstable,
        protocol: require('./protocols/wlr-layer-shell-unstable-v1.json'),
    },
    {
        id: 'wlr-output-management-unstable-v1',
        name: 'wlr output management',
        source: WaylandProtocolSource.WlrProtocols,
        stability: WaylandProtocolStability.Unstable,
        protocol: require('./protocols/wlr-output-management-unstable-v1.json'),
    },
    {
        id: 'wlr-output-power-management-unstable-v1',
        name: 'wlr output power management',
        source: WaylandProtocolSource.WlrProtocols,
        stability: WaylandProtocolStability.Unstable,
        protocol: require('./protocols/wlr-output-power-management-unstable-v1.json'),
    },
    {
        id: 'wlr-screencopy-unstable-v1',
        name: 'wlr screencopy',
        source: WaylandProtocolSource.WlrProtocols,
        stability: WaylandProtocolStability.Unstable,
        protocol: require('./protocols/wlr-screencopy-unstable-v1.json'),
    },
    {
        id: 'wlr-virtual-pointer-unstable-v1',
        name: 'wlr virtual pointer',
        source: WaylandProtocolSource.WlrProtocols,
        stability: WaylandProtocolStability.Unstable,
        protocol: require('./protocols/wlr-virtual-pointer-unstable-v1.json'),
    },
    {
        id: 'virtual-keyboard-unstable-v1',
        name: 'Virtual keyboard',
        source: WaylandProtocolSource.External,
        stability: WaylandProtocolStability.Unstable,
        protocol: require('./protocols/virtual-keyboard-unstable-v1.json'),
        externalUrl:
            'https://lists.freedesktop.org/archives/wayland-devel/2019-September/040882.html',
    },
]

class WaylandProtocolRegistry {
    protocols = protocols

    getProtocolWithMetadata(
        protocolId: string
    ): { protocol: WaylandProtocol; metadata: WaylandProtocolMetadata } | null {
        const registryItem = this.protocols.find(
            (protocol) => protocol.id === protocolId
        )
        if (!registryItem) return null

        const { protocol, ...metadata } = registryItem

        return { protocol, metadata }
    }
}

export const waylandProtocolRegistry = new WaylandProtocolRegistry()
