import { NavLink } from 'react-router-dom'
import {
    LayoutDashboard,
    CreditCard,
    ChevronLeft
} from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

interface SidebarProps {
    isExpanded: boolean
    onToggle: () => void
}

const navItems = [
    { icon: LayoutDashboard, label: 'Home', path: '/' },
    { icon: CreditCard, label: 'Cartões', path: '/cards' },
]

export function Sidebar({ isExpanded, onToggle }: SidebarProps) {
    return (
        <aside
            className={cn(
                "fixed left-0 top-0 h-screen bg-white border-r border-neutral-300 transition-all duration-300 z-50 flex flex-col",
                isExpanded ? "w-[300px]" : "w-[80px]",
                "p-32" // Figma p-32
            )}
        >
            {/* Header / Logo (Node 30:1503) */}
            <div className={cn(
                "flex flex-col gap-56 items-start w-full transition-all duration-300",
                !isExpanded && "items-center"
            )}>
                {/* LOGO (Node 30:1472) */}
                <div className="flex items-center gap-12">
                    <div className="w-[32px] h-[32px] bg-brand-lime rounded-8 flex items-center justify-center font-bold text-neutral-1100">
                        M
                    </div>
                    {isExpanded && (
                        <span className="text-[20px] font-bold text-neutral-1100 tracking-[0.3px] font-sans">
                            mycash<span className="underline decoration-2 underline-offset-4">plus</span>
                        </span>
                    )}
                </div>

                {/* Navigation Menu (Node 30:1502) */}
                <nav className="flex flex-col gap-8 w-full p-0">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => cn(
                                "flex items-center gap-8 h-[48px] px-16 py-12 rounded-100 transition-all relative group",
                                isActive
                                    ? "bg-brand-lime text-neutral-1100" // Figma Active: bg-[#d7ff00]
                                    : "text-neutral-1100 hover:bg-neutral-200"
                            )}
                        >
                            <item.icon
                                size={16} // Figma icon size 16px
                                strokeWidth={2.5}
                            />
                            {isExpanded && (
                                <span className="text-[18px] font-semibold tracking-[0.3px] leading-[24px]">
                                    {item.label}
                                </span>
                            )}

                            {/* Tooltip for collapsed state */}
                            {!isExpanded && (
                                <div className="absolute left-full ml-12 px-8 py-4 bg-neutral-1100 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                                    {item.label}
                                </div>
                            )}
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* Bottom Section - User Information (Node 30:1509) */}
            <div className="mt-auto flex flex-col gap-12 items-start w-full">
                {/* Avatar (Node 30:1487) */}
                <div className="w-[24px] h-[24px] rounded-full overflow-hidden bg-neutral-300">
                    <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas"
                        alt="Avatar"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* User Data (Node 30:1568) */}
                {isExpanded && (
                    <div className="flex flex-col gap-[7px] w-full">
                        <p className="text-[16px] font-semibold text-neutral-1100 leading-[20px] tracking-[0.3px]">
                            Lucas Marte
                        </p>
                        <p className="text-[14px] font-regular text-neutral-1100 leading-[20px] tracking-[0.3px]">
                            lucasmarte@gmail.com
                        </p>
                    </div>
                )}
            </div>

            {/* Toggle Button (Node 33:1639) */}
            <button
                onClick={onToggle}
                className="absolute -right-[13px] top-[34px] w-[26px] h-[26px] bg-white border border-neutral-300 rounded-100 flex items-center justify-center shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] hover:bg-neutral-200 transition-colors z-[60]"
            >
                <div className={cn("transition-transform duration-300", !isExpanded && "rotate-180")}>
                    <ChevronLeft size={16} className="text-neutral-1100" />
                </div>
            </button>
        </aside>
    )
}
