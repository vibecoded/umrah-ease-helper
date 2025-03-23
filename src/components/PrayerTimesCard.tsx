
import { useState, useEffect } from 'react';
import { useLocation } from '@/context/LocationContext';
import { Card } from '@/components/ui/card';
import { fetchPrayerTimes, getNextPrayer, getTimeUntilNextPrayer, formatPrayerTimeForDisplay, getCurrentPrayer } from '@/lib/prayerTimes';
import { Prayer } from '@/types';
import { Clock, MapPin, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const PrayerTimesCard = () => {
  const { userLocation, isLoading: locationLoading, error: locationError } = useLocation();
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    if (userLocation) {
      loadPrayerTimes();
    }
  }, [userLocation]);

  const loadPrayerTimes = async () => {
    if (!userLocation) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const prayerTimes = await fetchPrayerTimes(userLocation);
      setPrayers(prayerTimes);
      setLastUpdated(new Date());
      
      // Save to storage
      localStorage.setItem('prayerTimes', JSON.stringify(prayerTimes));
      localStorage.setItem('prayerTimesLastUpdated', new Date().toISOString());
    } catch (err) {
      console.error('Failed to load prayer times:', err);
      setError('Failed to load prayer times. Please try again.');
      
      // Try to load from storage if available
      const storedPrayerTimes = localStorage.getItem('prayerTimes');
      const storedLastUpdated = localStorage.getItem('prayerTimesLastUpdated');
      
      if (storedPrayerTimes && storedLastUpdated) {
        setPrayers(JSON.parse(storedPrayerTimes));
        setLastUpdated(new Date(storedLastUpdated));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    loadPrayerTimes();
  };

  const nextPrayer = getNextPrayer(prayers);
  const timeUntil = getTimeUntilNextPrayer(nextPrayer);
  const currentPrayer = getCurrentPrayer(prayers);

  return (
    <Card className="glass-card overflow-hidden animate-scale-in">
      <div className="p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-medium">Prayer Times</h3>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleRefresh} 
            className="h-8 w-8 rounded-full"
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        
        {locationError && (
          <div className="text-sm text-destructive mb-4">
            {locationError}. Using default location (Makkah).
          </div>
        )}
        
        {error && (
          <div className="text-sm text-destructive mb-4">
            {error}
          </div>
        )}
        
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          <span>
            {userLocation ? (
              userLocation.city ? 
                `${userLocation.city}, ${userLocation.country}` : 
                `${userLocation.latitude.toFixed(4)}, ${userLocation.longitude.toFixed(4)}`
            ) : (
              'Loading location...'
            )}
          </span>
        </div>
        
        {nextPrayer && (
          <div className="bg-primary/10 rounded-lg p-4 mb-4">
            <div className="text-sm text-muted-foreground">Next Prayer</div>
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-lg font-medium">{nextPrayer.name}</h4>
                <div className="text-lg font-semibold">{formatPrayerTimeForDisplay(nextPrayer.time)}</div>
              </div>
              <div className="prayer-time-indicator bg-muted rounded-full px-4 py-1 flex items-center">
                <Clock className="h-4 w-4 mr-1 opacity-70" />
                <span>{timeUntil}</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          {prayers.map((prayer) => (
            <div 
              key={prayer.name}
              className={`flex justify-between items-center p-2 rounded-md ${
                prayer.name === currentPrayer?.name ? 'bg-accent/50' : 
                prayer.name === nextPrayer?.name ? 'bg-primary/5' : ''
              }`}
            >
              <div className="flex items-center">
                <span className="text-sm font-medium">{prayer.name}</span>
                <span className="text-xs text-muted-foreground ml-2 rtl">
                  {prayer.arabicName}
                </span>
              </div>
              <span className="font-mono">
                {formatPrayerTimeForDisplay(prayer.time)}
              </span>
            </div>
          ))}
        </div>
        
        <div className="text-xs text-muted-foreground mt-4 text-right">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      </div>
    </Card>
  );
};
