import React from 'react';
import { Flower2, Sparkles, Heart, Waves, Leaf } from 'lucide-react';

const WellnessHero = ({
  title = "ZenSpa Wellness",
  subtitle = "Your Journey to Balance and Harmony",
  description = "Discover the ancient healing arts of reflexology and modern wellness practices, thoughtfully designed for your complete wellbeing.",
  showCTA = true,
  backgroundImage = null
}) => {
  return (
    <div className="relative min-h-[80vh] overflow-hidden bg-gradient-to-br from-zen-50 via-spa-50 to-lavender-50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs */}
        <div className="absolute top-32 left-20 w-48 h-48 bg-gradient-to-br from-spa-200/20 to-lavender-200/15 rounded-full animate-float"></div>
        <div className="absolute top-48 right-32 w-36 h-36 bg-gradient-to-br from-rose-200/15 to-spa-200/10 rounded-full animate-float" style={{animationDelay: '3s'}}></div>
        <div className="absolute bottom-40 left-40 w-56 h-56 bg-gradient-to-br from-lavender-200/20 to-spa-200/15 rounded-full animate-breathe"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-spa-200/25 to-lavender-200/20 rounded-full animate-float" style={{animationDelay: '5s'}}></div>

        {/* Decorative patterns */}
        <div className="absolute top-20 right-16 animate-pulse-slow">
          <Flower2 className="w-8 h-8 text-lavender-300" />
        </div>
        <div className="absolute top-40 left-16 animate-pulse-slow" style={{animationDelay: '2s'}}>
          <Leaf className="w-6 h-6 text-spa-300" />
        </div>
        <div className="absolute bottom-32 right-32 animate-pulse-slow" style={{animationDelay: '4s'}}>
          <Heart className="w-7 h-7 text-rose-300" />
        </div>

        {/* Wave patterns */}
        <div className="absolute bottom-0 left-0 right-0">
          <Waves className="w-full h-24 text-spa-100/30 animate-float" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-[80vh] flex items-center justify-center px-6 sm:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto text-center">
          {/* Logo/Icon */}
          <div className="mb-8 animate-fade-in">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-spa-400 via-lavender-500 to-spa-600 rounded-3xl flex items-center justify-center shadow-zen-lg hover:shadow-zen-xl transform hover:scale-105 transition-all duration-500">
              <Sparkles className="w-12 h-12 text-white animate-pulse-slow" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-zen-800 mb-6 animate-slide-up leading-tight">
            {title}
          </h1>

          {/* Subtitle */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-zen text-zen-700 mb-8 animate-slide-up" style={{animationDelay: '0.2s'}} leading-relaxed>
            {subtitle}
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl font-zen text-zen-600 mb-12 max-w-3xl mx-auto animate-slide-up leading-relaxed" style={{animationDelay: '0.4s'}}>
            {description}
          </p>

          {/* CTA Buttons */}
          {showCTA && (
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in" style={{animationDelay: '0.6s'}}>
              <button className="group relative px-8 py-4 bg-gradient-to-r from-spa-500 via-spa-600 to-spa-700 text-white font-zen text-lg rounded-2xl shadow-zen hover:shadow-zen-lg transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-spa-300/50">
                <span className="flex items-center space-x-3">
                  <Heart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>Begin Your Journey</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button className="group relative px-8 py-4 bg-white/60 backdrop-blur-zen text-zen-700 font-zen text-lg rounded-2xl border border-zen-200/50 shadow-zen hover:bg-white hover:shadow-zen-lg hover:border-zen-300/60 transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-zen-300/50">
                <span className="flex items-center space-x-3">
                  <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                  <span>Learn More</span>
                </span>
              </button>
            </div>
          )}

          {/* Features Pills */}
          <div className="mt-16 flex flex-wrap justify-center gap-4 animate-fade-in" style={{animationDelay: '0.8s'}}>
            <div className="px-4 py-2 bg-spa-100/60 backdrop-blur-sm rounded-full border border-spa-200/40 flex items-center space-x-2">
              <div className="w-2 h-2 bg-spa-400 rounded-full animate-pulse"></div>
              <span className="text-zen-700 text-sm font-zen">Ancient Healing</span>
            </div>
            <div className="px-4 py-2 bg-lavender-100/60 backdrop-blur-sm rounded-full border border-lavender-200/40 flex items-center space-x-2">
              <div className="w-2 h-2 bg-lavender-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              <span className="text-zen-700 text-sm font-zen">Modern Wellness</span>
            </div>
            <div className="px-4 py-2 bg-rose-100/60 backdrop-blur-sm rounded-full border border-rose-200/40 flex items-center space-x-2">
              <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
              <span className="text-zen-700 text-sm font-zen">Personal Journey</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-zen-400 animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-xs font-zen">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-zen-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-zen-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessHero;