import { readFileSync, readdirSync, readlinkSync } from 'fs'
import path from 'path'
import { argv } from 'process'
import {
    WaylandElement,
    WaylandElementType,
    WaylandEvent,
    WaylandProtocol,
    WaylandRequest,
} from '../../src/model/wayland'
import { transformXMLElement, xmlParser } from '../../src/lib/xml-protocol-transformers'
import { jsonFileNameFor } from '../lib/utils'

async function main(fileName: string) {
    const fileData = readFileSync(fileName, 'utf-8')
    const xmlData = xmlParser.parse(fileData)
    const protocol = transformXMLElement<WaylandProtocol>(
        xmlData['protocol'],
        WaylandElementType.Protocol
    ) as WaylandProtocol

    const protocolDir = path.resolve(__dirname, '../../src/data/protocols')

    const outputPath = readlinkSync('/dev/fd/1')
    const interfaceMap: Map<string, string> = new Map()
    for (const protocolJson of readdirSync(protocolDir)) {
        const fullPath = path.resolve(protocolDir, protocolJson)
        // While piping to convert a protocol it's not valid json
        if (fullPath === outputPath) {
            continue
        }
        const protocol = JSON.parse(readFileSync(fullPath, 'utf-8')) as
            | WaylandProtocol
            | undefined
        const name = path.parse(fullPath).name
        for (const item of protocol?.interfaces.map((inter) => inter.name) ??
            []) {
            interfaceMap.set(item, name)
        }
    }

    for (const arg of protocol.interfaces
        .flatMap(({ requests, events }) => [
            ...(requests ?? []),
            ...(events ?? []),
        ])
        .flatMap((item) => item.args) ?? []) {
        const ref =
            arg.interface ??
            (arg.enum?.includes('.') && arg.enum?.split('.')[0])
        if (!ref) {
            continue
        }
        if (protocol.interfaces.some((inter) => inter.name === ref)) {
            continue
        }
        const protocolRef = interfaceMap.get(ref)
        if (protocolRef === undefined) {
            console.error(`Missing protocol refrence in argument: ${ref}`)
            continue
        }
        console.warn(`Successfully linked protocol refrence: ${ref}`)
        arg.protocol = protocolRef
    }

    console.log(JSON.stringify(protocol, undefined, 2))
}

main(argv[2])
