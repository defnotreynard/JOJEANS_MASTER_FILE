import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, Calendar, Users, Heart, Eye, CheckCircle, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EventDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: {
    id: number;
    image: string;
    images?: string[];
    title: string;
    couple: string;
    location: string;
    date: string;
    guests: number;
    style: string;
    venue: string;
    description: string;
    likes: number;
    views: number;
    package: string;
    packagePrice: string;
    packagePromo: string;
  } | null;
}

const EventDetailsModal = ({ isOpen, onClose, event }: EventDetailsModalProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!event) return null;

  const packageFeatures = {
    "Silver Package": ["Minimalist Wedding", "Catering & Décor Only", "Perfect for intimate celebrations"],
    "Gold Package": ["Classic Wedding", "Complete Wedding Essentials", "Most Popular Choice"],
    "Platinum Package": ["Grand Wedding", "Premium All-In Experience", "Ultimate luxury package"]
  };

  const features = packageFeatures[event.package as keyof typeof packageFeatures] || [];
  const galleryImages = event.images || [];

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
          <DialogTitle className="text-2xl font-heading">{event.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Event Image */}
          <div className="relative rounded-lg overflow-hidden">
            <img 
              src={event.image} 
              alt={event.title}
              className="w-full h-[400px] object-cover"
            />
            <Badge className="absolute top-4 left-4 bg-background/95 text-foreground">
              {event.style}
            </Badge>
          </div>

          {/* Event Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Event Details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Heart className="h-4 w-4 text-primary" />
                  <span className="font-medium">{event.couple}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4 text-primary" />
                  <span>{event.guests} guests</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">About This Event</h3>
              <p className="text-muted-foreground leading-relaxed">
                {event.description}
              </p>
              <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  {event.likes} likes
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {event.views} views
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Package Details */}
          <div>
            <h3 className="text-xl font-heading font-semibold mb-4">Event Package</h3>
            <Card className="border-2 border-primary">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{event.package}</CardTitle>
                <div className="text-2xl font-bold text-primary">{event.packagePrice}</div>
                <div className="text-xs text-muted-foreground">Promo: {event.packagePromo}</div>
              </CardHeader>
              <CardContent className="space-y-3">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Separator />

          {/* Event Gallery */}
          {event.images && event.images.length > 0 && (
            <div>
              <h3 className="text-xl font-heading font-semibold mb-4">Event Gallery</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {event.images.map((img, idx) => (
                  <div 
                    key={idx} 
                    className="relative rounded-lg overflow-hidden aspect-square cursor-pointer group"
                    onClick={() => openLightbox(idx)}
                  >
                    <img 
                      src={img} 
                      alt={`${event.title} - Image ${idx + 1}`}
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
              alt={`${event.title} - Full size ${currentImageIndex + 1}`}
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

export default EventDetailsModal;
