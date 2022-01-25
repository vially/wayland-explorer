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
                'https://github.com/wayland-project/wayland/tree/main/protocol',
            protocolUrl:
                'https://github.com/wayland-project/wayland/blob/main/protocol/wayland.xml',
        },
        [GitServiceProvider.GitLab]: {
            repositoryUrl: 'https://gitlab.freedesktop.org/wayland/wayland',
            stabilityUrl:
                'https://gitlab.freedesktop.org/wayland/wayland/-/tree/main/protocol',
            protocolUrl:
                'https://gitlab.freedesktop.org/wayland/wayland/-/blob/main/protocol/wayland.xml',
        },
    },
    [WaylandProtocolSource.WaylandProtocols]: {
        [GitServiceProvider.GitHub]: {
            repositoryUrl:
                'https://github.com/wayland-project/wayland-protocols',
            stabilityUrl:
                // eslint-disable-next-line no-template-curly-in-string
                'https://github.com/wayland-project/wayland-protocols/tree/main/${stability}',
            protocolUrl:
                // eslint-disable-next-line no-template-curly-in-string
                'https://github.com/wayland-project/wayland-protocols/blob/main/${stability}/${protocol}.xml',
        },
        [GitServiceProvider.GitLab]: {
            repositoryUrl:
                'https://gitlab.freedesktop.org/wayland/wayland-protocols',
            stabilityUrl:
                // eslint-disable-next-line no-template-curly-in-string
                'https://gitlab.freedesktop.org/wayland/wayland-protocols/-/tree/main/${stability}',
            protocolUrl:
                // eslint-disable-next-line no-template-curly-in-string
                'https://gitlab.freedesktop.org/wayland/wayland-protocols/-/blob/main/${stability}/${protocol}.xml',
        },
    },
    [WaylandProtocolSource.WlrProtocols]: {
        repositoryUrl: 'https://gitlab.freedesktop.org/wlroots/wlr-protocols',
        stabilityUrl:
            // eslint-disable-next-line no-template-curly-in-string
            'https://gitlab.freedesktop.org/wlroots/wlr-protocols/-/tree/master/${stability}',
        protocolUrl:
            // eslint-disable-next-line no-template-curly-in-string
            'https://gitlab.freedesktop.org/wlroots/wlr-protocols/-/blob/master/${stability}/${protocol}.xml',
    },
    [WaylandProtocolSource.KDEProtocols]: {
        repositoryUrl: 'https://github.com/KDE/plasma-wayland-protocols',
        stabilityUrl:
            'https://github.com/KDE/plasma-wayland-protocols/tree/master/src/protocols',
        protocolUrl:
            // eslint-disable-next-line no-template-curly-in-string
            'https://github.com/KDE/plasma-wayland-protocols/blob/master/src/protocols/${protocol}.xml',
    },
    [WaylandProtocolSource.WestonProtocols]: {
        repositoryUrl: 'https://gitlab.freedesktop.org/wayland/weston',
        stabilityUrl:
            'https://gitlab.freedesktop.org/wayland/weston/-/tree/main/protocol',
        protocolUrl:
            // eslint-disable-next-line no-template-curly-in-string
            'https://gitlab.freedesktop.org/wayland/weston/-/blob/main/protocol/${protocol}.xml',
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

function sourceUrlBuilderFor(
    source: WaylandProtocolSource,
    gitServiceProvider: GitServiceProvider
): SourceUrlBuilder {
    const configLike = sourceRepositoryUrls[source]
    const config = isProtocolSourceUrlConfig(configLike)
        ? configLike
        : configLike[gitServiceProvider]

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
                    : metadata.source === WaylandProtocolSource.KDEProtocols &&
                      !kdeProtocolsWithHardcodedPrefix.includes(metadata.id)
                    ? metadata.id.substring(4)
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
    source: WaylandProtocolSource,
    gitServiceProvider: GitServiceProvider
): string {
    return sourceUrlBuilderFor(source, gitServiceProvider).repositoryUrl
}

export function urlForWaylandProtocol(
    metadata: WaylandProtocolMetadata,
    gitServiceProvider: GitServiceProvider
): string {
    return metadata.externalUrl
        ? metadata.externalUrl
        : sourceUrlBuilderFor(
              metadata.source,
              gitServiceProvider
          ).protocolUrlFor(metadata)
}

export function urlForWaylandProtocolStability(
    metadata: WaylandProtocolMetadata,
    gitServiceProvider: GitServiceProvider
): string {
    return sourceUrlBuilderFor(
        metadata.source,
        gitServiceProvider
    ).stabilityUrlFor(metadata)
}

function waylandProtocolDirectoryNameFor(
    metadata: WaylandProtocolMetadata
): string {
    if (metadata.stability === WaylandProtocolStability.Stable) {
        return metadata.id
    } else if (metadata.stability === WaylandProtocolStability.Staging) {
        // Remove version suffix (e.g.: '-v1')
        return metadata.id.substring(0, metadata.id.length - 3)
    }

    // TODO: Add directory name to metadata object and remove this hack
    const [directoryName] = metadata.id.split(`-${metadata.stability}-v`)
    return directoryName
}

export const kdeProtocolsWithHardcodedPrefix = [
    'kde-output-management-v2',
    'kde-output-device-v2',
    'kde-primary-output-v1',
]
