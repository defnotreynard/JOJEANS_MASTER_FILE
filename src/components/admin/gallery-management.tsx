"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Upload,
  Eye,
  Copy,
  Move,
  Grid3X3,
  List,
  ImageIcon,
  Calendar,
  Users,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

// Mock gallery data
const mockGalleryItems = [
  {
    id: "1",
    title: "Maria & John's Garden Wedding",
    category: "wedding",
    eventDate: "2024-01-15",
    location: "Dumaguete Garden Resort",
    guests: 150,
    images: [
      {
        id: "img1",
        url: "/elegant-wedding-reception-with-teal-decorations-an.jpg",
        caption: "Reception setup with teal decorations",
        alt: "Wedding reception with elegant teal decorations",
        featured: true,
      },
      {
        id: "img2",
        url: "/wedding-ceremony-outdoor-setup.jpg",
        caption: "Outdoor ceremony setup",
        alt: "Beautiful outdoor wedding ceremony setup",
        featured: false,
      },
      {
        id: "img3",
        url: "/wedding-reception-table-setting.jpg",
        caption: "Table setting details",
        alt: "Elegant wedding table setting",
        featured: false,
      },
      {
        id: "img4",
        url: "/wedding-dance-floor-celebration.jpg",
        caption: "Dance floor celebration",
        alt: "Wedding guests celebrating on dance floor",
        featured: false,
      },
    ],
    description: "A romantic garden wedding with teal accents and elegant floral arrangements",
    tags: ["garden", "teal", "elegant", "outdoor"],
    status: "published",
    createdAt: "2024-01-20",
    updatedAt: "2024-01-20",
  },
  {
    id: "2",
    title: "Tech Corp Annual Gala",
    category: "corporate",
    eventDate: "2024-01-10",
    location: "Dumaguete Convention Center",
    guests: 200,
    images: [
      {
        id: "img5",
        url: "/corporate-event-with-led-wall-and-professional-lig.jpg",
        caption: "LED wall presentation setup",
        alt: "Corporate event with LED wall and professional lighting",
        featured: true,
      },
      {
        id: "img6",
        url: "/modern-startup-launch-event-with-tech-displays.jpg",
        caption: "Tech displays and networking area",
        alt: "Modern startup launch event with tech displays",
        featured: false,
      },
    ],
    description: "Professional corporate gala with LED wall presentations and premium catering",
    tags: ["corporate", "professional", "LED", "gala"],
    status: "published",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
  },
  {
    id: "3",
    title: "Sarah's 25th Birthday Bash",
    category: "birthday",
    eventDate: "2024-01-05",
    location: "Private Residence",
    guests: 80,
    images: [
      {
        id: "img7",
        url: "/colorful-birthday-party-with-teal-decorations-and-.jpg",
        caption: "Colorful birthday party setup",
        alt: "Vibrant birthday party with teal decorations",
        featured: true,
      },
    ],
    description: "Vibrant birthday celebration with custom decorations and entertainment",
    tags: ["birthday", "colorful", "party", "celebration"],
    status: "draft",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-12",
  },
]

