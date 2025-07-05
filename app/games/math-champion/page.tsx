"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, Trophy, ArrowRight, RotateCcw, Calculator } from "lucide-react"
import Link from "next/link"

interface MathQuestion {
  id: number
  question: string
  answer: number
  options: string[]
  difficulty: "Easy" | "Medium" | "Hard"
  type: string
}

const generateMathQuestion = (difficulty: "Easy" | "Medium" | "Hard"): MathQuestion => {
  const id = Math.random()

  if (difficulty === "Easy") {
    const a = Math.floor(Math.random() * 20) + 1
    const b = Math.floor(Math.random() * 20) + 1
    const operations = ["+", "-", "×"]
    const op = operations[Math.floor(Math.random() * operations.length)]

    let question: string
    let answer: number

    switch (op) {
      case "+":
        question = `${a} + ${b} = ?`
        answer = a + b
        break
      case "-":
        question = `${a + b} - ${b} = ?`
        answer = a
        break
      case "×":
        question = `${a} × ${b} = ?`
        answer = a * b
        break
      default:
        question = `${a} + ${b} = ?`
        answer = a + b
    }

    const wrongAnswers = [
      answer + Math.floor(Math.random() * 10) + 1,
      answer - Math.floor(Math.random() * 10) - 1,
      answer + Math.floor(Math.random() * 5) + 1,
    ].filter((x) => x !== answer && x > 0)

    const allOptions = [answer, ...wrongAnswers.slice(0, 3)]
    const options = allOptions.map((opt, idx) => `${String.fromCharCode(65 + idx)}. ${opt}`)

    return { id, question, answer, options, difficulty, type: "Arithmetic" }
  }

  if (difficulty === "Medium") {
    const questionTypes = ["algebra", "percentage", "fraction"]
    const type = questionTypes[Math.floor(Math.random() * questionTypes.length)]

    if (type === "algebra") {
      const a = Math.floor(Math.random() * 10) + 1
      const b = Math.floor(Math.random() * 20) + 1
      const question = `If x + ${a} = ${a + b}, what is x?`
      const answer = b
      const allOptions = [answer, answer + 1, answer - 1, answer + 2]
      const options = allOptions.map((opt, idx) => `${String.fromCharCode(65 + idx)}. ${opt}`)
      return { id, question, answer, options, difficulty, type: "Algebra" }
    }

    if (type === "percentage") {
      const base = [20, 25, 50, 100, 200][Math.floor(Math.random() * 5)]
      const percent = [10, 15, 20, 25, 30][Math.floor(Math.random() * 5)]
      const question = `What is ${percent}% of ${base}?`
      const answer = (percent * base) / 100
      const allOptions = [answer, answer + 5, answer - 5, answer + 10]
      const options = allOptions.map((opt, idx) => `${String.fromCharCode(65 + idx)}. ${opt}`)
      return { id, question, answer, options, difficulty, type: "Percentage" }
    }

    // fraction
    const num = Math.floor(Math.random() * 5) + 1
    const den = Math.floor(Math.random() * 5) + 2
    const whole = Math.floor(Math.random() * 3) + 1
    const question = `What is ${num}/${den} + ${whole}? (as decimal)`
    const answer = Math.round((num / den + whole) * 100) / 100
    const allOptions = [answer, answer + 0.5, answer - 0.5, answer + 1]
    const options = allOptions.map((opt, idx) => `${String.fromCharCode(65 + idx)}. ${opt}`)
    return { id, question, answer, options, difficulty, type: "Fractions" }
  }

  // Hard
  const a = Math.floor(Math.random() * 15) + 5
  const b = Math.floor(Math.random() * 15) + 5
  const question = `What is ${a}² - ${b}²?`
  const answer = a * a - b * b
  const allOptions = [answer, answer + 10, answer - 10, answer + 20]
  const options = allOptions.map((opt, idx) => `${String.fromCharCode(65 + idx)}. ${opt}`)
  return { id, question, answer, options, difficulty, type: "Squares" }
}

