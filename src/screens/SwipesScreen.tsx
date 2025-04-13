import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Navbar from '../components/Navbar'; // Make sure path is correct
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function SwipesScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Find a BananaBunk</Text>
        {/* Add your other content here */}

        <FontAwesome5 name="check-circle" size={24} color="black" />
        
      </View>

      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#0091AD',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 30,
    textAlign: 'center',
  },
});

