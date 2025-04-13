import React, { createContext, useContext, useState } from 'react';

// maintains profile state across pages

type ProfileType = {
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

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);