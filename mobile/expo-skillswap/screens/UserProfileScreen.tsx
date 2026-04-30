import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';
import { RootStackParamList } from '../App';

type UserProfileNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const userProfile = {
  id: '1',
  name: 'Dr. Victor Ibeneese',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
  coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
  university: 'Stanford University',
  department: 'Computer Science',
  location: 'San Francisco, CA',
  bio: 'PhD researcher specializing in deep learning and AI. Passionate about making machine learning accessible to everyone. Love to teach and learn from others!',
  verified: true,
  rating: 4.9,
  reviews: 47,
  sessions: 124,
  matchPercentage: 95,
  isOnline: true,
  joinedDate: 'September 2024',
  responseTime: '< 1 hour',
  languages: ['English', 'French'],
  teaches: [
    { name: 'Machine Learning', level: 'Expert', sessions: 45, rating: 5.0 },
    { name: 'Neural Networks', level: 'Expert', sessions: 32, rating: 4.9 },
    { name: 'Python', level: 'Expert', sessions: 28, rating: 4.8 },
    { name: 'TensorFlow', level: 'Advanced', sessions: 19, rating: 4.9 },
  ],
  wants: [
    { name: 'Public Speaking', priority: 'High' },
    { name: 'Business Strategy', priority: 'Medium' },
    { name: 'Marketing', priority: 'Low' },
  ],
  availability: ['Mon', 'Wed', 'Fri', 'Sat'],
  reviews: [
    {
      id: '1',
      user: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      rating: 5,
      date: '2 weeks ago',
      text: 'Amazing teacher! Victor explained complex ML concepts in a way that was easy to understand. Highly recommend!',
    },
    {
      id: '2',
      user: 'Michael Brown',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      rating: 5,
      date: '1 month ago',
      text: 'Great session on neural networks. Very patient and knowledgeable.',
    },
  ],
};

