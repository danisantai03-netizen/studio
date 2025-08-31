
'use client';

import { UniversalHeader } from '@/components/green-earth/UniversalHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Award } from 'lucide-react';
import useUserStore from '@/hooks/useUserStore';
import { cn } from '@/lib/utils';

const leaderboardData = [
  { rank: 1, name: 'Sarah L.', points: 15200, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
  { rank: 2, name: 'Budi S.', points: 14800, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e' },
  { rank: 3, name: 'Alex Green', points: 13700, avatar: '/assets/avatars/alex-green.jpg' },
  { rank: 4, name: 'Citra W.', points: 12500, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704f' },
  { rank: 5, name: 'David K.', points: 11900, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704a' },
  { rank: 6, name: 'Emily R.', points: 11200, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704b' },
];

export default function LeaderboardPage() {
  const { name: currentUserName } = useUserStore();

  return (
    <div className="bg-background min-h-screen">
      <UniversalHeader title="Leaderboard" showBackButton={true} />
      <main className="p-4 space-y-4">
        <Card>
          <CardHeader className="text-center">
            <Trophy className="mx-auto w-10 h-10 text-yellow-500 mb-2" />
            <CardTitle>Top Recyclers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leaderboardData.map((user) => (
                <div
                  key={user.rank}
                  className={cn(
                    "flex items-center p-3 rounded-lg",
                    user.name === currentUserName ? "bg-primary/10 border border-primary/20" : "bg-card"
                  )}
                >
                  <div className="w-8 text-lg font-bold text-center text-muted-foreground">{user.rank}</div>
                  <Avatar className="h-10 w-10 mx-3">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <p className="font-semibold">{user.name}</p>
                  </div>
                  <div className="flex items-center font-bold text-primary">
                    <Award className="w-4 h-4 mr-1 text-yellow-600" />
                    {user.points.toLocaleString('id-ID')}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
