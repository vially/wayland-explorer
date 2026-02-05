import {
    compositorRegistry,
    CompositorRegistryItem,
} from '../data/compositor-registry'
import { WaylandProtocolModel } from './common'

export const WaylandCompositors: React.FC<{
    element: WaylandProtocolModel
}> = ({ element }) => {
    return (
        <div className="mb-10">
            <h4
                id="compositor-support"
                className="flex items-center text-xl mt-6"
            >
                <a href="#compositor-support">
                    <span className="codicon codicon-debug-disconnect mr-1"></span>
                    Compositor Support
                </a>
            </h4>

            <div className="overflow-x-auto">
                <CanIUseTable protocol={element} />
            </div>
        </div>
    )
}

/** Label for displaying compositor version */
const CompositorVersion: React.FC<{ compositor: CompositorRegistryItem }> = ({
    compositor,
}) => {
    const version = compositor.info.version
    const timestamp = new Date(
        compositor.info.generationTimestamp
    ).toLocaleDateString()

    return (
        <span className="text-xs text-gray-500 mt-1" title={timestamp}>
            {version ? version : '...'}
        </span>
    )
}

/** Column header for displaying compositor name icon and version */
const CompositorHeader: React.FC<{ compositor: CompositorRegistryItem }> = ({
    compositor,
}) => (
    <th className="px-2 pt-1 align-bottom">
        <div className="flex flex-col justify-end items-center gap-2">
            <div className="[writing-mode:vertical-rl] rotate-180">
                {compositor.name}
            </div>
            <div className="aspect-square h-5">
                {compositor.icon && (
                    <img
                        alt={compositor.name}
                        src={`/protocols/logos/${compositor.icon}.svg`}
                        className="dark:invert h-5 m-auto"
                    />
                )}
            </div>
        </div>
        <CompositorVersion compositor={compositor} />
    </th>
)

/** Green/Red box for displaying supported interface version */
const InterfaceVersion: React.FC<{
    version: number | null
}> = ({ version }) => {
    const color = version !== null ? 'bg-emerald-700' : 'bg-red-900'
    const label = version !== null ? version : 'x'

    return (
        <td className="border-b border-gray-300 dark:border-gray-900">
            <div className="flex justify-center">
                <div
                    className={`w-7 h-7 leading-7 text-white rounded-lg text-center ${color}`}
                >
                    {label}
                </div>
            </div>
        </td>
    )
}

const InterfaceRow: React.FC<{
    name: string
    versions: (number | null)[]
}> = ({ name, versions }) => (
    <tr>
        <td className="border-b border-gray-300 dark:border-gray-900 p-2">
            {name}
        </td>
        {versions.map((version, index) => (
            <InterfaceVersion key={index} version={version} />
        ))}
    </tr>
)

const CanIUseTable: React.FC<{
    protocol: WaylandProtocolModel
}> = ({ protocol }) => {
    const interfaces = protocol.interfaces
        .map((waylandInterface) => {
            const versions = compositorRegistry.map((comp) => {
                const info = comp.info.globals.find(
                    (global) => global.interface === waylandInterface.name
                )

                if (info !== undefined) {
                    return info.version
                } else {
                    return null
                }
            })

            return {
                name: waylandInterface.name,
                versions,
            }
        })
        .filter((data) => data.versions.some((v) => v != null))

    if (interfaces.length === 0) {
        return <NotFound />
    }

    return (
        <table className="border-collapse bg-gray-50 rounded dark:bg-neutral-900">
            <thead>
                <tr>
                    <th className="p-4"></th>
                    {compositorRegistry.map((compositor) => (
                        <CompositorHeader key={compositor.id} compositor={compositor} />
                    ))}
                </tr>
            </thead>

            <tbody className="bg-white dark:bg-neutral-800">
                {interfaces.map((data, index) => (
                    <InterfaceRow
                        name={data.name}
                        versions={data.versions}
                        key={index}
                    />
                ))}
            </tbody>
        </table>
    )
}

const NotFound: React.FC = () => (
    <div className="flex md:justify-center w-full items-center overflow-x-auto mt-5">
        <span
            className="codicon codicon-search mr-3"
            style={{ fontSize: 50 }}
        ></span>
        <span className="text-xl">No compositor support found</span>
    </div>
)
