import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { AuthModal } from "@/components/AuthModal";

const SilverPackage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  const packages = [
    { name: "🥈 Silver Package", path: "/packages/silver" },
    { name: "🥇 Gold Package", path: "/packages/gold" },
    { name: "💎 Platinum Package", path: "/packages/platinum" },
  ];

  const handleBookPackage = () => {
    if (user) {
      // User is signed in, navigate to dashboard with query param to open add event modal
      navigate('/dashboard?openAddEvent=true&package=silver');
    } else {
      // User is not signed in, show auth modal
      setShowAuthModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-background page-transition">
      <Navigation />
      
      {/* Package Navigation */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-2 sm:px-4">
          <nav className="flex justify-center gap-1.5 sm:gap-2 py-3 sm:py-4 overflow-x-auto scrollbar-hide">
            {packages.map((pkg) => (
              <Link
                key={pkg.path}
                to={pkg.path}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                  location.pathname === pkg.path
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent hover:bg-accent/80"
                }`}
              >
                <span className="hidden sm:inline">{pkg.name}</span>
                <span className="sm:hidden">{pkg.name.replace(' Package', '')}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
      
      <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Package Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">🥈 Silver Package</h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground">Minimalist Wedding</p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2">Promo Code: #50A</p>
          </div>

          {/* Package Details Card */}
          <Card className="mb-8 sm:mb-12">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-2xl sm:text-3xl">₱69,000</CardTitle>
              <CardDescription className="text-sm sm:text-base">Catering & Décor Only</CardDescription>
              <p className="text-xs sm:text-sm mt-2">Perfect for couples who want a simple, intimate, and budget-friendly celebration.</p>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
              {/* Catering Setup */}
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                  🍽️ Catering Setup
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base">3 menu choices with rice, soft drinks, and fruit salad</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base">Complete catering setup with utensils, tables, and chairs with covers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base">Buffet corner with skirting and chafing dishes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base">2 servers at the buffet area</span>
                  </li>
                </ul>
              </div>

              {/* Venue Styling */}
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                  🎀 Venue Styling & Décor
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base">Minimalist décor setup with backdrop and centerpieces</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base">VIP table setup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base">Artificial flower arrangements and grass mat</span>
                  </li>
                </ul>
              </div>

              {/* Program Support */}
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                  📋 Program Support
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base">Basic program flow at the venue</span>
                  </li>
                </ul>
              </div>

              {/* Bonus */}
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                  💐 Bonus
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base">Free basic bridal bouquet</span>
                  </li>
                </ul>
              </div>

              {/* Freebies */}
              <div className="bg-accent/50 p-3 sm:p-4 rounded-lg">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                  🎁 Choose 1 Freebie:
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-sm sm:text-base">A)</span>
                    <span className="text-sm sm:text-base">2-layer basic wedding cake with wine</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-sm sm:text-base">B)</span>
                    <span className="text-sm sm:text-base">HMUA (Hair & Makeup Artist) for bride and groom</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-sm sm:text-base">C)</span>
                    <span className="text-sm sm:text-base">Basic photo coverage at the venue (no prints)</span>
                  </li>
                </ul>
              </div>

              {/* Note */}
              <div className="text-xs sm:text-sm text-muted-foreground">
                <p>📍 Transportation fee applies for venues outside the city.</p>
              </div>

              {/* Action Button */}
              <div className="pt-2 sm:pt-4">
                <Button 
                  size="lg" 
                  className="w-full text-sm sm:text-base h-10 sm:h-11"
                  onClick={handleBookPackage}
                >
                  Book Silver Package
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        defaultMode="signin"
      />
    </div>
  );
};

export default SilverPackage;