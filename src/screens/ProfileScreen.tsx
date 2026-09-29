import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useInstagram } from '../context/InstagramContext';
import { usuarioActual } from '../data/usuario';

type Navigation = NativeStackNavigationProp<RootStackParamList>;
const itemSize = (Dimensions.get('window').width - 4) / 3;
const compactNumber = (value: number) => value >= 1000 ? `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)} mil` : String(value);

export default function ProfileScreen() {
  const navigation = useNavigation<Navigation>();
  const { posts } = useInstagram();
  const header = <View>
    <View style={styles.profileHeader}>
      <View style={styles.avatarRing}><Image source={{ uri: usuarioActual.avatar }} style={styles.avatar} /></View>
      <View style={styles.stats}>
        <View style={styles.stat}><Text style={styles.number}>{posts.length}</Text><Text style={styles.label}>publicaciones</Text></View>
        <View style={styles.stat}><Text style={styles.number}>{compactNumber(usuarioActual.followers)}</Text><Text style={styles.label}>seguidores</Text></View>
        <View style={styles.stat}><Text style={styles.number}>{compactNumber(usuarioActual.following)}</Text><Text style={styles.label}>seguidos</Text></View>
      </View>
    </View>
    <Text style={styles.name}>{usuarioActual.fullName}</Text><Text style={styles.bio}>{usuarioActual.bio}</Text>
    <View style={styles.profileActions}>
      <TouchableOpacity style={styles.edit}><Text style={styles.editText}>Editar perfil</Text></TouchableOpacity>
      <TouchableOpacity style={styles.share}><Text style={styles.editText}>Compartir perfil</Text></TouchableOpacity>
      <TouchableOpacity style={styles.addFriend}><Text style={styles.addFriendText}>＋</Text></TouchableOpacity>
    </View>
    <View style={styles.highlights}><View style={styles.highlight}><View style={styles.highlightCircle}><Text style={styles.highlightEmoji}>🐾</Text></View><Text style={styles.highlightLabel}>Michi's</Text></View><View style={styles.highlight}><View style={styles.highlightCircle}><Text style={styles.highlightEmoji}>☀️</Text></View><Text style={styles.highlightLabel}>Día a día</Text></View><View style={styles.highlight}><View style={styles.addHighlight}><Text style={styles.addHighlightText}>＋</Text></View><Text style={styles.highlightLabel}>Nuevo</Text></View></View>
    <View style={styles.tabs}><Text style={styles.activeTab}>▦</Text><Text style={styles.tab}>♙</Text></View>
  </View>;
  return <SafeAreaView style={styles.safe} edges={['top']}>
    <View style={styles.topBar}><Text style={styles.handle}>{usuarioActual.username}⌄</Text><TouchableOpacity accessibilityLabel="Crear publicación"><Text style={styles.topIcon}>＋</Text></TouchableOpacity><TouchableOpacity accessibilityLabel="Menú"><Text style={styles.topIcon}>☰</Text></TouchableOpacity></View>
    <FlatList data={posts} keyExtractor={(item) => item.id} numColumns={3} ListHeaderComponent={header} columnWrapperStyle={styles.row}
      renderItem={({ item }) => <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('PostDetail', { postId: item.id })}><Image source={{ uri: item.imageUrl }} style={styles.gridImage} /><View style={styles.gridOverlay}><Text style={styles.gridStat}>♥ {item.likes}</Text><Text style={styles.gridStat}>▢ {item.comments.length}</Text></View></TouchableOpacity>} />
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  topBar: { height: 46, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 20 },
  handle: { flex: 1, fontWeight: '700', fontSize: 19, color: '#111' },
  topIcon: { fontSize: 23, color: '#111' },
  profileHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 14, paddingBottom: 12 },
  avatarRing: { width: 88, height: 88, borderRadius: 44, padding: 3, borderColor: '#c7c7c7', borderWidth: 1.5, marginRight: 22 },
  avatar: { width: '100%', height: '100%', borderRadius: 42 },
  stats: { flex: 1, flexDirection: 'row', justifyContent: 'space-between' },
  stat: { alignItems: 'center' },
  number: { fontWeight: '700', fontSize: 16, color: '#262626' },
  label: { fontSize: 11, color: '#262626', marginTop: 3 },
  name: { fontWeight: '700', fontSize: 13, paddingHorizontal: 16, color: '#262626' },
  bio: { fontSize: 12, paddingHorizontal: 16, marginTop: 3, lineHeight: 17, color: '#262626' },
  profileActions: { flexDirection: 'row', marginHorizontal: 14, marginTop: 13, marginBottom: 13, gap: 7 },
  edit: { flex: 1, paddingVertical: 7, backgroundColor: '#efefef', borderRadius: 7, alignItems: 'center' },
  share: { flex: 1.3, paddingVertical: 7, backgroundColor: '#efefef', borderRadius: 7, alignItems: 'center' },
  editText: { fontWeight: '700', fontSize: 12, color: '#262626' },
  addFriend: { width: 38, backgroundColor: '#efefef', borderRadius: 7, alignItems: 'center', justifyContent: 'center' },
  addFriendText: { fontSize: 21, color: '#262626' },
  highlights: { flexDirection: 'row', gap: 18, paddingHorizontal: 16, paddingTop: 2, paddingBottom: 14 },
  highlight: { alignItems: 'center', gap: 5 },
  highlightCircle: { width: 62, height: 62, borderWidth: 1, borderColor: '#dbdbdb', borderRadius: 31, padding: 4, justifyContent: 'center', alignItems: 'center' },
  highlightEmoji: { fontSize: 26 },
  highlightLabel: { color: '#262626', fontSize: 10 },
  addHighlight: { width: 62, height: 62, borderWidth: 1, borderColor: '#dbdbdb', borderRadius: 31, justifyContent: 'center', alignItems: 'center' },
  addHighlightText: { fontSize: 28, fontWeight: '300', color: '#8e8e8e' },
  tabs: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#efefef' },
  activeTab: { flex: 1, textAlign: 'center', paddingVertical: 9, borderTopWidth: 1.5, borderTopColor: '#111', fontSize: 20, color: '#111' },
  tab: { flex: 1, textAlign: 'center', paddingVertical: 9, color: '#8e8e8e', fontSize: 20 },
  row: { gap: 2 },
  gridItem: { width: itemSize, height: itemSize, marginBottom: 2 },
  gridImage: { width: '100%', height: '100%' },
  gridOverlay: { position: 'absolute', left: 0, right: 0, bottom: 8, flexDirection: 'row', justifyContent: 'space-evenly' },
  gridStat: { color: '#fff', fontWeight: '700', fontSize: 12, textShadowColor: '#000', textShadowRadius: 3 },
});
