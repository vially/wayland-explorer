export interface CompositorGlobalInfo {
    interface: string
    version: number
}

export interface CompositorInfo {
    generationTimestamp: number,
    globals: CompositorGlobalInfo[]
}

export interface CompositorRegistryItem {
    id: string
    name: string
    icon: string
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
        id: 'weston',
        name: 'Weston',
        icon: 'weston',
        info: require('./compositors/weston.json'),
    },
    {
        id: 'mir',
        name: 'Mir',
        icon: 'mir',
        info: require('./compositors/mir.json'),
    },
    {
        id: 'gamescope',
        name: 'gamescope',
        icon: 'Steam_Deck',
        info: require('./compositors/gamescope.json'),
    },
]
