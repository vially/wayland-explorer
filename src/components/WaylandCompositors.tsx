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
        <td className="text-xs text-gray-500 mt-1 border border-gray-700 border-l-0 p-1" title={timestamp}>
            {version ? version : '...'}
        </td>
    )
}

/** Row header for displaying compositor name icon and version */
const CompositorHeader: React.FC<{ compositor: CompositorRegistryItem }> = ({
    compositor,
}) => (
    <>
        <td className="border border-gray-700 text-center border-r-0 p-1">
            {compositor.icon && (
                <img
                    alt={compositor.name}
                    src={`/protocols/logos/${compositor.icon}.svg`}
                    className="dark:invert h-5 inline"
                />
            )}
        </td>
        <td className="border border-gray-700 border-l-0 border-r-0 p-1">
            {compositor.name}
        </td>
        <CompositorVersion compositor={compositor} />
    </>
)

const InterfaceHeader: React.FC<{
    name: string
    index: number
}> = ({ name, index }) => (
    <tr>
        <td className="border border-gray-700 text-right border-r-0 p-1" colSpan={index + 3}>{name}</td>
        <td className="border border-gray-700 border-l-0 text-center" rowSpan={index + 2}>↓</td>
    </tr>
)

/** Green/Red box for displaying supported interface version */
const InterfaceVersion: React.FC<{
    version: number | null
}> = ({ version }) => {
    const color = version !== null ? 'bg-emerald-700' : 'bg-red-900'
    const label = version !== null ? version : 'x'

    return (
        <td className="border border-gray-700 p-1">
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
        <table className="border-solid border border-gray-800 bg-gray-50 rounded dark:bg-neutral-900">
            <tbody>
            {interfaces.map((data, index) => (
                <InterfaceHeader key={index} name={data.name} index={index} />
            )).reverse()}
            <tr>
                <td className="border  border-gray-700 text-sm font-semibold text-gray-600 p-1" colSpan={3}>
                    Compositors
                </td>
            </tr>
            {compositorRegistry.map((compositor, index) => {
                return (
                    <tr key={index}>
                        <CompositorHeader compositor={compositor} />
                        {interfaces.map((data, index2) => (
                            <InterfaceVersion key={index2} version={data.versions[index]} />
                        ))}
                    </tr>
                )
            })}
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
