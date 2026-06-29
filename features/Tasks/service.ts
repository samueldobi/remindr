import { apiRequest, ApiError } from '@/lib/api';
import type { Task } from './types';

export const TASKS_CACHE_KEY = '@tasks';

export async function fetchTasks(): Promise<Task[]> {
  const res = await apiRequest<{ tasks: Task[] }>('/tasks');
  return res.tasks;
}

export async function createTask(data: { title: string; category?: string }): Promise<Task> {
  const res = await apiRequest<{ task: Task }>('/tasks', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return res.task;
}

export async function deleteTask(id: string): Promise<void> {
  await apiRequest(`/tasks/${id}`, { method: 'DELETE' });
}
