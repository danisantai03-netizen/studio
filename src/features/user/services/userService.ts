
import { apiClient } from "@/services/apiClient";
import type { User, TransactionHistoryItem } from "@/features/user/types";

export async function getUser(): Promise<User> {
    return apiClient('/user');
}

export async function logout(): Promise<{ success: boolean }> {
    return apiClient('/auth/logout', { method: 'POST' });
}

export async function getTransactionHistory(): Promise<TransactionHistoryItem[]> {
    return apiClient('/user/history');
}
