
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { verifyEmail as verifyEmailAPI } from '../services/authService';
import type { VerifyOtpPayload } from '../types';
import { useToast } from '@/hooks/use-toast';

export function useVerifyEmailOtp() {
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (payload: VerifyOtpPayload) => verifyEmailAPI(payload),
    onSuccess: () => {
      toast({
        title: 'Email Verified!',
        description: 'Your account is now active. Please log in.',
      });
      // After successful email verification, redirect to the login page
      router.push('/login');
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Verification Failed',
        description: error.message || 'The code is incorrect or has expired.',
      });
    },
  });
}
