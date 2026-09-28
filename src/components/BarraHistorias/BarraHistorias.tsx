import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import type { Story } from '../../types';

const stories: Story[] = ['Tu historia', 'michi.baires', 'felinos.ok', 'cats.world', 'gato.loco', 'meow.arg'].map((username, i) => ({
  id: `story-${i}`, username, avatar: `https://cataas.com/cat?width=80&height=80&${i}`, seen: i > 3,
}));

export default function BarraHistorias() {
  return <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
    {stories.map((story) => <View key={story.id} style={styles.story}>
      <View style={[styles.ring, story.seen ? styles.seen : styles.unseen]}><Image source={{ uri: story.avatar }} style={styles.avatar} /></View>
      <Text style={styles.username} numberOfLines={1}>{story.username}</Text>
    </View>)}
  </ScrollView>;
}

const styles = StyleSheet.create({
  container: { paddingVertical: 11, borderBottomWidth: 1, borderBottomColor: '#dbdbdb', flexGrow: 0 },
  story: { alignItems: 'center', marginHorizontal: 7, width: 66 },
  ring: { width: 62, height: 62, borderRadius: 31, justifyContent: 'center', alignItems: 'center', borderWidth: 2 },
  unseen: { borderColor: '#dc4379' }, seen: { borderColor: '#dbdbdb' }, avatar: { width: 54, height: 54, borderRadius: 27 }, username: { fontSize: 10, marginTop: 4, color: '#262626' },
});
