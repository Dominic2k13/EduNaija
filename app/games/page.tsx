"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Crown, GamepadIcon, Star, Trophy, Zap } from "lucide-react"
import Link from "next/link"
import Leaderboard from "@/components/leaderboard"

export default function GamesPage() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null)

  const games = [
    {
      id: "quiz-master",
      title: "Quiz Master",
      description: "Answer questions quickly to earn points and climb the leaderboard",
      difficulty: "Easy",
      players: "1,234",
      category: "General Knowledge",
      icon: <Zap className="w-8 h-8 text-orange-500" />,
      color: "border-orange-500",
      bgColor: "bg-orange-50",
      hoverColor: "hover:bg-orange-100",
    },
    {
      id: "math-champion",
      title: "Math Champion",
      description: "Solve mathematical problems in time-based challenges",
      difficulty: "Medium",
      players: "856",
      category: "Mathematics",
      icon: <Trophy className="w-8 h-8 text-blue-600" />,
      color: "border-blue-600",
      bgColor: "bg-blue-50",
      hoverColor: "hover:bg-blue-100",
    },
    {
      id: "science-explorer",
      title: "Science Explorer",
      description: "Explore physics and chemistry through interactive quizzes",
      difficulty: "Hard",
      players: "642",
      category: "Science",
      icon: <Star className="w-8 h-8 text-red-600" />,
      color: "border-red-600",
      bgColor: "bg-red-50",
      hoverColor: "hover:bg-red-100",
    },
    {
      id: "word-wizard",
      title: "Word Wizard",
      description: "Master English language through vocabulary and grammar games",
      difficulty: "Medium",
      players: "1,089",
      category: "English",
      icon: <Crown className="w-8 h-8 text-green-600" />,
      color: "border-green-600",
      bgColor: "bg-green-50",
      hoverColor: "hover:bg-green-100",
    },
  ]

  const achievements = [
    { title: "First Victory", description: "Win your first game", unlocked: true },
    { title: "Speed Demon", description: "Answer 10 questions in under 30 seconds", unlocked: true },
    { title: "Math Genius", description: "Score 100% in a Math game", unlocked: false },
    { title: "Streak Master", description: "Maintain a 7-day playing streak", unlocked: false },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">EN</span>
            </div>
            <span className="text-2xl font-bold text-blue-900">EduNaija</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/tutorials"
              className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group"
            >
              Tutorials
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/cbt"
              className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group"
            >
              CBT Practice
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/games" className="text-blue-600 font-medium relative">
              Games
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600"></span>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105 bg-transparent"
              >
                Login
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Learning Games</h1>
          <p className="text-gray-600 mb-6">
            Make learning fun with our gamified quiz platform. Compete with friends and earn achievements!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Games Grid */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">Choose Your Game</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {games.map((game) => (
                  <div key={game.id}>
                    <Link href={`/games/${game.id}`}>
                      <Card
                        className={`border-l-4 ${game.color} ${game.bgColor} hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer group overflow-hidden relative`}
                      >
                        <div
                          className={`absolute inset-0 ${game.hoverColor} opacity-0 group-hover:opacity-100 transition-all duration-300`}
                        ></div>
                        <CardHeader className="relative z-10">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                                {game.icon}
                              </div>
                              <div>
                                <CardTitle className="text-lg text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                                  {game.title}
                                </CardTitle>
                                <Badge variant="outline" className="mt-1 border-gray-400 text-gray-600">
                                  {game.category}
                                </Badge>
                              </div>
                            </div>
                            <Badge
                              variant={
                                game.difficulty === "Easy"
                                  ? "secondary"
                                  : game.difficulty === "Medium"
                                    ? "default"
                                    : "destructive"
                              }
                              className="transform transition-all duration-300 group-hover:scale-105"
                            >
                              {game.difficulty}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="relative z-10">
                          <CardDescription className="mb-4 text-gray-600">{game.description}</CardDescription>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <GamepadIcon className="w-4 h-4" />
                              <span>{game.players} players</span>
                            </div>
                            <Button
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700 text-white transform transition-all duration-300 group-hover:scale-105"
                            >
                              Play Now
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Player Stats */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-gray-900">Your Gaming Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center group cursor-pointer">
                    <div className="transform transition-all duration-300 group-hover:scale-110">
                      <div className="text-2xl font-bold text-blue-600">1,250</div>
                      <div className="text-sm text-gray-600">Total Points</div>
                    </div>
                  </div>
                  <div className="text-center group cursor-pointer">
                    <div className="transform transition-all duration-300 group-hover:scale-110">
                      <div className="text-2xl font-bold text-green-600">18</div>
                      <div className="text-sm text-gray-600">Games Won</div>
                    </div>
                  </div>
                  <div className="text-center group cursor-pointer">
                    <div className="transform transition-all duration-300 group-hover:scale-110">
                      <div className="text-2xl font-bold text-red-600">85%</div>
                      <div className="text-sm text-gray-600">Accuracy</div>
                    </div>
                  </div>
                  <div className="text-center group cursor-pointer">
                    <div className="transform transition-all duration-300 group-hover:scale-110">
                      <div className="text-2xl font-bold text-orange-500">7</div>
                      <div className="text-sm text-gray-600">Day Streak</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <Leaderboard showAllGames={false} />

            {/* Achievements */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Star className="w-5 h-5 text-orange-500" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border transition-all duration-300 hover:shadow-md transform hover:scale-105 cursor-pointer ${
                      achievement.unlocked
                        ? "bg-green-50 border-green-200 hover:bg-green-100"
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          achievement.unlocked ? "bg-green-500" : "bg-gray-400"
                        }`}
                      />
                      <div className="font-medium text-sm text-gray-900">{achievement.title}</div>
                    </div>
                    <div className="text-xs text-gray-600">{achievement.description}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Daily Challenge */}
            <Card className="hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Zap className="w-5 h-5 text-orange-500" />
                  Daily Challenge
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="font-medium mb-2 text-gray-900">Mathematics Sprint</div>
                  <div className="text-sm text-gray-600 mb-3">Solve 20 math problems in under 5 minutes</div>
                  <Progress value={60} className="mb-2" />
                  <div className="text-xs text-gray-500">12/20 completed</div>
                </div>
                <Button
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white transition-all duration-300 transform hover:scale-105"
                  size="sm"
                >
                  Continue Challenge
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
