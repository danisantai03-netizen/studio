
'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { otpSchema } from '../schemas/authSchemas';
import { verifyEmail, verifyLoginOtp, resendOtp } from '../services/authService';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type Values = z.infer<typeof otpSchema>;
type Mode = 'register' | 'login';

const MOCK_OTP = "123456";

// A custom OTP input component
const OtpInput = ({ length = 6, onOtpChange }: { length?: number; onOtpChange: (otp: string) => void }) => {
  const [values, setValues] = useState(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value;
    if (!/^[0-9]$/.test(value) && value !== '') return;

    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
    onOtpChange(newValues.join(''));

    if (value !== '' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').slice(0, length);
    if (/^\d+$/.test(paste)) {
        const newValues = paste.split('').concat(Array(length).fill('')).slice(0, length);
        setValues(newValues);
        onOtpChange(newValues.join(''));
        const nextFocusIndex = Math.min(length - 1, paste.length);
        inputRefs.current[nextFocusIndex]?.focus();
    }
  };

  useEffect(() => {
    // Autofill with mock OTP in development
    if (process.env.NODE_ENV === 'development') {
        const mockValues = MOCK_OTP.split('');
        setValues(mockValues);
        onOtpChange(MOCK_OTP);
        // Focus the last input for quick submission
        inputRefs.current[length - 1]?.focus();
    }
  }, [onOtpChange, length]);

  return (
    <div className="flex justify-center gap-2" onPaste={handlePaste}>
      {values.map((digit, index) => (
        <Input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target as HTMLInputElement, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-12 h-14 text-center text-2xl font-bold"
          aria-label={`Digit ${index + 1}`}
        />
      ))}
    </div>
  );
};


export default function OtpForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const params = useSearchParams();
  const { toast } = useToast();
  const email = params.get('email') || '';

  const { handleSubmit, setValue, control, formState: { errors, isSubmitting } } =
    useForm<Values>({
      resolver: zodResolver(otpSchema),
      defaultValues: { email, otp: '' },
    });

  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setInterval(() => {
        setSeconds(s => s - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [seconds]);

  const verifyMutation = useMutation({
    mutationFn: (payload: Values) => mode === 'register' ? verifyEmail(payload) : verifyLoginOtp(payload),
    onSuccess: async () => {
      toast({ title: mode === 'register' ? 'Account Verified!' : 'Login Successful!', description: mode === 'register' ? 'Please log in to continue.' : 'Welcome back!' });
      if (mode === 'login') {
          await queryClient.invalidateQueries({ queryKey: ['user']});
      }
      router.push(mode === 'register' ? '/login' : '/');
    },
    onError: (error: Error) => {
      toast({ variant: 'destructive', title: 'Verification Failed', description: error.message });
    }
  });

  const resendMutation = useMutation({
    mutationFn: () => resendOtp({ email, context: mode }),
    onSuccess: () => {
      toast({ title: 'New Code Sent', description: 'A new OTP has been sent to your email.' });
      setSeconds(60);
      if (process.env.NODE_ENV === 'development') {
        setValue('otp', MOCK_OTP); // Refill on resend for dev
      }
    },
    onError: (error: Error) => {
        toast({ variant: 'destructive', title: 'Failed to Resend', description: error.message });
    }
  });

  const onSubmit = (v: Values) => {
    verifyMutation.mutate(v);
  };
  
  if (!email) {
      return (
        <div className="text-center text-destructive">
            <p>Email parameter is missing. Please go back and try again.</p>
             <Button onClick={() => router.push(mode === 'register' ? '/register' : '/login')} className="mt-4">
                Go Back
            </Button>
        </div>
      );
  }

  return (
    <div className="space-y-6">
        <p className="text-center text-sm text-muted-foreground">
            Enter the 6-digit code we sent to <br /> <b className="text-foreground">{email}</b>
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input name="email" type="hidden" value={email} />
        <Controller
            name="otp"
            control={control}
            render={({ field }) => (
                <OtpInput onOtpChange={field.onChange} />
            )}
        />
        {errors.otp && <p className="text-sm text-destructive text-center pt-2">{errors.otp.message}</p>}
        
        <Button type="submit" disabled={isSubmitting || verifyMutation.isPending} className="w-full">
            {isSubmitting || verifyMutation.isPending ? 'Verifying...' : 'Verify'}
        </Button>
        </form>
         <div className="text-center">
            <Button
                type="button"
                variant="link"
                disabled={seconds > 0 || resendMutation.isPending}
                onClick={() => resendMutation.mutate()}
                className="text-sm disabled:opacity-50"
                aria-disabled={seconds > 0}
            >
                {resendMutation.isPending 
                    ? "Sending..." 
                    : seconds > 0 
                    ? `Resend code in ${seconds}s` 
                    : "Resend code"}
            </Button>
        </div>
    </div>
  );
}
