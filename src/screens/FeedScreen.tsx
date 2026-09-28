import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useInstagram } from '../context/InstagramContext';
import Encabezado from '../components/Encabezado/Encabezado';
import BarraHistorias from '../components/BarraHistorias/BarraHistorias';
import Publicacion from '../components/Publicacion/Publicacion';

type Navigation = NativeStackNavigationProp<RootStackParamList>;
export default function FeedScreen() {
  const navigation = useNavigation<Navigation>();
  const { posts } = useInstagram();
  return <SafeAreaView style={styles.safe} edges={['top']}>
    <Encabezado />
    <FlatList data={posts} keyExtractor={(item) => item.id} ListHeaderComponent={<BarraHistorias />}
      renderItem={({ item }) => <Publicacion post={item} onPress={() => navigation.navigate('PostDetail', { postId: item.id })} />} />
  </SafeAreaView>;
}

const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: '#fff' } });
