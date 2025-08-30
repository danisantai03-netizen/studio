
'use client';

import * as React from 'react';
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
      <div className="flex flex-col flex-grow pb-28">
        <main className="flex-grow">
          {/* Profile Info */}
          <div className="px-4 py-6">
            <ProfileInfoCard />
          </div>

          {/* Menu List */}
          <div className="px-4 py-2">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
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
        <Link href="/profile/edit" className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm active:bg-gray-50 transition-colors duration-150">
            <div className="relative w-16 h-16 rounded-full overflow-hidden">
                 <Image 
                    src={avatarUrl}
                    alt={name}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="flex-grow">
                <p className="font-bold text-lg">{name}</p>
                <p className="text-sm text-muted-foreground">ID: {userId}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </Link>
    )
}

function MenuItem({ icon: Icon, text, href, isLogout = false }: { icon: React.ElementType, text: string, href: string, isLogout?: boolean }) {
  const router = useRouter();
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (href !== '#') {
        router.push(href);
    }
    // Handle logout logic here if needed
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center p-4 text-sm font-medium transition-colors duration-150 active:bg-gray-100/50 cursor-pointer ${isLogout ? 'text-destructive' : 'text-foreground'}`}
    >
      <Icon className={`w-5 h-5 mr-4 shrink-0 ${isLogout ? '' : 'text-primary'}`} />
      <span className="flex-grow">{text}</span>
      {!isLogout && <ChevronRight className="w-5 h-5 text-muted-foreground" />}
    </div>
  )
}
