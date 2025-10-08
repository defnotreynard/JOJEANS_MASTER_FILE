import React from 'react';
import { Eye, Heart, Share2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const InspirationGallery = () => {
  const inspirationItems = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=800&fit=crop',
      title: 'Romantic Garden Wedding',
      couple: 'Emma & James',
      location: 'Napa Valley, CA',
      style: 'Romantic',
      likes: 234,
      views: 1240
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=600&h=600&fit=crop',
      title: 'Modern Minimalist Ceremony',
      couple: 'Sarah & David',
      location: 'Los Angeles, CA',
      style: 'Modern',
      likes: 189,
      views: 892
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=900&fit=crop',
      title: 'Boho Beach Celebration',
      couple: 'Luna & Alex',
      location: 'Malibu, CA',
      style: 'Boho',
      likes: 345,
      views: 1580
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=700&fit=crop',
      title: 'Vintage Rustic Barn',
      couple: 'Grace & Michael',
      location: 'Hudson Valley, NY',
      style: 'Rustic',
      likes: 287,
      views: 1120
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=600&h=650&fit=crop',
      title: 'Classic Ballroom Elegance',
      couple: 'Isabella & William',
      location: 'Chicago, IL',
      style: 'Classic',
      likes: 412,
      views: 2140
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=850&fit=crop',
      title: 'Whimsical Garden Party',
      couple: 'Lily & Thomas',
      location: 'Charleston, SC',
      style: 'Whimsical',
      likes: 198,
      views: 756
    }
  ];

  const getGridClass = (index: number) => {
    const patterns = [
      'md:row-span-2', // tall
      '', // normal
      'md:row-span-2', // tall
      '', // normal
      'md:row-span-2', // tall
      '' // normal
    ];
    return patterns[index % patterns.length];
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground">
            Real Wedding Inspiration
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover stunning real weddings from couples around the world. Get inspired by their unique styles, venues, and special moments.
          </p>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in">
          {['All Styles', 'Romantic', 'Modern', 'Boho', 'Classic', 'Rustic', 'Whimsical'].map((style) => (
            <Badge 
              key={style}
              variant={style === 'All Styles' ? 'default' : 'secondary'}
              className={`px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors ${
                style === 'All Styles' ? 'bg-primary text-primary-foreground' : ''
              }`}
            >
              {style}
            </Badge>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-max mb-12">
          {inspirationItems.map((item, index) => (
            <Card 
              key={item.id}
              className={`group overflow-hidden hover:shadow-card transition-all duration-300 animate-fade-in ${getGridClass(index)}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="flex items-center space-x-2 w-full">
                    <Button size="sm" variant="secondary" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Style Badge */}
                <Badge 
                  className="absolute top-3 left-3 bg-background/90 text-foreground"
                >
                  {item.style}
                </Badge>
              </div>

              <CardContent className="p-4 space-y-2">
                <h3 className="font-heading font-semibold text-lg leading-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.couple} • {item.location}
                </p>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Heart className="h-3 w-3" />
                      <span>{item.likes}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{item.views}</span>
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center animate-fade-in-up">
          <Button variant="outline" size="lg" className="hover:bg-primary hover:text-primary-foreground">
            Load More Inspiration
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InspirationGallery;