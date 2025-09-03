
import LoginForm from "@/features/auth/components/LoginForm";
import GoogleButton from "@/features/auth/components/GoogleButton";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <main className="w-full max-w-sm space-y-6">
            <div className="text-center">
                <h1 className="text-2xl font-bold">Welcome Back</h1>
                <p className="text-sm text-muted-foreground mt-2">Sign in to continue your journey.</p>
            </div>
            <LoginForm />
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">OR</span>
                </div>
            </div>
            <GoogleButton />
        </main>
    </div>
  );
}
