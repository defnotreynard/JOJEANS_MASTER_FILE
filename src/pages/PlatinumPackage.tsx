import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { AuthModal } from "@/components/AuthModal";

const PlatinumPackage = () => {
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
      navigate('/dashboard?openAddEvent=true&package=platinum');
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
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">💎 Platinum Package</h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground">All-in GOLD Wedding</p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2">Promo Code: #100D</p>
          </div>

          {/* Package Details Card */}
          <Card className="mb-8 sm:mb-12">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-2xl sm:text-3xl">₱199,000</CardTitle>
              <CardDescription className="text-sm sm:text-base">Luxury All-in Wedding Experience</CardDescription>
              <p className="text-xs sm:text-sm mt-2">A premium package designed for a grand, stress-free wedding — complete with styling, catering, photography, venue, and more.</p>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
              {/* Catering Setup */}
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                  🍽️ Catering & Setup
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base">3 main courses, rice, cold soft drinks, dessert</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base">Elegant table setup with utensils, tables, chairs, and centerpieces</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base">FREE 1 whole small lechon (approx. 18kg)</span>
                  </li>
                </ul>
              </div>

              {/* Luxury Décor */}
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                  🎀 Luxury Décor & Styling
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base">Church & venue styling: backdrop, ceiling works, chandelier, red carpet, flower stands, entrance arch</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base">Artificial elegant flowers with accents of fresh flowers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base">Royal centerpieces and entrance tunnel</span>
                  </li>
                </ul>
              </div>

              {/* Church Weddings */}
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                  ✝️ For Church Weddings:
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base">Basic church décor (10 fresh flower stands, 2 altar flower arrangements)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base">Free offertory items: fruits, candles, and wine</span>
                  </li>
                </ul>
              </div>

              {/* Photography */}
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                  📸 Photography & Media
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base">Free wedding day photography + prenup photo session (saved on USB)</span>
                  </li>
                </ul>
              </div>

              {/* Reception */}
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                  🍰 Reception & Entertainment
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base">Couple's couch at reception</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base">Basic sound system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base">Lively host with program flow</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base">3-tier wedding cake with wine in an elegant setup corner</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base">Fruit buffet corner & pica-pica corner</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base">High-end stage lighting effects</span>
                  </li>
                </ul>
              </div>

              {/* HMUA */}
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                  💇‍♀️ HMUA Services
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base">Bride & groom (prenup + wedding)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base">3 bridesmaids</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base">1 maid of honor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base">2 mothers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base">3 flower girls</span>
                  </li>
                </ul>
              </div>

              {/* VIP Extras */}
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                  🏨 VIP Extras
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base">FREE reception venue with hotel room for couple (8 AM – 5 PM prep)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base">FREE 50 invitations and 50 giveaways</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base">FREE bridal car with fresh flower bouquet (if church wedding)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base">FREE prenup transportation within Negros Oriental (half day)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base">On-the-day assistance and coordination</span>
                  </li>
                </ul>
              </div>

              {/* Premium Freebie */}
              <div className="bg-accent/50 p-3 sm:p-4 rounded-lg">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                  🎁 Choose 1 Premium Freebie:
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-sm sm:text-base">A)</span>
                    <span className="text-sm sm:text-base">LED Wall + SDE video at reception (final on wedding day)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-sm sm:text-base">B)</span>
                    <span className="text-sm sm:text-base">Wedding attire rental package (2nd user, basic set) + fresh bouquets & corsages</span>
                  </li>
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-2 sm:pt-4">
                <Button 
                  size="lg" 
                  className="w-full text-sm sm:text-base h-10 sm:h-11"
                  onClick={handleBookPackage}
                >
                  Book Platinum Package
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

export default PlatinumPackage;