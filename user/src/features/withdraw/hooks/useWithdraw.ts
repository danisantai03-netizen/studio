
import { useMutation } from "@tanstack/react-query";
import { confirmWithdrawal, type ConfirmWithdrawalPayload } from "@/features/withdraw/services/withdrawService";

export function useConfirmWithdraw() {
    return useMutation({
        mutationFn: (payload: ConfirmWithdrawalPayload) => confirmWithdrawal(payload),
    });
}
