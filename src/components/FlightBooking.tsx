
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FLIGHTS, TRANSPORT_OPTIONS } from '@/lib/mockData';
import { Flight, TransportOption } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Plane, Calendar, ArrowRight, Clock, BookmarkIcon, TrendingDown, MapPin, Bus, Train, Car, AlertTriangle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import bookmarkService from '@/services/bookmarkService';

export const FlightBooking = () => {
  const [departureCity, setDepartureCity] = useState('');
  const [arrivalCity, setArrivalCity] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [alertEnabled, setAlertEnabled] = useState(false);
  const [selectedTransport, setSelectedTransport] = useState<string>('all');
  const { toast } = useToast();
  
  const handleSearchFlights = () => {
    if (!departureCity || !arrivalCity || !departureDate) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    const results = FLIGHTS.filter(flight => {
      return flight.departureCity.toLowerCase().includes(departureCity.toLowerCase()) &&
             flight.arrivalCity.toLowerCase().includes(arrivalCity.toLowerCase());
    });
    
    setFilteredFlights(results);
    setHasSearched(true);
  };
  
  const handleEnableAlerts = (flightId: string) => {
    setAlertEnabled(true);
    toast({
      title: "Price alert enabled",
      description: "You will be notified when the price drops for this flight.",
      duration: 3000,
    });
  };
  
  const addToBookmarks = async (flight: Flight) => {
    const success = await bookmarkService.addFlightBookmark(flight);
    if (success) {
      toast({
        title: "Flight bookmarked",
        description: `${flight.airline} ${flight.flightNumber} has been added to your bookmarks.`,
        duration: 3000,
      });
    } else {
      toast({
        title: "Already bookmarked",
        description: "This flight is already in your bookmarks.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  const filteredTransport = selectedTransport === 'all' 
    ? TRANSPORT_OPTIONS 
    : TRANSPORT_OPTIONS.filter(t => t.type === selectedTransport);
  
  const renderFlightCard = (flight: Flight) => {
    return (
      <Card key={flight.id} className="mb-4 p-4 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center">
              <Plane className="h-5 w-5 mr-2 text-primary" />
              <h3 className="font-semibold">{flight.airline}</h3>
              <Badge variant="outline" className="ml-2">{flight.flightNumber}</Badge>
            </div>
            
            <div className="mt-3 grid grid-cols-[1fr_auto_1fr] gap-2 items-center">
              <div>
                <div className="font-semibold">{flight.departureAirport}</div>
                <div className="text-sm text-muted-foreground">{flight.departureCity}</div>
                <div className="text-sm">
                  {new Date(flight.departureTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="text-xs text-muted-foreground">{flight.duration}</div>
                <div className="w-16 h-px bg-border mx-2 my-1"></div>
                <div className="text-xs text-muted-foreground">
                  {flight.stops === 0 ? 'Direct' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                </div>
              </div>
              
              <div>
                <div className="font-semibold">{flight.arrivalAirport}</div>
                <div className="text-sm text-muted-foreground">{flight.arrivalCity}</div>
                <div className="text-sm">
                  {new Date(flight.arrivalTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-xl font-bold">
              ${flight.price}
            </div>
            <div className="text-sm text-muted-foreground">
              {flight.currency}
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="flex-1"
          >
            View Details
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEnableAlerts(flight.id)}
            className="flex items-center gap-1"
          >
            <TrendingDown className="h-4 w-4" />
            <span>Price Alert</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => addToBookmarks(flight)}
            className="rounded-full"
          >
            <BookmarkIcon className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    );
  };
  
  const getTransportIcon = (type: string) => {
    switch (type) {
      case 'bus': return <Bus className="h-4 w-4" />;
      case 'train': return <Train className="h-4 w-4" />;
      case 'taxi': return <Car className="h-4 w-4" />;
      case 'car': return <Car className="h-4 w-4" />;
      default: return null;
    }
  };
  
  const renderTransportCard = (transport: TransportOption) => {
    return (
      <Card key={transport.id} className="mb-4 p-4 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center">
              {getTransportIcon(transport.type)}
              <h3 className="font-semibold ml-2">
                {transport.type.charAt(0).toUpperCase() + transport.type.slice(1)}
              </h3>
              <Badge variant="outline" className="ml-2">
                {transport.duration}
              </Badge>
            </div>
            
            <div className="mt-3 grid grid-cols-[1fr_auto_1fr] gap-2 items-center">
              <div>
                <div className="font-semibold">{transport.from}</div>
                <div className="text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3 inline mr-1" />
                  Departure
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
              
              <div>
                <div className="font-semibold">{transport.to}</div>
                <div className="text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3 inline mr-1" />
                  Arrival
                </div>
              </div>
            </div>
            
            <div className="mt-2">
              <div className="text-sm">
                <Clock className="h-3 w-3 inline mr-1" />
                Schedule: {
                  transport.schedule.length === 1 && transport.schedule[0] === 'Available 24/7'
                    ? 'Available 24/7'
                    : transport.schedule.join(', ')
                }
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-xl font-bold">
              {transport.price} {transport.currency}
            </div>
            <div className="text-sm text-muted-foreground">
              per person
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end gap-2">
          <Button className="flex items-center gap-1">
            Book Now
          </Button>
        </div>
      </Card>
    );
  };
  
  return (
    <Card className="glass-card p-5 animate-slide-in">
      <h3 className="text-xl font-medium mb-4">Travel Arrangements</h3>
      
      <Tabs defaultValue="flights">
        <TabsList className="w-full mb-4 grid grid-cols-2">
          <TabsTrigger value="flights">International Flights</TabsTrigger>
          <TabsTrigger value="transport">Local Transportation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="flights" className="space-y-4 mt-0">
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-accent/20 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="departureCity">From</Label>
                  <Input
                    id="departureCity"
                    placeholder="Departure city"
                    value={departureCity}
                    onChange={(e) => setDepartureCity(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="arrivalCity">To</Label>
                  <Input
                    id="arrivalCity"
                    placeholder="Arrival city"
                    value={arrivalCity}
                    onChange={(e) => setArrivalCity(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="departureDate">Departure Date</Label>
                  <div className="relative">
                    <Input
                      id="departureDate"
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="returnDate">Return Date (Optional)</Label>
                  <div className="relative">
                    <Input
                      id="returnDate"
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
              </div>
              
              <Button className="w-full mt-4" onClick={handleSearchFlights}>
                Search Flights
              </Button>
            </div>
            
            {hasSearched && (
              <>
                <div className="text-sm text-muted-foreground">
                  {filteredFlights.length} flights found
                </div>
                
                {filteredFlights.length > 0 ? (
                  <div>
                    {filteredFlights.map(renderFlightCard)}
                  </div>
                ) : (
                  <div className="text-center p-8">
                    <div className="mb-2 flex justify-center">
                      <AlertTriangle className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No Flights Found</h3>
                    <p className="text-muted-foreground">
                      We couldn't find any flights matching your search criteria. 
                      Try adjusting your search parameters.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="transport" className="space-y-4 mt-0">
          <div className="bg-accent/20 p-4 rounded-lg mb-4">
            <Label htmlFor="transportType" className="mb-2 block">Transportation Type</Label>
            <Select value={selectedTransport} onValueChange={setSelectedTransport}>
              <SelectTrigger id="transportType">
                <SelectValue placeholder="Select transport type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="bus">Bus</SelectItem>
                <SelectItem value="train">Train</SelectItem>
                <SelectItem value="taxi">Taxi</SelectItem>
                <SelectItem value="car">Car</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="text-sm text-muted-foreground mb-2">
              {filteredTransport.length} options available
            </div>
            
            {filteredTransport.map(renderTransportCard)}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
