# SkillSwap Project Index

Complete map of the project for easy navigation and component lookup.

---

## 📋 Documentation Index

Quick access to all documentation:

| Document | Purpose | Audience | Read Time |
|----------|---------|----------|-----------|
| **DEVELOPER_GUIDE.md** | Overview & quick reference | Everyone | 10 min |
| **COMPONENTS.md** | All screens & components | Frontend | 20 min |
| **API.md** | API endpoint specification | Backend & Frontend | 30 min |
| **BACKEND_INTEGRATION.md** | Integration step-by-step | Backend | 25 min |
| **PROJECT_INDEX.md** | This file - navigation | Everyone | 5 min |

---

## 🎯 Start Here by Role

### I'm a Backend Developer
```
1. Read: DEVELOPER_GUIDE.md (5 min)
2. Read: BACKEND_INTEGRATION.md (25 min)
3. Reference: API.md (check endpoints)
4. Code: hooks/useApi.ts (replace sample data)
5. Reference: data/types.ts (data contracts)
```

### I'm a Frontend Developer
```
1. Read: DEVELOPER_GUIDE.md (5 min)
2. Read: COMPONENTS.md (20 min)
3. Reference: API.md (available data)
4. Code: screens/ & components/
5. Reference: data/sampleData.ts (data structure)
```

### I'm a New Team Member
```
1. Read: DEVELOPER_GUIDE.md (Overview)
2. Read: COMPONENTS.md (if frontend) OR BACKEND_INTEGRATION.md (if backend)
3. Explore: Source files in screens/ and components/
4. Ask: Questions about specific features
```

### I'm a DevOps/Deployment Engineer
```
1. Read: BACKEND_INTEGRATION.md (Deployment section)
2. Read: DEVELOPER_GUIDE.md (Setup section)
3. Check: Environment variables section
4. Setup: CI/CD pipeline
```

---

## 📁 Project File Structure

```
expo-skillswap/
│
├── 📄 App.tsx                                    # Main app entry point
├── 📄 package.json                              # Dependencies
├── 📄 tsconfig.json                             # TypeScript config
├── 📄 app.json                                  # Expo configuration
│
├── 📚 Documentation/
│   ├── DEVELOPER_GUIDE.md                       # ⭐ Start here
│   ├── COMPONENTS.md                            # All screens & components
│   ├── API.md                                   # API specification
│   ├── BACKEND_INTEGRATION.md                   # Integration guide
│   ├── PROJECT_INDEX.md                         # This file
│   └── README.md                                # Original project README
│
├── 🎨 screens/                                  # Full-page components
│   ├── Authentication/
│   │   ├── SplashScreen.tsx                     # Loading splash
│   │   ├── SignInScreen.tsx                     # Login form
│   │   └── SignUpScreen.tsx                     # Registration form
│   ├── User App/
│   │   ├── HomeScreen.tsx                       # Main dashboard
│   │   ├── DashboardScreen.tsx                  # Analytics
│   │   ├── FindTutorsScreen.tsx                 # Tutor search
│   │   ├── StudentDirectoryScreen.tsx           # Scholar search
│   │   ├── ChatListScreen.tsx                   # Message list
│   │   ├── ChatScreen.tsx                       # Single conversation
│   │   ├── CampusMapScreen.tsx                  # Interactive map
│   │   └── ProfileScreen.tsx                    # User profile
│   ├── Detailed Views/
│   │   ├── TutorProfileScreen.tsx               # Tutor details
│   │   ├── CuratedMatchesScreen.tsx             # AI matches
│   │   └── ScholarlyCirclesScreen.tsx           # Communities
│   └── Admin/
│       ├── PlatformControlsScreen.tsx           # Admin settings
│       ├── ComplianceScreen.tsx                 # Compliance
│       └── VerificationAnalyticsScreen.tsx      # Analytics
│
├── 🧩 components/                               # Reusable components
│   ├── ScholarCard.tsx                          # Scholar display card
│   └── CircleCard.tsx                           # Circle display card
│
├── 🎣 hooks/                                    # Custom React hooks
│   └── useApi.ts                                # Data fetching hook (⭐ MODIFY THIS)
│
├── 📊 data/                                     # Data & types
│   ├── sampleData.ts                            # Sample data (KEEP FOR REFERENCE)
│   └── types.ts                                 # TypeScript interfaces (DON'T MODIFY)
│
├── 🎨 constants/                                # App constants
│   └── theme.ts                                 # Colors, fonts, sizes
│
└── 🌐 public/                                   # Static assets
    └── assets/                                  # Images, icons
```

---

## 🔍 File Quick Reference

### Core Files

