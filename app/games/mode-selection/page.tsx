"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, BookOpen, Target, Clock, Star } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ModeSelectionPage() {
  const [selectedMode, setSelectedMode] = useState<string | null>(null)
  const router = useRouter()

  const gameModes = [
    {
      id: "subject-combination",
      title: "Subject Combination",
      description: "Mix multiple subjects for variety",
      icon: <BookOpen className="w-8 h-8 text-white" />,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "single-subject",
      title: "Single Subject",
      description: "Focus on one subject area",
      icon: <Target className="w-8 h-8 text-white" />,
      color: "from-green-500 to-green-600",
    },
    {
      id: "topic-mode",
      title: "Topic Mode",
      description: "Dive deep into specific topics",
      icon: <Clock className="w-8 h-8 text-white" />,
      color: "from-pink-500 to-pink-600",
    },
    {
      id: "general-knowledge",
      title: "General Knowledge",
      description: "Random questions from all areas",
      icon: <Star className="w-8 h-8 text-white" />,
      color: "from-orange-500 to-orange-600",
    },
  ]

  const handleStartGame = () => {
    if (selectedMode) {
      router.push("/games/subject-selection")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/games">
            <Button variant="outline" size="icon" className="hover:bg-blue-50 bg-transparent">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Choose Assessment Mode</h1>
            <p className="text-gray-600">Select how you'd like to practice today</p>
          </div>
        </div>

        {/* Game Mode Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {gameModes.map((mode) => (
            <Card
              key={mode.id}
              className={`cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl border-2 ${
                selectedMode === mode.id
                  ? "border-blue-500 shadow-lg scale-105"
                  : "border-gray-200 hover:border-blue-300"
              }`}
              onClick={() => setSelectedMode(mode.id)}
            >
              <CardContent className="p-0">
                <div className={`bg-gradient-to-br ${mode.color} p-6 text-white`}>
                  <div className="flex items-center justify-center mb-4">{mode.icon}</div>
                  <h3 className="text-xl font-bold text-center mb-2">{mode.title}</h3>
                  <p className="text-center opacity-90">{mode.description}</p>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-center">
                    <div
                      className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                        selectedMode === mode.id ? "bg-blue-500 border-blue-500" : "border-gray-300"
                      }`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Start Game Button */}
        <div className="text-center">
          <Button
            onClick={handleStartGame}
            disabled={!selectedMode}
            className="px-8 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start Assessment
          </Button>
        </div>
      </div>
    </div>
  )
}
