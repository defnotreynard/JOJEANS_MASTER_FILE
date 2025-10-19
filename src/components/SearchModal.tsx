import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight, Image, Package, MapPin, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

interface SearchResult {
  id: string;
  title: string;
  type: "gallery" | "service" | "package" | "venue";
  link: string;
  description?: string;
  image?: string;
}

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    const searchContent = async () => {
      if (!searchQuery.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      const query = searchQuery.toLowerCase().trim();
      const searchResults: SearchResult[] = [];

      try {
        // Search gallery items
        const { data: galleryItems } = await supabase
          .from("gallery")
          .select("id, title, location, cover_image, category")
          .eq("status", "published")
          .or(`title.ilike.%${query}%,location.ilike.%${query}%,category.ilike.%${query}%`)
          .limit(5);

        if (galleryItems) {
          galleryItems.forEach((item) => {
            searchResults.push({
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

      // Search services
      services.forEach((service) => {
        if (service.title.toLowerCase().includes(query) || service.description.toLowerCase().includes(query)) {
          searchResults.push({
            id: service.link,
            title: service.title,
            type: "service",
            link: service.link,
            description: service.description,
          });
        }
      });

      // Search packages
      packages.forEach((pkg) => {
        if (
          pkg.title.toLowerCase().includes(query) ||
          pkg.description.toLowerCase().includes(query) ||
          pkg.code.toLowerCase().includes(query)
        ) {
          searchResults.push({
            id: pkg.link,
            title: pkg.title,
            type: "package",
            link: pkg.link,
            description: pkg.description,
          });
        }
      });

      // Search pages
      pages.forEach((page) => {
        if (page.title.toLowerCase().includes(query) || page.description.toLowerCase().includes(query)) {
          searchResults.push({
            id: page.link,
            title: page.title,
            type: "venue",
            link: page.link,
            description: page.description,
          });
        }
      });

      setResults(searchResults);
      setLoading(false);
    };

    const debounceTimer = setTimeout(searchContent, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleResultClick = (link: string) => {
    navigate(link);
    onOpenChange(false);
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for services, packages, gallery..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            autoFocus
          />
        </div>

        <ScrollArea className="h-[400px] mt-4">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          )}

          {!loading && searchQuery && results.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Search className="h-12 w-12 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No results found</p>
              <p className="text-xs text-muted-foreground mt-1">Try searching for services, packages, or gallery items</p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="space-y-2">
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result.link)}
                  className="w-full p-3 rounded-lg border bg-card hover:bg-accent transition-colors text-left group"
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
      </DialogContent>
    </Dialog>
  );
}
