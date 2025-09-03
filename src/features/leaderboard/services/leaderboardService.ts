import { apiClient } from "@/services/apiClient";
import type { LeaderboardItem } from "@/features/leaderboard/types";

export async function getLeaderboard(period: 'this_week' | 'this_month'): Promise<LeaderboardItem[]> {
    return apiClient(`/leaderboard?period=${period}`);
}
