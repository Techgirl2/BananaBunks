import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { createUserProfile } from '../config/users'; // adjust if your user service is in services/

export default function SignUpScreen() {
  const navigation = useNavigation();

  // Collect inputs from user
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Prepare profile data
      const profileData = {
        firstName,
        lastName,
        email,
        preferences: {
          noiseLevel: 0,
          sleepSchedule: 0,
          cleanliness: 0,
          socialLevel: 0,
          quietVsLoud: 0,
        },
        rules: {
          noPets: false,
          noRoommates: false,
          noOvernightGuests: false,
        },
        personality: [],
        description: '',
      };

      await createUserProfile(user.uid, profileData);

      Alert.alert('Success!', 'User registered and profile created.');

      // Navigate to next screen (for example Home or preferences flow)
      //navigation.navigate('Home');

    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white p-4">
      <Text className="text-2xl font-bold mb-4">Sign Up</Text>

      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        className="border border-gray-400 w-full mb-3 p-2 rounded"
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        className="border border-gray-400 w-full mb-3 p-2 rounded"
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        className="border border-gray-400 w-full mb-3 p-2 rounded"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="border border-gray-400 w-full mb-3 p-2 rounded"
      />

      <Button title="Sign Up" onPress={handleSignUp} />

      <View className="h-3" />

      {/* <Button title="Go to Sign In" onPress={() => navigation.navigate('SignIn')} /> */}
    </View>
  );
}