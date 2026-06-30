import { useState, useCallback } from 'react';
import { apiRequest } from '@/lib/api';
import type { SavingsGoal } from '../types';

export function useSavingsGoals() {
  const [goals, setGoals] = useState<SavingsGoal[]>([]);
  const [loading, setLoading] = useState(true);

  const loadGoals = useCallback(async () => {
    try {
      setLoading(true);
      const data = await apiRequest<{ goals: SavingsGoal[] }>('/savings-goals');
      setGoals(data.goals);
    } catch {
      setGoals([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const addGoal = useCallback(async (title: string, targetAmount: string) => {
    const data = await apiRequest<{ goal: SavingsGoal }>('/savings-goals', {
      method: 'POST',
      body: JSON.stringify({ title, target_amount: targetAmount }),
    });
    setGoals(prev => [data.goal, ...prev]);
    return data.goal;
  }, []);

  const updateGoal = useCallback(async (id: string, updates: { title?: string; target_amount?: string; current_amount?: string }) => {
    const data = await apiRequest<{ goal: SavingsGoal }>(`/savings-goals/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
    setGoals(prev => prev.map(g => g.id === id ? data.goal : g));
    return data.goal;
  }, []);

  const deleteGoal = useCallback(async (id: string) => {
    await apiRequest(`/savings-goals/${id}`, { method: 'DELETE' });
    setGoals(prev => prev.filter(g => g.id !== id));
  }, []);

  return { goals, loading, loadGoals, addGoal, updateGoal, deleteGoal };
}
