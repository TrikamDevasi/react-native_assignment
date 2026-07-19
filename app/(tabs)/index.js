import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import AppHeader from '../../components/AppHeader';
import SectionTitle from '../../components/SectionTitle';
import StatCard from '../../components/StatCard';
import QuickActionCard from '../../components/QuickActionCard';
import SurveyCard from '../../components/SurveyCard';
import EmptyState from '../../components/EmptyState';
import { useSurvey } from '../../context/SurveyContext';
import { colors, spacing, radius, shadow, fontWeight } from '../../constants/theme';

export default function Dashboard() {
  const router = useRouter();
  const { surveys, getTodaysCount } = useSurvey();
  const todayCount = getTodaysCount();
  const totalCount = surveys.length;
  const recentSurveys = surveys.slice(0, 3);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  function handleViewSurvey(survey) {
    router.push({ pathname: '/survey-preview', params: { id: survey.id } });
  }

  return (
    <View style={styles.screen}>
      <AppHeader
        title="Smart Field Survey"
        subtitle="Field Inspection Platform"
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <View style={styles.heroDecor1} />
          <View style={styles.heroDecor2} />
          <View style={styles.heroLeft}>
            <Text style={styles.heroGreeting}>Good day 👋</Text>
            <Text style={styles.heroName}>Trika Aditya</Text>
            <Text style={styles.heroRole}>Computer Science · Semester 6</Text>
          </View>
          <View style={styles.heroDateBadge}>
            <Text style={styles.heroDateDay}>
              {new Date().getDate()}
            </Text>
            <Text style={styles.heroDateMonth}>
              {new Date().toLocaleDateString('en-US', { month: 'short' })}
            </Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <StatCard
            icon="📊"
            value={todayCount}
            label="Today"
            color={colors.primary}
          />
          <StatCard
            icon="✅"
            value={totalCount}
            label="Total"
            color={colors.success}
          />
          <StatCard
            icon="⏳"
            value="0"
            label="Pending"
            color={colors.warning}
          />
        </View>

        <SectionTitle title="Quick Actions" />
        <View style={styles.actionsGrid}>
          <QuickActionCard
            title="New Survey"
            icon="📝"
            color={colors.primary}
            onPress={() => router.push('/(tabs)/new-survey')}
          />
          <QuickActionCard
            title="Camera"
            icon="📷"
            color={colors.purple}
            onPress={() => router.push('/camera')}
          />
          <QuickActionCard
            title="Location"
            icon="📍"
            color={colors.success}
            onPress={() => router.push('/location')}
          />
          <QuickActionCard
            title="Contacts"
            icon="👤"
            color={colors.orange}
            onPress={() => router.push('/contacts')}
          />
        </View>

        <SectionTitle
          title="Recent Surveys"
          rightText={surveys.length > 3 ? 'View All' : null}
          onRightPress={() => router.push('/(tabs)/history')}
        />

        {recentSurveys.length === 0 ? (
          <EmptyState
            icon="📋"
            title="No surveys yet"
            message="Create your first field survey to see it here."
            actionLabel="Start New Survey"
            onAction={() => router.push('/(tabs)/new-survey')}
          />
        ) : (
          recentSurveys.map(survey => (
            <SurveyCard
              key={survey.id}
              survey={survey}
              onPress={handleViewSurvey}
            />
          ))
        )}
      </ScrollView>
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
    paddingHorizontal: spacing.base,
    paddingTop: spacing.base,
    paddingBottom: 40,
  },
  heroCard: {
    backgroundColor: colors.primary,
    borderRadius: radius.xl,
    padding: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.base,
    overflow: 'hidden',
    position: 'relative',
    ...shadow.primary,
  },
  heroDecor1: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.07)',
    top: -30,
    right: 50,
  },
  heroDecor2: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.05)',
    bottom: -20,
    right: -10,
  },
  heroLeft: {
    flex: 1,
  },
  heroGreeting: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    fontWeight: fontWeight.medium,
    marginBottom: 4,
  },
  heroName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: fontWeight.extrabold,
    letterSpacing: -0.4,
    marginBottom: 4,
  },
  heroRole: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontWeight: fontWeight.medium,
  },
  heroDateBadge: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    marginLeft: spacing.md,
  },
  heroDateDay: {
    color: '#fff',
    fontSize: 28,
    fontWeight: fontWeight.extrabold,
    lineHeight: 32,
  },
  heroDateMonth: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
    fontWeight: fontWeight.semibold,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
    marginHorizontal: -spacing.xs,
  },
  actionsGrid: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
    marginHorizontal: -spacing.xs,
  },
});
