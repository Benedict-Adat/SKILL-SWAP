import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';

const user = {
  name: 'Alex Johnson',
  email: 'alex.johnson@university.edu',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
  role: 'Computer Science Student',
  university: 'Stanford University',
  rating: 4.9,
  reviews: 47,
  sessionsCompleted: 82,
  skillsShared: 12,
  verified: true,
  joinedDate: 'September 2024',
};

const skills = [
  { id: '1', name: 'Machine Learning', level: 'Advanced', rating: 4.9 },
  { id: '2', name: 'Python', level: 'Expert', rating: 5.0 },
  { id: '3', name: 'Data Science', level: 'Advanced', rating: 4.8 },
  { id: '4', name: 'React Native', level: 'Intermediate', rating: 4.7 },
];

const menuSections = [
  {
    title: 'Account',
    items: [
      { id: '1', icon: 'person-outline', label: 'Edit Profile', chevron: true },
      { id: '2', icon: 'shield-checkmark-outline', label: 'Privacy & Security', chevron: true },
      { id: '3', icon: 'card-outline', label: 'Payment Methods', chevron: true },
      { id: '4', icon: 'star-outline', label: 'My Reviews', badge: '47', chevron: true },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { id: '5', icon: 'notifications-outline', label: 'Notifications', toggle: true, value: true },
      { id: '6', icon: 'moon-outline', label: 'Dark Mode', toggle: true, value: false },
      { id: '7', icon: 'globe-outline', label: 'Language', subtitle: 'English', chevron: true },
      { id: '8', icon: 'location-outline', label: 'Location Services', toggle: true, value: true },
    ],
  },
  {
    title: 'Support',
    items: [
      { id: '9', icon: 'help-circle-outline', label: 'Help Center', chevron: true },
      { id: '10', icon: 'chatbubble-outline', label: 'Contact Support', chevron: true },
      { id: '11', icon: 'document-text-outline', label: 'Terms of Service', chevron: true },
      { id: '12', icon: 'lock-closed-outline', label: 'Privacy Policy', chevron: true },
    ],
  },
];

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({
    '5': true,
    '6': false,
    '8': true,
  });

  const handleToggle = (id: string) => {
    setToggleStates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={22} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: user.avatar }} style={styles.profileImage} />
            {user.verified && (
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark" size={12} color={COLORS.white} />
              </View>
            )}
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={14} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userRole}>{user.role}</Text>
          <View style={styles.universityRow}>
            <Ionicons name="school-outline" size={14} color={COLORS.textLight} />
            <Text style={styles.universityText}>{user.university}</Text>
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.sessionsCompleted}</Text>
              <Text style={styles.statLabel}>Sessions</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <View style={styles.ratingValue}>
                <Text style={styles.statValue}>{user.rating}</Text>
                <Ionicons name="star" size={14} color={COLORS.warning} />
              </View>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.skillsShared}</Text>
              <Text style={styles.statLabel}>Skills</Text>
            </View>
          </View>
        </View>

        {/* My Skills */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Skills</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Manage</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.skillsGrid}>
            {skills.map((skill) => (
              <View key={skill.id} style={styles.skillCard}>
                <View style={styles.skillHeader}>
                  <Text style={styles.skillName}>{skill.name}</Text>
                  <View style={styles.skillRating}>
                    <Ionicons name="star" size={12} color={COLORS.warning} />
                    <Text style={styles.skillRatingText}>{skill.rating}</Text>
                  </View>
                </View>
                <Text style={styles.skillLevel}>{skill.level}</Text>
              </View>
            ))}
            <TouchableOpacity style={styles.addSkillCard}>
              <Ionicons name="add" size={24} color={COLORS.primary} />
              <Text style={styles.addSkillText}>Add Skill</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Sections */}
        {menuSections.map((section) => (
          <View key={section.title} style={styles.menuSection}>
            <Text style={styles.menuSectionTitle}>{section.title}</Text>
            <View style={styles.menuCard}>
              {section.items.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.menuItem,
                    index < section.items.length - 1 && styles.menuItemBorder,
                  ]}
                >
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuIconContainer}>
                      <Ionicons
                        name={item.icon as any}
                        size={20}
                        color={COLORS.textSecondary}
                      />
                    </View>
                    <View>
                      <Text style={styles.menuLabel}>{item.label}</Text>
                      {item.subtitle && (
                        <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                      )}
                    </View>
                  </View>
                  <View style={styles.menuItemRight}>
                    {item.badge && (
                      <View style={styles.menuBadge}>
                        <Text style={styles.menuBadgeText}>{item.badge}</Text>
                      </View>
                    )}
                    {item.toggle !== undefined ? (
                      <Switch
                        value={toggleStates[item.id]}
                        onValueChange={() => handleToggle(item.id)}
                        trackColor={{ false: COLORS.grayLight, true: `${COLORS.primary}50` }}
                        thumbColor={toggleStates[item.id] ? COLORS.primary : COLORS.white}
                      />
                    ) : item.chevron ? (
                      <Ionicons
                        name="chevron-forward"
                        size={20}
                        color={COLORS.textLight}
                      />
                    ) : null}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        {/* Version */}
        <Text style={styles.versionText}>Version 1.0.0</Text>

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
    paddingVertical: 16,
  },
  title: {
    fontSize: SIZES.xxl,
    ...FONTS.bold,
    color: COLORS.textPrimary,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  profileCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.padding,
    borderRadius: SIZES.radiusLg,
    padding: 20,
    alignItems: 'center',
    ...SHADOWS.md,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 30,
  },
  verifiedBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.success,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  userName: {
    fontSize: SIZES.xl,
    ...FONTS.bold,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  userRole: {
    fontSize: SIZES.sm,
    ...FONTS.medium,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  universityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  universityText: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textLight,
    marginLeft: 4,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    width: '100%',
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
  section: {
    marginTop: 24,
    paddingHorizontal: SIZES.padding,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: SIZES.lg,
    ...FONTS.semibold,
    color: COLORS.textPrimary,
  },
  seeAllText: {
    fontSize: SIZES.sm,
    ...FONTS.semibold,
    color: COLORS.primary,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  skillCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusMd,
    padding: 12,
    width: '48%',
    ...SHADOWS.sm,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  skillName: {
    fontSize: SIZES.sm,
    ...FONTS.semibold,
    color: COLORS.textPrimary,
    flex: 1,
  },
  skillRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  skillRatingText: {
    fontSize: SIZES.xs,
    ...FONTS.semibold,
    color: COLORS.textSecondary,
  },
  skillLevel: {
    fontSize: SIZES.xs,
    ...FONTS.medium,
    color: COLORS.primary,
  },
  addSkillCard: {
    backgroundColor: `${COLORS.primary}10`,
    borderRadius: SIZES.radiusMd,
    padding: 12,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
  },
  addSkillText: {
    fontSize: SIZES.sm,
    ...FONTS.semibold,
    color: COLORS.primary,
    marginTop: 4,
  },
  menuSection: {
    marginTop: 24,
    paddingHorizontal: SIZES.padding,
  },
  menuSectionTitle: {
    fontSize: SIZES.sm,
    ...FONTS.semibold,
    color: COLORS.textSecondary,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  menuCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusMd,
    ...SHADOWS.sm,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuLabel: {
    fontSize: SIZES.base,
    ...FONTS.medium,
    color: COLORS.textPrimary,
  },
  menuSubtitle: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textLight,
    marginTop: 1,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: SIZES.radiusFull,
  },
  menuBadgeText: {
    fontSize: SIZES.xs,
    ...FONTS.semibold,
    color: COLORS.white,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${COLORS.error}10`,
    marginHorizontal: SIZES.padding,
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: SIZES.radiusMd,
    gap: 8,
  },
  logoutText: {
    fontSize: SIZES.base,
    ...FONTS.semibold,
    color: COLORS.error,
  },
  versionText: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 16,
  },
  bottomPadding: {
    height: 100,
  },
});
