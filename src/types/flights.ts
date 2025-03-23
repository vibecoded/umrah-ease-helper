
export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departureCity: string;
  departureAirport: string;
  departureTime: string;
  arrivalCity: string;
  arrivalAirport: string;
  arrivalTime: string;
  price: number;
  currency: string;
  duration: string;
  stops: number;
  bookingUrl?: string;
}

export interface FlightFilter {
  departureCity: string;
  arrivalCity: string;
  departureDate: string;
  returnDate?: string;
  priceMin?: number;
  priceMax?: number;
  airlines?: string[];
  maxStops?: number;
}

export interface SavedFlight extends Flight {
  savedAt: string;
  notes?: string;
}
