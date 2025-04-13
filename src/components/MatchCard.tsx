import React, { useState, useRef} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Animated, Easing   } from 'react-native';
import Fontisto from '@expo/vector-icons/Fontisto';

type MatchCardProps = {
  profilePicture?: string;
  fullName: string;
  description: string;
  tags: string[];
  email?: string;
};


export default function MatchCard({ profilePicture, fullName, description, tags, email = "No email provided" }: MatchCardProps) {
  const [showEmail, setShowEmail] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const toggleEmail = () => {
    if (showEmail) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }).start(() => setShowEmail(false));
    } else {
      setShowEmail(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }).start();
    }
  };
  return (
    <View style={styles.cardContainer}>
      {/* Top Row */}
      <View style={styles.topRow}>

      {profilePicture ? (
          <Image source={{ uri: profilePicture }} style={styles.blueBox} />
        ) : (
          <View style={styles.blueBox} />
        )}

        <Text style={styles.nameText}>{fullName}</Text>

        <View style={{ alignItems: 'center' }}>
          {showEmail && <Text style={styles.emailPopup}>{email}</Text>}
          <TouchableOpacity style={styles.iconWrapper} onPress={toggleEmail}>
            <Fontisto name="email" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tags Row */}
      <ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={styles.tagsRow}
>
  {tags.map((tag, index) => (
    <View key={index} style={styles.tag}>
      <Text style={styles.tagText}>{tag}</Text>
    </View>
  ))}
</ScrollView>

      {/* Input description here from firebase */}
      <View style={styles.descriptionBox}>
        <ScrollView style={styles.descriptionScroll} nestedScrollEnabled showsVerticalScrollIndicator={false}>
          <Text style={styles.descriptionText}>{description}</Text>
        </ScrollView>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
    cardContainer: {
      backgroundColor: '#4AC4C5',
      borderRadius: 16,
      padding: 16,
      margin: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    blueBox: {
      width: 35,
      height: 35,
      backgroundColor: '#007AFF',
      borderRadius: 4,
      marginRight: 10,
    },
    emailPopup: {
      backgroundColor: 'white',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    nameText: {
      flex: 1,
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
    },
    iconWrapper: {
      padding: 4,
    },

    tagsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 12,
      gap: 8,
    },
    tag: {
      backgroundColor: '#09ECEC',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 20,
    },
    tagText: {
      fontSize: 12,
      color: '#000000',
    },
    descriptionBox: {
        marginTop: 12,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 10,
        maxHeight: 100, // limit box height so scrolling can happen
      },
    descriptionScroll: {
    maxHeight: 100, // smaller than descriptionBox to allow inner scroll
    },
    descriptionText: {
      fontSize: 14,
      color: '#333',
    },
  });
  