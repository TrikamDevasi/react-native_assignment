import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function SurveyCard({ survey, onPress, onDelete }) {
  function getPriorityColor() {
    switch (survey.priority) {
      case 'High': return '#EF4444';
      case 'Medium': return '#F59E0B';
      case 'Low': return '#10B981';
      default: return '#6B7280';
    }
  }

  return (
    <Pressable style={styles.card} onPress={() => onPress && onPress(survey)}>
      <View style={styles.header}>
        <Text style={styles.siteName} numberOfLines={1}>{survey.siteName}</Text>
        <View style={[styles.pill, { backgroundColor: getPriorityColor() }]}>
          <Text style={styles.pillText}>{survey.priority}</Text>
        </View>
      </View>
      <Text style={styles.client} numberOfLines={1}>{survey.clientName}</Text>
      <Text style={styles.date}>{survey.date}</Text>
      {onDelete && (
        <Pressable style={styles.deleteBtn} onPress={() => onDelete(survey.id)}>
          <Text style={styles.deleteText}>Delete</Text>
        </Pressable>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  siteName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
    marginRight: 8,
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  pillText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  client: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  deleteBtn: {
    alignSelf: 'flex-end',
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#FEE2E2',
  },
  deleteText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: '600',
  },
});
