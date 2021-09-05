import { useEffect, useState } from 'react'
import { userConfig } from '../../config'
import {
    kdeProtocolsWithHardcodedPrefix,
    urlForWaylandProtocol,
    urlForWaylandProtocolSource,
    urlForWaylandProtocolStability,
} from '../../model/protocol-source-link-builder'
import {
    GitServiceProvider,
    WaylandProtocolMetadata,
    WaylandProtocolSource,
} from '../../model/wayland-protocol-metadata'

export const Breadcrumbs: React.FC<{ metadata: WaylandProtocolMetadata }> = ({
    metadata,
}) => {
    const [gitServiceProvider, setGitServiceProvider] = useState(
        GitServiceProvider.GitHub
    )

    const xmlFileBaseName =
        metadata.source === WaylandProtocolSource.KDEProtocols &&
        !kdeProtocolsWithHardcodedPrefix.includes(metadata.id)
            ? metadata.id.substring(4)
            : metadata.id

    useEffect(() => {
        setGitServiceProvider(userConfig.gitServiceProvider)
    }, [])

    return (
        <div>
            <nav className="hidden sm:flex" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2">
                    <li>
                        <div>
                            {metadata.source !==
                            WaylandProtocolSource.External ? (
                                <a
                                    href={urlForWaylandProtocolSource(
                                        metadata.source,
                                        gitServiceProvider
                                    )}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-sm text-gray-500 hover:text-gray-700"
                                >
                                    {metadata.source}
                                </a>
                            ) : (
                                <span className="text-sm text-gray-500">
                                    external
                                </span>
                            )}
                        </div>
                    </li>
                    {metadata.source !== WaylandProtocolSource.WaylandCore &&
                        metadata.source !== WaylandProtocolSource.External && (
                            <li>
                                <div className="flex items-center">
                                    {/* Heroicon name: solid/chevron-right */}
                                    <svg
                                        className="flex-shrink-0 h-5 w-5 text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <a
                                        href={urlForWaylandProtocolStability(
                                            metadata,
                                            gitServiceProvider
                                        )}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                                    >
                                        {metadata.stability}
                                    </a>
                                </div>
                            </li>
                        )}
                    <li>
                        <div className="flex items-center">
                            {/* Heroicon name: solid/chevron-right */}
                            <svg
                                className="flex-shrink-0 h-5 w-5 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>

                            <a
                                href={urlForWaylandProtocol(
                                    metadata,
                                    gitServiceProvider
                                )}
                                target="_blank"
                                rel="noreferrer"
                                className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700 truncate"
                            >
                                {xmlFileBaseName}.xml
                            </a>
                        </div>
                    </li>
                </ol>
            </nav>
            <div className="sm:hidden">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {metadata.id}
                </span>
            </div>
        </div>
    )
}
