
import { 
  Hotel, 
  Flight, 
  UmrahPackage, 
  TransportOption, 
  WeatherData, 
  ClothingRecommendation 
} from '@/types';
import { calculateDistance } from './places';

// Mock Hotels Data
export const HOTELS: Hotel[] = [
  {
    id: 'hotel-1',
    name: 'Al Safwah Royale Orchid Hotel',
    description: 'Luxury hotel with direct view of the Kaaba',
    address: 'Abraj Al Bait Towers, King Abdulaziz Endowment',
    city: 'makkah',
    latitude: 21.4177,
    longitude: 39.8262,
    priceRange: {
      min: 250,
      max: 500,
      currency: 'USD'
    },
    rating: 4.7,
    amenities: ['Free WiFi', 'Breakfast', 'Prayer room', 'Airport shuttle', 'Air conditioning'],
    images: ['/hotels/hotel1-1.jpg', '/hotels/hotel1-2.jpg', '/hotels/hotel1-3.jpg'],
    reviews: [
      {
        id: 'rev-1-1',
        userName: 'Ahmed K.',
        rating: 5,
        comment: 'Excellent location, just steps away from Masjid al-Haram.',
        date: '2023-11-15'
      },
      {
        id: 'rev-1-2',
        userName: 'Fatima S.',
        rating: 4,
        comment: 'Clean rooms and helpful staff. Breakfast could be better.',
        date: '2023-10-22'
      }
    ]
  },
  {
    id: 'hotel-2',
    name: 'Makkah Millennium Hotel',
    description: 'Elegant hotel with direct access to Masjid al-Haram',
    address: 'Jabal Omar, Ibrahim Al Khalil St',
    city: 'makkah',
    latitude: 21.4214,
    longitude: 39.8242,
    priceRange: {
      min: 180,
      max: 350,
      currency: 'USD'
    },
    rating: 4.5,
    amenities: ['Free WiFi', 'Restaurant', 'Room service', 'Business center', 'Air conditioning'],
    images: ['/hotels/hotel2-1.jpg', '/hotels/hotel2-2.jpg']
  },
  {
    id: 'hotel-3',
    name: 'Dar Al Taqwa Hotel',
    description: 'Upscale hotel in front of Masjid al-Nabawi',
    address: 'Central Area, Madinah',
    city: 'madinah',
    latitude: 24.4677,
    longitude: 39.6109,
    priceRange: {
      min: 150,
      max: 300,
      currency: 'USD'
    },
    rating: 4.3,
    amenities: ['Free WiFi', 'Breakfast', 'Restaurant', 'Gym', 'Air conditioning'],
    images: ['/hotels/hotel3-1.jpg', '/hotels/hotel3-2.jpg']
  },
  {
    id: 'hotel-4',
    name: 'Madinah Hilton Hotel',
    description: 'Modern hotel with excellent facilities near Masjid al-Nabawi',
    address: 'King Fahd Rd, Madinah',
    city: 'madinah',
    latitude: 24.4685,
    longitude: 39.6151,
    priceRange: {
      min: 200,
      max: 400,
      currency: 'USD'
    },
    rating: 4.6,
    amenities: ['Free WiFi', 'Swimming pool', 'Spa', 'Restaurant', 'Business center'],
    images: ['/hotels/hotel4-1.jpg', '/hotels/hotel4-2.jpg']
  },
  {
    id: 'hotel-5',
    name: 'Jeddah Intercontinental',
    description: 'Beachfront hotel with stunning Red Sea views',
    address: 'Al Hamra District, Jeddah',
    city: 'jeddah',
    latitude: 21.5433,
    longitude: 39.1728,
    priceRange: {
      min: 220,
      max: 450,
      currency: 'USD'
    },
    rating: 4.8,
    amenities: ['Free WiFi', 'Beach access', 'Swimming pool', 'Spa', 'Multiple restaurants'],
    images: ['/hotels/hotel5-1.jpg', '/hotels/hotel5-2.jpg']
  }
];

