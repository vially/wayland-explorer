import { MultiColumnLayout } from '../components/layout/MultiColumnLayout'
import { WaylandProtocolOutline } from '../components/outline/WaylandProtocolOutline'
import { WaylandProtocol } from '../components/WaylandProtocol'
import { useEffect, useState } from 'react'

import { XMLParser } from 'fast-xml-parser'
import {
    WaylandElementType,
    WaylandProtocol as WaylandProtocolModel,
} from '../model/wayland'
import { transformXMLElement } from '../lib/xml-protocol-transformers'
import {
    WaylandProtocolSource,
    WaylandProtocolStability,
} from '../model/wayland-protocol-metadata'

interface GitLabFile {
    name: string
    webPath: string
    path: string
    protocol: WaylandProtocolModel | undefined
}

async function getMergeRequestFiles(
    mr: GitLabMergeRequest
): Promise<GitLabFile[]> {
    const paths = mr.diffStats
        .filter((diff) => diff.path.endsWith('.xml'))
        .map(({ path }) => path)

    const data = JSON.stringify({
        query: `{
      project(fullPath: "${mr.sourceProject.fullPath}") {
        repository {
          blobs(ref: "${mr.sourceBranch}", paths: ${JSON.stringify(paths)}) {
            nodes {
              name
              webPath
              path
              rawBlob
            }
          }
        }
      }
    }`,
    })

    const response = await fetch('https://gitlab.freedesktop.org/api/graphql', {
        method: 'post',
        body: data,
        headers: new Headers({
            'Content-Type': 'application/json',
            'Content-Length': data.length.toString(),
        }),
    })

    const nodes: {
        name: string
        webPath: string
        path: string
        rawBlob: string
    }[] = (await response.json()).data.project.repository.blobs.nodes

    return nodes.map((node) => {
        const parser = new XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: '',
        })
        const xmlData = parser.parse(node.rawBlob)
        const protocol = transformXMLElement<WaylandProtocolModel>(
            xmlData['protocol'],
            WaylandElementType.Protocol
        )

        return {
            name: node.name,
            webPath: node.webPath,
            path: node.path,
            protocol,
        }
    })
}

interface GitLabMergeRequest {
    iid: number
    title: string
    author: { name: string }
    sourceProject: { fullPath: string }
    sourceBranch: string
    diffStats: { path: string }[]
}

async function getMergeRequest(iid: string): Promise<GitLabMergeRequest> {
    const data = JSON.stringify({
        query: `{
        project(fullPath: "wayland/wayland-protocols") {
          mergeRequests ( iids: ["${iid}"] ) {
            nodes {
              iid
              title
              author { name }
              sourceProject { fullPath }
              sourceBranch
              diffStats { path }
            }
          }
        }
      }`,
    })

    const response = await fetch('https://gitlab.freedesktop.org/api/graphql', {
        method: 'post',
        body: data,
        headers: new Headers({
            'Content-Type': 'application/json',
            'Content-Length': data.length.toString(),
        }),
    })

    const json = await response.json()
    return json.data.project.mergeRequests.nodes[0]
}

export const GitLab: React.FC<{ iid: string }> = ({ iid }) => {
    const [files, setFiles] = useState<GitLabFile[] | null>(null)

    useEffect(() => {
        getMergeRequest(iid).then(async (mr) => {
            mr.diffStats = mr.diffStats.filter(({ path }) =>
                path.endsWith('.xml')
            )

            const protocols = (await getMergeRequestFiles(mr)).filter(
                (file) => file.protocol !== undefined
            )

            setFiles(protocols)
        }).catch((_) => {
            setFiles([])
        })
    }, [iid])

    const contentView = files ? (
        <div>
            {files.map((file) => (
                <div key={file.path} id={file.name}>
                    <WaylandProtocol
                        element={file.protocol as any}
                        metadata={{
                            id: file.name.substring(0, file.name.length - 4),
                            name: file.protocol?.name
                                ? file.protocol.name
                                : file.name,
                            source: WaylandProtocolSource.External,
                            stability: WaylandProtocolStability.Unstable,
                            externalUrl: `https://gitlab.freedesktop.org${file.webPath}`,
                        }}
                    />
                </div>
            ))}
            {files.length === 0 ? <h1 className="text-center text-2xl mt-5">Not found</h1> : null}
        </div>
    ) : (
        <h1 className="text-center text-2xl mt-5">
          Loading...
        </h1>
    )

    const outlineView = files && files.length !== 0 ? (
        <div>
            {files.map((file) => (
                <div key={file.name}>
                    {files.length > 1 ? (
                        <a
                            href={`#${file.name}`}
                            className="
                                group flex items-center text-sm font-medium
                                bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-800
                                border-l-4 border-black dark:border-white
                                hover:text-purple-500 hover:border-purple-600
                                py-2 px-3 mt-2 mb-2
                            "
                        >
                            <span className="truncate">{file.name}</span>
                        </a>
                    ) : null}
                    <WaylandProtocolOutline
                        key={file.name}
                        element={file.protocol as any}
                    />
                </div>
            ))}
        </div>
    ) : null

    return (
        <MultiColumnLayout outlineView={outlineView} hideSidebar={false}>
            {contentView}
        </MultiColumnLayout>
    )
}
