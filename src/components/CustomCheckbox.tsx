import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type CustomCheckboxProps = {
  label: string;
  checked: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>; // use StyleProp so it works well
};

export default function CustomCheckbox({ label, checked, onPress, style }: CustomCheckboxProps) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <View style={[styles.checkbox, checked && styles.checked]}>
        {checked && <Ionicons name="checkmark" size={16} color="white" />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFB057',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checked: {
    backgroundColor: '#FFB057',
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
});
