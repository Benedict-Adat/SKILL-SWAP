import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';
import { RootStackParamList } from '../App';

const { width } = Dimensions.get('window');

// ==========================================
// REUSABLE HORIZONTAL LIST COMPONENT
// ==========================================

interface HorizontalListProps {
  children: React.ReactNode;
  contentContainerStyle?: any;
}

const HorizontalList: React.FC<HorizontalListProps> = ({ children, contentContainerStyle }) => {
  return (
    <View style={horizontalStyles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[horizontalStyles.contentContainer, contentContainerStyle]}
        decelerationRate="fast"
      >
        {children}
      </ScrollView>
    </View>
  );
};

const horizontalStyles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  contentContainer: {
    paddingHorizontal: SIZES.padding,
    gap: 8,
    paddingVertical: 4,
  },
});

// ==========================================
// SCREEN 1: TUTOR PROFILE SCREEN
// ==========================================

type TutorProfileNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const reviews = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    rating: 5,
    date: '2 weeks ago',
    text: 'Amazing tutor! Explains complex concepts in a simple way. Highly recommended for ML beginners.',
  },
  {
    id: '2',
    name: 'John Davis',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    rating: 5,
    date: '1 month ago',
    text: 'Very knowledgeable and patient. Helped me understand neural networks from scratch.',
  },
  {
    id: '3',
    name: 'Emily Wilson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    rating: 4,
    date: '1 month ago',
    text: 'Great sessions! Always well-prepared and provides excellent resources.',
  },
];

