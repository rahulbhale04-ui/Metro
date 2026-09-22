import React, { createContext, useContext, useMemo, useState, useCallback, useEffect } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SEED_PROVIDERS } from './data';
import { light, dark } from './theme';

const Ctx = createContext(null);

const uid = (p = 'id') => `${p}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;

export function AppProvider({ children }) {
  const [booted, setBooted] = useState(false);
  const [themeMode, setThemeMode] = useState(Appearance.getColorScheme() === 'dark' ? 'dark' : 'light');
  const [user, setUser] = useState(null); // { uid, phone, name, role, favorites: [] }
  const [providers, setProviders] = useState(SEED_PROVIDERS);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem('metro_state_v1');
        if (raw) {
          const saved = JSON.parse(raw);
          if (saved.user) setUser(saved.user);
          if (saved.providers) setProviders(saved.providers);
          if (saved.bookings) setBookings(saved.bookings);
          if (saved.themeMode) setThemeMode(saved.themeMode);
        }
      } catch (e) {
        // ignore corrupt storage
      } finally {
        setBooted(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (!booted) return;
    AsyncStorage.setItem(
      'metro_state_v1',
      JSON.stringify({ user, providers, bookings, themeMode })
    ).catch(() => {});
  }, [booted, user, providers, bookings, themeMode]);

  const login = useCallback((phone) => {
    setUser({ uid: uid('u'), phone, name: '', role: 'user', favorites: [] });
  }, []);

  const completeProfile = useCallback((name) => {
    setUser((u) => (u ? { ...u, name } : u));
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const toggleFavorite = useCallback((providerId) => {
    setUser((u) => {
      if (!u) return u;
      const has = u.favorites.includes(providerId);
      return { ...u, favorites: has ? u.favorites.filter((id) => id !== providerId) : [...u.favorites, providerId] };
    });
  }, []);

  const registerProvider = useCallback((profile) => {
    const newProvider = {
      id: uid('p'),
      userId: user?.uid || uid('u'),
      rating: 0,
      totalReviews: 0,
      isAvailable: true,
      isVerified: false,
      createdAt: new Date().toISOString(),
      distanceKm: Math.round((Math.random() * 5 + 0.5) * 10) / 10,
      ...profile,
    };
    setProviders((list) => [newProvider, ...list]);
    setUser((u) => (u ? { ...u, role: 'provider', providerId: newProvider.id } : u));
    return newProvider;
  }, [user]);

  const setProviderAvailability = useCallback((providerId, isAvailable) => {
    setProviders((list) => list.map((p) => (p.id === providerId ? { ...p, isAvailable } : p)));
  }, []);

  const createBooking = useCallback((booking) => {
    const newBooking = {
      id: uid('b'),
      userId: user?.uid,
      status: 'pending',
      createdAt: new Date().toISOString(),
      ...booking,
    };
    setBookings((list) => [newBooking, ...list]);
    return newBooking;
  }, [user]);

  const updateBookingStatus = useCallback((bookingId, status) => {
    setBookings((list) => list.map((b) => (b.id === bookingId ? { ...b, status } : b)));
  }, []);

  const value = useMemo(() => ({
    booted,
    themeMode,
    colors: themeMode === 'dark' ? dark : light,
    toggleTheme: () => setThemeMode((m) => (m === 'dark' ? 'light' : 'dark')),
    user,
    login,
    completeProfile,
    logout,
    providers,
    toggleFavorite,
    registerProvider,
    setProviderAvailability,
    bookings,
    createBooking,
    updateBookingStatus,
  }), [booted, themeMode, user, providers, bookings, login, completeProfile, logout, toggleFavorite, registerProvider, setProviderAvailability, createBooking, updateBookingStatus]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useApp = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
