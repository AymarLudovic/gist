// app/(tabs)/discover.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native';
import { GlobalStyles } from '@/constants/Styles';
import { Colors } from '@/constants/Colors';
import { Search } from 'lucide-react-native';
import { users, videos } from '@/constants/data';
import { Link } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function DiscoverScreen() {
  const [searchText, setSearchText] = useState('');
  const insets = useSafeAreaInsets();

  // Simple filter logic for demo
  const filteredVideos = videos.filter(video =>
    video.description.toLowerCase().includes(searchText.toLowerCase()) ||
    video.hashtags.some(tag => tag.toLowerCase().includes(searchText.toLowerCase())) ||
    users.find(u => u.id === video.userId)?.username.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderVideoThumbnail = ({ item }: { item: typeof videos[0] }) => (
    <Link href={{ pathname: '/home', params: { videoId: item.id } }} asChild>
      <TouchableOpacity style={styles.thumbnailContainer}>
        <Image source={{ uri: item.videoUri.replace('.mp4', '.jpg') }} style={styles.thumbnail} />
        <Text style={styles.thumbnailDescription} numberOfLines={2}>{item.description}</Text>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.searchBarContainer}>
        <Search size={20} color={Colors.gray} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher des vidéos, des utilisateurs..."
          placeholderTextColor={Colors.gray}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {searchText.length > 0 ? (
          <>
            <Text style={styles.sectionTitle}>Résultats de recherche</Text>
            {filteredVideos.length > 0 ? (
              <FlatList
                data={filteredVideos}
                renderItem={renderVideoThumbnail}
                keyExtractor={(item) => item.id}
                numColumns={3}
                scrollEnabled={false}
                columnWrapperStyle={styles.row}
              />
            ) : (
              <Text style={styles.noResultsText}>Aucun résultat trouvé.</Text>
            )}
          </>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Vidéos tendances</Text>
            <FlatList
              data={videos.slice(0, 9)} // Show first 9 videos as trending
              renderItem={renderVideoThumbnail}
              keyExtractor={(item) => item.id}
              numColumns={3}
              scrollEnabled={false}
              columnWrapperStyle={styles.row}
            />

            <Text style={styles.sectionTitle}>Hashtags populaires</Text>
            <View style={styles.hashtagContainer}>
              {['#nature', '#coding', '#travel', '#fitness', '#art'].map((tag, index) => (
                <TouchableOpacity key={index} style={styles.hashtagPill}>
                  <Text style={styles.hashtagText}>{tag}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Utilisateurs suggérés</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.suggestedUsersScroll}>
              {users.slice(0, 5).map(user => (
                <Link key={user.id} href={{ pathname: '/profile', params: { userId: user.id } }} asChild>
                  <TouchableOpacity style={styles.userCard}>
                    <Image source={{ uri: user.profilePicture }} style={styles.userProfilePic} />
                    <Text style={styles.userCardName} numberOfLines={1}>@{user.username}</Text>
                  </TouchableOpacity>
                </Link>
              ))}
            </ScrollView>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.flex1,
    ...GlobalStyles.bgBlack,
  },
  searchBarContainer: {
    ...GlobalStyles.flexRow,
    ...GlobalStyles.alignCenter,
    backgroundColor: Colors.darkGray,
    ...GlobalStyles.roundedMd,
    ...GlobalStyles.mx4,
    ...GlobalStyles.my2,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    ...GlobalStyles.flex1,
    ...GlobalStyles.textBase,
    ...GlobalStyles.textWhite,
  },
  contentContainer: {
    ...GlobalStyles.flex1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    ...GlobalStyles.textLg,
    ...GlobalStyles.textBold,
    ...GlobalStyles.textWhite,
    ...GlobalStyles.mt4,
    ...GlobalStyles.mb2,
  },
  thumbnailContainer: {
    ...GlobalStyles.flex1,
    aspectRatio: 9 / 16, // TikTok aspect ratio
    margin: 4,
    backgroundColor: Colors.lightGray,
    ...GlobalStyles.roundedMd,
    overflow: 'hidden',
    position: 'relative',
  },
  thumbnail: {
    ...GlobalStyles.wFull,
    ...GlobalStyles.hFull,
    resizeMode: 'cover',
  },
  thumbnailDescription: {
    ...GlobalStyles.absolute,
    bottom: 5,
    left: 5,
    right: 5,
    ...GlobalStyles.textWhite,
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 4,
    borderRadius: 3,
  },
  row: {
    justifyContent: 'space-between',
  },
  hashtagContainer: {
    ...GlobalStyles.flexRow,
    flexWrap: 'wrap',
    ...GlobalStyles.mb4,
  },
  hashtagPill: {
    backgroundColor: Colors.lightGray,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  hashtagText: {
    ...GlobalStyles.textBase,
    ...GlobalStyles.textWhite,
  },
  suggestedUsersScroll: {
    paddingBottom: 10,
  },
  userCard: {
    ...GlobalStyles.alignCenter,
    backgroundColor: Colors.darkGray,
    ...GlobalStyles.roundedLg,
    padding: 10,
    marginRight: 10,
    width: 100,
  },
  userProfilePic: {
    width: 60,
    height: 60,
    ...GlobalStyles.roundedFull,
    ...GlobalStyles.mb2,
    borderWidth: 2,
    borderColor: Colors.gray,
  },
  userCardName: {
    ...GlobalStyles.textBase,
    ...GlobalStyles.textWhite,
    ...GlobalStyles.textCenter,
  },
  noResultsText: {
    ...GlobalStyles.textBase,
    ...GlobalStyles.textGray,
    ...GlobalStyles.textCenter,
    ...GlobalStyles.mt4,
  }
});