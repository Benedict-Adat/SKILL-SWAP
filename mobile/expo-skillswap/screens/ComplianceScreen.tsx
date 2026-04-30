import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';

const verificationStats = [
  { label: 'Pending', value: '23', icon: 'time-outline', color: COLORS.warning },
  { label: 'Approved', value: '156', icon: 'checkmark-circle-outline', color: COLORS.success },
  { label: 'Rejected', value: '12', icon: 'close-circle-outline', color: COLORS.error },
];

const pendingVerifications = [
  {
    id: '1',
    name: 'Julius K. Thorne',
    email: 'julius.thorne@university.edu',
    type: 'Student ID',
    submittedAt: '2 hours ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    documents: ['Student ID Card', 'Enrollment Letter'],
  },
  {
    id: '2',
    name: 'Sarah Chen',
    email: 'sarah.chen@university.edu',
    type: 'Tutor Application',
    submittedAt: '5 hours ago',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    documents: ['Resume', 'Certifications', 'References'],
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.brown@university.edu',
    type: 'Background Check',
    submittedAt: '1 day ago',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    documents: ['Background Check Form', 'ID Verification'],
  },
  {
    id: '4',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@university.edu',
    type: 'Student ID',
    submittedAt: '1 day ago',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    documents: ['Student ID Card'],
  },
];

const directoryUsers = [
  {
    id: '1',
    name: 'Dr. James Wilson',
    role: 'Verified Tutor',
    department: 'Computer Science',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
  },
  {
    id: '2',
    name: 'Prof. Sarah Miller',
    role: 'Verified Tutor',
    department: 'Mathematics',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
  },
  {
    id: '3',
    name: 'Patricia Murphy',
    role: 'Platform Staff',
    department: 'Administration',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
  },
  {
    id: '4',
    name: 'Robert Garcia',
    role: 'Verified Tutor',
    department: 'Physics',
    status: 'inactive',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
  },
];

