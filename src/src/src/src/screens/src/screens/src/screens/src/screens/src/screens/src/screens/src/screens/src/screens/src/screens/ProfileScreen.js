import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, FlatList } from 'react-native';
import { useApp } from '../store';
import { catById } from '../theme';

export default function ProfileScreen({ navigation }) {
  const { colors, themeMode, toggleTheme, user, logout, providers, toggleFavorite } = useApp();
  const favProviders = providers.filter((p) => user?.favorites?.includes(p.id));
  const myProvider = providers.find((p) => p.id === user?.providerId);

  return (
    <View style={[styles.screen, { backgroundColor: colors.bg }]}>
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: colors.primarySoft }]}>
          <Text style={{ fontSize: 20, fontWeight: '800', color: colors.primary }}>{(user?.name || 'G')[0].toUpperCase()}</Text>
        </View>
        <View>
          <Text style={[styles.name, { color: colors.text }]}>{user?.name || 'Guest'}</Text>
          <Text style={{ color: colors.sub, fontSize: 13 }}>+91 {user?.phone}</Text>
        </View>
      </View>

      {myProvider ? (
        <TouchableOpacity style={[styles.row, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={{ color: colors.text, fontWeight: '600' }}>You're listed as {catById(myProvider.categories[0]).name}</Text>
          <Text style={{ color: colors.sub, fontSize: 12, marginTop: 2 }}>{myProvider.isAvailable ? 'Currently available' : 'Currently busy'}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => navigation.navigate('ProviderRegister')}
          style={[styles.row, { backgroundColor: colors.primarySoft, borderColor: colors.primarySoft }]}
        >
          <Text style={{ color: colors.primary, fontWeight: '700' }}>Register as a service provider</Text>
          <Text style={{ color: colors.primary, fontSize: 12, marginTop: 2 }}>Start getting bookings from people nearby</Text>
        </TouchableOpacity>
      )}

      <View style={[styles.row, { backgroundColor: colors.surface, borderColor: colors.border, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
        <Text style={{ color: colors.text, fontWeight: '600' }}>Dark mode</Text>
        <Switch value={themeMode === 'dark'} onValueChange={toggleTheme} />
      </View>

      <Text style={[styles.section, { color: colors.text }]}>Favorites</Text>
      <FlatList
        data={favProviders}
        keyExtractor={(p) => p.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}
        ListEmptyComponent={<Text style={{ color: colors.sub, paddingHorizontal: 20 }}>No favorites saved yet.</Text>}
        renderItem={({ item }) => {
          const cat = catById(item.categories[0]);
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('ProviderDetail', { providerId: item.id })}
              onLongPress={() => toggleFavorite(item.id)}
              style={[styles.favCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
              <Text style={{ fontSize: 22 }}>{cat.icon}</Text>
              <Text style={{ color: colors.text, fontSize: 12, fontWeight: '600', marginTop: 6 }} numberOfLines={1}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />

      <TouchableOpacity onPress={logout} style={[styles.logout, { borderColor: colors.border }]}>
        <Text style={{ color: colors.red, fontWeight: '700' }}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingTop: 20 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 20, marginBottom: 20 },
  avatar: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
  name: { fontSize: 18, fontWeight: '800' },
  row: { marginHorizontal: 20, padding: 14, borderRadius: 14, borderWidth: 1, marginBottom: 12 },
  section: { fontSize: 15, fontWeight: '800', paddingHorizontal: 20, marginTop: 8, marginBottom: 10 },
  favCard: { width: 84, padding: 12, borderRadius: 14, borderWidth: 1, alignItems: 'center' },
  logout: { marginHorizontal: 20, marginTop: 24, paddingVertical: 14, borderRadius: 12, borderWidth: 1, alignItems: 'center' },
});
