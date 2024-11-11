import React from 'react'
import { isWaylandEnumElement, WaylandElementType } from '../../model/wayland'
import {
    WaylandEnumModel,
    WaylandEventModel,
    WaylandRequestModel,
} from '../common'
import { waylandElementConfigFor } from '../common/wayland-protocol-icons'
import { WaylandArg } from '../WaylandArg'
import { WaylandEntry } from '../WaylandEntry'

export const WaylandElementSignature: React.FC<{
    element: WaylandRequestModel | WaylandEventModel | WaylandEnumModel
    interfaceName: string
}> = ({ element, interfaceName }) => (
    <div className="my-4 p-2 rounded-sm text-gray-100 overflow-hidden bg-gray-800">
        <pre className="overflow-x-auto" style={{colorScheme: "dark"}}>
            <span className={colorFor(element.type)}>{element.name}</span>
            {isWaylandEnumElement(element) ? (
                <span>
                    {' { '}
                    {element.entries?.map((entry, index) => (
                        <span key={index}>
                            <WaylandEntry
                                element={entry}
                                enumElement={element}
                                interfaceName={interfaceName}
                            />
                            {index !== element.entries!.length - 1 && ', '}
                        </span>
                    ))}
                    {' } '}
                </span>
            ) : (
                <span>
                    (
                    {element.args.map((childElement, index) => (
                        <span key={index}>
                            <WaylandArg
                                element={childElement}
                                parentElement={element}
                                interfaceName={interfaceName}
                            />
                            {index !== element.args!.length - 1 && ', '}
                        </span>
                    ))}
                    )
                </span>
            )}
        </pre>
    </div>
)

const colorFor = (elementType: WaylandElementType): string =>
    elementType === WaylandElementType.Event
        ? 'text-emerald-300'
        : waylandElementConfigFor(elementType).color
