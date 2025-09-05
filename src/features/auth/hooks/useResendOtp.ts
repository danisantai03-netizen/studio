
import { useMutation } from '@tanstack/react-query';
import { resendOtp as resendOtpAPI } from '../services/authService';
import { useToast } from '@/hooks/use-toast';

interface ResendOtpPayload {
  email: string;
  context: 'register' | 'login';
}

export function useResendOtp() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (payload: ResendOtpPayload) => resendOtpAPI(payload),
    onSuccess: () => {
      toast({
        title: 'New Code Sent',
        description: 'A new one-time password has been sent to your email.',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Failed to Resend Code',
        description: error.message || 'Please try again in a moment.',
      });
    },
  });
}
