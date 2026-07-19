import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, radius, shadow, fontWeight } from '../constants/theme';

export default function QuickActionCard({ title, Icon, color, onPress }) {
  const bgColor = color || colors.primary;

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={[styles.iconWrap, { backgroundColor: bgColor + '18' }]}>
        <Icon size={22} color={bgColor} strokeWidth={1.8} />
      </View>
      <Text style={styles.label} numberOfLines={1}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    paddingVertical: spacing.base,
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.sm,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    fontSize: 11,
    fontWeight: fontWeight.semibold,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
