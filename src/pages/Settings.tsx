import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import CompanyProfileForm from '@/components/CompanyProfileForm'; // Import CompanyProfileForm

const Settings = () => {
  const { toast } = useToast();
  
  const handleSaveSettings = (section: string) => {
    // This function is now generic for other settings sections
    // CompanyProfileForm has its own save logic
    toast({
      title: `${section} gespeichert`,
      description: `Deine ${section.toLowerCase()} wurden erfolgreich aktualisiert.`,
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-white">Einstellungen</h1>
      
      <div className="space-y-8">
        {/* Company Profile Settings */}
        <Card className="bg-flowhero-card border-flowhero-card">
          <CardHeader>
            <CardTitle className="text-white">Unternehmensprofil & Markenstimme</CardTitle>
          </CardHeader>
          <CardContent>
            <CompanyProfileForm />
          </CardContent>
          {/* Footer might not be needed here if CompanyProfileForm has its own save buttons per tab */}
        </Card>

        <Card className="bg-flowhero-card border-flowhero-card">
          <CardHeader>
            <CardTitle className="text-white">Allgemeine Einstellungen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language" className="text-white">Sprache</Label>
              <select 
                id="language" 
                className="w-full h-10 rounded-md border border-gray-600 bg-flowhero-darker px-3 text-white focus:border-flowhero-orange focus:ring-flowhero-orange"
              >
                <option value="de">Deutsch</option>
                <option value="en">English</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="darkMode" className="text-white">Dunkles Design</Label>
              <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-600">
                <input 
                  type="checkbox" 
                  id="darkMode" 
                  defaultChecked
                  className="peer sr-only"
                />
                <span className="absolute inset-y-1 start-1 h-4 w-4 rounded-full bg-white transition peer-checked:start-6 peer-checked:bg-flowhero-orange"></span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications" className="text-white">Email-Benachrichtigungen</Label>
              <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-600">
                <input 
                  type="checkbox" 
                  id="notifications" 
                  defaultChecked
                  className="peer sr-only"
                />
                <span className="absolute inset-y-1 start-1 h-4 w-4 rounded-full bg-white transition peer-checked:start-6 peer-checked:bg-flowhero-orange"></span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={() => handleSaveSettings("Allgemeine Einstellungen")} className="bg-flowhero-orange hover:bg-flowhero-orange/90">
              Speichern
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="bg-flowhero-card border-flowhero-card">
          <CardHeader>
            <CardTitle className="text-white">Sicherheit</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-white">Aktuelles Passwort</Label>
              <Input id="currentPassword" type="password" placeholder="••••••••" className="bg-flowhero-darker border-gray-700 text-white" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-white">Neues Passwort</Label>
              <Input id="newPassword" type="password" placeholder="••••••••" className="bg-flowhero-darker border-gray-700 text-white" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white">Passwort bestätigen</Label>
              <Input id="confirmPassword" type="password" placeholder="••••••••" className="bg-flowhero-darker border-gray-700 text-white" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={() => handleSaveSettings("Passwort")} className="bg-flowhero-orange hover:bg-flowhero-orange/90">
              Passwort ändern
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="bg-flowhero-card border-flowhero-card">
          <CardHeader>
            <CardTitle className="text-white">API-Einstellungen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey" className="text-white">API-Schlüssel</Label>
              <div className="flex gap-2">
                <Input id="apiKey" defaultValue="sk-****************************************" readOnly className="flex-1 bg-flowhero-darker text-gray-400 border-gray-700" />
                <Button 
                  onClick={() => {
                    navigator.clipboard.writeText("sk-****************************************");
                    toast({ title: "API-Schlüssel kopiert" });
                  }}
                  variant="outline"
                  className="border-gray-600 text-white hover:border-flowhero-orange hover:text-flowhero-orange"
                >
                  Kopieren
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="useCustomApi" className="text-white">Eigene API verwenden</Label>
              <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-600">
                <input 
                  type="checkbox" 
                  id="useCustomApi" 
                  className="peer sr-only"
                />
                <span className="absolute inset-y-1 start-1 h-4 w-4 rounded-full bg-white transition peer-checked:start-6 peer-checked:bg-flowhero-orange"></span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={() => handleSaveSettings("API-Einstellungen")} className="bg-flowhero-orange hover:bg-flowhero-orange/90">
              Speichern
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
