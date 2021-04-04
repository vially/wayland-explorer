import {
    WaylandArg,
    WaylandEntry,
    WaylandEnum,
    WaylandEvent,
    WaylandRequest,
} from '../../model/wayland'

export function capitalizeFirstLetter(
    name: string | null | undefined
): string | null | undefined {
    return name ? name[0].toUpperCase() + name.slice(1) : name
}

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
