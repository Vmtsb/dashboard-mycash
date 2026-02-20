import { useFinance } from '../../contexts/FinanceContext';
import { Plus, Check } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cnStyle(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function MemberSelector() {
    const { familyMembers, filters, setMemberFilter } = useFinance();

    return (
        <div className="flex items-center gap-8">
            {/* Avatar Stack */}
            <div className="flex items-center gap-8">
                {familyMembers.map((member) => {
                    const isSelected = filters.selectedMember === member.id;
                    return (
                        <button
                            key={member.id}
                            onClick={() => setMemberFilter(isSelected ? null : member.id)}
                            className={cnStyle(
                                "relative flex w-[44px] h-[44px] aspect-square items-center justify-center rounded-full border-2 border-white overflow-hidden transition-all duration-300 hover:scale-110 hover:z-10 focus:outline-none focus:ring-2 focus:ring-brand-lime",
                                isSelected ? "ring-2 ring-neutral-1100 shadow-lg scale-110 z-10" : "z-0"
                            )}
                            title={member.name}
                        >
                            <img
                                src={member.avatarUrl}
                                alt={member.name}
                                className="w-full h-full object-cover"
                            />
                            {isSelected && (
                                <div className="absolute bottom-0 right-0 bg-brand-lime text-neutral-1100 rounded-full p-2 border-2 border-white">
                                    <Check size={10} strokeWidth={4} />
                                </div>
                            )}
                        </button>
                    );
                })}

                {/* Add Member Button */}
                <button
                    className="flex w-[44px] h-[44px] aspect-square items-center justify-center rounded-full border-2 border-white bg-neutral-200 text-neutral-500 hover:bg-neutral-300 hover:text-neutral-1100 transition-all hover:scale-110 z-0"
                    aria-label="Adicionar membro"
                >
                    <Plus size={16} />
                </button>
            </div>
        </div>
    );
}
