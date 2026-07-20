import React, { useState } from 'react';
import { View, Text, Pressable, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import * as Clipboard from 'expo-clipboard';
import { useRouter } from 'expo-router';
import { MapPin, MoveVertical, MoveHorizontal, Crosshair, ShieldOff, Copy, Navigation } from 'lucide-react-native';
import { useSurvey } from '../context/SurveyContext';
import PrimaryButton from '../components/PrimaryButton';
import SectionTitle from '../components/SectionTitle';
import { colors, spacing, radius, shadow, fontWeight } from '../constants/theme';

export default function LocationScreen() {
  const router = useRouter();
  const { setCurrentLocation } = useSurvey();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(null);

  async function fetchLocation() {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setPermissionGranted(false);
        setLoading(false);
        return;
      }
      setPermissionGranted(true);
      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setLocation(loc);
    } catch (e) {
      Alert.alert('Error', 'Failed to get location. Please try again.');
    }
    setLoading(false);
  }

  async function copyLocation() {
    if (location) {
      const text = `Lat: ${location.coords.latitude.toFixed(6)}, Lng: ${location.coords.longitude.toFixed(6)}`;
      await Clipboard.setStringAsync(text);
      Alert.alert('Copied!', 'Location coordinates copied to clipboard.');
    }
  }

  function useLocation() {
    if (location) {
      setCurrentLocation(location);
      router.back();
    }
  }

  const coordItems = location
    ? [
        {
          Icon: MoveVertical,
          label: 'Latitude',
          value: location.coords.latitude.toFixed(6),
        },
        {
          Icon: MoveHorizontal,
          label: 'Longitude',
          value: location.coords.longitude.toFixed(6),
        },
        {
          Icon: Crosshair,
          label: 'Accuracy',
          value: location.coords.accuracy ? `±${Math.round(location.coords.accuracy)}m` : 'N/A',
        },
      ]
    : [];

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        {!location && !loading && permissionGranted !== false && (
          <View style={styles.emptyCard}>
            <View style={styles.emptyIconWrap}>
              <MapPin size={32} color={colors.primary} strokeWidth={1.5} />
            </View>
            <Text style={styles.emptyTitle}>No Location Captured</Text>
            <Text style={styles.emptyMsg}>
              Tap the button below to fetch your current GPS coordinates.
            </Text>
          </View>
        )}

        {loading && (
          <View style={styles.loadingCard}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Fetching your location...</Text>
            <Text style={styles.loadingSubtext}>This may take a few seconds</Text>
          </View>
        )}

        {permissionGranted === false && !loading && (
          <View style={styles.deniedCard}>
            <View style={styles.deniedIconWrap}>
              <ShieldOff size={32} color={colors.danger} strokeWidth={1.5} />
            </View>
            <Text style={styles.deniedTitle}>Permission Denied</Text>
            <Text style={styles.deniedMsg}>
              Location permission was denied. Please enable it in your device settings.
            </Text>
          </View>
        )}

        {location && !loading && (
          <View style={styles.coordCard}>
            <SectionTitle title="GPS Coordinates" subtitle="Current position detected" />
            {coordItems.map((item, idx) => (
              <View
                key={idx}
                style={[styles.coordRow, idx < coordItems.length - 1 && styles.coordBorder]}
              >
                <View style={styles.coordLeft}>
                  <item.Icon size={16} color={colors.textSecondary} strokeWidth={1.8} />
                  <Text style={styles.coordLabel}>{item.label}</Text>
                </View>
                <Text style={styles.coordValue}>{item.value}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={styles.actions}>
        <PrimaryButton
          title={loading ? 'Fetching...' : location ? 'Refresh Location' : 'Get My Location'}
          onPress={fetchLocation}
          disabled={loading}
          style={styles.actionBtn}
        />
        {location ? (
          <>
            <PrimaryButton
              title="Copy Coordinates"
              onPress={copyLocation}
              variant="ghost"
              style={styles.actionBtn}
            />
            <PrimaryButton
              title="Use This Location"
              onPress={useLocation}
              variant="success"
              style={styles.actionBtn}
            />
          </>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.base,
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
  emptyIconWrap: {
    width: 72,
    height: 72,
    borderRadius: radius.xxl,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.base,
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
    lineHeight: 22,
  },
  loadingCard: {
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    padding: spacing.xxl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.sm,
    gap: spacing.sm,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  loadingSubtext: {
    fontSize: 13,
    color: colors.textMuted,
  },
  deniedCard: {
    backgroundColor: colors.dangerLight,
    borderRadius: radius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.dangerMid,
  },
  deniedIconWrap: {
    width: 72,
    height: 72,
    borderRadius: radius.xxl,
    backgroundColor: colors.dangerMid,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.base,
  },
  deniedTitle: {
    fontSize: 18,
    fontWeight: fontWeight.bold,
    color: colors.danger,
    marginBottom: spacing.sm,
  },
  deniedMsg: {
    fontSize: 14,
    color: colors.danger,
    textAlign: 'center',
    lineHeight: 22,
    opacity: 0.85,
  },
  coordCard: {
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.sm,
  },
  coordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  coordBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  coordLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  coordLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: fontWeight.medium,
  },
  coordValue: {
    fontSize: 14,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    fontVariant: ['tabular-nums'],
  },
  actions: {
    padding: spacing.base,
    paddingBottom: spacing.xxl,
    gap: spacing.md,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  actionBtn: {
    width: '100%',
  },
});
