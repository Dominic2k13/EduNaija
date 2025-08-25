"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { completeProfile, getCurrentUser } from "@/lib/supabase/auth"
import { toast } from "sonner"
import { User, Trophy, Star } from "lucide-react"

export default function SetupProfilePage() {
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await getCurrentUser()
        if (!user) {
          router.push("/auth/login")
          return
        }
        if (user.profile_completed) {
          router.push("/games")
          return
        }
      } catch (error) {
        console.error("Error checking user:", error)
        router.push("/auth/login")
      } finally {
        setCheckingAuth(false)
      }
    }

    checkUser()
  }, [router])

  const handleCompleteProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim()) return

    if (username.length < 3) {
      toast.error("Username must be at least 3 characters")
      return
    }

    if (username.length > 20) {
      toast.error("Username must be less than 20 characters")
      return
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      toast.error("Username can only contain letters, numbers, and underscores")
      return
    }

    setLoading(true)
    try {
      await completeProfile(username.trim())
      toast.success("Profile completed! Welcome to HighScore!")
      router.push("/games")
    } catch (error: any) {
      toast.error(error.message || "Failed to complete profile")
    } finally {
      setLoading(false)
    }
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 relative">
              <Image
                src="/highscore-logo-final.png"
                alt="HighScore Logo"
                width={64}
                height={64}
                className="object-contain rounded-lg"
              />
            </div>
            <span className="text-2xl font-bold text-blue-900">HighScore</span>
          </div>
          <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
          <CardDescription>Choose a username to get started with your learning journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <Star className="w-4 h-4" />
              What you'll get:
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li className="flex items-center gap-2">
                <Trophy className="w-3 h-3" />
                Access to all learning games
              </li>
              <li className="flex items-center gap-2">
                <Trophy className="w-3 h-3" />
                Hall of Fame leaderboard
              </li>
              <li className="flex items-center gap-2">
                <Trophy className="w-3 h-3" />
                Achievement system
              </li>
              <li className="flex items-center gap-2">
                <Trophy className="w-3 h-3" />
                Progress tracking
              </li>
            </ul>
          </div>

          <form onSubmit={handleCompleteProfile} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-base font-medium flex items-center gap-2">
                <User className="w-4 h-4" />
                Choose Your Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your preferred username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="h-12 text-base"
                maxLength={20}
                disabled={loading}
              />
              <div className="text-sm text-gray-600 space-y-1">
                <p>• 3-20 characters long</p>
                <p>• Letters, numbers, and underscores only</p>
                <p>• This will be displayed on the Hall of Fame</p>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-base font-medium"
              disabled={loading || !username.trim()}
            >
              {loading ? "Setting up..." : "Complete Profile & Start Learning"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
