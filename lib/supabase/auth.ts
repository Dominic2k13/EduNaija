import { supabase } from "./client"

export interface UserProfile {
  id: string
  username: string
  email?: string
  rank: string
  coins: number
  xp: number
  total_matches: number
  win_rate: number
  best_subject: string
  created_at: string
  updated_at: string
}

export async function signUpWithUsername(username: string, email?: string) {
  try {
    // First check if username exists
    const { data: existingUser } = await supabase.from("users").select("username").eq("username", username).single()

    if (existingUser) {
      throw new Error("Username already exists")
    }

    // Create anonymous user
    const { data: authData, error: authError } = await supabase.auth.signInAnonymously()

    if (authError) throw authError

    // Create user profile
    const { data: userData, error: userError } = await supabase
      .from("users")
      .insert({
        id: authData.user.id,
        username,
        email: email || null,
        rank: "Bronze",
        coins: 250,
        xp: 150,
        total_matches: 0,
        win_rate: 0.0,
        best_subject: "None",
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

export async function signInWithUsername(username: string) {
  try {
    // Get user by username
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .single()

    if (userError || !userData) {
      throw new Error("Username not found")
    }

    // Sign in anonymously (in a real app, you'd use proper auth)
    const { data: authData, error: authError } = await supabase.auth.signInAnonymously()

    if (authError) throw authError

    // Update the user ID to match the new session
    await supabase.from("users").update({ id: authData.user.id }).eq("username", username)

    return { user: userData, session: authData.session }
  } catch (error) {
    console.error("Sign in error:", error)
    throw error
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
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
