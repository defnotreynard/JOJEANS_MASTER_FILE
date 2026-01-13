import React from 'react';
import { Heart, Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const footerLinks = {
    'Planning': [
      'Wedding Checklist',
      'Budget Calculator',
      'Guest List Manager',
      'Timeline Planner'
    ],
    'Inspiration': [
      'Real Weddings',
      'Style Guides',
      'Venue Ideas',
      'Color Palettes',
      'Seasonal Themes'
    ],
    'Support': [
      'Help Center',
      'Contact Us',
      'FAQs',
      'Privacy Policy',
      'Terms of Service'
    ]
  };

  return (
    <footer className="bg-wedding-charcoal text-wedding-cream">

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary" />
              <span className="text-2xl font-heading font-bold text-wedding-cream">
                Jojeans Events
              </span>
            </div>
            
            <p className="text-wedding-cream/80 leading-relaxed">
              Making wedding planning beautiful, organized, and stress-free. 
              From engagement to "I do," we're here to help you plan the perfect day.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span>jojeansevents@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span>09923563871</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Dumaguete, Philippines</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-wedding-cream hover:text-primary hover:bg-primary/10 p-2">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-wedding-cream hover:text-primary hover:bg-primary/10 p-2">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-wedding-cream hover:text-primary hover:bg-primary/10 p-2">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-wedding-cream hover:text-primary hover:bg-primary/10 p-2">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h4 className="font-heading font-semibold text-lg text-wedding-cream">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-sm text-wedding-cream/70 hover:text-primary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-wedding-cream/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-wedding-cream/60">
              © 2024 Jojeans Events. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-wedding-cream/60 hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-wedding-cream/60 hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-wedding-cream/60 hover:text-primary transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;