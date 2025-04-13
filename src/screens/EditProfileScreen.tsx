import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useProfile } from '../context/ProfileContext';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase'; 




export default function EditProfileScreen() {
  const navigation = useNavigation();

  const { profile, setProfile } = useProfile();

  const getPreferenceTags = () => {
    const tags: string[] = [];

    const prefs = profile.preferences;

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

    // Rules
    if (profile.rules.noPets) tags.push('#no_pets');
    if (profile.rules.noRoommates) tags.push('#no_roommates');
    if (profile.rules.noOvernightGuests) tags.push('#no_overnight_guests');

    return tags;
  };

  const handleSubmit = () => {
    // We'll hook this up to Firestore next!
    console.log('Submitting profile:', profile);
  };


  const handlePickImage = async () => {
    // Ask for permission
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }
  
    // Open image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (!result.canceled) {
      // Upload image
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();
  
      const imageRef = ref(storage, `profilePictures/${profile.uid}.jpg`);
      await uploadBytes(imageRef, blob);
  
      // Get URL and update profile
      const downloadURL = await getDownloadURL(imageRef);
      setProfile(prev => ({
        ...prev,
        profilePicture: downloadURL,
      }));
  
      alert('Profile picture updated!');
    }
  };

  return (
    <View style={styles.main}>
      <Text style={styles.title}>{profile.fullName || 'Your Name'}</Text>

      {profile.profilePicture ? (
      <Image
        source={{ uri: profile.profilePicture }}
        style={{ width: 100, height: 100, borderRadius: 50 }}
      />
      ) : (
      <View
        style={{
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#ccc',
      }}
      />
      )}

      <TouchableOpacity onPress={handlePickImage}>
        <Text>+ Add / update profile pic</Text>
      </TouchableOpacity>

      {/* Personality emojis */}
      <Text style={styles.emojis}>
        {profile.personalityTraits?.map((trait) => {
          const emojiMap: Record<string, string> = {
            artistic: '🎨',
            outdoorsy: '🌲',
            bookworm: '📖',
            gymRat: '💪',
            gamer: '🎮',
            musical: '🎵',
          };
          return emojiMap[trait] || '';
        }).join(' ')}
      </Text>

      {/* Tags */}
      <View style={styles.tagsContainer}>
        {getPreferenceTags().map((tag) => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      {/* Description */}
      <TextInput
        style={styles.textBox}
        value={profile.description}
        placeholder="No description provided."
        editable={false}
        multiline
      />

      {/* Navigation arrows and Submit */}
      <View style={styles.arrowContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={30} color="#333" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: '#F4E8A0', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  // profilePicPlaceholder: {
  //   width: 150,
  //   height: 150,
  //   borderRadius: 75,
  //   backgroundColor: '#4AC4C5',
  //   alignSelf: 'center',
  //   marginBottom: 10,
  // },
  uploadButton: {
    alignSelf: 'center',
    backgroundColor: '#4AC4C5',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginBottom: 20,
  },
  uploadButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emojis: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 15,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tag: {
    backgroundColor: '#F6B151',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 4,
  },
  tagText: {
    color: '#333',
    fontWeight: '500',
  },
  textBox: {
    backgroundColor: '#FDF4E3',
    borderRadius: 15,
    padding: 10,
    fontSize: 16,
    height: 120,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  arrowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  submitButton: {
    backgroundColor: '#4AC4C5',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});