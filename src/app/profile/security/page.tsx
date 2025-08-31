
'use client';

import { UniversalHeader } from '@/components/green-earth/UniversalHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { KeyRound, ShieldCheck, Fingerprint } from 'lucide-react';
import React from 'react';

export default function SecurityPage() {
    const [twoFactor, setTwoFactor] = React.useState(true);
    const [biometric, setBiometric] = React.useState(false);

  return (
    <div className="bg-background min-h-screen">
      <UniversalHeader title="Security" />
      <main className="w-full max-w-full mx-0 px-4 sm:px-6 md:px-8 py-4">
        <div className="bg-card rounded-xl shadow-sm divide-y divide-border">
            <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <KeyRound className="w-5 h-5 text-primary"/>
                    <span className="font-medium text-sm">Change Password</span>
                </div>
                <Button variant="outline" size="sm">Change</Button>
            </div>

            <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-primary"/>
                    <div>
                        <p className="font-medium text-sm">Two-Factor Authentication</p>
                        <p className="text-xs text-muted-foreground">Keep your account extra secure.</p>
                    </div>
                </div>
                <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
            </div>
            
             <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Fingerprint className="w-5 h-5 text-primary"/>
                     <div>
                        <p className="font-medium text-sm">Biometric Login</p>
                        <p className="text-xs text-muted-foreground">Use Face ID or fingerprint.</p>
                    </div>
                </div>
                <Switch checked={biometric} onCheckedChange={setBiometric} />
            </div>
        </div>
      </main>
    </div>
  );
}
