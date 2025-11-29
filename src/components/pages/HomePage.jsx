import React from 'react';
import { Button, Card } from '../ui';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-md mx-auto">
        <Card variant="glass" className="my-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-light text-gray-800 mb-4">Welcome to Zen</h1>
            <p className="text-gray-600 text-lg max-w-md mx-auto">Find your inner peace and tranquility</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="h-full">
              <div className="text-center py-12">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l-2-2m2 2l2-2M3 12l6-6m-6 6l6-6" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Quick Start</h3>
                <p className="text-gray-600 text-sm">Begin your journey with a calm mind</p>
                <Button variant="primary" size="md" className="w-full">
                  Get Started
                </Button>
              </div>
            </Card>

            <Card className="h-full">
              <div className="text-center py-12">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4 2m0-4v2m0 10V4m0 2a2 2 0 110 4 2m0-4v6m0-2a2 2 0 100 4 2m0-4v2" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Zen Mode</h3>
                <p className="text-gray-600 text-sm">Find your inner peace and tranquility</p>
                <Button variant="secondary" size="md" className="w-full">
                  Start Session
                </Button>
              </div>
            </Card>

            <Card className="h-full">
              <div className="text-center py-12">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a2 2 0 002-2v-4a2 2 0 00-2-2m-6 4l2 2-4-2" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Mindfulness</h3>
                <p className="text-gray-600 text-sm">Practice mindfulness and meditation</p>
                <Button variant="secondary" size="md" className="w-full">
                  Begin Practice
                </Button>
              </div>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;