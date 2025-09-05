
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, logout as logoutAPI } from "@/features/auth/services/authService";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export function useUser() {
    return useQuery({
        queryKey: ['user'],
        queryFn: getCurrentUser,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: false, // Do not retry on auth errors (e.g. 401)
    });
}

export function useLogout() {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { toast } = useToast();
    
    return useMutation({
        mutationFn: logoutAPI,
        onSuccess: () => {
            // Clear all cached data
            queryClient.clear();
            // Redirect to login page
            router.push('/login');
            toast({
                title: "Logged Out",
                description: "You have been successfully logged out.",
            });
        },
        onError: (error: Error) => {
             toast({
                variant: "destructive",
                title: "Logout Failed",
                description: error.message || "An unexpected error occurred.",
            });
        }
    });
}
