
'use client';

import { UniversalHeader } from '@/components/green-earth/UniversalHeader';
import { Button } from '@/components/ui/button';
import { Mail, Smartphone } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ChangePasswordPage() {
    const router = useRouter();

    const handleSelection = () => {
        // In a real app, this would trigger an API call to send an OTP
        // and then navigate to an OTP input page.
        // For now, we can just log it and potentially navigate to a placeholder.
        console.log("OTP verification flow would start here.");
        // router.push('/profile/security/verify-otp');
    };

    return (
        <div className="bg-background min-h-screen">
            <UniversalHeader title="Change Password" />
            <main className="w-full max-w-full mx-0 px-4 sm:px-6 md:px-8 py-6">
                <div className="text-center mb-8">
                    <h2 className="text-xl font-bold">Verify Your Identity</h2>
                    <p className="text-muted-foreground mt-1">
                        To protect your account, please select a verification method.
                    </p>
                </div>
                <div className="space-y-4">
                    <button onClick={handleSelection} className="w-full p-4 border rounded-xl flex items-center gap-4 text-left transition-colors hover:bg-muted/50">
                        <div className="grid place-items-center w-10 h-10 bg-primary/10 rounded-lg">
                           <Mail className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <p className="font-semibold text-sm">Send code via Email</p>
                            <p className="text-xs text-muted-foreground">alex.gr***@example.com</p>
                        </div>
                    </button>
                    <button onClick={handleSelection} className="w-full p-4 border rounded-xl flex items-center gap-4 text-left transition-colors hover:bg-muted/50">
                       <div className="grid place-items-center w-10 h-10 bg-primary/10 rounded-lg">
                           <Smartphone className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <p className="font-semibold text-sm">Send code via SMS</p>
                            <p className="text-xs text-muted-foreground">+62 *** **** 7890</p>
                        </div>
                    </button>
                </div>
            </main>
        </div>
    );
}
