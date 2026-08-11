import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Share } from 'react-native';
import * as Location from 'expo-location';

export default function EmergencyScreen() {
  const [loading, setLoading] = useState(false);

  const handleSOS = async () => {
    setLoading(true);
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (!permission.granted) {
        Alert.alert("Permission Denied", "Location permission is required for SOS.");
        setLoading(false);
        return;
      }
      
      const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      const { latitude, longitude } = location.coords;
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      
      const message = `EMERGENCY SOS!\nI need help. My current location is:\nLatitude: ${latitude}\nLongitude: ${longitude}\nGoogle Maps: ${mapsUrl}`;
      
      await Share.share({ message });
    } catch (e) {
      Alert.alert("Error", "Could not fetch location.");
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency SOS</Text>
      <Text style={styles.subtitle}>Tap the button below to quickly share your location.</Text>
      
      <TouchableOpacity 
        style={[styles.sosButton, loading && styles.sosButtonDisabled]} 
        onPress={handleSOS} 
        disabled={loading}
      >
        <Text style={styles.sosText}>{loading ? "Fetching..." : "SOS"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffebeb',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 40,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  sosButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#d32f2f',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  sosButtonDisabled: {
    backgroundColor: '#ef9a9a',
  },
  sosText: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
  }
});
