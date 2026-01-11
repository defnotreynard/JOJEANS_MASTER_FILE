import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Check, DollarSign, MapPin, Users, Calendar, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

interface CreateEventModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEventCreated: () => void;
  editingEvent?: any;
  initialPackage?: string | null;
}

const eventTypes = [
  'After Party', 'Anniversary', 'Aufruf', 'Bach Trip or Party', 'Birthday Party',
  'Brunch', 'Civil Ceremony', 'Elopement', 'Engagement Party',
  'Honeymoon', 'Luncheon', 'Mehndi', 'Minimoon', 'Proposal',
  'Rehearsal Dinner', 'Sangeet', 'Wedding'
];

const packages = [
  {
    id: 'silver',
    name: "🥈 Silver Package",
    price: "₱69,000",
    subtitle: "Minimalist Wedding",
    attendees: "Catering & Décor Only",
    guestCount: "50-100",
    features: ["3 menu choices", "Minimalist décor setup", "Basic program flow", "Free bridal bouquet"]
  },
  {
    id: 'gold',
    name: "🥇 Gold Package", 
    price: "₱95,000",
    subtitle: "Classic Wedding",
    attendees: "Complete Wedding Essentials",
    guestCount: "100-200",
    features: ["3 menu choices", "Backdrop styling", "Choose 1 major freebie", "Photo coverage included"],
    popular: true
  },
  {
    id: 'platinum',
    name: "💎 Platinum Package",
    price: "₱199,000", 
    subtitle: "All-in GOLD Wedding",
    attendees: "Luxury All-in Experience",
    guestCount: "200-300",
    features: ["Free whole lechon", "Church & venue styling", "Photography & prenup", "FREE venue & hotel room"]
  }
];

const services = [
  { id: 'coordination', name: 'Professional Coordination', category: 'Coordination' },
  { id: 'styling', name: 'Styling and Decors', category: 'Styling and Decors' },
  { id: 'catering', name: 'Catering Services', category: 'Catering Services' },
  { id: 'photo', name: 'Photo and Video', category: 'Photo and Video' },
  { id: 'sounds', name: 'Sounds and Lights', category: 'Sounds and Lights' },
  { id: 'cakes', name: 'Cakes / Pica-pica', category: 'Cakes / Pica-pica' },
  { id: 'invitation', name: 'Invitation / Giveaways', category: 'Invitation / Giveaways' },
  { id: 'hmua', name: 'HMUA / Host', category: 'HMUA / Host' },
  { id: 'attires', name: 'Attires / Bouquets', category: 'Attires / Bouquets' },
  { id: 'car', name: 'Bridal Car', category: 'Bridal Car' },
  { id: 'ceiling', name: 'Ceiling Works', category: 'Ceiling Works' },
  { id: 'led', name: 'LED Wall', category: 'LED Wall' },
  { id: 'tunnel', name: 'Entrance Tunnel', category: 'Entrance Tunnel' },
  { id: 'dance', name: 'Glass Dance Floor', category: 'Glass Dance Floor' }
];

const venues = [
  { id: '1', name: "Tierra Alta", location: "Highland Area", capacity: "250 guests", type: "Mountain Venue" },
  { id: '2', name: "El Aquino", location: "Waterfront", capacity: "180 guests", type: "Resort Venue" },
  { id: '3', name: "Praia Sibulan", location: "Sibulan Beach", capacity: "200 guests", type: "Beach Venue" },
  { id: '4', name: "Pavilion Bayawan", location: "Bayawan City", capacity: "300 guests", type: "Pavilion Venue" },
  { id: '5', name: "Kakahuyan Santa", location: "Santa Catalina", capacity: "150 guests", type: "Garden Venue" },
  { id: '6', name: "Floresel Resort Siaton", location: "Siaton", capacity: "220 guests", type: "Resort Venue" },
  { id: '7', name: "Jaines Bayawan", location: "Bayawan City", capacity: "180 guests", type: "Event Venue" }
];

