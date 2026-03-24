import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function InputField({ value, onChange, placeholder, secure }) {
  return (
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      secureTextEntry={secure}
      style={styles.input}
    />
  );
}

const styles = StyleSheet.create({
  input:{
    borderWidth:1,
    borderColor:'#ccc',
    padding:10,
    marginBottom:10,
    borderRadius:5
  }
});