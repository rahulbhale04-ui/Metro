import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useApp } from '../store';
import { catById, STATUS_COLORS, STATUS_LABEL } from '../theme';

export default function MyBookingsScreen() {
  const { colors, bookings, updateBookingStatus } = useApp();

  const cancel = (id) => {
    Alert.alert('Cancel booking?', 'This cannot be undone.', [
      { text: 'Keep it', style: 'cancel' },
      { text: 'Cancel booking', style: 'destructive', onPress: () => updateBookingStatus(id, 'cancelled') },
    ]);
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.bg }]}>
      <Text style={[styles.header, { color: colors.text }]}>My bookings</Text>
      <FlatList
        data={bookings}
        keyExtractor={(b) => b.id}
        contentContainerStyle={{ padding: 16, paddingTop: 4, gap: 10, paddingBottom: 40 }}
        ListEmptyComponent={
          <View style={{ marginTop: 60, alignItems: 'center' }}>
            <Text style={{ fontSize: 40 }}>📋</Text>
            <Text style={{ color: colors.sub, marginTop: 8 }}>No bookings yet</Text>
          </View>
        }
        renderItem={({ item }) => {
          const cat = catById(item.category);
          const date = new Date(item.bookingDate);
          return (
            <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <View style={styles.rowBetween}>
                <Text style={{ color: colors.text, fontWeight: '700', fontSize: 15 }}>{cat.icon} {item.providerName}</Text>
                <View style={[styles.badge, { backgroundColor: STATUS_COLORS[item.status] + '22' }]}>
                  <Text style={{ color: STATUS_COLORS[item.status], fontSize: 11, fontWeight: '700' }}>{STATUS_LABEL[item.status]}</Text>
                </View>
              </View>
              <Text style={{ color: colors.sub, marginTop: 6, fontSize: 13 }}>
                {date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })} · {item.timeSlot}
              </Text>
              <Text style={{ color: colors.sub, fontSize: 13, marginTop: 2 }} numberOfLines={1}>{item.address}</Text>
              {item.status === 'pending' && (
                <TouchableOpacity onPress={() => cancel(item.id)} style={{ marginTop: 10 }}>
                  <Text style={{ color: colors.red, fontSize: 13, fontWeight: '600' }}>Cancel booking</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: { fontSize: 20, fontWeight: '800', padding: 20, paddingBottom: 8 },
  card: { padding: 14, borderRadius: 14, borderWidth: 1 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
});
