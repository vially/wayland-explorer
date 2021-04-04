import React, { useState } from 'react'
import { Header } from './Header'
import { Logo } from './Logo'
import { OutlineOverlay } from './overlays/OutlineOverlay'
import { SidebarOverlay } from './overlays/SidebarOverlay'
import { ScrollToTop } from './ScrollToTop'

export const MultiColumnLayout: React.FC<{
    protocolContentView: React.ReactNode
    outlineView: React.ReactNode
    sidebarView: React.ReactNode
}> = ({ protocolContentView, outlineView, sidebarView }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isOutlineOpen, setIsOutlineOpen] = useState(false)

    return (
        <div className="min-h-screen bg-white">
            <SidebarOverlay open={isSidebarOpen} setIsOpen={setIsSidebarOpen}>
                {sidebarView}
            </SidebarOverlay>
            <OutlineOverlay open={isOutlineOpen} setIsOpen={setIsOutlineOpen}>
                {outlineView}
            </OutlineOverlay>

            <Header
                setIsSidebarOpen={setIsSidebarOpen}
                setIsOutlineOpen={setIsOutlineOpen}
                showOutlineButton={!!outlineView}
            />

            <div className="mx-auto px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8 xl:pl-0">
                <div className="hidden xl:block xl:col-span-2">
                    <nav aria-label="Sidebar" className="h-screen sticky top-0">
                        {/* Sidebar component, swap this element with another sidebar if you like */}
                        <div className="flex flex-col h-full border-r border-gray-200 bg-gray-50">
                            <div className="flex-1 flex flex-col overflow-y-auto">
                                <div className="flex-shrink-0 px-4 my-5">
                                    <Logo />
                                </div>
                                {sidebarView}
                            </div>
                        </div>
                    </nav>
                </div>
                <main className="lg:col-span-9 xl:col-span-8">
                    {protocolContentView}
                </main>
                {outlineView && (
                    <aside className="hidden lg:block lg:col-span-3 xl:col-span-2">
                        <div className="sticky max-h-screen top-0 space-y-4 overflow-y-auto py-4">
                            <h2 className="text-lg font-medium text-gray-900">
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
