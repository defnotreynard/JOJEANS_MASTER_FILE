import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Calendar, Clock, MapPin, DollarSign } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface CreateEventModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEventCreated: () => void;
  editingEvent?: any;
}

const eventTypes = [
  'After Party', 'Anniversary', 'Aufruf', 'Bach Trip or Party', 'Birthday Party',
  'Brunch', 'Civil Ceremony', 'Elopement', 'Engagement Party',
  'Honeymoon', 'Luncheon', 'Mehndi', 'Minimoon', 'Proposal',
  'Rehearsal Dinner', 'Sangeet', 'Wedding'
];

const guestRanges = [
  { label: 'Less than 50', value: 'less_than_50' },
  { label: '50-100', value: '50_100' },
  { label: '100-200', value: '100_200' },
  { label: 'More than 200', value: 'more_than_200' }
];

const budgetRanges = [
  { label: 'Less than ₱2,000', value: 'less_than_₱2000' },
  { label: '₱2,000-₱3,000', value: '₱2000_₱3000' },
  { label: '₱3,000-₱5,000', value: '₱3000_₱5000' },
  { label: '₱5,000+', value: '₱5000_plus' }
];

const venueLocations = [
  'New York City, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ',
  'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA', 'Dallas, TX', 'San Jose, CA',
  'Austin, TX', 'Jacksonville, FL', 'Fort Worth, TX', 'Columbus, OH', 'Charlotte, NC',
  'San Francisco, CA', 'Indianapolis, IN', 'Seattle, WA', 'Denver, CO', 'Washington, DC'
];

