
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
import { BottomNav } from '@/components/green-earth/BottomNav';
import { UniversalHeader } from '@/components/green-earth/UniversalHeader';
import { ProfileHeader } from '@/components/green-earth/ProfileHeader';
import { ProfileMenu, type MenuItem } from '@/components/green-earth/ProfileMenu';
import { ProfileFooter } from '@/components/green-earth/ProfileFooter';
import { useToast } from "@/hooks/use-toast";
import { useUser, useLogout } from '@/features/user/hooks/useUser';

export default function ProfilePage() {
    const router = useRouter();
    const { toast } = useToast();
    const { data: user, isLoading: isUserLoading } = useUser();
    const logoutMutation = useLogout();

    const menuItems: MenuItem[] = [
        { id: 'referral', title: 'Referral', icon: <Users className="w-5 h-5 text-primary" />, href: '/profile/referral' },
        { id: 'history', title: 'Transaction History', icon: <History className="w-5 h-5 text-primary" />, href: '/profile/history' },
        { id: 'settings', title: 'Settings', icon: <Settings className="w-5 h-5 text-primary" />, href: '/profile/settings' },
        { id: 'security', title: 'Security', icon: <ShieldCheck className="w-5 h-5 text-primary" />, href: '/profile/security' },
        { id: 'help', title: 'Help & Feedback', icon: <MessageSquareHeart className="w-5 h-5 text-primary" />, href: '/profile/feedback' },
    ];

    const handleLogout = async () => {
        logoutMutation.mutate(undefined, {
            onSuccess: () => {
                router.push('/');
                toast({
                    title: "Logged Out",
                    description: "You have been successfully signed out.",
                });
            },
            onError: (error) => {
                console.error("Logout failed:", error);
                toast({
                    variant: "destructive",
                    title: "Logout Failed",
                    description: "An error occurred while logging out. Please try again.",
                });
            }
        });
    };

  return (
    <div className="bg-background min-h-screen">
      <UniversalHeader title="Profile" showBackButton={false} />
      <div className="flex flex-col flex-grow pb-20 w-full max-w-full mx-0 px-4 sm:px-6 md:px-8">
        <main className="flex-grow pt-4">
            <ProfileHeader 
                name={user?.name ?? 'Guest'}
                id={user?.userId ?? ''}
                photoUrl={user?.avatarUrl ?? '/assets/avatars/alex-green.jpg'}
                onEdit={() => router.push('/profile/edit')}
                isLoading={isUserLoading}
            />
            <div className="mt-8 space-y-2">
                <ul className="w-full">
                    {menuItems.map((item) => (
                        <ProfileMenu key={item.id} menu={item} />
                    ))}
                </ul>
                
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <button className="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/40 active:scale-[0.99] transition-all duration-150 rounded-lg text-destructive border-t">
                            <div className="flex items-center gap-3">
                                <div className="grid place-items-center w-8 h-8">
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
                            <AlertDialogAction onClick={handleLogout} className="bg-destructive hover:bg-destructive/90" disabled={logoutMutation.isPending}>
                                {logoutMutation.isPending ? 'Logging out...' : 'Confirm Logout'}
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
