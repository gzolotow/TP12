import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useInstagram } from '../context/InstagramContext';

type DetailRoute = RouteProp<RootStackParamList, 'PostDetail'>;
const formatLikes = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

export default function PostDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute<DetailRoute>();
  const { posts, toggleLike, toggleSave } = useInstagram();
  const post = posts.find((item) => item.id === route.params.postId);
  if (!post) return <SafeAreaView style={styles.safe}><Text>La publicación ya no está disponible.</Text></SafeAreaView>;
  return <SafeAreaView style={styles.safe}>
    <View style={styles.header}><TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.close}>✕</Text></TouchableOpacity><Text style={styles.username}>{post.username}</Text><View style={{ width: 24 }} /></View>
    <ScrollView><Image source={{ uri: post.imageUrl }} style={styles.image} />
      <View style={styles.actions}><TouchableOpacity onPress={() => toggleLike(post.id)}><Text style={styles.icon}>{post.isLiked ? '❤️' : '♡'}</Text></TouchableOpacity><Text style={styles.icon}>◯</Text><TouchableOpacity onPress={() => toggleSave(post.id)} style={styles.save}><Text style={styles.icon}>{post.isSaved ? '▣' : '♧'}</Text></TouchableOpacity></View>
      <Text style={styles.likes}>{formatLikes(post.likes)} Me gusta</Text><Text style={styles.caption}><Text style={styles.username}>{post.username} </Text>{post.caption}</Text>
      <View style={styles.comments}>{post.comments.map((comment) => <Text key={comment.id} style={styles.comment}><Text style={styles.username}>{comment.username} </Text>{comment.text}</Text>)}</View>
    </ScrollView>
  </SafeAreaView>;
}

const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: '#fff' }, header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12, borderBottomWidth: 1, borderBottomColor: '#dbdbdb' }, close: { fontSize: 18 }, username: { fontWeight: '700' }, image: { width: '100%', aspectRatio: 1 }, actions: { flexDirection: 'row', alignItems: 'center', gap: 16, padding: 10 }, icon: { fontSize: 23 }, save: { marginLeft: 'auto' }, likes: { fontWeight: '700', paddingHorizontal: 10, marginBottom: 5 }, caption: { paddingHorizontal: 10, marginBottom: 8, fontSize: 13 }, comments: { paddingHorizontal: 10 }, comment: { marginBottom: 7, fontSize: 12 } });
