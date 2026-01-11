import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { AuthModal } from "@/components/AuthModal";

const GoldPackage = () => {
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
      navigate('/dashboard?openAddEvent=true&package=gold');
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
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">🥇 Gold Package</h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground">Classic Wedding</p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2">Promo Code: #100A</p>
          </div>

          {/* Package Details Card */}
          <Card className="mb-8 sm:mb-12">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-2xl sm:text-3xl">₱95,000</CardTitle>
              <CardDescription className="text-sm sm:text-base">Complete Wedding Essentials</CardDescription>
              <p className="text-xs sm:text-sm mt-2">An all-in-one classic wedding package with more inclusions and freebies for a memorable celebration.</p>
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
                    <span className="text-sm sm:text-base">Complete catering setup (tables, chairs with covers, utensils)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base">Buffet corner with chafing dishes</span>
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
                    <span className="text-sm sm:text-base">Backdrop styling based on your motif</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base">Artificial flowers, couch, grass mat</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base">Entrance arch, basic table centerpieces, and droplights</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base">(No ceiling design included)</span>
                  </li>
                </ul>
              </div>

              {/* Major Freebie */}
              <div className="bg-accent/50 p-3 sm:p-4 rounded-lg">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                  🎁 Choose 1 Major Freebie:
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-sm sm:text-base">A)</span>
                    <span className="text-sm sm:text-base">2-tier soft-icing wedding cake with wine</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-sm sm:text-base">B)</span>
                    <span className="text-sm sm:text-base">Basic sound system & lights with emcee at reception</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-sm sm:text-base">C)</span>
                    <span className="text-sm sm:text-base">HMUA for bride and groom</span>
                  </li>
                </ul>
              </div>

              {/* Additional Freebies */}
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                  📸 Additional Freebies for All:
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base">Reception program flow</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base">Buffet servers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base">Fresh round bridal bouquet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base">30 pcs basic invitations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base">30 pcs giveaways (keyholder bottle opener)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base">Basic wedding day photo coverage (no prints, saved in Google Drive)</span>
                  </li>
                </ul>
              </div>

              {/* Note */}
              <div className="text-xs sm:text-sm text-muted-foreground">
                <p>📍 No coordination included in church & venue. Transportation fee may apply outside city limits.</p>
              </div>

              {/* Action Button */}
              <div className="pt-2 sm:pt-4">
                <Button 
                  size="lg" 
                  className="w-full text-sm sm:text-base h-10 sm:h-11"
                  onClick={handleBookPackage}
                >
                  Book Gold Package
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

export default GoldPackage;