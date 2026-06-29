import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AppHeader from '@/components/AppHeader';
import AppDrawer from '@/components/AppDrawer';
import { apiRequest } from '@/lib/api';
import { useAuthStore } from '@/features/auth/store';

const SECTIONS = [
  {
    title: 'General',
    items: [
      { label: 'Notifications', icon: 'notifications-outline' },
      { label: 'Appearance', icon: 'color-palette-outline' },
    ],
  },
  {
    title: 'About',
    items: [
      { label: 'About', icon: 'information-circle-outline' },
      { label: 'Privacy Policy', icon: 'shield-checkmark-outline' },
    ],
  },
];

export default function SettingsScreen() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          setLoggingOut(true);
          try {
            await apiRequest('/auth/logout', { method: 'POST' });
          } catch {
            // Proceed with local logout even if API call fails
          }
          await logout();
          router.replace('/(auth)/login');
        },
      },
    ]);
  };

  return (
    <>
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <AppHeader title="Settings" onMenuPress={() => setDrawerOpen(true)} />

          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {SECTIONS.map((section, sIdx) => (
              <View key={section.title} style={[styles.section, sIdx > 0 && styles.sectionGap]}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <View style={styles.card}>
                  {section.items.map((item, iIdx) => (
                    <TouchableOpacity
                      key={item.label}
                      style={[styles.row, iIdx < section.items.length - 1 && styles.rowBorder]}
                      activeOpacity={0.6}
                    >
                      <View style={styles.rowLeft}>
                        <View style={styles.iconBox}>
                          <Ionicons name={item.icon as any} size={20} color="#F48C25" />
                        </View>
                        <Text style={styles.rowLabel}>{item.label}</Text>
                      </View>
                      <Ionicons name="chevron-forward" size={18} color="#9C7349" />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}

            <View style={[styles.section, styles.sectionGap]}>
              <View style={styles.card}>
                <TouchableOpacity
                  style={styles.logoutRow}
                  onPress={handleLogout}
                  disabled={loggingOut}
                  activeOpacity={0.6}
                >
                  <View style={styles.rowLeft}>
                    <View style={styles.logoutIconBox}>
                      <Ionicons name="log-out-outline" size={20} color="#DA3D20" />
                    </View>
                    <Text style={styles.logoutLabel}>Sign Out</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
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
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 4,
  },
  sectionGap: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#9C7349',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 8,
    marginLeft: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(244,140,37,0.06)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(244,140,37,0.06)',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(244,140,37,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1C140D',
  },
  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  logoutIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(218,61,32,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#DA3D20',
  },
});
