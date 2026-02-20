import { useState } from 'react';
import { SlidersHorizontal, X, Check } from 'lucide-react';
import { useFinance } from '../../contexts/FinanceContext';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cnStyle(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function FilterControls() {
    const [isOpen, setIsOpen] = useState(false);
    const { filters, setTypeFilter, familyMembers, setMemberFilter } = useFinance();

    const types = [
        { id: 'all', label: 'Todos' },
        { id: 'income', label: 'Receitas' },
        { id: 'expense', label: 'Despesas' },
    ] as const;

    return (
        <div className="relative">
            {/* Filter Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cnStyle(
                    "flex p-12 items-center gap-4 rounded-full transition-all border",
                    isOpen
                        ? "bg-neutral-1100 text-white border-neutral-1100"
                        : "bg-transparent text-neutral-1100 border-transparent hover:bg-neutral-0 hover:border-neutral-500"
                )}
                aria-label="Abrir filtros"
            >
                <SlidersHorizontal size={16} />
            </button>

            {/* Desktop Popover */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 mt-8 w-240 bg-white/70 backdrop-blur-md border border-white/20 rounded-20 p-20 shadow-xl z-[150] hidden lg:block"
                    >
                        <div className="flex flex-col gap-16">
                            <span className="text-[14px] font-bold text-neutral-500 uppercase tracking-widest">Tipo de Transação</span>
                            <div className="flex flex-col gap-8">
                                {types.map((type) => {
                                    const isSelected = filters.transactionType === type.id;
                                    return (
                                        <button
                                            key={type.id}
                                            onClick={() => setTypeFilter(type.id)}
                                            className={cnStyle(
                                                "flex items-center justify-between px-16 py-10 rounded-full text-[16px] font-semibold transition-all",
                                                isSelected
                                                    ? "bg-neutral-1100 text-white"
                                                    : "bg-transparent text-neutral-1100 hover:bg-neutral-100"
                                            )}
                                        >
                                            {type.label}
                                            {isSelected && <Check size={16} />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Swipe-up Modal (Slider) */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/40 z-[200] lg:hidden"
                        />
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed bottom-0 left-0 w-full bg-white rounded-t-32 z-[210] p-24 lg:hidden"
                        >
                            <div className="flex flex-col gap-32">
                                {/* Modal Header */}
                                <div className="flex items-center justify-between">
                                    <h3 className="text-[20px] font-bold text-neutral-1100">Filtros</h3>
                                    <button onClick={() => setIsOpen(false)} className="p-8 bg-neutral-100 rounded-full">
                                        <X size={20} />
                                    </button>
                                </div>

                                {/* Transaction Type Section */}
                                <div className="flex flex-col gap-16">
                                    <span className="text-[14px] font-bold text-neutral-500 uppercase tracking-widest">Tipo</span>
                                    <div className="grid grid-cols-3 gap-8">
                                        {types.map((type) => {
                                            const isSelected = filters.transactionType === type.id;
                                            return (
                                                <button
                                                    key={type.id}
                                                    onClick={() => setTypeFilter(type.id)}
                                                    className={cnStyle(
                                                        "py-12 rounded-xl text-[14px] font-bold transition-all border",
                                                        isSelected
                                                            ? "bg-neutral-1100 text-white border-neutral-1100"
                                                            : "bg-white text-neutral-1100 border-neutral-200"
                                                    )}
                                                >
                                                    {type.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Member Section (Mobile) */}
                                <div className="flex flex-col gap-16">
                                    <span className="text-[14px] font-bold text-neutral-500 uppercase tracking-widest">Membro</span>
                                    <div className="flex flex-wrap gap-12">
                                        <button
                                            onClick={() => setMemberFilter(null)}
                                            className={cnStyle(
                                                "px-16 py-10 rounded-full text-[14px] font-bold border transition-all",
                                                filters.selectedMember === null
                                                    ? "bg-neutral-1100 text-white border-neutral-1100"
                                                    : "bg-white text-neutral-1100 border-neutral-200"
                                            )}
                                        >
                                            Família
                                        </button>
                                        {familyMembers.map((member) => {
                                            const isSelected = filters.selectedMember === member.id;
                                            return (
                                                <button
                                                    key={member.id}
                                                    onClick={() => setMemberFilter(member.id)}
                                                    className={cnStyle(
                                                        "flex items-center gap-8 px-12 py-8 rounded-full text-[14px] font-bold border transition-all",
                                                        isSelected
                                                            ? "bg-neutral-1100 text-white border-neutral-1100"
                                                            : "bg-white text-neutral-1100 border-neutral-200"
                                                    )}
                                                >
                                                    <div className="w-24 h-24 rounded-full overflow-hidden">
                                                        <img src={member.avatarUrl} alt={member.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    {member.name.split(' ')[0]}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Apply Button */}
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-full h-56 bg-neutral-1100 text-white rounded-2xl font-bold text-[18px] mt-8"
                                >
                                    Aplicar Filtros
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
