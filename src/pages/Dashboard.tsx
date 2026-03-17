import { DashboardHeader } from '../components/layout/DashboardHeader';
import { SummaryCards } from '../components/cards/SummaryCards';
import { ExpensesByCategoryCarousel } from '../components/cards/ExpensesByCategoryCarousel';
import { FinancialFlowChart } from '../components/charts/FinancialFlowChart';
import { CardsAndAccounts } from '../components/cards/CardsAndAccounts';
import { UpcomingExpenses } from '../components/cards/UpcomingExpenses';
import { DetailedStatement } from '../components/tables/DetailedStatement';

export default function Dashboard() {
    return (
        <div className="flex flex-col gap-6 lg:gap-8 w-full">
            <DashboardHeader />

            <div className="flex-1 pb-8 flex flex-col gap-8">

                {/* Top Row */}
                <div className="flex flex-col xl:flex-row gap-8 w-full items-stretch">
                    {/* Left Panel */}
                    <div className="flex flex-col gap-8 w-full xl:w-[794px] shrink-0">
                        <ExpensesByCategoryCarousel />
                        <SummaryCards />
                    </div>
                    {/* Right Panel */}
                    <div className="flex w-full xl:flex-1">
                        <CardsAndAccounts />
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="flex flex-col xl:flex-row gap-8 w-full items-stretch">
                    {/* Left Panel */}
                    <div className="w-full xl:w-[794px] shrink-0">
                        <FinancialFlowChart />
                    </div>
                    {/* Right Panel */}
                    <div className="flex w-full xl:flex-1">
                        <UpcomingExpenses />
                    </div>
                </div>

                {/* Bottom Full Width table */}
                <div className="w-full mt-2">
                    <DetailedStatement />
                </div>
            </div>
        </div>
    );
}
