
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Location } from '@/types';

interface LocationContextType {
  userLocation: Location | null;
  isLoading: boolean;
  error: string | null;
  updateLocation: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const updateLocation = () => {
    setIsLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        setIsLoading(false);
        
        // Save location to storage
        localStorage.setItem('userLocation', JSON.stringify({ latitude, longitude }));
      },
      (error) => {
        setError(`Unable to retrieve your location: ${error.message}`);
        setIsLoading(false);
        
        // Fallback to Makkah location if geolocation fails
        setUserLocation({
          latitude: 21.4225,
          longitude: 39.8262,
          city: 'Makkah',
          country: 'Saudi Arabia'
        });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 600000 }
    );
  };

  useEffect(() => {
    // Try to get location from storage first
    const storedLocation = localStorage.getItem('userLocation');
    
    if (storedLocation) {
      try {
        setUserLocation(JSON.parse(storedLocation));
        setIsLoading(false);
      } catch (err) {
        // If parsing fails, get fresh location
        updateLocation();
      }
    } else {
      updateLocation();
    }
  }, []);

  return (
    <LocationContext.Provider
      value={{
        userLocation,
        isLoading,
        error,
        updateLocation
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = (): LocationContextType => {
  const context = useContext(LocationContext);
  
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  
  return context;
};
