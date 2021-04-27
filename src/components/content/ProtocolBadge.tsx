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

const waylandProtocolsUntableBadgeTheme: BadgeTheme = {
    textColor: 'text-pink-800',
    backgroundColor: 'bg-pink-100',
}

const wlrProtocolsUntableBadgeTheme: BadgeTheme = {
    textColor: 'text-red-800',
    backgroundColor: 'bg-red-100',
}

const kdeProtocolsUntableBadgeTheme: BadgeTheme = {
    textColor: 'text-purple-800',
    backgroundColor: 'bg-purple-100',
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
            : waylandProtocolsUntableBadgeTheme
    } else if (source === WaylandProtocolSource.WlrProtocols) {
        return wlrProtocolsUntableBadgeTheme
    } else if (source === WaylandProtocolSource.KDEProtocols) {
        return kdeProtocolsUntableBadgeTheme
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
                : protocol.source === WaylandProtocolSource.External
                ? 'external'
                : protocol.stability}
        </Badge>
    )
}
