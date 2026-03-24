import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Button({ title, onPress, color, textColor }) {
  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor: color || '#2196F3' }]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: textColor || '#fff' }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});