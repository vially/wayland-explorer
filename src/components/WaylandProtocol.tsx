import { WaylandProtocolMetadata } from '../model/wayland-protocol-metadata'
import { Breadcrumbs } from './breadcrumbs/Breadcrumbs'
import { WaylandProtocolModel } from './common'
import { usePageTitle } from './common/hooks-utils'
import { WaylandCopyright } from './WaylandCopyright'
import { WaylandDescription } from './WaylandDescription'
import { WaylandInterface } from './WaylandInterface'

export const WaylandProtocol: React.FC<{
    element: WaylandProtocolModel
    metadata: WaylandProtocolMetadata
}> = ({ element, metadata }) => {
    usePageTitle(`${metadata.name} protocol`)

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
                    <WaylandInterface element={childElement} />
                    <hr className="my-10" />
                </div>
            ))}
            {element.copyright && (
                <WaylandCopyright element={element.copyright} />
            )}
        </div>
    )
}
