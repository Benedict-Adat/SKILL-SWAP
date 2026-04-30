/**
 * Data Types and Interfaces
 * 
 * All data models used throughout the SkillSwap application.
 * These are shared between frontend and backend for consistency.
 */

// ============================================================================
// USER & AUTHENTICATION
// ============================================================================

export interface User {
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

// ============================================================================
// SCHOLAR (Student/Peer Teacher)
// ============================================================================

export interface Scholar {
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

// ============================================================================
// TUTOR
// ============================================================================

export interface Tutor {
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

// ============================================================================
// CIRCLES & COMMUNITIES
// ============================================================================

export interface ScholarlyCirlce {
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

// ============================================================================
// MESSAGING
// ============================================================================

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: Date;
  read: boolean;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: Message;
  unreadCount: number;
}

// ============================================================================
// MATCHING & RECOMMENDATIONS
// ============================================================================

export interface Match {
  id: string;
  scholar: Scholar | User;
  tutor: Tutor | User;
  compatibilityScore: number;
  reason: string;
  suggestedTopics: string[];
}

// ============================================================================
// COURSES & SESSIONS
// ============================================================================

export interface Course {
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

export interface Session {
  id: string;
  title: string;
  tutorId: string;
  studentId: string;
  startTime: Date;
  endTime: Date;
  duration: number; // in minutes
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  topic: string;
  notes?: string;
  rating?: number;
  feedback?: string;
}

// ============================================================================
// REVIEWS & RATINGS
// ============================================================================

export interface Review {
  id: string;
  authorId: string;
  authorName: string;
  rating: number;
  text: string;
  timestamp: Date;
  tutorId?: string;
  scholarId?: string;
}

// ============================================================================
// NOTIFICATIONS
// ============================================================================

export interface Notification {
  id: string;
  userId: string;
  type: 'message' | 'session' | 'match' | 'review' | 'circle';
  title: string;
  message: string;
  read: boolean;
  timestamp: Date;
  actionUrl?: string;
}

// ============================================================================
// ANALYTICS & STATS
// ============================================================================

export interface UserStats {
  userId: string;
  totalSessions: number;
  totalHours: number;
  averageRating: number;
  skillsLearned: string[];
  successRate: number;
  lastActive: Date;
}

export interface PlatformStats {
  totalUsers: number;
  totalTutors: number;
  totalSessions: number;
  totalRevenue: number;
  averagePlatformRating: number;
  activeUsersToday: number;
}

// ============================================================================
// LOCATION & MAPPING
// ============================================================================

export interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  type: 'library' | 'classroom' | 'cafe' | 'other';
  imageUrl?: string;
  rating: number;
}

// ============================================================================
// FILTERS & SEARCH
// ============================================================================

export interface SearchFilters {
  query?: string;
  category?: string;
  minRating?: number;
  maxPrice?: number;
  availability?: 'available' | 'all';
  expertise?: string[];
  verified?: boolean;
}

export interface TutorFilters extends SearchFilters {
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  sortBy?: 'rating' | 'price' | 'availability';
}
