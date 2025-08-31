
'use client';

import { UniversalHeader } from '@/components/green-earth/UniversalHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
      <UniversalHeader title="Help & Feedback" showBackButton={true} />
      <main className="p-4">
        <Card>
            <CardHeader>
                <CardTitle>Submit Feedback</CardTitle>
                <CardDescription>
                    Have a suggestion or found a bug? Let us know!
                </CardDescription>
            </CardHeader>
            <CardContent>
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
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
