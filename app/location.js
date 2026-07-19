import React, { useState } from 'react';
import { View, Text, Pressable, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import * as Clipboard from 'expo-clipboard';
import { useRouter } from 'expo-router';
import { useSurvey } from '../context/SurveyContext';

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
        Alert.alert('Permission Denied', 'Location permission is required.');
        setLoading(false);
        return;
      }
      setPermissionGranted(true);
      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setLocation(loc);
    } catch (e) {
      Alert.alert('Error', 'Failed to get location');
    }
    setLoading(false);
  }

  async function copyLocation() {
    if (location) {
      const text = `Lat: ${location.coords.latitude}, Lng: ${location.coords.longitude}`;
      await Clipboard.setStringAsync(text);
      Alert.alert('Copied', 'Location copied to clipboard!');
    }
  }

  function useLocation() {
    if (location) {
      setCurrentLocation(location);
      router.back();
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Current Location</Text>

        {!location && !loading && permissionGranted === null && (
          <Text style={styles.hint}>Tap the button below to fetch your location</Text>
        )}

        {loading && (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#2563EB" />
            <Text style={styles.loadingText}>Fetching location...</Text>
          </View>
        )}

        {location && !loading && (
          <View>
            <View style={styles.coordRow}>
              <Text style={styles.coordLabel}>Latitude</Text>
              <Text style={styles.coordValue}>{location.coords.latitude}</Text>
            </View>
            <View style={styles.coordRow}>
              <Text style={styles.coordLabel}>Longitude</Text>
              <Text style={styles.coordValue}>{location.coords.longitude}</Text>
            </View>
            <View style={styles.coordRow}>
              <Text style={styles.coordLabel}>Accuracy</Text>
              <Text style={styles.coordValue}>
                {location.coords.accuracy
                  ? `${Math.round(location.coords.accuracy)}m`
                  : 'N/A'}
              </Text>
            </View>
          </View>
        )}

        {permissionGranted === false && (
          <Text style={styles.denied}>Location permission was denied</Text>
        )}
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.refreshBtn} onPress={fetchLocation} disabled={loading}>
          <Text style={styles.refreshText}>
            {loading ? 'Loading...' : 'Refresh Location'}
          </Text>
        </Pressable>

        {location && (
          <>
            <Pressable style={styles.copyBtn} onPress={copyLocation}>
              <Text style={styles.copyText}>Copy Current Location</Text>
            </Pressable>
            <Pressable style={styles.useBtn} onPress={useLocation}>
              <Text style={styles.useText}>Use This Location</Text>
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  hint: {
    color: '#9CA3AF',
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 20,
  },
  center: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    marginTop: 10,
    color: '#6B7280',
  },
  coordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  coordLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  coordValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  denied: {
    color: '#EF4444',
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 20,
  },
  actions: {
    marginTop: 20,
    gap: 12,
  },
  refreshBtn: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  refreshText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  copyBtn: {
    backgroundColor: '#EFF6FF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  copyText: {
    color: '#2563EB',
    fontSize: 15,
    fontWeight: '600',
  },
  useBtn: {
    backgroundColor: '#059669',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  useText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
