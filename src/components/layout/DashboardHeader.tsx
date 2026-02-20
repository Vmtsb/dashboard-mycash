import { SearchInput } from '../ui/SearchInput';
import { FilterControls } from '../ui/FilterControls';
import { DateRangePicker } from '../ui/DateRangePicker';
import { MemberSelector } from '../ui/MemberSelector';
import { Plus } from 'lucide-react';

export function DashboardHeader() {
    return (
        <header className="flex flex-col gap-16 md:flex-row md:items-center md:justify-between w-full">
            <div className="flex flex-wrap items-center gap-8">
                <SearchInput />
                <FilterControls />
                <DateRangePicker />
                <MemberSelector />
            </div>

            {/* Action Button */}
            <button className="flex items-center justify-center gap-8 bg-neutral-1100 text-white px-16 py-12 rounded-[100px] font-semibold text-[18px] tracking-[0.3px] hover:bg-neutral-900 transition-colors shrink-0">
                <Plus size={16} />
                <span>Nova transação</span>
            </button>
        </header>
    );
}
