import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FolderKanban, // Story-Fundament
  Quote, // Tagline
  Presentation, // Elevator-Pitch
  Target, // Positionierungsgeschichte
  BookOpen, // Markengeschichte
  Package, // Produktnutzengeschichte
  Award, // Referenzgeschichten
  LucideIcon,
} from 'lucide-react';

interface StorytellingFeature {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
  disabled?: boolean;
}

const features: StorytellingFeature[] = [
  {
    icon: FolderKanban,
    title: 'Story-Fundament',
    description: 'Verwalte deine grundlegenden Markengeschichten und Kernbotschaften, die die Basis für all deine Kommunikation bilden.',
    link: '/storytelling/story-fundament',
  },
  {
    icon: Quote,
    title: 'Tagline',
    description: 'Erstelle eine prägnante Aussage, die dein Unternehmen, deine Marke oder dein Angebot auf den Punkt bringt.',
    link: '/storytelling/tagline',
  },
  {
    icon: Presentation,
    title: 'Elevator-Pitch',
    description: 'Präsentiere dein Unternehmen oder Produkt prägnant und überzeugend in 30-60 Sekunden, um potenzielle Kunden oder Investoren zu begeistern.',
    link: '/storytelling/elevator-pitch',
  },
  {
    icon: Target,
    title: 'Positionierungsgeschichte',
    description: 'Kommuniziere dein Alleinstellungsmerkmal überzeugend und hebe dich klar von Mitbewerbern ab.',
    link: '/storytelling/positioning-story',
  },
  {
    icon: BookOpen,
    title: 'Markengeschichte',
    description: 'Forme eine emotionale Verbindung zu deiner Zielgruppe, indem du die authentische Geschichte hinter deiner Marke erzählst.',
    link: '/storytelling/brand-story',
  },
  {
    icon: Package,
    title: 'Produktnutzengeschichte',
    description: 'Zeige anschaulich, wie dein Angebot die Probleme deiner Kunden löst und ihr Leben verbessert.',
    link: '/storytelling/product-usage-story',
  },
  {
    icon: Award,
    title: 'Referenzgeschichten',
    description: 'Transformiere Kundenerfolge in überzeugende Geschichten, die das Vertrauen potenzieller Kunden stärken.',
    link: '/storytelling/testimonial-story',
  },
];

const StorytellingExpert = () => {
  // Please replace this with the actual URL for the Storyteller avatar
  const avatarUrl = 'https://via.placeholder.com/150/D2691E/FFFFFF?Text=Storyteller'; 

  return (
    <div className="space-y-8 p-4 md:p-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-700 p-6 sm:p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
        <div className="flex-shrink-0">
          <img 
            src={avatarUrl} 
            alt="Storytelling Experte Avatar" 
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-white shadow-md bg-slate-700" // Added bg-slate-700 for placeholder visibility
          />
        </div>
        <div className="text-white text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Storytelling-Experte</h1>
          <p className="text-base sm:text-lg">
            Entwickelt deine Kernbotschaft, Positionierungsgeschichte, Markengeschichte und deinen Elevator Pitch. Sehe alle auf einem Blick im Story-Fundament.
          </p>
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => {
          const CardComponent = feature.disabled ? 'div' : Link;
          return (
            <CardComponent
              key={feature.title}
              to={feature.disabled ? '' : feature.link}
              className={`bg-slate-800 border-slate-700 hover:border-orange-500 transition-all duration-200 ease-in-out transform hover:scale-[1.02] shadow-lg rounded-lg flex flex-col ${feature.disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <CardHeader className="flex-row items-center space-x-4 pb-3">
                <feature.icon className="w-8 h-8 text-orange-400" />
                <CardTitle className="text-xl font-semibold text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-slate-300 text-sm">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </CardComponent>
          );
        })}
      </div>
    </div>
  );
};

export default StorytellingExpert;
