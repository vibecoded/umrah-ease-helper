
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WEATHER_DATA, getClothingRecommendations } from '@/lib/mockData';
import { WeatherData, ClothingRecommendation } from '@/types';
import { Sun, Cloud, CloudRain, Thermometer, Wind, Droplets, Calendar, Clock, Shirt, Info } from 'lucide-react';
import { format } from 'date-fns';

export const WeatherInfo = () => {
  const [city, setCity] = useState<'makkah' | 'madinah' | 'jeddah'>('makkah');
  const weather = WEATHER_DATA; // In a real app, this would change based on city
  const clothingRecommendations = getClothingRecommendations(weather.temperature.current);
  
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <Sun className="h-8 w-8 text-yellow-500" />;
      case 'partly cloudy':
      case 'mostly sunny':
      case 'cloudy':
        return <Cloud className="h-8 w-8 text-gray-400" />;
      case 'rain':
      case 'showers':
        return <CloudRain className="h-8 w-8 text-blue-400" />;
      default:
        return <Sun className="h-8 w-8 text-yellow-500" />;
    }
  };
  
  const getSmallWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <Sun className="h-5 w-5 text-yellow-500" />;
      case 'partly cloudy':
      case 'mostly sunny':
      case 'cloudy':
        return <Cloud className="h-5 w-5 text-gray-400" />;
      case 'rain':
      case 'showers':
        return <CloudRain className="h-5 w-5 text-blue-400" />;
      default:
        return <Sun className="h-5 w-5 text-yellow-500" />;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'EEE, MMM d');
  };
  
  return (
    <Card className="glass-card p-5 animate-slide-in">
      <h3 className="text-xl font-medium mb-4">Weather Information</h3>
      
      <div className="mb-4">
        <Select value={city} onValueChange={(value) => setCity(value as any)}>
          <SelectTrigger>
            <SelectValue placeholder="Select city" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="makkah">Makkah</SelectItem>
            <SelectItem value="madinah">Madinah</SelectItem>
            <SelectItem value="jeddah">Jeddah</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Tabs defaultValue="current">
        <TabsList className="w-full mb-4 grid grid-cols-2">
          <TabsTrigger value="current">Current Weather</TabsTrigger>
          <TabsTrigger value="clothing">Clothing Recommendations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="current" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current weather */}
            <div className="bg-accent/30 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-lg">{weather.location}</h4>
                  <div className="text-sm text-muted-foreground flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    {format(new Date(weather.date), 'EEEE, MMMM d, yyyy')}
                  </div>
                </div>
                {getWeatherIcon(weather.conditions)}
              </div>
              
              <div className="mt-4 flex items-end">
                <div className="text-4xl font-bold">{weather.temperature.current}°C</div>
                <div className="ml-2 text-sm text-muted-foreground">
                  Feels like {weather.temperature.feelsLike}°C
                </div>
              </div>
              
              <div className="mt-2 text-lg font-medium">{weather.conditions}</div>
              
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="bg-background/60 p-3 rounded-lg">
                  <div className="text-sm text-muted-foreground flex items-center">
                    <Thermometer className="h-3.5 w-3.5 mr-1" />
                    Temperature
                  </div>
                  <div className="font-medium">
                    Min: {weather.temperature.min}°C | Max: {weather.temperature.max}°C
                  </div>
                </div>
                <div className="bg-background/60 p-3 rounded-lg">
                  <div className="text-sm text-muted-foreground flex items-center">
                    <Wind className="h-3.5 w-3.5 mr-1" />
                    Wind
                  </div>
                  <div className="font-medium">
                    {weather.windSpeed} km/h
                  </div>
                </div>
                <div className="bg-background/60 p-3 rounded-lg">
                  <div className="text-sm text-muted-foreground flex items-center">
                    <Droplets className="h-3.5 w-3.5 mr-1" />
                    Humidity
                  </div>
                  <div className="font-medium">
                    {weather.humidity}%
                  </div>
                </div>
                <div className="bg-background/60 p-3 rounded-lg">
                  <div className="text-sm text-muted-foreground flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    Updated
                  </div>
                  <div className="font-medium">
                    {format(new Date(weather.date), 'h:mm a')}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Forecast */}
            <div>
              <h4 className="font-semibold mb-3">5-Day Forecast</h4>
              
              <div className="space-y-2">
                {weather.forecast.map((day, idx) => (
                  <div key={idx} className="bg-accent/20 p-3 rounded-lg flex justify-between items-center">
                    <div className="flex items-center">
                      {getSmallWeatherIcon(day.conditions)}
                      <div className="ml-3">
                        <div className="font-medium">{formatDate(day.date)}</div>
                        <div className="text-sm text-muted-foreground">{day.conditions}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{day.temperature.max}°C</div>
                      <div className="text-sm text-muted-foreground">{day.temperature.min}°C</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="clothing" className="mt-0">
          <div className="bg-accent/20 p-4 rounded-lg">
            <div className="flex items-center mb-4">
              <Shirt className="h-6 w-6 mr-2 text-primary" />
              <h4 className="font-semibold">Clothing Recommendations for {weather.temperature.current}°C</h4>
            </div>
            
            <div className="mb-4">
              <div className="text-sm font-medium mb-2">Recommended Items:</div>
              <ul className="space-y-2">
                {clothingRecommendations.recommendations.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="mr-2 mt-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center text-xs text-white">
                      {idx + 1}
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-4 bg-background/60 p-3 rounded-lg">
              <div className="flex items-center">
                <Info className="h-4 w-4 mr-2 text-amber-500" />
                <div className="font-medium">Important Notes</div>
              </div>
              <p className="mt-2 text-sm">
                {clothingRecommendations.notes}
              </p>
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="text-sm font-medium">Remember:</div>
              <ul className="space-y-1 text-sm">
                <li>• Modest dress is required in Saudi Arabia, especially at holy sites.</li>
                <li>• Women should cover their hair inside mosques.</li>
                <li>• Loose, flowing garments are typically more comfortable in hot weather.</li>
                <li>• Indoor spaces like hotels and shopping malls may be heavily air-conditioned.</li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
