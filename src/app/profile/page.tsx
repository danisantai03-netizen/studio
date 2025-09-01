
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  MessageSquareHeart,
  Settings,
  History,
  Users,
  LogOut,
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { getAuth, signOut } from "firebase/auth";
import { BottomNav } from '@/components/green-earth/BottomNav';
import useUserStore from '@/hooks/useUserStore';
import { UniversalHeader } from '@/components/green-earth/UniversalHeader';
import { ProfileHeader } from '@/components/green-earth/ProfileHeader';
import { ProfileMenu, type MenuItem } from '@/components/green-earth/ProfileMenu';
import { ProfileFooter } from '@/components/green-earth/ProfileFooter';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
    const router = useRouter();
    const { toast } = useToast();
    const { name, userId, avatarUrl, clearUser } = useUserStore();

    const menuItems: MenuItem[] = [
        { id: 'referral', title: 'Referral', icon: <Users className="w-5 h-5 text-primary" />, href: '/profile/referral' },
        { id: 'history', title: 'Transaction History', icon: <History className="w-5 h-5 text-primary" />, href: '/profile/history' },
        { id: 'settings', title: 'Settings', icon: <Settings className="w-5 h-5 text-primary" />, href: '/profile/settings' },
        { id: 'security', title: 'Security', icon: <ShieldCheck className="w-5 h-5 text-primary" />, href: '/profile/security' },
        { id: 'help', title: 'Help & Feedback', icon: <MessageSquareHeart className="w-5 h-5 text-primary" />, href: '/profile/feedback' },
    ];

    const handleLogout = async () => {
        const auth = getAuth();
        try {
            await signOut(auth);
            clearUser();
            router.push('/');
            toast({
                title: "Logged Out",
                description: "You have been successfully signed out.",
            });
        } catch (error) {
            console.error("Logout failed:", error);
            toast({
                variant: "destructive",
                title: "Logout Failed",
                description: "An error occurred while logging out. Please try again.",
            });
        }
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
                onEdit={() => router.push('/profile/edit')}
            />
            <div className="mt-8 space-y-2">
                <ProfileMenu menus={menuItems} />
                
                 <AlertDialog>
                    <AlertDialogTrigger asChild>
                         <button
                            className="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/40 active:scale-[0.99] transition-all duration-150 rounded-lg text-destructive"
                            role="menuitem"
                          >
                            <div className="flex items-center gap-3">
                                <div className="grid place-items-center w-8 h-8 bg-destructive/10 rounded-lg">
                                    <LogOut className="w-5 h-5" />
                                </div>
                                <div className="text-sm font-semibold">Logout</div>
                            </div>
                        </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                        <AlertDialogDescription>
                            You will be returned to the home screen and will need to sign in again to access your account.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleLogout} className="bg-destructive hover:bg-destructive/90">
                            Confirm Logout
                        </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
            
            <ProfileFooter 
                onTermsClick={() => router.push('/profile/terms')}
            />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
