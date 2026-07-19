import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { colors, spacing } from '../constants/theme';

export default function ScreenContainer({ children, style, contentStyle, scrollable }) {
  if (scrollable === false) {
    return (
      <View style={[styles.screen, style]}>
        {children}
      </View>
    );
  }
  return (
    <ScrollView
      style={[styles.screen, style]}
      contentContainerStyle={[styles.content, contentStyle]}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.base,
    paddingTop: spacing.base,
    paddingBottom: spacing.xxxl,
  },
});
