import { apiRequest } from '@/lib/api';
import type { ShoppingItem } from './types';

export const SHOPPING_ITEMS_CACHE_PREFIX = '@shopping_items_';

export async function fetchItems(listId: string): Promise<ShoppingItem[]> {
  const res = await apiRequest<{ items: ShoppingItem[] }>(`/shopping-lists/${listId}/items`);
  return res.items;
}

export async function addItem(listId: string, name: string): Promise<ShoppingItem> {
  const res = await apiRequest<{ item: ShoppingItem }>(`/shopping-lists/${listId}/items`, {
    method: 'POST',
    body: JSON.stringify({ name }),
  });
  return res.item;
}

export async function renameItem(itemId: string, name: string): Promise<void> {
  await apiRequest(`/shopping-lists/items/${itemId}`, {
    method: 'PATCH',
    body: JSON.stringify({ name }),
  });
}

export async function deleteItem(itemId: string): Promise<void> {
  await apiRequest(`/shopping-lists/items/${itemId}`, { method: 'DELETE' });
}
