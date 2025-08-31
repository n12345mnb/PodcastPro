import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { podcastService } from '../services/podcastService';

export default function ShowsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
    const categories = ['All', 'Music Analysis', 'Artist Comparisons', 'Street Stories', 'Bay Area History', 'Industry Talk'];
  const shows = podcastService.getAllShows();

  const filteredShows = shows.filter(show => 
    (selectedCategory === 'All' || show.category === selectedCategory) &&
    (searchQuery === '' || show.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>      <View style={styles.header}>
        <Text style={styles.headerTitle}>navigationset4 Content</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search shows..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category) => (
          <Pressable
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category && styles.categoryTextActive
            ]}>
              {category}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Shows Grid */}
      <ScrollView style={styles.showsList} showsVerticalScrollIndicator={false}>
        <View style={styles.showsGrid}>
          {filteredShows.map((show) => (
            <Pressable key={show.id} style={styles.showCard}>
              <Image source={{ uri: show.artwork }} style={styles.showImage} />
              <View style={styles.showInfo}>
                <Text style={styles.showTitle} numberOfLines={2}>
                  {show.title}
                </Text>
                <Text style={styles.showHost}>{show.host}</Text>
                <View style={styles.showStats}>
                  <MaterialIcons name="star" size={14} color="#FFD700" />
                  <Text style={styles.rating}>{show.rating}</Text>
                  <Text style={styles.episodes}>• {show.episodeCount} episodes</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesContent: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    backgroundColor: '#1e1e1e',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
  },
  categoryButtonActive: {
    backgroundColor: '#1DB954',
  },
  categoryText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#fff',
  },
  showsList: {
    flex: 1,
  },
  showsGrid: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  showCard: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  showImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  showInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'space-between',
  },
  showTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  showHost: {
    fontSize: 14,
    color: '#1DB954',
    marginBottom: 8,
  },
  showStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    color: '#FFD700',
    marginLeft: 4,
    fontWeight: '500',
  },
  episodes: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
});