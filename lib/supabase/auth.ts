import { supabase } from "./client"

export interface UserProfile {
  id: string
  email: string
  username: string | null
  rank: string
  coins: number
  xp: number
  total_matches: number
  win_rate: number
  best_subject: string
  profile_completed: boolean
  created_at: string
  updated_at: string
}

export async function signUpWithEmail(email: string, password: string) {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) throw authError

    if (!authData.user) throw new Error("Failed to create user")

    // Create user profile
    const { data: userData, error: userError } = await supabase
      .from("users")
      .insert({
        id: authData.user.id,
        email,
        username: null,
        rank: "Bronze",
        coins: 250,
        xp: 150,
        total_matches: 0,
        win_rate: 0.0,
        best_subject: "None",
        profile_completed: false,
      })
      .select()
      .single()

    if (userError) throw userError

    return { user: userData, session: authData.session }
  } catch (error) {
    console.error("Sign up error:", error)
    throw error
  }
}

export async function signInWithEmail(email: string, password: string) {
  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) throw authError

    // Get user profile
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", authData.user.id)
      .single()

    if (userError) throw userError

    return { user: userData, session: authData.session }
  } catch (error) {
    console.error("Sign in error:", error)
    throw error
  }
}

export async function completeProfile(username: string) {
  try {
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser()

    if (!authUser) throw new Error("Not authenticated")

    // Check if username is available
    const { data: existingUser } = await supabase.from("users").select("username").eq("username", username).single()

    if (existingUser) {
      throw new Error("Username already taken")
    }

    // Update user profile
    const { data: userData, error: userError } = await supabase
      .from("users")
      .update({
        username,
        profile_completed: true,
      })
      .eq("id", authUser.id)
      .select()
      .single()

    if (userError) throw userError

    // Award welcome achievement
    const { data: welcomeAchievement } = await supabase
      .from("achievements")
      .select("id")
      .eq("title", "Welcome Aboard")
      .single()

    if (welcomeAchievement) {
      await supabase.from("user_achievements").insert({
        user_id: authUser.id,
        achievement_id: welcomeAchievement.id,
      })
    }

    return userData
  } catch (error) {
    console.error("Complete profile error:", error)
    throw error
  }
}

export async function getCurrentUser(): Promise<UserProfile | null> {
  try {
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser()

    if (!authUser) return null

    const { data: userData, error } = await supabase.from("users").select("*").eq("id", authUser.id).single()

    if (error) throw error

    return userData
  } catch (error) {
    console.error("Get current user error:", error)
    return null
  }
}

export async function updateUserStats(userId: string, updates: Partial<UserProfile>) {
  try {
    const { data, error } = await supabase
      .from("users")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", userId)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error("Update user stats error:", error)
    throw error
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}
