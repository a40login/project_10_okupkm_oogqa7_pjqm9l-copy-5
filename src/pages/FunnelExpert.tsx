import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Lightbulb,
  BookOpenCheck,
  MousePointerClick,
  Globe2,
  LayoutPanelLeft,
  LucideIcon,
} from 'lucide-react';

interface FunnelFeature {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
  disabled?: boolean;
}

const features: FunnelFeature[] = [
  {
    icon: Lightbulb,
    title: 'Lead Magnet Ideengenerator',
    description: 'Entdecke kreative und effektive Lead-Magnet-Ideen, die perfekt zu deinem Unternehmen passen und deine Zielgruppe begeistern.',
    link: '/funnel/lead-magnet-ideation',
  },
  {
    icon: BookOpenCheck,
    title: 'Lead Magnet Ersteller',
    description: 'Erstelle wertvolle Lead Magnete und eBooks für Lead-Generierung und Markenaufbau.',
    link: '/funnel/lead-magnet-creation',
  },
  {
    icon: MousePointerClick,
    title: 'Call-to-Action Generator',
    description: 'Erstelle überzeugende Handlungsaufforderungen, die mehr Klicks und Conversions generieren.',
    link: '/funnel/call-to-action',
  },
  {
    icon: Globe2,
    title: 'Unternehmer Expertenseite',
    description: 'Erstelle eine komplette One-Page-Website für dein Unternehmen – optimiert für Informationsvermittlung und Kundengewinnung.',
    link: '/funnel/expert-site',
  },
  {
    icon: LayoutPanelLeft,
    title: 'Lead Magnet Landingpage',
    description: 'Erstelle eine optimierte Landingpage für deine Lead Magnete, die maximale Conversions erzielt.',
    link: '/funnel/lead-magnet-landingpage',
  },
];

const FunnelExpert = () => {
  const avatarUrl = 'https://i.postimg.cc/Hj3NYV9F/8.png'; // Provided avatar URL

  return (
    <div className="space-y-8 p-4 md:p-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 p-6 sm:p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
        <div className="flex-shrink-0">
          <img 
            src={avatarUrl} 
            alt="Funnel Architekt Avatar" 
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-contain border-4 border-white shadow-md"
          />
        </div>
        <div className="text-white text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Funnel Architekt</h1>
          <p className="text-base sm:text-lg">
            Baut dir eine Website-Struktur, die konvertiert, entwickelt Lead-Magneten und optimiert deine gesamte Customer Journey.
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
              className={`bg-slate-800 border-slate-700 hover:border-blue-500 transition-all duration-200 ease-in-out transform hover:scale-[1.02] shadow-lg rounded-lg flex flex-col ${feature.disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <CardHeader className="flex-row items-center space-x-4 pb-3">
                <feature.icon className="w-8 h-8 text-blue-400" />
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

export default FunnelExpert;
