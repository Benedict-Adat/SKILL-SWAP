# Backend Integration Guide for SkillSwap

A step-by-step guide for backend developers to integrate the SkillSwap backend with the frontend.

---

## Quick Start

### 1. Environment Setup

Create a `.env` file in the project root with:

```env
# Backend API Configuration
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_API_TIMEOUT=30000

# Feature Flags
REACT_APP_ENABLE_REAL_TIME=true
REACT_APP_ENABLE_NOTIFICATIONS=true
```

### 2. Replace Sample Data with API Calls

All data is currently pulled from `data/sampleData.ts`. Replace with API calls in `hooks/useApi.ts`:

```typescript
// Before (sample data)
async fetchTutors(): Promise<Tutor[]> {
  return SampleData.TUTORS;
}

// After (API call)
async fetchTutors(): Promise<Tutor[]> {
  const response = await fetch(`${this.baseUrl}/tutors`);
  if (!response.ok) throw new Error('Failed to fetch tutors');
  return response.json();
}
```

### 3. Test the Integration

Use the provided sample data as a reference for expected data structures. All TypeScript interfaces are in `data/types.ts`.

---

## File Structure for Developers

```
expo-skillswap/
├── data/
│   ├── sampleData.ts      # Sample data (REPLACE with API)
│   └── types.ts           # TypeScript interfaces (KEEP)
├── hooks/
│   └── useApi.ts          # API service & hook (UPDATE)
├── screens/               # All screen components
├── components/            # Reusable components
├── constants/
│   └── theme.ts           # Colors, fonts, sizes
├── COMPONENTS.md          # Component documentation
├── API.md                 # API endpoint documentation
└── BACKEND_INTEGRATION.md # This file
```

---

## Key Files to Modify

### 1. `hooks/useApi.ts` - API Service

This is the main file to modify for backend integration:

```typescript
class ApiService {
  private baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

  // Replace each method
  async fetchTutors(filters?: any): Promise<Tutor[]> {
    const params = new URLSearchParams();
    if (filters?.expertise) params.append('expertise', filters.expertise.join(','));
    if (filters?.minRating) params.append('minRating', filters.minRating);
    
    const response = await fetch(`${this.baseUrl}/tutors?${params}`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    
    if (!response.ok) throw new Error('Failed to fetch tutors');
    return response.json();
  }
}
```

### 2. `data/types.ts` - Data Types

✅ **DO NOT MODIFY** - Keep all interfaces as-is. They're the contract between frontend and backend.

### 3. `data/sampleData.ts` - Sample Data

📌 **KEEP FOR REFERENCE** - Don't delete. Use as test data or fallback.

---

## Implementation Checklist

### Phase 1: Core Authentication (Weeks 1-2)

- [ ] Implement sign-up endpoint
- [ ] Implement login endpoint
- [ ] Setup JWT token management
- [ ] Add token refresh logic
- [ ] Create authentication middleware
- [ ] Add logout endpoint
- [ ] Implement session persistence
- [ ] Add password reset functionality

**Frontend Changes Needed:**
```typescript
// In hooks/useApi.ts
async login(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch(`${this.baseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  // Store token securely
  localStorage.setItem('authToken', data.token);
  return data;
}
```

### Phase 2: Core Data Endpoints (Weeks 2-3)

- [ ] Scholars endpoint (GET /scholars)
- [ ] Tutors endpoint (GET /tutors, GET /tutors/:id)
- [ ] Current user endpoint (GET /users/me)
- [ ] User update endpoint (PUT /users/me)
- [ ] Courses endpoint (GET /courses)
- [ ] Scholarly circles endpoint (GET /circles)

**Test Data Needed:**
- 20+ tutors with varied expertise
- 15+ scholars with different skills
- 10+ courses
- 5+ scholarly circles

### Phase 3: Messaging & Communication (Weeks 3-4)

- [ ] Messages endpoint (GET /messages)
- [ ] Send message endpoint (POST /messages)
- [ ] Conversations endpoint (GET /messages/conversations)
- [ ] Mark message as read
- [ ] WebSocket setup for real-time messages (optional)

**Real-time Recommendation:**
```typescript
// WebSocket connection
const ws = new WebSocket('ws://localhost:3001/messages');
ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  // Update UI with new message
};
```

### Phase 4: Advanced Features (Weeks 4-5)

- [ ] Curated matches (GET /matches)
- [ ] Search endpoint (GET /search)
- [ ] Sessions/booking (POST /sessions, GET /sessions)
- [ ] Reviews & ratings
- [ ] Notifications (GET /notifications)
- [ ] Analytics endpoints

### Phase 5: Polish & Optimization (Week 5+)

- [ ] Add request caching
- [ ] Implement pagination for large lists
- [ ] Add error handling & retry logic
- [ ] Setup request logging
- [ ] Performance optimization
- [ ] Load testing
- [ ] Security review

---

## Authentication Token Management

### Setup Auth Token Interceptor

```typescript
// In hooks/useApi.ts or separate authUtils.ts
function getAuthToken(): string | null {
  return localStorage.getItem('authToken');
}

