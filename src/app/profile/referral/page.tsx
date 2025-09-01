
'use client';

import { UniversalHeader } from '@/components/green-earth/UniversalHeader';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { Copy, Share2, Gift, Users } from 'lucide-react';
import Image from 'next/image';

const referralCode = 'ALEXG25';
const referralLink = `https://greenearth.app/join?ref=${referralCode}`;

const referralHistory = [
  { id: 1, name: 'Budi S.', status: 'Completed', points: 1000 },
  { id: 2, name: 'Citra W.', status: 'Pending', points: 0 },
  { id: 3, name: 'David K.', status: 'Completed', points: 1000 },
];
// const referralHistory: any[] = [];


export default function ReferralPage() {
  const { toast } = useToast();

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
      description: `${type} copied: ${text}`,
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join GreenEarth!',
          text: `Join me on GreenEarth and let's make a difference. Use my referral code: ${referralCode}`,
          url: referralLink,
        });
      } catch (error) {
        console.error('Error sharing:', error);
        // Fallback to copy link if share fails
        copyToClipboard(referralLink, 'Link');
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      copyToClipboard(referralLink, 'Link');
    }
  };


  return (
    <div className="bg-background min-h-screen">
      <UniversalHeader title="Refer a Friend" />
      <main className="w-full max-w-full mx-0 px-4 sm:px-6 md:px-8 py-6 space-y-8 pb-24">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-2">
                <Gift className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Invite Friends, Earn Rewards!</h2>
            <p className="text-muted-foreground max-w-md mx-auto">Share your code with friends and you both get points when they join and complete their first pickup.</p>
        </div>

        {/* Reward Info Banner */}
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-center">
            <p className="text-sm text-primary-dark font-medium">
                You and your friend will each get <span className="font-bold text-primary">1,000 bonus points!</span>
            </p>
        </div>

        {/* Referral Code & Link */}
        <div className="space-y-4">
            <div className="p-4 rounded-xl border bg-card space-y-4">
                <p className="text-sm text-muted-foreground text-center">Your unique referral code</p>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                    <span className="text-xl font-bold tracking-widest">{referralCode}</span>
                    <Button size="icon" variant="ghost" className="shrink-0" onClick={() => copyToClipboard(referralCode, 'Code')}>
                        <Copy className="w-5 h-5" />
                    </Button>
                </div>
            </div>
             <div className="p-4 rounded-xl border bg-card space-y-4">
                <p className="text-sm text-muted-foreground text-center">Or share your invite link</p>
                <div className="flex items-center justify-between p-2 pl-4 rounded-lg bg-muted">
                    <span className="text-sm text-muted-foreground truncate">{referralLink}</span>
                    <div className="flex items-center shrink-0">
                        <Button size="icon" variant="ghost" onClick={() => copyToClipboard(referralLink, 'Link')}>
                            <Copy className="w-5 h-5" />
                        </Button>
                         <Button size="icon" variant="ghost" onClick={handleShare}>
                            <Share2 className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>

        {/* Referral History */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold">Referral History</h3>
          {referralHistory.length > 0 ? (
            <div className="border rounded-xl overflow-hidden bg-card">
              <ul className="divide-y">
                {referralHistory.map(ref => (
                  <li key={ref.id} className="flex items-center justify-between p-4">
                    <div>
                      <p className="font-semibold text-sm">{ref.name}</p>
                      <p className={`text-xs ${ref.status === 'Completed' ? 'text-green-600' : 'text-muted-foreground'}`}>{ref.status}</p>
                    </div>
                    <div className={`text-sm font-bold ${ref.points > 0 ? 'text-green-600' : 'text-muted-foreground'}`}>
                      {ref.points > 0 ? `+${ref.points} pts` : '-'}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-center py-12 px-4 border-2 border-dashed rounded-xl">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted mb-4">
                    <Users className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="font-semibold">No Referrals Yet</p>
                <p className="text-sm text-muted-foreground mt-1">Your referral history will appear here.</p>
            </div>
          )}
        </div>

        {/* Floating CTA */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t">
            <Button size="lg" className="w-full h-12" onClick={handleShare}>
                <Share2 className="w-5 h-5 mr-2" />
                Invite More Friends
            </Button>
        </div>

      </main>
    </div>
  );
}
