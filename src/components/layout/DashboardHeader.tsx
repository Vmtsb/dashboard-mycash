import { SearchInput } from '../ui/SearchInput';
import { FilterControls } from '../ui/FilterControls';
import { DateRangePicker } from '../ui/DateRangePicker';
import { MemberSelector } from '../ui/MemberSelector';
import { Plus } from 'lucide-react';

export function DashboardHeader() {
    return (
        <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between w-full">
            <div className="flex flex-wrap items-center gap-4 md:gap-8 lg:flex-nowrap">
                <SearchInput />
                <FilterControls />
                <DateRangePicker />
                <MemberSelector />
            </div>

            {/* Action Button */}
            <button className="flex justify-center items-center gap-2 md:gap-8 bg-neutral-1100 text-white px-8 md:px-16 py-3 md:py-12 rounded-[100px] font-semibold text-[16px] md:text-[18px] tracking-[0.3px] hover:bg-neutral-900 transition-colors shrink-0 w-full lg:w-auto">
                <Plus size={16} />
                <span>Nova transação</span>
            </button>
        </header>
    );
}
