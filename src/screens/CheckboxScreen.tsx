import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CheckboxScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkbox Screen</Text>
      <Text style={styles.subtitle}>You're now on the next screen!</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
  },
});
