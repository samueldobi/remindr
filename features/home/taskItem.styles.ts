import { StyleSheet } from "react-native";
export const taskItemStyles = StyleSheet.create({
    taskContainer: {
    flex:1,
    padding: 16,
  },
  taskHeader: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,  
  },
  taskCard: {
    flexDirection: 'row',
    backgroundColor: '#fff', 
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',      
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,             
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    resizeMode: 'cover',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  taskName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  taskDue: {
    fontSize: 12,
    color: '#555',
    marginBottom: 6,
  },
  progressBarBackground: {
    width: '100%',
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginBottom: 4,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 10,
    color: '#555',
  },

});