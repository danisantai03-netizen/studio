
'use client';

import { UniversalHeader } from '@/components/green-earth/UniversalHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { KeyRound, Mail, Smartphone, Monitor, Globe, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const activeSessions = [
  { id: 'session-1', device: 'iPhone 14 Pro', browser: 'Safari', location: 'Jakarta, ID', ip: '103.22.11.5', lastActive: 'Active now', isCurrent: true },
  { id: 'session-2', device: 'Windows 11', browser: 'Chrome', location: 'Bandung, ID', ip: '45.10.2.18', lastActive: '2 hours ago', isCurrent: false },
];

const loginHistory = [
    { id: 'history-1', device: 'iPhone 14 Pro', location: 'Jakarta, ID', ip: '103.22.11.5', time: 'August 12, 2024, 10:30 AM', status: 'Success' },
    { id: 'history-2', device: 'Unknown Device', location: 'Surabaya, ID', ip: '112.5.8.42', time: 'August 12, 2024, 08:15 AM', status: 'Failed' },
    { id: 'history-3', device: 'Windows 11', location: 'Bandung, ID', ip: '45.10.2.18', time: 'August 11, 2024, 07:00 PM', status: 'Success' },
];

const getDeviceIcon = (device: string) => {
    if (device.toLowerCase().includes('windows') || device.toLowerCase().includes('mac')) {
        return <Monitor className="w-5 h-5 text-muted-foreground" />;
    }
    return <Smartphone className="w-5 h-5 text-muted-foreground" />;
}

export default function SecurityPage() {
  return (
    <div className="bg-background min-h-screen">
      <UniversalHeader title="Login & Security" />
      <main className="w-full max-w-full mx-0 py-6 space-y-8">
        
        {/* Account Management Section */}
        <div className="px-4 space-y-2">
            <h2 className="text-sm font-semibold text-muted-foreground">Account</h2>
            <div className="border rounded-xl overflow-hidden bg-card">
              <ul className="divide-y divide-border">
                <SecurityLinkItem href="/profile/security/change-password" icon={KeyRound} text="Change Password" />
                <SecurityLinkItem href="/profile/security/change-email" icon={Mail} text="Change Email" />
                <SecurityLinkItem href="/profile/security/change-phone" icon={Smartphone} text="Change Phone Number" />
              </ul>
            </div>
        </div>

        {/* Active Sessions Section */}
        <div className="px-4 space-y-2">
            <h2 className="text-sm font-semibold text-muted-foreground">Active Sessions</h2>
             <div className="border rounded-xl overflow-hidden bg-card divide-y divide-border">
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
            <div className="pt-2">
                <Button variant="outline" className="w-full">Log out from all devices</Button>
            </div>
        </div>

        {/* Login History Section */}
        <div className="px-4 space-y-2">
            <h2 className="text-sm font-semibold text-muted-foreground">Login History</h2>
             <div className="border rounded-xl overflow-hidden bg-card divide-y divide-border">
                {loginHistory.map(item => (
                     <div key={item.id} className="p-4 flex items-center gap-4">
                        {getDeviceIcon(item.device)}
                        <div className="flex-1">
                            <p className="font-semibold text-sm">{item.device}</p>
                            <p className="text-xs text-muted-foreground">{item.location} • {item.time}</p>
                        </div>
                        <Badge variant={item.status === 'Success' ? 'secondary' : 'destructive'} className={item.status === 'Success' ? 'text-green-700 bg-green-100 border-none' : 'bg-red-100 border-none'}>
                            {item.status}
                        </Badge>
                    </div>
                ))}
             </div>
        </div>
      </main>
    </div>
  );
}

interface SecurityLinkItemProps {
    href: string;
    icon: React.ElementType;
    text: string;
}

const SecurityLinkItem = ({ href, icon: Icon, text }: SecurityLinkItemProps) => (
    <li>
        <Link href={href}>
            <div className="p-4 flex items-center gap-3 active:bg-muted/50 transition-colors">
                <Icon className="w-5 h-5 text-primary" />
                <span className="flex-1 font-medium text-sm">{text}</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
        </Link>
    </li>
);
