"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, FileText, ArrowRight, ArrowLeft, Flag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface CBTQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  subject: string
  topic: string
}

const jambQuestions: CBTQuestion[] = [
  // Mathematics Questions (8 questions)
  {
    id: 1,
    question: "If log₁₀ 2 = 0.3010, find log₁₀ 8",
    options: ["A. 0.6020", "B. 0.9030", "C. 1.2040", "D. 2.4080"],
    correctAnswer: 1,
    subject: "Mathematics",
    topic: "Logarithms",
  },
  {
    id: 2,
    question: "Find the value of x in the equation 3x - 7 = 2x + 5",
    options: ["A. 10", "B. 12", "C. 14", "D. 16"],
    correctAnswer: 1,
    subject: "Mathematics",
    topic: "Algebra",
  },
  {
    id: 3,
    question: "What is the area of a circle with radius 7cm? (Take π = 22/7)",
    options: ["A. 154 cm²", "B. 144 cm²", "C. 164 cm²", "D. 174 cm²"],
    correctAnswer: 0,
    subject: "Mathematics",
    topic: "Mensuration",
  },
  {
    id: 4,
    question: "If sin θ = 3/5, find cos θ (where θ is acute)",
    options: ["A. 4/5", "B. 3/4", "C. 5/4", "D. 5/3"],
    correctAnswer: 0,
    subject: "Mathematics",
    topic: "Trigonometry",
  },
  {
    id: 5,
    question: "Simplify: 2³ × 2⁵ ÷ 2²",
    options: ["A. 2⁶", "B. 2⁴", "C. 2⁸", "D. 2¹⁰"],
    correctAnswer: 0,
    subject: "Mathematics",
    topic: "Indices",
  },
  {
    id: 6,
    question: "Find the nth term of the sequence 2, 5, 8, 11, ...",
    options: ["A. 3n - 1", "B. 3n + 1", "C. 2n + 3", "D. n + 4"],
    correctAnswer: 0,
    subject: "Mathematics",
    topic: "Sequences",
  },
  {
    id: 7,
    question: "What is 25% of 80?",
    options: ["A. 15", "B. 20", "C. 25", "D. 30"],
    correctAnswer: 1,
    subject: "Mathematics",
    topic: "Percentage",
  },
  {
    id: 8,
    question: "If the mean of 3, 5, 7, x, 9 is 6, find x",
    options: ["A. 4", "B. 5", "C. 6", "D. 7"],
    correctAnswer: 2,
    subject: "Mathematics",
    topic: "Statistics",
  },

  // English Language Questions (8 questions)
  {
    id: 9,
    question: "Choose the option that best completes the sentence: 'The committee _____ its decision yesterday.'",
    options: ["A. announce", "B. announced", "C. announcing", "D. announces"],
    correctAnswer: 1,
    subject: "English Language",
    topic: "Grammar",
  },
  {
    id: 10,
    question: "Who wrote the novel 'Things Fall Apart'?",
    options: ["A. Wole Soyinka", "B. Chinua Achebe", "C. Chimamanda Adichie", "D. Ben Okri"],
    correctAnswer: 1,
    subject: "English Language",
    topic: "Literature",
  },
  {
    id: 11,
    question: "The antonym of 'optimistic' is:",
    options: ["A. hopeful", "B. positive", "C. pessimistic", "D. confident"],
    correctAnswer: 2,
    subject: "English Language",
    topic: "Vocabulary",
  },
  {
    id: 12,
    question: "Choose the correctly punctuated sentence:",
    options: [
      "A. The students books were on the table.",
      "B. The student's books were on the table.",
      "C. The students' books were on the table.",
      "D. The students book's were on the table.",
    ],
    correctAnswer: 2,
    subject: "English Language",
    topic: "Punctuation",
  },
  {
    id: 13,
    question: "In the sentence 'The dog barked loudly', what part of speech is 'loudly'?",
    options: ["A. Noun", "B. Verb", "C. Adjective", "D. Adverb"],
    correctAnswer: 3,
    subject: "English Language",
    topic: "Parts of Speech",
  },
  {
    id: 14,
    question: "The synonym of 'ubiquitous' is:",
    options: ["A. rare", "B. omnipresent", "C. ancient", "D. modern"],
    correctAnswer: 1,
    subject: "English Language",
    topic: "Vocabulary",
  },
  {
    id: 15,
    question: "Who wrote 'The Lion and the Jewel'?",
    options: ["A. Chinua Achebe", "B. Wole Soyinka", "C. Amos Tutuola", "D. Gabriel Okara"],
    correctAnswer: 1,
    subject: "English Language",
    topic: "Literature",
  },
  {
    id: 16,
    question: "Choose the option with the correct spelling:",
    options: ["A. Occassion", "B. Occasion", "C. Ocasion", "D. Occassion"],
    correctAnswer: 1,
    subject: "English Language",
    topic: "Spelling",
  },

  // Physics Questions (7 questions)
  {
    id: 17,
    question: "What is the SI unit of electric current?",
    options: ["A. Volt", "B. Ampere", "C. Ohm", "D. Watt"],
    correctAnswer: 1,
    subject: "Physics",
    topic: "Electricity",
  },
  {
    id: 18,
    question: "A body moving with constant velocity has:",
    options: [
      "A. Zero acceleration",
      "B. Constant acceleration",
      "C. Variable acceleration",
      "D. Infinite acceleration",
    ],
    correctAnswer: 0,
    subject: "Physics",
    topic: "Mechanics",
  },
  {
    id: 19,
    question: "The frequency of a wave is 50Hz. What is its period?",
    options: ["A. 0.02s", "B. 0.2s", "C. 2s", "D. 20s"],
    correctAnswer: 0,
    subject: "Physics",
    topic: "Waves",
  },
  {
    id: 20,
    question: "Which of the following is a vector quantity?",
    options: ["A. Speed", "B. Distance", "C. Velocity", "D. Time"],
    correctAnswer: 2,
    subject: "Physics",
    topic: "Mechanics",
  },
  {
    id: 21,
    question: "The acceleration due to gravity on Earth is approximately:",
    options: ["A. 9.8 m/s²", "B. 10.8 m/s²", "C. 8.9 m/s²", "D. 11.2 m/s²"],
    correctAnswer: 0,
    subject: "Physics",
    topic: "Mechanics",
  },
  {
    id: 22,
    question: "What is the speed of light in vacuum?",
    options: ["A. 3 × 10⁸ m/s", "B. 3 × 10⁶ m/s", "C. 3 × 10⁷ m/s", "D. 3 × 10⁹ m/s"],
    correctAnswer: 0,
    subject: "Physics",
    topic: "Optics",
  },
  {
    id: 23,
    question: "The unit of frequency is:",
    options: ["A. Hertz", "B. Joule", "C. Newton", "D. Pascal"],
    correctAnswer: 0,
    subject: "Physics",
    topic: "Waves",
  },

  // Chemistry Questions (7 questions)
  {
    id: 24,
    question: "What is the chemical formula for sodium chloride?",
    options: ["A. NaCl", "B. NaCl₂", "C. Na₂Cl", "D. NaClO"],
    correctAnswer: 0,
    subject: "Chemistry",
    topic: "Chemical Formulas",
  },
  {
    id: 25,
    question: "Which gas is produced when zinc reacts with hydrochloric acid?",
    options: ["A. Oxygen", "B. Hydrogen", "C. Carbon dioxide", "D. Nitrogen"],
    correctAnswer: 1,
    subject: "Chemistry",
    topic: "Chemical Reactions",
  },
  {
    id: 26,
    question: "The pH of pure water at 25°C is:",
    options: ["A. 6", "B. 7", "C. 8", "D. 9"],
    correctAnswer: 1,
    subject: "Chemistry",
    topic: "Acids and Bases",
  },
  {
    id: 27,
    question: "Which of the following is a noble gas?",
    options: ["A. Oxygen", "B. Nitrogen", "C. Argon", "D. Carbon dioxide"],
    correctAnswer: 2,
    subject: "Chemistry",
    topic: "Periodic Table",
  },
  {
    id: 28,
    question: "What is the chemical symbol for Gold?",
    options: ["A. Go", "B. Gd", "C. Au", "D. Ag"],
    correctAnswer: 2,
    subject: "Chemistry",
    topic: "Periodic Table",
  },
  {
    id: 29,
    question: "The molecular formula of glucose is:",
    options: ["A. C₆H₁₂O₆", "B. C₆H₆O₆", "C. C₁₂H₂₂O₁₁", "D. C₆H₁₀O₅"],
    correctAnswer: 0,
    subject: "Chemistry",
    topic: "Organic Chemistry",
  },
  {
    id: 30,
    question: "Which of the following is an alkali metal?",
    options: ["A. Magnesium", "B. Aluminum", "C. Sodium", "D. Iron"],
    correctAnswer: 2,
    subject: "Chemistry",
    topic: "Periodic Table",
  },
]

