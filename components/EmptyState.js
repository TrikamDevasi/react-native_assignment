import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EmptyState({ title, message }) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>○</Text>
      <Text style={styles.title}>{title || 'Nothing here yet'}</Text>
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  icon: {
    fontSize: 48,
    color: '#D1D5DB',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});
