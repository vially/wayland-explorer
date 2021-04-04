import {
    WaylandArgModel,
    WaylandEnumModel,
    WaylandEventModel,
    WaylandRequestModel,
} from './common'
import { buildHashPathFor } from './common/utils'
import { WaylandColorTheme as colors } from './common/wayland-protocol-icons'

export const WaylandArg: React.FC<{
    element: WaylandArgModel
    interfaceName: string
    parentElement: WaylandRequestModel | WaylandEventModel | WaylandEnumModel
}> = ({ element, interfaceName, parentElement }) => (
    <span>
        <a
            href={buildHashPathFor(interfaceName, parentElement, element, {
                includeHashSymbol: true,
            })}
            title={element.summary}
            className="text-purple-200"
        >
            {element.name}
        </a>
        : <span className="text-yellow-100">{element.argType}</span>
        {element.interface && (
            <span>
                {'<'}
                <a href={`#${element.interface}`} className={`text-blue-300`}>
                    {element.interface}
                </a>
                {'>'}
            </span>
        )}
        {element.enum && (
            <span>
                {'<'}
                <ArgEnum argEnum={element.enum} interfaceName={interfaceName} />
                {'>'}
            </span>
        )}
    </span>
)

const ArgEnum: React.FC<{ interfaceName: string; argEnum: string }> = ({
    argEnum,
    interfaceName,
}) => {
    let enumName = argEnum
    if (enumName.includes('.')) {
        ;[interfaceName, enumName] = enumName.split('.')
    }

    return (
        <a href={`#${interfaceName}:enum:${enumName}`}>
            <span className={`text-blue-300`}>{interfaceName}</span>.
            <span className={`text-${colors.Enum}`}>{enumName}</span>
        </a>
    )
}
