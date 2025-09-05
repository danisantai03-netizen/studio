
'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { forgotPassword as forgotPasswordAPI } from '@/features/auth/services/authService';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
});
type FormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const [isSuccess, setIsSuccess] = React.useState(false);
  const [submittedEmail, setSubmittedEmail] = React.useState('');

  const mutation = useMutation({
    mutationFn: forgotPasswordAPI,
    onSuccess: (_, variables) => {
      setIsSuccess(true);
      setSubmittedEmail(variables.email);
      reset();
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'An Error Occurred',
        description: error.message,
      });
    },
  });

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values);
  };

  if (isSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <main className="w-full max-w-sm p-6 text-center space-y-4">
            <h1 className="text-xl font-bold">Check Your Email</h1>
            <p className="text-muted-foreground text-sm">
                We&apos;ve sent password reset instructions to <b>{submittedEmail}</b> if an account with that email exists.
            </p>
            <Button asChild className="w-full">
                <Link href="/login">Back to Login</Link>
            </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
        <main className="w-full max-w-sm p-6 space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Forgot Password</h1>
            <p className="text-sm text-muted-foreground mt-2">No worries, we&apos;ll send you reset instructions.</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                aria-invalid={!!errors.email}
                {...register('email')}
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Sending...' : 'Send Instructions'}
            </Button>
          </form>
           <p className="text-center text-sm">
                <Link href="/login" className="font-medium text-primary hover:underline">
                    Back to Login
                </Link>
            </p>
        </main>
    </div>
  );
}
