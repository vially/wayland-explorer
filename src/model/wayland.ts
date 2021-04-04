export enum WaylandElementType {
    Protocol = 'protocol',
    Copyright = 'copyright',
    Interface = 'interface',
    Request = 'request',
    Event = 'event',
    Enum = 'enum',
    Entry = 'entry',
    Arg = 'arg',
    Description = 'description',
}

export interface WaylandProtocol {
    type: WaylandElementType.Protocol
    name: string
    copyright?: WaylandCopyright
    description?: WaylandDescription
    interfaces: WaylandInterface[]
}

export interface WaylandCopyright {
    type: WaylandElementType.Copyright
    text: string
}

export interface WaylandDescription {
    type: WaylandElementType.Description
    text: string
    summary?: string
}

export interface WaylandInterface {
    type: WaylandElementType.Interface
    name: string
    version: string
    description?: WaylandDescription
    requests?: WaylandRequest[]
    events?: WaylandEvent[]
    enums?: WaylandEnum[]
}

export interface WaylandRequest {
    type: WaylandElementType.Request
    name: string
    requestType?: string
    since?: string
    description?: WaylandDescription
    args: WaylandArg[]
}

export interface WaylandEvent {
    type: WaylandElementType.Event
    name: string
    since?: string
    description?: WaylandDescription
    args: WaylandArg[]
}

export interface WaylandEnum {
    type: WaylandElementType.Enum
    name: string
    since?: string
    bitfield?: boolean
    description?: WaylandDescription
    entries?: WaylandEntry[]
}

export interface WaylandEntry {
    type: WaylandElementType.Entry
    name: string
    value: string
    summary?: string
    since?: string
    description?: WaylandDescription
}

export interface WaylandArg {
    type: WaylandElementType.Arg
    name: string
    argType: WaylandArgType
    summary?: string
    interface?: string
    allowNull?: boolean
    enum?: string
    description?: WaylandDescription
}

export enum WaylandArgType {
    NewId = 'new_id',
    Int = 'int',
    UInt = 'uint',
    FD = 'fd',
    String = 'string',
    Object = 'object',
}

export type WaylandElement =
    | WaylandProtocol
    | WaylandCopyright
    | WaylandDescription
    | WaylandInterface
    | WaylandRequest
    | WaylandEvent
    | WaylandEnum
    | WaylandEntry
    | WaylandArg

export const isWaylandArgElement = (
    element: WaylandElement
): element is WaylandArg => element.type === WaylandElementType.Arg

export const isWaylandEntryElement = (
    element: WaylandElement
): element is WaylandEntry => element.type === WaylandElementType.Entry

export const isWaylandEnumElement = (
    element: WaylandElement
): element is WaylandEnum => element.type === WaylandElementType.Enum
