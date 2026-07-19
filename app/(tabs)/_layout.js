import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { LayoutDashboard, FilePlus, ClipboardList, User } from 'lucide-react-native';
import { colors, spacing, radius, shadow, fontWeight } from '../../constants/theme';

const TAB_ICONS = {
  Dashboard: LayoutDashboard,
  'New Survey': FilePlus,
  History: ClipboardList,
  Profile: User,
};

function TabIcon({ name, focused }) {
  const IconComponent = TAB_ICONS[name] || LayoutDashboard;
  return (
    <View style={[styles.tabItem, focused && styles.tabItemActive]}>
      <IconComponent
        size={20}
        color={focused ? colors.primary : colors.textMuted}
        strokeWidth={focused ? 2.2 : 1.8}
      />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: 72,
          paddingBottom: 10,
          paddingTop: 6,
          ...shadow.lg,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: fontWeight.semibold,
          marginTop: 2,
          letterSpacing: 0.3,
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
          letterSpacing: -0.2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ focused }) => <TabIcon name="Dashboard" focused={focused} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="new-survey"
        options={{
          title: 'New Survey',
          tabBarLabel: 'New Survey',
          tabBarIcon: ({ focused }) => <TabIcon name="New Survey" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarLabel: 'History',
          tabBarIcon: ({ focused }) => <TabIcon name="History" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => <TabIcon name="Profile" focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItemActive: {
    backgroundColor: colors.primaryLight,
  },
});
