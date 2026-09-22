// Demo data. Phone numbers are placeholders; replace with real providers
// (or connect a backend) before publishing.
export const SEED_PROVIDERS = [
  { id: 'p1', userId: 'seed', name: 'Rajesh Kumar', phone: '9000000001', categories: ['electrician'], experience: '12 years', about: 'Wiring, fan and light fitting, MCB and inverter work. Same-day visits.', charges: 300, chargeType: 'visit', rating: 4.8, totalReviews: 126, serviceArea: 'Within 8 km', distanceKm: 0.8, isAvailable: true, isVerified: true },
  { id: 'p2', userId: 'seed', name: 'Sunil Sharma', phone: '9000000002', categories: ['plumber'], experience: '9 years', about: 'Leakage repair, tap and pipe fitting, bathroom and kitchen plumbing.', charges: 250, chargeType: 'visit', rating: 4.6, totalReviews: 89, serviceArea: 'Within 6 km', distanceKm: 1.2, isAvailable: true, isVerified: true },
  { id: 'p3', userId: 'seed', name: 'Meena Devi', phone: '9000000003', categories: ['maid', 'cook'], experience: '7 years', about: 'Daily cleaning, utensils and home-style cooking. Morning and evening slots.', charges: 150, chargeType: 'hourly', rating: 4.7, totalReviews: 64, serviceArea: 'Within 4 km', distanceKm: 1.5, isAvailable: true, isVerified: true },
  { id: 'p4', userId: 'seed', name: 'Anil Verma', phone: '9000000004', categories: ['ac_repair'], experience: '10 years', about: 'AC service, gas filling, installation, and fridge or washing machine repair.', charges: 400, chargeType: 'visit', rating: 4.5, totalReviews: 142, serviceArea: 'Within 10 km', distanceKm: 2.1, isAvailable: false, isVerified: true },
  { id: 'p5', userId: 'seed', name: 'Farhan Ali', phone: '9000000005', categories: ['carpenter'], experience: '15 years', about: 'Furniture repair, modular kitchen, doors and wardrobes made to order.', charges: 500, chargeType: 'visit', rating: 4.9, totalReviews: 73, serviceArea: 'Within 12 km', distanceKm: 2.4, isAvailable: true, isVerified: true },
  { id: 'p6', userId: 'seed', name: 'Priya Singh', phone: '9000000006', categories: ['tutor'], experience: '6 years', about: 'Maths and Science for classes 6 to 10. Home tuition and doubt classes.', charges: 300, chargeType: 'hourly', rating: 4.8, totalReviews: 41, serviceArea: 'Within 5 km', distanceKm: 2.8, isAvailable: true, isVerified: false },
  { id: 'p7', userId: 'seed', name: 'Ramesh Yadav', phone: '9000000007', categories: ['driver'], experience: '14 years', about: 'Experienced driver for outstation and city trips. Own uniform, clean record.', charges: 600, chargeType: 'visit', rating: 4.4, totalReviews: 58, serviceArea: 'City wide', distanceKm: 3.0, isAvailable: true, isVerified: true },
  { id: 'p8', userId: 'seed', name: 'Neha Khan', phone: '9000000008', categories: ['beautician'], experience: '8 years', about: 'Bridal and party makeup, facial, waxing and hair care at your home.', charges: 500, chargeType: 'visit', rating: 4.9, totalReviews: 97, serviceArea: 'Within 8 km', distanceKm: 3.4, isAvailable: true, isVerified: true },
  { id: 'p9', userId: 'seed', name: 'Mohan Lal', phone: '9000000009', categories: ['painter'], experience: '18 years', about: 'Interior and exterior painting, waterproofing and texture finishes.', charges: 800, chargeType: 'visit', rating: 4.6, totalReviews: 52, serviceArea: 'Within 15 km', distanceKm: 4.2, isAvailable: true, isVerified: false },
  { id: 'p10', userId: 'seed', name: 'Kavita Rao', phone: '9000000010', categories: ['cook'], experience: '11 years', about: 'Tiffin service and party cooking. North Indian, South Indian and Chinese.', charges: 200, chargeType: 'hourly', rating: 4.7, totalReviews: 78, serviceArea: 'Within 7 km', distanceKm: 4.6, isAvailable: false, isVerified: true },
  { id: 'p11', userId: 'seed', name: 'Imran Sheikh', phone: '9000000011', categories: ['electrician', 'ac_repair'], experience: '8 years', about: 'Electrical repair, geyser and inverter installation, split AC service.', charges: 350, chargeType: 'visit', rating: 4.3, totalReviews: 35, serviceArea: 'Within 9 km', distanceKm: 5.1, isAvailable: true, isVerified: false },
  { id: 'p12', userId: 'seed', name: 'Geeta Kumari', phone: '9000000012', categories: ['maid'], experience: '5 years', about: 'Full-day and part-time house help. Deep cleaning on request.', charges: 120, chargeType: 'hourly', rating: 4.5, totalReviews: 29, serviceArea: 'Within 3 km', distanceKm: 5.8, isAvailable: true, isVerified: false },
].map((p) => ({ ...p, createdAt: '2026-01-01' }));

export const REVIEW_POOL = [
  { name: 'Amit', rating: 5, text: 'Came on time and finished the work neatly. Fair price.', when: '2 weeks ago' },
  { name: 'Sonia', rating: 5, text: 'Very polite and professional. Will book again.', when: '1 month ago' },
  { name: 'Vikram', rating: 4, text: 'Good work, took a little longer than expected.', when: '1 month ago' },
  { name: 'Pooja', rating: 5, text: 'Explained the problem clearly before starting. Recommended.', when: '2 months ago' },
  { name: 'Deepak', rating: 4, text: 'Reasonable charges and the work is holding up well.', when: '3 months ago' },
  { name: 'Rina', rating: 5, text: 'Quick response on call and reached the same day.', when: '3 months ago' },
];

export const TIME_SLOTS = ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM', '7:00 PM'];
