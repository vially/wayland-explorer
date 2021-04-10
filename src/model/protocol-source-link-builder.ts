import { userConfig } from '../config'
import {
    GitServiceProvider,
    WaylandProtocolMetadata,
    WaylandProtocolSource,
    WaylandProtocolStability,
} from './wayland-protocol-metadata'

interface ProtocolSourceUrlConfig {
    repositoryUrl: string
    stabilityUrl: string
    protocolUrl: string
}

type ProtocolSourceUrlConfigLike =
    | ProtocolSourceUrlConfig
    | Record<GitServiceProvider, ProtocolSourceUrlConfig>

const isProtocolSourceUrlConfig = (
    templateOrMapping: ProtocolSourceUrlConfigLike
): templateOrMapping is ProtocolSourceUrlConfig =>
    'repositoryUrl' in templateOrMapping

const sourceRepositoryUrls: Record<
    WaylandProtocolSource,
    ProtocolSourceUrlConfigLike
> = {
    [WaylandProtocolSource.WaylandCore]: {
        [GitServiceProvider.GitHub]: {
            repositoryUrl: 'https://github.com/wayland-project/wayland',
            stabilityUrl:
                'https://github.com/wayland-project/wayland/tree/master/protocol',
            protocolUrl:
                'https://github.com/wayland-project/wayland/blob/master/protocol/wayland.xml',
        },
        [GitServiceProvider.GitLab]: {
            repositoryUrl: 'https://gitlab.freedesktop.org/wayland/wayland',
            stabilityUrl:
                'https://gitlab.freedesktop.org/wayland/wayland/-/tree/master/protocol',
            protocolUrl:
                'https://gitlab.freedesktop.org/wayland/wayland/-/blob/master/protocol/wayland.xml',
        },
    },
    [WaylandProtocolSource.WaylandProtocols]: {
        [GitServiceProvider.GitHub]: {
            repositoryUrl:
                'https://github.com/wayland-project/wayland-protocols',
            stabilityUrl:
                // eslint-disable-next-line no-template-curly-in-string
                'https://github.com/wayland-project/wayland-protocols/tree/master/${stability}',
            protocolUrl:
                // eslint-disable-next-line no-template-curly-in-string
                'https://github.com/wayland-project/wayland-protocols/blob/master/${stability}/${protocol}.xml',
        },
        [GitServiceProvider.GitLab]: {
            repositoryUrl:
                'https://gitlab.freedesktop.org/wayland/wayland-protocols',
            stabilityUrl:
                // eslint-disable-next-line no-template-curly-in-string
                'https://gitlab.freedesktop.org/wayland/wayland-protocols/-/tree/master/${stability}',
            protocolUrl:
                // eslint-disable-next-line no-template-curly-in-string
                'https://gitlab.freedesktop.org/wayland/wayland-protocols/-/blob/master/${stability}/${protocol}.xml',
        },
    },
    [WaylandProtocolSource.WlrProtocols]: {
        repositoryUrl: 'https://github.com/swaywm/wlr-protocols',
        stabilityUrl:
            // eslint-disable-next-line no-template-curly-in-string
            'https://github.com/swaywm/wlr-protocols/tree/master/${stability}',
        protocolUrl:
            // eslint-disable-next-line no-template-curly-in-string
            'https://github.com/swaywm/wlr-protocols/blob/master/${stability}/${protocol}.xml',
    },
    [WaylandProtocolSource.External]: {
        repositoryUrl: '',
        stabilityUrl: '',
        protocolUrl: '',
    },
}

interface SourceUrlBuilder {
    repositoryUrl: string
    stabilityUrlFor: (metadata: WaylandProtocolMetadata) => string
    protocolUrlFor: (metadata: WaylandProtocolMetadata) => string
}

function sourceUrlBuilderFor(source: WaylandProtocolSource): SourceUrlBuilder {
    const configLike = sourceRepositoryUrls[source]
    const config = isProtocolSourceUrlConfig(configLike)
        ? configLike
        : configLike[userConfig.gitServiceProvider]

    return {
        repositoryUrl: config.repositoryUrl,
        stabilityUrlFor: (metadata: WaylandProtocolMetadata) =>
            // eslint-disable-next-line no-template-curly-in-string
            config.stabilityUrl.replace('${stability}', metadata.stability),
        protocolUrlFor: (metadata: WaylandProtocolMetadata) => {
            const protocolId =
                metadata.source === WaylandProtocolSource.WaylandProtocols
                    ? `${waylandProtocolDirectoryNameFor(metadata)}/${
                          metadata.id
                      }`
                    : metadata.id

            return (
                config.protocolUrl
                    // eslint-disable-next-line no-template-curly-in-string
                    .replace('${stability}', metadata.stability)
                    // eslint-disable-next-line no-template-curly-in-string
                    .replace('${protocol}', protocolId)
            )
        },
    }
}

export function urlForWaylandProtocolSource(
    source: WaylandProtocolSource
): string {
    return sourceUrlBuilderFor(source).repositoryUrl
}

export function urlForWaylandProtocol(
    metadata: WaylandProtocolMetadata
): string {
    return metadata.externalUrl
        ? metadata.externalUrl
        : sourceUrlBuilderFor(metadata.source).protocolUrlFor(metadata)
}

export function urlForWaylandProtocolStability(
    metadata: WaylandProtocolMetadata
): string {
    return sourceUrlBuilderFor(metadata.source).stabilityUrlFor(metadata)
}

function waylandProtocolDirectoryNameFor(
    metadata: WaylandProtocolMetadata
): string {
    if (metadata.stability === WaylandProtocolStability.Stable) {
        return metadata.id
    }

    // TODO: Add directory name to metadata object and remove this hack
    const [directoryName] = metadata.id.split(`-${metadata.stability}-v`)
    return directoryName
}
