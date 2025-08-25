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
import { User } from "lucide-react"

export default function SetupProfilePage() {
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkUserProfile()
  }, [])

  const checkUserProfile = async () => {
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
      console.error("Error checking user profile:", error)
      router.push("/auth/login")
    } finally {
      setInitialLoading(false)
    }
  }

  const handleSetupProfile = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username.trim()) {
      toast.error("Please enter a username")
      return
    }

    if (username.length < 3) {
      toast.error("Username must be at least 3 characters")
      return
    }

    if (username.length > 20) {
      toast.error("Username must be less than 20 characters")
      return
    }

    setLoading(true)
    try {
      await completeProfile(username.trim())
      toast.success("Profile completed successfully!")
      router.push("/games")
    } catch (error: any) {
      toast.error(error.message || "Failed to complete profile")
    } finally {
      setLoading(false)
    }
  }

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Setting up your profile...</p>
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
          <CardTitle className="text-2xl">Choose Your Username</CardTitle>
          <CardDescription>
            Pick a unique username that will represent you in the Hall of Fame and achievements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSetupProfile} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-base font-medium">
                Username
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Choose your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.replace(/[^a-zA-Z0-9_]/g, ""))}
                  required
                  className="h-12 text-base pl-10"
                  disabled={loading}
                  minLength={3}
                  maxLength={20}
                />
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>• 3-20 characters long</p>
                <p>• Letters, numbers, and underscores only</p>
                <p>• Will be visible to other users</p>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-base font-medium"
              disabled={loading || !username.trim()}
            >
              {loading ? "Setting Up Profile..." : "Complete Setup"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
