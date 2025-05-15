import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, BarChartBig, Share2, Search, TrendingUp, Library } from 'lucide-react';
import { Link } from 'react-router-dom';

const avatarUrl = "https://i.postimg.cc/mzy5FDfz/6.png";

interface StrategyFeature {
  icon: React.ElementType;
  title: string;
  description: string;
  link: string;
  iconColor?: string;
}

const features: StrategyFeature[] = [
  {
    icon: Target,
    title: "Positionierungsstrategie",
    description: "Erhalte maßgeschneiderte Ratschläge und Strategien für deine Positionierung und dein Storytelling, die auf deine Branche und Zielgruppe zugeschnitten sind.",
    link: "/strategy/positionierung",
    iconColor: "text-yellow-400"
  },
  {
    icon: BarChartBig,
    title: "Online Marketing Strategie",
    description: "Erhalte maßgeschneiderte Ratschläge und Strategien für dein Online-Marketing, die auf deine Branche und Zielgruppe zugeschnitten sind.",
    link: "/strategy/online-marketing",
    iconColor: "text-yellow-400"
  },
  {
    icon: Share2,
    title: "Social Media Strategie",
    description: "Entwickle eine maßgeschneiderte Social-Media-Strategie, die deine Unternehmensziele unterstützt.",
    link: "/strategy/social-media",
    iconColor: "text-yellow-400"
  },
  {
    icon: Search,
    title: "Wettbewerbsanalyse",
    description: "Analysiere deine Konkurrenz und identifiziere Chancen zur Differenzierung deiner Marke.",
    link: "/strategy/wettbewerbsanalyse",
    iconColor: "text-yellow-400"
  },
  {
    icon: TrendingUp,
    title: "Trend-Recherche",
    description: "Entdecke aktuelle Markttrends und Entwicklungen in deiner Branche für strategische Entscheidungen.",
    link: "/strategy/trend-recherche",
    iconColor: "text-yellow-400"
  },
  {
    icon: Library,
    title: "Meine Strategien",
    description: "Verwalte und überarbeite deine erstellten Strategien.",
    link: "/strategy/meine-strategien",
    iconColor: "text-yellow-400"
  }
];

const StrategyExpert = () => {
  return (
    <div className="space-y-8 p-4 md:p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
        <img 
          src={avatarUrl} 
          alt="Strategie Experte Avatar" 
          className="w-32 h-32 md:w-40 md:h-40 object-contain rounded-lg"
        />
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Strategie-Experte</h1>
          <p className="text-gray-300 mt-2 text-base md:text-lg max-w-xl">
            Plant und optimiert deine Geschäftsstrategie, Positionierung und Marketing-Ausrichtung für maximalen Erfolg.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Link to={feature.link} key={feature.title} className="block hover:no-underline">
            <Card className="bg-slate-800 border-slate-700 text-white shadow-lg hover:shadow-slate-600/50 transition-all duration-300 h-full flex flex-col hover:border-flowhero-orange/70">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <feature.icon className={`w-8 h-8 ${feature.iconColor || 'text-flowhero-orange'}`} />
                  <CardTitle className="text-lg font-semibold text-white">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-gray-300 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StrategyExpert;
