# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm run dev` - Start Vite development server with Hot Module Replacement
- `npm run build` - Build for production using Vite
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

### Dependencies Management
- `npm install` - Install all dependencies
- `npm install <package>` - Add new dependency

### Testing Commands
- `npm run test` - Run test suite (if configured)
- `npm run test:watch` - Run tests in watch mode (if configured)

## Project Architecture

### Technology Stack
- **Frontend Framework**: React 19.2.0 with modern hooks and strict mode
- **Build Tool**: Vite 7.2.4 for fast development and optimized builds
- **Authentication**: Firebase Auth with Google provider integration
- **Styling**: Tailwind CSS 4.1.17 with PostCSS processing
- **Progressive Web App**: PWA capabilities via vite-plugin-pwa
- **Code Quality**: ESLint with React-specific rules and globals configuration

### Application Structure
```
src/
├── main.jsx                 # React entry point with StrictMode
├── App.jsx                  # Main application component with providers
├── firebase.js              # Firebase configuration re-export
├── index.css               # Global styles and Tailwind imports
├── components/              # Organized React components
│   ├── auth/             # Authentication related components
│   │   ├── ProtectedRoute.jsx  # Authentication guard component
│   │   └── LoginPage.jsx      # Google authentication landing page
│   ├── layout/           # Layout and main screen components
│   │   └── Dashboard.jsx       # Main authenticated user dashboard
│   └── common/           # Shared/reusable components (for future use)
├── hooks/                 # Custom React hooks
│   ├── useAuth.js         # Authentication context hook
│   └── index.js           # Hook exports
├── lib/                   # Utility functions and configurations
│   ├── firebase.js         # Firebase initialization with environment variables
│   ├── utils.js            # General utility functions
│   └── index.js           # Library exports
├── services/              # External API integration services
│   └── index.js           # API service exports
└── contexts/              # React contexts
    └── AuthContext.jsx    # Firebase auth context provider
```

### Authentication Flow
1. App entry point (`main.jsx`) renders App component in StrictMode
2. App component wraps entire app in ErrorBoundary and AuthProvider
3. ProtectedRoute acts as authentication guard, handling loading states and redirecting
4. Unauthenticated users see `LoginPage` with Google sign-in button
5. `AuthContext` manages Firebase auth state with `onAuthStateChanged` listener
6. Authenticated users access `Dashboard` with user profile and logout functionality

### Key Architectural Patterns
- **Error Boundaries**: App-level error handling with ErrorBoundary component
- **Context API**: Centralized authentication state management using React Context
- **Protected Routes**: HOC pattern for route-level authentication guards with loading states
- **Custom Hooks**: useAuth hook provides clean access to authentication context
- **Firebase Integration**: Modular Firebase imports for optimal tree-shaking and environment validation
- **Responsive Design**: Mobile-first Tailwind utility classes with gradient backgrounds
- **Component Composition**: Functional components with custom hooks for state extraction
- **Environment Validation**: Firebase configuration validates required environment variables on initialization

### Environment Configuration
The app uses environment variables for configuration:
- `.env` - Local development environment variables
- Firebase configuration uses `import.meta.env.VITE_*` variables
- Required variables: API key, auth domain, project ID, app ID
- Optional variables: storage bucket, messaging sender ID, measurement ID
- Environment validation throws errors for missing required variables

### Firebase Configuration
The app uses Firebase for authentication with these services:
- Firebase Authentication (Google Provider)
- Firebase Analytics (auto-initialized)
- Configuration stored in `src/lib/firebase.js` with environment validation
- Modular imports used for optimal tree-shaking and performance

### PWA Features
- Auto-update service worker registration
- Custom app manifest with icons and theme colors
- Standalone display mode support
- Offline capability foundation

### ESLint Configuration
- Flat config format with React and Vite-specific rules
- Globals for browser environment
- Unused variables ignored for uppercase-prefixed constants (`^[A-Z_]`)
- Separate configurations for different file types

### Tailwind CSS Setup
- Content scanning for JS/JSX files
- Standard Tailwind theme with no custom extensions
- Utility-first approach for consistent design system

## Development Notes

### Firebase Security
- Firebase config contains public credentials (safe for client-side)
- Authentication state is managed centrally in AuthContext
- Always check auth state before accessing protected resources

### Component Patterns
- Use functional components with hooks
- Extract authentication logic via `useAuth` custom hook
- Implement loading states during auth state changes
- Follow the existing gradient design system for consistency

### Build Process
- Vite handles React Fast Refresh automatically during development
- PWA assets and service worker are automatically processed during build
- Production builds are optimized with standard Vite plugins
- React StrictMode is enabled for development checks

### File Organization Patterns
- Components are organized by domain (auth/, layout/, common/)
- Hooks are centralized in hooks/ directory with index.js barrel exports
- Utilities and configurations are grouped in lib/ directory
- Context providers are in contexts/ directory
- Services for external APIs are in services/ directory