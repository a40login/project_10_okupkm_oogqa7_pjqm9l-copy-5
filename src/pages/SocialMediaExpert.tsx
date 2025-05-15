import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CalendarDays,
  MessageSquare,
  Film,
  Linkedin,
  Video,
  Layers,
  ImageIcon,
  ClipboardList,
  LucideIcon,
} from 'lucide-react';

interface SocialFeature {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
  comingSoon?: boolean;
  disabled?: boolean;
}

const features: SocialFeature[] = [
  {
    icon: CalendarDays,
    title: 'Content Kalender',
    description: 'Erstelle einen durchdachten Veröffentlichungsplan für konsistente Präsenz auf allen Plattformen.',
    link: '/social/content-calendar',
  },
  {
    icon: MessageSquare,
    title: 'Social Media Posts',
    description: 'Erstelle ansprechende Social-Media-Posts und Captions, die deine Zielgruppe begeistern.',
    link: '/social/social-media-posts',
  },
  {
    icon: Film,
    title: 'Reel & Story Skripte',
    description: 'Entwickle Skripte für fesselnde Kurzvideos und Stories auf Instagram, TikTok und mehr.',
    link: '/social/reel-story-scripts',
  },
  {
    icon: Linkedin,
    title: 'LinkedIn Posts',
    description: 'Erstelle professionelle LinkedIn Posts, die deine Expertise zeigen und Reichweite generieren.',
    link: '/social/linkedin-posts',
  },
  {
    icon: Video,
    title: 'Video Skripte',
    description: 'Erstelle professionelle Video-Skripte für überzeugende Marketing-Videos und Content.',
    link: '/social/video-scripts',
  },
  {
    icon: Layers,
    title: 'Content Multiplikator',
    description: 'Verwandle bestehende Video-Skripte in neue Formate und maximiere deren Reichweite über verschiedene Plattformen hinweg.',
    link: '/social/content-multiplier',
  },
  {
    icon: ImageIcon,
    title: 'Bildideen Generator',
    description: 'Generiere kreative Ideen für visuellen Content.',
    link: '/social/image-idea-generator',
    comingSoon: true,
    disabled: true,
  },
  {
    icon: ClipboardList,
    title: 'Content Plan',
    description: 'Entwickle einen umfassenden Content-Plan für deine Marketingziele.',
    link: '/social/content-plan',
    comingSoon: true,
    disabled: true,
  },
];

const SocialMediaExpert = () => {
  const avatarUrl = 'https://i.postimg.cc/211MXrvM/3.png'; // Provided avatar URL

  return (
    <div className="space-y-8 p-4 md:p-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-6 sm:p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
        <div className="flex-shrink-0">
          <img 
            src={avatarUrl} 
            alt="Social Media Experte Avatar" 
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-white shadow-md"
          />
        </div>
        <div className="text-white text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Social-Media-Experte</h1>
          <p className="text-base sm:text-lg">
            Plane, erstelle und optimiere deinen Social-Media-Content für maximale Reichweite und Engagement. 
            Von Strategie bis zur Content-Erstellung – dein Social-Media-Experte unterstützt dich bei jedem Schritt.
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
              className={`bg-slate-800 border-slate-700 hover:border-green-500 transition-all duration-200 ease-in-out transform hover:scale-[1.02] shadow-lg rounded-lg flex flex-col ${feature.disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <CardHeader className="flex-row items-center space-x-4 pb-3">
                <feature.icon className="w-8 h-8 text-green-400" />
                <CardTitle className="text-xl font-semibold text-white">{feature.title}</CardTitle>
                {feature.comingSoon && (
                  <Badge variant="outline" className="ml-auto bg-slate-600 text-slate-200 border-slate-500">
                    Coming Soon
                  </Badge>
                )}
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

export default SocialMediaExpert;
