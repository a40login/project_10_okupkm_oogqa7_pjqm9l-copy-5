import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ChromeIcon } from 'lucide-react'; // Using ChromeIcon as a placeholder for Google

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { signIn, signInWithGoogle, user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && user) {
      navigate('/');
    }
  }, [user, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await signIn({ email, password });
      if (error) {
        throw error;
      }
      toast({ title: "Login Successful", description: "Welcome back!" });
      navigate('/'); 
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
      // Supabase handles redirection, so no explicit navigation here after calling signInWithGoogle.
      // The AuthContext's onAuthStateChange listener will update user state and trigger useEffect.
    } catch (error: any) {
      toast({
        title: "Google Sign-In Failed",
        description: error.message || "Could not sign in with Google. Please try again.",
        variant: "destructive",
      });
    } finally {
      // setGoogleLoading(false); // Might not be necessary if page redirects
    }
  };

  if (authLoading && !user) { // Show loader if auth is loading and there's no user yet
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <Card className="w-full max-w-md bg-slate-900 border-slate-700 text-white">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-primary">Login to FlowHero.AI</CardTitle>
          <CardDescription className="text-center text-slate-400">
            Enter your credentials or sign in with Google.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-slate-800 border-slate-700 focus:ring-primary text-white placeholder-slate-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-slate-800 border-slate-700 focus:ring-primary text-white placeholder-slate-500"
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white" disabled={loading || googleLoading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Login"}
            </Button>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-2 text-slate-400">
                Or continue with
              </span>
            </div>
          </div>
          <Button variant="outline" className="w-full border-slate-700 hover:bg-slate-800 hover:text-white text-slate-300" onClick={handleGoogleSignIn} disabled={loading || googleLoading}>
            {googleLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ChromeIcon className="mr-2 h-4 w-4" />} 
            Sign in with Google
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <p className="text-sm text-slate-400">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
