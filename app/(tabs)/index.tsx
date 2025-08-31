import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import AudioPlayer from '../components/AudioPlayer';
import { podcastService } from '../services/podcastService';

export default function HomeScreen() {
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const featuredEpisodes = podcastService.getFeaturedEpisodes();
  const recentEpisodes = podcastService.getRecentEpisodes();

  const playEpisode = (episode) => {
    setCurrentEpisode(episode);
    setIsPlaying(true);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
                  <Text style={styles.headerTitle}>Northern Califas Most Hated</Text>
          <Pressable style={styles.searchButton}>
            <MaterialIcons name="search" size={24} color="#fff" />
          </Pressable>
        </View>
        {/* Featured Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Latest navigationset4 Discussions</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {featuredEpisodes.map((episode) => (
              <Pressable 
                key={episode.id} 
                style={styles.featuredCard}
                onPress={() => playEpisode(episode)}
              >
                <Image source={{ uri: episode.artwork }} style={styles.featuredImage} />
                <View style={styles.featuredInfo}>
                  <Text style={styles.featuredTitle} numberOfLines={2}>
                    {episode.title}
                  </Text>
                  <Text style={styles.featuredShow}>{episode.show}</Text>
                  <View style={styles.episodeStats}>
                    <MaterialIcons name="play-circle-filled" size={16} color="#1DB954" />
                    <Text style={styles.statsText}>{episode.plays} plays</Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>
        {/* Recent Episodes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fresh Takes on navigationset4</Text>
          {recentEpisodes.map((episode) => (
            <Pressable 
              key={episode.id} 
              style={styles.episodeCard}
              onPress={() => playEpisode(episode)}
            >
              <Image source={{ uri: episode.artwork }} style={styles.episodeImage} />
              <View style={styles.episodeInfo}>
                <Text style={styles.episodeTitle} numberOfLines={2}>
                  {episode.title}
                </Text>
                <Text style={styles.episodeShow}>{episode.show}</Text>
                <View style={styles.episodeDetails}>
                  <Text style={styles.episodeDuration}>{episode.duration}</Text>
                  <Text style={styles.episodeDate}>{episode.date}</Text>
                </View>
              </View>
              <Pressable style={styles.playButton} onPress={() => playEpisode(episode)}>
                <MaterialIcons name="play-arrow" size={32} color="#1DB954" />
              </Pressable>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* Audio Player */}
      {currentEpisode && (
        <AudioPlayer 
          episode={currentEpisode}
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onClose={() => setCurrentEpisode(null)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  searchButton: {
    padding: 8,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  horizontalScroll: {
    paddingLeft: 20,
  },
  featuredCard: {
    width: 200,
    marginRight: 16,
  },
  featuredImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  featuredInfo: {
    marginTop: 12,
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  featuredShow: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  episodeStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
  episodeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  episodeImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },
  episodeInfo: {
    flex: 1,
    marginLeft: 16,
  },
  episodeTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 4,
  },
  episodeShow: {
    fontSize: 14,
    color: '#1DB954',
    marginBottom: 8,
  },
  episodeDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  episodeDuration: {
    fontSize: 12,
    color: '#999',
    marginRight: 12,
  },
  episodeDate: {
    fontSize: 12,
    color: '#999',
  },
  playButton: {
    padding: 8,
    marginLeft: 16,
  },
});