import { XMLParser } from 'fast-xml-parser'
import { readFileSync } from 'fs'
import { argv } from 'process'
import { WaylandElementType } from '../../src/model/wayland'
import { transformXMLElement } from '../../src/lib/xml-protocol-transformers'

async function main(fileName: string) {
    const fileData = readFileSync(fileName, 'utf-8')
    const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: '',
        tagValueProcessor: (tagname, tagValue, jPath, hasAttributes, isLeadNode) => {
            if (!isLeadNode || typeof tagValue !== 'string')
                return null;
            return tagValue.split('\n').map(line => line.trim()).join("\n");
        }
    })
    const xmlData = parser.parse(fileData)
    const protocol = transformXMLElement(
        xmlData['protocol'],
        WaylandElementType.Protocol
    )

    console.log(JSON.stringify(protocol))
}

main(argv[2])
