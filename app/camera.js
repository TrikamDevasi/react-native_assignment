import React, { useState, useRef } from 'react';
import { View, Text, Image, Pressable, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useSurvey } from '../context/SurveyContext';

export default function CameraScreen() {
  const router = useRouter();
  const { setCapturedPhoto } = useSurvey();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [captureTime, setCaptureTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!permission) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>Camera permission is required</Text>
        <Pressable style={styles.permitBtn} onPress={requestPermission}>
          <Text style={styles.permitText}>Grant Permission</Text>
        </Pressable>
      </View>
    );
  }

  async function takePhoto() {
    if (cameraRef.current) {
      setIsLoading(true);
      try {
        const result = await cameraRef.current.takePictureAsync();
        setPhoto(result.uri);
        setCaptureTime(new Date().toLocaleTimeString());
      } catch (e) {
        Alert.alert('Error', 'Failed to take photo');
      }
      setIsLoading(false);
    }
  }

  function retakePhoto() {
    setPhoto(null);
    setCaptureTime(null);
  }

  function deletePhoto() {
    Alert.alert('Delete Photo', 'Are you sure you want to delete this photo?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setPhoto(null);
          setCaptureTime(null);
        },
      },
    ]);
  }

  function usePhoto() {
    setCapturedPhoto(photo);
    router.back();
  }

  if (photo) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: photo }} style={styles.preview} />
        <View style={styles.photoInfo}>
          <Text style={styles.captureTime}>Captured at: {captureTime}</Text>
        </View>
        <View style={styles.actions}>
          <Pressable style={styles.retakeBtn} onPress={retakePhoto}>
            <Text style={styles.retakeText}>Retake Photo</Text>
          </Pressable>
          <Pressable style={styles.deleteBtn} onPress={deletePhoto}>
            <Text style={styles.deleteText}>Delete Photo</Text>
          </Pressable>
        </View>
        <Pressable style={styles.useBtn} onPress={usePhoto}>
          <Text style={styles.useText}>Use This Photo</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing="back">
        <View style={styles.camOverlay}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <Pressable style={styles.captureBtn} onPress={takePhoto}>
              <View style={styles.captureInner} />
            </Pressable>
          )}
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: 20,
  },
  message: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 16,
    textAlign: 'center',
  },
  permitBtn: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  permitText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  camera: {
    flex: 1,
  },
  camOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 60,
  },
  captureBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#fff',
  },
  preview: {
    flex: 1,
    resizeMode: 'contain',
  },
  photoInfo: {
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  captureTime: {
    fontSize: 14,
    color: '#6B7280',
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 12,
    backgroundColor: '#fff',
  },
  retakeBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
  },
  retakeText: {
    color: '#374151',
    fontWeight: '600',
  },
  deleteBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
  },
  deleteText: {
    color: '#EF4444',
    fontWeight: '600',
  },
  useBtn: {
    marginHorizontal: 16,
    marginBottom: 30,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#2563EB',
    alignItems: 'center',
  },
  useText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
