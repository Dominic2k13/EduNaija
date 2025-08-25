"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BookOpen, Atom, FlaskConical, Dna, PenTool, Clock } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SubjectSelectionPage() {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const router = useRouter()

  const subjects = [
    {
      id: "mathematics",
      title: "Mathematics",
      icon: <BookOpen className="w-6 h-6" />,
      color: "from-blue-500 to-blue-600",
      topics: ["Algebra", "Geometry", "Calculus", "Statistics"],
    },
    {
      id: "physics",
      title: "Physics",
      icon: <Atom className="w-6 h-6" />,
      color: "from-purple-500 to-purple-600",
      topics: ["Mechanics", "Thermodynamics", "Electricity", "Optics"],
    },
    {
      id: "chemistry",
      title: "Chemistry",
      icon: <FlaskConical className="w-6 h-6" />,
      color: "from-green-500 to-green-600",
      topics: ["Organic", "Inorganic", "Physical", "Analytical"],
    },
    {
      id: "biology",
      title: "Biology",
      icon: <Dna className="w-6 h-6" />,
      color: "from-emerald-500 to-emerald-600",
      topics: ["Cell Biology", "Genetics", "Ecology", "Human Anatomy"],
    },
    {
      id: "english",
      title: "English",
      icon: <PenTool className="w-6 h-6" />,
      color: "from-orange-500 to-orange-600",
      topics: ["Grammar", "Literature", "Writing", "Comprehension"],
    },
    {
      id: "history",
      title: "History",
      icon: <Clock className="w-6 h-6" />,
      color: "from-red-500 to-red-600",
      topics: ["Ancient", "Medieval", "Modern", "Contemporary"],
    },
  ]

  const toggleSubject = (subjectId: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subjectId) ? prev.filter((id) => id !== subjectId) : [...prev, subjectId],
    )
  }

  const handleStartAssessment = () => {
    if (selectedSubjects.length > 0) {
      // Here you would typically start the actual assessment
      // For now, we'll redirect to a placeholder
      router.push("/games/quiz-master")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/games/mode-selection">
            <Button variant="outline" size="icon" className="hover:bg-blue-50 bg-transparent">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Select Subjects</h1>
            <p className="text-gray-600">Choose the subjects you want to practice</p>
          </div>
        </div>

        {/* Selection Summary */}
        {selectedSubjects.length > 0 && (
          <Card className="mb-8 bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-blue-900">Selected:</span>
                  <div className="flex gap-2">
                    {selectedSubjects.map((subjectId) => {
                      const subject = subjects.find((s) => s.id === subjectId)
                      return (
                        <Badge key={subjectId} className="bg-blue-600 text-white">
                          {subject?.title}
                        </Badge>
                      )
                    })}
                  </div>
                </div>
                <span className="text-sm text-blue-700">
                  {selectedSubjects.length} subject{selectedSubjects.length !== 1 ? "s" : ""} selected
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {subjects.map((subject) => (
            <Card
              key={subject.id}
              className={`cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg border-2 ${
                selectedSubjects.includes(subject.id)
                  ? "border-blue-500 shadow-md"
                  : "border-gray-200 hover:border-blue-300"
              }`}
              onClick={() => toggleSubject(subject.id)}
            >
              <CardHeader className={`bg-gradient-to-br ${subject.color} text-white`}>
                <CardTitle className="flex items-center gap-3">
                  {subject.icon}
                  <span>{subject.title}</span>
                  <div className="ml-auto">
                    <div
                      className={`w-5 h-5 rounded-full border-2 border-white transition-all duration-300 ${
                        selectedSubjects.includes(subject.id) ? "bg-white" : "bg-transparent"
                      }`}
                    >
                      {selectedSubjects.includes(subject.id) && (
                        <div className="w-full h-full rounded-full bg-blue-600 scale-75" />
                      )}
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 mb-3">Topics covered:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {subject.topics.map((topic, index) => (
                      <Badge key={index} variant="outline" className="text-xs justify-center py-1">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Start Assessment Button */}
        <div className="text-center">
          <Button
            onClick={handleStartAssessment}
            disabled={selectedSubjects.length === 0}
            className="px-8 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start Assessment ({selectedSubjects.length} subject{selectedSubjects.length !== 1 ? "s" : ""})
          </Button>
        </div>
      </div>
    </div>
  )
}
