
'use client';

import { UniversalHeader } from '@/components/green-earth/UniversalHeader';
import { Button } from '@/components/ui/button';
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
      <UniversalHeader title="Refer a Friend" />
      <main className="w-full max-w-full mx-0 px-4 sm:px-6 md:px-8 py-6 space-y-6 text-center">
        <div className="py-4">
            <h2 className="text-xl font-bold">Invite Friends, Earn Points!</h2>
            <p className="text-muted-foreground mt-1">Share your referral code and you'll both get 1,000 bonus points when your friend completes their first pickup.</p>
        </div>
        
        <div className="space-y-4 p-4 rounded-xl border bg-card">
            <p className="text-muted-foreground text-sm">Your unique referral code</p>
            <div className="flex items-center justify-center gap-2">
                <Input value={referralCode} readOnly className="text-center font-bold text-2xl h-14 tracking-widest bg-muted" />
                <Button size="icon" variant="outline" className="h-14 w-14" onClick={() => copyToClipboard(referralCode)}>
                    <Copy className="w-6 h-6" />
                </Button>
            </div>

            <div className="relative py-2">
               <div className="absolute inset-0 flex items-center">
                   <span className="w-full border-t" />
               </div>
               <div className="relative flex justify-center text-xs uppercase">
                   <span className="bg-card px-2 text-muted-foreground">Or share link</span>
               </div>
            </div>

            <div className="flex items-center justify-center gap-2">
                <Input value={referralLink} readOnly className="text-sm text-muted-foreground" />
                 <Button size="icon" variant="outline" onClick={() => copyToClipboard(referralLink)}>
                    <Copy className="w-5 h-5" />
                </Button>
            </div>
        </div>

        <div className="text-left space-y-3 p-4 rounded-xl border bg-card">
            <h3 className="font-semibold">How it works</h3>
            <p className="text-sm text-muted-foreground">1. Share your code or link with friends.</p>
            <p className="text-sm text-muted-foreground">2. Your friend signs up using your referral.</p>
            <p className="text-sm text-muted-foreground">3. After their first successful recycling pickup, you both receive 1,000 points!</p>
        </div>
      </main>
    </div>
  );
}
