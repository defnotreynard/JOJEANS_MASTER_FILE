import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useState } from "react";

const PackageGalleryCard = ({ packageNumber }: { packageNumber: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  const galleryImages = [
    "https://images.unsplash.com/photo-1519167758481-83f29da8c9b9?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop",
  ];

  // Sample celebrant data - you can replace this with real data
  const celebrants = [
    { name: "Maria & Juan Santos", event: "Wedding" },
    { name: "Isabella Cruz", event: "Birthday" },
    { name: "The Reyes Family", event: "Anniversary" },
    { name: "Sofia & Miguel", event: "Engagement" },
    { name: "Elena Rodriguez", event: "Debut" },
    { name: "The Garcia Family", event: "Reunion" },
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
            
            {/* Event Type Badge */}
            <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm text-primary-foreground px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg">
              {celebrant.event}
            </div>
            
            {/* Celebrant Name Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 text-white">
              <h3 className="text-base sm:text-xl font-bold mb-1 drop-shadow-lg">{celebrant.name}</h3>
              <p className="text-xs sm:text-sm text-white/80 font-light">Silver Package Experience</p>
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
            <DialogTitle className="text-xl sm:text-2xl md:text-3xl font-heading font-bold">Silver Package {packageNumber}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Carousel */}
            <Carousel className="w-full">
              <CarouselContent>
                {galleryImages.map((img, idx) => (
                  <CarouselItem key={idx}>
                    <div className="relative aspect-video overflow-hidden rounded-xl">
                      <img
                        src={img}
                        alt={`Silver Package ${packageNumber} - Photo ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>

            {/* Package Details */}
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 sm:p-6 rounded-xl">
                <p className="text-2xl sm:text-3xl font-bold text-primary mb-2">₱69,000</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Catering & Décor Only</p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-base sm:text-lg">Package Inclusions:</h4>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span>3 menu choices with rice, soft drinks, and fruit salad</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span>Complete catering setup with utensils, tables, and chairs with covers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span>Minimalist décor setup with backdrop and centerpieces</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span>VIP table setup & artificial flower arrangements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span>Basic program flow at the venue</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <span>Free basic bridal bouquet</span>
                  </li>
                </ul>
              </div>

              <div className="bg-accent/30 p-3 sm:p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-sm sm:text-base">🎁 Choose 1 Freebie:</h4>
                <ul className="text-xs sm:text-sm space-y-1">
                  <li>A) 2-layer basic wedding cake with wine</li>
                  <li>B) HMUA for bride and groom</li>
                  <li>C) Basic photo coverage at venue</li>
                </ul>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const SilverPackage = () => {
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
                <Button size="lg" className="w-full text-sm sm:text-base h-10 sm:h-11">Book Silver Package</Button>
              </div>
            </CardContent>
          </Card>

          {/* Gallery Section */}
          <div className="mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-12 text-center font-heading">Silver Package Gallery</h2>
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

export default SilverPackage;
