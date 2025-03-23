
export interface Prayer {
  name: string;
  time: string;
  arabicName: string;
}

export interface Location {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
}

export interface PrayerTimesResponse {
  code: number;
  status: string;
  data: {
    timings: {
      Fajr: string;
      Sunrise: string;
      Dhuhr: string;
      Asr: string;
      Sunset: string;
      Maghrib: string;
      Isha: string;
      Imsak: string;
      Midnight: string;
      Firstthird: string;
      Lastthird: string;
    };
    date: {
      readable: string;
      timestamp: string;
      gregorian: {
        date: string;
        format: string;
        day: string;
        weekday: {
          en: string;
        };
        month: {
          number: number;
          en: string;
        };
        year: string;
        designation: {
          abbreviated: string;
          expanded: string;
        };
      };
      hijri: {
        date: string;
        format: string;
        day: string;
        weekday: {
          en: string;
          ar: string;
        };
        month: {
          number: number;
          en: string;
          ar: string;
        };
        year: string;
        designation: {
          abbreviated: string;
          expanded: string;
        };
        holidays: string[];
      };
    };
    meta: {
      latitude: number;
      longitude: number;
      timezone: string;
      method: {
        id: number;
        name: string;
        params: {
          Fajr: number;
          Isha: number;
        };
        location: {
          latitude: number;
          longitude: number;
        };
      };
      latitudeAdjustmentMethod: string;
      midnightMode: string;
      school: string;
      offset: {
        Imsak: number;
        Fajr: number;
        Sunrise: number;
        Dhuhr: number;
        Asr: number;
        Maghrib: number;
        Sunset: number;
        Isha: number;
        Midnight: number;
      };
    };
  };
}

export interface Place {
  id: string;
  name: string;
  arabicName: string;
  description: string;
  latitude: number;
  longitude: number;
  category: 'mosque' | 'landmark' | 'service' | 'other';
  city: 'makkah' | 'madinah' | 'jeddah';
}

export interface RitualStep {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  prayers?: string[];
  important?: boolean;
  location?: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  description: string;
  required: boolean;
  completed: boolean;
  category: 'travel' | 'identity' | 'health' | 'financial' | 'religious';
}

export interface PhrasesCategory {
  id: string;
  name: string;
  phrases: Phrase[];
}

export interface Phrase {
  id: string;
  english: string;
  arabic: string;
  pronunciation: string;
  context?: string;
}
