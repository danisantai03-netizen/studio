
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { login as loginAPI } from '../services/authService';
import type { LoginPayload } from '../types';
import { useToast } from '@/hooks/use-toast';

export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (payload: LoginPayload) => loginAPI(payload),
    onSuccess: async (data, variables) => {
      // The backend response indicates if OTP is required
      if (data.otpRequired) {
        // Redirect to OTP verification page
        router.push(`/verify-login?email=${encodeURIComponent(variables.email)}`);
      } else {
        // If no OTP needed, session is created. Invalidate user data to refetch.
        await queryClient.invalidateQueries({ queryKey: ['user'] });
        router.push('/');
        toast({ title: 'Login Successful', description: 'Welcome back!' });
      }
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: error.message || 'An unknown error occurred.',
      });
    },
  });
}
