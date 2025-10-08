import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Heart, Calendar, Camera, Flower, Music, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Weddings = () => {
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
      name: "Garden Romance",
      description: "Enchanting outdoor celebrations surrounded by nature",
      image: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Garden settings", "Lush florals", "Natural lighting", "Intimate atmosphere"]
    }
  ];

  const weddingServices = [
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Full Wedding Planning",
      description: "Complete coordination from engagement to honeymoon",
      features: ["12-month timeline", "Vendor management", "Budget planning", "Design consultation"]
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Day-of Coordination",
      description: "Stress-free execution of your perfectly planned day",
      features: ["Timeline management", "Vendor coordination", "Emergency handling", "Setup supervision"]
    },
    {
      icon: <Camera className="h-8 w-8" />,
      title: "Photography & Videography",
      description: "Capture every precious moment of your special day",
      features: ["Professional photographers", "Cinematic videography", "Drone footage", "Same-day highlights"]
    },
    {
      icon: <Flower className="h-8 w-8" />,
      title: "Floral Design",
      description: "Custom floral arrangements that tell your love story",
      features: ["Bridal bouquets", "Ceremony decorations", "Reception centerpieces", "Personal flowers"]
    }
  ];

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
        <section className="py-7">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
                Wedding Styles
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Discover the perfect style that reflects your personality and love story. From classic elegance to modern chic, we create weddings that are uniquely yours.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {weddingStyles.map((style) => (
                <Card key={style.id} className="overflow-hidden hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
                  <div className="relative">
                    <div 
                      className="h-48 bg-cover bg-center"
                      style={{ backgroundImage: `url(${style.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-heading font-semibold text-lg">{style.name}</h3>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-4">{style.description}</p>
                    <div className="space-y-2">
                      {style.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2 text-xs">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Wedding Services Section */}
        <section className="py-5 bg-gradient-elegant">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
                Wedding Services
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive wedding planning services to make your special day absolutely perfect.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {weddingServices.map((service, index) => (
                <Card key={index} className="text-center hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
                  <CardContent className="p-8">
                    <div className="text-primary mb-4 flex justify-center">
                      {service.icon}
                    </div>
                    <h3 className="font-heading font-semibold text-xl mb-3">{service.title}</h3>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <div className="space-y-2 text-sm">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center justify-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span>{feature}</span>
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
        <section className="py-5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
                Real Weddings
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Get inspired by real couples who trusted us to bring their wedding dreams to life.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {realWeddings.map((wedding) => (
                <Card key={wedding.id} className="overflow-hidden hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
                  <div className="relative">
                    <div 
                      className="h-64 bg-cover bg-center"
                      style={{ backgroundImage: `url(${wedding.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-heading font-semibold text-xl">{wedding.couple}</h3>
                      <p className="text-sm opacity-90">{wedding.location}</p>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                        {wedding.style}
                      </span>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex justify-between text-sm text-muted-foreground mb-3">
                      <span>{wedding.date}</span>
                      <span>{wedding.guests} guests</span>
                    </div>
                    <p className="text-sm">{wedding.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button variant="outline" size="lg">
                View All Real Weddings
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-7 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
              Ready to Plan Your Dream Wedding?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let's create a celebration that perfectly captures your love story. Schedule a consultation to begin planning your perfect day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                Schedule Consultation
                <Heart className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
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