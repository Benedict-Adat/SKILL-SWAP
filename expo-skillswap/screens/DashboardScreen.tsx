import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';

const { width } = Dimensions.get('window');

const statsData = [
  { label: 'Total Users', value: '12,843', icon: 'people', color: COLORS.primary, change: '+12%' },
  { label: 'Active Sessions', value: '3,120', icon: 'pulse', color: COLORS.success, change: '+8%' },
  { label: 'Avg Rating', value: '4.8', icon: 'star', color: COLORS.warning, change: '+0.2' },
  { label: 'Completion', value: '89%', icon: 'checkmark-circle', color: COLORS.info, change: '+5%' },
];

const chartData = [
  { month: 'Jan', value: 65 },
  { month: 'Feb', value: 75 },
  { month: 'Mar', value: 85 },
  { month: 'Apr', value: 70 },
  { month: 'May', value: 90 },
  { month: 'Jun', value: 95 },
];

const recentActivities = [
  { id: '1', action: 'New session booked', user: 'Sarah M.', time: '5 min ago', icon: 'calendar' },
  { id: '2', action: 'Review submitted', user: 'John D.', time: '12 min ago', icon: 'star' },
  { id: '3', action: 'Profile updated', user: 'Emily R.', time: '25 min ago', icon: 'person' },
  { id: '4', action: 'New message', user: 'Mike K.', time: '1 hour ago', icon: 'chatbubble' },
];

const topTutors = [
  { id: '1', name: 'Dr. James Wilson', sessions: 156, rating: 4.9, subject: 'Mathematics' },
  { id: '2', name: 'Prof. Sarah Chen', sessions: 142, rating: 4.8, subject: 'Physics' },
  { id: '3', name: 'Dr. Michael Brown', sessions: 128, rating: 4.9, subject: 'Computer Science' },
];

export default function DashboardScreen() {
  const maxChartValue = Math.max(...chartData.map(d => d.value));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning!</Text>
            <Text style={styles.title}>Dashboard</Text>
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={20} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.statsContainer}
        >
          {statsData.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={[styles.statIconWrapper, { backgroundColor: `${stat.color}20` }]}>
                <Ionicons name={stat.icon as any} size={20} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <View style={styles.statChange}>
                <Ionicons name="trending-up" size={14} color={COLORS.success} />
                <Text style={styles.statChangeText}>{stat.change}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Chart Section */}
        <View style={styles.chartSection}>
          <View style={styles.chartHeader}>
            <Text style={styles.sectionTitle}>Session Analytics</Text>
            <View style={styles.periodSelector}>
              <TouchableOpacity style={[styles.periodButton, styles.periodButtonActive]}>
                <Text style={styles.periodButtonTextActive}>6M</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.periodButton}>
                <Text style={styles.periodButtonText}>1Y</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.periodButton}>
                <Text style={styles.periodButtonText}>All</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Bar Chart */}
          <View style={styles.chartContainer}>
            <View style={styles.chartBars}>
              {chartData.map((item, index) => (
                <View key={index} style={styles.barContainer}>
                  <View style={styles.barWrapper}>
                    <View
                      style={[
                        styles.bar,
                        { height: (item.value / maxChartValue) * 120 },
                      ]}
                    />
                  </View>
                  <Text style={styles.barLabel}>{item.month}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.activityList}>
            {recentActivities.map((activity) => (
              <View key={activity.id} style={styles.activityItem}>
                <View style={styles.activityIcon}>
                  <Ionicons name={activity.icon as any} size={18} color={COLORS.primary} />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityAction}>{activity.action}</Text>
                  <Text style={styles.activityUser}>by {activity.user}</Text>
                </View>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Top Tutors */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Tutors</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tutorsList}>
            {topTutors.map((tutor, index) => (
              <View key={tutor.id} style={styles.tutorItem}>
                <View style={styles.tutorRank}>
                  <Text style={styles.tutorRankText}>#{index + 1}</Text>
                </View>
                <View style={styles.tutorInfo}>
                  <Text style={styles.tutorName}>{tutor.name}</Text>
                  <Text style={styles.tutorSubject}>{tutor.subject}</Text>
                </View>
                <View style={styles.tutorStats}>
                  <View style={styles.tutorStat}>
                    <Ionicons name="videocam" size={14} color={COLORS.gray} />
                    <Text style={styles.tutorStatText}>{tutor.sessions}</Text>
                  </View>
                  <View style={styles.tutorStat}>
                    <Ionicons name="star" size={14} color={COLORS.warning} />
                    <Text style={styles.tutorStatText}>{tutor.rating}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
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
  greeting: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textSecondary,
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
    paddingHorizontal: SIZES.padding,
    paddingBottom: 8,
    gap: 12,
  },
  statCard: {
    width: 140,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusMd,
    padding: SIZES.padding,
    ...SHADOWS.sm,
  },
  statIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: SIZES.xl,
    ...FONTS.bold,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  statChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statChangeText: {
    fontSize: SIZES.xs,
    ...FONTS.medium,
    color: COLORS.success,
  },
  chartSection: {
    backgroundColor: COLORS.white,
    margin: SIZES.padding,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.padding,
    ...SHADOWS.sm,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radius,
    padding: 4,
  },
  periodButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  periodButtonActive: {
    backgroundColor: COLORS.primary,
  },
  periodButtonText: {
    fontSize: SIZES.sm,
    ...FONTS.medium,
    color: COLORS.textSecondary,
  },
  periodButtonTextActive: {
    fontSize: SIZES.sm,
    ...FONTS.medium,
    color: COLORS.white,
  },
  chartContainer: {
    height: 160,
  },
  chartBars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 140,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  barWrapper: {
    height: 120,
    justifyContent: 'flex-end',
  },
  bar: {
    width: 32,
    backgroundColor: COLORS.primary,
    borderRadius: 6,
    minHeight: 20,
  },
  barLabel: {
    fontSize: SIZES.xs,
    ...FONTS.medium,
    color: COLORS.textSecondary,
    marginTop: 8,
  },
  section: {
    paddingHorizontal: SIZES.padding,
    marginBottom: SIZES.marginLg,
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
  seeAllText: {
    fontSize: SIZES.md,
    ...FONTS.medium,
    color: COLORS.primary,
  },
  activityList: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusMd,
    ...SHADOWS.sm,
    overflow: 'hidden',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: `${COLORS.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityAction: {
    fontSize: SIZES.md,
    ...FONTS.medium,
    color: COLORS.textPrimary,
  },
  activityUser: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textSecondary,
  },
  activityTime: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textLight,
  },
  tutorsList: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusMd,
    ...SHADOWS.sm,
    overflow: 'hidden',
  },
  tutorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tutorRank: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tutorRankText: {
    fontSize: SIZES.sm,
    ...FONTS.bold,
    color: COLORS.white,
  },
  tutorInfo: {
    flex: 1,
  },
  tutorName: {
    fontSize: SIZES.md,
    ...FONTS.semibold,
    color: COLORS.textPrimary,
  },
  tutorSubject: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textSecondary,
  },
  tutorStats: {
    flexDirection: 'row',
    gap: 12,
  },
  tutorStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tutorStatText: {
    fontSize: SIZES.sm,
    ...FONTS.medium,
    color: COLORS.textSecondary,
  },
  bottomPadding: {
    height: 20,
  },
});
