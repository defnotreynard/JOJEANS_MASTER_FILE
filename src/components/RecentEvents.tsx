import React from 'react';
import { Calendar, MapPin, Users, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const RecentEvents = () => {
  const recentEvents = [
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
    }
  ];

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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {recentEvents.map((event) => (
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

        <div className="text-center">
          <Link to="/recent-events">
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