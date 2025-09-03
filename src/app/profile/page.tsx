
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
        { id: 'history', title: 'Riwayat Penjualan', icon: <History className="w-5 h-5 text-primary" />, href: '/profile/sales/history' },
        { id: 'settings', title: 'Pengaturan', icon: <Settings className="w-5 h-5 text-primary" />, href: '/profile/settings' },
        { id: 'security', title: 'Keamanan', icon: <ShieldCheck className="w-5 h-5 text-primary" />, href: '/profile/security' },
        { id: 'help', title: 'Bantuan & Masukan', icon: <MessageSquareHeart className="w-5 h-5 text-primary" />, href: '/profile/feedback' },
    ];

    const handleLogout = async () => {
        logoutMutation.mutate(undefined, {
            onSuccess: () => {
                router.push('/');
                toast({
                    title: "Berhasil Keluar",
                    description: "Anda telah berhasil keluar dari akun Anda.",
                });
            },
            onError: (error) => {
                console.error("Logout failed:", error);
                toast({
                    variant: "destructive",
                    title: "Gagal Keluar",
                    description: "Terjadi kesalahan saat mencoba keluar. Silakan coba lagi.",
                });
            }
        });
    };

  return (
    <div className="bg-background min-h-screen">
      <UniversalHeader title="Profil" showBackButton={false} />
      <div className="flex flex-col flex-grow pb-20 w-full max-w-full mx-0 px-4 sm:px-6 md:px-8">
        <main className="flex-grow pt-4">
            <ProfileHeader 
                name={user?.name ?? 'Tamu'}
                id={user?.userId ?? ''}
                photoUrl={user?.avatarUrl ?? '/assets/avatars/default.png'}
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
                                <div className="text-sm font-semibold">Keluar</div>
                            </div>
                        </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Apakah Anda yakin ingin keluar?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Anda akan dikembalikan ke layar utama dan perlu masuk kembali untuk mengakses akun Anda.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction onClick={handleLogout} className="bg-destructive hover:bg-destructive/90" disabled={logoutMutation.isPending}>
                                {logoutMutation.isPending ? 'Keluar...' : 'Konfirmasi'}
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
