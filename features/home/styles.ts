import { StyleSheet } from "react-native";
export const homeStyles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'flex-start',
    // marginTop:60,
    padding:10,
    backgroundColor:'BBDCE5',
  },
  headerView:{
    flexDirection:'row',
    justifyContent:'space-between',
    padding:20,
  },
  headerTitle:{
    fontSize:20,
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
    backgroundColor: '#fff',
  },
categoriesBox: {
    marginTop: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  card: {
    width: 180,
    height: 120,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3, 
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
    fontWeight:'bold',
  },
  categoryImage:{
    width:80,
    height:60,
    marginBottom:10,
    resizeMode:'contain',
  },
    taskContainer: {
    flex:1,
    padding: 16,
  },
  taskHeader: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,  
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '75%',
    backgroundColor: '#607B8F',
    elevation: 5,
    shadowColor: '#000', 
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    paddingTop: 0, 
  },
  drawerItem: {
  paddingVertical: 12,
  paddingHorizontal: 16,
  marginVertical: 4,
  borderRadius: 8,
  flexDirection:'row',
},
drawerItemText: {
  color: 'white',
  fontSize: 20,
  fontWeight: '500',
  marginTop:4,
},


 
});
