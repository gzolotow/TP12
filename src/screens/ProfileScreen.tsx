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

export default function ProfileScreen() {
  const navigation = useNavigation<Navigation>();
  const { posts } = useInstagram();
  const header = <View>
    <View style={styles.profileHeader}><Image source={{ uri: usuarioActual.avatar }} style={styles.avatar} />
      <View style={styles.stats}><View style={styles.stat}><Text style={styles.number}>{posts.length}</Text><Text style={styles.label}>posts</Text></View><View style={styles.stat}><Text style={styles.number}>12.4k</Text><Text style={styles.label}>followers</Text></View><View style={styles.stat}><Text style={styles.number}>389</Text><Text style={styles.label}>following</Text></View></View>
    </View>
    <Text style={styles.name}>{usuarioActual.fullName}</Text><Text style={styles.bio}>{usuarioActual.bio}</Text>
    <TouchableOpacity style={styles.edit}><Text style={styles.editText}>Editar perfil</Text></TouchableOpacity>
    <View style={styles.tabs}><Text style={styles.activeTab}>▦</Text><Text style={styles.tab}>♙</Text></View>
  </View>;
  return <SafeAreaView style={styles.safe} edges={['top']}><FlatList data={posts} keyExtractor={(item) => item.id} numColumns={3} ListHeaderComponent={header} columnWrapperStyle={styles.row}
    renderItem={({ item }) => <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('PostDetail', { postId: item.id })}><Image source={{ uri: item.imageUrl }} style={styles.gridImage} /></TouchableOpacity>} /></SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' }, profileHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12 }, avatar: { width: 80, height: 80, borderRadius: 40, marginRight: 20 }, stats: { flex: 1, flexDirection: 'row', justifyContent: 'space-around' }, stat: { alignItems: 'center' }, number: { fontWeight: '700', fontSize: 16 }, label: { fontSize: 12 }, name: { fontWeight: '700', fontSize: 13, paddingHorizontal: 16 }, bio: { fontSize: 12, paddingHorizontal: 16, marginTop: 3, lineHeight: 17 }, edit: { marginHorizontal: 16, marginTop: 12, marginBottom: 8, paddingVertical: 7, borderWidth: 1, borderColor: '#dbdbdb', borderRadius: 7, alignItems: 'center' }, editText: { fontWeight: '700', fontSize: 12 }, tabs: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#dbdbdb', marginTop: 7 }, activeTab: { flex: 1, textAlign: 'center', paddingVertical: 9, borderTopWidth: 2, borderTopColor: '#111', fontSize: 18 }, tab: { flex: 1, textAlign: 'center', paddingVertical: 9, color: '#8e8e8e', fontSize: 18 }, row: { gap: 2 }, gridItem: { width: itemSize, height: itemSize, marginBottom: 2 }, gridImage: { width: '100%', height: '100%' },
});
