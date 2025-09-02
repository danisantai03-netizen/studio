
'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { UniversalHeader } from '@/components/green-earth/UniversalHeader';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';

// Mock data, in a real app this would be fetched from your backend
const mockTransactionData: { [key: string]: any } = {
  'trip_123': {
    transactionId: 'TRN-2024-08-01-ABC',
    itemPhotoUrl: 'https://picsum.photos/400/300',
    category: 'Plastic Bottles',
    weight: 5.2, // kg
    pricePerKg: 2000,
    estimatedEarnings: 10400,
    pickupDate: new Date(),
    driver: {
      name: 'Budi Santoso',
      vehicle: 'Honda Vario',
      plate: 'B 1234 XYZ',
    }
  }
};

const DetailRow = ({ label, value }: { label: string, value: string | number }) => (
  <div className="flex justify-between items-center py-3">
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className="text-sm font-medium text-foreground text-right">{value}</p>
  </div>
);

export default function TransactionDetailsPage() {
  const params = useParams();
  const tripId = params.tripId as string;
  const transaction = mockTransactionData[tripId];

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
              <DetailRow label="Pickup Date" value={format(transaction.pickupDate, 'EEEE, dd MMMM yyyy')} />
              <DetailRow label="Time" value={format(transaction.pickupDate, 'HH:mm')} />
            </div>
          </div>
          
           <Separator />

          <div>
            <h2 className="text-lg font-bold mb-2">Item Details</h2>
            <div className="divide-y divide-border/60">
                <DetailRow label="Category" value={transaction.category} />
                <DetailRow label="Weight" value={`${transaction.weight} kg`} />
                <DetailRow label="Price per kg" value={`Rp ${transaction.pricePerKg.toLocaleString('id-ID')}`} />
                <Separator className="my-2"/>
                <div className="flex justify-between items-center py-3">
                    <p className="text-base font-bold text-primary">Total Earnings</p>
                    <p className="text-base font-bold text-primary text-right">Rp {transaction.estimatedEarnings.toLocaleString('id-ID')}</p>
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
