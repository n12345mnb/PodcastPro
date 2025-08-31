import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';

export default function ProfileScreen() {
  const userStats = {
    totalListeningTime: '247 hours',
    favoriteShows: 23,
    episodesCompleted: 156,
    subscriptions: 12,
  };

  const menuItems = [
    { icon: 'download', title: 'Downloads', subtitle: 'Manage offline content' },
    { icon: 'history', title: 'Listening History', subtitle: 'View your activity' },
    { icon: 'notifications', title: 'Notifications', subtitle: 'New episodes alerts' },
    { icon: 'star', title: 'Rate App', subtitle: 'Share your feedback' },
    { icon: 'help', title: 'Help & Support', subtitle: 'Get assistance' },
    { icon: 'privacy-tip', title: 'Privacy Policy', subtitle: 'Your data protection' },
    { icon: 'logout', title: 'Sign Out', subtitle: 'Log out of your account' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face' }}
                style={styles.avatar}
              />
              <Pressable style={styles.editButton}>
                <MaterialIcons name="edit" size={16} color="#fff" />
              </Pressable>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>John Doe</Text>
              <Text style={styles.userEmail}>john.doe@email.com</Text>
              <Text style={styles.memberSince}>Member since Jan 2024</Text>
            </View>
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Your Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <MaterialIcons name="schedule" size={24} color="#1DB954" />
              <Text style={styles.statValue}>{userStats.totalListeningTime}</Text>
              <Text style={styles.statLabel}>Listening Time</Text>
            </View>
            <View style={styles.statCard}>
              <MaterialIcons name="favorite" size={24} color="#FF6B6B" />
              <Text style={styles.statValue}>{userStats.favoriteShows}</Text>
              <Text style={styles.statLabel}>Favorite Shows</Text>
            </View>
            <View style={styles.statCard}>
              <MaterialIcons name="check-circle" size={24} color="#4ECDC4" />
              <Text style={styles.statValue}>{userStats.episodesCompleted}</Text>
              <Text style={styles.statLabel}>Episodes Done</Text>
            </View>
            <View style={styles.statCard}>
              <MaterialIcons name="subscriptions" size={24} color="#FFE66D" />
              <Text style={styles.statValue}>{userStats.subscriptions}</Text>
              <Text style={styles.statLabel}>Subscriptions</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionButtons}>
            <Pressable style={styles.actionButton}>
              <MaterialIcons name="add" size={24} color="#1DB954" />
              <Text style={styles.actionText}>Add Show</Text>
            </Pressable>
            <Pressable style={styles.actionButton}>
              <MaterialIcons name="share" size={24} color="#1DB954" />
              <Text style={styles.actionText}>Share App</Text>
            </Pressable>
            <Pressable style={styles.actionButton}>
              <MaterialIcons name="feedback" size={24} color="#1DB954" />
              <Text style={styles.actionText}>Feedback</Text>
            </Pressable>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Settings</Text>
          {menuItems.map((item, index) => (
            <Pressable key={index} style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                <MaterialIcons name={item.icon} size={24} color="#1DB954" />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={20} color="#666" />
            </Pressable>
          ))}
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>PodcastPro v1.0.0</Text>
          <Text style={styles.appCopyright}>© 2024 PodcastPro. All rights reserved.</Text>
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
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#1DB954',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    marginLeft: 20,
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#1DB954',
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 14,
    color: '#999',
  },
  statsSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
  quickActions: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    minWidth: 80,
  },
  actionText: {
    fontSize: 12,
    color: '#fff',
    marginTop: 8,
    fontWeight: '500',
  },
  menuSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  menuIconContainer: {
    width: 40,
    alignItems: 'center',
  },
  menuContent: {
    flex: 1,
    marginLeft: 16,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#999',
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingBottom: 100,
  },
  appVersion: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  appCopyright: {
    fontSize: 12,
    color: '#666',
  },
});