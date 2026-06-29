import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import EditShoppingModal from './EditShoppingModal';
import type { ShoppingList, ShoppingItem } from '../types';

type ListWithItems = ShoppingList & { items: ShoppingItem[] };

type ShoppingListDetailProps = {
  list: ListWithItems;
  onToggle: (listId: string, itemId: string) => void;
  onAddItem: (listId: string, name: string) => void;
  onRenameItem: (itemId: string, name: string) => void;
  onDeleteItem: (listId: string, itemId: string) => void;
  onBack: () => void;
};

function ItemRow({
  item,
  listId,
  onToggle,
  onDelete,
}: {
  item: ShoppingItem;
  listId: string;
  onToggle: (listId: string, itemId: string) => void;
  onDelete: (listId: string, itemId: string) => void;
}) {
  const renderRightActions = (_progress: Animated.AnimatedInterpolation<number>) => (
    <Animated.View style={styles.deleteAction}>
      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => onDelete(listId, item.id)}
        activeOpacity={0.8}
      >
        <Ionicons name="trash-outline" size={22} color="#FFF" />
        <Text style={styles.deleteBtnText}>Delete</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <Swipeable renderRightActions={renderRightActions} overshootRight={false}>
      <TouchableOpacity
        style={styles.itemRow}
        onPress={() => onToggle(listId, item.id)}
        activeOpacity={0.7}
      >
        <View style={[styles.checkbox, item.bought && styles.checkboxDone]}>
          {item.bought && <Ionicons name="checkmark" size={16} color="#FFF" />}
        </View>
        <Text style={[styles.itemName, item.bought && styles.itemNameDone]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    </Swipeable>
  );
}

export default function ShoppingListDetail({
  list,
  onToggle,
  onAddItem,
  onRenameItem,
  onDeleteItem,
  onBack,
}: ShoppingListDetailProps) {
  const [editModal, setEditModal] = useState(false);
  const boughtCount = list.items.filter((i) => i.bought).length;
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
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => setEditModal(true)}
          activeOpacity={0.7}
        >
          <Ionicons name="pencil" size={20} color="#F48C25" />
        </TouchableOpacity>
      </View>

      <View style={styles.list}>
        {list.items.map((item) => (
          <ItemRow
            key={item.id}
            item={item}
            listId={list.id}
            onToggle={onToggle}
            onDelete={onDeleteItem}
          />
        ))}
      </View>

      <EditShoppingModal
        visible={editModal}
        items={list.items}
        onAddItem={(name) => onAddItem(list.id, name)}
        onRenameItem={onRenameItem}
        onDeleteItem={(itemId) => onDeleteItem(list.id, itemId)}
        onClose={() => setEditModal(false)}
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
  editBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(244,140,37,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
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
    borderWidth: 1,
    borderColor: 'rgba(244,140,37,0.06)',
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
  deleteAction: {
    backgroundColor: '#DA3D20',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    width: 80,
  },
  deleteBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  deleteBtnText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
  },
});
