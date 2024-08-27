import { WaylandDescriptionModel, WaylandElementProps } from './common'

export const WaylandDescription: React.FC<
    WaylandElementProps<WaylandDescriptionModel>
> = ({ element }) => (
    <div>
        {element.summary && (
            <div className="my-3 capitalize font-semibold text-gray-700 dark:text-white">
                {element.summary}
            </div>
        )}

        {element.text?.split('\n\n').map((text, index) => (
            <p
                key={index}
                className="my-3 text-base text-gray-700 dark:text-white"
            >
                {text}
            </p>
        ))}
    </div>
)
