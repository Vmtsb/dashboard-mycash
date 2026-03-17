import React, { useRef, useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useFinance } from '../../contexts/FinanceContext';
import { CategoryDonutCard } from './CategoryDonutCard';

export function ExpensesByCategoryCarousel() {
    const { calculateExpensesByCategory, calculateCategoryPercentage } = useFinance();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const dragStart = useRef<{ x: number; scrollLeft: number } | null>(null);

    const categories = calculateExpensesByCategory();

    // --------------------------------------------------- scroll state tracker
    const updateScrollState = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;
        const left = el.scrollLeft;
        const maxScroll = el.scrollWidth - el.clientWidth;
        setCanScrollLeft(left > 2);
        setCanScrollRight(left < maxScroll - 2);
    }, []);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        updateScrollState();

        el.addEventListener('scroll', updateScrollState, { passive: true });

        // Also re-check when container resizes
        const ro = new ResizeObserver(updateScrollState);
        ro.observe(el);

        return () => {
            el.removeEventListener('scroll', updateScrollState);
            ro.disconnect();
        };
    }, [updateScrollState, categories.length]);

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

    // ------------------------------------------------------------------- drag
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

    const showLeft = isHovered && canScrollLeft;
    const showRight = isHovered && canScrollRight;

    return (
        <div
            className="relative w-full overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); setIsDragging(false); }}
        >
            {/* Left fade mask — only when there's content to scroll left */}
            <div
                className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 z-10 transition-opacity duration-200"
                style={{
                    background: 'linear-gradient(to right, rgba(229,231,235,1) 0%, transparent 100%)',
                    opacity: canScrollLeft ? 1 : 0,
                }}
            />
            {/* Right fade mask — only when there's content to scroll right */}
            <div
                className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 z-10 transition-opacity duration-200"
                style={{
                    background: 'linear-gradient(to left, rgba(229,231,235,1) 0%, transparent 100%)',
                    opacity: canScrollRight ? 1 : 0,
                }}
            />

            {/* Left arrow — desktop only, visible only when can scroll left */}
            <button
                onClick={() => scrollBy(-220)}
                className={`
                    hidden lg:flex
                    absolute left-1 top-1/2 -translate-y-1/2 z-20
                    items-center justify-center
                    w-9 h-9 rounded-full bg-white
                    border-2 border-[#e5e7eb]
                    transition-all duration-200
                    hover:border-[#D7FF00]
                    ${showLeft ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}
                `}
                aria-label="Anterior"
            >
                <ChevronLeft size={18} strokeWidth={1.5} className="text-[#080b12]" />
            </button>

            {/* Right arrow — desktop only, visible only when can scroll right */}
            <button
                onClick={() => scrollBy(220)}
                className={`
                    hidden lg:flex
                    absolute right-1 top-1/2 -translate-y-1/2 z-20
                    items-center justify-center
                    w-9 h-9 rounded-full bg-white
                    border-2 border-[#e5e7eb]
                    transition-all duration-200
                    hover:border-[#D7FF00]
                    ${showRight ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}
                `}
                aria-label="Próximo"
            >
                <ChevronRight size={18} strokeWidth={1.5} className="text-[#080b12]" />
            </button>

            {/* Scrollable track */}
            <div
                ref={scrollRef}
                className={`
                    flex flex-row gap-4 overflow-x-auto
                    px-2 py-2
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
