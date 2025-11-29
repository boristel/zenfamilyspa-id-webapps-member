import React from 'react';
import { Hand, Foot } from 'lucide-react';
import Card from '../ui/Card';

const ReflexologyCard = ({ type = 'hand', title, description, pressurePoints = 0, onClick }) => {
  const Icon = type === 'hand' ? Hand : Foot;
  const gradientColors = type === 'hand'
    ? 'from-spa-400 via-spa-500 to-spa-600'
    : 'from-lavender-400 via-lavender-500 to-lavender-600';

  return (
    <Card
      variant="luxury"
      hover
      onClick={onClick}
      className="cursor-pointer group animate-slide-up transform transition-all duration-500 hover:scale-[1.02]"
    >
      <div className="p-8 text-center">
        {/* Icon Container */}
        <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-br ${gradientColors} rounded-2xl flex items-center justify-center shadow-zen group-hover:scale-110 group-hover:shadow-zen-lg transition-all duration-300`}>
          <Icon className="w-8 h-8 text-white" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-serif text-zen-800 mb-3 group-hover:text-spa-700 transition-colors duration-300">
          {title || `${type === 'hand' ? 'Hand' : 'Foot'} Reflexology`}
        </h3>

        {/* Description */}
        <p className="text-zen-600 text-sm font-zen mb-4 leading-relaxed">
          {description || `Experience the healing power of ${type === 'hand' ? 'hand' : 'foot'} reflexology`}
        </p>

        {/* Stats */}
        <div className="flex justify-center items-center space-x-4 text-xs text-zen-500">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-spa-400 rounded-full"></div>
            <span>{pressurePoints} Pressure Points</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-lavender-400 rounded-full"></div>
            <span>30 min session</span>
          </div>
        </div>

        {/* Subtle overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-spa-400/5 to-transparent rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </Card>
  );
};

export default ReflexologyCard;