import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './components/layout/Sidebar'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

function App() {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true)

    return (
        <div className="min-h-screen w-full bg-neutral-200 flex">
            {/* Sidebar Desktop */}
            <Sidebar
                isExpanded={isSidebarExpanded}
                onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)}
            />

            {/* Main Content */}
            <main
                className={cn(
                    "transition-all duration-300 flex-1",
                    isSidebarExpanded ? "ml-[280px]" : "ml-[80px]"
                )}
            >
                <div className="max-w-[1400px] mx-auto p-32">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default App
