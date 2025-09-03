
'use client';

import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { UniversalHeader } from '@/components/green-earth/UniversalHeader';
import { cn } from '@/lib/utils';
import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';

type Status = 'Success' | 'In Progress' | 'Failed';

const statusConfig: Record<Status, { text: string; color: string; icon: React.ElementType }> = {
  'In Progress': { text: 'In Progress', color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle },
  'Success': { text: 'Success', color: 'bg-green-100 text-green-800', icon: CheckCircle2 },
  'Failed': { text: 'Failed', color: 'bg-red-100 text-red-800', icon: XCircle },
};

const DetailRow = ({ label, value }: { label: string; value: string | number }) => (
    <div className="flex justify-between py-3">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold text-foreground text-right">{value}</p>
    </div>
);


export default function WithdrawDetailPage() {
  const router = useRouter();
  const params = useParams();
  const withdrawId = params.withdrawId as string;

  // In a real app, you would fetch this data based on the withdrawId
  const mockData = {
    status: 'In Progress' as Status,
    amount: 100000,
    fullName: 'Alex Green',
    accountNumber: '081234567890',
    method: 'DANA',
    date: new Date(),
  };
  
  const { status, amount, fullName, accountNumber, method, date } = mockData;
  const currentStatus = statusConfig[status];
  const Icon = currentStatus.icon;

  return (
    <div className="bg-background min-h-screen">
      <UniversalHeader title="Withdraw Details" />
      <main className="w-full max-w-full mx-0 px-4 sm:px-6 md:px-8 py-6 space-y-6">
        
        <section className="text-center py-4">
            <p className="text-sm text-muted-foreground">Withdraw Amount</p>
            <p className="text-4xl font-bold mt-1">Rp{amount.toLocaleString('id-ID')}</p>
            <div className={`mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${currentStatus.color}`}>
                <Icon className="h-4 w-4" />
                {currentStatus.text}
            </div>
        </section>

        <section className="divide-y divide-border/60 border-t border-b py-2">
            <DetailRow label="Withdraw ID" value={withdrawId} />
            <DetailRow label="Full Name" value={fullName} />
            <DetailRow label="Account Number" value={accountNumber} />
            <DetailRow label="Payment Method" value={method} />
            <DetailRow label="Date" value={format(date, 'd MMMM yyyy')} />
            <DetailRow label="Time" value={format(date, 'HH:mm:ss')} />
        </section>
        
        <div className="pt-4">
            <Button size="lg" variant="outline" className="w-full h-12" onClick={() => router.push('/')}>
                Back to Home
            </Button>
        </div>

      </main>
    </div>
  );
}
