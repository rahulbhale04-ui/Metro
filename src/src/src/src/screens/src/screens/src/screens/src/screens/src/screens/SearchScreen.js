import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useApp } from '../store';
import { catById } from '../theme';

export default function SearchScreen({ navigation }) {
  const { colors, providers } = useApp();
  const [q, setQ] = useState('');

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return providers.filter((p) => {
      const cat = catById(p.categories[0]);
      return p.name.toLowerCase().includes(term) || cat.name.toLowerCase().includes(term) || p.serviceArea.toLowerCase().includes(term);
    });
  }, [q, providers]);

  return (
    <View style={[styles.screen, { backgroundColor: colors.bg }]}>
      <View style={styles.searchRow}>
        <TextInput
          autoFocus
          value={q}
          onChangeText={setQ}
          placeholder="Search name, service, or area"
          placeholderTextColor={colors.sub}
          style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]}
        />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: colors.primary, fontWeight: '600' }}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={results}
        keyExtractor={(p) => p.id}
        contentContainerStyle={{ padding: 16, gap: 8 }}
        ListEmptyComponent={
          q ? <Text style={{ color: colors.sub, textAlign: 'center', marginTop: 30 }}>No matches for "{q}"</Text> : null
        }
        renderItem={({ item }) => {
          const cat = catById(item.categories[0]);
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('ProviderDetail', { providerId: item.id })}
              style={[styles.row, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
              <Text style={{ fontSize: 20 }}>{cat.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ color: colors.text, fontWeight: '700' }}>{item.name}</Text>
                <Text style={{ color: colors.sub, fontSize: 12 }}>{cat.name} · {item.serviceArea}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingTop: 12 },
  searchRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16 },
  input: { flex: 1, borderWidth: 1, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 11, fontSize: 15 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, borderRadius: 14, borderWidth: 1 },
});
