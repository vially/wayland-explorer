import React from 'react'
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

        {element.text?.split('\n\n').map((text, index) => {
            const { block, list } = parseList(text)
            return (
                <p
                    key={index}
                    className="my-3 text-base text-gray-700 dark:text-white"
                >
                    {block}
                    {list && (
                        <ul className="list-disc list-inside">
                            {list.map((text) => (
                                <li>{text}</li>
                            ))}
                        </ul>
                    )}
                </p>
            )
        })}
    </div>
)

function parseList(block: string): { block: string; list?: string[] } {
    const listStart = block.startsWith("* ") ? 0 : block.indexOf('\n*')
    if (listStart === -1) {
        return { block };
    }
    const list = block.slice(listStart + 2).split('\n* ');
    console.log({ block: block.slice(0, listStart) });
    return { block: block.slice(0, listStart), list }
}
