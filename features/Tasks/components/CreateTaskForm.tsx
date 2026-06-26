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
import { categories } from '@/constants/Categories';
import type { TaskStatus } from '../types';

const STATUS_OPTIONS: { label: string; value: TaskStatus }[] = [
  { label: 'Urgent', value: 'urgent' },
  { label: 'Pending', value: 'pending' },
  { label: 'In Progress', value: 'in_progress' },
];

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  category: z.string().min(1, 'Select a category'),
  status: z.string().min(1, 'Select a status'),
});

type FormData = z.infer<typeof taskSchema>;

type CreateTaskFormProps = {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
};

export default function CreateTaskForm({ onSubmit, onCancel }: CreateTaskFormProps) {
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showStatusPicker, setShowStatusPicker] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      category: '',
      status: '',
    },
  });

  const selectedCategory = watch('category');
  const selectedStatus = watch('status');

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity style={styles.closeBtn} onPress={onCancel} activeOpacity={0.7}>
        <Text style={styles.closeBtnText}>Cancel</Text>
      </TouchableOpacity>

      <Text style={styles.title}>New Task</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Title</Text>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="e.g. Clean the kitchen"
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
        <Text style={styles.label}>Category</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => {
            setShowCategoryPicker(!showCategoryPicker);
            setShowStatusPicker(false);
          }}
        >
          <Text style={selectedCategory ? styles.inputText : styles.placeholderText}>
            {selectedCategory || 'Select category'}
          </Text>
        </TouchableOpacity>
        {errors.category && <Text style={styles.error}>{errors.category.message}</Text>}
        {showCategoryPicker && (
          <View style={styles.pickerList}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.pickerOption,
                  selectedCategory === cat.name && styles.pickerOptionActive,
                ]}
                onPress={() => {
                  setValue('category', cat.name, { shouldValidate: true });
                  setShowCategoryPicker(false);
                }}
              >
                <Text
                  style={[
                    styles.pickerOptionText,
                    selectedCategory === cat.name && styles.pickerOptionTextActive,
                  ]}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Status</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => {
            setShowStatusPicker(!showStatusPicker);
            setShowCategoryPicker(false);
          }}
        >
          <Text style={selectedStatus ? styles.inputText : styles.placeholderText}>
            {selectedStatus
              ? STATUS_OPTIONS.find(s => s.value === selectedStatus)?.label || selectedStatus
              : 'Select status'}
          </Text>
        </TouchableOpacity>
        {errors.status && <Text style={styles.error}>{errors.status.message}</Text>}
        {showStatusPicker && (
          <View style={styles.pickerList}>
            {STATUS_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                style={[
                  styles.pickerOption,
                  selectedStatus === opt.value && styles.pickerOptionActive,
                ]}
                onPress={() => {
                  setValue('status', opt.value, { shouldValidate: true });
                  setShowStatusPicker(false);
                }}
              >
                <Text
                  style={[
                    styles.pickerOptionText,
                    selectedStatus === opt.value && styles.pickerOptionTextActive,
                  ]}
                >
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.cancelBtn} onPress={onCancel} activeOpacity={0.7}>
          <Text style={styles.cancelBtnText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleSubmit(onSubmit)}
          activeOpacity={0.8}
        >
          <Text style={styles.submitBtnText}>Create Task</Text>
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
  },
  inputText: {
    fontSize: 15,
    color: '#1C140D',
  },
  placeholderText: {
    fontSize: 15,
    color: '#9C7349',
  },
  error: {
    fontSize: 11,
    color: '#DA3D20',
    marginTop: 4,
    fontWeight: '500',
  },
  pickerList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginTop: 4,
    borderWidth: 1,
    borderColor: 'rgba(244,140,37,0.12)',
    overflow: 'hidden',
  },
  pickerOption: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(244,140,37,0.06)',
  },
  pickerOptionActive: {
    backgroundColor: 'rgba(244,140,37,0.08)',
  },
  pickerOptionText: {
    fontSize: 15,
    color: '#1C140D',
  },
  pickerOptionTextActive: {
    fontWeight: '700',
    color: '#F48C25',
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
  submitBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
