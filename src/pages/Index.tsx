
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LocationProvider } from '@/context/LocationContext';
import { PrayerTimesCard } from '@/components/PrayerTimesCard';
import { UmrahRituals } from '@/components/UmrahRituals';
import { DocumentChecklist } from '@/components/DocumentChecklist';
import { ArabicPhrases } from '@/components/ArabicPhrases';
import { HotelFinder } from '@/components/HotelFinder';
import { FlightBooking } from '@/components/FlightBooking';
import { UmrahPackageFinder } from '@/components/UmrahPackageFinder';
import { WeatherInfo } from '@/components/WeatherInfo';
import { BookmarkManager } from '@/components/BookmarkManager';
import { QuickAccessToolbar } from '@/components/QuickAccessToolbar';
import { 
  Clock, 
  Map, 
  FileCheck, 
  Languages, 
  Moon,
  Sun,
  Hotel,
  Plane,
  Package,
  CloudSun,
  Bookmark
} from 'lucide-react';

const Index = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeTab, setActiveTab] = useState<string>('prayer-times');

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      return newTheme;
    });
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <LocationProvider>
      <div className="min-h-screen bg-gradient-to-b from-background to-accent/30 dark:from-background dark:to-accent/5 transition-all duration-300 pb-[70px]">
        <div className="container px-4 py-12 max-w-6xl mx-auto">
          <header className="text-center mb-10 relative">
            <div className="absolute right-0 top-0">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-accent/50 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </button>
            </div>
            
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Umrah Assistant
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your comprehensive guide for a spiritually fulfilling Umrah journey
            </p>
          </header>
          
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <div className="flex justify-center mb-10">
              <TabsList className="grid grid-cols-9 w-full max-w-4xl">
                <TabsTrigger value="prayer-times" className="flex flex-col items-center gap-1.5 py-3">
                  <Clock className="h-5 w-5" />
                  <span>Prayer</span>
                </TabsTrigger>
                <TabsTrigger value="rituals" className="flex flex-col items-center gap-1.5 py-3">
                  <Map className="h-5 w-5" />
                  <span>Rituals</span>
                </TabsTrigger>
                <TabsTrigger value="checklist" className="flex flex-col items-center gap-1.5 py-3">
                  <FileCheck className="h-5 w-5" />
                  <span>Checklist</span>
                </TabsTrigger>
                <TabsTrigger value="phrases" className="flex flex-col items-center gap-1.5 py-3">
                  <Languages className="h-5 w-5" />
                  <span>Phrases</span>
                </TabsTrigger>
                <TabsTrigger value="hotels" className="flex flex-col items-center gap-1.5 py-3">
                  <Hotel className="h-5 w-5" />
                  <span>Hotels</span>
                </TabsTrigger>
                <TabsTrigger value="flights" className="flex flex-col items-center gap-1.5 py-3">
                  <Plane className="h-5 w-5" />
                  <span>Flights</span>
                </TabsTrigger>
                <TabsTrigger value="packages" className="flex flex-col items-center gap-1.5 py-3">
                  <Package className="h-5 w-5" />
                  <span>Packages</span>
                </TabsTrigger>
                <TabsTrigger value="weather" className="flex flex-col items-center gap-1.5 py-3">
                  <CloudSun className="h-5 w-5" />
                  <span>Weather</span>
                </TabsTrigger>
                <TabsTrigger value="bookmarks" className="flex flex-col items-center gap-1.5 py-3">
                  <Bookmark className="h-5 w-5" />
                  <span>Saved</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="page-transition-container">
              <TabsContent value="prayer-times" className="mt-0 page-transition-enter-active">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/2">
                    <PrayerTimesCard />
                  </div>
                  <div className="w-full md:w-1/2">
                    <Card className="glass-card p-5 h-full animate-scale-in">
                      <h3 className="text-xl font-medium mb-4">Qibla Direction</h3>
                      <div className="flex items-center justify-center h-64 bg-accent/30 rounded-lg">
                        <div className="text-center">
                          <div className="w-24 h-24 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4 relative animate-spin-slow">
                            <div className="absolute w-1 h-10 bg-primary top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/4"></div>
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                          </div>
                          <p className="text-muted-foreground">
                            Qibla direction shown based on your current location
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="rituals" className="mt-0 page-transition-enter-active">
                <UmrahRituals />
              </TabsContent>
              
              <TabsContent value="checklist" className="mt-0 page-transition-enter-active">
                <DocumentChecklist />
              </TabsContent>
              
              <TabsContent value="phrases" className="mt-0 page-transition-enter-active">
                <ArabicPhrases />
              </TabsContent>
              
              <TabsContent value="hotels" className="mt-0 page-transition-enter-active">
                <HotelFinder />
              </TabsContent>
              
              <TabsContent value="flights" className="mt-0 page-transition-enter-active">
                <FlightBooking />
              </TabsContent>
              
              <TabsContent value="packages" className="mt-0 page-transition-enter-active">
                <UmrahPackageFinder />
              </TabsContent>
              
              <TabsContent value="weather" className="mt-0 page-transition-enter-active">
                <WeatherInfo />
              </TabsContent>
              
              <TabsContent value="bookmarks" className="mt-0 page-transition-enter-active">
                <BookmarkManager />
              </TabsContent>
            </div>
          </Tabs>
          
          <footer className="mt-20 text-center text-sm text-muted-foreground">
            <p>
              Umrah Assistant Extension — <span className="opacity-70">Created to help Muslims perform their sacred journey</span>
            </p>
          </footer>
        </div>
        
        {/* Quick Access Toolbar */}
        <QuickAccessToolbar 
          onNavigate={handleTabChange}
          activeTab={activeTab}
        />
      </div>
    </LocationProvider>
  );
};

export default Index;
