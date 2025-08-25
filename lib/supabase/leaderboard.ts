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
  position: number
}

export async function getLeaderboard(limit = 50): Promise<LeaderboardEntry[]> {
  try {
    const { data, error } = await supabase.from("leaderboard").select("*").limit(limit)

    if (error) throw error

    return data || []
  } catch (error) {
    console.error("Get leaderboard error:", error)
    throw error
  }
}

export async function getUserRank(userId: string): Promise<number | null> {
  try {
    const { data, error } = await supabase.from("leaderboard").select("position").eq("id", userId).single()

    if (error) throw error

    return data?.position || null
  } catch (error) {
    console.error("Get user rank error:", error)
    return null
  }
}
