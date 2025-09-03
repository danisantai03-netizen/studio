
export type LeaderboardItem = {
  rank: number;
  userId: string;
  displayName: string;
  avatarUrl?: string;
  points: number;
  isCurrentUser?: boolean;
};
