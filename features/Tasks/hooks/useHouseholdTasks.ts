import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Task } from '../types';
import { fetchTasks, createTask as createTaskApi, deleteTask as deleteTaskApi, TASKS_CACHE_KEY } from '../service';

export function useHouseholdTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = useCallback(async () => {
    try {
      const cached = await AsyncStorage.getItem(TASKS_CACHE_KEY);
      if (cached) {
        setTasks(JSON.parse(cached));
      }

      const fresh = await fetchTasks();
      setTasks(fresh);
      await AsyncStorage.setItem(TASKS_CACHE_KEY, JSON.stringify(fresh));
    } catch {
      // Cached data is already showing; API failure is non-blocking
    } finally {
      setLoading(false);
    }
  }, []);

  const persist = async (updated: Task[]) => {
    setTasks(updated);
    await AsyncStorage.setItem(TASKS_CACHE_KEY, JSON.stringify(updated));
  };

  const addTask = useCallback(async (data: { title: string; category?: string }) => {
    const tempTask: Task = {
      ...data,
      category: data.category || '',
      id: `temp-${Date.now()}`,
      user_id: '',
      completed: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const updated = [tempTask, ...tasks];
    await persist(updated);

    try {
      const created = await createTaskApi(data);
      const synced = updated.map((t) => (t.id === tempTask.id ? created : t));
      await persist(synced);
      return created;
    } catch (e) {
      const reverted = tasks.filter((t) => t.id !== tempTask.id);
      await persist(reverted);
      throw e;
    }
  }, [tasks]);

  const markDone = useCallback(async (id: string) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, completed: true } : t,
    );
    await persist(updated);
  }, [tasks]);

  const removeTask = useCallback(async (id: string) => {
    const updated = tasks.filter((t) => t.id !== id);
    await persist(updated);

    try {
      await deleteTaskApi(id);
    } catch {
      loadTasks();
    }
  }, [tasks, loadTasks]);

  return { tasks, loading, addTask, markDone, deleteTask: removeTask, loadTasks };
}
