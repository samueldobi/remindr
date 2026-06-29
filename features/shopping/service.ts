import { apiRequest } from '@/lib/api';
import type { ShoppingList } from './types';

export const SHOPPING_CACHE_KEY = '@shopping_lists';

export async function fetchLists(): Promise<ShoppingList[]> {
  const res = await apiRequest<{ lists: ShoppingList[] }>('/shopping-lists');
  return res.lists;
}

export async function createList(title: string): Promise<ShoppingList> {
  const res = await apiRequest<{ list: ShoppingList }>('/shopping-lists', {
    method: 'POST',
    body: JSON.stringify({ title }),
  });
  return res.list;
}

export async function deleteList(id: string): Promise<void> {
  await apiRequest(`/shopping-lists/${id}`, { method: 'DELETE' });
}
