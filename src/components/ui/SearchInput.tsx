import { Search } from 'lucide-react';
import { useFinance } from '../../contexts/FinanceContext';
import { useEffect, useState } from 'react';

export function SearchInput() {
    const { filters, setSearchFilter } = useFinance();
    const [localValue, setLocalValue] = useState(filters.searchText);

    // Sync with global state if it changes from outside
    useEffect(() => {
        setLocalValue(filters.searchText);
    }, [filters.searchText]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setLocalValue(val);
        setSearchFilter(val); // Real-time update in context
    };

    return (
        <div className="flex w-[175px] px-24 py-12 items-center gap-8 border border-neutral-500 rounded-[100px] bg-white group focus-within:ring-1 focus-within:ring-neutral-1100 transition-all">
            <Search size={16} className="text-neutral-1100 shrink-0" />
            <input
                type="text"
                value={localValue}
                onChange={handleChange}
                placeholder="Pesquisar"
                className="w-full bg-transparent text-neutral-1100 placeholder:text-neutral-1100 focus:outline-none text-[14px] leading-[20px] tracking-[0.3px]"
            />
        </div>
    );
}
