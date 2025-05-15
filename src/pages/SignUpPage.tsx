import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';

export const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp, user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && user) {
      navigate('/'); 
    }
  }, [user, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({ title: "Error", description: "Passwords do not match.", variant: "destructive" });
      return;
    }
    if (!firstName.trim() || !lastName.trim()) {
      toast({ title: "Error", description: "First name and last name are required.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { data, error, profileError } = await signUp({ // Destructure potential profileError
        email,
        password,
        firstName,
        lastName,
      });

      if (error) { // This error is from auth.signUp or profile insert
        console.error("Sign up error:", error);
        toast({
          title: "Sign Up Failed",
          description: error.message || "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      } else if (data && data.user && data.profile) {
        // User created, profile created, and session likely active (if email confirmation is off or auto-confirmed)
        toast({ title: "Sign Up Successful", description: "Welcome! You are now logged in." });
        // Navigation will be handled by the useEffect watching useAuth().user
      } else if (data && data.user && !data.profile && profileError) {
        // User created in auth, but profile creation failed
        toast({
          title: "Account Created, Profile Incomplete",
          description: `Your account was created, but we couldn't save your profile: ${profileError.message}. Please try updating your profile later.`,
          variant: "default", // Or "warning"
          duration: 10000,
        });
         // Navigate to dashboard or a profile completion page
      } else if (data && data.user && !data.session) {
        // User created, email confirmation likely needed, profile might or might not have been created
        // (depends on how signUp in AuthContext handles this sequence)
        toast({
          title: "Signup Almost Complete!",
          description: "Please check your email to confirm your account. You might need to log in after confirming.",
          duration: 10000,
        });
      } else if (data && data.user && data.user.identities && data.user.identities.length === 0) {
        // This case can happen if email confirmation is on, but the user already exists
        // but is not confirmed. Supabase might return a user object with no identities.
       toast({
         title: "Account Exists / Action Required",
         description: "This email may already be registered but unconfirmed, or requires a different sign-in method. Please check your email or try logging in.",
         variant: "default",
         duration: 10000,
       });
     } else {
        // Fallback for unexpected response structure from AuthContext signUp
        toast({
          title: "Sign Up Status Unknown",
          description: "The response from the server was unexpected. Please check your email or try logging in. If the issue persists, contact support.",
          variant: "default",
        });
      }
    } catch (error: any) { // Catch any other unexpected errors from the handleSubmit scope
      toast({
        title: "Sign Up Failed",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  if (authLoading && !user) {
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
          <CardTitle className="text-3xl font-bold text-center text-primary">Create Account</CardTitle>
          <CardDescription className="text-center text-slate-400">
            Join FlowHero.AI and supercharge your marketing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4"> {/* Reduced space-y for more fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="bg-slate-800 border-slate-700 focus:ring-primary text-white placeholder-slate-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="bg-slate-800 border-slate-700 focus:ring-primary text-white placeholder-slate-500"
                />
              </div>
            </div>
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
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="bg-slate-800 border-slate-700 focus:ring-primary text-white placeholder-slate-500"
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white" disabled={loading || authLoading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Create Account"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <p className="text-sm text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
