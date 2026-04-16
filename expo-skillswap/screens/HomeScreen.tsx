import React from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';
import { RootStackParamList } from '../App';

const { width } = Dimensions.get('window');

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const nearbyScholars = [
  {
    id: '1',
    name: 'Julius K. Thorne',
    role: 'Graduate Student',
    skills: ['Machine Learning', 'Python'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    rating: 4.9,
    matchScore: 95,
  },
  {
    id: '2',
    name: 'Marie Need to Learn',
    role: 'Undergraduate',
    skills: ['Data Science', 'Statistics'],
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    rating: 4.7,
    matchScore: 88,
  },
  {
    id: '3',
    name: 'UCF College Princess',
    role: 'Senior Student',
    skills: ['UI/UX Design', 'Figma'],
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    rating: 4.8,
    matchScore: 92,
  },
  {
    id: '4',
    name: 'Anna Mwai',
    role: 'Junior Student',
    skills: ['Data Analysis', 'SQL'],
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
    rating: 4.6,
    matchScore: 85,
  },
];

const scholarlyCircles = [
  {
    id: '1',
    name: 'The Logic Minds',
    members: 128,
    topic: 'Philosophy & Logic',
    icon: 'bulb-outline',
    color: COLORS.secondary,
  },
  {
    id: '2',
    name: 'Code Collective',
    members: 256,
    topic: 'Programming',
    icon: 'code-slash-outline',
    color: COLORS.primary,
  },
];

const quickActions = [
  { id: '1', title: 'Find Tutor', icon: 'search-outline', color: COLORS.info, bgColor: COLORS.infoLight },
  { id: '2', title: 'Schedule', icon: 'calendar-outline', color: COLORS.success, bgColor: COLORS.successLight },
  { id: '3', title: 'Resources', icon: 'book-outline', color: COLORS.warning, bgColor: COLORS.warningLight },
  { id: '4', title: 'Favorites', icon: 'heart-outline', color: COLORS.error, bgColor: COLORS.errorLight },
];

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.logoWrapper}>
              <Ionicons name="swap-horizontal" size={20} color={COLORS.primary} />
            </View>
            <Text style={styles.appName}>SkillSwap</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color={COLORS.textPrimary} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <LinearGradient
          colors={[COLORS.primary, COLORS.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroSection}
        >
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>
              Elevate Your{'\n'}Knowledge{'\n'}Through Shared{'\n'}Mastery
            </Text>
            <Text style={styles.heroSubtitle}>
              Connect with fellow scholars, share expertise, and grow together.
            </Text>
            <TouchableOpacity style={styles.exploreButton}>
              <Text style={styles.exploreButtonText}>Explore</Text>
              <Ionicons name="arrow-forward" size={16} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          <View style={styles.heroImageContainer}>
            <View style={styles.heroImagePlaceholder}>
              <Ionicons name="school" size={48} color={COLORS.white} />
            </View>
          </View>
        </LinearGradient>

        {/* Curated Matches Banner */}
        <TouchableOpacity
          style={styles.matchesBanner}
          onPress={() => navigation.navigate('CuratedMatches')}
        >
          <View style={styles.matchesIconWrapper}>
            <Ionicons name="sparkles" size={20} color={COLORS.secondary} />
          </View>
          <View style={styles.matchesContent}>
            <Text style={styles.matchesTitle}>Curated Matches</Text>
            <Text style={styles.matchesSubtitle}>
              5 new scholars match your interests
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
        </TouchableOpacity>

        {/* Nearby Scholars Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby Scholars</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scholarsList}
          >
            {nearbyScholars.map((scholar) => (
              <TouchableOpacity
                key={scholar.id}
                style={styles.scholarCard}
                onPress={() => navigation.navigate('TutorProfile', { tutorId: scholar.id })}
              >
                <Image source={{ uri: scholar.avatar }} style={styles.scholarAvatar} />
                <Text style={styles.scholarName} numberOfLines={1}>{scholar.name}</Text>
                <Text style={styles.scholarRole}>{scholar.role}</Text>
                <View style={styles.scholarSkills}>
                  {scholar.skills.slice(0, 1).map((skill, idx) => (
                    <View key={idx} style={styles.skillTag}>
                      <Text style={styles.skillTagText}>{skill}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.scholarFooter}>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={12} color={COLORS.warning} />
                    <Text style={styles.ratingText}>{scholar.rating}</Text>
                  </View>
                  <TouchableOpacity style={styles.connectBtn}>
                    <Text style={styles.connectBtnText}>Connect</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity key={action.id} style={styles.actionCard}>
                <View style={[styles.actionIcon, { backgroundColor: action.bgColor }]}>
                  <Ionicons name={action.icon as any} size={24} color={action.color} />
                </View>
                <Text style={styles.actionText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Scholarly Circles Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Scholarly Circles</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ScholarlyCircles')}>
              <Text style={styles.seeAllText}>View All Circles</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.circlesList}>
            {scholarlyCircles.map((circle) => (
              <TouchableOpacity key={circle.id} style={styles.circleCard}>
                <View style={[styles.circleIcon, { backgroundColor: `${circle.color}15` }]}>
                  <Ionicons name={circle.icon as any} size={24} color={circle.color} />
                </View>
                <View style={styles.circleInfo}>
                  <Text style={styles.circleName}>{circle.name}</Text>
                  <Text style={styles.circleTopic}>{circle.topic}</Text>
                </View>
                <View style={styles.circleMeta}>
                  <View style={styles.membersContainer}>
                    <Ionicons name="people-outline" size={14} color={COLORS.gray} />
                    <Text style={styles.membersText}>{circle.members}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={COLORS.gray} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured Ad Banner */}
        <View style={styles.adBanner}>
          <LinearGradient
            colors={['#F0E6D3', '#E8D8C0']}
            style={styles.adGradient}
          >
            <View style={styles.adContent}>
              <Text style={styles.adTitle}>Bring real facts with</Text>
              <Text style={styles.adSubtitle}>UI/UX Design?</Text>
              <TouchableOpacity style={styles.adButton}>
                <Text style={styles.adButtonText}>Learn More</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.adImage}>
              <Ionicons name="desktop-outline" size={48} color={COLORS.primary} />
            </View>
          </LinearGradient>
        </View>

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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingVertical: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.sm,
    marginRight: 10,
  },
  appName: {
    fontSize: SIZES.lg,
    ...FONTS.bold,
    color: COLORS.primary,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.error,
  },
  heroSection: {
    margin: SIZES.padding,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.paddingLg,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  heroContent: {
    flex: 1,
    paddingRight: 10,
  },
  heroTitle: {
    fontSize: 22,
    ...FONTS.bold,
    color: COLORS.white,
    lineHeight: 28,
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.white,
    opacity: 0.85,
    marginBottom: 14,
    lineHeight: 18,
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: SIZES.radiusFull,
    alignSelf: 'flex-start',
    gap: 6,
  },
  exploreButtonText: {
    fontSize: SIZES.md,
    ...FONTS.semibold,
    color: COLORS.primary,
  },
  heroImageContainer: {
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  matchesBanner: {
    marginHorizontal: SIZES.padding,
    marginBottom: SIZES.padding,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusMd,
    padding: SIZES.padding,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  matchesIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: `${COLORS.secondary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  matchesContent: {
    flex: 1,
  },
  matchesTitle: {
    fontSize: SIZES.md,
    ...FONTS.semibold,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  matchesSubtitle: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textSecondary,
  },
  section: {
    marginBottom: SIZES.marginLg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: SIZES.lg,
    ...FONTS.bold,
    color: COLORS.textPrimary,
    paddingHorizontal: SIZES.padding,
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: SIZES.sm,
    ...FONTS.medium,
    color: COLORS.primary,
  },
  scholarsList: {
    paddingLeft: SIZES.padding,
    paddingRight: 8,
    gap: 12,
  },
  scholarCard: {
    width: 150,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusMd,
    padding: 12,
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  scholarAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginBottom: 8,
  },
  scholarName: {
    fontSize: SIZES.md,
    ...FONTS.semibold,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 2,
  },
  scholarRole: {
    fontSize: SIZES.xs,
    ...FONTS.regular,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  scholarSkills: {
    marginBottom: 8,
  },
  skillTag: {
    backgroundColor: `${COLORS.primary}10`,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: SIZES.radiusFull,
  },
  skillTagText: {
    fontSize: 10,
    ...FONTS.medium,
    color: COLORS.primary,
  },
  scholarFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingText: {
    fontSize: SIZES.sm,
    ...FONTS.semibold,
    color: COLORS.textPrimary,
  },
  connectBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: SIZES.radius,
  },
  connectBtnText: {
    fontSize: 10,
    ...FONTS.semibold,
    color: COLORS.white,
  },
  actionsGrid: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding,
    gap: 12,
  },
  actionCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusMd,
    padding: 12,
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: SIZES.xs,
    ...FONTS.medium,
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  circlesList: {
    paddingHorizontal: SIZES.padding,
    gap: 12,
  },
  circleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusMd,
    padding: SIZES.padding,
    ...SHADOWS.sm,
  },
  circleIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  circleInfo: {
    flex: 1,
  },
  circleName: {
    fontSize: SIZES.base,
    ...FONTS.semibold,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  circleTopic: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textSecondary,
  },
  circleMeta: {
    alignItems: 'flex-end',
    gap: 4,
  },
  membersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  membersText: {
    fontSize: SIZES.sm,
    ...FONTS.medium,
    color: COLORS.gray,
  },
  adBanner: {
    marginHorizontal: SIZES.padding,
    borderRadius: SIZES.radiusLg,
    overflow: 'hidden',
    ...SHADOWS.sm,
  },
  adGradient: {
    flexDirection: 'row',
    padding: SIZES.paddingLg,
    alignItems: 'center',
  },
  adContent: {
    flex: 1,
  },
  adTitle: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  adSubtitle: {
    fontSize: SIZES.lg,
    ...FONTS.bold,
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  adButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: SIZES.radius,
    alignSelf: 'flex-start',
  },
  adButtonText: {
    fontSize: SIZES.sm,
    ...FONTS.semibold,
    color: COLORS.white,
  },
  adImage: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomPadding: {
    height: 20,
  },
});
