// recycling-tips.ts
'use server';
/**
 * @fileOverview Provides daily recycling tips to users.
 *
 * - getRecyclingTip - A function that returns a recycling tip.
 * - RecyclingTipInput - The input type for the getRecyclingTip function.
 * - RecyclingTipOutput - The return type for the getRecyclingTip function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecyclingTipInputSchema = z.object({
  userContext: z
    .string()
    .optional()
    .describe(
      'Optional information about the user, which can be used to tailor the recycling tip.  For example, their location or current recycling habits.'
    ),
});
export type RecyclingTipInput = z.infer<typeof RecyclingTipInputSchema>;

const RecyclingTipOutputSchema = z.object({
  tip: z.string().describe('A helpful and actionable recycling tip.'),
});
export type RecyclingTipOutput = z.infer<typeof RecyclingTipOutputSchema>;

export async function getRecyclingTip(input: RecyclingTipInput): Promise<RecyclingTipOutput> {
  return recyclingTipFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recyclingTipPrompt',
  input: {schema: RecyclingTipInputSchema},
  output: {schema: RecyclingTipOutputSchema},
  prompt: `You are an expert in recycling and environmental sustainability. Your job is to provide users with daily, actionable recycling tips.

  The tip should be easy to understand and implement in their daily lives. Make sure the tip is helpful and relevant.

  Here is some optional context about the user: {{{userContext}}}
  `,
});

const recyclingTipFlow = ai.defineFlow(
  {
    name: 'recyclingTipFlow',
    inputSchema: RecyclingTipInputSchema,
    outputSchema: RecyclingTipOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
