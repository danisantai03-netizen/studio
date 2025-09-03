
import { apiClient } from "@/services/apiClient";
import type { User, TransactionHistoryItem } from "@/features/user/types";

// This file is now for user-specific data, not auth.
// Auth calls are in features/auth/services/authService.ts

export async function getUserProfile(): Promise<User> {
    // Example endpoint for fetching non-auth user data
    return apiClient('/user/profile');
}

export async function getTransactionHistory(): Promise<TransactionHistoryItem[]> {
    return apiClient('/user/history');
}