#### App.tsx
- **Size:** Medium (~350 lines)
- **Purpose:** Navigation setup, screen registration
- **Do:** Add new screens here
- **Don't:** Modify unless adding routes
- **Key Content:** Stack Navigator, Tab Navigators, screen definitions

#### hooks/useApi.ts ⭐⭐⭐
- **Size:** Large (~450 lines)
- **Purpose:** Data fetching & API service
- **Do:** Replace sample data with API calls
- **Don't:** Change hook interface
- **Key Content:** ApiService class, useApi hook, all fetch methods

#### data/types.ts
- **Size:** Medium (~250 lines)
- **Purpose:** TypeScript interfaces
- **Do:** Reference for data structures
- **Don't:** Modify interfaces (backend should match)
- **Key Content:** All data type definitions

#### data/sampleData.ts
- **Size:** Large (~450 lines)
- **Purpose:** Sample/test data
- **Do:** Use as reference, test data
- **Don't:** Delete (reference for data structure)
- **Key Content:** Sample tutors, scholars, messages, courses

#### constants/theme.ts
- **Size:** Small (~100 lines)
- **Purpose:** Design tokens
- **Do:** Customize colors, fonts
- **Don't:** Add business logic
- **Key Content:** COLORS, FONTS, SIZES, SHADOWS

### Screen Files (screens/ directory)

All screens follow the same pattern:
1. Import hooks & data types
2. Use `useApi()` for data
3. Handle loading/error states
4. Render UI with data
5. Navigate on action

#### HomeScreen.tsx
- **Purpose:** Main dashboard with nearby scholars
- **Data:** Scholars, Circles
- **Navigation:** TutorProfile, ScholarlyCircles, CuratedMatches
- **Key Features:** Hero, nearby list, circles showcase

#### FindTutorsScreen.tsx
- **Purpose:** Browse & search tutors
- **Data:** Tutors (filtered by category)
- **Navigation:** TutorProfile
- **Key Features:** Search, category filter, tutor cards

#### ChatListScreen.tsx → ChatScreen.tsx
- **Purpose:** Messaging interface
- **Data:** Messages, Conversations
- **Navigation:** ChatScreen (from list)
- **Key Features:** Message history, auto-scroll, input

#### DashboardScreen.tsx
- **Purpose:** User analytics & stats
- **Data:** Dashboard stats, activity
- **Navigation:** None (detail endpoint)
- **Key Features:** Charts, stats, activity feed

#### ProfileScreen.tsx
- **Purpose:** User profile & settings
- **Data:** Current user
- **Navigation:** Settings, logout
- **Key Features:** Profile info, stats, settings

#### TutorProfileScreen.tsx
- **Purpose:** Detailed tutor information
- **Data:** Single tutor by ID
- **Navigation:** From FindTutors, CuratedMatches
- **Key Features:** Full profile, reviews, book session

#### CuratedMatchesScreen.tsx
- **Purpose:** AI-powered matches
- **Data:** Curated matches
- **Navigation:** None (detail screen)
- **Key Features:** Match cards, compatibility scores

#### ScholarlyCirclesScreen.tsx
- **Purpose:** Browse communities
- **Data:** Scholarly circles
- **Navigation:** None (list + join)
- **Key Features:** Circle cards, join/leave

#### CampusMapScreen.tsx
- **Purpose:** Interactive map
- **Data:** Locations
- **Navigation:** None (map view)
- **Key Features:** Map, markers, location details

### Component Files (components/ directory)

#### ScholarCard.tsx
- **Size:** Small (~150 lines)
- **Purpose:** Display scholar info
- **Props:** `{ scholar: Scholar; onPress?: () => void }`
- **Used In:** HomeScreen, StudentDirectoryScreen
- **Features:** Rating, match score, verified badge

#### CircleCard.tsx
- **Size:** Small (~150 lines)
- **Purpose:** Display circle info
- **Props:** `{ circle: ScholarlyCirlce; onPress?: () => void }`
- **Used In:** HomeScreen, ScholarlyCirclesScreen
- **Features:** Members count, topic, color coding

---

## 📊 Data Sources Map

```
API Source → Hook → Component
============================================

GET /tutors
  ├─ hooks/useApi('tutors')
  └─ screens/FindTutorsScreen.tsx
     └─ components/TutorCard.tsx

GET /scholars
  ├─ hooks/useApi('scholars')
  └─ screens/HomeScreen.tsx
     └─ components/ScholarCard.tsx

GET /messages
  ├─ hooks/useApi('messages')
  └─ screens/ChatScreen.tsx

GET /courses
  ├─ hooks/useApi('courses')
  └─ screens/DashboardScreen.tsx

GET /circles
  ├─ hooks/useApi('circles')
  ├─ screens/HomeScreen.tsx
  └─ screens/ScholarlyCirclesScreen.tsx

GET /matches
  ├─ hooks/useApi('matches')
  └─ screens/CuratedMatchesScreen.tsx

GET /users/me
  ├─ hooks/useApi('currentUser')
  └─ screens/ProfileScreen.tsx
```

