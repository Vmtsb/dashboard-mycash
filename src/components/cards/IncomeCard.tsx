import { ArrowDownLeft } from 'lucide-react';
import { useFinance } from '../../contexts/FinanceContext';
import { useCountAnimation } from '../../hooks/useCountAnimation';

function formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
    });
}

export function IncomeCard() {
    const { calculateIncomeForPeriod } = useFinance();
    const income = calculateIncomeForPeriod();
    const animatedIncome = useCountAnimation(income);

    return (
        <div className="bg-white border border-[#e5e7eb] flex flex-1 flex-col gap-8 items-start justify-center min-h-0 min-w-0 p-6 relative rounded-[20px]">
            {/* Icon */}
            <div className="flex items-center justify-center w-6 h-6 text-green-500">
                <ArrowDownLeft size={24} strokeWidth={2} />
            </div>

            {/* Text Group */}
            <div className="flex flex-col gap-1 items-start w-full">
                <p className="font-normal text-[18px] leading-7 tracking-[0.3px] text-[#080b12]">
                    Receitas
                </p>
                <p className="font-bold text-[28px] leading-9 text-[#080b12] whitespace-nowrap">
                    {formatCurrency(animatedIncome)}
                </p>
            </div>
        </div>
    );
}