function setAuthToken(token: string): void {
  localStorage.setItem('authToken', token);
}

function clearAuthToken(): void {
  localStorage.removeItem('authToken');
}

// Add token to all requests
async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = getAuthToken();
  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${token}`,
  };
  
  const response = await fetch(url, { ...options, headers });
  
  if (response.status === 401) {
    // Token expired, redirect to login
    window.location.href = '/login';
  }
  
  return response;
}
```

---

## Data Validation

Always validate incoming data matches the TypeScript interfaces:

```typescript
// Example: Validate tutor data
function validateTutor(data: any): Tutor {
  const required = ['id', 'name', 'title', 'expertise', 'rating', 'hourlyRate'];
  
  for (const field of required) {
    if (!data[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }
  
  return data as Tutor;
}

// Use in API calls
async fetchTutors(): Promise<Tutor[]> {
  const response = await fetch(`${this.baseUrl}/tutors`);
  const data = await response.json();
  
  if (!Array.isArray(data)) {
    throw new Error('Invalid response format');
  }
  
  return data.map(validateTutor);
}
```

---

## Error Handling

Implement consistent error handling:

```typescript
class ApiError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number
  ) {
    super(message);
  }
}

async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = await response.json();
    throw new ApiError(
      error.message || 'API request failed',
      error.code || 'UNKNOWN_ERROR',
      response.status
    );
  }
  return response.json();
}

// Usage
async fetchTutors(): Promise<Tutor[]> {
  try {
    const response = await fetch(`${this.baseUrl}/tutors`);
    return await handleResponse(response);
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`Error [${error.code}]: ${error.message}`);
    }
    throw error;
  }
}
```

---

## Testing Data Integration

### Test Data to Create

```typescript
// Test Tutors
const testTutors = [
  {
    id: 'test-tutor-1',
    name: 'Test Tutor 1',
    expertise: ['Python', 'JavaScript'],
    rating: 4.9,
    hourlyRate: 50,
    // ... other fields
  }
  // ... more tutors
];

// Test Scholars
const testScholars = [
  {
    id: 'test-scholar-1',
    name: 'Test Scholar 1',
    skills: ['Python'],
    rating: 4.5,
    matchScore: 85,
    // ... other fields
  }
  // ... more scholars
];
```

### API Testing Endpoints

Create test endpoints for development:

```
GET /api/test/reset         # Reset to sample data
GET /api/test/tutors        # Get test tutors
GET /api/test/scholars      # Get test scholars
POST /api/test/seed         # Seed test data
```

---

## Database Schema Reference

Based on the TypeScript interfaces, here's the expected database schema:

```sql
-- Users table
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('Student', 'Tutor', 'Admin'),
  avatar_url VARCHAR(255),
  bio TEXT,
  verified BOOLEAN DEFAULT FALSE,
  join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Skills table
CREATE TABLE skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  skill_name VARCHAR(100) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  UNIQUE KEY (user_id, skill_name)
);

-- Tutors table
CREATE TABLE tutors (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  hourly_rate DECIMAL(10, 2) NOT NULL,
  available BOOLEAN DEFAULT TRUE,
  total_sessions INT DEFAULT 0,
  response_time VARCHAR(50),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Courses table
CREATE TABLE courses (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  tutor_id VARCHAR(36) NOT NULL,
  category VARCHAR(100),
  level ENUM('Beginner', 'Intermediate', 'Advanced'),
  price DECIMAL(10, 2),
  rating DECIMAL(2, 1),
  students INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tutor_id) REFERENCES tutors(id)
);

-- Messages table
CREATE TABLE messages (
  id VARCHAR(36) PRIMARY KEY,
  sender_id VARCHAR(36) NOT NULL,
  recipient_id VARCHAR(36) NOT NULL,
  text TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES users(id),
  FOREIGN KEY (recipient_id) REFERENCES users(id),
  INDEX (sender_id, recipient_id)
);

-- Sessions table
CREATE TABLE sessions (
  id VARCHAR(36) PRIMARY KEY,
  tutor_id VARCHAR(36) NOT NULL,
  student_id VARCHAR(36) NOT NULL,
  start_time DATETIME NOT NULL,
  end_time DATETIME NOT NULL,
  topic VARCHAR(255),
  status ENUM('scheduled', 'in-progress', 'completed', 'cancelled'),
  rating DECIMAL(2, 1),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tutor_id) REFERENCES tutors(id),
  FOREIGN KEY (student_id) REFERENCES users(id)
);

-- Circles table
CREATE TABLE circles (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  topic VARCHAR(255),
  members INT DEFAULT 0,
  color VARCHAR(7),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Performance Optimization

### Caching Strategy

```typescript
// Implement cache in ApiService
class ApiService {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private cacheTTL = 5 * 60 * 1000; // 5 minutes

