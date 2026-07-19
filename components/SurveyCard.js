import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, radius, shadow, fontWeight } from '../constants/theme';

export default function SurveyCard({ survey, onPress, onDelete }) {
  function getPriorityColor() {
    switch (survey.priority) {
      case 'High': return colors.danger;
      case 'Medium': return colors.warning;
      case 'Low': return colors.success;
      default: return colors.textMuted;
    }
  }

  const priorityColor = getPriorityColor();

  return (
    <Pressable style={styles.card} onPress={() => onPress && onPress(survey)}>
      <View style={[styles.accent, { backgroundColor: priorityColor }]} />
      <View style={styles.body}>
        <View style={styles.header}>
          <Text style={styles.siteName} numberOfLines={1}>{survey.siteName}</Text>
          <View style={[styles.badge, { backgroundColor: priorityColor + '1A' }]}>
            <Text style={[styles.badgeText, { color: priorityColor }]}>{survey.priority}</Text>
          </View>
        </View>
        <Text style={styles.client} numberOfLines={1}>
          {survey.clientName}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.date}>{survey.date}</Text>
          {onDelete ? (
            <Pressable
              style={styles.deleteBtn}
              onPress={() => onDelete(survey.id)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </Pressable>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    marginBottom: spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.sm,
  },
  accent: {
    width: 4,
  },
  body: {
    flex: 1,
    padding: spacing.base,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  siteName: {
    fontSize: 15,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    flex: 1,
    marginRight: spacing.sm,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: fontWeight.bold,
    letterSpacing: 0.3,
  },
  client: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    fontWeight: fontWeight.medium,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: fontWeight.regular,
  },
  deleteBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    backgroundColor: colors.dangerLight,
    borderWidth: 1,
    borderColor: colors.dangerMid,
  },
  deleteText: {
    color: colors.danger,
    fontSize: 11,
    fontWeight: fontWeight.semibold,
  },
});
