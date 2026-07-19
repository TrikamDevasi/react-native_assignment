import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { SurveyProvider } from '../context/SurveyContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius, fontWeight } from '../constants/theme';

function CustomDrawerContent() {
  const items = [
    { label: 'Dashboard', emoji: '📊' },
    { label: 'Camera', emoji: '📷' },
    { label: 'Contacts', emoji: '👤' },
    { label: 'Location', emoji: '📍' },
    { label: 'Clipboard', emoji: '📋' },
    { label: 'Settings', emoji: '⚙️' },
  ];

  return (
    <View style={drawerStyles.container}>
      <View style={drawerStyles.header}>
        <View style={drawerStyles.avatar}>
          <Text style={drawerStyles.avatarText}>TA</Text>
        </View>
        <View>
          <Text style={drawerStyles.name}>Trika Aditya</Text>
          <Text style={drawerStyles.role}>Field Inspector</Text>
        </View>
      </View>
      <View style={drawerStyles.divider} />
      {items.map((item, index) => (
        <View key={index} style={drawerStyles.item}>
          <Text style={drawerStyles.itemEmoji}>{item.emoji}</Text>
          <Text style={drawerStyles.itemLabel}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SurveyProvider>
        <Drawer
          drawerContent={CustomDrawerContent}
          screenOptions={{
            drawerStyle: {
              backgroundColor: colors.card,
              width: 270,
            },
            drawerActiveTintColor: colors.primary,
            drawerInactiveTintColor: colors.textSecondary,
            drawerLabelStyle: {
              fontSize: 14,
              fontWeight: fontWeight.medium,
            },
            headerStyle: {
              backgroundColor: colors.primary,
              shadowColor: 'transparent',
              elevation: 0,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: fontWeight.semibold,
              fontSize: 17,
            },
          }}
        >
          <Drawer.Screen
            name="(tabs)"
            options={{
              drawerLabel: 'Dashboard',
              title: 'Dashboard',
              headerShown: false,
            }}
          />
          <Drawer.Screen
            name="camera"
            options={{
              drawerLabel: 'Camera',
              title: 'Camera',
            }}
          />
          <Drawer.Screen
            name="contacts"
            options={{
              drawerLabel: 'Contacts',
              title: 'Contacts',
            }}
          />
          <Drawer.Screen
            name="location"
            options={{
              drawerLabel: 'Location',
              title: 'Location',
            }}
          />
          <Drawer.Screen
            name="clipboard"
            options={{
              drawerLabel: 'Clipboard',
              title: 'Clipboard',
            }}
          />
          <Drawer.Screen
            name="settings"
            options={{
              drawerLabel: 'Settings',
              title: 'Settings',
            }}
          />
          <Drawer.Screen
            name="survey-preview"
            options={{
              drawerLabel: 'Survey Preview',
              title: 'Survey Preview',
              drawerItemStyle: { display: 'none' },
            }}
          />
        </Drawer>
      </SurveyProvider>
    </GestureHandlerRootView>
  );
}

const drawerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.card,
    paddingTop: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingTop: 52,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: radius.full,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: fontWeight.bold,
  },
  name: {
    color: '#fff',
    fontSize: 16,
    fontWeight: fontWeight.bold,
  },
  role: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontWeight: fontWeight.medium,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: spacing.sm,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  itemEmoji: {
    fontSize: 18,
  },
  itemLabel: {
    fontSize: 14,
    fontWeight: fontWeight.medium,
    color: colors.textSecondary,
  },
});
