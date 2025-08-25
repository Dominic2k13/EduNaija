import { supabase } from "./client"

export interface LeaderboardEntry {
  id: string
  username: string
  rank: string
  coins: number
  xp: number
  total_matches: number
  win_rate: number
  best_subject: string
  created_at: string
}

export async function getLeaderboard(limit = 50): Promise<LeaderboardEntry[]> {
  try {
    const { data, error } = await supabase.from("users").select("*").order("xp", { ascending: false }).limit(limit)

    if (error) throw error

    return data || []
  } catch (error) {
    console.error("Error fetching leaderboard:", error)
    throw error
  }
}

export async function getUserRanking(userId: string): Promise<number> {
  try {
    const { data, error } = await supabase.from("users").select("id, xp").order("xp", { ascending: false })

    if (error) throw error

    const userIndex = data?.findIndex((user) => user.id === userId)
    return userIndex !== undefined && userIndex !== -1 ? userIndex + 1 : 0
  } catch (error) {
    console.error("Error getting user ranking:", error)
    return 0
  }
}
