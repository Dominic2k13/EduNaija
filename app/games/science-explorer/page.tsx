"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, Trophy, ArrowRight, RotateCcw, Atom } from "lucide-react"
import Link from "next/link"

interface ScienceQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  subject: string
  difficulty: "Easy" | "Medium" | "Hard"
  explanation: string
}

const scienceQuestions: ScienceQuestion[] = [
  {
    id: 1,
    question: "What is the chemical symbol for water?",
    options: ["A. H₂O", "B. CO₂", "C. NaCl", "D. O₂"],
    correctAnswer: 0,
    subject: "Chemistry",
    difficulty: "Easy",
    explanation: "Water is composed of two hydrogen atoms and one oxygen atom, hence H₂O.",
  },
  {
    id: 2,
    question: "Which force keeps planets in orbit around the sun?",
    options: ["A. Magnetic force", "B. Gravitational force", "C. Electric force", "D. Nuclear force"],
    correctAnswer: 1,
    subject: "Physics",
    difficulty: "Medium",
    explanation: "Gravitational force between the sun and planets keeps them in orbital motion.",
  },
  {
    id: 3,
    question: "What is the powerhouse of the cell?",
    options: ["A. Nucleus", "B. Mitochondria", "C. Ribosome", "D. Chloroplast"],
    correctAnswer: 1,
    subject: "Biology",
    difficulty: "Easy",
    explanation: "Mitochondria produce ATP, the energy currency of cells.",
  },
  {
    id: 4,
    question: "Which gas makes up approximately 78% of Earth's atmosphere?",
    options: ["A. Oxygen", "B. Carbon dioxide", "C. Nitrogen", "D. Argon"],
    correctAnswer: 2,
    subject: "Chemistry",
    difficulty: "Medium",
    explanation: "Nitrogen (N₂) makes up about 78% of Earth's atmosphere.",
  },
  {
    id: 5,
    question: "What is the speed of light in vacuum?",
    options: ["A. 3 × 10⁸ m/s", "B. 3 × 10⁶ m/s", "C. 3 × 10⁷ m/s", "D. 3 × 10⁹ m/s"],
    correctAnswer: 0,
    subject: "Physics",
    difficulty: "Hard",
    explanation: "The speed of light in vacuum is approximately 299,792,458 m/s or 3 × 10⁸ m/s.",
  },
  {
    id: 6,
    question: "Which blood type is known as the universal donor?",
    options: ["A. Type A", "B. Type B", "C. Type AB", "D. Type O"],
    correctAnswer: 3,
    subject: "Biology",
    difficulty: "Medium",
    explanation: "Type O blood has no A or B antigens, making it compatible with all blood types.",
  },
  {
    id: 7,
    question: "What is the atomic number of carbon?",
    options: ["A. 4", "B. 6", "C. 8", "D. 12"],
    correctAnswer: 1,
    subject: "Chemistry",
    difficulty: "Easy",
    explanation: "Carbon has 6 protons in its nucleus, giving it an atomic number of 6.",
  },
  {
    id: 8,
    question: "Which law states that energy cannot be created or destroyed?",
    options: ["A. Newton's First Law", "B. Law of Conservation of Energy", "C. Ohm's Law", "D. Boyle's Law"],
    correctAnswer: 1,
    subject: "Physics",
    difficulty: "Medium",
    explanation:
      "The Law of Conservation of Energy states that energy can only be transformed from one form to another.",
  },
  {
    id: 9,
    question: "What process do plants use to make food from sunlight?",
    options: ["A. Respiration", "B. Photosynthesis", "C. Transpiration", "D. Fermentation"],
    correctAnswer: 1,
    subject: "Biology",
    difficulty: "Easy",
    explanation: "Photosynthesis converts light energy into chemical energy (glucose) using CO₂ and water.",
  },
  {
    id: 10,
    question: "Which element has the highest electronegativity?",
    options: ["A. Oxygen", "B. Nitrogen", "C. Fluorine", "D. Chlorine"],
    correctAnswer: 2,
    subject: "Chemistry",
    difficulty: "Hard",
    explanation: "Fluorine has the highest electronegativity value of 4.0 on the Pauling scale.",
  },
  {
    id: 11,
    question: "What is the unit of electric resistance?",
    options: ["A. Volt", "B. Ampere", "C. Ohm", "D. Watt"],
    correctAnswer: 2,
    subject: "Physics",
    difficulty: "Easy",
    explanation: "The ohm (Ω) is the SI unit of electrical resistance.",
  },
  {
    id: 12,
    question: "Which organelle is responsible for protein synthesis?",
    options: ["A. Mitochondria", "B. Ribosome", "C. Golgi apparatus", "D. Lysosome"],
    correctAnswer: 1,
    subject: "Biology",
    difficulty: "Medium",
    explanation: "Ribosomes are the cellular structures where proteins are synthesized.",
  },
  {
    id: 13,
    question: "What is the pH of a neutral solution?",
    options: ["A. 6", "B. 7", "C. 8", "D. 9"],
    correctAnswer: 1,
    subject: "Chemistry",
    difficulty: "Easy",
    explanation: "A neutral solution has a pH of 7, indicating equal concentrations of H⁺ and OH⁻ ions.",
  },
  {
    id: 14,
    question: "Which type of electromagnetic radiation has the shortest wavelength?",
    options: ["A. Radio waves", "B. Visible light", "C. X-rays", "D. Gamma rays"],
    correctAnswer: 3,
    subject: "Physics",
    difficulty: "Hard",
    explanation: "Gamma rays have the shortest wavelength and highest energy in the electromagnetic spectrum.",
  },
  {
    id: 15,
    question: "What is the main function of red blood cells?",
    options: ["A. Fight infection", "B. Transport oxygen", "C. Clot blood", "D. Produce hormones"],
    correctAnswer: 1,
    subject: "Biology",
    difficulty: "Easy",
    explanation: "Red blood cells contain hemoglobin, which binds to oxygen and transports it throughout the body.",
  },
]

