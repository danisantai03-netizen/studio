
'use client';

import { UniversalHeader } from '@/components/green-earth/UniversalHeader';
import { Badge } from '@/components/ui/badge';
import { Monitor, Smartphone } from 'lucide-react';

const loginHistory = [
    { id: 'history-1', device: 'iPhone 14 Pro', location: 'Jakarta, ID', ip: '103.22.11.5', time: 'August 12, 2024, 10:30 AM', status: 'Success' },
    { id: 'history-2', device: 'Unknown Device', location: 'Surabaya, ID', ip: '112.5.8.42', time: 'August 12, 2024, 08:15 AM', status: 'Failed' },
    { id: 'history-3', device: 'Windows 11', location: 'Bandung, ID', ip: '45.10.2.18', time: 'August 11, 2024, 07:00 PM', status: 'Success' },
    { id: 'history-4', device: 'iPhone 14 Pro', location: 'Jakarta, ID', ip: '103.22.11.5', time: 'August 10, 2024, 09:00 AM', status: 'Success' },
];

const getDeviceIcon = (device: string) => {
    if (device.toLowerCase().includes('windows') || device.toLowerCase().includes('mac')) {
        return <Monitor className="w-5 h-5 text-muted-foreground" />;
    }
    return <Smartphone className="w-5 h-5 text-muted-foreground" />;
}

export default function LoginHistoryPage() {
  return (
    <div className="bg-background min-h-screen">
      <UniversalHeader title="Login History" />
      <main className="w-full max-w-full mx-0 py-6 space-y-4">
        <p className="text-xs text-muted-foreground px-4">
            Review recent login activity for your account to ensure it's secure.
        </p>
        <div className="divide-y divide-border">
            {loginHistory.map(item => (
                 <div key={item.id} className="p-4 flex items-center gap-4">
                    {getDeviceIcon(item.device)}
                    <div className="flex-1">
                        <p className="font-semibold text-sm">{item.device}</p>
                        <p className="text-xs text-muted-foreground">{item.location} • {item.time}</p>
                    </div>
                    <Badge variant={item.status === 'Success' ? 'secondary' : 'destructive'} className={item.status === 'Success' ? 'text-green-700 bg-green-100 border-none' : 'text-red-100 border-none'}>
                        {item.status}
                    </Badge>
                </div>
            ))}
         </div>
      </main>
    </div>
  );
}