export function GalleryManagement() {
  const [galleryItems, setGalleryItems] = useState(mockGalleryItems)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [newItem, setNewItem] = useState({
    title: "",
    category: "wedding",
    eventDate: "",
    location: "",
    guests: "",
    description: "",
    tags: "",
    status: "draft",
  })

  const filteredItems = galleryItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
    const matchesStatus = statusFilter === "all" || item.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleCreateItem = () => {
    if (!newItem.title || !newItem.eventDate || !newItem.location) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const item = {
      id: Date.now().toString(),
      ...newItem,
      guests: Number.parseInt(newItem.guests) || 0,
      tags: newItem.tags.split(",").map((tag) => tag.trim()),
      images: [],
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    }

    setGalleryItems([...galleryItems, item])
    setNewItem({
      title: "",
      category: "wedding",
      eventDate: "",
      location: "",
      guests: "",
      description: "",
      tags: "",
      status: "draft",
    })
    setIsCreateDialogOpen(false)
    toast({
      title: "Success",
      description: "Gallery item created successfully",
    })
  }

  const handleEditItem = (item: any) => {
    setEditingItem({
      ...item,
      guests: item.guests.toString(),
      tags: item.tags.join(", "),
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdateItem = () => {
    if (!editingItem.title || !editingItem.eventDate || !editingItem.location) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const updatedItem = {
      ...editingItem,
      guests: Number.parseInt(editingItem.guests) || 0,
      tags: editingItem.tags.split(",").map((tag: string) => tag.trim()),
      updatedAt: new Date().toISOString().split("T")[0],
    }

    setGalleryItems(galleryItems.map((item) => (item.id === editingItem.id ? updatedItem : item)))
    setIsEditDialogOpen(false)
    setEditingItem(null)
    toast({
      title: "Success",
      description: "Gallery item updated successfully",
    })
  }

  const handleDeleteItem = (id: string) => {
    setGalleryItems(galleryItems.filter((item) => item.id !== id))
    toast({
      title: "Success",
      description: "Gallery item deleted successfully",
    })
  }

  const handleBulkDelete = () => {
    setGalleryItems(galleryItems.filter((item) => !selectedItems.includes(item.id)))
    setSelectedItems([])
    toast({
      title: "Success",
      description: `${selectedItems.length} items deleted successfully`,
    })
  }

  const handleToggleStatus = (id: string) => {
    setGalleryItems(
      galleryItems.map((item) =>
        item.id === id ? { ...item, status: item.status === "published" ? "draft" : "published" } : item,
      ),
    )
    toast({
      title: "Success",
      description: "Status updated successfully",
    })
  }

  const handleSelectItem = (id: string) => {
    setSelectedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const handleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(filteredItems.map((item) => item.id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gallery Management</h1>
          <p className="text-muted-foreground">Manage event photos and portfolio items</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
            {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Gallery Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Gallery Item</DialogTitle>
                <DialogDescription>Add a new event to your gallery portfolio</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                    placeholder="e.g., Maria & John's Garden Wedding"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newItem.category}
                      onValueChange={(value) => setNewItem({ ...newItem, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wedding">Wedding</SelectItem>
                        <SelectItem value="corporate">Corporate</SelectItem>
                        <SelectItem value="birthday">Birthday</SelectItem>
                        <SelectItem value="debut">Debut</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="eventDate">Event Date *</Label>
                    <Input
                      id="eventDate"
                      type="date"
                      value={newItem.eventDate}
                      onChange={(e) => setNewItem({ ...newItem, eventDate: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={newItem.location}
                      onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                      placeholder="Event venue"
                    />
                  </div>
                  <div>
                    <Label htmlFor="guests">Number of Guests</Label>
                    <Input
                      id="guests"
                      type="number"
                      value={newItem.guests}
                      onChange={(e) => setNewItem({ ...newItem, guests: e.target.value })}
                      placeholder="150"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    placeholder="Brief description of the event..."
                  />
                </div>
                <div>
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={newItem.tags}
                    onChange={(e) => setNewItem({ ...newItem, tags: e.target.value })}
                    placeholder="garden, elegant, outdoor, teal"
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={newItem.status} onValueChange={(value) => setNewItem({ ...newItem, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateItem}>Create Gallery Item</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Gallery Items</CardTitle>
          <CardDescription>Manage your event portfolio and photo galleries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search gallery items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="wedding">Wedding</SelectItem>
                <SelectItem value="corporate">Corporate</SelectItem>
                <SelectItem value="birthday">Birthday</SelectItem>
                <SelectItem value="debut">Debut</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bulk Actions */}
          {selectedItems.length > 0 && (
            <div className="flex items-center justify-between bg-muted p-4 rounded-lg mb-6">
              <span className="text-sm font-medium">{selectedItems.length} items selected</span>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate
                </Button>
                <Button variant="outline" size="sm">
                  <Move className="h-4 w-4 mr-2" />
                  Move
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Selected Items</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete {selectedItems.length} selected items? This action cannot be
                        undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleBulkDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          )}

          {/* Gallery Items */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="relative">
                    <div className="absolute top-2 left-2 z-10">
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={() => handleSelectItem(item.id)}
                        className="bg-white/80"
                      />
                    </div>
                    <div className="absolute top-2 right-2 z-10">
                      <Badge variant={item.status === "published" ? "default" : "secondary"}>{item.status}</Badge>
                    </div>
                    <img
                      src={item.images[0]?.url || "/placeholder.svg"}
                      alt={item.images[0]?.alt || item.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                      {item.images.length} photos
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold truncate">{item.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                      <div className="flex items-center text-xs text-muted-foreground space-x-4">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {item.eventDate}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {item.guests}
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-1">
                          <Button variant="ghost" size="sm" onClick={() => handleEditItem(item)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Upload className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleStatus(item.id)}
                            className={item.status === "published" ? "text-primary" : ""}
                          >
                            {item.status === "published" ? "Published" : "Draft"}
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Gallery Item</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{item.title}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteItem(item.id)}>Delete</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-2 border-b font-medium text-sm">
                <Checkbox checked={selectedItems.length === filteredItems.length} onCheckedChange={handleSelectAll} />
                <div className="flex-1">Title</div>
                <div className="w-24">Category</div>
                <div className="w-24">Status</div>
                <div className="w-20">Photos</div>
                <div className="w-24">Date</div>
                <div className="w-32">Actions</div>
              </div>
              {filteredItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-2 hover:bg-muted/50 rounded">
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={() => handleSelectItem(item.id)}
                  />
                  <div className="flex items-center space-x-3 flex-1">
                    <img
                      src={item.images[0]?.url || "/placeholder.svg"}
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground truncate max-w-xs">{item.description}</p>
                    </div>
                  </div>
                  <div className="w-24">
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>
                  <div className="w-24">
                    <Badge variant={item.status === "published" ? "default" : "secondary"}>{item.status}</Badge>
                  </div>
                  <div className="w-20 text-sm">{item.images.length}</div>
                  <div className="w-24 text-sm">{item.eventDate}</div>
                  <div className="w-32 flex items-center space-x-1">
                    <Button variant="ghost" size="sm" onClick={() => handleEditItem(item)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Gallery Item</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{item.title}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteItem(item.id)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No gallery items found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Gallery Item</DialogTitle>
            <DialogDescription>Update gallery item information</DialogDescription>
          </DialogHeader>
          {editingItem && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-title">Event Title *</Label>
                <Input
                  id="edit-title"
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="e.g., Maria & John's Garden Wedding"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-category">Category</Label>
                  <Select
                    value={editingItem.category}
                    onValueChange={(value) => setEditingItem({ ...editingItem, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wedding">Wedding</SelectItem>
                      <SelectItem value="corporate">Corporate</SelectItem>
                      <SelectItem value="birthday">Birthday</SelectItem>
                      <SelectItem value="debut">Debut</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-eventDate">Event Date *</Label>
                  <Input
                    id="edit-eventDate"
                    type="date"
                    value={editingItem.eventDate}
                    onChange={(e) => setEditingItem({ ...editingItem, eventDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-location">Location *</Label>
                  <Input
                    id="edit-location"
                    value={editingItem.location}
                    onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                    placeholder="Event venue"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-guests">Number of Guests</Label>
                  <Input
                    id="edit-guests"
                    type="number"
                    value={editingItem.guests}
                    onChange={(e) => setEditingItem({ ...editingItem, guests: e.target.value })}
                    placeholder="150"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  placeholder="Brief description of the event..."
                />
              </div>
              <div>
                <Label htmlFor="edit-tags">Tags (comma-separated)</Label>
                <Input
                  id="edit-tags"
                  value={editingItem.tags}
                  onChange={(e) => setEditingItem({ ...editingItem, tags: e.target.value })}
                  placeholder="garden, elegant, outdoor, teal"
                />
              </div>
              <div>
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={editingItem.status}
                  onValueChange={(value) => setEditingItem({ ...editingItem, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateItem}>Update Gallery Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
