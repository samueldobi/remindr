import { StyleSheet, Button , Image, TouchableWithoutFeedback, Keyboard, Pressable,ScrollView} from 'react-native';
import { useRouter } from 'expo-router';
import { Searchbar } from 'react-native-paper';
import { useState } from 'react';
import { categories } from '@/constants/Categories';

// import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View  } from '@/components/Themed';
// import { ScrollView } from 'react-native/types_generated/index';

export default function TabOneScreen() {
  const router =  useRouter();
  const [query, setQuery] = useState('');
  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        {/*  Header View */}
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
        />
        </View>

        {/* Categories View */}
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={true}

          >
            {categories.map((category)=>(
              <Pressable
              key={category.id}
              >
                <Text>{category.name}</Text>
              </Pressable>
            ))}
          </ScrollView>
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
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'flex-start',
    marginTop:60,
    padding:10,

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
  },
  searchBar:{
    color:'#0BA6DF',
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
