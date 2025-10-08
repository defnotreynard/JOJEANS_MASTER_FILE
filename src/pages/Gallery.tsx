import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Search, MapPin, Users, Calendar, Heart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import EventDetailsModal from '@/components/EventDetailsModal';

const Gallery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [styleFilter, setStyleFilter] = useState('all');
  const [venueFilter, setVenueFilter] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState<typeof galleryItems[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const galleryItems = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=1000&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=600&fit=crop'
      ],
      title: 'Romantic Garden Wedding',
      couple: 'Emma & James',
      location: 'Napa Valley, CA',
      date: 'June 15, 2024',
      guests: 150,
      style: 'Romantic',
      venue: 'Garden',
      description: 'A breathtaking garden ceremony with lush florals and natural lighting',
      likes: 234,
      views: 1240,
      package: 'Platinum Package',
      packagePrice: '₱199,000',
      packagePromo: '#100D'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800&h=800&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&h=600&fit=crop'
      ],
      title: 'Modern Minimalist Ceremony',
      couple: 'Sarah & David',
      location: 'Los Angeles, CA',
      date: 'March 20, 2024',
      guests: 80,
      style: 'Modern',
      venue: 'Urban',
      description: 'Sleek and sophisticated celebration with geometric designs',
      likes: 189,
      views: 892,
      package: 'Silver Package',
      packagePrice: '₱69,000',
      packagePromo: '#50A'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=1200&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800&h=600&fit=crop'
      ],
      title: 'Boho Beach Celebration',
      couple: 'Luna & Alex',
      location: 'Malibu, CA',
      date: 'September 8, 2024',
      guests: 100,
      style: 'Boho',
      venue: 'Beach',
      description: 'Free-spirited beachside wedding with bohemian touches',
      likes: 345,
      views: 1580,
      package: 'Gold Package',
      packagePrice: '₱95,000',
      packagePromo: '#100A'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=900&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop'
      ],
      title: 'Vintage Rustic Barn',
      couple: 'Grace & Michael',
      location: 'Hudson Valley, NY',
      date: 'October 12, 2024',
      guests: 120,
      style: 'Rustic',
      venue: 'Barn',
      description: 'Charming countryside barn wedding with vintage details',
      likes: 287,
      views: 1120,
      package: 'Gold Package',
      packagePrice: '₱95,000',
      packagePromo: '#100A'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=800&h=850&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop'
      ],
      title: 'Classic Ballroom Elegance',
      couple: 'Isabella & William',
      location: 'Chicago, IL',
      date: 'December 31, 2023',
      guests: 200,
      style: 'Classic',
      venue: 'Ballroom',
      description: 'Timeless elegance in a grand ballroom setting',
      likes: 412,
      views: 2140,
      package: 'Platinum Package',
      packagePrice: '₱199,000',
      packagePromo: '#100D'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=1100&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop'
      ],
      title: 'Whimsical Garden Party',
      couple: 'Lily & Thomas',
      location: 'Charleston, SC',
      date: 'April 18, 2024',
      guests: 90,
      style: 'Whimsical',
      venue: 'Garden',
      description: 'Enchanting garden celebration with playful details',
      likes: 198,
      views: 756,
      package: 'Gold Package',
      packagePrice: '₱95,000',
      packagePromo: '#100A'
    },
    {
      id: 7,
      image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=950&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800&h=600&fit=crop'
      ],
      title: 'Intimate Chapel Wedding',
      couple: 'Olivia & Ethan',
      location: 'Nashville, TN',
      date: 'May 5, 2024',
      guests: 50,
      style: 'Classic',
      venue: 'Chapel',
      description: 'Intimate ceremony in a historic chapel',
      likes: 276,
      views: 945,
      package: 'Silver Package',
      packagePrice: '₱69,000',
      packagePromo: '#50A'
    },
    {
      id: 8,
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=800&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop'
      ],
      title: 'Desert Sunset Romance',
      couple: 'Ava & Lucas',
      location: 'Scottsdale, AZ',
      date: 'February 14, 2024',
      guests: 75,
      style: 'Modern',
      venue: 'Outdoor',
      description: 'Stunning desert wedding at golden hour',
      likes: 321,
      views: 1367,
      package: 'Silver Package',
      packagePrice: '₱69,000',
      packagePromo: '#50A'
    },
    {
      id: 9,
      image: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&h=1050&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=600&fit=crop'
      ],
      title: 'Tropical Paradise Wedding',
      couple: 'Mia & Noah',
      location: 'Hawaii',
      date: 'July 22, 2024',
      guests: 110,
      style: 'Destination',
      venue: 'Beach',
      description: 'Exotic tropical destination wedding with ocean views',
      likes: 458,
      views: 2245,
      package: 'Gold Package',
      packagePrice: '₱95,000',
      packagePromo: '#100A'
    }
  ];

  const getImageHeight = (index: number) => {
    const heights = ['300px', '400px', '350px', '380px', '320px', '420px'];
    return heights[index % heights.length];
  };

  const filteredItems = galleryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.couple.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStyle = styleFilter === 'all' || item.style === styleFilter;
    const matchesVenue = venueFilter === 'all' || item.venue === venueFilter;
    
    return matchesSearch && matchesStyle && matchesVenue;
  });

  const handleCardClick = (item: typeof galleryItems[0]) => {
    setSelectedEvent(item);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-hero text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl lg:text-7xl font-heading font-bold mb-6 animate-fade-in">
                Event
                <span className="block bg-gradient-to-r from-wedding-gold to-wedding-cream bg-clip-text text-transparent">
                  Gallery
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed animate-fade-in-up">
                Explore stunning real events and celebrations. Get inspired by beautiful moments captured perfectly.
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 border-b bg-card/50 backdrop-blur-sm sticky top-16 z-40">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search Input */}
                <div className="relative md:col-span-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 bg-background"
                  />
                </div>

                {/* Event Style Filter */}
                <Select value={styleFilter} onValueChange={setStyleFilter}>
                  <SelectTrigger className="h-12 bg-background">
                    <SelectValue placeholder="Event Style" />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    <SelectItem value="all">All Styles</SelectItem>
                    <SelectItem value="Romantic">Romantic</SelectItem>
                    <SelectItem value="Modern">Modern</SelectItem>
                    <SelectItem value="Boho">Boho</SelectItem>
                    <SelectItem value="Rustic">Rustic</SelectItem>
                    <SelectItem value="Classic">Classic</SelectItem>
                    <SelectItem value="Whimsical">Whimsical</SelectItem>
                    <SelectItem value="Destination">Destination</SelectItem>
                  </SelectContent>
                </Select>

                {/* Venue Type Filter */}
                <Select value={venueFilter} onValueChange={setVenueFilter}>
                  <SelectTrigger className="h-12 bg-background">
                    <SelectValue placeholder="Venue Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    <SelectItem value="all">All Venues</SelectItem>
                    <SelectItem value="Garden">Garden</SelectItem>
                    <SelectItem value="Urban">Urban</SelectItem>
                    <SelectItem value="Beach">Beach</SelectItem>
                    <SelectItem value="Barn">Barn</SelectItem>
                    <SelectItem value="Ballroom">Ballroom</SelectItem>
                    <SelectItem value="Chapel">Chapel</SelectItem>
                    <SelectItem value="Outdoor">Outdoor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            {filteredItems.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground">No events found matching your filters.</p>
              </div>
            ) : (
              <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                {filteredItems.map((item, index) => (
                  <Card 
                    key={item.id}
                    onClick={() => handleCardClick(item)}
                    className="group overflow-hidden hover:shadow-elegant transition-all duration-500 animate-fade-in cursor-pointer break-inside-avoid mb-6"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative overflow-hidden" style={{ height: getImageHeight(index) }}>
                      <img 
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Style Badge */}
                      <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground backdrop-blur-sm">
                        {item.style}
                      </Badge>
                    </div>

                    <CardContent className="p-5 space-y-3">
                      <div>
                        <h3 className="font-heading font-semibold text-base leading-tight mb-1.5">
                          {item.couple}
                        </h3>
                        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                          <span>{item.location}</span>
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{item.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="h-3.5 w-3.5" />
                          <span>{item.guests}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Heart className="h-3.5 w-3.5" />
                            <span>{item.likes}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3.5 w-3.5" />
                            <span>{item.views}</span>
                          </span>
                        </div>
                        <Badge variant="outline" className="text-xs">{item.venue}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Load More */}
            {filteredItems.length > 0 && (
              <div className="text-center mt-12 animate-fade-in-up">
                <Button variant="outline" size="lg" className="hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all">
                  Load More Events
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
      
      <EventDetailsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={selectedEvent}
      />
    </div>
  );
};

export default Gallery;
