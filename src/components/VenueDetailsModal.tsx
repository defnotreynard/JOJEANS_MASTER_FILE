import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, Star, Users, Eye, X, ChevronLeft, ChevronRight, Phone, Mail, Clock, DollarSign } from 'lucide-react';

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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!venue) return null;

  const galleryImages = venue.images || [];

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading">{venue.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Venue Main Image */}
          <div className="relative rounded-lg overflow-hidden">
            <img 
              src={venue.image} 
              alt={venue.name}
              className="w-full h-[400px] object-cover"
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
                    className="relative rounded-lg overflow-hidden aspect-square cursor-pointer group"
                    onClick={() => openLightbox(idx)}
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
      </DialogContent>

      {/* Lightbox */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20 z-[101]"
            onClick={closeLightbox}
          >
            <X className="h-6 w-6" />
          </Button>

          {galleryImages.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-[101]"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-[101]"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </>
          )}

          <div className="max-w-7xl max-h-[90vh] w-full px-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryImages[currentImageIndex]}
              alt={`${venue.name} - Full size ${currentImageIndex + 1}`}
              className="w-full h-full object-contain rounded-lg"
            />
            <div className="text-center text-white mt-4 text-sm">
              {currentImageIndex + 1} / {galleryImages.length}
            </div>
          </div>
        </div>
      )}
    </Dialog>
  );
};

export default VenueDetailsModal;
