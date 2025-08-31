
'use client';

import { UniversalHeader } from '@/components/green-earth/UniversalHeader';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';

export default function FeedbackPage() {
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
        title: "Feedback Submitted!",
        description: "Thank you for helping us improve GreenEarth.",
    });
    router.push('/profile');
  };

  return (
    <div className="bg-background min-h-screen">
      <UniversalHeader title="Help & Feedback" />
      <main className="w-full max-w-full mx-0 px-4 sm:px-6 md:px-8 py-4">
        <div className="text-center mb-6">
            <h2 className="text-xl font-bold">Submit Feedback</h2>
            <p className="text-muted-foreground">
                Have a suggestion or found a bug? Let us know!
            </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="e.g., Feature Request for..." required />
            </div>
             <div className="space-y-2">
                <Label htmlFor="message">Your Message</Label>
                <Textarea id="message" placeholder="Describe your feedback in detail..." rows={6} required/>
            </div>
            <Button type="submit" className="w-full">Submit Feedback</Button>
        </form>
      </main>
    </div>
  );
}
