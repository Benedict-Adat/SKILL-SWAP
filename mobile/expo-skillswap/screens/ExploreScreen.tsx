import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Animated,
  Dimensions,
  PanResponder,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';
import { RootStackParamList } from '../App';

type ExploreNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - (SIZES.padding * 2);

const profiles = [
  {
    id: '1',
    name: 'Dr. Victor Ibeneese',
    age: 28,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    university: 'Stanford University',
    department: 'Computer Science',
    matchPercentage: 95,
    distance: '0.5 km',
    isOnline: true,
    verified: true,
    teaches: ['Machine Learning', 'Neural Networks', 'Python'],
    wants: ['Public Speaking', 'Business Strategy'],
    bio: 'PhD researcher specializing in deep learning and AI. Looking to improve my communication skills.',
    rating: 4.9,
    sessions: 124,
  },
  {
    id: '2',
    name: 'Sarah Chen',
    age: 24,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    university: 'MIT',
    department: 'Data Science',
    matchPercentage: 92,
    distance: '1.2 km',
    isOnline: true,
    verified: true,
    teaches: ['Statistics', 'R Programming', 'Data Visualization'],
    wants: ['Machine Learning', 'Web Development'],
    bio: 'Data science enthusiast who loves turning complex data into beautiful visualizations.',
    rating: 4.8,
    sessions: 89,
  },
  {
    id: '3',
    name: 'Michael Brown',
    age: 26,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    university: 'Berkeley',
    department: 'Engineering',
    matchPercentage: 88,
    distance: '2.1 km',
    isOnline: false,
    verified: true,
    teaches: ['React Native', 'JavaScript', 'System Design'],
    wants: ['Data Science', 'AI Fundamentals'],
    bio: 'Full-stack developer with 5 years of experience. Passionate about building mobile apps.',
    rating: 4.7,
    sessions: 67,
  },
];

const categories = [
  { id: '1', name: 'All', icon: 'grid' },
  { id: '2', name: 'Tech', icon: 'code-slash' },
  { id: '3', name: 'Design', icon: 'color-palette' },
  { id: '4', name: 'Business', icon: 'briefcase' },
  { id: '5', name: 'Language', icon: 'language' },
  { id: '6', name: 'Music', icon: 'musical-notes' },
];

