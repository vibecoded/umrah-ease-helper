
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { REQUIRED_DOCUMENTS } from '@/lib/documents';
import { DocumentItem } from '@/types';
import { Check, FileText, AlertCircle, Briefcase, User, HeartPulse, DollarSign, BookOpen } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export const DocumentChecklist = () => {
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  
  useEffect(() => {
    // Load from local storage
    const savedCompletedItems = localStorage.getItem('completedDocuments');
    if (savedCompletedItems) {
      setCompletedItems(JSON.parse(savedCompletedItems));
    }
  }, []);
  
  const toggleComplete = (id: string) => {
    setCompletedItems(prev => {
      const newCompletedItems = prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id];
      
      // Save to local storage
      localStorage.setItem('completedDocuments', JSON.stringify(newCompletedItems));
      
      return newCompletedItems;
    });
  };
  
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'travel':
        return <Briefcase className="h-4 w-4" />;
      case 'identity':
        return <User className="h-4 w-4" />;
      case 'health':
        return <HeartPulse className="h-4 w-4" />;
      case 'financial':
        return <DollarSign className="h-4 w-4" />;
      case 'religious':
        return <BookOpen className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };
  
  const categories = [...new Set(REQUIRED_DOCUMENTS.map(doc => doc.category))];
  
  const getDocumentsByCategory = (category: string) => {
    return REQUIRED_DOCUMENTS.filter(doc => doc.category === category);
  };
  
  const getCategoryName = (category: string) => {
    const names: Record<string, string> = {
      'travel': 'Travel Documents',
      'identity': 'Identity Documents',
      'health': 'Health Documents',
      'financial': 'Financial',
      'religious': 'Religious Items'
    };
    
    return names[category] || category;
  };
  
  const totalRequired = REQUIRED_DOCUMENTS.filter(doc => doc.required).length;
  const completedRequired = REQUIRED_DOCUMENTS
    .filter(doc => doc.required && completedItems.includes(doc.id))
    .length;
  
  const progressPercentage = (completedRequired / totalRequired) * 100;
  
  return (
    <Card className="glass-card p-5 animate-slide-in">
      <div className="mb-4">
        <h3 className="text-xl font-medium mb-1">Document Checklist</h3>
        <p className="text-sm text-muted-foreground">
          Track your required documents for Umrah
        </p>
      </div>
      
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium">Required Documents</div>
        <div className="text-sm">
          {completedRequired}/{totalRequired} Complete
        </div>
      </div>
      
      <div className="w-full h-2 bg-muted/50 rounded-full mb-6 overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      <Tabs defaultValue={categories[0]} className="w-full">
        <TabsList className="w-full mb-4 grid" style={{ gridTemplateColumns: `repeat(${categories.length}, 1fr)` }}>
          {categories.map(category => (
            <TabsTrigger key={category} value={category} className="flex items-center gap-1.5">
              {getCategoryIcon(category)}
              <span className="hidden sm:inline">{getCategoryName(category)}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        
        {categories.map(category => (
          <TabsContent key={category} value={category} className="space-y-3 mt-0">
            {getDocumentsByCategory(category).map((doc: DocumentItem) => (
              <div 
                key={doc.id}
                className={`flex items-center p-3 rounded-lg border border-transparent transition-all
                  ${completedItems.includes(doc.id) 
                    ? 'bg-primary/10 border-primary/20' 
                    : 'bg-card hover:bg-accent/30'}`}
                onClick={() => toggleComplete(doc.id)}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mr-3
                  ${completedItems.includes(doc.id) 
                    ? 'bg-primary/20 text-primary' 
                    : 'bg-muted text-muted-foreground'}`}
                >
                  {completedItems.includes(doc.id) ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <FileText className="h-3 w-3" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-sm">{doc.name}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {doc.description}
                      </p>
                    </div>
                    
                    {doc.required && (
                      <Badge variant="outline" className="text-[10px] h-5 bg-destructive/10 border-destructive/20 text-destructive">
                        Required
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
};
