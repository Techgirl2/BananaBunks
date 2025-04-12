import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TextInput } from 'react-native';
import CustomCheckbox from '../components/CustomCheckbox';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CheckboxScreen() {
  const [checks, setChecks] = useState({
    artistic: false,
    outdoorsy: false,
    bookworm: false,
    gymRat: false,
    gamer: false,
    musical: false,
  });

  const [description, setDescription] = useState("");

  const toggle = (key: keyof typeof checks) => {
    setChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  
  const navigation = useNavigation();

  return (
    <View style={styles.main}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>What kind of person are you?</Text>
        <View style={styles.checkboxGroup}>
            <CustomCheckbox
            label="artistic 🎨"
            checked={checks.artistic}
            onPress={() => toggle('artistic')}
            />
            <CustomCheckbox
            label="outdoorsy 🌲"
            checked={checks.outdoorsy}
            onPress={() => toggle('outdoorsy')}
            />
            <CustomCheckbox
            label="bookworm 📖"
            checked={checks.bookworm}
            onPress={() => toggle('bookworm')}
            />
            <CustomCheckbox
            label="gym rat 💪"
            checked={checks.gymRat}
            onPress={() => toggle('gymRat')}
            />
            <CustomCheckbox
            label="gamer 🎮"
            checked={checks.gamer}
            onPress={() => toggle('gamer')}
            />
            <CustomCheckbox
            label="musical 🎵"
            checked={checks.musical}
            onPress={() => toggle('musical')}
            />
        </View>
        <Text style={styles.subtitle}>Add a personal description:</Text>
        <TextInput
          style={styles.textBox}
          value={description}
          onChangeText={setDescription}
          placeholder="This is your chance to write a fun introduction for yourself! You may also include any important information that you weren't able to include earlier."
          multiline
        />
      </ScrollView>
      <View style={styles.arrowContainer}>
        {/* Left Arrow */}
        <TouchableOpacity style={styles.leftArrow} onPress={() => navigation.navigate('Slider' as never)}>
            <FontAwesome name="arrow-left" size={30} color="#333" />
        </TouchableOpacity>
        
        {/* Right Arrow */}
        <TouchableOpacity style={styles.rightArrow} onPress={() => navigation.navigate('EditProfile' as never)}>
            <FontAwesome name="arrow-right" size={30} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#F4E8A0',
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 35,
    marginBottom: 40,
    textAlign: 'center',
    color: '#333',
  },
  checkboxGroup: {
    marginLeft: 30,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'normal',
    marginTop: 20, // Adds space above the subtitle
    color: '#333',
    textAlign: 'center', // Centers the subtitle
  },
  textBox: {
    backgroundColor: '#FDF4E3', // Set the background color
    borderRadius: 15,
    padding: 10,
    marginTop: 20,
    fontSize: 16,
    height: 225, // Adjust height if needed
    textAlignVertical: 'top', // Ensures the text starts at the top
    paddingTop: 15, // Optionally adjust padding to move the text higher
  },
  arrowContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
    zIndex: 1, // Ensure arrows are above other content
  },
  leftArrow: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightArrow: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
