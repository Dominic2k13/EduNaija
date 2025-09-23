import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users, Zap, Trophy } from 'lucide-react';

import type { User } from './types';
interface MatchSimulationProps {
  user: User;
  gameMode: string;
  subjects: string[];
  onGameStart: () => void;
  onBack: () => void;
}

const MatchSimulation: React.FC<MatchSimulationProps> = ({ 
  user, 
  gameMode, 
  subjects, 
  onGameStart, 
  onBack 
}) => {
  const [matchingProgress, setMatchingProgress] = useState(0);
  const [foundMatch, setFoundMatch] = useState(false);
  const [opponents, setOpponents] = useState<Array<{
    name: string;
    avatar: string;
    rank: string;
    rating: number;
  }>>([]);

  const potentialOpponents = [
    { name: 'Alex Chen', avatar: '🎯', rank: 'Silver', rating: 1240 },
    { name: 'Sarah Johnson', avatar: '⭐', rank: 'Gold', rating: 1580 },
    { name: 'Mike Rodriguez', avatar: '🚀', rank: 'Bronze', rating: 980 },
    { name: 'Emma Wilson', avatar: '💎', rank: 'Platinum', rating: 1890 },
    { name: 'David Kim', avatar: '🔥', rank: 'Diamond', rating: 2100 },
    { name: 'Lisa Brown', avatar: '⚡', rank: 'Master', rating: 2450 }
  ];

  useEffect(() => {
    // Simulate matchmaking
    const interval = setInterval(() => {
      setMatchingProgress(prev => {
        if (prev >= 100) {
          setFoundMatch(true);
          // Select random opponents
          const shuffled = [...potentialOpponents].sort(() => 0.5 - Math.random());
          setOpponents(shuffled.slice(0, 3));
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const getRankColor = (rank: string) => {
    switch (rank.toLowerCase()) {
      case 'bronze': return 'text-orange-400';
      case 'silver': return 'text-gray-300';
      case 'gold': return 'text-yellow-400';
      case 'platinum': return 'text-cyan-400';
      case 'diamond': return 'text-blue-400';
      case 'master': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-black hover:text-purple-300 transition-colors duration-200"
          >
            <ArrowLeft className="w-6 h-6" />
            <span className="font-medium">Back</span>
          </button>
          <h1 className="text-3xl font-bold text-black">Finding Match</h1>
          <div></div>
        </div>

        {/* Game Info */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-black mb-2">Game Mode: {gameMode.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</h2>
            <div className="flex justify-center flex-wrap gap-2">
              {subjects.map((subject, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-500/30 text-purple-800 rounded-full text-sm"
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>

          {/* Your Profile */}
          <div className="bg-white/10 rounded-xl p-4 mb-6">
            <h3 className="text-black font-semibold mb-3 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              You
            </h3>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-xl">
                {user.avatar}
              </div>
              <div>
                <p className="text-black font-medium">{user.displayName}</p>
                <p className={`text-sm ${getRankColor(user.rank)}`}>{user.rank}</p>
              </div>
              <div className="ml-auto">
                <div className="flex items-center space-x-1">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400 font-bold">{user.xp}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Matchmaking Progress */}
        {!foundMatch ? (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
            <div className="animate-spin w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold text-black mb-4">Searching for opponents...</h2>
            <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
              <div
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all duration-200"
                style={{ width: `${matchingProgress}%` }}
              ></div>
            </div>
            <p className="text-gray-300">Finding players with similar skill level...</p>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-black" />
              </div>
              <h2 className="text-2xl font-bold text-black mb-2">Match Found!</h2>
              <p className="text-gray-700">Get ready to battle these opponents</p>
            </div>

            {/* Opponents */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {opponents.map((opponent, index) => (
                <div
                  key={index}
                  className="bg-white/10 rounded-xl p-4 border border-white/20 transform hover:scale-105 transition-all duration-200"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
                      {opponent.avatar}
                    </div>
                    <h3 className="text-black font-bold">{opponent.name}</h3>
                    <p className={`text-sm ${getRankColor(opponent.rank)} mb-2`}>{opponent.rank}</p>
                    <div className="flex items-center justify-center space-x-1">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-400 font-bold">{opponent.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={onGameStart}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-black font-bold py-4 px-8 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-2xl"
              >
                Start Battle
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchSimulation;