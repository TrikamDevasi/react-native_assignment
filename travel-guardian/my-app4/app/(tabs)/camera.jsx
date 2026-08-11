import React, { useRef, useState, useContext, useEffect } from "react";
import {
  View,
  Button,
  Text,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Animated
} from "react-native";
import { CameraView, useCameraPermissions, useMicrophonePermissions } from "expo-camera";
import { VideoView, useVideoPlayer } from "expo-video";
import * as MediaLibrary from "expo-media-library";
import * as Location from 'expo-location';
import { JournalContext } from "../../context/JournalContext";
import { Ionicons } from '@expo/vector-icons';

export default function CameraScreen() {
  const cameraRef = useRef(null);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [micPermission, requestMicPermission] = useMicrophonePermissions();
  const { addEntry } = useContext(JournalContext) || {};
  
  const [cameraFacing, setCameraFacing] = useState("back");
  const [flash, setFlash] = useState("off");
  const [torch, setTorch] = useState(false);
  const [mode, setMode] = useState("picture");
  const [photo, setPhoto] = useState(null);
  const [video, setVideo] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  
  // Enhancements
  const [showGrid, setShowGrid] = useState(false);
  const [zoom, setZoom] = useState(0);
  const [timer, setTimer] = useState(0);
  const [locationName, setLocationName] = useState("");
  const flashAnim = useRef(new Animated.Value(0)).current;

  const player = useVideoPlayer(video);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      let loc = await Location.getCurrentPositionAsync({});
      let reverseGeo = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude
      });
      if (reverseGeo.length > 0) {
        setLocationName(`${reverseGeo[0].city || reverseGeo[0].subregion}, ${reverseGeo[0].country}`);
      }
    })();
  }, []);

  if (!cameraPermission) return <View />;
  if (!cameraPermission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.title}>Camera Permission Required</Text>
        <Button title="Allow Camera" onPress={requestCameraPermission} />
      </View>
    );
  }

  const triggerFlashAnimation = () => {
    Animated.sequence([
      Animated.timing(flashAnim, { toValue: 1, duration: 50, useNativeDriver: true }),
      Animated.timing(flashAnim, { toValue: 0, duration: 50, useNativeDriver: true })
    ]).start();
  };

  const executeCapture = async () => {
    triggerFlashAnimation();
    const result = await cameraRef.current?.takePictureAsync();
    if (result) {
      setPhoto(result.uri);
      setVideo(null);
      await MediaLibrary.saveToLibraryAsync(result.uri);
      Alert.alert("Success", "Photo saved");

      // Location integration
      try {
        let loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
        let reverseGeo = await Location.reverseGeocodeAsync({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude
        });
        const address = reverseGeo.length > 0 ? reverseGeo[0] : null;
        
        if (addEntry) {
          addEntry({
            photo: result.uri,
            coordinates: loc.coords,
            address: address,
            title: "Captured Photo"
          });
        }
      } catch (e) {
        console.log("Failed to fetch location for journal", e);
      }
    }
  };

  const handleTakePhoto = async () => {
    if (timer > 0) {
      setTimeout(executeCapture, timer * 1000);
    } else {
      executeCapture();
    }
  };

  const handleStartRecording = async () => {
    if (!micPermission?.granted) {
      await requestMicPermission();
      return;
    }
    setIsRecording(true);
    try {
      const result = await cameraRef.current?.recordAsync();
      if (result) {
        setVideo(result.uri);
        setPhoto(null);
        await MediaLibrary.saveToLibraryAsync(result.uri);
        Alert.alert("Success", "Video saved");
      }
    } catch (error) {
      console.log(error);
    }
    setIsRecording(false);
  };

  const handleStopRecording = () => {
    cameraRef.current?.stopRecording();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Travel Guardian Camera</Text>

      <View style={styles.cameraContainer}>
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing={cameraFacing}
          flash={flash}
          enableTorch={torch}
          mode={mode}
          zoom={zoom}
        />
        
        {/* Flash Animation Overlay */}
        <Animated.View style={[styles.flashOverlay, { opacity: flashAnim }]} pointerEvents="none" />
        
        {/* Grid Overlay */}
        {showGrid && (
          <View style={styles.gridOverlay} pointerEvents="none">
            <View style={styles.gridLineHorizontal} />
            <View style={[styles.gridLineHorizontal, { top: '66.6%' }]} />
            <View style={styles.gridLineVertical} />
            <View style={[styles.gridLineVertical, { left: '66.6%' }]} />
          </View>
        )}
        
        {/* Location Watermark */}
        {locationName ? (
          <View style={styles.watermark}>
            <Ionicons name="location" size={16} color="white" />
            <Text style={styles.watermarkText}>{locationName}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.row}>
        <Button title="Photo" onPress={() => setMode("picture")} />
        <Button title="Video" onPress={() => setMode("video")} />
        <Button title={`Grid: ${showGrid ? 'ON' : 'OFF'}`} onPress={() => setShowGrid(!showGrid)} />
        <Button title={`Timer: ${timer}s`} onPress={() => setTimer(timer === 0 ? 3 : timer === 3 ? 10 : 0)} />
      </View>
      <View style={styles.row}>
        <Button title="Switch Camera" onPress={() => setCameraFacing(prev => prev === "back" ? "front" : "back")} />
        <Button title={`Flash: ${flash}`} onPress={() => setFlash(prev => prev === "off" ? "on" : "off")} />
        <Button title={`Torch: ${torch ? "ON" : "OFF"}`} onPress={() => setTorch(prev => !prev)} />
      </View>
      
      {/* Zoom Control */}
      <View style={styles.zoomContainer}>
        <Text>Zoom:</Text>
        <Button title="1x" onPress={() => setZoom(0)} />
        <Button title="2x" onPress={() => setZoom(0.5)} />
        <Button title="Max" onPress={() => setZoom(1)} />
      </View>

      {mode === "picture" && <Button title="Take Photo" onPress={handleTakePhoto} />}
      {mode === "video" && (
        <>
          <Button title="Start Recording" onPress={handleStartRecording} disabled={isRecording} />
          <Button title="Stop Recording" onPress={handleStopRecording} disabled={!isRecording} />
        </>
      )}

      {photo && (
        <View>
          <Text style={styles.resultText}>Captured Photo</Text>
          <Image source={{ uri: photo }} style={styles.image} />
        </View>
      )}
      {video && (
        <View>
          <Text style={styles.resultText}>Recorded Video</Text>
          <VideoView player={player} style={styles.video} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "white" },
  permissionContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  cameraContainer: { width: "100%", height: 350, position: 'relative' },
  camera: { flex: 1 },
  row: { flexDirection: "row", justifyContent: "space-around", marginVertical: 8, flexWrap: 'wrap' },
  zoomContainer: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginVertical: 8, gap: 10 },
  image: { width: "100%", height: 200, marginTop: 10 },
  video: { width: "100%", height: 200, marginTop: 10 },
  resultText: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
  flashOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'white' },
  gridOverlay: { ...StyleSheet.absoluteFillObject },
  gridLineHorizontal: { position: 'absolute', top: '33.3%', left: 0, right: 0, height: 1, backgroundColor: 'rgba(255,255,255,0.5)' },
  gridLineVertical: { position: 'absolute', left: '33.3%', top: 0, bottom: 0, width: 1, backgroundColor: 'rgba(255,255,255,0.5)' },
  watermark: { position: 'absolute', bottom: 10, right: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 5, borderRadius: 5 },
  watermarkText: { color: 'white', marginLeft: 5, fontSize: 12 }
});