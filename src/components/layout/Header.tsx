import React from 'react'
import { Logo } from './Logo'

export const Header: React.FC<{
    showOutlineButton: boolean
    setIsSidebarOpen: (open: boolean) => void
    setIsOutlineOpen: (open: boolean) => void
}> = ({ setIsSidebarOpen, setIsOutlineOpen, showOutlineButton }) => (
    <header className="xl:hidden w-full">
        <div className="relative z-10 flex-shrink-0 h-16 bg-gray-50 border-b border-gray-200 shadow-sm flex dark:bg-gray-900 dark:border-gray-700">
            <button
                className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:border-gray-700"
                onClick={() => setIsSidebarOpen(true)}
                title="Open sidebar"
            >
                <span className="sr-only">Open sidebar</span>
                {/* Heroicon name: outline/menu-alt=""-2 */}
                <svg
                    className="h-6 w-6"
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
                        d="M4 6h16M4 12h16M4 18h7"
                    />
                </svg>
            </button>
            <div className="flex-1 flex justify-between px-4 sm:px-6">
                <Logo />
            </div>

            {showOutlineButton && (
                <button
                    className="lg:hidden border-l border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:border-gray-700"
                    onClick={() => setIsOutlineOpen(true)}
                    title="Open outline"
                >
                    <span className="sr-only">Open outline</span>
                    {/* Heroicon name: outline/menu-alt-3 */}
                    <svg
                        className="h-6 w-6"
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
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>
            )}
        </div>
    </header>
)
