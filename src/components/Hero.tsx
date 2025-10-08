import React from 'react';
import { ArrowRight, Calendar, Users, Star, Award, Building, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import eventHeroImage from '@/assets/event-hero.jpg';

const Hero = () => {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(0, 191, 166, 0.8), rgba(0, 191, 166, 0.6)), url(${eventHeroImage})`,
        }}
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-dark/20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Hero Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-background/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-white">
                <PartyPopper className="h-4 w-4" />
                <span>Professional Event Management</span>
              </div>
              
              <h1 className="text-5xl lg:text-8xl font-heading font-bold text-white leading-tight">
                Create
                <span className="block bg-gradient-to-r from-wedding-gold to-wedding-cream bg-clip-text text-transparent">
                  Unforgettable
                </span>
                <span className="block text-white">Events</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed max-w-2xl">
                From corporate galas to intimate celebrations - we bring your vision to life with seamless planning, premium services, and flawless execution.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90 shadow-glow group"
              >
                Start Planning Your Event
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-white/50 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                View Our Packages
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              <div className="flex items-center space-x-2 text-white/90">
                <Star className="h-5 w-5 text-wedding-gold" />
                <div>
                  <div className="font-bold">500+</div>
                  <div className="text-sm">Events Completed</div>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-white/90">
                <Users className="h-5 w-5 text-wedding-cream" />
                <div>
                  <div className="font-bold">1000+</div>
                  <div className="text-sm">Happy Clients</div>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-white/90">
                <Building className="h-5 w-5 text-wedding-gold" />
                <div>
                  <div className="font-bold">200+</div>
                  <div className="text-sm">Premium Venues</div>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-white/90">
                <Award className="h-5 w-5 text-wedding-cream" />
                <div>
                  <div className="font-bold">5 Star</div>
                  <div className="text-sm">Rated Service</div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Visual - Event Dashboard Preview */}
          <div className="relative animate-fade-in-up">
            <div className="relative bg-background/95 backdrop-blur-sm rounded-3xl p-8 shadow-elegant">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-heading font-semibold">Corporate Annual Gala</h3>
                  <span className="text-sm text-muted-foreground bg-accent rounded-full px-3 py-1">Active Event</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary/10 rounded-lg p-4">
                    <div className="text-2xl font-bold text-primary">245</div>
                    <div className="text-sm text-muted-foreground">Guests Confirmed</div>
                  </div>
                  <div className="bg-wedding-gold/20 rounded-lg p-4">
                    <div className="text-2xl font-bold text-wedding-charcoal">$85K</div>
                    <div className="text-sm text-muted-foreground">Budget Allocated</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span className="text-sm">Venue secured ✓</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span className="text-sm">Catering confirmed ✓</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span className="text-sm">Entertainment booked ✓</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-muted rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Final headcount pending</span>
                  </div>
                </div>
                
                <Button className="w-full" variant="outline">
                  View Event Dashboard
                </Button>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-wedding-gold/30 backdrop-blur-sm rounded-full p-3 animate-glow">
              <Award className="h-6 w-6 text-wedding-gold" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-primary/30 backdrop-blur-sm rounded-full p-3 animate-glow">
              <PartyPopper className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;