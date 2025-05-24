// components/VideoCard.tsx
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Alert } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { GlobalStyles } from '@/constants/Styles';
import { Colors } from '@/constants/Colors';
import IconButton from './IconButton';
import { Heart, MessageCircle, Share2, Music } from 'lucide-react-native';
import { VideoItem, User, users } from '@/constants/data';
import { Link } from 'expo-router';

interface VideoCardProps {
  video: VideoItem;
  isActive: boolean;
}

const { height: screenHeight } = Dimensions.get('window');

const VideoCard: React.FC<VideoCardProps> = ({ video, isActive }) => {
  const videoRef = useRef<Video>(null);
  const [status, setStatus] = useState<any>({});
  const [isMuted, setIsMuted] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<VideoItem>(video);

  const user = users.find(u => u.id === video.userId);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.playAsync();
      } else {
        videoRef.current.pauseAsync();
        videoRef.current.setPositionAsync(0); // Reset video position when not active
      }
    }
  }, [isActive]);

  const handleLike = () => {
    setCurrentVideo(prev => ({
      ...prev,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
      isLiked: !prev.isLiked,
    }));
    // Simulate API call to like/unlike
  };

  const handleComment = () => {
    Alert.alert('Commentaires', 'Fonctionnalité de commentaires à implémenter.', [{ text: 'OK' }]);
  };

  const handleShare = () => {
    Alert.alert('Partager', 'Fonctionnalité de partage à implémenter.', [{ text: 'OK' }]);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.setIsMutedAsync(!isMuted);
      setIsMuted(!isMuted);
    }
  };

  if (!user) {
    return null; // Or render a placeholder for missing user
  }

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{ uri: currentVideo.videoUri }}
        style={styles.video}
        resizeMode={ResizeMode.COVER}
        isLooping
        shouldPlay={isActive}
        onPlaybackStatusUpdate={setStatus}
        isMuted={isMuted}
        useNativeControls={false}
      />

      {/* Overlay controls and info */}
      <View style={styles.overlay}>
        {/* Mute button */}
        <TouchableOpacity onPress={toggleMute} style={styles.muteButton}>
          <Text style={styles.muteButtonText}>{isMuted ? '🔇' : '🔊'}</Text>
        </TouchableOpacity>

        {/* User and video info (bottom left) */}
        <View style={styles.infoContainer}>
          <Link href={{ pathname: '/profile', params: { userId: user.id } }} asChild>
            <TouchableOpacity style={GlobalStyles.flexRow}>
              <Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />
              <Text style={styles.username}>@{user.username}</Text>
            </TouchableOpacity>
          </Link>
          <Text style={styles.description}>{currentVideo.description}</Text>
          <Text style={styles.hashtags}>
            {currentVideo.hashtags.map(tag => `#${tag}`).join(' ')}
          </Text>
          <View style={styles.musicInfo}>
            <Music size={14} color={Colors.dark.text} />
            <Text style={styles.musicText}>Son original</Text>
          </View>
        </View>

        {/* Interaction buttons (right) */}
        <View style={styles.actionsContainer}>
          <IconButton
            icon={Heart}
            label={currentVideo.likes}
            onPress={handleLike}
            color={currentVideo.isLiked ? Colors.primary : Colors.dark.text}
          />
          <IconButton icon={MessageCircle} label={currentVideo.comments} onPress={handleComment} />
          <IconButton icon={Share2} label={currentVideo.shares} onPress={handleShare} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.flex1,
    height: screenHeight,
    backgroundColor: Colors.dark.background,
  },
  video: {
    ...GlobalStyles.wFull,
    ...GlobalStyles.hFull,
  },
  overlay: {
    ...GlobalStyles.absolute,
    ...GlobalStyles.top0,
    ...GlobalStyles.bottom0,
    ...GlobalStyles.left0,
    ...GlobalStyles.right0,
    ...GlobalStyles.p4,
    ...GlobalStyles.justifyBetween,
    ...GlobalStyles.flexCol,
    backgroundColor: 'rgba(0,0,0,0.2)', // Slight overlay for text readability
  },
  muteButton: {
    ...GlobalStyles.absolute,
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
    zIndex: 1,
  },
  muteButtonText: {
    ...GlobalStyles.text2xl,
    ...GlobalStyles.textWhite,
  },
  infoContainer: {
    ...GlobalStyles.alignStart,
    ...GlobalStyles.wFull,
    ...GlobalStyles.pb4,
  },
  profilePicture: {
    width: 40,
    height: 40,
    ...GlobalStyles.roundedFull,
    borderWidth: 1,
    borderColor: Colors.dark.text,
    marginRight: 8,
  },
  username: {
    ...GlobalStyles.textLg,
    ...GlobalStyles.textBold,
    ...GlobalStyles.textWhite,
    alignSelf: 'center',
  },
  description: {
    ...GlobalStyles.textBase,
    ...GlobalStyles.textWhite,
    marginTop: 8,
  },
  hashtags: {
    ...GlobalStyles.textBase,
    color: Colors.secondary,
    marginTop: 4,
  },
  musicInfo: {
    ...GlobalStyles.flexRow,
    ...GlobalStyles.alignCenter,
    marginTop: 8,
  },
  musicText: {
    ...GlobalStyles.textBase,
    ...GlobalStyles.textWhite,
    marginLeft: 4,
  },
  actionsContainer: {
    ...GlobalStyles.absolute,
    right: 16,
    bottom: 80, // Adjust to be above tab bar
    ...GlobalStyles.alignCenter,
  },
});

export default VideoCard;