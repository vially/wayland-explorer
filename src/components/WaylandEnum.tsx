import React from 'react'
import { WaylandDataTable } from './WaylandDataTable'
import { WaylandDescription } from './WaylandDescription'
import { WaylandElementProps, WaylandEnumModel } from './common'
import { WaylandColorTheme as colors } from './common/wayland-protocol-icons'
import { Badge } from './content/Badge'
import { WaylandElementSignature } from './content/WaylandElementSignature'

export const WaylandEnum: React.FC<
    WaylandElementProps<WaylandEnumModel> & { interfaceName: string }
> = ({ element, interfaceName }) => (
    <div>
        <div className="flex items-center flex-wrap justify-between overflow-x-auto">
            <a
                id={`${interfaceName}:${element.type}:${element.name}`}
                href={`#${interfaceName}:${element.type}:${element.name}`}
                title={`${element.name} enum`}
                className={`${colors.Enum} text-xl font-bold flex items-center`}
            >
                <span className="codicon codicon-symbol-enum mr-1"></span>
                <span className="mr-1">
                    <span className={`hidden md:inline ${colors.Interface}`}>
                        {interfaceName}::
                    </span>
                    <span>{element.name}</span>
                </span>
            </a>
            {(element.bitfield || element.since) && (
                <div className="flex items-center gap-1">
                    {element.bitfield && (
                        <Badge
                            bgColor="bg-orange-100"
                            textColor="text-orange-800"
                        >
                            bitfield
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

        {!!element.entries?.length && (
            <WaylandDataTable
                elements={element.entries}
                parentElement={element}
                interfaceName={interfaceName}
            />
        )}

        {element.description && (
            <WaylandDescription element={element.description} />
        )}
    </div>
)
