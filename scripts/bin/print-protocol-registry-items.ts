import path from 'path'
import { findXMLFiles } from '../lib/utils'

const relativeProtocolDirs = [
    path.join('protocols', 'wayland', 'stable'),
    path.join('protocols', 'wayland', 'unstable'),
    path.join('protocols', 'wlr', 'unstable'),
]

const protocolItemFor =
    (source: string, stability: string) =>
    (protocolXmlFile: string): string => {
        const protocolId = path.basename(protocolXmlFile, '.xml')
        return `
    {
        id: '${protocolId}',
        name: '',
        source: WaylandProtocolSource.${source},
        stability: WaylandProtocolStability.${stability},
        protocol: require('./protocols/${protocolId}.json'),
    },`
    }

async function main() {
    const protocolDirs = relativeProtocolDirs.map((waylandDir) =>
        path.resolve(__dirname, '../../', waylandDir)
    )

    const [waylandStableFiles, waylandUnstableFiles, wlrUnstableFiles] =
        await Promise.all(protocolDirs.map(findXMLFiles))

    const protocolItems = [
        protocolItemFor('WaylandCore', 'Stable')('wayland.xml'),
        ...waylandStableFiles.map(
            protocolItemFor('WaylandProtocols', 'Stable')
        ),
        ...waylandUnstableFiles.map(
            protocolItemFor('WaylandProtocols', 'Unstable')
        ),
        ...wlrUnstableFiles.map(protocolItemFor('WlrProtocols', 'Unstable')),
    ].join('')

    console.log(
        `const protocols: WaylandProtocolRegistryItem[] = [${protocolItems}\n]`
    )
}

main()
