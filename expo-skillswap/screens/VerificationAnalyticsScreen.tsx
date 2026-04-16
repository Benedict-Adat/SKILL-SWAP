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

const overviewStats = [
  { label: 'Verification Success Rate', value: '94.2%', change: '+2.3%', positive: true },
  { label: 'Avg Processing Time', value: '2.4h', change: '-0.5h', positive: true },
  { label: 'Pending Reviews', value: '23', change: '+5', positive: false },
];

const monthlyData = [
  { month: 'Jul', verifications: 85, approved: 78, rejected: 7 },
  { month: 'Aug', verifications: 92, approved: 86, rejected: 6 },
  { month: 'Sep', verifications: 78, approved: 72, rejected: 6 },
  { month: 'Oct', verifications: 110, approved: 102, rejected: 8 },
  { month: 'Nov', verifications: 125, approved: 118, rejected: 7 },
  { month: 'Dec', verifications: 98, approved: 93, rejected: 5 },
];

const verificationTypes = [
  { type: 'Student ID', count: 245, percentage: 45 },
  { type: 'Tutor Application', count: 156, percentage: 28 },
  { type: 'Background Check', count: 89, percentage: 16 },
  { type: 'Other', count: 62, percentage: 11 },
];

const recentActivity = [
  { id: '1', action: 'Student ID verified', user: 'Julius Thorne', time: '5 min ago', status: 'approved' },
  { id: '2', action: 'Tutor application reviewed', user: 'Sarah Chen', time: '15 min ago', status: 'approved' },
  { id: '3', action: 'Background check completed', user: 'Michael Brown', time: '32 min ago', status: 'approved' },
  { id: '4', action: 'Document rejected', user: 'Anonymous User', time: '1 hour ago', status: 'rejected' },
  { id: '5', action: 'Student ID verified', user: 'Emily Rodriguez', time: '2 hours ago', status: 'approved' },
];

