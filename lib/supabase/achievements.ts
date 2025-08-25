import { supabase } from "./client"

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  requirement_type: string
  requirement_value: number
  xp_reward: number
  coin_reward: number
  created_at: string
  earned_at?: string
}

export async function getAllAchievements(): Promise<Achievement[]> {
  try {
    const { data, error } = await supabase.from("achievements").select("*").order("created_at", { ascending: true })

    if (error) throw error

    return data || []
  } catch (error) {
    console.error("Error fetching all achievements:", error)
    return []
  }
}

export async function getUserAchievements(userId: string): Promise<Achievement[]> {
  try {
    const { data, error } = await supabase
      .from("achievements")
      .select(`
        *,
        user_achievements!left(earned_at)
      `)
      .eq("user_achievements.user_id", userId)

    if (error) throw error

    return (
      data?.map((achievement) => ({
        ...achievement,
        earned_at: achievement.user_achievements?.[0]?.earned_at || null,
      })) || []
    )
  } catch (error) {
    console.error("Error fetching user achievements:", error)
    return []
  }
}

export async function checkAndAwardAchievements(
  userId: string,
  stats: {
    total_matches?: number
    win_rate?: number
    xp?: number
    coins?: number
  },
) {
  try {
    // Get all achievements
    const { data: achievements, error: achievementsError } = await supabase.from("achievements").select("*")

    if (achievementsError) throw achievementsError

    // Get user's current achievements
    const { data: userAchievements, error: userAchievementsError } = await supabase
      .from("user_achievements")
      .select("achievement_id")
      .eq("user_id", userId)

    if (userAchievementsError) throw userAchievementsError

    const earnedAchievementIds = new Set(userAchievements?.map((ua) => ua.achievement_id) || [])

    // Check each achievement
    for (const achievement of achievements || []) {
      if (earnedAchievementIds.has(achievement.id)) continue

      let shouldAward = false

      switch (achievement.requirement_type) {
        case "matches_played":
          shouldAward = (stats.total_matches || 0) >= achievement.requirement_value
          break
        case "win_rate":
          shouldAward = (stats.win_rate || 0) >= achievement.requirement_value
          break
        case "xp_earned":
          shouldAward = (stats.xp || 0) >= achievement.requirement_value
          break
        case "coins_earned":
          shouldAward = (stats.coins || 0) >= achievement.requirement_value
          break
      }

      if (shouldAward) {
        // Award the achievement
        await supabase.from("user_achievements").insert({
          user_id: userId,
          achievement_id: achievement.id,
        })

        // Update user stats with rewards
        await supabase
          .from("users")
          .update({
            xp: (stats.xp || 0) + achievement.xp_reward,
            coins: (stats.coins || 0) + achievement.coin_reward,
          })
          .eq("id", userId)
      }
    }
  } catch (error) {
    console.error("Error checking achievements:", error)
  }
}

export async function awardAchievement(userId: string, achievementId: string) {
  try {
    const { data, error } = await supabase
      .from("user_achievements")
      .insert({
        user_id: userId,
        achievement_id: achievementId,
      })
      .select()
      .single()

    if (error) throw error

    return data
  } catch (error) {
    console.error("Award achievement error:", error)
    throw error
  }
}
