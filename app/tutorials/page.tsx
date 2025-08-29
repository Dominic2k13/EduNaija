"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Play, Search, Star, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function TutorialsPage() {
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);

  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // runs only in the browser
    const stored = localStorage.getItem("username");
    setUsername(stored);
  }, []);
  const subjects = [
    { name: "Mathematics", videos: 150, color: "bg-blue-500" },
    { name: "English Language", videos: 120, color: "bg-green-500" },
    { name: "Physics", videos: 100, color: "bg-purple-500" },
    { name: "Chemistry", videos: 95, color: "bg-red-500" },
    { name: "Biology", videos: 85, color: "bg-yellow-500" },
    { name: "Economics", videos: 70, color: "bg-indigo-500" },
  ];

  const featuredVideos = [
    {
      title: "JAMB Mathematics: Quadratic Equations Made Easy",
      duration: "25:30",
      views: "12.5K",
      rating: 4.8,
      thumbnail: "/maths.jpg?height=200&width=300",
      subject: "Mathematics",
    },
    {
      title: "English Language: Essay Writing Techniques",
      duration: "18:45",
      views: "8.2K",
      rating: 4.9,
      thumbnail: "/english.jpg?height=200&width=300",
      subject: "English",
    },
    {
      title: "Physics: Understanding Motion and Forces",
      duration: "32:15",
      views: "15.3K",
      rating: 4.7,
      thumbnail: "/physics.jpg?height=200&width=300",
      subject: "Physics",
    },
    {
      title: "Chemistry: Organic Chemistry Basics",
      duration: "28:20",
      views: "9.8K",
      rating: 4.8,
      thumbnail: "/chem.jpg?height=200&width=300",
      subject: "Chemistry",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
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
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/tutorials" className="text-blue-600 font-medium">
              Tutorials
            </Link>
            <Link
              href="/cbt"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              CBT Practice
            </Link>
            {/* <Link href="/games" className="text-gray-600 hover:text-blue-600 transition-colors">
              Games
            </Link> */}
            {username ? (
              <button
                className="p-2 rounded-full hover:bg-blue-100 transition-colors"
                onClick={() => router.push("/dashboard")}
              >
                <User className="w-7 h-7 text-blue-600" />
              </button>
            ) : (
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
            )}
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Video Tutorials
          </h1>
          <p className="text-gray-600 mb-6">
            Master every subject with our comprehensive video library taught by
            expert instructors.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="Search tutorials..." className="pl-10" />
          </div>
        </div>

        {/* Subject Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Browse by Subject</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {subjects.map((subject) => (
              <Card
                key={subject.name}
                className="hover:shadow-md transition-shadow cursor-pointer"
              >
                <CardContent className="p-4 text-center">
                  <div
                    className={`w-12 h-12 ${subject.color} rounded-full mx-auto mb-3 flex items-center justify-center`}
                  >
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-medium text-sm mb-1">{subject.name}</h3>
                  <p className="text-xs text-gray-500">
                    {subject.videos} videos
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Videos */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Featured Tutorials</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredVideos.map((video, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-black/20 rounded-t-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                  <Badge className="absolute top-2 right-2 bg-black/70 text-white">
                    {video.duration}
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <Badge variant="secondary" className="w-fit mb-2">
                    {video.subject}
                  </Badge>
                  <CardTitle className="text-sm line-clamp-2">
                    {video.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{video.rating}</span>
                    </div>
                    <span>{video.views} views</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
