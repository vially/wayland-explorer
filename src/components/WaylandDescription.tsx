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

        {element.text && (
			<div className="my-3 text-base text-gray-700 dark:text-white">
				{splitText(element.text)}
			</div>
        )}
    </div>
)

function splitText(description: string) {
	const out = []
	let listItems = null
	let matches = description.split(/((?:^|\n+)(?:[*-] )|\n\n)/);
	let paragraphGap = undefined
	let isListItem = false
	for (let i = 0; i < matches.length; i++) {
		let chunk = matches[i]
		if (i % 2) {
			paragraphGap = chunk.startsWith('\n\n') ? 'mt-3' : undefined
			isListItem = chunk.endsWith(' ')
		} else {
			if (isListItem) {
				listItems ??= []
				listItems.push(<li key={i} className={paragraphGap}>{chunk}</li>)
			} else {
				if (listItems !== null) {
					out.push(<ul key={i} className="list-disc ml-6">{listItems}</ul>)
					listItems = null
				}
				out.push(<p key={i} className={paragraphGap}>{chunk}</p>)
			}
		}
	}
	return out
}
