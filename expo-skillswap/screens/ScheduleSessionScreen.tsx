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

const mentor = {
  id: '1',
  name: 'Dr. Victor Ibeneese',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
  skill: 'Machine Learning',
  rate: 'Free (Skill Exchange)',
  rating: 4.9,
};

const timeSlots = [
  { id: '1', time: '9:00 AM', available: true },
  { id: '2', time: '10:00 AM', available: true },
  { id: '3', time: '11:00 AM', available: false },
  { id: '4', time: '12:00 PM', available: true },
  { id: '5', time: '1:00 PM', available: false },
  { id: '6', time: '2:00 PM', available: true },
  { id: '7', time: '3:00 PM', available: true },
  { id: '8', time: '4:00 PM', available: true },
  { id: '9', time: '5:00 PM', available: false },
];

const durations = [
  { id: '1', label: '30 min', value: 30 },
  { id: '2', label: '1 hour', value: 60 },
  { id: '3', label: '1.5 hours', value: 90 },
  { id: '4', label: '2 hours', value: 120 },
];

const sessionTypes = [
  { id: '1', label: 'Video Call', icon: 'videocam', description: 'Face-to-face virtual session' },
  { id: '2', label: 'Voice Call', icon: 'call', description: 'Audio-only conversation' },
  { id: '3', label: 'In Person', icon: 'person', description: 'Meet at agreed location' },
];

