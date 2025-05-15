import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, MessageSquare } from 'lucide-react'; // Mail entfernt, da nicht mehr benötigt
import { Link } from 'react-router-dom';

const avatarUrl = "https://i.postimg.cc/0Ms4QS31/2.png";

interface FinanzExpertFeature { // Interface-Name angepasst
  icon: React.ElementType;
  title: string;
  description: string;
  link: string;
  iconColor?: string;
}

const features: FinanzExpertFeature[] = [ // Typ angepasst
  {
    icon: FileText, // Placeholder
    title: "Budgetplanung",
    description: "Erstellung und Überwachung von Budgets zur Kostenkontrolle.",
    link: "/finanz-experte/budgetplanung", // Beispiel-Link
    iconColor: "text-yellow-400" // Beispiel-Farbe
  },
  {
    icon: MessageSquare, // Placeholder
    title: "Investitionsberatung",
    description: "Analyse und Beratung zu Investitionsmöglichkeiten.",
    link: "/finanz-experte/investitionsberatung", // Beispiel-Link
    iconColor: "text-yellow-400"
  }
];

const FinanzExpertPage = () => { // Komponentenname geändert
  return (
    <div className="space-y-8 p-4 md:p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
        <img 
          src={avatarUrl} 
          alt="Finanz Experte Avatar" // Alt-Text angepasst
          className="w-32 h-32 md:w-40 md:h-40 object-contain rounded-lg"
        />
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Finanz-Experte</h1> {/* Titel geändert */}
          <p className="text-gray-300 mt-2 text-base md:text-lg max-w-xl">
            Unterstützt dich bei Finanzplanung, Budgetierung und Investitionsentscheidungen für nachhaltigen Erfolg. {/* Beschreibung geändert */}
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

export default FinanzExpertPage; // Export geändert