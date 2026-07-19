import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { colors, spacing, radius, shadow, fontWeight } from '../constants/theme';

export default function SearchBar({ value, onChangeText, placeholder }) {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.iconWrap}>
          <View style={styles.iconCircle} />
          <View style={styles.iconHandle} />
        </View>
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
  iconWrap: {
    width: 18,
    height: 18,
    marginRight: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.textMuted,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  iconHandle: {
    width: 6,
    height: 2,
    backgroundColor: colors.textMuted,
    borderRadius: 2,
    position: 'absolute',
    bottom: 1,
    right: 0,
    transform: [{ rotate: '45deg' }],
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: fontWeight.regular,
    paddingVertical: 0,
  },
});
