import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';
import { useApp } from '../store';
import { catById } from '../theme';
import { REVIEW_POOL } from '../data';

function Stars({ rating, size = 14, color }) {
  const full = Math.round(rating);
  return <Text style={{ fontSize: size, color }}>{'★'.repeat(full)}{'☆'.repeat(5 - full)}</Text>;
}

export default function ProviderDetailScreen({ route, navigation }) {
  const { providerId } = route.params;
  const { colors, providers, user, toggleFavorite } = useApp();
  const p = providers.find((x) => x.id === providerId);
  const reviews = useMemo(() => REVIEW_POOL.slice(0, 3 + (providerId.length % 3)), [providerId]);

  if (!p) {
    return (
      <View style={[styles.screen, { backgroundColor: colors.bg, justifyContent: 'center' }]}>
        <Text style={{ color: colors.text, textAlign: 'center' }}>Provider not found.</Text>
      </View>
    );
  }

  const cat = catById(p.categories[0]);
  const fav = !!user?.favorites?.includes(p.id);

  const call = () => Linking.openURL(`tel:${p.phone}`);
  const whatsapp = () => Linking.openURL(`https://wa.me/91${p.phone}?text=${encodeURIComponent(`Hi ${p.name}, I found you on Metro for ${cat.name} services.`)}`);

  return (
    <ScrollView style={[styles.screen, { backgroundColor: colors.bg }]} contentContainerStyle={{ paddingBottom: 120 }}>
      <View style={styles.heroRow}>
        <View style={[styles.avatar, { backgroundColor: cat.color + '22' }]}>
          <Text style={{ fontSize: 34 }}>{cat.icon}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.rowBetween}>
            <Text style={[styles.name, { color: colors.text }]}>{p.name}</Text>
            {p.isVerified && <Text style={{ color: colors.green, fontSize: 12, fontWeight: '700' }}>✓ Verified</Text>}
          </View>
          <Text style={{ color: colors.sub, marginTop: 2 }}>{cat.name} · {p.experience} experience</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 }}>
            <Stars rating={p.rating} color={colors.amber} />
            <Text style={{ color: colors.sub, fontSize: 13 }}>{p.rating.toFixed(1)} ({p.totalReviews} reviews)</Text>
          </View>
        </View>
      </View>

      <View style={[styles.statsRow, { borderColor: colors.border }]}>
        <View style={styles.statBox}>
          <Text style={[styles.statVal, { color: colors.text }]}>₹{p.charges}</Text>
          <Text style={[styles.statLabel, { color: colors.sub }]}>per {p.chargeType}</Text>
        </View>
        <View style={[styles.statBox, { borderLeftWidth: 1, borderRightWidth: 1, borderColor: colors.border }]}>
          <Text style={[styles.statVal, { color: colors.text }]}>{p.distanceKm} km</Text>
          <Text style={[styles.statLabel, { color: colors.sub }]}>away</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statVal, { color: p.isAvailable ? colors.green : colors.red }]}>{p.isAvailable ? 'Yes' : 'No'}</Text>
          <Text style={[styles.statLabel, { color: colors.sub }]}>available</Text>
        </View>
      </View>

      <Text style={[styles.section, { color: colors.text }]}>About</Text>
      <Text style={{ color: colors.sub, paddingHorizontal: 20, lineHeight: 20 }}>{p.about}</Text>

      <Text style={[styles.section, { color: colors.text }]}>Service area</Text>
      <Text style={{ color: colors.sub, paddingHorizontal: 20 }}>{p.serviceArea}</Text>

      <View style={styles.actionRow}>
        <TouchableOpacity onPress={call} style={[styles.actionBtn, { backgroundColor: colors.chip }]}>
          <Text style={{ color: colors.text, fontWeight: '700' }}>📞 Call</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={whatsapp} style={[styles.actionBtn, { backgroundColor: colors.chip }]}>
          <Text style={{ color: colors.text, fontWeight: '700' }}>💬 WhatsApp</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFavorite(p.id)} style={[styles.actionBtn, { backgroundColor: colors.chip }]}>
          <Text style={{ color: colors.text, fontWeight: '700' }}>{fav ? '♥ Saved' : '♡ Save'}</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.section, { color: colors.text }]}>Reviews</Text>
      <View style={{ paddingHorizontal: 20, gap: 10 }}>
        {reviews.map((r, i) => (
          <View key={i} style={[styles.reviewCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.rowBetween}>
              <Text style={{ color: colors.text, fontWeight: '700' }}>{r.name}</Text>
              <Stars rating={r.rating} size={12} color={colors.amber} />
            </View>
            <Text style={{ color: colors.sub, marginTop: 4 }}>{r.text}</Text>
            <Text style={{ color: colors.sub, fontSize: 11, marginTop: 4 }}>{r.when}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.bookBar, { backgroundColor: colors.bg, borderColor: colors.border }]}>
        <TouchableOpacity
          onPress={() => navigation.navigate('BookService', { providerId: p.id })}
          style={[styles.bookBtn, { backgroundColor: colors.primary }]}
        >
          <Text style={styles.bookBtnText}>Book this provider</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  heroRow: { flexDirection: 'row', gap: 16, padding: 20, alignItems: 'center' },
  avatar: { width: 74, height: 74, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 19, fontWeight: '800' },
  statsRow: { flexDirection: 'row', marginHorizontal: 20, borderWidth: 1, borderRadius: 14, marginBottom: 20 },
  statBox: { flex: 1, alignItems: 'center', paddingVertical: 12 },
  statVal: { fontSize: 15, fontWeight: '800' },
  statLabel: { fontSize: 11, marginTop: 2 },
  section: { fontSize: 15, fontWeight: '800', paddingHorizontal: 20, marginTop: 16, marginBottom: 6 },
  actionRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 20, marginTop: 18 },
  actionBtn: { flex: 1, paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  reviewCard: { padding: 12, borderRadius: 14, borderWidth: 1 },
  bookBar: { position: 'absolute', left: 0, right: 0, bottom: 0, padding: 16, borderTopWidth: 1 },
  bookBtn: { borderRadius: 12, paddingVertical: 15, alignItems: 'center' },
  bookBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
