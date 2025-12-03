# Zen Family Spa - Mobile App

React Native mobile application for Zen Family Spa, built with Expo and NativeWind.

## 🚀 Tech Stack

- **Framework**: Expo SDK 50+ (Managed Workflow)
- **Routing**: Expo Router (File-based)
- **Styling**: NativeWind v4 (Tailwind CSS for React Native)
- **Authentication**: Firebase Auth + Google Sign-In
- **Backend**: Strapi CMS
- **State Management**: React Context
- **Icons**: Lucide React Native
- **HTTP Client**: Axios
- **Secure Storage**: Expo Secure Store

## 📋 Prerequisites

- Node.js 18+ and npm
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (macOS) or Android Emulator
- Strapi backend running

## 🛠️ Setup

### 1. Install Dependencies

```bash
cd mobile
npm install
```

### 2. Environment Configuration

Create a `.env` file in the `mobile` directory:

```env
EXPO_PUBLIC_STRAPI_URL=http://your-strapi-url:1337
```

### 3. Firebase Configuration

The project includes:
- `google-services.json` (Android)
- `GoogleService-Info.plist` (iOS)
- `firebaseConfig.ts` with web SDK configuration

These are already configured for the Zen Family Spa Firebase project.

### 4. Run the App

```bash
# Start Expo development server
npx expo start

# Run on iOS
npx expo start --ios

# Run on Android
npx expo start --android
```

## 📱 Features

### Authentication
- **Google Sign-In**: Native Google authentication flow
- **Email/Password**: Firebase email authentication (placeholder)
- **Strapi Sync**: Automatic "Shadow User" sync with Strapi backend

### Security
- **6-Digit PIN**: Setup and verification flow
- **Secure Storage**: PIN stored using Expo Secure Store
- **Protected Routes**: Auth-gated navigation

### UI/UX
- **Zen Theme**: Custom color palette (zen-green, zen-sand, zen-brown)
- **Responsive**: Optimized for mobile devices
- **Smooth Animations**: NativeWind transitions

## 📂 Project Structure

```
mobile/
├── app/
│   ├── _layout.tsx          # Root layout with AuthProvider
│   ├── login.tsx             # Login screen
│   ├── pin.tsx               # PIN setup/verification
│   └── (tabs)/               # Tab navigation (to be implemented)
├── components/
│   └── PinInput.tsx          # 6-digit PIN input component
├── context/
│   └── AuthContext.tsx       # Authentication context
├── firebaseConfig.ts         # Firebase configuration
├── tailwind.config.js        # Tailwind/NativeWind config
├── babel.config.js           # Babel config for NativeWind
├── global.css                # Global Tailwind directives
└── app.json                  # Expo configuration

```

## 🎨 Zen Color Palette

```javascript
{
  'zen-green': '#8DA399',
  'zen-sand': '#F5F5F1',
  'zen-brown': '#5D4037',
  'zen': { 50-900 },    // Extended palette
  'spa': { 50-900 },    // Spa green palette
  'lavender': { 50-900 },
  'rose': { 50-900 }
}
```

## 🔐 Authentication Flow

1. **Login Screen** → User signs in with Google or Email
2. **Firebase Auth** → Creates/authenticates user
3. **Strapi Sync** → Syncs Firebase UID to Strapi
4. **PIN Check** → Checks `has_pin_setup` from Strapi
5. **PIN Screen** → Setup (if new) or Verify (if existing)
6. **Main App** → Access granted

## 🧪 Testing

```bash
# Run linter
npx expo lint

# Type check
npx tsc --noEmit
```

## 📦 Build

```bash
# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios
```

## 🔧 Configuration

### Bundle Identifiers
- **iOS**: `com.zenfamilyapps.member`
- **Android**: `com.zenfamilyapps.member`

### Deep Linking
- **Scheme**: `zenfamilyspa://`

## 📝 Notes

- The app uses React Native's `AsyncStorage` for Firebase persistence
- Google Sign-In requires proper SHA-1/SHA-256 certificates for Android
- iOS requires proper URL schemes configured in `GoogleService-Info.plist`

## 🐛 Troubleshooting

### Google Sign-In Issues
- Verify `webClientId` in `AuthContext.tsx` matches Firebase console
- Check `google-services.json` and `GoogleService-Info.plist` are valid
- Ensure bundle IDs match Firebase project configuration

### NativeWind Not Working
- Clear cache: `npx expo start -c`
- Verify `babel.config.js` includes `nativewind/babel` plugin
- Check `nativewind-env.d.ts` exists

## 📄 License

Proprietary - Zen Family Spa
