# ZenSpa Member Web Application

A modern, mobile-first Progressive Web Application (PWA) for ZenSpa members built with React, Vite, and Firebase.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Building for Production](#building-for-production)
- [Authentication](#authentication)
- [Development](#development)
- [Code Quality](#code-quality)

## 🎯 Overview

ZenSpa Member Web Application is a comprehensive wellness and member management platform featuring:
- **Modern UI/UX**: Polished, mobile-first design with Tailwind CSS
- **Authentication**: Email/password and Google Sign-In via Firebase
- **Wellness Features**: Breathing exercises, reflexology guides, and progress tracking
- **Member Dashboard**: Profile management, history tracking, and personalized content

## ✨ Features

### Authentication
- ✅ Email/Password authentication
- ✅ Google Sign-In (OAuth 2.0)
- ✅ Protected routes
- ✅ Persistent sessions
- ✅ User profile with photo support

### UI Components
- ✅ Atomic Design architecture
- ✅ Reusable UI components (Button, Input, Card)
- ✅ Responsive layouts (Header, Footer, Dashboard)
- ✅ Glassmorphism design elements
- ✅ Smooth animations and transitions

### Wellness Features
- ✅ Breathing exercises with guided timers
- ✅ Reflexology pressure point maps
- ✅ Wellness progress tracking
- ✅ Interactive wellness cards

### Member Features
- ✅ Personal dashboard
- ✅ Transaction history
- ✅ Profile management
- ✅ Activity tracking

## 🛠 Tech Stack

### Core
- **React 19.2.0** - UI library
- **Vite 7.2.4** - Build tool and dev server
- **React Router 7.9.6** - Client-side routing

### Styling
- **Tailwind CSS 4.1.17** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

### Authentication & Backend
- **Firebase 12.6.0** - Authentication and backend services
- **Firebase Auth** - User authentication
- **Google OAuth** - Social login

### Development Tools
- **ESLint 9.39.1** - Code linting
- **Vite Plugin React** - React Fast Refresh
- **Lucide React** - Icon library

### Additional Libraries
- **clsx** - Conditional className utility
- **vite-plugin-pwa** - Progressive Web App support

## 📁 Project Structure

```
memberwebapps/
├── src/
│   ├── components/          # Reusable components
│   │   ├── ui/             # Atomic UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   └── Card.jsx
│   │   ├── layout/         # Layout components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── DashboardLayout.jsx
│   │   ├── wellness/       # Wellness feature components
│   │   │   ├── BreathingExercise.jsx
│   │   │   ├── PressurePointMap.jsx
│   │   │   ├── ReflexologyCard.jsx
│   │   │   └── WellnessProgress.jsx
│   │   └── common/         # Common utilities
│   │       └── ErrorBoundary.jsx
│   ├── features/           # Feature-specific components
│   │   └── auth/
│   │       ├── LoginForm.jsx
│   │       └── RegisterForm.jsx
│   ├── pages/              # Page components
│   │   ├── HomePage.jsx
│   │   ├── HistoryPage.jsx
│   │   ├── ProfilePage.jsx
│   │   └── LoginPage.jsx
│   ├── context/            # React Context providers
│   │   └── AuthContext.jsx
│   ├── lib/                # Library configurations
│   │   ├── firebase.js
│   │   └── utils.js
│   ├── hooks/              # Custom React hooks
│   │   └── useAuth.js
│   ├── App.jsx             # Main application component
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── docs/                   # Documentation
│   ├── command.md
│   ├── google-auth-setup.md
│   └── perintah.md
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
├── eslint.config.js        # ESLint configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.js          # Vite configuration
├── postcss.config.js       # PostCSS configuration
├── package.json            # Project dependencies
└── README.md               # This file
```

## 📦 Installation

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **Git**
- **Firebase Account** (for authentication)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/boristel/zenfamilyspa-id-webapps-member.git
   cd memberwebapps
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Firebase credentials (see [Configuration](#configuration))

## ⚙️ Configuration

### Firebase Setup

1. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or select an existing one

2. **Enable Authentication**
   - Navigate to **Authentication** → **Sign-in method**
   - Enable **Email/Password** provider
   - Enable **Google** provider

3. **Get Firebase Configuration**
   - Go to **Project Settings** (gear icon)
   - Scroll to **Your apps** section
   - Click **Web app** (</> icon)
   - Copy the configuration values

4. **Update `.env` file**
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

### Tailwind CSS Configuration

The project uses **Tailwind CSS v4** with the new `@import` syntax. Configuration is in `tailwind.config.js`.

## 🚀 Running the Application

### Development Mode

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Preview Production Build

Build and preview the production version locally:

```bash
npm run build
npm run preview
```

## 🏗️ Building for Production

### Create Production Build

```bash
npm run build
```

This will:
- Bundle and minify JavaScript
- Process and optimize CSS
- Generate optimized assets
- Output to `dist/` directory

### Build Output

```
dist/
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
├── index.html
└── vite.svg
```

## 🔐 Authentication

### Email/Password Login

1. Navigate to `/login`
2. Enter email and password
3. Click "Sign In"

### Google Sign-In

1. Navigate to `/login`
2. Click "Sign in with Google"
3. Select your Google account
4. Grant permissions
5. Redirected to dashboard

### Registration

1. Navigate to `/register`
2. Enter email, password, and confirm password
3. Click "Sign Up" or use "Sign in with Google"

### Protected Routes

Routes are protected using the `ProtectedRoute` component:
- Unauthenticated users are redirected to `/login`
- Authenticated users can access dashboard pages

## 💻 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

### Code Style

The project uses ESLint with the following configuration:
- React Hooks rules
- React Refresh rules
- Custom unused variables pattern: `^[A-Z_]` for vars, `^_` for args

### Component Guidelines

1. **Atomic Design**: Components are organized by complexity
   - **Atoms**: Basic UI elements (Button, Input)
   - **Molecules**: Simple combinations (Card with Header)
   - **Organisms**: Complex components (LoginForm)
   - **Templates**: Page layouts (DashboardLayout)
   - **Pages**: Complete pages (HomePage)

2. **Naming Conventions**:
   - Components: PascalCase (e.g., `LoginForm.jsx`)
   - Utilities: camelCase (e.g., `useAuth.js`)
   - Constants: UPPER_SNAKE_CASE

3. **File Organization**:
   - One component per file
   - Export named components
   - Co-locate related files

## 🧪 Code Quality

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

ESLint is configured to:
- Only lint `src/` directory and config files
- Ignore `node_modules/`, `dist/`, and build artifacts
- Enforce React best practices
- Check for unused variables and imports

### Type Safety

While the project uses JavaScript, consider adding TypeScript for better type safety:
- Install TypeScript: `npm install -D typescript @types/react @types/react-dom`
- Rename `.jsx` to `.tsx`
- Add `tsconfig.json`

## 📱 Progressive Web App (PWA)

The application is configured as a PWA with:
- Service worker for offline support
- App manifest for installability
- Optimized caching strategies

**Note**: PWA plugin is currently disabled in `vite.config.js`. To enable:
1. Uncomment the VitePWA configuration
2. Add PWA icons to `public/` directory
3. Rebuild the application

## 🎨 Design System

### Colors
- Primary: Blue (`#4285F4`)
- Success: Green (`#34A853`)
- Warning: Yellow (`#FBBC05`)
- Error: Red (`#EA4335`)

### Typography
- Font Family: System fonts (sans-serif)
- Sizes: `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`

### Spacing
- Consistent spacing scale: 4px base unit
- Padding: `p-2`, `p-4`, `p-6`, `p-8`
- Margin: `m-2`, `m-4`, `m-6`, `m-8`

## 📚 Additional Documentation

- [Google Authentication Setup](./docs/google-auth-setup.md)
- [UI Component Guidelines](./docs/command.md)
- [Perintah (Indonesian)](./docs/perintah.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential.

## 👥 Authors

- **ZenSpa Development Team**

## 🆘 Support

For support, please contact the development team or open an issue in the repository.

---

**Built with ❤️ for ZenSpa Members**
