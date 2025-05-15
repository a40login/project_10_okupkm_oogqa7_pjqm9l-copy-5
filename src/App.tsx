import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { AuthProvider } from "@/contexts/AuthContext";
import { LoginPage } from "@/pages/LoginPage";
import { SignUpPage } from "@/pages/SignUpPage";
import { ProtectedMainLayout } from "@/layouts/ProtectedMainLayout";
import { ProtectedRouteElement } from "@/components/ProtectedRouteElement";

import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import SetupProfile from "./pages/SetupProfile";
import ManualSetup from "./pages/ManualSetup";
import StrategyExpert from "./pages/StrategyExpert";
import StorytellingExpert from "./pages/StorytellingExpert";
import FunnelExpert from "./pages/FunnelExpert";
import CopywritingExpert from "./pages/CopywritingExpert";
import SocialMediaExpert from "./pages/SocialMediaExpert";
import Calendar from "./pages/Calendar";
import SavedContent from "./pages/SavedContent";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import MarketingExpertPage from './pages/MarketingExpertPage';
import VertriebsExpertPage from './pages/VertriebsExpertPage';
import ProduktExpertPage from './pages/ProduktExpertPage';
import InnovationsExpertPage from './pages/InnovationsExpertPage';
import FinanzExpertPage from './pages/FinanzExpertPage';

// Social Media Subpages
import ContentCalendarPage from "./pages/social/ContentCalendarPage";
import SocialMediaPostsPage from "./pages/social/SocialMediaPostsPage";
import ReelStoryScriptsPage from "./pages/social/ReelStoryScriptsPage";
import LinkedInPostsPage from "./pages/social/LinkedInPostsPage";
import VideoScriptsPage from "./pages/social/VideoScriptsPage";
import ContentMultiplierPage from "./pages/social/ContentMultiplierPage";
import ImageIdeaGeneratorPage from "./pages/social/ImageIdeaGeneratorPage";
import ImageGeneratorPage from "./pages/social/ImageGeneratorPage.tsx";
import ContentPlanPage from "./pages/social/ContentPlanPage";

// Funnel Subpages
import LeadMagnetIdeationPage from "./pages/funnel/LeadMagnetIdeationPage";
import LeadMagnetCreationPage from "./pages/funnel/LeadMagnetCreationPage";
import CallToActionPage from "./pages/funnel/CallToActionPage";
import ExpertSitePage from "./pages/funnel/ExpertSitePage";
import LeadMagnetLandingPage from "./pages/funnel/LeadMagnetLandingPage";

// Storytelling Subpages
import StoryFundamentPage from "./pages/storytelling/StoryFundamentPage";
import TaglinePage from "./pages/storytelling/TaglinePage";
import ElevatorPitchPage from "./pages/storytelling/ElevatorPitchPage";
import PositioningStoryPage from "./pages/storytelling/PositioningStoryPage";
import BrandStoryPage from "./pages/storytelling/BrandStoryPage";
import ProductUsageStoryPage from "./pages/storytelling/ProductUsageStoryPage";
import TestimonialStoryPage from "./pages/storytelling/TestimonialStoryPage";

// Strategy Subpages
import PositionierungsstrategiePage from "./pages/strategy/PositionierungsstrategiePage";
import OnlineMarketingStrategiePage from "./pages/strategy/OnlineMarketingStrategiePage";
import SocialMediaStrategiePage from "./pages/strategy/SocialMediaStrategiePage";
import WettbewerbsanalysePage from "./pages/strategy/WettbewerbsanalysePage";
import TrendRecherchePage from "./pages/strategy/TrendRecherchePage";
import MeineStrategienPage from "./pages/strategy/MeineStrategienPage";

// Copywriter Subpages
import WebsiteTextePage from "./pages/copywriter/WebsiteTextePage";
import SocialMediaCaptionsPage from "./pages/copywriter/SocialMediaCaptionsPage";
import EmailKampagnenPage from "./pages/copywriter/EmailKampagnenPage";