// Mock Flights Data
export const FLIGHTS: Flight[] = [
  {
    id: 'flight-1',
    airline: 'Saudi Airlines',
    flightNumber: 'SV123',
    departureCity: 'London',
    departureAirport: 'LHR',
    departureTime: '2023-12-15T08:30:00',
    arrivalCity: 'Jeddah',
    arrivalAirport: 'JED',
    arrivalTime: '2023-12-15T16:45:00',
    price: 780,
    currency: 'USD',
    duration: '6h 15m',
    stops: 0
  },
  {
    id: 'flight-2',
    airline: 'Emirates',
    flightNumber: 'EK366',
    departureCity: 'New York',
    departureAirport: 'JFK',
    departureTime: '2023-12-16T22:15:00',
    arrivalCity: 'Jeddah',
    arrivalAirport: 'JED',
    arrivalTime: '2023-12-17T20:30:00',
    price: 1150,
    currency: 'USD',
    duration: '14h 15m',
    stops: 1
  },
  {
    id: 'flight-3',
    airline: 'Qatar Airways',
    flightNumber: 'QR778',
    departureCity: 'Paris',
    departureAirport: 'CDG',
    departureTime: '2023-12-17T14:00:00',
    arrivalCity: 'Madinah',
    arrivalAirport: 'MED',
    arrivalTime: '2023-12-18T01:20:00',
    price: 920,
    currency: 'USD',
    duration: '9h 20m',
    stops: 1
  },
  {
    id: 'flight-4',
    airline: 'Turkish Airlines',
    flightNumber: 'TK104',
    departureCity: 'Istanbul',
    departureAirport: 'IST',
    departureTime: '2023-12-15T11:45:00',
    arrivalCity: 'Jeddah',
    arrivalAirport: 'JED',
    arrivalTime: '2023-12-15T15:50:00',
    price: 580,
    currency: 'USD',
    duration: '4h 05m',
    stops: 0
  },
  {
    id: 'flight-5',
    airline: 'Etihad Airways',
    flightNumber: 'EY371',
    departureCity: 'Dubai',
    departureAirport: 'DXB',
    departureTime: '2023-12-16T09:30:00',
    arrivalCity: 'Madinah',
    arrivalAirport: 'MED',
    arrivalTime: '2023-12-16T11:45:00',
    price: 420,
    currency: 'USD',
    duration: '2h 15m',
    stops: 0
  }
];

// Mock Umrah Packages
export const UMRAH_PACKAGES: UmrahPackage[] = [
  {
    id: 'package-1',
    name: 'Premium Umrah Package',
    provider: 'Al Haram Travel',
    description: 'All-inclusive premium package with 5-star accommodations in Makkah and Madinah',
    duration: 10,
    price: 2500,
    currency: 'USD',
    includes: [
      'Return flights from major cities',
      '5-star hotel accommodations',
      'Private transportation',
      'Guided Umrah rituals',
      'Visit to historical sites',
      'All meals included'
    ],
    excludes: [
      'Personal expenses',
      'Visa fees',
      'Travel insurance'
    ],
    itinerary: [
      {
        day: 1,
        description: 'Arrival at Jeddah Airport, transfer to Makkah',
        activities: ['Airport pickup', 'Check-in at hotel in Makkah']
      },
      {
        day: 2,
        description: 'Performing Umrah',
        activities: ['Guided Umrah rituals', 'Rest and prayers at Masjid al-Haram']
      },
      {
        day: 3,
        description: 'Exploration of holy sites in Makkah',
        activities: ['Visit to historical sites', 'Shopping in local markets']
      }
    ],
    rating: 4.8
  },
  {
    id: 'package-2',
    name: 'Economy Umrah Package',
    provider: 'Tawakkul Travels',
    description: 'Affordable package with comfortable accommodations and essential services',
    duration: 7,
    price: 1200,
    currency: 'USD',
    includes: [
      'Return flights from selected cities',
      '3-star hotel accommodations',
      'Shared transportation',
      'Basic guidance for Umrah rituals'
    ],
    excludes: [
      'Meals (except breakfast)',
      'Personal expenses',
      'Visa fees',
      'Travel insurance'
    ],
    itinerary: [
      {
        day: 1,
        description: 'Arrival and transfer to Makkah',
        activities: ['Airport pickup', 'Check-in at hotel']
      },
      {
        day: 2,
        description: 'Performing Umrah',
        activities: ['Umrah rituals', 'Prayers at Masjid al-Haram']
      }
    ],
    rating: 4.1
  },
  {
    id: 'package-3',
    name: 'Deluxe Family Umrah Package',
    provider: 'Baraka Hajj & Umrah',
    description: 'Special package designed for families with spacious accommodations and family-friendly services',
    duration: 14,
    price: 3200,
    currency: 'USD',
    includes: [
      'Return flights',
      'Family rooms in 4-star hotels',
      'Private transportation',
      'Guided tours',
      'Family meal plans',
      'Child care services'
    ],
    excludes: [
      'Personal expenses',
      'Visa fees',
      'Travel insurance',
      'Additional excursions'
    ],
    itinerary: [
      {
        day: 1,
        description: 'Arrival and settlement in Makkah',
        activities: ['Airport pickup', 'Check-in at hotel', 'Orientation']
      },
      {
        day: 2,
        description: 'Umrah preparation and performance',
        activities: ['Preparation for Umrah', 'Guided Umrah rituals']
      }
    ],
    rating: 4.6
  }
];

