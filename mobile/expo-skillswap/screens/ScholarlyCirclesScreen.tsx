import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';

const categories = ['All', 'Science', 'Technology', 'Arts', 'Business', 'Languages'];

const circles = [
  {
    id: '1',
    name: 'The Logic Minds',
    description: 'A community for philosophy and logic enthusiasts to discuss ideas and debate.',
    icon: 'bulb-outline',
    color: COLORS.warning,
    members: 128,
    posts: 456,
    category: 'Arts',
    isJoined: true,
  },
  {
    id: '2',
    name: 'Code Collective',
    description: 'Programming enthusiasts sharing knowledge, code reviews, and project collaborations.',
    icon: 'code-slash-outline',
    color: COLORS.info,
    members: 256,
    posts: 892,
    category: 'Technology',
    isJoined: true,
  },
  {
    id: '3',
    name: 'Data Wizards',
    description: 'Data science and analytics community for sharing insights and learning together.',
    icon: 'analytics-outline',
    color: COLORS.success,
    members: 189,
    posts: 634,
    category: 'Technology',
    isJoined: false,
  },
  {
    id: '4',
    name: 'Physics Forum',
    description: 'Discuss theoretical physics, experiments, and the mysteries of the universe.',
    icon: 'planet-outline',
    color: COLORS.primary,
    members: 145,
    posts: 512,
    category: 'Science',
    isJoined: false,
  },
  {
    id: '5',
    name: 'Language Exchange',
    description: 'Practice languages with native speakers and learn new cultures.',
    icon: 'language-outline',
    color: COLORS.error,
    members: 312,
    posts: 1024,
    category: 'Languages',
    isJoined: true,
  },
  {
    id: '6',
    name: 'Startup Hub',
    description: 'Entrepreneurs and innovators sharing ideas, resources, and networking.',
    icon: 'rocket-outline',
    color: COLORS.secondary,
    members: 178,
    posts: 389,
    category: 'Business',
    isJoined: false,
  },
  {
    id: '7',
    name: 'Math Masters',
    description: 'Advanced mathematics discussions, problem-solving, and tutoring.',
    icon: 'calculator-outline',
    color: COLORS.chartPurple,
    members: 156,
    posts: 478,
    category: 'Science',
    isJoined: false,
  },
  {
    id: '8',
    name: 'Creative Writers',
    description: 'Share your writing, get feedback, and improve your craft together.',
    icon: 'create-outline',
    color: COLORS.chartPink,
    members: 198,
    posts: 756,
    category: 'Arts',
    isJoined: false,
  },
];

