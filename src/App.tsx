import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import RecentEvents from "./pages/RecentEvents";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import Packages from "./pages/Packages";
import SilverPackage from "./pages/SilverPackage";
import GoldPackage from "./pages/GoldPackage";
import PlatinumPackage from "./pages/PlatinumPackage";
import Weddings from "./pages/Weddings";
import Gallery from "./pages/Gallery";
import Shop from "./pages/Shop";
import Services from "./pages/Services";
import Venues from "./pages/Venues";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

// Create QueryClient outside component to prevent re-creation
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/recent-events" element={<RecentEvents />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/super-admin/*" element={<SuperAdminDashboard />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/packages/silver" element={<SilverPackage />} />
            <Route path="/packages/gold" element={<GoldPackage />} />
            <Route path="/packages/platinum" element={<PlatinumPackage />} />
            <Route path="/weddings" element={<Weddings />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/services" element={<Services />} />
            <Route path="/venues" element={<Venues />} />
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
