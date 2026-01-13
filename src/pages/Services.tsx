import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Utensils, Lightbulb, Music, Cake, Mail, Users, Flower, Car, Building, Monitor, ArrowRight, Heart, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
      images: [
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800',
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
        'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800',
        'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800',
        'https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800'
      ],
      thumbnail: coordinationImg,
      contact: {
        phone: '+63 917 123 4567',
        email: 'admin@jojeans.com',
        facebook: 'jojeansdigital',
        instagram: '@jojeansdigital'
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
      images: [
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800',
        'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800',
        'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
        'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800'
      ],
      thumbnail: stylingImg,
      contact: {
        phone: '+63 917 234 5678',
        email: 'admin@jojeans.com',
        facebook: 'jojeansdigital',
        instagram: '@jojeansdigital'
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
      images: [
        'https://images.unsplash.com/photo-1555244162-803834f70033?w=800',
        'https://images.unsplash.com/photo-1467453678174-768ec283a940?w=800',
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800'
      ],
      thumbnail: cateringImg,
      contact: {
        phone: '+63 917 345 6789',
        email: 'admin@jojeans.com',
        facebook: 'jojeansdigital',
        instagram: '@jojeansdigital'
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
      images: [
        'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800',
        'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800',
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800',
        'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800'
      ],
      thumbnail: photoVideoImg,
      contact: {
        phone: '+63 917 456 7890',
        email: 'admin@jojeans.com',
        facebook: 'jojeansdigital',
        instagram: '@jojeansdigital'
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
      images: [
        'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800',
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
        'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800',
        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800'
      ],
      thumbnail: soundsLightsImg,
      contact: {
        phone: '+63 917 567 8901',
        email: 'admin@jojeans.com',
        facebook: 'jojeansdigital',
        instagram: '@jojeansdigital'
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
      images: [
        'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800',
        'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=800',
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800',
        'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800',
        'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800'
      ],
      thumbnail: cakesImg,
      contact: {
        phone: '+63 917 678 9012',
        email: 'admin@jojeans.com',
        facebook: 'jojeansdigital',
        instagram: '@jojeansdigital'
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
      images: [
        'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800',
        'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=800',
        'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800',
        'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=800'
      ],
      thumbnail: invitationsImg,
      contact: {
        phone: '+63 917 789 0123',
        email: 'admin@jojeans.com',
        facebook: 'jojeansdigital',
        instagram: '@jojeansdigital'
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
      images: [
        'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800',
        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800',
        'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800',
        'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800',
        'https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=800'
      ],
      thumbnail: hmuaImg,
      contact: {
        phone: '+63 917 890 1234',
        email: 'admin@jojeans.com',
        facebook: 'jojeansdigital',
        instagram: '@jojeansdigital'
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
      images: [
        'https://images.unsplash.com/photo-1594552072238-b8a33785b261?w=800',
        'https://images.unsplash.com/photo-1550005809-91ad75fb315f?w=800',
        'https://images.unsplash.com/photo-1522057384400-681b421cfebc?w=800',
        'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800'
      ],
      thumbnail: attiresImg,
      contact: {
        phone: '+63 917 901 2345',
        email: 'admin@jojeans.com',
        facebook: 'jojeansdigital',
        instagram: '@jojeansdigital'
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
      images: [
        'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
        'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800',
        'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800'
      ],
      thumbnail: bridalCarImg,
      contact: {
        phone: '+63 917 012 3456',
        email: 'admin@jojeans.com',
        facebook: 'jojeansdigital',
        instagram: '@jojeansdigital'
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
      images: [
        'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800',
        'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800',
        'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800',
        'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800'
      ],
      thumbnail: ceilingImg,
      contact: {
        phone: '+63 917 123 4567',
        email: 'admin@jojeans.com',
        facebook: 'jojeansdigital',
        instagram: '@jojeansdigital'
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
      images: [
        'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800',
        'https://images.unsplash.com/photo-1561489413-985b06da5bee?w=800',
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'
      ],
      thumbnail: ledWallImg,
      contact: {
        phone: '+63 917 234 5678',
        email: 'admin@jojeans.com',
        facebook: 'jojeansdigital',
        instagram: '@jojeansdigital'
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
      images: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800',
        'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800',
        'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800'
      ],
      thumbnail: entranceImg,
      contact: {
        phone: '+63 917 345 6789',
        email: 'admin@jojeans.com',
        facebook: 'jojeansdigital',
        instagram: '@jojeansdigital'
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
      images: [
        'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800',
        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800',
        'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800',
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800'
      ],
      thumbnail: danceFloorImg,
      contact: {
        phone: '+63 917 456 7890',
        email: 'admin@jojeans.com',
        facebook: 'jojeansdigital',
        instagram: '@jojeansdigital'
      }
    }
  ];

  const categories = ['all', ...Array.from(new Set(services.map(s => s.category)))];
  
  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(s => s.category === selectedCategory);

  return (
    <div className="min-h-screen bg-wedding-cream page-transition">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-8 md:py-12 px-4 bg-gradient-elegant">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 md:mb-6 text-wedding-charcoal">
            Our Services
          </h1>
          <p className="text-sm md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
            Comprehensive event services to bring your dream celebration to life.
          </p>
        </div>
      </section>

      {/* Filter Section - Sticky */}
      <section className="sticky top-0 md:top-16 z-40 bg-background/98 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container mx-auto px-3 md:px-4 py-2 md:py-3">
          {/* Mobile Dropdown */}
          <div className="md:hidden">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full h-9 text-sm bg-background">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-background z-50">
                {categories.map((category) => (
                  <SelectItem key={category} value={category} className="text-sm">
                    {category === 'all' ? 'All Services' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Desktop Tabs */}
          <div className="hidden md:block">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="inline-flex h-auto gap-2 bg-transparent p-0 w-full justify-center flex-wrap">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="px-4 py-1.5 rounded-full border border-border bg-background data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary shadow-sm hover:shadow-md transition-all duration-300 text-sm font-medium"
                  >
                    {category === 'all' ? 'All Services' : category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-4 md:py-10 px-3 md:px-4">
        <div className="container mx-auto">
          <div className="grid gap-4 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredServices.map((service) => {
              const Icon = service.icon;
              return (
                <Card 
                  key={service.id} 
                  className="group overflow-hidden rounded-xl shadow-card hover:shadow-elegant transition-all duration-500 hover:-translate-y-1 bg-background border-border cursor-pointer"
                  onClick={() => setSelectedService(service)}
                >
                  {/* Image Section */}
                  <div className="relative h-44 md:h-56 overflow-hidden bg-gradient-to-br from-wedding-cream to-wedding-sage">
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
                    <div className="absolute top-2 md:top-4 left-2 md:left-4 z-20">
                      <span className="px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] md:text-xs font-semibold text-wedding-charcoal uppercase tracking-wider">
                        {service.category}
                      </span>
                    </div>
                  </div>

                  <CardContent className="p-3 md:p-6">
                    <div className="mb-2 md:mb-3">
                      <h3 className="font-heading text-base md:text-xl font-bold mb-1 text-wedding-charcoal group-hover:text-primary transition-colors line-clamp-1">
                        {service.businessName}
                      </h3>
                      <p className="text-xs text-muted-foreground font-medium">
                        by {service.vendorName}
                      </p>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 line-clamp-2 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full text-xs md:text-sm rounded-lg border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300 group-hover:border-primary"
                    >
                      View Portfolio
                      <ArrowRight className="ml-2 h-3 md:h-4 w-3 md:w-4 group-hover:translate-x-1 transition-transform" />
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
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-4 md:p-6">
          {selectedService && (
            <>
              <DialogHeader className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-primary/10 text-[10px] md:text-xs font-semibold text-primary uppercase tracking-wider">
                    {selectedService.category}
                  </span>
                </div>
                <DialogTitle className="text-xl md:text-3xl font-heading font-bold text-wedding-charcoal">
                  {selectedService.businessName}
                </DialogTitle>
                <p className="text-xs md:text-sm text-muted-foreground font-medium">
                  by {selectedService.vendorName}
                </p>
              </DialogHeader>

              {/* Image Carousel */}
              <div className="my-4 md:my-6">
                <Carousel className="w-full">
                  <CarouselContent>
                    {selectedService.images.map((image: string, index: number) => (
                      <CarouselItem key={index}>
                        <div className="relative h-48 md:h-80 rounded-xl overflow-hidden bg-gradient-to-br from-wedding-cream to-wedding-sage">
                          <img 
                            src={image} 
                            alt={`${selectedService.title} ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/10" />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2 md:left-4 h-8 w-8 md:h-10 md:w-10" />
                  <CarouselNext className="right-2 md:right-4 h-8 w-8 md:h-10 md:w-10" />
                </Carousel>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <p className="text-sm md:text-base text-foreground leading-relaxed">
                  {selectedService.fullDescription}
                </p>

                {/* Features List */}
                <div>
                  <h4 className="text-base md:text-lg font-heading font-semibold mb-3 md:mb-4 text-wedding-charcoal">
                    What's Included
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                    {selectedService.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-start gap-2 md:gap-3">
                        <div className="mt-0.5 md:mt-1 p-1 rounded-full bg-primary/10 flex-shrink-0">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-xs md:text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-gradient-to-br from-wedding-cream/50 to-wedding-sage/20 rounded-xl p-4 md:p-6 border border-border">
                  <h4 className="text-base md:text-lg font-heading font-semibold mb-3 md:mb-4 text-wedding-charcoal">
                    Contact Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <div className="space-y-1.5 md:space-y-2">
                      <p className="text-xs md:text-sm">
                        <span className="font-semibold text-foreground">Phone:</span>{' '}
                        <a href={`tel:${selectedService.contact.phone}`} className="text-primary hover:underline">
                          {selectedService.contact.phone}
                        </a>
                      </p>
                      <p className="text-xs md:text-sm">
                        <span className="font-semibold text-foreground">Email:</span>{' '}
                        <a href={`mailto:${selectedService.contact.email}`} className="text-primary hover:underline break-all">
                          {selectedService.contact.email}
                        </a>
                      </p>
                    </div>
                    <div className="space-y-1.5 md:space-y-2">
                      <p className="text-xs md:text-sm">
                        <span className="font-semibold text-foreground">Facebook:</span>{' '}
                        <a href={`https://facebook.com/${selectedService.contact.facebook}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          {selectedService.contact.facebook}
                        </a>
                      </p>
                      <p className="text-xs md:text-sm">
                        <span className="font-semibold text-foreground">Instagram:</span>{' '}
                        <a href={`https://instagram.com/${selectedService.contact.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          {selectedService.contact.instagram}
                        </a>
                      </p>
                    </div>
                  </div>
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
