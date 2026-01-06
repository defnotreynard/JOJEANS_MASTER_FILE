import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, Star, Users, Eye, Phone, Mail, Clock, DollarSign, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface VenueDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  venue: {
    name: string;
    location: string;
    capacity: string;
    rating: number;
    image: string;
    images?: string[];
    type: string;
    price: string;
    description: string;
    amenities: string[];
    contactPhone?: string;
    contactEmail?: string;
    operatingHours?: string;
  } | null;
}

const VenueDetailsModal = ({ isOpen, onClose, venue }: VenueDetailsModalProps) => {
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const [currentZoomIndex, setCurrentZoomIndex] = useState(0);
  const scrollYRef = useRef(0);

  const allImages = venue ? [venue.image, ...(venue.images || [])] : [];

  // Handle escape key for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (zoomImage && e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        setZoomImage(null);
      }
    };

    if (zoomImage) {
      document.addEventListener('keydown', handleKeyDown, true);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [zoomImage]);

  // Prevent background/page scroll when lightbox is open (Dialog handles its own scroll lock)
  useEffect(() => {
    if (!zoomImage) return;

    const body = document.body;
    body.style.overflow = 'hidden';

    return () => {
      body.style.overflow = '';
    };
  }, [zoomImage]);


  if (!venue) return null;

  const handleImageClick = (e: React.MouseEvent, image: string) => {
    e.stopPropagation();
    const index = allImages.indexOf(image);
    setCurrentZoomIndex(index);
    setZoomImage(image);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentZoomIndex((prev) => {
      const next = (prev + 1) % allImages.length;
      setZoomImage(allImages[next]);
      return next;
    });
  };

  const handlePreviousImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentZoomIndex((prev) => {
      const next = (prev - 1 + allImages.length) % allImages.length;
      setZoomImage(allImages[next]);
      return next;
    });
  };

  const handleCloseZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomImage(null);
  };

  const handleDialogChange = (open: boolean) => {
    if (!open && !zoomImage) {
      onClose();
    }
  };

  // Lightbox rendered via portal
  const lightbox = zoomImage ? createPortal(
    <div 
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          setZoomImage(null);
        }
      }}
      onWheel={(e) => e.stopPropagation()}
      onScroll={(e) => e.stopPropagation()}
    >
      {/* Close Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setZoomImage(null);
        }}
        className="absolute top-4 right-4 z-50 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors cursor-pointer pointer-events-auto"
        aria-label="Close"
      >
        <X className="h-8 w-8 text-white" />
      </button>

      {/* Main Image Container */}
      <div className="relative flex-1 w-full flex items-center justify-center px-16">
        {/* Previous Button */}
        {allImages.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              const prevIndex = (currentZoomIndex - 1 + allImages.length) % allImages.length;
              setCurrentZoomIndex(prevIndex);
              setZoomImage(allImages[prevIndex]);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors z-50 cursor-pointer pointer-events-auto"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-8 w-8 text-white" />
          </button>
        )}

        {/* Main Image */}
        <img
          src={zoomImage}
          alt="Zoomed"
          className="max-w-[90vw] max-h-[80vh] object-contain"
          onMouseDown={(e) => e.stopPropagation()}
        />

        {/* Next Button */}
        {allImages.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              const nextIndex = (currentZoomIndex + 1) % allImages.length;
              setCurrentZoomIndex(nextIndex);
              setZoomImage(allImages[nextIndex]);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors z-50 cursor-pointer pointer-events-auto"
            aria-label="Next image"
          >
            <ChevronRight className="h-8 w-8 text-white" />
          </button>
        )}
      </div>

      {/* Thumbnail Strip */}
      {allImages.length > 1 && (
        <div className="w-full py-4 px-4 flex justify-center gap-2 overflow-x-auto" onMouseDown={(e) => e.stopPropagation()}>
          {allImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onMouseDown={(e) => {
                e.stopPropagation();
                setCurrentZoomIndex(idx);
                setZoomImage(img);
              }}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                idx === currentZoomIndex 
                  ? 'border-white opacity-100 scale-105' 
                  : 'border-transparent opacity-50 hover:opacity-75'
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Image Counter */}
      <div className="pb-4 text-white text-sm font-medium">
        {currentZoomIndex + 1} / {allImages.length}
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleDialogChange}>
        <DialogContent className={`max-w-4xl max-h-[90vh] p-0 flex flex-col ${zoomImage ? 'hidden' : ''}`}>
          <div className="px-6 py-4 border-b">
            <DialogTitle className="text-2xl font-heading">{venue.name}</DialogTitle>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-4 overscroll-contain">
            <div className="space-y-6">
            {/* Venue Main Image */}
            <div 
              className="relative rounded-lg overflow-hidden cursor-pointer" 
              onClick={(e) => handleImageClick(e, venue.image)}
            >
              <img 
                src={venue.image} 
                alt={venue.name}
                className="w-full h-[400px] object-cover hover:opacity-75 transition-opacity"
              />
              <Badge className="absolute top-4 left-4 bg-background/95 text-foreground">
                {venue.type}
              </Badge>
              <div className="absolute top-4 right-4">
                <div className="bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                  <Star className="h-3 w-3 text-wedding-gold fill-current" />
                  <span className="text-xs font-medium">{venue.rating}</span>
                </div>
              </div>
            </div>

            {/* Venue Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Venue Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{venue.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4 text-primary" />
                    <span>Capacity: {venue.capacity}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="h-4 w-4 text-primary" />
                    <span>Price Range: {venue.price}</span>
                  </div>
                  {venue.operatingHours && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{venue.operatingHours}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">About This Venue</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {venue.description}
                </p>
                {venue.contactPhone && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span>{venue.contactPhone}</span>
                  </div>
                )}
                {venue.contactEmail && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>{venue.contactEmail}</span>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Amenities */}
            {venue.amenities && venue.amenities.length > 0 && (
              <>
                <div>
                  <h3 className="text-xl font-heading font-semibold mb-4">Amenities & Features</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {venue.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Venue Gallery */}
            {venue.images && venue.images.length > 0 && (
              <div>
                <h3 className="text-xl font-heading font-semibold mb-4">Venue Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {venue.images.map((img, idx) => (
                    <div 
                      key={idx} 
                      className="relative rounded-lg overflow-hidden aspect-square group cursor-pointer"
                      onClick={(e) => handleImageClick(e, img)}
                    >
                      <img 
                        src={img} 
                        alt={`${venue.name} - Image ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <Eye className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {lightbox}
    </>
  );
};

export default VenueDetailsModal;
