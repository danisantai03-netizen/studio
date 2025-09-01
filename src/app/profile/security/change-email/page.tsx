
'use client';

import { UniversalHeader } from '@/components/green-earth/UniversalHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ChangeEmailPage() {
    // This is a placeholder page.
    // A real implementation would involve OTP verification first.
    return (
        <div className="bg-background min-h-screen">
            <UniversalHeader title="Change Email" />
            <main className="w-full max-w-full mx-0 px-4 sm:px-6 md:px-8 py-6 space-y-6">
                 <div className="text-center">
                    <h2 className="text-xl font-bold">Enter New Email</h2>
                    <p className="text-muted-foreground mt-1">
                        After changing, you will be logged out and need to log in with your new email.
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="new-email">New Email Address</Label>
                        <Input id="new-email" type="email" placeholder="Enter your new email" />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="password">Confirm with Password</Label>
                        <Input id="password" type="password" placeholder="Enter your current password" />
                    </div>
                </div>
                <Button className="w-full">Update Email</Button>
            </main>
        </div>
    );
}
