
'use client';

import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ChevronRight,
  Pencil,
  ShieldCheck,
  FileText,
  MessageSquareHeart,
  Settings,
  History,
  Users,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import useUserStore from '@/hooks/useUserStore';
import { BottomNav } from '@/components/green-earth/BottomNav';

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
  const { name, avatarUrl } = useUserStore();

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
          <div className="px-4 py-6 flex flex-col items-center text-center">
            <div className="relative">
              <Image
                src={avatarUrl}
                alt={name}
                width={96}
                height={96}
                className="rounded-full border-4 border-white shadow-md"
              />
              <Button
                size="icon"
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground border-2 border-white"
                aria-label="Edit profile"
              >
                <Pencil className="w-4 h-4" />
              </Button>
            </div>
            <h2 className="mt-4 text-2xl font-bold">{name}</h2>
            <p className="text-muted-foreground text-sm mt-1">ID: 1289-4720-3482</p>
          </div>

          {/* Menu List */}
          <div className="px-4 py-2">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {menuItems.map((item, index) => (
                    <React.Fragment key={item.text}>
                        <MenuItem icon={item.icon} text={item.text} href={item.href} />
                        {index < menuItems.length && <div className="h-px bg-gray-100 mx-4" />}
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
