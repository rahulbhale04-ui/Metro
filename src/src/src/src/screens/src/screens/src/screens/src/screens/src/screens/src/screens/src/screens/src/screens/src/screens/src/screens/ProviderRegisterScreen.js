import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useApp } from '../store';
import { CATEGORIES } from '../theme';

export default function ProviderRegisterScreen({ navigation }) {
  const { colors, user, registerProvider } = useApp();
  const [categories, setCategories] = useState([]);
  const [experience, setExperience] = useState('');
  const [about, setAbout] = useState('');
  const [charges, setCharges] = useState('');
  const [chargeType, setChargeType] = useState('visit');
  const [serviceArea, setServiceArea] = useState('');

  const toggleCat = (id) => {
    setCategories((cur) => (cur.includes(id) ? cur.filter((c) => c !== id) : [...cur, id]));
  };

  const canSubmit = categories.length > 0 && experience.trim() && about.trim() && charges && serviceArea.trim();

  const submit = () => {
    registerProvider({
      name: user?.name || 'Provider',
      phone: user?.phone || '',
      categories,
      experience: experience.trim(),
      about: about.trim(),
      charges: Number(charges) || 0,
      chargeType,
      serviceArea: serviceArea.trim(),
    });
    Alert.alert('You are listed!', 'Customers nearby can now find and book you.', [
      { text: 'Done', onPress: () => navigation.navigate('Profile') },
    ]);
  };

  return (
    <ScrollView style={[styles.screen, { backgroundColor: colors.bg }]} contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>
      <Text style={[styles.title, { color: colors.text }]}>Register as a provider</Text>
      <Text style={{ color: colors.sub, marginBottom: 20 }}>Fill this once — customers nearby will find you.</Text>

      <Text style={[styles.label, { color: colors.text }]}>Services you offer</Text>
      <View style={styles.catWrap}>
        {CATEGORIES.map((c) => {
          const active = categories.includes(c.id);
          return (
            <TouchableOpacity
              key={c.id}
              onPress={() => toggleCat(c.id)}
              style={[styles.catChip, { backgroundColor: active ? c.color : colors.surface, borderColor: active ? c.color : colors.border }]}
            >
              <Text style={{ fontSize: 12 }}>{c.icon}</Text>
              <Text style={{ color: active ? '#fff' : colors.text, fontSize: 12, fontWeight: '600', marginLeft: 4 }}>{c.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={[styles.label, { color: colors.text, marginTop: 18 }]}>Experience</Text>
      <TextInput
        value={experience}
        onChangeText={setExperience}
        placeholder="e.g. 5 years"
        placeholderTextColor={colors.sub}
        style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]}
      />

      <Text style={[styles.label, { color: colors.text, marginTop: 16 }]}>About you</Text>
      <TextInput
        value={about}
        onChangeText={setAbout}
        placeholder="What work you do and how you work"
        placeholderTextColor={colors.sub}
        multiline
        style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text, minHeight: 80 }]}
      />

      <Text style={[styles.label, { color: colors.text, marginTop: 16 }]}>Starting charges (₹)</Text>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <TextInput
          value={charges}
          onChangeText={(t) => setCharges(t.replace(/\D/g, ''))}
          keyboardType="number-pad"
          placeholder="e.g. 300"
          placeholderTextColor={colors.sub}
          style={[styles.input, { flex: 1, backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]}
        />
        {['visit', 'hourly'].map((t) => (
          <TouchableOpacity
            key={t}
            onPress={() => setChargeType(t)}
            style={[styles.typeChip, { backgroundColor: chargeType === t ? colors.primary : colors.surface, borderColor: chargeType === t ? colors.primary : colors.border }]}
          >
            <Text style={{ color: chargeType === t ? '#fff' : colors.text, fontSize: 12, fontWeight: '600' }}>{t === 'visit' ? 'Per visit' : 'Hourly'}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.label, { color: colors.text, marginTop: 16 }]}>Service area</Text>
      <TextInput
        value={serviceArea}
        onChangeText={setServiceArea}
        placeholder="e.g. Within 8 km"
        placeholderTextColor={colors.sub}
        style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]}
      />

      <TouchableOpacity
        disabled={!canSubmit}
        onPress={submit}
        style={[styles.button, { backgroundColor: colors.primary, opacity: canSubmit ? 1 : 0.5 }]}
      >
        <Text style={styles.buttonText}>List me as a provider</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  title: { fontSize: 20, fontWeight: '800' },
  label: { fontSize: 13, fontWeight: '700', marginBottom: 8 },
  catWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  catChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 16, borderWidth: 1 },
  input: { borderWidth: 1, borderRadius: 12, padding: 13, fontSize: 14 },
  typeChip: { paddingHorizontal: 14, justifyContent: 'center', borderRadius: 12, borderWidth: 1 },
  button: { marginTop: 26, borderRadius: 12, paddingVertical: 15, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
