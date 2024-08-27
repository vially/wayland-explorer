import { WaylandElementProps, WaylandRequestModel } from './common'
import { WaylandColorTheme as colors } from './common/wayland-protocol-icons'
import { Badge } from './content/Badge'
import { WaylandElementSignature } from './content/WaylandElementSignature'
import { WaylandDataTable } from './WaylandDataTable'
import { WaylandDescription } from './WaylandDescription'

export const WaylandRequest: React.FC<
    WaylandElementProps<WaylandRequestModel> & { interfaceName: string }
> = ({ element, interfaceName }) => (
    <div>
        <div className="flex items-center flex-wrap justify-between">
            <a
                id={`${interfaceName}:${element.type}:${element.name}`}
                href={`#${interfaceName}:${element.type}:${element.name}`}
                title={`${element.name} request`}
                className={`${colors.Request} text-xl font-bold flex items-center`}
            >
                <span className="codicon codicon-symbol-method mr-1"></span>
                <span className="mr-1">
                    <span className={`hidden md:inline ${colors.Interface}`}>
                        {interfaceName}::
                    </span>
                    <span className="break-all">{element.name}</span>
                </span>
            </a>
            {(element.requestType || element.since) && (
                <div className="flex items-center gap-1">
                    {element.deprecatedSince && (
                        <Badge
                            bgColor="bg-red-500"
                            textColor="text-white"
                            fontWeigth="font-bold"
                        >
                            Deprecated since {element.deprecatedSince}
                        </Badge>
                    )}
                    {element.requestType && (
                        <Badge bgColor="bg-pink-100" textColor="text-pink-800">
                            Type: {element.requestType}
                        </Badge>
                    )}
                    {element.since && <Badge>since {element.since}</Badge>}
                </div>
            )}
        </div>

        <WaylandElementSignature
            element={element}
            interfaceName={interfaceName}
        />

        {!!element.args?.length && (
            <WaylandDataTable
                elements={element.args}
                parentElement={element}
                interfaceName={interfaceName}
            />
        )}

        {element.description && (
            <WaylandDescription element={element.description} />
        )}
    </div>
)
