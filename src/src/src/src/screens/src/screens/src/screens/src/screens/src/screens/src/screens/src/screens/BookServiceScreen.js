import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useApp } from '../store';
import { catById } from '../theme';
import { TIME_SLOTS } from '../data';

function nextDays(n) {
  const out = [];
  const today = new Date();
  for (let i = 0; i < n; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    out.push(d);
  }
  return out;
}

export default function BookServiceScreen({ route, navigation }) {
  const { providerId } = route.params;
  const { colors, providers, createBooking } = useApp();
  const p = providers.find((x) => x.id === providerId);
  const cat = catById(p?.categories?.[0]);

  const days = nextDays(7);
  const [dayIdx, setDayIdx] = useState(0);
  const [slot, setSlot] = useState(null);
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const canBook = slot && address.trim().length > 4;

  const confirm = () => {
    createBooking({
      providerId: p.id,
      providerName: p.name,
      category: cat.id,
      bookingDate: days[dayIdx].toISOString(),
      timeSlot: slot,
      address: address.trim(),
      notes: notes.trim() || null,
      amount: p.charges,
    });
    Alert.alert('Booking sent', `${p.name} will confirm your ${cat.name.toLowerCase()} booking soon.`, [
      { text: 'View my bookings', onPress: () => navigation.replace('MyBookings') },
    ]);
  };

  if (!p) return null;

  return (
    <ScrollView style={[styles.screen, { backgroundColor: colors.bg }]} contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>
      <Text style={[styles.title, { color: colors.text }]}>Book {p.name}</Text>
      <Text style={{ color: colors.sub, marginBottom: 20 }}>{cat.name} · ₹{p.charges} per {p.chargeType}</Text>

      <Text style={[styles.label, { color: colors.text }]}>Choose a date</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {days.map((d, i) => {
            const active = i === dayIdx;
            return (
              <TouchableOpacity
                key={i}
                onPress={() => setDayIdx(i)}
                style={[styles.dayChip, { backgroundColor: active ? colors.primary : colors.surface, borderColor: active ? colors.primary : colors.border }]}
              >
                <Text style={{ color: active ? '#fff' : colors.sub, fontSize: 11 }}>{d.toLocaleDateString('en-IN', { weekday: 'short' })}</Text>
                <Text style={{ color: active ? '#fff' : colors.text, fontWeight: '700', fontSize: 15 }}>{d.getDate()}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <Text style={[styles.label, { color: colors.text }]}>Choose a time</Text>
      <View style={styles.slotWrap}>
        {TIME_SLOTS.map((s) => {
          const active = slot === s;
          return (
            <TouchableOpacity
              key={s}
              onPress={() => setSlot(s)}
              style={[styles.slotChip, { backgroundColor: active ? colors.primary : colors.surface, borderColor: active ? colors.primary : colors.border }]}
            >
              <Text style={{ color: active ? '#fff' : colors.text, fontSize: 13, fontWeight: '600' }}>{s}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={[styles.label, { color: colors.text, marginTop: 20 }]}>Your address</Text>
      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder="House / flat, street, area"
        placeholderTextColor={colors.sub}
        style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]}
        multiline
      />

      <Text style={[styles.label, { color: colors.text, marginTop: 16 }]}>Notes (optional)</Text>
      <TextInput
        value={notes}
        onChangeText={setNotes}
        placeholder="Tell the provider what you need"
        placeholderTextColor={colors.sub}
        style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]}
        multiline
      />

      <TouchableOpacity
        disabled={!canBook}
        onPress={confirm}
        style={[styles.button, { backgroundColor: colors.primary, opacity: canBook ? 1 : 0.5 }]}
      >
        <Text style={styles.buttonText}>Confirm booking</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  title: { fontSize: 20, fontWeight: '800' },
  label: { fontSize: 13, fontWeight: '700', marginBottom: 10 },
  dayChip: { width: 52, paddingVertical: 10, borderRadius: 12, borderWidth: 1, alignItems: 'center' },
  slotWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  slotChip: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10, borderWidth: 1 },
  input: { borderWidth: 1, borderRadius: 12, padding: 14, fontSize: 14, minHeight: 50 },
  button: { marginTop: 28, borderRadius: 12, paddingVertical: 15, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