export function CreateEventModal({ open, onOpenChange, onEventCreated, editingEvent }: CreateEventModalProps) {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    eventType: '',
    guestCount: '',
    guestCountRange: '',
    eventDate: '',
    eventTime: '',
    dateFlexible: false,
    venueBooked: null as boolean | null,
    venueLocation: '',
    budgetAmount: '',
    budgetRange: ''
  });

  // Initialize form data when editing
  React.useEffect(() => {
    if (editingEvent && open) {
      setFormData({
        eventType: editingEvent.event_type || '',
        guestCount: editingEvent.guest_count?.toString() || '',
        guestCountRange: editingEvent.guest_count_range || '',
        eventDate: editingEvent.event_date || '',
        eventTime: editingEvent.event_time || '',
        dateFlexible: editingEvent.date_flexible || false,
        venueBooked: editingEvent.venue_booked,
        venueLocation: editingEvent.venue_location || '',
        budgetAmount: editingEvent.budget_amount?.toString() || '',
        budgetRange: editingEvent.budget_range || ''
      });
    } else if (!editingEvent && open) {
      // Reset form for new event
      setFormData({
        eventType: '',
        guestCount: '',
        guestCountRange: '',
        eventDate: '',
        eventTime: '',
        dateFlexible: false,
        venueBooked: null,
        venueLocation: '',
        budgetAmount: '',
        budgetRange: ''
      });
    }
  }, [editingEvent, open]);

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleEventTypeSelect = (type: string) => {
    setFormData({ ...formData, eventType: type });
  };

  const handleSubmit = async () => {
    if (!user) return;

    try {
      if (editingEvent) {
        // Update existing event
        const eventData = {
          event_type: formData.eventType,
          guest_count: formData.guestCount ? parseInt(formData.guestCount) : null,
          guest_count_range: formData.guestCountRange,
          event_date: formData.eventDate || null,
          event_time: formData.eventTime || null,
          date_flexible: formData.dateFlexible,
          venue_booked: formData.venueBooked,
          venue_location: formData.venueLocation || null,
          budget_amount: formData.budgetAmount ? parseFloat(formData.budgetAmount) : null,
          budget_range: formData.budgetRange
        };

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
        // Create new event
        const { data: refData } = await supabase.rpc('generate_event_reference');
        
        const eventData = {
          user_id: user.id,
          reference_id: refData || `EVT-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
          event_type: formData.eventType,
          guest_count: formData.guestCount ? parseInt(formData.guestCount) : null,
          guest_count_range: formData.guestCountRange,
          event_date: formData.eventDate || null,
          event_time: formData.eventTime || null,
          date_flexible: formData.dateFlexible,
          venue_booked: formData.venueBooked,
          venue_location: formData.venueLocation || null,
          budget_amount: formData.budgetAmount ? parseFloat(formData.budgetAmount) : null,
          budget_range: formData.budgetRange
        };

        const { error } = await supabase
          .from('events')
          .insert([eventData]);

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
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Error saving event');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
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
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">How many guests are you expecting at your event?</h3>
            </div>
            <div className="space-y-4">
              <Input
                placeholder="Enter guest count"
                value={formData.guestCount}
                onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                type="number"
              />
              <div className="text-center text-sm text-muted-foreground">OR</div>
              <div className="space-y-2">
                {guestRanges.map((range) => (
                  <Button
                    key={range.value}
                    variant={formData.guestCountRange === range.value ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setFormData({ ...formData, guestCountRange: range.value })}
                  >
                    {range.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">When is your event?</h3>
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

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Have you booked your event venue?</h3>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4 justify-center">
                <Button
                  variant={formData.venueBooked === true ? "default" : "outline"}
                  onClick={() => setFormData({ ...formData, venueBooked: true })}
                >
                  Yes
                </Button>
                <Button
                  variant={formData.venueBooked === false ? "default" : "outline"}
                  onClick={() => setFormData({ ...formData, venueBooked: false })}
                >
                  No
                </Button>
              </div>
              
              {formData.venueBooked === false && (
                <div className="mt-4 p-4 bg-accent/20 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <span className="text-lg">🤩</span>
                    <p className="text-sm text-muted-foreground">
                      Not yet? No worries! Let's explore the ideal spot together to keep the celebration unforgettable.
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-2 relative">
                  <Label htmlFor="location">
                    {formData.venueBooked === true ? "What's your event venue?" : "What's your preferred venue location?"}
                  </Label>
                  <Input
                    id="location"
                    placeholder={formData.venueBooked === true ? "Enter venue name" : "Enter preferred location"}
                    value={formData.venueLocation}
                    onChange={(e) => setFormData({ ...formData, venueLocation: e.target.value })}
                  />
                  
                  {/* Show filtered suggestions */}
                  {formData.venueLocation && formData.venueLocation.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-background border rounded-md shadow-lg z-50 max-h-48 overflow-y-auto">
                      {venueLocations
                        .filter(location => 
                          location.toLowerCase().includes(formData.venueLocation.toLowerCase())
                        )
                        .slice(0, 5)
                        .map((location) => (
                          <button
                            key={location}
                            type="button"
                            className="w-full text-left px-3 py-2 hover:bg-accent hover:text-accent-foreground text-sm"
                            onClick={() => setFormData({ ...formData, venueLocation: location })}
                          >
                            {location}
                          </button>
                        ))
                      }
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">What's your budget for your event?</h3>
            </div>
            <div className="space-y-4">
              <Input
                placeholder="Enter Your Budget"
                value={formData.budgetAmount}
                onChange={(e) => setFormData({ ...formData, budgetAmount: e.target.value })}
                type="number"
              />
              <div className="text-center text-sm text-muted-foreground">OR</div>
              <div className="space-y-2">
                {budgetRanges.map((range) => (
                  <Button
                    key={range.value}
                    variant={formData.budgetRange === range.value ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setFormData({ ...formData, budgetRange: range.value })}
                  >
                    {range.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getStepTitle = () => {
    const prefix = editingEvent ? "Edit your Event" : "Let's Create your Event";
    switch (step) {
      case 1: return `${prefix} 🎉`;
      case 2: return "Event Guest Count 👥";
      case 3: return "Date & Time 📅";
      case 4: return "Event Venue 📍";
      case 5: return "Event Budget 💰";
      default: return "";
    }
  };

  const getStepIcon = () => {
    switch (step) {
      case 1: return "🎉";
      case 2: return "👥";
      case 3: return "📅";
      case 4: return "📍";
      case 5: return "💰";
      default: return "";
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return formData.eventType;
      case 2: return formData.guestCount || formData.guestCountRange;
      case 3: return true; // Date/time is optional
      case 4: return formData.venueBooked !== null;
      case 5: return formData.budgetAmount || formData.budgetRange;
      default: return false;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            {step > 1 && (
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <DialogTitle className="flex items-center space-x-2">
              <span>{getStepIcon()}</span>
              <span>{getStepTitle()}</span>
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="py-6">
          {renderStep()}
        </div>

        <div className="flex justify-end space-x-2">
          {step < 5 && (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="w-full bg-wedding-charcoal hover:bg-wedding-charcoal/90 text-white"
            >
              Next
            </Button>
          )}
          {step === 5 && (
            <Button
              onClick={handleSubmit}
              disabled={!canProceed()}
              className="w-full bg-wedding-charcoal hover:bg-wedding-charcoal/90 text-white"
            >
              {editingEvent ? 'Update Event' : 'Create Event'}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}