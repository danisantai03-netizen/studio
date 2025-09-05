
import { apiClient } from "@/services/apiClient";
import type { TransactionDetails } from "@/features/pickup/types";

export async function getTransactionDetails(tripId: string): Promise<TransactionDetails> {
    return apiClient(`/pickup/${tripId}`);
}
