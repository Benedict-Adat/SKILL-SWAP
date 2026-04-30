/**
 * SAMPLE DATA - Replace with backend API calls
 * 
 * This file contains all sample data used throughout the app.
 * Backend developers can replace these with actual API calls by:
 * 1. Replacing the data array with API fetch calls
 * 2. Using the same data structure and interfaces
 * 3. Updating the imports in component files
 * 
 * Data Interfaces are defined in ./types.ts
 */

import { Scholar, Tutor, Message, ScholarlyCirlce, Match, User, Course } from './types';
import { COLORS } from '../constants/theme';

// ============================================================================
// NEARBY SCHOLARS DATA
// ============================================================================
export const NEARBY_SCHOLARS: Scholar[] = [
  {
    id: '1',
    name: 'Julius K. Thorne',
    role: 'Graduate Student',
    skills: ['Machine Learning', 'Python'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    rating: 4.9,
    matchScore: 95,
    location: '2.5km away',
    bio: 'Passionate about AI and helping others learn.',
    verified: true,
  },
  {
    id: '2',
    name: 'Marie Williams',
    role: 'Undergraduate',
    skills: ['Data Science', 'Statistics'],
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    rating: 4.7,
    matchScore: 88,
    location: '1.8km away',
    bio: 'Data analyst with 3 years of experience.',
    verified: true,
  },
  {
    id: '3',
    name: 'Sarah Thompson',
    role: 'Senior Student',
    skills: ['UI/UX Design', 'Figma'],
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    rating: 4.8,
    matchScore: 92,
    location: '3.2km away',
    bio: 'Design enthusiast sharing knowledge with peers.',
    verified: true,
  },
  {
    id: '4',
    name: 'Anna Mwai',
    role: 'Junior Student',
    skills: ['Data Analysis', 'SQL'],
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
    rating: 4.6,
    matchScore: 85,
    location: '4.1km away',
    bio: 'SQL expert with database design skills.',
    verified: false,
  },
  {
    id: '5',
    name: 'Michael Chen',
    role: 'Senior Lecturer',
    skills: ['Mathematics', 'Physics'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    rating: 4.9,
    matchScore: 94,
    location: '1.2km away',
    bio: 'Mathematics professor with engaging teaching style.',
    verified: true,
  },
];

// ============================================================================
// TUTORS DATA
// ============================================================================
export const TUTORS: Tutor[] = [
  {
    id: '1',
    name: 'Dr. Victor Ibeneese',
    title: 'Senior Lecturer',
    expertise: ['Machine Learning', 'AI', 'Python'],
    rating: 4.9,
    reviews: 156,
    hourlyRate: 45,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    available: true,
    bio: 'Expert in AI and Machine Learning with 10+ years of teaching experience.',
    verified: true,
    totalSessions: 320,
    responseTime: '< 1 hour',
  },
  {
    id: '2',
    name: 'Prof. Marrie Tseem',
    title: 'Physics Professor',
    expertise: ['Quantum Physics', 'Thermodynamics', 'Mechanics'],
    rating: 4.8,
    reviews: 142,
    hourlyRate: 50,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
    available: true,
    bio: 'Award-winning physics educator passionate about making complex concepts simple.',
    verified: true,
    totalSessions: 278,
    responseTime: '< 2 hours',
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    title: 'Data Scientist',
    expertise: ['Data Analysis', 'Statistics', 'R', 'Python'],
    rating: 4.7,
    reviews: 98,
    hourlyRate: 40,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    available: false,
    bio: 'Helping students master data science through practical projects.',
    verified: true,
    totalSessions: 215,
    responseTime: '< 3 hours',
  },
  {
    id: '4',
    name: 'John Williams',
    title: 'Software Engineer',
    expertise: ['JavaScript', 'React', 'Node.js', 'Web Development'],
    rating: 4.9,
    reviews: 203,
    hourlyRate: 55,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    available: true,
    bio: 'Full-stack developer with experience at top tech companies.',
    verified: true,
    totalSessions: 456,
    responseTime: '< 30 minutes',
  },
  {
    id: '5',
    name: 'Emily Davis',
    title: 'Language Expert',
    expertise: ['Spanish', 'French', 'German', 'Linguistics'],
    rating: 4.8,
    reviews: 167,
    hourlyRate: 35,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    available: true,
    bio: 'Native speaker helping students achieve fluency in multiple languages.',
    verified: true,
    totalSessions: 389,
    responseTime: '< 1 hour',
  },
  {
    id: '6',
    name: 'James Park',
    title: 'Business Consultant',
    expertise: ['Business Strategy', 'Economics', 'Finance'],
    rating: 4.6,
    reviews: 87,
    hourlyRate: 60,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    available: true,
    bio: 'Business professional sharing industry insights with students.',
    verified: true,
    totalSessions: 156,
    responseTime: '< 4 hours',
  },
];

// ============================================================================
// SCHOLARLY CIRCLES DATA
// ============================================================================
export const SCHOLARLY_CIRCLES: ScholarlyCirlce[] = [
  {
    id: '1',
    name: 'The Logic Minds',
    members: 128,
    topic: 'Philosophy & Logic',
    icon: 'bulb-outline',
    color: COLORS.secondary,
    description: 'A community dedicated to exploring philosophical concepts and logical reasoning.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300',
    joined: false,
  },
  {
    id: '2',
    name: 'Code Collective',
    members: 256,
    topic: 'Programming',
    icon: 'code-slash-outline',
    color: COLORS.primary,
    description: 'Programming enthusiasts sharing coding tips, projects, and best practices.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300',
    joined: true,
  },
  {
    id: '3',
    name: 'Data Driven Minds',
    members: 195,
    topic: 'Data Science & Analytics',
    icon: 'stats-chart-outline',
    color: '#F97316',
    description: 'Explore data analysis, visualization, and insights from raw data.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300',
    joined: false,
  },
  {
    id: '4',
    name: 'Design Hub',
    members: 89,
    topic: 'UI/UX Design',
    icon: 'palette-outline',
    color: '#EC4899',
    description: 'Creative designers discussing design principles, tools, and trends.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300',
    joined: true,
  },
  {
    id: '5',
    name: 'Language Exchange',
    members: 342,
    topic: 'Languages & Linguistics',
    icon: 'language-outline',
    color: '#06B6D4',
    description: 'Learn and practice multiple languages with native speakers.',
    image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=300',
    joined: false,
  },
];

// ============================================================================
// MESSAGES DATA
// ============================================================================
export const MESSAGES: Message[] = [
  {
    id: '1',
    senderId: 'user123',
    senderName: 'Julius K. Thorne',
    senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    text: 'Hi! I\'d love to help you with Machine Learning. When are you free?',
    timestamp: new Date(Date.now() - 600000),
    read: true,
  },
  {
    id: '2',
    senderId: 'user456',
    senderName: 'Sarah Johnson',
    senderAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    text: 'Great results on your data analysis project!',
    timestamp: new Date(Date.now() - 1800000),
    read: true,
  },
  {
    id: '3',
    senderId: 'user789',
    senderName: 'Emily Davis',
    senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    text: 'Ready for our Spanish lesson tomorrow?',
    timestamp: new Date(Date.now() - 3600000),
    read: false,
  },
];

// ============================================================================
// CURATED MATCHES DATA
// ============================================================================
export const CURATED_MATCHES: Match[] = [
  {
    id: '1',
    scholar: NEARBY_SCHOLARS[0],
    tutor: TUTORS[0],
    compatibilityScore: 96,
    reason: 'Perfect match for Machine Learning skills',
    suggestedTopics: ['Python Basics', 'Neural Networks', 'TensorFlow'],
  },
  {
    id: '2',
    scholar: NEARBY_SCHOLARS[1],
    tutor: TUTORS[2],
    compatibilityScore: 92,
    reason: 'Excellent fit for Data Science learning',
    suggestedTopics: ['Statistical Analysis', 'Data Visualization', 'Pandas'],
  },
  {
    id: '3',
    scholar: NEARBY_SCHOLARS[2],
    tutor: { ...TUTORS[3], expertise: ['Figma', 'Web Design', 'UI/UX'] },
    compatibilityScore: 89,
    reason: 'Great match for design skills',
    suggestedTopics: ['Figma Basics', 'Design Systems', 'Prototyping'],
  },
];

// ============================================================================
// USER DATA
// ============================================================================
export const CURRENT_USER: User = {
  id: 'current-user-123',
  name: 'Alex Mitchell',
  email: 'alex@university.edu',
  role: 'Student',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
  bio: 'Computer Science student interested in AI and Web Development.',
  skills: ['JavaScript', 'React', 'Python', 'Data Analysis'],
  interests: ['Machine Learning', 'Web Development', 'Data Science'],
  verified: true,
  joinDate: new Date('2023-01-15'),
  successRate: 0.92,
  totalSessions: 45,
};

// ============================================================================
// COURSES/SESSIONS DATA
// ============================================================================
export const COURSES: Course[] = [
  {
    id: '1',
    title: 'Introduction to Machine Learning',
    tutor: TUTORS[0],
    category: 'Technology',
    level: 'Beginner',
    duration: '8 weeks',
    students: 124,
    rating: 4.9,
    price: 299,
    image: 'https://images.unsplash.com/photo-1666356294694-aa574db269b3?w=300',
    description: 'Learn the fundamentals of machine learning with Python.',
    enrolled: false,
  },
  {
    id: '2',
    title: 'Advanced Physics Concepts',
    tutor: TUTORS[1],
    category: 'Science',
    level: 'Advanced',
    duration: '12 weeks',
    students: 87,
    rating: 4.8,
    price: 399,
    image: 'https://images.unsplash.com/photo-1608889335941-33ac463bf6bb?w=300',
    description: 'Deep dive into quantum physics and thermodynamics.',
    enrolled: true,
  },
  {
    id: '3',
    title: 'Data Science Masterclass',
    tutor: TUTORS[2],
    category: 'Technology',
    level: 'Intermediate',
    duration: '6 weeks',
    students: 156,
    rating: 4.7,
    price: 349,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300',
    description: 'Master data analysis, visualization, and insights.',
    enrolled: true,
  },
  {
    id: '4',
    title: 'Full-Stack Web Development',
    tutor: TUTORS[3],
    category: 'Technology',
    level: 'Intermediate',
    duration: '10 weeks',
    students: 203,
    rating: 4.9,
    price: 449,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300',
    description: 'Learn to build complete web applications from scratch.',
    enrolled: false,
  },
];

// ============================================================================
// ANALYTICS DATA
// ============================================================================
export const DASHBOARD_STATS = {
  totalStudents: 12450,
  totalTutors: 856,
  successRate: 94.2,
  activeNow: 2341,
};

export const RECENT_ACTIVITY = [
  { id: '1', action: 'New tutor joined', name: 'John Smith', time: '2 hours ago' },
  { id: '2', action: 'Session completed', name: 'Sarah Davis', time: '4 hours ago' },
  { id: '3', action: 'Review posted', name: 'Mike Johnson', time: '6 hours ago' },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get scholar by ID
 */
export const getScholarById = (id: string): Scholar | undefined => {
  return NEARBY_SCHOLARS.find(scholar => scholar.id === id);
};

/**
 * Get tutor by ID
 */
export const getTutorById = (id: string): Tutor | undefined => {
  return TUTORS.find(tutor => tutor.id === id);
};

/**
 * Get circle by ID
 */
export const getCircleById = (id: string): ScholarlyCirlce | undefined => {
  return SCHOLARLY_CIRCLES.find(circle => circle.id === id);
};

/**
 * Search tutors by expertise
 */
export const searchTutorsByExpertise = (query: string): Tutor[] => {
  return TUTORS.filter(tutor =>
    tutor.expertise.some(exp => exp.toLowerCase().includes(query.toLowerCase()))
  );
};

/**
 * Get available tutors only
 */
export const getAvailableTutors = (): Tutor[] => {
  return TUTORS.filter(tutor => tutor.available);
};

/**
 * Get top-rated tutors
 */
export const getTopRatedTutors = (limit: number = 5): Tutor[] => {
  return TUTORS.sort((a, b) => b.rating - a.rating).slice(0, limit);
};

/**
 * Get user's enrolled courses
 */
export const getUserEnrolledCourses = (): Course[] => {
  return COURSES.filter(course => course.enrolled);
};
