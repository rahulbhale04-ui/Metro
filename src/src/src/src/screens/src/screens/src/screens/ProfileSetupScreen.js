import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useApp } from '../store';

export default function ProfileSetupScreen({ navigation }) {
  const { colors, completeProfile } = useApp();
  const [name, setName] = useState('');

  const save = () => {
    completeProfile(name.trim() || 'Guest');
    navigation.replace('Main');
  };

  return (
    <View style={[styles.wrap, { backgroundColor: colors.bg }]}>
      <Text style={[styles.title, { color: colors.text }]}>What should we call you?</Text>
      <Text style={[styles.sub, { color: colors.sub }]}>This name shows to providers you book.</Text>

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Your name"
        placeholderTextColor={colors.sub}
        style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]}
      />

      <TouchableOpacity
        disabled={!name.trim()}
        onPress={save}
        style={[styles.button, { backgroundColor: colors.primary, opacity: name.trim() ? 1 : 0.5 }]}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, justifyContent: 'center', paddingHorizontal: 28 },
  title: { fontSize: 22, fontWeight: '800' },
  sub: { fontSize: 14, marginTop: 6, marginBottom: 28 },
  input: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 16 },
  button: { marginTop: 24, borderRadius: 12, paddingVertical: 15, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
