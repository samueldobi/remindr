import { Task } from "@/features/home/types";
type TaskSection = {
  title: 'urgent' | 'upcoming' | 'in progress'
  data: Task[];
}

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

export const taskSections:TaskSection[] = [
  {
    title: 'urgent',
    data: [
      {
        id: '1',
        name: 'Pay electricity bill',
        dueDate: '2025-01-15',
        progress: 10,
        image: require('@/assets/images/finance.webp'),
      },
      {
        id: '2',
        name: 'Renew house rent',
        dueDate: '2025-01-15',
        progress: 0,
        image: require('@/assets/images/personal.webp'),
      },
      {
        id: '3',
        name: 'Buy cooking gas',
        dueDate: '2025-01-16',
        progress: 30,
        image: require('@/assets/images/personal.webp'),
      },
      {
        id: '4',
        name: 'Car servicing payment',
        dueDate: '2025-01-16',
        progress: 20,
        image: require('@/assets/images/work.webp'),
      },
      {
        id: '5',
        name: 'Hospital appointment fee',
        dueDate: '2025-01-17',
        progress: 0,
        image: require('@/assets/images/health.webp'),
      },
      {
        id: '6',
        name: 'Internet subscription renewal',
        dueDate: '2025-01-17',
        progress: 50,
        image: require('@/assets/images/work.webp'),
      },
    ],
  },

  {
    title: 'upcoming',
    data: [
      {
        id: '7',
        name: 'Monthly savings contribution',
        dueDate: '2025-01-20',
        progress: 0,
        image: require('@/assets/images/finance.webp'),
      },
      {
        id: '8',
        name: 'Buy groceries for the week',
        dueDate: '2025-01-21',
        progress: 15,
        image: require('@/assets/images/personal.webp'),
      },
      {
        id: '9',
        name: 'Pay water bill',
        dueDate: '2025-01-22',
        progress: 0,
        image: require('@/assets/images/personal.webp'),
      },
      {
        id: '10',
        name: 'Fuel car for next week',
        dueDate: '2025-01-22',
        progress: 40,
        image: require('@/assets/images/work.webp'),
      },
      {
        id: '11',
        name: 'School fees installment',
        dueDate: '2025-01-23',
        progress: 25,
        image: require('@/assets/images/school.webp'),
      },
      {
        id: '12',
        name: 'Buy household cleaning supplies',
        dueDate: '2025-01-24',
        progress: 10,
        image: require('@/assets/images/personal.webp'),
      },
      {
        id: '13',
        name: 'Pharmacy restock',
        dueDate: '2025-01-25',
        progress: 0,
        image: require('@/assets/images/health.webp'),
      },
    ],
  },

  {
    title: 'in progress',
    data: [
      {
        id: '14',
        name: 'January rent savings',
        dueDate: '2025-01-30',
        progress: 60,
        image: require('@/assets/images/finance.webp'),
      },
      {
        id: '15',
        name: 'Emergency fund savings',
        dueDate: '2025-02-01',
        progress: 45,
        image: require('@/assets/images/finance.webp'),
      },
      {
        id: '16',
        name: 'Kitchen renovation planning',
        dueDate: '2025-02-05',
        progress: 35,
        image: require('@/assets/images/personal.webp'),
      },
      {
        id: '17',
        name: 'Car insurance renewal',
        dueDate: '2025-02-07',
        progress: 50,
        image: require('@/assets/images/work.webp'),
      },
      {
        id: '18',
        name: 'Meal planning for the month',
        dueDate: '2025-02-10',
        progress: 70,
        image: require('@/assets/images/personal.webp'),
      },
      {
        id: '19',
        name: 'Health checkup budget',
        dueDate: '2025-02-12',
        progress: 40,
        image: require('@/assets/images/health.webp'),
      },
      {
        id: '20',
        name: 'Utility bills budget tracking',
        dueDate: '2025-02-15',
        progress: 55,
        image: require('@/assets/images/finance.webp'),
      },
    ],
  },
];
