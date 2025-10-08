import React from 'react';
import { ArrowRight, Heart, Calendar, Users, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const WeddingSection = () => {
  const weddingServices = [
    {
      title: "Wedding Planning",
      description: "Complete wedding coordination from engagement to 'I do'",
      icon: Calendar,
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Ceremony Design",
      description: "Beautiful ceremony setups tailored to your love story",
      icon: Heart,
      image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Reception Coordination",
      description: "Unforgettable receptions with seamless entertainment flow",
      icon: Users,
      image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ];

  const recentWeddings = [
    {
      couple: "Sarah & Michael",
      date: "March 2024",
      location: "Garden Estate",
      guests: 120,
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      couple: "Emma & James",
      date: "February 2024", 
      location: "Beachside Resort",
      guests: 85,
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <section className="py-20 bg-gradient-elegant">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-heading font-bold text-foreground mb-6">
            Dream Wedding
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Planning
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From intimate ceremonies to grand celebrations, we create magical moments that last a lifetime.
          </p>
        </div>

        {/* Wedding Services */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {weddingServices.map((service, index) => (
            <Card key={index} className="group overflow-hidden hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
              <div className="relative overflow-hidden">
                <div 
                  className="h-48 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundImage: `url(${service.image})` }}
                />
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/30 transition-colors" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-background/95 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary/10 rounded-lg p-2">
                        <service.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-heading font-semibold text-sm">{service.title}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Weddings */}
        <div className="mb-12">
          <h3 className="text-2xl font-heading font-semibold text-center mb-8">Recent Wedding Celebrations</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {recentWeddings.map((wedding, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <div 
                    className="h-64 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundImage: `url(${wedding.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h4 className="font-heading font-semibold text-xl mb-2">{wedding.couple}</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{wedding.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>{wedding.guests} guests</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <Camera className="h-4 w-4" />
                      <span>{wedding.location}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link to="/weddings">
            <Button size="lg" className="group">
              Explore Wedding Services
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WeddingSection;