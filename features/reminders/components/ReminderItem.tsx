import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Reminder } from '../types';

type ReminderItemProps = {
  item: Reminder;
  onToggle: (id: string) => void;
};

export default function ReminderItem({ item, onToggle }: ReminderItemProps) {
  const dateObj = new Date(`${item.dueDate}T${item.dueTime}`);
  const formattedDate = dateObj.toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'short',
  });
  const formattedTime = dateObj.toLocaleTimeString('en-NG', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onToggle(item.id)}
      activeOpacity={0.7}
    >
      <TouchableOpacity
        style={[styles.checkbox, item.completed && styles.checkboxDone]}
        onPress={() => onToggle(item.id)}
      >
        {item.completed && <Ionicons name="checkmark" size={16} color="#FFF" />}
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={[styles.title, item.completed && styles.titleDone]}>
          {item.title}
        </Text>
        <View style={styles.meta}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.category}</Text>
          </View>
          <Text style={styles.dateText}>{formattedDate} • {formattedTime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
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
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: '#D0D0D0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxDone: {
    backgroundColor: '#F48C25',
    borderColor: '#F48C25',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1C140D',
    marginBottom: 4,
  },
  titleDone: {
    color: '#9C7349',
    textDecorationLine: 'line-through',
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    backgroundColor: 'rgba(244,140,37,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 99,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#F48C25',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  dateText: {
    fontSize: 11,
    color: '#9C7349',
    fontWeight: '500',
  },
});
