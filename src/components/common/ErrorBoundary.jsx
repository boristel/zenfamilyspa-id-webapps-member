import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
            <h1 className="text-xl font-bold text-red-600 mb-2">⚠️ Something went wrong</h1>
            <div className="text-red-800">
              <h2 className="text-lg font-semibold mb-2">Error Details:</h2>
              <p className="bg-red-100 p-3 rounded border border-red-200">
                {this.state.error?.toString() || 'Unknown error occurred'}
              </p>
              <p className="mt-4">
                <strong>Component:</strong> {this.state.errorInfo?.componentStack}
              </p>
              <details className="mt-2">
                <summary className="cursor-pointer text-red-600 hover:text-red-800">
                  📋 View Error Stack
                </summary>
                <pre className="bg-red-50 p-3 rounded text-sm overflow-auto">
                  {this.state.error?.stack}
                </pre>
              </details>
            </div>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}