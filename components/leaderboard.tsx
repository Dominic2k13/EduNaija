"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Medal, Award, Crown, Star, TrendingUp, Calendar, GamepadIcon } from "lucide-react"

interface LeaderboardEntry {
  name: string
  score: number
  game: string
  date: string
  rank?: number
}

interface LeaderboardProps {
  gameFilter?: string
  showAllGames?: boolean
}

export default function Leaderboard({ gameFilter, showAllGames = true }: LeaderboardProps) {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([])
  const [selectedGame, setSelectedGame] = useState<string>("all")

  const defaultLeaderboardData: LeaderboardEntry[] = [
  {
    name: "You",
    score: 250,
    game: "Quiz Master",
    date: new Date().toISOString(),
  },
  {
    name: "Maureen vincent",
    score: 390,
    game: "Math Champion",
    date: new Date().toISOString(),
  },
  {
    name: "Uche Okafor",
    score: 370,
    game: "Science Explorer",
    date: new Date().toISOString(),
  },
  {
    name: "Adenike Ruth",
    score: 350,
    game: "Word Wizard",
    date: new Date().toISOString(),
  },
  {
    name: "Kayode Arigbede",
    score: 330,
    game: "Quiz Master",
    date: new Date().toISOString(),
  },
  {
    name: "Chinnazam Nnaemeka",
    score: 310,
    game: "Math Champion",
    date: new Date().toISOString(),
  },
  {
    name: "Daniella Emmanuel",
    score: 290,
    game: "Science Explorer",
    date: new Date().toISOString(),
  },
  {
    name: "Somtochukwu Eze",
    score: 270,
    game: "Word Wizard",
    date: new Date().toISOString(),
  },
  {
    name: "Emeka Akamelaku",
    score: 250,
    game: "Quiz Master",
    date: new Date().toISOString(),
  },
  {
    name: "Mary Charles",
    score: 230,
    game: "Math Champion",
    date: new Date().toISOString(),
  },
]

useEffect(() => {
  const stored = localStorage.getItem("gameLeaderboard")
  if (!stored || stored === "[]") {
  localStorage.setItem("gameLeaderboard", JSON.stringify(defaultLeaderboardData))
}

  let entries: LeaderboardEntry[] = stored && stored !== "[]"
    ? JSON.parse(stored)
    : defaultLeaderboardData

  // Apply game filter
  if (gameFilter && gameFilter !== "all") {
    entries = entries.filter((entry) => entry.game === gameFilter)
  } else if (selectedGame !== "all") {
    entries = entries.filter((entry) => entry.game === selectedGame)
  }

  // Sort and rank entries
  entries = entries
    .sort((a, b) => b.score - a.score) // Highest scores first
    .map((entry, index) => ({ ...entry, rank: index + 1 }))

  setLeaderboardData(entries.slice(0, 10)) // Top 10
}, [gameFilter, selectedGame])


  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Award className="w-6 h-6 text-orange-500" />
      default:
        return (
          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600">
            {rank}
          </div>
        )
    }
  }

  const getGameColor = (game: string) => {
    switch (game) {
      case "Quiz Master":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Math Champion":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Science Explorer":
        return "bg-red-100 text-red-800 border-red-200"
      case "Word Wizard":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 400) return "text-red-600"
    if (score >= 300) return "text-blue-600"
    if (score >= 200) return "text-green-600"
    return "text-gray-600"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const generateAvatar = (name: string, rank: number) => {
    const colors = [
      "bg-red-500",
      "bg-blue-600",
      "bg-green-600",
      "bg-orange-500",
      "bg-purple-600",
      "bg-pink-500",
      "bg-indigo-600",
      "bg-teal-600",
    ]
    const colorIndex = (name.charCodeAt(0) + rank) % colors.length
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)

    return (
      <div
        className={`w-12 h-12 rounded-full ${colors[colorIndex]} flex items-center justify-center text-white font-bold text-lg shadow-lg transform transition-all duration-300 hover:scale-110`}
      >
        {initials}
      </div>
    )
  }

  const games = ["all", "Quiz Master", "Math Champion", "Science Explorer", "Word Wizard"]

  return (
    <Card className="w-full hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-orange-500" />
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Leaderboard
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">Top performers across all games</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-600">{leaderboardData.length} entries</span>
          </div>
        </div>

        {showAllGames && (
          <div className="flex flex-wrap gap-2 mt-4">
            {games.map((game) => (
              <Button
                key={game}
                variant={selectedGame === game ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedGame(game)}
                className={`text-xs transition-all duration-300 transform hover:scale-105 ${
                  selectedGame === game
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                }`}
              >
                {game === "all" ? "All Games" : game}
              </Button>
            ))}
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-3">
        {leaderboardData.length === 0 ? (
          <div className="text-center py-12">
            <GamepadIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No scores yet!</h3>
            <p className="text-gray-500">Be the first to play and claim the top spot!</p>
          </div>
        ) : (
          leaderboardData.map((entry, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-500 hover:shadow-md transform hover:-translate-y-1 cursor-pointer group ${
                entry.rank === 1
                  ? "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 shadow-sm hover:shadow-lg"
                  : entry.rank === 2
                    ? "bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200 hover:bg-gradient-to-r hover:from-gray-100 hover:to-slate-100"
                    : entry.rank === 3
                      ? "bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200 hover:bg-gradient-to-r hover:from-orange-100 hover:to-amber-100"
                      : "bg-white border-gray-100 hover:bg-gray-50"
              }`}
            >
              {/* Rank Icon */}
              <div className="flex-shrink-0 transform transition-all duration-300 group-hover:scale-110">
                {getRankIcon(entry.rank!)}
              </div>

              {/* Avatar */}
              <div className="flex-shrink-0">{generateAvatar(entry.name, entry.rank!)}</div>

              {/* Player Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors duration-300">
                    {entry.name}
                  </h3>
                  {entry.rank === 1 && <Star className="w-4 h-4 text-yellow-500 fill-current animate-pulse" />}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(entry.date)}</span>
                </div>
              </div>

              {/* Game Badge */}
              <div className="flex-shrink-0">
                <Badge
                  variant="outline"
                  className={`${getGameColor(entry.game)} font-medium transition-all duration-300 group-hover:scale-105`}
                >
                  {entry.game}
                </Badge>
              </div>

              {/* Score */}
              <div className="flex-shrink-0 text-right">
                <div
                  className={`text-2xl font-bold ${getScoreColor(entry.score)} transition-all duration-300 group-hover:scale-110`}
                >
                  {entry.score.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">points</div>
              </div>
            </div>
          ))
        )}

        {leaderboardData.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2 group cursor-pointer">
                <Crown className="w-4 h-4 text-yellow-500 transition-all duration-300 group-hover:scale-110" />
                <span className="group-hover:text-yellow-600 transition-colors duration-300">Champion</span>
              </div>
              <div className="flex items-center gap-2 group cursor-pointer">
                <Medal className="w-4 h-4 text-gray-400 transition-all duration-300 group-hover:scale-110" />
                <span className="group-hover:text-gray-600 transition-colors duration-300">Runner-up</span>
              </div>
              <div className="flex items-center gap-2 group cursor-pointer">
                <Award className="w-4 h-4 text-orange-500 transition-all duration-300 group-hover:scale-110" />
                <span className="group-hover:text-orange-600 transition-colors duration-300">Third Place</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
