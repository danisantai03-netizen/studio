
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  FileText,
  MessageSquareHeart,
  Settings,
  History,
  Users,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/green-earth/BottomNav';
import { ProfileHeaderCard } from '@/components/green-earth/ProfileHeaderCard';

const menuItems = [
  { icon: Users, text: 'Referral', href: '#' },
  { icon: History, text: 'Transaction History', href: '#' },
  { icon: Settings, text: 'Settings', href: '#' },
  { icon: ShieldCheck, text: 'Security', href: '#' },
  { icon: MessageSquareHeart, text: 'Help & Feedback', href: '#' },
  { icon: FileText, text: 'Terms & Conditions', href: '#' },
];

export default function ProfilePage() {
  const router = useRouter();

  return (
    <div className="bg-background min-h-screen">
      <div className="flex flex-col flex-grow pb-24">
        {/* Header */}
        <header className="p-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push('/')}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold">Profile</h1>
        </header>

        <main className="flex-grow">
          {/* Profile Info */}
          <div className="px-4 py-2">
            <ProfileHeaderCard />
          </div>

          {/* Menu List */}
          <div className="px-4 py-6">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {menuItems.map((item, index) => (
                    <React.Fragment key={item.text}>
                        <MenuItem icon={item.icon} text={item.text} href={item.href} />
                        {index < menuItems.length - 1 && <div className="h-px bg-gray-100 mx-4" />}
                    </React.Fragment>
                ))}
                 <MenuItem icon={LogOut} text="Logout" href="#" isLogout/>
            </div>
          </div>
        </main>
      </div>
      <BottomNav />
    </div>
  );
}

function MenuItem({ icon: Icon, text, href, isLogout = false }: { icon: React.ElementType, text: string, href: string, isLogout?: boolean }) {
  return (
    <a
      href={href}
      className={`flex items-center p-4 text-sm font-medium transition-colors duration-150 active:bg-gray-100/50 ${isLogout ? 'text-destructive' : 'text-foreground'}`}
    >
      <Icon className={`w-5 h-5 mr-4 shrink-0 ${isLogout ? '' : 'text-primary'}`} />
      <span className="flex-grow">{text}</span>
      {!isLogout && <ChevronRight className="w-5 h-5 text-muted-foreground" />}
    </a>
  )
}
