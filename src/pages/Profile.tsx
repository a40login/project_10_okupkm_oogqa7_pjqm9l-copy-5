import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext'; // Import useAuth

const Profile = () => {
  const { toast } = useToast();
  const { user } = useAuth(); // Get user from AuthContext

  const handleSaveProfile = () => {
    toast({
      title: "Profil gespeichert",
      description: "Deine Profilinformationen wurden aktualisiert.",
    });
  };
  
  const handlePasswordChange = () => {
    toast({
      title: "Passwortänderung",
      description: "Diese Funktion ist in den Einstellungen verfügbar.",
    });
  };

  const userEmail = user?.email || "benutzer@beispiel.com";
  const userInitial = userEmail.charAt(0).toUpperCase();

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-white">Mein Profil</h1>
      
      <Card className="bg-flowhero-card border-flowhero-card">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user?.user_metadata?.avatar_url || "/placeholder.svg"} alt={userEmail} />
              <AvatarFallback className="bg-flowhero-orange text-white text-2xl">{userInitial}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-white">{user?.user_metadata?.full_name || userEmail.split('@')[0]}</CardTitle>
              <CardDescription className="text-gray-300">{userEmail}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-white">Vollständiger Name</Label>
            <Input id="fullName" defaultValue={user?.user_metadata?.full_name || ""} placeholder="Dein vollständiger Name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">E-Mail Adresse</Label>
            <Input id="email" type="email" value={userEmail} readOnly disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company" className="text-white">Unternehmen (Optional)</Label>
            <Input id="company" placeholder="Name deines Unternehmens" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePasswordChange} className="border-gray-600 hover:border-flowhero-orange hover:text-flowhero-orange">
            Passwort ändern
          </Button>
          <Button onClick={handleSaveProfile} className="bg-flowhero-orange hover:bg-flowhero-orange/90">
            Profil speichern
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Profile;
