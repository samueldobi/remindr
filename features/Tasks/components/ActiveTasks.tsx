import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import type { Task } from '../types';

function TaskCard({
  task,
  onMarkDone,
  onDelete,
}: {
  task: Task;
  onMarkDone: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
  ) => {
    const translateX = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [80, 0],
    });

    return (
      <Animated.View style={[styles.deleteAction, { transform: [{ translateX }] }]}>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => onDelete(task.id)}
          activeOpacity={0.8}
        >
          <Ionicons name="trash-outline" size={22} color="#FFF" />
          <Text style={styles.deleteBtnText}>Delete</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions} overshootRight={false}>
      <View style={[styles.card, task.completed && styles.cardDone]}>
        <View style={styles.cardTop}>
          <View style={styles.cardInfo}>
            <View style={styles.categoryRow}>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{task.category}</Text>
              </View>
              {task.completed && <Text style={styles.completedTag}>Done</Text>}
            </View>
            <Text style={[styles.taskTitle, task.completed && styles.taskTitleDone]}>
              {task.title}
            </Text>
          </View>

          {task.completed ? (
            <View style={styles.doneBadge}>
              <Text style={styles.doneBtnText}>✓</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.doneBtn}
              onPress={() => onMarkDone(task.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.doneBtnText}>Mark Done</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Swipeable>
  );
}

type ActiveTasksProps = {
  tasks: Task[];
  onMarkDone: (id: string) => void;
  onDeleteTask: (id: string) => void;
};

export default function ActiveTasks({ tasks, onMarkDone, onDeleteTask }: ActiveTasksProps) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Tasks</Text>
        <View style={styles.pendingBadge}>
          <Text style={styles.pendingText}>{tasks.length} Total</Text>
        </View>
      </View>

      {tasks.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No tasks yet</Text>
          <Text style={styles.emptySubtext}>Tap + to create one</Text>
        </View>
      ) : (
        tasks.map(task => (
          <TaskCard key={task.id} task={task} onMarkDone={onMarkDone} onDelete={onDeleteTask} />
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
    gap: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(244,140,37,0.06)',
  },
  cardDone: {
    opacity: 0.6,
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
  doneBtn: {
    backgroundColor: '#F48C25',
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  doneBtnText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
  },
  doneBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#16A34A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteAction: {
    backgroundColor: '#DA3D20',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    width: 80,
  },
  deleteBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    
  },
  deleteBtnText: {
    color: '#FFF',
    fontSize: 11,
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
