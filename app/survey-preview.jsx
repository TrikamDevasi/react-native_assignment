import React from 'react';
import { View, Text, ScrollView, Image, Alert, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { BadgeCheck, ClipboardList } from 'lucide-react-native';
import PrimaryButton from '../components/PrimaryButton';
import SectionTitle from '../components/SectionTitle';
import InfoRow from '../components/InfoRow';
import { useSurvey } from '../context/SurveyContext';
import { colors, spacing, radius, shadow, fontWeight } from '../constants/theme';

export default function SurveyPreview() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { currentSurvey, setCurrentSurvey, surveys, addSurvey } = useSurvey();

  let survey = currentSurvey;
  if (params.id) {
    survey = surveys.find(s => s.id === params.id);
  }

  const isReadOnly = !!params.id;

  function getPriorityColor() {
    switch (survey?.priority) {
      case 'High': return colors.danger;
      case 'Medium': return colors.warning;
      case 'Low': return colors.success;
      default: return colors.textMuted;
    }
  }

  function handleSubmit() {
    if (!survey) return;
    const newSurvey = {
      ...survey,
      id: Date.now().toString(),
    };
    addSurvey(newSurvey);
    Alert.alert('Survey Submitted!', 'Your survey has been saved to history.', [
      { text: 'View History', onPress: () => router.push('/(tabs)/history') },
    ]);
  }

  function handleEdit() {
    setCurrentSurvey(survey);
    router.push('/(tabs)/new-survey');
  }

  if (!survey) {
    return (
      <View style={styles.center}>
        <View style={styles.emptyCard}>
          <ClipboardList size={36} color={colors.textMuted} strokeWidth={1.5} style={styles.emptyIcon} />
          <Text style={styles.emptyTitle}>No Survey Data</Text>
          <Text style={styles.emptyMsg}>No survey data is available to preview.</Text>
        </View>
      </View>
    );
  }

  const priorityColor = getPriorityColor();

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {isReadOnly ? (
          <View style={styles.submittedBadge}>
            <BadgeCheck size={16} color={colors.success} strokeWidth={2.5} />
            <Text style={styles.submittedBadgeText}>Submitted Survey</Text>
          </View>
        ) : null}

        <View style={styles.card}>
          <SectionTitle title="Survey Information" />
          <InfoRow label="Site Name" value={survey.siteName} />
          <InfoRow label="Client" value={survey.clientName} />
          <InfoRow label="Description" value={survey.description} />
          <InfoRow label="Date" value={survey.date} />
          <View style={styles.priorityRow}>
            <Text style={styles.priorityLabel}>Priority</Text>
            <View style={[styles.priorityBadge, { backgroundColor: priorityColor + '1A' }]}>
              <Text style={[styles.priorityText, { color: priorityColor }]}>
                {survey.priority}
              </Text>
            </View>
          </View>
        </View>

        {survey.photo ? (
          <View style={styles.card}>
            <SectionTitle title="Captured Photo" />
            <View style={styles.imageWrap}>
              <Image source={{ uri: survey.photo }} style={styles.image} resizeMode="cover" />
            </View>
          </View>
        ) : null}

        {survey.contact ? (
          <View style={styles.card}>
            <SectionTitle title="Contact Information" />
            <InfoRow label="Name" value={survey.contact.name} />
            {survey.contact.phones && survey.contact.phones.length > 0 ? (
              <InfoRow label="Phone" value={survey.contact.phones[0].number} last />
            ) : (
              <InfoRow label="Phone" value="No phone number" last />
            )}
          </View>
        ) : null}

        {survey.location ? (
          <View style={styles.card}>
            <SectionTitle title="GPS Location" />
            <InfoRow label="Latitude" value={survey.location.coords.latitude.toFixed(6)} />
            <InfoRow label="Longitude" value={survey.location.coords.longitude.toFixed(6)} />
            {survey.location.coords.accuracy ? (
              <InfoRow
                label="Accuracy"
                value={`±${Math.round(survey.location.coords.accuracy)}m`}
                last
              />
            ) : null}
          </View>
        ) : null}

        {survey.notes ? (
          <View style={styles.card}>
            <SectionTitle title="Notes" />
            <View style={styles.notesBox}>
              <Text style={styles.notesText}>{survey.notes}</Text>
            </View>
          </View>
        ) : null}

        <View style={styles.spacer} />
      </ScrollView>

      {!isReadOnly ? (
        <View style={styles.actionBar}>
          <PrimaryButton
            title="Edit Survey"
            onPress={handleEdit}
            variant="secondary"
            style={styles.actionBtnHalf}
          />
          <PrimaryButton
            title="Submit Survey"
            onPress={handleSubmit}
            variant="success"
            style={styles.actionBtnHalf}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: spacing.base,
    paddingBottom: 24,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
  emptyCard: {
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.sm,
  },
  emptyIcon: {
    marginBottom: spacing.md,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  emptyMsg: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  submittedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    backgroundColor: colors.successLight,
    borderWidth: 1,
    borderColor: colors.successMid,
    borderRadius: radius.full,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  submittedBadgeText: {
    fontSize: 13,
    fontWeight: fontWeight.semibold,
    color: colors.success,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.sm,
  },
  priorityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.md,
  },
  priorityLabel: {
    fontSize: 13,
    color: colors.textMuted,
    fontWeight: fontWeight.medium,
  },
  priorityBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  priorityText: {
    fontSize: 13,
    fontWeight: fontWeight.bold,
    letterSpacing: 0.3,
  },
  imageWrap: {
    borderRadius: radius.lg,
    overflow: 'hidden',
    marginTop: spacing.xs,
  },
  image: {
    width: '100%',
    height: 220,
  },
  notesBox: {
    backgroundColor: colors.background,
    borderRadius: radius.md,
    padding: spacing.base,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: spacing.xs,
  },
  notesText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  spacer: {
    height: spacing.xl,
  },
  actionBar: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.base,
    paddingBottom: spacing.xxl,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  actionBtnHalf: {
    flex: 1,
  },
});
