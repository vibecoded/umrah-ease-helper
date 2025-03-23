
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Clock, 
  Hotel, 
  Plane, 
  Package, 
  CloudSun, 
  Languages, 
  Bookmark,
  Map,
  FileCheck
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface QuickAccessProps {
  onNavigate: (tab: string) => void;
  activeTab: string;
}

export const QuickAccessToolbar: React.FC<QuickAccessProps> = ({ 
  onNavigate,
  activeTab
}) => {
  const { toast } = useToast();
  
  const handleClick = (tab: string) => {
    onNavigate(tab);
    toast({
      title: `Navigated to ${tab}`,
      description: `You are now viewing the ${tab} section`,
      duration: 2000,
    });
  };
  
  const tools = [
    { id: 'prayer-times', icon: <Clock />, label: 'Prayer Times' },
    { id: 'rituals', icon: <Map />, label: 'Rituals' },
    { id: 'hotels', icon: <Hotel />, label: 'Hotels' },
    { id: 'flights', icon: <Plane />, label: 'Flights' },
    { id: 'packages', icon: <Package />, label: 'Packages' },
    { id: 'weather', icon: <CloudSun />, label: 'Weather' },
    { id: 'checklist', icon: <FileCheck />, label: 'Checklist' },
    { id: 'phrases', icon: <Languages />, label: 'Phrases' },
    { id: 'bookmarks', icon: <Bookmark />, label: 'Bookmarks' }
  ];

  return (
    <div className="bg-background/80 backdrop-blur-sm fixed bottom-0 left-0 right-0 border-t border-border z-50 px-2 py-1">
      <div className="flex items-center justify-between overflow-x-auto hide-scrollbar">
        {tools.map(tool => (
          <Button
            key={tool.id}
            variant={activeTab === tool.id ? "default" : "ghost"}
            size="sm"
            className="flex flex-col items-center rounded-full p-2"
            onClick={() => handleClick(tool.id)}
          >
            {tool.icon}
            <span className="text-xs mt-1">{tool.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
