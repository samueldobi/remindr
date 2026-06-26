import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function Header({ onMenuPress }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.menuButton} onPress={onMenuPress} activeOpacity={0.7}>
        <Text style={styles.menuIcon}>☰</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Household Board</Text>

      <TouchableOpacity style={styles.avatarWrapper} activeOpacity={0.8}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
          style={styles.avatar}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingTop: 20,
    backgroundColor: '#F8F7F5',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(244,140,37,0.1)',
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(244,140,37,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    fontSize: 18,
    color: '#F48C25',
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1C140D',
    letterSpacing: -0.3,
  },
  avatarWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#F48C25',
    overflow: 'hidden',
    backgroundColor: 'rgba(244,140,37,0.15)',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
});
