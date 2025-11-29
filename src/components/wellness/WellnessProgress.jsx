import React from 'react';
import { TrendingUp, Target, Heart, Sparkles } from 'lucide-react';
import Card from '../ui/Card';

const WellnessProgress = ({
  currentScore = 75,
  weeklyGoal = 5,
  completedSessions = 3,
  streak = 12
}) => {
  const progressPercentage = (completedSessions / weeklyGoal) * 100;
  const scoreColor = currentScore >= 80 ? 'text-spa-600' : currentScore >= 60 ? 'text-lavender-600' : 'text-rose-600';

  return (
    <Card variant="floating" className="animate-fade-in">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-serif text-zen-800">Your Wellness Journey</h3>
          <div className="flex items-center space-x-2 text-spa-600">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-zen">Level {Math.floor(currentScore / 20) + 1}</span>
          </div>
        </div>

        {/* Main Score */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Wellness Score Circle */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-32 h-32 mb-4">
              {/* Background circle */}
              <div className="absolute inset-0 rounded-full bg-zen-100"></div>

              {/* Progress circle */}
              <div
                className="absolute inset-2 rounded-full bg-gradient-to-br from-spa-400 to-lavender-500 flex items-center justify-center"
                style={{
                  background: `conic-gradient(from 180deg at 50% 50%,
                    rgb(168, 185, 133) 0deg,
                    rgb(186, 165, 152) ${(currentScore / 100) * 360}deg,
                    rgb(248, 245, 242) ${(currentScore / 100) * 360}deg)`
                }}
              >
                <div className="w-24 h-24 rounded-full bg-zen-50 flex items-center justify-center">
                  <div className="text-center">
                    <span className={`text-3xl font-bold ${scoreColor}`}>{currentScore}</span>
                    <span className="block text-xs text-zen-500 font-zen">Score</span>
                  </div>
                </div>
              </div>

              {/* Decorative dots */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-spa-400 rounded-full animate-pulse-slow"></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-lavender-400 rounded-full animate-pulse-slow" style={{animationDelay: '2s'}}></div>
            </div>

            <div className="text-center">
              <p className="text-sm text-zen-600 font-zen">Overall Wellness</p>
              <p className="text-xs text-zen-500">Keep up the great work!</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Weekly Progress */}
            <div className="p-4 bg-gradient-to-br from-spa-50 to-spa-100 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <Target className="w-5 h-5 text-spa-600" />
                <span className="text-xs text-spa-700 font-zen">{completedSessions}/{weeklyGoal}</span>
              </div>
              <div className="w-full bg-spa-200 rounded-full h-2 mb-2">
                <div
                  className="bg-gradient-to-r from-spa-400 to-spa-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-zen-600">Weekly Sessions</p>
            </div>

            {/* Streak */}
            <div className="p-4 bg-gradient-to-br from-lavender-50 to-lavender-100 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <TrendingUp className="w-5 h-5 text-lavender-600" />
                <span className="text-lg font-bold text-lavender-700">{streak}</span>
              </div>
              <div className="flex space-x-1">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 flex-1 rounded-full ${
                      i < Math.min(streak, 7)
                        ? 'bg-lavender-400'
                        : 'bg-lavender-200'
                    }`}
                  ></div>
                ))}
              </div>
              <p className="text-xs text-zen-600 mt-2">Day Streak</p>
            </div>

            {/* Heart Rate */}
            <div className="p-4 bg-gradient-to-br from-rose-50 to-rose-100 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <Heart className="w-5 h-5 text-rose-600 animate-pulse-slow" />
                <span className="text-lg font-bold text-rose-700">72</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-xs text-zen-600">Resting</span>
                <span className="text-xs text-rose-600">Excellent</span>
              </div>
            </div>

            {/* Achievement */}
            <div className="p-4 bg-gradient-to-br from-zen-100 to-zen-200 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <Sparkles className="w-5 h-5 text-zen-600" />
                <span className="text-lg font-bold text-zen-700">3</span>
              </div>
              <div className="flex -space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-6 h-6 bg-spa-400 rounded-full border-2 border-zen-50"></div>
                ))}
              </div>
              <p className="text-xs text-zen-600 mt-2">Achievements</p>
            </div>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="mt-8 p-6 bg-gradient-to-r from-spa-50/50 to-lavender-50/50 rounded-2xl border border-spa-200/30">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-spa-400 to-lavender-500 rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <p className="text-zen-700 font-zen font-medium mb-1">You're doing amazing!</p>
              <p className="text-zen-600 text-sm">
                {currentScore >= 80
                  ? "Your wellness score is excellent! Keep maintaining this healthy balance."
                  : currentScore >= 60
                  ? "Good progress! A few more sessions will help you reach optimal wellness."
                  : "You're on the right path! Regular practice will improve your score significantly."
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WellnessProgress;