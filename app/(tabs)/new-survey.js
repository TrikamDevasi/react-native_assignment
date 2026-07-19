import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import PrimaryButton from '../../components/PrimaryButton';
import { useSurvey } from '../../context/SurveyContext';

export default function NewSurvey() {
  const router = useRouter();
  const { currentSurvey, setCurrentSurvey, capturedPhoto, selectedContact, currentLocation, pastedNotes } = useSurvey();

  const [siteName, setSiteName] = useState(currentSurvey?.siteName || '');
  const [clientName, setClientName] = useState(currentSurvey?.clientName || '');
  const [description, setDescription] = useState(currentSurvey?.description || '');
  const [priority, setPriority] = useState(currentSurvey?.priority || 'Medium');

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const priorities = ['Low', 'Medium', 'High'];

  function handleSubmit() {
    if (!siteName.trim()) {
      Alert.alert('Validation Error', 'Please enter a Site Name');
      return;
    }
    if (!clientName.trim()) {
      Alert.alert('Validation Error', 'Please enter a Client Name');
      return;
    }
    if (!description.trim()) {
      Alert.alert('Validation Error', 'Please enter a Description');
      return;
    }

    const surveyData = {
      siteName: siteName.trim(),
      clientName: clientName.trim(),
      description: description.trim(),
      priority,
      date: dateStr,
      photo: capturedPhoto,
      contact: selectedContact,
      location: currentLocation,
      notes: pastedNotes,
    };

    setCurrentSurvey(surveyData);
    router.push('/survey-preview');
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.label}>Site Name</Text>
      <TextInput
        style={styles.input}
        value={siteName}
        onChangeText={setSiteName}
        placeholder="Enter site name"
        placeholderTextColor="#9CA3AF"
      />

      <Text style={styles.label}>Client Name</Text>
      <TextInput
        style={styles.input}
        value={clientName}
        onChangeText={setClientName}
        placeholder="Enter client name"
        placeholderTextColor="#9CA3AF"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter survey description"
        placeholderTextColor="#9CA3AF"
        multiline
        numberOfLines={4}
      />

      <Text style={styles.label}>Priority</Text>
      <View style={styles.priorityRow}>
        {priorities.map(p => (
          <Pressable
            key={p}
            style={[
              styles.priorityBtn,
              priority === p && {
                backgroundColor:
                  p === 'High' ? '#EF4444' : p === 'Medium' ? '#F59E0B' : '#10B981',
              },
            ]}
            onPress={() => setPriority(p)}
          >
            <Text style={[styles.priorityText, priority === p && styles.priorityTextActive]}>
              {p}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Date</Text>
      <View style={styles.dateBox}>
        <Text style={styles.dateText}>{dateStr}</Text>
      </View>

      <View style={styles.dataRow}>
        <Text style={styles.dataItem}>
          📷 Photo: {capturedPhoto ? 'Captured' : 'None'}
        </Text>
        <Text style={styles.dataItem}>
          👤 Contact: {selectedContact ? selectedContact.name : 'None'}
        </Text>
      </View>
      <View style={styles.dataRow}>
        <Text style={styles.dataItem}>
          📍 Location: {currentLocation ? 'Set' : 'None'}
        </Text>
        <Text style={styles.dataItem}>
          📝 Notes: {pastedNotes ? 'Added' : 'None'}
        </Text>
      </View>

      <PrimaryButton title="Preview Survey" onPress={handleSubmit} />
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
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  priorityRow: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  priorityTextActive: {
    color: '#fff',
  },
  dateBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  dateText: {
    fontSize: 15,
    color: '#1F2937',
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  dataItem: {
    fontSize: 13,
    color: '#6B7280',
  },
});
