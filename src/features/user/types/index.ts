
export interface User {
    userId: string;
    name: string;
    email: string;
    avatarUrl: string;
    balance: number;
    points: number;
}

export interface TransactionHistoryItem {
    id: string; 
    date: string; // ISO string
    earnings: number; 
    status: 'Completed' | 'Picked Up' | 'Scheduled' | 'Canceled';
    wasteType: string;
    weight: number;
    pricePerKg: number;
    driver: string | null;
}
