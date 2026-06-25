import { StyleSheet, Button , View, Image, 
  TouchableWithoutFeedback, Keyboard,
  TouchableOpacity} from 'react-native';
import DailyOverview from './components/DailyOverview';
import UpcomingReminders from './components/UpcomingReminders';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {  useState } from 'react';
import { Text } from '@/components/Themed';
import { homeStyles as styles } from './styles';
import { Drawer } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';



export default function HomeScreenTab() {
  const router =  useRouter();
  const [query, setQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
  <SafeAreaView style={{ flex: 1, marginBottom: 0, backgroundColor: '#F8F7F5' }}>
    <View style={styles.container}>
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

      
        </View>
      </TouchableWithoutFeedback>

      {/* Daily Overview */}
      <DailyOverview/>
      <UpcomingReminders/>
      

      {/* Due Tasks */}
      <View style={[styles.taskContainer, { flex: 1 }]}>
        <Text style={[styles.headerTitle, {textAlign:'center', marginTop:7,}]}>Ongoing Reminders</Text>
       
      </View>
    </View>
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