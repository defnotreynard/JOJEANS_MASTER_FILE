import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Utensils, Lightbulb, Music, Cake, Mail, Users, Flower, Car, Building, Monitor, ArrowRight, Heart, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import coordinationImg from '@/assets/service-coordination.jpg';
import stylingImg from '@/assets/service-styling.jpg';
import cateringImg from '@/assets/service-catering.jpg';
import photoVideoImg from '@/assets/service-photo-video.jpg';
import soundsLightsImg from '@/assets/service-sounds-lights.jpg';
import cakesImg from '@/assets/service-cakes.jpg';
import invitationsImg from '@/assets/service-invitations.jpg';
import hmuaImg from '@/assets/service-hmua.jpg';
import attiresImg from '@/assets/service-attires.jpg';
import bridalCarImg from '@/assets/service-bridal-car.jpg';
import ceilingImg from '@/assets/service-ceiling.jpg';
import ledWallImg from '@/assets/service-led-wall.jpg';
import entranceImg from '@/assets/service-entrance.jpg';
import danceFloorImg from '@/assets/service-dance-floor.jpg';

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<any>(null);

  const services = [
    {
      id: 'coordination',
      category: 'Coordination',
      title: 'Event Coordination',
      businessName: 'Elite Events Coordination',
      vendorName: 'Maria Santos',
      icon: Users,
      description: 'Professional event coordination to ensure every detail runs smoothly from start to finish.',
      fullDescription: 'Our experienced coordinators work with you from planning through execution, ensuring seamless management of all vendors, timelines, and event details. We handle the logistics so you can enjoy your special day.',
      features: ['Timeline Management', 'Vendor Coordination', 'Day-of Assistance', 'Problem Solving', 'Guest Management', 'Emergency Backup Plans'],
      images: [coordinationImg, coordinationImg, coordinationImg, coordinationImg, coordinationImg],
      thumbnail: coordinationImg,
      contact: {
        phone: '+63 917 123 4567',
        email: 'elite@events.com',
        facebook: 'EliteEventsCoordination',
        instagram: '@eliteeventsph'
      }
    },
    {
      id: 'styling-decors',
      category: 'Styling and Decors',
      title: 'Styling & Decor Design',
      businessName: 'Elegant Touch Designs',
      vendorName: 'Anna Reyes',
      icon: Flower,
      description: 'Transform your venue with stunning decorations and styling that match your vision.',
      fullDescription: 'Our design team creates breathtaking atmospheres with custom floral arrangements, elegant table settings, and complete venue transformations that reflect your unique style and personality.',
      features: ['Theme Development', 'Floral Arrangements', 'Table Settings', 'Venue Transformation', 'Color Coordination', 'Custom Centerpieces'],
      images: [stylingImg, stylingImg, stylingImg, stylingImg, stylingImg, stylingImg],
      thumbnail: stylingImg,
      contact: {
        phone: '+63 917 234 5678',
        email: 'anna@eleganttouch.com',
        facebook: 'ElegantTouchDesigns',
        instagram: '@eleganttouchph'
      }
    },
    {
      id: 'catering',
      category: 'Catering Services',
      title: 'Premium Catering',
      businessName: 'Gourmet Delights Catering',
      vendorName: 'Chef Roberto Cruz',
      icon: Utensils,
      description: 'Exquisite cuisine and professional service to delight your guests.',
      fullDescription: 'Experience culinary excellence with our custom menus crafted by award-winning chefs. We offer diverse cuisine options with professional service staff to create an unforgettable dining experience.',
      features: ['Custom Menus', 'Professional Staff', 'Buffet & Plated Options', 'Dietary Accommodations', 'Wine Pairing', 'Dessert Stations'],
      images: [cateringImg, cateringImg, cateringImg, cateringImg],
      thumbnail: cateringImg,
      contact: {
        phone: '+63 917 345 6789',
        email: 'chef@gourmetdelights.com',
        facebook: 'GourmetDelightsCatering',
        instagram: '@gourmetdelightsph'
      }
    },
    {
      id: 'photo-video',
      category: 'Photo and Video',
      title: 'Photography & Videography',
      businessName: 'Moments Photography Studio',
      vendorName: 'John Mendoza',
      icon: Camera,
      description: 'Capture every precious moment with professional photography and videography.',
      fullDescription: 'Our creative team uses state-of-the-art equipment to document your celebration in stunning detail. From candid moments to artistic portraits, we preserve your memories beautifully.',
      features: ['Full-Day Coverage', 'Highlight Reels', 'Digital Albums', 'Drone Photography', 'Same-Day Edit', 'Online Gallery'],
      images: [photoVideoImg, photoVideoImg, photoVideoImg, photoVideoImg, photoVideoImg],
      thumbnail: photoVideoImg,
      contact: {
        phone: '+63 917 456 7890',
        email: 'john@momentsstudio.com',
        facebook: 'MomentsPhotoStudio',
        instagram: '@momentsstudioph'
      }
    },
    {
      id: 'sounds-lights',
      category: 'Sounds and Lights',
      title: 'Audio Visual Production',
      businessName: 'SoundWave Productions',
      vendorName: 'DJ Mike Torres',
      icon: Music,
      description: 'Professional audio-visual setup to create the perfect ambiance.',
      fullDescription: 'Transform your event with premium sound systems, dynamic lighting designs, and professional technical support. We create immersive experiences that enhance every moment.',
      features: ['Sound Systems', 'Stage Lighting', 'Ambient Lighting', 'Technical Support', 'DJ Services', 'Live Band Setup'],
      images: [soundsLightsImg, soundsLightsImg, soundsLightsImg, soundsLightsImg],
      thumbnail: soundsLightsImg,
      contact: {
        phone: '+63 917 567 8901',
        email: 'mike@soundwave.com',
        facebook: 'SoundWaveProductions',
        instagram: '@soundwaveph'
      }
    },
    {
      id: 'cakes-pica',
      category: 'Cakes / Pica-pica',
      title: 'Cakes & Appetizers',
      businessName: 'Sweet Dreams Bakery',
      vendorName: 'Sarah Dela Cruz',
      icon: Cake,
      description: 'Delicious custom cakes and appetizers for your celebration.',
      fullDescription: 'Indulge in artisan cakes and gourmet appetizers crafted by our talented pastry chefs and culinary team. Every bite is a celebration of flavor and artistry.',
      features: ['Custom Cake Design', 'Finger Foods', 'Dessert Tables', 'Themed Treats', 'Tasting Sessions', 'Dietary Options'],
      images: [cakesImg, cakesImg, cakesImg, cakesImg, cakesImg],
      thumbnail: cakesImg,
      contact: {
        phone: '+63 917 678 9012',
        email: 'sarah@sweetdreams.com',
        facebook: 'SweetDreamsBakery',
        instagram: '@sweetdreamsph'
      }
    },
    {
      id: 'invitation-giveaways',
      category: 'Invitation / Giveaways',
      title: 'Invitations & Favors',
      businessName: 'Paper & Ink Designs',
      vendorName: 'Lisa Garcia',
      icon: Mail,
      description: 'Beautiful invitations and memorable giveaways for your guests.',
      fullDescription: 'Make a lasting impression with custom-designed invitations and thoughtful giveaways. Our creative team brings your vision to life with elegant designs and quality materials.',
      features: ['Custom Designs', 'Digital Invites', 'Wedding Favors', 'Personalized Gifts', 'Save the Dates', 'Thank You Cards'],
      images: [invitationsImg, invitationsImg, invitationsImg, invitationsImg],
      thumbnail: invitationsImg,
      contact: {
        phone: '+63 917 789 0123',
        email: 'lisa@paperink.com',
        facebook: 'PaperInkDesigns',
        instagram: '@paperinkph'
      }
    },
    {
      id: 'hmua-host',
      category: 'HMUA / Host',
      title: 'Beauty & Hosting',
      businessName: 'Glamour Beauty Studio',
      vendorName: 'Patricia Lim',
      icon: Heart,
      description: 'Professional hair, makeup, and hosting services for your special day.',
      fullDescription: 'Look and feel your absolute best with our expert beauty team, complemented by professional hosts who ensure smooth program flow and engaging guest experiences.',
      features: ['Bridal Makeup', 'Hairstyling', 'Professional Hosts', 'Touch-up Services', 'Trial Sessions', 'Entourage Services'],
      images: [hmuaImg, hmuaImg, hmuaImg, hmuaImg, hmuaImg],
      thumbnail: hmuaImg,
      contact: {
        phone: '+63 917 890 1234',
        email: 'patricia@glamour.com',
        facebook: 'GlamourBeautyStudio',
        instagram: '@glamourstudioph'
      }
    },
    {
      id: 'attires-bouquets',
      category: 'Attires / Bouquets',
      title: 'Attire & Florals',
      businessName: 'Bridal Couture & Blooms',
      vendorName: 'Sophia Tan',
      icon: Flower,
      description: 'Elegant wedding attire and stunning floral arrangements.',
      fullDescription: 'Discover exquisite wedding attire and breathtaking bouquets curated by our expert stylists and floral designers to make you look and feel stunning.',
      features: ['Bridal Gowns', 'Groom Suits', 'Bridal Bouquets', 'Entourage Attire', 'Accessories', 'Boutonnières'],
      images: [attiresImg, attiresImg, attiresImg, attiresImg],
      thumbnail: attiresImg,
      contact: {
        phone: '+63 917 901 2345',
        email: 'sophia@bridalcouture.com',
        facebook: 'BridalCoutureBlooms',
        instagram: '@bridalcoutureph'
      }
    },
    {
      id: 'bridal-car',
      category: 'Bridal Car',
      title: 'Luxury Transportation',
      businessName: 'Premier Luxury Cars',
      vendorName: 'Carlos Ramos',
      icon: Car,
      description: 'Luxury transportation for the bride, groom, and wedding party.',
      fullDescription: 'Arrive in style with our fleet of luxury vehicles, complete with professional chauffeurs and elegant decorations to make your entrance unforgettable.',
      features: ['Luxury Vehicles', 'Professional Drivers', 'Decorated Cars', 'Airport Transfers', 'Multiple Vehicle Packages', 'Red Carpet Service'],
      images: [bridalCarImg, bridalCarImg, bridalCarImg, bridalCarImg],
      thumbnail: bridalCarImg,
      contact: {
        phone: '+63 917 012 3456',
        email: 'carlos@premierluxury.com',
        facebook: 'PremierLuxuryCars',
        instagram: '@premierluxuryph'
      }
    },
    {
      id: 'ceiling-works',
      category: 'Ceiling Works',
      title: 'Ceiling Installations',
      businessName: 'Sky High Decor',
      vendorName: 'Mark Valencia',
      icon: Building,
      description: 'Dramatic ceiling installations and drapery to elevate your venue.',
      fullDescription: 'Transform ordinary spaces into extraordinary venues with our custom ceiling treatments, elegant drapery, and integrated lighting designs.',
      features: ['Fabric Draping', 'Ceiling Decor', 'Lighting Integration', 'Custom Designs', 'Floral Installations', 'Chandelier Rentals'],
      images: [ceilingImg, ceilingImg, ceilingImg, ceilingImg],
      thumbnail: ceilingImg,
      contact: {
        phone: '+63 917 123 4567',
        email: 'mark@skyhigh.com',
        facebook: 'SkyHighDecor',
        instagram: '@skyhighdecorph'
      }
    },
    {
      id: 'led-wall',
      category: 'LED Wall',
      title: 'LED Display Solutions',
      businessName: 'Digital Vision Solutions',
      vendorName: 'Ramon Santos',
      icon: Monitor,
      description: 'High-quality LED displays for presentations and entertainment.',
      fullDescription: 'Create stunning visual experiences with our premium LED wall solutions, perfect for displaying photos, videos, and live event coverage in crystal-clear quality.',
      features: ['Large Format Displays', 'Custom Content', 'Technical Support', 'Indoor/Outdoor Options', 'Live Streaming', 'Interactive Displays'],
      images: [ledWallImg, ledWallImg, ledWallImg, ledWallImg],
      thumbnail: ledWallImg,
      contact: {
        phone: '+63 917 234 5678',
        email: 'ramon@digitalvision.com',
        facebook: 'DigitalVisionSolutions',
        instagram: '@digitalvisionph'
      }
    },
    {
      id: 'entrance-tunnel',
      category: 'Entrance Tunnel',
      title: 'Grand Entrance Designs',
      businessName: 'Grand Entrances PH',
      vendorName: 'Elena Rodriguez',
      icon: ArrowRight,
      description: 'Grand entrance tunnels to make a memorable first impression.',
      fullDescription: 'Make a show-stopping entrance with our custom-designed tunnels featuring dramatic lighting, lush florals, and elegant architectural elements.',
      features: ['Custom Designs', 'Lighting Effects', 'Floral Accents', 'Photo Opportunities', 'Multiple Styles', 'Weather Protection'],
      images: [entranceImg, entranceImg, entranceImg, entranceImg],
      thumbnail: entranceImg,
      contact: {
        phone: '+63 917 345 6789',
        email: 'elena@grandentrances.com',
        facebook: 'GrandEntrancesPH',
        instagram: '@grandentrancesph'
      }
    },
    {
      id: 'glass-dance-floor',
      category: 'Glass Dance Floor',
      title: 'Illuminated Dance Floors',
      businessName: 'Dance Floor Magic',
      vendorName: 'James Aquino',
      icon: Lightbulb,
      description: 'Stunning illuminated glass dance floors for an unforgettable experience.',
      fullDescription: 'Dance the night away on our spectacular LED-lit glass floors. Safe, stunning, and customizable to match your event theme and colors.',
      features: ['LED Lighting', 'Custom Patterns', 'Safe & Sturdy', 'Multiple Sizes', 'Color Programming', 'Professional Installation'],
      images: [danceFloorImg, danceFloorImg, danceFloorImg, danceFloorImg],
      thumbnail: danceFloorImg,
      contact: {
        phone: '+63 917 456 7890',
        email: 'james@dancefloormagic.com',
        facebook: 'DanceFloorMagic',
        instagram: '@dancefloormagicph'
      }
    }
  ];

  const categories = ['all', ...Array.from(new Set(services.map(s => s.category)))];
  
  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(s => s.category === selectedCategory);

  return (
    <div className="min-h-screen bg-wedding-cream">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-6 md:py-7 px-4 bg-gradient-elegant">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-wedding-charcoal">
            Our Services
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comprehensive event services to bring your dream celebration to life. From coordination to execution, we handle every detail with care and professionalism.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-2 overflow-x-auto">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="inline-flex h-auto gap-2 bg-transparent p-0 w-full justify-start md:justify-center flex-wrap">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="px-4 py-1 rounded-full border border-border bg-background data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary shadow-sm hover:shadow-md transition-all duration-300 text-sm font-medium whitespace-nowrap"
                >
                  {category === 'all' ? 'All Services' : category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-6 md:py-10 px-4">
        <div className="container mx-auto">
          <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredServices.map((service) => {
              const Icon = service.icon;
              return (
                <Card 
                  key={service.id} 
                  className="group overflow-hidden rounded-xl shadow-card hover:shadow-elegant transition-all duration-500 hover:-translate-y-1 bg-background border-border cursor-pointer"
                  onClick={() => setSelectedService(service)}
                >
                  {/* Image Section */}
                  <div className="relative h-48 md:h-56 overflow-hidden bg-gradient-to-br from-wedding-cream to-wedding-sage">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
                    {service.thumbnail && (
                      <img 
                        src={service.thumbnail} 
                        alt={service.businessName}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    )}
                    {!service.thumbnail && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon className="h-20 w-20 text-white/30 group-hover:scale-110 transition-transform duration-500" />
                      </div>
                    )}
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-wedding-charcoal uppercase tracking-wider">
                        {service.category}
                      </span>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="mb-3">
                      <h3 className="font-heading text-xl font-bold mb-1 text-wedding-charcoal group-hover:text-primary transition-colors">
                        {service.businessName}
                      </h3>
                      <p className="text-xs text-muted-foreground font-medium">
                        by {service.vendorName}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full rounded-lg border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300 group-hover:border-primary"
                    >
                      View Portfolio
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      <Dialog open={!!selectedService} onOpenChange={(open) => !open && setSelectedService(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedService && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-xs font-semibold text-primary uppercase tracking-wider">
                    {selectedService.category}
                  </span>
                </div>
                <DialogTitle className="text-3xl font-heading font-bold text-wedding-charcoal mb-1">
                  {selectedService.businessName}
                </DialogTitle>
                <p className="text-sm text-muted-foreground font-medium">
                  by {selectedService.vendorName}
                </p>
              </DialogHeader>

              {/* Image Carousel */}
              <div className="my-6">
                <Carousel className="w-full">
                  <CarouselContent>
                    {selectedService.images.map((image: string, index: number) => (
                      <CarouselItem key={index}>
                        <div className="relative h-64 md:h-80 rounded-xl overflow-hidden bg-gradient-to-br from-wedding-cream to-wedding-sage">
                          <div className="absolute inset-0 flex items-center justify-center">
                            {React.createElement(selectedService.icon, { 
                              className: "h-32 w-32 text-white/30" 
                            })}
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-4" />
                  <CarouselNext className="right-4" />
                </Carousel>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <p className="text-base text-foreground leading-relaxed">
                  {selectedService.fullDescription}
                </p>

                {/* Features List */}
                <div>
                  <h4 className="text-lg font-heading font-semibold mb-4 text-wedding-charcoal">
                    What's Included
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {selectedService.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="mt-1 p-1 rounded-full bg-primary/10">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-gradient-to-br from-wedding-cream/50 to-wedding-sage/20 rounded-xl p-6 border border-border">
                  <h4 className="text-lg font-heading font-semibold mb-4 text-wedding-charcoal">
                    Contact Information
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="font-semibold text-foreground">Phone:</span>{' '}
                        <a href={`tel:${selectedService.contact.phone}`} className="text-primary hover:underline">
                          {selectedService.contact.phone}
                        </a>
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold text-foreground">Email:</span>{' '}
                        <a href={`mailto:${selectedService.contact.email}`} className="text-primary hover:underline">
                          {selectedService.contact.email}
                        </a>
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="font-semibold text-foreground">Facebook:</span>{' '}
                        <a href={`https://facebook.com/${selectedService.contact.facebook}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          {selectedService.contact.facebook}
                        </a>
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold text-foreground">Instagram:</span>{' '}
                        <a href={`https://instagram.com/${selectedService.contact.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          {selectedService.contact.instagram}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button size="lg" className="flex-1">
                    Book Now
                  </Button>
                  <Button size="lg" variant="outline" className="flex-1">
                    Inquire
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* CTA Section */}
      <section className="py-2 md:py-5 px-4 bg-gradient-to-b from-wedding-cream to-background">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 text-wedding-charcoal">
            Ready to Plan Your Event?
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Let us help you create an unforgettable celebration. Contact us today to discuss your needs and get a custom quote.
          </p>
          <Button size="lg" className="text-base md:text-lg px-8 py-6 rounded-lg shadow-elegant hover:shadow-glow transition-all duration-300">
            Get in Touch
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
