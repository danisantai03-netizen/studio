
'use client';

import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { UniversalHeader } from '@/components/green-earth/UniversalHeader';
import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { getWithdrawalDetails } from '@/features/withdraw/services/withdrawService';
import { Skeleton } from '@/components/ui/skeleton';

type Status = 'Success' | 'In Progress' | 'Failed';

const statusConfig: Record<Status, { text: string; color: string; icon: React.ElementType }> = {
  'In Progress': { text: 'Diproses', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300', icon: AlertCircle },
  'Success': { text: 'Berhasil', color: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300', icon: CheckCircle2 },
  'Failed': { text: 'Gagal', color: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300', icon: XCircle },
};

const DetailRow = ({ label, value }: { label: string; value: string | number }) => (
    <div className="flex justify-between py-3">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold text-foreground text-right">{value}</p>
    </div>
);

const WithdrawDetailSkeleton = () => (
    <div className="w-full max-w-full mx-0 px-4 sm:px-6 md:px-8 py-6 space-y-6">
        <section className="text-center py-4 space-y-2">
            <Skeleton className="h-6 w-1/2 mx-auto" />
            <Skeleton className="h-10 w-3/4 mx-auto" />
            <Skeleton className="h-8 w-1/3 mx-auto rounded-full" />
        </section>
        <section className="divide-y divide-border/60 border-t border-b py-2 space-y-3">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="flex justify-between py-3">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
            ))}
        </section>
    </div>
);

export default function WithdrawDetailPage() {
  const router = useRouter();
  const params = useParams();
  const withdrawId = params.withdrawId as string;

  const { data: details, isLoading, isError } = useQuery({
    queryKey: ['withdrawDetails', withdrawId],
    queryFn: () => getWithdrawalDetails(withdrawId),
    enabled: !!withdrawId,
  });

  if (isLoading) {
      return (
          <div className="bg-background min-h-screen">
              <UniversalHeader title="Detail Penarikan" />
              <main><WithdrawDetailSkeleton /></main>
          </div>
      );
  }

  if (isError || !details) {
      return (
          <div className="bg-background min-h-screen">
              <UniversalHeader title="Error" />
              <main className="p-4 text-center">Tidak dapat mengambil detail penarikan.</main>
          </div>
      );
  }
  
  const { status, amount, fullName, accountNumber, method, date } = details;
  const currentStatus = statusConfig[status as Status];
  const Icon = currentStatus.icon;

  return (
    <div className="bg-background min-h-screen">
      <UniversalHeader title="Detail Penarikan" />
      <main className="w-full max-w-full mx-0 px-4 sm:px-6 md:px-8 py-6 space-y-6">
        
        <section className="text-center py-4">
            <p className="text-sm text-muted-foreground">Jumlah Penarikan</p>
            <p className="text-4xl font-bold mt-1">Rp{amount.toLocaleString('id-ID')}</p>
            <div className={`mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${currentStatus.color}`}>
                <Icon className="h-4 w-4" />
                {currentStatus.text}
            </div>
        </section>

        <section className="divide-y divide-border/60 border-t border-b py-2">
            <DetailRow label="ID Penarikan" value={withdrawId} />
            <DetailRow label="Nama Lengkap" value={fullName} />
            <DetailRow label="Nomor Rekening" value={accountNumber} />
            <DetailRow label="Metode Pembayaran" value={method} />
            <DetailRow label="Tanggal" value={format(new Date(date), 'd MMMM yyyy')} />
            <DetailRow label="Waktu" value={format(new Date(date), 'HH:mm:ss')} />
        </section>
        
        <div className="pt-4">
            <Button size="lg" variant="outline" className="w-full h-12" onClick={() => router.push('/')}>
                Kembali ke Beranda
            </Button>
        </div>

      </main>
    </div>
  );
}
