
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronRight,
  ShieldCheck,
  FileText,
  MessageSquareHeart,
  Settings,
  History,
  Users,
  LogOut,
} from 'lucide-react';
import { BottomNav } from '@/components/green-earth/BottomNav';
import useUserStore from '@/hooks/useUserStore';
import Image from 'next/image';
import { UniversalHeader } from '@/components/green-earth/UniversalHeader';

const menuItems = [
  { icon: Users, text: 'Referral', href: '/profile/referral' },
  { icon: History, text: 'Transaction History', href: '/profile/history' },
  { icon: Settings, text: 'Settings', href: '/profile/settings' },
  { icon: ShieldCheck, text: 'Security', href: '/profile/security' },
  { icon: MessageSquareHeart, text: 'Help & Feedback', href: '/profile/feedback' },
  { icon: FileText, text: 'Terms & Conditions', href: '/profile/terms' },
];

export default function ProfilePage() {
  return (
    <div className="bg-background min-h-screen">
      <UniversalHeader title="Profile" showBackButton={false} />
      <div className="flex flex-col flex-grow pb-20">
        <main className="flex-grow">
          <div className="p-3">
            <ProfileInfoCard />
          </div>

          <div className="px-3 py-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {menuItems.map((item, index) => (
                    <React.Fragment key={item.text}>
                        <MenuItem icon={item.icon} text={item.text} href={item.href} />
                        {index < menuItems.length - 1 && <div className="h-px bg-gray-100 mx-4" />}
                    </React.Fragment>
                ))}
                 <div className="h-px bg-gray-100 mx-4" />
                 <MenuItem icon={LogOut} text="Logout" href="#" isLogout/>
            </div>
          </div>
        </main>
      </div>
      <BottomNav />
    </div>
  );
}

function ProfileInfoCard() {
    const { name, avatarUrl, userId } = useUserStore();
    return (
        <Link href="/profile/edit" className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm active:bg-gray-50 transition-colors duration-150">
            <div className="relative w-14 h-14 rounded-full overflow-hidden">
                 <Image 
                    src={avatarUrl}
                    alt={name}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="flex-grow">
                <p className="font-bold text-base">{name}</p>
                <p className="text-xs text-muted-foreground">ID: {userId}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </Link>
    )
}

function MenuItem({ icon: Icon, text, href, isLogout = false }: { icon: React.ElementType, text: string, href: string, isLogout?: boolean }) {
  const router = useRouter();
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLogout) {
        // Handle logout logic here
        console.log("Logout clicked");
    } else {
        router.push(href);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center p-4 text-sm font-medium transition-colors duration-150 active:bg-gray-100/50 cursor-pointer ${isLogout ? 'text-destructive' : 'text-foreground'}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(e as any) }}
    >
      <Icon className={`w-5 h-5 mr-3 shrink-0 ${isLogout ? '' : 'text-primary'}`} />
      <span className="flex-grow">{text}</span>
      {!isLogout && <ChevronRight className="w-5 h-5 text-muted-foreground" />}
    </div>
  )
}
