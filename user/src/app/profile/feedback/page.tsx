
'use client';

import * as React from 'react';
import { UniversalHeader } from '@/components/green-earth/UniversalHeader';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, MessageCircle } from 'lucide-react';
import useUserStore from '@/hooks/useUserStore';

const faqItems = [
  {
    question: "How do I schedule a pickup?",
    answer: "You can schedule a pickup from the home screen by selecting a waste category, estimating the weight, and confirming your address. Our partner will be assigned to you shortly."
  },
  {
    question: "How are points calculated?",
    answer: "Points are calculated based on the type and weight of the recyclable materials you provide. Each category has a different point value per kilogram, which you can see on the scheduling page."
  },
  {
    question: "How do I withdraw my earnings?",
    answer: "You can withdraw your earnings from the 'Points Dashboard' on the home screen. Select the 'Withdraw' option and follow the steps to transfer the funds to your linked e-wallet or bank account."
  },
  {
    question: "What if my pickup is missed?",
    answer: "If a scheduled pickup is missed, please contact our support team through the 'Email Support' or 'WhatsApp' buttons below. We will reschedule your pickup as soon as possible."
  },
  {
    question: "Can I change my pickup address?",
    answer: "Yes, you can change your pickup address in the 'Edit Profile' section. Please ensure your address is updated before scheduling a new pickup."
  },
  {
    question: "How do I contact customer support?",
    answer: "You can reach us via the 'Email Support' or 'WhatsApp' buttons at the bottom of this page. We're here to help!"
  }
];

const SUPPORT_EMAIL = "support@greenearth.app";
const SUPPORT_WHATSAPP_NUMBER = "+6281234567890";

export default function FeedbackPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { userId } = useUserStore();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.log("Feedback Submitted:", data);

    toast({
        title: "Feedback Submitted!",
        description: "Thank you for helping us improve GreenEarth.",
    });
    (e.target as HTMLFormElement).reset();
  };

  const handleEmailSupport = () => {
    const subject = `Support Request (User ID: ${userId})`;
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}`;
  };

  const handleWhatsAppSupport = () => {
    const text = `Support Request (User ID: ${userId})`;
    window.open(`https://wa.me/${SUPPORT_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="bg-background min-h-screen">
      <UniversalHeader title="Help & Feedback" />
      <main className="w-full max-w-full mx-0 px-4 sm:px-6 md:px-8 py-6 space-y-8">
        
        <div className="space-y-3">
          <h2 className="text-lg font-bold">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`} className={index === faqItems.length - 1 ? 'border-b-0' : ''}>
                <AccordionTrigger className="text-left text-sm py-3">{item.question}</AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-bold">Submit Feedback</h2>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="category">Category</Label>
              <Select name="category" required>
                <SelectTrigger id="category"><SelectValue placeholder="Select a category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="bug">Bug Report</SelectItem>
                  <SelectItem value="feature_request">Feature Request</SelectItem>
                  <SelectItem value="billing">Billing Issue</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" name="subject" placeholder="e.g., Issue with point calculation" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="message">Your Message</Label>
              <Textarea id="message" name="message" placeholder="Describe your feedback in detail..." rows={5} required />
            </div>
            <Button type="submit" className="w-full">Submit Feedback</Button>
          </form>
        </div>

        <div className="space-y-3">
            <h2 className="text-lg font-bold">Contact Support</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button variant="outline" size="lg" className="h-14 justify-start" onClick={handleEmailSupport}>
                    <Mail className="mr-3 h-5 w-5" />
                    Email Support
                </Button>
                <Button variant="outline" size="lg" className="h-14 justify-start" onClick={handleWhatsAppSupport}>
                    <MessageCircle className="mr-3 h-5 w-5" />
                    WhatsApp
                </Button>
            </div>
        </div>

      </main>
    </div>
  );
}
