import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Users, ArrowRight, Star, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface GalleryItem {
  id: string;
  title: string;
  couple: string;
  location: string;
  category: string;
  description: string;
  cover_image: string;
  package: string | null;
  services: string[] | null;
  guest_count: number | null;
  event_date: string | null;
}

const RecentEvents = () => {
  const [recentEvents, setRecentEvents] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRecentEvents()
  }, [])

  const fetchRecentEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(4)

      if (error) throw error
      setRecentEvents(data || [])
    } catch (error) {
      console.error('Error fetching recent events:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-7 bg-gradient-elegant">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-7 bg-gradient-elegant">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 text-sm font-medium text-primary mb-4">
            <Star className="h-4 w-4" />
            <span>Recent Success Stories</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-heading font-bold text-foreground mb-6">
            Featured Recent
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Events
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover the magic we've created for our clients. Each event tells a unique story of celebration, connection, and unforgettable moments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12">
          {recentEvents.map((event) => (
            <Card key={event.id} className="group overflow-hidden hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
              <div className="relative overflow-hidden">
                <div 
                  className="h-48 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundImage: `url(${event.cover_image || '/placeholder.svg'})` }}
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary text-primary-foreground">
                    {event.category}
                  </Badge>
                </div>
                {event.package && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-background/90 backdrop-blur-sm text-foreground border border-primary/20">
                      <Package className="h-3 w-3 mr-1" />
                      {event.package}
                    </Badge>
                  </div>
                )}
              </div>
              
              <CardContent className="p-4 sm:p-6">
                <h3 className="font-heading font-semibold text-base sm:text-lg mb-1 sm:mb-2 group-hover:text-primary transition-colors line-clamp-1">
                  {event.title}
                </h3>
                
                <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">
                  {event.couple}
                </p>
                
                {event.description && (
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 line-clamp-2">
                    {event.description}
                  </p>
                )}
                
                <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
                  {event.event_date && (
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span className="truncate">{new Date(event.event_date).toLocaleDateString()}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  {event.guest_count && (
                    <div className="flex items-center space-x-2">
                      <Users className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span className="truncate">{event.guest_count} guests</span>
                    </div>
                  )}
                  
                  {!event.package && event.services && event.services.length > 0 && (
                    <div className="pt-2 border-t">
                      <p className="text-xs font-medium mb-1.5">Services:</p>
                      <div className="flex flex-wrap gap-1">
                        {event.services.slice(0, 3).map((service, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs px-1.5 py-0.5">
                            {service}
                          </Badge>
                        ))}
                        {event.services.length > 3 && (
                          <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                            +{event.services.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/gallery">
            <Button size="lg" className="group">
              View All Our Events
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentEvents;