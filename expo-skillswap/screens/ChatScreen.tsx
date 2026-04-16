import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';

const mockMessages = [
  {
    id: '1',
    text: "Hi Victor! I saw you're an expert in Machine Learning. I need help with my neural network project.",
    time: '10:30 AM',
    isMe: true,
  },
  {
    id: '2',
    text: "Hello! Yes, I'd be happy to help you out. What specific aspects are you working on?",
    time: '10:32 AM',
    isMe: false,
  },
  {
    id: '3',
    text: "I'm trying to implement a CNN for image classification, but I'm struggling with the architecture design and getting good accuracy.",
    time: '10:35 AM',
    isMe: true,
  },
  {
    id: '4',
    text: "That's a great project! CNNs can be tricky at first. Let me share some tips:\n\n1. Start with a simple architecture\n2. Use data augmentation\n3. Implement batch normalization\n\nWould you like to schedule a session to go over this together?",
    time: '10:38 AM',
    isMe: false,
  },
  {
    id: '5',
    text: "That would be amazing! When are you available?",
    time: '10:40 AM',
    isMe: true,
  },
  {
    id: '6',
    text: "Sure! I can help you with the machine learning project. How about tomorrow at 3 PM?",
    time: '10:42 AM',
    isMe: false,
  },
];

export default function ChatScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { recipientName } = route.params as { recipientId: string; recipientName: string };
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const scrollViewRef = useRef<ScrollView>(null);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: String(messages.length + 1),
        text: message.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true,
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.profileSection}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150' }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.recipientName}>{recipientName}</Text>
            <View style={styles.statusContainer}>
              <View style={styles.onlineDot} />
              <Text style={styles.statusText}>Online</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="videocam" size={22} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="call" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: false })}
      >
        {/* Date Divider */}
        <View style={styles.dateDivider}>
          <View style={styles.dateLine} />
          <Text style={styles.dateText}>Today</Text>
          <View style={styles.dateLine} />
        </View>

        {messages.map((msg, index) => {
          const showAvatar = !msg.isMe && (
            index === messages.length - 1 ||
            messages[index + 1]?.isMe
          );

          return (
            <View
              key={msg.id}
              style={[
                styles.messageRow,
                msg.isMe ? styles.messageRowMe : styles.messageRowOther,
              ]}
            >
              {!msg.isMe && (
                <View style={styles.avatarPlaceholder}>
                  {showAvatar && (
                    <Image
                      source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150' }}
                      style={styles.messageAvatar}
                    />
                  )}
                </View>
              )}
              <View style={[
                styles.messageBubble,
                msg.isMe ? styles.messageBubbleMe : styles.messageBubbleOther,
              ]}>
                <Text style={[
                  styles.messageText,
                  msg.isMe ? styles.messageTextMe : styles.messageTextOther,
                ]}>
                  {msg.text}
                </Text>
                <Text style={[
                  styles.messageTime,
                  msg.isMe ? styles.messageTimeMe : styles.messageTimeOther,
                ]}>
                  {msg.time}
                  {msg.isMe && (
                    <Text> ✓✓</Text>
                  )}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachButton}>
            <Ionicons name="add-circle" size={26} color={COLORS.primary} />
          </TouchableOpacity>

          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Type a message..."
              placeholderTextColor={COLORS.textLight}
              value={message}
              onChangeText={setMessage}
              multiline
              maxLength={1000}
            />
            <TouchableOpacity style={styles.emojiButton}>
              <Ionicons name="happy-outline" size={22} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.sendButton,
              message.trim() && styles.sendButtonActive,
            ]}
            onPress={sendMessage}
            disabled={!message.trim()}
          >
            <Ionicons
              name="send"
              size={20}
              color={message.trim() ? COLORS.white : COLORS.textLight}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  profileSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
    marginRight: 10,
  },
  recipientName: {
    fontSize: SIZES.base,
    ...FONTS.semibold,
    color: COLORS.textPrimary,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.success,
    marginRight: 5,
  },
  statusText: {
    fontSize: SIZES.sm,
    ...FONTS.regular,
    color: COLORS.success,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 4,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${COLORS.primary}10`,
    borderRadius: 10,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: 16,
  },
  dateDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dateText: {
    fontSize: SIZES.sm,
    ...FONTS.medium,
    color: COLORS.textLight,
    paddingHorizontal: 12,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  messageRowMe: {
    justifyContent: 'flex-end',
  },
  messageRowOther: {
    justifyContent: 'flex-start',
  },
  avatarPlaceholder: {
    width: 32,
    marginRight: 8,
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 10,
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
  },
  messageBubbleMe: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 4,
  },
  messageBubbleOther: {
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: 4,
    ...SHADOWS.sm,
  },
  messageText: {
    fontSize: SIZES.base,
    ...FONTS.regular,
    lineHeight: 22,
  },
  messageTextMe: {
    color: COLORS.white,
  },
  messageTextOther: {
    color: COLORS.textPrimary,
  },
  messageTime: {
    fontSize: SIZES.xs,
    marginTop: 4,
  },
  messageTimeMe: {
    color: `${COLORS.white}aa`,
    textAlign: 'right',
  },
  messageTimeOther: {
    color: COLORS.textLight,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: SIZES.padding,
    paddingVertical: 10,
    paddingBottom: Platform.OS === 'ios' ? 24 : 10,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    gap: 8,
  },
  attachButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: COLORS.background,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    minHeight: 40,
    maxHeight: 100,
  },
  textInput: {
    flex: 1,
    fontSize: SIZES.base,
    ...FONTS.regular,
    color: COLORS.textPrimary,
    paddingTop: 0,
    paddingBottom: 0,
  },
  emojiButton: {
    marginLeft: 8,
    paddingBottom: 2,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.grayLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonActive: {
    backgroundColor: COLORS.primary,
  },
});