const availableTimes = [
  { day: 'Mon', slots: ['9:00 AM', '2:00 PM', '4:00 PM'] },
  { day: 'Tue', slots: ['10:00 AM', '3:00 PM'] },
  { day: 'Wed', slots: ['9:00 AM', '11:00 AM', '2:00 PM'] },
  { day: 'Thu', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
  { day: 'Fri', slots: ['9:00 AM', '11:00 AM'] },
];

export function TutorProfileScreen() {
  const navigation = useNavigation<TutorProfileNavigationProp>();
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedDay, setSelectedDay] = useState('Mon');
  const [selectedTime, setSelectedTime] = useState('');

  const tutor = {
    name: 'Dr. Victor Ibeneese',
    title: 'Senior Lecturer',
    university: 'MIT Computer Science',
    expertise: ['Machine Learning', 'AI', 'Python', 'Deep Learning', 'TensorFlow'],
    rating: 4.9,
    reviews: 156,
    sessions: 342,
    students: 89,
    hourlyRate: 45,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    bio: 'Expert in AI and Machine Learning with over 10 years of teaching experience. I specialize in making complex concepts accessible to students of all levels. My approach combines theoretical foundations with hands-on practical projects.',
    languages: ['English', 'French'],
    responseTime: '< 1 hour',
  };

  const selectedDaySlots = availableTimes.find(d => d.day === selectedDay)?.slots || [];

  return (
    <SafeAreaView style={tutorStyles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cover & Avatar */}
        <View style={tutorStyles.coverSection}>
          <View style={tutorStyles.coverBackground} />
          <View style={tutorStyles.avatarSection}>
            <Image source={{ uri: tutor.avatar }} style={tutorStyles.avatar} />
            <TouchableOpacity
              style={tutorStyles.favoriteButton}
              onPress={() => setIsFavorite(!isFavorite)}
            >
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={24}
                color={isFavorite ? COLORS.error : COLORS.textPrimary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Basic Info */}
        <View style={tutorStyles.infoSection}>
          <Text style={tutorStyles.name}>{tutor.name}</Text>
          <Text style={tutorStyles.title}>{tutor.title}</Text>
          <Text style={tutorStyles.university}>{tutor.university}</Text>

          {/* Rating */}
          <View style={tutorStyles.ratingContainer}>
            <View style={tutorStyles.ratingStars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                  key={star}
                  name={star <= Math.floor(tutor.rating) ? 'star' : 'star-outline'}
                  size={18}
                  color={COLORS.warning}
                />
              ))}
            </View>
            <Text style={tutorStyles.ratingText}>{tutor.rating}</Text>
            <Text style={tutorStyles.reviewCount}>({tutor.reviews} reviews)</Text>
          </View>

          {/* Quick Stats */}
          <View style={tutorStyles.quickStats}>
            <View style={tutorStyles.quickStatItem}>
              <Ionicons name="videocam" size={20} color={COLORS.primary} />
              <Text style={tutorStyles.quickStatValue}>{tutor.sessions}</Text>
              <Text style={tutorStyles.quickStatLabel}>Sessions</Text>
            </View>
            <View style={tutorStyles.quickStatDivider} />
            <View style={tutorStyles.quickStatItem}>
              <Ionicons name="people" size={20} color={COLORS.primary} />
              <Text style={tutorStyles.quickStatValue}>{tutor.students}</Text>
              <Text style={tutorStyles.quickStatLabel}>Students</Text>
            </View>
            <View style={tutorStyles.quickStatDivider} />
            <View style={tutorStyles.quickStatItem}>
              <Ionicons name="time" size={20} color={COLORS.primary} />
              <Text style={tutorStyles.quickStatValue}>{tutor.responseTime}</Text>
              <Text style={tutorStyles.quickStatLabel}>Response</Text>
            </View>
          </View>
        </View>

        {/* Bio */}
        <View style={tutorStyles.section}>
          <Text style={tutorStyles.sectionTitle}>About</Text>
          <Text style={tutorStyles.bioText}>{tutor.bio}</Text>
        </View>

        {/* Expertise */}
        <View style={tutorStyles.section}>
          <Text style={tutorStyles.sectionTitle}>Expertise</Text>
          <View style={tutorStyles.expertiseContainer}>
            {tutor.expertise.map((skill, index) => (
              <View key={index} style={tutorStyles.expertiseTag}>
                <Text style={tutorStyles.expertiseText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Languages */}
        <View style={tutorStyles.section}>
          <Text style={tutorStyles.sectionTitle}>Languages</Text>
          <View style={tutorStyles.languagesContainer}>
            {tutor.languages.map((lang, index) => (
              <View key={index} style={tutorStyles.languageItem}>
                <Ionicons name="language" size={18} color={COLORS.primary} />
                <Text style={tutorStyles.languageText}>{lang}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Availability - FIXED */}
        <View style={tutorStyles.section}>
          <Text style={tutorStyles.sectionTitle}>Availability</Text>
          
          {/* Days - Fixed horizontal scrolling */}
          <HorizontalList>
            {availableTimes.map((day) => (
              <TouchableOpacity
                key={day.day}
                style={[
                  tutorStyles.dayButton,
                  selectedDay === day.day && tutorStyles.dayButtonActive,
                ]}
                onPress={() => {
                  setSelectedDay(day.day);
                  setSelectedTime('');
                }}
              >
                <Text
                  style={[
                    tutorStyles.dayText,
                    selectedDay === day.day && tutorStyles.dayTextActive,
                  ]}
                >
                  {day.day}
                </Text>
              </TouchableOpacity>
            ))}
          </HorizontalList>

          {/* Time Slots */}
          <View style={tutorStyles.timeSlotsContainer}>
            {selectedDaySlots.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  tutorStyles.timeSlot,
                  selectedTime === time && tutorStyles.timeSlotActive,
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text
                  style={[
                    tutorStyles.timeSlotText,
                    selectedTime === time && tutorStyles.timeSlotTextActive,
                  ]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Reviews */}
        <View style={tutorStyles.section}>
          <View style={tutorStyles.sectionHeader}>
            <Text style={tutorStyles.sectionTitle}>Reviews</Text>
            <TouchableOpacity>
              <Text style={tutorStyles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {reviews.map((review) => (
            <View key={review.id} style={tutorStyles.reviewCard}>
              <View style={tutorStyles.reviewHeader}>
                <Image source={{ uri: review.avatar }} style={tutorStyles.reviewAvatar} />
                <View style={tutorStyles.reviewInfo}>
                  <Text style={tutorStyles.reviewName}>{review.name}</Text>
                  <View style={tutorStyles.reviewMeta}>
                    <View style={tutorStyles.reviewRating}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Ionicons
                          key={star}
                          name={star <= review.rating ? 'star' : 'star-outline'}
                          size={12}
                          color={COLORS.warning}
                        />
                      ))}
                    </View>
                    <Text style={tutorStyles.reviewDate}>{review.date}</Text>
                  </View>
                </View>
              </View>
              <Text style={tutorStyles.reviewText}>{review.text}</Text>
            </View>
          ))}
        </View>

        <View style={tutorStyles.bottomPadding} />
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={tutorStyles.bottomBar}>
        <View style={tutorStyles.priceSection}>
          <Text style={tutorStyles.priceLabel}>Price</Text>
          <View style={tutorStyles.priceRow}>
            <Text style={tutorStyles.price}>${tutor.hourlyRate}</Text>
            <Text style={tutorStyles.priceUnit}>/hour</Text>
          </View>
        </View>
        <TouchableOpacity
          style={tutorStyles.bookButton}
          onPress={() => navigation.navigate('Chat', {
            recipientId: '1',
            recipientName: tutor.name,
          })}
        >
          <Ionicons name="calendar" size={20} color={COLORS.white} />
          <Text style={tutorStyles.bookButtonText}>Book Session</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const tutorStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  coverSection: {
    position: 'relative',
    height: 160,
  },
  coverBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: COLORS.primary,
  },
  avatarSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: COLORS.white,
  },
  favoriteButton: {
    position: 'absolute',
    right: SIZES.padding,
    top: 40,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.md,
  },
  infoSection: {
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingTop: 12,
    paddingBottom: 20,
  },
  name: {
    fontSize: SIZES.xl,
    ...FONTS.bold,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  title: {
    fontSize: SIZES.md,
    ...FONTS.medium,
    color: COLORS.primary,
    marginBottom: 2,
  },
  university: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 20,
  },
  ratingStars: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingText: {
    fontSize: SIZES.base,
    ...FONTS.bold,
    color: COLORS.textPrimary,
  },
  reviewCount: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textSecondary,
  },
  quickStats: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusMd,
    padding: SIZES.padding,
    ...SHADOWS.sm,
    width: '100%',
  },
  quickStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  quickStatDivider: {
    width: 1,
    backgroundColor: COLORS.border,
  },
  quickStatValue: {
    fontSize: SIZES.lg,
    ...FONTS.bold,
    color: COLORS.textPrimary,
    marginTop: 8,
  },
  quickStatLabel: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  section: {
    paddingHorizontal: SIZES.padding,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: SIZES.lg,
    ...FONTS.bold,
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: SIZES.md,
    ...FONTS.medium,
    color: COLORS.primary,
  },
  bioText: {
    fontSize: SIZES.md,
    ...FONTS.regular,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  expertiseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  expertiseTag: {
    backgroundColor: `${COLORS.primary}10`,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: SIZES.radiusFull,
  },
  expertiseText: {
    fontSize: SIZES.sm,
    ...FONTS.medium,
    color: COLORS.primary,
  },
  languagesContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  languageText: {
    fontSize: SIZES.md,
    ...FONTS.medium,
    color: COLORS.textPrimary,
  },
  dayButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexShrink: 0,
    flexGrow: 0,
    marginRight: 8,
  },
  dayButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  dayText: {
    fontSize: SIZES.md,
    ...FONTS.medium,
    color: COLORS.textSecondary,
  },
  dayTextActive: {
    color: COLORS.white,
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  timeSlot: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  timeSlotActive: {
    backgroundColor: `${COLORS.primary}10`,
    borderColor: COLORS.primary,
  },
  timeSlotText: {
    fontSize: SIZES.sm,
    ...FONTS.medium,
    color: COLORS.textSecondary,
  },
  timeSlotTextActive: {
    color: COLORS.primary,
  },
  reviewCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusMd,
    padding: SIZES.padding,
    marginBottom: 12,
    ...SHADOWS.sm,
  },
  reviewHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewInfo: {
    flex: 1,
  },
  reviewName: {
    fontSize: SIZES.md,
    ...FONTS.semibold,
    color: COLORS.textPrimary,
  },
  reviewMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 8,
  },
  reviewRating: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewDate: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textLight,
  },
  reviewText: {
    fontSize: SIZES.md,
    ...FONTS.regular,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  bottomPadding: {
    height: 100,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.padding,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    ...SHADOWS.lg,
    height: 80,
  },
  priceSection: {
    flex: 1,
  },
  priceLabel: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textSecondary,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: SIZES.xxl,
    ...FONTS.bold,
    color: COLORS.textPrimary,
  },
  priceUnit: {
    fontSize: SIZES.md,
    ...FONTS.regular,
    color: COLORS.textSecondary,
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: SIZES.radius,
    gap: 8,
    height: 48,
  },
  bookButtonText: {
    fontSize: SIZES.base,
    ...FONTS.semibold,
    color: COLORS.white,
  },
});

