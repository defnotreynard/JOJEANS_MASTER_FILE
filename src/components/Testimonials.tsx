import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah & Michael Chen',
      location: 'Dumaguete, Philippines',
      wedding_date: 'September 2024',
      rating: 5,
      text: "Jojeans Events made our wedding planning journey absolutely magical! From the initial checklist to finding our dream venue, every tool was intuitive and helpful. We couldn't have done it without them!",
      image: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=100&h=100&fit=crop&crop=faces'
    },
    {
      id: 2,
      name: 'Emma & James Rodriguez',
      location: 'Dumaguete, Philippines',
      wedding_date: 'May 2024',
      rating: 5,
      text: "The planning tools were a game-changer! We found our photographer, florist, and caterer all through Jojeans. The reviews were spot-on and helped us make confident decisions.",
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces'
    },
    {
      id: 3,
      name: 'Isabella & David Park',
      location: 'Dumaguete, Philippines',
      wedding_date: 'October 2024',
      rating: 5,
      text: "The budget calculator saved us thousands! Being able to track every expense and get alerts when we were going over budget kept our wedding stress-free and on track.",
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b137?w=100&h=100&fit=crop&crop=faces'
    },
    {
      id: 4,
      name: 'Grace & William Johnson',
      location: 'Dumaguete, Philippines',
      wedding_date: 'March 2024',
      rating: 5,
      text: "We loved the guest management system! RSVPs were so easy to track, and the seating chart tool made our reception planning effortless. Highly recommend!",
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces'
    }
  ];

  return (
    <section className="py-2 bg-accent/20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground">
            What Happy Couples Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of couples who have planned their perfect wedding with Jojeans Events. 
            Here's what they have to say about their experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id}
              className="relative p-6 hover:shadow-card transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0 space-y-6">
                {/* Quote icon */}
                <Quote className="h-8 w-8 text-primary/30" />
                
                {/* Rating */}
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-wedding-gold text-wedding-gold" />
                  ))}
                </div>

                {/* Testimonial text */}
                <blockquote className="text-lg leading-relaxed text-foreground">
                  "{testimonial.text}"
                </blockquote>

                {/* Author info */}
                <div className="flex items-center space-x-4 pt-4 border-t">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.location} • Married {testimonial.wedding_date}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 animate-fade-in-up">
          <div className="text-center space-y-2">
            <div className="text-4xl lg:text-5xl font-heading font-bold text-primary">50,000+</div>
            <div className="text-lg text-muted-foreground">Happy Couples</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl lg:text-5xl font-heading font-bold text-wedding-gold">10,000+</div>
            <div className="text-lg text-muted-foreground">Events Completed</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl lg:text-5xl font-heading font-bold text-wedding-sage">4.9★</div>
            <div className="text-lg text-muted-foreground">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;