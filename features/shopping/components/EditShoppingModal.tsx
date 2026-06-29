import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { ShoppingItem } from '../types';

type EditShoppingModalProps = {
  visible: boolean;
  items: ShoppingItem[];
  onAddItem: (name: string) => void;
  onRenameItem: (itemId: string, name: string) => void;
  onDeleteItem: (itemId: string) => void;
  onClose: () => void;
};

export default function EditShoppingModal({
  visible,
  items,
  onAddItem,
  onRenameItem,
  onDeleteItem,
  onClose,
}: EditShoppingModalProps) {
  const [newItem, setNewItem] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleAdd = () => {
    const trimmed = newItem.trim();
    if (trimmed) {
      onAddItem(trimmed);
      setNewItem('');
    }
  };

  const startEdit = (item: ShoppingItem) => {
    setEditingId(item.id);
    setEditValue(item.name);
  };

  const saveEdit = () => {
    const trimmed = editValue.trim();
    if (editingId && trimmed) {
      onRenameItem(editingId, trimmed);
    }
    setEditingId(null);
    setEditValue('');
  };

  const handleDelete = (itemId: string) => {
    onDeleteItem(itemId);
    if (editingId === itemId) {
      setEditingId(null);
      setEditValue('');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Edit Items</Text>
            <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
              <Ionicons name="close" size={24} color="#1C140D" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.list}>
            {items.map((item) => (
              <View key={item.id} style={styles.itemRow}>
                {editingId === item.id ? (
                  <TextInput
                    style={styles.editInput}
                    value={editValue}
                    onChangeText={setEditValue}
                    onSubmitEditing={saveEdit}
                    onBlur={saveEdit}
                    autoFocus
                  />
                ) : (
                  <>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <TouchableOpacity onPress={() => startEdit(item)} activeOpacity={0.6}>
                      <Ionicons name="pencil" size={18} color="#9C7349" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete(item.id)} activeOpacity={0.6}>
                      <Ionicons name="trash-outline" size={18} color="#DA3D20" />
                    </TouchableOpacity>
                  </>
                )}
              </View>
            ))}
          </ScrollView>

          <View style={styles.addRow}>
            <TextInput
              style={styles.addInput}
              placeholder="Add item"
              placeholderTextColor="#9C7349"
              value={newItem}
              onChangeText={setNewItem}
              onSubmitEditing={handleAdd}
            />
            <TouchableOpacity style={styles.addBtn} onPress={handleAdd} activeOpacity={0.7}>
              <Ionicons name="add" size={22} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#F8F7F5',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
    maxHeight: '70%',
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sheetTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#1C140D',
  },
  list: {
    marginBottom: 16,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(244,140,37,0.06)',
  },
  itemName: {
    flex: 1,
    fontSize: 15,
    color: '#1C140D',
  },
  editInput: {
    flex: 1,
    fontSize: 15,
    color: '#1C140D',
    paddingVertical: 0,
  },
  addRow: {
    flexDirection: 'row',
    gap: 8,
  },
  addInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1C140D',
    borderWidth: 1,
    borderColor: 'rgba(244,140,37,0.12)',
  },
  addBtn: {
    width: 46,
    height: 46,
    borderRadius: 10,
    backgroundColor: '#F48C25',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
