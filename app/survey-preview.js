import React from 'react';
import { View, Text, ScrollView, Image, Alert, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import PrimaryButton from '../components/PrimaryButton';
import { useSurvey } from '../context/SurveyContext';

export default function SurveyPreview() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { currentSurvey, setCurrentSurvey, surveys, addSurvey, setSurveys } = useSurvey();

  let survey = currentSurvey;

  if (params.id) {
    survey = surveys.find(s => s.id === params.id);
  }

  const isReadOnly = !!params.id;

  function handleSubmit() {
    if (!survey) return;
    const newSurvey = {
      ...survey,
      id: Date.now().toString(),
    };
    addSurvey(newSurvey);
    Alert.alert('Success', 'Survey submitted!', [
      { text: 'OK', onPress: () => router.push('/(tabs)/history') },
    ]);
  }

  function handleEdit() {
    setCurrentSurvey(survey);
    router.push('/(tabs)/new-survey');
  }

  if (!survey) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>No survey data available.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Survey Preview</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Site Name</Text>
          <Text style={styles.value}>{survey.siteName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Client</Text>
          <Text style={styles.value}>{survey.clientName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Description</Text>
          <Text style={styles.value}>{survey.description}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Priority</Text>
          <Text
            style={[
              styles.priority,
              { color: survey.priority === 'High' ? '#EF4444' : survey.priority === 'Medium' ? '#F59E0B' : '#10B981' },
            ]}
          >
            {survey.priority}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>{survey.date}</Text>
        </View>

        {survey.photo && (
          <View style={styles.imageWrap}>
            <Text style={styles.sectionLabel}>Captured Photo</Text>
            <Image source={{ uri: survey.photo }} style={styles.image} />
          </View>
        )}

        {survey.contact && (
          <View style={styles.detailBox}>
            <Text style={styles.sectionLabel}>Contact</Text>
            <Text style={styles.detailText}>Name: {survey.contact.name}</Text>
            {survey.contact.phones && survey.contact.phones.length > 0 && (
              <Text style={styles.detailText}>
                Phone: {survey.contact.phones[0].number}
              </Text>
            )}
          </View>
        )}

        {survey.location && (
          <View style={styles.detailBox}>
            <Text style={styles.sectionLabel}>Location</Text>
            <Text style={styles.detailText}>
              Lat: {survey.location.coords.latitude}
            </Text>
            <Text style={styles.detailText}>
              Lng: {survey.location.coords.longitude}
            </Text>
          </View>
        )}

        {survey.notes && (
          <View style={styles.detailBox}>
            <Text style={styles.sectionLabel}>Notes</Text>
            <Text style={styles.detailText}>{survey.notes}</Text>
          </View>
        )}
      </View>

      {isReadOnly ? (
        <Text style={styles.readOnlyText}>Viewing submitted survey</Text>
      ) : (
        <View style={styles.actions}>
          <PrimaryButton title="Submit Survey" onPress={handleSubmit} color="#059669" />
          <PrimaryButton title="Edit Survey" onPress={handleEdit} color="#D97706" />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  empty: {
    color: '#6B7280',
    fontSize: 16,
    textAlign: 'center',
  },
  content: {
    padding: 16,
    paddingBottom: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'right',
    flex: 1,
    marginLeft: 10,
  },
  priority: {
    fontSize: 14,
    fontWeight: '600',
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    marginTop: 12,
  },
  imageWrap: {
    marginTop: 8,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  detailBox: {
    marginTop: 8,
  },
  detailText: {
    fontSize: 13,
    color: '#4B5563',
    marginBottom: 2,
  },
  readOnlyText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  actions: {
    gap: 12,
  },
});
