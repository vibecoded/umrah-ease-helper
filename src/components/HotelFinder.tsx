
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getHotelsWithDistanceToHaram, filterHotels } from '@/lib/mockData';
import { Hotel } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, MapPin, Star, Wifi, Coffee, Bed, Bath, DollarSign, BookmarkPlus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import bookmarkService from '@/services/bookmarkService';

export const HotelFinder = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [city, setCity] = useState<'all' | 'makkah' | 'madinah' | 'jeddah'>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [rating, setRating] = useState<number>(0);
  const [maxDistance, setMaxDistance] = useState<number>(5);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [comparisonHotels, setComparisonHotels] = useState<Hotel[]>([]);
  const { toast } = useToast();
  
  const amenitiesList = [
    { id: 'wifi', label: 'WiFi', value: 'Free WiFi' },
    { id: 'breakfast', label: 'Breakfast', value: 'Breakfast' },
    { id: 'prayer', label: 'Prayer Room', value: 'Prayer room' },
    { id: 'ac', label: 'Air Conditioning', value: 'Air conditioning' }
  ];
  
  useEffect(() => {
    const hotelsWithDistance = getHotelsWithDistanceToHaram();
    setHotels(hotelsWithDistance);
    setFilteredHotels(hotelsWithDistance);
  }, []);
  
  useEffect(() => {
    applyFilters();
  }, [city, priceRange, rating, maxDistance, selectedAmenities, searchQuery, hotels]);
  
  const applyFilters = () => {
    // Apply search query first
    let results = hotels;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(hotel => 
        hotel.name.toLowerCase().includes(query) || 
        hotel.description.toLowerCase().includes(query) ||
        hotel.address.toLowerCase().includes(query)
      );
    }
    
    // Then apply other filters
    results = filterHotels({
      city: city !== 'all' ? city : undefined,
      priceMin: priceRange[0],
      priceMax: priceRange[1],
      rating: rating || undefined,
      amenities: selectedAmenities.length > 0 ? selectedAmenities : undefined,
      maxDistance: maxDistance
    });
    
    setFilteredHotels(results);
  };
  
  const toggleAmenity = (value: string) => {
    setSelectedAmenities(prev => 
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };
  
  const toggleCompare = (hotel: Hotel) => {
    setComparisonHotels(prev => {
      if (prev.some(h => h.id === hotel.id)) {
        return prev.filter(h => h.id !== hotel.id);
      } else {
        if (prev.length >= 3) {
          toast({
            title: "Comparison limit reached",
            description: "You can compare up to 3 hotels at a time. Remove one to add another.",
            variant: "destructive",
          });
          return prev;
        }
        return [...prev, hotel];
      }
    });
  };
  
  const addToBookmarks = async (hotel: Hotel) => {
    const success = await bookmarkService.addHotelBookmark(hotel);
    if (success) {
      toast({
        title: "Hotel bookmarked",
        description: `${hotel.name} has been added to your bookmarks.`,
        duration: 3000,
      });
    } else {
      toast({
        title: "Already bookmarked",
        description: "This hotel is already in your bookmarks.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  const renderHotelCard = (hotel: Hotel) => {
    const isComparing = comparisonHotels.some(h => h.id === hotel.id);
    
    return (
      <Card key={hotel.id} className="mb-4 overflow-hidden transition-all hover:shadow-md">
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold">{hotel.name}</h3>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium">{hotel.rating}</span>
            </div>
          </div>
          
          <div className="mt-2 flex items-center text-sm text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 mr-1" />
            <span>{hotel.address}</span>
          </div>
          
          <p className="mt-2 text-sm">{hotel.description}</p>
          
          <div className="mt-3">
            <div className="flex items-center justify-between">
              <div>
                <Badge variant="outline" className="mr-2">
                  {hotel.city.charAt(0).toUpperCase() + hotel.city.slice(1)}
                </Badge>
                {hotel.distanceToHaram && (
                  <Badge variant="secondary" className="bg-primary/10">
                    {hotel.distanceToHaram} km to Haram
                  </Badge>
                )}
              </div>
              <div className="text-right">
                <span className="text-xs text-muted-foreground">From</span>
                <div className="font-semibold">
                  {hotel.priceRange.min} {hotel.priceRange.currency}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-3 flex flex-wrap gap-2">
            {hotel.amenities.slice(0, 4).map((amenity, idx) => (
              <Badge key={idx} variant="outline" className="bg-accent/50 text-xs">
                {amenity}
              </Badge>
            ))}
            {hotel.amenities.length > 4 && (
              <Badge variant="outline" className="bg-accent/50 text-xs">
                +{hotel.amenities.length - 4} more
              </Badge>
            )}
          </div>
          
          <div className="mt-4 flex justify-between gap-2">
            <Button 
              variant={isComparing ? "default" : "outline"} 
              size="sm"
              className="flex-1"
              onClick={() => toggleCompare(hotel)}
            >
              {isComparing ? "Remove from comparison" : "Compare"}
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => addToBookmarks(hotel)}
              className="rounded-full"
            >
              <BookmarkPlus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    );
  };
  
  const renderComparisonTable = () => {
    if (comparisonHotels.length === 0) {
      return (
        <div className="text-center p-6">
          <p className="text-muted-foreground">
            Select hotels to compare them side by side
          </p>
        </div>
      );
    }
    
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Property</th>
              {comparisonHotels.map(hotel => (
                <th key={hotel.id} className="p-2 text-center">
                  {hotel.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2 font-medium">City</td>
              {comparisonHotels.map(hotel => (
                <td key={hotel.id} className="p-2 text-center">
                  {hotel.city.charAt(0).toUpperCase() + hotel.city.slice(1)}
                </td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-2 font-medium">Price Range</td>
              {comparisonHotels.map(hotel => (
                <td key={hotel.id} className="p-2 text-center">
                  {hotel.priceRange.min} - {hotel.priceRange.max} {hotel.priceRange.currency}
                </td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-2 font-medium">Rating</td>
              {comparisonHotels.map(hotel => (
                <td key={hotel.id} className="p-2 text-center">
                  <div className="flex items-center justify-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                    {hotel.rating}
                  </div>
                </td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-2 font-medium">Distance to Haram</td>
              {comparisonHotels.map(hotel => (
                <td key={hotel.id} className="p-2 text-center">
                  {hotel.distanceToHaram ? `${hotel.distanceToHaram} km` : 'N/A'}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-2 font-medium">Amenities</td>
              {comparisonHotels.map(hotel => (
                <td key={hotel.id} className="p-2 text-center">
                  <div className="flex flex-wrap justify-center gap-1">
                    {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {hotel.amenities.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{hotel.amenities.length - 3} more
                      </Badge>
                    )}
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-2 font-medium">Actions</td>
              {comparisonHotels.map(hotel => (
                <td key={hotel.id} className="p-2 text-center">
                  <div className="flex justify-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toggleCompare(hotel)}
                    >
                      Remove
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => addToBookmarks(hotel)}
                    >
                      Bookmark
                    </Button>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  
  return (
    <Card className="glass-card p-5 animate-slide-in">
      <h3 className="text-xl font-medium mb-4">Hotel Finder</h3>
      
      <Tabs defaultValue="search">
        <TabsList className="w-full mb-4 grid grid-cols-2">
          <TabsTrigger value="search">Search Hotels</TabsTrigger>
          <TabsTrigger value="compare">Compare Hotels ({comparisonHotels.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="search" className="space-y-4 mt-0">
          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
            {/* Filters */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search hotels..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <div>
                <Label className="mb-2 block">City</Label>
                <Select value={city} onValueChange={(value) => setCity(value as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    <SelectItem value="makkah">Makkah</SelectItem>
                    <SelectItem value="madinah">Madinah</SelectItem>
                    <SelectItem value="jeddah">Jeddah</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="mb-2 block">Price Range (USD)</Label>
                <div className="pt-4 px-2">
                  <Slider
                    defaultValue={[0, 1000]}
                    max={1000}
                    step={50}
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                  />
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
              
              <div>
                <Label className="mb-2 block">Minimum Rating</Label>
                <div className="flex items-center gap-2">
                  <Slider
                    defaultValue={[0]}
                    min={0}
                    max={5}
                    step={0.5}
                    value={[rating]}
                    onValueChange={(value) => setRating(value[0])}
                    className="flex-grow"
                  />
                  <span className="min-w-[40px] text-center">{rating}</span>
                </div>
              </div>
              
              <div>
                <Label className="mb-2 block">Max Distance to Haram (km)</Label>
                <div className="flex items-center gap-2">
                  <Slider
                    defaultValue={[5]}
                    min={0.5}
                    max={10}
                    step={0.5}
                    value={[maxDistance]}
                    onValueChange={(value) => setMaxDistance(value[0])}
                    className="flex-grow"
                  />
                  <span className="min-w-[40px] text-center">{maxDistance}</span>
                </div>
              </div>
              
              <div>
                <Label className="mb-2 block">Amenities</Label>
                <div className="space-y-2">
                  {amenitiesList.map((amenity) => (
                    <div key={amenity.id} className="flex items-center">
                      <Checkbox
                        id={amenity.id}
                        checked={selectedAmenities.includes(amenity.value)}
                        onCheckedChange={() => toggleAmenity(amenity.value)}
                      />
                      <label
                        htmlFor={amenity.id}
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {amenity.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button 
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSearchQuery('');
                  setCity('all');
                  setPriceRange([0, 1000]);
                  setRating(0);
                  setMaxDistance(5);
                  setSelectedAmenities([]);
                }}
              >
                Reset Filters
              </Button>
            </div>
            
            {/* Hotel list */}
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                {filteredHotels.length} hotels found
              </div>
              
              {filteredHotels.length > 0 ? (
                filteredHotels.map(renderHotelCard)
              ) : (
                <div className="p-8 text-center">
                  <p>No hotels match your search criteria.</p>
                  <Button 
                    variant="link" 
                    onClick={() => {
                      setSearchQuery('');
                      setCity('all');
                      setPriceRange([0, 1000]);
                      setRating(0);
                      setMaxDistance(5);
                      setSelectedAmenities([]);
                    }}
                  >
                    Reset filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="compare" className="mt-0">
          {renderComparisonTable()}
        </TabsContent>
      </Tabs>
    </Card>
  );
};
