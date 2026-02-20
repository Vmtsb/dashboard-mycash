import { Transaction, Goal, BankAccount, CreditCard, FamilyMember } from '../types/finance';
import { v4 as uuidv4 } from 'uuid';
import { subMonths, startOfMonth } from 'date-fns';

// Members
export const mockMembers: FamilyMember[] = [
    { id: 'm1', name: 'Lucas Marte', role: 'Pai', avatarUrl: '/assets/sidebar/member-pai.png', monthlyIncome: 8500 },
    { id: 'm2', name: 'Maria Marte', role: 'Mãe', avatarUrl: '/assets/sidebar/logo/avatar-2.svg', monthlyIncome: 7200 },
];

// Accounts
export const mockAccounts: BankAccount[] = [
    { id: 'a1', name: 'Itaú Personalité', balance: 12500.50, type: 'account', holderId: 'm1' },
    { id: 'a2', name: 'Nubank', balance: 4200.00, type: 'account', holderId: 'm2' },
];

// Cards
export const mockCards: CreditCard[] = [
    { id: 'c1', name: 'Nubank Ultravioleta', limit: 15000, currentBill: 2450.80, closingDay: 5, dueDay: 12, theme: 'black', lastDigits: '8842', type: 'creditCard', holderId: 'm1' },
    { id: 'c2', name: 'Inter Black', limit: 10000, currentBill: 1200.00, closingDay: 10, dueDay: 17, theme: 'black', lastDigits: '1234', type: 'creditCard', holderId: 'm2' },
    { id: 'c3', name: 'XP Visax', limit: 8000, currentBill: 500.00, closingDay: 1, dueDay: 8, theme: 'black', lastDigits: '5678', type: 'creditCard', holderId: 'm1' },
];

// Goals
export const mockGoals: Goal[] = [
    { id: 'g1', name: 'Reserva de Emergência', targetAmount: 50000, currentAmount: 12500, deadline: new Date(2026, 11, 31), color: '#D7FF00' },
    { id: 'g2', name: 'Viagem Japão 2027', targetAmount: 30000, currentAmount: 5000, deadline: new Date(2027, 5, 15), color: '#2A89EF' },
    { id: 'g3', name: 'Novo MacBook Pro', targetAmount: 15000, currentAmount: 2000, deadline: new Date(2026, 8, 20), color: '#080B12' },
    { id: 'g4', name: 'Curso Advanced Trading', targetAmount: 2500, currentAmount: 2500, deadline: new Date(2026, 3, 10), color: '#9CA3AF' },
];

// Categories
const categories = ['Alimentação', 'Moradia', 'Transporte', 'Lazer', 'Saúde', 'Educação', 'Shopping', 'Investimentos'];

// Random Transaction Generator Helper
const generateTransactions = (): Transaction[] => {
    const txs: Transaction[] = [];
    const now = new Date();

    // Past 3 months
    for (let i = 0; i < 3; i++) {
        const monthDate = subMonths(now, i);

        // Income for each member
        mockMembers.forEach(m => {
            if (m.monthlyIncome && m.monthlyIncome > 0) {
                txs.push({
                    id: uuidv4(),
                    description: `Salário - ${m.name}`,
                    amount: m.monthlyIncome,
                    date: startOfMonth(monthDate),
                    type: 'income',
                    category: 'Salário',
                    accountId: m.id === 'm1' ? 'a1' : 'a2',
                    memberId: m.id,
                    status: 'completed'
                });
            }
        });

        // 8-10 random expenses per month
        for (let j = 0; j < 8; j++) {
            const day = Math.floor(Math.random() * 28) + 1;
            const category = categories[Math.floor(Math.random() * categories.length)];
            const member = mockMembers[Math.floor(Math.random() * mockMembers.length)];
            const isCard = Math.random() > 0.4;

            txs.push({
                id: uuidv4(),
                description: `${category} - ${member.name}`,
                amount: Math.floor(Math.random() * 500) + 20,
                date: new Date(monthDate.getFullYear(), monthDate.getMonth(), day),
                type: 'expense',
                category,
                accountId: isCard ? 'c1' : 'a1',
                memberId: member.id,
                status: 'completed'
            });
        }
    }

    return txs;
};

export const mockTransactions = generateTransactions();
