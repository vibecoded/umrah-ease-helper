
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { UMRAH_PACKAGES } from '@/lib/mockData';
import { UmrahPackage } from '@/types';
import { Calendar, Check, X, Clock, ArrowRight, MapPin, DollarSign, Star, BookmarkPlus, ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import bookmarkService from '@/services/bookmarkService';

export const UmrahPackageFinder = () => {
  const [packages, setPackages] = useState<UmrahPackage[]>(UMRAH_PACKAGES);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [duration, setDuration] = useState<[number, number]>([0, 20]);
  const [expandedPackage, setExpandedPackage] = useState<string | null>(null);
  const { toast } = useToast();
  
  const toggleExpand = (packageId: string) => {
    setExpandedPackage(expandedPackage === packageId ? null : packageId);
  };
  
  const applyFilters = () => {
    const filtered = UMRAH_PACKAGES.filter(pkg => {
      const matchesPrice = pkg.price >= priceRange[0] && pkg.price <= priceRange[1];
      const matchesDuration = pkg.duration >= duration[0] && pkg.duration <= duration[1];
      return matchesPrice && matchesDuration;
    });
    
    setPackages(filtered);
    toast({
      title: "Filters applied",
      description: `${filtered.length} packages match your criteria`,
      duration: 2000,
    });
  };
  
  const resetFilters = () => {
    setPriceRange([0, 5000]);
    setDuration([0, 20]);
    setPackages(UMRAH_PACKAGES);
    toast({
      title: "Filters reset",
      description: "Showing all available packages",
      duration: 2000,
    });
  };
  
  const addToBookmarks = async (packageData: UmrahPackage) => {
    const success = await bookmarkService.addPackageBookmark(packageData);
    if (success) {
      toast({
        title: "Package bookmarked",
        description: `${packageData.name} has been added to your bookmarks.`,
        duration: 3000,
      });
    } else {
      toast({
        title: "Already bookmarked",
        description: "This package is already in your bookmarks.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  return (
    <Card className="glass-card p-5 animate-slide-in">
      <h3 className="text-xl font-medium mb-4">Umrah Package Finder</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
        {/* Filters */}
        <div className="space-y-4">
          <div>
            <Label className="mb-2 block">Price Range (USD)</Label>
            <div className="pt-4 px-2">
              <Slider
                defaultValue={[0, 5000]}
                max={5000}
                step={100}
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
            <Label className="mb-2 block">Duration (Days)</Label>
            <div className="pt-4 px-2">
              <Slider
                defaultValue={[0, 20]}
                max={20}
                step={1}
                value={duration}
                onValueChange={(value) => setDuration(value as [number, number])}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span>{duration[0]} days</span>
              <span>{duration[1]} days</span>
            </div>
          </div>
          
          <div className="pt-4 space-y-2">
            <Button 
              className="w-full" 
              onClick={applyFilters}
            >
              Apply Filters
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={resetFilters}
            >
              Reset
            </Button>
          </div>
        </div>
        
        {/* Package list */}
        <div>
          <div className="text-sm text-muted-foreground mb-4">
            {packages.length} packages found
          </div>
          
          {packages.map((pkg) => (
            <Card 
              key={pkg.id} 
              className="mb-4 hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{pkg.name}</h3>
                    <div className="text-sm text-muted-foreground">
                      by {pkg.provider}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium">{pkg.rating}</span>
                  </div>
                </div>
                
                <p className="mt-2 text-sm">{pkg.description}</p>
                
                <div className="mt-3 flex flex-wrap gap-2 items-center">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {pkg.duration} days
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/10 flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    {pkg.price} {pkg.currency}
                  </Badge>
                </div>
                
                <div className="mt-4">
                  <button 
                    className="text-sm text-primary font-medium flex items-center"
                    onClick={() => toggleExpand(pkg.id)}
                  >
                    {expandedPackage === pkg.id ? (
                      <>
                        <span>Show less</span>
                        <ChevronUp className="ml-1 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        <span>Show details</span>
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
                
                {expandedPackage === pkg.id && (
                  <div className="mt-4 space-y-4 animate-accordion-down">
                    <div>
                      <h4 className="font-medium text-sm mb-2">What's Included</h4>
                      <ul className="space-y-1">
                        {pkg.includes.map((item, idx) => (
                          <li key={idx} className="text-sm flex items-start">
                            <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm mb-2">What's Not Included</h4>
                      <ul className="space-y-1">
                        {pkg.excludes.map((item, idx) => (
                          <li key={idx} className="text-sm flex items-start">
                            <X className="h-4 w-4 text-red-500 mr-2 mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm mb-2">Itinerary Highlights</h4>
                      <div className="space-y-3">
                        {pkg.itinerary.map((day) => (
                          <div key={day.day} className="rounded-lg bg-accent/20 p-3">
                            <div className="font-medium">Day {day.day}</div>
                            <div className="text-sm mt-1">{day.description}</div>
                            <div className="mt-2 flex flex-wrap gap-1">
                              {day.activities.map((activity, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {activity}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <Separator />
              
              <div className="p-4 flex justify-between items-center">
                <div className="font-semibold text-lg">
                  ${pkg.price} <span className="text-sm font-normal text-muted-foreground">per person</span>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => addToBookmarks(pkg)}
                    className="rounded-full"
                  >
                    <BookmarkPlus className="h-4 w-4" />
                  </Button>
                  <Button>
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          
          {packages.length === 0 && (
            <div className="text-center p-8">
              <h3 className="text-lg font-medium mb-2">No Packages Found</h3>
              <p className="text-muted-foreground">
                No packages match your current filters. Try adjusting your criteria.
              </p>
              <Button
                variant="link"
                onClick={resetFilters}
                className="mt-2"
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
