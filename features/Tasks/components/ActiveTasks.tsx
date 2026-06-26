import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { HouseholdTask, TaskStatus } from '../types';

const STATUS_META: Record<TaskStatus, { label: string; color: string; bg: string }> = {
  urgent: { label: 'Urgent', color: '#EA580C', bg: '#FEF3C7' },
  pending: { label: 'Pending', color: '#D97706', bg: '#FFF5EA' },
  in_progress: { label: 'In Progress', color: '#2563EB', bg: '#DBEAFE' },
};

function TaskCard({ task, onMarkDone }: { task: HouseholdTask; onMarkDone: (id: string) => void }) {
  const statusMeta = STATUS_META[task.status];

  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <View style={styles.cardInfo}>
          <View style={styles.categoryRow}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{task.category}</Text>
            </View>
            {task.completed && <Text style={styles.completedTag}>Completed</Text>}
          </View>
          <Text style={[styles.taskTitle, task.completed && styles.taskTitleDone]}>
            {task.title}
          </Text>
        </View>

        <View style={[styles.statusBadge, { backgroundColor: statusMeta.bg }]}>
          <Text style={[styles.statusText, { color: statusMeta.color }]}>
            {statusMeta.label}
          </Text>
        </View>
      </View>

      {!task.completed && (
        <TouchableOpacity
          style={styles.doneBtn}
          onPress={() => onMarkDone(task.id)}
          activeOpacity={0.8}
        >
          <Text style={styles.doneBtnText}>Mark Done</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

type ActiveTasksProps = {
  tasks: HouseholdTask[];
  onMarkDone: (id: string) => void;
};

export default function ActiveTasks({ tasks, onMarkDone }: ActiveTasksProps) {
  const activeTasks = tasks.filter(t => !t.completed);
  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Active Tasks</Text>
        <View style={styles.pendingBadge}>
          <Text style={styles.pendingText}>{activeTasks.length} Active</Text>
        </View>
      </View>

      {activeTasks.length === 0 && completedCount > 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>All tasks are done!</Text>
        </View>
      ) : activeTasks.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No tasks yet</Text>
          <Text style={styles.emptySubtext}>Tap + to create one</Text>
        </View>
      ) : (
        activeTasks.map(task => (
          <TaskCard key={task.id} task={task} onMarkDone={onMarkDone} />
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#1C140D',
    letterSpacing: -0.3,
  },
  pendingBadge: {
    backgroundColor: 'rgba(244,140,37,0.12)',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 99,
  },
  pendingText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#F48C25',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(244,140,37,0.06)',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardInfo: {
    flex: 1,
    gap: 4,
    marginRight: 10,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  categoryBadge: {
    backgroundColor: 'rgba(244,140,37,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 99,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#F48C25',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  completedTag: {
    fontSize: 10,
    fontWeight: '700',
    color: '#16A34A',
  },
  taskTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1C140D',
    marginTop: 2,
  },
  taskTitleDone: {
    color: '#9C7349',
    textDecorationLine: 'line-through',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 99,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  doneBtn: {
    backgroundColor: '#F48C25',
    paddingVertical: 9,
    borderRadius: 10,
    alignItems: 'center',
  },
  doneBtnText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
  },
  emptyState: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 15,
    color: '#9C7349',
    fontWeight: '600',
  },
  emptySubtext: {
    fontSize: 13,
    color: '#9C7349',
    marginTop: 4,
  },
});
