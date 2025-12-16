import { Task } from "@/features/home/types";

export const tasks: Task[] = [
  {
    id: '1',
    name: 'Finish UI design',
    dueDate: '2025-01-20',
    progress: 75,
    image: require('@/assets/images/personal.webp'),
  },
  {
    id: '2',
    name: 'Prepare presentation',
    dueDate: '2025-01-18',
    progress: 40,
    image: require('@/assets/images/school.webp'),
  },
  {
    id: '3',
    name: 'Workout session',
    dueDate: '2025-01-16',
    progress: 90,
    image: require('@/assets/images/health.webp'),
  },
  {
    id: '4',
    name: 'Budget review',
    dueDate: '2025-01-22',
    progress: 20,
    image: require('@/assets/images/finance.webp'),
  },
  {
    id: '5',
    name: 'Read product specs',
    dueDate: '2025-01-25',
    progress: 55,
    image: require('@/assets/images/work.webp'),
  },
];