export default function ScienceExplorerGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (gameStarted && !gameEnded && timeLeft > 0 && !showExplanation) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    } else if (timeLeft === 0 && gameStarted) {
      handleNextQuestion()
    }
    return () => clearTimeout(timer)
  }, [timeLeft, gameStarted, gameEnded, showExplanation])

  const startGame = () => {
    setGameStarted(true)
    setCurrentQuestion(0)
    setScore(0)
    setAnswers([])
    setTimeLeft(60)
    setGameEnded(false)
    setShowResult(false)
    setShowExplanation(false)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    const newAnswers = [...answers, selectedAnswer ?? -1]
    setAnswers(newAnswers)

    const isCorrect = selectedAnswer === scienceQuestions[currentQuestion].correctAnswer
    if (isCorrect) {
      const timeBonus = Math.floor(timeLeft / 10)
      const difficultyMultiplier =
        scienceQuestions[currentQuestion].difficulty === "Easy"
          ? 1
          : scienceQuestions[currentQuestion].difficulty === "Medium"
            ? 1.5
            : 2
      setScore(score + Math.floor((20 + timeBonus) * difficultyMultiplier))
    }

    // Show explanation for 3 seconds
    setShowExplanation(true)
    setTimeout(() => {
      setShowExplanation(false)

      if (currentQuestion + 1 < scienceQuestions.length) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setTimeLeft(60)
      } else {
        setGameEnded(true)
        setShowResult(true)
        saveGameResult()
      }
    }, 3000)
  }

  const saveGameResult = () => {
    const finalScore = score + (selectedAnswer === scienceQuestions[currentQuestion].correctAnswer ? 20 : 0)
    const gameData = {
      score: finalScore,
      date: new Date().toISOString(),
      questionsAnswered: scienceQuestions.length,
      correctAnswers:
        answers.filter((answer, index) => answer === scienceQuestions[index].correctAnswer).length +
        (selectedAnswer === scienceQuestions[currentQuestion].correctAnswer ? 1 : 0),
    }

    const existingData = localStorage.getItem("scienceExplorerResults") || "[]"
    const results = JSON.parse(existingData)
    results.push(gameData)
    localStorage.setItem("scienceExplorerResults", JSON.stringify(results))

    // Update leaderboard
    const leaderboardData = localStorage.getItem("gameLeaderboard") || "[]"
    const leaderboard = JSON.parse(leaderboardData)
    leaderboard.push({
      name: "You",
      score: finalScore,
      game: "Science Explorer",
      date: new Date().toISOString(),
    })
    leaderboard.sort((a: any, b: any) => b.score - a.score)
    localStorage.setItem("gameLeaderboard", JSON.stringify(leaderboard.slice(0, 10)))
  }

  const resetGame = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setTimeLeft(60)
    setGameStarted(false)
    setGameEnded(false)
    setAnswers([])
    setShowResult(false)
    setShowExplanation(false)
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="border-b bg-white sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">EduNaija</span>
            </Link>
            <Link href="/games">
              <Button variant="outline">Back to Games</Button>
            </Link>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <Atom className="w-16 h-16 text-purple-500 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Science Explorer</h1>
              <p className="text-xl text-gray-600 mb-8">
                Explore the fascinating world of Physics, Chemistry, and Biology through challenging questions!
              </p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Game Features</CardTitle>
              </CardHeader>
              <CardContent className="text-left space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold">1</span>
                  </div>
                  <span>Answer {scienceQuestions.length} science questions from Physics, Chemistry, and Biology</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold">2</span>
                  </div>
                  <span>60 seconds per question with time bonus points</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold">3</span>
                  </div>
                  <span>Detailed explanations after each answer</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold">4</span>
                  </div>
                  <span>Difficulty-based scoring system</span>
                </div>
              </CardContent>
            </Card>

            <Button size="lg" onClick={startGame} className="text-lg px-8 bg-purple-600 hover:bg-purple-700">
              Start Exploring
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (showExplanation) {
    const isCorrect = selectedAnswer === scienceQuestions[currentQuestion].correctAnswer
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6 text-center">
            <div className={`text-6xl mb-4 ${isCorrect ? "text-green-500" : "text-red-500"}`}>
              {isCorrect ? "✓" : "✗"}
            </div>
            <h2 className={`text-2xl font-bold mb-4 ${isCorrect ? "text-green-600" : "text-red-600"}`}>
              {isCorrect ? "Correct!" : "Incorrect!"}
            </h2>
            <div className="text-lg mb-4">
              <strong>Correct Answer:</strong>{" "}
              {scienceQuestions[currentQuestion].options[scienceQuestions[currentQuestion].correctAnswer]}
            </div>
            <div className="text-gray-600 mb-4">
              <strong>Explanation:</strong> {scienceQuestions[currentQuestion].explanation}
            </div>
            <div className="text-sm text-gray-500">Moving to next question...</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showResult) {
    const correctAnswers =
      answers.filter((answer, index) => answer === scienceQuestions[index].correctAnswer).length +
      (selectedAnswer === scienceQuestions[currentQuestion]?.correctAnswer ? 1 : 0)

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="border-b bg-white sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">EduNaija</span>
            </Link>
            <Link href="/games">
              <Button variant="outline">Back to Games</Button>
            </Link>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <Atom className="w-16 h-16 text-purple-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Science Quest Complete!</h1>

            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="text-6xl font-bold text-purple-600 mb-4">{score}</div>
                <div className="text-xl text-gray-600 mb-6">Final Score</div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{correctAnswers}</div>
                    <div className="text-sm text-gray-600">Correct Answers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {Math.round((correctAnswers / scienceQuestions.length) * 100)}%
                    </div>
                    <div className="text-sm text-gray-600">Accuracy</div>
                  </div>
                </div>

                <div className="space-y-2">
                  {score >= 400 && <Badge className="bg-purple-500">Science Genius!</Badge>}
                  {score >= 300 && score < 400 && <Badge className="bg-blue-500">Excellent Explorer!</Badge>}
                  {score >= 200 && score < 300 && <Badge className="bg-green-500">Good Scientist!</Badge>}
                  {score < 200 && <Badge variant="secondary">Keep Exploring!</Badge>}
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4 justify-center">
              <Button onClick={resetGame} size="lg" className="bg-purple-600 hover:bg-purple-700">
                <RotateCcw className="w-4 h-4 mr-2" />
                Explore Again
              </Button>
              <Link href="/games">
                <Button variant="outline" size="lg">
                  Back to Games
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">EduNaija</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="font-bold">{score}</span>
            </div>
            <Link href="/games">
              <Button variant="outline">Exit Game</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Game Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold">
                  Question {currentQuestion + 1} of {scienceQuestions.length}
                </h1>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{scienceQuestions[currentQuestion].subject}</Badge>
                  <Badge
                    variant={
                      scienceQuestions[currentQuestion].difficulty === "Easy"
                        ? "secondary"
                        : scienceQuestions[currentQuestion].difficulty === "Medium"
                          ? "default"
                          : "destructive"
                    }
                  >
                    {scienceQuestions[currentQuestion].difficulty}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-red-500" />
                  <span className={`text-2xl font-bold ${timeLeft <= 20 ? "text-red-500" : "text-gray-900"}`}>
                    {timeLeft}s
                  </span>
                </div>
              </div>
            </div>
            <Progress value={(currentQuestion / scienceQuestions.length) * 100} className="mb-4" />
          </div>

          {/* Question */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">{scienceQuestions[currentQuestion].question}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {scienceQuestions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedAnswer === index ? "default" : "outline"}
                    className={`p-4 h-auto text-left justify-start ${
                      selectedAnswer === index ? "bg-purple-600" : "bg-transparent"
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Next Button */}
          <div className="text-center">
            <Button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              size="lg"
              className="bg-purple-600 hover:bg-purple-700"
            >
              {currentQuestion + 1 === scienceQuestions.length ? "Finish Quest" : "Next Question"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
