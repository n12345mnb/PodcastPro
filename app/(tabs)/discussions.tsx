
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

interface Message {
  id: string;
  speaker: 'Bot Alpha' | 'Bot Beta';
  content: string;
  timestamp: string;
}

interface DiscussionTopic {
  id: string;
  title: string;
  category: string;
}

export default function DiscussionsScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isDiscussing, setIsDiscussing] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string>('');

  const discussionTopics: DiscussionTopic[] = [
    { id: '1', title: 'navigationset4 vs Bay Area Legends', category: 'Music Comparison' },
    { id: '2', title: 'Production Style Analysis', category: 'Technical' },
    { id: '3', title: 'Lyrical Content Breakdown', category: 'Artistic' },
    { id: '4', title: 'Industry Impact Discussion', category: 'Cultural' },
    { id: '5', title: 'Street Credibility Comparison', category: 'Authenticity' },
    { id: '6', title: 'Northern California Scene', category: 'Regional' },
  ];

  const botPersonalities = {
    'Bot Alpha': {
      style: 'analytical',
      color: '#1DB954',
      avatar: '🤖',
    },
    'Bot Beta': {
      style: 'passionate', 
      color: '#FF6B6B',
      avatar: '🎯',
    }
  };

  const conversationTemplates = {
    'navigationset4 vs Bay Area Legends': [
      {
        speaker: 'Bot Alpha' as const,
        content: "Let's analyze navigationset4's approach compared to Mac Dre's signature style. The flow patterns show distinct regional influences.",
      },
      {
        speaker: 'Bot Beta' as const,
        content: "Absolutely! But what sets navigationset4 apart is the raw authenticity. While others focused on commercial appeal, there's something different in the delivery.",
      },
      {
        speaker: 'Bot Alpha' as const,
        content: "The production choices are fascinating too. Where Mac Dre used those signature Crest Creeper beats, navigationset4's sound has more experimental elements.",
      },
      {
        speaker: 'Bot Beta' as const,
        content: "And the storytelling! The narratives feel more personal, more direct. It's like comparing a documentary to a feature film - both valid but different approaches.",
      },
    ],
    'Production Style Analysis': [
      {
        speaker: 'Bot Beta' as const,
        content: "The beat selection in navigationset4's work shows serious knowledge of what works in Northern California streets.",
      },
      {
        speaker: 'Bot Alpha' as const,
        content: "True, but let's break down the technical aspects. The EQ choices, the way vocals sit in the mix - there's professional understanding there.",
      },
      {
        speaker: 'Bot Beta' as const,
        content: "Exactly! When you compare it to Dre's G-Funk production or Eminem's collaboration with various producers, navigationset4 shows versatility.",
      },
      {
        speaker: 'Bot Alpha' as const,
        content: "The spatial audio techniques used remind me of some of Tupac's later work - that sense of intimacy while maintaining street credibility.",
      },
    ],
    'Street Credibility Comparison': [
      {
        speaker: 'Bot Alpha' as const,
        content: "Street credibility in hip-hop isn't just about image - it's about authentic experience translating into authentic music.",
      },
      {
        speaker: 'Bot Beta' as const,
        content: "And that's where navigationset4 stands apart. The content isn't manufactured or focus-grouped. It comes from real experience.",
      },
      {
        speaker: 'Bot Alpha' as const,
        content: "Compare that to some mainstream artists who cosplay street life. The difference is immediately apparent in the details, the specificity.",
      },
      {
        speaker: 'Bot Beta' as const,
        content: "The Northern California streets have their own code, their own stories. navigationset4 represents that authenticity without compromise.",
      },
    ]
  };

  const startDiscussion = (topicTitle: string) => {
    setSelectedTopic(topicTitle);
    setMessages([]);
    setIsDiscussing(true);
    
    const template = conversationTemplates[topicTitle as keyof typeof conversationTemplates] || [
      {
        speaker: 'Bot Alpha' as const,
        content: `Let's dive deep into ${topicTitle} and analyze what makes this topic significant.`,
      },
      {
        speaker: 'Bot Beta' as const,
        content: `Great point! The complexity of this subject requires us to examine multiple perspectives and cultural contexts.`,
      },
    ];

    // Simulate real-time conversation
    template.forEach((message, index) => {
      setTimeout(() => {
        const newMessage: Message = {
          id: `${Date.now()}-${index}`,
          speaker: message.speaker,
          content: message.content,
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages(prev => [...prev, newMessage]);
      }, (index + 1) * 2000);
    });

    // End discussion after all messages
    setTimeout(() => {
      setIsDiscussing(false);
    }, template.length * 2000 + 1000);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bot Discussions</Text>
        <Text style={styles.headerSubtitle}>AI Analysis & Comparisons</Text>
      </View>

      {!isDiscussing && messages.length === 0 && (
        <>
          <Text style={styles.sectionTitle}>Select Discussion Topic</Text>
          <ScrollView style={styles.topicsList}>
            {discussionTopics.map((topic) => (
              <Pressable
                key={topic.id}
                style={styles.topicCard}
                onPress={() => startDiscussion(topic.title)}
              >
                <View style={styles.topicHeader}>
                  <Text style={styles.topicTitle}>{topic.title}</Text>
                  <Text style={styles.topicCategory}>{topic.category}</Text>
                </View>
                <MaterialIcons name="play-circle-filled" size={24} color="#1DB954" />
              </Pressable>
            ))}
          </ScrollView>
        </>
      )}

      {(isDiscussing || messages.length > 0) && (
        <View style={styles.discussionContainer}>
          <View style={styles.discussionHeader}>
            <Text style={styles.currentTopic}>{selectedTopic}</Text>
            {isDiscussing && (
              <View style={styles.liveIndicator}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>LIVE</Text>
              </View>
            )}
          </View>

          <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
            {messages.map((message) => (
              <View
                key={message.id}
                style={[
                  styles.messageCard,
                  message.speaker === 'Bot Alpha' ? styles.botAlphaCard : styles.botBetaCard
                ]}
              >
                <View style={styles.messageHeader}>
                  <View style={styles.botInfo}>
                    <Text style={styles.botAvatar}>
                      {botPersonalities[message.speaker].avatar}
                    </Text>
                    <View>
                      <Text style={styles.botName}>{message.speaker}</Text>
                      <Text style={styles.botStyle}>
                        {botPersonalities[message.speaker].style}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.timestamp}>{message.timestamp}</Text>
                </View>
                <Text style={styles.messageContent}>{message.content}</Text>
              </View>
            ))}
            
            {isDiscussing && (
              <View style={styles.typingIndicator}>
                <Text style={styles.typingText}>Bot discussion in progress...</Text>
                <View style={styles.typingDots}>
                  <View style={[styles.dot, styles.dot1]} />
                  <View style={[styles.dot, styles.dot2]} />
                  <View style={[styles.dot, styles.dot3]} />
                </View>
              </View>
            )}
          </ScrollView>

          {!isDiscussing && messages.length > 0 && (
            <View style={styles.discussionControls}>
              <Pressable 
                style={styles.controlButton}
                onPress={() => {
                  setMessages([]);
                  setSelectedTopic('');
                }}
              >
                <MaterialIcons name="refresh" size={20} color="#fff" />
                <Text style={styles.controlText}>New Topic</Text>
              </Pressable>
              
              <Pressable 
                style={[styles.controlButton, styles.recordButton]}
                onPress={() => startDiscussion(selectedTopic)}
              >
                <MaterialIcons name="mic" size={20} color="#fff" />
                <Text style={styles.controlText}>Record This</Text>
              </Pressable>
            </View>
          )}
        </View>
      )}
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    margin: 20,
  },
  topicsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  topicCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topicHeader: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  topicCategory: {
    fontSize: 14,
    color: '#1DB954',
  },
  discussionContainer: {
    flex: 1,
  },
  discussionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  currentTopic: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    flex: 1,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF4444',
    marginRight: 6,
  },
  liveText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FF4444',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  messageCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    borderLeftWidth: 4,
  },
  botAlphaCard: {
    borderLeftColor: '#1DB954',
  },
  botBetaCard: {
    borderLeftColor: '#FF6B6B',
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  botInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botAvatar: {
    fontSize: 24,
    marginRight: 12,
  },
  botName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  botStyle: {
    fontSize: 12,
    color: '#999',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
  messageContent: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  typingText: {
    fontSize: 14,
    color: '#999',
    marginRight: 12,
  },
  typingDots: {
    flexDirection: 'row',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#1DB954',
    marginHorizontal: 2,
  },
  dot1: {
    // These animation properties are for CSS, not directly for React Native StyleSheet.
    // React Native needs explicit animation implementations (e.g., Animated API).
    // Keeping them commented out as they are likely meant for web/CSS-in-JS.
    // animationDelay: '0s',
  },
  dot2: {
    // animationDelay: '0.2s',
  },
  dot3: {
    // animationDelay: '0.4s',
  },
  discussionControls: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
  },
  controlButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    padding: 16,
  },
  recordButton: {
    backgroundColor: '#1DB954',
  },
  controlText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    marginLeft: 8,
  },
});