export default function ExploreScreen() {
  const navigation = useNavigation<ExploreNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);

  const position = useRef(new Animated.ValueXY()).current;
  const likeOpacity = position.x.interpolate({
    inputRange: [0, SCREEN_WIDTH / 4],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const nopeOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 4, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const cardRotation = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 120) {
          swipeRight();
        } else if (gestureState.dx < -120) {
          swipeLeft();
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const swipeRight = () => {
    Animated.timing(position, {
      toValue: { x: SCREEN_WIDTH + 100, y: 0 },
      duration: 250,
      useNativeDriver: false,
    }).start(() => nextCard());
  };

  const swipeLeft = () => {
    Animated.timing(position, {
      toValue: { x: -SCREEN_WIDTH - 100, y: 0 },
      duration: 250,
      useNativeDriver: false,
    }).start(() => nextCard());
  };

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % profiles.length);
    position.setValue({ x: 0, y: 0 });
  };

  const currentProfile = profiles[currentIndex];
  const nextProfile = profiles[(currentIndex + 1) % profiles.length];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Discover</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options" size={20} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={COLORS.gray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search skills or people..."
            placeholderTextColor={COLORS.grayLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={COLORS.grayLight} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryChip,
              selectedCategory === category.name && styles.categoryChipActive,
            ]}
            onPress={() => setSelectedCategory(category.name)}
          >
            <Ionicons
              name={category.icon as any}
              size={16}
              color={selectedCategory === category.name ? COLORS.white : COLORS.textSecondary}
            />
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.name && styles.categoryTextActive,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Swipe Cards */}
      <View style={styles.cardsContainer}>
        {/* Next Card (background) */}
        <View style={[styles.card, styles.cardBackground]}>
          <Image source={{ uri: nextProfile.avatar }} style={styles.cardImage} />
        </View>

        {/* Current Card (foreground) */}
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.card,
            {
              transform: [
                { translateX: position.x },
                { translateY: position.y },
                { rotate: cardRotation },
              ],
            },
          ]}
        >
          <Image source={{ uri: currentProfile.avatar }} style={styles.cardImage} />

          {/* Overlay Indicators */}
          <Animated.View style={[styles.overlayLabel, styles.likeLabel, { opacity: likeOpacity }]}>
            <Text style={styles.overlayLabelText}>MATCH</Text>
          </Animated.View>
          <Animated.View style={[styles.overlayLabel, styles.nopeLabel, { opacity: nopeOpacity }]}>
            <Text style={styles.overlayLabelText}>SKIP</Text>
          </Animated.View>

          {/* Card Content */}
          <View style={styles.cardGradient}>
            <View style={styles.cardTopInfo}>
              {currentProfile.verified && (
                <View style={styles.verifiedBadge}>
                  <Ionicons name="checkmark-circle" size={14} color={COLORS.white} />
                  <Text style={styles.verifiedText}>Verified</Text>
                </View>
              )}
              <View style={styles.matchBadge}>
                <Text style={styles.matchText}>{currentProfile.matchPercentage}% Match</Text>
              </View>
            </View>

            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.cardName}>{currentProfile.name}</Text>
                  <Text style={styles.cardUniversity}>{currentProfile.university}</Text>
                </View>
                <View style={styles.cardStats}>
                  <View style={styles.statRow}>
                    <Ionicons name="star" size={14} color={COLORS.warning} />
                    <Text style={styles.statText}>{currentProfile.rating}</Text>
                  </View>
                  {currentProfile.isOnline && (
                    <View style={styles.onlineBadge}>
                      <View style={styles.onlineDot} />
                      <Text style={styles.onlineText}>Online</Text>
                    </View>
                  )}
                </View>
              </View>

              <View style={styles.skillsSection}>
                <Text style={styles.skillsLabel}>Can teach:</Text>
                <View style={styles.skillTags}>
                  {currentProfile.teaches.slice(0, 3).map((skill, index) => (
                    <View key={index} style={styles.skillTag}>
                      <Text style={styles.skillTagText}>{skill}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.skillsSection}>
                <Text style={styles.skillsLabel}>Wants to learn:</Text>
                <View style={styles.skillTags}>
                  {currentProfile.wants.slice(0, 2).map((skill, index) => (
                    <View key={index} style={[styles.skillTag, styles.wantSkillTag]}>
                      <Text style={[styles.skillTagText, styles.wantSkillTagText]}>{skill}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </Animated.View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton} onPress={swipeLeft}>
          <Ionicons name="close" size={28} color={COLORS.error} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.superLikeButton}
          onPress={() => navigation.navigate('UserProfile', { userId: currentProfile.id })}
        >
          <Ionicons name="person" size={24} color={COLORS.info} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.likeButton]} onPress={swipeRight}>
          <Ionicons name="heart" size={28} color={COLORS.white} />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingVertical: 12,
  },
  title: {
    fontSize: SIZES.xxl,
    ...FONTS.bold,
    color: COLORS.textPrimary,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
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
  categoriesContainer: {
    paddingHorizontal: SIZES.padding,
    paddingBottom: 12,
    gap: 8,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: SIZES.radiusFull,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 6,
  },
  categoryChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryText: {
    fontSize: SIZES.sm,
    ...FONTS.medium,
    color: COLORS.textSecondary,
  },
  categoryTextActive: {
    color: COLORS.white,
  },
  cardsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZES.padding,
  },
  card: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: '100%',
    borderRadius: SIZES.radiusLg,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    ...SHADOWS.lg,
  },
  cardBackground: {
    transform: [{ scale: 0.95 }],
    opacity: 0.8,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlayLabel: {
    position: 'absolute',
    top: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 3,
    borderRadius: 10,
  },
  likeLabel: {
    right: 20,
    borderColor: COLORS.success,
    transform: [{ rotate: '15deg' }],
  },
  nopeLabel: {
    left: 20,
    borderColor: COLORS.error,
    transform: [{ rotate: '-15deg' }],
  },
  overlayLabelText: {
    fontSize: SIZES.lg,
    ...FONTS.bold,
    color: COLORS.white,
  },
  cardGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 80,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  cardTopInfo: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: SIZES.radiusFull,
    gap: 4,
  },
  verifiedText: {
    fontSize: SIZES.xs,
    ...FONTS.semibold,
    color: COLORS.white,
  },
  matchBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: SIZES.radiusFull,
  },
  matchText: {
    fontSize: SIZES.xs,
    ...FONTS.bold,
    color: COLORS.white,
  },
  cardContent: {
    gap: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardName: {
    fontSize: SIZES.xl,
    ...FONTS.bold,
    color: COLORS.white,
  },
  cardUniversity: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: 'rgba(255,255,255,0.8)',
  },
  cardStats: {
    alignItems: 'flex-end',
    gap: 4,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: SIZES.sm,
    ...FONTS.semibold,
    color: COLORS.white,
  },
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.success,
  },
  onlineText: {
    fontSize: SIZES.xs,
    ...FONTS.medium,
    color: COLORS.success,
  },
  skillsSection: {
    gap: 4,
  },
  skillsLabel: {
    fontSize: SIZES.xs,
    ...FONTS.medium,
    color: 'rgba(255,255,255,0.7)',
  },
  skillTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillTag: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: SIZES.radiusFull,
  },
  skillTagText: {
    fontSize: SIZES.xs,
    ...FONTS.medium,
    color: COLORS.white,
  },
  wantSkillTag: {
    backgroundColor: `${COLORS.secondary}80`,
  },
  wantSkillTagText: {
    color: COLORS.white,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 20,
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.md,
  },
  superLikeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.md,
  },
  likeButton: {
    backgroundColor: COLORS.primary,
  },
});
