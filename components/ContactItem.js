import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import * as Clipboard from 'expo-clipboard';

export default function ContactItem({ contact, onSelect }) {
  function getInitial(name) {
    if (!name) return '?';
    return name.trim().charAt(0).toUpperCase();
  }

  function getPhone() {
    if (contact.phones && contact.phones.length > 0) {
      return contact.phones[0].number;
    }
    return null;
  }

  async function handleCopy() {
    const number = getPhone();
    if (number) {
      await Clipboard.setStringAsync(number);
      alert('Number copied to clipboard');
    }
  }

  function handleSelect() {
    if (onSelect) {
      onSelect(contact);
    }
  }

  const phone = getPhone();

  return (
    <Pressable style={styles.item} onPress={handleSelect}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{getInitial(contact.name)}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{contact.name}</Text>
        {phone ? (
          <Text style={styles.phone}>{phone}</Text>
        ) : (
          <Text style={styles.noNumber}>No Number</Text>
        )}
      </View>
      {phone && (
        <Pressable style={styles.copyBtn} onPress={handleCopy}>
          <Text style={styles.copyText}>Copy</Text>
        </Pressable>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1F2937',
  },
  phone: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  noNumber: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 2,
    fontStyle: 'italic',
  },
  copyBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
  },
  copyText: {
    color: '#2563EB',
    fontSize: 12,
    fontWeight: '600',
  },
});
