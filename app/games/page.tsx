"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Crown,
  GamepadIcon,
  Star,
  Trophy,
  Zap,
  Users,
  Gift,
  Play,
  Target,
  Award,
  Shield,
  Settings,
  BookOpen,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function GamesPage() {
  const router = useRouter()

  // Mock user data for display
  const userData = {
    username: "Player123",
    rank: "Bronze",
    coins: 250,
    xp: 750,
    total_matches: 15,
    win_rate: 68,
    best_subject: "Math",
  }

  const handleLogout = () => {
    router.push("/auth/login")
  }

  const recentAchievements = [
    {
      title: "First Steps",
      description: "Complete your first quiz",
      icon: <Trophy className="w-6 h-6 text-orange-500" />,
      earned: true,
      date: "2 days ago",
    },
    {
      title: "Quick Learner",
      description: "Answer 10 questions correctly",
      icon: <Zap className="w-6 h-6 text-blue-500" />,
      earned: true,
      date: "1 day ago",
    },
    {
      title: "Math Wizard",
      description: "Score 80% in mathematics",
      icon: <Star className="w-6 h-6 text-yellow-500" />,
      earned: false,
      date: "Locked",
    },
    {
      title: "Streak Master",
      description: "Maintain a 5-day learning streak",
      icon: <Shield className="w-6 h-6 text-green-500" />,
      earned: false,
      date: "Locked",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* User Info Header Card */}
        <Card className="mb-8 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white border-0 shadow-2xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-3xl"></div>
          <CardContent className="p-8 relative z-10">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                  <GamepadIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-2">Welcome back, {userData.username}</h1>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-orange-500/90 px-3 py-1 rounded-full">
                      <Crown className="w-4 h-4 text-white" />
                      <span className="font-semibold text-white">{userData.rank}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-yellow-500/90 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 text-white fill-current" />
                      <span className="font-semibold text-white">{userData.coins}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <Settings className="w-6 h-6" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={handleLogout}>
                  <LogOut className="w-6 h-6" />
                </Button>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/90">Progress to next level</span>
                <span className="text-white font-semibold">{userData.xp} XP</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-400 to-blue-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(userData.xp / 1000) * 100}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Quick Assessment */}
          <Link href="/games/mode-selection">
            <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group h-32">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                <Play className="w-8 h-8 mb-3 transform transition-all duration-300 group-hover:scale-110" />
                <h3 className="font-bold text-lg mb-1">Quick Assessment</h3>
                <p className="text-sm opacity-90">Start practice session</p>
              </CardContent>
            </Card>
          </Link>

          {/* Hall of Fame */}
          <Link href="/games/leaderboard">
            <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group h-32">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                <Trophy className="w-8 h-8 mb-3 transform transition-all duration-300 group-hover:scale-110" />
                <h3 className="font-bold text-lg mb-1">Hall of Fame</h3>
                <p className="text-sm opacity-90">View top performers</p>
              </CardContent>
            </Card>
          </Link>

          {/* Achievements */}
          <Link href="/games/rewards">
            <Card className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group h-32">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                <Gift className="w-8 h-8 mb-3 transform transition-all duration-300 group-hover:scale-110" />
                <h3 className="font-bold text-lg mb-1">Achievements</h3>
                <p className="text-sm opacity-90">View progress</p>
              </CardContent>
            </Card>
          </Link>

          {/* Study Groups */}
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-xl opacity-75 cursor-not-allowed h-32">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
              <Users className="w-8 h-8 mb-3" />
              <h3 className="font-bold text-lg mb-1">Study Groups</h3>
              <p className="text-sm opacity-90">Coming soon</p>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Assessments */}
          <Card className="bg-gradient-to-br from-blue-600/10 to-blue-700/10 border border-blue-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Total Assessments</p>
                  <p className="text-3xl font-bold text-blue-600">{userData.total_matches}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Success Rate */}
          <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Success Rate</p>
                  <p className="text-3xl font-bold text-orange-500">{userData.win_rate}%</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Zap className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Strongest Subject */}
          <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Strongest Subject</p>
                  <p className="text-3xl font-bold text-green-600">{userData.best_subject}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Achievements */}
        <Card className="bg-gradient-to-br from-gray-50 to-blue-50/50 border border-gray-200 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-gray-900 text-xl">
              <Award className="w-6 h-6 text-orange-500" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAchievements.map((achievement, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 hover:shadow-md transform hover:scale-[1.02] cursor-pointer ${
                  achievement.earned
                    ? "bg-gradient-to-r from-green-50 to-blue-50 border-green-200 hover:from-green-100 hover:to-blue-100"
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100 opacity-60"
                }`}
              >
                <div className={`p-3 rounded-full ${achievement.earned ? "bg-white shadow-sm" : "bg-gray-200"}`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{achievement.title}</div>
                  <div className="text-sm text-gray-600">{achievement.description}</div>
                </div>
                <div className="text-right">
                  <div className={`text-xs ${achievement.earned ? "text-green-600" : "text-gray-500"}`}>
                    {achievement.date}
                  </div>
                  {achievement.earned && (
                    <Badge className="mt-1 bg-green-100 text-green-800 hover:bg-green-200">Earned</Badge>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
