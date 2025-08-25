import { supabase } from "./client"

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  category: string
  points: number
  earned_at?: string
  created_at: string
}

export async function getUserAchievements(userId: string): Promise<Achievement[]> {
  try {
    const { data, error } = await supabase
      .from("achievements")
      .select(`
        *,
        user_achievements!inner(earned_at)
      `)
      .eq("user_achievements.user_id", userId)

    if (error) throw error

    return (
      data?.map((achievement) => ({
        ...achievement,
        earned_at: achievement.user_achievements[0]?.earned_at,
      })) || []
    )
  } catch (error) {
    console.error("Get user achievements error:", error)
    throw error
  }
}

export async function getAllAchievements(): Promise<Achievement[]> {
  try {
    const { data, error } = await supabase.from("achievements").select("*").order("category", { ascending: true })

    if (error) throw error

    return data || []
  } catch (error) {
    console.error("Get all achievements error:", error)
    throw error
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
