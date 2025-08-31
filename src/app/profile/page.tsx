
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  MessageSquareHeart,
  Settings,
  History,
  Users,
} from 'lucide-react';
import { BottomNav } from '@/components/green-earth/BottomNav';
import useUserStore from '@/hooks/useUserStore';
import { UniversalHeader } from '@/components/green-earth/UniversalHeader';
import { ProfileHeader } from '@/components/green-earth/ProfileHeader';
import { ProfileMenu, type MenuItem } from '@/components/green-earth/ProfileMenu';
import { ProfileFooter } from '@/components/green-earth/ProfileFooter';


export default function ProfilePage() {
    const router = useRouter();
    const { name, userId, avatarUrl } = useUserStore();

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    const menuItems: MenuItem[] = [
        { id: 'referral', title: 'Referral', icon: <Users className="w-5 h-5 text-primary" />, href: '/profile/referral' },
        { id: 'history', title: 'Transaction History', icon: <History className="w-5 h-5 text-primary" />, href: '/profile/history' },
        { id: 'settings', title: 'Settings', icon: <Settings className="w-5 h-5 text-primary" />, href: '/profile/settings' },
        { id: 'security', title: 'Security', icon: <ShieldCheck className="w-5 h-5 text-primary" />, href: '/profile/security' },
        { id: 'help', title: 'Help & Feedback', icon: <MessageSquareHeart className="w-5 h-5 text-primary" />, href: '/profile/feedback' },
    ];

    const handleLogout = () => {
        // Handle logout logic here
        console.log("Logout clicked");
    };

  return (
    <div className="bg-background min-h-screen">
      <UniversalHeader title="Profile" showBackButton={false} />
      <div className="flex flex-col flex-grow pb-20 w-full max-w-full mx-0 px-4 sm:px-6 md:px-8">
        <main className="flex-grow pt-4">
            <ProfileHeader 
                name={name}
                id={userId}
                photoUrl={avatarUrl}
                onEdit={() => handleNavigation('/profile/edit')}
            />
            <div className="mt-6">
                <ProfileMenu menus={menuItems} />
            </div>
            <ProfileFooter 
                onTermsClick={() => handleNavigation('/profile/terms')}
                onLogoutClick={handleLogout}
            />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
