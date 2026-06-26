import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { ShoppingList } from '../types';

type ShoppingListDetailProps = {
  list: ShoppingList;
  onToggle: (listId: string, itemId: string) => void;
  onBack: () => void;
};

export default function ShoppingListDetail({ list, onToggle, onBack }: ShoppingListDetailProps) {
  const boughtCount = list.items.filter(i => i.bought).length;
  const totalCount = list.items.length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={24} color="#1C140D" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.title}>{list.title}</Text>
          <Text style={styles.progress}>{boughtCount} / {totalCount} bought</Text>
        </View>
      </View>

      <FlatList
        data={list.items}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemRow}
            onPress={() => onToggle(list.id, item.id)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, item.bought && styles.checkboxDone]}>
              {item.bought && <Ionicons name="checkmark" size={16} color="#FFF" />}
            </View>
            <Text style={[styles.itemName, item.bought && styles.itemNameDone]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(244,140,37,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerInfo: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C140D',
    marginBottom: 2,
  },
  progress: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9C7349',
  },
  list: {
    paddingBottom: 20,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: '#D0D0D0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDone: {
    backgroundColor: '#F48C25',
    borderColor: '#F48C25',
  },
  itemName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1C140D',
    flex: 1,
  },
  itemNameDone: {
    color: '#9C7349',
    textDecorationLine: 'line-through',
  },
});
