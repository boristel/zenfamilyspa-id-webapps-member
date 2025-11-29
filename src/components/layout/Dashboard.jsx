import React from 'react';
import { useAuth } from '../../hooks';
import { Heart, Hand, Foot, Sparkles, Activity, Calendar, Settings, HelpCircle, Info } from 'lucide-react';
import Card from '../ui/Card';
import ReflexologyCard from '../wellness/ReflexologyCard';
import WellnessProgress from '../wellness/WellnessProgress';
import PressurePointMap from '../wellness/PressurePointMap';
import BreathingExercise from '../wellness/BreathingExercise';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleReflexologySelect = (type) => {
    console.log(`${type} reflexology selected`);
    // Future: Navigate to dedicated reflexology page
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zen-50 via-spa-50 to-lavender-50 relative overflow-hidden">
      {/* Ambient background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-spa-200/15 rounded-full animate-float"></div>
        <div className="absolute top-40 right-10 w-24 h-24 bg-lavender-200/15 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-rose-100/10 rounded-full animate-breathe"></div>
        <div className="absolute bottom-40 right-20 w-28 h-28 bg-spa-100/15 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 bg-white/60 backdrop-blur-zen border-b border-zen-200/50 shadow-zen">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex justify-between items-center h-18 py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-spa-400 to-lavender-500 rounded-xl flex items-center justify-center shadow-zen">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-serif text-zen-800">ZenSpa Wellness</h1>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-3 text-sm font-zen text-zen-600 bg-zen-50/80 hover:bg-zen-100 hover:text-zen-800 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-spa-300 hover:shadow-zen"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden bg-gradient-to-br from-spa-100 to-lavender-100 shadow-zen-lg relative group">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Heart className="w-16 h-16 text-spa-400" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-spa-400/20 to-transparent rounded-full pointer-events-none"></div>
          </div>

          <h2 className="text-4xl font-serif text-zen-800 mb-3 animate-slide-up">
            Welcome back, {user?.displayName?.split(' ')[0] || 'Wellness Seeker'}!
          </h2>
          <p className="text-lg text-zen-600 font-zen animate-slide-up" style={{animationDelay: '0.1s'}}>
            Your journey to balance and harmony continues
          </p>
        </div>

        {/* Wellness Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card variant="floating" hover className="animate-slide-up group" style={{animationDelay: '0.2s'}}>
            <div className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-spa-400 to-spa-500 rounded-xl flex items-center justify-center shadow-zen group-hover:scale-110 transition-transform duration-300">
                <Hand className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-serif text-zen-800 mb-2">Hand Reflexology</h3>
              <p className="text-zen-600 text-sm font-zen">Pressure points for harmony</p>
            </div>
          </Card>

          <Card variant="floating" hover className="animate-slide-up group" style={{animationDelay: '0.3s'}}>
            <div className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-lavender-400 to-lavender-500 rounded-xl flex items-center justify-center shadow-zen group-hover:scale-110 transition-transform duration-300">
                <Foot className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-serif text-zen-800 mb-2">Foot Therapy</h3>
              <p className="text-zen-600 text-sm font-zen">Restore natural balance</p>
            </div>
          </Card>

          <Card variant="floating" hover className="animate-slide-up group" style={{animationDelay: '0.4s'}}>
            <div className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-rose-400 to-rose-500 rounded-xl flex items-center justify-center shadow-zen group-hover:scale-110 transition-transform duration-300">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-serif text-zen-800 mb-2">Wellness Score</h3>
              <p className="text-zen-600 text-sm font-zen">Track your progress</p>
            </div>
          </Card>

          <Card variant="floating" hover className="animate-slide-up group" style={{animationDelay: '0.5s'}}>
            <div className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-spa-500 to-spa-600 rounded-xl flex items-center justify-center shadow-zen group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-serif text-zen-800 mb-2">Sessions</h3>
              <p className="text-zen-600 text-sm font-zen">Schedule your wellness</p>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card variant="luxury" className="mb-12 animate-slide-up" style={{animationDelay: '0.6s'}}>
          <div className="p-8">
            <h3 className="text-2xl font-serif text-zen-800 mb-8 text-center">Your Wellness Journey</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button className="group p-6 bg-gradient-to-br from-zen-50 to-spa-50 rounded-2xl hover:from-spa-100 hover:to-lavender-100 transition-all duration-300 hover:shadow-zen hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-spa-300">
                <Settings className="w-8 h-8 text-spa-500 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                <span className="block text-zen-700 font-zen">Settings</span>
              </button>
              <button className="group p-6 bg-gradient-to-br from-zen-50 to-lavender-50 rounded-2xl hover:from-lavender-100 hover:to-spa-100 transition-all duration-300 hover:shadow-zen hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-lavender-300">
                <HelpCircle className="w-8 h-8 text-lavender-500 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                <span className="block text-zen-700 font-zen">Help & Support</span>
              </button>
              <button className="group p-6 bg-gradient-to-br from-zen-50 to-rose-50 rounded-2xl hover:from-rose-100 hover:to-spa-100 transition-all duration-300 hover:shadow-zen hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-rose-300">
                <Info className="w-8 h-8 text-rose-500 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                <span className="block text-zen-700 font-zen">About ZenSpa</span>
              </button>
            </div>
          </div>
        </Card>

        {/* Wellness Progress Section */}
        <div className="mb-12 animate-slide-up" style={{animationDelay: '0.7s'}}>
          <WellnessProgress
            currentScore={78}
            weeklyGoal={5}
            completedSessions={4}
            streak={15}
          />
        </div>

        {/* Reflexology Cards Section */}
        <div className="mb-12">
          <h3 className="text-3xl font-serif text-zen-800 mb-8 text-center animate-fade-in" style={{animationDelay: '0.8s'}}>
            Explore Healing Modalities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ReflexologyCard
              type="hand"
              title="Hand Reflexology"
              description="Ancient healing art targeting pressure points on hands that correspond to different body organs and systems."
              pressurePoints={15}
              onClick={() => handleReflexologySelect('Hand')}
              style={{animationDelay: '0.9s'}}
            />
            <ReflexologyCard
              type="foot"
              title="Foot Reflexology"
              description="Therapeutic pressure applied to specific points on feet to stimulate healing throughout the body."
              pressurePoints={20}
              onClick={() => handleReflexologySelect('Foot')}
              style={{animationDelay: '1.0s'}}
            />
          </div>
        </div>

        {/* Breathing Exercise */}
        <div className="mb-12 animate-slide-up" style={{animationDelay: '1.1s'}}>
          <BreathingExercise />
        </div>

        {/* Interactive Pressure Point Map */}
        <div className="mb-12 animate-slide-up" style={{animationDelay: '1.3s'}}>
          <PressurePointMap type="hand" />
        </div>

        {/* Wellness Quote */}
        <div className="text-center animate-fade-in" style={{animationDelay: '1.5s'}}>
          <div className="inline-block p-6 bg-white/40 backdrop-blur-zen rounded-2xl border border-zen-200/30">
            <p className="text-zen-600 font-serif italic mb-2">"The feet are the gateway to the soul, and the hands are the pathway to healing."</p>
            <p className="text-zen-500 text-sm font-zen">— Ancient Wellness Wisdom</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;