"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import { Trophy, Target, BookOpen, Users, Star, Zap, Award, TrendingUp, Brain } from "lucide-react"
import { getCurrentUser, type UserProfile } from "@/lib/supabase/auth"
import { toast } from "sonner"

export default function GamesPage() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser()
        if (!currentUser) {
          router.push("/auth/login")
          return
        }

        // Check if profile is completed
        if (!currentUser.profile_completed) {
          router.push("/auth/setup-profile")
          return
        }

        setUser(currentUser)
      } catch (error) {
        console.error("Error checking user:", error)
        toast.error("Failed to load user data")
        router.push("/auth/login")
      } finally {
        setLoading(false)
      }
    }

    checkUser()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const games = [
    {
      id: "quiz-master",
      title: "Quiz Master",
      description: "Test your knowledge across multiple subjects",
      icon: Brain,
      difficulty: "Medium",
      players: "1,234",
      xpReward: "50-150 XP",
      color: "bg-blue-500",
      route: "/games/quiz-master",
    },
    {
      id: "math-champion",
      title: "Math Champion",
      description: "Solve mathematical problems and climb the ranks",
      icon: Target,
      difficulty: "Hard",
      players: "892",
      xpReward: "75-200 XP",
      color: "bg-green-500",
      route: "/games/math-champion",
    },
    {
      id: "science-explorer",
      title: "Science Explorer",
      description: "Discover the wonders of science through interactive challenges",
      icon: BookOpen,
      difficulty: "Easy",
      players: "1,567",
      xpReward: "25-100 XP",
      color: "bg-purple-500",
      route: "/games/science-explorer",
    },
  ]

  const quickActions = [
    {
      title: "Hall of Fame",
      description: "See top performers",
      icon: Trophy,
      route: "/games/leaderboard",
      color: "bg-yellow-500",
    },
    {
      title: "My Rewards",
      description: "View achievements",
      icon: Award,
      route: "/games/rewards",
      color: "bg-pink-500",
    },
    {
      title: "Subject Selection",
      description: "Choose your focus",
      icon: BookOpen,
      route: "/games/subject-selection",
      color: "bg-indigo-500",
    },
    {
      title: "Game Modes",
      description: "Different ways to play",
      icon: Zap,
      route: "/games/mode-selection",
      color: "bg-orange-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 relative">
                <Image
                  src="/highscore-logo-final.png"
                  alt="HighScore Logo"
                  width={40}
                  height={40}
                  className="object-contain rounded-lg"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.username}!</h1>
                <p className="text-gray-600">Ready to continue your learning journey?</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-sm">
                <Star className="w-4 h-4 mr-1" />
                {user.rank}
              </Badge>
              <Badge variant="outline" className="text-sm">
                <Zap className="w-4 h-4 mr-1" />
                {user.xp} XP
              </Badge>
              <Badge variant="outline" className="text-sm">
                <Trophy className="w-4 h-4 mr-1" />
                {user.coins} Coins
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Matches</p>
                  <p className="text-2xl font-bold text-gray-900">{user.total_matches}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Win Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{(user.win_rate * 100).toFixed(1)}%</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Best Subject</p>
                  <p className="text-2xl font-bold text-gray-900">{user.best_subject}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Current Rank</p>
                  <p className="text-2xl font-bold text-gray-900">{user.rank}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress to Next Rank */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Progress to Next Rank</h3>
              <Badge variant="outline">{user.xp}/1000 XP</Badge>
            </div>
            <Progress value={(user.xp / 1000) * 100} className="h-3" />
            <p className="text-sm text-gray-600 mt-2">{1000 - user.xp} XP needed to reach Silver rank</p>
          </CardContent>
        </Card>

        {/* Games Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {games.map((game) => (
              <Card key={game.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 ${game.color} rounded-lg flex items-center justify-center`}>
                      <game.icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="outline">{game.difficulty}</Badge>
                  </div>
                  <CardTitle className="text-xl">{game.title}</CardTitle>
                  <CardDescription>{game.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {game.players} players
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        {game.xpReward}
                      </span>
                    </div>
                    <Button className="w-full" onClick={() => router.push(game.route)}>
                      Play Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Card
                key={action.title}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => router.push(action.route)}
              >
                <CardContent className="p-4 text-center">
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-sm">{action.title}</h3>
                  <p className="text-xs text-gray-600 mt-1">{action.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
