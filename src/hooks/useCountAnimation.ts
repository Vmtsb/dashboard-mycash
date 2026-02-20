import { useEffect, useRef, useState } from 'react';

/**
 * Animates from 0 (or current displayed value) to `target` in ~800ms.
 */
export function useCountAnimation(target: number, duration = 800): number {
    const [displayed, setDisplayed] = useState(0);
    const rafRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);
    const startValueRef = useRef(0);

    useEffect(() => {
        startValueRef.current = displayed;
        startTimeRef.current = null;

        if (rafRef.current !== null) {
            cancelAnimationFrame(rafRef.current);
        }

        const animate = (timestamp: number) => {
            if (startTimeRef.current === null) {
                startTimeRef.current = timestamp;
            }

            const elapsed = timestamp - startTimeRef.current;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = startValueRef.current + (target - startValueRef.current) * eased;

            setDisplayed(current);

            if (progress < 1) {
                rafRef.current = requestAnimationFrame(animate);
            } else {
                setDisplayed(target);
            }
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [target, duration]);

    return displayed;
}
