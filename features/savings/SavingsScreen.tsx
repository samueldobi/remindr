import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import JointSavings from './components/JointSavings';
import AppHeader from '@/components/AppHeader';
import AppDrawer from '@/components/AppDrawer';

export default function SavingsScreen() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <SafeAreaView edges={['top']} style={styles.safe}>
        <View style={styles.container}>
          <AppHeader title="Savings" onMenuPress={() => setDrawerOpen(true)} />
          <JointSavings />
        </View>
      </SafeAreaView>

      <AppDrawer visible={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
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
