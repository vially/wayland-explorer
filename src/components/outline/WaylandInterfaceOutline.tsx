import {
    WaylandElementProps,
    WaylandEnumModel,
    WaylandEventModel,
    WaylandInterfaceModel,
    WaylandRequestModel,
} from '../common'
import { waylandElementConfigFor } from '../common/wayland-protocol-icons'

export const WaylandInterfaceOutline: React.FC<
    WaylandElementProps<WaylandInterfaceModel>
> = ({ element }) => {
    const { requests = [], events = [], enums = [] } = element
    const children = [...requests, ...events, ...enums]
    const { icon, color } = waylandElementConfigFor(element.type)

    return (
        <div className={color}>
            <a
                href={`#${element.name}`}
                title={element.description?.summary}
                className="flex items-center"
            >
                <span className={`codicon codicon-symbol-${icon} mr-1`}></span>
                <span className="truncate">{element.name}</span>
            </a>
            {children.map((childElement, index) => (
                <WaylandInterfaceChildOutline
                    key={index}
                    element={childElement}
                    interfaceElement={element}
                />
            ))}
        </div>
    )
}

const WaylandInterfaceChildOutline: React.FC<
    WaylandElementProps<
        WaylandRequestModel | WaylandEventModel | WaylandEnumModel
    > & {
        interfaceElement: WaylandInterfaceModel
    }
> = ({ element, interfaceElement }) => {
    const { color, icon } = waylandElementConfigFor(element.type)
    return (
        <div>
            <a
                className={`${color} ml-4 flex items-center`}
                href={`#${interfaceElement.name}:${element.type}:${element.name}`}
                title={element.description?.summary}
            >
                <span className={`codicon codicon-symbol-${icon} mr-1`}></span>
                <span className="truncate">{element.name}</span>
            </a>
        </div>
    )
}
