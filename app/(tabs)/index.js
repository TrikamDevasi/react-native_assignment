import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import AppHeader from '../../components/AppHeader';
import QuickActionCard from '../../components/QuickActionCard';
import SurveyCard from '../../components/SurveyCard';
import { useSurvey } from '../../context/SurveyContext';

export default function Dashboard() {
  const router = useRouter();
  const { surveys, getTodaysCount } = useSurvey();
  const todayCount = getTodaysCount();
  const recentSurveys = surveys.slice(0, 3);

  function handleViewSurvey(survey) {
    router.push({ pathname: '/survey-preview', params: { id: survey.id } });
  }

  return (
    <View style={styles.container}>
      <AppHeader />
      <View style={styles.content}>
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>Welcome to Smart Field Survey</Text>
          <Text style={styles.studentName}>Trika Aditya</Text>
          <Text style={styles.studentDetail}>University of Indonesia</Text>
          <Text style={styles.studentDetail}>Computer Science - Semester 6</Text>
        </View>

        <View style={styles.countCard}>
          <Text style={styles.countNumber}>{todayCount}</Text>
          <Text style={styles.countLabel}>Today's Survey Count</Text>
        </View>

        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickRow}>
          <QuickActionCard
            title="New Survey"
            icon="📝"
            color="#2563EB"
            onPress={() => router.push('/(tabs)/new-survey')}
          />
          <QuickActionCard
            title="Camera"
            icon="📷"
            color="#7C3AED"
            onPress={() => router.push('/camera')}
          />
          <QuickActionCard
            title="Location"
            icon="📍"
            color="#059669"
            onPress={() => router.push('/location')}
          />
          <QuickActionCard
            title="Contacts"
            icon="👤"
            color="#D97706"
            onPress={() => router.push('/contacts')}
          />
        </View>

        <Text style={styles.sectionTitle}>Recent Surveys</Text>
        {recentSurveys.length === 0 ? (
          <Text style={styles.emptyText}>No surveys yet. Start a new one!</Text>
        ) : (
          <FlatList
            data={recentSurveys}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <SurveyCard survey={item} onPress={handleViewSurvey} />
            )}
            scrollEnabled={false}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  welcomeCard: {
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
  welcomeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563EB',
  },
  studentDetail: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  countCard: {
    backgroundColor: '#2563EB',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
  },
  countNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  countLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  quickRow: {
    flexDirection: 'row',
    marginBottom: 20,
    marginHorizontal: -4,
  },
  emptyText: {
    color: '#9CA3AF',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },
});
