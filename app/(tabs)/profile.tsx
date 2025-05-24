// app/(tabs)/profile.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import ProfileHeader from '@/components/ProfileHeader';
import { users, videos } from '@/constants/data';
import { GlobalStyles } from '@/constants/Styles';
import { Colors } from '@/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Tab = 'myVideos' | 'likedVideos';

export default function ProfileScreen() {
  const { userId } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<Tab>('myVideos');

  // For simplicity, we'll just use the first user in the array if no userId is provided (e.g., current user)
  const currentUser = users.find(u => u.id === userId) || users[0];

  const userVideos = videos.filter(video => currentUser.videos.includes(video.id));
  const userLikedVideos = videos.filter(video => currentUser.likedVideos.includes(video.id));

  const handleEditProfile = () => {
    Alert.alert('Modifier le profil', 'Fonctionnalité de modification de profil à implémenter.', [{ text: 'OK' }]);
  };

  const renderVideoThumbnail = ({ item }: { item: typeof videos[0] }) => (
    <TouchableOpacity style={styles.thumbnailContainer}>
      <Image source={{ uri: item.videoUri.replace('.mp4', '.jpg') }} style={styles.thumbnail} />
      <Text style={styles.thumbnailLikes}>{item.likes.toLocaleString()} ❤️</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader user={currentUser} onEditProfile={handleEditProfile} />

        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'myVideos' && styles.activeTab]}
            onPress={() => setActiveTab('myVideos')}
          >
            <Text style={[styles.tabText, activeTab === 'myVideos' && styles.activeTabText]}>Vidéos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'likedVideos' && styles.activeTab]}
            onPress={() => setActiveTab('likedVideos')}
          >
            <Text style={[styles.tabText, activeTab === 'likedVideos' && styles.activeTabText]}>Aimées</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.videoGrid}>
          <FlatList
            data={activeTab === 'myVideos' ? userVideos : userLikedVideos}
            renderItem={renderVideoThumbnail}
            keyExtractor={(item) => item.id}
            numColumns={3}
            scrollEnabled={false} // Disable inner scroll as parent ScrollView handles it
            columnWrapperStyle={styles.row}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>
                  {activeTab === 'myVideos' ? "Pas de vidéos encore." : "Pas de vidéos aimées encore."}
                </Text>
              </View>
            }
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.flex1,
    ...GlobalStyles.bgBlack,
  },
  tabsContainer: {
    ...GlobalStyles.flexRow,
    ...GlobalStyles.wFull,
    borderBottomWidth: 1,
    borderColor: Colors.darkGray,
  },
  tabButton: {
    ...GlobalStyles.flex1,
    ...GlobalStyles.alignCenter,
    paddingVertical: 12,
  },
  tabText: {
    ...GlobalStyles.textLg,
    color: Colors.gray,
    fontWeight: 'bold',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: Colors.dark.text,
  },
  activeTabText: {
    ...GlobalStyles.textWhite,
  },
  videoGrid: {
    paddingVertical: 8,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  thumbnailContainer: {
    width: '32%', // Roughly 1/3 of the screen with spacing
    aspectRatio: 9 / 16, // TikTok video aspect ratio
    margin: 2,
    backgroundColor: Colors.lightGray,
    position: 'relative',
    overflow: 'hidden',
    ...GlobalStyles.roundedMd,
  },
  thumbnail: {
    ...GlobalStyles.wFull,
    ...GlobalStyles.hFull,
    resizeMode: 'cover',
  },
  thumbnailLikes: {
    ...GlobalStyles.absolute,
    bottom: 5,
    left: 5,
    ...GlobalStyles.textWhite,
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 4,
    borderRadius: 3,
  },
  emptyState: {
    ...GlobalStyles.flex1,
    ...GlobalStyles.alignCenter,
    ...GlobalStyles.justifyCenter,
    paddingVertical: 50,
  },
  emptyStateText: {
    ...GlobalStyles.textBase,
    ...GlobalStyles.textGray,
  }
});