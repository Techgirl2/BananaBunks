import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Navbar() {
  const navigation = useNavigation();

  return (
    <View style={styles.navbarContainer}>
      <TouchableOpacity
        style={styles.iconCircle}
        onPress={() => navigation.navigate('Matches' as never)}
      >
        <MaterialCommunityIcons name="puzzle-heart" size={20} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.iconCircle}
        onPress={() => navigation.navigate('Swipes' as never)}
      >
        <MaterialIcons name="swipe" size={20} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.iconCircle}
        onPress={() => navigation.navigate('Profile' as never)}
      >
        <Ionicons name="person" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f2f2f2',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopColor: '#ccc',
    borderTopWidth: 1,
  },
  iconCircle: {
    backgroundColor: '#4AC4C5',
    padding: 14,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
