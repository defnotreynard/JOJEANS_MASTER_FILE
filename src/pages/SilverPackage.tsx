import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const SilverPackage = () => {
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
            <h1 className="text-4xl font-bold mb-2">🥈 Silver Package</h1>
            <p className="text-xl text-muted-foreground">Minimalist Wedding</p>
            <p className="text-sm text-muted-foreground mt-2">Promo Code: #50A</p>
          </div>

          {/* Package Details Card */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-3xl">₱69,000</CardTitle>
              <CardDescription>Catering & Décor Only</CardDescription>
              <p className="text-sm mt-2">Perfect for couples who want a simple, intimate, and budget-friendly celebration.</p>
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
                    <span>Complete catering setup with utensils, tables, and chairs with covers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Buffet corner with skirting and chafing dishes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>2 servers at the buffet area</span>
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
                    <span>Minimalist décor setup with backdrop and centerpieces</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>VIP table setup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Artificial flower arrangements and grass mat</span>
                  </li>
                </ul>
              </div>

              {/* Program Support */}
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  📋 Program Support
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Basic program flow at the venue</span>
                  </li>
                </ul>
              </div>

              {/* Bonus */}
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  💐 Bonus
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Free basic bridal bouquet</span>
                  </li>
                </ul>
              </div>

              {/* Freebies */}
              <div className="bg-accent/50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  🎁 Choose 1 Freebie:
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="font-semibold">A)</span>
                    <span>2-layer basic wedding cake with wine</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold">B)</span>
                    <span>HMUA (Hair & Makeup Artist) for bride and groom</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold">C)</span>
                    <span>Basic photo coverage at the venue (no prints)</span>
                  </li>
                </ul>
              </div>

              {/* Note */}
              <div className="text-sm text-muted-foreground">
                <p>📍 Transportation fee applies for venues outside the city.</p>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <Button size="lg" className="w-full">Book Silver Package</Button>
              </div>
            </CardContent>
          </Card>

          {/* Gallery Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Silver Package Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-square bg-muted rounded-lg overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/photo-1519167758481-83f29da8c9b9?w=400&h=400&fit=crop`} 
                    alt={`Silver Package ${i}`}
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

export default SilverPackage;
