import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Calendar, MapPin, Users, Star, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const RecentEvents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const allEvents = [
    {
      id: 1,
      title: "Tech Summit 2024 Conference",
      type: "Corporate Event",
      date: "March 15, 2024",
      location: "Grand Convention Center",
      attendees: 850,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.9,
      description: "A cutting-edge technology conference bringing together industry leaders and innovators."
    },
    {
      id: 2,
      title: "Sarah & Michael's Wedding",
      type: "Wedding",
      date: "February 28, 2024",
      location: "Oceanview Resort",
      attendees: 120,
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 5.0,
      description: "An elegant beachside wedding celebration with stunning sunset views."
    },
    {
      id: 3,
      title: "Annual Charity Gala",
      type: "Fundraising Event",
      date: "February 10, 2024",
      location: "Metropolitan Ballroom",
      attendees: 300,
      image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.8,
      description: "A glamorous evening raising funds for local children's charities."
    },
    {
      id: 4,
      title: "Product Launch Celebration",
      type: "Corporate Event",
      date: "January 25, 2024",
      location: "Innovation Hub",
      attendees: 200,
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.7,
      description: "An exciting launch event showcasing the latest product innovations."
    },
    {
      id: 5,
      title: "Emma & James Wedding",
      type: "Wedding",
      date: "January 20, 2024",
      location: "Garden Estate Venue",
      attendees: 85,
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.9,
      description: "An intimate garden wedding with fairy lights and natural beauty."
    },
    {
      id: 6,
      title: "Corporate Annual Meeting",
      type: "Corporate Event",
      date: "January 15, 2024",
      location: "Business Center Plaza",
      attendees: 500,
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.6,
      description: "Annual shareholders meeting with presentations and networking."
    },
    {
      id: 7,
      title: "New Year Celebration Gala",
      type: "Social Event",
      date: "December 31, 2023",
      location: "Luxury Hotel Ballroom",
      attendees: 400,
      image: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.8,
      description: "A spectacular New Year's Eve celebration with live entertainment."
    },
    {
      id: 8,
      title: "Holiday Company Party",
      type: "Corporate Event",
      date: "December 15, 2023",
      location: "Downtown Event Hall",
      attendees: 180,
      image: "https://images.unsplash.com/photo-1482575832494-09deb64b9368?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.7,
      description: "Annual holiday celebration for employees and their families."
    }
  ];

  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || event.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const eventTypes = [...new Set(allEvents.map(event => event.type))];

  return (
    <div className="min-h-screen bg-background page-transition">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-hero text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl lg:text-7xl font-heading font-bold mb-6">
                Recent Event
                <span className="block bg-gradient-to-r from-wedding-gold to-wedding-cream bg-clip-text text-transparent">
                  Showcases
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
                Explore our portfolio of successfully executed events. From intimate celebrations to grand galas, see how we bring dreams to life.
              </p>
              <div className="flex items-center justify-center space-x-8">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-wedding-gold" />
                  <span>500+ Events Completed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-wedding-cream" />
                  <span>50,000+ Happy Guests</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-background/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center space-x-4">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Filter Events:</span>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="All Event Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Event Types</SelectItem>
                    {eventTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-lg text-muted-foreground">
                Showing {filteredEvents.length} of {allEvents.length} events
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="group overflow-hidden hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
                  <div className="relative overflow-hidden">
                    <div 
                      className="h-48 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundImage: `url(${event.image})` }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                        {event.type}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                        <Star className="h-3 w-3 text-wedding-gold fill-current" />
                        <span className="text-xs font-medium">{event.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {event.description}
                    </p>
                    
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>{event.attendees} attendees</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <div className="text-center py-16">
                <h3 className="text-2xl font-heading font-semibold mb-4">No events found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filter criteria to find more events.
                </p>
                <Button onClick={() => {setSearchTerm(''); setFilterType('all');}}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
              Ready to Create Your Own Success Story?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let us help you plan an unforgettable event that your guests will be talking about for years to come.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                Start Planning Today
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Contact Our Team
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default RecentEvents;