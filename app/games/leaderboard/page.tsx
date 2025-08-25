"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Crown, Trophy, Medal, Star, ArrowLeft, Users, TrendingUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getLeaderboard, getUserRank, type LeaderboardEntry } from "@/lib/supabase/leaderboard"
import { getCurrentUser } from "@/lib/supabase/auth"
import { toast } from "sonner"

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [userRank, setUserRank] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadLeaderboardData()
  }, [])

  const loadLeaderboardData = async () => {
    try {
      const [leaderboardData, currentUser] = await Promise.all([getLeaderboard(50), getCurrentUser()])

      setLeaderboard(leaderboardData)

      if (currentUser) {
        const rank = await getUserRank(currentUser.id)
        setUserRank(rank)
      }
    } catch (error) {
      console.error("Error loading leaderboard:", error)
      toast.error("Failed to load leaderboard")
    } finally {
      setLoading(false)
    }
  }

  const getRankIcon = (position: number) => {
    if (position === 1) return <Crown className="w-6 h-6 text-yellow-500 fill-current" />
    if (position === 2) return <Trophy className="w-6 h-6 text-gray-400 fill-current" />
    if (position === 3) return <Medal className="w-6 h-6 text-orange-400 fill-current" />
    return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-600">#{position}</span>
  }

  const getRankColor = (position: number) => {
    if (position === 1) return "from-yellow-100 to-yellow-50 border-yellow-200"
    if (position === 2) return "from-gray-100 to-gray-50 border-gray-200"
    if (position === 3) return "from-orange-100 to-orange-50 border-orange-200"
    return "from-white to-gray-50 border-gray-200"
  }

  const maxXP = leaderboard.length > 0 ? leaderboard[0].xp : 1000

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Hall of Fame...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
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
                <h1 className="text-3xl font-bold text-gray-900">Hall of Fame</h1>
                <p className="text-gray-600">Top performing students</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Total Students</p>
                  <p className="text-2xl font-bold text-blue-600">{leaderboard.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Your Rank</p>
                  <p className="text-2xl font-bold text-green-600">{userRank ? `#${userRank}` : "Not ranked"}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Top Score</p>
                  <p className="text-2xl font-bold text-purple-600">{leaderboard[0]?.xp || 0} XP</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard */}
        <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-gray-900 text-xl">
              <Trophy className="w-6 h-6 text-orange-500" />
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 p-6">
            {leaderboard.length > 0 ? (
              leaderboard.map((user, index) => (
                <div
                  key={user.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 hover:shadow-md transform hover:scale-[1.02] bg-gradient-to-r ${getRankColor(
                    user.position,
                  )}`}
                >
                  <div className="flex items-center gap-4">
                    {getRankIcon(user.position)}
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900 text-lg">{user.username}</h3>
                      <Badge
                        className={`${
                          user.rank === "Gold"
                            ? "bg-yellow-100 text-yellow-800"
                            : user.rank === "Silver"
                              ? "bg-gray-100 text-gray-800"
                              : user.rank === "Bronze"
                                ? "bg-orange-100 text-orange-800"
                                : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {user.rank}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        {user.xp} XP
                      </span>
                      <span>{user.total_matches} assessments</span>
                      <span>{user.win_rate}% success rate</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-1 text-yellow-600 font-semibold">
                      <Star className="w-4 h-4 fill-current" />
                      {user.coins}
                    </div>
                    <Progress value={(user.xp / maxXP) * 100} className="w-24 h-2" />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Trophy className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No rankings yet</h3>
                <p>Complete assessments to appear on the Hall of Fame!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
