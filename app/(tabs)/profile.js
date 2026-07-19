import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function Profile() {
  const details = {
    name: 'Trika Aditya',
    university: 'University of Indonesia',
    semester: 'Semester 6',
    major: 'Computer Science',
    skills: ['React Native', 'JavaScript', 'UI/UX Design', 'Mobile Development', 'Data Analysis'],
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>TA</Text>
        </View>
        <Text style={styles.name}>{details.name}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Education</Text>
        <View style={styles.row}>
          <Text style={styles.label}>University</Text>
          <Text style={styles.value}>{details.university}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Major</Text>
          <Text style={styles.value}>{details.major}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Semester</Text>
          <Text style={styles.value}>{details.semester}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Skills</Text>
        {details.skills.map((skill, index) => (
          <View key={index} style={styles.skillItem}>
            <Text style={styles.skillDot}>•</Text>
            <Text style={styles.skillText}>{skill}</Text>
          </View>
        ))}
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
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
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
    color: '#374151',
    marginBottom: 12,
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
  skillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  skillDot: {
    fontSize: 16,
    color: '#2563EB',
    marginRight: 8,
  },
  skillText: {
    fontSize: 14,
    color: '#374151',
  },
});
