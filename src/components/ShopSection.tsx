import React from 'react';
import { ArrowRight, Star, ShoppingBag, Gift, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const ShopSection = () => {
  const featuredProducts = [
    {
      name: "Elegant Table Centerpieces",
      price: "$45.99",
      rating: 4.9,
      category: "Decorations",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Premium Wedding Favors Set",
      price: "$24.99",
      rating: 4.8,
      category: "Favors",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Custom Event Signage",
      price: "$89.99",
      rating: 5.0,
      category: "Signage",
      image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Luxury Guest Book Set",
      price: "$34.99",
      rating: 4.7,
      category: "Accessories",
      image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ];

  const categories = [
    {
      name: "Decorations",
      icon: Sparkles,
      count: "150+ items",
      color: "text-pink-500"
    },
    {
      name: "Wedding Favors", 
      icon: Gift,
      count: "80+ items",
      color: "text-purple-500"
    },
    {
      name: "Event Supplies",
      icon: ShoppingBag,
      count: "200+ items", 
      color: "text-blue-500"
    }
  ];

  return (
    <section className="py-2">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-heading font-bold text-foreground mb-6">
            Event Shopping
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Boutique
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover premium event supplies, decorations, and accessories to make your celebration perfect.
          </p>
        </div>

        {/* Product Categories */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {categories.map((category, index) => (
            <Card key={index} className="hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 text-center">
              <CardContent className="p-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent mb-4`}>
                  <category.icon className={`h-8 w-8 ${category.color}`} />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-2">{category.name}</h3>
                <p className="text-muted-foreground">{category.count}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Products */}
        <div className="mb-12">
          <h3 className="text-2xl font-heading font-semibold text-center mb-8">Featured Products</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <div 
                    className="h-48 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundImage: `url(${product.image})` }}
                  />
                  <div className="absolute top-3 right-3">
                    <div className="bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                      <Star className="h-3 w-3 text-wedding-gold fill-current" />
                      <span className="text-xs font-medium">{product.rating}</span>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h4 className="font-heading font-semibold text-sm mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h4>
                  <div className="text-lg font-bold text-primary">{product.price}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Special Offers */}
        <div className="bg-gradient-primary rounded-2xl p-8 lg:p-12 text-white text-center mb-12">
          <h3 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
            Special Launch Offer
          </h3>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Get 20% off your first order when you spend $100 or more. Limited time offer for new customers.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
            Shop Now & Save
            <ShoppingBag className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <div className="text-center">
          <Link to="/shop">
            <Button size="lg" className="group">
              Browse All Products
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ShopSection;