import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Bill } from '../types';

const STORAGE_KEY = '@bills';

const DEFAULT_BILLS: Bill[] = [
  { id: '1', name: 'Electricity Bill', amount: 24500, dueDate: '2026-01-15', dueTime: '12:00', status: 'unpaid', category: 'Utility' },
  { id: '2', name: 'House Rent', amount: 350000, dueDate: '2026-01-15', dueTime: '12:00', status: 'unpaid', category: 'Housing' },
  { id: '3', name: 'Cooking Gas', amount: 8500, dueDate: '2026-01-16', dueTime: '12:00', status: 'paid', category: 'Utility' },
  { id: '4', name: 'Car Servicing', amount: 45000, dueDate: '2026-01-16', dueTime: '12:00', status: 'unpaid', category: 'Transport' },
  { id: '5', name: 'Internet Subscription', amount: 15000, dueDate: '2026-01-17', dueTime: '12:00', status: 'paid', category: 'Subscription' },
  { id: '6', name: 'Water Bill', amount: 6200, dueDate: '2026-01-22', dueTime: '12:00', status: 'unpaid', category: 'Utility' },
];

export function useBills() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBills();
  }, []);

  const loadBills = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setBills(JSON.parse(stored));
      } else {
        setBills(DEFAULT_BILLS);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_BILLS));
      }
    } catch {
      setBills(DEFAULT_BILLS);
    } finally {
      setLoading(false);
    }
  };

  const persist = async (updated: Bill[]) => {
    setBills(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const addBill = useCallback(async (bill: Omit<Bill, 'id' | 'status'>) => {
    const newBill: Bill = {
      ...bill,
      id: Date.now().toString(),
      status: 'unpaid',
    };
    const updated = [newBill, ...bills];
    await persist(updated);
    return newBill;
  }, [bills]);

  const togglePaid = useCallback(async (id: string) => {
    const updated = bills.map(b =>
      b.id === id ? { ...b, status: b.status === 'paid' ? 'unpaid' as const : 'paid' as const } : b
    );
    await persist(updated);
  }, [bills]);

  const deleteBill = useCallback(async (id: string) => {
    const updated = bills.filter(b => b.id !== id);
    await persist(updated);
  }, [bills]);

  return { bills, loading, addBill, togglePaid, deleteBill, loadBills };
}
