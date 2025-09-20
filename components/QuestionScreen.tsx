import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Zap, Trophy, Target } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  subject: string;
  difficulty: string;
  points: number;
}

interface QuestionScreenProps {
  gameMode: string;
  subjects: string[];
  onBack: () => void;
  onGameComplete: (coinsEarned: number, xpEarned: number) => void;
}

const QuestionScreen: React.FC<QuestionScreenProps> = ({ 
  gameMode, 
  subjects, 
  onBack, 
  onGameComplete 
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameComplete, setGameComplete] = useState(false);
  const [streak, setStreak] = useState(0);
  const [playerProgress, setPlayerProgress] = useState(0);
  const [opponentProgress, setOpponentProgress] = useState(0);

  // Mock questions data
  const questions: Question[] = [
    {
      id: 1,
      question: "What is the derivative of x²?",
      options: ["2x", "x", "2", "x²"],
      correctAnswer: 0,
      subject: "Mathematics",
      difficulty: "Easy",
      points: 100
    },
    {
      id: 2,
      question: "Which element has the chemical symbol 'Au'?",
      options: ["Silver", "Gold", "Aluminum", "Argon"],
      correctAnswer: 1,
      subject: "Chemistry",
      difficulty: "Medium",
      points: 150
    },
    {
      id: 3,
      question: "Who wrote 'Romeo and Juliet'?",
      options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
      correctAnswer: 1,
      subject: "English",
      difficulty: "Easy",
      points: 100
    },
    {
      id: 4,
      question: "What is the acceleration due to gravity on Earth?",
      options: ["9.8 m/s²", "10 m/s²", "8.9 m/s²", "11.2 m/s²"],
      correctAnswer: 0,
      subject: "Physics",
      difficulty: "Medium",
      points: 150
    },
    {
      id: 5,
      question: "Which organ produces insulin?",
      options: ["Liver", "Kidney", "Pancreas", "Heart"],
      correctAnswer: 2,
      subject: "Biology",
      difficulty: "Medium",
      points: 150
    }
  ];

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !showResult && !gameComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleTimeUp();
    }
  }, [timeLeft, showResult, gameComplete]);

  // Simulate opponent progress
  useEffect(() => {
    if (!gameComplete) {
      const interval = setInterval(() => {
        setOpponentProgress(prev => Math.min(prev + Math.random() * 3, (currentQuestion / questions.length) * 100 + Math.random() * 10));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentQuestion, gameComplete]);

  const handleTimeUp = () => {
    setShowResult(true);
    setStreak(0);
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        nextQuestion();
      } else {
        endGame();
      }
    }, 2000);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const correct = answerIndex === questions[currentQuestion].correctAnswer;
    if (correct) {
      const points = questions[currentQuestion].points + (streak * 10);
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
      setPlayerProgress(prev => Math.min(prev + 20, 100));
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        nextQuestion();
      } else {
        endGame();
      }
    }, 2000);
  };

  const nextQuestion = () => {
    setCurrentQuestion(prev => prev + 1);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(30);
  };

  const endGame = () => {
    setGameComplete(true);
    const coinsEarned = Math.floor(score / 10);
    const xpEarned = score + (streak * 5);
    
    setTimeout(() => {
      onGameComplete(coinsEarned, xpEarned);
    }, 3000);
  };

  const getOptionClass = (index: number) => {
    if (!showResult) {
      return selectedAnswer === index 
        ? 'border-purple-400 bg-purple-500/20 text-white'
        : 'border-white/20 bg-white/10 hover:border-white/40 text-gray-200';
    }
    
    if (index === questions[currentQuestion].correctAnswer) {
      return 'border-green-400 bg-green-500/20 text-green-100';
    }
    
    if (selectedAnswer === index && index !== questions[currentQuestion].correctAnswer) {
      return 'border-red-400 bg-red-500/20 text-red-100';
    }
    
    return 'border-gray-500/20 bg-gray-500/10 text-gray-400';
  };

  if (gameComplete) {
    return (
      <div className="min-h-screen p-4 md:p-6 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20 max-w-md w-full">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Game Complete!</h2>
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Final Score:</span>
              <span className="text-2xl font-bold text-yellow-400">{score}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Best Streak:</span>
              <span className="text-lg font-bold text-green-400">{streak}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Coins Earned:</span>
              <span className="text-lg font-bold text-yellow-400">{Math.floor(score / 10)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">XP Earned:</span>
              <span className="text-lg font-bold text-purple-400">{score + (streak * 5)}</span>
            </div>
          </div>
          <div className="animate-pulse text-gray-300">
            Returning to dashboard...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-white hover:text-purple-300 transition-colors duration-200"
          >
            <ArrowLeft className="w-6 h-6" />
            <span className="font-medium">Quit</span>
          </button>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-white" />
              <span className={`font-bold text-lg ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
                {timeLeft}s
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-bold">{score}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-bold">{streak}</span>
            </div>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-6 border border-white/20">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white font-medium">You</span>
            <span className="text-white font-medium">Opponents</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-green-600 to-emerald-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${playerProgress}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-red-600 to-pink-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${opponentProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm text-purple-300 font-medium">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-300">{questions[currentQuestion].subject}</span>
              <span className="px-2 py-1 bg-purple-500/30 text-purple-200 rounded text-xs">
                {questions[currentQuestion].difficulty}
              </span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-8 leading-relaxed">
            {questions[currentQuestion].question}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-left transform hover:scale-102 ${getOptionClass(index)}`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    showResult && index === questions[currentQuestion].correctAnswer 
                      ? 'bg-green-500 text-white'
                      : showResult && selectedAnswer === index && index !== questions[currentQuestion].correctAnswer
                      ? 'bg-red-500 text-white'
                      : 'bg-white/20 text-white'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="flex-1">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {showResult && (
            <div className="mt-6 text-center">
              {selectedAnswer === questions[currentQuestion].correctAnswer ? (
                <div className="text-green-400">
                  <p className="text-xl font-bold mb-2">Correct! 🎉</p>
                  <p className="text-sm">+{questions[currentQuestion].points + (streak * 10)} points</p>
                  {streak > 0 && <p className="text-xs text-yellow-400">Streak bonus: +{streak * 10}</p>}
                </div>
              ) : (
                <div className="text-red-400">
                  <p className="text-xl font-bold mb-2">Wrong! 😞</p>
                  <p className="text-sm">The correct answer was: {questions[currentQuestion].options[questions[currentQuestion].correctAnswer]}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionScreen;