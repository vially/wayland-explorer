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

const waylandProtocolsStagingBadgeTheme: BadgeTheme = {
    textColor: 'text-violet-800',
    backgroundColor: 'bg-violet-100',
}

const waylandProtocolsExperimentalBadgeTheme: BadgeTheme = {
    textColor: 'text-fuchsia-800',
    backgroundColor: 'bg-fuchsia-100',
}

const waylandProtocolsUnstableBadgeTheme: BadgeTheme = {
    textColor: 'text-rose-800',
    backgroundColor: 'bg-rose-100',
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

const treelandProtocolsUnstableBadgeTheme: BadgeTheme = {
    textColor: 'text-cyan-800',
    backgroundColor: 'bg-cyan-100',
}

const riverProtocolsBadgeTheme: BadgeTheme = {
    textColor: 'text-cyan-800',
    backgroundColor: 'bg-cyan-100',
}

const externalProtocolsBadgeTheme: BadgeTheme = {
    textColor: 'text-gray-800',
    backgroundColor: 'bg-gray-100',
}

const badgeThemeByStability: Record<WaylandProtocolStability, BadgeTheme> = {
    [WaylandProtocolStability.Stable]: waylandProtocolsStableBadgeTheme,
    [WaylandProtocolStability.Staging]: waylandProtocolsStagingBadgeTheme,
    [WaylandProtocolStability.Experimental]:
        waylandProtocolsExperimentalBadgeTheme,
    [WaylandProtocolStability.Unstable]: waylandProtocolsUnstableBadgeTheme,
}

function badgeThemeFor(
    source: WaylandProtocolSource,
    stability: WaylandProtocolStability
): BadgeTheme {
    if (source === WaylandProtocolSource.WaylandCore) {
        return coreBadgeTheme
    } else if (source === WaylandProtocolSource.WaylandProtocols) {
        return badgeThemeByStability[stability]
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
    } else if (source === WaylandProtocolSource.TreelandProtocols) {
        return treelandProtocolsUnstableBadgeTheme
    } else if (source === WaylandProtocolSource.RiverProtocols) {
        return riverProtocolsBadgeTheme
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
                : protocol.source === WaylandProtocolSource.TreelandProtocols
                ? 'treeland'
                : protocol.source === WaylandProtocolSource.RiverProtocols
                ? 'river'
                : protocol.source === WaylandProtocolSource.External
                ? 'external'
                : protocol.stability}
        </Badge>
    )
}
