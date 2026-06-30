import { View, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import DailyOverview from './components/DailyOverview';
import UpcomingReminders from './components/UpcomingReminders';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Text } from '@/components/Themed';
import { homeStyles as styles } from './styles';
import AppHeader from '@/components/AppHeader';
import AppDrawer from '@/components/AppDrawer';

export default function HomeScreenTab() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <SafeAreaView edges={['top']} style={{ flex: 1, marginBottom: 0, backgroundColor: '#F8F7F5' }}>
        <AppHeader title="Remindr" onMenuPress={() => setDrawerOpen(true)} showAvatar={false} />
        <ScrollView style={{ flex: 1, backgroundColor: '#F8F7F5', padding: 10 }} contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start' }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View>
              <View style={styles.headerView}>
                <View>
                  <Text style={styles.headerTitle}>Welcome Julia</Text>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>

          <DailyOverview />
          <UpcomingReminders />

          <View style={[styles.taskContainer, { flex: 1 }]}>
            <Text style={[styles.headerTitle, { textAlign: 'center', marginTop: 7 }]}>
              Ongoing Reminders
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>

      <AppDrawer visible={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
