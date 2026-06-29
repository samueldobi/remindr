import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import type { ShoppingList, ShoppingItem } from '../types';

type ListWithItems = ShoppingList & { items: ShoppingItem[] };

type ShoppingListsProps = {
  lists: ListWithItems[];
  onSelect: (list: ListWithItems) => void;
  onDeleteList: (id: string) => void;
};

function ListCard({
  list,
  onSelect,
  onDelete,
}: {
  list: ListWithItems;
  onSelect: (list: ListWithItems) => void;
  onDelete: (id: string) => void;
}) {
  const bought = list.items.filter((i) => i.bought).length;
  const total = list.items.length;

  const renderRightActions = (_progress: Animated.AnimatedInterpolation<number>) => (
    <Animated.View style={styles.deleteAction}>
      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => onDelete(list.id)}
        activeOpacity={0.8}
      >
        <Ionicons name="trash-outline" size={22} color="#FFF" />
        <Text style={styles.deleteBtnText}>Delete</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <Swipeable renderRightActions={renderRightActions} overshootRight={false}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => onSelect(list)}
        activeOpacity={0.7}
      >
        <View style={styles.cardLeft}>
          <Text style={styles.cardTitle}>{list.title}</Text>
          <Text style={styles.cardMeta}>
            {bought} / {total} items bought
          </Text>
        </View>
        <View style={styles.cardRight}>
          <View style={styles.progressCircle}>
            <Text style={styles.progressText}>
              {total > 0 ? Math.round((bought / total) * 100) : 0}%
            </Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
}

export default function ShoppingLists({ lists, onSelect, onDeleteList }: ShoppingListsProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Shopping Lists</Text>

      {lists.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No shopping lists yet</Text>
          <Text style={styles.emptySubtext}>Tap + to create one</Text>
        </View>
      ) : (
        lists.map((list) => (
          <ListCard key={list.id} list={list} onSelect={onSelect} onDelete={onDeleteList} />
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#1C140D',
    letterSpacing: -0.3,
    marginBottom: 14,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(244,140,37,0.06)',
  },
  cardLeft: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C140D',
    marginBottom: 4,
  },
  cardMeta: {
    fontSize: 12,
    color: '#9C7349',
    fontWeight: '500',
  },
  cardRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(244,140,37,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#F48C25',
  },
  chevron: {
    fontSize: 22,
    color: '#9C7349',
    fontWeight: '300',
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
