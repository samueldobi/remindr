import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type SavingsGoalFormProps = {
  initialTitle?: string;
  initialTarget?: string;
  initialCurrent?: string;
  onSubmit: (data: { title: string; target_amount: string; current_amount?: string }) => void;
  onCancel: () => void;
  mode: 'create' | 'edit';
};

export default function SavingsGoalForm({
  initialTitle = '',
  initialTarget = '',
  initialCurrent = '',
  onSubmit,
  onCancel,
  mode,
}: SavingsGoalFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [targetAmount, setTargetAmount] = useState(initialTarget);
  const [currentAmount, setCurrentAmount] = useState(initialCurrent);

  const handleSubmit = () => {
    if (mode === 'create') {
      onSubmit({ title: title.trim(), target_amount: targetAmount.trim() });
    } else {
      const updates: { title: string; target_amount: string; current_amount?: string } = {
        title: title.trim(),
        target_amount: targetAmount.trim(),
      };
      if (currentAmount.trim()) {
        updates.current_amount = currentAmount.trim();
      }
      onSubmit(updates);
    }
  };

  const isValid = title.trim().length > 0 && targetAmount.trim().length > 0;

  return (
    <View style={styles.overlay}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>{mode === 'create' ? 'New Savings Goal' : 'Edit Savings Goal'}</Text>
          <TouchableOpacity onPress={onCancel} activeOpacity={0.7}>
            <Ionicons name="close" size={24} color="#9C7349" />
          </TouchableOpacity>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Goal Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Family Vacation"
            placeholderTextColor="#9C7349"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Target Amount (₦)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 500000"
            placeholderTextColor="#9C7349"
            keyboardType="decimal-pad"
            value={targetAmount}
            onChangeText={setTargetAmount}
          />
        </View>

        {mode === 'edit' && (
          <View style={styles.field}>
            <Text style={styles.label}>Current Amount (₦)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 320500"
              placeholderTextColor="#9C7349"
              keyboardType="decimal-pad"
              value={currentAmount}
              onChangeText={setCurrentAmount}
            />
          </View>
        )}

        <View style={styles.actions}>
          <TouchableOpacity style={styles.cancelBtn} onPress={onCancel} activeOpacity={0.7}>
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.submitBtn, !isValid && styles.submitBtnDisabled]}
            onPress={handleSubmit}
            disabled={!isValid}
            activeOpacity={0.8}
          >
            <Text style={styles.submitBtnText}>{mode === 'create' ? 'Add Goal' : 'Save'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#F8F7F5',
    zIndex: 10,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1C140D',
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
});
