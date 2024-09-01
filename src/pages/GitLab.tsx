import { MultiColumnLayout } from '../components/layout/MultiColumnLayout'
import { WaylandProtocolOutline } from '../components/outline/WaylandProtocolOutline'
import { WaylandProtocol } from '../components/WaylandProtocol'
import { useEffect, useState } from 'react'

import {
    WaylandProtocolSource,
    WaylandProtocolStability,
} from '../model/wayland-protocol-metadata'
import {
    getMergeRequest,
    getMergeRequestFiles,
    GitLabFile,
} from '../gitlab-api'

export const GitLab: React.FC<{ iid: string }> = ({ iid }) => {
    const [files, setFiles] = useState<GitLabFile[] | null>(null)

    useEffect(() => {
        getMergeRequest(iid)
            .then(getMergeRequestFiles)
            .then(protocols => {
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
                        element={file.protocol}
                        metadata={{
                            id: file.name.substring(0, file.name.length - 4),
                            name: file.protocol.name,
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
                        element={file.protocol}
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
