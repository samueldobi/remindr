import { StyleSheet, Button , View, Image, 
  TouchableWithoutFeedback, Keyboard,
   Pressable,ScrollView, FlatList,SectionList , TouchableOpacity} from 'react-native';
import DailyOverview from './components/DailyOverview';
import UpcomingReminders from './components/UpcomingReminders';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Searchbar } from 'react-native-paper';
import {  useState } from 'react';
import { categories } from '@/constants/Categories';
import { tasks , taskSections} from '@/constants/Tasks';
import { Text, View as ThemedView  } from '@/components/Themed';
import { homeStyles as styles } from './styles';
import TaskItem from './TaskItem';
import { Drawer } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';



export default function HomeScreenTab() {
  const router =  useRouter();
  const [query, setQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
  <SafeAreaView style={{ flex: 1, marginBottom: 0 }}>
    <ThemedView style={styles.container}>
      {/*  Header View */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
          <View style={styles.headerView}>
            <View>
              <Text style={styles.headerTitle}>Welcome Julia</Text>
              {/* <Text style={styles.headerSubtitle}>8 pending bills</Text> */}
            </View>
            <View>
              <TouchableOpacity onPress={() => setDrawerOpen(true)}>
                <Image
                  source={require('../../assets/images/woman.png')}
                  style={styles.headerImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Searchbar View */}
          {/* <View>
            <Searchbar
              placeholder="Search reminder"
              onChangeText={setQuery}
              value={query}
              style={styles.searchBar}
              onBlur={() => Keyboard.dismiss()}
            />
          </View> */}
        </View>
      </TouchableWithoutFeedback>

      {/* Daily Overview */}
      <DailyOverview/>
      <UpcomingReminders/>
      {/* Categories View */}
      {/* <View style={styles.categoriesBox}>
        <Text style={styles.headerTitle}> Categories </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          nestedScrollEnabled={true}
        >
          {categories.map((category) => (
            <Pressable style={styles.card} key={category.id}>
              <Text style={styles.cardText}>{category.name}</Text>
              <Text style={styles.subtitle}>
                {category.taskCount} tasks
              </Text>
              <Image source={category.image} style={styles.categoryImage} />
            </Pressable>
          ))}
        </ScrollView>
      </View> */}


      {/* Due Tasks */}
      <View style={[styles.taskContainer, { flex: 1 }]}>
        <Text style={[styles.headerTitle, {textAlign:'center', marginTop:7,}]}>Ongoing Reminders</Text>
        {/* <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 5 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled={true}
          renderItem={({ item }) => <TaskItem item={item} />}
        /> */}

        {/* <SectionList
        sections={taskSections}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderSectionHeader={({section})=>(
            <Text style={[styles.headerTitle, {backgroundColor:'#fff'}]}>
                {section.title.charAt(0).toUpperCase() + section.title.slice(1).toLowerCase()}
                </Text>
        )}
        renderItem={({item})=> <TaskItem item={item}/>}

        /> */}
      </View>
    </ThemedView>
  </SafeAreaView>

  {/* Drawer */}
  {drawerOpen && (
    <>
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={() => setDrawerOpen(false)}
      />

      <View style={styles.drawer}>
        <Drawer.Section style={{ marginTop: 50 }}>
          <Text style={{ marginLeft: 16, marginBottom: 10, fontWeight: 'bold', fontSize: 20, color:'white'}}>
            Menu
          </Text>

            {/* Drawer Items */}
            <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => {
                setDrawerOpen(false);
                router.push('/Create');
            }}
            >
            <Ionicons name="person-sharp" size={24} color="white" style={{ marginRight: 10 }} />
            <Text style={styles.drawerItemText}>Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.drawerItem}
            onPress={()=>{
                setDrawerOpen(false);
                router.push('/Settings');
            }}
            >
                <Ionicons name="settings-sharp" size={24} color="white" style={{ marginRight: 10 }} />
                <Text style={styles.drawerItemText}>Settings</Text>
            </TouchableOpacity>

           <TouchableOpacity
            style={styles.drawerItem}
            onPress={()=>{
                setDrawerOpen(false);
                router.push('/Settings');
            }}
            >
                <Ionicons name="log-out-sharp" size={24} color="white" style={{ marginRight: 10 }} />
                <Text style={styles.drawerItemText}>Logout</Text>
            </TouchableOpacity>
            
        </Drawer.Section>
      </View>
    </>
  )}
</>
  );
}