// Mock Transportation Options
export const TRANSPORT_OPTIONS: TransportOption[] = [
  {
    id: 'transport-1',
    type: 'bus',
    from: 'Jeddah Airport',
    to: 'Makkah',
    duration: '1h 30m',
    price: 25,
    currency: 'SAR',
    schedule: ['07:00', '09:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00']
  },
  {
    id: 'transport-2',
    type: 'train',
    from: 'Jeddah',
    to: 'Makkah',
    duration: '45m',
    price: 40,
    currency: 'SAR',
    schedule: ['06:30', '08:30', '10:30', '12:30', '14:30', '16:30', '18:30', '20:30']
  },
  {
    id: 'transport-3',
    type: 'taxi',
    from: 'Jeddah Airport',
    to: 'Makkah',
    duration: '1h 15m',
    price: 150,
    currency: 'SAR',
    schedule: ['Available 24/7']
  },
  {
    id: 'transport-4',
    type: 'bus',
    from: 'Makkah',
    to: 'Madinah',
    duration: '5h',
    price: 60,
    currency: 'SAR',
    schedule: ['08:00', '12:00', '16:00', '20:00']
  },
  {
    id: 'transport-5',
    type: 'train',
    from: 'Makkah',
    to: 'Madinah',
    duration: '3h',
    price: 120,
    currency: 'SAR',
    schedule: ['07:00', '11:00', '15:00', '19:00']
  },
  {
    id: 'transport-6',
    type: 'taxi',
    from: 'Makkah',
    to: 'Madinah',
    duration: '4h 30m',
    price: 650,
    currency: 'SAR',
    schedule: ['Available 24/7']
  },
  {
    id: 'transport-7',
    type: 'car',
    from: 'Jeddah',
    to: 'Makkah',
    duration: '1h',
    price: 200,
    currency: 'SAR',
    schedule: ['Available 24/7']
  }
];

// Mock Weather Data
export const WEATHER_DATA: WeatherData = {
  location: 'Makkah, Saudi Arabia',
  date: new Date().toISOString(),
  temperature: {
    current: 32,
    min: 26,
    max: 38,
    feelsLike: 34
  },
  humidity: 45,
  windSpeed: 12,
  conditions: 'Sunny',
  icon: 'sun',
  forecast: [
    {
      date: new Date(Date.now() + 86400000).toISOString(),
      temperature: {
        min: 27,
        max: 39
      },
      conditions: 'Clear',
      icon: 'sun'
    },
    {
      date: new Date(Date.now() + 172800000).toISOString(),
      temperature: {
        min: 28,
        max: 40
      },
      conditions: 'Mostly Sunny',
      icon: 'sun'
    },
    {
      date: new Date(Date.now() + 259200000).toISOString(),
      temperature: {
        min: 26,
        max: 37
      },
      conditions: 'Partly Cloudy',
      icon: 'cloud-sun'
    },
    {
      date: new Date(Date.now() + 345600000).toISOString(),
      temperature: {
        min: 25,
        max: 36
      },
      conditions: 'Cloudy',
      icon: 'cloud'
    },
    {
      date: new Date(Date.now() + 432000000).toISOString(),
      temperature: {
        min: 27,
        max: 38
      },
      conditions: 'Sunny',
      icon: 'sun'
    }
  ]
};

