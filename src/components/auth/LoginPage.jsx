import React, { useState } from 'react';
import { useAuth } from '../../hooks';
import { Button, Input, Card } from '../ui';
import { Mail, Lock, User, Eye, EyeOff, LogIn, Flower2, Sparkles } from 'lucide-react';
import LoginForm from '../../features/auth/LoginForm';
import RegisterForm from '../../features/auth/RegisterForm';

const LoginPage = () => {
  const { signInWithGoogle, signInWithEmail, registerWithEmail, loading, error } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zen-50 via-spa-50 to-lavender-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-spa-200/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-10 w-24 h-24 bg-lavender-200/20 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-rose-100/15 rounded-full animate-breathe"></div>
        <div className="absolute bottom-40 right-20 w-28 h-28 bg-spa-100/20 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo/Title Section */}
        <div className="text-center mb-8 animate-slide-up">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-spa-400 to-lavender-500 rounded-2xl shadow-zen mb-4 animate-pulse-slow">
            <Flower2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-serif text-zen-800 mb-2">ZenSpa</h1>
          <p className="text-zen-600 font-zen">Your journey to wellness begins here</p>
        </div>

        {/* Form Toggle */}
        <Card variant="luxury" className="mb-6 p-1">
          <div className="flex">
            <button
              type="button"
              onClick={toggleMode}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-zen font-medium transition-all duration-300 ${
                  isLogin
                    ? 'bg-gradient-to-r from-spa-500 to-spa-600 text-white shadow-zen transform scale-105'
                    : 'text-zen-600 hover:text-spa-700 hover:bg-spa-50/60'
                }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={toggleMode}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-zen font-medium transition-all duration-300 ${
                  !isLogin
                    ? 'bg-gradient-to-r from-spa-500 to-spa-600 text-white shadow-zen transform scale-105'
                    : 'text-zen-600 hover:text-spa-700 hover:bg-spa-50/60'
                }`}
            >
              Register
            </button>
          </div>
        </Card>

        {/* Error Display */}
        {error && (
          <Card variant="floating" className="mb-6 bg-rose-50/90 border-rose-200 animate-slide-up">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-5 h-5 text-rose-500 mt-0.5">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-rose-700 text-sm font-zen flex-1">{error}</p>
            </div>
          </Card>
        )}

        {/* Form Container */}
        <Card variant="luxury" hover className="mb-6 animate-slide-up" style={{animationDelay: '0.1s'}}>
          {isLogin ? (
            <LoginForm onToggleMode={toggleMode} />
          ) : (
            <RegisterForm onToggleMode={toggleMode} />
          )}
        </Card>

        {/* Divider */}
        <div className="relative my-8 animate-fade-in" style={{animationDelay: '0.2s'}}>
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zen-200/60"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-zen-50/90 backdrop-blur-zen text-zen-500 font-zen">Or continue with</span>
          </div>
        </div>

        {/* Google Sign In Button */}
        <Button
          variant="secondary"
          onClick={signInWithGoogle}
          disabled={loading}
          loading={loading}
          className="w-full mb-6 animate-slide-up"
          style={{animationDelay: '0.3s'}}
        >
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </Button>

        {/* Terms */}
        <div className="text-center animate-fade-in" style={{animationDelay: '0.4s'}}>
          <p className="text-xs text-zen-500 font-zen">
            By continuing, you agree to our <span className="text-spa-600 hover:text-spa-700 cursor-pointer transition-colors">Terms of Service</span> and <span className="text-spa-600 hover:text-spa-700 cursor-pointer transition-colors">Privacy Policy</span>
          </p>
        </div>

        {/* Spa-themed footer */}
        <div className="text-center mt-8 animate-fade-in" style={{animationDelay: '0.5s'}}>
          <div className="flex items-center justify-center space-x-2 text-zen-400">
            <Flower2 className="w-4 h-4" />
            <span className="text-xs font-zen">Crafted with mindfulness for your wellness journey</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;