import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SAVINGS_DATA = {
  label: 'Family Vacation ✈️',
  target: 500000,
  current: 320500,
};

function formatNaira(amount) {
  return '₦' + amount.toLocaleString('en-NG');
}

export default function JointSavings() {
  const { label, target, current } = SAVINGS_DATA;
  const percent = Math.round((current / target) * 100);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Joint Savings</Text>

      <View style={styles.card}>
        {/* Decorative bg text */}
        <Text style={styles.bgDecor}>💰</Text>

        {/* Top row */}
        <View style={styles.topRow}>
          <Text style={styles.goalLabel}>{label}</Text>
          <View style={styles.targetBadge}>
            <Text style={styles.targetText}>Target: {formatNaira(target)}</Text>
          </View>
        </View>

        {/* Amount + percent */}
        <View style={styles.amountRow}>
          <Text style={styles.amount}>{formatNaira(current)}</Text>
          <Text style={styles.percent}>{percent}%</Text>
        </View>

        {/* Progress bar */}
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${percent}%` }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#1C140D',
    letterSpacing: -0.3,
    marginBottom: 14,
  },
  card: {
    backgroundColor: '#F48C25',
    borderRadius: 16,
    padding: 20,
    overflow: 'hidden',
    shadowColor: '#F48C25',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  bgDecor: {
    position: 'absolute',
    right: -10,
    top: -10,
    fontSize: 90,
    opacity: 0.12,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  goalLabel: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    fontWeight: '600',
  },
  targetBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 99,
  },
  targetText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  amount: {
    color: '#FFF',
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  percent: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    fontWeight: '700',
  },
  progressTrack: {
    width: '100%',
    height: 10,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 99,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 99,
  },
});