export default function MathChampionGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [questions, setQuestions] = useState<MathQuestion[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(45)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Easy")

  useEffect(() => {
    if (gameStarted && questions.length === 0) {
      const newQuestions = Array.from({ length: 15 }, (_, i) => {
        const diff = i < 5 ? "Easy" : i < 10 ? "Medium" : "Hard"
        return generateMathQuestion(diff)
      })
      setQuestions(newQuestions)
    }
  }, [gameStarted])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (gameStarted && !gameEnded && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    } else if (timeLeft === 0 && gameStarted) {
      handleNextQuestion()
    }
    return () => clearTimeout(timer)
  }, [timeLeft, gameStarted, gameEnded])

  const startGame = (selectedDifficulty: "Easy" | "Medium" | "Hard") => {
    setDifficulty(selectedDifficulty)
    setGameStarted(true)
    setCurrentQuestion(0)
    setScore(0)
    setStreak(0)
    setMaxStreak(0)
    setTimeLeft(45)
    setGameEnded(false)
    setQuestions([])
  }

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswer(optionIndex)
  }

  const handleNextQuestion = () => {
    const isCorrect = selectedAnswer === 0 // Since correct answer is always at index 0 after we format options

    if (isCorrect) {
      const timeBonus = Math.floor(timeLeft / 5)
      const difficultyMultiplier = difficulty === "Easy" ? 1 : difficulty === "Medium" ? 1.5 : 2
      const streakBonus = streak >= 3 ? 5 : 0
      const points = Math.floor((15 + timeBonus + streakBonus) * difficultyMultiplier)

      setScore(score + points)
      setStreak(streak + 1)
      setMaxStreak(Math.max(maxStreak, streak + 1))
    } else {
      setStreak(0)
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setTimeLeft(45)
    } else {
      setGameEnded(true)
      saveGameResult()
    }
  }

  const saveGameResult = () => {
    const gameData = {
      score,
      date: new Date().toISOString(),
      difficulty,
      maxStreak,
      questionsAnswered: questions.length,
    }

    const existingData = localStorage.getItem("mathChampionResults") || "[]"
    const results = JSON.parse(existingData)
    results.push(gameData)
    localStorage.setItem("mathChampionResults", JSON.stringify(results))

    // Update leaderboard
    const leaderboardData = localStorage.getItem("gameLeaderboard") || "[]"
    const leaderboard = JSON.parse(leaderboardData)
    leaderboard.push({
      name: "You",
      score,
      game: "Math Champion",
      date: new Date().toISOString(),
    })
    leaderboard.sort((a: any, b: any) => b.score - a.score)
    localStorage.setItem("gameLeaderboard", JSON.stringify(leaderboard.slice(0, 10)))
  }

  const resetGame = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setTimeLeft(45)
    setGameStarted(false)
    setGameEnded(false)
    setQuestions([])
    setStreak(0)
    setMaxStreak(0)
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
              <Calculator className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Math Champion</h1>
              <p className="text-xl text-gray-600 mb-8">
                Solve mathematical problems quickly and accurately. Build streaks for bonus points!
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => startGame("Easy")}>
                <CardHeader>
                  <CardTitle className="text-green-600">Easy Mode</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Basic arithmetic operations</p>
                  <Badge variant="secondary">1x Points</Badge>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => startGame("Medium")}>
                <CardHeader>
                  <CardTitle className="text-blue-600">Medium Mode</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Algebra, percentages, fractions</p>
                  <Badge className="bg-blue-600">1.5x Points</Badge>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => startGame("Hard")}>
                <CardHeader>
                  <CardTitle className="text-red-600">Hard Mode</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Advanced mathematics</p>
                  <Badge variant="destructive">2x Points</Badge>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Scoring System</CardTitle>
              </CardHeader>
              <CardContent className="text-left space-y-2">
                <div>• Base points: 15 per correct answer</div>
                <div>• Time bonus: Up to 9 extra points</div>
                <div>• Streak bonus: +5 points for 3+ streak</div>
                <div>• Difficulty multiplier applies to total</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (gameEnded) {
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
            <Calculator className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Math Challenge Complete!</h1>

            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="text-6xl font-bold text-blue-600 mb-4">{score}</div>
                <div className="text-xl text-gray-600 mb-6">Final Score</div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{difficulty}</div>
                    <div className="text-sm text-gray-600">Difficulty</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{maxStreak}</div>
                    <div className="text-sm text-gray-600">Best Streak</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{questions.length}</div>
                    <div className="text-sm text-gray-600">Questions</div>
                  </div>
                </div>

                <div className="space-y-2">
                  {score >= 300 && <Badge className="bg-green-500">Math Genius!</Badge>}
                  {score >= 200 && score < 300 && <Badge className="bg-blue-500">Great Performance!</Badge>}
                  {score >= 100 && score < 200 && <Badge className="bg-yellow-500">Good Job!</Badge>}
                  {score < 100 && <Badge variant="secondary">Keep Practicing!</Badge>}
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

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Generating questions...</p>
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
            {streak > 0 && <Badge className="bg-orange-500">🔥 {streak} streak</Badge>}
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
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{questions[currentQuestion].type}</Badge>
                  <Badge
                    variant={difficulty === "Easy" ? "secondary" : difficulty === "Medium" ? "default" : "destructive"}
                  >
                    {difficulty}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-red-500" />
                  <span className={`text-2xl font-bold ${timeLeft <= 15 ? "text-red-500" : "text-gray-900"}`}>
                    {timeLeft}s
                  </span>
                </div>
              </div>
            </div>
            <Progress value={(currentQuestion / questions.length) * 100} className="mb-4" />
          </div>

          {/* Question */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-center font-mono">{questions[currentQuestion].question}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedAnswer === index ? "default" : "outline"}
                    className={`p-6 h-auto text-xl font-mono ${selectedAnswer === index ? "bg-blue-600" : "bg-transparent"}`}
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
              {currentQuestion + 1 === questions.length ? "Finish Challenge" : "Next Question"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
