import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Camera, Users, MapPin, ClipboardList, Calendar, CheckCircle2 } from 'lucide-react-native';
import PrimaryButton from '../../components/PrimaryButton';
import SectionTitle from '../../components/SectionTitle';
import { useSurvey } from '../../context/SurveyContext';
import { colors, spacing, radius, shadow, fontWeight } from '../../constants/theme';

export default function NewSurvey() {
  const router = useRouter();
  const { currentSurvey, setCurrentSurvey, capturedPhoto, selectedContact, currentLocation, pastedNotes } = useSurvey();

  const [siteName, setSiteName] = useState(currentSurvey?.siteName || '');
  const [clientName, setClientName] = useState(currentSurvey?.clientName || '');
  const [description, setDescription] = useState(currentSurvey?.description || '');
  const [priority, setPriority] = useState(currentSurvey?.priority || 'Medium');

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const priorities = [
    { label: 'Low', color: colors.success },
    { label: 'Medium', color: colors.warning },
    { label: 'High', color: colors.danger },
  ];

  const attachedItems = [
    { Icon: Camera, label: 'Photo', addLabel: 'Add Photo', done: !!capturedPhoto, route: '/camera' },
    { Icon: Users, label: selectedContact ? selectedContact.name : 'Contact', addLabel: 'Select Contact', done: !!selectedContact, route: '/contacts' },
    { Icon: MapPin, label: 'Location', addLabel: 'Add Location', done: !!currentLocation, route: '/location' },
    { Icon: ClipboardList, label: 'Notes', addLabel: 'Add Notes', done: !!pastedNotes, route: '/clipboard' },
  ];

  function handleSubmit() {
    if (!siteName.trim()) {
      Alert.alert('Required', 'Please enter a Site Name');
      return;
    }
    if (!clientName.trim()) {
      Alert.alert('Required', 'Please enter a Client Name');
      return;
    }
    if (!description.trim()) {
      Alert.alert('Required', 'Please enter a Description');
      return;
    }

    const surveyData = {
      siteName: siteName.trim(),
      clientName: clientName.trim(),
      description: description.trim(),
      priority,
      date: dateStr,
      photo: capturedPhoto,
      contact: selectedContact,
      location: currentLocation,
      notes: pastedNotes,
    };

    setCurrentSurvey(surveyData);
    router.push('/survey-preview');
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.card}>
        <SectionTitle title="Survey Details" />

        <Text style={styles.fieldLabel}>Site Name</Text>
        <TextInput
          style={styles.input}
          value={siteName}
          onChangeText={setSiteName}
          placeholder="e.g. North Block Site A"
          placeholderTextColor={colors.textMuted}
          returnKeyType="next"
        />

        <Text style={styles.fieldLabel}>Client Name</Text>
        <TextInput
          style={styles.input}
          value={clientName}
          onChangeText={setClientName}
          placeholder="e.g. PT. Indofood Corp"
          placeholderTextColor={colors.textMuted}
          returnKeyType="next"
        />

        <Text style={styles.fieldLabel}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Describe the survey purpose and scope..."
          placeholderTextColor={colors.textMuted}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      <View style={styles.card}>
        <SectionTitle title="Priority Level" />
        <View style={styles.priorityRow}>
          {priorities.map(p => {
            const isActive = priority === p.label;
            return (
              <Pressable
                key={p.label}
                style={[
                  styles.priorityBtn,
                  isActive && { backgroundColor: p.color, borderColor: p.color },
                ]}
                onPress={() => setPriority(p.label)}
              >
                <Text style={[styles.priorityText, isActive && styles.priorityTextActive]}>
                  {p.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.card}>
        <SectionTitle title="Survey Date" />
        <View style={styles.dateRow}>
          <Calendar size={16} color={colors.textSecondary} strokeWidth={1.8} style={styles.dateIcon} />
          <Text style={styles.dateText}>{dateStr}</Text>
          <View style={styles.dateBadge}>
            <Text style={styles.dateBadgeText}>Auto</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <SectionTitle title="Attached Data" subtitle="Tap any item to add or change" />
        <View style={styles.attachGrid}>
          {attachedItems.map((item, idx) => (
            <Pressable
              key={idx}
              style={[styles.attachItem, item.done && styles.attachItemDone]}
              onPress={() => router.push(item.route)}
            >
              <item.Icon
                size={16}
                color={item.done ? colors.success : colors.textMuted}
                strokeWidth={1.8}
              />
              <Text
                style={[styles.attachLabel, item.done && styles.attachLabelDone]}
                numberOfLines={1}
              >
                {item.done ? item.label : item.addLabel}
              </Text>
              {item.done ? (
                <CheckCircle2 size={14} color={colors.success} strokeWidth={2} />
              ) : null}
            </Pressable>
          ))}
        </View>
      </View>

      <PrimaryButton title="Preview Survey" onPress={handleSubmit} style={styles.submitBtn} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.base,
    paddingBottom: 48,
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
  fieldLabel: {
    fontSize: 12,
    fontWeight: fontWeight.semibold,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: radius.md,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    fontSize: 15,
    color: colors.textPrimary,
    borderWidth: 1.5,
    borderColor: colors.border,
    fontWeight: fontWeight.regular,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
    lineHeight: 22,
  },
  priorityRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  priorityBtn: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.background,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  priorityText: {
    fontSize: 13,
    fontWeight: fontWeight.semibold,
    color: colors.textSecondary,
  },
  priorityTextActive: {
    color: '#fff',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: radius.md,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: spacing.xs,
    gap: spacing.sm,
  },
  dateIcon: {
    marginRight: spacing.xs,
  },
  dateText: {
    flex: 1,
    fontSize: 14,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
  },
  dateBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  dateBadgeText: {
    fontSize: 10,
    fontWeight: fontWeight.bold,
    color: colors.primary,
    letterSpacing: 0.5,
  },
  attachGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  attachItem: {
    width: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  attachItemDone: {
    borderColor: colors.success,
    backgroundColor: colors.successLight,
  },
  attachLabel: {
    flex: 1,
    fontSize: 12,
    fontWeight: fontWeight.medium,
    color: colors.textSecondary,
  },
  attachLabelDone: {
    color: colors.success,
    fontWeight: fontWeight.semibold,
  },
  submitBtn: {
    marginTop: spacing.sm,
  },
});
