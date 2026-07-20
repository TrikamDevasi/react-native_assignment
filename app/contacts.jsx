import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl, StyleSheet } from 'react-native';
import * as Contacts from 'expo-contacts';
import { Users } from 'lucide-react-native';
import ContactItem from '../components/ContactItem';
import EmptyState from '../components/EmptyState';
import SearchBar from '../components/SearchBar';
import { useSurvey } from '../context/SurveyContext';
import { useNavigation } from 'expo-router';
import { colors, spacing, radius, shadow, fontWeight } from '../constants/theme';

export default function ContactsScreen() {
  const navigation = useNavigation();
  const { setSelectedContact } = useSurvey();
  const [contactList, setContactList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [granted, setGranted] = useState(false);
  const [fetched, setFetched] = useState(false);

  async function loadContacts() {
    setLoading(true);
    try {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        setGranted(true);
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        });
        const formatted = (data || []).map(c => ({
          id: c.id,
          name: c.name || 'Unknown',
          phones: (c.phoneNumbers || []).map(p => ({
            label: p.label,
            number: p.number,
          })),
        }));
        setContactList(formatted);
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

  useEffect(() => {
    loadContacts();
  }, []);

  const filtered = search.trim()
    ? contactList.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
    : contactList;

  if (!fetched || (loading && contactList.length === 0)) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading contacts...</Text>
      </View>
    );
  }

  if (!granted) {
    return (
      <View style={styles.center}>
        <View style={styles.permCard}>
          <View style={styles.permIconWrap}>
            <Users size={36} color={colors.primary} strokeWidth={1.5} />
          </View>
          <Text style={styles.permTitle}>Contacts Access Required</Text>
          <Text style={styles.permMessage}>
            Please allow access to your contacts to select a client for your survey.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryBadge}>
            <Text style={styles.summaryCount}>{filtered.length}</Text>
          </View>
          <Text style={styles.summaryLabel}>
            {filtered.length === 1 ? 'contact found' : 'contacts found'}
          </Text>
        </View>
        <SearchBar value={search} onChangeText={setSearch} placeholder="Search contacts..." />
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : filtered.length === 0 ? (
        <EmptyState
          Icon={Users}
          title="No contacts found"
          message={search ? 'Try a different search term.' : 'Your contact list is empty.'}
        />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={loadContacts}
              colors={[colors.primary]}
              tintColor={colors.primary}
            />
          }
          renderItem={({ item }) => <ContactItem contact={item} onSelect={handleSelect} />}
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: spacing.xl,
  },
  loadingText: {
    marginTop: spacing.md,
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: fontWeight.medium,
  },
  permCard: {
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.md,
  },
  permIconWrap: {
    width: 72,
    height: 72,
    borderRadius: radius.xxl,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.base,
  },
  permTitle: {
    fontSize: 18,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  permMessage: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  topBar: {
    backgroundColor: colors.card,
    paddingTop: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
    gap: spacing.sm,
  },
  summaryBadge: {
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    minWidth: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
  },
  summaryCount: {
    color: '#fff',
    fontSize: 13,
    fontWeight: fontWeight.bold,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: fontWeight.medium,
  },
  list: {
    padding: spacing.base,
    paddingBottom: 32,
  },
});
