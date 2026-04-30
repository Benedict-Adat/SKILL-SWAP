/**
 * useApi Hook - Data Management & API Integration
 * 
 * This hook provides a centralized way to manage data fetching for the entire app.
 * 
 * BACKEND INTEGRATION:
 * Replace the sample data with actual API calls. The structure is already set up
 * to seamlessly switch from sample data to real API endpoints.
 * 
 * USAGE:
 * const { scholars, loading, error } = useApi('scholars');
 * const { tutors } = useApi('tutors');
 * 
 * ADDING NEW ENDPOINTS:
 * 1. Add the endpoint string to the DATA_ENDPOINTS config
 * 2. Create a corresponding fetch function in ApiService
 * 3. Use the hook with the endpoint name
 */

import { useState, useEffect, useCallback } from 'react';
import {
  Scholar,
  Tutor,
  Message,
  Course,
  User,
  Match,
  ScholarlyCirlce,
  Session,
  Notification,
} from '../data/types';
import * as SampleData from '../data/sampleData';

// ============================================================================
// TYPES
// ============================================================================

type DataEndpoint =
  | 'scholars'
  | 'tutors'
  | 'messages'
  | 'courses'
  | 'circles'
  | 'matches'
  | 'currentUser'
  | 'notifications'
  | 'sessions';

interface ApiState<T> {
  data: T;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// ============================================================================
// API SERVICE CLASS
// ============================================================================

class ApiService {
  private baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

  /**
   * Fetch scholars/peers
   * 
   * BACKEND: GET /api/scholars
   * Should return Scholar[] with filters:
   * - location: string (nearby radius)
   * - skills: string[] (filter by skills)
   * - rating: number (min rating)
   */
  async fetchScholars(filters?: any): Promise<Scholar[]> {
    try {
      // REPLACE with: return fetch(`${this.baseUrl}/scholars`).then(r => r.json());
      return SampleData.NEARBY_SCHOLARS;
    } catch (error) {
      console.error('Error fetching scholars:', error);
      throw error;
    }
  }

  /**
   * Fetch tutors
   * 
   * BACKEND: GET /api/tutors
   * Should return Tutor[] with filters:
   * - expertise: string[] (filter by skills)
   * - minRating: number
   * - maxPrice: number
   * - available: boolean
   */
  async fetchTutors(filters?: any): Promise<Tutor[]> {
    try {
      // REPLACE with: return fetch(`${this.baseUrl}/tutors`).then(r => r.json());
      return SampleData.TUTORS;
    } catch (error) {
      console.error('Error fetching tutors:', error);
      throw error;
    }
  }

  /**
   * Fetch tutor by ID
   * 
   * BACKEND: GET /api/tutors/:id
   */
  async fetchTutorById(id: string): Promise<Tutor | null> {
    try {
      // REPLACE with: return fetch(`${this.baseUrl}/tutors/${id}`).then(r => r.json());
      return SampleData.getTutorById(id) || null;
    } catch (error) {
      console.error('Error fetching tutor:', error);
      throw error;
    }
  }

