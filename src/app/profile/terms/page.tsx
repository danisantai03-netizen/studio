
'use client';

import { UniversalHeader } from '@/components/green-earth/UniversalHeader';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function TermsPage() {
  return (
    <div className="bg-background min-h-screen">
      <UniversalHeader title="Terms & Conditions" showBackButton={true} />
      <main className="p-4">
        <div className="prose dark:prose-invert max-w-full text-sm text-muted-foreground">
            <p className="mb-4">Last updated: August 31, 2024</p>
            <p className="mb-6">
                Welcome to GreenEarth! These terms and conditions outline the rules and regulations for the use of GreenEarth's Application, located at greenearth.app. By accessing this app we assume you accept these terms and conditions. Do not continue to use GreenEarth if you do not agree to take all of the terms and conditions stated on this page.
            </p>

            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="font-semibold text-foreground">1. Accounts</AccordionTrigger>
                    <AccordionContent>
                        When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="font-semibold text-foreground">2. Recycling Pickups</AccordionTrigger>
                    <AccordionContent>
                        You agree that the valuation of recyclable materials (points and monetary value) is subject to verification by our pickup partners. The estimated earnings are not guaranteed and will be finalized based on the actual weight and condition of the items.
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-3">
                    <AccordionTrigger className="font-semibold text-foreground">3. User Conduct</AccordionTrigger>
                    <AccordionContent>
                        You must not use this application for any unlawful purpose. You must not misuse the referral system or attempt to manipulate the points system in any way.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger className="font-semibold text-foreground">4. Termination</AccordionTrigger>
                    <AccordionContent>
                        We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
      </main>
    </div>
  );
}
