import { WaylandElementProps, WaylandProtocolModel } from '../common'
import { WaylandInterfaceOutline } from './WaylandInterfaceOutline'

export const WaylandProtocolOutline: React.FC<
    WaylandElementProps<WaylandProtocolModel>
> = ({ element }) => (
    <div className="flex flex-col space-y-4">
        {element.interfaces.map((childElement, index) => (
            <WaylandInterfaceOutline key={index} element={childElement} />
        ))}
        {element.copyright && (
            <div className="text-gray-500">
                <a
                    href={`#copyright`}
                    title="Copyright"
                    className="flex items-center"
                >
                    <span className={`codicon codicon-law mr-1`}></span>
                    <span className="truncate">copyright</span>
                </a>
            </div>
        )}
    </div>
)
