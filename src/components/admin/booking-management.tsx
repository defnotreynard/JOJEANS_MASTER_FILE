"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, Plus, Eye, Edit, Trash2, Calendar, MapPin, Users, Upload, Move, Grid3X3, List, User, Mail, Phone } from "lucide-react"
import { CreateEventModal } from "@/components/CreateEventModal"

interface Booking {
  id: string
  reference_id: string
  client: {
    name: string
    email: string
    phone: string
  }
  event: {
    type: string
    date: string
    time: string
    venue: string
    guests: number
    guestRange?: string
  }
  budget: number
  budgetRange?: string
  status: string
  createdAt: string
  package?: string | null
  services?: string[]
}

export function BookingManagement() {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [createEventModalOpen, setCreateEventModalOpen] = useState(false)
  const [showDuplicateDialog, setShowDuplicateDialog] = useState(false)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      
      // Fetch all events
      const { data: events, error: eventsError } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false })

      if (eventsError) throw eventsError

      if (!events || events.length === 0) {
        setBookings([])
        return
      }

      // Get unique user IDs
      const userIds = [...new Set(events.map((event: any) => event.user_id))]

      // Fetch profiles for these users
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('user_id, full_name, phone_number, email')
        .in('user_id', userIds)

      if (profilesError) throw profilesError

      // Create a map of user profiles for quick lookup
      const profileMap = new Map(
        (profiles || []).map((profile: any) => [profile.user_id, profile])
      )

      // Transform the data to match the UI structure
      const transformedBookings: Booking[] = events.map((event: any) => {
        const profile = profileMap.get(event.user_id)
        
        return {
          id: event.id,
          reference_id: event.reference_id,
          client: {
            name: profile?.full_name || profile?.email || 'Unknown User',
            email: profile?.email || 'N/A',
            phone: profile?.phone_number || 'N/A',
          },
          event: {
            type: event.event_type || 'Event',
            date: event.event_date || 'Date not set',
            time: event.event_time || 'Time not set',
            venue: event.venue_location || 'Venue not set',
            guests: event.guest_count || 0,
            guestRange: event.guest_count_range,
          },
          budget: event.budget_amount || 0,
          budgetRange: event.budget_range,
          status: event.status || 'pending',
          createdAt: event.created_at,
          package: event.package || null,
          services: event.services || []
        }
      })

      setBookings(transformedBookings)
    } catch (error: any) {
      console.error('Error fetching bookings:', error)
      toast.error('Failed to load bookings')
    } finally {
      setLoading(false)
    }
  }

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = searchTerm === "" || 
      booking.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.client.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.event.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.event.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.reference_id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "default"
      case "confirmed":
        return "default"
      case "pending":
        return "secondary"
      case "inquiry":
        return "outline"
      case "completed":
        return "outline"
      case "cancelled":
        return "destructive"
      default:
        return "outline"
    }
  }

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      // First, get the event details
      const { data: event, error: fetchError } = await supabase
        .from('events')
        .select('user_id, event_type, reference_id, event_date, event_time, venue_location, guest_count, guest_count_range')
        .eq('id', bookingId)
        .single()

      if (fetchError) throw fetchError

      // Fetch the profile separately
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('full_name, email')
        .eq('user_id', event.user_id)
        .single()

      if (profileError) throw profileError

      // Update the status
      const { error } = await supabase
        .from('events')
        .update({ status: newStatus })
        .eq('id', bookingId)

      if (error) throw error

      // Create notification for the user
      const { error: notifError } = await supabase
        .from('notifications')
        .insert({
          user_id: event.user_id,
          title: '📋 Booking Status Updated',
          message: `Your ${event.event_type} booking (Ref: ${event.reference_id}) status has been changed to ${newStatus}`,
          type: 'info',
          link: '/user-dashboard'
        })

      if (notifError) {
        console.error('Error creating notification:', notifError)
      }

      // Send confirmation email if status is confirmed
      if (newStatus === 'confirmed' && profile?.email) {
          try {
            const { error: emailError } = await supabase.functions.invoke('send-booking-confirmation', {
              body: {
                clientName: profile.full_name || 'Valued Client',
                clientEmail: profile.email,
                eventType: event.event_type,
                eventDate: event.event_date || 'TBD',
                eventTime: event.event_time || 'TBD',
                venue: event.venue_location || 'TBD',
                guests: event.guest_count ? event.guest_count.toString() : event.guest_count_range || 'TBD',
                referenceId: event.reference_id
              }
            })

          if (emailError) {
            console.error('Error sending confirmation email:', emailError)
            toast.error('Status updated but failed to send confirmation email')
          } else {
            toast.success(`Booking confirmed and email sent to ${profile.email}`)
          }
        } catch (emailErr) {
          console.error('Error invoking email function:', emailErr)
        }
      } else {
        toast.success(`Booking status updated to ${newStatus}`)
      }

      fetchBookings()
    } catch (error: any) {
      console.error('Error updating booking status:', error)
      toast.error('Failed to update booking status')
    }
  }

  const handleEditBooking = (booking: Booking) => {
    setEditingBooking(booking)
    setIsEditDialogOpen(true)
  }

  const handleUpdateBooking = async () => {
    if (!editingBooking) return

    try {
      // Get the user_id for this event to check for duplicates
      const { data: eventData, error: fetchError } = await supabase
        .from('events')
        .select('user_id, date_flexible')
        .eq('id', editingBooking.id)
        .single()

      if (fetchError) throw fetchError

      // Check for duplicate events before updating (exclude current event)
      if (editingBooking.event.date && editingBooking.event.time && editingBooking.event.date !== 'Date not set' && editingBooking.event.time !== 'Time not set' && !eventData.date_flexible) {
        const { data: existingEvents, error: checkError } = await supabase
          .from('events')
          .select('*')
          .eq('user_id', eventData.user_id)
          .eq('event_type', editingBooking.event.type)
          .eq('event_date', editingBooking.event.date)
          .eq('event_time', editingBooking.event.time)
          .neq('id', editingBooking.id)

        if (checkError) {
          console.error('Error checking for duplicates:', checkError)
        }

        if (existingEvents && existingEvents.length > 0) {
          setShowDuplicateDialog(true)
          return
        }
      }

      const { error } = await supabase
        .from('events')
        .update({
          event_type: editingBooking.event.type,
          event_date: editingBooking.event.date,
          event_time: editingBooking.event.time,
          venue_location: editingBooking.event.venue,
          guest_count: editingBooking.event.guests,
          budget_amount: editingBooking.budget,
          status: editingBooking.status,
          package: editingBooking.package || null,
          services: editingBooking.services && editingBooking.services.length > 0 ? editingBooking.services : null
        })
        .eq('id', editingBooking.id)

      if (error) throw error

      toast.success('Booking updated successfully')
      setIsEditDialogOpen(false)
      setEditingBooking(null)
      fetchBookings()
    } catch (error: any) {
      console.error('Error updating booking:', error)
      toast.error('Failed to update booking')
    }
  }

  const handleDeleteBooking = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', bookingId)

      if (error) throw error

      toast.success('Booking deleted successfully')
      fetchBookings()
    } catch (error: any) {
      console.error('Error deleting booking:', error)
      toast.error('Failed to delete booking')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Booking Management</h1>
          <p className="text-muted-foreground">Manage all event bookings ({bookings.length} total)</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center border border-border rounded-md bg-background">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid3X3 className="h-4 w-4 text-foreground" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4 text-foreground" />
            </Button>
          </div>
          <Button onClick={() => setCreateEventModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Booking
          </Button>
        </div>
      </div>

      <CreateEventModal 
        open={createEventModalOpen} 
        onOpenChange={setCreateEventModalOpen}
        onEventCreated={fetchBookings}
      />

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bookings List */}
      {viewMode === "list" ? (
        <div className="grid gap-4">
          {filteredBookings.map((booking) => (
          <Card key={booking.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <h3 className="text-lg font-semibold">{booking.client.name}</h3>
                      <Badge variant={getStatusColor(booking.status)}>{booking.status}</Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">#{booking.id}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{booking.event.type}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {booking.event.date} at {booking.event.time}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{booking.event.guestRange || `${booking.event.guests} guests`}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-muted-foreground">Reference:</span>
                      <span className="text-sm font-medium">{booking.reference_id}</span>
                    </div>
                    <span className="text-lg font-bold text-primary">
                      {booking.budget > 0 ? `₱${booking.budget.toLocaleString()}` : 'Budget not set'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedBooking(booking)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Booking Details - #{booking.id}</DialogTitle>
                        <DialogDescription>Complete booking information and management options</DialogDescription>
                      </DialogHeader>

                      {selectedBooking && (
                        <div className="space-y-6">
                          {/* Client Information */}
                          <div>
                            <h4 className="font-semibold mb-3">Client Information</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="flex items-center space-x-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span>{selectedBooking.client.name}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span>{selectedBooking.client.email}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span>{selectedBooking.client.phone}</span>
                              </div>
                            </div>
                          </div>

                          {/* Event Details */}
                          <div>
                            <h4 className="font-semibold mb-3">Event Details</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label className="text-sm text-muted-foreground">Event Type</Label>
                                <p>{selectedBooking.event.type}</p>
                              </div>
                              <div>
                                <Label className="text-sm text-muted-foreground">Date & Time</Label>
                                <p>
                                  {selectedBooking.event.date} at {selectedBooking.event.time}
                                </p>
                              </div>
                              <div>
                                <Label className="text-sm text-muted-foreground">Venue</Label>
                                <p>{selectedBooking.event.venue}</p>
                              </div>
                              <div>
                                <Label className="text-sm text-muted-foreground">Expected Guests</Label>
                                <p>{selectedBooking.event.guestRange || `${selectedBooking.event.guests} people`}</p>
                              </div>
                            </div>
                          </div>

                          {/* Budget */}
                          <div>
                            <h4 className="font-semibold mb-3">Budget Information</h4>
                            <div className="space-y-3">
                              <div>
                                <Label className="text-sm text-muted-foreground">Budget Amount</Label>
                                <p className="text-2xl font-bold text-primary">
                                  {selectedBooking.budget > 0 
                                    ? `₱${selectedBooking.budget.toLocaleString()}` 
                                    : 'Not specified'}
                                </p>
                              </div>
                              <div>
                                <Label className="text-sm text-muted-foreground">Reference ID</Label>
                                <p className="font-medium">{selectedBooking.reference_id}</p>
                              </div>
                            </div>
                          </div>

                          {/* Status Management */}
                          <div>
                            <h4 className="font-semibold mb-3">Status Management</h4>
                            <div className="flex items-center space-x-2">
                              <Label>Current Status:</Label>
                              <Badge variant={getStatusColor(selectedBooking.status)}>{selectedBooking.status}</Badge>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-3">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateBookingStatus(selectedBooking.id, "active")}
                              >
                                Active
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateBookingStatus(selectedBooking.id, "pending")}
                              >
                                Pending
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateBookingStatus(selectedBooking.id, "confirmed")}
                              >
                                Confirmed
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateBookingStatus(selectedBooking.id, "completed")}
                              >
                                Completed
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => updateBookingStatus(selectedBooking.id, "cancelled")}
                              >
                                Cancelled
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline" size="sm" onClick={() => handleEditBooking(booking)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Booking</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this booking for {booking.client.name}? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteBooking(booking.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBookings.map((booking) => (
            <Card key={booking.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold truncate">{booking.client.name}</h3>
                    <Badge variant={getStatusColor(booking.status)}>{booking.status}</Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">#{booking.id}</span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="truncate">{booking.event.type}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="truncate">{booking.event.date} at {booking.event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span>{booking.event.guestRange || `${booking.event.guests} guests`}</span>
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-muted-foreground">Reference:</span>
                    <span className="text-xs font-medium">{booking.reference_id}</span>
                  </div>
                  <p className="text-lg font-bold text-primary">
                    {booking.budget > 0 ? `₱${booking.budget.toLocaleString()}` : 'Budget not set'}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedBooking(booking)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Booking Details - #{booking.id}</DialogTitle>
                        <DialogDescription>Complete booking information and management options</DialogDescription>
                      </DialogHeader>

                      {selectedBooking && (
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-semibold mb-3">Client Information</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="flex items-center space-x-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span>{selectedBooking.client.name}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span>{selectedBooking.client.email}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span>{selectedBooking.client.phone}</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-3">Event Details</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label className="text-sm text-muted-foreground">Event Type</Label>
                                <p>{selectedBooking.event.type}</p>
                              </div>
                              <div>
                                <Label className="text-sm text-muted-foreground">Date & Time</Label>
                                <p>{selectedBooking.event.date} at {selectedBooking.event.time}</p>
                              </div>
                              <div>
                                <Label className="text-sm text-muted-foreground">Venue</Label>
                                <p>{selectedBooking.event.venue}</p>
                              </div>
                              <div>
                                <Label className="text-sm text-muted-foreground">Expected Guests</Label>
                                <p>{selectedBooking.event.guestRange || `${selectedBooking.event.guests} people`}</p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-3">Status Management</h4>
                            <div className="flex items-center space-x-2">
                              <Label>Current Status:</Label>
                              <Badge variant={getStatusColor(selectedBooking.status)}>{selectedBooking.status}</Badge>
                            </div>
                            <div className="flex space-x-2 mt-3">
                              <Button size="sm" variant="outline" onClick={() => updateBookingStatus(selectedBooking.id, "confirmed")}>
                                Confirm
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => updateBookingStatus(selectedBooking.id, "pending")}>
                                Set Pending
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => updateBookingStatus(selectedBooking.id, "cancelled")}>
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>

                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm" onClick={() => handleEditBooking(booking)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Booking</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this booking for {booking.client.name}? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteBooking(booking.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredBookings.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">No bookings found matching your criteria.</p>
          </CardContent>
        </Card>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Booking</DialogTitle>
            <DialogDescription>Update booking information</DialogDescription>
          </DialogHeader>
          {editingBooking && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="event-type">Event Type</Label>
                <Input
                  id="event-type"
                  value={editingBooking.event.type}
                  onChange={(e) => setEditingBooking({
                    ...editingBooking,
                    event: { ...editingBooking.event, type: e.target.value }
                  })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="event-date">Event Date</Label>
                  <Input
                    id="event-date"
                    type="date"
                    value={editingBooking.event.date}
                    onChange={(e) => setEditingBooking({
                      ...editingBooking,
                      event: { ...editingBooking.event, date: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="event-time">Event Time</Label>
                  <Input
                    id="event-time"
                    type="time"
                    value={editingBooking.event.time}
                    onChange={(e) => setEditingBooking({
                      ...editingBooking,
                      event: { ...editingBooking.event, time: e.target.value }
                    })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="venue">Venue Location</Label>
                <Input
                  id="venue"
                  value={editingBooking.event.venue}
                  onChange={(e) => setEditingBooking({
                    ...editingBooking,
                    event: { ...editingBooking.event, venue: e.target.value }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="guests">Number of Guests</Label>
                <Input
                  id="guests"
                  type="number"
                  value={editingBooking.event.guests}
                  onChange={(e) => setEditingBooking({
                    ...editingBooking,
                    event: { ...editingBooking.event, guests: parseInt(e.target.value) }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="budget">Budget Amount</Label>
                <Input
                  id="budget"
                  type="number"
                  value={editingBooking.budget}
                  onChange={(e) => setEditingBooking({
                    ...editingBooking,
                    budget: parseFloat(e.target.value)
                  })}
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={editingBooking.status}
                  onValueChange={(value) => setEditingBooking({
                    ...editingBooking,
                    status: value
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="package">Package</Label>
                <Select
                  value={editingBooking.package || "none"}
                  onValueChange={(value) => setEditingBooking({
                    ...editingBooking,
                    package: value === "none" ? null : value
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select package" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="Silver">Silver Package</SelectItem>
                    <SelectItem value="Gold">Gold Package</SelectItem>
                    <SelectItem value="Platinum">Platinum Package</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Services</Label>
                <div className="border rounded-md p-4 max-h-48 overflow-y-auto space-y-2">
                  {[
                    "Event Coordination",
                    "Styling & Decor Design",
                    "Premium Catering",
                    "Photography & Videography",
                    "Audio Visual Production",
                    "Cakes & Appetizers",
                    "Invitations & Favors",
                    "Beauty & Hosting",
                    "Attire & Florals",
                    "Luxury Transportation",
                    "Ceiling Installations",
                    "LED Display Solutions",
                    "Grand Entrance Designs",
                    "Illuminated Dance Floors"
                  ].map((service) => (
                    <div key={service} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`edit-${service}`}
                        checked={editingBooking.services?.includes(service) || false}
                        onChange={(e) => {
                          const currentServices = editingBooking.services || []
                          const newServices = e.target.checked
                            ? [...currentServices, service]
                            : currentServices.filter((s) => s !== service)
                          setEditingBooking({
                            ...editingBooking,
                            services: newServices
                          })
                        }}
                        className="rounded"
                      />
                      <label htmlFor={`edit-${service}`} className="text-sm cursor-pointer">
                        {service}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateBooking}>Update Booking</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Duplicate Event Alert Dialog */}
      <AlertDialog open={showDuplicateDialog} onOpenChange={setShowDuplicateDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-destructive" />
              Duplicate Event Detected
            </AlertDialogTitle>
            <AlertDialogDescription>
              This client already has an event with the same type, date, and time. Please choose different details to avoid duplicates.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={() => setShowDuplicateDialog(false)}>
              OK
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
