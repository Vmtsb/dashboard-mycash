import { BalanceCard } from './BalanceCard';
import { IncomeCard } from './IncomeCard';
import { ExpenseCard } from './ExpenseCard';

export function SummaryCards() {
    return (
        <div className="flex flex-col lg:flex-row gap-5 w-full items-stretch">
            <BalanceCard />
            <IncomeCard />
            <ExpenseCard />
        </div>
    );
}
