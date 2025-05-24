// app/(tabs)/inbox.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { notifications } from '@/constants/data';
import { GlobalStyles } from '@/constants/Styles';
import { Colors } from '@/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Heart, MessageCircle, UserPlus } from 'lucide-react-native';
import { Link } from 'expo-router';

// Helper to format timestamp
const formatTimeAgo = (isoString: string) => {
  const now = new Date();
  const past = new Date(isoString);
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}j`;
};

export default function InboxScreen() {
  const insets = useSafeAreaInsets();

  const renderNotificationItem = ({ item }: { item: typeof notifications[0] }) => {
    let IconComponent;
    let iconColor = Colors.gray;
    switch (item.type) {
      case 'like':
        IconComponent = Heart;
        iconColor = Colors.primary;
        break;
      case 'comment':
        IconComponent = MessageCircle;
        iconColor = Colors.secondary;
        break;
      case 'follow':
        IconComponent = UserPlus;
        iconColor = Colors.dark.tint;
        break;
      default:
        IconComponent = Heart;
    }

    return (
      <Link href={item.video ? { pathname: '/home', params: { videoId: item.video.id } } : `/profile/${item.user.id}`} asChild>
        <TouchableOpacity style={styles.notificationItem}>
          <View style={styles.leftContent}>
            <Image source={{ uri: item.user.profilePicture }} style={styles.profilePicture} />
            <IconComponent size={18} color={iconColor} style={styles.typeIcon} />
          </View>
          <View style={styles.middleContent}>
            <Text style={styles.messageText} numberOfLines={2}>
              <Text style={GlobalStyles.textBold}>{item.user.username}</Text>{' '}
              {item.message.replace(`${item.user.username} `, '')}
            </Text>
            <Text style={styles.timestampText}>{formatTimeAgo(item.timestamp)}</Text>
          </View>
          {item.video && (
            <Image source={{ uri: item.video.thumbnail }} style={styles.videoThumbnail} />
          )}
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.headerTitle}>Boîte de réception</Text>
      {notifications.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>Aucune notification pour le moment.</Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.flex1,
    ...GlobalStyles.bgBlack,
  },
  headerTitle: {
    ...GlobalStyles.text2xl,
    ...GlobalStyles.textBold,
    ...GlobalStyles.textWhite,
    ...GlobalStyles.textCenter,
    ...GlobalStyles.py2,
    borderBottomWidth: 1,
    borderColor: Colors.darkGray,
  },
  listContent: {
    ...GlobalStyles.py2,
  },
  notificationItem: {
    ...GlobalStyles.flexRow,
    ...GlobalStyles.alignCenter,
    backgroundColor: Colors.dark.background,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: Colors.lightGray,
  },
  leftContent: {
    position: 'relative',
    marginRight: 12,
  },
  profilePicture: {
    width: 50,
    height: 50,
    ...GlobalStyles.roundedFull,
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  typeIcon: {
    ...GlobalStyles.absolute,
    bottom: -5,
    right: -5,
    backgroundColor: Colors.darkGray,
    borderRadius: 15,
    padding: 3,
  },
  middleContent: {
    ...GlobalStyles.flex1,
    marginRight: 12,
  },
  messageText: {
    ...GlobalStyles.textBase,
    ...GlobalStyles.textWhite,
  },
  timestampText: {
    fontSize: 13,
    color: Colors.gray,
    marginTop: 2,
  },
  videoThumbnail: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    ...GlobalStyles.roundedMd,
    backgroundColor: Colors.lightGray,
  },
  emptyState: {
    ...GlobalStyles.flex1,
    ...GlobalStyles.justifyCenter,
    ...GlobalStyles.alignCenter,
  },
  emptyStateText: {
    ...GlobalStyles.textBase,
    ...GlobalStyles.textGray,
  },
});