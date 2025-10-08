"use client"

import { useState } from "react"
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

const bookings = [
  {
    id: "BK001",
    client: {
      name: "Maria Santos",
      email: "maria.santos@email.com",
      phone: "+63 912 345 6789",
    },
    event: {
      type: "Wedding Reception",
      date: "2024-07-15",
      time: "6:00 PM",
      venue: "Garden Paradise Resort, Dumaguete",
      guests: 150,
    },
    services: ["Catering", "Styling & Decoration", "Photography", "Sound System"],
    package: "Wedding Essentials",
    amount: 85000,
    status: "confirmed",
    createdAt: "2024-06-01",
    notes: "Client prefers teal and white color scheme. Vegetarian options needed for 20 guests.",
  },
  {
    id: "BK002",
    client: {
      name: "ABC Corporation",
      email: "events@abccorp.com",
      phone: "+63 917 888 9999",
    },
    event: {
      type: "Annual Meeting",
      date: "2024-07-20",
      time: "9:00 AM",
      venue: "Dumaguete Convention Center",
      guests: 200,
    },
    services: ["Catering", "Sound System", "LED Wall"],
    package: "Corporate Classic",
    amount: 45000,
    status: "pending",
    createdAt: "2024-06-05",
    notes: "Need projector setup and microphones for presentations.",
  },
  {
    id: "BK003",
    client: {
      name: "John Dela Cruz",
      email: "john.delacruz@email.com",
      phone: "+63 905 123 4567",
    },
    event: {
      type: "Birthday Party",
      date: "2024-07-25",
      time: "3:00 PM",
      venue: "Private Residence, Valencia",
      guests: 50,
    },
    services: ["Catering", "Styling & Decoration", "Photography"],
    package: "Birthday Bliss",
    amount: 25000,
    status: "confirmed",
    createdAt: "2024-06-10",
    notes: "Superhero theme for 8-year-old birthday celebration.",
  },
  {
    id: "BK004",
    client: {
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+63 920 555 7777",
    },
    event: {
      type: "Debut Party",
      date: "2024-08-01",
      time: "7:00 PM",
      venue: "Bethel Guest House, Dumaguete",
      guests: 100,
    },
    services: ["Catering", "Styling & Decoration", "Photography", "Sound System"],
    package: "Custom Package",
    amount: 55000,
    status: "inquiry",
    createdAt: "2024-06-15",
    notes: "Initial inquiry. Client wants elegant gold and white theme.",
  },
]

export function BookingManagement() {
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

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

  const updateBookingStatus = (bookingId, newStatus) => {
    // In a real app, this would update the database
    console.log(`Updating booking ${bookingId} to ${newStatus}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Booking Management</h1>
          <p className="text-muted-foreground">Manage all event bookings and inquiries</p>
        </div>
        <Button>
          <Calendar className="h-4 w-4 mr-2" />
          Add Booking
        </Button>
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
                <SelectItem value="inquiry">Inquiry</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
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
                      <span>{booking.event.guests} guests</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-muted-foreground">Package:</span>
                      <span className="text-sm font-medium">{booking.package}</span>
                    </div>
                    <span className="text-lg font-bold text-primary">₱{booking.amount.toLocaleString()}</span>
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
                                <p>{selectedBooking.event.guests} people</p>
                              </div>
                            </div>
                          </div>

                          {/* Services & Package */}
                          <div>
                            <h4 className="font-semibold mb-3">Services & Package</h4>
                            <div className="space-y-3">
                              <div>
                                <Label className="text-sm text-muted-foreground">Package</Label>
                                <p className="font-medium">{selectedBooking.package}</p>
                              </div>
                              <div>
                                <Label className="text-sm text-muted-foreground">Services Included</Label>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {selectedBooking.services.map((service, index) => (
                                    <Badge key={index} variant="outline">
                                      {service}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <Label className="text-sm text-muted-foreground">Total Amount</Label>
                                <p className="text-2xl font-bold text-primary">
                                  ₱{selectedBooking.amount.toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Notes */}
                          <div>
                            <h4 className="font-semibold mb-3">Notes</h4>
                            <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                              {selectedBooking.notes}
                            </p>
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
