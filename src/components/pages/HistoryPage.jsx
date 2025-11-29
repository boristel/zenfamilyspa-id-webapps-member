import React from 'react';
import { Button, Card } from '../ui';

const HistoryPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-md mx-auto">
        <Card className="h-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-light text-gray-800 mb-4">History</h1>
            <p className="text-gray-600 text-lg max-w-md mx-auto">Track your Zen journey</p>
          </div>

          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 10-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.5 14l-2.5 2.5M11.5 14l2.5 2.5" />
              </svg>
            </div>
            <h3 className="text-xl font-light text-gray-700 mb-2">No sessions yet</h3>
            <p className="text-gray-500">Your meditation and mindfulness history will appear here</p>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Coming Soon</h3>
            <div className="space-y-3 text-gray-600">
              <p>• Session tracking and statistics</p>
              <p>• Progress monitoring</p>
              <p>• Mood and wellness insights</p>
              <p>• Achievement badges</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HistoryPage;