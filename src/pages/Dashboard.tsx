import { DashboardHeader } from '../components/layout/DashboardHeader';
import { useFinance } from '../contexts/FinanceContext';

export default function Dashboard() {
    const { getFilteredTransactions } = useFinance();
    const filteredTransactions = getFilteredTransactions();

    return (
        <div className="flex flex-col gap-24 lg:gap-32 w-full">
            <DashboardHeader />

            <div className="flex-1 pb-32">
                {/* Content will be implemented in future prompts */}
                <div className="bg-neutral-50 border-2 border-dashed border-neutral-200 rounded-32 p-48 flex flex-col items-center justify-center text-center">
                    <h2 className="text-[24px] font-bold text-neutral-1100 mb-8">Conteúdo do Dashboard</h2>
                    <p className="text-neutral-500 max-w-[400px]">
                        Os widgets de KPIs, gráficos e tabelas serão implementados na próxima etapa.
                        O header acima já está funcional e filtrando o estado global.
                    </p>
                    <div className="mt-24 text-[14px] text-neutral-400">
                        {filteredTransactions.length} transações encontradas com os filtros atuais.
                    </div>
                </div>
            </div>
        </div>
    );
}