---

## 🧭 Navigation Map

```
App Root
├── Splash
│   └─ [auto redirect]
├── SignIn
│   ├─ SignUp
│   └─ Forgot Password (optional)
├── MainTabs (User)
│   ├─ Home Tab
│   │   ├─ → TutorProfile
│   │   ├─ → ScholarlyCircles
│   │   └─ → CuratedMatches
│   ├─ Dashboard Tab
│   ├─ FindTutors Tab
│   │   └─ → TutorProfile
│   ├─ Directory Tab
│   ├─ Messages Tab
│   │   └─ → ChatScreen
│   ├─ Map Tab
│   └─ Profile Tab
│       └─ → Settings, Logout
├── AdminTabs (Admin)
│   ├─ Dashboard
│   ├─ Controls
│   ├─ Compliance
│   ├─ Analytics
│   └─ Profile
└── Detail Screens
    ├─ TutorProfile (modal/stack)
    ├─ ChatScreen (stack)
    ├─ CuratedMatches (stack)
    └─ ScholarlyCircles (stack)
```

---

## 🔗 Component Dependencies

```
HomeScreen
  ├─ useApi('scholars')
  ├─ useApi('circles')
  ├─ ScholarCard
  └─ CircleCard

FindTutorsScreen
  ├─ useApi('tutors')
  └─ TutorCard (not shown, inline)

ChatListScreen
  ├─ useApi('messages')
  └─ ConversationCard (not shown, inline)

ChatScreen
  ├─ useApi('messages')
  └─ MessageBubble (not shown, inline)

ProfileScreen
  ├─ useApi('currentUser')
  └─ apiService.updateUserProfile()

TutorProfileScreen
  ├─ getTutorById()
  ├─ useApi('reviews')
  └─ BookingForm
```

---

## 📈 Integration Timeline

### Week 1: Setup
- [ ] Backend project initialization
- [ ] Database schema setup
- [ ] Sample data in database
- [ ] Authentication endpoints ready

### Week 2: Core Data
- [ ] `/tutors` endpoint
- [ ] `/scholars` endpoint
- [ ] `/courses` endpoint
- [ ] `/circles` endpoint

### Week 3: User Features
- [ ] `/users/me` endpoint
- [ ] `PUT /users/me` endpoint
- [ ] `/messages` endpoints
- [ ] `/sessions` endpoints

### Week 4: Advanced
- [ ] `/matches` endpoint
- [ ] `/search` endpoint
- [ ] `/notifications` endpoint
- [ ] WebSocket for real-time

### Week 5: Polish
- [ ] Testing all endpoints
- [ ] Error handling
- [ ] Performance optimization
- [ ] Deployment

---

## 🔍 How to Find Things

### "I need to add a screen"
1. Create `screens/MyScreen.tsx`
2. Add to `App.tsx` navigation
3. Export type in `data/types.ts`
4. Add sample data in `data/sampleData.ts`

### "I need to display data"
1. Find data type in `data/types.ts`
2. Use `useApi('endpoint')` hook
3. Render with TypeScript support
4. Check `COMPONENTS.md` for pattern

### "I need to fetch from API"
1. Edit `hooks/useApi.ts`
2. Add method to `ApiService` class
3. Add case to `useApi` hook
4. Follow existing pattern

### "I need to modify API"
1. Check `API.md` for endpoint
2. Find code in `hooks/useApi.ts`
3. Update method
4. Test with Postman or similar

### "I need sample data structure"
1. Check `data/sampleData.ts`
2. Check `data/types.ts` for type
3. Follow example pattern
4. Use in component with `useApi()`

### "I need navigation patterns"
1. Check `App.tsx` for routes
2. Look at screen implementations
3. Follow existing navigation
4. Check `COMPONENTS.md` for examples

---

## 💡 Common Patterns

### Using Data Hook
```typescript
const { data, loading, error } = useApi('endpoint');
if (loading) return <Spinner />;
if (error) return <Error message={error} />;
return <List items={data} />;
```

### Getting Single Item
```typescript
const item = data.find(d => d.id === id);
// or use helper function from sampleData.ts
const tutor = getTutorById(id);
```

### Posting Data
```typescript
const handleSubmit = async (data) => {
  try {
    await apiService.sendMessage(recipientId, data);
    // Refresh data
    await refetch();
  } catch (error) {
    // Handle error
  }
};
```

