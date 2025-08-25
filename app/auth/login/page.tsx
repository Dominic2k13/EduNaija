"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { User } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim()) return

    setLoading(true)

    // Simulate login process
    setTimeout(() => {
      // For now, just redirect to games page
      router.push("/games")
    }, 1000)
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
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to access your learning dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-base font-medium">
                Username
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="h-12 text-base pl-10"
                  disabled={loading}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-base font-medium"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              New to HighScore?{" "}
              <Link href="/auth/register" className="text-blue-600 hover:text-blue-700 font-medium">
                Create account
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
