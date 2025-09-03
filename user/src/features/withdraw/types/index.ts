
export interface PaymentMethod {
    name: string;
    logo: string;
}

export interface Voucher {
    name: string;
    points: number;
}

export interface WithdrawalDetails {
    status: 'Success' | 'In Progress' | 'Failed';
    amount: number;
    fullName: string;
    accountNumber: string;
    method: string;
    date: string; // ISO string
}

export interface WithdrawalHistoryItem {
    id: string;
    date: string; // ISO string
    amount: number;
    status: 'Success' | 'In Progress' | 'Failed';
    method: string;
}
