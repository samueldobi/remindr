import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { HouseholdTask, TaskStatus } from '../types';

const STORAGE_KEY = '@household_tasks';

const DEFAULT_TASKS: HouseholdTask[] = [
  {
    id: '1',
    title: 'Buy Fuel for Gen',
    category: 'Utilities',
    status: 'urgent',
    completed: false,
    createdAt: '2026-06-25T12:00:00.000Z',
  },
  {
    id: '2',
    title: 'Pay NEPA Bill',
    category: 'Finance',
    status: 'in_progress',
    completed: false,
    createdAt: '2026-06-25T12:00:00.000Z',
  },
];

export function useHouseholdTasks() {
  const [tasks, setTasks] = useState<HouseholdTask[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setTasks(JSON.parse(stored));
      } else {
        setTasks(DEFAULT_TASKS);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_TASKS));
      }
    } catch {
      setTasks(DEFAULT_TASKS);
    } finally {
      setLoading(false);
    }
  };

  const persist = async (updated: HouseholdTask[]) => {
    setTasks(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const addTask = useCallback(async (task: Omit<HouseholdTask, 'id' | 'createdAt' | 'completed'>) => {
    const newTask: HouseholdTask = {
      ...task,
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    const updated = [newTask, ...tasks];
    await persist(updated);
    return newTask;
  }, [tasks]);

  const markDone = useCallback(async (id: string) => {
    const updated = tasks.map(t =>
      t.id === id ? { ...t, completed: true } : t
    );
    await persist(updated);
  }, [tasks]);

  return { tasks, loading, addTask, markDone, loadTasks };
}
