import { Transition } from '@headlessui/react'
import { useBodyClass } from '../../common/hooks-utils'

export function OverlayBackground() {
    useBodyClass('overflow-hidden')

    return (
        <Transition.Child
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
        />
    )
}