  async fetchTutors(): Promise<Tutor[]> {
    const cacheKey = 'tutors';
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTTL) {
      return cached.data;
    }
    
    const data = await fetch(`${this.baseUrl}/tutors`).then(r => r.json());
    this.cache.set(cacheKey, { data, timestamp: Date.now() });
    return data;
  }
}
```

### Pagination Implementation

```typescript
// All list endpoints should support pagination
async fetchTutors(limit = 20, offset = 0): Promise<TutorResponse> {
  const response = await fetch(
    `${this.baseUrl}/tutors?limit=${limit}&offset=${offset}`
  );
  return response.json();
  // Returns: { tutors: Tutor[], total: number, limit: number, offset: number }
}
```

### Lazy Loading

```typescript
// For large lists, implement infinite scroll
const { data: tutors, loading } = useApi('tutors');
const [offset, setOffset] = useState(0);

const loadMore = async () => {
  const moreData = await apiService.fetchTutors(20, offset + 20);
  setTutors([...tutors, ...moreData.tutors]);
  setOffset(offset + 20);
};
```

---

## Monitoring & Logging

Add logging for debugging:

```typescript
class ApiService {
  async fetchTutors(): Promise<Tutor[]> {
    console.log('[API] Fetching tutors...');
    const startTime = performance.now();
    
    try {
      const response = await fetch(`${this.baseUrl}/tutors`);
      const data = await response.json();
      
      const duration = performance.now() - startTime;
      console.log(`[API] Tutors fetched in ${duration}ms`, data.length, 'items');
      
      return data;
    } catch (error) {
      console.error('[API] Failed to fetch tutors:', error);
      throw error;
    }
  }
}
```

---

## Deployment Checklist

### Before Going Live

- [ ] Replace all sample data with real API calls
- [ ] Add production API URL to environment
- [ ] Setup SSL/HTTPS
- [ ] Add CORS headers
- [ ] Implement rate limiting
- [ ] Add request logging
- [ ] Setup error tracking (Sentry, etc.)
- [ ] Performance testing
- [ ] Security audit
- [ ] Load testing
- [ ] Database backup strategy
- [ ] Monitoring setup

### Environment Variables

```env
# Development
REACT_APP_API_URL=http://localhost:3001/api

# Staging
REACT_APP_API_URL=https://staging-api.skillswap.app/api

# Production
REACT_APP_API_URL=https://api.skillswap.app/api
```

---

## Troubleshooting

### CORS Issues

If you see CORS errors:

1. Add CORS headers to backend:
```javascript
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

2. Update API calls to include credentials:
```typescript
fetch(url, {
  credentials: 'include',
  headers: { /* ... */ }
});
```

### Token Not Persisting

- Check if `localStorage` is enabled
- Verify token is being set in sign-in response
- Check browser console for errors
- Test with sample token first

### API Timeout

- Increase timeout value in `.env`
- Check backend API performance
- Implement request retry logic
- Add loading indicators to UX

### Data Type Mismatch

- Compare API response with TypeScript interface
- Use `console.log()` to debug response data
- Validate response structure
- Update API endpoint if needed

---

## Support & Resources

### Documentation Files
- `COMPONENTS.md` - Component structure and usage
- `API.md` - Complete API endpoint documentation
- `data/types.ts` - TypeScript interface definitions
- `data/sampleData.ts` - Sample data structure

### Useful Debugging Tools
- Browser DevTools (Network tab)
- Postman for API testing
- VS Code REST Client extension
- Console logging with `[API]` prefix

### Getting Help
- Review API.md for endpoint specifications
- Check data/types.ts for expected data structures
- Look at sampleData.ts for example data
- Check COMPONENTS.md for component data requirements

---

## Quick Reference: What to Modify

### ✅ Modify These Files
- `hooks/useApi.ts` - Replace all `SampleData.*` calls with API fetches
- `screens/*.tsx` - Update if API responses differ from expected types
- Environment variables - Set correct API URLs

### ❌ Don't Modify These Files
- `data/types.ts` - Interface definitions should stay consistent
- `COMPONENTS.md` - Documentation
- `API.md` - API specification

### 📌 Keep for Reference
- `data/sampleData.ts` - Use as test data or fallback
- This guide - Refer back as needed

---

## Next Steps

1. **Week 1:** Set up backend project with sample data
2. **Week 2:** Implement authentication endpoints
3. **Week 3:** Connect core data endpoints (tutors, scholars, courses)
4. **Week 4:** Add messaging and advanced features
5. **Week 5:** Testing, optimization, and deployment

Good luck with your backend integration! 🚀
