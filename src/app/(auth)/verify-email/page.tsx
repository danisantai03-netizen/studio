
'use client';
import OtpForm from "@/features/auth/components/OtpForm";
import { Suspense } from "react";

function VerifyEmailContent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <main className="w-full max-w-sm p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Verify Your Email</h1>
        </div>
        <OtpForm mode="register" />
      </main>
    </div>
  );
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyEmailContent />
        </Suspense>
    );
}