export default function VerificationAnalyticsScreen() {
  const maxVerifications = Math.max(...monthlyData.map(d => d.verifications));

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Verification Analytics</Text>
          <TouchableOpacity style={styles.exportButton}>
            <Ionicons name="download-outline" size={20} color={COLORS.primary} />
            <Text style={styles.exportText}>Export</Text>
          </TouchableOpacity>
        </View>

        {/* Overview Stats */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.statsContainer}
        >
          {overviewStats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
              <View style={styles.statChange}>
                <Ionicons
                  name={stat.positive ? 'trending-up' : 'trending-down'}
                  size={14}
                  color={stat.positive ? COLORS.success : COLORS.error}
                />
                <Text style={[
                  styles.statChangeText,
                  { color: stat.positive ? COLORS.success : COLORS.error }
                ]}>
                  {stat.change}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Monthly Chart */}
        <View style={styles.chartSection}>
          <View style={styles.chartHeader}>
            <Text style={styles.sectionTitle}>Monthly Verifications</Text>
            <View style={styles.legendContainer}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: COLORS.primary }]} />
                <Text style={styles.legendText}>Approved</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: COLORS.error }]} />
                <Text style={styles.legendText}>Rejected</Text>
              </View>
            </View>
          </View>

          <View style={styles.chartContainer}>
            {monthlyData.map((item, index) => (
              <View key={index} style={styles.barGroup}>
                <View style={styles.barStack}>
                  <View
                    style={[
                      styles.barApproved,
                      { height: (item.approved / maxVerifications) * 120 },
                    ]}
                  />
                  <View
                    style={[
                      styles.barRejected,
                      { height: (item.rejected / maxVerifications) * 120 },
                    ]}
                  />
                </View>
                <Text style={styles.barLabel}>{item.month}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Verification Types */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Verification Types</Text>
          <View style={styles.typesCard}>
            {verificationTypes.map((item, index) => (
              <View key={index} style={styles.typeItem}>
                <View style={styles.typeInfo}>
                  <Text style={styles.typeName}>{item.type}</Text>
                  <Text style={styles.typeCount}>{item.count} verifications</Text>
                </View>
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${item.percentage}%` }]} />
                  </View>
                  <Text style={styles.percentageText}>{item.percentage}%</Text>
                </View>
              </View>
            ))}
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
          <View style={styles.activityCard}>
            {recentActivity.map((activity, index) => (
              <View
                key={activity.id}
                style={[
                  styles.activityItem,
                  index < recentActivity.length - 1 && styles.activityItemBorder,
                ]}
              >
                <View style={[
                  styles.activityIcon,
                  { backgroundColor: activity.status === 'approved' ? COLORS.successLight : COLORS.errorLight }
                ]}>
                  <Ionicons
                    name={activity.status === 'approved' ? 'checkmark' : 'close'}
                    size={16}
                    color={activity.status === 'approved' ? COLORS.success : COLORS.error}
                  />
                </View>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityAction}>{activity.action}</Text>
                  <Text style={styles.activityUser}>by {activity.user}</Text>
                </View>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Insights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Insights</Text>
          <View style={styles.insightsGrid}>
            <View style={styles.insightCard}>
              <Ionicons name="flash" size={24} color={COLORS.warning} />
              <Text style={styles.insightValue}>12</Text>
              <Text style={styles.insightLabel}>Awaiting Review</Text>
            </View>
            <View style={styles.insightCard}>
              <Ionicons name="time" size={24} color={COLORS.info} />
              <Text style={styles.insightValue}>48h</Text>
              <Text style={styles.insightLabel}>SLA Deadline</Text>
            </View>
            <View style={styles.insightCard}>
              <Ionicons name="shield-checkmark" size={24} color={COLORS.success} />
              <Text style={styles.insightValue}>99.1%</Text>
              <Text style={styles.insightLabel}>Compliance</Text>
            </View>
            <View style={styles.insightCard}>
              <Ionicons name="alert-circle" size={24} color={COLORS.error} />
              <Text style={styles.insightValue}>3</Text>
              <Text style={styles.insightLabel}>Flagged</Text>
            </View>
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
  title: {
    fontSize: SIZES.xxl,
    ...FONTS.bold,
    color: COLORS.textPrimary,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: SIZES.radius,
    gap: 6,
    ...SHADOWS.sm,
  },
  exportText: {
    fontSize: SIZES.sm,
    ...FONTS.semibold,
    color: COLORS.primary,
  },
  statsContainer: {
    paddingHorizontal: SIZES.padding,
    paddingBottom: 8,
    gap: 12,
  },
  statCard: {
    width: 160,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusMd,
    padding: SIZES.padding,
    ...SHADOWS.sm,
  },
  statLabel: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  statValue: {
    fontSize: SIZES.xxl,
    ...FONTS.bold,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  statChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statChangeText: {
    fontSize: SIZES.sm,
    ...FONTS.medium,
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
  sectionTitle: {
    fontSize: SIZES.lg,
    ...FONTS.bold,
    color: COLORS.textPrimary,
  },
  legendContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textSecondary,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 150,
  },
  barGroup: {
    alignItems: 'center',
    flex: 1,
  },
  barStack: {
    justifyContent: 'flex-end',
    height: 120,
  },
  barApproved: {
    width: 24,
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  barRejected: {
    width: 24,
    backgroundColor: COLORS.error,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  barLabel: {
    fontSize: SIZES.xs,
    ...FONTS.medium,
    color: COLORS.textSecondary,
    marginTop: 8,
  },
  section: {
    paddingHorizontal: SIZES.padding,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: SIZES.md,
    ...FONTS.medium,
    color: COLORS.primary,
  },
  typesCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusMd,
    padding: SIZES.padding,
    ...SHADOWS.sm,
  },
  typeItem: {
    marginBottom: 16,
  },
  typeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  typeName: {
    fontSize: SIZES.md,
    ...FONTS.medium,
    color: COLORS.textPrimary,
  },
  typeCount: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textSecondary,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.grayLighter,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  percentageText: {
    fontSize: SIZES.sm,
    ...FONTS.semibold,
    color: COLORS.textPrimary,
    width: 40,
    textAlign: 'right',
  },
  activityCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusMd,
    ...SHADOWS.sm,
    overflow: 'hidden',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.padding,
  },
  activityItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityInfo: {
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
  insightsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  insightCard: {
    width: (width - SIZES.padding * 2 - 12) / 2,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusMd,
    padding: SIZES.padding,
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  insightValue: {
    fontSize: SIZES.xl,
    ...FONTS.bold,
    color: COLORS.textPrimary,
    marginTop: 8,
  },
  insightLabel: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  bottomPadding: {
    height: 20,
  },
});
