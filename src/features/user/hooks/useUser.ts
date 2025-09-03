
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUser, logout } from "@/features/user/services/userService";
import { getAuth, signOut } from "firebase/auth";

export function useUser() {
    return useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}

export function useLogout() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async () => {
            // First, try to sign out from Firebase
            const auth = getAuth();
            await signOut(auth);

            // Then, call the backend logout endpoint
            await logout();
        },
        onSuccess: () => {
            // Clear all user-related data from the cache
            queryClient.removeQueries({ queryKey: ['user'] });
            queryClient.removeQueries({ queryKey: ['notifications'] });
            queryClient.removeQueries({ queryKey: ['transactionHistory'] });
            // You can add more query keys to clear as needed
        },
    });
}
