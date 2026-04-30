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
    avatar: null,
    isGroup: true,
    lastMessage: 'John: Has anyone tried the new React features?',
    time: 'Fri',
    unread: 5,
    online: false,
    typing: false,
    memberCount: 256,
  },
];

const filters = ['All', 'Unread', 'Groups', 'Archived'];

export default function ChatListScreen() {
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

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <TouchableOpacity style={styles.composeButton}>
          <Ionicons name="create-outline" size={22} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={COLORS.gray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search messages..."
            placeholderTextColor={COLORS.grayLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* FIXED: Filter Tabs with proper horizontal scrolling */}
      <View style={styles.filtersWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContentContainer}
          decelerationRate="fast"
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterChip,
                selectedFilter === filter && styles.filterChipActive,
              ]}
              onPress={() => setSelectedFilter(filter)}
              activeOpacity={0.7}
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
      </View>

      {/* Online Now Section */}
      <View style={styles.onlineSection}>
        <Text style={styles.sectionLabel}>Online Now</Text>
        {/* FIXED: Online avatars with proper horizontal scrolling */}
        <View style={styles.onlineListWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.onlineListContent}
            decelerationRate="fast"
          >
            {conversations
              .filter(c => c.online && !c.isGroup)
              .map((conv) => (
                <TouchableOpacity
                  key={conv.id}
                  style={styles.onlineAvatar}
                  onPress={() => navigation.navigate('Chat', {
                    recipientId: conv.id,
                    recipientName: conv.name,
                  })}
                  activeOpacity={0.8}
                >
                  <Image source={{ uri: conv.avatar! }} style={styles.onlineImage} />
                  <View style={styles.onlineDot} />
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      </View>

      {/* Conversations List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.conversationsList}
      >
        {filteredConversations.map((conv) => (
          <TouchableOpacity
            key={conv.id}
            style={styles.conversationCard}
            onPress={() => navigation.navigate('Chat', {
              recipientId: conv.id,
              recipientName: conv.name,
            })}
          >
            <View style={styles.avatarContainer}>
              {conv.isGroup ? (
                <View style={styles.groupAvatar}>
                  <Ionicons name="people" size={24} color={COLORS.primary} />
                </View>
              ) : (
                <Image source={{ uri: conv.avatar! }} style={styles.conversationAvatar} />
              )}
              {conv.online && !conv.isGroup && <View style={styles.onlineIndicator} />}
            </View>

            <View style={styles.conversationContent}>
              <View style={styles.conversationHeader}>
                <Text style={styles.conversationName} numberOfLines={1}>
                  {conv.name}
                </Text>
                <Text style={[
                  styles.conversationTime,
                  conv.unread > 0 && styles.conversationTimeUnread
                ]}>
                  {conv.time}
                </Text>
              </View>
              <View style={styles.conversationFooter}>
                {conv.typing ? (
                  <Text style={styles.typingText}>typing...</Text>
                ) : (
                  <Text style={styles.lastMessage} numberOfLines={1}>
                    {conv.lastMessage}
                  </Text>
                )}
                {conv.unread > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{conv.unread}</Text>
                  </View>
                )}
              </View>
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

  // FIXED: Filters section with proper horizontal scrolling
  filtersWrapper: {
    width: '100%',
    marginBottom: 4,
  },
  
  filtersContentContainer: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: 8,
    gap: 8,
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
    marginBottom: 16,
  },
  
  sectionLabel: {
    fontSize: SIZES.sm,
    ...FONTS.semibold,
    color: COLORS.textSecondary,
    paddingHorizontal: SIZES.padding,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // FIXED: Online list with proper horizontal scrolling
  onlineListWrapper: {
    width: '100%',
  },
  
  onlineListContent: {
    paddingHorizontal: SIZES.padding,
    gap: 12,
    paddingVertical: 4,
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