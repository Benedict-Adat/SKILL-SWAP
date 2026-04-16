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
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';
import { RootStackParamList } from '../App';

type FindTutorsNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const categories = ['All', 'Science', 'Mathematics', 'Languages', 'Arts', 'Technology'];

const tutors = [
  {
    id: '1',
    name: 'Dr. Victor Ibeneese',
    title: 'Senior Lecturer',
    expertise: ['Machine Learning', 'AI', 'Python'],
    rating: 4.9,
    reviews: 156,
    hourlyRate: 45,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    available: true,
    bio: 'Expert in AI and Machine Learning with 10+ years of teaching experience.',
  },
  {
    id: '2',
    name: 'Prof. Marrie Tseem',
    title: 'Physics Professor',
    expertise: ['Quantum Physics', 'Thermodynamics'],
    rating: 4.8,
    reviews: 142,
    hourlyRate: 50,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
    available: true,
    bio: 'Award-winning physics educator passionate about making complex concepts simple.',
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    title: 'Data Scientist',
    expertise: ['Data Analysis', 'Statistics', 'R'],
    rating: 4.7,
    reviews: 98,
    hourlyRate: 40,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    available: false,
    bio: 'Helping students master data science through practical projects.',
  },
  {
    id: '4',
    name: 'John Williams',
    title: 'Software Engineer',
    expertise: ['JavaScript', 'React', 'Node.js'],
    rating: 4.9,
    reviews: 203,
    hourlyRate: 55,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    available: true,
    bio: 'Full-stack developer with experience at top tech companies.',
  },
  {
    id: '5',
    name: 'Emily Davis',
    title: 'Language Expert',
    expertise: ['Spanish', 'French', 'German'],
    rating: 4.8,
    reviews: 167,
    hourlyRate: 35,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    available: true,
    bio: 'Polyglot language teacher with immersive teaching methods.',
  },
  {
    id: '6',
    name: 'Dr. James Potter',
    title: 'Mathematics PhD',
    expertise: ['Calculus', 'Linear Algebra', 'Statistics'],
    rating: 4.9,
    reviews: 189,
    hourlyRate: 48,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
    available: true,
    bio: 'Making mathematics accessible and enjoyable for all students.',
  },
];

export default function FindTutorsScreen() {
  const navigation = useNavigation<FindTutorsNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Find Tutors</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={20} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={COLORS.gray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search tutors, subjects..."
            placeholderTextColor={COLORS.grayLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={COLORS.gray} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Categories - FIXED */}
      <View style={styles.categoriesWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            
            return (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  isActive && styles.categoryButtonActive,
                ]}
                onPress={() => setSelectedCategory(category)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.categoryText,
                    isActive && styles.categoryTextActive,
                  ]}
                  numberOfLines={1}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Results Count */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>{tutors.length} tutors available</Text>
        <TouchableOpacity style={styles.sortButton}>
          <Ionicons name="swap-vertical" size={16} color={COLORS.primary} />
          <Text style={styles.sortText}>Sort by</Text>
        </TouchableOpacity>
      </View>

      {/* Tutors List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.tutorsList}
      >
        {tutors.map((tutor) => (
          <TouchableOpacity
            key={tutor.id}
            style={styles.tutorCard}
            onPress={() => navigation.navigate('TutorProfile', { tutorId: tutor.id })}
          >
            <View style={styles.tutorHeader}>
              <Image source={{ uri: tutor.avatar }} style={styles.tutorAvatar} />
              <View style={styles.tutorInfo}>
                <View style={styles.tutorNameRow}>
                  <Text style={styles.tutorName}>{tutor.name}</Text>
                  {tutor.available && (
                    <View style={styles.availableBadge}>
                      <View style={styles.availableDot} />
                      <Text style={styles.availableText}>Available</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.tutorTitle}>{tutor.title}</Text>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={14} color={COLORS.warning} />
                  <Text style={styles.ratingText}>{tutor.rating}</Text>
                  <Text style={styles.reviewsText}>({tutor.reviews} reviews)</Text>
                </View>
              </View>
            </View>

            <Text style={styles.tutorBio} numberOfLines={2}>
              {tutor.bio}
            </Text>

            <View style={styles.expertiseContainer}>
              {tutor.expertise.map((skill, index) => (
                <View key={index} style={styles.expertiseTag}>
                  <Text style={styles.expertiseText}>{skill}</Text>
                </View>
              ))}
            </View>

            <View style={styles.tutorFooter}>
              <View style={styles.priceContainer}>
                <Text style={styles.priceLabel}>From</Text>
                <Text style={styles.price}>${tutor.hourlyRate}</Text>
                <Text style={styles.priceUnit}>/hour</Text>
              </View>
              <TouchableOpacity style={styles.bookButton}>
                <Text style={styles.bookButtonText}>Book Now</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

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
  
  // FIXED: Categories wrapper with proper structure
  categoriesWrapper: {
    width: '100%',
    height: 50, // Fixed height
    marginBottom: 8,
  },
  
  categoriesContainer: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    // Removed gap - using marginRight on button instead
  },
  
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    marginRight: 8, // Instead of gap
    minHeight: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  categoryButtonActive: {
    backgroundColor: '#1E40AF', // Dark blue
    borderColor: '#1E40AF',
  },
  
  // FIXED: Explicit text colors
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151', // Dark gray - VISIBLE on white
    lineHeight: 18,
  },
  
  categoryTextActive: {
    color: '#FFFFFF', // White - VISIBLE on blue
  },
  
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    marginBottom: 12,
  },
  resultsCount: {
    fontSize: SIZES.md,
    ...FONTS.medium,
    color: COLORS.textSecondary,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sortText: {
    fontSize: SIZES.md,
    ...FONTS.medium,
    color: COLORS.primary,
  },
  tutorsList: {
    paddingHorizontal: SIZES.padding,
  },
  tutorCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.padding,
    marginBottom: 16,
    ...SHADOWS.sm,
  },
  tutorHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  tutorAvatar: {
    width: 64,
    height: 64,
    borderRadius: 16,
    marginRight: 12,
  },
  tutorInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  tutorNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tutorName: {
    fontSize: SIZES.base,
    ...FONTS.bold,
    color: COLORS.textPrimary,
  },
  availableBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.successLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: SIZES.radiusFull,
    gap: 4,
  },
  availableDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.success,
  },
  availableText: {
    fontSize: SIZES.xs,
    ...FONTS.medium,
    color: COLORS.success,
  },
  tutorTitle: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  ratingText: {
    fontSize: SIZES.sm,
    ...FONTS.semibold,
    color: COLORS.textPrimary,
  },
  reviewsText: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textSecondary,
  },
  tutorBio: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  expertiseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  expertiseTag: {
    backgroundColor: `${COLORS.primary}10`,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: SIZES.radiusFull,
  },
  expertiseText: {
    fontSize: SIZES.xs,
    ...FONTS.medium,
    color: COLORS.primary,
  },
  tutorFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  priceLabel: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textSecondary,
  },
  price: {
    fontSize: SIZES.xl,
    ...FONTS.bold,
    color: COLORS.textPrimary,
  },
  priceUnit: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textSecondary,
  },
  bookButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: SIZES.radius,
  },
  bookButtonText: {
    fontSize: SIZES.md,
    ...FONTS.semibold,
    color: COLORS.white,
  },
  bottomPadding: {
    height: 20,
  },
});