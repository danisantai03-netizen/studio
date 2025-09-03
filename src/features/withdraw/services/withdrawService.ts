
import { apiClient } from "@/services/apiClient";
import type { PaymentMethod, Voucher, WithdrawalDetails } from "@/features/withdraw/types";

export async function getPaymentMethods(): Promise<PaymentMethod[]> {
    return apiClient('/withdraw/methods');
}

export async function getVouchers(): Promise<Voucher[]> {
    return apiClient('/vouchers');
}

export interface ConfirmWithdrawalPayload {
    amount: number;
    method: string;
    accountNumber: string;
    fullName: string;
}

export async function confirmWithdrawal(payload: ConfirmWithdrawalPayload): Promise<{ withdrawId: string }> {
    return apiClient('/withdraw/confirm', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}

export async function getWithdrawalDetails(id: string): Promise<WithdrawalDetails> {
    return apiClient(`/withdraw/${id}`);
}
