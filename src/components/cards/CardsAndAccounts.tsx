import { CreditCard, Plus, ArrowRight } from 'lucide-react';

const mockAccounts = [
    {
        id: '1',
        brand: 'Nubank',
        balance: 120,
        dueDate: '10',
        cardNumber: '**** 5897',
        bgColor: '#7C3AED', // purple
        initial: 'N',
    },
    {
        id: '2',
        brand: 'Inter',
        balance: 2300,
        dueDate: '21',
        cardNumber: '**** 5897',
        bgColor: '#EA580C', // orange
        initial: 'I',
    },
    {
        id: '3',
        brand: 'Picpay',
        balance: 17000,
        dueDate: '12',
        cardNumber: '**** 5897',
        bgColor: '#16A34A', // green
        initial: 'P',
    }
];

function formatCurrency(value: number) {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
    });
}

export function CardsAndAccounts() {
    return (
        <div className="bg-white border border-[#e5e7eb] rounded-[20px] p-32 flex flex-col gap-32 w-full h-full">
            {/* Header */}
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-[12px]">
                    <CreditCard size={20} strokeWidth={1.8} className="text-neutral-1100" />
                    <h2 className="text-[20px] font-bold text-neutral-1100 tracking-[0.3px]">Cards & contas</h2>
                </div>

                <div className="flex items-center gap-[8px]">
                    <button
                        className="w-[32px] h-[32px] flex items-center justify-center rounded-full border border-[#e5e7eb] hover:bg-neutral-200 transition-colors"
                        aria-label="Adicionar conta"
                    >
                        <Plus size={16} strokeWidth={2} className="text-neutral-1100" />
                    </button>
                    <button
                        className="w-[32px] h-[32px] flex items-center justify-center rounded-full border border-[#e5e7eb] hover:bg-neutral-200 transition-colors"
                        aria-label="Ver todas as contas"
                    >
                        <ArrowRight size={16} strokeWidth={2} className="text-neutral-1100" />
                    </button>
                </div>
            </div>

            {/* List – no dividers, spaced with gap */}
            <div className="flex flex-col gap-32 w-full">
                {mockAccounts.map((account) => (
                    <div key={account.id} className="flex flex-col gap-[8px] w-full">
                        {/* Brand row */}
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-[8px]">
                                <div
                                    className="w-[20px] h-[20px] rounded-[4px] flex items-center justify-center text-[10px] font-bold text-white"
                                    style={{ backgroundColor: account.bgColor }}
                                >
                                    {account.initial}
                                </div>
                                <span className="text-[14px] font-normal text-neutral-1100">{account.brand}</span>
                            </div>
                            <span className="text-[12px] font-bold text-neutral-1100">{account.cardNumber}</span>
                        </div>

                        {/* Value and due date */}
                        <div className="flex flex-col gap-[4px]">
                            <p className="text-[24px] font-bold text-neutral-1100 leading-tight">
                                {formatCurrency(account.balance)}
                            </p>
                            <p className="text-[14px] font-bold text-neutral-1100">
                                Vence dia {account.dueDate}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
