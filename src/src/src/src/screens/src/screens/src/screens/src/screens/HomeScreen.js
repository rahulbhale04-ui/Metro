import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { useApp } from '../store';
import { CATEGORIES, catById } from '../theme';

function Stars({ rating, size = 12, color }) {
  const full = Math.round(rating);
  return (
    <Text style={{ fontSize: size, color }}>
      {'★'.repeat(full)}{'☆'.repeat(5 - full)}
    </Text>
  );
}

function CategoryChip({ item, active, onPress, colors }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.catChip,
        { backgroundColor: active ? item.color : colors.surface, borderColor: active ? item.color : colors.border },
      ]}
    >
      <Text style={styles.catIcon}>{item.icon}</Text>
      <Text style={[styles.catLabel, { color: active ? '#fff' : colors.text }]}>{item.name}</Text>
    </TouchableOpacity>
  );
}

function ProviderRow({ p, colors, fav, onToggleFav, onPress }) {
  const cat = catById(p.categories[0]);
  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={[styles.avatar, { backgroundColor: cat.color + '22' }]}>
        <Text style={{ fontSize: 22 }}>{cat.icon}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.rowBetween}>
          <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>{p.name}</Text>
          <TouchableOpacity onPress={onToggleFav} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={{ fontSize: 18, color: fav ? colors.red : colors.sub }}>{fav ? '♥' : '♡'}</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ color: colors.sub, fontSize: 12 }} numberOfLines={1}>
          {cat.name} · {p.experience} exp · {p.distanceKm} km away
        </Text>
        <View style={styles.rowBetween}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Stars rating={p.rating} color={colors.amber} />
            <Text style={{ color: colors.sub, fontSize: 12 }}>{p.rating.toFixed(1)} ({p.totalReviews})</Text>
          </View>
          <View style={[styles.availDot, { backgroundColor: p.isAvailable ? colors.green : colors.sub }]} />
          <Text style={{ color: colors.sub, fontSize: 11 }}>{p.isAvailable ? 'Available' : 'Busy'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function HomeScreen({ navigation }) {
  const { colors, user, providers, toggleFavorite } = useApp();
  const [category, setCategory] = useState(null);

  const list = useMemo(() => {
    const filtered = category ? providers.filter((p) => p.categories.includes(category)) : providers;
    return [...filtered].sort((a, b) => a.distanceKm - b.distanceKm);
  }, [providers, category]);

  return (
    <View style={[styles.screen, { backgroundColor: colors.bg }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.hello, { color: colors.sub }]}>Hi {user?.name || 'there'},</Text>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Find a service near you</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Search')} style={[styles.searchBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={{ fontSize: 16 }}>🔍</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={CATEGORIES}
        keyExtractor={(c) => c.id}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 10 }}
        renderItem={({ item }) => (
          <CategoryChip
            item={item}
            colors={colors}
            active={category === item.id}
            onPress={() => setCategory(category === item.id ? null : item.id)}
          />
        )}
        style={{ flexGrow: 0, marginBottom: 8 }}
      />

      <FlatList
        data={list}
        keyExtractor={(p) => p.id}
        contentContainerStyle={{ padding: 16, paddingTop: 8, paddingBottom: 100, gap: 12 }}
        ListEmptyComponent={<Text style={{ color: colors.sub, textAlign: 'center', marginTop: 40 }}>No providers in this category yet.</Text>}
        renderItem={({ item }) => (
          <ProviderRow
            p={item}
            colors={colors}
            fav={!!user?.favorites?.includes(item.id)}
            onToggleFav={() => toggleFavorite(item.id)}
            onPress={() => navigation.navigate('ProviderDetail', { providerId: item.id })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  hello: { fontSize: 13 },
  headerTitle: { fontSize: 20, fontWeight: '800', marginTop: 2 },
  searchBtn: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  catChip: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 9, borderRadius: 20, borderWidth: 1 },
  catIcon: { fontSize: 14 },
  catLabel: { fontSize: 13, fontWeight: '600' },
  card: { flexDirection: 'row', gap: 12, padding: 12, borderRadius: 16, borderWidth: 1 },
  avatar: { width: 52, height: 52, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 15, fontWeight: '700', flex: 1, marginRight: 8 },
  availDot: { width: 7, height: 7, borderRadius: 4, marginLeft: 8, marginRight: 4 },
});
