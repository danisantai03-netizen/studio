
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { verifyLoginOtp as verifyLoginOtpAPI } from '../services/authService';
import type { VerifyOtpPayload } from '../types';
import { useToast } from '@/hooks/use-toast';

export function useVerifyLoginOtp() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (payload: VerifyOtpPayload) => verifyLoginOtpAPI(payload),
    onSuccess: async () => {
      // On successful OTP, the backend has set the session cookie.
      // We need to invalidate the user query to refetch user data.
      await queryClient.invalidateQueries({ queryKey: ['user'] });
      router.push('/');
      toast({
        title: 'Login Successful!',
        description: 'Welcome back to GreenEarth.',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: error.message || 'The code is incorrect or has expired.',
      });
    },
  });
}
