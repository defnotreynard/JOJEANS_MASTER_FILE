import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { MapPin, Star, Users, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Venues = () => {
  const venues = [
    {
      name: "Tierra Alta",
      location: "Highland Area",
      capacity: "250 guests",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "Mountain Venue",
      price: "$$$$"
    },
    {
      name: "El Aquino",
      location: "Waterfront",
      capacity: "180 guests", 
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "Resort Venue",
      price: "$$$"
    },
    {
      name: "Praia Sibulan",
      location: "Sibulan Beach",
      capacity: "200 guests",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1510076857177-7470076d4098?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "Beach Venue",
      price: "$$$$"
    },
    {
      name: "Pavilion Bayawan",
      location: "Bayawan City",
      capacity: "300 guests",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "Pavilion Venue",
      price: "$$$"
    },
    {
      name: "Kakahuyan Santa",
      location: "Santa Catalina",
      capacity: "150 guests",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "Garden Venue",
      price: "$$$"
    },
    {
      name: "Floresel Resort Siaton",
      location: "Siaton",
      capacity: "220 guests",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "Resort Venue",
      price: "$$$$"
    },
    {
      name: "Jaines Bayawan",
      location: "Bayawan City",
      capacity: "180 guests",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "Event Venue",
      price: "$$$"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-heading font-bold mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Premium Venues
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover exceptional venues perfectly suited for your special events
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <Input 
              placeholder="Search venues..." 
              className="flex-1"
            />
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Venue Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="luxury">Luxury</SelectItem>
                <SelectItem value="outdoor">Outdoor</SelectItem>
                <SelectItem value="corporate">Corporate</SelectItem>
                <SelectItem value="beach">Beach</SelectItem>
                <SelectItem value="historic">Historic</SelectItem>
                <SelectItem value="rooftop">Rooftop</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Capacity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Up to 100</SelectItem>
                <SelectItem value="medium">100-250</SelectItem>
                <SelectItem value="large">250-500</SelectItem>
                <SelectItem value="xlarge">500+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Venues Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {venues.map((venue, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <div 
                    className="h-56 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundImage: `url(${venue.image})` }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                      {venue.type}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                      <Star className="h-3 w-3 text-wedding-gold fill-current" />
                      <span className="text-xs font-medium">{venue.rating}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="bg-background/90 backdrop-blur-sm text-xs font-medium px-3 py-1 rounded-full">
                      {venue.price}
                    </span>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-xl mb-3 group-hover:text-primary transition-colors">
                    {venue.name}
                  </h3>
                  
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{venue.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>{venue.capacity}</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full group/btn">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Venues;
