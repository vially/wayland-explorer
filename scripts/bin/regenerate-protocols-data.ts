import xmlParser from 'fast-xml-parser'
import { promises as fs } from 'fs'
import path from 'path'
import { WaylandElementType } from '../../src/model/wayland'
import { findXMLFiles } from '../lib/utils'
import { transformXMLElement } from '../lib/xml-protocol-transformers'

const relativeProtocolDirs = [
    path.join('protocols', 'wayland', 'stable'),
    path.join('protocols', 'wayland', 'unstable'),
    path.join('protocols', 'wlr', 'unstable'),
    path.join('protocols', 'external'),
]

const jsonFilePathFor = (srcFileName: string): string =>
    path.resolve(
        __dirname,
        '../../src/data/protocols',
        path.basename(srcFileName, '.xml') + '.json'
    )

const deprecatedProtocols = [
    'tablet-unstable-v1.xml',
    'text-input-unstable-v1.xml',
    'xdg-foreign-unstable-v1.xml',
    'xdg-shell-unstable-v5.xml',
    'xdg-shell-unstable-v6.xml',
]

async function parseProtocolAndWriteToJSON(srcFileName: string): Promise<void> {
    const fileData = await fs.readFile(srcFileName, 'utf-8')
    const xmlData = xmlParser.parse(fileData, {
        ignoreAttributes: false,
        attributeNamePrefix: '',
    })
    const protocol = transformXMLElement(
        xmlData['protocol'],
        WaylandElementType.Protocol
    )

    const dstFileName = jsonFilePathFor(srcFileName)
    await fs.writeFile(dstFileName, JSON.stringify(protocol))
    console.log(`✔ ${path.basename(dstFileName)}`)
}

async function main() {
    const protocolDirs = relativeProtocolDirs.map((waylandDir) =>
        path.resolve(__dirname, '../../', waylandDir)
    )

    const isNotDeprecated = (fileName: string) =>
        !deprecatedProtocols.includes(path.basename(fileName))

    const xmlFileNames = (await Promise.all(protocolDirs.map(findXMLFiles)))
        .flat()
        .filter(isNotDeprecated)

    await Promise.all(xmlFileNames.map(parseProtocolAndWriteToJSON))
}

main()
