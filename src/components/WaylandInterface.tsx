import { WaylandElementProps, WaylandInterfaceModel } from './common'
import { WaylandColorTheme as colors } from './common/wayland-protocol-icons'
import { Badge } from './content/Badge'
import { WaylandDescription } from './WaylandDescription'
import { WaylandEnum } from './WaylandEnum'
import { WaylandEvent } from './WaylandEvent'
import { WaylandRequest } from './WaylandRequest'

export const WaylandInterface: React.FC<
    WaylandElementProps<WaylandInterfaceModel>
> = ({ element }) => (
    <div>
        <div className="flex items-center flex-wrap justify-between">
            <h2
                id={element.name}
                className="text-2xl font-extrabold text-gray-900 tracking-tight"
            >
                <a
                    href={`#${element.name}`}
                    title={`${element.name} interface`}
                    className={`${colors.Interface} truncate`}
                >
                    <span className="codicon codicon-symbol-interface mr-1"></span>
                    <span className="mr-1">{element.name}</span>
                </a>
            </h2>

            <Badge>version {element.version}</Badge>
        </div>

        {element.description ? (
            <div className="mb-8 mt-4">
                <WaylandDescription element={element.description} />
            </div>
        ) : (
            <br className="mb-6" />
        )}

        <div className="flex flex-col space-y-8">
            {element.requests?.map((request, index) => (
                <WaylandRequest
                    key={index}
                    element={request}
                    interfaceName={element.name}
                />
            ))}
            {element.events?.map((event, index) => (
                <WaylandEvent
                    key={index}
                    element={event}
                    interfaceName={element.name}
                />
            ))}
            {element.enums?.map((childElement, index) => (
                <WaylandEnum
                    key={index}
                    element={childElement}
                    interfaceName={element.name}
                />
            ))}
        </div>
    </div>
)
