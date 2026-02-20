import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './components/layout/Sidebar'
import { HeaderMobile } from './components/layout/HeaderMobile'
import { MenuDropdown } from './components/layout/MenuDropdown'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

function App() {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <div className="min-h-screen w-full bg-neutral-200 flex flex-col lg:flex-row">
            {/* Desktop Navigation - Hidden below 1024px */}
            <div className="hidden lg:block">
                <Sidebar
                    isExpanded={isSidebarExpanded}
                    onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)}
                />
            </div>

            {/* Mobile Navigation - Hidden above 1024px */}
            <HeaderMobile onOpenMenu={() => setIsMenuOpen(true)} />
            <MenuDropdown isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

            {/* Main Content */}
            <main
                className={cn(
                    "transition-all duration-300 flex-1 w-full",
                    // Desktop fixed sidebar offset
                    isSidebarExpanded ? "lg:ml-[300px]" : "lg:ml-[80px]",
                    // Mobile fixed header offset
                    "pt-[72px] lg:pt-0"
                )}
            >
                <div className="p-16 md:p-32">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default App
