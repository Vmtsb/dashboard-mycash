import { DashboardHeader } from '../components/layout/DashboardHeader';
import { SummaryCards } from '../components/cards/SummaryCards';
import { ExpensesByCategoryCarousel } from '../components/cards/ExpensesByCategoryCarousel';
import { FinancialFlowChart } from '../components/charts/FinancialFlowChart';

export default function Dashboard() {
    return (
        <div className="flex flex-col gap-6 lg:gap-8 w-full">
            <DashboardHeader />

            <div className="flex-1 pb-8 flex flex-col gap-6">
                <ExpensesByCategoryCarousel />
                <SummaryCards />
                
                <div className="w-full mt-2">
                    <FinancialFlowChart />
                </div>

                {/* Future widgets: charts, tables, etc. */}
            </div>
        </div>
    );
}
