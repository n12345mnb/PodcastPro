import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';

export default function AudioPlayer({ episode, isPlaying, onPlayPause, onClose }) {
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const insets = useSafeAreaInsets();
  const slideAnim = new Animated.Value(0);

  useEffect(() => {
    // Simulate audio progress
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          const duration = episode.durationSeconds || 3600;
          setProgress(newTime / duration);
          return newTime > duration ? 0 : newTime;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, episode.durationSeconds]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    Animated.timing(slideAnim, {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  if (!episode) return null;

  return (
    <>
      {/* Mini Player */}
      <Pressable style={[styles.miniPlayer, { bottom: insets.bottom + 60 }]} onPress={toggleExpanded}>
        <Image source={{ uri: episode.artwork }} style={styles.miniArtwork} />
        <View style={styles.miniInfo}>
          <Text style={styles.miniTitle} numberOfLines={1}>
            {episode.title}
          </Text>
          <Text style={styles.miniShow} numberOfLines={1}>
            {episode.show}
          </Text>
        </View>
        <Pressable style={styles.miniPlayButton} onPress={onPlayPause}>
          <MaterialIcons 
            name={isPlaying ? 'pause' : 'play-arrow'} 
            size={24} 
            color="#fff" 
          />
        </Pressable>
        <Pressable style={styles.miniCloseButton} onPress={onClose}>
          <MaterialIcons name="close" size={20} color="#999" />
        </Pressable>
      </Pressable>

      {/* Expanded Player */}
      {isExpanded && (
        <Animated.View 
          style={[
            styles.expandedPlayer,
            {
              opacity: slideAnim,
              transform: [{
                translateY: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [500, 0],
                })
              }]
            }
          ]}
        >
          <View style={styles.expandedHeader}>
            <Pressable onPress={toggleExpanded}>
              <MaterialIcons name="keyboard-arrow-down" size={28} color="#fff" />
            </Pressable>
            <Text style={styles.expandedHeaderText}>Now Playing</Text>
            <Pressable onPress={onClose}>
              <MaterialIcons name="close" size={24} color="#fff" />
            </Pressable>
          </View>

          <View style={styles.expandedContent}>
            <Image source={{ uri: episode.artwork }} style={styles.expandedArtwork} />
            
            <View style={styles.trackInfo}>
              <Text style={styles.expandedTitle}>{episode.title}</Text>
              <Text style={styles.expandedShow}>{episode.show}</Text>
            </View>

            <View style={styles.progressContainer}>
              <Slider
                style={styles.progressSlider}
                minimumValue={0}
                maximumValue={1}
                value={progress}
                minimumTrackTintColor="#1DB954"
                maximumTrackTintColor="#333"
                thumbStyle={styles.sliderThumb}
              />
              <View style={styles.timeContainer}>
                <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                <Text style={styles.timeText}>{episode.duration}</Text>
              </View>
            </View>

            <View style={styles.controls}>
              <Pressable style={styles.controlButton}>
                <MaterialIcons name="skip-previous" size={40} color="#fff" />
              </Pressable>
              <Pressable style={styles.playPauseButton} onPress={onPlayPause}>
                <MaterialIcons 
                  name={isPlaying ? 'pause' : 'play-arrow'} 
                  size={50} 
                  color="#000" 
                />
              </Pressable>
              <Pressable style={styles.controlButton}>
                <MaterialIcons name="skip-next" size={40} color="#fff" />
              </Pressable>
            </View>

            <View style={styles.extraControls}>
              <Pressable style={styles.extraButton}>
                <MaterialIcons name="favorite-border" size={24} color="#fff" />
              </Pressable>
              <Pressable style={styles.extraButton}>
                <MaterialIcons name="share" size={24} color="#fff" />
              </Pressable>
              <Pressable style={styles.extraButton}>
                <MaterialIcons name="playlist-add" size={24} color="#fff" />
              </Pressable>
            </View>
          </View>
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  miniPlayer: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: '#1e1e1e',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 0.5,
    borderTopColor: '#333',
  },
  miniArtwork: {
    width: 48,
    height: 48,
    borderRadius: 4,
  },
  miniInfo: {
    flex: 1,
    marginLeft: 12,
  },
  miniTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  miniShow: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  miniPlayButton: {
    padding: 8,
    marginRight: 8,
  },
  miniCloseButton: {
    padding: 8,
  },
  expandedPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#121212',
    zIndex: 1000,
  },
  expandedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  expandedHeaderText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  expandedContent: {
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: 'center',
  },
  expandedArtwork: {
    width: 300,
    height: 300,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 40,
  },
  trackInfo: {
    alignItems: 'center',
    marginBottom: 40,
  },
  expandedTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  expandedShow: {
    fontSize: 18,
    color: '#1DB954',
    textAlign: 'center',
  },
  progressContainer: {
    marginBottom: 40,
  },
  progressSlider: {
    width: '100%',
    height: 40,
  },
  sliderThumb: {
    backgroundColor: '#1DB954',
    width: 15,
    height: 15,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  timeText: {
    fontSize: 14,
    color: '#999',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  controlButton: {
    padding: 20,
  },
  playPauseButton: {
    backgroundColor: '#1DB954',
    borderRadius: 35,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  extraControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  extraButton: {
    padding: 16,
  },
});