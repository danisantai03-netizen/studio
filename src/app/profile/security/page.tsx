
'use client';

import { UniversalHeader } from '@/components/green-earth/UniversalHeader';
import { KeyRound, Mail, Smartphone, Monitor, History, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function SecurityPage() {
  return (
    <div className="bg-background min-h-screen">
      <UniversalHeader title="Login & Security" />
      <main className="w-full max-w-full mx-0 py-6 space-y-8">
        
        <div className="space-y-2">
            <h2 className="text-sm font-semibold text-muted-foreground px-4">Account Security</h2>
            <ul className="divide-y divide-border">
                <SecurityLinkItem href="/profile/security/change-password" icon={KeyRound} text="Change Password" />
                <SecurityLinkItem href="/profile/security/change-email" icon={Mail} text="Change Email" />
                <SecurityLinkItem href="/profile/security/change-phone" icon={Smartphone} text="Change Phone Number" />
            </ul>
        </div>

        <div className="space-y-2">
            <h2 className="text-sm font-semibold text-muted-foreground px-4">Device Management</h2>
            <ul className="divide-y divide-border">
                <SecurityLinkItem href="/profile/security/sessions" icon={Monitor} text="Active Sessions" />
                <SecurityLinkItem href="/profile/security/history" icon={History} text="Login History" />
            </ul>
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
