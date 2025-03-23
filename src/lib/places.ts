
import { Place } from '@/types';

export const HOLY_PLACES: Place[] = [
  {
    id: 'kaaba',
    name: 'The Kaaba',
    arabicName: 'الكعبة',
    description: 'The sacred House of Allah, the most holy site in Islam.',
    latitude: 21.4225,
    longitude: 39.8262,
    category: 'mosque',
    city: 'makkah'
  },
  {
    id: 'masjid-al-haram',
    name: 'Masjid al-Haram',
    arabicName: 'المسجد الحرام',
    description: 'The Great Mosque of Mecca, surrounding the Kaaba.',
    latitude: 21.4225,
    longitude: 39.8262,
    category: 'mosque',
    city: 'makkah'
  },
  {
    id: 'safa-marwa',
    name: 'Safa and Marwa',
    arabicName: 'الصفا والمروة',
    description: 'Hills between which Muslims travel back and forth during Umrah.',
    latitude: 21.4231,
    longitude: 39.8267,
    category: 'landmark',
    city: 'makkah'
  },
  {
    id: 'mina',
    name: 'Mina',
    arabicName: 'منى',
    description: 'Valley and tent city near Mecca where pilgrims stay during Hajj.',
    latitude: 21.4133,
    longitude: 39.8895,
    category: 'landmark',
    city: 'makkah'
  },
  {
    id: 'arafat',
    name: 'Mount Arafat',
    arabicName: 'جبل عرفات',
    description: 'Mountain where Prophet Muhammad delivered his last sermon.',
    latitude: 21.3548,
    longitude: 39.9841,
    category: 'landmark',
    city: 'makkah'
  },
  {
    id: 'muzdalifah',
    name: 'Muzdalifah',
    arabicName: 'مزدلفة',
    description: 'Open area between Mina and Arafat where pilgrims spend a night during Hajj.',
    latitude: 21.3764,
    longitude: 39.9375,
    category: 'landmark',
    city: 'makkah'
  },
  {
    id: 'jamarat',
    name: 'Jamarat',
    arabicName: 'الجمرات',
    description: 'Pillars representing the devil, where pilgrims throw stones during Hajj.',
    latitude: 21.4225,
    longitude: 39.8721,
    category: 'landmark',
    city: 'makkah'
  },
  {
    id: 'prophets-mosque',
    name: "Prophet's Mosque",
    arabicName: 'المسجد النبوي',
    description: 'The second most holy site in Islam, built by Prophet Muhammad.',
    latitude: 24.4672,
    longitude: 39.6111,
    category: 'mosque',
    city: 'madinah'
  },
  {
    id: 'quba-mosque',
    name: 'Quba Mosque',
    arabicName: 'مسجد قباء',
    description: 'The first mosque in Islamic history, built upon the Prophet's arrival in Medina.',
    latitude: 24.4406,
    longitude: 39.6168,
    category: 'mosque',
    city: 'madinah'
  },
  {
    id: 'jannat-al-baqi',
    name: 'Jannat al-Baqi',
    arabicName: 'جنة البقيع',
    description: 'The main cemetery of Medina where many of the Prophet's companions are buried.',
    latitude: 24.4664,
    longitude: 39.6137,
    category: 'landmark',
    city: 'madinah'
  }
];

export function getPlacesByCity(city: 'makkah' | 'madinah' | 'jeddah'): Place[] {
  return HOLY_PLACES.filter(place => place.city === city);
}

export function getPlaceById(id: string): Place | undefined {
  return HOLY_PLACES.find(place => place.id === id);
}

export function getPlacesByCategory(category: string): Place[] {
  return HOLY_PLACES.filter(place => place.category === category);
}

export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}
