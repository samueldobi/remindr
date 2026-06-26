import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  StyleSheet,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { BILL_CATEGORIES } from '@/constants/BillCategories';

const billSchema = z.object({
  name: z.string().min(1, 'Bill name is required').max(100),
  amount: z.string().min(1, 'Amount is required').regex(/^\d+(\.\d+)?$/, 'Enter a valid number'),
  category: z.string().min(1, 'Select a category'),
});

type FormData = z.infer<typeof billSchema>;

type CreateBillFormProps = {
  onSubmit: (data: { name: string; amount: number; category: string; dueDate: string; dueTime: string }) => void;
  onCancel: () => void;
};

export default function CreateBillForm({ onSubmit, onCancel }: CreateBillFormProps) {
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [dueDate, setDueDate] = useState(new Date());
  const [dueTime, setDueTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(billSchema),
    defaultValues: {
      name: '',
      amount: '',
      category: '',
    },
  });

  const selectedCategory = watch('category');

  const formatDate = (d: Date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  };

  const formatTime = (d: Date) => {
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const h = hours % 12 || 12;
    return `${h}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };

  const toISODate = (d: Date) => {
    const y = d.getFullYear();
    const m = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const toTimeString = (d: Date) => {
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  };

  const onDateChange = (_event: DateTimePickerEvent, selected?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selected) setDueDate(selected);
  };

  const onTimeChange = (_event: DateTimePickerEvent, selected?: Date) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selected) setDueTime(selected);
  };

  const onFormSubmit = (data: FormData) => {
    onSubmit({
      name: data.name,
      amount: parseFloat(data.amount),
      category: data.category,
      dueDate: toISODate(dueDate),
      dueTime: toTimeString(dueTime),
    });
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

      <Text style={styles.title}>New Bill</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Bill Name</Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="e.g. Electricity Bill"
              placeholderTextColor="#9C7349"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Amount (₦)</Text>
        <Controller
          control={control}
          name="amount"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="e.g. 24500"
              placeholderTextColor="#9C7349"
              keyboardType="decimal-pad"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.amount && <Text style={styles.error}>{errors.amount.message}</Text>}
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Category</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => {
            setShowCategoryPicker(!showCategoryPicker);
          }}
        >
          <View style={styles.categoryDisplay}>
            {selectedCategory && (
              <Ionicons
                name={BILL_CATEGORIES.find(c => c.name === selectedCategory)?.icon as any || 'receipt-outline'}
                size={18}
                color="#F48C25"
                style={{ marginRight: 8 }}
              />
            )}
            <Text style={selectedCategory ? styles.inputText : styles.placeholderText}>
              {selectedCategory || 'Select category'}
            </Text>
          </View>
        </TouchableOpacity>
        {errors.category && <Text style={styles.error}>{errors.category.message}</Text>}
        {showCategoryPicker && (
          <View style={styles.pickerList}>
            {BILL_CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.name}
                style={[
                  styles.pickerOption,
                  selectedCategory === cat.name && styles.pickerOptionActive,
                ]}
                onPress={() => {
                  setValue('category', cat.name, { shouldValidate: true });
                  setShowCategoryPicker(false);
                }}
              >
                <Ionicons name={cat.icon as any} size={18} color="#9C7349" style={{ marginRight: 10 }} />
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
        <Text style={styles.label}>Due Date</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDatePicker(true)}
        >
          <View style={styles.categoryDisplay}>
            <Ionicons name="calendar-outline" size={18} color="#F48C25" style={{ marginRight: 8 }} />
            <Text style={styles.inputText}>{formatDate(dueDate)}</Text>
          </View>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={dueDate}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Due Time</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowTimePicker(true)}
        >
          <View style={styles.categoryDisplay}>
            <Ionicons name="time-outline" size={18} color="#F48C25" style={{ marginRight: 8 }} />
            <Text style={styles.inputText}>{formatTime(dueTime)}</Text>
          </View>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={dueTime}
            mode="time"
            display="default"
            onChange={onTimeChange}
          />
        )}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.cancelBtn} onPress={onCancel} activeOpacity={0.7}>
          <Text style={styles.cancelBtnText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleSubmit(onFormSubmit)}
          activeOpacity={0.8}
        >
          <Text style={styles.submitBtnText}>Add Bill</Text>
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
  categoryDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
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
    flexDirection: 'row',
    alignItems: 'center',
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
