import React from 'react'
import {
    WaylandProtocolMetadata,
    WaylandProtocolSource,
    WaylandProtocolStability,
} from '../../model/wayland-protocol-metadata'
import { Badge } from './Badge'

interface BadgeTheme {
    textColor: string
    backgroundColor: string
}

const coreBadgeTheme: BadgeTheme = {
    textColor: 'text-green-800',
    backgroundColor: 'bg-green-100',
}

const waylandProtocolsStableBadgeTheme: BadgeTheme = {
    textColor: 'text-blue-800',
    backgroundColor: 'bg-blue-100',
}

const waylandProtocolsUnstableBadgeTheme: BadgeTheme = {
    textColor: 'text-pink-800',
    backgroundColor: 'bg-pink-100',
}

const wlrProtocolsUnstableBadgeTheme: BadgeTheme = {
    textColor: 'text-red-800',
    backgroundColor: 'bg-red-100',
}

const kdeProtocolsUnstableBadgeTheme: BadgeTheme = {
    textColor: 'text-purple-800',
    backgroundColor: 'bg-purple-100',
}

const hyprlandProtocolsUnstableBadgeTheme: BadgeTheme = {
    textColor: 'text-sky-800',
    backgroundColor: 'bg-sky-100',
}

const cosmicProtocolsUnstableBadgeTheme: BadgeTheme = {
    textColor: 'text-amber-800',
    backgroundColor: 'bg-red-100',
}

const westonProtocolsUnstableBadgeTheme: BadgeTheme = {
    textColor: 'text-yellow-800',
    backgroundColor: 'bg-yellow-100',
}

const externalProtocolsBadgeTheme: BadgeTheme = {
    textColor: 'text-gray-800',
    backgroundColor: 'bg-gray-100',
}

function badgeThemeFor(
    source: WaylandProtocolSource,
    stability: WaylandProtocolStability
): BadgeTheme {
    if (source === WaylandProtocolSource.WaylandCore) {
        return coreBadgeTheme
    } else if (source === WaylandProtocolSource.WaylandProtocols) {
        return stability === WaylandProtocolStability.Stable
            ? waylandProtocolsStableBadgeTheme
            : waylandProtocolsUnstableBadgeTheme
    } else if (source === WaylandProtocolSource.WlrProtocols) {
        return wlrProtocolsUnstableBadgeTheme
    } else if (source === WaylandProtocolSource.KDEProtocols) {
        return kdeProtocolsUnstableBadgeTheme
    } else if (source === WaylandProtocolSource.HyprlandProtocols) {
        return hyprlandProtocolsUnstableBadgeTheme
    } else if (source === WaylandProtocolSource.CosmicProtocols) {
        return cosmicProtocolsUnstableBadgeTheme
    } else if (source === WaylandProtocolSource.WestonProtocols) {
        return westonProtocolsUnstableBadgeTheme
    } else {
        return externalProtocolsBadgeTheme
    }
}

export const ProtocolBadge: React.FC<{ protocol: WaylandProtocolMetadata }> = ({
    protocol,
}) => {
    const theme = badgeThemeFor(protocol.source, protocol.stability)
    return (
        <Badge bgColor={theme.backgroundColor} textColor={theme.textColor}>
            {protocol.source === WaylandProtocolSource.WaylandCore
                ? 'core'
                : protocol.source === WaylandProtocolSource.WlrProtocols
                ? 'wlr'
                : protocol.source === WaylandProtocolSource.KDEProtocols
                ? 'kde'
                : protocol.source === WaylandProtocolSource.HyprlandProtocols
                ? 'hyprland'
                : protocol.source === WaylandProtocolSource.CosmicProtocols
                ? 'cosmic'
                : protocol.source === WaylandProtocolSource.WestonProtocols
                ? 'weston'
                : protocol.source === WaylandProtocolSource.External
                ? 'external'
                : protocol.stability}
        </Badge>
    )
}
