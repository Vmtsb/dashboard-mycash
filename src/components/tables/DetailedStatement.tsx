import { Search, ChevronLeft, ChevronRight, ArrowUpRight, ArrowDownLeft, ChevronDown } from 'lucide-react';

const mockTransactions = [
    {
        id: '1',
        memberInitials: 'V',
        memberColor: '#F97316',
        date: '17/01/2026',
        description: 'Conta de água',
        type: 'expense',
        category: 'Manutenção',
        account: 'Conta corrente',
        installments: '-',
        value: 100
    },
    {
        id: '2',
        memberInitials: 'A',
        memberColor: '#8B5CF6',
        date: '17/01/2026',
        description: 'Conta de Luz',
        type: 'expense',
        category: 'Manutenção',
        account: 'Conta corrente',
        installments: '-',
        value: 150
    },
    {
        id: '3',
        memberInitials: 'A',
        memberColor: '#8B5CF6',
        date: '17/01/2026',
        description: 'Passeio no parque',
        type: 'expense',
        category: 'Lazer',
        account: 'Cartão XP',
        installments: '1/1',
        value: 750
    }
];

function formatCurrency(value: number) {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
    });
}

export function DetailedStatement() {
    return (
        <div className="bg-white border border-[#e5e7eb] rounded-[20px] p-32 flex flex-col gap-32 w-full">
            {/* Header controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4">
                <div className="flex items-center gap-3">
                    {/* SVG Icon matching the Figma "Extrato Detalhado" is approximated with a custom visual */}
                    <div className="w-6 h-6 flex items-center justify-center text-neutral-1100">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                    </div>
                    <h2 className="text-[18px] sm:text-[20px] font-bold text-neutral-1100 tracking-[0.3px]">Extrato detalhado</h2>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 border border-neutral-300 rounded-[100px] px-4 py-2 bg-white">
                        <Search size={16} className="text-neutral-500" />
                        <input 
                            type="text" 
                            placeholder="Buscar lançamentos" 
                            className="bg-transparent text-[14px] outline-none w-[160px]"
                        />
                    </div>
                    
                    <button className="flex items-center gap-2 text-[14px] font-bold text-neutral-1100">
                        Despesas <ChevronDown size={16} />
                    </button>
                </div>
            </div>

            {/* Table Area (Horizontal Scroll on Mobile) */}
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left min-w-[800px]">
                    <thead>
                        <tr className="text-[14px] font-bold text-neutral-1100 border-b border-neutral-200">
                            <th className="pb-4 pt-2 font-bold w-[80px]">Membro</th>
                            <th className="pb-4 pt-2 font-bold">Datas</th>
                            <th className="pb-4 pt-2 font-bold min-w-[150px]">Descrição</th>
                            <th className="pb-4 pt-2 font-bold">Categorias</th>
                            <th className="pb-4 pt-2 font-bold">Conta/cartão</th>
                            <th className="pb-4 pt-2 font-bold">Parcelas</th>
                            <th className="pb-4 pt-2 font-bold">Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockTransactions.map((tx) => (
                            <tr key={tx.id} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50">
                                <td className="py-4">
                                    <div 
                                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[12px] font-bold"
                                        style={{ backgroundColor: tx.memberColor }}
                                    >
                                        {tx.memberInitials}
                                    </div>
                                </td>
                                <td className="py-4 text-[14px] text-neutral-1100">{tx.date}</td>
                                <td className="py-4 flex items-center gap-2">
                                    {tx.type === 'expense' ? (
                                        <ArrowUpRight size={14} className="text-red-500" />
                                    ) : (
                                        <ArrowDownLeft size={14} className="text-green-500" />
                                    )}
                                    <span className="text-[14px] text-neutral-600 font-medium truncate">{tx.description}</span>
                                </td>
                                <td className="py-4 text-[14px] text-neutral-600 font-medium">{tx.category}</td>
                                <td className="py-4 text-[14px] text-neutral-600 font-medium">{tx.account}</td>
                                <td className="py-4 text-[14px] text-neutral-1100">{tx.installments}</td>
                                <td className="py-4 text-[14px] text-neutral-1100">{formatCurrency(tx.value)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination footer */}
            <div className="flex items-center justify-between w-full pt-4 font-bold text-[14px] text-neutral-1100">
                <span>Mostrando 1 a 3 de 17</span>
                <div className="flex items-center gap-4">
                    <button className="text-neutral-500 hover:text-neutral-1100 transition-colors">
                        <ChevronLeft size={18} />
                    </button>
                    <div className="flex items-center gap-3">
                        <button className="w-6 h-6 flex items-center justify-center rounded-full bg-neutral-200">1</button>
                        <button className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-neutral-100">2</button>
                        <button className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-neutral-100">3</button>
                        <button className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-neutral-100">4</button>
                        <button className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-neutral-100">5</button>
                    </div>
                    <button className="text-neutral-1100 hover:text-neutral-500 transition-colors">
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
