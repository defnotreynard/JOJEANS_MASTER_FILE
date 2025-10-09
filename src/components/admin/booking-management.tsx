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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, Eye, Edit, Trash2, Calendar, MapPin, Phone, Mail, User } from "lucide-react"

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
}

export function BookingManagement() {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

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
    const matchesSearch =
      booking.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.event.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "default"
      case "pending":
        return "secondary"
      case "inquiry":
        return "outline"
      case "cancelled":
        return "destructive"
      default:
        return "outline"
    }
  }

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('events')
        .update({ status: newStatus })
        .eq('id', bookingId)

      if (error) throw error

      toast.success(`Booking status updated to ${newStatus}`)
      fetchBookings()
    } catch (error: any) {
      console.error('Error updating booking status:', error)
      toast.error('Failed to update booking status')
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
          <h1 className="text-3xl font-bold">Booking Management</h1>
          <p className="text-muted-foreground">Manage all event bookings ({bookings.length} total)</p>
        </div>
      </div>

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
                            <div className="flex space-x-2 mt-3">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateBookingStatus(selectedBooking.id, "confirmed")}
                              >
                                Confirm
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateBookingStatus(selectedBooking.id, "pending")}
                              >
                                Set Pending
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => updateBookingStatus(selectedBooking.id, "cancelled")}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">No bookings found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
