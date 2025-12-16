import { StyleSheet, Button , View, Image, 
  TouchableWithoutFeedback, Keyboard,
   Pressable,ScrollView, FlatList} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Searchbar } from 'react-native-paper';
import { useCallback, useState } from 'react';
import { categories } from '@/constants/Categories';
import { tasks } from '@/constants/Tasks';
import { Text, View as ThemedView  } from '@/components/Themed';
import { homeStyles as styles } from './styles';
import TaskItem from './TaskItem';



export default function HomeScreenTab() {
  const router =  useRouter();
  const [query, setQuery] = useState('');
//   const renderTask = useCallback(({ item }) => (
//   <View style={styles.taskCard}>
//     <Image source={item.image} style={styles.image} />
//     <View style={styles.cardContent}>
//       <Text style={styles.taskName}>{item.name}</Text>
//       <Text style={styles.taskDue}>Due: {item.dueDate}</Text>
//       <View style={styles.progressBarBackground}>
//         <View
//           style={[
//             styles.progressBarFill,
//             { width: `${item.progress}%` },
//           ]}
//         />
//       </View>
//       <Text style={styles.progressText}>{item.progress}% completed</Text>
//     </View>
//   </View>
// ), []);
  return (
    <SafeAreaView style={{ flex: 1,}}>
    
      <ThemedView style={styles.container}>
        {/*  Header View */}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View>
                      <View style={styles.headerView}>
                <View>
                  <Text style={styles.headerTitle}>Welcome Julia</Text>
                  <Text style={styles.headerSubtitle}>8 pending bills</Text>
                </View>
                <View>
                  <Image
                  source={require('../../assets/images/woman.png')}
                  style={styles.headerImage}
                  resizeMode="contain"
                  />

                </View>
              </View>

              {/* Searchbar View */}
              <View>
                  <Searchbar
                placeholder="Search  reminder"
                onChangeText={setQuery}
                value={query}
                style={styles.searchBar}
                onBlur={() => Keyboard.dismiss()} 
              />
              </View>
            </View>
      
        </TouchableWithoutFeedback>

        {/* Categories View */}
        <View style = {styles.categoriesBox}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            nestedScrollEnabled={true} 
          >
            {categories.map((category)=>(
              <Pressable  style={styles.card}
              key={category.id}
              >
                <Text style={styles.cardText}>{category.name}</Text>
                 <Text style={styles.subtitle}>
                {category.taskCount} tasks
              </Text>
                <Image source={category.image} style={styles.categoryImage}
                />
              </Pressable>
            ))}
          </ScrollView>
        </View>
        {/* Due Tasks */}
        <View style={[styles.taskContainer, {flex:1,}]}>
          <Text style={styles.taskHeader}>
            Ongoing Tasks
          </Text>
          <FlatList
            data={tasks}
            keyExtractor={(item)=>item.id}  
            contentContainerStyle={{ paddingBottom: 5 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled={true} 
            renderItem={({ item }) => <TaskItem item={item} />}
          /> 
          </View>
      </ThemedView>
   
    </SafeAreaView>
  );
}