export default function ScheduleSessionScreen() {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState<number | null>(15);
  const [selectedTime, setSelectedTime] = useState<string | null>('10:00 AM');
  const [selectedDuration, setSelectedDuration] = useState('1 hour');
  const [selectedType, setSelectedType] = useState('Video Call');

  // Generate calendar days for current month
  const generateDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        date: date.getDate(),
        isToday: i === 0,
        available: i !== 2 && i !== 5, // Mock availability
      });
    }
    return days;
  };

  const days = generateDays();

  const canConfirm = selectedDate && selectedTime && selectedDuration && selectedType;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Schedule Session</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Mentor Card */}
        <View style={styles.mentorCard}>
          <Image source={{ uri: mentor.avatar }} style={styles.mentorAvatar} />
          <View style={styles.mentorInfo}>
            <Text style={styles.mentorName}>{mentor.name}</Text>
            <Text style={styles.mentorSkill}>{mentor.skill}</Text>
            <View style={styles.mentorMeta}>
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={12} color={COLORS.warning} />
                <Text style={styles.ratingText}>{mentor.rating}</Text>
              </View>
              <Text style={styles.rateText}>{mentor.rate}</Text>
            </View>
          </View>
        </View>

        {/* Date Selection */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Select Date</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>View Calendar</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.daysContainer}
          >
            {days.map((day, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dayCard,
                  selectedDate === day.date && styles.dayCardActive,
                  !day.available && styles.dayCardDisabled,
                ]}
                onPress={() => day.available && setSelectedDate(day.date)}
                disabled={!day.available}
              >
                <Text style={[
                  styles.dayName,
                  selectedDate === day.date && styles.dayNameActive,
                  !day.available && styles.dayNameDisabled,
                ]}>
                  {day.day}
                </Text>
                <Text style={[
                  styles.dayDate,
                  selectedDate === day.date && styles.dayDateActive,
                  !day.available && styles.dayDateDisabled,
                ]}>
                  {day.date}
                </Text>
                {day.isToday && (
                  <View style={[
                    styles.todayDot,
                    selectedDate === day.date && styles.todayDotActive,
                  ]} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Time Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Time</Text>
          <View style={styles.timeGrid}>
            {timeSlots.map((slot) => (
              <TouchableOpacity
                key={slot.id}
                style={[
                  styles.timeSlot,
                  selectedTime === slot.time && styles.timeSlotActive,
                  !slot.available && styles.timeSlotDisabled,
                ]}
                onPress={() => slot.available && setSelectedTime(slot.time)}
                disabled={!slot.available}
              >
                <Text style={[
                  styles.timeText,
                  selectedTime === slot.time && styles.timeTextActive,
                  !slot.available && styles.timeTextDisabled,
                ]}>
                  {slot.time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Duration Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Duration</Text>
          <View style={styles.durationContainer}>
            {durations.map((duration) => (
              <TouchableOpacity
                key={duration.id}
                style={[
                  styles.durationChip,
                  selectedDuration === duration.label && styles.durationChipActive,
                ]}
                onPress={() => setSelectedDuration(duration.label)}
              >
                <Text style={[
                  styles.durationText,
                  selectedDuration === duration.label && styles.durationTextActive,
                ]}>
                  {duration.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Session Type */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Session Type</Text>
          {sessionTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.typeCard,
                selectedType === type.label && styles.typeCardActive,
              ]}
              onPress={() => setSelectedType(type.label)}
            >
              <View style={[
                styles.typeIcon,
                selectedType === type.label && styles.typeIconActive,
              ]}>
                <Ionicons
                  name={type.icon as any}
                  size={22}
                  color={selectedType === type.label ? COLORS.white : COLORS.primary}
                />
              </View>
              <View style={styles.typeInfo}>
                <Text style={[
                  styles.typeLabel,
                  selectedType === type.label && styles.typeLabelActive,
                ]}>
                  {type.label}
                </Text>
                <Text style={styles.typeDescription}>{type.description}</Text>
              </View>
              <View style={[
                styles.radioOuter,
                selectedType === type.label && styles.radioOuterActive,
              ]}>
                {selectedType === type.label && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Confirm Button */}
      <View style={styles.footer}>
        <View style={styles.summaryRow}>
          <View>
            <Text style={styles.summaryLabel}>Session Summary</Text>
            <Text style={styles.summaryText}>
              {selectedDate && selectedTime
                ? `${selectedTime}, ${selectedDuration}`
                : 'Select date and time'}
            </Text>
          </View>
          <Text style={styles.priceText}>Free</Text>
        </View>
        <TouchableOpacity
          style={[styles.confirmButton, !canConfirm && styles.confirmButtonDisabled]}
          disabled={!canConfirm}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.confirmButtonText}>Confirm Session</Text>
        </TouchableOpacity>
      </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.padding,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  title: {
    fontSize: SIZES.lg,
    ...FONTS.semibold,
    color: COLORS.textPrimary,
  },
  placeholder: {
    width: 40,
  },
  mentorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.padding,
    marginBottom: 20,
    padding: 14,
    borderRadius: SIZES.radiusMd,
    ...SHADOWS.sm,
  },
  mentorAvatar: {
    width: 56,
    height: 56,
    borderRadius: 16,
    marginRight: 12,
  },
  mentorInfo: {
    flex: 1,
  },
  mentorName: {
    fontSize: SIZES.base,
    ...FONTS.semibold,
    color: COLORS.textPrimary,
  },
  mentorSkill: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  mentorMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 12,
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
  rateText: {
    fontSize: SIZES.sm,
    ...FONTS.medium,
    color: COLORS.success,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: SIZES.padding,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: SIZES.base,
    ...FONTS.semibold,
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: SIZES.sm,
    ...FONTS.semibold,
    color: COLORS.primary,
  },
  daysContainer: {
    gap: 10,
    paddingRight: SIZES.padding,
  },
  dayCard: {
    width: 60,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusMd,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dayCardActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  dayCardDisabled: {
    backgroundColor: COLORS.grayLight,
    borderColor: COLORS.grayLight,
  },
  dayName: {
    fontSize: SIZES.xs,
    ...FONTS.medium,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  dayNameActive: {
    color: COLORS.white,
  },
  dayNameDisabled: {
    color: COLORS.gray,
  },
  dayDate: {
    fontSize: SIZES.lg,
    ...FONTS.bold,
    color: COLORS.textPrimary,
  },
  dayDateActive: {
    color: COLORS.white,
  },
  dayDateDisabled: {
    color: COLORS.gray,
  },
  todayDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
    marginTop: 6,
  },
  todayDotActive: {
    backgroundColor: COLORS.white,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  timeSlot: {
    width: '31%',
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusMd,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  timeSlotActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  timeSlotDisabled: {
    backgroundColor: COLORS.grayLight,
    borderColor: COLORS.grayLight,
  },
  timeText: {
    fontSize: SIZES.sm,
    ...FONTS.medium,
    color: COLORS.textPrimary,
  },
  timeTextActive: {
    color: COLORS.white,
  },
  timeTextDisabled: {
    color: COLORS.gray,
  },
  durationContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  durationChip: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusMd,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  durationChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  durationText: {
    fontSize: SIZES.sm,
    ...FONTS.medium,
    color: COLORS.textPrimary,
  },
  durationTextActive: {
    color: COLORS.white,
  },
  typeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 14,
    borderRadius: SIZES.radiusMd,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  typeCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: `${COLORS.primary}05`,
  },
  typeIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: `${COLORS.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  typeIconActive: {
    backgroundColor: COLORS.primary,
  },
  typeInfo: {
    flex: 1,
  },
  typeLabel: {
    fontSize: SIZES.base,
    ...FONTS.semibold,
    color: COLORS.textPrimary,
  },
  typeLabelActive: {
    color: COLORS.primary,
  },
  typeDescription: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textLight,
    marginTop: 2,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterActive: {
    borderColor: COLORS.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
  },
  bottomPadding: {
    height: 150,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.padding,
    paddingTop: 16,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    ...SHADOWS.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  summaryLabel: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textLight,
  },
  summaryText: {
    fontSize: SIZES.base,
    ...FONTS.semibold,
    color: COLORS.textPrimary,
    marginTop: 2,
  },
  priceText: {
    fontSize: SIZES.lg,
    ...FONTS.bold,
    color: COLORS.success,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: SIZES.radiusMd,
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: COLORS.grayLight,
  },
  confirmButtonText: {
    fontSize: SIZES.base,
    ...FONTS.semibold,
    color: COLORS.white,
  },
});
