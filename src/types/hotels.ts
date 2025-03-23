
export interface Hotel {
  id: string;
  name: string;
  description: string;
  address: string;
  city: 'makkah' | 'madinah' | 'jeddah';
  latitude: number;
  longitude: number;
  priceRange: {
    min: number;
    max: number;
    currency: string;
  };
  rating: number;
  amenities: string[];
  images: string[];
  distanceToHaram?: number; // in kilometers
  bookingUrl?: string;
  reviews?: HotelReview[];
}

export interface HotelReview {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface HotelFilter {
  city: 'makkah' | 'madinah' | 'jeddah' | 'all';
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  amenities?: string[];
  distanceToHaram?: number;
}

export interface SavedHotel extends Hotel {
  savedAt: string;
  notes?: string;
}
