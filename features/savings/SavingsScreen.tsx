import { useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import AppHeader from '@/components/AppHeader';
import AppDrawer from '@/components/AppDrawer';
import FAB from '@/features/household/components/FAB';
import SavingsGoalCard from './components/SavingsGoalCard';
import SavingsGoalForm from './components/SavingsGoalForm';
import { useSavingsGoals } from './hooks/useSavingsGoals';
import type { SavingsGoal } from './types';

export default function SavingsScreen() {
  const { goals, loading, loadGoals, addGoal, updateGoal, deleteGoal } = useSavingsGoals();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showForm, setShowForm] = useState<'create' | 'edit' | null>(null);
  const [editingGoal, setEditingGoal] = useState<SavingsGoal | null>(null);

  useFocusEffect(
    useCallback(() => {
      loadGoals();
    }, [])
  );

  const handleAdd = async (data: { title: string; target_amount: string; current_amount?: string }) => {
    await addGoal(data.title, data.target_amount);
    setShowForm(null);
  };

  const handleEdit = async (data: { title: string; target_amount: string; current_amount?: string }) => {
    if (!editingGoal) return;
    await updateGoal(editingGoal.id, {
      title: data.title,
      target_amount: data.target_amount,
      current_amount: data.current_amount,
    });
    setShowForm(null);
    setEditingGoal(null);
  };

  const handleCardPress = (goal: SavingsGoal) => {
    setEditingGoal(goal);
    setShowForm('edit');
  };

  return (
    <>
      <SafeAreaView edges={['top']} style={styles.safe}>
        <View style={styles.container}>
          <AppHeader title="Savings" onMenuPress={() => setDrawerOpen(true)} />

          {loading ? (
            <View style={styles.center}>
              <ActivityIndicator size="large" color="#F48C25" />
            </View>
          ) : (
            <>
              {goals.length === 0 ? (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyText}>No savings goals yet</Text>
                  <Text style={styles.emptySubtext}>Tap + to create one</Text>
                </View>
              ) : (
                <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
                  {goals.map(goal => (
                    <SavingsGoalCard
                      key={goal.id}
                      goal={goal}
                      onPress={handleCardPress}
                      onDelete={deleteGoal}
                    />
                  ))}
                </ScrollView>
              )}
            </>
          )}
        </View>

        {!showForm && <FAB onPress={() => setShowForm('create')} />}

        {showForm === 'create' && (
          <SavingsGoalForm
            mode="create"
            onSubmit={handleAdd}
            onCancel={() => setShowForm(null)}
          />
        )}

        {showForm === 'edit' && editingGoal && (
          <SavingsGoalForm
            mode="edit"
            initialTitle={editingGoal.title}
            initialTarget={editingGoal.target_amount}
            initialCurrent={editingGoal.current_amount}
            onSubmit={handleEdit}
            onCancel={() => { setShowForm(null); setEditingGoal(null); }}
          />
        )}
      </SafeAreaView>

      <AppDrawer visible={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8F7F5',
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 8,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    paddingBottom: 100,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 15,
    color: '#9C7349',
    fontWeight: '600',
  },
  emptySubtext: {
    fontSize: 13,
    color: '#9C7349',
    marginTop: 4,
  },
});
