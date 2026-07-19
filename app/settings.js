import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function Settings() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>App Information</Text>
        <View style={styles.row}>
          <Text style={styles.label}>App Name</Text>
          <Text style={styles.value}>Smart Field Survey</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Version</Text>
          <Text style={styles.value}>1.0.0</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Developer</Text>
          <Text style={styles.value}>Trika Aditya</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Platform</Text>
          <Text style={styles.value}>Expo / React Native</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Permissions Used</Text>
        <Text style={styles.permissionItem}>📷 Camera - Take survey photos</Text>
        <Text style={styles.permissionItem}>👤 Contacts - Select client contacts</Text>
        <Text style={styles.permissionItem}>📍 Location - Capture GPS coordinates</Text>
        <Text style={styles.permissionItem}>📋 Clipboard - Copy & paste data</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>About</Text>
        <Text style={styles.aboutText}>
          Smart Field Survey & Inspection App is designed for field workers to conduct
          site surveys, capture photos, record locations, and manage client information
          efficiently.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  permissionItem: {
    fontSize: 14,
    color: '#4B5563',
    paddingVertical: 6,
  },
  aboutText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
  },
});
