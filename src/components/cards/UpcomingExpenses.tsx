import { Plus } from 'lucide-react';

const mockExpenses = [
    {
        id: '1',
        title: 'Conta de Luz',
        dueDate: '21/01',
        source: 'Crédito Nubank',
        cardNumber: '**** 5897',
        value: 154,
    },
    {
        id: '2',
        title: 'Conta de Luz',
        dueDate: '21/01',
        source: 'Crédito Nubank',
        cardNumber: '**** 5897',
        value: 154,
    },
    {
        id: '3',
        title: 'Conta de Luz',
        dueDate: '21/01',
        source: 'Crédito Nubank',
        cardNumber: '**** 5897',
        value: 154,
    },
    {
        id: '4',
        title: 'Conta de Luz',
        dueDate: '21/01',
        source: 'Crédito Nubank',
        cardNumber: '**** 5897',
        value: 154,
    },
    {
        id: '5',
        title: 'Conta de Luz',
        dueDate: '21/01',
        source: 'Crédito Nubank',
        cardNumber: '**** 5897',
        value: 154,
    }
];

function formatCurrency(value: number) {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
    });
}

// Green check icon matching the Figma design
function CheckIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="12" fill="#F0FDF4" />
            <path d="M7.5 12L10.5 15L16.5 9" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function UpcomingExpenses() {
    return (
        <div className="bg-white border border-[#e5e7eb] rounded-[20px] p-32 flex flex-col gap-32 w-full h-full">
            {/* Header */}
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-[12px]">
                    {/* Envelope/bill icon using SVG matching Figma */}
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-neutral-1100">
                        <rect x="1.5" y="3.5" width="17" height="13" rx="2" stroke="#080B12" strokeWidth="1.5" />
                        <path d="M1.5 7.5H18.5" stroke="#080B12" strokeWidth="1.5" />
                        <path d="M6 3.5V7.5" stroke="#080B12" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <h2 className="text-[20px] font-bold text-neutral-1100 tracking-[0.3px]">Próximas despesas</h2>
                </div>

                <button
                    className="w-[32px] h-[32px] flex items-center justify-center rounded-full border border-[#e5e7eb] hover:bg-neutral-200 transition-colors"
                    aria-label="Adicionar despesa"
                >
                    <Plus size={16} strokeWidth={2} className="text-neutral-1100" />
                </button>
            </div>

            {/* List – no dividers, gap-based spacing */}
            <div className="flex flex-col gap-24 w-full">
                {mockExpenses.map((expense) => (
                    <div key={expense.id} className="flex items-center justify-between w-full">
                        {/* Info */}
                        <div className="flex flex-col gap-[2px]">
                            <p className="text-[16px] font-bold text-neutral-1100">{expense.title}</p>
                            <p className="text-[14px] font-bold text-neutral-1100">Vence dia {expense.dueDate}</p>
                            <p className="text-[12px] font-normal text-[#6B7280]">{expense.source} {expense.cardNumber}</p>
                        </div>

                        {/* Value + check */}
                        <div className="flex items-center gap-[16px] shrink-0">
                            <span className="text-[16px] font-bold text-neutral-1100">{formatCurrency(expense.value)}</span>
                            <CheckIcon />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
