
'use client';

import { UniversalHeader } from '@/components/green-earth/UniversalHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Copy } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export default function ReferralPage() {
  const referralCode = 'ALEXG25';
  const referralLink = `https://greenearth.app/join?ref=${referralCode}`;
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
      description: text,
    });
  };

  return (
    <div className="bg-background min-h-screen">
      <UniversalHeader title="Refer a Friend" showBackButton={true} />
      <main className="p-4 space-y-6 text-center">
        <Card>
            <CardHeader>
                <CardTitle>Invite Friends, Earn Points!</CardTitle>
                <CardDescription>Share your referral code and you'll both get 1,000 bonus points when your friend completes their first pickup.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-muted-foreground">Your unique referral code</p>
                <div className="flex items-center justify-center gap-2">
                    <Input value={referralCode} readOnly className="text-center font-bold text-2xl h-14 tracking-widest bg-gray-100" />
                    <Button size="icon" variant="outline" className="h-14 w-14" onClick={() => copyToClipboard(referralCode)}>
                        <Copy className="w-6 h-6" />
                    </Button>
                </div>

                <div className="relative">
                   <div className="absolute inset-0 flex items-center">
                       <span className="w-full border-t" />
                   </div>
                   <div className="relative flex justify-center text-xs uppercase">
                       <span className="bg-background px-2 text-muted-foreground">Or share link</span>
                   </div>
                </div>

                <div className="flex items-center justify-center gap-2">
                    <Input value={referralLink} readOnly className="text-sm text-muted-foreground" />
                     <Button size="icon" variant="outline" onClick={() => copyToClipboard(referralLink)}>
                        <Copy className="w-5 h-5" />
                    </Button>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>How it works</CardTitle>
            </CardHeader>
            <CardContent className="text-left space-y-2 text-sm text-muted-foreground">
                <p>1. Share your code or link with friends.</p>
                <p>2. Your friend signs up using your referral.</p>
                <p>3. After their first successful recycling pickup, you both receive 1,000 points!</p>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
