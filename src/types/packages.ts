
export interface UmrahPackage {
  id: string;
  name: string;
  provider: string;
  description: string;
  duration: number; // in days
  price: number;
  currency: string;
  includes: string[];
  excludes: string[];
  itinerary: PackageDay[];
  rating: number;
  bookingUrl?: string;
}

export interface PackageDay {
  day: number;
  description: string;
  activities: string[];
}

export interface SavedPackage extends UmrahPackage {
  savedAt: string;
  notes?: string;
}
