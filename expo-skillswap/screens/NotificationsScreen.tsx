import React, { useState } from 'react';
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
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';

type NotificationType = 'match' | 'message' | 'session' | 'review' | 'reminder' | 'achievement';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  read: boolean;
  avatar?: string;
  actionable?: boolean;
}

const notifications: Notification[] = [
  {
    id: '1',
    type: 'match',
    title: 'New Match!',
    description: 'You matched with Sarah Chen based on your Machine Learning interest.',
    time: '5 mins ago',
    read: false,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    actionable: true,
  },
  {
    id: '2',
    type: 'session',
    title: 'Session Reminder',
    description: 'Your session with Dr. Victor starts in 30 minutes.',
    time: '25 mins ago',
    read: false,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    actionable: true,
  },
  {
    id: '3',
    type: 'review',
    title: 'New Review',
    description: 'Michael left you a 5-star review for your Python tutoring.',
    time: '1 hour ago',
    read: false,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
  },
  {
    id: '4',
    type: 'achievement',
    title: 'Achievement Unlocked!',
    description: 'You completed 10 skill swap sessions. Keep it up!',
    time: '2 hours ago',
    read: true,
  },
  {
    id: '5',
    type: 'message',
    title: 'New Message',
    description: 'Prof. Emily sent you a message about the research project.',
    time: '3 hours ago',
    read: true,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
  },
  {
    id: '6',
    type: 'match',
    title: 'Match Request',
    description: 'David Kim wants to exchange skills with you.',
    time: 'Yesterday',
    read: true,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
    actionable: true,
  },
  {
    id: '7',
    type: 'reminder',
    title: 'Complete Your Profile',
    description: 'Add more skills to get better matches.',
    time: 'Yesterday',
    read: true,
  },
];

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'match':
      return { name: 'heart', color: COLORS.error };
    case 'message':
      return { name: 'chatbubble-ellipses', color: COLORS.primary };
    case 'session':
      return { name: 'calendar', color: COLORS.secondary };
    case 'review':
      return { name: 'star', color: COLORS.warning };
    case 'reminder':
      return { name: 'notifications', color: COLORS.info };
    case 'achievement':
      return { name: 'trophy', color: COLORS.success };
    default:
      return { name: 'notifications', color: COLORS.primary };
  }
};

export default function NotificationsScreen() {
  const navigation = useNavigation();
  const [notificationsList, setNotificationsList] = useState(notifications);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['All', 'Unread', 'Matches', 'Sessions'];

  const markAllAsRead = () => {
    setNotificationsList(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotificationsList(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const unreadCount = notificationsList.filter(n => !n.read).length;

  const filteredNotifications = notificationsList.filter(n => {
    if (selectedFilter === 'Unread') return !n.read;
    if (selectedFilter === 'Matches') return n.type === 'match';
    if (selectedFilter === 'Sessions') return n.type === 'session';
    return true;
  });

  const todayNotifications = filteredNotifications.filter(n =>
    n.time.includes('mins') || n.time.includes('hour')
  );
  const earlierNotifications = filteredNotifications.filter(n =>
    !n.time.includes('mins') && !n.time.includes('hour')
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Notifications</Text>
          {unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          style={styles.markAllButton}
          onPress={markAllAsRead}
        >
          <Text style={styles.markAllText}>Mark all read</Text>
        </TouchableOpacity>
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

      {/* Notifications List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.notificationsList}
      >
        {todayNotifications.length > 0 && (
          <>
            <Text style={styles.sectionLabel}>Today</Text>
            {todayNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onPress={() => markAsRead(notification.id)}
              />
            ))}
          </>
        )}

        {earlierNotifications.length > 0 && (
          <>
            <Text style={[styles.sectionLabel, { marginTop: 20 }]}>Earlier</Text>
            {earlierNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onPress={() => markAsRead(notification.id)}
              />
            ))}
          </>
        )}

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

function NotificationCard({
  notification,
  onPress,
}: {
  notification: Notification;
  onPress: () => void;
}) {
  const icon = getNotificationIcon(notification.type);

  return (
    <TouchableOpacity
      style={[
        styles.notificationCard,
        !notification.read && styles.notificationCardUnread,
      ]}
      onPress={onPress}
    >
      <View style={styles.notificationLeft}>
        {notification.avatar ? (
          <View style={styles.avatarContainer}>
            <Image source={{ uri: notification.avatar }} style={styles.avatar} />
            <View style={[styles.typeIndicator, { backgroundColor: icon.color }]}>
              <Ionicons name={icon.name as any} size={10} color={COLORS.white} />
            </View>
          </View>
        ) : (
          <View style={[styles.iconContainer, { backgroundColor: `${icon.color}15` }]}>
            <Ionicons name={icon.name as any} size={22} color={icon.color} />
          </View>
        )}
      </View>

      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle} numberOfLines={1}>
            {notification.title}
          </Text>
          <Text style={styles.notificationTime}>{notification.time}</Text>
        </View>
        <Text style={styles.notificationDescription} numberOfLines={2}>
          {notification.description}
        </Text>

        {notification.actionable && (
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.acceptButton}>
              <Text style={styles.acceptButtonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.declineButton}>
              <Text style={styles.declineButtonText}>Decline</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {!notification.read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: SIZES.xxl,
    ...FONTS.bold,
    color: COLORS.textPrimary,
  },
  unreadBadge: {
    backgroundColor: COLORS.error,
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    paddingHorizontal: 6,
  },
  unreadBadgeText: {
    fontSize: SIZES.sm,
    ...FONTS.bold,
    color: COLORS.white,
  },
  markAllButton: {
    padding: 8,
  },
  markAllText: {
    fontSize: SIZES.sm,
    ...FONTS.semibold,
    color: COLORS.primary,
  },
  filtersContainer: {
    paddingHorizontal: SIZES.padding,
    paddingBottom: 16,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
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
  notificationsList: {
    paddingHorizontal: SIZES.padding,
  },
  sectionLabel: {
    fontSize: SIZES.sm,
    ...FONTS.semibold,
    color: COLORS.textSecondary,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusMd,
    padding: 14,
    marginBottom: 8,
    ...SHADOWS.sm,
    position: 'relative',
  },
  notificationCardUnread: {
    backgroundColor: `${COLORS.primary}08`,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
  },
  notificationLeft: {
    marginRight: 12,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 14,
  },
  typeIndicator: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: SIZES.base,
    ...FONTS.semibold,
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  notificationTime: {
    fontSize: SIZES.xs,
    ...FONTS.regular,
    color: COLORS.textLight,
  },
  notificationDescription: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 8,
  },
  acceptButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: SIZES.radiusFull,
  },
  acceptButtonText: {
    fontSize: SIZES.sm,
    ...FONTS.semibold,
    color: COLORS.white,
  },
  declineButton: {
    backgroundColor: COLORS.grayLight,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: SIZES.radiusFull,
  },
  declineButtonText: {
    fontSize: SIZES.sm,
    ...FONTS.semibold,
    color: COLORS.textSecondary,
  },
  unreadDot: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  bottomPadding: {
    height: 20,
  },
});
