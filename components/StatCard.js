import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius, shadow, fontWeight } from '../constants/theme';

export default function StatCard({ Icon, value, label, color }) {
  const accentColor = color || colors.primary;

  return (
    <View style={[styles.card, { borderTopColor: accentColor }]}>
      <Icon size={20} color={accentColor} strokeWidth={1.8} />
      <Text style={[styles.value, { color: accentColor }]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.base,
    alignItems: 'center',
    marginHorizontal: spacing.xs,
    borderTopWidth: 3,
    ...shadow.sm,
  },
  value: {
    fontSize: 28,
    fontWeight: fontWeight.extrabold,
    letterSpacing: -0.5,
    marginTop: spacing.sm,
  },
  label: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: fontWeight.medium,
    marginTop: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