// ==========================================
// SCREEN 2: CHAT LIST SCREEN
// ==========================================

type ChatListNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const conversations = [
  {
    id: '1',
    name: 'Dr. Victor Ibeneese',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    lastMessage: 'Sure! I can help you with the machine learning project.',
    time: '10:42 AM',
    unread: 2,
    online: true,
    typing: false,
  },
  {
    id: '2',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    lastMessage: 'Thanks for the help with statistics!',
    time: 'Yesterday',
    unread: 0,
    online: true,
    typing: true,
  },
  {
    id: '3',
    name: 'Michael Brown',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    lastMessage: 'Let me know when you want to schedule the next session.',
    time: 'Yesterday',
    unread: 0,
    online: false,
    typing: false,
  },
  {
    id: '4',
    name: 'Prof. Emily Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    lastMessage: 'The research paper deadline is next week.',
    time: 'Mon',
    unread: 1,
    online: false,
    typing: false,
  },
  {
    id: '5',
    name: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
    lastMessage: 'Great session today! See you next time.',
    time: 'Sun',
    unread: 0,
    online: true,
    typing: false,
  },
  {
    id: '6',
    name: 'Lisa Johnson',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
    lastMessage: 'I have some questions about the psychology assignment.',
    time: 'Sat',
    unread: 0,
    online: false,
    typing: false,
  },
  {
    id: '7',
    name: 'Code Collective',
    avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150',
    isGroup: true,
    lastMessage: 'John: Has anyone tried the new React features?',
    time: 'Fri',
    unread: 5,
    online: false,
    typing: false,
  },
];

