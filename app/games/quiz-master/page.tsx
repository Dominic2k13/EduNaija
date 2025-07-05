"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, Trophy, ArrowRight, RotateCcw } from "lucide-react"
import Link from "next/link"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  subject: string
  difficulty: "Easy" | "Medium" | "Hard"
}

const questions: Question[] = [
  // Mathematics Questions
  {
    id: 1,
    question: "If log₁₀ 2 = 0.3010, find log₁₀ 8",
    options: ["A. 0.6020", "B. 0.9030", "C. 1.2040", "D. 2.4080"],
    correctAnswer: 1,
    subject: "Mathematics",
    difficulty: "Medium",
  },
  {
    id: 2,
    question: "Find the value of x if 3x - 7 = 2x + 5",
    options: ["A. 10", "B. 12", "C. 14", "D. 16"],
    correctAnswer: 1,
    subject: "Mathematics",
    difficulty: "Easy",
  },
  {
    id: 3,
    question: "What is the area of a circle with radius 7cm? (Take π = 22/7)",
    options: ["A. 154 cm²", "B. 144 cm²", "C. 164 cm²", "D. 174 cm²"],
    correctAnswer: 0,
    subject: "Mathematics",
    difficulty: "Medium",
  },
  {
    id: 4,
    question: "If sin θ = 3/5, find cos θ (where θ is acute)",
    options: ["A. 4/5", "B. 3/4", "C. 5/4", "D. 5/3"],
    correctAnswer: 0,
    subject: "Mathematics",
    difficulty: "Hard",
  },
  {
    id: 5,
    question: "Simplify: 2³ × 2⁵ ÷ 2²",
    options: ["A. 2⁶", "B. 2⁴", "C. 2⁸", "D. 2¹⁰"],
    correctAnswer: 0,
    subject: "Mathematics",
    difficulty: "Medium",
  },

  // English Language Questions
  {
    id: 6,
    question: "Choose the option that best completes the sentence: 'The committee _____ its decision yesterday.'",
    options: ["A. announce", "B. announced", "C. announcing", "D. announces"],
    correctAnswer: 1,
    subject: "English Language",
    difficulty: "Easy",
  },
  {
    id: 7,
    question: "Who wrote the novel 'Things Fall Apart'?",
    options: ["A. Wole Soyinka", "B. Chinua Achebe", "C. Chimamanda Adichie", "D. Ben Okri"],
    correctAnswer: 1,
    subject: "English Language",
    difficulty: "Medium",
  },
  {
    id: 8,
    question: "The antonym of 'optimistic' is:",
    options: ["A. hopeful", "B. positive", "C. pessimistic", "D. confident"],
    correctAnswer: 2,
    subject: "English Language",
    difficulty: "Easy",
  },
  {
    id: 9,
    question: "Choose the correctly punctuated sentence:",
    options: [
      "A. The students books were on the table.",
      "B. The student's books were on the table.",
      "C. The students' books were on the table.",
      "D. The students book's were on the table.",
    ],
    correctAnswer: 2,
    subject: "English Language",
    difficulty: "Medium",
  },
  {
    id: 10,
    question: "In the sentence 'The dog barked loudly', what part of speech is 'loudly'?",
    options: ["A. Noun", "B. Verb", "C. Adjective", "D. Adverb"],
    correctAnswer: 3,
    subject: "English Language",
    difficulty: "Easy",
  },

  // Physics Questions
  {
    id: 11,
    question: "What is the SI unit of electric current?",
    options: ["A. Volt", "B. Ampere", "C. Ohm", "D. Watt"],
    correctAnswer: 1,
    subject: "Physics",
    difficulty: "Easy",
  },
  {
    id: 12,
    question: "A body moving with constant velocity has:",
    options: [
      "A. Zero acceleration",
      "B. Constant acceleration",
      "C. Variable acceleration",
      "D. Infinite acceleration",
    ],
    correctAnswer: 0,
    subject: "Physics",
    difficulty: "Medium",
  },
  {
    id: 13,
    question: "The frequency of a wave is 50Hz. What is its period?",
    options: ["A. 0.02s", "B. 0.2s", "C. 2s", "D. 20s"],
    correctAnswer: 0,
    subject: "Physics",
    difficulty: "Medium",
  },
  {
    id: 14,
    question: "Which of the following is a vector quantity?",
    options: ["A. Speed", "B. Distance", "C. Velocity", "D. Time"],
    correctAnswer: 2,
    subject: "Physics",
    difficulty: "Easy",
  },
  {
    id: 15,
    question: "The refractive index of water is 1.33. What does this mean?",
    options: [
      "A. Light travels 1.33 times faster in water than in air",
      "B. Light travels 1.33 times slower in water than in vacuum",
      "C. Water is 1.33 times denser than air",
      "D. Water reflects 1.33 times more light than air",
    ],
    correctAnswer: 1,
    subject: "Physics",
    difficulty: "Hard",
  },

  // Chemistry Questions
  {
    id: 16,
    question: "What is the chemical formula for sodium chloride?",
    options: ["A. NaCl", "B. NaCl₂", "C. Na₂Cl", "D. NaClO"],
    correctAnswer: 0,
    subject: "Chemistry",
    difficulty: "Easy",
  },
  {
    id: 17,
    question: "Which gas is produced when zinc reacts with hydrochloric acid?",
    options: ["A. Oxygen", "B. Hydrogen", "C. Carbon dioxide", "D. Nitrogen"],
    correctAnswer: 1,
    subject: "Chemistry",
    difficulty: "Medium",
  },
  {
    id: 18,
    question: "The pH of pure water at 25°C is:",
    options: ["A. 6", "B. 7", "C. 8", "D. 9"],
    correctAnswer: 1,
    subject: "Chemistry",
    difficulty: "Easy",
  },
  {
    id: 19,
    question: "Which of the following is an alkali metal?",
    options: ["A. Magnesium", "B. Aluminum", "C. Sodium", "D. Iron"],
    correctAnswer: 2,
    subject: "Chemistry",
    difficulty: "Medium",
  },
  {
    id: 20,
    question: "The molecular formula of glucose is:",
    options: ["A. C₆H₁₂O₆", "B. C₆H₆O₆", "C. C₁₂H₂₂O₁₁", "D. C₆H₁₀O₅"],
    correctAnswer: 0,
    subject: "Chemistry",
    difficulty: "Medium",
  },

  // Biology Questions
  {
    id: 21,
    question: "The powerhouse of the cell is:",
    options: ["A. Nucleus", "B. Mitochondria", "C. Ribosome", "D. Golgi apparatus"],
    correctAnswer: 1,
    subject: "Biology",
    difficulty: "Easy",
  },
  {
    id: 22,
    question: "Which blood group is known as the universal donor?",
    options: ["A. A", "B. B", "C. AB", "D. O"],
    correctAnswer: 3,
    subject: "Biology",
    difficulty: "Medium",
  },
  {
    id: 23,
    question: "Photosynthesis occurs in which part of the plant cell?",
    options: ["A. Nucleus", "B. Mitochondria", "C. Chloroplast", "D. Vacuole"],
    correctAnswer: 2,
    subject: "Biology",
    difficulty: "Easy",
  },
  {
    id: 24,
    question: "The study of heredity is called:",
    options: ["A. Ecology", "B. Genetics", "C. Anatomy", "D. Physiology"],
    correctAnswer: 1,
    subject: "Biology",
    difficulty: "Medium",
  },
  {
    id: 25,
    question: "Which organ produces insulin in the human body?",
    options: ["A. Liver", "B. Kidney", "C. Pancreas", "D. Heart"],
    correctAnswer: 2,
    subject: "Biology",
    difficulty: "Medium",
  },

  // Geography Questions
  {
    id: 26,
    question: "What is the capital of Nigeria?",
    options: ["A. Lagos", "B. Abuja", "C. Kano", "D. Port Harcourt"],
    correctAnswer: 1,
    subject: "Geography",
    difficulty: "Easy",
  },
  {
    id: 27,
    question: "Which river is the longest in Nigeria?",
    options: ["A. River Benue", "B. River Niger", "C. River Kaduna", "D. River Cross"],
    correctAnswer: 1,
    subject: "Geography",
    difficulty: "Medium",
  },
  {
    id: 28,
    question: "The imaginary line at 0° latitude is called:",
    options: ["A. Prime Meridian", "B. Tropic of Cancer", "C. Equator", "D. Tropic of Capricorn"],
    correctAnswer: 2,
    subject: "Geography",
    difficulty: "Easy",
  },
  {
    id: 29,
    question: "Which continent has the largest population?",
    options: ["A. Africa", "B. Asia", "C. Europe", "D. North America"],
    correctAnswer: 1,
    subject: "Geography",
    difficulty: "Medium",
  },
  {
    id: 30,
    question: "The Sahara Desert is located in which continent?",
    options: ["A. Asia", "B. Australia", "C. Africa", "D. South America"],
    correctAnswer: 2,
    subject: "Geography",
    difficulty: "Easy",
  },
]

