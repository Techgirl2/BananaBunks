import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EditProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Edit Profile Screen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4E8A0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});
