import React from 'react';
import { WelcomeBanner } from '@/components/WelcomeBanner';
import { ExpertCard } from '@/components/ExpertCard';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext'; // Import useAuth

const Dashboard = () => {
  const { user } = useAuth(); // Get user from AuthContext
  const { toast } = useToast();

  // Use user's email or a part of it as username, or a default
  const username = user?.email?.split('@')[0] || 'User'; 

  const handleSetupStart = () => {
    // This might navigate to /setup or a specific setup flow
    toast({
      title: "Ersteinrichtung gestartet",
      description: "Wir leiten dich zum Profil-Setup weiter.",
    });
    // navigate('/setup'); // Example navigation
  };

  const handleWatchVideo = () => {
    toast({
      title: "Video wird geladen",
      description: "Das Onboarding-Video wird vorbereitet.",
    });
  };

  const handleProfileCreate = () => {
    // This check might be different now with auth.
    // If user is here, they are logged in. Profile might be part of /setup or /profile.
    toast({
      title: "Profilverwaltung",
      description: "Du kannst dein Profil unter 'Profil' bearbeiten.",
    });
    // navigate('/profile'); // Example navigation
  };

  const experts = [
    {
      title: "Strategie-Experte",
      description: "Plant und optimiert deine Marketingstrategie, Positionierung und Marketing-Ausrichtung für maximalen Erfolg.",
      avatarSrc: "/placeholder.svg",
      gradientClass: "strategy",
      link: "/strategy"
    },
    {
      title: "Storytelling-Experte",
      description: "Entwickelt deine Kernbotschaft, Positionierungsgeschichte, Markengeschichte und deinen Elevator Pitch.",
      avatarSrc: "/placeholder.svg",
      gradientClass: "storytelling",
      link: "/storytelling"
    },
    {
      title: "Funnel-Architekt",
      description: "Baut dir eine Website-Struktur, die konvertiert, entwickelt Lead-Magneten und optimiert deine gesamte Customer Journey.",
      avatarSrc: "/placeholder.svg",
      gradientClass: "funnel",
      link: "/funnel"
    },
    {
      title: "Copywriter",
      description: "Schreibt dir alle Marketing-Texte, Sales-Texte, Blogbeiträge und E-Mail-Sequenzen, die du brauchst.",
      avatarSrc: "/placeholder.svg",
      gradientClass: "copywriter",
      link: "/copywriter"
    },
    {
      title: "Social-Media-Experte",
      description: "Plant deine Strategie, recherchiert Trends, schreibt Skripte und recycelt deinen Content für maximale Reichweite.",
      avatarSrc: "/placeholder.svg",
      gradientClass: "social",
      link: "/social"
    }
  ];

  return (
    <div className="space-y-8">
      <WelcomeBanner 
        username={username} // Use dynamic username
        onSetupStart={handleSetupStart}
        onWatchVideo={handleWatchVideo}
      />
      
      <div>
        <h2 className="text-2xl font-bold mb-6 text-white">Deine FlowHero.AI Experten</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {experts.map((expert) => (
            <ExpertCard
              key={expert.title}
              title={expert.title}
              description={expert.description}
              avatarSrc={expert.avatarSrc}
              gradientClass={expert.gradientClass}
              onProfileCreate={handleProfileCreate} // This might now link to the expert's page
              link={expert.link} // Added link prop to ExpertCard
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
