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
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Search, Plus, Eye, Edit, Trash2, Calendar, MapPin, Users, Camera, Star } from "lucide-react"

const events = [
  {
    id: "EV001",
    title: "Santos-Reyes Wedding",
    type: "Wedding",
    date: "2024-06-15",
    venue: "Garden Paradise Resort, Dumaguete",
    client: "Maria Santos",
    guests: 150,
    status: "completed",
    rating: 5,
    images: [
      "/elegant-wedding-reception-with-teal-decorations-an.jpg",
      "/wedding-ceremony-outdoor-setup.jpg",
      "/wedding-reception-table-setting.jpg",
      "/wedding-dance-floor-celebration.jpg",
    ],
    services: ["Catering", "Styling & Decoration", "Photography", "Sound System"],
    highlights: [
      "Elegant teal and white theme",
      "Garden ceremony setup",
      "Live acoustic music",
      "5-course dinner menu",
    ],
    testimonial: "JOJEANS Events made our dream wedding come true! Every detail was perfect.",
    createdAt: "2024-05-01",
  },
  {
    id: "EV002",
    title: "ABC Corp Annual Meeting",
    type: "Corporate",
    date: "2024-06-20",
    venue: "Dumaguete Convention Center",
    client: "ABC Corporation",
    guests: 200,
    status: "completed",
    rating: 4,
    images: [
      "/corporate-event-with-led-wall-and-professional-lig.jpg",
      "/modern-startup-launch-event-with-tech-displays.jpg",
    ],
    services: ["Catering", "Sound System", "LED Wall", "Registration Setup"],
    highlights: [
      "Professional LED wall setup",
      "Live streaming capability",
      "Corporate lunch buffet",
      "Award ceremony staging",
    ],
    testimonial: "Professional service and excellent technical support throughout the event.",
    createdAt: "2024-05-15",
  },
  {
    id: "EV003",
    title: "John's 8th Birthday Party",
    type: "Birthday",
    date: "2024-06-25",
    venue: "Private Residence, Valencia",
    client: "John Dela Cruz",
    guests: 50,
    status: "completed",
    rating: 5,
    images: ["/colorful-birthday-party-with-teal-decorations-and-.jpg"],
    services: ["Catering", "Styling & Decoration", "Photography", "Entertainment"],
    highlights: [
      "Superhero theme decorations",
      "Kids-friendly menu",
      "Magic show entertainment",
      "Custom birthday cake",
    ],
    testimonial: "The kids had an amazing time! Thank you for making John's day special.",
    createdAt: "2024-06-01",
  },
  {
    id: "EV004",
    title: "Sarah's Debut Celebration",
    type: "Debut",
    date: "2024-07-01",
    venue: "Bethel Guest House, Dumaguete",
    client: "Sarah Johnson",
    guests: 100,
    status: "upcoming",
    rating: null,
    images: ["/elegant-debut-party-with-teal-and-gold-decorations.jpg"],
    services: ["Catering", "Styling & Decoration", "Photography", "Sound System"],
    highlights: ["Elegant gold and white theme", "Formal dinner setup", "Photo booth area", "Live band performance"],
    testimonial: null,
    createdAt: "2024-06-10",
  },
]

