import { View, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import DailyOverview from './components/DailyOverview';
import UpcomingReminders from './components/UpcomingReminders';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import { Text } from '@/components/Themed';
import { homeStyles as styles } from './styles';
import AppHeader from '@/components/AppHeader';
import AppDrawer from '@/components/AppDrawer';
import { useHouseholdTasks } from '@/features/tasks/hooks/useHouseholdTasks';
import { useReminders } from '@/features/reminders/hooks/useReminders';
import { useAuthStore } from '@/features/auth/store';

export default function HomeScreenTab() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { tasks, loadTasks } = useHouseholdTasks();
  const { reminders, loadReminders } = useReminders();
  const user = useAuthStore(s => s.user);

  useFocusEffect(
    useCallback(() => {
      loadTasks();
      loadReminders();
    }, [])
  );

  return (
    <>
      <SafeAreaView edges={['top']} style={{ flex: 1, marginBottom: 0, backgroundColor: '#F8F7F5' }}>
        <AppHeader title="Remindr" onMenuPress={() => setDrawerOpen(true)} showAvatar={false} />
        <ScrollView style={{ flex: 1, backgroundColor: '#F8F7F5', padding: 10 }} contentContainerStyle={{ justifyContent: 'flex-start', paddingBottom: 20 }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View>
              <View style={styles.headerView}>
                <View>
                  <Text style={styles.headerTitle}>Welcome {user?.name || 'User'}</Text>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>

          <DailyOverview tasks={tasks} />
          <UpcomingReminders reminders={reminders} />
        </ScrollView>
      </SafeAreaView>

      <AppDrawer visible={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
