
'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { UniversalHeader } from '@/components/green-earth/UniversalHeader';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTransactionDetails } from '@/features/pickup/services/pickupService';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

const DetailRow = ({ label, value, valueClassName }: { label: string, value: string | number, valueClassName?: string }) => (
  <div className="flex justify-between items-center py-3">
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className={cn("text-sm font-medium text-foreground text-right", valueClassName)}>{value}</p>
  </div>
);

const TransactionDetailsSkeleton = () => (
    <div className="w-full max-w-full mx-0 px-4 sm:px-6 md:px-8 py-6 space-y-6">
        <Skeleton className="w-full aspect-video rounded-lg" />
        <div className="space-y-2">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
        </div>
        <Separator />
        <div className="space-y-2">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
        </div>
    </div>
);


export default function TransactionDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const tripId = params.tripId as string;
  
  const { data: transaction, isLoading, isError } = useQuery({
    queryKey: ['transactionDetails', tripId],
    queryFn: () => getTransactionDetails(tripId),
    enabled: !!tripId,
  });

  if (isLoading) {
    return (
        <div className="bg-background min-h-screen">
          <UniversalHeader title="Detail Penjualan" />
          <main><TransactionDetailsSkeleton /></main>
        </div>
    );
  }

  if (isError || !transaction) {
    return (
      <div className="bg-background min-h-screen">
        <UniversalHeader title="Transaksi Tidak Ditemukan" />
        <main className="p-4 text-center">
          <p>Rincian transaksi tidak dapat ditemukan.</p>
        </main>
      </div>
    );
  }

  const { grossEarnings, serviceFee, netEarnings } = {
      grossEarnings: transaction.weight * transaction.pricePerKg,
      serviceFee: (transaction.weight * transaction.pricePerKg) * 0.1,
      netEarnings: (transaction.weight * transaction.pricePerKg) * 0.9,
  };
  
  const pickupDate = new Date(transaction.pickupDate);

  return (
    <div className="bg-background min-h-screen">
      <UniversalHeader title="Detail Penjualan" />
      <main className="w-full max-w-full mx-0 px-4 sm:px-6 md:px-8 py-6">
        <div className="space-y-6">
          
          {transaction.itemPhotoUrl && (
            <div className="w-full aspect-video relative rounded-lg overflow-hidden">
                <Image 
                    src={transaction.itemPhotoUrl} 
                    alt="Uploaded item photo" 
                    fill 
                    className="object-cover"
                    data-ai-hint="recycled items"
                />
            </div>
          )}

          <div>
            <h2 className="text-lg font-bold mb-2">Informasi Penjemputan</h2>
            <div className="divide-y divide-border/60">
              <DetailRow label="ID Transaksi" value={transaction.transactionId} />
              <DetailRow label="Tanggal Penjemputan" value={format(pickupDate, 'EEEE, dd MMMM yyyy')} />
              <DetailRow label="Waktu" value={format(pickupDate, 'HH:mm')} />
            </div>
          </div>
          
           <Separator />

          <div>
            <h2 className="text-lg font-bold mb-2">Rincian Pendapatan</h2>
            <div className="divide-y divide-border/60">
                <DetailRow label="Kategori" value={transaction.category} />
                <DetailRow label="Berat Terverifikasi" value={`${transaction.weight} kg`} />
                <DetailRow label="Harga per kg" value={`Rp ${transaction.pricePerKg.toLocaleString('id-ID')}`} />
                <DetailRow label="Pendapatan Kotor" value={`Rp ${grossEarnings.toLocaleString('id-ID')}`} />
                <DetailRow label="Biaya Layanan (10%)" value={`- Rp ${serviceFee.toLocaleString('id-ID')}`} valueClassName="text-red-600"/>
                <Separator className="my-2"/>
                <div className="flex justify-between items-center py-3">
                    <p className="text-base font-bold text-primary">Total Pendapatan</p>
                    <p className="text-base font-bold text-primary text-right">Rp {netEarnings.toLocaleString('id-ID')}</p>
                </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h2 className="text-lg font-bold mb-2">Rincian Pengemudi</h2>
            <div className="divide-y divide-border/60">
                <DetailRow label="Nama Pengemudi" value={transaction.driver.name} />
                <DetailRow label="Kendaraan" value={`${transaction.driver.vehicle} (${transaction.driver.plate})`} />
            </div>
          </div>

          <div className="pt-4">
            <Button size="lg" variant="outline" className="w-full h-12" onClick={() => router.push('/')}>
                Kembali ke Beranda
            </Button>
          </div>
          
        </div>
      </main>
    </div>
  );
}
