import React, { useState } from 'react';

import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useProfile } from '../context/ProfileContext';

import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export default function SignUpScreen() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const navigation = useNavigation();

  const { setProfile } = useProfile();

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Create Firestore profile document
      const profileData = {
        uid: user.uid,
        fullName: fullName, // add state for this!
        email: email,
        profilePicture: '',
        preferences: {
          scheduleRegularity: 50,
          sleepSchedule: 50,
          cleanliness: 50,
          socialLevel: 50,
          noiseLevel: 50,
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
  
      await setDoc(doc(db, 'users', user.uid), profileData);
  
      // Update context
      setProfile(profileData);
  
      // Navigate!
      navigation.navigate('Slider' as never);
    } catch (error: any) {
      Alert.alert('Registration Error', error.message);
    }
  };

  return (

    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Full name"
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        style={styles.input} 
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.linkText}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#ffcb05', // Same banana-yellow :)
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#333',
  },
  linkText: {
    textAlign: 'center',
    color: '#007bff',
  },
});
