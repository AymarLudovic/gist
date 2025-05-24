// app/(tabs)/upload.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { GlobalStyles } from '@/constants/Styles';
import { Colors } from '@/constants/Colors';
import { PlusCircle } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function UploadScreen() {
  const insets = useSafeAreaInsets();
  const [description, setDescription] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoSelected, setVideoSelected] = useState(false);

  const handleSelectVideo = () => {
    // In a real app, this would open a video picker (e.g., using Expo ImagePicker)
    // For this demo, we'll simulate it.
    setLoading(true);
    setTimeout(() => {
      Alert.alert('Vidéo sélectionnée', 'Une vidéo fictive a été sélectionnée.', [{ text: 'OK' }]);
      setVideoSelected(true);
      setLoading(false);
    }, 1000);
  };

  const handleUpload = () => {
    if (!videoSelected) {
      Alert.alert('Erreur', 'Veuillez d\'abord sélectionner une vidéo.');
      return;
    }
    if (!description.trim() || !hashtags.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir la description et les hashtags.');
      return;
    }

    setLoading(true);
    // Simulate API call for uploading video
    setTimeout(() => {
      Alert.alert('Succès', 'Votre vidéo a été "téléchargée" avec succès !', [{ text: 'OK' }]);
      setDescription('');
      setHashtags('');
      setVideoSelected(false);
      setLoading(false);
    }, 2000);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.headerTitle}>Télécharger une vidéo</Text>

      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.selectVideoButton} onPress={handleSelectVideo} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="large" color={Colors.dark.tint} />
          ) : (
            <>
              <PlusCircle size={60} color={Colors.dark.tint} />
              <Text style={styles.selectVideoButtonText}>
                {videoSelected ? 'Vidéo sélectionnée !' : 'Sélectionner une vidéo'}
              </Text>
            </>
          )}
        </TouchableOpacity>

        <Text style={styles.inputLabel}>Description de la vidéo</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Dites quelque chose sur votre vidéo..."
          placeholderTextColor={Colors.gray}
          multiline
          numberOfLines={3}
          value={description}
          onChangeText={setDescription}
          editable={!loading}
        />

        <Text style={styles.inputLabel}>Hashtags</Text>
        <TextInput
          style={styles.textInput}
          placeholder="#trends #fun #viral"
          placeholderTextColor={Colors.gray}
          value={hashtags}
          onChangeText={setHashtags}
          editable={!loading}
        />

        <TouchableOpacity style={styles.uploadButton} onPress={handleUpload} disabled={loading || !videoSelected}>
          {loading ? (
            <ActivityIndicator size="small" color={Colors.dark.background} />
          ) : (
            <Text style={styles.uploadButtonText}>Télécharger</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
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
  contentContainer: {
    padding: 16,
  },
  selectVideoButton: {
    ...GlobalStyles.wFull,
    height: 200,
    backgroundColor: Colors.darkGray,
    ...GlobalStyles.justifyCenter,
    ...GlobalStyles.alignCenter,
    ...GlobalStyles.roundedMd,
    ...GlobalStyles.mb4,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderStyle: 'dashed',
  },
  selectVideoButtonText: {
    ...GlobalStyles.textLg,
    ...GlobalStyles.textWhite,
    marginTop: 8,
  },
  inputLabel: {
    ...GlobalStyles.textBase,
    ...GlobalStyles.textWhite,
    ...GlobalStyles.mb2,
    fontWeight: 'bold',
  },
  textInput: {
    ...GlobalStyles.wFull,
    backgroundColor: Colors.darkGray,
    ...GlobalStyles.roundedMd,
    padding: 12,
    ...GlobalStyles.textBase,
    ...GlobalStyles.textWhite,
    marginBottom: 20,
    minHeight: 50,
    textAlignVertical: 'top', // For multiline on Android
  },
  uploadButton: {
    ...GlobalStyles.wFull,
    backgroundColor: Colors.primary,
    ...GlobalStyles.py4,
    ...GlobalStyles.roundedMd,
    ...GlobalStyles.justifyCenter,
    ...GlobalStyles.alignCenter,
  },
  uploadButtonText: {
    ...GlobalStyles.textLg,
    ...GlobalStyles.textBold,
    ...GlobalStyles.textWhite,
  },
});