export default function QuizMasterGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (gameStarted && !gameEnded && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    } else if (timeLeft === 0 && gameStarted) {
      handleNextQuestion()
    }
    return () => clearTimeout(timer)
  }, [timeLeft, gameStarted, gameEnded])

  const startGame = () => {
    setGameStarted(true)
    setCurrentQuestion(0)
    setScore(0)
    setAnswers([])
    setTimeLeft(30)
    setGameEnded(false)
    setShowResult(false)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    const newAnswers = [...answers, selectedAnswer ?? -1]
    setAnswers(newAnswers)

    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      const timeBonus = Math.floor(timeLeft / 5)
      setScore(score + 10 + timeBonus)
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setTimeLeft(30)
    } else {
      setGameEnded(true)
      setShowResult(true)
      saveGameResult(
        score + (selectedAnswer === questions[currentQuestion].correctAnswer ? 10 + Math.floor(timeLeft / 5) : 0),
      )
    }
  }

  const saveGameResult = (finalScore: number) => {
    const gameData = {
      score: finalScore,
      date: new Date().toISOString(),
      questionsAnswered: questions.length,
      correctAnswers:
        answers.filter((answer, index) => answer === questions[index].correctAnswer).length +
        (selectedAnswer === questions[currentQuestion].correctAnswer ? 1 : 0),
    }

    const existingData = localStorage.getItem("quizMasterResults") || "[]"
    const results = JSON.parse(existingData)
    results.push(gameData)
    localStorage.setItem("quizMasterResults", JSON.stringify(results))

    // Update leaderboard
    const leaderboardData = localStorage.getItem("gameLeaderboard") || "[]"
    const leaderboard = JSON.parse(leaderboardData)
    leaderboard.push({
      name: "You",
      score: finalScore,
      game: "Quiz Master",
      date: new Date().toISOString(),
    })
    leaderboard.sort((a: any, b: any) => b.score - a.score)
    localStorage.setItem("gameLeaderboard", JSON.stringify(leaderboard.slice(0, 10)))
  }

  const resetGame = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setTimeLeft(30)
    setGameStarted(false)
    setGameEnded(false)
    setAnswers([])
    setShowResult(false)
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
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Quiz Master</h1>
              <p className="text-xl text-gray-600 mb-8">
                Test your knowledge across multiple subjects. Answer quickly to earn bonus points!
              </p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Game Rules</CardTitle>
              </CardHeader>
              <CardContent className="text-left space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <span>Answer {questions.length} questions from various subjects</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <span>You have 30 seconds per question</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <span>Earn 10 points + time bonus for correct answers</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">4</span>
                  </div>
                  <span>Compete for the top spot on the leaderboard</span>
                </div>
              </CardContent>
            </Card>

            <Button size="lg" onClick={startGame} className="text-lg px-8">
              Start Quiz
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (showResult) {
    const finalScore =
      score + (selectedAnswer === questions[currentQuestion]?.correctAnswer ? 10 + Math.floor(timeLeft / 5) : 0)
    const correctAnswers =
      answers.filter((answer, index) => answer === questions[index].correctAnswer).length +
      (selectedAnswer === questions[currentQuestion]?.correctAnswer ? 1 : 0)

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
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Quiz Complete!</h1>

            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="text-6xl font-bold text-blue-600 mb-4">{finalScore}</div>
                <div className="text-xl text-gray-600 mb-6">Final Score</div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{correctAnswers}</div>
                    <div className="text-sm text-gray-600">Correct Answers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {Math.round((correctAnswers / questions.length) * 100)}%
                    </div>
                    <div className="text-sm text-gray-600">Accuracy</div>
                  </div>
                </div>

                <div className="space-y-2">
                  {finalScore >= 80 && <Badge className="bg-green-500">Excellent Performance!</Badge>}
                  {finalScore >= 60 && finalScore < 80 && <Badge className="bg-blue-500">Good Job!</Badge>}
                  {finalScore < 60 && <Badge variant="secondary">Keep Practicing!</Badge>}
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4 justify-center">
              <Button onClick={resetGame} size="lg">
                <RotateCcw className="w-4 h-4 mr-2" />
                Play Again
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
                  Question {currentQuestion + 1} of {questions.length}
                </h1>
                <Badge variant="outline">{questions[currentQuestion].subject}</Badge>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-red-500" />
                  <span className={`text-2xl font-bold ${timeLeft <= 10 ? "text-red-500" : "text-gray-900"}`}>
                    {timeLeft}s
                  </span>
                </div>
                <Badge
                  variant={
                    questions[currentQuestion].difficulty === "Easy"
                      ? "secondary"
                      : questions[currentQuestion].difficulty === "Medium"
                        ? "default"
                        : "destructive"
                  }
                >
                  {questions[currentQuestion].difficulty}
                </Badge>
              </div>
            </div>
            <Progress value={(currentQuestion / questions.length) * 100} className="mb-4" />
          </div>

          {/* Question */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">{questions[currentQuestion].question}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedAnswer === index ? "default" : "outline"}
                    className={`p-4 h-auto text-left justify-start ${selectedAnswer === index ? "bg-blue-600" : "bg-transparent"}`}
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
            <Button onClick={handleNextQuestion} disabled={selectedAnswer === null} size="lg">
              {currentQuestion + 1 === questions.length ? "Finish Quiz" : "Next Question"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
