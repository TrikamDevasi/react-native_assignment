import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import SectionTitle from '../../components/SectionTitle';
import InfoRow from '../../components/InfoRow';
import { useSurvey } from '../../context/SurveyContext';
import { colors, spacing, radius, shadow, fontWeight } from '../../constants/theme';

export default function Profile() {
  const { surveys } = useSurvey();

  const details = {
    name: 'Trikam Devasi',
    university: 'University of Indonesia',
    semester: 'Semester 6',
    major: 'Computer Science',
    role: 'Field Inspector',
    skills: ['React Native', 'JavaScript', 'UI/UX Design', 'Mobile Development', 'Data Analysis'],
  };

  const skillColors = [
    colors.primary, colors.purple, colors.success,
    colors.warning, colors.teal,
  ];

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.heroCard}>
        <View style={styles.heroDecor} />
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>TD</Text>
        </View>
        <Text style={styles.name}>{details.name}</Text>
        <Text style={styles.role}>{details.role}</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{surveys.length}</Text>
            <Text style={styles.statLabel}>Surveys</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>6</Text>
            <Text style={styles.statLabel}>Semester</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Skills</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <SectionTitle title="Education" />
        <InfoRow label="University" value={details.university} />
        <InfoRow label="Major" value={details.major} />
        <InfoRow label="Semester" value={details.semester} last />
      </View>

      <View style={styles.card}>
        <SectionTitle title="Skills" />
        <View style={styles.skillsWrap}>
          {details.skills.map((skill, index) => (
            <View
              key={index}
              style={[
                styles.skillChip,
                { backgroundColor: skillColors[index % skillColors.length] + '18' },
              ]}
            >
              <Text
                style={[
                  styles.skillText,
                  { color: skillColors[index % skillColors.length] },
                ]}
              >
                {skill}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <SectionTitle title="About" />
        <Text style={styles.aboutText}>
          Field inspector with a focus on mobile survey applications and data-driven
          site inspection workflows. Currently studying Computer Science at University of Indonesia.
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
    paddingHorizontal: spacing.base,
    paddingTop: spacing.base,
    paddingBottom: 48,
  },
  heroCard: {
    backgroundColor: colors.primary,
    borderRadius: radius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.md,
    overflow: 'hidden',
    position: 'relative',
    ...shadow.primary,
  },
  heroDecor: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.05)',
    top: -60,
    right: -40,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: radius.full,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  avatarText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: fontWeight.extrabold,
  },
  name: {
    color: '#fff',
    fontSize: 22,
    fontWeight: fontWeight.extrabold,
    letterSpacing: -0.4,
    marginBottom: 4,
  },
  role: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 13,
    fontWeight: fontWeight.medium,
    marginBottom: spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    width: '100%',
    justifyContent: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: '#fff',
    fontSize: 22,
    fontWeight: fontWeight.extrabold,
  },
  statLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11,
    fontWeight: fontWeight.medium,
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: spacing.md,
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
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  skillChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
  },
  skillText: {
    fontSize: 13,
    fontWeight: fontWeight.semibold,
  },
  aboutText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
    marginTop: spacing.xs,
  },
});
