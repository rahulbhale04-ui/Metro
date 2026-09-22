export const CATEGORIES = [
  { id: 'electrician', name: 'Electrician', icon: '⚡', color: '#FBBF24' },
  { id: 'plumber', name: 'Plumber', icon: '🔧', color: '#3B82F6' },
  { id: 'carpenter', name: 'Carpenter', icon: '🪚', color: '#92400E' },
  { id: 'maid', name: 'Maid', icon: '🧹', color: '#10B981' },
  { id: 'cook', name: 'Cook', icon: '🍲', color: '#EF4444' },
  { id: 'tutor', name: 'Tutor', icon: '📚', color: '#8B5CF6' },
  { id: 'ac_repair', name: 'AC Repair', icon: '❄️', color: '#06B6D4' },
  { id: 'driver', name: 'Driver', icon: '🚗', color: '#64748B' },
  { id: 'beautician', name: 'Beautician', icon: '💅', color: '#EC4899' },
  { id: 'painter', name: 'Painter', icon: '🎨', color: '#F97316' },
];

export const catById = (id) => CATEGORIES.find((c) => c.id === id) || CATEGORIES[0];

export const light = {
  bg: '#F8FAFC', surface: '#FFFFFF', text: '#0F172A', sub: '#64748B',
  border: '#E2E8F0', primary: '#2563EB', primarySoft: '#DBEAFE', onPrimary: '#FFFFFF',
  green: '#10B981', amber: '#F59E0B', red: '#EF4444', chip: '#EEF2F7',
};

export const dark = {
  bg: '#0F172A', surface: '#1E293B', text: '#F1F5F9', sub: '#94A3B8',
  border: '#334155', primary: '#3B82F6', primarySoft: '#1E3A8A', onPrimary: '#FFFFFF',
  green: '#34D399', amber: '#FBBF24', red: '#F87171', chip: '#273449',
};

export const STATUS_COLORS = {
  pending: '#F59E0B', accepted: '#10B981', rejected: '#EF4444',
  completed: '#2563EB', cancelled: '#64748B',
};

export const STATUS_LABEL = {
  pending: 'Waiting for provider', accepted: 'Accepted', rejected: 'Rejected',
  completed: 'Completed', cancelled: 'Cancelled',
};
