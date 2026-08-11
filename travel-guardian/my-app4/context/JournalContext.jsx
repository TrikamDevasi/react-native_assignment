import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export const JournalContext = createContext();

export const JournalProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      const saved = await AsyncStorage.getItem('travel_journal');
      if (saved) {
        setEntries(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load journal', e);
    }
  };

  const saveEntries = async (newEntries) => {
    try {
      setEntries(newEntries);
      await AsyncStorage.setItem('travel_journal', JSON.stringify(newEntries));
    } catch (e) {
      console.error('Failed to save journal', e);
    }
  };

  const addEntry = async (entry) => {
    const newEntry = {
      ...entry,
      id: Date.now().toString(),
      favorite: false,
      title: entry.title || 'Untitled Photo',
    };
    const newEntries = [newEntry, ...entries];
    await saveEntries(newEntries);
  };

  const deleteEntry = async (id) => {
    const newEntries = entries.filter((e) => e.id !== id);
    await saveEntries(newEntries);
  };

  const renameEntry = async (id, newTitle) => {
    const newEntries = entries.map((e) =>
      e.id === id ? { ...e, title: newTitle } : e
    );
    await saveEntries(newEntries);
  };

  const toggleFavorite = async (id) => {
    const newEntries = entries.map((e) =>
      e.id === id ? { ...e, favorite: !e.favorite } : e
    );
    await saveEntries(newEntries);
  };

  const exportJournal = async () => {
    try {
      const fileUri = FileSystem.documentDirectory + 'travel_journal.json';
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(entries, null, 2));
      
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      }
    } catch (e) {
      console.error('Export failed', e);
    }
  };

  return (
    <JournalContext.Provider
      value={{
        entries,
        addEntry,
        deleteEntry,
        renameEntry,
        toggleFavorite,
        exportJournal,
      }}
    >
      {children}
    </JournalContext.Provider>
  );
};
