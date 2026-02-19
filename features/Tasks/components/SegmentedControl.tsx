import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TABS = ['Tasks', 'Shopping', 'Savings'];

export default function SegmentedControl({ activeTab, onTabChange }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {TABS.map(tab => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, isActive && styles.tabActive]}
              onPress={() => onTabChange(tab)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F8F7F5',
  },
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(244,140,37,0.1)',
    borderRadius: 12,
    padding: 4,
    height: 46,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
  },
  tabActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#9C7349',
  },
  tabTextActive: {
    fontWeight: '700',
    color: '#F48C25',
  },
});
