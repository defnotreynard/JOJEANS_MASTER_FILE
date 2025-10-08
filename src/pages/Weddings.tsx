import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Heart, Music, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import InspirationGallery from '@/components/InspirationGallery';

const Weddings = () => {
  const [selectedStyle, setSelectedStyle] = useState<string>("All Styles");

  const weddingStyles = [
    {
      id: 1,
      name: "Classic Elegance",
      description: "Timeless sophistication with traditional elements",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Formal venues", "Classic florals", "Traditional ceremony", "Elegant reception"]
    },
    {
      id: 2,
      name: "Modern Chic",
      description: "Contemporary style with sleek, minimalist design",
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Urban venues", "Geometric designs", "Clean lines", "Modern technology"]
    },
    {
      id: 3,
      name: "Rustic Charm",
      description: "Natural beauty with countryside warmth",
      image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Barn venues", "Wildflower bouquets", "Wood accents", "Outdoor ceremonies"]
    },
    {
      id: 4,
      name: "Bohemian",
      description: "Free-spirited and artistic celebration",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Eclectic decor", "Natural textures", "Colorful details", "Relaxed vibe"]
    },
    {
      id: 5,
      name: "Garden Party",
      description: "Enchanting outdoor celebrations surrounded by nature",
      image: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Garden settings", "Lush florals", "Natural lighting", "Intimate atmosphere"]
    },
    {
      id: 6,
      name: "Beach Wedding",
      description: "Coastal romance with ocean views",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Beachside ceremony", "Tropical details", "Sunset views", "Barefoot elegance"]
    },
    {
      id: 7,
      name: "Destination Wedding",
      description: "Exotic locations and adventure",
      image: "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Exotic venues", "Cultural fusion", "Travel experience", "Intimate guest list"]
    },
    {
      id: 8,
      name: "Intimate Ceremonies",
      description: "Small, meaningful celebrations",
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Close family", "Personal touches", "Cozy atmosphere", "Meaningful moments"]
    }
  ];

  const styleFilters = ["All Styles", "Classic Elegance", "Modern Chic", "Rustic Charm", "Bohemian", "Garden Party", "Beach Wedding", "Destination Wedding", "Intimate Ceremonies"];
  
  const filteredStyles = selectedStyle === "All Styles" 
    ? weddingStyles 
    : weddingStyles.filter(style => style.name === selectedStyle);

  const realWeddings = [
    {
      id: 1,
      couple: "Sarah & Michael",
      location: "Oceanview Resort",
      date: "June 2024",
      guests: 120,
      style: "Beach Romance",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "A stunning beachside celebration with sunset ceremony and elegant reception."
    },
    {
      id: 2,
      couple: "Emma & James",
      location: "Historic Garden Estate",
      date: "September 2024",
      guests: 80,
      style: "Garden Party",
      image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "An intimate garden wedding with vintage charm and personalized touches."
    },
    {
      id: 3,
      couple: "Lisa & David",
      location: "Metropolitan Ballroom",
      date: "December 2023",
      guests: 200,
      style: "Classic Elegance",
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "A grand celebration with timeless elegance and sophisticated details."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-hero text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl lg:text-7xl font-heading font-bold mb-6">
                Dream
                <span className="block bg-gradient-to-r from-wedding-gold to-wedding-cream bg-clip-text text-transparent">
                  Weddings
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
                Your love story deserves a celebration as unique as you are. Let us bring your vision to life with flawless execution and unforgettable moments.
              </p>
              <div className="flex items-center justify-center space-x-8">
                <div className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-wedding-blush" />
                  <span>1000+ Happy Couples</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Gift className="h-5 w-5 text-wedding-gold" />
                  <span>Personalized Service</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Wedding Styles Section */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-8">
                Wedding Styles
              </h2>
              
              {/* Filter Badges */}
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {styleFilters.map((filter) => (
                  <Badge 
                    key={filter}
                    variant={filter === selectedStyle ? 'default' : 'secondary'}
                    className={`px-5 py-2.5 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-sm ${
                      filter === selectedStyle ? 'bg-primary text-primary-foreground shadow-glow scale-105' : ''
                    }`}
                    onClick={() => setSelectedStyle(filter)}
                  >
                    {filter}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredStyles.map((style, index) => (
                <Card 
                  key={style.id} 
                  className="group overflow-hidden hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden">
                    <div 
                      className="h-64 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${style.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="font-heading font-bold text-xl mb-2">{style.name}</h3>
                      <p className="text-sm text-white/90">{style.description}</p>
                    </div>
                  </div>
                  
                  <CardContent className="p-6 bg-card">
                    <div className="space-y-2.5">
                      {style.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Real Weddings Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
                Real Weddings
              </h2>
            </div>

            <InspirationGallery />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-hero text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl lg:text-6xl font-heading font-bold mb-6 animate-fade-in">
              Ready to Plan Your Dream Wedding?
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto text-white/90 animate-fade-in-up">
              Let's create a celebration that perfectly captures your love story. Schedule a consultation to begin planning your perfect day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 hover:scale-105 transition-transform shadow-elegant">
                Schedule Consultation
                <Heart className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 hover:scale-105 transition-transform">
                <Music className="mr-2 h-5 w-5" />
                Browse Inspiration
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Weddings;