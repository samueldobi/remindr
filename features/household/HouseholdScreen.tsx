import { useState, useCallback } from 'react';
import { View, ScrollView, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';

import Header from './components/Header';
import SegmentedControl from './components/SegmentedControl';
import FAB from './components/FAB';

import ActiveTasks from '@/features/tasks/components/ActiveTasks';
import CreateTaskForm from '@/features/tasks/components/CreateTaskForm';
import { useHouseholdTasks } from '@/features/tasks/hooks/useHouseholdTasks';

import ShoppingLists from '@/features/shopping/components/ShoppingLists';
import ShoppingListDetail from '@/features/shopping/components/ShoppingListDetail';
import CreateShoppingForm from '@/features/shopping/components/CreateShoppingForm';
import { useShoppingLists } from '@/features/shopping/hooks/useShoppingLists';
import type { ShoppingList } from '@/features/shopping/types';

import Bills from '@/features/bills/components/Bills';

type FormMode = 'task' | 'shopping' | null;

export default function HouseholdScreen() {
  const { tasks, addTask, markDone, loadTasks } = useHouseholdTasks();
  const { lists, addList, toggleItem, loadLists } = useShoppingLists();

  const [activeTab, setActiveTab] = useState('Tasks');
  const [formMode, setFormMode] = useState<FormMode>(null);
  const [selectedList, setSelectedList] = useState<ShoppingList | null>(null);

  useFocusEffect(
    useCallback(() => {
      loadTasks();
      loadLists();
    }, [])
  );

  const handleFABPress = () => {
    if (activeTab === 'Tasks') {
      setFormMode('task');
    } else if (activeTab === 'Shopping') {
      setFormMode('shopping');
    }
  };

  const handleTaskSubmit = async (data: { title: string; category: string; status: string }) => {
    try {
      await addTask({
        title: data.title,
        category: data.category,
        status: data.status as 'urgent' | 'pending' | 'in_progress',
      });
      setFormMode(null);
    } catch {
      Alert.alert('Error', 'Failed to create task');
    }
  };

  const handleShoppingSubmit = async (title: string, items: string[]) => {
    try {
      await addList(title, items.map(name => ({ name })));
      setFormMode(null);
    } catch {
      Alert.alert('Error', 'Failed to create shopping list');
    }
  };

  const renderContent = () => {
    if (formMode === 'task') {
      return <CreateTaskForm onSubmit={handleTaskSubmit} onCancel={() => setFormMode(null)} />;
    }

    if (formMode === 'shopping') {
      return <CreateShoppingForm onSubmit={handleShoppingSubmit} onCancel={() => setFormMode(null)} />;
    }

    if (activeTab === 'Tasks') {
      return <ActiveTasks tasks={tasks} onMarkDone={markDone} />;
    }

    if (activeTab === 'Shopping') {
      if (selectedList) {
        return (
          <ShoppingListDetail
            list={selectedList}
            onToggle={toggleItem}
            onBack={() => setSelectedList(null)}
          />
        );
      }
      return <ShoppingLists lists={lists} onSelect={setSelectedList} />;
    }

    return <Bills />;
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Header onMenuPress={() => {}} />

        {!formMode && (
          <SegmentedControl activeTab={activeTab} onTabChange={(tab) => {
            setActiveTab(tab);
            setSelectedList(null);
          }} />
        )}

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {renderContent()}
        </ScrollView>

        {!formMode && !selectedList && <FAB onPress={handleFABPress} />}
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
    backgroundColor: '#F8F7F5',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
    flexGrow: 1,
  },
});
