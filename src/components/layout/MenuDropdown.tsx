import { motion, AnimatePresence } from 'framer-motion'
import { NavLink, useLocation } from 'react-router-dom'
import { X, LogOut } from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

const imgMemberPai = "/assets/sidebar/member-pai.png";
const imgIconHome = "/assets/sidebar/icons/home.svg";
const imgIconCards = "/assets/sidebar/icons/credit-card.svg";

const navItems = [
    { icon: imgIconHome, label: 'Home', path: '/' },
    { icon: imgIconCards, label: 'Cartões', path: '/cards' },
]

interface MenuDropdownProps {
    isOpen: boolean
    onClose: () => void
}

export function MenuDropdown({ isOpen, onClose }: MenuDropdownProps) {
    const location = useLocation()

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay - semi-transparent dark overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-neutral-1100/60 z-[110] lg:hidden"
                    />

                    {/* Menu Content - slides from bottom as a sheet */}
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed bottom-0 left-0 w-full bg-white z-[120] rounded-t-20 shadow-[0_-8px_30px_rgb(0,0,0,0.12)] lg:hidden overflow-hidden"
                    >
                        <div className="p-16 flex flex-col gap-24">
                            {/* Menu Header with X button */}
                            <div className="flex items-center justify-between">
                                <span className="text-[14px] font-bold text-neutral-500 uppercase tracking-widest">Menu</span>
                                <button
                                    onClick={onClose}
                                    className="p-8 hover:bg-neutral-200 rounded-full transition-colors text-neutral-1100"
                                    aria-label="Close menu"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* User Profile Section */}
                            <div className="flex items-center gap-12 px-20">
                                <div className="w-24 h-24 rounded-full overflow-hidden border border-neutral-300 shrink-0">
                                    <img
                                        src={imgMemberPai}
                                        alt="Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex flex-col gap-[2px]">
                                    <p className="text-[16px] font-semibold text-neutral-1100 leading-[20px] tracking-[0.3px]">
                                        Lucas Marte
                                    </p>
                                    <p className="text-[14px] font-normal text-neutral-500 leading-[20px] tracking-[0.3px]">
                                        lucasmarte@gmail.com
                                    </p>
                                </div>
                            </div>

                            {/* Navigation Items */}
                            <nav className="flex flex-col gap-12 pt-12 border-t border-neutral-300">
                                {navItems.map((item) => {
                                    const isActive = location.pathname === item.path
                                    return (
                                        <NavLink
                                            key={item.path}
                                            to={item.path}
                                            onClick={onClose}
                                            className={cn(
                                                "flex items-center gap-16 px-20 py-16 rounded-full transition-all duration-200",
                                                isActive
                                                    ? "bg-brand-lime text-neutral-1100 shadow-sm"
                                                    : "text-neutral-1100 hover:bg-neutral-200"
                                            )}
                                        >
                                            <img
                                                src={item.icon}
                                                alt=""
                                                className="w-20 h-20 shrink-0"
                                            />
                                            <span className="text-[18px] font-semibold">{item.label}</span>
                                        </NavLink>
                                    )
                                })}
                            </nav>

                            {/* Logout Action */}
                            <div className="pt-12 border-t border-neutral-300">
                                <button className="flex items-center gap-16 w-full px-20 py-16 rounded-full text-red-600 hover:bg-red-50 transition-colors font-bold text-[18px]">
                                    <LogOut size={20} />
                                    <span>Sair</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
