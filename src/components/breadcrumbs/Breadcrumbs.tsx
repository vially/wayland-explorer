import React from 'react'
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

const SolidChevronRight: React.FC<{ className: string }> = ({ className }) => {
    // Heroicon name: solid/chevron-right
    return (
        <svg
            className={`shrink-0 h-5 w-5 text-gray-400 ${className}`}
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
    )
}

export const BreadcrumbSection: React.FC<{
    children?: React.ReactNode
    href?: string
}> = ({ children, href }) =>
    href ? (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-gray-500 hover:text-gray-700 truncate"
        >
            {children}
        </a>
    ) : (
        <span className="text-sm text-gray-500">{children}</span>
    )

export const WaylandBreadcrumbs: React.FC<{
    metadata: WaylandProtocolMetadata
}> = ({ metadata }) => {
    const xmlFileBaseName =
        metadata.source === WaylandProtocolSource.KDEProtocols &&
        !kdeProtocolsWithHardcodedPrefix.includes(metadata.id)
            ? metadata.id.substring(4)
            : metadata.id

    const source =
        metadata.source === WaylandProtocolSource.External ? (
            <BreadcrumbSection>external</BreadcrumbSection>
        ) : (
            <BreadcrumbSection
                href={urlForWaylandProtocolSource(metadata.source)}
            >
                {metadata.source}
            </BreadcrumbSection>
        )

    const stability = metadata.source !== WaylandProtocolSource.WaylandCore &&
        metadata.source !== WaylandProtocolSource.External && (
            <BreadcrumbSection href={urlForWaylandProtocolStability(metadata)}>
                {metadata.stability}
            </BreadcrumbSection>
        )

    return (
        <Breadcrumbs>
            {source}
            {stability}
            <BreadcrumbSection href={urlForWaylandProtocol(metadata)}>
                {xmlFileBaseName}.xml
            </BreadcrumbSection>
        </Breadcrumbs>
    )
}

export const Breadcrumbs: React.FC<{ children?: React.ReactNode }> = ({
    children,
}) => {
    return (
        <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center space-x-1 [&>li]:overflow-x-hidden">
                {React.Children.toArray(children).map((child, i) => {
                    return (
                        <li key={i}>
                            {i !== 0 ? (
                                <div className="flex items-center">
                                    <SolidChevronRight className="mr-1" />
                                    {child}
                                </div>
                            ) : (
                                child
                            )}
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}
