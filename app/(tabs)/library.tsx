import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { podcastService } from '../services/podcastService';

export default function LibraryScreen() {
  const [activeTab, setActiveTab] = useState('Recent');
  
  const tabs = ['Recent', 'Downloaded', 'Favorites', 'Playlists'];
  const recentEpisodes = podcastService.getRecentEpisodes();
  const favoriteShows = podcastService.getFavoriteShows();

  const renderContent = () => {
    switch (activeTab) {
      case 'Recent':
        return (
          <View style={styles.contentContainer}>
            {recentEpisodes.map((episode) => (
              <Pressable key={episode.id} style={styles.episodeItem}>
                <Image source={{ uri: episode.artwork }} style={styles.episodeImage} />
                <View style={styles.episodeInfo}>
                  <Text style={styles.episodeTitle} numberOfLines={2}>
                    {episode.title}
                  </Text>
                  <Text style={styles.episodeShow}>{episode.show}</Text>
                  <Text style={styles.episodeDate}>{episode.date}</Text>
                </View>
                <Pressable style={styles.moreButton}>
                  <MaterialIcons name="more-vert" size={24} color="#999" />
                </Pressable>
              </Pressable>
            ))}
          </View>
        );
      case 'Downloaded':
        return (
          <View style={styles.emptyState}>
            <MaterialIcons name="download" size={64} color="#333" />
            <Text style={styles.emptyTitle}>No Downloaded Episodes</Text>
            <Text style={styles.emptySubtitle}>
              Download episodes to listen offline
            </Text>
          </View>
        );
      case 'Favorites':
        return (
          <View style={styles.contentContainer}>
            {favoriteShows.map((show) => (
              <Pressable key={show.id} style={styles.showItem}>
                <Image source={{ uri: show.artwork }} style={styles.showImage} />
                <View style={styles.showInfo}>
                  <Text style={styles.showTitle}>{show.title}</Text>
                  <Text style={styles.showHost}>{show.host}</Text>
                  <Text style={styles.showEpisodes}>{show.episodeCount} episodes</Text>
                </View>
                <Pressable style={styles.moreButton}>
                  <MaterialIcons name="favorite" size={24} color="#FF6B6B" />
                </Pressable>
              </Pressable>
            ))}
          </View>
        );
      case 'Playlists':
        return (
          <View style={styles.contentContainer}>
            <Pressable style={styles.createPlaylistButton}>
              <MaterialIcons name="add" size={24} color="#1DB954" />
              <Text style={styles.createPlaylistText}>Create New Playlist</Text>
            </Pressable>
            
            <Pressable style={styles.playlistItem}>
              <View style={styles.playlistIcon}>
                <MaterialIcons name="queue-music" size={32} color="#1DB954" />
              </View>
              <View style={styles.playlistInfo}>
                <Text style={styles.playlistTitle}>My Favorites</Text>
                <Text style={styles.playlistCount}>12 episodes</Text>
              </View>
            </Pressable>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Library</Text>
        <Pressable style={styles.profileButton}>
          <MaterialIcons name="person" size={24} color="#fff" />
        </Pressable>
      </View>

      {/* Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
        contentContainerStyle={styles.tabsContent}
      >
        {tabs.map((tab) => (
          <Pressable
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab && styles.activeTabText
            ]}>
              {tab}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderContent()}
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
  profileButton: {
    padding: 8,
  },
  tabsContainer: {
    marginBottom: 20,
  },
  tabsContent: {
    paddingHorizontal: 20,
  },
  tab: {
    backgroundColor: '#1e1e1e',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
  },
  activeTab: {
    backgroundColor: '#1DB954',
  },
  tabText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  episodeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  episodeImage: {
    width: 56,
    height: 56,
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
    marginBottom: 2,
  },
  episodeDate: {
    fontSize: 12,
    color: '#999',
  },
  showItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  showImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },
  showInfo: {
    flex: 1,
    marginLeft: 16,
  },
  showTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  showHost: {
    fontSize: 14,
    color: '#1DB954',
    marginBottom: 2,
  },
  showEpisodes: {
    fontSize: 12,
    color: '#999',
  },
  moreButton: {
    padding: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  createPlaylistButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  createPlaylistText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1DB954',
    marginLeft: 12,
  },
  playlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  playlistIcon: {
    width: 56,
    height: 56,
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playlistInfo: {
    flex: 1,
    marginLeft: 16,
  },
  playlistTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  playlistCount: {
    fontSize: 14,
    color: '#999',
  },
});