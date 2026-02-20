import React, { useRef, useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useFinance } from '../../contexts/FinanceContext';
import { CategoryDonutCard } from './CategoryDonutCard';

export function ExpensesByCategoryCarousel() {
    const { calculateExpensesByCategory, calculateCategoryPercentage } = useFinance();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const dragStart = useRef<{ x: number; scrollLeft: number } | null>(null);

    const categories = calculateExpensesByCategory();

    // ------------------------------------------------------------------ scroll
    const scrollBy = useCallback((amount: number) => {
        scrollRef.current?.scrollBy({ left: amount, behavior: 'smooth' });
    }, []);

    // Horizontal scroll via mouse wheel
    const handleWheel = useCallback((e: WheelEvent) => {
        e.preventDefault();
        scrollRef.current?.scrollBy({ left: e.deltaY * 2, behavior: 'smooth' });
    }, []);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        el.addEventListener('wheel', handleWheel, { passive: false });
        return () => el.removeEventListener('wheel', handleWheel);
    }, [handleWheel]);

    // ----------------------------------------------------------------- drag
    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollRef.current) return;
        setIsDragging(true);
        dragStart.current = { x: e.pageX, scrollLeft: scrollRef.current.scrollLeft };
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !dragStart.current || !scrollRef.current) return;
        e.preventDefault();
        const dx = e.pageX - dragStart.current.x;
        scrollRef.current.scrollLeft = dragStart.current.scrollLeft - dx;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        dragStart.current = null;
    };

    if (categories.length === 0) {
        return (
            <div className="text-center text-sm text-neutral-400 py-8">
                Nenhuma despesa encontrada no período.
            </div>
        );
    }

    return (
        <div
            className="relative w-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); setIsDragging(false); }}
        >
            {/* Left fade mask */}
            <div
                className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 z-10"
                style={{
                    background: 'linear-gradient(to right, rgba(229,231,235,1) 0%, transparent 100%)',
                }}
            />
            {/* Right fade mask */}
            <div
                className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 z-10"
                style={{
                    background: 'linear-gradient(to left, rgba(229,231,235,1) 0%, transparent 100%)',
                }}
            />

            {/* Left arrow — desktop only */}
            <button
                onClick={() => scrollBy(-220)}
                className={`
                    hidden lg:flex
                    absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-20
                    items-center justify-center
                    w-9 h-9 rounded-full bg-white shadow-md
                    border border-[#e5e7eb]
                    transition-all duration-200
                    hover:shadow-lg hover:border-[#D7FF00]
                    ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}
                `}
                aria-label="Anterior"
            >
                <ChevronLeft size={18} className="text-[#080b12]" />
            </button>

            {/* Right arrow — desktop only */}
            <button
                onClick={() => scrollBy(220)}
                className={`
                    hidden lg:flex
                    absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-20
                    items-center justify-center
                    w-9 h-9 rounded-full bg-white shadow-md
                    border border-[#e5e7eb]
                    transition-all duration-200
                    hover:shadow-lg hover:border-[#D7FF00]
                    ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}
                `}
                aria-label="Próximo"
            >
                <ChevronRight size={18} className="text-[#080b12]" />
            </button>

            {/* Scrollable track */}
            <div
                ref={scrollRef}
                className={`
                    flex flex-row gap-4 overflow-x-auto
                    px-6 py-2
                    scroll-smooth
                    [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                    ${isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'}
                `}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                {categories.map((cat, index) => {
                    const pct = calculateCategoryPercentage(cat.category);
                    return (
                        <CategoryDonutCard
                            key={cat.category}
                            category={cat.category}
                            value={cat.value}
                            percentage={pct}
                            colorIndex={index}
                        />
                    );
                })}
            </div>
        </div>
    );
}
