import React from 'react';
import { ArrowRight, MapPin, Star, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const VenuesSection = () => {
  const featuredVenues = [
    {
      name: "Grand Ballroom Heritage",
      location: "Downtown District",
      capacity: "300 guests",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "Luxury Venue"
    },
    {
      name: "Garden Terrace Resort",
      location: "Countryside",
      capacity: "150 guests", 
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "Outdoor Venue"
    },
    {
      name: "Modern Conference Hub",
      location: "Business District",
      capacity: "500 guests",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "Corporate Venue"
    }
  ];


  return (
    <section className="py-7">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-6xl font-heading font-bold text-foreground mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Premium Venues
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Access our curated network of exceptional venues to bring your vision to life.
          </p>
        </div>

        {/* Featured Venues */}
        <div className="mb-16">
          <h3 className="text-2xl font-heading font-semibold text-center mb-8">Featured Venues</h3>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {featuredVenues.map((venue, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <div 
                    className="h-48 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundImage: `url(${venue.image})` }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                      {venue.type}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                      <Star className="h-3 w-3 text-wedding-gold fill-current" />
                      <span className="text-xs font-medium">{venue.rating}</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h4 className="font-heading font-semibold text-lg mb-3 group-hover:text-primary transition-colors">
                    {venue.name}
                  </h4>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{venue.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>{venue.capacity}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link to="/venues">
            <Button size="lg" className="group">
              View All Venues
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VenuesSection;