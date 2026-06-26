import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ShoppingList } from '../types';

const STORAGE_KEY = '@shopping_lists';

export function useShoppingLists() {
  const [lists, setLists] = useState<ShoppingList[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLists();
  }, []);

  const loadLists = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setLists(JSON.parse(stored));
      } else {
        setLists([]);
      }
    } catch {
      setLists([]);
    } finally {
      setLoading(false);
    }
  };

  const persist = async (updated: ShoppingList[]) => {
    setLists(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const addList = useCallback(async (title: string, items: Omit<ShoppingList['items'][0], 'id' | 'bought'>[]) => {
    const newList: ShoppingList = {
      id: Date.now().toString(),
      title,
      items: items.map(item => ({ ...item, id: Date.now().toString() + Math.random(), bought: false })),
      createdAt: new Date().toISOString(),
    };
    const updated = [newList, ...lists];
    await persist(updated);
    return newList;
  }, [lists]);

  const toggleItem = useCallback(async (listId: string, itemId: string) => {
    const updated = lists.map(list =>
      list.id === listId
        ? { ...list, items: list.items.map(item =>
            item.id === itemId ? { ...item, bought: !item.bought } : item
          )}
        : list
    );
    await persist(updated);
  }, [lists]);

  return { lists, loading, addList, toggleItem, loadLists };
}