// Clothing Recommendations Based on Weather
export const CLOTHING_RECOMMENDATIONS: ClothingRecommendation[] = [
  {
    temperature: 'hot',
    recommendations: [
      'Lightweight and breathable fabrics (cotton, linen)',
      'Light-colored clothing to reflect heat',
      'Loose-fitting garments',
      'Sun hat or cap',
      'Sunglasses',
      'Umbrella for sun protection',
      'Comfortable sandals or light shoes'
    ],
    notes: 'Temperatures above 30°C (86°F) are common in Makkah and Madinah. Stay hydrated and avoid extended exposure to direct sunlight.'
  },
  {
    temperature: 'warm',
    recommendations: [
      'Light to medium-weight fabrics',
      'Long-sleeve options for evening',
      'Light jacket or shawl for air-conditioned areas',
      'Comfortable walking shoes',
      'Sun protection accessories'
    ],
    notes: 'Temperatures between 20-30°C (68-86°F) are comfortable but still require sun protection.'
  },
  {
    temperature: 'mild',
    recommendations: [
      'Medium-weight clothing',
      'Light layers for adjusting to temperature changes',
      'Light jacket or sweater',
      'Comfortable closed shoes',
      'Light scarf or wrap'
    ],
    notes: 'Winter temperatures in Saudi Arabia are mild during the day but can be cooler in the evenings.'
  }
];

// Calculate distances to Haram for all hotels
export function getHotelsWithDistanceToHaram(): Hotel[] {
  // Coordinates of Masjid al-Haram in Makkah
  const haramMakkahLat = 21.4225;
  const haramMakkahLong = 39.8262;
  
  // Coordinates of Masjid al-Nabawi in Madinah
  const haramMadinahLat = 24.4672;
  const haramMadinahLong = 39.6112;
  
  return HOTELS.map(hotel => {
    let distance;
    if (hotel.city === 'makkah') {
      distance = calculateDistance(hotel.latitude, hotel.longitude, haramMakkahLat, haramMakkahLong);
    } else if (hotel.city === 'madinah') {
      distance = calculateDistance(hotel.latitude, hotel.longitude, haramMadinahLat, haramMadinahLong);
    }
    
    return {
      ...hotel,
      distanceToHaram: Number(distance?.toFixed(2))
    };
  });
}

// Filter hotels by various criteria
export function filterHotels(filters: {
  city?: 'makkah' | 'madinah' | 'jeddah' | 'all',
  priceMin?: number,
  priceMax?: number,
  rating?: number,
  amenities?: string[],
  maxDistance?: number
}): Hotel[] {
  const hotelsWithDistance = getHotelsWithDistanceToHaram();
  
  return hotelsWithDistance.filter(hotel => {
    // Filter by city
    if (filters.city && filters.city !== 'all' && hotel.city !== filters.city) {
      return false;
    }
    
    // Filter by price
    if (filters.priceMin && hotel.priceRange.min < filters.priceMin) {
      return false;
    }
    if (filters.priceMax && hotel.priceRange.max > filters.priceMax) {
      return false;
    }
    
    // Filter by rating
    if (filters.rating && hotel.rating < filters.rating) {
      return false;
    }
    
    // Filter by amenities
    if (filters.amenities && filters.amenities.length > 0) {
      const hasAllAmenities = filters.amenities.every(amenity =>
        hotel.amenities.includes(amenity)
      );
      if (!hasAllAmenities) {
        return false;
      }
    }
    
    // Filter by distance to Haram
    if (filters.maxDistance && hotel.distanceToHaram && hotel.distanceToHaram > filters.maxDistance) {
      return false;
    }
    
    return true;
  });
}

// Get weather-based clothing recommendations
export function getClothingRecommendations(temperature: number): ClothingRecommendation {
  if (temperature >= 30) {
    return CLOTHING_RECOMMENDATIONS[0]; // hot
  } else if (temperature >= 20) {
    return CLOTHING_RECOMMENDATIONS[1]; // warm
  } else {
    return CLOTHING_RECOMMENDATIONS[2]; // mild
  }
}
