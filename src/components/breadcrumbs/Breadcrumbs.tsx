import {
    kdeProtocolsWithHardcodedPrefix,
    urlForWaylandProtocol,
    urlForWaylandProtocolSource,
    urlForWaylandProtocolStability,
} from '../../model/protocol-source-link-builder'
import {
    WaylandProtocolMetadata,
    WaylandProtocolSource,
} from '../../model/wayland-protocol-metadata'

export const Breadcrumbs: React.FC<{ metadata: WaylandProtocolMetadata }> = ({
    metadata,
}) => {
    const xmlFileBaseName =
        metadata.source === WaylandProtocolSource.KDEProtocols &&
        !kdeProtocolsWithHardcodedPrefix.includes(metadata.id)
            ? metadata.id.substring(4)
            : metadata.id

    return (
        <div>
            <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center space-x-1 [&>li]:overflow-x-hidden">
                    <li>
                        <div>
                            {metadata.source !==
                            WaylandProtocolSource.External ? (
                                <a
                                    href={urlForWaylandProtocolSource(
                                        metadata.source
                                    )}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-sm/loose text-gray-500 hover:text-gray-700"
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
                                        className="shrink-0 h-5 w-5 text-gray-400"
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
                                            metadata
                                        )}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="ml-1 text-sm/loose font-medium text-gray-500 hover:text-gray-700"
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
                                className="shrink-0 h-5 w-5 text-gray-400"
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
                                href={urlForWaylandProtocol(metadata)}
                                target="_blank"
                                rel="noreferrer"
                                className="ml-1 text-sm font-medium text-gray-500 hover:text-gray-700 truncate"
                            >
                                {xmlFileBaseName}.xml
                            </a>
                        </div>
                    </li>
                </ol>
            </nav>
        </div>
    )
}
