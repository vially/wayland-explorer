import { isWaylandArgElement, isWaylandEntryElement } from '../model/wayland'
import {
    WaylandArgModel,
    WaylandEntryModel,
    WaylandEnumModel,
    WaylandEventModel,
    WaylandRequestModel,
} from './common'
import { buildHashPathFor } from './common/utils'
import { WaylandColorTheme as colors } from './common/wayland-protocol-icons'
import { Badge } from './content/Badge'
import { WaylandDescription } from './WaylandDescription'

export const WaylandDataTable: React.FC<{
    elements: (WaylandEntryModel | WaylandArgModel)[]
    interfaceName: string
    parentElement: WaylandRequestModel | WaylandEventModel | WaylandEnumModel
}> = ({ elements, interfaceName, parentElement }) => (
    <div className="my-4 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
        <table className="w-full table-auto text-left border-collapse">
            <thead>
                <tr>
                    <TableHeader>Argument</TableHeader>
                    <TableHeader>
                        {isWaylandArgElement(elements[0]) ? 'Type' : 'Value'}
                    </TableHeader>
                    <TableHeader>Description</TableHeader>
                </tr>
            </thead>
            <tbody>
                {elements.map((element, index) => (
                    <tr
                        id={buildHashPathFor(
                            interfaceName,
                            parentElement,
                            element
                        )}
                        key={element.name}
                    >
                        <TableCol
                            showBorder={index > 0}
                            extraClasses="font-mono text-purple-500"
                        >
                            <a
                                href={`#${buildHashPathFor(
                                    interfaceName,
                                    parentElement,
                                    element
                                )}`}
                            >
                                {element.name}
                            </a>
                            {isWaylandEntryElement(element) &&
                                element.deprecatedSince && (
                                    <span className="ml-2">
                                        <Badge
                                            bgColor="bg-red-500"
                                            textColor="text-white"
                                            fontWeigth="font-bold"
                                        >
                                            Deprecated since{' '}
                                            {element.deprecatedSince}
                                        </Badge>
                                    </span>
                                )}
                            {isWaylandEntryElement(element) && element.since && (
                                <span className="ml-2">
                                    <Badge>since {element.since}</Badge>
                                </span>
                            )}
                        </TableCol>
                        {isWaylandArgElement(element) && (
                            <TableCol
                                showBorder={index > 0}
                                extraClasses="font-mono"
                            >
                                {element.argType}
                                {(element.interface || element.enum) && (
                                    <span>{'<'}</span>
                                )}
                                {element.interface && (
                                    <a
                                        href={`#${element.interface}`}
                                        className={`font-bold ${colors.Interface}`}
                                    >
                                        {element.interface}
                                    </a>
                                )}
                                {element.enum && (
                                    <ArgEnum
                                        argEnum={element.enum}
                                        interfaceName={interfaceName}
                                    />
                                )}
                                {(element.interface || element.enum) && (
                                    <span>{'>'}</span>
                                )}
                                {element.allowNull && (
                                    <span className="ml-2">
                                        <Badge>allow null</Badge>
                                    </span>
                                )}
                            </TableCol>
                        )}
                        {isWaylandEntryElement(element) && (
                            <TableCol
                                showBorder={index > 0}
                                extraClasses="font-mono"
                            >
                                {element.value}
                            </TableCol>
                        )}
                        <TableCol showBorder={index > 0}>
                            <div>{element.summary}</div>
                            {element.description && (
                                <WaylandDescription
                                    element={element.description}
                                />
                            )}
                        </TableCol>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
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
        <a href={`#${interfaceName}:enum:${enumName}`} className="font-bold">
            <span className={colors.Interface}>{interfaceName}</span>.
            <span className={colors.Enum}>{enumName}</span>
        </a>
    )
}

const TableCol: React.FC<{
    showBorder: boolean
    extraClasses?: string
    children?: React.ReactNode
}> = (props) => (
    <td
        className={`py-2 pr-2 text-xs ${
            props.showBorder
                ? 'border-t border-gray-200 dark:border-gray-700'
                : ''
        } ${props.extraClasses ?? ''}`}
    >
        {props.children}
    </td>
)

const TableHeader: React.FC<{
    extraClasses?: string
    children?: React.ReactNode
}> = (props) => (
    <th className="text-sm font-semibold text-gray-600 p-0">
        <div className="pb-2 pr-2 border-b border-gray-200 dark:border-gray-700">
            {props.children}
        </div>
    </th>
)
