import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import Navbar from '../components/Navbar';
import MatchCard from '../components/MatchCard';
import { useProfile } from '../context/ProfileContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { ProfileType } from '../context/ProfileContext';

export default function MatchesScreen() {
  const { profile } = useProfile();

  const [matches, setMatches] = useState<ProfileType[]>([]);
  const [loading, setLoading] = useState(true);
  console.log('Profile matches:', profile.matches);

  const getPreferenceTags = (match: ProfileType) => {
    const tags: string[] = [];
    const prefs = match.preferences;

    if (prefs.scheduleRegularity <= 33) tags.push('#structured');
    if (prefs.scheduleRegularity >= 66) tags.push('#flexible');
    if (prefs.sleepSchedule <= 33) tags.push('#early_riser');
    if (prefs.sleepSchedule >= 66) tags.push('#night_owl');
    if (prefs.cleanliness <= 33) tags.push('#clean_freak');
    if (prefs.cleanliness >= 66) tags.push('#messy_nessy');
    if (prefs.socialLevel <= 33) tags.push('#introvert');
    if (prefs.socialLevel >= 66) tags.push('#extrovert');
    if (prefs.noiseLevel <= 33) tags.push('#calm_home');
    if (prefs.noiseLevel >= 66) tags.push('#lively_home');

    if (match.rules.noPets) tags.push('#no_pets');
    if (match.rules.noRoommates) tags.push('#no_roommates');
    if (match.rules.noOvernightGuests) tags.push('#no_overnight_guests');

    return tags;
  };

  useEffect(() => {
    const fetchMatches = async () => {
      if (!profile?.matches?.length) {
        setMatches([]);
        setLoading(false);
        return;
      }


      const usersSnap = await getDocs(collection(db, 'users'));
      const matchedUsers: ProfileType[] = [];

      usersSnap.forEach((docSnap) => {
        const data = docSnap.data() as ProfileType;

        if (profile.matches.includes(data.uid)) {
          matchedUsers.push(data);
          console.log('Matched user:', data.fullName);
        }
      });

      console.log('Final matched users list:', matchedUsers.map(u => u.fullName));
      setMatches(matchedUsers);
      setLoading(false);
    };
    fetchMatches();
  }, [profile]);
  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Matches</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : matches.length > 0 ? (
          matches.map((match) => (
<MatchCard
  key={match.uid}
  profilePicture={match.profilePicture}
  fullName={match.fullName}
  description={match.description}
  tags={getPreferenceTags(match)}
  email={match.email}
/>
          ))
        ) : (
          <Text>No matches yet! Keep swiping 👀</Text>
        )}
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
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 15,
    textAlign: 'center',
  },
});