export default function UserProfileScreen() {
  const navigation = useNavigation<UserProfileNavigationProp>();
  const route = useRoute();
  const [activeTab, setActiveTab] = useState('about');

  const tabs = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'reviews', label: 'Reviews' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with Back Button */}
        <View style={styles.headerOverlay}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.moreButton}>
            <Ionicons name="ellipsis-horizontal" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        {/* Cover Image */}
        <Image source={{ uri: userProfile.coverImage }} style={styles.coverImage} />

        {/* Profile Info Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: userProfile.avatar }} style={styles.avatar} />
            {userProfile.isOnline && <View style={styles.onlineIndicator} />}
            {userProfile.verified && (
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark" size={12} color={COLORS.white} />
              </View>
            )}
          </View>

          <View style={styles.profileInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{userProfile.name}</Text>
              <View style={styles.matchBadge}>
                <Text style={styles.matchText}>{userProfile.matchPercentage}% Match</Text>
              </View>
            </View>
            <Text style={styles.university}>{userProfile.university}</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={14} color={COLORS.textLight} />
              <Text style={styles.location}>{userProfile.location}</Text>
            </View>
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userProfile.sessions}</Text>
              <Text style={styles.statLabel}>Sessions</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <View style={styles.ratingValue}>
                <Text style={styles.statValue}>{userProfile.rating}</Text>
                <Ionicons name="star" size={14} color={COLORS.warning} />
              </View>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userProfile.reviews.length}</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate('Chat', {
                recipientId: userProfile.id,
                recipientName: userProfile.name,
              })}
            >
              <Ionicons name="chatbubble" size={18} color={COLORS.white} />
              <Text style={styles.primaryButtonText}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Ionicons name="heart-outline" size={20} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Ionicons name="share-outline" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, activeTab === tab.id && styles.tabActive]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Text
                style={[styles.tabText, activeTab === tab.id && styles.tabTextActive]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        {activeTab === 'about' && (
          <View style={styles.tabContent}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>About</Text>
              <Text style={styles.bioText}>{userProfile.bio}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Quick Info</Text>
              <View style={styles.infoGrid}>
                <View style={styles.infoItem}>
                  <View style={styles.infoIcon}>
                    <Ionicons name="time-outline" size={18} color={COLORS.primary} />
                  </View>
                  <View>
                    <Text style={styles.infoLabel}>Response Time</Text>
                    <Text style={styles.infoValue}>{userProfile.responseTime}</Text>
                  </View>
                </View>
                <View style={styles.infoItem}>
                  <View style={styles.infoIcon}>
                    <Ionicons name="language-outline" size={18} color={COLORS.primary} />
                  </View>
                  <View>
                    <Text style={styles.infoLabel}>Languages</Text>
                    <Text style={styles.infoValue}>{userProfile.languages.join(', ')}</Text>
                  </View>
                </View>
                <View style={styles.infoItem}>
                  <View style={styles.infoIcon}>
                    <Ionicons name="calendar-outline" size={18} color={COLORS.primary} />
                  </View>
                  <View>
                    <Text style={styles.infoLabel}>Joined</Text>
                    <Text style={styles.infoValue}>{userProfile.joinedDate}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Availability</Text>
              <View style={styles.availabilityRow}>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <View
                    key={day}
                    style={[
                      styles.dayChip,
                      userProfile.availability.includes(day) && styles.dayChipActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        userProfile.availability.includes(day) && styles.dayTextActive,
                      ]}
                    >
                      {day}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {activeTab === 'skills' && (
          <View style={styles.tabContent}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Can Teach</Text>
              {userProfile.teaches.map((skill, index) => (
                <View key={index} style={styles.skillRow}>
                  <View style={styles.skillInfo}>
                    <Text style={styles.skillName}>{skill.name}</Text>
                    <View style={styles.skillMeta}>
                      <View style={styles.levelBadge}>
                        <Text style={styles.levelText}>{skill.level}</Text>
                      </View>
                      <Text style={styles.skillSessions}>{skill.sessions} sessions</Text>
                    </View>
                  </View>
                  <View style={styles.skillRating}>
                    <Ionicons name="star" size={14} color={COLORS.warning} />
                    <Text style={styles.skillRatingText}>{skill.rating}</Text>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Wants to Learn</Text>
              {userProfile.wants.map((skill, index) => (
                <View key={index} style={styles.wantRow}>
                  <Text style={styles.wantName}>{skill.name}</Text>
                  <View style={[
                    styles.priorityBadge,
                    skill.priority === 'High' && styles.priorityHigh,
                    skill.priority === 'Medium' && styles.priorityMedium,
                    skill.priority === 'Low' && styles.priorityLow,
                  ]}>
                    <Text style={styles.priorityText}>{skill.priority}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {activeTab === 'reviews' && (
          <View style={styles.tabContent}>
            <View style={styles.section}>
              <View style={styles.reviewsHeader}>
                <Text style={styles.sectionTitle}>Reviews</Text>
                <View style={styles.overallRating}>
                  <Ionicons name="star" size={18} color={COLORS.warning} />
                  <Text style={styles.overallRatingText}>{userProfile.rating}</Text>
                  <Text style={styles.reviewCount}>({userProfile.reviews.length})</Text>
                </View>
              </View>
              {userProfile.reviews.map((review) => (
                <View key={review.id} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <Image source={{ uri: review.avatar }} style={styles.reviewerAvatar} />
                    <View style={styles.reviewerInfo}>
                      <Text style={styles.reviewerName}>{review.user}</Text>
                      <Text style={styles.reviewDate}>{review.date}</Text>
                    </View>
                    <View style={styles.reviewRating}>
                      {[...Array(5)].map((_, i) => (
                        <Ionicons
                          key={i}
                          name={i < review.rating ? 'star' : 'star-outline'}
                          size={14}
                          color={COLORS.warning}
                        />
                      ))}
                    </View>
                  </View>
                  <Text style={styles.reviewText}>{review.text}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerOverlay: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.padding,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverImage: {
    width: SCREEN_WIDTH,
    height: 200,
    resizeMode: 'cover',
  },
  profileCard: {
    backgroundColor: COLORS.white,
    marginTop: -40,
    marginHorizontal: SIZES.padding,
    borderRadius: SIZES.radiusLg,
    padding: 16,
    ...SHADOWS.md,
  },
  avatarContainer: {
    position: 'absolute',
    top: -40,
    alignSelf: 'center',
    left: '50%',
    marginLeft: -45,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 28,
    borderWidth: 4,
    borderColor: COLORS.white,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.success,
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  verifiedBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.success,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  profileInfo: {
    marginTop: 50,
    alignItems: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    fontSize: SIZES.xl,
    ...FONTS.bold,
    color: COLORS.textPrimary,
  },
  matchBadge: {
    backgroundColor: `${COLORS.primary}15`,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: SIZES.radiusFull,
  },
  matchText: {
    fontSize: SIZES.xs,
    ...FONTS.semibold,
    color: COLORS.primary,
  },
  university: {
    fontSize: SIZES.sm,
    ...FONTS.medium,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  location: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textLight,
    marginLeft: 4,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: COLORS.border,
  },
  statValue: {
    fontSize: SIZES.lg,
    ...FONTS.bold,
    color: COLORS.textPrimary,
  },
  ratingValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statLabel: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textLight,
    marginTop: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 10,
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: SIZES.radiusMd,
    gap: 8,
  },
  primaryButtonText: {
    fontSize: SIZES.base,
    ...FONTS.semibold,
    color: COLORS.white,
  },
  secondaryButton: {
    width: 48,
    height: 48,
    borderRadius: SIZES.radiusMd,
    backgroundColor: `${COLORS.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: SIZES.padding,
    marginTop: 20,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusMd,
    padding: 4,
    ...SHADOWS.sm,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: SIZES.radiusMd - 2,
  },
  tabActive: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: SIZES.sm,
    ...FONTS.semibold,
    color: COLORS.textSecondary,
  },
  tabTextActive: {
    color: COLORS.white,
  },
  tabContent: {
    paddingHorizontal: SIZES.padding,
    paddingTop: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: SIZES.lg,
    ...FONTS.semibold,
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  bioText: {
    fontSize: SIZES.base,
    ...FONTS.regular,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  infoGrid: {
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: SIZES.radiusMd,
    ...SHADOWS.sm,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: `${COLORS.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoLabel: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textLight,
  },
  infoValue: {
    fontSize: SIZES.base,
    ...FONTS.semibold,
    color: COLORS.textPrimary,
  },
  availabilityRow: {
    flexDirection: 'row',
    gap: 8,
  },
  dayChip: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: SIZES.radiusMd,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dayChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  dayText: {
    fontSize: SIZES.xs,
    ...FONTS.semibold,
    color: COLORS.textLight,
  },
  dayTextActive: {
    color: COLORS.white,
  },
  skillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    padding: 14,
    borderRadius: SIZES.radiusMd,
    marginBottom: 8,
    ...SHADOWS.sm,
  },
  skillInfo: {
    flex: 1,
  },
  skillName: {
    fontSize: SIZES.base,
    ...FONTS.semibold,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  skillMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  levelBadge: {
    backgroundColor: `${COLORS.primary}15`,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: SIZES.radiusFull,
  },
  levelText: {
    fontSize: SIZES.xs,
    ...FONTS.semibold,
    color: COLORS.primary,
  },
  skillSessions: {
    fontSize: SIZES.xs,
    ...FONTS.regular,
    color: COLORS.textLight,
  },
  skillRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  skillRatingText: {
    fontSize: SIZES.sm,
    ...FONTS.semibold,
    color: COLORS.textPrimary,
  },
  wantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    padding: 14,
    borderRadius: SIZES.radiusMd,
    marginBottom: 8,
    ...SHADOWS.sm,
  },
  wantName: {
    fontSize: SIZES.base,
    ...FONTS.medium,
    color: COLORS.textPrimary,
  },
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: SIZES.radiusFull,
  },
  priorityHigh: {
    backgroundColor: `${COLORS.error}15`,
  },
  priorityMedium: {
    backgroundColor: `${COLORS.warning}15`,
  },
  priorityLow: {
    backgroundColor: `${COLORS.success}15`,
  },
  priorityText: {
    fontSize: SIZES.xs,
    ...FONTS.semibold,
    color: COLORS.textSecondary,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  overallRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  overallRatingText: {
    fontSize: SIZES.lg,
    ...FONTS.bold,
    color: COLORS.textPrimary,
  },
  reviewCount: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textLight,
  },
  reviewCard: {
    backgroundColor: COLORS.white,
    padding: 14,
    borderRadius: SIZES.radiusMd,
    marginBottom: 10,
    ...SHADOWS.sm,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  reviewerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
    marginRight: 10,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: SIZES.sm,
    ...FONTS.semibold,
    color: COLORS.textPrimary,
  },
  reviewDate: {
    fontSize: SIZES.xs,
    ...FONTS.regular,
    color: COLORS.textLight,
  },
  reviewRating: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewText: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  bottomPadding: {
    height: 100,
  },
});
