"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, TrendingUp, Users, Target, Calendar } from "lucide-react";
import Link from "next/link";
import Leaderboard from "@/components/leaderboard";
import Image from "next/image";

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3">
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
          <nav className="hidden md:flex items-center gap-8">
            {/* <Link
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
            </Link> */}
            {/* <Link
              href="/leaderboard"
              className="text-blue-600 font-medium relative"
            >
              Leaderboard
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600"></span>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105 bg-transparent"
              >
                Login
              </Button>
            </Link> */}
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-12 h-12 text-orange-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Hall of Fame
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Celebrate the top performers across all our learning games. Compete
            with students nationwide and climb the ranks!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group border-l-4 border-l-blue-600">
            <CardContent className="pt-6">
              <div className="transform transition-all duration-300 group-hover:scale-110">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">2,847</div>
                <div className="text-sm text-gray-600">Active Players</div>
              </div>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group border-l-4 border-l-green-600">
            <CardContent className="pt-6">
              <div className="transform transition-all duration-300 group-hover:scale-110">
                <Target className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">15,692</div>
                <div className="text-sm text-gray-600">Games Played</div>
              </div>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group border-l-4 border-l-red-600">
            <CardContent className="pt-6">
              <div className="transform transition-all duration-300 group-hover:scale-110">
                <TrendingUp className="w-8 h-8 text-red-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">89%</div>
                <div className="text-sm text-gray-600">Avg. Improvement</div>
              </div>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group border-l-4 border-l-orange-500">
            <CardContent className="pt-6">
              <div className="transform transition-all duration-300 group-hover:scale-110">
                <Calendar className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">Daily</div>
                <div className="text-sm text-gray-600">Updates</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Leaderboard */}
        <div className="max-w-4xl mx-auto">
          <Leaderboard showAllGames={true} />
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-blue-50 to-orange-50 border-blue-200 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
            <CardContent className="pt-6">
              <Trophy className="w-12 h-12 text-orange-500 mx-auto mb-4 animate-bounce" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Join the Champions?
              </h3>
              <p className="text-gray-600 mb-6">
                Start playing our educational games and see your name climb up
                the leaderboard!
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/games">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    Play Games
                  </Button>
                </Link>
                <Link href="/cbt">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-105 bg-transparent"
                  >
                    Practice CBT
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
