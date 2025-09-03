
import RegisterForm from "@/features/auth/components/RegisterForm";
import GoogleButton from "@/features/auth/components/GoogleButton";
import { Separator } from "@/components/ui/separator";

export default function RegisterPage() {
  return (
     <div className="flex min-h-screen items-center justify-center bg-background">
        <main className="w-full max-w-sm p-6 space-y-6">
             <div className="text-center">
                <h1 className="text-2xl font-bold">Create an Account</h1>
                <p className="text-sm text-muted-foreground mt-2">Join us in making a difference.</p>
            </div>
            <RegisterForm />
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
