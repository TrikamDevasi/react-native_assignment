import React, { useContext, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert, TextInput, RefreshControl } from 'react-native';
import { JournalContext } from '../../context/JournalContext';
import { Ionicons } from '@expo/vector-icons';

export default function JournalScreen() {
  const { entries, deleteEntry, renameEntry, toggleFavorite, exportJournal } = useContext(JournalContext);
  const [refreshing, setRefreshing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleEdit = (entry) => {
    setEditingId(entry.id);
    setEditTitle(entry.title);
  };

  const saveEdit = () => {
    renameEntry(editingId, editTitle);
    setEditingId(null);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.photo }} style={styles.image} />
      <View style={styles.cardInfo}>
        {editingId === item.id ? (
          <TextInput
            style={styles.input}
            value={editTitle}
            onChangeText={setEditTitle}
            onBlur={saveEdit}
            onSubmitEditing={saveEdit}
            autoFocus
          />
        ) : (
          <Text style={styles.title} onLongPress={() => handleEdit(item)}>{item.title}</Text>
        )}
        {item.address && <Text style={styles.address}>{item.address.city}, {item.address.country}</Text>}
        <Text style={styles.date}>{new Date(Number(item.id)).toLocaleString()}</Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
            <Ionicons name={item.favorite ? "heart" : "heart-outline"} size={24} color="#d32f2f" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteEntry(item.id)}>
            <Ionicons name="trash-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Travel Journal</Text>
        <TouchableOpacity onPress={exportJournal}>
          <Ionicons name="share-outline" size={24} color="#2563eb" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={<Text style={styles.empty}>No entries yet. Take a photo with location!</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    elevation: 2,
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  list: { padding: 10 },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 2,
  },
  image: { width: '100%', height: 200 },
  cardInfo: { padding: 15 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  input: { fontSize: 18, fontWeight: 'bold', marginBottom: 5, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  address: { color: '#666', marginBottom: 5 },
  date: { color: '#999', fontSize: 12, marginBottom: 10 },
  actions: { flexDirection: 'row', justifyContent: 'space-between' },
  empty: { textAlign: 'center', marginTop: 50, color: '#666' }
});
