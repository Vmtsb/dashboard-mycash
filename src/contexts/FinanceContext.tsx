import { createContext, useContext, useState, ReactNode } from 'react';
import {
    Transaction, Goal, BankAccount, CreditCard, FamilyMember,
    TransactionType
} from '../types/finance';
import {
    mockTransactions, mockGoals, mockAccounts,
    mockCards, mockMembers
} from '../data/mockData';
import { isWithinInterval, startOfDay, endOfDay } from 'date-fns';

interface DateRange {
    startDate: Date | null;
    endDate: Date | null;
}

interface FinanceContextType {
    // State
    transactions: Transaction[];
    goals: Goal[];
    creditCards: CreditCard[];
    bankAccounts: BankAccount[];
    familyMembers: FamilyMember[];

    // Filters
    filters: {
        selectedMember: string | null;
        dateRange: DateRange;
        transactionType: TransactionType | 'all';
        searchText: string;
    };

    // Actions - Transactions
    addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
    updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
    deleteTransaction: (id: string) => void;

    // Actions - Goals
    addGoal: (goal: Omit<Goal, 'id'>) => void;
    updateGoal: (id: string, goal: Partial<Goal>) => void;
    deleteGoal: (id: string) => void;

    // Actions - Cards/Accounts/Members (CRUD)
    addCreditCard: (card: Omit<CreditCard, 'id'>) => void;
    updateCreditCard: (id: string, card: Partial<CreditCard>) => void;
    deleteCreditCard: (id: string) => void;

    addBankAccount: (account: Omit<BankAccount, 'id'>) => void;
    updateBankAccount: (id: string, account: Partial<BankAccount>) => void;
    deleteBankAccount: (id: string) => void;

    addFamilyMember: (member: Omit<FamilyMember, 'id'>) => void;
    updateFamilyMember: (id: string, member: Partial<FamilyMember>) => void;
    deleteFamilyMember: (id: string) => void;

    // Filter Actions
    setMemberFilter: (memberId: string | null) => void;
    setDateRangeFilter: (range: DateRange) => void;
    setTypeFilter: (type: TransactionType | 'all') => void;
    setSearchFilter: (text: string) => void;
    resetFilters: () => void;

