import React, { useEffect, useState } from "react";
import {
  View, Text, Button, TextInput, Alert, StyleSheet, ScrollView, Share, Linking, Platform
} from "react-native";
import * as Location from "expo-location";
import MapComponent from "../../components/MapComponent";

export default function LocationScreen() {
  const [location, setLocation] = useState(null);
  const [lastLocation, setLastLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [search, setSearch] = useState("");
  const [heading, setHeading] = useState(null);
  const [tracking, setTracking] = useState(false);
  const [distance, setDistance] = useState(null);
  const [recentLocations, setRecentLocations] = useState([]);

  const [region, setRegion] = useState({
    latitude: 23.0225, longitude: 72.5714, latitudeDelta: 0.05, longitudeDelta: 0.05,
  });

  const [watcher, setWatcher] = useState(null);

  // Haversine formula to calculate distance between two lat/lngs in km
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(2);
  };

  const handleGetLocation = async () => {
    const permission = await Location.requestForegroundPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission Denied");
      return;
    }
    const currentLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
    if (currentLocation) {
      setLocation(currentLocation);
      setRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });

      // Add to recent locations
      setRecentLocations(prev => {
        const newLocs = [{ lat: currentLocation.coords.latitude, lon: currentLocation.coords.longitude, timestamp: Date.now() }, ...prev];
        return newLocs.slice(0, 5); // keep last 5
      });

      if (Platform.OS === "web") {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${currentLocation.coords.latitude}&lon=${currentLocation.coords.longitude}&format=json`,
            { headers: { "User-Agent": "TravelGuardianApp/1.0" } }
          );
          const data = await res.json();
          if (data?.address) {
            setAddress({
              city: data.address.city || data.address.town || data.address.village || "",
              region: data.address.state || "",
              country: data.address.country || "",
              postalCode: data.address.postcode || "",
              street: data.address.road || "",
              district: data.address.suburb || data.address.county || "",
            });
          }
        } catch (e) {}
      } else {
        const reverseGeoCoding = await Location.reverseGeocodeAsync({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });
        if (reverseGeoCoding.length > 0) setAddress(reverseGeoCoding[0]);
      }
    }
  };

  const handleLastLocation = async () => {
    const result = await Location.getLastKnownPositionAsync();
    if (result) setLastLocation(result);
    else Alert.alert("No Last Known Location Found");
  };

  const handleSearch = async () => {
    if (search.trim() === "") {
      Alert.alert("Enter Place Name");
      return;
    }
    let targetLat, targetLon;

    if (Platform.OS === "web") {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(search)}&format=json&limit=1`,
          { headers: { "User-Agent": "TravelGuardianApp/1.0" } }
        );
        const data = await res.json();
        if (data.length > 0) {
          targetLat = parseFloat(data[0].lat);
          targetLon = parseFloat(data[0].lon);
        } else {
          Alert.alert("Place Not Found");
          return;
        }
      } catch (e) {
        Alert.alert("Search Failed", e.message);
        return;
      }
    } else {
      const result = await Location.geocodeAsync(search);
      if (result.length > 0) {
        targetLat = result[0].latitude;
        targetLon = result[0].longitude;
      } else {
        Alert.alert("Place Not Found");
        return;
      }
    }

    setRegion({
      latitude: targetLat,
      longitude: targetLon,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });

    if (location) {
      const dist = calculateDistance(location.coords.latitude, location.coords.longitude, targetLat, targetLon);
      setDistance(dist);
    }
  };

  const handleStartTracking = async () => {
    const permission = await Location.requestForegroundPermissionsAsync();
    if (!permission.granted) return Alert.alert("Permission Denied");
    const subscription = await Location.watchPositionAsync(
      { accuracy: Location.Accuracy.High, distanceInterval: 10 },
      (newLocation) => {
        setLocation(newLocation);
        setRegion({
          latitude: newLocation.coords.latitude,
          longitude: newLocation.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
      }
    );
    setWatcher(subscription);
    setTracking(true);
  };

  const handleStopTracking = () => {
    if (watcher) watcher.remove();
    setWatcher(null);
    setTracking(false);
  };

  const handleHeading = async () => {
    const result = await Location.getHeadingAsync();
    setHeading(result.magHeading);
  };

  const handleShare = async () => {
    if (!location) return Alert.alert("Get Location First");
    await Share.share({ message: `My Location:\nLatitude: ${location.coords.latitude}\nLongitude: ${location.coords.longitude}` });
  };

  const handleOpenMaps = () => {
    if (!location) return Alert.alert("Get Location First");
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${location.coords.latitude},${location.coords.longitude}`);
  };

  useEffect(() => {
    return () => { if (watcher) watcher.remove(); };
  }, [watcher]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Location Dashboard</Text>
      
      <TextInput style={styles.input} placeholder="Search Place..." value={search} onChangeText={setSearch} />
      <Button title="Search Place" onPress={handleSearch} />
      {distance && <Text style={styles.distanceText}>Distance from current: {distance} km</Text>}

      <MapComponent style={styles.map} region={region} markerTitle={search || "Location"} />

      <Button title="Get Current Location" onPress={handleGetLocation} />
      <Button title="Get Last Known Location" onPress={handleLastLocation} />
      
      {!tracking ? <Button title="Start Live Tracking" onPress={handleStartTracking} /> : <Button title="Stop Live Tracking" onPress={handleStopTracking} />}
      <Button title="Get Compass Heading" onPress={handleHeading} />
      <Button title="Share Coordinates" onPress={handleShare} />
      <Button title="Open Google Maps" onPress={handleOpenMaps} />

      {location && (
        <View style={styles.details}>
          <Text style={styles.heading}>Current Location</Text>
          <Text>Lat: {location.coords.latitude} / Lon: {location.coords.longitude}</Text>
          <Text>Accuracy: {location.coords.accuracy}</Text>
        </View>
      )}

      {recentLocations.length > 0 && (
        <View style={styles.details}>
          <Text style={styles.heading}>Recent Locations (History)</Text>
          {recentLocations.map((loc, i) => (
            <Text key={i} style={styles.historyText}>• {loc.lat.toFixed(4)}, {loc.lon.toFixed(4)}</Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "white" },
  title: { fontSize: 25, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "gray", padding: 10, borderRadius: 10, marginBottom: 10 },
  distanceText: { textAlign: 'center', marginVertical: 5, color: '#d32f2f', fontWeight: 'bold' },
  map: { width: "100%", height: 300, marginVertical: 15 },
  details: { borderWidth: 1, borderColor: "gray", borderRadius: 10, padding: 15, marginTop: 15 },
  heading: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  historyText: { color: '#555', marginBottom: 2 }
});