const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            
            <Route element={<ProtectedMainLayout />}>
              <Route path="/" element={<Dashboard />} />
              
              <Route path="/strategy" element={<StrategyExpert />} />
              <Route path="/strategy/positionierung" element={<PositionierungsstrategiePage />} />
              <Route path="/strategy/online-marketing" element={<OnlineMarketingStrategiePage />} />
              <Route path="/strategy/social-media" element={<SocialMediaStrategiePage />} />
              <Route path="/strategy/wettbewerbsanalyse" element={<WettbewerbsanalysePage />} />
              <Route path="/strategy/trend-recherche" element={<TrendRecherchePage />} />
              <Route path="/strategy/meine-strategien" element={<MeineStrategienPage />} />

              <Route path="/storytelling" element={<StorytellingExpert />} />
              <Route path="/storytelling/story-fundament" element={<StoryFundamentPage />} />
              <Route path="/storytelling/tagline" element={<TaglinePage />} />
              <Route path="/storytelling/elevator-pitch" element={<ElevatorPitchPage />} />
              <Route path="/storytelling/positioning-story" element={<PositioningStoryPage />} />
              <Route path="/storytelling/brand-story" element={<BrandStoryPage />} />
              <Route path="/storytelling/product-usage-story" element={<ProductUsageStoryPage />} />
              <Route path="/storytelling/testimonial-story" element={<TestimonialStoryPage />} />
              
              <Route path="/funnel" element={<FunnelExpert />} />
              <Route path="/funnel/lead-magnet-ideation" element={<LeadMagnetIdeationPage />} />
              <Route path="/funnel/lead-magnet-creation" element={<LeadMagnetCreationPage />} />
              <Route path="/funnel/call-to-action" element={<CallToActionPage />} />
              <Route path="/funnel/expert-site" element={<ExpertSitePage />} />
              <Route path="/funnel/lead-magnet-landingpage" element={<LeadMagnetLandingPage />} />

              <Route path="/copywriter" element={<CopywritingExpert />} />
              <Route path="/copywriter/website-texte" element={<WebsiteTextePage />} />
              <Route path="/copywriter/social-media-captions" element={<SocialMediaCaptionsPage />} />
              <Route path="/copywriter/email-kampagnen" element={<EmailKampagnenPage />} />
              
              <Route path="/marketing-experte" element={<MarketingExpertPage />} />
              <Route path="/vertriebs-experte" element={<VertriebsExpertPage />} />
              <Route path="/produkt-experte" element={<ProduktExpertPage />} />
              <Route path="/innovations-experte" element={<InnovationsExpertPage />} />
              <Route path="/finanz-experte" element={<FinanzExpertPage />} />

              <Route path="/social" element={<SocialMediaExpert />} />
              <Route path="/social/content-calendar" element={<ContentCalendarPage />} />
              <Route path="/social/social-media-posts" element={<SocialMediaPostsPage />} />
              <Route path="/social/reel-story-scripts" element={<ReelStoryScriptsPage />} />
              <Route path="/social/linkedin-posts" element={<LinkedInPostsPage />} />
              <Route path="/social/video-scripts" element={<VideoScriptsPage />} />
              <Route path="/social/content-multiplier" element={<ContentMultiplierPage />} />
              <Route path="/social/image-idea-generator" element={<ImageIdeaGeneratorPage />} />
              <Route path="/social/image-generator" element={<ImageGeneratorPage />} />
              <Route path="/social/content-plan" element={<ContentPlanPage />} />

              <Route path="/calendar" element={<Calendar />} />
              <Route path="/saved" element={<SavedContent />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Route>

            <Route 
              path="/setup" 
              element={
                <ProtectedRouteElement>
                  <SetupProfile />
                </ProtectedRouteElement>
              } 
            />
            <Route 
              path="/setup/manual" 
              element={
                <ProtectedRouteElement>
                  <ManualSetup />
                </ProtectedRouteElement>
              } 
            />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </QueryClientProvider>
    </AuthProvider>
  </BrowserRouter>
);

export default App;