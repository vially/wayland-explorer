import { WaylandProtocolMetadata } from '../model/wayland-protocol-metadata'
import { Breadcrumbs } from './breadcrumbs/Breadcrumbs'
import { WaylandProtocolModel } from './common'
import { usePageTitle } from './common/hooks-utils'
import { WaylandCopyright } from './WaylandCopyright'
import { WaylandDescription } from './WaylandDescription'
import { WaylandInterface } from './WaylandInterface'
import { WaylandCompositors } from './WaylandCompositors'

export const WaylandProtocol: React.FC<{
    element: WaylandProtocolModel
    metadata: WaylandProtocolMetadata
}> = ({ element, metadata }) => {
    usePageTitle(`${metadata.name} protocol`)

    const get_deprecation = (name: string) => {
        const deprecated = metadata.deprecated ? metadata.deprecated : []
        return deprecated.find((item) => item.name === name)
    }

    return (
        <div>
            <div className="py-4 border-b border-gray-200 mb-10 dark:border-gray-700">
                <div className="flex items-center">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight dark:text-white">
                        {metadata.name}
                    </h1>
                </div>

                <Breadcrumbs metadata={metadata} />

                {element.description && (
                    <div className="mt-6">
                        <WaylandDescription element={element.description} />
                    </div>
                )}
            </div>
            {element.interfaces.map((childElement, index) => (
                <div key={index}>
                    <WaylandInterface
                        element={childElement}
                        deprecated={get_deprecation(childElement.name)}
                    />
                    <hr className="my-10" />
                </div>
            ))}
            <WaylandCompositors element={element} />
            {element.copyright && (
                <WaylandCopyright element={element.copyright} />
            )}
        </div>
    )
}