export function EventManagement() {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showAddDialog, setShowAddDialog] = useState(false)

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || event.type.toLowerCase() === typeFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || event.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "default"
      case "upcoming":
        return "secondary"
      case "ongoing":
        return "outline"
      case "cancelled":
        return "destructive"
      default:
        return "outline"
    }
  }

  const renderStars = (rating) => {
    if (!rating) return null
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Event Management</h1>
          <p className="text-muted-foreground">Manage past events and create new ones</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
              <DialogDescription>Create a new event record for portfolio and reference</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Event Title</Label>
                  <Input id="title" placeholder="e.g., Santos-Reyes Wedding" />
                </div>
                <div>
                  <Label htmlFor="type">Event Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wedding">Wedding</SelectItem>
                      <SelectItem value="corporate">Corporate</SelectItem>
                      <SelectItem value="birthday">Birthday</SelectItem>
                      <SelectItem value="debut">Debut</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="client">Client Name</Label>
                  <Input id="client" placeholder="Client name" />
                </div>
                <div>
                  <Label htmlFor="date">Event Date</Label>
                  <Input id="date" type="date" />
                </div>
              </div>
              <div>
                <Label htmlFor="venue">Venue</Label>
                <Input id="venue" placeholder="Event venue location" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="guests">Number of Guests</Label>
                  <Input id="guests" type="number" placeholder="150" />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="highlights">Event Highlights</Label>
                <Textarea id="highlights" placeholder="Key highlights and features of the event..." />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowAddDialog(false)}>Create Event</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="wedding">Wedding</SelectItem>
                <SelectItem value="corporate">Corporate</SelectItem>
                <SelectItem value="birthday">Birthday</SelectItem>
                <SelectItem value="debut">Debut</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="hover:shadow-md transition-shadow">
            <div className="aspect-video relative overflow-hidden rounded-t-lg">
              <img
                src={event.images[0] || "/placeholder.svg"}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge variant={getStatusColor(event.status)}>{event.status}</Badge>
              </div>
            </div>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">{event.type} Event</p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{event.venue}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{event.guests} guests</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Camera className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{event.images.length} photos</span>
                  </div>
                  {event.rating && renderStars(event.rating)}
                </div>

                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => setSelectedEvent(event)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{selectedEvent?.title}</DialogTitle>
                        <DialogDescription>Complete event details and gallery</DialogDescription>
                      </DialogHeader>

                      {selectedEvent && (
                        <div className="space-y-6">
                          {/* Event Images */}
                          <div>
                            <h4 className="font-semibold mb-3">Event Gallery</h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                              {selectedEvent.images.map((image, index) => (
                                <div key={index} className="aspect-video rounded-lg overflow-hidden">
                                  <img
                                    src={image || "/placeholder.svg"}
                                    alt={`${selectedEvent.title} ${index + 1}`}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Event Details */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-3">Event Information</h4>
                              <div className="space-y-2">
                                <div>
                                  <Label className="text-sm text-muted-foreground">Client</Label>
                                  <p>{selectedEvent.client}</p>
                                </div>
                                <div>
                                  <Label className="text-sm text-muted-foreground">Date</Label>
                                  <p>{selectedEvent.date}</p>
                                </div>
                                <div>
                                  <Label className="text-sm text-muted-foreground">Venue</Label>
                                  <p>{selectedEvent.venue}</p>
                                </div>
                                <div>
                                  <Label className="text-sm text-muted-foreground">Guests</Label>
                                  <p>{selectedEvent.guests} people</p>
                                </div>
                                {selectedEvent.rating && (
                                  <div>
                                    <Label className="text-sm text-muted-foreground">Rating</Label>
                                    <div className="flex items-center space-x-2">
                                      {renderStars(selectedEvent.rating)}
                                      <span className="text-sm">({selectedEvent.rating}/5)</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-3">Services Provided</h4>
                              <div className="flex flex-wrap gap-2">
                                {selectedEvent.services.map((service, index) => (
                                  <Badge key={index} variant="outline">
                                    {service}
                                  </Badge>
                                ))}
                              </div>

                              <h4 className="font-semibold mb-3 mt-4">Event Highlights</h4>
                              <ul className="space-y-1">
                                {selectedEvent.highlights.map((highlight, index) => (
                                  <li key={index} className="text-sm flex items-start space-x-2">
                                    <span className="text-primary">•</span>
                                    <span>{highlight}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Testimonial */}
                          {selectedEvent.testimonial && (
                            <div>
                              <h4 className="font-semibold mb-3">Client Testimonial</h4>
                              <blockquote className="bg-muted p-4 rounded-lg italic">
                                "{selectedEvent.testimonial}"
                              </blockquote>
                            </div>
                          )}
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

      {filteredEvents.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">No events found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
