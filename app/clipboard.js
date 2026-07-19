import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, ScrollView, StyleSheet } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { useSurvey } from '../context/SurveyContext';

export default function ClipboardScreen() {
  const { surveys, currentLocation, selectedContact, setPastedNotes, pastedNotes } = useSurvey();
  const [pasteArea, setPasteArea] = useState('');

  async function copySurveyId() {
    if (surveys.length === 0) {
      Alert.alert('No Surveys', 'There are no surveys yet.');
      return;
    }
    const id = surveys[0].id;
    await Clipboard.setStringAsync(id);
    Alert.alert('Copied', `Survey ID '${id}' copied to clipboard`);
  }

  async function copyContactNumber() {
    if (!selectedContact) {
      Alert.alert('No Contact', 'No contact has been selected.');
      return;
    }
    const phones = selectedContact.phones;
    if (phones && phones.length > 0) {
      await Clipboard.setStringAsync(phones[0].number);
      Alert.alert('Copied', 'Contact number copied to clipboard');
    } else {
      Alert.alert('No Number', 'Selected contact has no phone number.');
    }
  }

  async function copyLocation() {
    if (!currentLocation) {
      Alert.alert('No Location', 'No location has been captured yet.');
      return;
    }
    const text = `Lat: ${currentLocation.coords.latitude}, Lng: ${currentLocation.coords.longitude}`;
    await Clipboard.setStringAsync(text);
    Alert.alert('Copied', 'Location copied to clipboard');
  }

  async function pasteText() {
    const text = await Clipboard.getStringAsync();
    setPasteArea(text || '');
  }

  function saveNotes() {
    setPastedNotes(pasteArea);
    Alert.alert('Saved', 'Notes saved to survey data');
  }

  async function clearClipboard() {
    await Clipboard.setStringAsync('');
    setPasteArea('');
    Alert.alert('Cleared', 'Clipboard has been cleared');
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Copy to Clipboard</Text>
        <Pressable style={styles.copyBtn} onPress={copySurveyId}>
          <Text style={styles.copyBtnText}>📋 Copy Survey ID</Text>
        </Pressable>
        <Pressable style={styles.copyBtn} onPress={copyContactNumber}>
          <Text style={styles.copyBtnText}>👤 Copy Contact Number</Text>
        </Pressable>
        <Pressable style={styles.copyBtn} onPress={copyLocation}>
          <Text style={styles.copyBtnText}>📍 Copy Current Location</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Paste Notes</Text>
        <TextInput
          style={styles.textArea}
          value={pasteArea}
          onChangeText={setPasteArea}
          placeholder="Pasted text will appear here..."
          placeholderTextColor="#9CA3AF"
          multiline
          numberOfLines={5}
        />
        <View style={styles.row}>
          <Pressable style={styles.pasteBtn} onPress={pasteText}>
            <Text style={styles.pasteBtnText}>Paste from Clipboard</Text>
          </Pressable>
          <Pressable style={styles.saveBtn} onPress={saveNotes}>
            <Text style={styles.saveBtnText}>Save Notes</Text>
          </Pressable>
        </View>
      </View>

      <Pressable style={styles.clearBtn} onPress={clearClipboard}>
        <Text style={styles.clearText}>Clear Clipboard Data</Text>
      </Pressable>
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
    color: '#1F2937',
    marginBottom: 14,
  },
  copyBtn: {
    backgroundColor: '#EFF6FF',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  copyBtnText: {
    color: '#2563EB',
    fontSize: 15,
    fontWeight: '500',
  },
  textArea: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: 120,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 10,
  },
  pasteBtn: {
    flex: 1,
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  pasteBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  saveBtn: {
    flex: 1,
    backgroundColor: '#059669',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  clearBtn: {
    backgroundColor: '#FEE2E2',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  clearText: {
    color: '#EF4444',
    fontSize: 15,
    fontWeight: '600',
  },
});
