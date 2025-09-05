
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { register as registerAPI } from '../services/authService';
import type { RegisterPayload } from '../types';
import { useToast } from '@/hooks/use-toast';

export function useRegister() {
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => registerAPI(payload),
    onSuccess: (_, variables) => {
      toast({
        title: 'Account Created!',
        description: "We've sent a verification code to your email.",
      });
      // Redirect to the OTP verification page after successful registration submission
      router.push(`/verify-email?email=${encodeURIComponent(variables.email)}`);
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Registration Failed',
        description: error.message || 'An unknown error occurred.',
      });
    },
  });
}
