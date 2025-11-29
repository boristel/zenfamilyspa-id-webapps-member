import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Heart, Wind } from 'lucide-react';
import Card from '../ui/Card';

const BreathingExercise = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('inhale');
  const [timeRemaining, setTimeRemaining] = useState(4);
  const [totalRounds, setTotalRounds] = useState(0);
  const intervalRef = useRef(null);

  const phases = [
    { name: 'inhale', duration: 4, instruction: 'Breath in slowly', color: 'spa' },
    { name: 'hold', duration: 7, instruction: 'Hold your breath', color: 'lavender' },
    { name: 'exhale', duration: 8, instruction: 'Release slowly', color: 'rose' }
  ];

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            // Move to next phase
            setPhase((currentPhase) => {
              const currentIndex = phases.findIndex(p => p.name === currentPhase);
              const nextIndex = (currentIndex + 1) % phases.length;

              // Check if completed a full cycle
              if (nextIndex === 0) {
                setTotalRounds(prev => prev + 1);
              }

              return phases[nextIndex].name;
            });
            const currentPhaseIndex = phases.findIndex(p => p.name === phase);
            return phases[(currentPhaseIndex + 1) % phases.length].duration;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, phase]);

  const handleStart = () => setIsActive(true);
  const handlePause = () => setIsActive(false);
  const handleReset = () => {
    setIsActive(false);
    setPhase('inhale');
    setTimeRemaining(4);
    setTotalRounds(0);
  };

  const currentPhaseData = phases.find(p => p.name === phase);
  const progress = ((currentPhaseData.duration - timeRemaining) / currentPhaseData.duration) * 100;

  return (
    <Card variant="luxury" className="mb-8 animate-slide-up">
      <div className="p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Wind className="w-8 h-8 text-spa-500" />
            <h3 className="text-3xl font-serif text-zen-800">Breathing Exercise</h3>
            <Heart className="w-8 h-8 text-rose-500 animate-pulse-slow" />
          </div>
          <p className="text-zen-600 font-zen">Calming 4-7-8 breathing pattern for relaxation and stress relief</p>
        </div>

        {/* Breathing Circle */}
        <div className="relative w-64 h-64 mx-auto mb-8">
          {/* Background circle */}
          <div className="absolute inset-0 bg-gradient-to-br from-zen-100 to-spa-50 rounded-full border-4 border-zen-200/50"></div>

          {/* Animated breathing circle */}
          <div
            className={`absolute inset-4 bg-gradient-to-br from-${currentPhaseData.color}-100 to-${currentPhaseData.color}-200 rounded-full flex items-center justify-center transition-all duration-1000 ease-in-out`}
            style={{
              transform: `scale(${0.8 + (progress / 100) * 0.4})`,
            }}
          >
            <div className="text-center">
              <div className={`text-5xl font-bold text-${currentPhaseData.color}-600 mb-2`}>
                {timeRemaining}
              </div>
              <div className={`text-sm font-zen text-${currentPhaseData.color}-700 capitalize`}>
                {currentPhaseData.instruction}
              </div>
            </div>
          </div>

          {/* Decorative orbit */}
          <div className="absolute -inset-2 rounded-full border-2 border-zen-200/20 animate-pulse-slow"></div>
        </div>

        {/* Phase Indicator */}
        <div className="flex justify-center mb-8 space-x-4">
          {phases.map((p, index) => (
            <div
              key={p.name}
              className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                phase === p.name
                  ? `bg-${p.color}-100 border-2 border-${p.color}-300 scale-105`
                  : 'bg-zen-50 border border-zen-200 opacity-50'
              }`}
            >
              <div className="text-center">
                <div className={`text-sm font-zen capitalize ${phase === p.name ? `text-${p.color}-700` : 'text-zen-500'}`}>
                  {p.name}
                </div>
                <div className={`text-xs ${phase === p.name ? `text-${p.color}-600` : 'text-zen-400'}`}>
                  {p.duration}s
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="text-center p-4 bg-zen-50 rounded-xl">
            <div className="text-2xl font-bold text-zen-800">{totalRounds}</div>
            <div className="text-sm text-zen-600 font-zen">Rounds</div>
          </div>
          <div className="text-center p-4 bg-zen-50 rounded-xl">
            <div className="text-2xl font-bold text-zen-800">{totalRounds * 19}</div>
            <div className="text-sm text-zen-600 font-zen">Total Seconds</div>
          </div>
          <div className="text-center p-4 bg-zen-50 rounded-xl">
            <div className="text-2xl font-bold text-zen-800">{Math.floor((totalRounds * 19) / 60)}</div>
            <div className="text-sm text-zen-600 font-zen">Minutes</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4">
          {!isActive ? (
            <button
              onClick={handleStart}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-spa-500 to-spa-600 text-white font-zen rounded-xl shadow-zen hover:shadow-zen-lg transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-spa-300"
            >
              <Play className="w-5 h-5" />
              <span>Start</span>
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white font-zen rounded-xl shadow-zen hover:shadow-zen-lg transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rose-300"
            >
              <Pause className="w-5 h-5" />
              <span>Pause</span>
            </button>
          )}

          <button
            onClick={handleReset}
            className="flex items-center space-x-2 px-6 py-3 bg-zen-100 text-zen-700 font-zen rounded-xl border border-zen-200 hover:bg-zen-200 transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-zen-300"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Reset</span>
          </button>
        </div>

        {/* Benefits */}
        <div className="mt-8 p-6 bg-gradient-to-r from-spa-50/50 to-lavender-50/50 rounded-2xl border border-spa-200/30">
          <h4 className="text-lg font-serif text-zen-800 mb-3">Benefits of This Exercise</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-zen-600 font-zen">
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-spa-400 rounded-full mt-1.5"></div>
              <span>Reduces stress and anxiety</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-lavender-400 rounded-full mt-1.5"></div>
              <span>Lowers blood pressure</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-rose-400 rounded-full mt-1.5"></div>
              <span>Improves focus and clarity</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-spa-400 rounded-full mt-1.5"></div>
              <span>Promotes better sleep</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BreathingExercise;