import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';

type Scholar = {
  id: string;
  name: string;
  role: string;
  skills: string[];
  avatar: string;
  rating: number;
  matchScore?: number;
};

type ScholarCardProps = {
  scholar: Scholar;
  onPress: () => void;
};

export default function ScholarCard({ scholar, onPress }: ScholarCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: scholar.avatar }} style={styles.avatar} />
        {scholar.matchScore && (
          <View style={styles.matchBadge}>
            <Text style={styles.matchText}>{scholar.matchScore}%</Text>
          </View>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{scholar.name}</Text>
        <Text style={styles.role} numberOfLines={1}>{scholar.role}</Text>
        <View style={styles.skillsContainer}>
          {scholar.skills.slice(0, 2).map((skill, index) => (
            <View key={index} style={styles.skillTag}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>
        <View style={styles.footer}>
          <View style={styles.rating}>
            <Ionicons name="star" size={12} color={COLORS.warning} />
            <Text style={styles.ratingText}>{scholar.rating}</Text>
          </View>
          <TouchableOpacity style={styles.connectButton}>
            <Text style={styles.connectText}>Connect</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 160,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusMd,
    overflow: 'hidden',
    ...SHADOWS.sm,
  },
  avatarContainer: {
    position: 'relative',
    alignItems: 'center',
    paddingTop: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  matchBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: COLORS.success,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: SIZES.radiusFull,
  },
  matchText: {
    fontSize: SIZES.xs,
    ...FONTS.bold,
    color: COLORS.white,
  },
  content: {
    padding: 12,
    alignItems: 'center',
  },
  name: {
    fontSize: SIZES.md,
    ...FONTS.semibold,
    color: COLORS.textPrimary,
    marginBottom: 2,
    textAlign: 'center',
  },
  role: {
    fontSize: SIZES.xs,
    ...FONTS.regular,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 4,
    marginBottom: 12,
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
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  rating: {
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
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: SIZES.radius,
  },
  connectText: {
    fontSize: SIZES.xs,
    ...FONTS.semibold,
    color: COLORS.white,
  },
});
