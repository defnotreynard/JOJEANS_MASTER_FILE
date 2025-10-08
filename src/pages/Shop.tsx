import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ShoppingCart, Star, Filter, Search, Heart, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const Shop = () => {
  const categories = [
    {
      id: 1,
      name: "Event Decorations",
      itemCount: 245,
      image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      name: "Wedding Essentials",
      itemCount: 189,
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      name: "Party Supplies",
      itemCount: 156,
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      name: "Lighting & Audio",
      itemCount: 98,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Crystal Chandelier Centerpiece",
      price: "$299.99",
      originalPrice: "$399.99",
      rating: 4.8,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      badge: "Best Seller",
      inStock: true
    },
    {
      id: 2,
      name: "Vintage Gold Table Runners",
      price: "$45.99",
      originalPrice: null,
      rating: 4.9,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      badge: "New Arrival",
      inStock: true
    },
    {
      id: 3,
      name: "LED String Light Set",
      price: "$79.99",
      originalPrice: "$99.99",
      rating: 4.7,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      badge: "Sale",
      inStock: true
    },
    {
      id: 4,
      name: "Personalized Guest Book",
      price: "$89.99",
      originalPrice: null,
      rating: 5.0,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1544277132-1ce59ef47ceb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      badge: "Custom",
      inStock: false
    },
    {
      id: 5,
      name: "Elegant Candle Collection",
      price: "$129.99",
      originalPrice: "$159.99",
      rating: 4.6,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1602827114994-3b6bb2b9c1b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      badge: "Popular",
      inStock: true
    },
    {
      id: 6,
      name: "Premium Linen Napkin Set",
      price: "$34.99",
      originalPrice: null,
      rating: 4.8,
      reviews: 91,
      image: "https://images.unsplash.com/photo-1571612445449-e9a82a1ecaa0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      badge: null,
      inStock: true
    }
  ];

  const getBadgeColor = (badge) => {
    switch(badge) {
      case 'Best Seller': return 'bg-primary text-primary-foreground';
      case 'New Arrival': return 'bg-wedding-gold text-white';
      case 'Sale': return 'bg-destructive text-destructive-foreground';
      case 'Custom': return 'bg-wedding-blush text-wedding-charcoal';
      case 'Popular': return 'bg-accent text-accent-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-hero text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl lg:text-7xl font-heading font-bold mb-6">
                Event
                <span className="block bg-gradient-to-r from-wedding-gold to-wedding-cream bg-clip-text text-transparent">
                  Shop
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
                Discover everything you need to create magical moments. From elegant decorations to personalized keepsakes, find the perfect items for your special event.
              </p>
              <div className="flex items-center justify-center space-x-8">
                <div className="flex items-center space-x-2">
                  <ShoppingCart className="h-5 w-5 text-wedding-gold" />
                  <span>Premium Quality</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Gift className="h-5 w-5 text-wedding-cream" />
                  <span>Fast Shipping</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search & Filter Section */}
        <section className="py-12 bg-background border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search products..." 
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  Sort by: Popular
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-7">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
                Shop by Category
              </h2>
              <p className="text-lg text-muted-foreground">
                Find exactly what you need for your perfect event
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Card key={category.id} className="overflow-hidden hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                  <div className="relative">
                    <div 
                      className="h-32 bg-cover bg-center"
                      style={{ backgroundImage: `url(${category.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white">
                      <h3 className="font-semibold text-lg">{category.name}</h3>
                      <p className="text-sm opacity-90">{category.itemCount} items</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-7 bg-gradient-elegant">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
                Featured Products
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Handpicked favorites that our customers love. Quality products that make every event extraordinary.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
                  <div className="relative">
                    <div 
                      className="h-48 bg-cover bg-center"
                      style={{ backgroundImage: `url(${product.image})` }}
                    />
                    {product.badge && (
                      <div className="absolute top-3 left-3">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${getBadgeColor(product.badge)}`}>
                          {product.badge}
                        </span>
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-white text-foreground px-3 py-1 rounded-full text-sm font-medium">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                    
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-wedding-gold fill-current" />
                        <span className="text-sm font-medium ml-1">{product.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-primary">{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {product.originalPrice}
                          </span>
                        )}
                      </div>
                      <Button 
                        size="sm" 
                        disabled={!product.inStock}
                        className="disabled:opacity-50"
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" variant="outline">
                View All Products
              </Button>
            </div>
          </div>
        </section>

        {/* Gift Registry CTA */}
        <section className="py-7 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
              Create Your Gift Registry
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Make it easy for friends and family to give you exactly what you want. Create a personalized registry with all your favorite items.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                Create Registry
                <Gift className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Browse Registries
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Shop;