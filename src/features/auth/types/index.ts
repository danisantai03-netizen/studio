
import type { z } from 'zod';
import type { registerSchema, loginSchema, otpSchema } from '../schemas/authSchemas';

export type RegisterPayload = Omit<z.infer<typeof registerSchema>, 'confirmPassword'>;

export type LoginPayload = z.infer<typeof loginSchema>;

export type VerifyOtpPayload = z.infer<typeof otpSchema>;

export interface ResendOtpPayload {
  email: string;
  context: 'register' | 'login';
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface LoginResponse {
  otpRequired: boolean;
}
