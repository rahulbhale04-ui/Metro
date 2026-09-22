import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useApp } from '../store';

export default function LoginScreen({ navigation }) {
  const { colors } = useApp();
  const [phone, setPhone] = useState('');
  const valid = /^[6-9]\d{9}$/.test(phone);

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.bg }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.wrap}>
        <Text style={[styles.brand, { color: colors.primary }]}>Metro</Text>
        <Text style={[styles.tagline, { color: colors.sub }]}>Local services near you</Text>

        <Text style={[styles.label, { color: colors.text }]}>Mobile number</Text>
        <View style={[styles.inputRow, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.prefix, { color: colors.sub }]}>+91</Text>
          <TextInput
            value={phone}
            onChangeText={(t) => setPhone(t.replace(/\D/g, '').slice(0, 10))}
            keyboardType="number-pad"
            placeholder="10-digit number"
            placeholderTextColor={colors.sub}
            style={[styles.input, { color: colors.text }]}
            maxLength={10}
          />
        </View>

        <TouchableOpacity
          disabled={!valid}
          onPress={() => navigation.navigate('OTP', { phone })}
          style={[styles.button, { backgroundColor: valid ? colors.primary : colors.border }]}
        >
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>

        <Text style={[styles.note, { color: colors.sub }]}>
          Demo mode: any 10-digit number works, and OTP is 1234.
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, justifyContent: 'center', paddingHorizontal: 28 },
  brand: { fontSize: 40, fontWeight: '800', textAlign: 'center' },
  tagline: { fontSize: 15, textAlign: 'center', marginTop: 6, marginBottom: 48 },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 8 },
  inputRow: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 12, paddingHorizontal: 14 },
  prefix: { fontSize: 16, marginRight: 8 },
  input: { flex: 1, fontSize: 16, paddingVertical: 14 },
  button: { marginTop: 24, borderRadius: 12, paddingVertical: 15, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  note: { fontSize: 12, textAlign: 'center', marginTop: 16 },
});
