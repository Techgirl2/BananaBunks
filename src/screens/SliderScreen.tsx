import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import CustomCheckbox from '../components/CustomCheckbox';
import { useProfile } from '../context/ProfileContext';

export default function SliderScreen() {
  const navigation = useNavigation();
  const { profile, setProfile } = useProfile();

  const updatePreference = (key: keyof typeof profile.preferences, value: number) => {
    setProfile(prev => ({
      ...prev,
      preferences: { ...prev.preferences, [key]: Math.round(value * 100) },
    }));
  };

  const updateRule = (key: keyof typeof profile.rules, value: boolean) => {
    setProfile(prev => ({
      ...prev,
      rules: { ...prev.rules, [key]: value },
    }));
  };

  // replace state hooks with profile state
  const checks = profile.rules;
//   const [checks, setChecks] = useState({
//     noPets: false,
//     noRoommates: false,
//     noOvernightGuests: false,
// });

  const toggle = (key: keyof typeof checks) => {
    updateRule(key, !checks[key]);
  };
// const toggle = (key: keyof typeof checks) => {
//   setChecks((prev) => ({ ...prev, [key]: !prev[key] }));
// };

  // const [scheduleRegularity, setScheduleRegularity] = useState(0.5);
  // const scheduleRef = useRef(scheduleRegularity);

  // const [sleepSchedule, setSleepSchedule] = useState(0.5);
  // const sleepRef = useRef(sleepSchedule);

  // const [cleanliness, setCleanliness] = useState(0.5);
  // const cleanRef = useRef(cleanliness);

  // const [socialLevel, setSocialLevel] = useState(0.5);
  // const socialRef = useRef(socialLevel);

  // const [noiseLevel, setNoiseLevel] = useState(0.5);
  // const noiseRef = useRef(noiseLevel);

  const renderSlider = (labelLeft: string, labelRight: string,   stateKey: keyof typeof profile.preferences) => (
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
        value={profile.preferences[stateKey] / 100}
        onSlidingComplete={(val) => updatePreference(stateKey, val)}
        minimumTrackTintColor="#F6B151"
        maximumTrackTintColor="#F6B151"
        thumbTintColor="#4AC4C5"
      />
    </View>
  );



  // const renderSlider = (
  //   labelLeft: string,
  //   labelRight: string,
  //   value: number,
  //   setValue: (v: number) => void,
  //   refValue: React.MutableRefObject<number>
  // ) => (
  //   <View style={styles.sliderGroup}>
  //     <View style={styles.labelsRow}>
  //       <Text style={styles.sideLabel}>{labelLeft}</Text>
  //       <Text style={styles.sideLabel}>{labelRight}</Text>
  //     </View>
  //     <Slider
  //       style={styles.slider}
  //       minimumValue={0}
  //       maximumValue={1}
  //       step={0.01}
  //       value={value}
  //       onValueChange={(val) => (refValue.current = val)}
  //       onSlidingComplete={(val) => setValue(val)}
  //       minimumTrackTintColor="#F6B151"
  //       maximumTrackTintColor="#F6B151"
  //       thumbTintColor="#4AC4C5"
  //     />
  //   </View>
  // );

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>What kind of living preferences do you have?</Text>

        {/* Sliders */}
        {/* {renderSlider('Structured', 'Flexible', scheduleRegularity, setScheduleRegularity, noiseRef)}
        {renderSlider('Early Riser', 'Night Owl', sleepSchedule, setSleepSchedule, sleepRef)}
        {renderSlider('Clean Freak', 'Messy Nessy', cleanliness, setCleanliness, cleanRef)}
        {renderSlider('Introvert', 'Extrovert', socialLevel, setSocialLevel, socialRef)}
        {renderSlider('Calm Home', 'Lively Home', noiseLevel, setNoiseLevel, noiseRef)} */}
        {renderSlider('Structured 🗓️', 'Flexible 🌈', 'scheduleRegularity')}
        {renderSlider('Early Riser', 'Night Owl', 'sleepSchedule')}
        {renderSlider('Clean Freak', 'Messy Nessy', 'cleanliness')}
        {renderSlider('Introvert', 'Extrovert', 'socialLevel')}
        {renderSlider('Calm Home 🏡', 'Lively Home 🏡', 'noiseLevel')}

        <View style={styles.checkboxGroup}>
            <CustomCheckbox
            label="no pets"
            checked={checks.noPets}
            onPress={() => toggle('noPets')}
            />
            <CustomCheckbox
            label="no roommates"
            checked={checks.noRoommates}
            onPress={() => toggle('noRoommates')}
            />
            <CustomCheckbox
            label="no overnight guests"
            checked={checks.noOvernightGuests}
            onPress={() => toggle('noOvernightGuests')}
            />
        </View>
      </ScrollView>


      <View style={styles.arrowContainer}>
        {/* Right Arrow */}
        <TouchableOpacity style={styles.rightArrow} onPress={() => navigation.navigate('Checkbox' as never)}>
            <FontAwesome name="arrow-right" size={30} color="#333" />
        </TouchableOpacity>

      </View>
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
    marginTop: 35,
    marginBottom: 30,
    textAlign: 'center',
  },
  sliderGroup: {
    marginBottom: 20,
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
    marginLeft: 10,
  }, 
  arrowContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
    zIndex: 1, // Ensure arrows are above other content
  },
  rightArrow: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});
