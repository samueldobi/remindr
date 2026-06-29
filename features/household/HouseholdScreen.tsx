import { useState, useCallback } from 'react';
import { View, ScrollView, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';

import AppHeader from '@/components/AppHeader';
import AppDrawer from '@/components/AppDrawer';
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
import CreateBillForm from '@/features/bills/components/CreateBillForm';
import { useBills } from '@/features/bills/hooks/useBills';

type FormMode = 'task' | 'shopping' | 'bill' | null;

export default function HouseholdScreen() {
  const { tasks, addTask, markDone, deleteTask, loadTasks } = useHouseholdTasks();
  const { lists, addList, toggleItem, loadLists } = useShoppingLists();
  const { bills, addBill, togglePaid, loadBills } = useBills();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Tasks');
  const [formMode, setFormMode] = useState<FormMode>(null);
  const [selectedList, setSelectedList] = useState<ShoppingList | null>(null);

  useFocusEffect(
    useCallback(() => {
      loadTasks();
      loadLists();
      loadBills();
    }, [])
  );

  const handleFABPress = () => {
    if (activeTab === 'Tasks') {
      setFormMode('task');
    } else if (activeTab === 'Shopping') {
      setFormMode('shopping');
    } else if (activeTab === 'Bills') {
      setFormMode('bill');
    }
  };

  const handleTaskSubmit = async (data: { title: string; category: string }) => {
    try {
      await addTask({ title: data.title, category: data.category });
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

  const handleBillSubmit = async (data: { name: string; amount: number; category: string; dueDate: string; dueTime: string }) => {
    try {
      await addBill(data);
      setFormMode(null);
    } catch {
      Alert.alert('Error', 'Failed to create bill');
    }
  };

  const renderContent = () => {
    if (formMode === 'task') {
      return <CreateTaskForm onSubmit={handleTaskSubmit} onCancel={() => setFormMode(null)} />;
    }

    if (formMode === 'shopping') {
      return <CreateShoppingForm onSubmit={handleShoppingSubmit} onCancel={() => setFormMode(null)} />;
    }

    if (formMode === 'bill') {
      return <CreateBillForm onSubmit={handleBillSubmit} onCancel={() => setFormMode(null)} />;
    }

    if (activeTab === 'Tasks') {
      return <ActiveTasks tasks={tasks} onMarkDone={markDone} onDeleteTask={deleteTask} />;
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

    if (activeTab === 'Bills') {
      return <Bills bills={bills} onToggle={togglePaid} />;
    }

    return null;
  };

  const isDetailView = activeTab === 'Shopping' && !!selectedList;
  const needsScrollView = !formMode && !isDetailView;

  return (
    <>
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <AppHeader title="Household Board" onMenuPress={() => setDrawerOpen(true)} />

          {!formMode && (
            <SegmentedControl activeTab={activeTab} onTabChange={(tab: string) => {
              setActiveTab(tab);
              setSelectedList(null);
            }} />
          )}

          {needsScrollView ? (
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {renderContent()}
            </ScrollView>
          ) : (
            <View style={styles.scrollContent}>
              {renderContent()}
            </View>
          )}

          {!formMode && !selectedList && <FAB onPress={handleFABPress} />}
        </View>
      </SafeAreaView>

      <AppDrawer visible={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
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
