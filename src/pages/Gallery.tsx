import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
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
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublishedGalleryItems();
  }, []);

  const fetchPublishedGalleryItems = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .eq('status', 'published')
        .order('event_date', { ascending: false });

      if (error) throw error;
      
      setGalleryItems(data || []);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      toast({
        title: 'Error',
        description: 'Failed to load gallery items',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getImageHeight = (index: number) => {
    const heights = ['300px', '400px', '350px', '380px', '320px', '420px'];
    return heights[index % heights.length];
  };

  const filteredItems = galleryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (item.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (item.location || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = styleFilter === 'all' || item.category === styleFilter;
    
    return matchesSearch && matchesCategory;
  });

  const handleCardClick = (item: any) => {
    setSelectedEvent(item);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background page-transition">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background page-transition">
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
        <section className="py-8 border-b bg-card/50 backdrop-blur-sm top-16 z-40">
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

                {/* Event Category Filter */}
                <Select value={styleFilter} onValueChange={setStyleFilter}>
                  <SelectTrigger className="h-12 bg-background">
                    <SelectValue placeholder="Event Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="wedding">Wedding</SelectItem>
                    <SelectItem value="corporate">Corporate</SelectItem>
                    <SelectItem value="birthday">Birthday</SelectItem>
                    <SelectItem value="debut">Debut</SelectItem>
                  </SelectContent>
                </Select>

                <div className="h-12 bg-muted/20 rounded-md flex items-center justify-center text-sm text-muted-foreground">
                  {filteredItems.length} {filteredItems.length === 1 ? 'event' : 'events'} found
                </div>
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
                      {item.images && item.images.length > 0 ? (
                      <img 
                        src={item.cover_image || (item.images && item.images.length > 0 ? item.images[0] : "")}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <span className="text-muted-foreground">No image</span>
                        </div>
                      )}
                      
                      {/* Category Badge */}
                      <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground backdrop-blur-sm">
                        {item.category}
                      </Badge>
                    </div>

                    <CardContent className="p-5 space-y-3">
                      <div>
                        <h3 className="font-heading font-semibold text-base leading-tight mb-1.5">
                          {item.title}
                        </h3>
                        {item.location && (
                          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                            <span>{item.location}</span>
                          </p>
                        )}
                      </div>
                      
                      {item.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {item.description}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                        {item.event_date && (
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{new Date(item.event_date).toLocaleDateString()}</span>
                          </div>
                        )}
                        {item.guest_count && (
                          <div className="flex items-center gap-1.5">
                            <Users className="h-3.5 w-3.5" />
                            <span>{item.guest_count}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <Button size="sm" variant="ghost" className="h-7 px-2">
                            View Details
                          </Button>
                        </div>
                        <Badge variant="outline" className="text-xs">{item.venue}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
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
