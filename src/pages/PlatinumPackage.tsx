import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useState } from "react";

const PackageGalleryCard = ({ packageNumber }: { packageNumber: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  const galleryImages = [
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=600&fit=crop",
  ];

  const celebrants = [
    { name: "Alexander & Victoria", event: "Grand Wedding" },
    { name: "The Hernandez Dynasty", event: "Diamond Anniversary" },
    { name: "Sophia Isabelle", event: "Debut" },
    { name: "Marcus & Gabriella", event: "Luxury Wedding" },
    { name: "The Domingo Estate", event: "Gala Event" },
    { name: "Rafael & Angelica", event: "Royal Wedding" },
  ];

  const celebrant = celebrants[packageNumber - 1];

  return (
    <>
      <div className="group">
        <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-background to-accent/5">
          <div className="relative aspect-square overflow-hidden">
            <img
              src={galleryImages[0]}
              alt={`${celebrant.name} - ${celebrant.event}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            
            <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm text-primary-foreground px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg">
              {celebrant.event}
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 text-white">
              <h3 className="text-base sm:text-xl font-bold mb-1 drop-shadow-lg">{celebrant.name}</h3>
              <p className="text-xs sm:text-sm text-white/80 font-light">Platinum Package Experience</p>
            </div>
          </div>
          
          <CardContent className="p-3 sm:p-5">
            <Button 
              onClick={() => setIsOpen(true)}
              size="sm"
              className="w-full bg-gradient-to-r from-primary via-primary to-primary/90 hover:from-primary/90 hover:via-primary/80 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-xs sm:text-sm h-8 sm:h-9"
            >
              View Details
            </Button>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl md:text-3xl font-heading font-bold">Platinum Package - {celebrant.name}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <Carousel className="w-full">
              <CarouselContent>
                {galleryImages.map((img, idx) => (
                  <CarouselItem key={idx}>
                    <div className="relative aspect-video overflow-hidden rounded-xl">
                      <img
                        src={img}
                        alt={`Platinum Package ${packageNumber} - Photo ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 sm:p-6 rounded-xl">
                <p className="text-2xl sm:text-3xl font-bold text-primary mb-2">₱199,000</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Luxury All-in Wedding Experience</p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-base sm:text-lg">Package Inclusions:</h4>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span>3 main courses, rice, drinks, dessert + FREE lechon</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span>Luxury church & venue styling with chandelier</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span>Wedding + prenup photography (USB)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span>3-tier cake, sound system, lively host</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span>HMUA for bride, groom, entourage, and family</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span>FREE venue with hotel room & bridal car</span>
                  </li>
                </ul>
              </div>

              <div className="bg-accent/30 p-3 sm:p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-sm sm:text-base">🎁 Choose 1 Premium Freebie:</h4>
                <ul className="text-xs sm:text-sm space-y-1">
                  <li>A) LED Wall + SDE video at reception</li>
                  <li>B) Wedding attire rental + fresh bouquets</li>
                </ul>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const PlatinumPackage = () => {
  const location = useLocation();
  
  const packages = [
    { name: "🥈 Silver Package", path: "/packages/silver" },
    { name: "🥇 Gold Package", path: "/packages/gold" },
    { name: "💎 Platinum Package", path: "/packages/platinum" },
  ];

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
                <Button size="lg" className="w-full text-sm sm:text-base h-10 sm:h-11">Book Platinum Package</Button>
              </div>
            </CardContent>
          </Card>

          {/* Gallery Section */}
          <div className="mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-12 text-center font-heading">Platinum Package Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <PackageGalleryCard key={i} packageNumber={i} />
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
