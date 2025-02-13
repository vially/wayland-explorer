import { promises as fs } from 'fs'
import path from 'path'
import {
    transformXMLElement,
    xmlParser,
} from '../../src/lib/xml-protocol-transformers'
import { WaylandElementType, WaylandProtocol } from '../../src/model/wayland'
import { findXMLFiles, protocolIdFor } from '../lib/utils'

const relativeProtocolDirs = [
    path.join('protocols', 'libwayland', 'protocol'),
    path.join('protocols', 'wayland', 'stable'),
    path.join('protocols', 'wayland', 'staging'),
    path.join('protocols', 'wayland', 'unstable'),
    path.join('protocols', 'wlr', 'unstable'),
    path.join('protocols', 'kde', 'src', 'protocols'),
    path.join('protocols', 'hyprland', 'protocols'),
    path.join('protocols', 'weston', 'protocol'),
    path.join('protocols', 'external'),
]

const jsonFilePathFor = (protocolId: string): string =>
    path.resolve(__dirname, '../../src/data/protocols', `${protocolId}.json`)

const deprecatedProtocols = [
    'linux-dmabuf-unstable-v1.xml',
    'tablet-unstable-v1.xml',
    'tablet-unstable-v2.xml',
    'text-input-unstable-v1.xml',
    'xdg-foreign-unstable-v1.xml',
    'xdg-shell-unstable-v5.xml',
    'xdg-shell-unstable-v6.xml',
    /**
     * Deprecated KDE protocols
     * https://invent.kde.org/libraries/plasma-wayland-protocols/-/blob/78fc6ee77334a147986f01c6d3c6e1b99af1a333/src/protocols/TODOKF6.md
     */
    'fullscreen-shell.xml',
    'remote-access.xml',
    'surface-extension.xml',
    'text-input.xml',
    'text-input-unstable-v2.xml',
    'wayland-eglstream-controller.xml',
    'screencast.xml',
    /**
     * Unused libwayland protocol
     */
    'tests.xml',
    /**
     * Ignore duplicate *Weston* `color-management-v1` protocol since it has
     * been merged upstream:
     * https://gitlab.freedesktop.org/wayland/wayland-protocols/-/merge_requests/14
     */
    'weston/protocol/color-management-v1.xml',
]

interface WaylandProtocolWithId extends WaylandProtocol {
    id: string
}

async function parseProtocol(
    srcFileName: string
): Promise<WaylandProtocolWithId> {
    const fileData = await fs.readFile(srcFileName, 'utf-8')
    const xmlData = xmlParser.parse(fileData)
    const protocol = transformXMLElement(
        xmlData['protocol'],
        WaylandElementType.Protocol
    ) as WaylandProtocol

    const protocolId = protocolIdFor(srcFileName)

    return { id: protocolId, ...protocol }
}

const fixCrossProtocolReferencesFor =
    (interfaceToProtocolMapping: Map<string, string>) =>
    (protocol: WaylandProtocolWithId) => {
        const args = protocol.interfaces
            .flatMap(({ requests, events }) => [
                ...(requests ?? []),
                ...(events ?? []),
            ])
            .flatMap((item) => item.args)

        const isLocalInterface = (interfaceName: string) =>
            protocol.interfaces.some((inter) => inter.name === interfaceName)

        for (const arg of args) {
            const argEnumInterface = arg.enum?.includes('.')
                ? arg.enum.split('.')[0]
                : undefined
            const argInterfaceName = arg.interface ?? argEnumInterface

            if (!argInterfaceName || isLocalInterface(argInterfaceName)) {
                continue
            }

            const protocolName =
                interfaceToProtocolMapping.get(argInterfaceName)
            if (!protocolName) {
                console.error(
                    `[${protocol.id}] Missing protocol reference in argument: ${argInterfaceName}`
                )
                continue
            }
            arg.protocol = protocolName
        }
    }

async function writeToJSONFile(protocolWithId: WaylandProtocolWithId) {
    const { id: protocolId, ...protocol } = protocolWithId
    await fs.writeFile(
        jsonFilePathFor(protocolId),
        JSON.stringify(protocol, undefined, 2) + '\n'
    )

    console.log(`✔ ${protocolId}.json`)
}

function generateInterfaceToProtocolMapping(
    protocols: WaylandProtocolWithId[]
): Map<string, string> {
    return protocols.reduce((mapping, protocol) => {
        protocol.interfaces.forEach((inter) => {
            const existingProtocolId = mapping.get(inter.name)
            if (existingProtocolId) {
                console.warn(
                    'Interface name found in multiple protocols:',
                    `${existingProtocolId}.${inter.name}`,
                    `${protocol.id}.${inter.name}`
                )
            } else {
                mapping.set(inter.name, protocol.id)
            }
        })

        return mapping
    }, new Map<string, string>())
}

async function main() {
    const protocolDirs = relativeProtocolDirs.map((waylandDir) =>
        path.resolve(__dirname, '../../', waylandDir)
    )

    const isNotDeprecated = (fileName: string) =>
        !deprecatedProtocols.some(
            (deprecatedProtocol) =>
                deprecatedProtocol === path.basename(fileName) ||
                fileName.endsWith(`/${deprecatedProtocol}`)
        )

    const xmlFileNames = (await Promise.all(protocolDirs.map(findXMLFiles)))
        .flat()
        .filter(isNotDeprecated)

    const protocols = await Promise.all(xmlFileNames.map(parseProtocol))

    const interfaceToProtocolMapping =
        generateInterfaceToProtocolMapping(protocols)

    protocols.forEach(fixCrossProtocolReferencesFor(interfaceToProtocolMapping))

    protocols.map(writeToJSONFile)
}

main()
