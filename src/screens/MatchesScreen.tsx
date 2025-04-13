import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Navbar from '../components/Navbar';
import MatchCard from '../components/MatchCard';

export default function MatchesScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Matches</Text>
        <MatchCard />
        <MatchCard />
        <MatchCard />
        <MatchCard />
        <MatchCard />
        <MatchCard />
      </ScrollView>

      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB057',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100, // Add bottom padding to avoid being hidden under the navbar
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 35,
    marginBottom: 15,
    textAlign: 'center',
  },
});
