import { WaylandElementType } from '../../model/wayland'

export interface WaylandElementUIConfig {
    icon: string
    color: string
}

export enum WaylandColorTheme {
    Interface = 'blue-500',
    Request = 'pink-500',
    Event = 'emerald-500',
    Enum = 'orange-500',
    Entry = 'orange-50',
}

const waylandIcons: Record<WaylandElementType, WaylandElementUIConfig> = {
    [WaylandElementType.Protocol]: { icon: '', color: '' },
    [WaylandElementType.Interface]: {
        icon: 'interface',
        color: WaylandColorTheme.Interface,
    },
    [WaylandElementType.Request]: {
        icon: 'method',
        color: WaylandColorTheme.Request,
    },
    [WaylandElementType.Event]: {
        icon: 'event',
        color: WaylandColorTheme.Event,
    },
    [WaylandElementType.Enum]: { icon: 'enum', color: WaylandColorTheme.Enum },
    [WaylandElementType.Entry]: { icon: '', color: WaylandColorTheme.Entry },
    [WaylandElementType.Arg]: { icon: '', color: '' },
    [WaylandElementType.Copyright]: { icon: '', color: '' },
    [WaylandElementType.Description]: { icon: '', color: '' },
}

export const waylandElementConfigFor = (
    elementType: WaylandElementType
): WaylandElementUIConfig => waylandIcons[elementType]
