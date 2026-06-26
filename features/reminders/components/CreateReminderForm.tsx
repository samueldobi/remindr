import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { categories } from '@/constants/Categories';

const reminderSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  dueDate: z.string().min(1, 'Date is required'),
  dueTime: z.string().min(1, 'Time is required'),
  category: z.string().min(1, 'Select a category'),
});

type FormData = z.infer<typeof reminderSchema>;

type CreateReminderFormProps = {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
};

export default function CreateReminderForm({ onSubmit, onCancel }: CreateReminderFormProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(reminderSchema),
    defaultValues: {
      title: '',
      dueDate: '',
      dueTime: '',
      category: '',
    },
  });

  const selectedCategory = watch('category');
  const dueDate = watch('dueDate');
  const dueTime = watch('dueTime');

  const onDateChange = (_event: DateTimePickerEvent, selected?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selected) {
      const year = selected.getFullYear();
      const month = String(selected.getMonth() + 1).padStart(2, '0');
      const day = String(selected.getDate()).padStart(2, '0');
      setValue('dueDate', `${year}-${month}-${day}`, { shouldValidate: true });
    }
  };

  const onTimeChange = (_event: DateTimePickerEvent, selected?: Date) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selected) {
      const hours = String(selected.getHours()).padStart(2, '0');
      const minutes = String(selected.getMinutes()).padStart(2, '0');
      setValue('dueTime', `${hours}:${minutes}`, { shouldValidate: true });
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>New Reminder</Text>

      {/* Title */}
      <View style={styles.field}>
        <Text style={styles.label}>Title</Text>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="e.g. Pay electricity bill"
              placeholderTextColor="#9C7349"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.title && <Text style={styles.error}>{errors.title.message}</Text>}
      </View>

      {/* Due Date */}
      <View style={styles.field}>
        <Text style={styles.label}>Due Date</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={dueDate ? styles.inputText : styles.placeholderText}>
            {dueDate || 'Select date'}
          </Text>
        </TouchableOpacity>
        {errors.dueDate && <Text style={styles.error}>{errors.dueDate.message}</Text>}
        {showDatePicker && (
          <DateTimePicker
            value={dueDate ? new Date(`${dueDate}T12:00:00`) : new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onDateChange}
          />
        )}
      </View>

      {/* Due Time */}
      <View style={styles.field}>
        <Text style={styles.label}>Due Time</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={dueTime ? styles.inputText : styles.placeholderText}>
            {dueTime || 'Select time'}
          </Text>
        </TouchableOpacity>
        {errors.dueTime && <Text style={styles.error}>{errors.dueTime.message}</Text>}
        {showTimePicker && (
          <DateTimePicker
            value={
              dueTime
                ? new Date(`2026-01-01T${dueTime}:00`)
                : new Date()
            }
            mode="time"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onTimeChange}
          />
        )}
      </View>

      {/* Category */}
      <View style={styles.field}>
        <Text style={styles.label}>Category</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowCategoryPicker(!showCategoryPicker)}
        >
          <Text style={selectedCategory ? styles.inputText : styles.placeholderText}>
            {selectedCategory || 'Select category'}
          </Text>
        </TouchableOpacity>
        {errors.category && <Text style={styles.error}>{errors.category.message}</Text>}
        {showCategoryPicker && (
          <View style={styles.categoryList}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryOption,
                  selectedCategory === cat.name && styles.categoryOptionActive,
                ]}
                onPress={() => {
                  setValue('category', cat.name, { shouldValidate: true });
                  setShowCategoryPicker(false);
                }}
              >
                <Text
                  style={[
                    styles.categoryOptionText,
                    selectedCategory === cat.name && styles.categoryOptionTextActive,
                  ]}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.cancelBtn} onPress={onCancel} activeOpacity={0.7}>
          <Text style={styles.cancelBtnText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleSubmit(onSubmit)}
          activeOpacity={0.8}
        >
          <Text style={styles.submitBtnText}>Create Reminder</Text>
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
  categoryList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginTop: 4,
    borderWidth: 1,
    borderColor: 'rgba(244,140,37,0.12)',
    overflow: 'hidden',
  },
  categoryOption: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(244,140,37,0.06)',
  },
  categoryOptionActive: {
    backgroundColor: 'rgba(244,140,37,0.08)',
  },
  categoryOptionText: {
    fontSize: 15,
    color: '#1C140D',
  },
  categoryOptionTextActive: {
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
