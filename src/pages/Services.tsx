import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Utensils, Lightbulb, Music, Cake, Mail, Users, Flower, Car, Building, Monitor, ArrowRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Services = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const services = [
    {
      id: 'coordination',
      title: 'Coordination',
      icon: Users,
      description: 'Professional event coordination to ensure every detail runs smoothly from start to finish.',
      features: ['Timeline Management', 'Vendor Coordination', 'Day-of Assistance', 'Problem Solving']
    },
    {
      id: 'styling-decors',
      title: 'Styling and Decors',
      icon: Flower,
      description: 'Transform your venue with stunning decorations and styling that match your vision.',
      features: ['Theme Development', 'Floral Arrangements', 'Table Settings', 'Venue Transformation']
    },
    {
      id: 'catering',
      title: 'Catering Services',
      icon: Utensils,
      description: 'Exquisite cuisine and professional service to delight your guests.',
      features: ['Custom Menus', 'Professional Staff', 'Buffet & Plated Options', 'Dietary Accommodations']
    },
    {
      id: 'photo-video',
      title: 'Photo and Video',
      icon: Camera,
      description: 'Capture every precious moment with professional photography and videography.',
      features: ['Full-Day Coverage', 'Highlight Reels', 'Digital Albums', 'Drone Photography']
    },
    {
      id: 'sounds-lights',
      title: 'Sounds and Lights',
      icon: Music,
      description: 'Professional audio-visual setup to create the perfect ambiance.',
      features: ['Sound Systems', 'Stage Lighting', 'Ambient Lighting', 'Technical Support']
    },
    {
      id: 'cakes-pica',
      title: 'Cakes / Pica-pica',
      icon: Cake,
      description: 'Delicious custom cakes and appetizers for your celebration.',
      features: ['Custom Cake Design', 'Finger Foods', 'Dessert Tables', 'Themed Treats']
    },
    {
      id: 'invitation-giveaways',
      title: 'Invitation / Giveaways',
      icon: Mail,
      description: 'Beautiful invitations and memorable giveaways for your guests.',
      features: ['Custom Designs', 'Digital Invites', 'Wedding Favors', 'Personalized Gifts']
    },
    {
      id: 'hmua-host',
      title: 'HMUA / Host',
      icon: Heart,
      description: 'Professional hair, makeup, and hosting services for your special day.',
      features: ['Bridal Makeup', 'Hairstyling', 'Professional Hosts', 'Touch-up Services']
    },
    {
      id: 'attires-bouquets',
      title: 'Attires / Bouquets',
      icon: Flower,
      description: 'Elegant wedding attire and stunning floral arrangements.',
      features: ['Bridal Gowns', 'Groom Suits', 'Bridal Bouquets', 'Entourage Attire']
    },
    {
      id: 'bridal-car',
      title: 'Bridal Car',
      icon: Car,
      description: 'Luxury transportation for the bride, groom, and wedding party.',
      features: ['Luxury Vehicles', 'Professional Drivers', 'Decorated Cars', 'Airport Transfers']
    },
    {
      id: 'ceiling-works',
      title: 'Ceiling Works',
      icon: Building,
      description: 'Dramatic ceiling installations and drapery to elevate your venue.',
      features: ['Fabric Draping', 'Ceiling Decor', 'Lighting Integration', 'Custom Designs']
    },
    {
      id: 'led-wall',
      title: 'LED Wall',
      icon: Monitor,
      description: 'High-quality LED displays for presentations and entertainment.',
      features: ['Large Format Displays', 'Custom Content', 'Technical Support', 'Indoor/Outdoor Options']
    },
    {
      id: 'entrance-tunnel',
      title: 'Entrance Tunnel',
      icon: ArrowRight,
      description: 'Grand entrance tunnels to make a memorable first impression.',
      features: ['Custom Designs', 'Lighting Effects', 'Floral Accents', 'Photo Opportunities']
    },
    {
      id: 'glass-dance-floor',
      title: 'Glass Dance Floor',
      icon: Lightbulb,
      description: 'Stunning illuminated glass dance floors for an unforgettable experience.',
      features: ['LED Lighting', 'Custom Patterns', 'Safe & Sturdy', 'Multiple Sizes']
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Our Services
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive event services to bring your dream celebration to life. From coordination to execution, we handle every detail with care and professionalism.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.id} id={service.id} className="hover:shadow-lg transition-shadow scroll-mt-24">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </div>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-6" variant="outline">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Ready to Plan Your Event?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let us help you create an unforgettable celebration. Contact us today to discuss your needs and get a custom quote.
          </p>
          <Button size="lg" className="text-lg px-8">
            Get in Touch
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
