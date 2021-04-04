import {
    WaylandElementProps,
    WaylandEntryModel,
    WaylandEnumModel,
} from './common'

export const WaylandEntry: React.FC<
    WaylandElementProps<WaylandEntryModel> & {
        interfaceName: string
        enumElement: WaylandEnumModel
    }
> = ({ element, enumElement, interfaceName }) => (
    <a
        className="text-purple-200"
        href={`#${interfaceName}:${enumElement.type}:${enumElement.name}:${element.type}:${element.name}`}
        title={element.summary}
    >
        {element.name}
    </a>
)
