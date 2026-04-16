# SkillSwap Components Documentation

Complete guide to all components and screens in the SkillSwap application. This document helps backend developers understand the data flow and component structure.

---

## Table of Contents

1. [Screens](#screens)
2. [Components](#components)
3. [Data Types](#data-types)
4. [Data Flow](#data-flow)
5. [Adding New Features](#adding-new-features)

---

## Screens

Screens are full-page components that represent different sections of the app. Each screen is accessible via the navigation system.

### Authentication Screens

#### SplashScreen
- **Path:** `screens/SplashScreen.tsx`
- **Purpose:** Animated loading screen shown on app start
- **Navigation:** Navigates to SignIn after splash completes
- **Data Required:** None
- **Usage:**
  ```tsx
  <Stack.Screen name="Splash" component={SplashScreen} />
  ```

#### SignInScreen
- **Path:** `screens/SignInScreen.tsx`
- **Purpose:** User login with email/password and social options
- **Navigation:** MainTabs (user) or AdminTabs (admin)
- **Data Required:** Authentication API
- **Form Fields:**
  - Email (required)
  - Password (required)
- **API Calls:** POST /api/auth/login
- **Usage:**
  ```tsx
  <Stack.Screen name="SignIn" component={SignInScreen} />
  ```

#### SignUpScreen
- **Path:** `screens/SignUpScreen.tsx`
- **Purpose:** User registration
- **Navigation:** SignIn (after successful signup)
- **Data Required:** None
- **Form Fields:**
  - Full Name (required)
  - Email (required)
  - Password (required)
  - User Type (Student/Tutor/Admin)
- **API Calls:** POST /api/auth/signup
- **Usage:**
  ```tsx
  <Stack.Screen name="SignUp" component={SignUpScreen} />
  ```

---

### Main App Screens (User - MainTabs)

#### HomeScreen
- **Path:** `screens/HomeScreen.tsx`
- **Purpose:** Main dashboard with nearby scholars and scholarly circles
- **Tab:** Home (Home icon)
- **Data Source:** `useApi('scholars')`, `useApi('circles')`
- **Components Used:**
  - ScholarCard (nearby scholars)
  - CircleCard (scholarly circles)
- **Key Sections:**
  - Hero section with greeting
  - Nearby scholars list (scrollable)
  - Scholarly circles showcase
  - Quick action buttons
- **API Calls:**
  - GET /api/scholars (nearby)
  - GET /api/circles
- **Data Structure Example:**
  ```typescript
  Scholar {
    id: string;
    name: string;
    skills: string[];
    avatar: string;
    rating: number;
    matchScore: number;
  }
  ```

#### DashboardScreen
- **Path:** `screens/DashboardScreen.tsx`
- **Purpose:** User analytics, stats, and recent activity
- **Tab:** Dashboard (Chart icon)
- **Data Source:** Sample stats data
- **Key Sections:**
  - Overview stats (sessions, hours, rating)
  - Activity charts
  - Recent activity list
  - Top tutors
- **Charts Library:** Recharts
- **Customization:** Colors in `constants/theme.ts`

#### FindTutorsScreen
- **Path:** `screens/FindTutorsScreen.tsx`
- **Purpose:** Browse and search for tutors
- **Tab:** Tutors (School icon)
- **Data Source:** `useApi('tutors')`
- **Key Features:**
  - Category filter tabs
  - Search functionality
  - Tutor cards with ratings
  - Click to view profile
- **API Calls:**
  - GET /api/tutors
  - GET /api/tutors?expertise=skill (filtered)
- **Navigation:** TutorProfile screen
- **Data Structure Example:**
  ```typescript
  Tutor {
    id: string;
    name: string;
    expertise: string[];
    rating: number;
    hourlyRate: number;
    available: boolean;
  }
  ```

#### StudentDirectoryScreen
- **Path:** `screens/StudentDirectoryScreen.tsx`
- **Purpose:** Search and connect with other students
- **Tab:** Directory (People icon)
- **Data Source:** `useApi('scholars')`
- **Key Features:**
  - Search by name/skills
  - Filter by location
  - Scholar cards
- **API Calls:**
  - GET /api/scholars
  - GET /api/scholars?skills=skill&location=radius

#### ChatListScreen
- **Path:** `screens/ChatListScreen.tsx`
- **Purpose:** List of ongoing conversations
- **Tab:** Messages (Chat icon)
- **Data Source:** `useApi('messages')`
- **Key Features:**
  - Conversation list
  - Last message preview
  - Unread indicators
  - Click to open conversation
- **Navigation:** ChatScreen
- **API Calls:**
  - GET /api/conversations
  - GET /api/messages?conversationId=id

#### ChatScreen
- **Path:** `screens/ChatScreen.tsx`
- **Purpose:** One-on-one messaging interface
- **Navigation Parameter:** `{ recipientId: string; recipientName: string }`
- **Key Features:**
  - Message history
  - Message input
  - Send functionality
  - Auto-scroll to latest
- **API Calls:**
  - GET /api/messages?recipientId=id
  - POST /api/messages (send)
- **Real-time:** WebSocket recommended for live updates

#### CampusMapScreen
- **Path:** `screens/CampusMapScreen.tsx`
- **Purpose:** Interactive campus map with study locations
- **Tab:** Map (Map icon)
- **Data Source:** Location data
- **Key Features:**
  - Map display
  - Location markers
  - Location details
  - Directions
- **Map Library:** React Native Maps
- **API Calls:**
  - GET /api/locations

#### ProfileScreen
- **Path:** `screens/ProfileScreen.tsx`
- **Purpose:** User profile and settings
- **Tab:** Profile (Person icon)
- **Data Source:** `useApi('currentUser')`
- **Key Sections:**
  - Profile information
  - Skills showcase
  - Stats
  - Settings options
  - Logout button
- **API Calls:**
  - GET /api/users/me
  - PUT /api/users/me (update profile)

---

### Detailed View Screens

#### TutorProfileScreen
- **Path:** `screens/TutorProfileScreen.tsx`
- **Purpose:** Detailed tutor information
- **Navigation Parameter:** `{ tutorId: string }`
- **Data Source:** `getTutorById(tutorId)`
- **Key Sections:**
  - Tutor information
  - Expertise list
  - Reviews/ratings
  - Availability
  - Book session button
- **API Calls:**
  - GET /api/tutors/:id
  - GET /api/reviews?tutorId=id
  - POST /api/sessions (book)

#### CuratedMatchesScreen
- **Path:** `screens/CuratedMatchesScreen.tsx`
- **Purpose:** AI-powered scholar matching recommendations
- **Data Source:** `useApi('matches')`
- **Key Features:**
  - Compatibility scores
  - Match cards
  - Suggested topics
  - Connect button
- **API Calls:**
  - GET /api/matches
  - POST /api/connections (connect)

#### ScholarlyCirclesScreen
- **Path:** `screens/ScholarlyCirclesScreen.tsx`
- **Purpose:** Browse and join scholarly communities
- **Data Source:** `useApi('circles')`
- **Key Features:**
  - Circle cards
  - Member count
  - Description
  - Join button
  - Filter by topic
- **API Calls:**
  - GET /api/circles
  - POST /api/circles/:id/join
  - POST /api/circles/:id/leave

---

### Admin Screens (AdminTabs)

#### PlatformControlsScreen
- **Path:** `screens/PlatformControlsScreen.tsx`
- **Purpose:** Admin settings and controls
- **Tab:** Controls (Settings icon)
- **Key Features:**
  - Platform settings
  - Feature toggles
  - System configuration
  - Manage content

#### ComplianceScreen
- **Path:** `screens/ComplianceScreen.tsx`
- **Purpose:** Compliance and verification management
- **Tab:** Compliance (Shield icon)
- **Key Features:**
  - Verification status
  - Content moderation
  - Policy compliance

#### VerificationAnalyticsScreen
- **Path:** `screens/VerificationAnalyticsScreen.tsx`
- **Purpose:** Analytics on user verification and platform metrics
- **Tab:** Analytics (Analytics icon)
- **Key Features:**
  - Verification stats
  - Platform metrics
  - Charts and graphs

#### AdminDashboardScreen
- **Path:** `screens/DashboardScreen.tsx` (Admin variant)
- **Purpose:** Admin overview of platform
- **Key Features:**
  - User statistics
  - Session analytics
  - Revenue metrics
  - System health

---

## Components

Reusable components that are used across multiple screens.

### ScholarCard
- **Path:** `components/ScholarCard.tsx`
- **Purpose:** Display scholar/peer information
- **Props:**
  ```typescript
  {
    scholar: Scholar;
    onPress?: () => void;
  }
  ```
- **Data Structure:**
  ```typescript
  Scholar {
    id: string;
    name: string;
    role: string;
    skills: string[];
    avatar: string;
    rating: number;
    matchScore: number;
    location: string;
    verified: boolean;
  }
  ```
- **Styling:** Uses COLORS and SHADOWS from theme
- **Usage Example:**
  ```tsx
  <ScholarCard
    scholar={scholar}
    onPress={() => navigation.navigate('TutorProfile')}
  />
  ```

### CircleCard
- **Path:** `components/CircleCard.tsx`
- **Purpose:** Display scholarly circle information
- **Props:**
  ```typescript
  {
    circle: ScholarlyCirlce;
    onPress?: () => void;
  }
  ```
- **Data Structure:**
  ```typescript
  ScholarlyCirlce {
    id: string;
    name: string;
    members: number;
    topic: string;
    icon: string;
    color: string;
    description: string;
    image: string;
    joined: boolean;
  }
  ```
- **Usage Example:**
  ```tsx
  <CircleCard
    circle={circle}
    onPress={() => navigation.navigate('ScholarlyCircles')}
  />
  ```

---

## Data Types

All data types are defined in `data/types.ts`. Here's a quick reference:

### User
```typescript
User {
  id: string;
  name: string;
  email: string;
  role: 'Student' | 'Tutor' | 'Admin';
  avatar: string;
  bio: string;
  skills: string[];
  interests: string[];
  verified: boolean;
  joinDate: Date;
  successRate: number;
  totalSessions: number;
}
```

### Scholar
```typescript
Scholar {
  id: string;
  name: string;
  role: string;
  skills: string[];
  avatar: string;
  rating: number;
  matchScore: number;
  location: string;
  bio: string;
  verified: boolean;
}
```

### Tutor
```typescript
Tutor {
  id: string;
  name: string;
  title: string;
  expertise: string[];
  rating: number;
  reviews: number;
  hourlyRate: number;
  avatar: string;
  available: boolean;
  bio: string;
  verified: boolean;
  totalSessions: number;
  responseTime: string;
}
```

### Message
```typescript
Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: Date;
  read: boolean;
}
```

### Course
```typescript
Course {
  id: string;
  title: string;
  tutor: Tutor | User;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  students: number;
  rating: number;
  price: number;
  image: string;
  description: string;
  enrolled: boolean;
}
```

---

## Data Flow

### Architecture Pattern

```
Screen Component
    ↓
useApi Hook (or useCallback)
    ↓
API Service (apiService)
    ↓
Backend API (or Sample Data)
    ↓
UI Components (render data)
```

### Example: Loading Tutors

1. **Screen requests data:**
   ```tsx
   const { data: tutors, loading } = useApi('tutors');
   ```

2. **Hook fetches from API Service:**
   ```typescript
   // In useApi hook
   const result = await apiService.fetchTutors();
   ```

3. **API Service makes request:**
   ```typescript
   // In ApiService
   async fetchTutors() {
     return fetch(`${this.baseUrl}/tutors`).then(r => r.json());
   }
   ```

4. **Backend returns data:**
   ```json
   [
     {
       "id": "1",
       "name": "Dr. Victor",
       "expertise": ["ML", "AI"],
       ...
     }
   ]
   ```

5. **Component renders:**
   ```tsx
   {tutors.map(tutor => (
     <TutorCard key={tutor.id} tutor={tutor} />
   ))}
   ```

---

## Adding New Features

### Step 1: Define Data Types

Add to `data/types.ts`:
```typescript
export interface NewFeature {
  id: string;
  name: string;
  // ... other fields
}
```

### Step 2: Create Sample Data

Add to `data/sampleData.ts`:
```typescript
export const NEW_FEATURES: NewFeature[] = [
  { id: '1', name: 'Feature 1' },
  // ... sample data
];
```

### Step 3: Add API Endpoint

Update `hooks/useApi.ts`:
```typescript
// Add to type
type DataEndpoint = '...' | 'newFeature';

// Add to ApiService
async fetchNewFeatures(): Promise<NewFeature[]> {
  return fetch(`${this.baseUrl}/new-features`).then(r => r.json());
}

// Add to useApi hook
case 'newFeature':
  result = (await apiService.fetchNewFeatures()) as T;
  break;
```

### Step 4: Create Component/Screen

```tsx
import { useApi } from '../hooks/useApi';

export function NewFeatureScreen() {
  const { data: features, loading, error } = useApi('newFeature');
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return (
    <View>
      {features.map(feature => (
        <FeatureCard key={feature.id} feature={feature} />
      ))}
    </View>
  );
}
```

### Step 5: Add to Navigation

Update `App.tsx`:
```tsx
<Stack.Screen name="NewFeature" component={NewFeatureScreen} />
```

---

## Backend Integration Checklist

- [ ] Replace sample data endpoints with real API
- [ ] Add authentication tokens to API calls
- [ ] Implement error handling
- [ ] Add loading states
- [ ] Setup WebSocket for real-time features (chat, notifications)
- [ ] Add pagination for large lists
- [ ] Implement caching strategy
- [ ] Setup API rate limiting
- [ ] Add request logging
- [ ] Setup API documentation (Swagger/OpenAPI)

---

## Common Patterns

### Handling Loading State
```tsx
const { data, loading, error } = useApi('endpoint');

if (loading) {
  return <ActivityIndicator size="large" />;
}
```

### Handling Errors
```tsx
if (error) {
  return (
    <View style={styles.errorContainer}>
      <Text>Error: {error}</Text>
    </View>
  );
}
```

### Refetching Data
```tsx
const { refetch } = useApi('endpoint');

<TouchableOpacity onPress={refetch}>
  <Text>Refresh</Text>
</TouchableOpacity>
```

---

## Need Help?

- Check the sample data in `data/sampleData.ts`
- Review component implementations in `screens/` and `components/`
- Look at API service methods in `hooks/useApi.ts`
- Reference type definitions in `data/types.ts`
