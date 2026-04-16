# SkillSwap - Expo React Native App

A mobile application for connecting scholars, tutors, and learners. Built with Expo and React Native for iOS and Android.

## Features

- **Splash Screen** - Animated loading screen with app branding
- **Authentication** - Sign In / Sign Up screens with social login options
- **Home Screen** - Hero section, nearby scholars, scholarly circles, quick actions
- **Dashboard** - Analytics with charts, stats, recent activity, top tutors
- **Find Tutors** - Browse and search tutors with filters
- **Student Directory** - Search students by skills and interests
- **Messages** - Chat list and individual chat screens
- **Campus Map** - Interactive map with study locations
- **Profile** - User profile with settings and preferences
- **Curated Matches** - AI-powered scholar matching
- **Scholarly Circles** - Community groups for learning

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your phone (for testing)

### Installation

1. Copy the `expo-skillswap` folder to your local machine

2. Navigate to the project directory:
   ```bash
   cd expo-skillswap
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

4. Create an `assets` folder and add placeholder images:
   ```bash
   mkdir assets
   ```
   Add the following files:
   - `icon.png` (1024x1024px)
   - `splash.png` (1284x2778px)
   - `adaptive-icon.png` (1024x1024px)
   - `favicon.png` (48x48px)

5. Start the development server:
   ```bash
   npx expo start
   ```

6. Scan the QR code with:
   - **iOS**: Camera app or Expo Go
   - **Android**: Expo Go app

## Project Structure

```
expo-skillswap/
├── App.tsx                 # Main entry point with navigation
├── constants/
│   └── theme.ts           # Colors, fonts, sizes, shadows
├── screens/
│   ├── SplashScreen.tsx
│   ├── SignInScreen.tsx
│   ├── SignUpScreen.tsx
│   ├── HomeScreen.tsx
│   ├── DashboardScreen.tsx
│   ├── FindTutorsScreen.tsx
│   ├── StudentDirectoryScreen.tsx
│   ├── ChatListScreen.tsx
│   ├── ChatScreen.tsx
│   ├── CampusMapScreen.tsx
│   ├── ProfileScreen.tsx
│   ├── TutorProfileScreen.tsx
│   ├── CuratedMatchesScreen.tsx
│   └── ScholarlyCirclesScreen.tsx
├── components/
│   ├── ScholarCard.tsx
│   └── CircleCard.tsx
├── package.json
├── tsconfig.json
├── app.json
└── babel.config.js
```

## Customization

### Theme Colors
Edit `constants/theme.ts` to change the color scheme:
```typescript
export const COLORS = {
  primary: '#1E3A8A',      // Deep blue
  secondary: '#D4A84B',    // Gold accent
  // ... other colors
};
```

### Navigation
The app uses React Navigation with:
- Stack Navigator for auth flow and detail screens
- Bottom Tab Navigator for main app sections

### Adding New Screens
1. Create a new file in `screens/`
2. Add the screen to the navigation in `App.tsx`
3. Update the type definitions for type safety

## Building for Production

### iOS
```bash
npx expo build:ios
# or for EAS Build
eas build --platform ios
```

### Android
```bash
npx expo build:android
# or for EAS Build
eas build --platform android
```

## Dependencies

- `expo` - Expo SDK
- `@react-navigation/native` - Navigation library
- `@react-navigation/native-stack` - Stack navigator
- `@react-navigation/bottom-tabs` - Tab navigator
- `expo-linear-gradient` - Gradient backgrounds
- `@expo/vector-icons` - Ionicons and more
- `react-native-safe-area-context` - Safe area handling
- `react-native-screens` - Native screen containers

## License

MIT License
