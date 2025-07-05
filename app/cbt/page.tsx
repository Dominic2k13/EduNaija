import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, FileText, Target, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function CBTPage() {
  const examTypes = [
    {
      title: "JAMB UTME",
      description: "Joint Admissions and Matriculation Board exam practice",
      subjects: ["Mathematics", "English", "Physics", "Chemistry"],
      duration: "3 hours",
      questions: 180,
      color: "border-blue-500",
    },
    {
      title: "WAEC SSCE",
      description: "West African Senior School Certificate Examination",
      subjects: ["Mathematics", "English", "Physics", "Chemistry", "Biology"],
      duration: "2.5 hours",
      questions: 50,
      color: "border-green-500",
    },
    {
      title: "NECO SSCE",
      description: "National Examinations Council Senior School Certificate",
      subjects: ["Mathematics", "English", "Physics", "Chemistry", "Biology"],
      duration: "2.5 hours",
      questions: 50,
      color: "border-purple-500",
    },
    {
      title: "POST-UTME",
      description: "University specific post-UTME screening tests",
      subjects: ["Mathematics", "English", "Physics", "Chemistry"],
      duration: "1.5 hours",
      questions: 100,
      color: "border-orange-500",
    },
  ]

  const recentScores = [
    { exam: "JAMB Mathematics", score: 85, date: "2 days ago" },
    { exam: "Physics Practice", score: 78, date: "1 week ago" },
    { exam: "English Language", score: 92, date: "1 week ago" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">EduNaija</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/tutorials" className="text-gray-600 hover:text-blue-600 transition-colors">
              Tutorials
            </Link>
            <Link href="/cbt" className="text-blue-600 font-medium">
              CBT Practice
            </Link>
            <Link href="/games" className="text-gray-600 hover:text-blue-600 transition-colors">
              Games
            </Link>
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">CBT Practice Tests</h1>
          <p className="text-gray-600 mb-6">
            Practice with realistic computer-based test simulations. Get instant feedback and track your progress.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Exam Types */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-6">Choose Your Exam Type</h2>
              <div className="grid gap-6">
                {examTypes.map((exam, index) => (
                  <Card key={index} className={`border-l-4 ${exam.color} hover:shadow-lg transition-shadow`}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl mb-2">{exam.title}</CardTitle>
                          <CardDescription className="text-base">{exam.description}</CardDescription>
                        </div>
                        <Badge variant="outline" className="ml-4">
                          {exam.questions} Questions
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {exam.subjects.map((subject) => (
                          <Badge key={subject} variant="secondary">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{exam.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            <span>{exam.questions} questions</span>
                          </div>
                        </div>
                        <Link href={`/cbt/${exam.title.toLowerCase().replace(/\s+/g, "-")}`}>
                          <Button>Start Practice</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">78%</div>
                  <div className="text-sm text-gray-600">Average Score</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-semibold">24</div>
                    <div className="text-xs text-gray-600">Tests Taken</div>
                  </div>
                  <div>
                    <div className="text-xl font-semibold">18h</div>
                    <div className="text-xs text-gray-600">Study Time</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Scores */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Recent Scores
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentScores.map((score, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">{score.exam}</div>
                      <div className="text-xs text-gray-500">{score.date}</div>
                    </div>
                    <Badge variant={score.score >= 80 ? "default" : score.score >= 60 ? "secondary" : "destructive"}>
                      {score.score}%
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <FileText className="w-4 h-4 mr-2" />
                  View All Results
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Performance Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Target className="w-4 h-4 mr-2" />
                  Set Study Goals
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
