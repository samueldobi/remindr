import type { Category } from "@/features/home/types";
export const categories:Category[] = [
  {
    id: '1',
    name: 'Work',
    taskCount: 8,
    image: require('@/assets/images/work.webp'),
  },
  {
    id: '2',
    name: 'School',
    taskCount: 5,
    image: require('@/assets/images/school.webp'),
  },
  {
    id: '3',
    name: 'Personal',
    taskCount: 12,
    image: require('@/assets/images/personal.webp'),
  },
  {
    id: '4',
    name: 'Health',
    taskCount: 3,
    image: require('@/assets/images/health.webp'),
  },
  {
    id: '5',
    name: 'Finance',
    taskCount: 6,
    image: require('@/assets/images/finance.webp'),
  },
];
