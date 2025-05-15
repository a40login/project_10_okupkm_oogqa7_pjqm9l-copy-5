import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

interface ExpertCardProps {
  title: string;
  description: string;
  avatarSrc: string;
  gradientClass: string; // e.g., "strategy", "storytelling"
  onProfileCreate: () => void; // Kept for now, but might be replaced by direct link
  link?: string; // Optional link for navigation
}

const gradientClasses: Record<string, string> = {
  strategy: "from-blue-500 to-purple-600",
  storytelling: "from-pink-500 to-rose-500",
  funnel: "from-emerald-500 to-teal-600",
  copywriter: "from-amber-500 to-orange-600",
  social: "from-sky-500 to-indigo-600",
  default: "from-slate-700 to-slate-800"
};

export function ExpertCard({ title, description, avatarSrc, gradientClass, onProfileCreate, link }: ExpertCardProps) {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleCardClick = () => {
    if (link) {
      navigate(link);
    } else {
      // Fallback to onProfileCreate if no link is provided,
      // or if this button is meant for a different action.
      // For now, clicking the card navigates if link exists.
      // The button below can have its own specific action.
      onProfileCreate(); 
    }
  };
  
  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event if button has specific action
    if (link) {
      navigate(link);
    } else {
      onProfileCreate();
    }
  };

  const bgGradient = gradientClasses[gradientClass] || gradientClasses.default;

  return (
    <Card 
      className={`flex flex-col bg-slate-800 border-slate-700 text-white shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-lg overflow-hidden cursor-pointer h-full`}
      onClick={handleCardClick} // Make the whole card clickable
    >
      <CardHeader className={`bg-gradient-to-br ${bgGradient} p-6`}>
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16 border-2 border-white">
            <AvatarImage src={avatarSrc} alt={title} />
            <AvatarFallback className="bg-slate-600 text-white text-2xl">
              {title.substring(0, 1)}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl font-bold text-white">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardDescription className="text-slate-300 text-sm leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-6 bg-slate-800/50">
        <Button 
          variant="outline" 
          className="w-full border-primary text-primary hover:bg-primary hover:text-slate-900 transition-colors"
          onClick={handleButtonClick} // Use specific handler for button
        >
          Experten starten <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
