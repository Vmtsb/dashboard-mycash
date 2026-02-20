import { DollarSign } from 'lucide-react';
import { useFinance } from '../../contexts/FinanceContext';
import { useCountAnimation } from '../../hooks/useCountAnimation';

function formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
    });
}

export function BalanceCard() {
    const { calculateTotalBalance } = useFinance();
    const balance = calculateTotalBalance();
    const animatedBalance = useCountAnimation(balance);

    return (
        <div className="bg-white border border-[#e5e7eb] flex flex-1 flex-col gap-8 items-start justify-center min-h-0 min-w-0 p-6 relative rounded-[20px]">
            {/* Icon */}
            <div className="flex items-center justify-center w-6 h-6 text-neutral-1100">
                <DollarSign size={24} strokeWidth={1.8} />
            </div>

            {/* Text Group */}
            <div className="flex flex-col gap-1 items-start w-full">
                <p className="font-normal text-[18px] leading-7 tracking-[0.3px] text-neutral-600">
                    Saldo total
                </p>
                <p className="font-bold text-[28px] leading-9 text-[#2a89ef] whitespace-nowrap">
                    {formatCurrency(animatedBalance)}
                </p>
            </div>
        </div>
    );
}
