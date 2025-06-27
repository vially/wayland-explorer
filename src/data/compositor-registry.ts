export interface CompositorGlobalInfo {
    interface: string
    version: number
}

export interface CompositorInfo {
    generationTimestamp: number
    version: string | null
    globals: CompositorGlobalInfo[]
}

export interface CompositorRegistryItem {
    id: string
    name: string
    icon?: string
    info: CompositorInfo
}

export const compositorRegistry: CompositorRegistryItem[] = [
    {
        id: 'mutter',
        name: 'Mutter',
        icon: 'gnome',
        info: require('./compositors/mutter.json'),
    },
    {
        id: 'kwin',
        name: 'KWin',
        icon: 'kde',
        info: require('./compositors/kwin.json'),
    },
    {
        id: 'sway',
        name: 'Sway',
        icon: 'sway',
        info: require('./compositors/sway.json'),
    },
    {
        id: 'cosmic',
        name: 'COSMIC',
        icon: 'cosmic',
        info: require('./compositors/cosmic.json'),
    },
    {
        id: 'hyprland',
        name: 'Hyprland',
        icon: 'hyprland',
        info: require('./compositors/hyprland.json'),
    },
    {
        id: 'niri',
        name: 'niri',
        info: require('./compositors/niri.json'),
    },
    {
        id: 'weston',
        name: 'Weston',
        icon: 'weston',
        info: require('./compositors/weston.json'),
    },
    {
        id: 'labwc',
        name: 'Labwc',
        icon: 'labwc',
        info: require('./compositors/labwc.json'),
    },
    {
        id: 'cage',
        name: 'Cage',
        icon: 'cage',
        info: require('./compositors/cage.json'),
    },
    {
        id: 'wayfire',
        name: 'Wayfire',
        icon: 'wayfire',
        info: require('./compositors/wayfire.json'),
    },
    {
        id: 'gamescope',
        name: 'GameScope',
        icon: 'Steam_Deck',
        info: require('./compositors/gamescope.json'),
    },
    {
        id: 'jay',
        name: 'Jay',
        info: require('./compositors/jay.json'),
    },
    {
        id: 'mir',
        name: 'Mir',
        icon: 'mir',
        info: require('./compositors/mir.json'),
    },
    {
        id: 'treeland',
        name: 'Treeland',
        icon: 'deepin',
        info: require('./compositors/treeland.json'),
    },
    {
        id: 'louvre',
        name: 'Louvre',
        icon: 'louvre',
        info: require('./compositors/louvre.json'),
    },
]
