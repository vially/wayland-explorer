import {
    WaylandArg,
    WaylandCopyright,
    WaylandDescription,
    WaylandElement,
    WaylandElementType,
    WaylandEntry,
    WaylandEnum,
    WaylandEvent,
    WaylandInterface,
    WaylandProtocol,
    WaylandRequest,
} from '../../src/model/wayland'
import { coerceArray } from './utils'

type WaylandXMLElementTransformer = (xmlData: any) => WaylandElement

const transformers: Record<WaylandElementType, WaylandXMLElementTransformer> = {
    [WaylandElementType.Protocol]: (xmlData: any): WaylandProtocol => ({
        type: WaylandElementType.Protocol,
        name: xmlData['name'],
        copyright: transformXMLElement<WaylandCopyright>(
            xmlData['copyright'],
            WaylandElementType.Copyright
        ),
        description: transformXMLElement<WaylandDescription>(
            xmlData['description'],
            WaylandElementType.Description
        ),
        interfaces: transformArray(
            xmlData['interface'],
            WaylandElementType.Interface
        ),
    }),
    [WaylandElementType.Copyright]: (xmlData: any): WaylandCopyright => ({
        type: WaylandElementType.Copyright,
        text: xmlData,
    }),
    [WaylandElementType.Description]: (xmlData: any): WaylandDescription => ({
        type: WaylandElementType.Description,
        text: xmlData['#text'],
        summary: xmlData['summary'],
    }),
    [WaylandElementType.Interface]: (xmlData: any): WaylandInterface => ({
        type: WaylandElementType.Interface,
        name: xmlData['name'],
        version: xmlData['version'],
        description: transformXMLElement<WaylandDescription>(
            xmlData['description'],
            WaylandElementType.Description
        ),
        requests: transformArray(
            xmlData['request'],
            WaylandElementType.Request
        ),
        events: transformArray(xmlData['event'], WaylandElementType.Event),
        enums: transformArray(xmlData['enum'], WaylandElementType.Enum),
    }),
    [WaylandElementType.Request]: (xmlData: any): WaylandRequest => ({
        type: WaylandElementType.Request,
        name: xmlData['name'],
        requestType: xmlData['type'],
        since: xmlData['since'],
        description: transformXMLElement<WaylandDescription>(
            xmlData['description'],
            WaylandElementType.Description
        ),
        args: transformArray(xmlData['arg'], WaylandElementType.Arg),
    }),
    [WaylandElementType.Event]: (xmlData: any): WaylandEvent => ({
        type: WaylandElementType.Event,
        name: xmlData['name'],
        since: xmlData['since'],
        description: transformXMLElement<WaylandDescription>(
            xmlData['description'],
            WaylandElementType.Description
        ),
        args: transformArray(xmlData['arg'], WaylandElementType.Arg),
    }),
    [WaylandElementType.Enum]: (xmlData: any): WaylandEnum => ({
        type: WaylandElementType.Enum,
        name: xmlData['name'],
        since: xmlData['since'],
        bitfield: xmlData['bitfield'] === 'true',
        description: transformXMLElement<WaylandDescription>(
            xmlData['description'],
            WaylandElementType.Description
        ),
        entries: transformArray(xmlData['entry'], WaylandElementType.Entry),
    }),
    [WaylandElementType.Entry]: (xmlData: any): WaylandEntry => ({
        type: WaylandElementType.Entry,
        name: xmlData['name'],
        value: xmlData['value'],
        summary: xmlData['summary'],
        since: xmlData['since'],
        description: transformXMLElement<WaylandDescription>(
            xmlData['description'],
            WaylandElementType.Description
        ),
    }),
    [WaylandElementType.Arg]: (xmlData: any): WaylandArg => ({
        type: WaylandElementType.Arg,
        name: xmlData['name'],
        argType: xmlData['type'],
        summary: xmlData['summary'],
        interface: xmlData['interface'],
        allowNull: xmlData['allow-null'],
        enum: xmlData['enum'],
        description: transformXMLElement<WaylandDescription>(
            xmlData['description'],
            WaylandElementType.Description
        ),
    }),
}

function transformArray<T extends WaylandElement = WaylandElement>(
    xmlData: any,
    type: WaylandElementType
): T[] {
    return coerceArray(xmlData).map(
        (data: any) => transformXMLElement<T>(data, type)!
    )
}

export function transformXMLElement<T extends WaylandElement = WaylandElement>(
    xmlData: any,
    type: WaylandElementType
): T | undefined {
    if (!xmlData) return undefined

    return transformers[type](xmlData) as T
}
