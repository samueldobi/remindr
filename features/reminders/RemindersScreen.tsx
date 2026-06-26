import { useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router';
import { useReminders } from './hooks/useReminders';
import ReminderItem from './components/ReminderItem';
import FAB from '@/features/household/components/FAB';

export default function RemindersScreen() {
  const router = useRouter();
  const { reminders, loading, toggleReminder, loadReminders } = useReminders();

  useFocusEffect(
    useCallback(() => {
      loadReminders();
    }, [])
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#F48C25" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Reminders</Text>

        {reminders.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No reminders yet</Text>
            <Text style={styles.emptySubtext}>Tap + to create one</Text>
          </View>
        ) : (
          <FlatList
            data={reminders}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <ReminderItem item={item} onToggle={toggleReminder} />
            )}
          />
        )}
      </View>

      <FAB onPress={() => router.push('/create-reminder')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8F7F5',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1C140D',
    marginBottom: 16,
  },
  list: {
    paddingBottom: 80,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9C7349',
  },
  emptySubtext: {
    fontSize: 13,
    color: '#9C7349',
    marginTop: 4,
  },
});
