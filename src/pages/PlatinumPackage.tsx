import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const PlatinumPackage = () => {
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
            <h1 className="text-4xl font-bold mb-2">💎 Platinum Package</h1>
            <p className="text-xl text-muted-foreground">All-in GOLD Wedding</p>
            <p className="text-sm text-muted-foreground mt-2">Promo Code: #100D</p>
          </div>

          {/* Package Details Card */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-3xl">₱199,000</CardTitle>
              <CardDescription>Luxury All-in Wedding Experience</CardDescription>
              <p className="text-sm mt-2">A premium package designed for a grand, stress-free wedding — complete with styling, catering, photography, venue, and more.</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Catering Setup */}
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  🍽️ Catering & Setup
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>3 main courses, rice, cold soft drinks, dessert</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Elegant table setup with utensils, tables, chairs, and centerpieces</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>FREE 1 whole small lechon (approx. 18kg)</span>
                  </li>
                </ul>
              </div>

              {/* Luxury Décor */}
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  🎀 Luxury Décor & Styling
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Church & venue styling: backdrop, ceiling works, chandelier, red carpet, flower stands, entrance arch</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Artificial elegant flowers with accents of fresh flowers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Royal centerpieces and entrance tunnel</span>
                  </li>
                </ul>
              </div>

              {/* Church Weddings */}
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  ✝️ For Church Weddings:
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Basic church décor (10 fresh flower stands, 2 altar flower arrangements)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Free offertory items: fruits, candles, and wine</span>
                  </li>
                </ul>
              </div>

              {/* Photography */}
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  📸 Photography & Media
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Free wedding day photography + prenup photo session (saved on USB)</span>
                  </li>
                </ul>
              </div>

              {/* Reception */}
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  🍰 Reception & Entertainment
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Couple's couch at reception</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Basic sound system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Lively host with program flow</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>3-tier wedding cake with wine in an elegant setup corner</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Fruit buffet corner & pica-pica corner</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>High-end stage lighting effects</span>
                  </li>
                </ul>
              </div>

              {/* HMUA */}
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  💇‍♀️ HMUA Services
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Bride & groom (prenup + wedding)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>3 bridesmaids</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>1 maid of honor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>2 mothers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>3 flower girls</span>
                  </li>
                </ul>
              </div>

              {/* VIP Extras */}
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  🏨 VIP Extras
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>FREE reception venue with hotel room for couple (8 AM – 5 PM prep)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>FREE 50 invitations and 50 giveaways</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>FREE bridal car with fresh flower bouquet (if church wedding)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>FREE prenup transportation within Negros Oriental (half day)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>On-the-day assistance and coordination</span>
                  </li>
                </ul>
              </div>

              {/* Premium Freebie */}
              <div className="bg-accent/50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  🎁 Choose 1 Premium Freebie:
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="font-semibold">A)</span>
                    <span>LED Wall + SDE video at reception (final on wedding day)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold">B)</span>
                    <span>Wedding attire rental package (2nd user, basic set) + fresh bouquets & corsages</span>
                  </li>
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <Button size="lg" className="w-full">Book Platinum Package</Button>
              </div>
            </CardContent>
          </Card>

          {/* Gallery Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Platinum Package Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-square bg-muted rounded-lg overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop`} 
                    alt={`Platinum Package ${i}`}
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

export default PlatinumPackage;
