import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useApp } from '../store';

export default function OtpScreen({ route, navigation }) {
  const { phone } = route.params;
  const { colors, login } = useApp();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const inputs = [useRef(), useRef(), useRef(), useRef()];

  const setDigit = (i, val) => {
    const clean = val.replace(/\D/g, '').slice(-1);
    const next = [...otp];
    next[i] = clean;
    setOtp(next);
    setError('');
    if (clean && i < 3) inputs[i + 1].current?.focus();
  };

  const verify = () => {
    if (otp.join('') === '1234') {
      login(phone);
      navigation.replace('ProfileSetup');
    } else {
      setError('Wrong OTP. Try 1234 for this demo.');
    }
  };

  return (
    <View style={[styles.wrap, { backgroundColor: colors.bg }]}>
      <Text style={[styles.title, { color: colors.text }]}>Verify your number</Text>
      <Text style={[styles.sub, { color: colors.sub }]}>Code sent to +91 {phone}</Text>

      <View style={styles.otpRow}>
        {otp.map((d, i) => (
          <TextInput
            key={i}
            ref={inputs[i]}
            value={d}
            onChangeText={(v) => setDigit(i, v)}
            keyboardType="number-pad"
            maxLength={1}
            style={[styles.box, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]}
          />
        ))}
      </View>

      {!!error && <Text style={[styles.error, { color: colors.red }]}>{error}</Text>}

      <TouchableOpacity
        disabled={otp.some((d) => !d)}
        onPress={verify}
        style={[styles.button, { backgroundColor: colors.primary, opacity: otp.some((d) => !d) ? 0.5 : 1 }]}
      >
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={[styles.back, { color: colors.primary }]}>Change number</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, justifyContent: 'center', paddingHorizontal: 28 },
  title: { fontSize: 24, fontWeight: '800', textAlign: 'center' },
  sub: { fontSize: 14, textAlign: 'center', marginTop: 8, marginBottom: 32 },
  otpRow: { flexDirection: 'row', justifyContent: 'center', gap: 14 },
  box: { width: 56, height: 60, borderWidth: 1, borderRadius: 12, textAlign: 'center', fontSize: 22, fontWeight: '700' },
  error: { textAlign: 'center', marginTop: 14, fontSize: 13 },
  button: { marginTop: 28, borderRadius: 12, paddingVertical: 15, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  back: { textAlign: 'center', marginTop: 18, fontSize: 14, fontWeight: '600' },
});
