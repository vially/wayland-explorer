import {
    WaylandArg,
    WaylandEntry,
    WaylandEnum,
    WaylandEvent,
    WaylandRequest,
} from '../../model/wayland'

export function buildHashPathFor(
    interfaceName: string,
    parentElement: WaylandEvent | WaylandRequest | WaylandEnum,
    arg: WaylandArg | WaylandEntry,
    options?: { includeHashSymbol: boolean }
): string {
    return `${options?.includeHashSymbol ? '#' : ''}${interfaceName}:${
        parentElement.type
    }:${parentElement.name}:${arg.type}:${arg.name}`
}
