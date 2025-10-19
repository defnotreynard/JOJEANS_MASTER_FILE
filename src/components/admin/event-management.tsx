"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
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
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Plus, Eye, Edit, Trash2, Calendar, MapPin, Users, Upload, Move, Grid3X3, List } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export function EventManagement() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const serviceOptions = [
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
  ]

  const [events, setEvents] = useState<any[]>([])
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<any>(null)
  const [newEvent, setNewEvent] = useState({
    title: "",
    client: "",
    venue: "",
    event_date: "",
    event_type: "wedding",
    guests: "",
    status: "upcoming",
    description: "",
    highlights: "",
    services: [] as string[],
    package: "",
  })
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [uploadingImages, setUploadingImages] = useState(false)
  const [editUploadedImages, setEditUploadedImages] = useState<string[]>([])
  const [coverImage, setCoverImage] = useState<string>("")
  const [uploadingCoverImage, setUploadingCoverImage] = useState(false)
  const [editCoverImage, setEditCoverImage] = useState<string>("")

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setEvents(data || [])
    } catch (error) {
      console.error("Error fetching events:", error)
      toast({
        title: "Error",
        description: "Failed to load events",
        variant: "destructive",
      })
    }
  }

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      (event.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (event.venue_location || "").toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || event.event_type?.toLowerCase() === typeFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || event.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setUploadingImages(true)
    const imageUrls: string[] = []

    try {
      for (const file of Array.from(files)) {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `events/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('event-uploads')
          .upload(filePath, file)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('event-uploads')
          .getPublicUrl(filePath)

        imageUrls.push(publicUrl)
      }

      setUploadedImages([...uploadedImages, ...imageUrls])
      toast({
        title: "Success",
        description: `${imageUrls.length} images uploaded successfully`,
      })
    } catch (error) {
      console.error("Error uploading images:", error)
      toast({
        title: "Error",
        description: "Failed to upload images",
        variant: "destructive",
      })
    } finally {
      setUploadingImages(false)
    }
  }

  const handleRemoveImage = (index: number) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index))
  }

  const handleCoverImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setUploadingCoverImage(true)

    try {
      const file = files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `cover-${Math.random()}.${fileExt}`
      const filePath = `events/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('event-uploads')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('event-uploads')
        .getPublicUrl(filePath)

      setCoverImage(publicUrl)
      toast({
        title: "Success",
        description: "Cover image uploaded successfully",
      })
    } catch (error) {
      console.error("Error uploading cover image:", error)
      toast({
        title: "Error",
        description: "Failed to upload cover image",
        variant: "destructive",
      })
    } finally {
      setUploadingCoverImage(false)
    }
  }

  const handleCreateEvent = async () => {
    if (!newEvent.title || !newEvent.client || !newEvent.venue) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    try {
      // Store metadata in a JSONB field or separate table if needed
      const eventMetadata = {
        client: newEvent.client,
        description: newEvent.description,
        highlights: newEvent.highlights,
        images: uploadedImages,
        cover_image: coverImage,
      }

      const { error } = await supabase.from("events").insert({
        event_type: newEvent.event_type,
        event_date: newEvent.event_date || null,
        venue_location: newEvent.venue,
        guest_count: newEvent.guests ? parseInt(newEvent.guests) : null,
        status: newEvent.status,
        reference_id: `EVT-${Date.now()}`,
        user_id: (await supabase.auth.getUser()).data.user?.id || "",
        package: newEvent.package || null,
        services: newEvent.services.length > 0 ? newEvent.services : null
      })

      if (error) throw error

      await fetchEvents()
      setNewEvent({
        title: "",
        client: "",
        venue: "",
        event_date: "",
        event_type: "wedding",
        guests: "",
        status: "upcoming",
        description: "",
        highlights: "",
        services: [],
        package: "",
      })
      setUploadedImages([])
      setCoverImage("")
      setIsCreateDialogOpen(false)
      toast({
        title: "Success",
        description: "Event created successfully",
      })
    } catch (error) {
      console.error("Error creating event:", error)
      toast({
        title: "Error",
        description: "Failed to create event",
        variant: "destructive",
      })
    }
  }

  const handleMoveToGallery = async (event: any) => {
    try {
      // Create gallery item from event data
      const { error: galleryError } = await supabase.from("gallery").insert({
        title: `${event.event_type} Event`,
        category: event.event_type,
        location: event.venue_location,
        event_date: event.event_date,
        guest_count: event.guest_count,
        status: "published",
        images: [], // Add images if stored
        likes: 0,
        views: 0,
      })

      if (galleryError) throw galleryError

      // Delete the event from events table
      const { error: deleteError } = await supabase
        .from("events")
        .delete()
        .eq("id", event.id)

      if (deleteError) throw deleteError

      await fetchEvents()
      toast({
        title: "Success",
        description: "Event moved to gallery successfully",
      })
    } catch (error) {
      console.error("Error moving event to gallery:", error)
      toast({
        title: "Error",
        description: "Failed to move event to gallery",
        variant: "destructive",
      })
    }
  }

  const handleDeleteEvent = async (id: string) => {
    try {
      const { error } = await supabase.from("events").delete().eq("id", id)

      if (error) throw error

      await fetchEvents()
      toast({
        title: "Success",
        description: "Event deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting event:", error)
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "secondary"
      case "ongoing":
        return "default"
      case "completed":
        return "outline"
      default:
        return "outline"
    }
  }

  const handleEditEvent = async () => {
    if (!editingEvent) return

    try {
      const { error } = await supabase
        .from("events")
        .update({
          event_type: editingEvent.event_type,
          event_date: editingEvent.event_date || null,
          venue_location: editingEvent.venue_location,
          guest_count: editingEvent.guest_count ? parseInt(editingEvent.guest_count) : null,
          status: editingEvent.status,
          package: editingEvent.package || null,
          services: editingEvent.services && editingEvent.services.length > 0 ? editingEvent.services : null
        })
        .eq("id", editingEvent.id)

      if (error) throw error

      await fetchEvents()
      setEditingEvent(null)
      setIsEditDialogOpen(false)
      toast({
        title: "Success",
        description: "Event updated successfully",
      })
    } catch (error) {
      console.error("Error updating event:", error)
      toast({
        title: "Error",
        description: "Failed to update event",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Event Management</h1>
          <p className="text-muted-foreground">Manage past events and create new ones</p>
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
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh]">
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
                <DialogDescription>Create a new event record for portfolio and reference</DialogDescription>
              </DialogHeader>
            <ScrollArea className="max-h-[calc(90vh-200px)] pr-4">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Event Title *</Label>
                    <Input
                      id="title"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      placeholder="e.g., Santos-Reyes Wedding"
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Event Type *</Label>
                    <Select value={newEvent.event_type} onValueChange={(value) => setNewEvent({ ...newEvent, event_type: value })}>
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
                    <Label htmlFor="client">Client Name *</Label>
                    <Input
                      id="client"
                      value={newEvent.client}
                      onChange={(e) => setNewEvent({ ...newEvent, client: e.target.value })}
                      placeholder="Client name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="date">Event Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newEvent.event_date}
                      onChange={(e) => setNewEvent({ ...newEvent, event_date: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="venue">Venue *</Label>
                  <Input
                    id="venue"
                    value={newEvent.venue}
                    onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
                    placeholder="Event venue location"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="guests">Number of Guests</Label>
                    <Input
                      id="guests"
                      type="number"
                      value={newEvent.guests}
                      onChange={(e) => setNewEvent({ ...newEvent, guests: e.target.value })}
                      placeholder="150"
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={newEvent.status} onValueChange={(value) => setNewEvent({ ...newEvent, status: value })}>
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
                  <Label htmlFor="package">Package (Optional)</Label>
                  <Select
                    value={newEvent.package}
                    onValueChange={(value) => setNewEvent({ ...newEvent, package: value === "none" ? "" : value })}
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
                  <Label>Services (Optional)</Label>
                  <div className="border rounded-md p-4 max-h-48 overflow-y-auto space-y-2">
                    {serviceOptions.map((service) => (
                      <div key={service} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`service-${service}`}
                          checked={newEvent.services.includes(service)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewEvent({
                                ...newEvent,
                                services: [...newEvent.services, service]
                              });
                            } else {
                              setNewEvent({
                                ...newEvent,
                                services: newEvent.services.filter((s) => s !== service)
                              });
                            }
                          }}
                          className="w-4 h-4 rounded border-gray-300"
                        />
                        <label
                          htmlFor={`service-${service}`}
                          className="text-sm cursor-pointer"
                        >
                          {service}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    placeholder="Event description..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="highlights">Event Highlights</Label>
                  <Textarea
                    id="highlights"
                    value={newEvent.highlights}
                    onChange={(e) => setNewEvent({ ...newEvent, highlights: e.target.value })}
                    placeholder="Key highlights and features of the event..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Cover Image</Label>
                  <div className="mt-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverImageUpload}
                      disabled={uploadingCoverImage}
                    />
                    {coverImage && (
                      <div className="mt-2">
                        <img src={coverImage} alt="Cover" className="w-full h-40 object-cover rounded-lg" />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCoverImage("")}
                          className="mt-2"
                        >
                          Remove Cover
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label>Event Images</Label>
                  <div className="mt-2">
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      disabled={uploadingImages}
                    />
                    {uploadedImages.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        {uploadedImages.map((url, index) => (
                          <div key={index} className="relative">
                            <img src={url} alt={`Upload ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleRemoveImage(index)}
                              className="absolute top-1 right-1"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </ScrollArea>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateEvent}>Create Event</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>

      {/* Edit Event Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Event</DialogTitle>
              <DialogDescription>Update event details</DialogDescription>
            </DialogHeader>
            {editingEvent && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-type">Event Type</Label>
                    <Select 
                      value={editingEvent.event_type} 
                      onValueChange={(value) => setEditingEvent({ ...editingEvent, event_type: value })}
                    >
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
                  <div>
                    <Label htmlFor="edit-date">Event Date</Label>
                    <Input
                      id="edit-date"
                      type="date"
                      value={editingEvent.event_date || ""}
                      onChange={(e) => setEditingEvent({ ...editingEvent, event_date: e.target.value })}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="edit-venue">Venue</Label>
                  <Input
                    id="edit-venue"
                    value={editingEvent.venue_location || ""}
                    onChange={(e) => setEditingEvent({ ...editingEvent, venue_location: e.target.value })}
                    placeholder="Event venue location"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-guests">Number of Guests</Label>
                    <Input
                      id="edit-guests"
                      type="number"
                      value={editingEvent.guest_count || ""}
                      onChange={(e) => setEditingEvent({ ...editingEvent, guest_count: e.target.value })}
                      placeholder="150"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-status">Status</Label>
                    <Select
                      value={editingEvent.status}
                      onValueChange={(value) => setEditingEvent({ ...editingEvent, status: value })}
                    >
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

                  <div className="space-y-2">
                    <Label htmlFor="edit-package">Package (Optional)</Label>
                    <Select
                      value={editingEvent.package || "none"}
                      onValueChange={(value) => setEditingEvent({ ...editingEvent, package: value === "none" ? "" : value })}
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

                  <div className="space-y-2">
                    <Label>Services (Optional)</Label>
                    <div className="border rounded-md p-4 max-h-48 overflow-y-auto space-y-2">
                      {serviceOptions.map((service) => (
                        <div key={service} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`edit-service-${service}`}
                            checked={(editingEvent.services || []).includes(service)}
                            onChange={(e) => {
                              const currentServices = editingEvent.services || [];
                              if (e.target.checked) {
                                setEditingEvent({
                                  ...editingEvent,
                                  services: [...currentServices, service]
                                });
                              } else {
                                setEditingEvent({
                                  ...editingEvent,
                                  services: currentServices.filter((s: string) => s !== service)
                                });
                              }
                            }}
                            className="w-4 h-4 rounded border-gray-300"
                          />
                          <label
                            htmlFor={`edit-service-${service}`}
                            className="text-sm cursor-pointer"
                          >
                            {service}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditEvent}>
                Update Event
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

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
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
          <Card key={event.id} className="hover:shadow-md transition-shadow">
            <div className="aspect-video relative overflow-hidden rounded-t-lg bg-muted flex items-center justify-center">
              {event.venue_location ? (
                <div className="p-4">
                  <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-center">{event.venue_location}</p>
                </div>
              ) : (
                <p className="text-muted-foreground">No image</p>
              )}
              <div className="absolute top-2 right-2">
                <Badge variant={getStatusColor(event.status)}>{event.status}</Badge>
              </div>
            </div>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg">{event.event_type}</h3>
                  <p className="text-sm text-muted-foreground">Ref: {event.reference_id}</p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{event.event_date || "No date set"}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{event.venue_location || "No venue"}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{event.guest_count || 0} guests</span>
                  </div>
                </div>

                {event.package && event.package !== "none" && (
                  <div className="mt-2 pt-2 border-t">
                    <p className="text-sm font-semibold text-primary">Package: {event.package}</p>
                  </div>
                )}
                
                {event.services && event.services.length > 0 && (
                  <div className="mt-2 pt-2 border-t">
                    <p className="text-sm font-semibold mb-1">Services:</p>
                    <div className="flex flex-wrap gap-1">
                      {event.services.map((service: string, index: number) => (
                        <span
                          key={index}
                          className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingEvent(event)
                      setIsEditDialogOpen(true)
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMoveToGallery(event)}
                  >
                    <Move className="h-4 w-4 mr-2" />
                    Move to Gallery
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Event</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this event? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteEvent(event.id)}>
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
        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <h3 className="text-lg font-semibold">{event.event_type}</h3>
                        <Badge variant={getStatusColor(event.status)}>{event.status}</Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">Ref: {event.reference_id}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{event.event_date || "No date set"}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{event.venue_location || "No venue"}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{event.guest_count || 0} guests</span>
                      </div>
                    </div>

                    {event.package && event.package !== "none" && (
                      <div>
                        <p className="text-sm font-semibold text-primary">Package: {event.package}</p>
                      </div>
                    )}
                    
                    {event.services && event.services.length > 0 && (
                      <div>
                        <p className="text-sm font-semibold mb-1">Services:</p>
                        <div className="flex flex-wrap gap-1">
                          {event.services.map((service: string, index: number) => (
                            <span
                              key={index}
                              className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingEvent(event)
                        setIsEditDialogOpen(true)
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMoveToGallery(event)}
                    >
                      <Move className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Event</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this event? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteEvent(event.id)}>
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
