import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Ionicons } from '@expo/vector-icons';

const shoppingSchema = z.object({
  title: z.string().min(1, 'List title is required').max(100),
});

type FormData = z.infer<typeof shoppingSchema>;

type CreateShoppingFormProps = {
  onSubmit: (title: string, items: string[]) => void;
  onCancel: () => void;
};

export default function CreateShoppingForm({ onSubmit, onCancel }: CreateShoppingFormProps) {
  const [itemInput, setItemInput] = useState('');
  const [items, setItems] = useState<string[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(shoppingSchema),
    defaultValues: { title: '' },
  });

  const addItem = () => {
    const trimmed = itemInput.trim();
    if (trimmed && !items.includes(trimmed)) {
      setItems(prev => [...prev, trimmed]);
      setItemInput('');
    }
  };

  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const onFormSubmit = (data: FormData) => {
    if (items.length === 0) return;
    onSubmit(data.title, items);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity style={styles.closeBtn} onPress={onCancel} activeOpacity={0.7}>
        <Text style={styles.closeBtnText}>Cancel</Text>
      </TouchableOpacity>

      <Text style={styles.title}>New Shopping List</Text>

      <View style={styles.field}>
        <Text style={styles.label}>List Title</Text>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="e.g. Saturday Market Run"
              placeholderTextColor="#9C7349"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.title && <Text style={styles.error}>{errors.title.message}</Text>}
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Items</Text>
        <View style={styles.addRow}>
          <TextInput
            style={[styles.input, styles.itemInput]}
            placeholder="Add an item"
            placeholderTextColor="#9C7349"
            value={itemInput}
            onChangeText={setItemInput}
            onSubmitEditing={addItem}
          />
          <TouchableOpacity style={styles.addBtn} onPress={addItem} activeOpacity={0.7}>
            <Ionicons name="add" size={22} color="#FFF" />
          </TouchableOpacity>
        </View>

        {items.length === 0 ? (
          <Text style={styles.hint}>Add at least one item</Text>
        ) : (
          <View style={styles.itemList}>
            {items.map((item, index) => (
              <View key={index} style={styles.itemRow}>
                <View style={styles.bullet} />
                <Text style={styles.itemText}>{item}</Text>
                <TouchableOpacity onPress={() => removeItem(index)} activeOpacity={0.6}>
                  <Ionicons name="close-circle" size={20} color="#DA3D20" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.cancelBtn} onPress={onCancel} activeOpacity={0.7}>
          <Text style={styles.cancelBtnText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.submitBtn, items.length === 0 && styles.submitBtnDisabled]}
          onPress={handleSubmit(onFormSubmit)}
          activeOpacity={0.8}
          disabled={items.length === 0}
        >
          <Text style={styles.submitBtnText}>Create List</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F7F5',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  closeBtn: {
    alignSelf: 'flex-end',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  closeBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#9C7349',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1C140D',
    marginBottom: 24,
  },
  field: {
    marginBottom: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#9C7349',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1C140D',
    borderWidth: 1,
    borderColor: 'rgba(244,140,37,0.12)',
    flex: 1,
  },
  addRow: {
    flexDirection: 'row',
    gap: 8,
  },
  itemInput: {
    flex: 1,
  },
  addBtn: {
    width: 46,
    height: 46,
    borderRadius: 10,
    backgroundColor: '#F48C25',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hint: {
    fontSize: 12,
    color: '#9C7349',
    marginTop: 6,
    fontWeight: '500',
  },
  itemList: {
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(244,140,37,0.06)',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    gap: 10,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F48C25',
  },
  itemText: {
    flex: 1,
    fontSize: 15,
    color: '#1C140D',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(244,140,37,0.15)',
  },
  cancelBtnText: {
    color: '#9C7349',
    fontSize: 15,
    fontWeight: '700',
  },
  submitBtn: {
    flex: 1,
    backgroundColor: '#F48C25',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitBtnDisabled: {
    opacity: 0.5,
  },
  submitBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
  error: {
    fontSize: 11,
    color: '#DA3D20',
    marginTop: 4,
    fontWeight: '500',
  },
});
