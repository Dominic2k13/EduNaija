"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Brain, GamepadIcon, Play, Trophy, Users, Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
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
          </div>

          {/* Desktop Navigation */}
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
            <Link
              href="/games"
              className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group"
            >
              Games
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/leaderboard"
              className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group"
            >
              Leaderboard
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105 bg-transparent"
              >
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                Sign Up
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <Link
                href="/tutorials"
                className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium py-2 px-4 rounded-lg hover:bg-blue-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Tutorials
              </Link>
              <Link
                href="/cbt"
                className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium py-2 px-4 rounded-lg hover:bg-blue-50"
                onClick={() => setIsMenuOpen(false)}
              >
                CBT Practice
              </Link>
              <Link
                href="/games"
                className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium py-2 px-4 rounded-lg hover:bg-blue-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Games
              </Link>
              <Link
                href="/leaderboard"
                className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium py-2 px-4 rounded-lg hover:bg-blue-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Leaderboard
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Sign Up</Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 min-h-[600px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/study-background.jpg"
            alt="Students studying together in library"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-blue-900/70"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Master JAMB, SSCE & PTUME
            <span className="text-orange-400 block">With Confidence</span>
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto drop-shadow-md">
            Access comprehensive tutorial videos, practice CBT exams, and play gamified quizzes to excel in your
            Nigerian educational examinations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="text-lg px-8 bg-orange-500 hover:bg-orange-600 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                Get Started
              </Button>
            </Link>
            <Link href="/tutorials">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-2 border-white text-white hover:bg-white hover:text-blue-900 transition-all duration-300 transform hover:scale-105 hover:shadow-lg bg-transparent backdrop-blur-sm"
              >
                <Play className="w-5 h-5 mr-2" />
                Explore Subjects
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Everything You Need to Succeed</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group border-l-4 border-l-blue-600 relative overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/video-tutorial-bg.jpg"
                  alt="Student studying with laptop and books"
                  fill
                  className="object-cover"
                />
              </div>

              <CardHeader className="relative z-10">
                <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white transition-all duration-300">
                  <Play className="w-8 h-8 text-blue-600 transition-all duration-300" />
                </div>
                <CardTitle className="text-gray-900 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
                  Video Tutorials
                </CardTitle>
                <CardDescription className="text-gray-700 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 mt-2">
                  Expert-led video lessons covering all JAMB, SSCE, and PTUME subjects
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <Link href="/tutorials">
                  <Button
                    variant="outline"
                    className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm"
                  >
                    Browse Tutorials
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group border-l-4 border-l-red-600 relative overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/cbt-practice-bg.jpg"
                  alt="Students in classroom taking computer-based test"
                  fill
                  className="object-cover"
                />
              </div>

              <CardHeader className="relative z-10">
                <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white transition-all duration-300">
                  <Brain className="w-8 h-8 text-red-600 transition-all duration-300" />
                </div>
                <CardTitle className="text-gray-900 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
                  CBT Practice
                </CardTitle>
                <CardDescription className="text-gray-700 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 mt-2">
                  Realistic computer-based test simulations with instant feedback
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <Link href="/cbt">
                  <Button
                    variant="outline"
                    className="w-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm"
                  >
                    Start Practice
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group border-l-4 border-l-orange-500 relative overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/quiz-games-bg.jpg"
                  alt="Colorful quiz game icons with question mark, checkmark, and exclamation"
                  fill
                  className="object-cover"
                />
              </div>

              <CardHeader className="relative z-10">
                <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white transition-all duration-300">
                  <GamepadIcon className="w-8 h-8 text-orange-500 transition-all duration-300" />
                </div>
                <CardTitle className="text-gray-900 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
                  Quiz Games
                </CardTitle>
                <CardDescription className="text-gray-700 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 mt-2">
                  Gamified learning experience with leaderboards and achievements
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <Link href="/games">
                  <Button
                    variant="outline"
                    className="w-full border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm"
                  >
                    Play Games
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="group cursor-pointer">
              <div className="transform transition-all duration-300 group-hover:scale-110">
                <Users className="w-12 h-12 mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">50,000+</div>
                <div className="text-blue-100">Active Students</div>
              </div>
            </div>
            <div className="group cursor-pointer">
              <div className="transform transition-all duration-300 group-hover:scale-110">
                <Trophy className="w-12 h-12 mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">95%</div>
                <div className="text-blue-100">Success Rate</div>
              </div>
            </div>
            <div className="group cursor-pointer">
              <div className="transform transition-all duration-300 group-hover:scale-110">
                <BookOpen className="w-12 h-12 mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">1,000+</div>
                <div className="text-blue-100">Video Lessons</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Ready to Excel in Your Exams?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have improved their scores with our comprehensive learning platform.
          </p>
          <Link href="/signup">
            <Button
              size="lg"
              className="text-lg px-8 bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 relative">
                  <Image
                    src="/highscore-logo-final.png"
                    alt="HighScore Logo"
                    width={64}
                    height={64}
                    className="object-contain rounded-lg"
                  />
                </div>
                <span className="text-xl font-bold">HighScore</span>
              </div>
              <p className="text-gray-400">
                Empowering Nigerian students to excel in JAMB, SSCE, and PTUME examinations.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-blue-400">Platform</h3>
              <div className="space-y-2">
                <Link
                  href="/tutorials"
                  className="block text-gray-400 hover:text-blue-400 transition-colors duration-300"
                >
                  Video Tutorials
                </Link>
                <Link href="/cbt" className="block text-gray-400 hover:text-red-400 transition-colors duration-300">
                  CBT Practice
                </Link>
                <Link
                  href="/games"
                  className="block text-gray-400 hover:text-orange-400 transition-colors duration-300"
                >
                  Quiz Games
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-blue-400">Subjects</h3>
              <div className="space-y-2">
                <div className="text-gray-400">Mathematics</div>
                <div className="text-gray-400">English Language</div>
                <div className="text-gray-400">Physics</div>
                <div className="text-gray-400">Chemistry</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-blue-400">Support</h3>
              <div className="space-y-2">
                <div className="text-gray-400">Help Center</div>
                <div className="text-gray-400">Contact Us</div>
                <div className="text-gray-400">Privacy Policy</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 HighScore. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
