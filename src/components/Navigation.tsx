import React, { useState } from 'react';
import { Heart, ChevronDown, Menu, X, Search, User, LogOut, ArrowRight } from 'lucide-react';
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
import { useAuth } from '@/hooks/useAuth';
import { AuthModal } from '@/components/AuthModal';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const location = useLocation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
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
              <div className="hidden md:flex items-center space-x-2">
                <Search className="h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Search..." 
                  className="w-32 lg:w-48 h-9"
                />
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
                    
                    <div className="flex items-center space-x-2 pt-2">
                      <Search className="h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search..." className="h-8" />
                    </div>
                    
                    <div className="space-y-3 pt-4">
                      <Link to="/packages" className="block py-2 text-lg font-medium" onClick={() => setIsOpen(false)}>
                        Packages/Services
                      </Link>
                      <Link to="/gallery" className="block py-2 text-lg font-medium" onClick={() => setIsOpen(false)}>
                        Gallery
                      </Link>
                      <Link to="/venues" className="block py-2 text-lg font-medium" onClick={() => setIsOpen(false)}>
                        Venues
                      </Link>
                      <Link to="/shop" className="block py-2 text-lg font-medium" onClick={() => setIsOpen(false)}>
                        Shop
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