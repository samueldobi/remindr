import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Drawer } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

type AppDrawerProps = {
  visible: boolean;
  onClose: () => void;
};

export default function AppDrawer({ visible, onClose }: AppDrawerProps) {
  const router = useRouter();

  if (!visible) return null;

  return (
    <>
      <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />
      <View style={styles.drawer}>
        <Drawer.Section style={{ marginTop: 50 }}>
          <Text style={styles.menuTitle}>Menu</Text>

          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => {
              onClose();
              router.push('/');
            }}
          >
            <Ionicons name="home-sharp" size={24} color="white" style={{ marginRight: 10 }} />
            <Text style={styles.drawerItemText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => {
              onClose();
              router.push('/tasks');
            }}
          >
            <Ionicons name="person-sharp" size={24} color="white" style={{ marginRight: 10 }} />
            <Text style={styles.drawerItemText}>Household</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => {
              onClose();
              router.push('/reminders');
            }}
          >
            <Ionicons name="notifications-sharp" size={24} color="white" style={{ marginRight: 10 }} />
            <Text style={styles.drawerItemText}>Reminders</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => {
              onClose();
              router.push('/savings');
            }}
          >
            <Ionicons name="wallet-sharp" size={24} color="white" style={{ marginRight: 10 }} />
            <Text style={styles.drawerItemText}>Savings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => {
              onClose();
              router.push('/Settings');
            }}
          >
            <Ionicons name="settings-sharp" size={24} color="white" style={{ marginRight: 10 }} />
            <Text style={styles.drawerItemText}>Settings</Text>
          </TouchableOpacity>
        </Drawer.Section>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 50,
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
    zIndex: 51,
  },
  menuTitle: {
    marginLeft: 16,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  drawerItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 4,
    borderRadius: 8,
    flexDirection: 'row',
  },
  drawerItemText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 4,
  },
});
