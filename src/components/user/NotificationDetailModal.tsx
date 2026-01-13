import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, MapPin, Users, DollarSign, Clock, FileText } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  created_at: string;
  link: string | null;
}

interface NotificationDetailModalProps {
  notification: Notification | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NotificationDetailModal({
  notification,
  open,
  onOpenChange,
}: NotificationDetailModalProps) {
  const [eventData, setEventData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && notification) {
      fetchRelatedData();
    } else {
      setEventData(null);
    }
  }, [open, notification]);

  const fetchRelatedData = async () => {
    if (!notification) return;

    setLoading(true);

    try {
      // Try to extract event reference from the notification message
      const refMatch = notification.message.match(/Ref:\s*([A-Z0-9-]+)/i);
      
      if (refMatch) {
        const referenceId = refMatch[1];
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .eq("reference_id", referenceId)
          .maybeSingle();

        if (!error && data) {
          setEventData(data);
        }
      } else {
        // Try to find event based on notification type/title keywords
        const isEventRelated =
          notification.type === "event" ||
          notification.type === "booking" ||
          notification.title.toLowerCase().includes("event") ||
          notification.title.toLowerCase().includes("booking");

        if (isEventRelated) {
          // Get the most recent event for this user as a fallback
          const { data: userData } = await supabase.auth.getUser();
          if (userData.user) {
            const { data, error } = await supabase
              .from("events")
              .select("*")
              .eq("user_id", userData.user.id)
              .order("updated_at", { ascending: false })
              .limit(1)
              .maybeSingle();

            if (!error && data) {
              setEventData(data);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error fetching related data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatEventDate = (dateStr: string | null) => {
    if (!dateStr) return "Date not set";
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getGuestDisplay = (count: number | null, range: string | null) => {
    if (count) return count.toString();
    if (range) {
      if (range.includes("-")) return `${range} guests`;
      switch (range) {
        case "less_than_50":
          return "Less than 50";
        case "50_100":
          return "50-100";
        case "100_200":
          return "100-200";
        case "more_than_200":
          return "More than 200";
        default:
          return range;
      }
    }
    return "Not specified";
  };

  const getBudgetDisplay = (amount: number | null, range: string | null) => {
    if (amount) return `₱${amount.toLocaleString()}`;
    if (range) {
      switch (range) {
        case "less_than_₱2000":
          return "Less than ₱2,000";
        case "₱2000_₱3000":
          return "₱2,000-₱3,000";
        case "₱3000_₱5000":
          return "₱3,000-₱5,000";
        case "₱5000_plus":
          return "₱5,000+";
        default:
          return range;
      }
    }
    return "Not specified";
  };

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case "active":
      case "confirmed":
        return "default";
      case "pending":
        return "secondary";
      case "completed":
        return "outline";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return "✅";
      case "warning":
        return "⚠️";
      case "error":
        return "❌";
      case "event":
      case "booking":
        return "📅";
      case "message":
        return "💬";
      default:
        return "📢";
    }
  };

  if (!notification) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-xl">{getNotificationIcon(notification.type)}</span>
            <span>{notification.title}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Notification Message */}
          <Card className="p-4 bg-muted/50">
            <p className="text-sm text-foreground">{notification.message}</p>
            <p className="text-xs text-muted-foreground mt-2">
              {new Date(notification.created_at).toLocaleString()}
            </p>
          </Card>

          {/* Related Event/Booking Details */}
          {loading ? (
            <div className="text-center py-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="text-sm text-muted-foreground mt-2">Loading details...</p>
            </div>
          ) : eventData ? (
            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                Event Details
              </h3>
              
              <Card className="p-4 space-y-4">
                {/* Event Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">
                      {eventData.event_type}
                    </h4>
                    <Badge variant="secondary" className="text-xs mt-1">
                      Ref: {eventData.reference_id}
                    </Badge>
                  </div>
                  <Badge variant={getStatusColor(eventData.status)} className="capitalize">
                    {eventData.status || "Active"}
                  </Badge>
                </div>

                {/* Event Details Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{formatEventDate(eventData.event_date)}</span>
                  </div>
                  
                  {eventData.event_time && (
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{eventData.event_time}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{eventData.venue_location || "Not set"}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {getGuestDisplay(eventData.guest_count, eventData.guest_count_range)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {getBudgetDisplay(eventData.budget_amount, eventData.budget_range)}
                    </span>
                  </div>
                  
                  {eventData.package && (
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="capitalize">{eventData.package} Package</span>
                    </div>
                  )}
                </div>

                {/* Services */}
                {eventData.services && eventData.services.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground font-medium">Services</p>
                    <div className="flex flex-wrap gap-1">
                      {eventData.services.map((service: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Timestamps */}
                <div className="pt-2 border-t text-xs text-muted-foreground">
                  <p>Created: {new Date(eventData.created_at).toLocaleDateString()}</p>
                  <p>Last updated: {new Date(eventData.updated_at).toLocaleDateString()}</p>
                </div>
              </Card>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No additional details available for this notification.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