    // Derived Data
    getFilteredTransactions: () => Transaction[];
    calculateTotalBalance: () => number;
    calculateIncomeForPeriod: () => number;
    calculateExpensesForPeriod: () => number;
    calculateExpensesByCategory: () => { category: string; value: number }[];
    calculateCategoryPercentage: (category: string) => number;
    calculateSavingsRate: () => number;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: ReactNode }) {
    // Core State
    const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
    const [goals, setGoals] = useState<Goal[]>(mockGoals);
    const [creditCards, setCreditCards] = useState<CreditCard[]>(mockCards);
    const [bankAccounts, setBankAccounts] = useState<BankAccount[]>(mockAccounts);
    const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(mockMembers);

    // Filters State
    const [selectedMember, setSelectedMember] = useState<string | null>(null);
    const [dateRange, setDateRange] = useState<DateRange>({ startDate: null, endDate: null });
    const [transactionType, setTransactionType] = useState<TransactionType | 'all'>('all');
    const [searchText, setSearchText] = useState('');

    // --- CRUD Actions ---

    const addTransaction = (t: Omit<Transaction, 'id'>) => {
        setTransactions(prev => [...prev, { ...t, id: crypto.randomUUID() }]);
    };
    const updateTransaction = (id: string, t: Partial<Transaction>) => {
        setTransactions(prev => prev.map(item => item.id === id ? { ...item, ...t } : item));
    };
    const deleteTransaction = (id: string) => {
        setTransactions(prev => prev.filter(item => item.id !== id));
    };

    const addGoal = (g: Omit<Goal, 'id'>) => {
        setGoals(prev => [...prev, { ...g, id: crypto.randomUUID() }]);
    };
    const updateGoal = (id: string, g: Partial<Goal>) => {
        setGoals(prev => prev.map(item => item.id === id ? { ...item, ...g } : item));
    };
    const deleteGoal = (id: string) => {
        setGoals(prev => prev.filter(item => item.id !== id));
    };

    const addCreditCard = (c: Omit<CreditCard, 'id'>) => {
        setCreditCards(prev => [...prev, { ...c, id: crypto.randomUUID() }]);
    };
    const updateCreditCard = (id: string, c: Partial<CreditCard>) => {
        setCreditCards(prev => prev.map(item => item.id === id ? { ...item, ...c } : item));
    };
    const deleteCreditCard = (id: string) => {
        setCreditCards(prev => prev.filter(item => item.id !== id));
    };

    const addBankAccount = (a: Omit<BankAccount, 'id'>) => {
        setBankAccounts(prev => [...prev, { ...a, id: crypto.randomUUID() }]);
    };
    const updateBankAccount = (id: string, a: Partial<BankAccount>) => {
        setBankAccounts(prev => prev.map(item => item.id === id ? { ...item, ...a } : item));
    };
    const deleteBankAccount = (id: string) => {
        setBankAccounts(prev => prev.filter(item => item.id !== id));
    };

    const addFamilyMember = (m: Omit<FamilyMember, 'id'>) => {
        setFamilyMembers(prev => [...prev, { ...m, id: crypto.randomUUID() }]);
    };
    const updateFamilyMember = (id: string, m: Partial<FamilyMember>) => {
        setFamilyMembers(prev => prev.map(item => item.id === id ? { ...item, ...m } : item));
    };
    const deleteFamilyMember = (id: string) => {
        setFamilyMembers(prev => prev.filter(item => item.id !== id));
    };

    // --- Filter Actions ---
    const resetFilters = () => {
        setSelectedMember(null);
        setDateRange({ startDate: null, endDate: null });
        setTransactionType('all');
        setSearchText('');
    };

    // --- Derived Calculations ---

    const getFilteredTransactions = () => {
        return transactions.filter(t => {
            const matchMember = !selectedMember || t.memberId === selectedMember;
            const matchType = transactionType === 'all' || t.type === transactionType;
            const matchText = !searchText || t.description.toLowerCase().includes(searchText.toLowerCase()) || t.category.toLowerCase().includes(searchText.toLowerCase());

            let matchDate = true;
            if (dateRange.startDate && dateRange.endDate) {
                matchDate = isWithinInterval(t.date, {
                    start: startOfDay(dateRange.startDate),
                    end: endOfDay(dateRange.endDate)
                });
            }

            return matchMember && matchType && matchText && matchDate;
        }).sort((a, b) => b.date.getTime() - a.date.getTime());
    };

    const calculateTotalBalance = () => {
        const accountsTotal = bankAccounts.reduce((acc, curr) => acc + curr.balance, 0);
        const cardsTotal = creditCards.reduce((acc, curr) => acc + curr.currentBill, 0);
        return accountsTotal - cardsTotal;
    };

    const calculateIncomeForPeriod = () => {
        return getFilteredTransactions()
            .filter(t => t.type === 'income')
            .reduce((acc, curr) => acc + curr.amount, 0);
    };

    const calculateExpensesForPeriod = () => {
        return getFilteredTransactions()
            .filter(t => t.type === 'expense')
            .reduce((acc, curr) => acc + curr.amount, 0);
    };

    const calculateExpensesByCategory = () => {
        const filtered = getFilteredTransactions().filter(t => t.type === 'expense');
        const categoriesMap: Record<string, number> = {};

        filtered.forEach(t => {
            categoriesMap[t.category] = (categoriesMap[t.category] || 0) + t.amount;
        });

        return Object.entries(categoriesMap)
            .map(([category, value]) => ({ category, value }))
            .sort((a, b) => b.value - a.value);
    };

    const calculateCategoryPercentage = (category: string) => {
        const totalIncome = calculateIncomeForPeriod();
        if (totalIncome === 0) return 0;

        const categoryExpense = getFilteredTransactions()
            .filter(t => t.type === 'expense' && t.category === category)
            .reduce((acc, curr) => acc + curr.amount, 0);

        return (categoryExpense / totalIncome) * 100;
    };

    const calculateSavingsRate = () => {
        const income = calculateIncomeForPeriod();
        const expenses = calculateExpensesForPeriod();
        if (income === 0) return 0;
        return ((income - expenses) / income) * 100;
    };

    const value = {
        transactions,
        goals,
        creditCards,
        bankAccounts,
        familyMembers,
        filters: {
            selectedMember,
            dateRange,
            transactionType,
            searchText
        },
        addTransaction,
        updateTransaction,
        deleteTransaction,
        addGoal,
        updateGoal,
        deleteGoal,
        addCreditCard,
        updateCreditCard,
        deleteCreditCard,
        addBankAccount,
        updateBankAccount,
        deleteBankAccount,
        addFamilyMember,
        updateFamilyMember,
        deleteFamilyMember,
        setMemberFilter: setSelectedMember,
        setDateRangeFilter: setDateRange,
        setTypeFilter: setTransactionType,
        setSearchFilter: setSearchText,
        resetFilters,
        getFilteredTransactions,
        calculateTotalBalance,
        calculateIncomeForPeriod,
        calculateExpensesForPeriod,
        calculateExpensesByCategory,
        calculateCategoryPercentage,
        calculateSavingsRate
    };

    return (
        <FinanceContext.Provider value={value}>
            {children}
        </FinanceContext.Provider>
    );
}

export function useFinance() {
    const context = useContext(FinanceContext);
    if (context === undefined) {
        throw new Error('useFinance must be used within a FinanceProvider');
    }
    return context;
}
