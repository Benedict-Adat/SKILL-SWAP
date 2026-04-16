import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';

type Circle = {
  id: string;
  name: string;
  members: number;
  topic: string;
  icon: string;
};

type CircleCardProps = {
  circle: Circle;
};

export default function CircleCard({ circle }: CircleCardProps) {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.iconContainer}>
        <Ionicons name={circle.icon as any} size={24} color={COLORS.primary} />
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{circle.name}</Text>
        <Text style={styles.topic}>{circle.topic}</Text>
        <View style={styles.membersRow}>
          <Ionicons name="people" size={14} color={COLORS.gray} />
          <Text style={styles.membersText}>{circle.members} members</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.joinButton}>
        <Text style={styles.joinText}>Join</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusMd,
    padding: SIZES.padding,
    ...SHADOWS.sm,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: `${COLORS.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: SIZES.base,
    ...FONTS.semibold,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  topic: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  membersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  membersText: {
    fontSize: SIZES.sm,
    ...FONTS.medium,
    color: COLORS.gray,
  },
  joinButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
  },
  joinText: {
    fontSize: SIZES.sm,
    ...FONTS.semibold,
    color: COLORS.white,
  },
});
