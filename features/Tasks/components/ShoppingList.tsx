import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const INITIAL_ITEMS = [
  { id: '1', label: 'Large Onions (1 basket)', done: false },
  { id: '2', label: 'Indomie (Carton)', done: true },
  { id: '3', label: 'Yam (3 medium tubers)', done: false },
];

function ShoppingItem({ item, onToggle }) {
  return (
    <TouchableOpacity
      style={styles.itemRow}
      onPress={() => onToggle(item.id)}
      activeOpacity={0.7}
    >
      <View style={[styles.checkbox, item.done && styles.checkboxDone]}>
        {item.done && <Text style={styles.tick}>✓</Text>}
      </View>
      <Text style={[styles.itemLabel, item.done && styles.itemLabelDone]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );
}

export default function ShoppingList() {
  const [items, setItems] = useState(INITIAL_ITEMS);

  const handleToggle = (id) => {
    setItems(prev =>
      prev.map(item => item.id === id ? { ...item, done: !item.done } : item)
    );
  };

  return (
    <View style={styles.section}>
      {/* Section header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Shopping List</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        {items.map((item, index) => (
          <View key={item.id}>
            <ShoppingItem item={item} onToggle={handleToggle} />
            {index < items.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#1C140D',
    letterSpacing: -0.3,
  },
  viewAll: {
    fontSize: 13,
    fontWeight: '700',
    color: '#F48C25',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(244,140,37,0.06)',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: 'rgba(244,140,37,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDone: {
    backgroundColor: '#F48C25',
    borderColor: '#F48C25',
  },
  tick: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
  itemLabel: {
    fontSize: 13,
    color: '#1C140D',
    flex: 1,
  },
  itemLabelDone: {
    color: '#9C7349',
    textDecorationLine: 'line-through',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(244,140,37,0.07)',
    marginHorizontal: 2,
  },
});
