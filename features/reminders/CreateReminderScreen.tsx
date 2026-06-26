import { View, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useReminders } from './hooks/useReminders';
import CreateReminderForm from './components/CreateReminderForm';

export default function CreateReminderScreen() {
  const router = useRouter();
  const { addReminder } = useReminders();

  const handleSubmit = async (data: { title: string; dueDate: string; dueTime: string; category: string }) => {
    try {
      await addReminder({
        title: data.title,
        dueDate: data.dueDate,
        dueTime: data.dueTime,
        category: data.category,
      });
      router.back();
    } catch {
      Alert.alert('Error', 'Failed to create reminder');
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <CreateReminderForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </View>
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
  },
});