export default function ScholarlyCirclesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [joinedCircles, setJoinedCircles] = useState<string[]>(
    circles.filter(c => c.isJoined).map(c => c.id)
  );

  const filteredCircles = circles.filter(circle => {
    const matchesSearch = circle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      circle.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || circle.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleJoin = (circleId: string) => {
    setJoinedCircles(prev =>
      prev.includes(circleId)
        ? prev.filter(id => id !== circleId)
        : [...prev, circleId]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={COLORS.gray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search circles..."
            placeholderTextColor={COLORS.grayLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
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
            key={category}
            style={[
              styles.categoryChip,
              selectedCategory === category && styles.categoryChipActive,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* My Circles */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Circles</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.myCirclesList}
          >
            {circles
              .filter(c => joinedCircles.includes(c.id))
              .map((circle) => (
                <TouchableOpacity key={circle.id} style={styles.myCircleCard}>
                  <View style={[styles.myCircleIcon, { backgroundColor: `${circle.color}20` }]}>
                    <Ionicons name={circle.icon as any} size={24} color={circle.color} />
                  </View>
                  <Text style={styles.myCircleName} numberOfLines={1}>
                    {circle.name}
                  </Text>
                  <View style={styles.myCircleStats}>
                    <Ionicons name="people" size={12} color={COLORS.gray} />
                    <Text style={styles.myCircleCount}>{circle.members}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            <TouchableOpacity style={styles.createCircleCard}>
              <View style={styles.createCircleIcon}>
                <Ionicons name="add" size={28} color={COLORS.primary} />
              </View>
              <Text style={styles.createCircleText}>Create Circle</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Discover Circles */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Discover Circles</Text>
            <Text style={styles.resultsCount}>{filteredCircles.length} circles</Text>
          </View>

          {filteredCircles.map((circle) => {
            const isJoined = joinedCircles.includes(circle.id);
            return (
              <TouchableOpacity key={circle.id} style={styles.circleCard}>
                <View style={[styles.circleIcon, { backgroundColor: `${circle.color}20` }]}>
                  <Ionicons name={circle.icon as any} size={28} color={circle.color} />
                </View>
                <View style={styles.circleContent}>
                  <View style={styles.circleHeader}>
                    <Text style={styles.circleName}>{circle.name}</Text>
                    <View style={styles.categoryBadge}>
                      <Text style={styles.categoryBadgeText}>{circle.category}</Text>
                    </View>
                  </View>
                  <Text style={styles.circleDescription} numberOfLines={2}>
                    {circle.description}
                  </Text>
                  <View style={styles.circleFooter}>
                    <View style={styles.circleStats}>
                      <View style={styles.circleStat}>
                        <Ionicons name="people" size={14} color={COLORS.gray} />
                        <Text style={styles.circleStatText}>{circle.members} members</Text>
                      </View>
                      <View style={styles.circleStat}>
                        <Ionicons name="chatbubbles" size={14} color={COLORS.gray} />
                        <Text style={styles.circleStatText}>{circle.posts} posts</Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={[styles.joinButton, isJoined && styles.joinedButton]}
                      onPress={() => toggleJoin(circle.id)}
                    >
                      <Text style={[styles.joinButtonText, isJoined && styles.joinedButtonText]}>
                        {isJoined ? 'Joined' : 'Join'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
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
  searchContainer: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: 12,
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
    paddingBottom: 16,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: SIZES.radiusFull,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
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
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: SIZES.lg,
    ...FONTS.bold,
    color: COLORS.textPrimary,
    paddingHorizontal: SIZES.padding,
    marginBottom: 12,
  },
  resultsCount: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textSecondary,
  },
  myCirclesList: {
    paddingHorizontal: SIZES.padding,
    gap: 12,
  },
  myCircleCard: {
    width: 100,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusMd,
    padding: 12,
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  myCircleIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  myCircleName: {
    fontSize: SIZES.sm,
    ...FONTS.semibold,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 4,
  },
  myCircleStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  myCircleCount: {
    fontSize: SIZES.xs,
    ...FONTS.medium,
    color: COLORS.gray,
  },
  createCircleCard: {
    width: 100,
    backgroundColor: `${COLORS.primary}10`,
    borderRadius: SIZES.radiusMd,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
  },
  createCircleIcon: {
    marginBottom: 8,
  },
  createCircleText: {
    fontSize: SIZES.sm,
    ...FONTS.semibold,
    color: COLORS.primary,
    textAlign: 'center',
  },
  circleCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.padding,
    borderRadius: SIZES.radiusMd,
    padding: SIZES.padding,
    marginBottom: 12,
    ...SHADOWS.sm,
  },
  circleIcon: {
    width: 56,
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  circleContent: {
    flex: 1,
  },
  circleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  circleName: {
    fontSize: SIZES.base,
    ...FONTS.bold,
    color: COLORS.textPrimary,
    flex: 1,
  },
  categoryBadge: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: SIZES.radiusFull,
  },
  categoryBadgeText: {
    fontSize: SIZES.xs,
    ...FONTS.medium,
    color: COLORS.textSecondary,
  },
  circleDescription: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.textSecondary,
    lineHeight: 18,
    marginBottom: 12,
  },
  circleFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  circleStats: {
    flexDirection: 'row',
    gap: 12,
  },
  circleStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  circleStatText: {
    fontSize: SIZES.xs,
    ...FONTS.medium,
    color: COLORS.gray,
  },
  joinButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary,
  },
  joinedButton: {
    backgroundColor: `${COLORS.primary}10`,
  },
  joinButtonText: {
    fontSize: SIZES.sm,
    ...FONTS.semibold,
    color: COLORS.white,
  },
  joinedButtonText: {
    color: COLORS.primary,
  },
  bottomPadding: {
    height: 20,
  },
});
