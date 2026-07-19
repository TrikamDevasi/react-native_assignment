import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { colors, spacing, radius, shadow, fontWeight } from '../constants/theme';

const AVATAR_COLORS = [
  colors.primary,
  colors.purple,
  colors.success,
  colors.orange,
  colors.danger,
  colors.teal,
];

export default function ContactItem({ contact, onSelect }) {
  function getInitial(name) {
    if (!name) return '?';
    return name.trim().charAt(0).toUpperCase();
  }

  function getAvatarColor(name) {
    if (!name) return AVATAR_COLORS[0];
    const code = name.trim().charCodeAt(0);
    return AVATAR_COLORS[code % AVATAR_COLORS.length];
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
    }
  }

  function handleSelect() {
    if (onSelect) {
      onSelect(contact);
    }
  }

  const phone = getPhone();
  const avatarColor = getAvatarColor(contact.name);
  const initial = getInitial(contact.name);

  return (
    <Pressable style={styles.item} onPress={handleSelect}>
      <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
        <Text style={styles.avatarText}>{initial}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{contact.name}</Text>
        {phone ? (
          <Text style={styles.phone} numberOfLines={1}>{phone}</Text>
        ) : (
          <Text style={styles.noNumber}>No phone number</Text>
        )}
      </View>
      {phone ? (
        <Pressable style={styles.copyBtn} onPress={handleCopy}>
          <Text style={styles.copyText}>Copy</Text>
        </Pressable>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.sm,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: fontWeight.bold,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  phone: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: fontWeight.medium,
  },
  noNumber: {
    fontSize: 12,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
  copyBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: colors.primaryMid,
    marginLeft: spacing.sm,
  },
  copyText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: fontWeight.semibold,
  },
});
