import React from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native';

export function CustomInput(props: TextInputProps) {
  return (
    <TextInput
      placeholderTextColor="#9E9E9E"
      autoCapitalize="none"
      style={styles.input}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    color: '#FFFFFF',
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#757575',
    paddingVertical: 10,
    marginBottom: 20,
  },
});