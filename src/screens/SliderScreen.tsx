import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Image } from 'react-native';

export default function SliderScreen() {
  const navigation = useNavigation();

  const [noiseTolerance, setNoiseTolerance] = useState(0.5);
  const noiseRef = useRef(noiseTolerance);

  const [sleepSchedule, setSleepSchedule] = useState(0.5);
  const sleepRef = useRef(sleepSchedule);

  const [cleanliness, setCleanliness] = useState(0.5);
  const cleanRef = useRef(cleanliness);

  const [sociability, setSociability] = useState(0.5);
  const socialRef = useRef(sociability);

  const [prefersQuiet, setPrefersQuiet] = useState(0.5);
  const quietRef = useRef(prefersQuiet);

  // State for switches
  const [noPets, setNoPets] = useState(false);
  const [noRoommates, setNoRoommates] = useState(false);
  const [noOvernightGuests, setNoOvernightGuests] = useState(false);

  const renderSlider = (
    labelLeft: string,
    labelRight: string,
    value: number,
    setValue: (v: number) => void,
    refValue: React.MutableRefObject<number>
  ) => (
    <View style={styles.sliderGroup}>
      <View style={styles.labelsRow}>
        <Text style={styles.sideLabel}>{labelLeft}</Text>
        <Text style={styles.sideLabel}>{labelRight}</Text>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        step={0.01}
        value={value}
        onValueChange={(val) => (refValue.current = val)}
        onSlidingComplete={(val) => setValue(val)}
        minimumTrackTintColor="#F6B151"
        maximumTrackTintColor="#F6B151"
        thumbTintColor="#4AC4C5"
      />
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>What kind of living preferences do you have?</Text>

        {/* Sliders */}
        {renderSlider('Quiet', 'Loud', noiseTolerance, setNoiseTolerance, noiseRef)}
        {renderSlider('Early Riser', 'Night Owl', sleepSchedule, setSleepSchedule, sleepRef)}
        {renderSlider('Clean Freak', 'Messy Nessy', cleanliness, setCleanliness, cleanRef)}
        {renderSlider('Introvert', 'Extrovert', sociability, setSociability, socialRef)}
        {renderSlider('Prefers Quiet', 'Prefers Loud', prefersQuiet, setPrefersQuiet, quietRef)}

        {/* Switches for preferences */}
        <View style={styles.checkboxGroup}>
          <View style={styles.checkboxContainer}>
            <Text style={styles.checkboxLabel}>No Pets</Text>
            <Switch
              value={noPets}
              onValueChange={setNoPets}
              thumbColor={noPets ? '#4AC4C5' : '#F6B151'}
              trackColor={{ false: '#ddd', true: '#F6B151' }}
            />
          </View>

          <View style={styles.checkboxContainer}>
            <Text style={styles.checkboxLabel}>No Roommates</Text>
            <Switch
              value={noRoommates}
              onValueChange={setNoRoommates}
              thumbColor={noRoommates ? '#4AC4C5' : '#F6B151'}
              trackColor={{ false: '#ddd', true: '#F6B151' }}
            />
          </View>

          <View style={styles.checkboxContainer}>
            <Text style={styles.checkboxLabel}>No Overnight Guests</Text>
            <Switch
              value={noOvernightGuests}
              onValueChange={setNoOvernightGuests}
              thumbColor={noOvernightGuests ? '#4AC4C5' : '#F6B151'}
              trackColor={{ false: '#ddd', true: '#F6B151' }}
            />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('Checkbox' as never)} // replace with your actual screen name
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F4E8A0', // Background color for the entire screen
  },
  container: {
    padding: 20,
    flexGrow: 1, // Ensures content is pushed to the bottom when there is not enough content
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 40,
    textAlign: 'center',
  },
  sliderGroup: {
    marginBottom: 10,
  },
  labelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  sideLabel: {
    fontSize: 14,
    color: '#555',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  checkboxGroup: {
    marginTop: -5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Aligns the label and switch across the row
    marginBottom: 15,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#555',
  },
  nextButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4AC4C5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
});
