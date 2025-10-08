import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const GoldPackage = () => {
  const location = useLocation();
  
  const packages = [
    { name: "🥈 Silver Package", path: "/packages/silver" },
    { name: "🥇 Gold Package", path: "/packages/gold" },
    { name: "💎 Platinum Package", path: "/packages/platinum" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Package Navigation */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4">
          <nav className="flex justify-center gap-2 py-4">
            {packages.map((pkg) => (
              <Link
                key={pkg.path}
                to={pkg.path}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  location.pathname === pkg.path
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent hover:bg-accent/80"
                }`}
              >
                {pkg.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Package Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">🥇 Gold Package</h1>
            <p className="text-xl text-muted-foreground">Classic Wedding</p>
            <p className="text-sm text-muted-foreground mt-2">Promo Code: #100A</p>
          </div>

          {/* Package Details Card */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-3xl">₱95,000</CardTitle>
              <CardDescription>Complete Wedding Essentials</CardDescription>
              <p className="text-sm mt-2">An all-in-one classic wedding package with more inclusions and freebies for a memorable celebration.</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Catering Setup */}
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  🍽️ Catering Setup
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>3 menu choices with rice, soft drinks, and fruit salad</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Complete catering setup (tables, chairs with covers, utensils)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Buffet corner with chafing dishes</span>
                  </li>
                </ul>
              </div>

              {/* Venue Styling */}
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  🎀 Venue Styling & Décor
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Backdrop styling based on your motif</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Artificial flowers, couch, grass mat</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Entrance arch, basic table centerpieces, and droplights</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>(No ceiling design included)</span>
                  </li>
                </ul>
              </div>

              {/* Major Freebie */}
              <div className="bg-accent/50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  🎁 Choose 1 Major Freebie:
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="font-semibold">A)</span>
                    <span>2-tier soft-icing wedding cake with wine</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold">B)</span>
                    <span>Basic sound system & lights with emcee at reception</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold">C)</span>
                    <span>HMUA for bride and groom</span>
                  </li>
                </ul>
              </div>

              {/* Additional Freebies */}
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  📸 Additional Freebies for All:
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Reception program flow</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Buffet servers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Fresh round bridal bouquet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>30 pcs basic invitations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>30 pcs giveaways (keyholder bottle opener)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Basic wedding day photo coverage (no prints, saved in Google Drive)</span>
                  </li>
                </ul>
              </div>

              {/* Note */}
              <div className="text-sm text-muted-foreground">
                <p>📍 No coordination included in church & venue. Transportation fee may apply outside city limits.</p>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <Button size="lg" className="w-full">Book Gold Package</Button>
              </div>
            </CardContent>
          </Card>

          {/* Gallery Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Gold Package Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-square bg-muted rounded-lg overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&h=400&fit=crop`} 
                    alt={`Gold Package ${i}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GoldPackage;
