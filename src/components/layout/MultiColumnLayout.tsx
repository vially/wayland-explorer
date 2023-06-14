import React, { useState } from 'react'
import { WaylandProtocolLinks } from '../sidebar-navigation/WaylandProtocolLinks'
import { Footer } from './Footer'
import { Header } from './Header'
import { Logo } from './Logo'
import { OutlineOverlay } from './overlays/OutlineOverlay'
import { SidebarOverlay } from './overlays/SidebarOverlay'
import { ScrollToTop } from './ScrollToTop'

export const MultiColumnLayout: React.FC<{
    hideSidebar?: boolean
    outlineView?: React.ReactNode
    children?: React.ReactNode
}> = ({ outlineView, hideSidebar, children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isOutlineOpen, setIsOutlineOpen] = useState(false)

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-white">
            <SidebarOverlay open={isSidebarOpen} setIsOpen={setIsSidebarOpen}>
                <WaylandProtocolLinks />
            </SidebarOverlay>
            <OutlineOverlay open={isOutlineOpen} setIsOpen={setIsOutlineOpen}>
                {outlineView}
            </OutlineOverlay>

            <Header
                setIsSidebarOpen={setIsSidebarOpen}
                setIsOutlineOpen={setIsOutlineOpen}
                showOutlineButton={!!outlineView}
            />

            <div
                className={`mx-auto px-4 pt-16 sm:px-6 lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8 xl:pl-0 xl:pt-0 ${
                    hideSidebar ? 'xl:pr-0' : ''
                }`}
            >
                <div
                    className={`hidden ${
                        !hideSidebar ? 'xl:block xl:col-span-2' : ''
                    }`}
                >
                    <nav aria-label="Sidebar" className="h-screen sticky top-0">
                        {/* Sidebar component, swap this element with another sidebar if you like */}
                        <div className="flex flex-col h-full border-r border-gray-200 bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
                            <div className="flex-1 flex flex-col overflow-y-auto">
                                <div className="shrink-0 px-4 my-5">
                                    <Logo />
                                </div>
                                <WaylandProtocolLinks />
                            </div>
                        </div>
                    </nav>
                </div>
                <main
                    className={
                        hideSidebar
                            ? 'col-span-12'
                            : outlineView
                            ? 'lg:col-span-9 xl:col-span-8'
                            : 'lg:col-span-12 xl:col-span-10'
                    }
                >
                    {children}
                    <Footer />
                </main>
                {outlineView && (
                    <aside className="hidden lg:block lg:col-span-3 xl:col-span-2">
                        <div className="sticky max-h-screen top-0 space-y-4 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                Outline
                            </h2>
                            {outlineView}
                        </div>
                    </aside>
                )}
            </div>

            <ScrollToTop />
        </div>
    )
}
