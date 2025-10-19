import React, { useState, useEffect, useRef } from 'react';
import { Heart, ChevronDown, Menu, X, Search, User, LogOut, ArrowRight, Image, Package, MapPin, Sparkles } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useAuth } from '@/hooks/useAuth';
import { AuthModal } from '@/components/AuthModal';
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";

interface SearchResult {
  id: string;
  title: string;
  type: "gallery" | "service" | "package" | "venue";
  link: string;
  description?: string;
  image?: string;
}

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [packagesOpen, setPackagesOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const services = [
    { title: "Event Coordination", link: "/services#coordination", description: "Professional event planning and coordination" },
    { title: "Styling and Decors", link: "/services#styling-decors", description: "Beautiful event styling and decoration" },
    { title: "Catering Services", link: "/services#catering", description: "Premium catering and food services" },
    { title: "Photo and Video", link: "/services#photo-video", description: "Professional photography and videography" },
    { title: "Sounds and Lights", link: "/services#sounds-lights", description: "Audio and lighting equipment" },
    { title: "Cakes / Pica-pica", link: "/services#cakes-pica", description: "Delicious cakes and appetizers" },
    { title: "Invitation / Giveaways", link: "/services#invitation-giveaways", description: "Custom invitations and party favors" },
    { title: "HMUA / Host", link: "/services#hmua-host", description: "Hair, makeup, and event hosting" },
    { title: "Attires / Bouquets", link: "/services#attires-bouquets", description: "Wedding attires and floral arrangements" },
    { title: "Bridal Car", link: "/services#bridal-car", description: "Luxury transportation services" },
    { title: "Ceiling Works", link: "/services#ceiling-works", description: "Elegant ceiling installations" },
    { title: "LED Wall", link: "/services#led-wall", description: "LED display and entrance designs" },
  ];

  const packages = [
    { title: "Silver Package", link: "/packages/silver", description: "#50A • ₱69,000", code: "#50A" },
    { title: "Gold Package", link: "/packages/gold", description: "#100A • ₱95,000", code: "#100A" },
    { title: "Platinum Package", link: "/packages/platinum", description: "#100D • ₱199,000", code: "#100D" },
  ];

  const pages = [
    { title: "Gallery", link: "/gallery", description: "View our event portfolio" },
    { title: "Venues", link: "/venues", description: "Explore available venues" },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchContent = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        setShowResults(false);
        return;
      }

      setLoading(true);
      setShowResults(true);
      const query = searchQuery.toLowerCase().trim();
      const results: SearchResult[] = [];

      try {
        const { data: galleryItems } = await supabase
          .from("gallery")
          .select("id, title, location, cover_image, category")
          .eq("status", "published")
          .or(`title.ilike.%${query}%,location.ilike.%${query}%,category.ilike.%${query}%`)
          .limit(5);

        if (galleryItems) {
          galleryItems.forEach((item) => {
            results.push({
              id: item.id,
              title: item.title,
              type: "gallery",
              link: "/gallery",
              description: item.location || undefined,
              image: item.cover_image || undefined,
            });
          });
        }
      } catch (error) {
        console.error("Error searching gallery:", error);
      }

      services.forEach((service) => {
        if (service.title.toLowerCase().includes(query) || service.description.toLowerCase().includes(query)) {
          results.push({
            id: service.link,
            title: service.title,
            type: "service",
            link: service.link,
            description: service.description,
          });
        }
      });

      packages.forEach((pkg) => {
        if (
          pkg.title.toLowerCase().includes(query) ||
          pkg.description.toLowerCase().includes(query) ||
          pkg.code.toLowerCase().includes(query)
        ) {
          results.push({
            id: pkg.link,
            title: pkg.title,
            type: "package",
            link: pkg.link,
            description: pkg.description,
          });
        }
      });

      pages.forEach((page) => {
        if (page.title.toLowerCase().includes(query) || page.description.toLowerCase().includes(query)) {
          results.push({
            id: page.link,
            title: page.title,
            type: "venue",
            link: page.link,
            description: page.description,
          });
        }
      });

      setSearchResults(results);
      setLoading(false);
    };

    const debounceTimer = setTimeout(searchContent, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleResultClick = (link: string) => {
    navigate(link);
    setShowResults(false);
    setSearchQuery("");
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "gallery":
        return <Image className="h-4 w-4" />;
      case "service":
        return <Sparkles className="h-4 w-4" />;
      case "package":
        return <Package className="h-4 w-4" />;
      case "venue":
        return <MapPin className="h-4 w-4" />;
      default:
        return <Search className="h-4 w-4" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const variants: Record<string, string> = {
      gallery: "default",
      service: "secondary",
      package: "outline",
      venue: "outline",
    };
    return variants[type] || "default";
  };

  const weddingPackages = [
    { name: "Silver Package", href: "/packages/silver", promoCode: "#50A", price: "₱69,000" },
    { name: "Gold Package", href: "/packages/gold", promoCode: "#100A", price: "₱95,000" },
    { name: "Platinum Package", href: "/packages/platinum", promoCode: "#100D", price: "₱199,000" }
  ];


  const galleryCategories = {
    "Gallery Styles": [
      "Classic Elegance", "Modern Chic", "Rustic Charm", "Bohemian",
      "Garden Party", "Beach Wedding", "Destination Wedding", "Intimate Ceremonies"
    ]
  };

  const shopCategories = {
    "Event Supplies": [
      "Decorations", "Linens & Textiles", "Centerpieces", "Lighting",
      "Signage & Stationery", "Party Favors", "Audio Equipment", "Furniture Rental"
    ],
    "Wedding Essentials": [
      "Bridal Accessories", "Groom's Collection", "Wedding Favors", "Guest Books",
      "Unity Candles", "Ring Pillows", "Flower Girl Baskets", "Card Boxes"
    ],
    "Gift Registry": [
      "Create Registry", "Browse Registries", "Gift Cards", "Personalized Gifts",
      "Home & Living", "Experience Gifts", "Charitable Donations"
    ]
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              {/* <Heart className="h-8 w-8 text-primary" /> */}
              <span className="text-2xl font-heading font-bold bg-gradient-primary bg-clip-text text-transparent">
                Jojeans Events
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:space-x-6">
              <NavigationMenu>
                <NavigationMenuList>
                  {/* Packages/Services */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Packages & Services</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-6 p-6 w-[800px] grid-cols-3">
                        <div>
                          <h4 className="text-sm font-semibold mb-3 text-primary">Jojeans Packages</h4>
                          <ul className="space-y-2">
                            {weddingPackages.map((pkg) => (
                              <li key={pkg.name}>
                                <Link 
                                  to={pkg.href} 
                                  className="flex items-center justify-between p-2 rounded-lg hover:bg-accent transition-colors group"
                                >
                                  <div>
                                    <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                      {pkg.name}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      {pkg.promoCode} • {pkg.price}
                                    </div>
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold mb-3 text-primary">Jojeans Services</h4>
                          <ul className="space-y-2">
                            <li><Link to="/services#coordination" className="text-sm text-muted-foreground hover:text-primary transition-colors">Coordination</Link></li>
                            <li><Link to="/services#styling-decors" className="text-sm text-muted-foreground hover:text-primary transition-colors">Styling and Decors</Link></li>
                            <li><Link to="/services#catering" className="text-sm text-muted-foreground hover:text-primary transition-colors">Catering Services</Link></li>
                            <li><Link to="/services#photo-video" className="text-sm text-muted-foreground hover:text-primary transition-colors">Photo and Video</Link></li>
                            <li><Link to="/services#sounds-lights" className="text-sm text-muted-foreground hover:text-primary transition-colors">Sounds and Lights</Link></li>
                            <li><Link to="/services#cakes-pica" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cakes / Pica-pica</Link></li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold mb-3 text-primary invisible">Jojeans Services</h4>
                          <ul className="space-y-2">
                            <li><Link to="/services#invitation-giveaways" className="text-sm text-muted-foreground hover:text-primary transition-colors">Invitation / Giveaways</Link></li>
                            <li><Link to="/services#hmua-host" className="text-sm text-muted-foreground hover:text-primary transition-colors">HMUA / Host</Link></li>
                            <li><Link to="/services#attires-bouquets" className="text-sm text-muted-foreground hover:text-primary transition-colors">Attires / Bouquets</Link></li>
                            <li><Link to="/services#bridal-car" className="text-sm text-muted-foreground hover:text-primary transition-colors">Bridal Car</Link></li>
                            <li><Link to="/services#ceiling-works" className="text-sm text-muted-foreground hover:text-primary transition-colors">Ceiling Works/Glass Dance Floor</Link></li>
                            <li><Link to="/services#led-wall" className="text-sm text-muted-foreground hover:text-primary transition-colors">LED Wall/Entrance Tunnel</Link></li>
                          </ul>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>


                  {/* Gallery */}
                  <NavigationMenuItem>
                    <Link to="/gallery" className="inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                      Gallery
                    </Link>
                  </NavigationMenuItem>

                  {/* Venues */}
                  <NavigationMenuItem>
                    <Link to="/venues" className="inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                      Venues
                    </Link>
                  </NavigationMenuItem>

                  {/* Shop */}
                  {/* <NavigationMenuItem>
                    <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-6 p-6 w-[800px] grid-cols-3">
                        {Object.entries(shopCategories).map(([category, items]) => (
                          <div key={category}>
                            <h4 className="text-sm font-semibold mb-3 text-primary">{category}</h4>
                            <ul className="space-y-2">
                              {items.map((item) => (
                                <li key={item}>
                                  <Link to="/shop" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    {item}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem> */}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Right side - Search, Login, Mobile menu */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 relative" ref={searchRef}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => searchQuery && setShowResults(true)}
                    className="pl-10 w-[200px] lg:w-[300px]"
                  />
                </div>
                
                {showResults && (
                  <div className="absolute top-full right-0 mt-2 w-[400px] bg-popover border border-border rounded-lg shadow-lg z-50 max-h-[500px] overflow-hidden">
                    <ScrollArea className="h-full max-h-[500px]">
                      {loading && (
                        <div className="flex items-center justify-center py-8">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                        </div>
                      )}

                      {!loading && searchQuery && searchResults.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-8 text-center px-4">
                          <Search className="h-12 w-12 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">No results found</p>
                          <p className="text-xs text-muted-foreground mt-1">Try searching for services, packages, or gallery items</p>
                        </div>
                      )}

                      {!loading && searchResults.length > 0 && (
                        <div className="p-2 space-y-1">
                          {searchResults.map((result) => (
                            <button
                              key={result.id}
                              onClick={() => handleResultClick(result.link)}
                              className="w-full p-3 rounded-lg hover:bg-accent transition-colors text-left group"
                            >
                              <div className="flex items-start gap-3">
                                {result.image && (
                                  <img
                                    src={result.image}
                                    alt={result.title}
                                    className="w-16 h-16 object-cover rounded-md"
                                  />
                                )}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    {getIcon(result.type)}
                                    <h4 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                                      {result.title}
                                    </h4>
                                    <Badge variant={getTypeBadge(result.type) as any} className="ml-auto text-xs">
                                      {result.type}
                                    </Badge>
                                  </div>
                                  {result.description && (
                                    <p className="text-xs text-muted-foreground line-clamp-1">{result.description}</p>
                                  )}
                                </div>
                                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </ScrollArea>
                  </div>
                )}
              </div>
              
              {/* Auth Section */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {user.email?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden md:inline text-sm">{user.email}</span>
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2 text-red-600">
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="hidden md:flex items-center space-x-2"
                    onClick={() => {
                      setAuthMode("signin");
                      setAuthModalOpen(true);
                    }}
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden lg:inline">Sign In</span>
                  </Button>

                  <Button 
                    variant="default" 
                    size="sm" 
                    className="hidden md:flex"
                    onClick={() => {
                      setAuthMode("signup");
                      setAuthModalOpen(true);
                    }}
                  >
                    <span className="hidden lg:inline">Start Planning</span>
                    <User className="lg:hidden h-4 w-4" />
                  </Button>
                </>
              )}

              {/* Mobile menu */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-2 pb-4 border-b">
                      <Heart className="h-6 w-6 text-primary" />
                      <span className="text-xl font-heading font-bold">Jojeans Events</span>
                    </div>
                    
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-full"
                      />
                    </div>
                    
                    {searchQuery && (
                      <div className="mt-2 space-y-1">
                        {loading && (
                          <div className="flex items-center justify-center py-4">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
                          </div>
                        )}

                        {!loading && searchResults.length === 0 && (
                          <div className="flex flex-col items-center justify-center py-4 text-center">
                            <Search className="h-8 w-8 text-muted-foreground mb-2" />
                            <p className="text-xs text-muted-foreground">No results found</p>
                          </div>
                        )}

                        {!loading && searchResults.length > 0 && searchResults.map((result) => (
                          <button
                            key={result.id}
                            onClick={() => {
                              handleResultClick(result.link);
                              setIsOpen(false);
                            }}
                            className="w-full p-2 rounded-lg hover:bg-accent transition-colors text-left"
                          >
                            <div className="flex items-center gap-2">
                              {getIcon(result.type)}
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm text-foreground">{result.title}</p>
                                {result.description && (
                                  <p className="text-xs text-muted-foreground line-clamp-1">{result.description}</p>
                                )}
                              </div>
                              <Badge variant={getTypeBadge(result.type) as any} className="text-xs">
                                {result.type}
                              </Badge>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                    
                    <div className="space-y-3 pt-4">
                      {/* Packages Collapsible */}
                      <Collapsible open={packagesOpen} onOpenChange={setPackagesOpen}>
                        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-lg font-medium">
                          Packages
                          <ChevronDown className={`h-4 w-4 transition-transform ${packagesOpen ? 'rotate-180' : ''}`} />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="pl-4 space-y-2 pt-2">
                          {weddingPackages.map((pkg) => (
                            <Link 
                              key={pkg.name}
                              to={pkg.href} 
                              className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                              onClick={() => setIsOpen(false)}
                            >
                              {pkg.name} <span className="text-xs">({pkg.promoCode})</span>
                            </Link>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>

                      {/* Services Collapsible */}
                      <Collapsible open={servicesOpen} onOpenChange={setServicesOpen}>
                        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-lg font-medium">
                          Services
                          <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="pl-4 space-y-2 pt-2">
                          <Link to="/services#coordination" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                            Coordination
                          </Link>
                          <Link to="/services#styling-decors" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                            Styling and Decors
                          </Link>
                          <Link to="/services#catering" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                            Catering Services
                          </Link>
                          <Link to="/services#photo-video" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                            Photo and Video
                          </Link>
                          <Link to="/services#sounds-lights" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                            Sounds and Lights
                          </Link>
                          <Link to="/services#cakes-pica" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                            Cakes / Pica-pica
                          </Link>
                          <Link to="/services#invitation-giveaways" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                            Invitation / Giveaways
                          </Link>
                          <Link to="/services#hmua-host" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                            HMUA / Host
                          </Link>
                          <Link to="/services#attires-bouquets" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                            Attires / Bouquets
                          </Link>
                          <Link to="/services#bridal-car" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                            Bridal Car
                          </Link>
                          <Link to="/services#ceiling-works" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                            Ceiling Works/Glass Dance Floor
                          </Link>
                          <Link to="/services#led-wall" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                            LED Wall/Entrance Tunnel
                          </Link>
                        </CollapsibleContent>
                      </Collapsible>

                      <Link to="/gallery" className="block py-2 text-lg font-medium" onClick={() => setIsOpen(false)}>
                        Gallery
                      </Link>
                      <Link to="/venues" className="block py-2 text-lg font-medium" onClick={() => setIsOpen(false)}>
                        Venues
                      </Link>
                    </div>
                    
                    {/* Mobile Auth Section */}
                    <div className="space-y-2 pt-6 border-t">
                      {user ? (
                        <>
                          <Button variant="outline" className="w-full justify-start" asChild>
                            <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                              <User className="mr-2 h-4 w-4" />
                              Dashboard
                            </Link>
                          </Button>
                          <Button variant="outline" className="w-full justify-start text-red-600" onClick={() => {
                            handleSignOut();
                            setIsOpen(false);
                          }}>
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign Out
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button 
                            variant="outline" 
                            className="w-full" 
                            onClick={() => {
                              setAuthMode("signin");
                              setAuthModalOpen(true);
                              setIsOpen(false);
                            }}
                          >
                            Sign In
                          </Button>
                          <Button 
                            className="w-full"
                            onClick={() => {
                              setAuthMode("signup");
                              setAuthModalOpen(true);
                              setIsOpen(false);
                            }}
                          >
                            Start Planning
                          </Button>
                        </>
                      )}
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)}
        defaultMode={authMode}
      />
    </>
  );
};

export default Navigation;