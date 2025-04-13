import React, { useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useProfile } from '../context/ProfileContext';
import Navbar from '../components/Navbar';
import * as ImagePicker from 'expo-image-picker';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { defaultProfile } from '../context/ProfileContext';
export default function ProfileScreen() {
  const navigation = useNavigation();
  const { profile, setProfile } = useProfile();
  

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const docRef = doc(db, 'users', profile.uid);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const freshData = docSnap.data();
          setProfile(freshData as any); // ideally, use ProfileType!
          //console.log('✅ Profile refreshed in ProfileScreen:', freshData);
        }
      } catch (error) {
        console.error('Error fetching profile in ProfileScreen:', error);
      }
    };
  
    if (profile.uid) {
      fetchProfile();
    }
  }, [profile]);

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



  return (
    <View style={styles.main}>
      <View style={styles.content}>
        <Text style={styles.title}>{profile.fullName || 'Your Name'}</Text>

        <View style={styles.picContainer}>
                {profile.profilePicture ? (
                  <Image
                    source={{ uri: profile.profilePicture }}
                    style={styles.profilePic}
                  />
                ) : (
                  <View style={styles.profilePicPlaceholder} />
                )}
                {/* <TouchableOpacity style={styles.uploadButton} onPress={handlePickImage}>
                  <Text style={styles.uploadButtonText}>+ Add / update profile pic</Text>
                </TouchableOpacity> */}
              </View>

        <TouchableOpacity style={styles.uploadButton} onPress={() => navigation.navigate('EditProfile' as never)}>
          <Text style={styles.uploadButtonText}>Edit Profile</Text>
        </TouchableOpacity>

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

        <View style={styles.tagsContainer}>
          {getPreferenceTags().map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        <TextInput
          style={styles.textBox}
          value={profile.description}
          placeholder="No description provided."
          editable={false}
          multiline
        />
        <View style={styles.logoutContainer}>
        <TouchableOpacity
          style={styles.logout}
          onPress={() => {
            setProfile(defaultProfile); // ⬅️ Reset context!
            navigation.navigate('Login' as never);
          }}
        >
  <Text style={styles.logoutText}>Logout</Text>
</TouchableOpacity>
        </View>

      </View>
      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: '#F4E8A0',
    },
    content: {
      flex: 1,
      padding: 10,
    },
    picContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
      marginTop: 30,
    },
    profilePic: {
      width: 150,
      height: 150,
      borderRadius: 75,
      marginBottom: 10,
    },
    profilePicPlaceholder: {
      width: 150,
      height: 150,
      borderRadius: 75,
      backgroundColor: '#4AC4C5',
      marginBottom: 10,
    },
    uploadButton: {
      alignSelf: 'center',
      backgroundColor: '#4AC4C5',
      paddingVertical: 8,
      paddingHorizontal: 15,
      borderRadius: 20,
      marginBottom: 15,
    },
    uploadButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    emojis: {
      fontSize: 20,
      textAlign: 'center',
      marginBottom: 5,
    },
    tagsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginBottom: 15,
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
      height: 190,
      textAlignVertical: 'top',
      marginBottom: 15,
    },
    logoutContainer: {
        alignItems: 'center',
    },
      
    logout: {
        backgroundColor: '#F6B151',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 25,
        alignSelf: 'center',
      },      
    logoutText: {
        color: 'white',
        fontWeight: '500',
        textAlign: 'center',

    },
});
  