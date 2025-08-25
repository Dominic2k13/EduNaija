"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { User, Mail } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim()) return

    setLoading(true)

    // Simulate registration process
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
          <CardTitle className="text-2xl">Create Your Account</CardTitle>
          <CardDescription>Register to access the learning platform</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-base font-medium">
                Username *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your preferred username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="h-12 text-base pl-10"
                  maxLength={20}
                  disabled={loading}
                />
              </div>
              <p className="text-sm text-gray-600">This will be displayed on the Hall of Fame and achievements</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-medium">
                Email (Optional)
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
