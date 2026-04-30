import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';
import { RootStackParamList } from '../App';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;



interface FilterBarProps {
  filters: string[];
  selectedFilter: string;
  onSelect: (filter: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, selectedFilter, onSelect }) => {
  return (
    <View style={filterStyles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={filterStyles.content}
      >
        {filters.map((filter) => {
          const isActive = selectedFilter === filter;
          
          return (
            <TouchableOpacity
              key={filter}
              onPress={() => onSelect(filter)}
              activeOpacity={0.7}
              style={[
                filterStyles.chip,
                isActive ? filterStyles.activeChip : filterStyles.inactiveChip,
              ]}
            >
              <Text 
                style={[
                  filterStyles.chipText,
                  isActive ? filterStyles.activeText : filterStyles.inactiveText,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const filterStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    marginVertical: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
    minHeight: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inactiveChip: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D1D5DB',
  },
  activeChip: {
    backgroundColor: '#1E40AF',
    borderColor: '#1E40AF',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
  },
  inactiveText: {
    color: '#374151',
  },
  activeText: {
    color: '#FFFFFF',
  },
});


// FIND TUTORS SCREEN


const subjects = ['All', 'Math', 'Science', 'English', 'History', 'Programming', 'Design'];

const tutors = [
  {
    id: '1',
    name: 'Sarah Johnson',
    title: 'Data Scientist',
    rating: 4.7,
    reviews: 98,
    hourlyRate: 40,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    bio: 'Helping students master data science through practical projects.',
    subjects: ['Data Analysis', 'Statistics', 'R'],
    available: true,
  },
  {
    id: '2',
    name: 'John Williams',
    title: 'Software Engineer',
    rating: 4.9,
    reviews: 203,
    hourlyRate: 55,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    bio: 'Full-stack developer with experience at top tech companies.',
    subjects: ['JavaScript', 'React', 'Node.js'],
    available: true,
  },
];

export default function FindTutorsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filteredTutors = tutors.filter(tutor => {
    if (selectedFilter === 'All') return true;
    return tutor.subjects.some(s => 
      s.toLowerCase().includes(selectedFilter.toLowerCase())
    );
  });

  const renderTutor = ({ item }: { item: typeof tutors[0] }) => (
    <View style={tutorStyles.card}>
      <View style={tutorStyles.header}>
        <Image source={{ uri: item.avatar }} style={tutorStyles.avatar} />
        <View style={tutorStyles.info}>
          <Text style={tutorStyles.name}>{item.name}</Text>
          <Text style={tutorStyles.title}>{item.title}</Text>
          <View style={tutorStyles.rating}>
            <Ionicons name="star" size={14} color="#F59E0B" />
            <Text style={tutorStyles.ratingText}>
              {item.rating} ({item.reviews} reviews)
            </Text>
          </View>
        </View>
        {item.available && (
          <View style={tutorStyles.badge}>
            <View style={tutorStyles.dot} />
            <Text style={tutorStyles.badgeText}>Available</Text>
          </View>
        )}
      </View>
      
      <Text style={tutorStyles.bio}>{item.bio}</Text>
      
      <View style={tutorStyles.tags}>
        {item.subjects.map((sub, i) => (
          <View key={i} style={tutorStyles.tag}>
            <Text style={tutorStyles.tagText}>{sub}</Text>
          </View>
        ))}
      </View>
      
      <View style={tutorStyles.footer}>
        <Text style={tutorStyles.priceLabel}>
          From <Text style={tutorStyles.price}>${item.hourlyRate}</Text>/hour
        </Text>
        <TouchableOpacity style={tutorStyles.bookBtn}>
          <Text style={tutorStyles.bookText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Find Tutors</Text>
        <TouchableOpacity>
          <Ionicons name="filter" size={24} color="#111827" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#9CA3AF" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search tutors, subjects..."
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FilterBar
        filters={subjects}
        selectedFilter={selectedFilter}
        onSelect={setSelectedFilter}
      />

      <View style={styles.resultsRow}>
        <Text style={styles.resultCount}>
          {filteredTutors.length} tutors available
        </Text>
        <TouchableOpacity style={styles.sortBtn}>
          <Ionicons name="swap-vertical" size={16} color="#2563EB" />
          <Text style={styles.sortText}>Sort by</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredTutors}
        renderItem={renderTutor}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    paddingHorizontal: 12,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#111827',
  },
  resultsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
  },
  resultCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '500',
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});

const tutorStyles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  title: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#374151',
  },
  badge: {
    position: 'absolute',
    right: 0,
    top: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 4,
  },
  badgeText: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '500',
  },
  bio: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  tag: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#4F46E5',
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
  },
  priceLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  bookBtn: {
    backgroundColor: '#1E40AF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  bookText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});