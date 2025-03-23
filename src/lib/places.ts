
import { Place } from '@/types';

export const HOLY_SITES: Place[] = [
  {
    id: 'kaaba',
    name: 'The Kaaba',
    arabicName: 'الكعبة',
    description: 'The most sacred site in Islam, located in the center of Masjid al-Haram',
    latitude: 21.4225,
    longitude: 39.8262,
    category: 'mosque',
    city: 'makkah'
  },
  {
    id: 'masjid-al-haram',
    name: 'Masjid al-Haram',
    arabicName: 'المسجد الحرام',
    description: 'The largest mosque in the world and surrounds the Kaaba',
    latitude: 21.4225,
    longitude: 39.8262,
    category: 'mosque',
    city: 'makkah'
  },
  {
    id: 'safa-marwa',
    name: 'Safa and Marwa',
    arabicName: 'الصفا والمروة',
    description: 'The two small hills between which Muslims travel back and forth seven times during Umrah',
    latitude: 21.4233,
    longitude: 39.8267,
    category: 'landmark',
    city: 'makkah'
  },
  {
    id: 'mina',
    name: 'Mina',
    arabicName: 'منى',
    description: 'A neighborhood of Mecca where pilgrims stay during Hajj',
    latitude: 21.4133,
    longitude: 39.8933,
    category: 'landmark',
    city: 'makkah'
  },
  {
    id: 'arafat',
    name: 'Mount Arafat',
    arabicName: 'جبل عرفات',
    description: 'A granite hill east of Mecca where Muslims gather during Hajj',
    latitude: 21.3550,
    longitude: 39.9842,
    category: 'landmark',
    city: 'makkah'
  },
  {
    id: 'muzdalifah',
    name: 'Muzdalifah',
    arabicName: 'مزدلفة',
    description: 'An open area near Mecca where pilgrims stay overnight during Hajj',
    latitude: 21.3833,
    longitude: 39.9408,
    category: 'landmark',
    city: 'makkah'
  },
  {
    id: 'jabal-al-nour',
    name: 'Jabal al-Nour',
    arabicName: 'جبل النور',
    description: 'Mountain near Mecca where the first verses of the Quran were revealed to Muhammad',
    latitude: 21.4583,
    longitude: 39.8625,
    category: 'landmark',
    city: 'makkah'
  },
  {
    id: 'masjid-al-nabawi',
    name: 'Masjid al-Nabawi',
    arabicName: 'المسجد النبوي',
    description: 'The second holiest site in Islam, the mosque was built by Prophet Muhammad',
    latitude: 24.4672,
    longitude: 39.6112,
    category: 'mosque',
    city: 'madinah'
  },
  {
    id: 'quba-mosque',
    name: 'Quba Mosque',
    arabicName: 'مسجد قباء',
    description: 'The oldest mosque in the world, its first stones were positioned by Prophet Muhammad',
    latitude: 24.4399,
    longitude: 39.6157,
    category: 'mosque',
    city: 'madinah'
  },
  {
    id: 'jannat-al-baqi',
    name: 'Jannat al-Baqi',
    arabicName: 'جنة البقيع',
    description: 'The main cemetery of Madinah where many of the companions of the Prophet are buried',
    latitude: 24.4677,
    longitude: 39.6128,
    category: 'landmark',
    city: 'madinah'
  }
];

export function getPlaceById(id: string): Place | undefined {
  return HOLY_SITES.find(place => place.id === id);
}

export function getPlacesByCity(city: 'makkah' | 'madinah' | 'jeddah'): Place[] {
  return HOLY_SITES.filter(place => place.city === city);
}

export function getPlacesByCategory(category: 'mosque' | 'landmark' | 'service' | 'other'): Place[] {
  return HOLY_SITES.filter(place => place.category === category);
}

export function getNearbyPlaces(latitude: number, longitude: number, radiusKm: number): Place[] {
  return HOLY_SITES.filter(place => {
    const distance = calculateDistance(latitude, longitude, place.latitude, place.longitude);
    return distance <= radiusKm;
  });
}

// Function to calculate distance between two coordinates using the Haversine formula
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Distance in km
  return distance;
}

function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI/180);
}
