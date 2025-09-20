import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Brain, Target, Sparkles, ChevronRight } from 'lucide-react';

interface GameModesProps {
  onBack: () => void;
  onStartGame: (mode: string, subjects: string[]) => void;
}

const GameModes: React.FC<GameModesProps> = ({ onBack, onStartGame }) => {
  const [selectedMode, setSelectedMode] = useState<string>('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const subjects = [
    { name: 'Mathematics', icon: '📊', color: 'from-blue-600 to-purple-600' },
    { name: 'Physics', icon: '⚡', color: 'from-yellow-600 to-orange-600' },
    { name: 'Chemistry', icon: '🧪', color: 'from-green-600 to-teal-600' },
    { name: 'Biology', icon: '🧬', color: 'from-emerald-600 to-green-600' },
    { name: 'English', icon: '📚', color: 'from-pink-600 to-red-600' },
    { name: 'History', icon: '🏛️', color: 'from-amber-600 to-yellow-600' }
  ];

  const topics = {
    'Mathematics': ['Algebra', 'Geometry', 'Calculus', 'Statistics'],
    'Physics': ['Mechanics', 'Thermodynamics', 'Electricity', 'Optics'],
    'Chemistry': ['Organic', 'Inorganic', 'Physical', 'Analytical'],
    'Biology': ['Cell Biology', 'Genetics', 'Ecology', 'Human Anatomy'],
    'English': ['Grammar', 'Literature', 'Writing', 'Comprehension'],
    'History': ['Ancient', 'Medieval', 'Modern', 'Contemporary']
  };

  const gameModes = [
    {
      id: 'subject-combination',
      title: 'Subject Combination',
      description: 'Mix multiple subjects for variety',
      icon: BookOpen,
      color: 'from-blue-600 to-purple-600',
      requiresSubjects: true
    },
    {
      id: 'single-subject',
      title: 'Single Subject',
      description: 'Focus on one subject area',
      icon: Target,
      color: 'from-green-600 to-emerald-600',
      requiresSubjects: true
    },
    {
      id: 'topic-mode',
      title: 'Topic Mode',
      description: 'Dive deep into specific topics',
      icon: Brain,
      color: 'from-purple-600 to-pink-600',
      requiresSubjects: true
    },
    {
      id: 'general-knowledge',
      title: 'General Knowledge',
      description: 'Random questions from all areas',
      icon: Sparkles,
      color: 'from-yellow-600 to-orange-600',
      requiresSubjects: false
    }
  ];

  const handleSubjectToggle = (subject: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subject) 
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const handleTopicToggle = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const canStartGame = () => {
    if (!selectedMode) return false;
    
    const mode = gameModes.find(m => m.id === selectedMode);
    if (!mode?.requiresSubjects) return true;
    
    if (selectedMode === 'topic-mode') {
      return selectedTopics.length > 0;
    }
    
    return selectedSubjects.length > 0;
  };

  const handleStartGame = () => {
    if (canStartGame()) {
      const subjects = selectedMode === 'topic-mode' ? selectedTopics : selectedSubjects;
      onStartGame(selectedMode, subjects);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-white hover:text-purple-300 transition-colors duration-200"
          >
            <ArrowLeft className="w-6 h-6" />
            <span className="font-medium">Back to Dashboard</span>
          </button>
          <h1 className="text-3xl font-bold text-white">Choose Game Mode</h1>
          <div></div>
        </div>

        {/* Game Modes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {gameModes.map((mode) => {
            const IconComponent = mode.icon;
            const isSelected = selectedMode === mode.id;
            
            return (
              <button
                key={mode.id}
                onClick={() => setSelectedMode(mode.id)}
                className={`p-6 rounded-xl transition-all duration-200 transform hover:scale-105 border-2 ${
                  isSelected
                    ? 'border-purple-400 bg-purple-500/20'
                    : 'border-white/20 bg-white/10 hover:border-white/40'
                } backdrop-blur-md`}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${mode.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{mode.title}</h3>
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

        {/* Subject/Topic Selection */}
        {selectedMode && gameModes.find(m => m.id === selectedMode)?.requiresSubjects && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">
              {selectedMode === 'topic-mode' ? 'Select Topics' : 'Select Subjects'}
            </h2>
            
            {selectedMode === 'topic-mode' ? (
              <div className="space-y-4">
                {Object.entries(topics).map(([subject, subjectTopics]) => (
                  <div key={subject}>
                    <h3 className="text-lg font-semibold text-white mb-2">{subject}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {subjectTopics.map((topic) => (
                        <button
                          key={topic}
                          onClick={() => handleTopicToggle(topic)}
                          className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm ${
                            selectedTopics.includes(topic)
                              ? 'border-purple-400 bg-purple-500/20 text-white'
                              : 'border-white/20 bg-white/5 text-gray-300 hover:border-white/40'
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
                {subjects.map((subject) => (
                  <button
                    key={subject.name}
                    onClick={() => handleSubjectToggle(subject.name)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 transform hover:scale-105 ${
                      selectedSubjects.includes(subject.name)
                        ? 'border-purple-400 bg-purple-500/20'
                        : 'border-white/20 bg-white/10 hover:border-white/40'
                    }`}
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${subject.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                      <span className="text-2xl">{subject.icon}</span>
                    </div>
                    <h3 className="text-white font-medium">{subject.name}</h3>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Start Game Button */}
        <div className="text-center">
          <button
            onClick={handleStartGame}
            disabled={!canStartGame()}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 transform ${
              canStartGame()
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 hover:scale-105 shadow-lg hover:shadow-2xl'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameModes;