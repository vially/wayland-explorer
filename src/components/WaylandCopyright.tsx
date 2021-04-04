import { WaylandCopyrightModel, WaylandElementProps } from './common'

export const WaylandCopyright: React.FC<
    WaylandElementProps<WaylandCopyrightModel>
> = ({ element }) => (
    <div className="mb-10">
        <h4 id={`copyright`} className="flex items-center text-xl mt-6">
            <a href="#copyright">
                <span className="codicon codicon-law mr-1"></span>
                Copyright
            </a>
        </h4>
        {element.text?.split('\n\n').map((text, index) => (
            <p key={index} className="my-3 text-base text-gray-500">
                {text}
            </p>
        ))}
    </div>
)
