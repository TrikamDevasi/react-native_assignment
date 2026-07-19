import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Pressable, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import SurveyCard from '../../components/SurveyCard';
import EmptyState from '../../components/EmptyState';
import { useSurvey } from '../../context/SurveyContext';

export default function History() {
  const router = useRouter();
  const { surveys, deleteSurvey } = useSurvey();
  const [searchText, setSearchText] = useState('');
  const [filterPriority, setFilterPriority] = useState('All');

  const priorities = ['All', 'Low', 'Medium', 'High'];

  const filtered = surveys.filter(s => {
    const matchesSearch =
      s.siteName.toLowerCase().includes(searchText.toLowerCase()) ||
      s.clientName.toLowerCase().includes(searchText.toLowerCase());
    const matchesPriority = filterPriority === 'All' || s.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  function handlePress(survey) {
    router.push({ pathname: '/survey-preview', params: { id: survey.id } });
  }

  function handleDelete(id) {
    Alert.alert('Delete Survey', 'Are you sure you want to delete this survey?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteSurvey(id) },
    ]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search by site or client..."
          placeholderTextColor="#9CA3AF"
        />
      </View>
      <View style={styles.filterRow}>
        {priorities.map(p => (
          <Pressable
            key={p}
            style={[
              styles.chip,
              filterPriority === p && styles.chipActive,
            ]}
            onPress={() => setFilterPriority(p)}
          >
            <Text style={[styles.chipText, filterPriority === p && styles.chipTextActive]}>
              {p}
            </Text>
          </Pressable>
        ))}
      </View>
      {filtered.length === 0 ? (
        <EmptyState title="No Surveys Found" message="Start a new survey to see it here." />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <SurveyCard
              survey={item}
              onPress={handlePress}
              onDelete={handleDelete}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    padding: 16,
    paddingBottom: 0,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
  },
  chipActive: {
    backgroundColor: '#2563EB',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6B7280',
  },
  chipTextActive: {
    color: '#fff',
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});
