import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { SurveyProvider } from '../context/SurveyContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Text, StyleSheet } from 'react-native';

function CustomDrawerContent() {
  return (
    <View style={drawerStyles.container}>
      <View style={drawerStyles.header}>
        <Text style={drawerStyles.headerTitle}>Smart Field Survey</Text>
        <Text style={drawerStyles.headerSub}>Navigation Menu</Text>
      </View>
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
              backgroundColor: '#fff',
              width: 260,
            },
            drawerActiveTintColor: '#2563EB',
            drawerInactiveTintColor: '#6B7280',
            drawerLabelStyle: {
              fontSize: 15,
              fontWeight: '500',
            },
            headerStyle: {
              backgroundColor: '#2563EB',
            },
            headerTintColor: '#fff',
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
  },
  header: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#2563EB',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSub: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginTop: 4,
  },
});
