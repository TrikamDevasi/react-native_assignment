import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, ScrollView, StyleSheet } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Hash, Phone, MapPin, ChevronRight } from 'lucide-react-native';
import { useSurvey } from '../context/SurveyContext';
import SectionTitle from '../components/SectionTitle';
import PrimaryButton from '../components/PrimaryButton';
import { colors, spacing, radius, shadow, fontWeight } from '../constants/theme';

export default function ClipboardScreen() {
  const { surveys, currentLocation, selectedContact, setPastedNotes, pastedNotes } = useSurvey();
  const [pasteArea, setPasteArea] = useState(pastedNotes || '');

  async function copySurveyId() {
    if (surveys.length === 0) {
      Alert.alert('No Surveys', 'Create a survey first to copy its ID.');
      return;
    }
    const id = surveys[0].id;
    await Clipboard.setStringAsync(id);
    Alert.alert('Copied!', 'Survey ID copied to clipboard.');
  }

  async function copyContactNumber() {
    if (!selectedContact) {
      Alert.alert('No Contact', 'Please select a contact first from the Contacts screen.');
      return;
    }
    const phones = selectedContact.phones;
    if (phones && phones.length > 0) {
      await Clipboard.setStringAsync(phones[0].number);
      Alert.alert('Copied!', 'Contact number copied to clipboard.');
    } else {
      Alert.alert('No Number', 'The selected contact has no phone number.');
    }
  }

  async function copyCoordinates() {
    if (!currentLocation) {
      Alert.alert('No Location', 'Please capture a location first from the Location screen.');
      return;
    }
    const text = `Lat: ${currentLocation.coords.latitude.toFixed(6)}, Lng: ${currentLocation.coords.longitude.toFixed(6)}`;
    await Clipboard.setStringAsync(text);
    Alert.alert('Copied!', 'Location coordinates copied to clipboard.');
  }

  async function pasteText() {
    const text = await Clipboard.getStringAsync();
    setPasteArea(text || '');
  }

  function saveNotes() {
    setPastedNotes(pasteArea);
    Alert.alert('Saved!', 'Notes have been saved to your survey data.');
  }

  async function clearClipboard() {
    Alert.alert('Clear Clipboard', 'Clear all clipboard data and notes?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: async () => {
          await Clipboard.setStringAsync('');
          setPasteArea('');
          Alert.alert('Cleared', 'Clipboard and notes have been cleared.');
        },
      },
    ]);
  }

  const copyTools = [
    {
      Icon: Hash,
      label: 'Copy Survey ID',
      sublabel: surveys.length > 0 ? `ID: ${surveys[0].id.slice(0, 8)}...` : 'No surveys yet',
      onPress: copySurveyId,
      enabled: surveys.length > 0,
    },
    {
      Icon: Phone,
      label: 'Copy Contact Number',
      sublabel: selectedContact ? selectedContact.name : 'No contact selected',
      onPress: copyContactNumber,
      enabled: !!selectedContact,
    },
    {
      Icon: MapPin,
      label: 'Copy Coordinates',
      sublabel: currentLocation ? 'Location ready' : 'No location captured',
      onPress: copyCoordinates,
      enabled: !!currentLocation,
    },
  ];

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.card}>
        <SectionTitle title="Copy Tools" subtitle="Copy data to your clipboard" />
        {copyTools.map((tool, idx) => (
          <Pressable
            key={idx}
            style={[styles.copyItem, !tool.enabled && styles.copyItemDisabled]}
            onPress={tool.onPress}
          >
            <View style={[styles.copyIconWrap, tool.enabled && styles.copyIconWrapActive]}>
              <tool.Icon
                size={18}
                color={tool.enabled ? colors.primary : colors.textMuted}
                strokeWidth={1.8}
              />
            </View>
            <View style={styles.copyInfo}>
              <Text style={[styles.copyLabel, !tool.enabled && styles.copyLabelDisabled]}>
                {tool.label}
              </Text>
              <Text style={styles.copySublabel} numberOfLines={1}>{tool.sublabel}</Text>
            </View>
            {tool.enabled ? (
              <View style={styles.copyArrow}>
                <ChevronRight size={16} color={colors.primary} strokeWidth={2.5} />
              </View>
            ) : null}
          </Pressable>
        ))}
      </View>

      <View style={styles.card}>
        <SectionTitle title="Paste Notes" subtitle="Paste content from clipboard to save in your survey" />
        <TextInput
          style={styles.textArea}
          value={pasteArea}
          onChangeText={setPasteArea}
          placeholder="Paste or type notes here..."
          placeholderTextColor={colors.textMuted}
          multiline
          numberOfLines={5}
          textAlignVertical="top"
        />
        <View style={styles.notesActions}>
          <PrimaryButton
            title="Paste from Clipboard"
            onPress={pasteText}
            variant="ghost"
            style={styles.noteBtn}
          />
          <PrimaryButton
            title="Save Notes"
            onPress={saveNotes}
            variant="success"
            style={styles.noteBtn}
          />
        </View>
      </View>

      <View style={styles.dangerCard}>
        <SectionTitle title="Danger Zone" />
        <PrimaryButton
          title="Clear Clipboard & Notes"
          onPress={clearClipboard}
          variant="danger"
        />
      </View>
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
  dangerCard: {
    backgroundColor: colors.dangerLight,
    borderRadius: radius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.dangerMid,
  },
  copyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  copyItemDisabled: {
    opacity: 0.55,
  },
  copyIconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyIconWrapActive: {
    backgroundColor: colors.primaryLight,
  },
  copyInfo: {
    flex: 1,
  },
  copyLabel: {
    fontSize: 14,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  copyLabelDisabled: {
    color: colors.textMuted,
  },
  copySublabel: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: fontWeight.regular,
  },
  copyArrow: {
    width: 28,
    height: 28,
    borderRadius: radius.full,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textArea: {
    backgroundColor: colors.background,
    borderRadius: radius.md,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    fontSize: 14,
    color: colors.textPrimary,
    borderWidth: 1.5,
    borderColor: colors.border,
    minHeight: 130,
    textAlignVertical: 'top',
    lineHeight: 22,
    marginBottom: spacing.md,
    fontWeight: fontWeight.regular,
  },
  notesActions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  noteBtn: {
    flex: 1,
  },
});
