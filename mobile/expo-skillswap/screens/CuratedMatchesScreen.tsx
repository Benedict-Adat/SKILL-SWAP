import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';
import { RootStackParamList } from '../App';

type CuratedMatchesNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const matches = [
  {
    id: '1',
    name: 'Julius K. Thorne',
    role: 'Graduate Student',
    major: 'Computer Science',
    skills: ['Machine Learning', 'Python', 'TensorFlow'],
    interests: ['AI Research', 'Deep Learning'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    matchScore: 95,
    matchReasons: ['Same major', 'Complementary skills', 'Similar learning goals'],
  },
  {
    id: '2',
    name: 'Sarah Chen',
    role: 'Senior Student',
    major: 'Data Science',
    skills: ['R', 'Statistics', 'Data Visualization'],
    interests: ['Research Methods', 'Analytics'],
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    matchScore: 92,
    matchReasons: ['Complementary expertise', 'Shared interests', 'High availability'],
  },
  {
    id: '3',
    name: 'Michael Brown',
    role: 'PhD Candidate',
    major: 'Physics',
    skills: ['Quantum Computing', 'Mathematics', 'Research'],
    interests: ['Theoretical Physics', 'Scientific Computing'],
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    matchScore: 88,
    matchReasons: ['Strong math background', 'Research experience', 'Similar schedule'],
  },
  {
    id: '4',
    name: 'Emily Rodriguez',
    role: 'Graduate Student',
    major: 'Bioinformatics',
    skills: ['Python', 'Genomics', 'Machine Learning'],
    interests: ['Computational Biology', 'Healthcare AI'],
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    matchScore: 85,
    matchReasons: ['Cross-disciplinary interest', 'Python expertise', 'Project collaboration'],
  },
  {
    id: '5',
    name: 'David Kim',
    role: 'Senior Student',
    major: 'Software Engineering',
    skills: ['JavaScript', 'React', 'Node.js'],
    interests: ['Full-stack Development', 'Open Source'],
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
    matchScore: 82,
    matchReasons: ['Web development skills', 'Project experience', 'Mentorship potential'],
  },
];

export default function CuratedMatchesScreen() {
  const navigation = useNavigation<CuratedMatchesNavigationProp>();

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return COLORS.success;
    if (score >= 80) return COLORS.info;
    return COLORS.warning;
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Info */}
        <View style={styles.headerInfo}>
          <View style={styles.sparkleIcon}>
            <Ionicons name="sparkles" size={24} color={COLORS.secondary} />
          </View>
          <Text style={styles.headerTitle}>Your Curated Matches</Text>
          <Text style={styles.headerSubtitle}>
            Based on your skills, interests, and learning goals, we found these scholars 
            who complement your profile perfectly.
          </Text>
        </View>

        {/* Match Cards */}
        <View style={styles.matchesList}>
          {matches.map((match, index) => (
            <TouchableOpacity
              key={match.id}
              style={styles.matchCard}
              onPress={() => navigation.navigate('TutorProfile', { tutorId: match.id })}
            >
              {/* Match Score Badge */}
              <View
                style={[
                  styles.scoreBadge,
                  { backgroundColor: `${getMatchScoreColor(match.matchScore)}20` },
                ]}
              >
                <Text
                  style={[
                    styles.scoreText,
                    { color: getMatchScoreColor(match.matchScore) },
                  ]}
                >
                  {match.matchScore}% Match
                </Text>
              </View>

              {/* Profile Section */}
              <View style={styles.profileSection}>
                <Image source={{ uri: match.avatar }} style={styles.avatar} />
                <View style={styles.profileInfo}>
                  <Text style={styles.matchName}>{match.name}</Text>
                  <Text style={styles.matchRole}>{match.role}</Text>
                  <Text style={styles.matchMajor}>{match.major}</Text>
                </View>
              </View>

              {/* Skills */}
              <View style={styles.skillsSection}>
                <Text style={styles.sectionLabel}>Skills</Text>
                <View style={styles.skillTags}>
                  {match.skills.map((skill, idx) => (
                    <View key={idx} style={styles.skillTag}>
                      <Text style={styles.skillText}>{skill}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Match Reasons */}
              <View style={styles.reasonsSection}>
                <Text style={styles.sectionLabel}>Why you match</Text>
                {match.matchReasons.map((reason, idx) => (
                  <View key={idx} style={styles.reasonItem}>
                    <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
                    <Text style={styles.reasonText}>{reason}</Text>
                  </View>
                ))}
              </View>

              {/* Actions */}
              <View style={styles.actionsSection}>
                <TouchableOpacity
                  style={styles.messageButton}
                  onPress={() => navigation.navigate('Chat', {
                    recipientId: match.id,
                    recipientName: match.name,
                  })}
                >
                  <Ionicons name="chatbubble-outline" size={18} color={COLORS.primary} />
                  <Text style={styles.messageButtonText}>Message</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.connectButton}>
                  <Ionicons name="person-add-outline" size={18} color={COLORS.white} />
                  <Text style={styles.connectButtonText}>Connect</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Refresh Card */}
        <TouchableOpacity style={styles.refreshCard}>
          <Ionicons name="refresh" size={24} color={COLORS.primary} />
          <View style={styles.refreshText}>
            <Text style={styles.refreshTitle}>Want more matches?</Text>
            <Text style={styles.refreshSubtitle}>
              Update your profile to get better recommendations
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
        </TouchableOpacity>

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
  headerInfo: {
    alignItems: 'center',
    paddingHorizontal: SIZES.paddingLg,
    paddingVertical: 24,
  },
  sparkleIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: `${COLORS.secondary}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: SIZES.xl,
    ...FONTS.bold,
    color: COLORS.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: SIZES.md,
    ...FONTS.regular,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  matchesList: {
    paddingHorizontal: SIZES.padding,
  },
  matchCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.padding,
    marginBottom: 16,
    ...SHADOWS.sm,
  },
  scoreBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: SIZES.radiusFull,
    marginBottom: 12,
  },
  scoreText: {
    fontSize: SIZES.sm,
    ...FONTS.bold,
  },
  profileSection: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 16,
    marginRight: 12,
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  matchName: {
    fontSize: SIZES.lg,
    ...FONTS.bold,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  matchRole: {
    fontSize: SIZES.md,
    ...FONTS.medium,
    color: COLORS.primary,
    marginBottom: 2,
  },
  matchMajor: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textSecondary,
  },
  skillsSection: {
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: SIZES.sm,
    ...FONTS.semibold,
    color: COLORS.textSecondary,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  skillTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillTag: {
    backgroundColor: `${COLORS.primary}10`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: SIZES.radiusFull,
  },
  skillText: {
    fontSize: SIZES.sm,
    ...FONTS.medium,
    color: COLORS.primary,
  },
  reasonsSection: {
    marginBottom: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  reasonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  reasonText: {
    fontSize: SIZES.md,
    ...FONTS.regular,
    color: COLORS.textPrimary,
  },
  actionsSection: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  messageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.primary,
    gap: 6,
  },
  messageButtonText: {
    fontSize: SIZES.md,
    ...FONTS.semibold,
    color: COLORS.primary,
  },
  connectButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary,
    gap: 6,
  },
  connectButtonText: {
    fontSize: SIZES.md,
    ...FONTS.semibold,
    color: COLORS.white,
  },
  refreshCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.padding,
    borderRadius: SIZES.radiusMd,
    padding: SIZES.padding,
    ...SHADOWS.sm,
    gap: 12,
  },
  refreshText: {
    flex: 1,
  },
  refreshTitle: {
    fontSize: SIZES.md,
    ...FONTS.semibold,
    color: COLORS.textPrimary,
  },
  refreshSubtitle: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textSecondary,
  },
  bottomPadding: {
    height: 20,
  },
});
