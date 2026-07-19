import React, { useState, useRef } from 'react';
import { View, Text, Image, Pressable, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useSurvey } from '../context/SurveyContext';
import { colors, spacing, radius, shadow, fontWeight } from '../constants/theme';

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
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Checking permissions...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <View style={styles.permCard}>
          <View style={styles.permIconWrap}>
            <Text style={styles.permIcon}>📷</Text>
          </View>
          <Text style={styles.permTitle}>Camera Access Required</Text>
          <Text style={styles.permMessage}>
            Please allow camera access to capture photos for your field surveys.
          </Text>
          <Pressable style={styles.grantBtn} onPress={requestPermission}>
            <Text style={styles.grantBtnText}>Grant Camera Access</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  async function takePhoto() {
    if (cameraRef.current) {
      setIsLoading(true);
      try {
        const result = await cameraRef.current.takePictureAsync();
        setPhoto(result.uri);
        setCaptureTime(new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }));
      } catch (e) {
        Alert.alert('Error', 'Failed to take photo. Please try again.');
      }
      setIsLoading(false);
    }
  }

  function retakePhoto() {
    setPhoto(null);
    setCaptureTime(null);
  }

  function deletePhoto() {
    Alert.alert('Delete Photo', 'Remove this photo from your survey?', [
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
      <View style={styles.previewScreen}>
        <Image source={{ uri: photo }} style={styles.previewImage} resizeMode="cover" />
        <View style={styles.previewBottom}>
          {captureTime ? (
            <View style={styles.captureTimePill}>
              <Text style={styles.captureTimeText}>📸 Captured at {captureTime}</Text>
            </View>
          ) : null}
          <View style={styles.actionRow}>
            <Pressable style={styles.retakeBtn} onPress={retakePhoto}>
              <Text style={styles.retakeBtnText}>Retake</Text>
            </Pressable>
            <Pressable style={styles.deleteBtn} onPress={deletePhoto}>
              <Text style={styles.deleteBtnText}>Delete</Text>
            </Pressable>
          </View>
          <Pressable style={styles.useBtn} onPress={usePhoto}>
            <Text style={styles.useBtnText}>Use This Photo →</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.cameraScreen}>
      <CameraView ref={cameraRef} style={styles.camera} facing="back">
        <View style={styles.cameraOverlay}>
          <View style={styles.viewfinder} />
          {isLoading ? (
            <View style={styles.captureArea}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          ) : (
            <View style={styles.captureArea}>
              <Pressable style={styles.captureBtn} onPress={takePhoto}>
                <View style={styles.captureInner} />
              </Pressable>
              <Text style={styles.captureHint}>Tap to capture</Text>
            </View>
          )}
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: spacing.xl,
  },
  loadingText: {
    marginTop: spacing.md,
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: fontWeight.medium,
  },
  permCard: {
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.md,
  },
  permIconWrap: {
    width: 80,
    height: 80,
    borderRadius: radius.xxl,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  permIcon: {
    fontSize: 36,
  },
  permTitle: {
    fontSize: 18,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  permMessage: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.xl,
  },
  grantBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radius.full,
    width: '100%',
    alignItems: 'center',
    ...shadow.primary,
  },
  grantBtnText: {
    color: '#fff',
    fontWeight: fontWeight.semibold,
    fontSize: 15,
  },
  cameraScreen: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  viewfinder: {
    width: 240,
    height: 240,
    borderRadius: radius.xl,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
    marginTop: spacing.xxl,
  },
  captureArea: {
    alignItems: 'center',
    paddingBottom: spacing.xl,
  },
  captureBtn: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 4,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  captureInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  captureHint: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
    fontWeight: fontWeight.medium,
  },
  previewScreen: {
    flex: 1,
    backgroundColor: '#000',
  },
  previewImage: {
    flex: 1,
  },
  previewBottom: {
    backgroundColor: colors.card,
    paddingTop: spacing.base,
    paddingHorizontal: spacing.base,
    paddingBottom: spacing.xxl,
    gap: spacing.md,
  },
  captureTimePill: {
    backgroundColor: colors.background,
    borderRadius: radius.full,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  captureTimeText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: fontWeight.medium,
  },
  actionRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  retakeBtn: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.background,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  retakeBtnText: {
    color: colors.textPrimary,
    fontWeight: fontWeight.semibold,
    fontSize: 14,
  },
  deleteBtn: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.dangerLight,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.dangerMid,
  },
  deleteBtnText: {
    color: colors.danger,
    fontWeight: fontWeight.semibold,
    fontSize: 14,
  },
  useBtn: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.base,
    borderRadius: radius.lg,
    alignItems: 'center',
    ...shadow.primary,
  },
  useBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: fontWeight.semibold,
  },
});
