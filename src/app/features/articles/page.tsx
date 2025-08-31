
'use client';

import { UniversalHeader } from '@/components/green-earth/UniversalHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

const articles = [
  { id: 1, title: '5 Simple Ways to Reduce Plastic Waste at Home', excerpt: 'Start your journey to a plastic-free life with these easy-to-follow tips...', image: 'https://picsum.photos/400/200?random=4', aiHint: 'plastic waste reduction', author: 'Jane Doe', date: 'Oct 28, 2023' },
  { id: 2, title: 'The Surprising Benefits of Composting', excerpt: 'Discover how your kitchen scraps can transform your garden and the planet.', image: 'https://picsum.photos/400/200?random=5', aiHint: 'compost bin', author: 'John Smith', date: 'Oct 25, 2023' },
  { id: 3, title: 'Understanding Recycling Symbols: What Do They Really Mean?', excerpt: 'A comprehensive guide to decoding the symbols on packaging.', image: 'https://picsum.photos/400/200?random=6', aiHint: 'recycling symbols', author: 'Emily White', date: 'Oct 22, 2023' },
];

export default function ArticlesPage() {
  return (
    <div className="bg-background min-h-screen">
      <UniversalHeader title="Articles" showBackButton={true} />
      <main className="p-4 space-y-4">
        {articles.map((article) => (
          <Link href="#" key={article.id}>
            <Card className="flex flex-col md:flex-row overflow-hidden transition-all duration-200 hover:shadow-lg">
              <div className="md:w-1/3 h-40 md:h-auto relative">
                <Image src={article.image} alt={article.title} fill className="object-cover" data-ai-hint={article.aiHint} />
              </div>
              <div className="md:w-2/3">
                <CardHeader>
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{article.excerpt}</CardDescription>
                  <p className="text-xs text-muted-foreground mt-2">{article.author} • {article.date}</p>
                </CardContent>
              </div>
            </Card>
          </Link>
        ))}
      </main>
    </div>
  );
}
