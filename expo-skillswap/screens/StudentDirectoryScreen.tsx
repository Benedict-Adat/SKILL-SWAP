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

const filters = ['All Students', 'Online Now', 'Top Rated', 'New Members'];

const students = [
  {
    id: '1',
    name: 'Julius K. Thorne',
    major: 'Computer Science',
    year: 'Graduate',
    skills: ['Python', 'Machine Learning'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    online: true,
    rating: 4.9,
  },
  {
    id: '2',
    name: 'Sarah Chen',
    major: 'Data Science',
    year: 'Senior',
    skills: ['R', 'Statistics', 'SQL'],
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    online: true,
    rating: 4.8,
  },
  {
    id: '3',
    name: 'Michael Brown',
    major: 'Physics',
    year: 'Junior',
    skills: ['Quantum Mechanics', 'Mathematics'],
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    online: false,
    rating: 4.7,
  },
  {
    id: '4',
    name: 'Emily Rodriguez',
    major: 'Biology',
    year: 'Senior',
    skills: ['Genetics', 'Lab Research'],
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    online: true,
    rating: 4.9,
  },
  {
    id: '5',
    name: 'David Kim',
    major: 'Engineering',
    year: 'Graduate',
    skills: ['CAD', 'Robotics'],
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
    online: false,
    rating: 4.6,
  },
  {
    id: '6',
    name: 'Lisa Johnson',
    major: 'Psychology',
    year: 'Senior',
    skills: ['Research Methods', 'Statistics'],
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
    online: true,
    rating: 4.8,
  },
];

const directoryInsights = [
  { label: 'Total Students', value: '2,847', icon: 'people' },
  { label: 'Online Now', value: '489', icon: 'ellipse' },
  { label: 'Avg. Rating', value: '4.7', icon: 'star' },
];

export default function StudentDirectoryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All Students');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Student Directory</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={20} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={COLORS.gray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search students, skills..."
            placeholderTextColor={COLORS.grayLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Insights */}
        <View style={styles.insightsContainer}>
          {directoryInsights.map((insight, index) => (
            <View key={index} style={styles.insightCard}>
              <View style={styles.insightIcon}>
                <Ionicons
                  name={insight.icon as any}
                  size={16}
                  color={insight.icon === 'ellipse' ? COLORS.success : COLORS.primary}
                />
              </View>
              <Text style={styles.insightValue}>{insight.value}</Text>
              <Text style={styles.insightLabel}>{insight.label}</Text>
            </View>
          ))}
        </View>

        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterChip,
                selectedFilter === filter && styles.filterChipActive,
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter && styles.filterTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Students List */}
        <View style={styles.listSection}>
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>Browse Students</Text>
            <Text style={styles.listCount}>{students.length} results</Text>
          </View>

          {students.map((student) => (
            <TouchableOpacity key={student.id} style={styles.studentCard}>
              <View style={styles.avatarContainer}>
                <Image source={{ uri: student.avatar }} style={styles.studentAvatar} />
                {student.online && <View style={styles.onlineIndicator} />}
              </View>
              <View style={styles.studentInfo}>
                <Text style={styles.studentName}>{student.name}</Text>
                <Text style={styles.studentMajor}>{student.major} - {student.year}</Text>
                <View style={styles.skillsRow}>
                  {student.skills.slice(0, 2).map((skill, index) => (
                    <View key={index} style={styles.skillTag}>
                      <Text style={styles.skillText}>{skill}</Text>
                    </View>
                  ))}
                  {student.skills.length > 2 && (
                    <Text style={styles.moreSkills}>+{student.skills.length - 2}</Text>
                  )}
                </View>
              </View>
              <View style={styles.studentActions}>
                <View style={styles.ratingBadge}>
                  <Ionicons name="star" size={12} color={COLORS.warning} />
                  <Text style={styles.ratingText}>{student.rating}</Text>
                </View>
                <TouchableOpacity style={styles.connectButton}>
                  <Text style={styles.connectText}>Connect</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
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
    height: 48,
    ...SHADOWS.sm,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: SIZES.base,
    color: COLORS.textPrimary,
  },
  insightsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding,
    marginBottom: 16,
    gap: 12,
  },
  insightCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusMd,
    padding: 12,
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  insightIcon: {
    marginBottom: 8,
  },
  insightValue: {
    fontSize: SIZES.lg,
    ...FONTS.bold,
    color: COLORS.textPrimary,
  },
  insightLabel: {
    fontSize: SIZES.xs,
    ...FONTS.regular,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  filtersContainer: {
    paddingHorizontal: SIZES.padding,
    paddingBottom: 16,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: SIZES.radiusFull,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    fontSize: SIZES.sm,
    ...FONTS.medium,
    color: COLORS.textSecondary,
  },
  filterTextActive: {
    color: COLORS.white,
  },
  listSection: {
    paddingHorizontal: SIZES.padding,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  listTitle: {
    fontSize: SIZES.lg,
    ...FONTS.bold,
    color: COLORS.textPrimary,
  },
  listCount: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textSecondary,
  },
  studentCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusMd,
    padding: SIZES.padding,
    marginBottom: 12,
    ...SHADOWS.sm,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  studentAvatar: {
    width: 56,
    height: 56,
    borderRadius: 14,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.success,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  studentInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  studentName: {
    fontSize: SIZES.base,
    ...FONTS.semibold,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  studentMajor: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textSecondary,
    marginBottom: 6,
  },
  skillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  skillTag: {
    backgroundColor: `${COLORS.primary}10`,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: SIZES.radiusFull,
  },
  skillText: {
    fontSize: SIZES.xs,
    ...FONTS.medium,
    color: COLORS.primary,
  },
  moreSkills: {
    fontSize: SIZES.xs,
    ...FONTS.medium,
    color: COLORS.textSecondary,
  },
  studentActions: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: SIZES.sm,
    ...FONTS.semibold,
    color: COLORS.textPrimary,
  },
  connectButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: SIZES.radius,
  },
  connectText: {
    fontSize: SIZES.sm,
    ...FONTS.semibold,
    color: COLORS.white,
  },
  bottomPadding: {
    height: 20,
  },
});
