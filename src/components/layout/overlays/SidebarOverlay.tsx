import { Transition } from '@headlessui/react'
import React from 'react'
import { Logo } from '../Logo'
import { OverlayBackground } from './OverlayBackground'

export const SidebarOverlay: React.FC<{
    open: boolean
    setIsOpen: (open: boolean) => void
}> = ({ open, setIsOpen, children }) => (
    <Transition show={open}>
        {/* Off-canvas menu for mobile, show/hide based on off-canvas menu state. */}
        <div
            className="fixed inset-0 flex z-40"
            role="dialog"
            aria-modal="true"
        >
            <OverlayBackground />

            {/* Off-canvas menu, show/hide based on off-canvas menu state. */}
            <Transition.Child
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
                className="relative max-w-xs w-full"
            >
                {/* Close button, show/hide based on off-canvas menu state. */}
                <Transition.Child
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    className="absolute top-0 right-0 -mr-12 pt-2"
                >
                    <button
                        type="button"
                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setIsOpen(false)}
                    >
                        <span className="sr-only">Close sidebar</span>
                        {/* Heroicon name: outline/x */}
                        <svg
                            className="h-6 w-6 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </Transition.Child>
                <div className="h-full flex flex-col shadow-xl bg-gray-50 dark:bg-gray-900">
                    <div className="px-4 my-4">
                        <Logo />
                    </div>

                    <nav className="flex-1 overflow-y-auto">
                        {/* Sidebar component, swap this element with another sidebar if you like */}
                        <div
                            className="flex flex-col border-r border-gray-200 dark:border-gray-900"
                            onClick={() => setIsOpen(false)}
                        >
                            {children}
                        </div>
                    </nav>
                </div>
            </Transition.Child>

            <div className="shrink-0 w-14" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
        </div>
    </Transition>
)
