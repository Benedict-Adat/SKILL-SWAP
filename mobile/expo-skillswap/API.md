# SkillSwap Backend API Documentation

Complete API specification for the SkillSwap backend. All endpoints are organized by resource type.

---

## Table of Contents

1. [Base Configuration](#base-configuration)
2. [Authentication](#authentication)
3. [Scholars](#scholars)
4. [Tutors](#tutors)
5. [Messages](#messages)
6. [Courses](#courses)
7. [Scholarly Circles](#scholarly-circles)
8. [Matches](#matches)
9. [Sessions](#sessions)
10. [Users](#users)
11. [Notifications](#notifications)
12. [Search](#search)
13. [Error Handling](#error-handling)

---

## Base Configuration

### Base URL
```
Development: http://localhost:3001/api
Production: https://api.skillswap.app/api
```

### Headers
All requests should include:
```
Content-Type: application/json
Authorization: Bearer {token}  // For authenticated endpoints
```

### Environment Variables (Frontend)
```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_API_TIMEOUT=30000
```

---

## Authentication

### Sign Up
Register a new user account.

**Endpoint:** `POST /auth/signup`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@university.edu",
  "password": "securePassword123",
  "role": "Student",
  "skills": ["Python", "Data Science"],
  "interests": ["Machine Learning"]
}
```

**Response (200):**
```json
{
  "user": {
    "id": "user123",
    "name": "John Doe",
    "email": "john@university.edu",
    "role": "Student",
    "avatar": "https://...",
    "verified": false
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `400` - Invalid input
- `409` - Email already exists

---

### Sign In
Authenticate and get access token.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "john@university.edu",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "user": {
    "id": "user123",
    "name": "John Doe",
    "email": "john@university.edu",
    "role": "Student"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `401` - Invalid credentials
- `404` - User not found

---

### Sign Out
Revoke authentication token.

**Endpoint:** `POST /auth/logout`

**Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

---

## Scholars

### List Nearby Scholars
Get scholars nearby with optional filters.

**Endpoint:** `GET /scholars`

**Query Parameters:**
```
location: string (optional) - Location name or radius (e.g., "2.5km away")
skills: string[] (optional) - Filter by skills (comma-separated)
minRating: number (optional) - Minimum rating (default: 0)
verified: boolean (optional) - Filter verified only
limit: number (optional) - Max results (default: 20, max: 100)
offset: number (optional) - Pagination offset (default: 0)
```

**Example Request:**
```
GET /scholars?skills=Python,Machine%20Learning&minRating=4.5&limit=10
```

**Response (200):**
```json
{
  "scholars": [
    {
      "id": "scholar1",
      "name": "Julius K. Thorne",
      "role": "Graduate Student",
      "skills": ["Machine Learning", "Python"],
      "avatar": "https://...",
      "rating": 4.9,
      "matchScore": 95,
      "location": "2.5km away",
      "bio": "Passionate about AI...",
      "verified": true
    }
  ],
  "total": 125,
  "limit": 10,
  "offset": 0
}
```

**Error Responses:**
- `400` - Invalid query parameters

---

### Get Scholar Details
Get detailed information about a specific scholar.

**Endpoint:** `GET /scholars/:id`

**Response (200):**
```json
{
  "id": "scholar1",
  "name": "Julius K. Thorne",
  "role": "Graduate Student",
  "skills": ["Machine Learning", "Python"],
  "avatar": "https://...",
  "rating": 4.9,
  "matchScore": 95,
  "location": "2.5km away",
  "bio": "Passionate about AI and helping others learn.",
  "verified": true,
  "joinDate": "2023-01-15",
  "totalSessions": 45,
  "successRate": 0.92,
  "recentReviews": [
    {
      "id": "review1",
      "author": "Sarah",
      "rating": 5,
      "text": "Great tutor!",
      "timestamp": "2024-04-10"
    }
  ]
}
```

**Error Responses:**
- `404` - Scholar not found

---

## Tutors

### List Tutors
Get list of tutors with optional filters and sorting.

**Endpoint:** `GET /tutors`

**Query Parameters:**
```
expertise: string[] (optional) - Filter by expertise (comma-separated)
minRating: number (optional) - Minimum rating (default: 0)
maxPrice: number (optional) - Maximum hourly rate
available: boolean (optional) - Available tutors only
verified: boolean (optional) - Verified tutors only
level: string (optional) - Skill level (Beginner, Intermediate, Advanced)
sortBy: string (optional) - Sort by (rating, price, availability, reviews)
limit: number (optional) - Max results (default: 20, max: 100)
offset: number (optional) - Pagination offset (default: 0)
```

**Example Request:**
```
GET /tutors?expertise=Machine%20Learning,Python&minRating=4.5&maxPrice=60&sortBy=rating
```

**Response (200):**
```json
{
  "tutors": [
    {
      "id": "tutor1",
      "name": "Dr. Victor Ibeneese",
      "title": "Senior Lecturer",
      "expertise": ["Machine Learning", "AI", "Python"],
      "rating": 4.9,
      "reviews": 156,
      "hourlyRate": 45,
      "avatar": "https://...",
      "available": true,
      "bio": "Expert in AI with 10+ years of experience.",
      "verified": true,
      "totalSessions": 320,
      "responseTime": "< 1 hour"
    }
  ],
  "total": 45,
  "limit": 20,
  "offset": 0
}
```

---

### Get Tutor Details
Get full details about a tutor including reviews.

**Endpoint:** `GET /tutors/:id`

**Response (200):**
```json
{
  "id": "tutor1",
  "name": "Dr. Victor Ibeneese",
  "title": "Senior Lecturer",
  "expertise": ["Machine Learning", "AI", "Python"],
  "rating": 4.9,
  "reviews": 156,
  "hourlyRate": 45,
  "avatar": "https://...",
  "available": true,
  "bio": "Expert in AI and Machine Learning with 10+ years of teaching experience.",
  "verified": true,
  "totalSessions": 320,
  "responseTime": "< 1 hour",
  "joinDate": "2022-03-20",
  "successRate": 0.98,
  "recentReviews": [
    {
      "id": "review1",
      "author": "John Doe",
      "rating": 5,
      "text": "Excellent tutor, very patient and knowledgeable.",
      "timestamp": "2024-04-10",
      "helpful": 12
    }
  ],
  "availability": {
    "Monday": ["09:00-17:00"],
    "Wednesday": ["14:00-20:00"],
    "Saturday": ["10:00-16:00"]
  },
  "certifications": [
    {
      "name": "Machine Learning Specialization",
      "issuer": "Coursera",
      "date": "2021-06-15"
    }
  ]
}
```

---

## Messages

### Get Conversations
Get list of user conversations.

**Endpoint:** `GET /messages/conversations`

**Query Parameters:**
```
limit: number (optional) - Max conversations (default: 20)
offset: number (optional) - Pagination offset
```

**Response (200):**
```json
{
  "conversations": [
    {
      "id": "conv1",
      "participantId": "user456",
      "participantName": "Sarah Johnson",
      "participantAvatar": "https://...",
      "lastMessage": {
        "id": "msg1",
        "text": "When are you free next week?",
        "timestamp": "2024-04-15T14:30:00Z",
        "read": false
      },
      "unreadCount": 2
    }
  ]
}
```

---

### Get Messages
Get message history for a conversation.

**Endpoint:** `GET /messages?recipientId=:id`

**Query Parameters:**
```
recipientId: string (required) - ID of the other person
limit: number (optional) - Max messages (default: 50)
offset: number (optional) - Pagination offset (for older messages)
```

**Response (200):**
```json
{
  "messages": [
    {
      "id": "msg1",
      "senderId": "user123",
      "senderName": "Current User",
      "senderAvatar": "https://...",
      "text": "Hi! I'd love to help you with ML.",
      "timestamp": "2024-04-15T14:00:00Z",
      "read": true
    },
    {
      "id": "msg2",
      "senderId": "user456",
      "senderName": "Sarah Johnson",
      "senderAvatar": "https://...",
      "text": "Great! When are you available?",
      "timestamp": "2024-04-15T14:30:00Z",
      "read": true
    }
  ],
  "total": 25,
  "limit": 50,
  "offset": 0
}
```

---

### Send Message
Send a new message.

**Endpoint:** `POST /messages`

**Request Body:**
```json
{
  "recipientId": "user456",
  "text": "Hello! I'd like to connect for a tutoring session."
}
```

**Response (201):**
```json
{
  "id": "msg3",
  "senderId": "user123",
  "senderName": "Current User",
  "senderAvatar": "https://...",
  "text": "Hello! I'd like to connect for a tutoring session.",
  "timestamp": "2024-04-15T15:00:00Z",
  "read": true
}
```

---

## Courses

### List Courses
Get available courses.

**Endpoint:** `GET /courses`

**Query Parameters:**
```
category: string (optional) - Filter by category
level: string (optional) - Filter by level (Beginner, Intermediate, Advanced)
maxPrice: number (optional) - Maximum price
sortBy: string (optional) - Sort by (rating, price, students)
limit: number (optional) - Max results (default: 20)
offset: number (optional) - Pagination offset
```

**Response (200):**
```json
{
  "courses": [
    {
      "id": "course1",
      "title": "Introduction to Machine Learning",
      "tutor": {
        "id": "tutor1",
        "name": "Dr. Victor Ibeneese"
      },
      "category": "Technology",
      "level": "Beginner",
      "duration": "8 weeks",
      "students": 124,
      "rating": 4.9,
      "price": 299,
      "image": "https://...",
      "description": "Learn the fundamentals of ML with Python.",
      "enrolled": false
    }
  ],
  "total": 156
}
```

---

### Get Course Details
Get full course information.

**Endpoint:** `GET /courses/:id`

**Response (200):**
```json
{
  "id": "course1",
  "title": "Introduction to Machine Learning",
  "tutor": {
    "id": "tutor1",
    "name": "Dr. Victor Ibeneese",
    "bio": "..."
  },
  "category": "Technology",
  "level": "Beginner",
  "duration": "8 weeks",
  "students": 124,
  "rating": 4.9,
  "price": 299,
  "image": "https://...",
  "description": "Learn the fundamentals of machine learning with Python.",
  "enrolled": true,
  "modules": [
    {
      "id": "mod1",
      "title": "Module 1: Introduction",
      "lessons": 5,
      "completed": 3
    }
  ],
  "syllabus": "...",
  "prerequisites": ["Basic Python knowledge"],
  "learningOutcomes": ["...", "..."]
}
```

---

### Enroll in Course
Enroll the current user in a course.

**Endpoint:** `POST /courses/:id/enroll`

**Response (200):**
```json
{
  "message": "Enrolled successfully",
  "course": { /* course object */ }
}
```

---

## Scholarly Circles

### List Circles
Get available scholarly circles.

**Endpoint:** `GET /circles`

**Query Parameters:**
```
topic: string (optional) - Filter by topic
joined: boolean (optional) - Only joined circles
limit: number (optional) - Max results (default: 20)
offset: number (optional) - Pagination offset
```

**Response (200):**
```json
{
  "circles": [
    {
      "id": "circle1",
      "name": "Code Collective",
      "members": 256,
      "topic": "Programming",
      "icon": "code-slash-outline",
      "color": "#1E3A8A",
      "description": "Programming enthusiasts sharing tips...",
      "image": "https://...",
      "joined": true
    }
  ],
  "total": 48
}
```

---

### Join Circle
Join a scholarly circle.

**Endpoint:** `POST /circles/:id/join`

**Response (200):**
```json
{
  "message": "Joined successfully",
  "circle": { /* circle object */ }
}
```

---

### Leave Circle
Leave a scholarly circle.

**Endpoint:** `POST /circles/:id/leave`

**Response (200):**
```json
{
  "message": "Left successfully"
}
```

---

## Matches

### Get Curated Matches
Get AI-powered personalized matches.

**Endpoint:** `GET /matches`

**Query Parameters:**
```
limit: number (optional) - Max matches (default: 10)
```

**Response (200):**
```json
{
  "matches": [
    {
      "id": "match1",
      "scholar": {
        "id": "scholar1",
        "name": "Julius K. Thorne",
        "skills": ["Machine Learning", "Python"]
      },
      "tutor": {
        "id": "tutor1",
        "name": "Dr. Victor",
        "expertise": ["Machine Learning", "Python"]
      },
      "compatibilityScore": 96,
      "reason": "Perfect match for Machine Learning skills",
      "suggestedTopics": ["Python Basics", "Neural Networks"]
    }
  ]
}
```

---

## Sessions

### Schedule Session
Book a tutoring session.

**Endpoint:** `POST /sessions`

**Request Body:**
```json
{
  "tutorId": "tutor1",
  "startTime": "2024-04-20T14:00:00Z",
  "endTime": "2024-04-20T15:00:00Z",
  "topic": "Machine Learning Basics",
  "notes": "Focus on neural networks"
}
```

**Response (201):**
```json
{
  "id": "session1",
  "tutorId": "tutor1",
  "studentId": "user123",
  "startTime": "2024-04-20T14:00:00Z",
  "endTime": "2024-04-20T15:00:00Z",
  "duration": 60,
  "status": "scheduled",
  "topic": "Machine Learning Basics"
}
```

---

### Get Sessions
Get user's sessions (booked or in progress).

**Endpoint:** `GET /sessions`

**Query Parameters:**
```
status: string (optional) - Filter by status (scheduled, completed, cancelled)
limit: number (optional) - Max results
offset: number (optional) - Pagination offset
```

**Response (200):**
```json
{
  "sessions": [
    {
      "id": "session1",
      "tutorId": "tutor1",
      "tutorName": "Dr. Victor",
      "startTime": "2024-04-20T14:00:00Z",
      "endTime": "2024-04-20T15:00:00Z",
      "status": "scheduled",
      "topic": "ML Basics"
    }
  ]
}
```

---

## Users

### Get Current User
Get authenticated user's profile.

**Endpoint:** `GET /users/me`

**Response (200):**
```json
{
  "id": "user123",
  "name": "Alex Mitchell",
  "email": "alex@university.edu",
  "role": "Student",
  "avatar": "https://...",
  "bio": "CS student interested in AI.",
  "skills": ["JavaScript", "Python"],
  "interests": ["Machine Learning"],
  "verified": true,
  "joinDate": "2023-01-15",
  "successRate": 0.92,
  "totalSessions": 45
}
```

---

### Update Profile
Update user profile information.

**Endpoint:** `PUT /users/me`

**Request Body:**
```json
{
  "bio": "Updated bio",
  "skills": ["JavaScript", "Python", "React"],
  "interests": ["Machine Learning", "Web Dev"]
}
```

**Response (200):**
```json
{
  "id": "user123",
  "name": "Alex Mitchell",
  "bio": "Updated bio",
  "skills": ["JavaScript", "Python", "React"]
  // ... rest of user object
}
```

---

## Notifications

### Get Notifications
Get user notifications.

**Endpoint:** `GET /notifications`

**Query Parameters:**
```
read: boolean (optional) - Filter by read status
limit: number (optional) - Max results (default: 20)
```

**Response (200):**
```json
{
  "notifications": [
    {
      "id": "notif1",
      "type": "message",
      "title": "New message from Sarah",
      "message": "Are you available for a session?",
      "read": false,
      "timestamp": "2024-04-15T14:00:00Z"
    }
  ]
}
```

---

### Mark as Read
Mark notification as read.

**Endpoint:** `PATCH /notifications/:id/read`

**Response (200):**
```json
{
  "message": "Marked as read"
}
```

---

## Search

### Global Search
Search across tutors, scholars, and courses.

**Endpoint:** `GET /search`

**Query Parameters:**
```
q: string (required) - Search query
type: string (optional) - Search type (tutors, scholars, courses)
limit: number (optional) - Max results per type
```

**Response (200):**
```json
{
  "tutors": [
    {
      "id": "tutor1",
      "name": "Dr. Victor"
      // ...
    }
  ],
  "scholars": [
    {
      "id": "scholar1",
      "name": "Julius K."
      // ...
    }
  ],
  "courses": [
    {
      "id": "course1",
      "title": "ML Course"
      // ...
    }
  ]
}
```

---

## Error Handling

### Error Response Format
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input provided",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

### Common Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Server Error

### Common Error Codes
- `VALIDATION_ERROR` - Input validation failed
- `UNAUTHORIZED` - Missing or invalid token
- `NOT_FOUND` - Resource not found
- `DUPLICATE_ENTRY` - Resource already exists
- `INTERNAL_ERROR` - Server error

---

## Rate Limiting

- **Rate Limit:** 1000 requests per hour
- **Headers:**
  - `X-RateLimit-Limit`: 1000
  - `X-RateLimit-Remaining`: 999
  - `X-RateLimit-Reset`: 1618491600

---

## Pagination

Most list endpoints support pagination:

**Query Parameters:**
```
limit: number - Max results per page (default: 20, max: 100)
offset: number - Number of items to skip (default: 0)
```

**Response:**
```json
{
  "data": [...],
  "total": 156,
  "limit": 20,
  "offset": 0,
  "hasMore": true
}
```

---

## Webhooks

Setup webhooks for real-time events:

**Available Events:**
- `message.created` - New message sent
- `session.scheduled` - New session booked
- `session.completed` - Session finished
- `tutor.available` - Tutor became available
- `match.found` - New match recommendation

**Setup:** POST /webhooks with `url` and `events`

---

## Best Practices

1. **Authentication:** Always include valid token
2. **Error Handling:** Check status codes and error messages
3. **Pagination:** Use limit/offset for large datasets
4. **Caching:** Cache static data when possible
5. **Rate Limiting:** Implement exponential backoff
6. **Timeout:** Set reasonable request timeouts (30s)
7. **Validation:** Validate input before sending

---

## Frontend Integration Example

```typescript
// Using useApi hook
const { data: tutors, loading, error } = useApi('tutors');

// Direct API call
const response = await apiService.fetchTutors({
  expertise: ['Python', 'ML'],
  minRating: 4.5
});

// Posting data
await apiService.sendMessage(recipientId, 'Hello!');
```
