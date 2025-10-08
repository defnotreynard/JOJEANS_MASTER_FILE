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
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop",
  ];

  const celebrants = [
    { name: "Carlos & Ana Martinez", event: "Wedding" },
    { name: "The Lim Family", event: "Golden Anniversary" },
    { name: "Patricia Santos", event: "Birthday" },
    { name: "Diego & Carmen", event: "Engagement" },
    { name: "The Reyes Clan", event: "Family Reunion" },
    { name: "Roberto & Lucia", event: "Vow Renewal" },
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
            
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-xl font-bold mb-1 drop-shadow-lg">{celebrant.name}</h3>
              <p className="text-sm text-white/80 font-light">Gold Package Experience</p>
            </div>
          </div>
          
          <CardContent className="p-5">
            <Button 
              onClick={() => setIsOpen(true)}
              size="sm"
              className="w-full bg-gradient-to-r from-primary via-primary to-primary/90 hover:from-primary/90 hover:via-primary/80 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
            >
              View Details
            </Button>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-heading font-bold">Gold Package - {celebrant.name}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <Carousel className="w-full">
              <CarouselContent>
                {galleryImages.map((img, idx) => (
                  <CarouselItem key={idx}>
                    <div className="relative aspect-video overflow-hidden rounded-xl">
                      <img
                        src={img}
                        alt={`Gold Package ${packageNumber} - Photo ${idx + 1}`}
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
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-xl">
                <p className="text-3xl font-bold text-primary mb-2">₱95,000</p>
                <p className="text-sm text-muted-foreground">Complete Wedding Essentials</p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-lg">Package Inclusions:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span>3 menu choices with rice, soft drinks, and fruit salad</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span>Complete catering setup with buffet corner</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span>Backdrop styling based on your motif</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span>Entrance arch, centerpieces, and droplights</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span>Fresh round bridal bouquet & basic invitations</span>
                  </li>
                </ul>
              </div>

              <div className="bg-accent/30 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">🎁 Choose 1 Major Freebie:</h4>
                <ul className="text-sm space-y-1">
                  <li>A) 2-tier wedding cake with wine</li>
                  <li>B) Sound system & lights with emcee</li>
                  <li>C) HMUA for bride and groom</li>
                </ul>
              </div>

              <Button size="lg" className="w-full mt-4">Book Now</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

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
            <h2 className="text-4xl font-bold mb-12 text-center font-heading">Gold Package Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

export default GoldPackage;
