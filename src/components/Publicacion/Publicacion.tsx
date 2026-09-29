import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import type { Post } from '../../types';
import { useInstagram } from '../../context/InstagramContext';

interface Props { post: Post; onPress: () => void }
const formatLikes = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)} mil` : String(n);

export default function Publicacion({ post, onPress }: Props) {
  const { toggleLike, toggleSave } = useInstagram();
  return <View style={styles.container}>
    <View style={styles.header}>
      <View style={styles.avatarRing}><Image source={{ uri: post.userAvatar }} style={styles.avatar} /></View>
      <View style={styles.userBlock}><Text style={styles.username}>{post.username}</Text><Text style={styles.location}>Buenos Aires, Argentina</Text></View>
      <TouchableOpacity accessibilityLabel="Más opciones" style={styles.more}><Text style={styles.moreText}>•••</Text></TouchableOpacity>
    </View>
    <TouchableOpacity activeOpacity={0.96} onPress={onPress}><Image source={{ uri: post.imageUrl }} style={styles.image} /></TouchableOpacity>
    <View style={styles.actions}>
      <TouchableOpacity accessibilityRole="button" accessibilityLabel={post.isLiked ? 'Quitar Me gusta' : 'Me gusta'} onPress={() => toggleLike(post.id)} style={styles.action}>
        <Text style={[styles.heart, post.isLiked && styles.liked]}>{post.isLiked ? '♥' : '♡'}</Text>
      </TouchableOpacity>
      <TouchableOpacity accessibilityRole="button" accessibilityLabel="Comentar" onPress={onPress} style={styles.action}>
        <Text style={styles.commentIcon}>▢</Text>
      </TouchableOpacity>
      <TouchableOpacity accessibilityLabel="Compartir" onPress={onPress} style={styles.action}><Text style={styles.send}>➤</Text></TouchableOpacity>
      <TouchableOpacity accessibilityRole="button" accessibilityLabel={post.isSaved ? 'Quitar de guardados' : 'Guardar'} onPress={() => toggleSave(post.id)} style={styles.save}>
        <Text style={styles.bookmark}>{post.isSaved ? '▣' : '♧'}</Text>
      </TouchableOpacity>
    </View>
    <Text style={styles.likes}>{formatLikes(post.likes)} Me gusta</Text>
    <Text style={styles.caption}><Text style={styles.username}>{post.username} </Text>{post.caption}</Text>
    {post.comments.length > 0 && <TouchableOpacity onPress={onPress}><Text style={styles.comments}>Ver los {post.comments.length} comentarios</Text></TouchableOpacity>}
    <Text style={styles.time}>Hace {post.timeAgo}</Text>
  </View>;
}

const styles = StyleSheet.create({
  container: { marginBottom: 10, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 9 },
  avatarRing: { width: 38, height: 38, borderRadius: 19, padding: 2, borderWidth: 1.5, borderColor: '#d62976', marginRight: 9 },
  avatar: { width: '100%', height: '100%', borderRadius: 17 },
  userBlock: { flex: 1 },
  username: { fontWeight: '700', fontSize: 13, color: '#262626' },
  location: { fontSize: 11, color: '#262626', marginTop: 2 },
  more: { paddingHorizontal: 5, paddingVertical: 7 },
  moreText: { fontSize: 17, fontWeight: '700', color: '#262626', letterSpacing: 1 },
  image: { width: '100%', aspectRatio: 1, backgroundColor: '#f0f0f0' },
  actions: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingTop: 8, gap: 13 },
  action: { minWidth: 28, minHeight: 34, justifyContent: 'center', alignItems: 'center' },
  heart: { fontSize: 29, lineHeight: 33, color: '#111' },
  liked: { color: '#ff3040' },
  commentIcon: { fontSize: 25, lineHeight: 30, color: '#111', transform: [{ rotate: '180deg' }] },
  send: { fontSize: 22, color: '#111', transform: [{ rotate: '-20deg' }] },
  save: { marginLeft: 'auto', paddingHorizontal: 4, paddingVertical: 5 },
  bookmark: { fontSize: 23, color: '#111' },
  likes: { fontWeight: '700', paddingHorizontal: 12, marginTop: 4, marginBottom: 4, fontSize: 13, color: '#262626' },
  caption: { paddingHorizontal: 12, fontSize: 13, lineHeight: 18, color: '#262626' },
  comments: { paddingHorizontal: 12, color: '#8e8e8e', marginTop: 4, fontSize: 13 },
  time: { paddingHorizontal: 12, fontSize: 10, color: '#8e8e8e', marginTop: 6, marginBottom: 7, textTransform: 'uppercase' },
});
