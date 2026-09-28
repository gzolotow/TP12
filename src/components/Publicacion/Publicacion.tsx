import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import type { Post } from '../../types';
import { useInstagram } from '../../context/InstagramContext';

interface Props { post: Post; onPress: () => void }
const formatLikes = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

export default function Publicacion({ post, onPress }: Props) {
  const { toggleLike, toggleSave } = useInstagram();
  return <View style={styles.container}>
    <View style={styles.header}><Image source={{ uri: post.userAvatar }} style={styles.avatar} /><View style={styles.userBlock}><Text style={styles.username}>{post.username}</Text><Text style={styles.location}>Buenos Aires, Argentina</Text></View><Text style={styles.more}>•••</Text></View>
    <TouchableOpacity activeOpacity={0.95} onPress={onPress}><Image source={{ uri: post.imageUrl }} style={styles.image} /></TouchableOpacity>
    <View style={styles.actions}>
      <TouchableOpacity onPress={() => toggleLike(post.id)}><Text style={styles.icon}>{post.isLiked ? '❤️' : '♡'}</Text></TouchableOpacity>
      <TouchableOpacity onPress={onPress}><Text style={styles.icon}>◯</Text></TouchableOpacity>
      <TouchableOpacity><Text style={styles.icon}>➤</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => toggleSave(post.id)} style={styles.save}><Text style={styles.icon}>{post.isSaved ? '▣' : '♧'}</Text></TouchableOpacity>
    </View>
    <Text style={styles.likes}>{formatLikes(post.likes)} Me gusta</Text>
    <Text style={styles.caption}><Text style={styles.username}>{post.username} </Text>{post.caption}</Text>
    {post.comments.length > 0 && <TouchableOpacity onPress={onPress}><Text style={styles.comments}>Ver los {post.comments.length} comentarios</Text></TouchableOpacity>}
    <Text style={styles.time}>Hace {post.timeAgo}</Text>
  </View>;
}

const styles = StyleSheet.create({
  container: { marginBottom: 12 }, header: { flexDirection: 'row', alignItems: 'center', padding: 10 }, avatar: { width: 34, height: 34, borderRadius: 17, marginRight: 10 }, userBlock: { flex: 1 }, username: { fontWeight: '700', fontSize: 13, color: '#262626' }, location: { fontSize: 10, color: '#262626', marginTop: 2 }, more: { fontSize: 18, paddingHorizontal: 8 },
  image: { width: '100%', aspectRatio: 1, backgroundColor: '#f0f0f0' }, actions: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 11, paddingTop: 9, gap: 17 }, icon: { fontSize: 23, color: '#111' }, save: { marginLeft: 'auto' }, likes: { fontWeight: '700', paddingHorizontal: 11, marginTop: 4, marginBottom: 4, fontSize: 12 }, caption: { paddingHorizontal: 11, fontSize: 12, lineHeight: 17 }, comments: { paddingHorizontal: 11, color: '#8e8e8e', marginTop: 4, fontSize: 12 }, time: { paddingHorizontal: 11, fontSize: 9, color: '#8e8e8e', marginTop: 5, textTransform: 'uppercase' },
});