const filters = ['All', 'Unread', 'Groups', 'Archived'];

export function ChatListScreen() {
  const navigation = useNavigation<ChatListNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (selectedFilter === 'Unread') return conv.unread > 0;
    if (selectedFilter === 'Groups') return conv.isGroup;
    return true;
  });

  const onlineUsers = conversations.filter(c => c.online && !c.isGroup);

  return (
    <SafeAreaView style={chatStyles.container}>
      {/* Header */}
      <View style={chatStyles.header}>
        <Text style={chatStyles.title}>Messages</Text>
        <TouchableOpacity style={chatStyles.composeButton}>
          <Ionicons name="create-outline" size={22} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={chatStyles.searchContainer}>
        <View style={chatStyles.searchBar}>
          <Ionicons name="search" size={20} color={COLORS.gray} />
          <TextInput
            style={chatStyles.searchInput}
            placeholder="Search messages..."
            placeholderTextColor={COLORS.grayLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Filters - FIXED */}
      <HorizontalList>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              chatStyles.filterChip,
              selectedFilter === filter && chatStyles.filterChipActive,
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text
              style={[
                chatStyles.filterText,
                selectedFilter === filter && chatStyles.filterTextActive,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </HorizontalList>

      {/* Online Now - FIXED */}
      <View style={chatStyles.onlineSection}>
        <Text style={chatStyles.sectionLabel}>Online Now</Text>
        <HorizontalList>
          {onlineUsers.map((conv) => (
            <TouchableOpacity
              key={conv.id}
              style={chatStyles.onlineAvatar}
              onPress={() => navigation.navigate('Chat', {
                recipientId: conv.id,
                recipientName: conv.name,
              })}
            >
              <Image source={{ uri: conv.avatar }} style={chatStyles.onlineImage} />
              <View style={chatStyles.onlineDot} />
            </TouchableOpacity>
          ))}
        </HorizontalList>
      </View>

      {/* Conversations List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={chatStyles.conversationsList}
      >
        {filteredConversations.map((conv) => (
          <TouchableOpacity
            key={conv.id}
            style={chatStyles.conversationCard}
            onPress={() => navigation.navigate('Chat', {
              recipientId: conv.id,
              recipientName: conv.name,
            })}
          >
            <View style={chatStyles.avatarContainer}>
              {conv.isGroup ? (
                <View style={chatStyles.groupAvatar}>
                  <Ionicons name="people" size={24} color={COLORS.primary} />
                </View>
              ) : (
                <Image source={{ uri: conv.avatar }} style={chatStyles.conversationAvatar} />
              )}
              {conv.online && !conv.isGroup && <View style={chatStyles.onlineIndicator} />}
            </View>

            <View style={chatStyles.conversationContent}>
              <View style={chatStyles.conversationHeader}>
                <Text style={chatStyles.conversationName} numberOfLines={1}>
                  {conv.name}
                </Text>
                <Text style={[
                  chatStyles.conversationTime,
                  conv.unread > 0 && chatStyles.conversationTimeUnread
                ]}>
                  {conv.time}
                </Text>
              </View>
              <View style={chatStyles.conversationFooter}>
                {conv.typing ? (
                  <Text style={chatStyles.typingText}>typing...</Text>
                ) : (
                  <Text style={chatStyles.lastMessage} numberOfLines={1}>
                    {conv.lastMessage}
                  </Text>
                )}
                {conv.unread > 0 && (
                  <View style={chatStyles.unreadBadge}>
                    <Text style={chatStyles.unreadText}>{conv.unread}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <View style={chatStyles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const chatStyles = StyleSheet.create({
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
  composeButton: {
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
    marginBottom: 12,
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
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: SIZES.radiusFull,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    flexShrink: 0,
    flexGrow: 0,
    marginRight: 8,
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
  onlineSection: {
    marginTop: 12,
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: SIZES.sm,
    ...FONTS.semibold,
    color: COLORS.textSecondary,
    paddingHorizontal: SIZES.padding,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  onlineAvatar: {
    position: 'relative',
    flexShrink: 0,
    flexGrow: 0,
    marginRight: 12,
  },
  onlineImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.success,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  conversationsList: {
    paddingHorizontal: SIZES.padding,
    paddingTop: 8,
  },
  conversationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusMd,
    padding: 12,
    marginBottom: 8,
    ...SHADOWS.sm,
    height: 76,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  conversationAvatar: {
    width: 52,
    height: 52,
    borderRadius: 16,
  },
  groupAvatar: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: `${COLORS.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
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
  conversationContent: {
    flex: 1,
    justifyContent: 'center',
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  conversationName: {
    fontSize: SIZES.base,
    ...FONTS.semibold,
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  conversationTime: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textLight,
  },
  conversationTimeUnread: {
    color: COLORS.primary,
    ...FONTS.semibold,
  },
  conversationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textSecondary,
    flex: 1,
    marginRight: 8,
  },
  typingText: {
    fontSize: SIZES.sm,
    ...FONTS.medium,
    color: COLORS.success,
    fontStyle: 'italic',
  },
  unreadBadge: {
    backgroundColor: COLORS.primary,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadText: {
    fontSize: SIZES.xs,
    ...FONTS.bold,
    color: COLORS.white,
  },
  bottomPadding: {
    height: 20,
  },
});

// ==========================================
// SCREEN 3: CAMPUS MAP SCREEN
// ==========================================

const campusLocations = [
  {
    id: '1',
    name: 'Main Library',
    type: 'study',
    floor: '1st Floor',
    available: true,
    scholars: 12,
  },
  {
    id: '2',
    name: 'Science Building',
    type: 'building',
    floor: 'Room 204',
    available: true,
    scholars: 8,
  },
  {
    id: '3',
    name: 'Student Center',
    type: 'common',
    floor: 'Ground Floor',
    available: true,
    scholars: 24,
  },
  {
    id: '4',
    name: 'Engineering Lab',
    type: 'lab',
    floor: '3rd Floor',
    available: false,
    scholars: 0,
  },
  {
    id: '5',
    name: 'Coffee Corner',
    type: 'cafe',
    floor: 'Main Quad',
    available: true,
    scholars: 5,
  },
];

const mapFilters = ['All', 'Study Spots', 'Buildings', 'Labs', 'Common Areas'];

export function CampusMapScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [showLocationList, setShowLocationList] = useState(false);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'study':
        return 'library-outline';
      case 'building':
        return 'business-outline';
      case 'lab':
        return 'flask-outline';
      case 'common':
        return 'people-outline';
      case 'cafe':
        return 'cafe-outline';
      default:
        return 'location-outline';
    }
  };

  const filteredLocations = campusLocations.filter(loc => {
    const matchesSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (selectedFilter === 'Study Spots') return loc.type === 'study';
    if (selectedFilter === 'Buildings') return loc.type === 'building';
    if (selectedFilter === 'Labs') return loc.type === 'lab';
    if (selectedFilter === 'Common Areas') return loc.type === 'common';
    return true;
  });

  return (
    <SafeAreaView style={mapStyles.container}>
      {/* Header */}
      <View style={mapStyles.header}>
        <Text style={mapStyles.title}>Campus Map</Text>
        <TouchableOpacity
          style={mapStyles.listButton}
          onPress={() => setShowLocationList(!showLocationList)}
        >
          <Ionicons
            name={showLocationList ? 'map-outline' : 'list-outline'}
            size={22}
            color={COLORS.textPrimary}
          />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={mapStyles.searchContainer}>
        <View style={mapStyles.searchBar}>
          <Ionicons name="search" size={20} color={COLORS.gray} />
          <TextInput
            style={mapStyles.searchInput}
            placeholder="Search campus locations..."
            placeholderTextColor={COLORS.grayLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Filters - FIXED */}
      <HorizontalList>
        {mapFilters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              mapStyles.filterChip,
              selectedFilter === filter && mapStyles.filterChipActive,
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text
              style={[
                mapStyles.filterText,
                selectedFilter === filter && mapStyles.filterTextActive,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </HorizontalList>

      {showLocationList ? (
        <ScrollView 
          style={mapStyles.locationList} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={mapStyles.locationListContent}
        >
          {filteredLocations.map((location) => (
            <TouchableOpacity key={location.id} style={mapStyles.locationCard}>
              <View style={mapStyles.locationIcon}>
                <Ionicons
                  name={getTypeIcon(location.type) as any}
                  size={24}
                  color={COLORS.primary}
                />
              </View>
              <View style={mapStyles.locationInfo}>
                <Text style={mapStyles.locationName}>{location.name}</Text>
                <Text style={mapStyles.locationFloor}>{location.floor}</Text>
                {location.available && (
                  <View style={mapStyles.scholarsInfo}>
                    <Ionicons name="people" size={14} color={COLORS.success} />
                    <Text style={mapStyles.scholarsText}>
                      {location.scholars} scholars nearby
                    </Text>
                  </View>
                )}
              </View>
              <View style={mapStyles.locationStatus}>
                <View
                  style={[
                    mapStyles.statusBadge,
                    { 
                      backgroundColor: location.available 
                        ? `${COLORS.success}20`
                        : COLORS.grayLighter 
                    },
                  ]}
                >
                  <Text
                    style={[
                      mapStyles.statusText,
                      { 
                        color: location.available 
                          ? COLORS.success 
                          : COLORS.gray 
                      },
                    ]}
                  >
                    {location.available ? 'Available' : 'Closed'}
                  </Text>
                </View>
                <TouchableOpacity style={mapStyles.directionsButton}>
                  <Ionicons name="navigate" size={18} color={COLORS.primary} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
          <View style={mapStyles.bottomPadding} />
        </ScrollView>
      ) : (
        <View style={mapStyles.mapContainer}>
          {/* Map Placeholder */}
          <View style={mapStyles.mapPlaceholder}>
            <View style={mapStyles.mapGrid}>
              {[...Array(6)].map((_, row) => (
                <View key={row} style={mapStyles.mapRow}>
                  {[...Array(4)].map((_, col) => (
                    <View key={col} style={mapStyles.mapCell}>
                      {Math.random() > 0.6 && (
                        <View style={mapStyles.mapBuilding}>
                          <Ionicons name="business" size={16} color={COLORS.primary} />
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              ))}
            </View>

            {/* Map markers */}
            <View style={[mapStyles.marker, { top: 80, left: 50 }]}>
              <View style={mapStyles.markerDot}>
                <Ionicons name="library" size={14} color={COLORS.white} />
              </View>
              <View style={mapStyles.markerLabel}>
                <Text style={mapStyles.markerText}>Library</Text>
              </View>
            </View>

            <View style={[mapStyles.marker, { top: 150, left: 180 }]}>
              <View style={mapStyles.markerDot}>
                <Ionicons name="flask" size={14} color={COLORS.white} />
              </View>
              <View style={mapStyles.markerLabel}>
                <Text style={mapStyles.markerText}>Science</Text>
              </View>
            </View>

            <View style={[mapStyles.marker, { top: 250, left: 100 }]}>
              <View style={mapStyles.markerDot}>
                <Ionicons name="cafe" size={14} color={COLORS.white} />
              </View>
              <View style={mapStyles.markerLabel}>
                <Text style={mapStyles.markerText}>Cafe</Text>
              </View>
            </View>

            {/* User location */}
            <View style={[mapStyles.userLocation, { top: 200, left: 150 }]}>
              <View style={mapStyles.userDot} />
              <View style={mapStyles.userPulse} />
            </View>
          </View>

          {/* Map Controls */}
          <View style={mapStyles.mapControls}>
            <TouchableOpacity style={mapStyles.mapControlButton}>
              <Ionicons name="add" size={24} color={COLORS.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity style={mapStyles.mapControlButton}>
              <Ionicons name="remove" size={24} color={COLORS.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity style={[mapStyles.mapControlButton, mapStyles.locationButton]}>
              <Ionicons name="locate" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          {/* Bottom Info Card */}
          <View style={mapStyles.bottomCard}>
            <View style={mapStyles.bottomCardHandle} />
            <Text style={mapStyles.bottomCardTitle}>Campus is safe work</Text>
            <View style={mapStyles.bottomCardInfo}>
              <View style={mapStyles.infoItem}>
                <Ionicons name="people" size={18} color={COLORS.primary} />
                <Text style={mapStyles.infoText}>49 scholars active</Text>
              </View>
              <View style={mapStyles.infoItem}>
                <Ionicons name="location" size={18} color={COLORS.success} />
                <Text style={mapStyles.infoText}>5 study spots available</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const mapStyles = StyleSheet.create({
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
  listButton: {
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
    marginBottom: 12,
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
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: SIZES.radiusFull,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    flexShrink: 0,
    flexGrow: 0,
    marginRight: 8,
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
  locationList: {
    flex: 1,
    marginTop: 12,
  },
  locationListContent: {
    paddingHorizontal: SIZES.padding,
    paddingTop: 8,
  },
  locationCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusMd,
    padding: SIZES.padding,
    marginBottom: 12,
    ...SHADOWS.sm,
    minHeight: 88,
  },
  locationIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: `${COLORS.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    alignSelf: 'center',
  },
  locationInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  locationName: {
    fontSize: SIZES.base,
    ...FONTS.semibold,
    color: COLORS.textPrimary,
  },
  locationFloor: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  scholarsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 4,
  },
  scholarsText: {
    fontSize: SIZES.sm,
    ...FONTS.medium,
    color: COLORS.success,
  },
  locationStatus: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: SIZES.radiusFull,
  },
  statusText: {
    fontSize: SIZES.xs,
    ...FONTS.medium,
  },
  directionsButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: `${COLORS.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
    marginTop: 12,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#E8EEF4',
    position: 'relative',
  },
  mapGrid: {
    flex: 1,
    padding: 20,
  },
  mapRow: {
    flexDirection: 'row',
    flex: 1,
  },
  mapCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapBuilding: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  marker: {
    position: 'absolute',
    alignItems: 'center',
  },
  markerDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.md,
  },
  markerLabel: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginTop: 4,
    ...SHADOWS.sm,
  },
  markerText: {
    fontSize: SIZES.xs,
    ...FONTS.medium,
    color: COLORS.textPrimary,
  },
  userLocation: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.info,
    borderWidth: 3,
    borderColor: COLORS.white,
    zIndex: 1,
  },
  userPulse: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${COLORS.info}30`,
  },
  mapControls: {
    position: 'absolute',
    right: 16,
    top: 16,
    gap: 8,
  },
  mapControlButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.md,
  },
  locationButton: {
    marginTop: 8,
  },
  bottomCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: SIZES.radiusXl,
    borderTopRightRadius: SIZES.radiusXl,
    padding: SIZES.padding,
    paddingTop: 12,
    ...SHADOWS.lg,
    minHeight: 120,
    maxHeight: 140,
  },
  bottomCardHandle: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.grayLighter,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 12,
  },
  bottomCardTitle: {
    fontSize: SIZES.lg,
    ...FONTS.bold,
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  bottomCardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: SIZES.md,
    ...FONTS.medium,
    color: COLORS.textSecondary,
  },
  bottomPadding: {
    height: 20,
  },
});