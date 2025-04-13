import React, { useState } from 'react';

import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useProfile } from '../context/ProfileContext';

export default function SignUpScreen() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const navigation = useNavigation();

  const { setProfile } = useProfile();

  const handleSignUp = async () => {
    if (!fullName.trim()) {
      Alert.alert('Missing Information', 'Please enter your full name.');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Update global profile context
      setProfile(prev => ({
        ...prev,
        fullName,
        email,
      }));
  
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
