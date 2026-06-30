import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import type { SavingsGoal } from '../types';

function formatNaira(amount: string) {
  const num = parseFloat(amount);
  return '₦' + num.toLocaleString('en-NG');
}

type SavingsGoalCardProps = {
  goal: SavingsGoal;
  onPress: (goal: SavingsGoal) => void;
  onDelete: (id: string) => void;
};

export default function SavingsGoalCard({ goal, onPress, onDelete }: SavingsGoalCardProps) {
  const target = parseFloat(goal.target_amount);
  const current = parseFloat(goal.current_amount);
  const percent = target > 0 ? Math.min(Math.round((current / target) * 100), 100) : 0;

  const renderRightActions = (_progress: Animated.AnimatedInterpolation<number>) => (
    <Animated.View style={styles.deleteAction}>
      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => onDelete(goal.id)}
        activeOpacity={0.8}
      >
        <Ionicons name="trash-outline" size={22} color="#FFF" />
        <Text style={styles.deleteBtnText}>Delete</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <Swipeable renderRightActions={renderRightActions} overshootRight={false}>
      <TouchableOpacity style={styles.card} onPress={() => onPress(goal)} activeOpacity={0.7}>
        <View style={styles.cardTop}>
          <Text style={styles.title}>{goal.title}</Text>
          <Ionicons name="chevron-forward" size={18} color="#9C7349" />
        </View>

        <View style={styles.amountRow}>
          <View>
            <Text style={styles.currentAmount}>{formatNaira(goal.current_amount)}</Text>
            <Text style={styles.targetText}>of {formatNaira(goal.target_amount)}</Text>
          </View>
          <Text style={styles.percent}>{percent}%</Text>
        </View>

        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${percent}%` }]} />
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(244,140,37,0.06)',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C140D',
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  currentAmount: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1C140D',
    letterSpacing: -0.3,
  },
  targetText: {
    fontSize: 12,
    color: '#9C7349',
    fontWeight: '500',
    marginTop: 2,
  },
  percent: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F48C25',
  },
  progressTrack: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(244,140,37,0.12)',
    borderRadius: 99,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#F48C25',
    borderRadius: 99,
  },
  deleteAction: {
    backgroundColor: '#DA3D20',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    width: 80,
    marginBottom: 12,
    borderRadius: 14,
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
});
