# SkillSwap Developer Guide

Complete reference for navigating and using the SkillSwap codebase.

---

## 🎯 For Backend Developers

**Your mission:** Replace sample data with real API calls and implement backend services.

### Start Here
1. Read `BACKEND_INTEGRATION.md` - Step-by-step integration guide
2. Check `API.md` - All API endpoints you need to implement
3. Review `data/types.ts` - Data structures for consistency

### Key Files to Modify
- **`hooks/useApi.ts`** - Replace sample data with actual API calls
  - Contains `ApiService` class with all fetch methods
  - Each method has instructions for API integration
  - Example: `fetchTutors()`, `sendMessage()`, `enrollInCourse()`

### Sample Data
- **`data/sampleData.ts`** - Current sample data (keep for reference)
- **`data/types.ts`** - TypeScript interfaces (don't modify)

### Quick Integration Checklist
```
Phase 1: Authentication
  [ ] POST /auth/signup
  [ ] POST /auth/login
  [ ] POST /auth/logout
  [ ] GET /users/me
  [ ] PUT /users/me

Phase 2: Core Data
  [ ] GET /tutors
  [ ] GET /tutors/:id
  [ ] GET /scholars
  [ ] GET /courses
  [ ] GET /circles

Phase 3: Messaging
  [ ] GET /messages
  [ ] POST /messages
  [ ] GET /messages/conversations

Phase 4: Advanced
  [ ] GET /matches
  [ ] POST /sessions
  [ ] GET /search
  [ ] GET /notifications
```

---

## 🎨 For Frontend Developers

**Your mission:** Build UI components and connect them to data.

### Start Here
1. Read `COMPONENTS.md` - All components and screens explained
2. Check `API.md` - Understand what data is available
3. Review screen files in `screens/` directory

### Project Structure
```
expo-skillswap/
├── App.tsx                    # Navigation setup
├── screens/                   # Full-page components
│   ├── HomeScreen.tsx
│   ├── FindTutorsScreen.tsx
│   ├── ChatScreen.tsx
│   └── ... (15+ screens)
├── components/                # Reusable components
│   ├── ScholarCard.tsx
│   └── CircleCard.tsx
├── hooks/
│   └── useApi.ts             # Data fetching hook
├── constants/
│   └── theme.ts              # Colors, fonts, sizes
├── data/
│   ├── sampleData.ts         # Sample data
│   └── types.ts              # TypeScript interfaces
└── README.md                 # Original project README
```

### Using Data in Components

```typescript
import { useApi } from '../hooks/useApi';
import { Tutor } from '../data/types';

function TutorList() {
  const { data: tutors, loading, error } = useApi('tutors');
  
  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error}</Text>;
  
  return (
    <ScrollView>
      {tutors.map(tutor => (
        <TutorCard key={tutor.id} tutor={tutor} />
      ))}
    </ScrollView>
  );
}
```

### Common Tasks

**Display a list:**
```typescript
const { data: items } = useApi('endpoint');
{items.map(item => <Card key={item.id} item={item} />)}
```

**Handle loading & errors:**
```typescript
const { data, loading, error, refetch } = useApi('endpoint');
if (loading) return <Spinner />;
if (error) return <ErrorMessage onRetry={refetch} />;
```

**Send data:**
```typescript
import { apiService } from '../hooks/useApi';

const handleSendMessage = async (text) => {
  await apiService.sendMessage(recipientId, text);
  // UI will auto-update
};
```

---

## 📚 Documentation Files

### Core Documentation
| File | Purpose | Audience |
|------|---------|----------|
| `API.md` | Complete API specification | Backend & Frontend |
| `COMPONENTS.md` | Component & screen guide | Frontend |
| `BACKEND_INTEGRATION.md` | Integration guide | Backend |
| `data/types.ts` | Data type definitions | Both |
| `data/sampleData.ts` | Sample data structure | Reference |

### Quick Reference
- **Need to know what data is available?** → Check `data/sampleData.ts`
- **Need API endpoint details?** → Check `API.md`
- **Need to add a component?** → Check `COMPONENTS.md`
- **Need to integrate backend?** → Check `BACKEND_INTEGRATION.md`
- **Need type definitions?** → Check `data/types.ts`

---

## 🔧 Setup & Running

### Prerequisites
```bash
Node.js 18+
npm or yarn
Expo CLI
```

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm start

# Or with Expo
expo start
```

### Environment Variables
Create `.env` file:
```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_API_TIMEOUT=30000
```

---

## 🗂️ Navigation Structure

The app uses React Navigation with three main stacks:

### Authentication Stack
```
Splash → SignIn → SignUp
```

### User Stack (MainTabs)
```
Home
  └─ Curated Matches
  └─ Scholarly Circles
Dashboard
FindTutors
  └─ Tutor Profile
Directory
Messages
  └─ Chat
Map
Profile
```

### Admin Stack (AdminTabs)
```
Dashboard
Controls
Compliance
Analytics
Profile
```

---

## 📊 Data Flow Diagram

```
┌─────────────────────────────────────────────────┐
│              Screen Component                    │
│  (HomeScreen, FindTutorsScreen, etc.)           │
└──────────────────┬──────────────────────────────┘
                   │
                   │ useApi('endpoint')
                   ↓
┌─────────────────────────────────────────────────┐
│           useApi Custom Hook                     │
│  - Manages loading/error/data states            │
│  - Auto-refetch on dependency change            │
└──────────────────┬──────────────────────────────┘
                   │
                   │ call apiService method
                   ↓
┌─────────────────────────────────────────────────┐
│          ApiService Class                        │
│  - fetchTutors()                                │
│  - fetchScholars()                              │
│  - sendMessage()                                │
│  - etc.                                         │
└──────────────────┬──────────────────────────────┘
                   │
                   │ fetch() or real API
                   ↓
┌─────────────────────────────────────────────────┐
│         Backend API / Sample Data                │
│  Returns JSON matching TypeScript interfaces    │
└─────────────────────────────────────────────────┘
```

---

## 🎯 Key Concepts

### useApi Hook
Fetches data and manages state:
```typescript
const { data, loading, error, refetch } = useApi('tutors');
```
- `data` - The actual data (Tutor[], Message[], etc.)
- `loading` - Boolean, true while fetching
- `error` - Error message if request fails
- `refetch` - Function to manually refresh data

### ApiService Class
Makes actual API calls:
```typescript
const response = await apiService.fetchTutors();
```
- All methods documented with API endpoint
- Easy to replace sample data with real API
- Consistent error handling

### Data Types
TypeScript interfaces for all entities:
```typescript
export interface Tutor {
  id: string;
  name: string;
  expertise: string[];
  rating: number;
  hourlyRate: number;
  // ... more fields
}
```
- Ensures consistency between frontend and backend
- Provides IDE autocomplete
- Catches type errors early

### Theme System
All colors and sizes centralized:
```typescript
// In constants/theme.ts
export const COLORS = {
  primary: '#1E3A8A',
  secondary: '#D4A84B',
  // ...
};

// Usage in components
backgroundColor: COLORS.primary
```

---

## 🔌 Adding New Features

### Example: Add "Book Session" Feature

1. **Update types** (`data/types.ts`):
```typescript
export interface BookingRequest {
  tutorId: string;
  startTime: Date;
  endTime: Date;
  topic: string;
}
```

2. **Add sample data** (`data/sampleData.ts`):
```typescript
export const BOOKINGS: BookingRequest[] = [
  { tutorId: '1', startTime: new Date(), ... }
];
```

3. **Add API method** (`hooks/useApi.ts`):
```typescript
async bookSession(request: BookingRequest) {
  return fetch(`${this.baseUrl}/sessions`, {
    method: 'POST',
    body: JSON.stringify(request)
  }).then(r => r.json());
}
```

4. **Add endpoint** (`hooks/useApi.ts` useApi hook):
```typescript
case 'bookings':
  result = (await apiService.getBookings()) as T;
  break;
```

5. **Use in component**:
```typescript
const handleBook = async (startTime) => {
  await apiService.bookSession({
    tutorId: tutor.id,
    startTime,
    endTime: new Date(startTime + 3600000),
    topic: 'ML Basics'
  });
};
```

---

## 🐛 Debugging Tips

### Check Component Data
```typescript
// Add to any component
console.log('[DEBUG] Tutors:', tutors);
console.log('[DEBUG] Loading:', loading);
console.log('[DEBUG] Error:', error);
```

### Check API Service
```typescript
// In hooks/useApi.ts ApiService
async fetchTutors() {
  console.log('[API] Fetching tutors...');
  const data = await fetch(`${this.baseUrl}/tutors`);
  console.log('[API] Response:', data);
  return data.json();
}
```

### Check Network Requests
1. Open React DevTools
2. Go to Network tab
3. Filter by XHR/Fetch
4. Check request/response in each call

### Type Checking
```bash
# Run TypeScript compiler
npx tsc --noEmit
```

---

## 📱 Testing

### Manual Testing Checklist
- [ ] Load each screen
- [ ] Check loading states
- [ ] Check error handling
- [ ] Test navigation between screens
- [ ] Test data filtering/search
- [ ] Test form submissions
- [ ] Check error messages

### Testing with Sample Data
Sample data is realistic and complete. Test all features:
```typescript
// Example: Test tutor filtering
const filtered = TUTORS.filter(t => t.available);
console.log('Available tutors:', filtered);
```

---

## 🚀 Deployment

### Before Deployment
1. Update `REACT_APP_API_URL` to production URL
2. Replace all sample data with real API calls
3. Test all features with real backend
4. Check error handling
5. Verify authentication flow
6. Test on real devices
7. Performance check

### Build Production
```bash
# For Expo
expo build:ios   # or build:android

# Or EAS Build (recommended)
eas build --platform ios
eas build --platform android
```

---

## 📞 Common Questions

### Q: Where's the sample data?
A: `data/sampleData.ts` - Keep it for reference, replace with API calls

### Q: How do I connect to the backend?
A: Modify `hooks/useApi.ts` - Replace `SampleData.*` with API calls

### Q: What data structure should I use?
A: Check `data/types.ts` - All TypeScript interfaces are there

### Q: How do I add a new screen?
A: Create file in `screens/`, add navigation in `App.tsx`, import in navigation config

### Q: How do I use existing components?
A: Import and pass required props - Check `COMPONENTS.md` for all component APIs

### Q: How do I handle errors?
A: Check the `error` state from `useApi()` and display accordingly

### Q: Where's the authentication logic?
A: `screens/SignInScreen.tsx` and `screens/SignUpScreen.tsx` - Use `apiService.login()`

---

## 📖 Reading Order

### First Time?
1. This file (DEVELOPER_GUIDE.md) - Overview
2. `COMPONENTS.md` or `BACKEND_INTEGRATION.md` - Your path
3. `API.md` - Reference as needed
4. `data/types.ts` - Check data structures

### Deep Dive?
1. `COMPONENTS.md` - All screens and components
2. `API.md` - Complete API specification
3. `BACKEND_INTEGRATION.md` - Integration details
4. Source files - Read actual implementations

### Frontend Updates?
1. `COMPONENTS.md` - Component docs
2. `screens/` directory - Component code
3. `data/types.ts` - Type definitions

### Backend Integration?
1. `BACKEND_INTEGRATION.md` - Integration guide
2. `API.md` - Endpoint specs
3. `hooks/useApi.ts` - Code to modify
4. `data/types.ts` - Data contracts

---

## 🎓 Key Files Summary

| File | Size | Purpose |
|------|------|---------|
| `App.tsx` | 🔵 M | Main navigation setup |
| `hooks/useApi.ts` | 🔴 L | Data fetching (MODIFY THIS) |
| `data/sampleData.ts` | 🔴 L | Sample data (reference) |
| `data/types.ts` | 🟡 M | Type definitions |
| `screens/*.tsx` | 🟡 M | Screen components (20+ files) |
| `components/*.tsx` | 🔵 S | Reusable components |
| `constants/theme.ts` | 🔵 S | Colors, fonts, sizes |

Legend: 🔴 Large (~400+ lines), 🟡 Medium (~200-400 lines), 🔵 Small (~0-200 lines)

---

## ⚡ Quick Commands

```bash
# Start development
npm start
expo start

# Type checking
npx tsc --noEmit

# Lint code
npm run lint

# Build for iOS
expo build:ios

# Build for Android
expo build:android

# Clean cache
expo start --clear
```

---

## 🤝 Team Communication

### For Backend Developers
- "I've updated the API endpoint" → Check `API.md`
- "What data structure should I return?" → Check `data/types.ts`
- "Frontend needs new endpoint" → Add to `hooks/useApi.ts`

### For Frontend Developers
- "I need new data type" → Create in `data/types.ts`
- "Sample data example" → Check `data/sampleData.ts`
- "How do I fetch data?" → Use `useApi('endpoint')`

---

## 📞 Support

- **Component questions?** → See `COMPONENTS.md`
- **API questions?** → See `API.md`
- **Type questions?** → See `data/types.ts`
- **Integration help?** → See `BACKEND_INTEGRATION.md`
- **Data structure?** → See `data/sampleData.ts`

---

## ✅ Ready to Start?

### Backend Developers
→ Go to `BACKEND_INTEGRATION.md` and start with Phase 1

### Frontend Developers
→ Go to `COMPONENTS.md` and pick a screen to build

### New to the Project?
→ Read `COMPONENTS.md` first to understand the structure

---

**Version:** 1.0  
**Last Updated:** April 2024  
**Status:** Complete & Ready for Integration
