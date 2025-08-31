
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
      <UniversalHeader title="Security" showBackButton={true} />
      <main className="p-4 space-y-4">
        <Card>
            <CardHeader>
                <CardTitle>Account Security</CardTitle>
                <CardDescription>Manage your account's security settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                    <div className="flex items-center">
                        <KeyRound className="w-5 h-5 mr-3 text-primary"/>
                        <span className="font-medium">Change Password</span>
                    </div>
                    <Button variant="outline">Change</Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                    <div className="flex items-center">
                        <ShieldCheck className="w-5 h-5 mr-3 text-primary"/>
                        <div>
                            <p className="font-medium">Two-Factor Authentication</p>
                            <p className="text-xs text-muted-foreground">Keep your account extra secure.</p>
                        </div>
                    </div>
                    <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
                </div>
                
                 <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                    <div className="flex items-center">
                        <Fingerprint className="w-5 h-5 mr-3 text-primary"/>
                         <div>
                            <p className="font-medium">Biometric Login</p>
                            <p className="text-xs text-muted-foreground">Use Face ID or fingerprint to log in.</p>
                        </div>
                    </div>
                    <Switch checked={biometric} onCheckedChange={setBiometric} />
                </div>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
