import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from './components/Header';
import SegmentedControl from './components/SegmentedControl';
import ActiveTasks from './components/ActiveTasks';
import ShoppingList from './components/ShoppingList';
import JointSavings from './components/JointSavings';
import FAB from './components/FAB';

const CONTENT = {
  Tasks: <ActiveTasks />,
  Shopping: <ShoppingList />,
  Savings: <JointSavings />,
};

export default function TaskListScreen() {
  const [activeTab, setActiveTab] = useState('Tasks');

  const handleFABPress = () => {
    console.log('FAB pressed on tab:', activeTab);
    // Add new task / item / goal depending on active tab
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Header */}
        <Header onMenuPress={() => console.log('Menu pressed')} />

        {/* Segmented Control */}
        <SegmentedControl activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Scrollable content */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {CONTENT[activeTab]}
        </ScrollView>

        {/* Floating Action Button */}
        <FAB onPress={handleFABPress} />
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
    backgroundColor: '#F8F7F5',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
});