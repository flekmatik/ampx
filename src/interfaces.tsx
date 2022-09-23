import { Transaction } from './views/TransactionsView/TransactionsView';

export interface Category {
    id: string;
    title: string;
    color: string;
}

export interface Model {
    transactions: Transaction[];
    categories: Category[];
}
