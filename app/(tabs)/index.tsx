// app/(tabs)/index.tsx
import React, { useRef, useState, useEffect } from 'react';
import { View, FlatList, Dimensions, StyleSheet } from 'react-native';
import VideoCard from '@/components/VideoCard';
import { videos, VideoItem } from '@/constants/data';
import { GlobalStyles } from '@/constants/Styles';
import { StatusBar } from 'expo-status-bar';

const { height: screenHeight } = Dimensions.get('window');

export default function HomeScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<VideoItem>>(null);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  });

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50, // Consider item as viewable if 50% of it is visible
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" hidden={true} /> {/* Hide status bar for immersive video */}
      <FlatList
        ref={flatListRef}
        data={videos}
        renderItem={({ item, index }) => (
          <VideoCard video={item} isActive={index === activeIndex} />
        )}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig}
        initialNumToRender={2}
        maxToRenderPerBatch={1}
        windowSize={3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.flex1,
  },
});