### Navigation with Data
```typescript
navigation.navigate('TutorProfile', { tutorId: '123' });
// In destination screen:
const { tutorId } = route.params;
const tutor = getTutorById(tutorId);
```

---

## 🚨 Common Issues & Solutions

| Issue | Solution | File |
|-------|----------|------|
| "useApi is not a function" | Import from `hooks/useApi.ts` | Screen file |
| "Type not found" | Import from `data/types.ts` | Any file |
| "Sample data undefined" | Import from `data/sampleData.ts` | Hook/Service |
| "Navigation not working" | Check `App.tsx` route name | Navigation |
| "API call failing" | Check URL and token in `useApi.ts` | `useApi.ts` |
| "Data not updating" | Call `refetch()` after changes | Hook usage |
| "Type mismatch" | Check `types.ts` interface | Component |

---

## 📱 Screen Complexity Map

```
Simple (< 150 lines)
├── SplashScreen
├── ProfileScreen
├── TutorProfileScreen
└── PlatformControlsScreen

Medium (150-300 lines)
├── HomeScreen
├── DashboardScreen
├── ComplianceScreen
└── ChatScreen

Complex (> 300 lines)
├── FindTutorsScreen
├── StudentDirectoryScreen
├── ChatListScreen
└── VerificationAnalyticsScreen
```

---

## 🎯 Priority Features

### MVP (Must Have)
- Authentication
- Tutor search/browse
- Messaging
- User profile
- Sessions/booking

### Should Have (v1.1)
- Scholarly circles
- Curated matches
- Ratings & reviews
- Course enrollment
- Analytics

### Nice to Have (v1.2+)
- Campus map
- Real-time notifications
- Advanced filtering
- Recommendations
- Admin dashboard

---

## ✅ Quality Checklist

### Code Quality
- [ ] All components typed
- [ ] All data from API
- [ ] Error handling on all endpoints
- [ ] Loading states visible
- [ ] No console errors

### Testing
- [ ] All screens load
- [ ] All navigation works
- [ ] All data displays correctly
- [ ] All forms submit
- [ ] All errors handled

### Performance
- [ ] No unnecessary re-renders
- [ ] Images optimized
- [ ] Lists virtualized if needed
- [ ] API calls cached
- [ ] App loads in < 3s

### Documentation
- [ ] Components documented
- [ ] APIs documented
- [ ] Types defined
- [ ] Errors logged
- [ ] Code commented

---

## 🎓 Learning Resources

### For Understanding the Architecture
1. `DEVELOPER_GUIDE.md` - High-level overview
2. `App.tsx` - Navigation setup
3. `hooks/useApi.ts` - Data flow
4. `screens/HomeScreen.tsx` - Example screen

### For Specific Features
- **Messaging:** `ChatScreen.tsx` and `ChatListScreen.tsx`
- **Search:** `FindTutorsScreen.tsx`
- **User Profile:** `ProfileScreen.tsx`
- **Navigation:** `App.tsx` and `COMPONENTS.md`

### For API Integration
1. `API.md` - All endpoints
2. `hooks/useApi.ts` - Implementation
3. `data/types.ts` - Data contracts
4. `BACKEND_INTEGRATION.md` - Step-by-step

---

## 📞 Quick Support

**Question:** Where do I find...

| Item | Location | File |
|------|----------|------|
| API endpoints | Documentation | `API.md` |
| Data types | Types file | `data/types.ts` |
| Sample data | Sample file | `data/sampleData.ts` |
| Components | Components dir | `components/*.tsx` |
| Screens | Screens dir | `screens/*.tsx` |
| Navigation | App file | `App.tsx` |
| Themes | Constants | `constants/theme.ts` |
| Hooks | Hooks dir | `hooks/useApi.ts` |
| Integration | Backend guide | `BACKEND_INTEGRATION.md` |

---

## 🚀 Getting Started Now

### Backend Developer
1. Open `BACKEND_INTEGRATION.md`
2. Go to "Phase 1: Core Authentication"
3. Start implementing endpoints in order
4. Test with Postman
5. Update `hooks/useApi.ts`

### Frontend Developer
1. Open `COMPONENTS.md`
2. Pick a screen to improve
3. Check `screens/` for existing code
4. Update UI as needed
5. Test with sample data

### Both
1. Read `DEVELOPER_GUIDE.md` (overview)
2. Read your role's guide above
3. Reference `API.md` as needed
4. Check `data/types.ts` for contracts
5. Use `data/sampleData.ts` as examples

---

**Version:** 1.0  
**Last Updated:** April 2024  
**Maintainers:** Development Team
