
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ARABIC_PHRASES } from '@/lib/phrases';
import { Phrase } from '@/types';
import { Search, VolumeIcon, Copy, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export const ArabicPhrases = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const filteredCategories = ARABIC_PHRASES.map(category => ({
    ...category,
    phrases: category.phrases.filter(phrase => 
      phrase.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
      phrase.arabic.includes(searchQuery) ||
      phrase.pronunciation.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.phrases.length > 0);
  
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    
    toast({
      title: "Copied to clipboard",
      description: "The phrase has been copied to your clipboard.",
      duration: 2000,
    });
    
    setTimeout(() => setCopiedId(null), 2000);
  };
  
  return (
    <Card className="glass-card p-5 animate-slide-in">
      <h3 className="text-xl font-medium mb-4">Essential Arabic Phrases</h3>
      
      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search phrases..."
          value={searchQuery}
          onChange={handleSearch}
          className="pl-9"
        />
      </div>
      
      {filteredCategories.length > 0 ? (
        <Tabs defaultValue={filteredCategories[0].id} className="w-full">
          <TabsList className="w-full mb-4 grid" style={{ gridTemplateColumns: `repeat(${Math.min(filteredCategories.length, 3)}, 1fr)` }}>
            {filteredCategories.map(category => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {filteredCategories.map(category => (
            <TabsContent key={category.id} value={category.id} className="space-y-4 mt-0">
              {category.phrases.map((phrase: Phrase, idx) => (
                <div 
                  key={phrase.id}
                  className="p-4 rounded-lg bg-card border border-border animate-enter"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium">{phrase.english}</h4>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7 rounded-full hover:bg-accent"
                        onClick={() => handleCopy(phrase.english, `${phrase.id}-en`)}
                      >
                        {copiedId === `${phrase.id}-en` ? (
                          <Check className="h-3.5 w-3.5" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-right font-arabic text-lg" dir="rtl">
                      {phrase.arabic}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7 rounded-full hover:bg-accent ml-2"
                      onClick={() => handleCopy(phrase.arabic, `${phrase.id}-ar`)}
                    >
                      {copiedId === `${phrase.id}-ar` ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </div>
                  
                  <div className="text-sm text-muted-foreground flex items-center">
                    <span className="mr-2">Pronunciation:</span>
                    <span className="font-medium">{phrase.pronunciation}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 rounded-full hover:bg-accent ml-1"
                    >
                      <VolumeIcon className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  {phrase.context && (
                    <div className="text-xs text-muted-foreground mt-2 italic">
                      {phrase.context}
                    </div>
                  )}
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <div className="text-center py-10">
          <div className="text-muted-foreground mb-2">No phrases found matching "{searchQuery}"</div>
          <Button variant="outline" onClick={() => setSearchQuery('')}>
            Clear Search
          </Button>
        </div>
      )}
    </Card>
  );
};
