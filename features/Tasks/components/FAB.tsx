import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function FAB({ onPress }) {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress} activeOpacity={0.85}>
      <Text style={styles.icon}>+</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F48C25',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#F48C25',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 10,
    elevation: 8,
    zIndex: 20,
  },
  icon: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: '300',
    lineHeight: 32,
  },
});
