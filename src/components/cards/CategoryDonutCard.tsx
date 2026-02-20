// Rotating color palette per Figma design system
const DONUT_COLORS = [
    '#D7FF00', // lime (primary)
    '#080b12', // black
    '#6B7280', // gray-medium
    '#D1D5DB', // gray-light
    '#2a89ef', // blue
    '#F87171', // red-light
];

const TRACK_COLOR = '#E7E8EA'; // neutral-200 / secondary-50

interface DonutChartProps {
    percentage: number;
    color: string;
    size?: number;
    strokeWidth?: number;
}

export function DonutChart({ percentage, color, size = 72, strokeWidth = 6 }: DonutChartProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;
    const center = size / 2;

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <svg
                width={size}
                height={size}
                style={{ transform: 'rotate(-90deg)' }}
            >
                {/* Track */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke={TRACK_COLOR}
                    strokeWidth={strokeWidth}
                />
                {/* Progress */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                />
            </svg>
            {/* Center label */}
            <span
                className="absolute font-normal text-[#080b12] text-center"
                style={{ fontSize: 12, lineHeight: '20px', letterSpacing: '0.3px' }}
            >
                {percentage.toFixed(1)}%
            </span>
        </div>
    );
}

interface CategoryDonutCardProps {
    category: string;
    value: number;
    percentage: number;
    colorIndex: number;
}

function formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
    });
}

export function CategoryDonutCard({ category, value, percentage, colorIndex }: CategoryDonutCardProps) {
    const color = DONUT_COLORS[colorIndex % DONUT_COLORS.length];

    return (
        <div
            className="
                bg-white border border-[#e5e7eb] rounded-[20px] p-6 
                flex flex-col gap-3 items-center justify-center 
                shrink-0 w-[185px]
                transition-colors duration-200
                hover:border-[#D7FF00]
                cursor-default
            "
        >
            {/* Donut graphic */}
            <div className="flex flex-col items-center justify-center">
                <DonutChart percentage={percentage} color={color} size={72} strokeWidth={6} />
            </div>

            {/* Text */}
            <div className="flex flex-col gap-1 items-center text-center w-full text-[#080b12]">
                <p
                    className="font-normal text-[14px] w-full"
                    style={{ lineHeight: '20px', letterSpacing: '0.3px' }}
                >
                    <span className="block truncate">{category}</span>
                </p>
                <p className="font-bold text-[20px]" style={{ lineHeight: '28px' }}>
                    {formatCurrency(value)}
                </p>
            </div>
        </div>
    );
}
