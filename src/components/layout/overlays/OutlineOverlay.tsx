import { Transition } from '@headlessui/react'
import React from 'react'
import { OverlayBackground } from './OverlayBackground'

export const OutlineOverlay: React.FC<{
    open: boolean
    setIsOpen: (open: boolean) => void
    children?: React.ReactNode
}> = ({ open, setIsOpen, children }) => (
    <Transition show={open}>
        <section
            className="fixed inset-0 overflow-hidden z-40"
            aria-labelledby="slide-over-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="absolute inset-0 overflow-hidden">
                <OverlayBackground />

                <div className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
                    <Transition.Child
                        enter="transform transition ease-in-out duration-300"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transform transition ease-in-out duration-300"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                        className="relative h-screen w-screen max-w-sm"
                    >
                        <Transition.Child
                            enter="ease-in-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in-out duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            className="absolute top-0 left-0 -ml-12 pt-2"
                        >
                            <button
                                className="mr-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                onClick={() => setIsOpen(false)}
                            >
                                <span className="sr-only">Close panel</span>
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
                        <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-auto dark:bg-gray-900">
                            <div className="px-4 sm:px-6">
                                <h2
                                    className="text-lg font-medium text-gray-900 dark:text-gray-100"
                                    id="slide-over-title"
                                >
                                    Outline
                                </h2>
                            </div>
                            <div
                                className="mt-6 relative flex-1 px-4 sm:px-6"
                                onClick={() => setIsOpen(false)}
                            >
                                {children}
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </div>
        </section>
    </Transition>
)
