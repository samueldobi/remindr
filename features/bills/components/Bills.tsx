import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORY_ICON_MAP } from '@/constants/BillCategories';
import type { Bill } from '../types';

type BillsProps = {
  bills: Bill[];
  onToggle: (id: string) => void;
};

function formatAmount(amount: number) {
  return `₦${amount.toLocaleString()}`;
}

function formatDueDate(dateStr: string, timeStr: string) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T' + (timeStr || '12:00'));
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[d.getMonth()]} ${d.getDate()}`;
}

export default function Bills({ bills, onToggle }: BillsProps) {
  const unpaid = bills.filter(b => b.status === 'unpaid').length;
  const total = bills.length;
  const paidAmount = bills.filter(b => b.status === 'paid').length;

  return (
    <View style={styles.container}>
      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>{total}</Text>
            <Text style={styles.summaryLabel}>Total Bills</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryNumber, { color: '#16A34A' }]}>{paidAmount}</Text>
            <Text style={styles.summaryLabel}>Paid</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryNumber, { color: '#EA580C' }]}>{unpaid}</Text>
            <Text style={styles.summaryLabel}>Unpaid</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>All Bills</Text>

      {bills.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No bills yet</Text>
          <Text style={styles.emptySubtext}>Tap + to add one</Text>
        </View>
      ) : (
        bills.map(bill => (
          <TouchableOpacity
            key={bill.id}
            style={styles.billCard}
            onPress={() => onToggle(bill.id)}
            activeOpacity={0.7}
          >
            <View style={styles.billLeft}>
              <View style={[styles.iconBox, { backgroundColor: bill.status === 'paid' ? '#DCFCE7' : '#FFF5EA' }]}>
                <Ionicons
                  name={(CATEGORY_ICON_MAP[bill.category] || 'receipt-outline') as any}
                  size={22}
                  color={bill.status === 'paid' ? '#16A34A' : '#F48C25'}
                />
              </View>
              <View style={styles.billInfo}>
                <Text style={styles.billName}>{bill.name}</Text>
                <Text style={styles.billCategory}>
                  {bill.category} • Due {formatDueDate(bill.dueDate, bill.dueTime)}
                </Text>
              </View>
            </View>
            <View style={styles.billRight}>
              <Text style={[styles.billAmount, bill.status === 'paid' && styles.billAmountPaid]}>
                {formatAmount(bill.amount)}
              </Text>
              <View style={[styles.statusBadge, { backgroundColor: bill.status === 'paid' ? '#DCFCE7' : '#FEF3C7' }]}>
                <Text style={[styles.statusText, { color: bill.status === 'paid' ? '#16A34A' : '#D97706' }]}>
                  {bill.status === 'paid' ? 'Paid' : 'Unpaid'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C140D',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#9C7349',
    fontWeight: '500',
    marginTop: 2,
  },
  summaryDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(244,140,37,0.15)',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1C140D',
    marginBottom: 12,
  },
  billCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  billLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  billInfo: {
    flex: 1,
  },
  billName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C140D',
  },
  billCategory: {
    fontSize: 11,
    color: '#9C7349',
    fontWeight: '500',
    marginTop: 2,
  },
  billRight: {
    alignItems: 'flex-end',
    gap: 6,
  },
  billAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1C140D',
  },
  billAmountPaid: {
    color: '#16A34A',
    textDecorationLine: 'line-through',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 99,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  emptyState: {
    paddingVertical: 40,
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
