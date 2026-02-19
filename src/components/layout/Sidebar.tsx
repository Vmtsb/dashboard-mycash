import { NavLink } from 'react-router-dom'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Logo } from '../ui/Logo'
import { ToggleIcon } from '../ui/ToggleIcon'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// Local assets
const imgMemberPai = "/assets/sidebar/member-pai.png";
const imgIconHome = "/assets/sidebar/icons/home.svg";
const imgIconCards = "/assets/sidebar/icons/credit-card.svg";

interface SidebarProps {
    isExpanded: boolean
    onToggle: () => void
}

const navItems = [
    { icon: imgIconHome, label: 'Home', path: '/' },
    { icon: imgIconCards, label: 'Cartões', path: '/cards' },
]

export function Sidebar({ isExpanded, onToggle }: SidebarProps) {
    return (
        <aside
            className={cn(
                "fixed left-0 top-0 h-screen bg-white transition-all duration-300 z-50 flex flex-col py-32",
                isExpanded
                    ? "w-[300px] items-start border-r border-neutral-300 px-32"
                    : "w-[80px] items-center px-0"
            )}
        >
            {/* Header Container (Node 30:1503 / 30:1519) */}
            <div className={cn(
                "flex flex-col items-start p-0 relative transition-all duration-300",
                isExpanded ? "gap-56 w-full" : "gap-56"
            )}>
                {/* Logo (Node 30:1472 / 30:1550) */}
                <Logo variant={isExpanded ? "Default" : "small"} />

                {/* Navigation Menu (Node 30:1502 / 30:1521) */}
                <nav className={cn(
                    "flex flex-col items-start p-0 relative transition-all duration-300",
                    isExpanded ? "gap-8 w-full" : "gap-0"
                )}>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => cn(
                                "flex items-center rounded-full transition-all relative group",
                                isExpanded ? "w-full gap-8 px-16 py-12 h-[48px]" : "px-16 py-12",
                                isActive
                                    ? "bg-brand-lime text-neutral-1100 shadow-sm"
                                    : "text-neutral-1100 hover:bg-neutral-200"
                            )}
                        >
                            <img src={item.icon} alt={item.label} className="w-16 h-16 shrink-0" />
                            {isExpanded && (
                                <span className="text-[18px] font-semibold tracking-[0.3px] leading-[24px] font-sans">
                                    {item.label}
                                </span>
                            )}

                            {!isExpanded && (
                                <div className="absolute left-full ml-12 px-8 py-4 bg-neutral-1100 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                                    {item.label}
                                </div>
                            )}
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* Profile Section (Node 30:1509 / 30:1524) */}
            <div className={cn(
                "mt-auto flex flex-col items-start p-0 relative transition-all duration-300",
                isExpanded ? "gap-12 w-full" : "gap-0 items-center"
            )}>
                {/* Avatar (Node 30:1487) */}
                <div className="w-24 h-24 relative overflow-hidden bg-neutral-300 flex-shrink-0">
                    <img
                        src={imgMemberPai}
                        alt="Avatar"
                        className="absolute inset-0 block max-w-none"
                        width="24"
                        height="24"
                    />
                </div>

                {/* User Data (Node 30:1568) */}
                {isExpanded && (
                    <div className="flex flex-col gap-[7px] items-start relative w-full overflow-hidden">
                        <p className="text-[16px] font-semibold text-neutral-1100 leading-[20px] tracking-[0.3px] font-sans truncate w-full">
                            Lucas Marte
                        </p>
                        <p className="text-[14px] font-normal text-neutral-1100 leading-[20px] tracking-[0.3px] font-sans truncate w-full">
                            lucasmarte@gmail.com
                        </p>
                    </div>
                )}
            </div>

            {/* Toggle Button (Node 33:1639 / 33:1646) */}
            <button
                onClick={onToggle}
                className={cn(
                    "absolute bg-white flex items-center justify-center rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition-all z-50 w-24 h-24 p-0",
                    "right-[-12px] top-[35px]"
                )}
                aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
            >
                <div className={cn(
                    "transition-transform duration-300 flex items-center justify-center",
                    isExpanded ? "rotate-0" : "rotate-180" // rotate-0 points left (provided SVG), rotate-180 points right
                )}>
                    <ToggleIcon />
                </div>
            </button>
        </aside>
    )
}
