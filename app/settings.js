import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Camera, Users, MapPin, ClipboardList } from 'lucide-react-native';
import SectionTitle from '../components/SectionTitle';
import InfoRow from '../components/InfoRow';
import { colors, spacing, radius, shadow, fontWeight } from '../constants/theme';

export default function Settings() {
  const permissions = [
    { Icon: Camera, label: 'Camera', desc: 'Take survey photos', status: 'Used' },
    { Icon: Users, label: 'Contacts', desc: 'Select client contacts', status: 'Used' },
    { Icon: MapPin, label: 'Location', desc: 'Capture GPS coordinates', status: 'Used' },
    { Icon: ClipboardList, label: 'Clipboard', desc: 'Copy and paste data', status: 'Used' },
  ];

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.brandCard}>
        <View style={styles.brandBadge}>
          <Text style={styles.brandBadgeText}>SFS</Text>
        </View>
        <View>
          <Text style={styles.brandName}>Smart Field Survey</Text>
          <Text style={styles.brandVersion}>Version 1.0.0</Text>
        </View>
      </View>

      <View style={styles.card}>
        <SectionTitle title="App Information" />
        <InfoRow label="App Name" value="Smart Field Survey" />
        <InfoRow label="Version" value="1.0.0" />
        <InfoRow label="Developer" value="Trika Aditya" />
        <InfoRow label="Platform" value="Expo / React Native" last />
      </View>

      <View style={styles.card}>
        <SectionTitle title="Permissions" subtitle="Required to use all features" />
        {permissions.map((p, idx) => (
          <View
            key={idx}
            style={[styles.permRow, idx < permissions.length - 1 && styles.permBorder]}
          >
            <View style={styles.permLeft}>
              <View style={styles.permIconWrap}>
                <p.Icon size={18} color={colors.primary} strokeWidth={1.8} />
              </View>
              <View>
                <Text style={styles.permLabel}>{p.label}</Text>
                <Text style={styles.permDesc}>{p.desc}</Text>
              </View>
            </View>
            <View style={styles.permBadge}>
              <View style={styles.permDot} />
              <Text style={styles.permStatus}>{p.status}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <SectionTitle title="About" />
        <Text style={styles.aboutText}>
          Smart Field Survey {'&'} Inspection App is built for field workers to conduct site
          surveys, capture photos, record locations, and manage client information efficiently
          — all from one mobile platform.
        </Text>
        <View style={styles.aboutDivider} />
        <Text style={styles.aboutCredit}>
          Built with React Native {'&'} Expo by Trika Aditya{'\n'}
          Computer Science · University of Indonesia
        </Text>
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
  brandCard: {
    backgroundColor: colors.primary,
    borderRadius: radius.xl,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
    ...shadow.primary,
  },
  brandBadge: {
    width: 52,
    height: 52,
    borderRadius: radius.lg,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandBadgeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: fontWeight.extrabold,
    letterSpacing: 1,
  },
  brandName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: fontWeight.bold,
    letterSpacing: -0.3,
  },
  brandVersion: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontWeight: fontWeight.medium,
    marginTop: 2,
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
  permRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  permBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  permLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  permIconWrap: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  permLabel: {
    fontSize: 14,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
  },
  permDesc: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 1,
  },
  permBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.successLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  permDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
  },
  permStatus: {
    fontSize: 11,
    fontWeight: fontWeight.semibold,
    color: colors.success,
  },
  aboutText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
    marginTop: spacing.xs,
  },
  aboutDivider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: spacing.base,
  },
  aboutCredit: {
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 20,
    textAlign: 'center',
    fontWeight: fontWeight.medium,
  },
});
