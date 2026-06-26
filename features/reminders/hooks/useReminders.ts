import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Reminder } from '../types';

const STORAGE_KEY = '@reminders';

const DEFAULT_REMINDERS: Reminder[] = [
  {
    id: '1',
    title: 'Pay electricity bill',
    dueDate: '2026-06-28',
    dueTime: '14:00',
    category: 'Finance',
    completed: false,
    createdAt: '2026-06-25T12:00:00.000Z',
  },
  {
    id: '2',
    title: 'Buy groceries',
    dueDate: '2026-06-27',
    dueTime: '10:00',
    category: 'Personal',
    completed: false,
    createdAt: '2026-06-25T12:00:00.000Z',
  },
  {
    id: '3',
    title: 'Dental checkup',
    dueDate: '2026-07-01',
    dueTime: '09:30',
    category: 'Health',
    completed: true,
    createdAt: '2026-06-25T12:00:00.000Z',
  },
];

export function useReminders() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setReminders(JSON.parse(stored));
      } else {
        setReminders(DEFAULT_REMINDERS);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_REMINDERS));
      }
    } catch {
      setReminders(DEFAULT_REMINDERS);
    } finally {
      setLoading(false);
    }
  };

  const persist = async (updated: Reminder[]) => {
    setReminders(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const addReminder = useCallback(async (reminder: Omit<Reminder, 'id' | 'createdAt' | 'completed'>) => {
    const newReminder: Reminder = {
      ...reminder,
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    const updated = [newReminder, ...reminders];
    await persist(updated);
    return newReminder;
  }, [reminders]);

  const toggleReminder = useCallback(async (id: string) => {
    const updated = reminders.map(r =>
      r.id === id ? { ...r, completed: !r.completed } : r
    );
    await persist(updated);
  }, [reminders]);

  const deleteReminder = useCallback(async (id: string) => {
    const updated = reminders.filter(r => r.id !== id);
    await persist(updated);
  }, [reminders]);

  return { reminders, loading, addReminder, toggleReminder, deleteReminder, loadReminders };
}
