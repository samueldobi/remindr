export type TaskStatus = 'urgent' | 'pending' | 'in_progress';

export type HouseholdTask = {
  id: string;
  title: string;
  category: string;
  status: TaskStatus;
  completed: boolean;
  createdAt: string;
};
