import React, { createContext, useContext, useState, useEffect } from 'react';

// these imports pull the state when the user logs in 
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
// maintains profile state across pages

type ProfileType = {
  uid: string;
  fullName: string;
  email: string;
  profilePicture: string;
  preferences: {
    scheduleRegularity: number;
    sleepSchedule: number;
    cleanliness: number;
    socialLevel: number;
    noiseLevel: number;
  };
  rules: {
    noPets: boolean;
    noRoommates: boolean;
    noOvernightGuests: boolean;
  };
  personalityTraits: string[];
  description: string;
  swipes: {
    right: string[];
    left: string[];
  };
  matches: string[];
};

const defaultProfile: ProfileType = {
  uid: '',
  fullName: '',
  email: '',
  profilePicture: '',
  preferences: {
    scheduleRegularity: 0,
    sleepSchedule: 0,
    cleanliness: 0,
    socialLevel: 0,
    noiseLevel: 0,
  },
  rules: {
    noPets: false,
    noRoommates: false,
    noOvernightGuests: false,
  },
  personalityTraits: [],
  description: '',
  swipes: {
    right: [],
    left: [],
  },
  matches: [],
};

const ProfileContext = createContext<{
  profile: ProfileType;
  setProfile: React.Dispatch<React.SetStateAction<ProfileType>>;
}>({
  profile: defaultProfile,
  setProfile: () => {},
});

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<ProfileType>(defaultProfile);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch user profile from Firestore
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          console.log('Fetched profile from Firestore:', docSnap.data());
          setProfile(docSnap.data() as ProfileType);
        } else {
          console.log('No profile found for user:', user.uid);
        }
      } else {
        console.log('User signed out or not logged in');
      }
    });
  
    return unsubscribe;
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);