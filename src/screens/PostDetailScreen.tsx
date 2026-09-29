import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useInstagram } from '../context/InstagramContext';

type DetailRoute = RouteProp<RootStackParamList, 'PostDetail'>;
const formatLikes = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)} mil` : String(n);

export default function PostDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute<DetailRoute>();
  const { posts, toggleLike, toggleSave, addComment } = useInstagram();
  const [commentText, setCommentText] = useState('');
  const post = posts.find((item) => item.id === route.params.postId);
  if (!post) return <SafeAreaView style={styles.safe}><Text>La publicación ya no está disponible.</Text></SafeAreaView>;

  const submitComment = () => {
    if (!commentText.trim()) return;
    addComment(post.id, commentText);
    setCommentText('');
  };

  return <SafeAreaView style={styles.safe}>
    <View style={styles.header}>
      <TouchableOpacity accessibilityLabel="Volver" onPress={() => navigation.goBack()} style={styles.backButton}><Text style={styles.back}>‹</Text></TouchableOpacity>
      <View><Text style={styles.title}>Publicaciones</Text><Text style={styles.subtitle}>{post.username}</Text></View>
      <View style={{ width: 36 }} />
    </View>
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={8}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.postHeader}><Image source={{ uri: post.userAvatar }} style={styles.avatar} /><Text style={styles.username}>{post.username}</Text><Text style={styles.more}>•••</Text></View>
        <Image source={{ uri: post.imageUrl }} style={styles.image} />
        <View style={styles.actions}>
          <TouchableOpacity accessibilityLabel="Me gusta" onPress={() => toggleLike(post.id)}><Text style={[styles.icon, post.isLiked && styles.liked]}>{post.isLiked ? '♥' : '♡'}</Text></TouchableOpacity>
          <TouchableOpacity accessibilityLabel="Comentar" onPress={() => {}}><Text style={styles.icon}>▢</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.send}>➤</Text></TouchableOpacity>
          <TouchableOpacity accessibilityLabel="Guardar" onPress={() => toggleSave(post.id)} style={styles.save}><Text style={styles.bookmark}>{post.isSaved ? '▣' : '♧'}</Text></TouchableOpacity>
        </View>
        <Text style={styles.likes}>{formatLikes(post.likes)} Me gusta</Text>
        <Text style={styles.caption}><Text style={styles.username}>{post.username} </Text>{post.caption}</Text>
        <Text style={styles.date}>Hace {post.timeAgo}</Text>
        <View style={styles.comments}>
          {post.comments.map((comment) => <View key={comment.id} style={styles.commentRow}><Text style={styles.comment}><Text style={styles.username}>{comment.username} </Text>{comment.text}</Text><Text style={styles.commentHeart}>♡</Text></View>)}
        </View>
      </ScrollView>
      <View style={styles.composer}>
        <Image source={{ uri: post.userAvatar }} style={styles.composerAvatar} />
        <TextInput value={commentText} onChangeText={setCommentText} placeholder="Añade un comentario..." placeholderTextColor="#8e8e8e" style={styles.input} returnKeyType="send" onSubmitEditing={submitComment} />
        <TouchableOpacity onPress={submitComment} disabled={!commentText.trim()}><Text style={[styles.publish, !commentText.trim() && styles.disabled]}>Publicar</Text></TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  flex: { flex: 1 },
  header: { height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: '#efefef' },
  backButton: { width: 36 },
  back: { fontSize: 34, lineHeight: 36, color: '#111' },
  title: { fontSize: 15, fontWeight: '700', color: '#262626', textAlign: 'center' },
  subtitle: { fontSize: 11, color: '#262626', textAlign: 'center', marginTop: 1 },
  postHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 9 },
  avatar: { width: 32, height: 32, borderRadius: 16, marginRight: 9 },
  username: { fontWeight: '700', color: '#262626' },
  more: { marginLeft: 'auto', fontSize: 18, letterSpacing: 1 },
  image: { width: '100%', aspectRatio: 1 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingHorizontal: 12, paddingTop: 7 },
  icon: { fontSize: 29, color: '#111', lineHeight: 36 },
  liked: { color: '#ff3040' },
  send: { fontSize: 23, color: '#111' },
  save: { marginLeft: 'auto' },
  bookmark: { fontSize: 23, color: '#111' },
  likes: { fontWeight: '700', paddingHorizontal: 12, marginBottom: 6, color: '#262626' },
  caption: { paddingHorizontal: 12, marginBottom: 8, fontSize: 13, lineHeight: 18, color: '#262626' },
  date: { paddingHorizontal: 12, color: '#8e8e8e', fontSize: 10, textTransform: 'uppercase', marginBottom: 10 },
  comments: { paddingHorizontal: 12, paddingBottom: 14 },
  commentRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 11 },
  comment: { flex: 1, fontSize: 13, lineHeight: 18, color: '#262626' },
  commentHeart: { fontSize: 16, color: '#8e8e8e', paddingLeft: 10 },
  composer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 9, borderTopWidth: 1, borderTopColor: '#efefef' },
  composerAvatar: { width: 30, height: 30, borderRadius: 15, marginRight: 9 },
  input: { flex: 1, fontSize: 13, color: '#262626', paddingVertical: 8 },
  publish: { color: '#0095f6', fontSize: 13, fontWeight: '700', paddingLeft: 10 },
  disabled: { opacity: 0.4 },
});
