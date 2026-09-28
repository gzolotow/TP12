import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Encabezado() {
  return <View style={styles.container}><Text style={styles.logo}>Instagram</Text><Text style={styles.actions}>＋　♡　▱</Text></View>;
}

const styles = StyleSheet.create({
  container: { height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#dbdbdb' },
  logo: { fontSize: 25, fontWeight: '700', fontStyle: 'italic', color: '#111' },
  actions: { fontSize: 20, color: '#111' },
});
