import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { TrendingUp } from 'lucide-react';

const mockData = [
    { month: 'JAN', revenue: 0, expenses: 0 },
    { month: 'FEV', revenue: 9500, expenses: 4400 },
    { month: 'MAR', revenue: 11000, expenses: 6800 },
    { month: 'ABR', revenue: 10500, expenses: 8000 },
    { month: 'MAI', revenue: 8500, expenses: 8400 },
    { month: 'JUN', revenue: 7000, expenses: 7300 },
    { month: 'JUL', revenue: 6800, expenses: 6000 },
    { month: 'AGO', revenue: 7200, expenses: 4500 },
    { month: 'SET', revenue: 8500, expenses: 3600 },
    { month: 'OUT', revenue: 10500, expenses: 4500 },
    { month: 'NOV', revenue: 12000, expenses: 6200 },
    { month: 'DEZ', revenue: 14000, expenses: 8000 }, // Extrapolated from the image
];

function formatCurrency(value: number) {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
    });
}

function formatCompactCurrency(value: number) {
    if (value === 0) return 'R$ 0,00';
    return `R$ ${(value / 1000).toLocaleString('pt-BR')}k`;
}

// Custom tooltip as described in the prompt
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-4 rounded-lg shadow-lg border border-neutral-200">
                <p className="font-bold text-neutral-1100 mb-2">{label}</p>
                <p className="text-[#65A30D] text-sm"> {/* Dark green for readability */}
                    Receitas: {formatCurrency(payload[0].value)}
                </p>
                <p className="text-neutral-1100 text-sm">
                    Despesas: {formatCurrency(payload[1].value)}
                </p>
            </div>
        );
    }
    return null;
};

export function FinancialFlowChart() {
    return (
        <div className="bg-white border border-[#e5e7eb] rounded-[20px] flex flex-col items-start gap-8 p-8" style={{ width: '100%', maxWidth: '794px', height: '596px' }}>
            {/* Header */}
            <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-3">
                    <TrendingUp size={24} className="text-neutral-1100" />
                    <h2 className="text-[20px] font-bold text-neutral-1100 tracking-[0.3px]">Fluxo financeiro</h2>
                </div>
                
                {/* Legend */}
                <div className="flex items-center gap-4 text-[12px] font-bold text-neutral-1100">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#D7FF00]"></div>
                        <span>Receitas</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* the image uses red for expenses */}
                        <div className="w-2 h-2 rounded-full bg-[#EF4444]"></div>
                        <span>Despesas</span>
                    </div>
                </div>
            </div>

            {/* Chart Area */}
            <div className="w-full flex-1">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={mockData}
                        margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
                    >
                        <defs>
                            {/* Revenue Gradient */}
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#D7FF00" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#D7FF00" stopOpacity={0} />
                            </linearGradient>
                            {/* Expenses Gradient (Using Red to match the image) */}
                            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        
                        <CartesianGrid 
                            strokeDasharray="3 3" 
                            vertical={false} 
                            stroke="#E5E7EB" 
                        />
                        
                        <XAxis 
                            dataKey="month" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6B7280', fontSize: 10, fontWeight: 700 }}
                            dy={10}
                        />
                        
                        <YAxis 
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={formatCompactCurrency}
                            tick={{ fill: '#6B7280', fontSize: 14 }}
                        />
                        
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#E5E7EB', strokeWidth: 1 }} />
                        
                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#D7FF00"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorRevenue)"
                            activeDot={{ r: 6, fill: '#D7FF00', stroke: '#fff', strokeWidth: 2 }}
                        />
                        
                        <Area
                            type="monotone"
                            dataKey="expenses"
                            stroke="#EF4444" 
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorExpenses)"
                            activeDot={{ r: 6, fill: '#EF4444', stroke: '#fff', strokeWidth: 2 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
