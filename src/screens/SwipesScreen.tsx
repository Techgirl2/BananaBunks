import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useProfile } from '../context/ProfileContext';
import ProfileCard from '../components/ProfileCard';
import Navbar from '../components/Navbar';
import { ProfileType } from '../context/ProfileContext';
import { LinearGradient } from 'expo-linear-gradient';

import { getDoc } from 'firebase/firestore';

export default function SwipeScreen() {
  const { profile, setProfile } = useProfile();
  const [candidates, setCandidates] = useState<ProfileType[]>([]);
  const [loading, setLoading] = useState(true);

  // const refreshProfile = async () => {
  //   const docSnap = await getDoc(doc(db, 'users', profile.uid));
  //   if (docSnap.exists()) {
  //     setProfile(docSnap.data() as ProfileType);
  //   }
  // };

  useEffect(() => {
    const fetchCandidates = async () => {
      if (!profile?.uid) return;
      const usersSnap = await getDocs(collection(db, 'users'));
      const users: ProfileType[] = [];
      usersSnap.forEach((docSnap) => {
        const data = docSnap.data() as ProfileType;
        if (
          data.uid !== profile.uid &&
          !profile.swipes.left.includes(data.uid) &&
          !profile.swipes.right.includes(data.uid)
        ) {
          users.push(data);
        }
      });
      setCandidates(users);
      setLoading(false);
    };

    fetchCandidates();
  }, [profile]);

  const handleSwipe = async (direction: 'left' | 'right', swipedUser: ProfileType) => {
    if (!profile) return;

    const updatedProfile = {
      ...profile,
      swipes: {
        ...profile.swipes,
        [direction]: [...profile.swipes[direction], swipedUser.uid],
      },
    };

    await updateDoc(doc(db, 'users', profile.uid), {
      swipes: updatedProfile.swipes,
    });

    if (direction === 'right') {
      const matchedUser = swipedUser;
      if (matchedUser.swipes.right.includes(profile.uid)) {
        const newMatches = [...profile.matches, matchedUser.uid];
        const theirMatches = [...matchedUser.matches, profile.uid];

        await updateDoc(doc(db, 'users', profile.uid), {
          matches: newMatches,
        });

        await updateDoc(doc(db, 'users', matchedUser.uid), {
          matches: theirMatches,
        });

        updatedProfile.matches = newMatches;
        console.log('🎉 Match found!');
      }
    }

    const refreshProfile = async () => {
      const docSnap = await getDoc(doc(db, 'users', profile.uid));
      if (docSnap.exists()) {
        setProfile(docSnap.data() as ProfileType);
      }
    };
  
    await refreshProfile();
  };

  return (
    <LinearGradient
      colors={['#F87575', '#75F8B5']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradient}
    >
      <View style={styles.swiperContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#FFC800" />
        ) : candidates.length > 0 ? (
          <Swiper
            cards={candidates}
            renderCard={(card) => <ProfileCard profile={card} />}
            onSwipedLeft={(i) => handleSwipe('left', candidates[i])}
            onSwipedRight={(i) => handleSwipe('right', candidates[i])}
            stackSize={3}
            backgroundColor="transparent"
            cardIndex={0}
          />
        ) : (
          <Text style={styles.emptyText}>No more profiles to swipe on 💤</Text>
        )}
      </View>
      <Navbar />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  swiperContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    paddingBottom: 0,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'white',
  },
});
