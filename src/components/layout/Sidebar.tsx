import { NavLink } from 'react-router-dom'
import {
    LayoutDashboard,
    Target,
    CreditCard,
    ArrowLeftRight,
    User,
    LogOut,
    ChevronLeft,
    ChevronRight
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
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Target, label: 'Objetivos', path: '/goals' },
    { icon: CreditCard, label: 'Cartões', path: '/cards' },
    { icon: ArrowLeftRight, label: 'Transações', path: '/transactions' },
    { icon: User, label: 'Perfil', path: '/profile' },
]

export function Sidebar({ isExpanded, onToggle }: SidebarProps) {
    return (
        <aside
            className={cn(
                "fixed left-0 top-0 h-screen bg-white border-r border-neutral-300 transition-all duration-300 z-50 flex flex-col",
                isExpanded ? "w-[280px]" : "w-[80px]"
            )}
        >
            {/* Header / Logo */}
            <div className="h-[80px] flex items-center px-24">
                <div className="flex items-center gap-12">
                    <div className="w-32 h-32 bg-brand-lime rounded-8 flex items-center justify-center font-bold text-neutral-1100">
                        M
                    </div>
                    {isExpanded && (
                        <span className="text-20 font-bold text-neutral-1100 tracking-tight">
                            mycash<span className="text-brand-lime">+</span>
                        </span>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-12 py-16 space-y-8">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => cn(
                            "flex items-center gap-12 p-12 rounded-12 transition-colors relative group",
                            isActive
                                ? "bg-neutral-1100 text-white"
                                : "text-neutral-500 hover:bg-neutral-200"
                        )}
                    >
                        {({ isActive }) => (
                            <>
                                <item.icon
                                    size={24}
                                    className={cn(isActive && "text-brand-lime")}
                                />
                                {isExpanded && (
                                    <span className="font-semibold">{item.label}</span>
                                )}

                                {/* Tooltip for collapsed state */}
                                {!isExpanded && (
                                    <div className="absolute left-full ml-12 px-8 py-4 bg-neutral-1100 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                                        {item.label}
                                    </div>
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Bottom Section - User Profile */}
            <div className="p-12 border-t border-neutral-300">
                <div className={cn(
                    "flex items-center p-12 rounded-12 bg-neutral-200",
                    !isExpanded && "justify-center"
                )}>
                    <div className="w-40 h-40 rounded-full bg-neutral-300 overflow-hidden flex-shrink-0">
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas"
                            alt="User"
                        />
                    </div>
                    {isExpanded && (
                        <div className="ml-12 overflow-hidden">
                            <p className="text-sm font-bold text-neutral-1100 truncate">Lucas Marte</p>
                            <p className="text-xs text-neutral-500 truncate">lucasmarte@gmail.com</p>
                        </div>
                    )}
                </div>

                <button className={cn(
                    "w-full flex items-center gap-12 p-12 mt-8 text-neutral-500 hover:text-red-500 hover:bg-red-50 rounded-12 transition-colors",
                    !isExpanded && "justify-center"
                )}>
                    <LogOut size={24} />
                    {isExpanded && <span className="font-semibold">Sair</span>}
                </button>
            </div>

            {/* Toggle Button */}
            <button
                onClick={onToggle}
                className="absolute -right-12 top-32 w-24 h-24 bg-white border border-neutral-300 rounded-full flex items-center justify-center shadow-sm hover:bg-neutral-200 transition-colors"
            >
                {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
        </aside>
    )
}
