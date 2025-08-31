
'use client';

import * as React from 'react';
import Image from 'next/image';
import { Award, Crown, User, Users } from 'lucide-react';
import { UniversalHeader } from '@/components/green-earth/UniversalHeader';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AnimatePresence, motion } from 'framer-motion';

// Data contract from the prompt
type LeaderboardItem = {
  rank: number;
  userId: string;
  displayName: string;
  avatarUrl?: string;
  points: number;
  isCurrentUser?: boolean;
};

// Mock data simulating API response
const leaderboardData: { [key: string]: LeaderboardItem[] } = {
  'this_week': [
    { rank: 1, userId: 'u_123', displayName: 'Kiara', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', points: 9800, isCurrentUser: false },
    { rank: 2, userId: 'u_456', displayName: 'Budi S.', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704e', points: 9540, isCurrentUser: false },
    { rank: 3, userId: 'u_789', displayName: 'Alex Green', avatarUrl: '/assets/avatars/alex-green.jpg', points: 9210, isCurrentUser: true },
    { rank: 4, userId: 'u_101', displayName: 'Citra W.', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704f', points: 8950, isCurrentUser: false },
    { rank: 5, userId: 'u_112', displayName: 'David K.', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704a', points: 8800, isCurrentUser: false },
    ...Array.from({ length: 45 }, (_, i) => ({
      rank: i + 6,
      userId: `u_mock_${i+6}`,
      displayName: `User ${i+6}`,
      points: 8800 - (i + 1) * 150,
      avatarUrl: `https://i.pravatar.cc/150?u=a${i+6}`,
      isCurrentUser: false,
    }))
  ],
  'this_month': [
    { rank: 1, userId: 'u_789', displayName: 'Alex Green', avatarUrl: '/assets/avatars/alex-green.jpg', points: 35210, isCurrentUser: true },
    { rank: 2, userId: 'u_123', displayName: 'Kiara', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', points: 34800, isCurrentUser: false },
    { rank: 3, userId: 'u_456', displayName: 'Budi S.', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704e', points: 33700, isCurrentUser: false },
    { rank: 4, userId: 'u_112', displayName: 'David K.', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704a', points: 32900, isCurrentUser: false },
    { rank: 5, userId: 'u_101', displayName: 'Citra W.', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704f', points: 31500, isCurrentUser: false },
     ...Array.from({ length: 45 }, (_, i) => ({
      rank: i + 6,
      userId: `u_mock_month_${i+6}`,
      displayName: `User M ${i+6}`,
      points: 31500 - (i + 1) * 350,
      avatarUrl: `https://i.pravatar.cc/150?u=b${i+6}`,
      isCurrentUser: false,
    }))
  ],
};


// Memoized components for performance
const PodiumItem = React.memo(({ user, rank }: { user: LeaderboardItem; rank: number }) => {
  const isFirstPlace = rank === 1;
  const medalColors: { [key: number]: string } = {
    1: 'text-yellow-500', // Gold
    2: 'text-gray-400',   // Silver
    3: 'text-yellow-700', // Bronze
  };

  return (
    <motion.div
      className={cn('flex flex-col items-center gap-2', isFirstPlace ? 'self-start' : 'self-end')}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * rank, duration: 0.3 }}
    >
      <div className="relative">
        <Avatar className={cn(isFirstPlace ? 'w-20 h-20 border-4 border-yellow-500' : 'w-14 h-14 border-2 border-primary/20')}>
          <AvatarImage src={user.avatarUrl} alt={user.displayName} className="object-cover" />
          <AvatarFallback>{user.displayName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className={cn(
          "absolute -bottom-2 -right-2 grid place-items-center rounded-full bg-background",
          isFirstPlace ? 'w-8 h-8' : 'w-6 h-6'
        )}>
          <Award className={cn('w-5 h-5', medalColors[rank])} />
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold truncate max-w-[100px]">{user.displayName}</p>
        <p className="text-xs text-muted-foreground">{user.points.toLocaleString('id-ID')} pts</p>
      </div>
    </motion.div>
  );
});
PodiumItem.displayName = 'PodiumItem';

const ListItem = React.memo(({ user }: { user: LeaderboardItem }) => (
    <motion.li
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.2 }}
        className={cn(
            "flex items-center gap-3 py-3 w-full min-h-[56px] transition-colors duration-200",
            user.isCurrentUser && 'bg-primary/5 rounded-lg px-3'
        )}
        role="listitem"
    >
        <div className="w-6 text-center font-bold text-muted-foreground">{user.rank}</div>
        <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatarUrl} alt={user.displayName} loading="lazy" />
            <AvatarFallback>{user.displayName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
            <p className="font-semibold truncate">{user.displayName}</p>
        </div>
        <div className="text-right">
            <p className="font-bold text-primary">{user.points.toLocaleString('id-ID')}</p>
            {user.isCurrentUser && <p className="text-xs text-secondary-dark font-semibold">You</p>}
        </div>
    </motion.li>
));
ListItem.displayName = 'ListItem';

const SkeletonListItem = () => (
    <div className="flex items-center gap-3 py-3 w-full min-h-[56px]">
        <div className="w-6"><div className="h-4 w-4 bg-muted rounded-full animate-pulse" /></div>
        <div className="h-10 w-10 bg-muted rounded-full animate-pulse" />
        <div className="flex-1 min-w-0">
            <div className="h-5 w-3/4 bg-muted rounded-md animate-pulse" />
        </div>
        <div className="w-16">
            <div className="h-5 w-full bg-muted rounded-md animate-pulse" />
        </div>
    </div>
);


export default function LeaderboardPage() {
  const [period, setPeriod] = React.useState<'this_week' | 'this_month'>('this_week');
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<LeaderboardItem[]>([]);

  React.useEffect(() => {
    setLoading(true);
    // Simulate API call
    const timer = setTimeout(() => {
      setData(leaderboardData[period]);
      setLoading(false);
    }, 500); // 500ms delay to show skeleton
    
    return () => clearTimeout(timer);
  }, [period]);

  const podium = data.slice(0, 3);
  const list = data.slice(3);

  const rank1 = podium.find(u => u.rank === 1);
  const rank2 = podium.find(u => u.rank === 2);
  const rank3 = podium.find(u => u.rank === 3);

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <UniversalHeader title="Leaderboard" />

      <div className="px-4 pt-4">
        <div className="p-1 bg-muted rounded-full flex items-center">
          <Button
            className={cn("w-full rounded-full h-8 text-xs", period === 'this_week' ? 'bg-background shadow-sm' : 'bg-transparent text-muted-foreground')}
            variant="ghost"
            onClick={() => setPeriod('this_week')}
          >
            This Week
          </Button>
          <Button
            className={cn("w-full rounded-full h-8 text-xs", period === 'this_month' ? 'bg-background shadow-sm' : 'bg-transparent text-muted-foreground')}
            variant="ghost"
            onClick={() => setPeriod('this_month')}
          >
            This Month
          </Button>
        </div>
      </div>

      <main className="flex-grow">
        {/* Podium Area */}
        <div className="px-4 pt-6 pb-4">
            <div className="flex justify-around items-center h-40 bg-primary/5 rounded-2xl p-4">
                {loading ? (
                    <>
                        <div className="h-28 w-14 bg-muted/80 rounded-lg animate-pulse" />
                        <div className="h-36 w-20 bg-muted/80 rounded-lg animate-pulse" />
                        <div className="h-28 w-14 bg-muted/80 rounded-lg animate-pulse" />
                    </>
                ) : (
                   <>
                    {rank2 ? <PodiumItem user={rank2} rank={2} /> : <div/>}
                    {rank1 ? <PodiumItem user={rank1} rank={1} /> : <div/>}
                    {rank3 ? <PodiumItem user={rank3} rank={3} /> : <div/>}
                   </>
                )}
            </div>
        </div>

        {/* List Area */}
        <div className="px-4">
            <h2 className="text-base font-bold my-2">Top 50 Recyclers</h2>
            {loading ? (
                <div className="space-y-2">
                    {[...Array(10)].map((_, i) => <SkeletonListItem key={i} />)}
                </div>
            ) : (
                 <ul role="list" className="divide-y divide-border">
                    <AnimatePresence>
                        {list.map(user => (
                            <ListItem key={user.userId} user={user} />
                        ))}
                    </AnimatePresence>
                </ul>
            )}
        </div>
         <p className="text-center text-xs text-muted-foreground py-4">Top 50 players shown.</p>
      </main>
    </div>
  );
}

    