import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';

const platformSettings = [
  {
    id: 'registration',
    title: 'User Registration',
    description: 'Allow new users to register on the platform',
    icon: 'person-add-outline',
    enabled: true,
  },
  {
    id: 'matching',
    title: 'AI Matching',
    description: 'Enable AI-powered scholar matching',
    icon: 'sparkles-outline',
    enabled: true,
  },
  {
    id: 'messaging',
    title: 'Direct Messaging',
    description: 'Allow users to send direct messages',
    icon: 'chatbubble-outline',
    enabled: true,
  },
  {
    id: 'booking',
    title: 'Session Booking',
    description: 'Enable session booking functionality',
    icon: 'calendar-outline',
    enabled: true,
  },
  {
    id: 'payments',
    title: 'Payment Processing',
    description: 'Process payments for tutoring sessions',
    icon: 'card-outline',
    enabled: false,
  },
  {
    id: 'notifications',
    title: 'Push Notifications',
    description: 'Send push notifications to users',
    icon: 'notifications-outline',
    enabled: true,
  },
];

const quickActions = [
  { id: 'broadcast', title: 'Send Broadcast', icon: 'megaphone-outline', color: COLORS.info },
  { id: 'export', title: 'Export Data', icon: 'download-outline', color: COLORS.success },
  { id: 'backup', title: 'Backup DB', icon: 'cloud-upload-outline', color: COLORS.warning },
  { id: 'maintenance', title: 'Maintenance', icon: 'construct-outline', color: COLORS.error },
];

const systemHealth = [
  { label: 'Server Status', status: 'Operational', icon: 'server-outline', healthy: true },
  { label: 'Database', status: 'Connected', icon: 'cube-outline', healthy: true },
  { label: 'API Gateway', status: 'Operational', icon: 'git-network-outline', healthy: true },
  { label: 'CDN', status: 'Active', icon: 'globe-outline', healthy: true },
];

export default function PlatformControlsScreen() {
  const [settings, setSettings] = useState(platformSettings);

  const toggleSetting = (id: string) => {
    setSettings(prev =>
      prev.map(setting =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Platform Controls</Text>
          <TouchableOpacity style={styles.refreshButton}>
            <Ionicons name="refresh-outline" size={22} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* System Health */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>System Health</Text>
          <View style={styles.healthGrid}>
            {systemHealth.map((item, index) => (
              <View key={index} style={styles.healthCard}>
                <View style={[styles.healthIcon, { backgroundColor: item.healthy ? COLORS.successLight : COLORS.errorLight }]}>
                  <Ionicons
                    name={item.icon as any}
                    size={20}
                    color={item.healthy ? COLORS.success : COLORS.error}
                  />
                </View>
                <Text style={styles.healthLabel}>{item.label}</Text>
                <View style={styles.healthStatus}>
                  <View style={[styles.statusDot, { backgroundColor: item.healthy ? COLORS.success : COLORS.error }]} />
                  <Text style={[styles.statusText, { color: item.healthy ? COLORS.success : COLORS.error }]}>
                    {item.status}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity key={action.id} style={styles.actionCard}>
                <View style={[styles.actionIcon, { backgroundColor: `${action.color}20` }]}>
                  <Ionicons name={action.icon as any} size={24} color={action.color} />
                </View>
                <Text style={styles.actionTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Platform Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Platform Settings</Text>
          <View style={styles.settingsCard}>
            {settings.map((setting, index) => (
              <View
                key={setting.id}
                style={[
                  styles.settingItem,
                  index < settings.length - 1 && styles.settingItemBorder,
                ]}
              >
                <View style={styles.settingIcon}>
                  <Ionicons name={setting.icon as any} size={22} color={COLORS.primary} />
                </View>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>{setting.title}</Text>
                  <Text style={styles.settingDescription}>{setting.description}</Text>
                </View>
                <Switch
                  value={setting.enabled}
                  onValueChange={() => toggleSetting(setting.id)}
                  trackColor={{ false: COLORS.grayLighter, true: `${COLORS.primary}50` }}
                  thumbColor={setting.enabled ? COLORS.primary : COLORS.gray}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: COLORS.error }]}>Danger Zone</Text>
          <View style={styles.dangerCard}>
            <TouchableOpacity style={styles.dangerButton}>
              <Ionicons name="pause-circle-outline" size={22} color={COLORS.warning} />
              <Text style={[styles.dangerButtonText, { color: COLORS.warning }]}>
                Pause Platform
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dangerButton}>
              <Ionicons name="trash-outline" size={22} color={COLORS.error} />
              <Text style={[styles.dangerButtonText, { color: COLORS.error }]}>
                Clear Cache
              </Text>
            </TouchableOpacity>
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
  refreshButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  section: {
    paddingHorizontal: SIZES.padding,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: SIZES.lg,
    ...FONTS.bold,
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  healthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  healthCard: {
    width: '47%',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusMd,
    padding: 12,
    ...SHADOWS.sm,
  },
  healthIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  healthLabel: {
    fontSize: SIZES.sm,
    ...FONTS.medium,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  healthStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: SIZES.sm,
    ...FONTS.semibold,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: '47%',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusMd,
    padding: SIZES.padding,
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: SIZES.md,
    ...FONTS.semibold,
    color: COLORS.textPrimary,
  },
  settingsCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusLg,
    ...SHADOWS.sm,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.padding,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: `${COLORS.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: SIZES.base,
    ...FONTS.semibold,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textSecondary,
  },
  dangerCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusMd,
    borderWidth: 1,
    borderColor: COLORS.errorLight,
    overflow: 'hidden',
    ...SHADOWS.sm,
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.padding,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  dangerButtonText: {
    fontSize: SIZES.base,
    ...FONTS.semibold,
  },
  bottomPadding: {
    height: 20,
  },
});
