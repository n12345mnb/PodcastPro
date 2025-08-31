
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

export default function RecordScreen() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [episodeTitle, setEpisodeTitle] = useState('');
  const [episodeDescription, setEpisodeDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Music Analysis');

  const categories = ['Music Analysis', 'Artist Comparisons', 'Street Stories', 'Bay Area History', 'Industry Talk'];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = () => {
    setIsRecording(true);
    setIsPaused(false);
    // Start recording timer simulation
    const interval = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  const pauseRecording = () => {
    setIsPaused(!isPaused);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    setRecordingTime(0);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Record Episode</Text>
          <Text style={styles.headerSubtitle}>Northern Califas Most Hated</Text>
        </View>

        {/* Episode Details Form */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Episode Details</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Episode Title</Text>
            <TextInput
              style={styles.textInput}
              placeholder="navigationset4: The Real Story..."
              placeholderTextColor="#666"
              value={episodeTitle}
              onChangeText={setEpisodeTitle}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="Discussing navigationset4's impact on Bay Area music scene..."
              placeholderTextColor="#666"
              multiline
              numberOfLines={4}
              value={episodeDescription}
              onChangeText={setEpisodeDescription}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
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
          </View>
        </View>

        {/* Recording Studio */}
        <View style={styles.studioSection}>
          <Text style={styles.sectionTitle}>Recording Studio</Text>
          
          {/* Recording Timer */}
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>{formatTime(recordingTime)}</Text>
            <View style={[styles.recordingIndicator, isRecording && !isPaused && styles.recordingActive]} />
          </View>

          {/* Recording Controls */}
          <View style={styles.controlsContainer}>
            {!isRecording ? (
              <Pressable style={styles.recordButton} onPress={startRecording}>
                <MaterialIcons name="mic" size={32} color="#fff" />
                <Text style={styles.controlText}>Start Recording</Text>
              </Pressable>
            ) : (
              <View style={styles.recordingControls}>
                <Pressable style={styles.controlButton} onPress={pauseRecording}>
                  <MaterialIcons name={isPaused ? "play-arrow" : "pause"} size={28} color="#fff" />
                  <Text style={styles.controlButtonText}>{isPaused ? "Resume" : "Pause"}</Text>
                </Pressable>
                
                <Pressable style={[styles.controlButton, styles.stopButton]} onPress={stopRecording}>
                  <MaterialIcons name="stop" size={28} color="#fff" />
                  <Text style={styles.controlButtonText}>Stop</Text>
                </Pressable>
              </View>
            )}
          </View>

          {/* Quick Topics */}
          <View style={styles.quickTopics}>
            <Text style={styles.quickTopicsTitle}>Quick Discussion Topics</Text>
            <View style={styles.topicsList}>
              {[
                'navigationset4 vs Bay Area Legends',
                'The Denny\'s Incident Story',
                'Mac Dre\'s Influence',
                'Real Street Stories',
                'Industry Truth Telling',
                'Northern California Scene'
              ].map((topic, index) => (
                <Pressable key={index} style={styles.topicChip}>
                  <Text style={styles.topicText}>{topic}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        {/* Upload Options */}
        <View style={styles.uploadSection}>
          <Text style={styles.sectionTitle}>Upload Existing Content</Text>
          <Pressable style={styles.uploadButton}>
            <MaterialIcons name="cloud-upload" size={24} color="#1DB954" />
            <Text style={styles.uploadText}>Upload Audio File</Text>
          </Pressable>
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
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#1DB954',
    marginTop: 4,
  },
  formSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  categoryScroll: {
    flexDirection: 'row',
  },
  categoryButton: {
    backgroundColor: '#1e1e1e',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  categoryButtonActive: {
    backgroundColor: '#1DB954',
    borderColor: '#1DB954',
  },
  categoryText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#fff',
  },
  studioSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 0.5,
    borderTopColor: '#333',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'monospace',
  },
  recordingIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#666',
    marginTop: 10,
  },
  recordingActive: {
    backgroundColor: '#FF4444',
  },
  controlsContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  recordButton: {
    backgroundColor: '#FF4444',
    borderRadius: 50,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 8,
    fontWeight: '500',
  },
  recordingControls: {
    flexDirection: 'row',
    gap: 20,
  },
  controlButton: {
    backgroundColor: '#1DB954',
    borderRadius: 25,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stopButton: {
    backgroundColor: '#FF4444',
  },
  controlButtonText: {
    color: '#fff',
    fontSize: 10,
    marginTop: 4,
    fontWeight: '500',
  },
  quickTopics: {
    marginTop: 20,
  },
  quickTopicsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  topicsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  topicChip: {
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#333',
  },
  topicText: {
    fontSize: 12,
    color: '#1DB954',
  },
  uploadSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 0.5,
    borderTopColor: '#333',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1DB954',
  },
  uploadText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1DB954',
    marginLeft: 12,
  },
});
