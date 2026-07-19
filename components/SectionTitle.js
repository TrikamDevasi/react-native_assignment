import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, fontWeight } from '../constants/theme';

export default function SectionTitle({ title, subtitle, rightText, onRightPress }) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {rightText ? (
        <Pressable onPress={onRightPress} style={styles.right}>
          <Text style={styles.rightText}>{rightText}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  left: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
    fontWeight: fontWeight.regular,
  },
  right: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  rightText: {
    fontSize: 13,
    fontWeight: fontWeight.semibold,
    color: colors.primary,
  },
});
