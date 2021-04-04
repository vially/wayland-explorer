import {
    WaylandArg,
    WaylandCopyright,
    WaylandDescription,
    WaylandElement,
    WaylandEntry,
    WaylandEnum,
    WaylandEvent,
    WaylandInterface,
    WaylandProtocol,
    WaylandRequest,
} from '../../model/wayland'

export interface WaylandElementProps<T = WaylandElement> {
    element: T
}

// Aliases to avoid collisions with the component names
export type WaylandProtocolModel = WaylandProtocol
export type WaylandCopyrightModel = WaylandCopyright
export type WaylandDescriptionModel = WaylandDescription
export type WaylandInterfaceModel = WaylandInterface
export type WaylandRequestModel = WaylandRequest
export type WaylandEventModel = WaylandEvent
export type WaylandEnumModel = WaylandEnum
export type WaylandEntryModel = WaylandEntry
export type WaylandArgModel = WaylandArg
