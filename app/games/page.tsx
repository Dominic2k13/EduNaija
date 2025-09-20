"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  Brain,
  Target,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import MatchSimulation from "@/components/MatchSimulation";
import QuestionScreen from "@/components/QuestionScreen";

// -----------------
// User Interface
// -----------------
export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  rank: string;
  xp: number;
  coins: number;
  avatar: string;
  totalMatches: number;
  wins: number;
  winRate: number;
}

// Example logged-in user
const initialUser: User = {
  id: "1",
  username: "player1",
  email: "player@example.com",
  displayName: "You",
  rank: "Gold",
  xp: 1200,
  coins: 500,
   avatar: '🎮',
  totalMatches: 20,
  wins: 15,
  winRate: 75,
};

type Stage = "modes" | "matching" | "questions";

export default function PlayPage() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("modes");
  const [gameMode, setGameMode] = useState<string>("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [user, setUser] = useState<User>(initialUser);

  // ---------------------
  // Game Data
  // ---------------------
  const subjectsList = [
    { name: "Mathematics", icon: "📊", color: "from-blue-600 to-purple-600" },
    { name: "Physics", icon: "⚡", color: "from-yellow-600 to-orange-600" },
    { name: "Chemistry", icon: "🧪", color: "from-green-600 to-teal-600" },
    { name: "Biology", icon: "🧬", color: "from-emerald-600 to-green-600" },
    { name: "English", icon: "📚", color: "from-pink-600 to-red-600" },
    { name: "History", icon: "🏛️", color: "from-amber-600 to-yellow-600" },
  ];

  const topicsMap = {
    Mathematics: ["Algebra", "Geometry", "Calculus", "Statistics"],
    Physics: ["Mechanics", "Thermodynamics", "Electricity", "Optics"],
    Chemistry: ["Organic", "Inorganic", "Physical", "Analytical"],
    Biology: ["Cell Biology", "Genetics", "Ecology", "Human Anatomy"],
    English: ["Grammar", "Literature", "Writing", "Comprehension"],
    History: ["Ancient", "Medieval", "Modern", "Contemporary"],
  };

  const gameModes = [
    {
      id: "subject-combination",
      title: "Subject Combination",
      description: "Mix multiple subjects for variety",
      icon: BookOpen,
      color: "from-blue-600 to-purple-600",
      requiresSubjects: true,
    },
    {
      id: "single-subject",
      title: "Single Subject",
      description: "Focus on one subject area",
      icon: Target,
      color: "from-green-600 to-emerald-600",
      requiresSubjects: true,
    },
    {
      id: "topic-mode",
      title: "Topic Mode",
      description: "Dive deep into specific topics",
      icon: Brain,
      color: "from-purple-600 to-pink-600",
      requiresSubjects: true,
    },
    {
      id: "general-knowledge",
      title: "General Knowledge",
      description: "Random questions from all areas",
      icon: Sparkles,
      color: "from-yellow-600 to-orange-600",
      requiresSubjects: false,
    },
  ];

  // ---------------------
  // Handlers
  // ---------------------
  const toggleSubject = (subject: string) => {
    setSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  };

  const toggleTopic = (topic: string) => {
    setTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const canStartGame = () => {
    if (!gameMode) return false;
    const mode = gameModes.find((m) => m.id === gameMode);
    if (!mode?.requiresSubjects) return true;
    if (gameMode === "topic-mode") return topics.length > 0;
    return subjects.length > 0;
  };

  const handleStart = () => {
    if (!canStartGame()) return;
    setStage("matching");
  };

  const handleGameComplete = (coins: number, xp: number) => {
    setUser((prev) => ({
      ...prev,
      coins: prev.coins + coins,
      xp: prev.xp + xp,
      totalMatches: prev.totalMatches + 1,
      wins: prev.wins + 1,
    }));
    router.push("/dashboard");
  };

  // ---------------------
  // UI Flow
  // ---------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900">
      {stage === "modes" && (
        <div className="p-4 md:p-6 max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => router.push("/dashboard")}
              className="flex items-center space-x-2 text-white hover:text-purple-300 transition-colors duration-200"
            >
              <ArrowLeft className="w-6 h-6" />
              <span className="font-medium">Back to Dashboard</span>
            </button>
            <h1 className="text-3xl font-bold text-white">Choose Game Mode</h1>
            <div />
          </div>

          {/* Game Modes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {gameModes.map((mode) => {
              const Icon = mode.icon;
              const isSelected = gameMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => {
                    setGameMode(mode.id);
                    setSubjects([]);
                    setTopics([]);
                  }}
                  className={`p-6 rounded-xl transition-all duration-200 transform hover:scale-105 border-2 ${
                    isSelected
                      ? "border-purple-400 bg-purple-500/20"
                      : "border-white/20 bg-white/10 hover:border-white/40"
                  } backdrop-blur-md`}
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${mode.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {mode.title}
                  </h3>
                  <p className="text-gray-300 text-sm">{mode.description}</p>
                  {isSelected && (
                    <div className="mt-3">
                      <ChevronRight className="w-5 h-5 text-purple-400 mx-auto animate-pulse" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Subject / Topic Selection */}
          {gameMode &&
            gameModes.find((m) => m.id === gameMode)?.requiresSubjects && (
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-8">
                <h2 className="text-xl font-bold text-white mb-4">
                  {gameMode === "topic-mode" ? "Select Topics" : "Select Subjects"}
                </h2>

                {gameMode === "topic-mode" ? (
                  <div className="space-y-4">
                    {Object.entries(topicsMap).map(([subject, subjectTopics]) => (
                      <div key={subject}>
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {subject}
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {subjectTopics.map((topic) => (
                            <button
                              key={topic}
                              onClick={() => toggleTopic(topic)}
                              className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm ${
                                topics.includes(topic)
                                  ? "border-purple-400 bg-purple-500/20 text-white"
                                  : "border-white/20 bg-white/5 text-gray-300 hover:border-white/40"
                              }`}
                            >
                              {topic}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {subjectsList.map((subject) => (
                      <button
                        key={subject.name}
                        onClick={() => toggleSubject(subject.name)}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 transform hover:scale-105 ${
                          subjects.includes(subject.name)
                            ? "border-purple-400 bg-purple-500/20"
                            : "border-white/20 bg-white/10 hover:border-white/40"
                        }`}
                      >
                        <div
                          className={`w-12 h-12 bg-gradient-to-br ${subject.color} rounded-full flex items-center justify-center mx-auto mb-3`}
                        >
                          <span className="text-2xl">{subject.icon}</span>
                        </div>
                        <h3 className="text-white font-medium">
                          {subject.name}
                        </h3>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

          {/* Start Game */}
          <div className="text-center">
            <button
              onClick={handleStart}
              disabled={!canStartGame()}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 transform ${
                canStartGame()
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 hover:scale-105 shadow-lg hover:shadow-2xl"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
            >
              Start Game
            </button>
          </div>
        </div>
      )}

      {stage === "matching" && (
        <MatchSimulation
          user={user}
          gameMode={gameMode}
          subjects={gameMode === "topic-mode" ? topics : subjects}
          onBack={() => setStage("modes")}
          onGameStart={() => setStage("questions")}
        />
      )}

      {stage === "questions" && (
        <QuestionScreen
          gameMode={gameMode}
          subjects={gameMode === "topic-mode" ? topics : subjects}
          onBack={() => setStage("modes")}
          onGameComplete={handleGameComplete}
        />
      )}
    </div>
  );
}
