export type TransactionType = 'income' | 'expense'

export type TransactionStatus = 'completed' | 'pending'

export interface Transaction {
    id: string
    description: string
    amount: number
    date: Date
    type: TransactionType
    category: string
    accountId: string // Can be BankAccount id or CreditCard id
    memberId: string | null
    status: TransactionStatus
    installments?: number
    isRecurring?: boolean
    isPaid?: boolean
}

export interface Goal {
    id: string
    name: string
    targetAmount: number
    currentAmount: number
    deadline: Date
    color: string
}

export interface BankAccount {
    id: string
    name: string
    balance: number
    type: 'account'
    holderId: string
}

export interface CreditCard {
    id: string
    name: string
    limit: number
    currentBill: number
    closingDay: number
    dueDay: number
    theme: 'black' | 'lime' | 'white'
    lastDigits?: string
    type: 'creditCard'
    holderId: string
}

export interface FamilyMember {
    id: string
    name: string
    role: string
    avatarUrl?: string
    monthlyIncome?: number
}
