import xmlParser from 'fast-xml-parser'
import { readFileSync } from 'fs'
import { argv } from 'process'
import { WaylandElementType } from '../../src/model/wayland'
import { transformXMLElement } from '../lib/xml-protocol-transformers'

async function main(fileName: string) {
    const fileData = readFileSync(fileName, 'utf-8')
    const xmlData = xmlParser.parse(fileData, {
        ignoreAttributes: false,
        attributeNamePrefix: '',
    })
    const protocol = transformXMLElement(
        xmlData['protocol'],
        WaylandElementType.Protocol
    )

    console.log(JSON.stringify(protocol))
}

main(argv[2])
