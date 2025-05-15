import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const Calendar = () => {
  const { toast } = useToast();
  
  const handleAddEvent = () => {
    toast({
      title: "Funktion noch nicht verfügbar",
      description: "Diese Funktion wird bald freigeschaltet.",
    });
  };
  
  // Dummy calendar data
  const days = Array.from({length: 30}, (_, i) => i + 1);
  const events = [
    { day: 5, title: "Strategie-Meeting", time: "10:00 - 11:30" },
    { day: 12, title: "Content-Planung", time: "14:00 - 15:00" },
    { day: 18, title: "Webinar vorbereiten", time: "09:00 - 12:00" },
    { day: 25, title: "Social Media Review", time: "16:00 - 17:00" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Kalender</h1>
        <Button 
          onClick={handleAddEvent} 
          className="bg-flowhero-orange hover:bg-flowhero-orange/90 flex gap-2"
        >
          <Plus size={18} />
          Neuen Termin hinzufügen
        </Button>
      </div>
      
      <Card className="bg-flowhero-card border-flowhero-card">
        <CardHeader>
          <CardTitle className="text-white">Mai 2025</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1">
            {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(day => (
              <div key={day} className="text-center p-2 font-medium text-gray-300">{day}</div>
            ))}
            
            {/* Empty cells for days before start of month */}
            {Array.from({length: 3}, (_, i) => ( // Assuming May 2025 starts on a Thursday, so 3 empty cells
              <div key={`empty-${i}`} className="h-24 p-1 border border-gray-700 opacity-50"></div>
            ))}
            
            {days.map(day => {
              const dayEvents = events.filter(event => event.day === day);
              
              return (
                <div 
                  key={day} 
                  className="h-24 p-1 border border-gray-700 hover:border-flowhero-orange/50 transition-colors"
                >
                  <div className="text-right text-sm text-gray-300 mb-1">{day}</div>
                  
                  {dayEvents.map(event => (
                    <div key={event.title} className="bg-flowhero-orange/30 p-1 rounded text-xs mb-1">
                      <div className="font-medium">{event.title}</div>
                      <div className="text-gray-300">{event.time}</div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Calendar;
