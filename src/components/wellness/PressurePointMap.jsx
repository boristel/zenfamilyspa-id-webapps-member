import React, { useState } from 'react';
import { Hand, Foot, Info, Sparkles } from 'lucide-react';
import Card from '../ui/Card';

const PressurePointMap = ({ type = 'hand' }) => {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Simplified pressure points data
  const pressurePoints = type === 'hand'
    ? [
      { id: 'h1', x: 20, y: 30, name: 'Head Zone', benefits: 'Relieves headaches, improves mental clarity' },
      { id: 'h2', x: 50, y: 25, name: 'Sinus Relief', benefits: 'Clears congestion, reduces pressure' },
      { id: 'h3', x: 80, y: 30, name: 'Temple Point', benefits: 'Reduces stress, promotes relaxation' },
      { id: 'h4', x: 35, y: 50, name: 'Heart Center', benefits: 'Improves circulation, emotional balance' },
      { id: 'h5', x: 65, y: 50, name: 'Solar Plexus', benefits: 'Boosts energy, reduces anxiety' },
      { id: 'h6', x: 40, y: 70, name: 'Digestive Aid', benefits: 'Aids digestion, reduces bloating' },
      { id: 'h7', x: 60, y: 70, name: 'Reproductive', benefits: 'Balances hormones, reproductive health' },
      { id: 'h8', x: 30, y: 85, name: 'Lower Back', benefits: 'Relieves back pain, improves posture' },
      { id: 'h9', x: 70, y: 85, name: 'Sciatic Nerve', benefits: 'Reduces leg pain, improves mobility' },
    ]
    : [
      { id: 'f1', x: 50, y: 20, name: 'Pineal Gland', benefits: 'Regulates sleep, spiritual awareness' },
      { id: 'f2', x: 30, y: 35, name: 'Pituitary', benefits: 'Hormone regulation, stress reduction' },
      { id: 'f3', x: 70, y: 35, name: 'Thyroid', benefits: 'Metabolism, energy balance' },
      { id: 'f4', x: 25, y: 50, name: 'Lungs', benefits: 'Respiratory health, breathing improvement' },
      { id: 'f5', x: 75, y: 50, name: 'Heart', benefits: 'Circulation, cardiovascular health' },
      { id: 'f6', x: 35, y: 65, name: 'Solar Plexus', benefits: 'Digestive health, stress relief' },
      { id: 'f7', x: 65, y: 65, name: 'Adrenal Glands', benefits: 'Energy, stress response' },
      { id: 'f8', x: 40, y: 80, name: 'Kidneys', benefits: 'Detoxification, blood pressure' },
      { id: 'f9', x: 60, y: 80, name: 'Lower Body', benefits: 'Grounding, stability, circulation' },
    ];

  const Icon = type === 'hand' ? Hand : Foot;
  const title = type === 'hand' ? 'Hand Reflexology' : 'Foot Reflexology';
  const subtitle = type === 'hand'
    ? 'Pressure points that correspond to different body organs and systems'
    : 'Ancient healing practice targeting reflex zones on the feet';

  return (
    <Card variant="luxury" className="animate-slide-up">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-spa-400 to-lavender-500 rounded-xl flex items-center justify-center shadow-zen">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-serif text-zen-800">{title}</h3>
              <p className="text-sm text-zen-600 font-zen">{subtitle}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-zen-500">
            <Info className="w-4 h-4" />
            <span className="text-xs font-zen">Interactive Guide</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pressure Point Map */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-zen-50 to-spa-50 rounded-2xl p-6 border border-spa-200/30">
              {/* Simplified hand/foot outline */}
              <div className="relative w-full h-80">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {type === 'hand' ? (
                    // Simplified hand outline
                    <>
                      <path
                        d="M 20 30 L 25 15 L 30 10 L 35 15 L 35 25 L 40 12 L 45 8 L 50 12 L 50 25 L 55 10 L 60 8 L 65 15 L 65 25 L 70 15 L 75 20 L 80 30 L 80 60 L 75 70 L 70 75 L 65 80 L 60 85 L 55 85 L 50 82 L 45 82 L 40 85 L 35 85 L 30 80 L 25 75 L 20 70 L 20 30 Z"
                        fill="none"
                        stroke="#b8a598"
                        strokeWidth="0.5"
                        className="opacity-50"
                      />
                      {/* Fingers */}
                      <path
                        d="M 30 10 L 30 5 M 40 8 L 40 3 M 50 8 L 50 3 M 60 8 L 60 3 M 70 10 L 70 5"
                        stroke="#b8a598"
                        strokeWidth="0.3"
                        className="opacity-30"
                      />
                    </>
                  ) : (
                    // Simplified foot outline
                    <path
                      d="M 35 20 L 50 15 L 65 20 L 70 30 L 72 45 L 70 60 L 65 70 L 60 75 L 50 78 L 40 75 L 35 70 L 30 60 L 28 45 L 30 30 Z M 35 25 L 35 15 M 50 15 L 50 10 M 65 25 L 65 15"
                      fill="none"
                      stroke="#b8a598"
                      strokeWidth="0.5"
                      className="opacity-50"
                    />
                  )}

                  {/* Pressure Points */}
                  {pressurePoints.map((point) => (
                    <g key={point.id}>
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r={selectedPoint === point.id ? "3" : hoveredPoint === point.id ? "2.5" : "2"}
                        fill={selectedPoint === point.id ? "#68b985" : hoveredPoint === point.id ? "#82cf9f" : "#a7e0c2"}
                        stroke="#68b985"
                        strokeWidth="0.5"
                        className="cursor-pointer transition-all duration-200 hover:fill-spa-500"
                        onMouseEnter={() => setHoveredPoint(point.id)}
                        onMouseLeave={() => setHoveredPoint(null)}
                        onClick={() => setSelectedPoint(point.id === selectedPoint ? null : point.id)}
                      />
                      {/* Pulse animation for selected point */}
                      {selectedPoint === point.id && (
                        <circle
                          cx={point.x}
                          cy={point.y}
                          r="4"
                          fill="none"
                          stroke="#68b985"
                          strokeWidth="0.5"
                          className="animate-pulse"
                        />
                      )}
                    </g>
                  ))}
                </svg>
              </div>

              {/* Floating sparkles */}
              <div className="absolute top-4 right-4 w-6 h-6 bg-spa-200/30 rounded-full animate-float">
                <Sparkles className="w-3 h-3 text-spa-400 mx-auto mt-1" />
              </div>
              <div className="absolute bottom-8 left-6 w-5 h-5 bg-lavender-200/30 rounded-full animate-float" style={{animationDelay: '2s'}}>
                <div className="w-2 h-2 bg-lavender-400 rounded-full mx-auto mt-1.5"></div>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-4 flex items-center justify-center space-x-6 text-xs text-zen-500">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-spa-400 rounded-full"></div>
                <span>Active</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-spa-300 rounded-full"></div>
                <span>Hover</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-spa-200 rounded-full"></div>
                <span>Inactive</span>
              </div>
            </div>
          </div>

          {/* Point Information Panel */}
          <div className="space-y-4">
            {selectedPoint ? (
              <div className="animate-fade-in">
                <div className="p-6 bg-gradient-to-br from-spa-50 to-lavender-50 rounded-2xl border border-spa-200/30">
                  <h4 className="text-xl font-serif text-zen-800 mb-3 flex items-center">
                    <Sparkles className="w-5 h-5 text-spa-500 mr-2" />
                    {pressurePoints.find(p => p.id === selectedPoint)?.name}
                  </h4>
                  <p className="text-zen-600 font-zen mb-4 leading-relaxed">
                    {pressurePoints.find(p => p.id === selectedPoint)?.benefits}
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="p-3 bg-white/60 rounded-xl">
                      <span className="text-zen-500">Session Time</span>
                      <p className="font-zen text-zen-700">2-3 minutes</p>
                    </div>
                    <div className="p-3 bg-white/60 rounded-xl">
                      <span className="text-zen-500">Pressure</span>
                      <p className="font-zen text-zen-700">Gentle firm</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-zen-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Info className="w-8 h-8 text-zen-400" />
                </div>
                <h4 className="text-lg font-serif text-zen-800 mb-2">Select a Pressure Point</h4>
                <p className="text-zen-600 text-sm font-zen">
                  Click on any highlighted area to learn about its benefits and how to stimulate it
                </p>
              </div>
            )}

            {/* Instructions */}
            <div className="p-4 bg-zen-100/50 rounded-xl">
              <h5 className="text-zen-700 font-zen font-medium mb-2">How to Use</h5>
              <ul className="text-zen-600 text-sm font-zen space-y-1">
                <li>• Click on pressure points to view details</li>
                <li>• Apply gentle circular pressure for 2-3 minutes</li>
                <li>• Bre deeply while applying pressure</li>
                <li>• Stop if you experience any discomfort</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PressurePointMap;