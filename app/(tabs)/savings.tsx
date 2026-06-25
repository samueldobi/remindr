import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import JointSavings from '@/features/Tasks/components/JointSavings';

export default function Savings() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <JointSavings />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8F7F5',
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 8,
  },
});