  /**
   * Fetch messages
   * 
   * BACKEND: GET /api/messages?limit=50&offset=0
   * Returns: Message[] sorted by timestamp (newest first)
   */
  async fetchMessages(limit = 50, offset = 0): Promise<Message[]> {
    try {
      // REPLACE with: return fetch(`${this.baseUrl}/messages?limit=${limit}&offset=${offset}`).then(r => r.json());
      return SampleData.MESSAGES;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  }

  /**
   * Send message
   * 
   * BACKEND: POST /api/messages
   * Body: { receiverId: string, text: string }
   * Returns: Message
   */
  async sendMessage(receiverId: string, text: string): Promise<Message> {
    try {
      // REPLACE with: 
      // return fetch(`${this.baseUrl}/messages`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ receiverId, text })
      // }).then(r => r.json());
      
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: 'current-user-123',
        senderName: 'Current User',
        senderAvatar: '',
        text,
        timestamp: new Date(),
        read: true,
      };
      return newMessage;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  /**
   * Fetch courses
   * 
   * BACKEND: GET /api/courses
   * Optional filters:
   * - category: string
   * - level: 'Beginner' | 'Intermediate' | 'Advanced'
   * - maxPrice: number
   */
  async fetchCourses(filters?: any): Promise<Course[]> {
    try {
      // REPLACE with: return fetch(`${this.baseUrl}/courses`).then(r => r.json());
      return SampleData.COURSES;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  }

  /**
   * Enroll in course
   * 
   * BACKEND: POST /api/courses/:courseId/enroll
   */
  async enrollInCourse(courseId: string): Promise<Course> {
    try {
      // REPLACE with: 
      // return fetch(`${this.baseUrl}/courses/${courseId}/enroll`, {
      //   method: 'POST'
      // }).then(r => r.json());
      
      const course = SampleData.COURSES.find(c => c.id === courseId);
      if (course) {
        course.enrolled = true;
      }
      return course || ({} as Course);
    } catch (error) {
      console.error('Error enrolling in course:', error);
      throw error;
    }
  }

  /**
   * Fetch scholarly circles
   * 
   * BACKEND: GET /api/circles
   */
  async fetchCircles(): Promise<ScholarlyCirlce[]> {
    try {
      // REPLACE with: return fetch(`${this.baseUrl}/circles`).then(r => r.json());
      return SampleData.SCHOLARLY_CIRCLES;
    } catch (error) {
      console.error('Error fetching circles:', error);
      throw error;
    }
  }

  /**
   * Join scholarly circle
   * 
   * BACKEND: POST /api/circles/:circleId/join
   */
  async joinCircle(circleId: string): Promise<ScholarlyCirlce> {
    try {
      // REPLACE with:
      // return fetch(`${this.baseUrl}/circles/${circleId}/join`, {
      //   method: 'POST'
      // }).then(r => r.json());
      
      const circle = SampleData.SCHOLARLY_CIRCLES.find(c => c.id === circleId);
      if (circle) {
        circle.joined = true;
        circle.members += 1;
      }
      return circle || ({} as ScholarlyCirlce);
    } catch (error) {
      console.error('Error joining circle:', error);
      throw error;
    }
  }

  /**
   * Fetch curated matches
   * 
   * BACKEND: GET /api/matches
   * Returns personalized Match[] based on user profile
   */
  async fetchMatches(): Promise<Match[]> {
    try {
      // REPLACE with: return fetch(`${this.baseUrl}/matches`).then(r => r.json());
      return SampleData.CURATED_MATCHES;
    } catch (error) {
      console.error('Error fetching matches:', error);
      throw error;
    }
  }

  /**
   * Fetch current user
   * 
   * BACKEND: GET /api/users/me
   * Requires authentication token
   */
  async fetchCurrentUser(): Promise<User> {
    try {
      // REPLACE with: return fetch(`${this.baseUrl}/users/me`).then(r => r.json());
      return SampleData.CURRENT_USER;
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  }

  /**
   * Update user profile
   * 
   * BACKEND: PUT /api/users/me
   * Body: Partial<User>
   */
  async updateUserProfile(updates: Partial<User>): Promise<User> {
    try {
      // REPLACE with:
      // return fetch(`${this.baseUrl}/users/me`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updates)
      // }).then(r => r.json());
      
      const updated = { ...SampleData.CURRENT_USER, ...updates };
      return updated;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }

  /**
   * Fetch notifications
   * 
   * BACKEND: GET /api/notifications
   * Returns: Notification[] (unread first, sorted by timestamp)
   */
  async fetchNotifications(): Promise<Notification[]> {
    try {
      // REPLACE with: return fetch(`${this.baseUrl}/notifications`).then(r => r.json());
      return [];
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  }

  /**
   * Mark notification as read
   * 
   * BACKEND: PATCH /api/notifications/:notificationId/read
   */
  async markNotificationAsRead(notificationId: string): Promise<Notification> {
    try {
      // REPLACE with:
      // return fetch(`${this.baseUrl}/notifications/${notificationId}/read`, {
      //   method: 'PATCH'
      // }).then(r => r.json());
      
      return {} as Notification;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  }

  /**
   * Search functionality
   * 
   * BACKEND: GET /api/search?q=query&type=tutors|scholars|courses
   */
  async search(query: string, type: 'tutors' | 'scholars' | 'courses' = 'tutors'): Promise<any[]> {
    try {
      // REPLACE with: return fetch(`${this.baseUrl}/search?q=${query}&type=${type}`).then(r => r.json());
      
      if (type === 'tutors') {
        return SampleData.searchTutorsByExpertise(query);
      }
      return [];
    } catch (error) {
      console.error('Error searching:', error);
      throw error;
    }
  }
}

// Create singleton instance
const apiService = new ApiService();

// ============================================================================
// CUSTOM HOOK
// ============================================================================

/**
 * Custom hook for data fetching
 * 
 * @param endpoint - The data endpoint to fetch from
 * @returns ApiState<T> - Contains data, loading state, error, and refetch function
 * 
 * USAGE:
 * const { data: tutors, loading, error, refetch } = useApi('tutors');
 */
export function useApi<T>(endpoint: DataEndpoint, dependencies: any[] = []): ApiState<T> {
  const [data, setData] = useState<T>(() => {
    switch (endpoint) {
      case 'scholars':
        return SampleData.NEARBY_SCHOLARS as unknown as T;
      case 'tutors':
        return SampleData.TUTORS as unknown as T;
      case 'messages':
        return SampleData.MESSAGES as unknown as T;
      case 'courses':
        return SampleData.COURSES as unknown as T;
      case 'circles':
        return SampleData.SCHOLARLY_CIRCLES as unknown as T;
      case 'matches':
        return SampleData.CURATED_MATCHES as unknown as T;
      case 'currentUser':
        return SampleData.CURRENT_USER as unknown as T;
      default:
        return [] as unknown as T;
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let result: T;
      switch (endpoint) {
        case 'scholars':
          result = (await apiService.fetchScholars()) as T;
          break;
        case 'tutors':
          result = (await apiService.fetchTutors()) as T;
          break;
        case 'messages':
          result = (await apiService.fetchMessages()) as T;
          break;
        case 'courses':
          result = (await apiService.fetchCourses()) as T;
          break;
        case 'circles':
          result = (await apiService.fetchCircles()) as T;
          break;
        case 'matches':
          result = (await apiService.fetchMatches()) as T;
          break;
        case 'currentUser':
          result = (await apiService.fetchCurrentUser()) as T;
          break;
        default:
          result = [] as T;
      }
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData, ...dependencies]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

// Export API service for direct usage if needed
export { apiService, ApiService };
