import React from 'react';
import { User, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

type WelcomeBannerProps = {
  username: string;
  onSetupStart: () => void;
  onWatchVideo: () => void;
};

export function WelcomeBanner({ username, onSetupStart, onWatchVideo }: WelcomeBannerProps) {
  const navigate = useNavigate();

  const handleSetupClick = () => {
    onSetupStart();
    navigate('/setup');
  };

  return (
    <div className="welcome-banner p-8 text-white bg-gradient-to-r from-flowhero-darker to-flowhero-card rounded-lg mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Herzlich willkommen, {username}!
          </h1>
          <p className="text-xl">
            Ich freue mich auf unsere Zusammenarbeit
          </p>
          
          <div className="mt-6 bg-black/10 p-4 rounded-lg">
            <p className="text-white/90">
              Bitte erstelle zuerst dein Unternehmens-Profil, um alle Funktionen nutzen zu können.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col gap-4 justify-center">
          <Button 
            onClick={handleSetupClick}
            className="bg-white hover:bg-gray-100 text-flowhero-orange flex gap-2"
          >
            <User size={18} />
            Jetzt Ersteinrichtung starten
          </Button>
          
          <Button 
            onClick={onWatchVideo}
            variant="outline" 
            className="bg-transparent border-white text-white hover:bg-white/10 flex gap-2"
          >
            <Play size={18} />
            Onboarding Video ansehen
          </Button>
        </div>
      </div>
    </div>
  );
}
