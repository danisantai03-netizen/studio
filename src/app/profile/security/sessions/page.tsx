
'use client';

import { UniversalHeader } from '@/components/green-earth/UniversalHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Monitor, Smartphone } from 'lucide-react';

const activeSessions = [
  { id: 'session-1', device: 'iPhone 14 Pro', browser: 'Safari', location: 'Jakarta, ID', ip: '103.22.11.5', lastActive: 'Active now', isCurrent: true },
  { id: 'session-2', device: 'Windows 11', browser: 'Chrome', location: 'Bandung, ID', ip: '45.10.2.18', lastActive: '2 hours ago', isCurrent: false },
];

const getDeviceIcon = (device: string) => {
    if (device.toLowerCase().includes('windows') || device.toLowerCase().includes('mac')) {
        return <Monitor className="w-5 h-5 text-muted-foreground" />;
    }
    return <Smartphone className="w-5 h-5 text-muted-foreground" />;
}

export default function ActiveSessionsPage() {
  return (
    <div className="bg-background min-h-screen">
      <UniversalHeader title="Active Sessions" />
      <main className="w-full max-w-full mx-0 py-6 space-y-8">
        <div className="space-y-2">
             <p className="text-xs text-muted-foreground px-4">
                These are the devices currently logged into your account.
             </p>
             <div className="divide-y divide-border">
                {activeSessions.map(session => (
                    <div key={session.id} className="p-4">
                        <div className="flex items-start gap-4">
                            {getDeviceIcon(session.device)}
                            <div className="flex-1">
                                <p className="font-semibold text-sm">{session.device} • {session.browser}</p>
                                <p className="text-xs text-muted-foreground">{session.location} • {session.ip}</p>
                                {session.isCurrent ? (
                                    <Badge variant="secondary" className="mt-2 text-green-700 bg-green-100 border-none">Active now</Badge>
                                ) : (
                                    <p className="text-xs text-muted-foreground mt-1">{session.lastActive}</p>
                                )}
                            </div>
                        </div>
                        {!session.isCurrent && (
                            <Button variant="outline" size="sm" className="w-full mt-3 h-8 text-xs">
                                Terminate Session
                            </Button>
                        )}
                    </div>
                ))}
            </div>
        </div>
        
        <div className="pt-2 px-4">
            <Button variant="outline" className="w-full">Log out from all devices</Button>
        </div>
      </main>
    </div>
  );
}
