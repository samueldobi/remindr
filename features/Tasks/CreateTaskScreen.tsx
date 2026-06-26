import { View, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useHouseholdTasks } from './hooks/useHouseholdTasks';
import CreateTaskForm from './components/CreateTaskForm';

export default function CreateTaskScreen() {
  const router = useRouter();
  const { addTask } = useHouseholdTasks();

  const handleSubmit = async (data: { title: string; category: string; status: string }) => {
    try {
      await addTask({
        title: data.title,
        category: data.category,
        status: data.status as 'urgent' | 'pending' | 'in_progress',
      });
      router.back();
    } catch {
      Alert.alert('Error', 'Failed to create task');
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <CreateTaskForm onSubmit={handleSubmit} onCancel={handleCancel} />
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
