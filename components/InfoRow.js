import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, fontWeight } from '../constants/theme';

export default function InfoRow({ label, value, last }) {
  return (
    <View style={[styles.row, !last && styles.border]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value} numberOfLines={3}>{value || '—'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: spacing.md,
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  label: {
    fontSize: 13,
    color: colors.textMuted,
    fontWeight: fontWeight.medium,
    flex: 0.45,
  },
  value: {
    fontSize: 14,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    flex: 0.55,
    textAlign: 'right',
  },
});
