"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Trophy,
  Star,
  Shield,
  Crown,
  Zap,
  ArrowLeft,
  Gift,
  Award,
  Target,
  BookOpen,
  TrendingUp,
  Medal,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getUserAchievements, getAllAchievements, type Achievement } from "@/lib/supabase/achievements"
import { getCurrentUser } from "@/lib/supabase/auth"
import { toast } from "sonner"
import type { JSX } from "react/jsx-runtime"

export default function RewardsPage() {
  const [userAchievements, setUserAchievements] = useState<Achievement[]>([])
  const [allAchievements, setAllAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAchievements()
  }, [])

  const loadAchievements = async () => {
    try {
      const [allAchievementsData, currentUser] = await Promise.all([getAllAchievements(), getCurrentUser()])

      setAllAchievements(allAchievementsData)

      if (currentUser) {
        const userAchievementsData = await getUserAchievements(currentUser.id)
        setUserAchievements(userAchievementsData)
      }
    } catch (error) {
      console.error("Error loading achievements:", error)
      toast.error("Failed to load achievements")
    } finally {
      setLoading(false)
    }
  }

  const getAchievementIcon = (iconName: string) => {
    const iconMap: Record<string, JSX.Element> = {
      trophy: <Trophy className="w-6 h-6 text-orange-500" />,
      star: <Star className="w-6 h-6 text-yellow-500" />,
      zap: <Zap className="w-6 h-6 text-blue-500" />,
      crown: <Crown className="w-6 h-6 text-purple-500" />,
      shield: <Shield className="w-6 h-6 text-green-500" />,
      calculator: <Target className="w-6 h-6 text-indigo-500" />,
      microscope: <BookOpen className="w-6 h-6 text-teal-500" />,
    }
    return iconMap[iconName] || <Award className="w-6 h-6 text-gray-500" />
  }

  const getCategoryStats = () => {
    const categories = ["getting_started", "progress", "speed", "excellence", "subject", "dedication", "ranking"]
    return categories.map((category) => {
      const categoryAchievements = allAchievements.filter((a) => a.category === category)
      const earnedInCategory = userAchievements.filter((a) => a.category === category).length
      return {
        name: category.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase()),
        total: categoryAchievements.length,
        earned: earnedInCategory,
        percentage: categoryAchievements.length > 0 ? (earnedInCategory / categoryAchievements.length) * 100 : 0,
      }
    })
  }

  const totalEarned = userAchievements.length
  const totalAvailable = allAchievements.length
  const overallProgress = totalAvailable > 0 ? (totalEarned / totalAvailable) * 100 : 0
  const totalPoints = userAchievements.reduce((sum, achievement) => sum + achievement.points, 0)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading achievements...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/games">
              <Button variant="outline" size="icon" className="hover:bg-white/80 bg-transparent">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 relative">
                <Image
                  src="/highscore-logo-final.png"
                  alt="HighScore Logo"
                  width={48}
                  height={48}
                  className="object-contain rounded-lg"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Achievements</h1>
                <p className="text-gray-600">Track your learning milestones</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Total Earned</p>
                  <p className="text-2xl font-bold text-blue-600">{totalEarned}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Available</p>
                  <p className="text-2xl font-bold text-green-600">{totalAvailable}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Total Points</p>
                  <p className="text-2xl font-bold text-purple-600">{totalPoints}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Progress</p>
                  <p className="text-2xl font-bold text-orange-600">{Math.round(overallProgress)}%</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <Progress value={overallProgress} className="mt-3" />
            </CardContent>
          </Card>
        </div>

        {/* Category Progress */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Medal className="w-6 h-6 text-orange-500" />
              Category Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getCategoryStats().map((category, index) => (
                <div key={index} className="p-4 rounded-lg border bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{category.name}</h3>
                    <span className="text-sm text-gray-600">
                      {category.earned}/{category.total}
                    </span>
                  </div>
                  <Progress value={category.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements Grid */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Gift className="w-6 h-6 text-orange-500" />
              All Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allAchievements.map((achievement) => {
                const isEarned = userAchievements.some((ua) => ua.id === achievement.id)
                const earnedAchievement = userAchievements.find((ua) => ua.id === achievement.id)

                return (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-xl border transition-all duration-300 hover:shadow-md transform hover:scale-[1.02] ${
                      isEarned
                        ? "bg-gradient-to-r from-green-50 to-blue-50 border-green-200"
                        : "bg-gray-50 border-gray-200 opacity-75"
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`p-2 rounded-full ${isEarned ? "bg-white shadow-sm" : "bg-gray-200"}`}>
                        {getAchievementIcon(achievement.icon)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{achievement.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {achievement.category.replace("_", " ")}
                            </Badge>
                            <span className="text-xs text-gray-500">+{achievement.points} pts</span>
                          </div>
                          {isEarned && (
                            <div className="text-xs text-green-600">
                              {earnedAchievement?.earned_at &&
                                new Date(earnedAchievement.earned_at).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {isEarned && (
                      <Badge className="w-full justify-center bg-green-100 text-green-800 hover:bg-green-200">
                        <Trophy className="w-3 h-3 mr-1" />
                        Achieved
                      </Badge>
                    )}
                  </div>
                )
              })}
            </div>

            {allAchievements.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Gift className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No achievements available</h3>
                <p>Check back later for new achievements to unlock!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
