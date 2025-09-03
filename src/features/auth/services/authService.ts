
import { apiClient } from "@/services/apiClient";
import type { RegisterPayload, LoginPayload, VerifyOtpPayload, ResendOtpPayload, ForgotPasswordPayload, LoginResponse } from "../types";

export const register = (payload: RegisterPayload) =>
  apiClient('/auth/register', { method: 'POST', body: JSON.stringify(payload) });

export const verifyEmail = (payload: VerifyOtpPayload) =>
  apiClient('/auth/verify-email', { method: 'POST', body: JSON.stringify(payload) });

export const login = (payload: LoginPayload): Promise<LoginResponse> =>
  apiClient('/auth/login', { method: 'POST', body: JSON.stringify(payload) });

export const verifyLoginOtp = (payload: VerifyOtpPayload) =>
  apiClient('/auth/verify-login-otp', { method: 'POST', body: JSON.stringify(payload) });

export const resendOtp = (payload: ResendOtpPayload) =>
  apiClient('/auth/resend-otp', { method: 'POST', body: JSON.stringify(payload) });

export const forgotPassword = (payload: ForgotPasswordPayload) =>
  apiClient('/auth/forgot-password', { method: 'POST', body: JSON.stringify(payload) });

export const getCurrentUser = () => apiClient('/auth/me');

export const logout = () => apiClient('/auth/logout', { method: 'POST' });
