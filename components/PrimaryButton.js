import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, radius, shadow, fontWeight } from '../constants/theme';

export default function PrimaryButton({ title, onPress, variant, disabled, style }) {
  function getStyles() {
    if (variant === 'secondary') {
      return {
        btn: { backgroundColor: colors.card, borderWidth: 1.5, borderColor: colors.border },
        text: { color: colors.textPrimary },
        shadow: shadow.sm,
      };
    }
    if (variant === 'danger') {
      return {
        btn: { backgroundColor: colors.dangerLight, borderWidth: 1.5, borderColor: colors.dangerMid },
        text: { color: colors.danger },
        shadow: {},
      };
    }
    if (variant === 'ghost') {
      return {
        btn: { backgroundColor: colors.primaryLight, borderWidth: 1.5, borderColor: colors.primaryMid },
        text: { color: colors.primary },
        shadow: {},
      };
    }
    if (variant === 'success') {
      return {
        btn: { backgroundColor: colors.success },
        text: { color: '#fff' },
        shadow: {
          shadowColor: colors.success,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.25,
          shadowRadius: 8,
          elevation: 5,
        },
      };
    }
    return {
      btn: { backgroundColor: colors.primary },
      text: { color: '#fff' },
      shadow: shadow.primary,
    };
  }

  const s = getStyles();

  return (
    <Pressable
      style={[styles.button, s.btn, s.shadow, disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, s.text]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: radius.lg,
    paddingVertical: spacing.base,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 15,
    fontWeight: fontWeight.semibold,
    letterSpacing: 0.2,
  },
  disabled: {
    opacity: 0.45,
  },
});
