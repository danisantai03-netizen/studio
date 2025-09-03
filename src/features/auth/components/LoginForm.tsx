
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';

import { loginSchema } from '../schemas/authSchemas';
import { login as loginAPI } from '../services/authService';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PasswordField } from './PasswordField';

type FormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(loginSchema) });

  const mutation = useMutation({ 
      mutationFn: loginAPI,
      onSuccess: async (data, variables) => {
        // In our mock, login always succeeds and gives us a "token"
        // In a real app, the backend might respond that OTP is needed.
        // For this mock, we will just proceed to OTP verification.
        router.push(`/verify-login?email=${encodeURIComponent(variables.email)}`);
      },
      onError: (error: Error) => {
        toast({
          variant: 'destructive',
          title: 'Login Failed',
          description: error.message,
        });
        reset({ password: '' });
      }
  });

  const onSubmit = (values: FormValues) => {
    console.debug("[mock] login attempt:", values.email);
    mutation.mutate(values);
  };

  return (
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
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/forgot-password" tabIndex={-1} className="text-sm font-medium text-primary hover:underline">
                Forgot password?
            </Link>
        </div>
        <PasswordField
          id="password"
          autoComplete="current-password"
          aria-invalid={!!errors.password}
          {...register('password')}
        />
        {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Signing in...' : 'Sign In'}
      </Button>
       <p className="text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-medium text-primary hover:underline">
                Sign up
            </Link>
        </p>
    </form>
  );
}