export default function JAMBCBTTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(jambQuestions.length).fill(null))
  const [timeLeft, setTimeLeft] = useState(180 * 60) // 3 hours in seconds
  const [testStarted, setTestStarted] = useState(false)
  const [testEnded, setTestEnded] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set())

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (testStarted && !testEnded && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    } else if (timeLeft === 0 && testStarted) {
      endTest()
    }
    return () => clearTimeout(timer)
  }, [timeLeft, testStarted, testEnded])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const startTest = () => {
    setTestStarted(true)
    setTimeLeft(180 * 60) // Reset to 3 hours
  }

  const selectAnswer = (answerIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answerIndex
    setAnswers(newAnswers)
  }

  const navigateToQuestion = (questionIndex: number) => {
    setCurrentQuestion(questionIndex)
  }

  const toggleFlag = (questionIndex: number) => {
    const newFlagged = new Set(flaggedQuestions)
    if (newFlagged.has(questionIndex)) {
      newFlagged.delete(questionIndex)
    } else {
      newFlagged.add(questionIndex)
    }
    setFlaggedQuestions(newFlagged)
  }

  const endTest = () => {
    setTestEnded(true)
    setShowResults(true)

    // Calculate score
    const correctAnswers = answers.filter((answer, index) => answer === jambQuestions[index].correctAnswer).length
    const score = (correctAnswers / jambQuestions.length) * 100

    // Save results
    const testResult = {
      score: Math.round(score),
      correctAnswers,
      totalQuestions: jambQuestions.length,
      timeUsed: 180 * 60 - timeLeft,
      date: new Date().toISOString(),
      subject: "JAMB UTME",
      answers: answers,
    }

    const existingResults = localStorage.getItem("cbtResults") || "[]"
    const results = JSON.parse(existingResults)
    results.push(testResult)
    localStorage.setItem("cbtResults", JSON.stringify(results))
  }

  const getSubjectStats = () => {
    const subjects = ["Mathematics", "English Language", "Physics", "Chemistry"]
    return subjects.map((subject) => {
      const subjectQuestions = jambQuestions.filter((q) => q.subject === subject)
      const correctCount = subjectQuestions.filter((q, index) => {
        const originalIndex = jambQuestions.findIndex((oq) => oq.id === q.id)
        return answers[originalIndex] === q.correctAnswer
      }).length

      return {
        subject,
        correct: correctCount,
        total: subjectQuestions.length,
        percentage: Math.round((correctCount / subjectQuestions.length) * 100),
      }
    })
  }

  if (!testStarted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="border-b bg-white sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-16 h-16 relative">
                <Image
                  src="/highscore-logo-final.png"
                  alt="HighScore Logo"
                  width={64}
                  height={64}
                  className="object-contain rounded-lg"
                />
              </div>
              <span className="text-2xl font-bold text-blue-900">HighScore</span>
            </Link>
            <Link href="/cbt">
              <Button variant="outline">Back to CBT</Button>
            </Link>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <FileText className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-gray-900 mb-4">JAMB UTME Practice Test</h1>
              <p className="text-xl text-gray-600 mb-8">
                Computer-Based Test simulation for Joint Admissions and Matriculation Board examination
              </p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Test Instructions</CardTitle>
              </CardHeader>
              <CardContent className="text-left space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <span>This test contains {jambQuestions.length} questions from 4 subjects</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <span>You have 3 hours to complete the test</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <span>Each question carries equal marks</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">4</span>
                  </div>
                  <span>You can navigate between questions and flag questions for review</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">5</span>
                  </div>
                  <span>The test will auto-submit when time expires</span>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="font-bold text-blue-600">Mathematics</div>
                <div className="text-sm text-gray-600">8 questions</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="font-bold text-green-600">English</div>
                <div className="text-sm text-gray-600">8 questions</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="font-bold text-purple-600">Physics</div>
                <div className="text-sm text-gray-600">7 questions</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="font-bold text-red-600">Chemistry</div>
                <div className="text-sm text-gray-600">7 questions</div>
              </div>
            </div>

            <Button size="lg" onClick={startTest} className="text-lg px-8">
              Start Test
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (showResults) {
    const correctAnswers = answers.filter((answer, index) => answer === jambQuestions[index].correctAnswer).length
    const score = Math.round((correctAnswers / jambQuestions.length) * 100)
    const subjectStats = getSubjectStats()

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="border-b bg-white sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-16 h-16 relative">
                <Image
                  src="/highscore-logo-final.png"
                  alt="HighScore Logo"
                  width={64}
                  height={64}
                  className="object-contain rounded-lg"
                />
              </div>
              <span className="text-2xl font-bold text-blue-900">HighScore</span>
            </Link>
            <Link href="/cbt">
              <Button variant="outline">Back to CBT</Button>
            </Link>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Test Results</h1>
              <div className="text-6xl font-bold text-blue-600 mb-2">{score}%</div>
              <div className="text-xl text-gray-600">Overall Score</div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Correct Answers:</span>
                    <span className="font-bold text-green-600">
                      {correctAnswers}/{jambQuestions.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time Used:</span>
                    <span className="font-bold">{formatTime(180 * 60 - timeLeft)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Accuracy:</span>
                    <span className="font-bold">{score}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Grade:</span>
                    <Badge variant={score >= 70 ? "default" : score >= 50 ? "secondary" : "destructive"}>
                      {score >= 70 ? "Excellent" : score >= 50 ? "Good" : "Needs Improvement"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Subject Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {subjectStats.map((stat, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{stat.subject}</span>
                        <span className="text-sm">
                          {stat.correct}/{stat.total} ({stat.percentage}%)
                        </span>
                      </div>
                      <Progress value={stat.percentage} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Link href="/cbt">
                <Button size="lg" className="mr-4">
                  Take Another Test
                </Button>
              </Link>
              <Link href="/tutorials">
                <Button variant="outline" size="lg">
                  Review Topics
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
      {/* Test Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-16 h-16 relative">
                  <Image
                    src="/highscore-logo-final.png"
                    alt="HighScore Logo"
                    width={64}
                    height={64}
                    className="object-contain rounded-lg"
                  />
                </div>
                <span className="text-2xl font-bold text-blue-900">HighScore</span>
              </Link>
              <Badge variant="outline">JAMB UTME Practice</Badge>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-red-500" />
                <span className={`font-bold text-lg ${timeLeft < 1800 ? "text-red-500" : "text-gray-900"}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
              <Button onClick={endTest} variant="destructive">
                Submit Test
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Question Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Question Navigator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {jambQuestions.map((_, index) => (
                    <Button
                      key={index}
                      variant={
                        currentQuestion === index ? "default" : answers[index] !== null ? "secondary" : "outline"
                      }
                      size="sm"
                      className={`relative ${flaggedQuestions.has(index) ? "ring-2 ring-yellow-400" : ""}`}
                      onClick={() => navigateToQuestion(index)}
                    >
                      {index + 1}
                      {flaggedQuestions.has(index) && (
                        <Flag className="w-3 h-3 absolute -top-1 -right-1 text-yellow-500" />
                      )}
                    </Button>
                  ))}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-600 rounded"></div>
                    <span>Current</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-300 rounded"></div>
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                    <span>Not Answered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flag className="w-4 h-4 text-yellow-500" />
                    <span>Flagged</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="text-sm text-gray-600">
                    Answered: {answers.filter((a) => a !== null).length}/{jambQuestions.length}
                  </div>
                  <Progress
                    value={(answers.filter((a) => a !== null).length / jambQuestions.length) * 100}
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{jambQuestions[currentQuestion].subject}</Badge>
                      <Badge variant="secondary">{jambQuestions[currentQuestion].topic}</Badge>
                    </div>
                    <CardTitle className="text-lg">
                      Question {currentQuestion + 1} of {jambQuestions.length}
                    </CardTitle>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleFlag(currentQuestion)}
                    className={flaggedQuestions.has(currentQuestion) ? "bg-yellow-50 border-yellow-300" : ""}
                  >
                    <Flag className={`w-4 h-4 ${flaggedQuestions.has(currentQuestion) ? "text-yellow-500" : ""}`} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-lg leading-relaxed">{jambQuestions[currentQuestion].question}</div>

                <div className="space-y-3">
                  {jambQuestions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant={answers[currentQuestion] === index ? "default" : "outline"}
                      className="w-full justify-start text-left h-auto p-4 bg-transparent"
                      onClick={() => selectAnswer(index)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>

                <div className="flex justify-between pt-6">
                  <Button
                    variant="outline"
                    onClick={() => navigateToQuestion(Math.max(0, currentQuestion - 1))}
                    disabled={currentQuestion === 0}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>

                  <Button
                    onClick={() => navigateToQuestion(Math.min(jambQuestions.length - 1, currentQuestion + 1))}
                    disabled={currentQuestion === jambQuestions.length - 1}
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
