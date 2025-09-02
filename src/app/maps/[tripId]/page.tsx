
'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { UniversalHeader } from '@/components/green-earth/UniversalHeader';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

// Mock data, in a real app this would be fetched from your backend
const mockTransactionData: { [key: string]: any } = {
  'trip_123': {
    transactionId: 'TRN-2024-08-01-ABC',
    itemPhotoUrl: 'https://picsum.photos/400/300',
    category: 'Plastic Bottles',
    weight: 5.2, // kg
    pricePerKg: 2000,
    pickupDate: '2024-09-03T10:30:00Z', // Using a static ISO string to prevent hydration errors
    driver: {
      name: 'Budi Santoso',
      vehicle: 'Honda Vario',
      plate: 'B 1234 XYZ',
    }
  }
};

const DetailRow = ({ label, value, valueClassName }: { label: string, value: string | number, valueClassName?: string }) => (
  <div className="flex justify-between items-center py-3">
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className={cn("text-sm font-medium text-foreground text-right", valueClassName)}>{value}</p>
  </div>
);

export default function TransactionDetailsPage() {
  const params = useParams();
  const tripId = params.tripId as string;
  const transaction = mockTransactionData[tripId];
  
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!transaction) {
    return (
      <div className="bg-background min-h-screen">
        <UniversalHeader title="Transaction Not Found" />
        <main className="p-4 text-center">
          <p>The transaction details could not be found.</p>
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
      <UniversalHeader title="Transaction Details" />
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
            <h2 className="text-lg font-bold mb-2">Pickup Information</h2>
            <div className="divide-y divide-border/60">
              <DetailRow label="Transaction ID" value={transaction.transactionId} />
              {isClient && <>
                <DetailRow label="Pickup Date" value={format(pickupDate, 'EEEE, dd MMMM yyyy')} />
                <DetailRow label="Time" value={format(pickupDate, 'HH:mm')} />
              </>}
            </div>
          </div>
          
           <Separator />

          <div>
            <h2 className="text-lg font-bold mb-2">Earnings Details</h2>
            <div className="divide-y divide-border/60">
                <DetailRow label="Category" value={transaction.category} />
                <DetailRow label="Verified Weight" value={`${transaction.weight} kg`} />
                <DetailRow label="Price per kg" value={`Rp ${transaction.pricePerKg.toLocaleString('id-ID')}`} />
                <DetailRow label="Gross Earnings" value={`Rp ${grossEarnings.toLocaleString('id-ID')}`} />
                <DetailRow label="Service Fee (10%)" value={`- Rp ${serviceFee.toLocaleString('id-ID')}`} valueClassName="text-red-600"/>
                <Separator className="my-2"/>
                <div className="flex justify-between items-center py-3">
                    <p className="text-base font-bold text-primary">Total Earnings</p>
                    <p className="text-base font-bold text-primary text-right">Rp {netEarnings.toLocaleString('id-ID')}</p>
                </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h2 className="text-lg font-bold mb-2">Driver Details</h2>
            <div className="divide-y divide-border/60">
                <DetailRow label="Driver Name" value={transaction.driver.name} />
                <DetailRow label="Vehicle" value={`${transaction.driver.vehicle} (${transaction.driver.plate})`} />
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
