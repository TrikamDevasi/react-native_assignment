import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius, shadow, fontWeight } from '../constants/theme';

export default function StatCard({ icon, value, label, color }) {
  return (
    <View style={[styles.card, { borderTopColor: color || colors.primary }]}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={[styles.value, { color: color || colors.primary }]}>{value}</Text>
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
  icon: {
    fontSize: 20,
    marginBottom: spacing.sm,
  },
  value: {
    fontSize: 28,
    fontWeight: fontWeight.extrabold,
    letterSpacing: -0.5,
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