export function CreateEventModal({ open, onOpenChange, onEventCreated, editingEvent, initialPackage }: CreateEventModalProps) {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [showDuplicateDialog, setShowDuplicateDialog] = useState(false);
  const [formData, setFormData] = useState({
    eventType: '',
    customEventType: '',
    selectedPackage: null as any,
    selectedServices: [] as string[],
    guestCount: '',
    hasVenue: null as boolean | null,
    selectedVenue: null as any,
    customVenue: '',
    budgetAmount: '',
    eventDate: '',
    eventTime: '',
    dateFlexible: false
  });

  // Set initial package when modal opens with a package selection
  React.useEffect(() => {
    if (open && initialPackage && !editingEvent) {
      const pkg = packages.find(p => p.id === initialPackage);
      if (pkg) {
        setFormData(prev => ({ ...prev, selectedPackage: pkg }));
      }
    }
  }, [open, initialPackage, editingEvent]);

  // Populate form when editing an event
  React.useEffect(() => {
    if (editingEvent) {
      setFormData({
        eventType: editingEvent.event_type || '',
        customEventType: '',
        selectedPackage: null,
        selectedServices: editingEvent.services || [],
        guestCount: editingEvent.guest_count?.toString() || editingEvent.guest_count_range || '',
        hasVenue: editingEvent.venue_booked,
        selectedVenue: null,
        customVenue: editingEvent.venue_location || '',
        budgetAmount: editingEvent.budget_amount?.toString() || editingEvent.budget_range || '',
        eventDate: editingEvent.event_date || '',
        eventTime: editingEvent.event_time || '',
        dateFlexible: editingEvent.date_flexible || false
      });
    }
  }, [editingEvent]);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleEventTypeSelect = (type: string) => {
    setFormData({ ...formData, eventType: type, customEventType: '' });
  };

  const handlePackageSelect = (pkg: any) => {
    setFormData({ ...formData, selectedPackage: pkg });
  };

  const handleSkipPackage = () => {
    setFormData({ ...formData, selectedPackage: null });
    handleNext();
  };

  const toggleService = (serviceId: string) => {
    const newServices = formData.selectedServices.includes(serviceId)
      ? formData.selectedServices.filter(id => id !== serviceId)
      : [...formData.selectedServices, serviceId];
    setFormData({ ...formData, selectedServices: newServices });
  };

  const handleVenueSelect = (venue: any) => {
    setFormData({ ...formData, selectedVenue: venue, customVenue: '' });
  };

  const handleSubmit = async () => {
    if (!user) return;

    try {
      const finalEventType = formData.customEventType || formData.eventType;
      
      // Parse guest count from package or form
      let guestCount = null;
      let guestCountRange = null;
      if (formData.selectedPackage) {
        guestCountRange = formData.selectedPackage.guestCount; // "50-100" format
      } else if (formData.guestCount) {
        // Try to parse as number, otherwise store as range
        const parsed = parseInt(formData.guestCount);
        if (!isNaN(parsed)) {
          guestCount = parsed;
        } else {
          guestCountRange = formData.guestCount;
        }
      }

      // Parse budget from package or form
      let budgetAmount = null;
      let budgetRange = null;
      if (formData.selectedPackage) {
        // Parse "₱69,000" to number
        const priceStr = formData.selectedPackage.price.replace(/[₱,]/g, '');
        budgetAmount = parseFloat(priceStr);
      } else if (formData.budgetAmount) {
        // Try to parse as number, otherwise store as range
        const parsed = parseFloat(formData.budgetAmount.replace(/[₱,]/g, ''));
        if (!isNaN(parsed)) {
          budgetAmount = parsed;
        } else {
          budgetRange = formData.budgetAmount;
        }
      }

      const finalVenue = formData.customVenue || formData.selectedVenue?.name || '';
      
      // Determine if venue is booked
      const isVenueBooked = Boolean(
        (formData.hasVenue === true && formData.customVenue) || 
        (formData.hasVenue === false && formData.selectedVenue !== null)
      );

      const eventData = {
        event_type: finalEventType,
        guest_count: guestCount,
        guest_count_range: guestCountRange,
        event_date: formData.eventDate || null,
        event_time: formData.eventTime || null,
        date_flexible: formData.dateFlexible,
        venue_booked: isVenueBooked,
        venue_location: finalVenue,
        budget_amount: budgetAmount,
        budget_range: budgetRange,
      };

      // Update existing event or create new one
      if (editingEvent) {
        // Check for duplicate events before updating (exclude current event)
        if (formData.eventDate && formData.eventTime && !formData.dateFlexible) {
          const { data: existingEvents, error: checkError } = await supabase
            .from('events')
            .select('*')
            .eq('user_id', user.id)
            .eq('event_type', finalEventType)
            .eq('event_date', formData.eventDate)
            .eq('event_time', formData.eventTime)
            .neq('id', editingEvent.id); // Exclude the current event being edited

          if (checkError) {
            console.error('Error checking for duplicates:', checkError);
          }

          if (existingEvents && existingEvents.length > 0) {
            setShowDuplicateDialog(true);
            return;
          }
        }

        const { error } = await supabase
          .from('events')
          .update(eventData)
          .eq('id', editingEvent.id);

        if (error) {
          console.error('Error updating event:', error);
          alert('Error updating event: ' + error.message);
          return;
        }

        alert('Event updated successfully!');
      } else {
        // Check for duplicate events before creating
        if (formData.eventDate && formData.eventTime && !formData.dateFlexible) {
          const { data: existingEvents, error: checkError } = await supabase
            .from('events')
            .select('*')
            .eq('user_id', user.id)
            .eq('event_type', finalEventType)
            .eq('event_date', formData.eventDate)
            .eq('event_time', formData.eventTime);

          if (checkError) {
            console.error('Error checking for duplicates:', checkError);
          }

          if (existingEvents && existingEvents.length > 0) {
            setShowDuplicateDialog(true);
            return;
          }
        }

        // Generate reference ID only for new events
        const { data: refData } = await supabase.rpc('generate_event_reference');
        
        const newEventData = {
          user_id: user.id,
          reference_id: refData || `EVT-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
          status: 'pending',
          ...eventData
        };

        const { error } = await supabase
          .from('events')
          .insert([newEventData]);

        if (error) {
          console.error('Error creating event:', error);
          alert('Error creating event: ' + error.message);
          return;
        }

        alert('Event created successfully!');
      }

      onEventCreated();
      onOpenChange(false);
      setStep(1);
      // Reset form
      setFormData({
        eventType: '',
        customEventType: '',
        selectedPackage: null,
        selectedServices: [],
        guestCount: '',
        hasVenue: null,
        selectedVenue: null,
        customVenue: '',
        budgetAmount: '',
        eventDate: '',
        eventTime: '',
        dateFlexible: false
      });
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Error saving event');
    }
  };

  const renderStep = () => {
    // Step 1: Event Type
    if (step === 1) {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Choose the event type:</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {eventTypes.map((type) => (
              <Button
                key={type}
                variant={formData.eventType === type ? "default" : "outline"}
                className="h-auto p-3 text-sm"
                onClick={() => handleEventTypeSelect(type)}
              >
                {type}
              </Button>
            ))}
          </div>
          <div className="space-y-2">
            <Label>Or type your custom event:</Label>
            <Input
              placeholder="Enter custom event type"
              value={formData.customEventType}
              onChange={(e) => setFormData({ ...formData, customEventType: e.target.value, eventType: '' })}
            />
          </div>
        </div>
      );
    }

    // Step 2: Package Selection
    if (step === 2) {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Choose a Package (Optional)</h3>
            <p className="text-sm text-muted-foreground">Select a package or skip to customize your own</p>
          </div>
          <div className="grid gap-4">
            {packages.map((pkg) => (
              <Card 
                key={pkg.id} 
                className={`cursor-pointer transition-all ${formData.selectedPackage?.id === pkg.id ? 'ring-2 ring-primary' : ''} ${pkg.popular ? 'border-primary' : ''}`}
                onClick={() => handlePackageSelect(pkg)}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary">Most Popular</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl flex items-center justify-between">
                    <span>{pkg.name}</span>
                    <span className="text-2xl font-bold text-primary">{pkg.price}</span>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{pkg.subtitle}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <Users className="h-4 w-4" />
                      <span>{pkg.guestCount} guests</span>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button variant="outline" className="w-full" onClick={handleSkipPackage}>
            Skip - Customize My Own Event
          </Button>
        </div>
      );
    }

    // Step 3: Services (Required if no package, Add-ons if package selected)
    if (step === 3 && !formData.selectedPackage) {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Select Services</h3>
            <p className="text-sm text-muted-foreground">Choose the services you need for your event</p>
          </div>
          <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
            {services.map((service) => (
              <div
                key={service.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  formData.selectedServices.includes(service.id) ? 'border-primary bg-primary/5' : ''
                }`}
                onClick={() => toggleService(service.id)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-sm">{service.name}</p>
                    <p className="text-xs text-muted-foreground">{service.category}</p>
                  </div>
                  {formData.selectedServices.includes(service.id) && (
                    <Check className="h-5 w-5 text-primary" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Step 3 (Alternative): Add-on Services if package selected
    if (step === 3 && formData.selectedPackage) {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Add Extra Services (Optional)</h3>
            <p className="text-sm text-muted-foreground">Enhance your {formData.selectedPackage.name} with add-ons</p>
          </div>
          <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
            {services.map((service) => (
              <div
                key={service.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  formData.selectedServices.includes(service.id) ? 'border-primary bg-primary/5' : ''
                }`}
                onClick={() => toggleService(service.id)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-sm">{service.name}</p>
                    <p className="text-xs text-muted-foreground">{service.category}</p>
                  </div>
                  {formData.selectedServices.includes(service.id) && (
                    <Check className="h-5 w-5 text-primary" />
                  )}
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full" onClick={handleNext}>
            Skip Add-ons - Continue
          </Button>
        </div>
      );
    }

    // Step 4: Guest Count (Only if no package)
    if (step === 4 && !formData.selectedPackage) {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">How many guests?</h3>
          </div>
          <Input
            placeholder="Enter guest count or range (e.g., 50-100)"
            value={formData.guestCount}
            onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
          />
        </div>
      );
    }

    // Determine next step number for venue
    const venueStep = formData.selectedPackage ? 4 : 5;
    
    // Venue Selection
    if (step === venueStep) {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Do you have a venue?</h3>
          </div>
          <div className="flex gap-4 justify-center">
            <Button
              variant={formData.hasVenue === true ? "default" : "outline"}
              onClick={() => setFormData({ ...formData, hasVenue: true, selectedVenue: null })}
            >
              Yes
            </Button>
            <Button
              variant={formData.hasVenue === false ? "default" : "outline"}
              onClick={() => setFormData({ ...formData, hasVenue: false, customVenue: '' })}
            >
              No
            </Button>
          </div>
          
          {formData.hasVenue === true && (
            <div className="space-y-2">
              <Label>Enter your venue name:</Label>
              <Input
                placeholder="Venue name"
                value={formData.customVenue}
                onChange={(e) => setFormData({ ...formData, customVenue: e.target.value })}
              />
            </div>
          )}

          {formData.hasVenue === false && (
            <div className="space-y-4">
              <p className="text-sm text-center text-muted-foreground">Choose from our partner venues:</p>
              <div className="grid gap-3 max-h-96 overflow-y-auto">
                {venues.map((venue) => (
                  <Card
                    key={venue.id}
                    className={`cursor-pointer transition-all ${formData.selectedVenue?.id === venue.id ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => handleVenueSelect(venue)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{venue.name}</h4>
                          <p className="text-sm text-muted-foreground flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{venue.location}</span>
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            <Badge variant="secondary">{venue.type}</Badge>
                            <span className="text-xs text-muted-foreground">{venue.capacity}</span>
                          </div>
                        </div>
                        {formData.selectedVenue?.id === venue.id && (
                          <Check className="h-5 w-5 text-primary" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    // Budget (Only if no package)
    const budgetStep = formData.selectedPackage ? 5 : 6;
    if (step === budgetStep && !formData.selectedPackage) {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">What's your budget?</h3>
          </div>
          <Input
            placeholder="Enter your budget (e.g., ₱50,000 or ₱30,000-₱50,000)"
            value={formData.budgetAmount}
            onChange={(e) => setFormData({ ...formData, budgetAmount: e.target.value })}
          />
        </div>
      );
    }

    // Date & Time (Final step for both flows)
    const finalStep = formData.selectedPackage ? 5 : 6;
    if (step === finalStep || (step === 7 && !formData.selectedPackage)) {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">When is your event? (Optional)</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.eventDate}
                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={formData.eventTime}
                onChange={(e) => setFormData({ ...formData, eventTime: e.target.value })}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="flexible"
              checked={formData.dateFlexible}
              onCheckedChange={(checked) => setFormData({ ...formData, dateFlexible: !!checked })}
            />
            <Label htmlFor="flexible" className="text-sm">
              I'm not sure about the date and time.
            </Label>
          </div>
        </div>
      );
    }

    return null;
  };

  const getStepTitle = () => {
    const prefix = editingEvent ? "Edit Your Event" : "Let's Create your Event";
    switch (step) {
      case 1: return `${prefix} 🎉`;
      case 2: return "Choose Your Package 📦";
      case 3: return formData.selectedPackage ? "Add-on Services (Optional) ✨" : "Select Services 🛠️";
      case 4: return formData.selectedPackage ? "Event Venue 📍" : "Guest Count 👥";
      case 5: return formData.selectedPackage ? "Event Date 📅" : "Event Venue 📍";
      case 6: return formData.selectedPackage ? "" : "Event Budget 💰";
      case 7: return "Event Date 📅";
      default: return "";
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return formData.eventType || formData.customEventType;
      case 2: return true; // Package is optional
      case 3: return true; // Services are optional or can be skipped
      case 4: 
        if (formData.selectedPackage) {
          // Only require that they answered yes/no to venue question
          return formData.hasVenue !== null;
        }
        return formData.guestCount;
      case 5: 
        if (formData.selectedPackage) {
          return true; // Date is optional
        }
        // Only require that they answered yes/no to venue question
        return formData.hasVenue !== null;
      case 6: return formData.budgetAmount;
      case 7: return true; // Date is optional
      default: return false;
    }
  };

  const isLastStep = () => {
    if (formData.selectedPackage) {
      return step === 5;
    }
    return step === 7;
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center space-x-2">
              {step > 1 && (
                <Button variant="ghost" size="sm" onClick={handleBack}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <DialogTitle>
                {getStepTitle()}
              </DialogTitle>
            </div>
          </DialogHeader>

        <div className="py-6">
          {renderStep()}
        </div>

        <div className="flex justify-end space-x-2">
          {!isLastStep() && (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="w-full bg-wedding-charcoal hover:bg-wedding-charcoal/90 text-white"
            >
              Next
            </Button>
          )}
          {isLastStep() && (
            <Button
              onClick={handleSubmit}
              className="w-full bg-wedding-charcoal hover:bg-wedding-charcoal/90 text-white"
            >
              {editingEvent ? 'Update Event' : 'Create Event'}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>

    <AlertDialog open={showDuplicateDialog} onOpenChange={setShowDuplicateDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            Duplicate Event Detected
          </AlertDialogTitle>
          <AlertDialogDescription>
            You already have an event with the same type, date, and time. Please choose different details to avoid duplicates.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button onClick={() => setShowDuplicateDialog(false)}>
            OK
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  );
}
