
import { addUser, findByCredentials } from "@/mocks/mockStore";
import type { RegisterPayload, LoginPayload, VerifyOtpPayload, ResendOtpPayload, ForgotPasswordPayload, LoginResponse } from "../types";

// NOTE: This file implements a MOCK auth service that uses localStorage.
// It is for development and testing purposes only.

// MOCK IMPLEMENTATIONS

export const register = async (payload: RegisterPayload) => {
  console.log("Attempting to register user with mock service:", payload.email);
  const newUser = addUser({
    name: payload.fullName,
    email: payload.email,
    password: payload.password, // Storing plaintext password for mock only
    referralCode: payload.referral || `REF${Date.now()}`
  });
  console.log("User registered in mock store:", newUser);
  // In mock mode, we just return a success-like object.
  // The backend would handle sending an OTP email.
  return { message: 'Registration successful. Please verify your email.' };
};

export const verifyEmail = async (payload: VerifyOtpPayload) => {
  // Mock OTP verification always succeeds with the magic code
  if (payload.otp === '123456') {
    return { message: 'Email verified successfully.' };
  }
  throw new Error('Invalid or expired OTP.');
};

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  console.log("Attempting to login user with mock service:", payload.email);
  const user = findByCredentials(payload.email, payload.password);
  
  if (!user) {
    // Simulate network delay to prevent timing attacks
    await new Promise(resolve => setTimeout(resolve, 500));
    throw new Error('Invalid credentials');
  }

  console.log("User found in mock store:", user);

  // In our mock, login just means we move to the OTP step.
  // In a real app, this might set a temporary token.
  // The `LoginResponse` expects an `otpRequired` field.
  // For our mock flow, it's always required.
  return { otpRequired: true };
};

export const verifyLoginOtp = async (payload: VerifyOtpPayload) => {
  // Mock OTP verification for login
  if (payload.otp === '123456') {
    // In a real app, the backend would set a session cookie.
    // Here we simulate it by setting a value in localStorage.
    // This is NOT secure for production.
    if (typeof window !== 'undefined') {
        const user = findByCredentials(payload.email, ""); // We need the user data again. This is a flaw in this mock design but works.
        const users = JSON.parse(localStorage.getItem("mock_users_v1") || "[]");
        const storedUser = users.find((u: any) => u.email === payload.email.toLowerCase());
        
        if (storedUser) {
            localStorage.setItem("session_token", `mock_token_${storedUser.id}`);
            // Let tanstack-query know the user has changed
        }
    }
    return { message: 'Login successful' };
  }
  throw new Error('Invalid or expired OTP.');
};

export const resendOtp = async (payload: ResendOtpPayload) => {
  // Mock resend OTP
  console.log(`Resending OTP for ${payload.email} with context: ${payload.context}`);
  return { message: 'A new OTP has been sent.' };
};

export const forgotPassword = async (payload: ForgotPasswordPayload) => {
  console.log(`Password reset requested for: ${payload.email}`);
  return { message: 'If an account with that email exists, a password reset link has been sent.' };
};

export const getCurrentUser = async () => {
    // Mock `me` endpoint.
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("session_token");
        if (token && token.startsWith("mock_token")) {
             const users = JSON.parse(localStorage.getItem("mock_users_v1") || "[]");
             // This is a crude way to get the user from the mock token.
             const userId = token.split("_")[2];
             const user = users.find((u: any) => u.id === userId);
             if (user) {
                 return {
                    userId: user.id,
                    name: user.name,
                    email: user.email,
                    avatarUrl: '/assets/avatars/alex-green.jpg', // mock avatar
                    balance: 137000, // mock balance
                    points: 1370, // mock points
                 }
             }
        }
    }
    throw new Error("Not authenticated");
};

export const logout = async () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("session_token");
    }
    return { success: true };
};
