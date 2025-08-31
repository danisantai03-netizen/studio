
'use client';

import { UniversalHeader } from '@/components/green-earth/UniversalHeader';
import { ArrowDownLeft, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import React from 'react';

const transactionHistory = [
  { 
    id: 'TXN-20231102-001', 
    date: new Date('2023-11-02T11:00:00'),
    earnings: 25000, 
    status: 'Completed',
    wasteType: 'Plastic Bottles',
    weight: 12.5,
    pricePerKg: 2000,
    driver: 'Budi Santoso'
  },
  { 
    id: 'TXN-20231101-002', 
    date: new Date('2023-11-01T15:30:00'),
    earnings: 8000, 
    status: 'Picked Up',
    wasteType: 'Cardboard',
    weight: 10,
    pricePerKg: 800,
    driver: 'Citra Lestari'
  },
  { 
    id: 'TXN-20231030-001', 
    date: new Date('2023-10-30T09:00:00'),
    earnings: 0, 
    status: 'Scheduled',
    wasteType: 'Aluminum Cans',
    weight: 5,
    pricePerKg: 10000,
    driver: 'Agus Wijaya'
  },
  { 
    id: 'TXN-20231028-001', 
    date: new Date('2023-10-28T14:10:00'),
    earnings: 15000, 
    status: 'Completed',
    wasteType: 'Glass Jars',
    weight: 10,
    pricePerKg: 1500,
    driver: 'Budi Santoso'
  },
  { 
    id: 'TXN-20231025-003', 
    date: new Date('2023-10-25T12:00:00'),
    earnings: 0, 
    status: 'Canceled',
    wasteType: 'Newspapers',
    weight: 20,
    pricePerKg: 1000,
    driver: null
  },
];

const statusConfig: { [key: string]: string } = {
  Completed: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700',
  'Picked Up': 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-700',
  Scheduled: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-700',
  Canceled: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700',
};

const ExpandableRow = ({ item }: { item: typeof transactionHistory[0] }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
       <li className="py-4">
            <div className="flex items-start" onClick={() => setIsOpen(!isOpen)} role="button">
                <div className="flex-grow">
                    <p className="font-semibold text-sm">Sale of {item.wasteType}</p>
                    <p className="text-xs text-muted-foreground">{format(item.date, 'dd MMM yyyy, HH:mm')}</p>
                    <Badge className={cn("mt-2 text-xs", statusConfig[item.status])}>{item.status}</Badge>
                </div>
                <div className="text-right">
                    <p className={`font-bold text-sm text-green-600`}>
                        Rp {item.earnings.toLocaleString('id-ID')}
                    </p>
                     <p className="text-xs text-muted-foreground mt-1 flex items-center justify-end">
                        Details <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </p>
                </div>
            </div>

             {isOpen && (
                <div className="mt-4 pt-4 border-t border-dashed text-xs space-y-2">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Invoice ID</span>
                        <span className="font-mono">{item.id}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">Weight</span>
                        <span>{item.weight} kg</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">Price per Kg</span>
                        <span>Rp {item.pricePerKg.toLocaleString('id-ID')}</span>
                    </div>
                     {item.driver && <div className="flex justify-between">
                        <span className="text-muted-foreground">Pickup Partner</span>
                        <span>{item.driver}</span>
                    </div>}
                </div>
            )}
       </li>
    );
};


export default function HistoryPage() {
  return (
    <div className="bg-background min-h-screen">
      <UniversalHeader title="Transaction History" />
      <main className="w-full max-w-full mx-0 px-4 sm:px-6 md:px-8 py-4">
        <ul className="divide-y divide-border">
            {transactionHistory.map((item) => (
               <ExpandableRow key={item.id} item={item} />
            ))}
        </ul>
      </main>
    </div>
  );
}
