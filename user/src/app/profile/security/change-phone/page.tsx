
'use client';

import { UniversalHeader } from '@/components/green-earth/UniversalHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ChangePhonePage() {
    // This is a placeholder page.
    // A real implementation would involve OTP verification first.
    return (
        <div className="bg-background min-h-screen">
            <UniversalHeader title="Change Phone Number" />
            <main className="w-full max-w-full mx-0 px-4 sm:px-6 md:px-8 py-6 space-y-6">
                 <div className="text-center">
                    <h2 className="text-xl font-bold">Enter New Phone Number</h2>
                    <p className="text-muted-foreground mt-1">
                       A verification code will be sent to your new number.
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="new-phone">New Phone Number</Label>
                        <div className="flex items-center">
                           <span className="inline-flex items-center px-3 h-12 rounded-l-md border border-r-0 border-input bg-gray-100 text-sm dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600">+62</span>
                           <Input id="new-phone" type="tel" placeholder="81234567890" className="rounded-l-none" />
                        </div>
                    </div>
                     <div className="space-y-1.5">
                        <Label htmlFor="password">Confirm with Password</Label>
                        <Input id="password" type="password" placeholder="Enter your current password" />
                    </div>
                </div>
                <Button className="w-full">Update Phone Number</Button>
            </main>
        </div>
    );
}
