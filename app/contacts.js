import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, ActivityIndicator, RefreshControl, StyleSheet } from 'react-native';
import { Contact as ContactClass, requestPermissionsAsync } from 'expo-contacts';
import ContactItem from '../components/ContactItem';
import EmptyState from '../components/EmptyState';
import { useSurvey } from '../context/SurveyContext';
import { useNavigation } from 'expo-router';

export default function ContactsScreen() {
  const navigation = useNavigation();
  const { setSelectedContact } = useSurvey();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [granted, setGranted] = useState(false);
  const [fetched, setFetched] = useState(false);

  async function loadContacts() {
    setLoading(true);
    try {
      const { status } = await requestPermissionsAsync();
      if (status === 'granted') {
        setGranted(true);
        const contactList = await ContactClass.getAll({ limit: 500 });
        const formatted = await Promise.all(
          contactList.map(async (c) => {
            const name = await c.getFullName();
            const phones = await c.getPhones();
            return {
              id: c.id,
              name: name || 'Unknown',
              phones: phones.map(p => ({ label: p.label, number: p.number })) || [],
            };
          })
        );
        setContacts(formatted);
      } else {
        setGranted(false);
      }
    } catch (e) {
      setGranted(false);
    }
    setLoading(false);
    setFetched(true);
  }

  function handleSelect(contact) {
    setSelectedContact(contact);
    navigation.goBack();
  }

  useEffect(() => { loadContacts(); }, []);

  const filtered = search.trim()
    ? contacts.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
    : contacts;

  if (!fetched) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Loading contacts...</Text>
      </View>
    );
  }

  if (!granted) {
    return (
      <EmptyState
        title="Permission Denied"
        message="Please allow access to your contacts."
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.counter}>Total found: {filtered.length}</Text>
      <TextInput
        style={styles.search}
        value={search}
        onChangeText={setSearch}
        placeholder="Filter contacts..."
        placeholderTextColor="#9CA3AF"
      />
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#2563EB" />
        </View>
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No contacts"
          message={search ? 'Try a different search' : 'Your contact list is empty'}
        />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={loadContacts}
              colors={['#2563EB']}
            />
          }
          renderItem={({ item }) => (
            <ContactItem contact={item} onSelect={handleSelect} />
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    color: '#6B7280',
    fontSize: 14,
  },
  counter: {
    fontSize: 13,
    color: '#6B7280',
    padding: 16,
    paddingBottom: 4,
    fontWeight: '500',
  },
  search: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  list: {
    padding: 16,
    paddingTop: 0,
  },
});
