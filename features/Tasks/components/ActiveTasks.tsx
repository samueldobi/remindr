import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const INITIAL_TASKS = [
  {
    id: '1',
    category: 'Urgent • Utilities',
    categoryColor: '#EA580C',
    title: 'Buy Fuel for Gen ⛽',
    assignee: 'Tunde',
    avatarUri: 'https://i.pravatar.cc/150?img=3',
    status: 'Pending',
    statusColor: '#D97706',
    statusBg: '#FEF3C7',
    showRemind: true,
  },
  {
    id: '2',
    category: 'Finance • Monthly',
    categoryColor: '#2563EB',
    title: 'Pay NEPA Bill 💡',
    assignee: 'Chioma',
    avatarUri: 'https://i.pravatar.cc/150?img=47',
    status: 'In Progress',
    statusColor: '#2563EB',
    statusBg: '#DBEAFE',
    showRemind: false,
  },
];

function TaskCard({ task, onMarkDone, onRemind, onUpdateStatus }) {
  return (
    <View style={styles.card}>
      {/* Top row */}
      <View style={styles.cardTop}>
        {/* Left info */}
        <View style={styles.cardInfo}>
          <Text style={[styles.category, { color: task.categoryColor }]}>
            {task.category}
          </Text>
          <Text style={styles.taskTitle}>{task.title}</Text>

          {/* Assignee */}
          <View style={styles.assigneeRow}>
            <Image source={{ uri: task.avatarUri }} style={styles.assigneeAvatar} />
            <Text style={styles.assigneeText}>Assigned to {task.assignee}</Text>
          </View>
        </View>

        {/* Status badge */}
        <View style={[styles.statusBadge, { backgroundColor: task.statusBg }]}>
          <Text style={[styles.statusText, { color: task.statusColor }]}>
            {task.status}
          </Text>
        </View>
      </View>

      {/* Action buttons */}
      {task.showRemind ? (
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.remindBtn}
            onPress={() => onRemind(task.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.remindBtnText}>Remind</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.doneBtn}
            onPress={() => onMarkDone(task.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.doneBtnText}>Done</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.updateBtn}
          onPress={() => onUpdateStatus(task.id)}
          activeOpacity={0.7}
        >
          <Text style={styles.updateBtnText}>Update Status</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default function ActiveTasks() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const handleMarkDone = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleRemind = (id) => {
    // remind logic placeholder
    console.log('Reminded task:', id);
  };

  const handleUpdateStatus = (id) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id
          ? { ...t, status: 'Done', statusColor: '#16A34A', statusBg: '#DCFCE7', showRemind: false }
          : t
      )
    );
  };

  return (
    <View style={styles.section}>
      {/* Section header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Active Tasks</Text>
        <View style={styles.pendingBadge}>
          <Text style={styles.pendingText}>{tasks.length} Pending</Text>
        </View>
      </View>

      {tasks.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>🎉 All tasks are done!</Text>
        </View>
      ) : (
        tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onMarkDone={handleMarkDone}
            onRemind={handleRemind}
            onUpdateStatus={handleUpdateStatus}
          />
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

  // Card
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
  category: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  taskTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1C140D',
    marginTop: 2,
  },
  assigneeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  assigneeAvatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#EEE',
  },
  assigneeText: {
    fontSize: 11,
    color: '#9C7349',
    fontWeight: '500',
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

  // Buttons
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  remindBtn: {
    flex: 1,
    backgroundColor: 'rgba(244,140,37,0.1)',
    paddingVertical: 9,
    borderRadius: 10,
    alignItems: 'center',
  },
  remindBtnText: {
    color: '#F48C25',
    fontSize: 13,
    fontWeight: '700',
  },
  doneBtn: {
    flex: 1,
    backgroundColor: '#F48C25',
    paddingVertical: 9,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#F48C25',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  doneBtnText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
  },
  updateBtn: {
    backgroundColor: '#F8F7F5',
    paddingVertical: 9,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F4EDE7',
  },
  updateBtnText: {
    color: '#9C7349',
    fontSize: 13,
    fontWeight: '600',
  },

  // Empty state
  emptyState: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 15,
    color: '#9C7349',
    fontWeight: '600',
  },
});
