export type Bill = {
  id: string;
  name: string;
  amount: string;
  dueDate: string;
  status: 'paid' | 'unpaid';
  category: string;
  icon: string;
};
