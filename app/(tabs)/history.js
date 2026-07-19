import React, { useState } from 'react';
import { View, Text, FlatList, Pressable, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import SurveyCard from '../../components/SurveyCard';
import EmptyState from '../../components/EmptyState';
import SearchBar from '../../components/SearchBar';
import { useSurvey } from '../../context/SurveyContext';
import { colors, spacing, radius, fontWeight } from '../../constants/theme';

export default function History() {
  const router = useRouter();
  const { surveys, deleteSurvey } = useSurvey();
  const [searchText, setSearchText] = useState('');
  const [filterPriority, setFilterPriority] = useState('All');

  const priorities = ['All', 'Low', 'Medium', 'High'];

  const priorityChipColor = {
    All: colors.primary,
    Low: colors.success,
    Medium: colors.warning,
    High: colors.danger,
  };

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
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search by site or client..."
        />
        <View style={styles.filterRow}>
          {priorities.map(p => {
            const isActive = filterPriority === p;
            const chipColor = priorityChipColor[p];
            return (
              <Pressable
                key={p}
                style={[
                  styles.chip,
                  isActive && { backgroundColor: chipColor, borderColor: chipColor },
                ]}
                onPress={() => setFilterPriority(p)}
              >
                <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                  {p}
                </Text>
              </Pressable>
            );
          })}
        </View>
        {surveys.length > 0 ? (
          <View style={styles.countBar}>
            <Text style={styles.countText}>
              {filtered.length} {filtered.length === 1 ? 'survey' : 'surveys'} found
            </Text>
          </View>
        ) : null}
      </View>

      {filtered.length === 0 ? (
        <EmptyState
          icon="📋"
          title={searchText || filterPriority !== 'All' ? 'No results found' : 'No Surveys Yet'}
          message={
            searchText || filterPriority !== 'All'
              ? 'Try adjusting your search or filters.'
              : 'Surveys you create will appear here.'
          }
        />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
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
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    backgroundColor: colors.card,
    paddingTop: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.base,
    paddingBottom: spacing.base,
    gap: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.background,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  chipText: {
    fontSize: 12,
    fontWeight: fontWeight.semibold,
    color: colors.textSecondary,
  },
  chipTextActive: {
    color: '#fff',
  },
  countBar: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  countText: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: fontWeight.medium,
  },
  list: {
    paddingHorizontal: spacing.base,
    paddingTop: spacing.base,
    paddingBottom: 32,
  },
});
