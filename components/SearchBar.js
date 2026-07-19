import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Search } from 'lucide-react-native';
import { colors, spacing, radius, shadow, fontWeight } from '../constants/theme';

export default function SearchBar({ value, onChangeText, placeholder }) {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Search size={16} color={colors.textMuted} strokeWidth={2} style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder || 'Search...'}
          placeholderTextColor={colors.textMuted}
          returnKeyType="search"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.base,
    marginBottom: spacing.md,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.full,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    ...shadow.sm,
  },
  searchIcon: {
    marginRight: spacing.md,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: fontWeight.regular,
    paddingVertical: 0,
  },
});
