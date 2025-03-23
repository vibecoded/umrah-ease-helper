
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { UMRAH_RITUALS } from '@/lib/rituals';
import { RitualStep } from '@/types';
import { CheckCircle, Circle, Info, ChevronRight, ChevronDown } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

export const UmrahRituals = () => {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStep = (stepId: number) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  const toggleComplete = (stepId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    
    setCompletedSteps(prev => {
      if (prev.includes(stepId)) {
        return prev.filter(id => id !== stepId);
      } else {
        return [...prev, stepId];
      }
    });
  };

  const progressPercentage = (completedSteps.length / UMRAH_RITUALS.length) * 100;

  return (
    <Card className="glass-card p-5 animate-scale-in">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-medium">Umrah Rituals</h3>
        <div className="text-sm text-muted-foreground">
          {completedSteps.length}/{UMRAH_RITUALS.length} Steps
        </div>
      </div>
      
      <div className="w-full h-2 bg-muted/50 rounded-full mb-6 overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      <div className="space-y-2">
        {UMRAH_RITUALS.map((step: RitualStep, index: number) => (
          <div key={step.id} className="animate-enter" style={{ animationDelay: `${index * 0.1}s` }}>
            <div 
              className={`flex items-center p-3 rounded-lg cursor-pointer transition-all
                ${expandedStep === step.id ? 'bg-accent/50' : 'hover:bg-accent/30'}`}
              onClick={() => toggleStep(step.id)}
            >
              <div 
                className="cursor-pointer mr-3 flex-shrink-0" 
                onClick={(e) => toggleComplete(step.id, e)}
              >
                {completedSteps.includes(step.id) ? (
                  <CheckCircle className="h-5 w-5 text-primary" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{step.title}</h4>
                  {expandedStep === step.id ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                
                {step.important && (
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <Info className="h-3 w-3 mr-1" /> 
                    Important ritual
                  </div>
                )}
              </div>
            </div>
            
            {expandedStep === step.id && (
              <div className="px-11 py-3 text-sm leading-relaxed bg-accent/20 rounded-b-lg -mt-2 animate-slide-in">
                <p>{step.description}</p>
                
                {step.prayers && step.prayers.length > 0 && (
                  <>
                    <Separator className="my-3" />
                    <div className="font-medium mb-1">Prayers/Supplications:</div>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {step.prayers.map((prayer, idx) => (
                        <li key={idx}>{prayer}</li>
                      ))}
                    </ul>
                  </>
                )}
                
                {step.location && (
                  <div className="mt-3 flex justify-end">
                    <Button variant="outline" size="sm" className="text-xs">
                      <MapPin className="h-3 w-3 mr-1" /> View on Map
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

function MapPin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
