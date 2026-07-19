import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Inbox } from 'lucide-react-native';
import { colors, spacing, radius, fontWeight } from '../constants/theme';

export default function EmptyState({ Icon, title, message, actionLabel, onAction }) {
  const IconComponent = Icon || Inbox;

  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <IconComponent size={36} color={colors.textMuted} strokeWidth={1.5} />
      </View>
      <Text style={styles.title}>{title || 'Nothing here yet'}</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
      {actionLabel && onAction ? (
        <Pressable style={styles.button} onPress={onAction}>
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxxl,
    paddingHorizontal: spacing.xl,
  },
  iconWrap: {
    width: 80,
    height: 80,
    borderRadius: radius.xxl,
    backgroundColor: colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 18,
    fontWeight: fontWeight.semibold,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 260,
  },
  button: {
    marginTop: spacing.lg,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radius.full,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: fontWeight.semibold,
  },
});
