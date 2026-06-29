import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ShoppingList, ShoppingItem } from '../types';
import { fetchLists, createList as createListApi, deleteList as deleteListApi, SHOPPING_CACHE_KEY } from '../service';
import { fetchItems, addItem as addItemApi, renameItem as renameItemApi, deleteItem as deleteItemApi, SHOPPING_ITEMS_CACHE_PREFIX } from '../itemService';

type ListWithItems = ShoppingList & { items: ShoppingItem[] };

function cacheKey(listId: string) {
  return `${SHOPPING_ITEMS_CACHE_PREFIX}${listId}`;
}

export function useShoppingLists() {
  const [lists, setLists] = useState<ListWithItems[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLists();
  }, []);

  const loadLists = useCallback(async () => {
    try {
      const cached = await AsyncStorage.getItem(SHOPPING_CACHE_KEY);
      if (cached) {
        setLists(JSON.parse(cached));
      }

      const apiLists = await fetchLists();
      const withItems: ListWithItems[] = await Promise.all(
        apiLists.map(async (list) => {
          const cachedItems = await AsyncStorage.getItem(cacheKey(list.id));
          let items: ShoppingItem[] = [];
          if (cachedItems) {
            items = JSON.parse(cachedItems);
          }
          try {
            const apiItems = await fetchItems(list.id);
            items = apiItems.map((i) => {
              const existing = items.find((e) => e.id === i.id);
              return { ...i, bought: existing?.bought ?? false };
            });
            await AsyncStorage.setItem(cacheKey(list.id), JSON.stringify(items));
          } catch {
            // Keep cached items
          }
          return { ...list, items };
        }),
      );

      setLists(withItems);
      await AsyncStorage.setItem(SHOPPING_CACHE_KEY, JSON.stringify(withItems));
    } catch {
      // Cached data is already showing
    } finally {
      setLoading(false);
    }
  }, []);

  const persist = async (updated: ListWithItems[]) => {
    setLists(updated);
    await AsyncStorage.setItem(SHOPPING_CACHE_KEY, JSON.stringify(updated));
  };

  const addList = useCallback(async (title: string, itemNames: string[]) => {
    const created = await createListApi(title);
    const items: ShoppingItem[] = [];

    for (const name of itemNames) {
      const item = await addItemApi(created.id, name);
      items.push({ ...item, bought: false });
    }

    const newList: ListWithItems = { ...created, items };
    const updated = [newList, ...lists];
    await persist(updated);
    await AsyncStorage.setItem(cacheKey(created.id), JSON.stringify(items));
    return newList;
  }, [lists]);

  const toggleItem = useCallback(async (listId: string, itemId: string) => {
    const updated = lists.map((list) =>
      list.id === listId
        ? {
            ...list,
            items: list.items.map((item) =>
              item.id === itemId ? { ...item, bought: !item.bought } : item,
            ),
          }
        : list,
    );
    await persist(updated);

    const list = updated.find((l) => l.id === listId);
    if (list) {
      await AsyncStorage.setItem(cacheKey(listId), JSON.stringify(list.items));
    }
  }, [lists]);

  const deleteList = useCallback(async (id: string) => {
    const updated = lists.filter((l) => l.id !== id);
    await persist(updated);

    try {
      await deleteListApi(id);
      await AsyncStorage.removeItem(cacheKey(id));
    } catch {
      loadLists();
    }
  }, [lists, loadLists]);

  const addListItem = useCallback(async (listId: string, name: string) => {
    const item = await addItemApi(listId, name);
    const newItem: ShoppingItem = { ...item, bought: false };

    const updated = lists.map((l) =>
      l.id === listId ? { ...l, items: [...l.items, newItem] } : l,
    );
    await persist(updated);
    return newItem;
  }, [lists]);

  const renameListItem = useCallback(async (itemId: string, name: string) => {
    await renameItemApi(itemId, name);

    const updated = lists.map((l) => ({
      ...l,
      items: l.items.map((i) => (i.id === itemId ? { ...i, name } : i)),
    }));
    await persist(updated);
  }, [lists]);

  const deleteListItem = useCallback(async (listId: string, itemId: string) => {
    const updated = lists.map((l) =>
      l.id === listId ? { ...l, items: l.items.filter((i) => i.id !== itemId) } : l,
    );
    await persist(updated);

    try {
      await deleteItemApi(itemId);
    } catch {
      loadLists();
    }
  }, [lists, loadLists]);

  return { lists, loading, addList, toggleItem, deleteList, addListItem, renameListItem, deleteListItem, loadLists };
}
