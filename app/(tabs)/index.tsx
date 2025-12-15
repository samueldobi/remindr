import { StyleSheet, Button , Image} from 'react-native';
import { useRouter } from 'expo-router';

// import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View  } from '@/components/Themed';

export default function TabOneScreen() {
  const router =  useRouter();
  return (
    <View style={styles.container}>
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
      {/* <View>
        <Text>Welcome Julia</Text>
      </View>
      <Text >Welcome to the Home Screen</Text>
      <Button  
          title="Go to Profile"
          onPress={()=>router.push("/two")}
         /> */}
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'flex-start',
    marginTop:60,

  },
  headerView:{
    flexDirection:'row',
    justifyContent:'space-between',
    padding:20,
  },
  headerTitle:{
    fontSize:25,
    fontWeight:'bold',
    padding:5,
  },
  headerSubtitle:{
    fontSize:15,
    color:'#0BA6DF',
    padding:5,
  },
  headerImage:{
    width:50,
    height:50,
  }
  // container: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // title: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  // },
  // separator: {
  //   marginVertical: 30,
  //   height: 1,
  //   width: '80%',
  // },
});
