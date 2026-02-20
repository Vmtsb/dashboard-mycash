import { useState, useMemo } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useFinance } from '../../contexts/FinanceContext';
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    startOfYear,
    isSameMonth,
    isSameDay,
    isWithinInterval,
    eachDayOfInterval,
    startOfWeek,
    endOfWeek,
    isAfter,
    isBefore
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cnStyle(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function DateRangePicker() {
    const { filters, setDateRangeFilter } = useFinance();
    const [isOpen, setIsOpen] = useState(false);
    const [currentViewDate, setCurrentViewDate] = useState(filters.dateRange.startDate || new Date());
    const [hoverDate, setHoverDate] = useState<Date | null>(null);

    const formattedRange = useMemo(() => {
        const { startDate, endDate } = filters.dateRange;
        if (!startDate || !endDate) return 'Selecionar período';
        const start = format(startDate, "dd MMM", { locale: ptBR });
        const end = format(endDate, "dd MMM yyyy", { locale: ptBR });
        return `${start} - ${end}`;
    }, [filters.dateRange]);

    const handleShortcut = (type: 'thisMonth' | 'lastMonth' | 'last3Months' | 'thisYear') => {
        const now = new Date();
        let start = now;
        let end = now;

        switch (type) {
            case 'thisMonth':
                start = startOfMonth(now);
                end = endOfMonth(now);
                break;
            case 'lastMonth':
                const lastMonth = subMonths(now, 1);
                start = startOfMonth(lastMonth);
                end = endOfMonth(lastMonth);
                break;
            case 'last3Months':
                start = startOfMonth(subMonths(now, 2));
                end = endOfMonth(now);
                break;
            case 'thisYear':
                start = startOfYear(now);
                end = endOfMonth(now);
                break;
        }

        setDateRangeFilter({ startDate: start, endDate: end });
        setIsOpen(false);
    };

    const handleDateClick = (date: Date) => {
        const { startDate, endDate } = filters.dateRange;

        if (!startDate || (startDate && endDate)) {
            // First click or reset
            setDateRangeFilter({ startDate: date, endDate: null });
        } else {
            // Second click
            if (isBefore(date, startDate)) {
                setDateRangeFilter({ startDate: date, endDate: startDate });
            } else {
                setDateRangeFilter({ startDate, endDate: date });
            }
            // Close after selection on mobile, maybe stay open on desktop? 
            // Prompt says "update text and confirm (clicking outside or OK)"
        }
    };

    return (
        <div className="relative">
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cnStyle(
                    "flex items-center gap-8 px-24 py-12 rounded-[100px] border bg-white text-[14px] font-normal leading-[20px] tracking-[0.3px] transition-all whitespace-nowrap",
                    isOpen ? "border-neutral-1100" : "border-neutral-500 hover:border-neutral-1100"
                )}
            >
                <CalendarIcon size={16} className="text-neutral-1100" />
                <span className="text-neutral-1100">{formattedRange}</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-[100] lg:hidden bg-black/40" onClick={() => setIsOpen(false)} />
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute lg:fixed lg:top-auto lg:left-auto mt-8 lg:mt-0 right-0 lg:right-auto bg-white border border-neutral-200 rounded-24 shadow-2xl p-24 z-[150] w-full max-w-[360px] lg:max-w-none flex flex-col lg:flex-row gap-24 overflow-hidden"
                            style={{
                                left: '50%',
                                transform: 'translateX(-50%)',
                                top: '50%',
                                marginTop: '0'
                            }}
                        >
                            {/* Actions/Shortcuts sidebar */}
                            <div className="flex flex-col gap-12 w-full lg:w-[200px] border-b lg:border-b-0 lg:border-r border-neutral-100 pb-16 lg:pb-0 lg:pr-16">
                                <h4 className="text-[12px] font-bold text-neutral-400 uppercase tracking-widest px-12">Atalhos</h4>
                                <div className="flex lg:flex-col flex-wrap gap-8">
                                    {(['thisMonth', 'lastMonth', 'last3Months', 'thisYear'] as const).map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => handleShortcut(type)}
                                            className="px-12 py-8 rounded-lg text-left text-[14px] font-semibold text-neutral-600 hover:bg-neutral-100 transition-colors capitalize"
                                        >
                                            {type === 'thisMonth' ? 'Este mês' :
                                                type === 'lastMonth' ? 'Mês passado' :
                                                    type === 'last3Months' ? 'Últimos 3 meses' : 'Este ano'}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="mt-auto hidden lg:block w-full py-12 bg-neutral-1100 text-white rounded-xl font-bold"
                                >
                                    Confirmar
                                </button>
                            </div>

                            {/* Calendars Container */}
                            <div className="flex flex-col gap-24 overflow-auto">
                                <div className="flex items-center justify-between px-8">
                                    <button
                                        onClick={() => setCurrentViewDate(subMonths(currentViewDate, 1))}
                                        className="p-8 hover:bg-neutral-100 rounded-full transition-colors"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                    <span className="font-bold text-[16px] text-neutral-1100">
                                        {format(currentViewDate, "MMMM yyyy", { locale: ptBR })}
                                    </span>
                                    <button
                                        onClick={() => setCurrentViewDate(addMonths(currentViewDate, 1))}
                                        className="p-8 hover:bg-neutral-100 rounded-full transition-colors"
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
                                    <CalendarMonth
                                        date={currentViewDate}
                                        range={filters.dateRange}
                                        onDateClick={handleDateClick}
                                        hoverDate={hoverDate}
                                        onHoverDate={setHoverDate}
                                    />
                                    <div className="hidden lg:block">
                                        <CalendarMonth
                                            date={addMonths(currentViewDate, 1)}
                                            range={filters.dateRange}
                                            onDateClick={handleDateClick}
                                            hoverDate={hoverDate}
                                            onHoverDate={setHoverDate}
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="lg:hidden w-full py-16 bg-neutral-1100 text-white rounded-2xl font-bold text-[16px]"
                                >
                                    Fechar e Aplicar
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

interface MonthProps {
    date: Date;
    range: { startDate: Date | null; endDate: Date | null };
    onDateClick: (date: Date) => void;
    hoverDate: Date | null;
    onHoverDate: (date: Date | null) => void;
}

function CalendarMonth({ date, range, onDateClick, hoverDate, onHoverDate }: MonthProps) {
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

    return (
        <div className="w-[280px]">
            <div className="grid grid-cols-7 mb-8">
                {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => (
                    <span key={i} className="text-center text-[12px] font-bold text-neutral-400">{d}</span>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-y-2">
                {calendarDays.map((day, i) => {
                    const isOutside = !isSameMonth(day, monthStart);
                    const isSelectedStart = range.startDate && isSameDay(day, range.startDate);
                    const isSelectedEnd = range.endDate && isSameDay(day, range.endDate);

                    const inRange = range.startDate && range.endDate && isWithinInterval(day, { start: range.startDate, end: range.endDate });

                    // Hover range logic
                    const inHoverRange = range.startDate && !range.endDate && hoverDate && (
                        (isAfter(day, range.startDate) && isBefore(day, hoverDate)) ||
                        (isBefore(day, range.startDate) && isAfter(day, hoverDate)) ||
                        isSameDay(day, hoverDate)
                    );

                    return (
                        <button
                            key={i}
                            onClick={() => onDateClick(day)}
                            onMouseEnter={() => onHoverDate(day)}
                            onMouseLeave={() => onHoverDate(null)}
                            disabled={isOutside}
                            className={cnStyle(
                                "relative h-36 flex items-center justify-center text-[14px] font-medium transition-all",
                                isOutside ? "text-neutral-200 pointer-events-none" : "text-neutral-800 hover:text-neutral-1100 hover:bg-neutral-50 rounded-lg",
                                (isSelectedStart || isSelectedEnd) && "bg-neutral-1100 text-white !rounded-full z-10",
                                (inRange || inHoverRange) && "bg-brand-lime/20 !rounded-none",
                                isSelectedStart && range.endDate && "rounded-r-none",
                                isSelectedEnd && range.startDate && "rounded-l-none"
                            )}
                        >
                            {format(day, "d")}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
