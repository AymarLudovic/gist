// components/ProfileHeader.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { User } from '@/constants/data';
import { GlobalStyles } from '@/constants/Styles';
import { Colors } from '@/constants/Colors';
import { PencilLine } from 'lucide-react-native';
import IconButton from './IconButton';

interface ProfileHeaderProps {
  user: User;
  onEditProfile: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, onEditProfile }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />
      <Text style={styles.username}>@{user.username}</Text>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.following.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Abonnements</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.followers.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Abonnés</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.likesReceived.toLocaleString()}</Text>
          <Text style={styles.statLabel}>J'aime</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={onEditProfile}>
        <PencilLine size={20} color={Colors.dark.text} />
        <Text style={styles.editButtonText}>Modifier le profil</Text>
      </TouchableOpacity>

      <Text style={styles.bio}>{user.bio}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.alignCenter,
    ...GlobalStyles.py4,
    ...GlobalStyles.bgBlack,
    borderBottomWidth: 1,
    borderColor: Colors.darkGray,
  },
  profilePicture: {
    width: 96,
    height: 96,
    ...GlobalStyles.roundedFull,
    ...GlobalStyles.mb2,
    borderWidth: 2,
    borderColor: Colors.lightGray,
  },
  username: {
    ...GlobalStyles.text2xl,
    ...GlobalStyles.textBold,
    ...GlobalStyles.textWhite,
    ...GlobalStyles.mb2,
  },
  statsContainer: {
    ...GlobalStyles.flexRow,
    ...GlobalStyles.justifyCenter,
    ...GlobalStyles.wFull,
    ...GlobalStyles.mb4,
  },
  statItem: {
    ...GlobalStyles.alignCenter,
    ...GlobalStyles.px4,
  },
  statValue: {
    ...GlobalStyles.textLg,
    ...GlobalStyles.textBold,
    ...GlobalStyles.textWhite,
  },
  statLabel: {
    ...GlobalStyles.textBase,
    ...GlobalStyles.textGray,
  },
  editButton: {
    ...GlobalStyles.flexRow,
    ...GlobalStyles.alignCenter,
    ...GlobalStyles.justifyCenter,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    ...GlobalStyles.roundedMd,
    ...GlobalStyles.px4,
    ...GlobalStyles.py2,
    ...GlobalStyles.mb2,
    minWidth: '50%',
  },
  editButtonText: {
    ...GlobalStyles.textBase,
    ...GlobalStyles.textWhite,
    marginLeft: 8,
  },
  bio: {
    ...GlobalStyles.textBase,
    ...GlobalStyles.textWhite,
    ...GlobalStyles.textCenter,
    paddingHorizontal: 20,
  },
});

export default ProfileHeader;