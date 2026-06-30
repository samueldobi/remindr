import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Circle } from 'react-native-svg';
import type { Task } from '@/features/tasks/types';

const ACCENT = '#F48C25';

function CircularProgress({ completed, total, size = 90, strokeWidth = 7 }: { completed: number; total: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = total > 0 ? completed / total : 0;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <View style={styles.circleWrapper}>
      <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#F0F0F0"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={ACCENT}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
      <View style={styles.circleLabel}>
        <Text style={styles.circleCount}>{completed}/{total}</Text>
        <Text style={styles.circleSub}>tasks</Text>
      </View>
    </View>
  );
}

function Checkbox({ done, label }: { done: boolean; label: string }) {
  return (
    <View style={styles.checkRow}>
      <View style={[styles.checkbox, done && styles.checkboxDone]}>
        {done && <Text style={styles.tick}>✓</Text>}
      </View>
      <Text style={[styles.taskLabel, done && styles.taskLabelDone]}>{label}</Text>
    </View>
  );
}

type DailyOverviewProps = {
  tasks: Task[];
};

export default function DailyOverview({ tasks }: DailyOverviewProps) {
  const router = useRouter();
  const displayTasks = tasks.slice(0, 5);
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;

  return (
    <View style={styles.card}>
      <Text style={styles.header}>Today's Overview</Text>

      <View style={styles.row}>
        <View style={styles.taskList}>
          {displayTasks.map(task => (
            <Checkbox key={task.id} done={task.completed} label={task.title} />
          ))}
        </View>

        <CircularProgress completed={completedTasks} total={totalTasks} />
      </View>

      <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => router.push('/tasks')}>
        <Text style={styles.buttonText}>View All Tasks</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  header: {
    fontSize: 18,
    fontWeight: '700',
    color: ACCENT,
    marginBottom: 20,
    letterSpacing: 0.3,
  },

  // Two-column row
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  // Task list
  taskList: {
    flex: 1,
    gap: 12,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#D0D0D0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDone: {
    borderColor: ACCENT,
    backgroundColor: '#FFF5EA',
  },
  tick: {
    color: ACCENT,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 16,
  },
  taskLabel: {
    fontSize: 13,
    color: '#666',
    flexShrink: 1,
  },
  taskLabelDone: {
    color: '#999',
    textDecorationLine: 'line-through',
  },

  // Circular progress
  circleWrapper: {
    width: 90,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },
  circleLabel: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleCount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
  },
  circleSub: {
    fontSize: 10,
    color: '#999',
    marginTop: 1,
  },

  // Button
  button: {
    backgroundColor: ACCENT,
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
});