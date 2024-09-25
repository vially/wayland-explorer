import {
    waylandProtocolRegistry,
    WaylandProtocolRegistryItem,
} from '../../data/protocol-registry'
import {
    WaylandProtocolSource,
    WaylandProtocolStability,
} from '../../model/wayland-protocol-metadata'
import { SidebarNavLink } from './SidebarNavLink'

const SectionTitle: React.FC<{ title: string; icon?: string }> = ({
    title,
    icon,
}) => (
    <h3
        className="px-4 pb-2 text-xs font-semibold text-gray-700 uppercase tracking-wider truncate dark:text-gray-600"
        title={title}
    >
        <div className="flex items-center">
            {icon ? <span className={`codicon codicon-${icon} mr-1`} /> : null}
            {title}
        </div>
    </h3>
)

export const WaylandProtocolLinks: React.FC = () => (
    <nav
        aria-label="Sidebar"
        className="h-full overflow-y-auto pb-4 space-y-6 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700"
    >
        {groupProtocolsIntoSections().map((section) => (
            <div key={section.name}>
                <SectionTitle title={section.name} />

                <div className="grow flex flex-col">
                    <div className="flex-1 space-y-1">
                        {section.items.map((protocol) => (
                            <SidebarNavLink
                                key={protocol.id}
                                href={`/${protocol.id}`}
                                title={protocol.name}
                            >
                                {protocol.name}
                            </SidebarNavLink>
                        ))}
                    </div>
                </div>
            </div>
        ))}

        <div>
            <SectionTitle title="Merge Requests" icon="git-pull-request" />

            <div className="grow flex flex-col">
                <div className="flex-1 space-y-1">
                    <SidebarNavLink
                        href="/wayland-protocols"
                        title="wayland-protocols"
                    >
                        wayland-protocols
                    </SidebarNavLink>
                </div>
            </div>
        </div>
    </nav>
)

interface Section {
    name: string
    items: WaylandProtocolRegistryItem[]
}

function groupProtocolsIntoSections(): Section[] {
    const { protocols } = waylandProtocolRegistry
    const coreSection: Section = {
        name: 'Core',
        items: [protocols.find((protocol) => protocol.id === 'wayland')!],
    }

    const waylandProtocolsStable: Section = {
        name: 'Stable',
        items: protocols.filter(
            ({ source, stability }) =>
                source === WaylandProtocolSource.WaylandProtocols &&
                stability === WaylandProtocolStability.Stable
        ),
    }

    const waylandProtocolsStaging: Section = {
        name: 'Staging',
        items: protocols.filter(
            ({ source, stability }) =>
                source === WaylandProtocolSource.WaylandProtocols &&
                stability === WaylandProtocolStability.Staging
        ),
    }

    const waylandProtocolsUnstable: Section = {
        name: 'Unstable',
        items: protocols.filter(
            ({ source, stability }) =>
                source === WaylandProtocolSource.WaylandProtocols &&
                stability === WaylandProtocolStability.Unstable
        ),
    }

    const wlrProtocolsUnstable: Section = {
        name: 'wlr unstable',
        items: protocols.filter(
            ({ source, stability }) =>
                source === WaylandProtocolSource.WlrProtocols &&
                stability === WaylandProtocolStability.Unstable
        ),
    }

    const kdeProtocolsUnstable: Section = {
        name: 'KDE unstable',
        items: protocols.filter(
            ({ source, stability }) =>
                source === WaylandProtocolSource.KDEProtocols &&
                stability === WaylandProtocolStability.Unstable
        ),
    }

    const cosmicProtocolsUnstable: Section = {
        name: 'Cosmic unstable',
        items: protocols.filter(
            ({ source, stability }) =>
                source === WaylandProtocolSource.CosmicProtocols &&
                stability === WaylandProtocolStability.Unstable
        ),
    }

    const frogProtocols: Section = {
        name: 'Frog',
        items: protocols.filter(
            ({ source }) => 
                source === WaylandProtocolSource.FrogProtocols
        ),
    }

    const westonProtocolsUnstable: Section = {
        name: 'Weston unstable',
        items: protocols.filter(
            ({ source, stability }) =>
                source === WaylandProtocolSource.WestonProtocols &&
                stability === WaylandProtocolStability.Unstable
        ),
    }

    const externalProtocols: Section = {
        name: 'External',
        items: protocols.filter(
            ({ source }) => source === WaylandProtocolSource.External
        ),
    }

    return [
        coreSection,
        waylandProtocolsStable,
        waylandProtocolsStaging,
        waylandProtocolsUnstable,
        wlrProtocolsUnstable,
        kdeProtocolsUnstable,
        cosmicProtocolsUnstable,
        frogProtocols,
        westonProtocolsUnstable,
        externalProtocols,
    ]
}
