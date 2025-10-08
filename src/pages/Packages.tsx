import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { CheckCircle, Heart, Sparkles, Gift, Camera, Music, Car, Utensils, Church, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import packageNav from '@/assets/package-nav.png';

const Packages = () => {
  useEffect(() => {
    // Smooth scroll to section if hash is present
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-hero text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl lg:text-7xl font-heading font-bold mb-6">
                💍 Jojeans 2025
                <span className="block bg-gradient-to-r from-wedding-gold to-wedding-cream bg-clip-text text-transparent">
                  Wedding Packages
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
                ✨ Celebrate your love story with stress-free, beautifully curated wedding packages — from simple and elegant to grand and luxurious. Choose the package that fits your dream wedding!
              </p>
            </div>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="py-8 bg-accent/50 sticky top-16 z-40 backdrop-blur-sm border-b">
          <div className="container mx-auto px-4">
            <div className="flex justify-center gap-4 flex-wrap">
              <a href="#silver">
                <Button variant="outline" size="sm">🥈 Silver Package</Button>
              </a>
              <a href="#gold">
                <Button variant="outline" size="sm">🥇 Gold Package</Button>
              </a>
              <a href="#platinum">
                <Button variant="outline" size="sm">💎 Platinum Package</Button>
              </a>
            </div>
          </div>
        </section>

        {/* Silver Package */}
        <section id="silver" className="py-20 scroll-mt-32">
          <div className="container mx-auto px-4">
            <Card className="max-w-5xl mx-auto overflow-hidden">
              <div className="bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 p-8 text-center">
                <Badge className="mb-4 text-lg px-4 py-2">Promo Code: #50A</Badge>
                <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-4">
                  🥈 Silver Package
                </h2>
                <p className="text-2xl font-semibold mb-2">Minimalist Wedding</p>
                <div className="text-5xl font-bold text-primary mb-2">₱69,000</div>
                <p className="text-muted-foreground">Catering & Décor Only</p>
              </div>
              
              <CardContent className="p-8">
                <p className="text-lg text-center mb-8 text-muted-foreground">
                  Perfect for couples who want a simple, intimate, and budget-friendly celebration.
                </p>

                {/* Package Gallery Section */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 justify-center">
                    <ImageIcon className="h-5 w-5 text-primary" />
                    Package Gallery
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="aspect-video bg-accent rounded-lg flex items-center justify-center">
                      <span className="text-muted-foreground text-sm">Silver Package Photo 1</span>
                    </div>
                    <div className="aspect-video bg-accent rounded-lg flex items-center justify-center">
                      <span className="text-muted-foreground text-sm">Silver Package Photo 2</span>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <img src={packageNav} alt="Package Navigation" className="h-12 object-contain" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Utensils className="h-5 w-5 text-primary" />
                      Catering Setup
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>3 menu choices with rice, soft drinks, and fruit salad</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Complete catering setup with utensils, tables, and chairs with covers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Buffet corner with skirting and chafing dishes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>2 servers at the buffet area</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      Venue Styling & Décor
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Minimalist décor setup with backdrop and centerpieces</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>VIP table setup</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Artificial flower arrangements and grass mat</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Basic program flow at the venue</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-accent/30 p-6 rounded-lg mb-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Gift className="h-5 w-5 text-primary" />
                    Bonus Inclusions
                  </h3>
                  <ul className="space-y-3 mb-4">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Free basic bridal bouquet</span>
                    </li>
                  </ul>
                  
                  <div className="border-t pt-4 mt-4">
                    <p className="font-semibold mb-3">🎁 Choose 1 Freebie:</p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="font-semibold text-primary">A)</span>
                        <span>2-layer basic wedding cake with wine</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-semibold text-primary">B)</span>
                        <span>HMUA (Hair & Makeup Artist) for bride and groom</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-semibold text-primary">C)</span>
                        <span>Basic photo coverage at the venue (no prints)</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground text-center">
                  📍 Transportation fee applies for venues outside the city.
                </div>

                <div className="mt-8 text-center">
                  <Button size="lg" className="w-full md:w-auto">
                    Book Silver Package
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Gold Package */}
        <section id="gold" className="py-20 bg-gradient-elegant scroll-mt-32">
          <div className="container mx-auto px-4">
            <Card className="max-w-5xl mx-auto overflow-hidden border-2 border-primary shadow-elegant">
              <div className="bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900 dark:to-yellow-900 p-8 text-center relative">
                <Badge className="mb-4 text-lg px-4 py-2 bg-primary">Most Popular</Badge>
                <Badge className="mb-4 text-lg px-4 py-2 ml-2">Promo Code: #100A</Badge>
                <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-4">
                  🥇 Gold Package
                </h2>
                <p className="text-2xl font-semibold mb-2">Classic Wedding</p>
                <div className="text-5xl font-bold text-primary mb-2">₱95,000</div>
                <p className="text-muted-foreground">Complete Wedding Essentials</p>
              </div>
              
              <CardContent className="p-8">
                <p className="text-lg text-center mb-8 text-muted-foreground">
                  An all-in-one classic wedding package with more inclusions and freebies for a memorable celebration.
                </p>

                {/* Package Gallery Section */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 justify-center">
                    <ImageIcon className="h-5 w-5 text-primary" />
                    Package Gallery
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="aspect-video bg-accent rounded-lg flex items-center justify-center">
                      <span className="text-muted-foreground text-sm">Gold Package Photo 1</span>
                    </div>
                    <div className="aspect-video bg-accent rounded-lg flex items-center justify-center">
                      <span className="text-muted-foreground text-sm">Gold Package Photo 2</span>
                    </div>
                    <div className="aspect-video bg-accent rounded-lg flex items-center justify-center">
                      <span className="text-muted-foreground text-sm">Gold Package Photo 3</span>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <img src={packageNav} alt="Package Navigation" className="h-12 object-contain" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Utensils className="h-5 w-5 text-primary" />
                      Catering Setup
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>3 menu choices with rice, soft drinks, and fruit salad</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Complete catering setup (tables, chairs with covers, utensils)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Buffet corner with chafing dishes</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      Venue Styling & Décor
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Backdrop styling based on your motif</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Artificial flowers, couch, grass mat</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Entrance arch, basic table centerpieces, and droplights</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span>(No ceiling design included)</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-accent/30 p-6 rounded-lg mb-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Gift className="h-5 w-5 text-primary" />
                    Choose 1 Major Freebie
                  </h3>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start gap-2">
                      <span className="font-semibold text-primary">A)</span>
                      <span>2-tier soft-icing wedding cake with wine</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-semibold text-primary">B)</span>
                      <span>Basic sound system & lights with emcee at reception</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-semibold text-primary">C)</span>
                      <span>HMUA for bride and groom</span>
                    </li>
                  </ul>

                  <div className="border-t pt-4 mt-4">
                    <p className="font-semibold mb-3">📸 Additional Freebies for All:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Reception program flow</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Buffet servers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Fresh round bridal bouquet</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>30 pcs basic invitations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>30 pcs giveaways (keyholder bottle opener)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Basic wedding day photo coverage (no prints, saved in Google Drive)</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground text-center mb-6">
                  📍 No coordination included in church & venue. Transportation fee may apply outside city limits.
                </div>

                <div className="text-center">
                  <Button size="lg" className="w-full md:w-auto">
                    Book Gold Package
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Platinum Package */}
        <section id="platinum" className="py-20 scroll-mt-32">
          <div className="container mx-auto px-4">
            <Card className="max-w-5xl mx-auto overflow-hidden border-2 border-primary">
              <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 dark:from-purple-900 dark:via-pink-900 dark:to-blue-900 p-8 text-center">
                <Badge className="mb-4 text-lg px-4 py-2">Promo Code: #100D</Badge>
                <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-4">
                  💎 Platinum Package
                </h2>
                <p className="text-2xl font-semibold mb-2">All-in GOLD Wedding</p>
                <div className="text-5xl font-bold text-primary mb-2">₱199,000</div>
                <p className="text-muted-foreground">Luxury All-in Wedding Experience</p>
              </div>
              
              <CardContent className="p-8">
                <p className="text-lg text-center mb-8 text-muted-foreground">
                  A premium package designed for a grand, stress-free wedding — complete with styling, catering, photography, venue, and more.
                </p>

                {/* Package Gallery Section */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 justify-center">
                    <ImageIcon className="h-5 w-5 text-primary" />
                    Package Gallery
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="aspect-video bg-accent rounded-lg flex items-center justify-center">
                      <span className="text-muted-foreground text-sm">Platinum Package Photo 1</span>
                    </div>
                    <div className="aspect-video bg-accent rounded-lg flex items-center justify-center">
                      <span className="text-muted-foreground text-sm">Platinum Package Photo 2</span>
                    </div>
                    <div className="aspect-video bg-accent rounded-lg flex items-center justify-center">
                      <span className="text-muted-foreground text-sm">Platinum Package Photo 3</span>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <img src={packageNav} alt="Package Navigation" className="h-12 object-contain" />
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Catering & Setup */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Utensils className="h-5 w-5 text-primary" />
                      Catering & Setup
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>3 main courses, rice, cold soft drinks, dessert</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Elegant table setup with utensils, tables, chairs, and centerpieces</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="font-semibold">FREE 1 whole small lechon (approx. 18kg)</span>
                      </li>
                    </ul>
                  </div>

                  {/* Luxury Décor */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      Luxury Décor & Styling
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Church & venue styling: backdrop, ceiling works, chandelier, red carpet, flower stands, entrance arch</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Artificial elegant flowers with accents of fresh flowers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Royal centerpieces and entrance tunnel</span>
                      </li>
                    </ul>
                  </div>

                  {/* Church Weddings */}
                  <div className="bg-accent/30 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Church className="h-5 w-5 text-primary" />
                      For Church Weddings
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Basic church décor (10 fresh flower stands, 2 altar flower arrangements)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Free offertory items: fruits, candles, and wine</span>
                      </li>
                    </ul>
                  </div>

                  {/* Photography & Media */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Camera className="h-5 w-5 text-primary" />
                      Photography & Media
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Free wedding day photography + prenup photo session (saved on USB)</span>
                      </li>
                    </ul>
                  </div>

                  {/* Reception & Entertainment */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Music className="h-5 w-5 text-primary" />
                      Reception & Entertainment
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Couple's couch at reception</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Basic sound system</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Lively host with program flow</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>3-tier wedding cake with wine in an elegant setup corner</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Fruit buffet corner & pica-pica corner</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>High-end stage lighting effects</span>
                      </li>
                    </ul>
                  </div>

                  {/* HMUA Services */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      HMUA Services
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Bride & groom (prenup + wedding)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>3 bridesmaids</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>1 maid of honor</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>2 mothers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>3 flower girls</span>
                      </li>
                    </ul>
                  </div>

                  {/* VIP Extras */}
                  <div className="bg-primary/10 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Heart className="h-5 w-5 text-primary" />
                      VIP Extras
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="font-semibold">FREE reception venue with hotel room for couple (8 AM – 5 PM prep)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>FREE 50 invitations and 50 giveaways</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>FREE bridal car with fresh flower bouquet (if church wedding)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>FREE prenup transportation within Negros Oriental (half day)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>On-the-day assistance and coordination</span>
                      </li>
                    </ul>
                  </div>

                  {/* Premium Freebie Choice */}
                  <div className="bg-accent/30 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Gift className="h-5 w-5 text-primary" />
                      Choose 1 Premium Freebie
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <span className="font-semibold text-primary">A)</span>
                        <span>LED Wall + SDE video at reception (final on wedding day)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-semibold text-primary">B)</span>
                        <span>Wedding attire rental package (2nd user, basic set) + fresh bouquets & corsages</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <Button size="lg" className="w-full md:w-auto">
                    Book Platinum Package
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-hero text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
              Ready to Plan Your Dream Wedding?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let's discuss your vision and create an unforgettable celebration together. Contact us for a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                Schedule Consultation
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Contact Us
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Packages;