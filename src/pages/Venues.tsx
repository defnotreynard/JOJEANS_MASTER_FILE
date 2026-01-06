import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { MapPin, Star, Users, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import VenueDetailsModal from '@/components/VenueDetailsModal';

const Venues = () => {
  const [selectedVenue, setSelectedVenue] = useState<typeof venues[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [venueTypeFilter, setVenueTypeFilter] = useState('all');
  const [capacityFilter, setCapacityFilter] = useState('all');

  const venues = [
    {
      name: "Tierra Alta",
      location: "Highland Area",
      capacity: "250 guests",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "Mountain Venue",
      price: "$$$$",
      description: "A breathtaking mountain venue offering panoramic views and luxurious facilities for unforgettable events.",
      amenities: ["Mountain Views", "Outdoor Garden", "Indoor Hall", "Parking Space", "Catering Kitchen", "Bridal Suite"],
      images: [
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1478146896981-b80fe463b330?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      ],
      contactPhone: "+63 912 345 6789",
      contactEmail: "tierraalta@venue.com",
      operatingHours: "8:00 AM - 11:00 PM"
    },
    {
      name: "El Aquino",
      location: "Waterfront",
      capacity: "180 guests", 
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "Resort Venue",
      price: "$$$",
      description: "A stunning waterfront resort perfect for elegant celebrations with beautiful sunset views and modern amenities.",
      amenities: ["Waterfront Access", "Swimming Pool", "Restaurant", "Bar", "Wi-Fi", "Sound System"],
      images: [
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1510076857177-7470076d4098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      ],
      contactPhone: "+63 912 345 6790",
      contactEmail: "elaquino@venue.com",
      operatingHours: "9:00 AM - 10:00 PM"
    },
    {
      name: "Praia Sibulan",
      location: "Sibulan Beach",
      capacity: "200 guests",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1510076857177-7470076d4098?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "Beach Venue",
      price: "$$$$",
      description: "An exclusive beachfront venue offering pristine white sand and crystal-clear waters for your dream beach wedding.",
      amenities: ["Private Beach", "Gazebo", "Changing Rooms", "Beach Chairs", "Tents Available", "Lighting Setup"],
      images: [
        "https://images.unsplash.com/photo-1510076857177-7470076d4098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      ],
      contactPhone: "+63 912 345 6791",
      contactEmail: "praiasibulan@venue.com",
      operatingHours: "7:00 AM - 9:00 PM"
    },
    {
      name: "Pavilion Bayawan",
      location: "Bayawan City",
      capacity: "300 guests",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "Pavilion Venue",
      price: "$$$",
      description: "A spacious pavilion venue ideal for large gatherings with flexible indoor and outdoor spaces.",
      amenities: ["Large Hall", "Stage Area", "Kitchen", "Restrooms", "Air Conditioning", "Tables & Chairs"],
      images: [
        "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      ],
      contactPhone: "+63 912 345 6792",
      contactEmail: "pavilionbayawan@venue.com",
      operatingHours: "8:00 AM - 10:00 PM"
    },
    {
      name: "Kakahuyan Santa",
      location: "Santa Catalina",
      capacity: "150 guests",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "Garden Venue",
      price: "$$$",
      description: "A serene garden venue surrounded by lush greenery, perfect for intimate and romantic celebrations.",
      amenities: ["Garden Setting", "Fountain", "Gazebo", "Outdoor Seating", "Pathway Lighting", "Photo Spots"],
      images: [
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      ],
      contactPhone: "+63 912 345 6793",
      contactEmail: "kakahuyansanta@venue.com",
      operatingHours: "7:00 AM - 9:00 PM"
    },
    {
      name: "Floresel Resort Siaton",
      location: "Siaton",
      capacity: "220 guests",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "Resort Venue",
      price: "$$$$",
      description: "An upscale resort venue offering luxury accommodations and exceptional service for premium events.",
      amenities: ["Pool Area", "Conference Room", "Restaurant", "Hotel Rooms", "Spa", "Activity Center"],
      images: [
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      ],
      contactPhone: "+63 912 345 6794",
      contactEmail: "floresel@venue.com",
      operatingHours: "24/7"
    },
    {
      name: "Jaines Bayawan",
      location: "Bayawan City",
      capacity: "180 guests",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "Event Venue",
      price: "$$$",
      description: "A versatile event venue with modern facilities perfect for corporate events, weddings, and special occasions.",
      amenities: ["Function Hall", "Audio Visual Equipment", "Catering Services", "Ample Parking", "Climate Control", "Professional Staff"],
      images: [
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      ],
      contactPhone: "+63 912 345 6795",
      contactEmail: "jaines@venue.com",
      operatingHours: "8:00 AM - 11:00 PM"
    }
  ];

  // Helper to parse capacity number from string like "250 guests"
  const parseCapacity = (capacityStr: string) => {
    const match = capacityStr.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  // Filter venues based on search and filters
  const filteredVenues = venues.filter(venue => {
    // Search filter
    const matchesSearch = searchQuery === '' || 
      venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Venue type filter
    const matchesType = venueTypeFilter === 'all' || 
      venue.type.toLowerCase().includes(venueTypeFilter.toLowerCase());

    // Capacity filter
    const capacity = parseCapacity(venue.capacity);
    let matchesCapacity = true;
    if (capacityFilter === 'small') matchesCapacity = capacity <= 100;
    else if (capacityFilter === 'medium') matchesCapacity = capacity > 100 && capacity <= 250;
    else if (capacityFilter === 'large') matchesCapacity = capacity > 250 && capacity <= 500;
    else if (capacityFilter === 'xlarge') matchesCapacity = capacity > 500;

    return matchesSearch && matchesType && matchesCapacity;
  });

  return (
    <div className="min-h-screen bg-background page-transition">
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Select value={venueTypeFilter} onValueChange={setVenueTypeFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Venue Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="mountain">Mountain</SelectItem>
                <SelectItem value="resort">Resort</SelectItem>
                <SelectItem value="beach">Beach</SelectItem>
                <SelectItem value="pavilion">Pavilion</SelectItem>
                <SelectItem value="garden">Garden</SelectItem>
                <SelectItem value="event">Event</SelectItem>
              </SelectContent>
            </Select>
            <Select value={capacityFilter} onValueChange={setCapacityFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Capacity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Capacities</SelectItem>
                <SelectItem value="small">Up to 100</SelectItem>
                <SelectItem value="medium">100-250</SelectItem>
                <SelectItem value="large">250-500</SelectItem>
                <SelectItem value="xlarge">500+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredVenues.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No venues found matching your filters.</p>
            </div>
          ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVenues.map((venue, index) => (
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

                  <Button 
                    variant="outline" 
                    className="w-full group/btn"
                    onClick={() => {
                      setSelectedVenue(venue);
                      setIsModalOpen(true);
                    }}
                  >
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          )}
        </div>
      </section>

      <VenueDetailsModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedVenue(null);
        }}
        venue={selectedVenue}
      />

      <Footer />
    </div>
  );
};

export default Venues;