export default function ComplianceScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'verifications' | 'directory'>('verifications');

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Compliance</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter-outline" size={22} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          {verificationStats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
                <Ionicons name={stat.icon as any} size={20} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color={COLORS.gray} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search users..."
              placeholderTextColor={COLORS.grayLight}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'verifications' && styles.tabActive]}
            onPress={() => setActiveTab('verifications')}
          >
            <Text style={[styles.tabText, activeTab === 'verifications' && styles.tabTextActive]}>
              Verifications
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'directory' && styles.tabActive]}
            onPress={() => setActiveTab('directory')}
          >
            <Text style={[styles.tabText, activeTab === 'directory' && styles.tabTextActive]}>
              Directory
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'verifications' ? (
          /* Pending Verifications */
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Pending Verifications</Text>
              <Text style={styles.sectionCount}>{pendingVerifications.length} pending</Text>
            </View>
            {pendingVerifications.map((item) => (
              <View key={item.id} style={styles.verificationCard}>
                <View style={styles.verificationHeader}>
                  <Image source={{ uri: item.avatar }} style={styles.avatar} />
                  <View style={styles.verificationInfo}>
                    <Text style={styles.userName}>{item.name}</Text>
                    <Text style={styles.userEmail}>{item.email}</Text>
                    <View style={styles.typeBadge}>
                      <Ionicons name="document-text-outline" size={12} color={COLORS.primary} />
                      <Text style={styles.typeText}>{item.type}</Text>
                    </View>
                  </View>
                  <Text style={styles.submittedTime}>{item.submittedAt}</Text>
                </View>

                <View style={styles.documentsSection}>
                  <Text style={styles.documentsLabel}>Documents:</Text>
                  <View style={styles.documentsList}>
                    {item.documents.map((doc, idx) => (
                      <View key={idx} style={styles.documentTag}>
                        <Ionicons name="attach" size={12} color={COLORS.textSecondary} />
                        <Text style={styles.documentText}>{doc}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={styles.verificationActions}>
                  <TouchableOpacity style={styles.rejectButton}>
                    <Ionicons name="close" size={18} color={COLORS.error} />
                    <Text style={styles.rejectText}>Reject</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.viewButton}>
                    <Ionicons name="eye-outline" size={18} color={COLORS.primary} />
                    <Text style={styles.viewText}>Review</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.approveButton}>
                    <Ionicons name="checkmark" size={18} color={COLORS.white} />
                    <Text style={styles.approveText}>Approve</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ) : (
          /* Directory */
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Verified Users</Text>
              <Text style={styles.sectionCount}>{directoryUsers.length} users</Text>
            </View>
            {directoryUsers.map((user) => (
              <View key={user.id} style={styles.directoryCard}>
                <Image source={{ uri: user.avatar }} style={styles.directoryAvatar} />
                <View style={styles.directoryInfo}>
                  <Text style={styles.directoryName}>{user.name}</Text>
                  <Text style={styles.directoryRole}>{user.role}</Text>
                  <Text style={styles.directoryDepartment}>{user.department}</Text>
                </View>
                <View style={styles.directoryActions}>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: user.status === 'active' ? COLORS.successLight : COLORS.grayLighter }
                  ]}>
                    <Text style={[
                      styles.statusText,
                      { color: user.status === 'active' ? COLORS.success : COLORS.gray }
                    ]}>
                      {user.status === 'active' ? 'Active' : 'Inactive'}
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.moreButton}>
                    <Ionicons name="ellipsis-vertical" size={18} color={COLORS.gray} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
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
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding,
    marginBottom: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusMd,
    padding: 12,
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: SIZES.xl,
    ...FONTS.bold,
    color: COLORS.textPrimary,
  },
  statLabel: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textSecondary,
  },
  searchContainer: {
    paddingHorizontal: SIZES.padding,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusMd,
    paddingHorizontal: 16,
    height: 44,
    ...SHADOWS.sm,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: SIZES.base,
    color: COLORS.textPrimary,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding,
    marginBottom: 16,
    gap: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tabActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  tabText: {
    fontSize: SIZES.md,
    ...FONTS.semibold,
    color: COLORS.textSecondary,
  },
  tabTextActive: {
    color: COLORS.white,
  },
  section: {
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
    ...FONTS.bold,
    color: COLORS.textPrimary,
  },
  sectionCount: {
    fontSize: SIZES.sm,
    ...FONTS.medium,
    color: COLORS.textSecondary,
  },
  verificationCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusMd,
    padding: SIZES.padding,
    marginBottom: 12,
    ...SHADOWS.sm,
  },
  verificationHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginRight: 12,
  },
  verificationInfo: {
    flex: 1,
  },
  userName: {
    fontSize: SIZES.base,
    ...FONTS.semibold,
    color: COLORS.textPrimary,
  },
  userEmail: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${COLORS.primary}10`,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: SIZES.radiusFull,
    alignSelf: 'flex-start',
    gap: 4,
  },
  typeText: {
    fontSize: SIZES.xs,
    ...FONTS.medium,
    color: COLORS.primary,
  },
  submittedTime: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textLight,
  },
  documentsSection: {
    marginBottom: 12,
  },
  documentsLabel: {
    fontSize: SIZES.sm,
    ...FONTS.medium,
    color: COLORS.textSecondary,
    marginBottom: 6,
  },
  documentsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  documentTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: SIZES.radiusSm,
    gap: 4,
  },
  documentText: {
    fontSize: SIZES.xs,
    ...FONTS.medium,
    color: COLORS.textSecondary,
  },
  verificationActions: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  rejectButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.error,
    gap: 4,
  },
  rejectText: {
    fontSize: SIZES.sm,
    ...FONTS.semibold,
    color: COLORS.error,
  },
  viewButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.primary,
    gap: 4,
  },
  viewText: {
    fontSize: SIZES.sm,
    ...FONTS.semibold,
    color: COLORS.primary,
  },
  approveButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.success,
    gap: 4,
  },
  approveText: {
    fontSize: SIZES.sm,
    ...FONTS.semibold,
    color: COLORS.white,
  },
  directoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusMd,
    padding: SIZES.padding,
    marginBottom: 12,
    ...SHADOWS.sm,
  },
  directoryAvatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginRight: 12,
  },
  directoryInfo: {
    flex: 1,
  },
  directoryName: {
    fontSize: SIZES.base,
    ...FONTS.semibold,
    color: COLORS.textPrimary,
  },
  directoryRole: {
    fontSize: SIZES.sm,
    ...FONTS.medium,
    color: COLORS.primary,
  },
  directoryDepartment: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textSecondary,
  },
  directoryActions: {
    alignItems: 'flex-end',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: SIZES.radiusFull,
  },
  statusText: {
    fontSize: SIZES.xs,
    ...FONTS.semibold,
  },
  moreButton: {
    padding: 4,
  },
  bottomPadding: {
    height: 20,
  },
});
