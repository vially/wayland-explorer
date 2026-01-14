// this script takes the wayland data we gathered and output everything into
// ready to be consumed json files, that we then serve under {BASE_URL}/protocols/data/
// The goal is to facilitate third-party integrations

import * as fs from 'fs/promises'
import * as path from 'path'
import { waylandProtocolRegistry } from '../../src/data/protocol-registry'
import { compositorRegistry } from '../../src/data/compositor-registry'

const publicDir = path.resolve(__dirname, '../../public')

async function main() {
    const dataDir = path.join(publicDir, 'data')
    await fs.mkdir(dataDir, { recursive: true })

    const protocolsDir = path.join(dataDir, 'protocols')
    await fs.mkdir(protocolsDir, { recursive: true })

    const protocolsList = waylandProtocolRegistry.protocols.map(
        ({ protocol, ...metadata }) => metadata
    )
    await fs.writeFile(
        path.join(dataDir, 'protocols.json'),
        JSON.stringify(protocolsList, null, 2)
    )
    console.log(`✔ Exported ${protocolsList.length} protocols to data/protocols.json`)

    let protocolCount = 0
    for (const item of waylandProtocolRegistry.protocols) {
        const protocolData = {
            ...item,
            protocol: item.protocol,
        }
        await fs.writeFile(
            path.join(protocolsDir, `${item.id}.json`),
            JSON.stringify(protocolData, null, 2)
        )
        protocolCount++
    }
    console.log(`✔ Exported ${protocolCount} individual protocol files to data/protocols/`)

    const protocolsWithData = waylandProtocolRegistry.protocols.map((item) => ({
        ...item,
        protocol: item.protocol,
    }))
    await fs.writeFile(
        path.join(dataDir, 'protocols-full.json'),
        JSON.stringify(protocolsWithData, null, 2)
    )
    console.log(`✔ Exported full protocol data to data/protocols-full.json`)

    await fs.writeFile(
        path.join(dataDir, 'compositors.json'),
        JSON.stringify(compositorRegistry, null, 2)
    )
    console.log(`✔ Exported ${compositorRegistry.length} compositors to data/compositors.json`)

    console.log('\n✅ All data exported successfully!')
}

main().catch((error) => {
    console.error('Error exporting data:', error)
    process.exit(1)
})
