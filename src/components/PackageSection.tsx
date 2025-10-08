import React from 'react';
import { ArrowRight, CheckCircle, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const PackageSection = () => {
  const featuredPackages = [
    {
      name: "🥈 Silver Package",
      price: "₱69,000",
      subtitle: "Minimalist Wedding",
      attendees: "Catering & Décor Only",
      features: ["3 menu choices", "Minimalist décor setup", "Basic program flow", "Free bridal bouquet"],
      path: "/packages/silver"
    },
    {
      name: "🥇 Gold Package", 
      price: "₱95,000",
      subtitle: "Classic Wedding",
      attendees: "Complete Wedding Essentials",
      features: ["3 menu choices", "Backdrop styling", "Choose 1 major freebie", "Photo coverage included"],
      popular: true,
      path: "/packages/gold"
    },
    {
      name: "💎 Platinum Package",
      price: "₱199,000", 
      subtitle: "All-in GOLD Wedding",
      attendees: "Luxury All-in Experience",
      features: ["Free whole lechon", "Church & venue styling", "Photography & prenup", "FREE venue & hotel room"],
      path: "/packages/platinum"
    }
  ];

  return (
    <section className="py-4 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-6xl font-heading font-bold text-foreground mb-6">
            Event Planning
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Packages
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Choose from our carefully crafted packages designed to make your event planning seamless and stress-free.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {featuredPackages.map((pkg, index) => (
            <Card key={index} className={`group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 ${pkg.popular ? 'ring-2 ring-primary' : ''}`}>
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-heading mb-2">{pkg.name}</CardTitle>
                <p className="text-lg text-muted-foreground mb-4">{pkg.subtitle}</p>
                <div className="text-4xl font-bold text-primary mb-4">{pkg.price}</div>
                <div className="text-sm text-muted-foreground">
                  {pkg.attendees}
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/packages/silver">
            <Button size="lg" className="group">
              View All Packages
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PackageSection;