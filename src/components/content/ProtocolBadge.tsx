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
    textColor: 'green-800',
    backgroundColor: 'green-100',
}

const waylandProtocolsStableBadgeTheme: BadgeTheme = {
    textColor: 'blue-800',
    backgroundColor: 'blue-100',
}

const waylandProtocolsUntableBadgeTheme: BadgeTheme = {
    textColor: 'pink-800',
    backgroundColor: 'pink-100',
}

const wlrProtocolsUntableBadgeTheme: BadgeTheme = {
    textColor: 'red-800',
    backgroundColor: 'red-100',
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
    } else {
        return wlrProtocolsUntableBadgeTheme
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
                : protocol.stability}
        </Badge>
    )
}
