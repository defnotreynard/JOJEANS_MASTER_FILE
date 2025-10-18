"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
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

export function GalleryManagement() {
  const [galleryItems, setGalleryItems] = useState<any[]>([])
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
    couple: "",
    location: "",
    style: "Romantic",
    description: "",
    status: "draft",
    category: "wedding",
    package: "",
    services: [] as string[],
  })
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [uploadingImages, setUploadingImages] = useState(false)
  const [editUploadedImages, setEditUploadedImages] = useState<string[]>([])
  const [coverImage, setCoverImage] = useState<string>("")
  const [uploadingCoverImage, setUploadingCoverImage] = useState(false)
  const [editCoverImage, setEditCoverImage] = useState<string>("")

  useEffect(() => {
    fetchGalleryItems()
  }, [])

  const fetchGalleryItems = async () => {
    try {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setGalleryItems(data || [])
    } catch (error) {
      console.error("Error fetching gallery items:", error)
      toast({
        title: "Error",
        description: "Failed to load gallery items",
        variant: "destructive",
      })
    }
  }

  const filteredItems = galleryItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.location || "").toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
    const matchesStatus = statusFilter === "all" || item.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
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
        const filePath = `gallery/${fileName}`

        const { error: uploadError, data } = await supabase.storage
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
      const filePath = `gallery/${fileName}`

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

  const handleEditImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setUploadingImages(true)
    const imageUrls: string[] = []

    try {
      for (const file of Array.from(files)) {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `gallery/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('event-uploads')
          .upload(filePath, file)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('event-uploads')
          .getPublicUrl(filePath)

        imageUrls.push(publicUrl)
      }

      setEditUploadedImages([...editUploadedImages, ...imageUrls])
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

  const handleRemoveEditImage = (index: number) => {
    setEditUploadedImages(editUploadedImages.filter((_, i) => i !== index))
  }

  const handleEditCoverImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setUploadingCoverImage(true)

    try {
      const file = files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `cover-${Math.random()}.${fileExt}`
      const filePath = `gallery/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('event-uploads')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('event-uploads')
        .getPublicUrl(filePath)

      setEditCoverImage(publicUrl)
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

  const handleCreateItem = async () => {
    if (!newItem.title || !newItem.couple || !newItem.location) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    try {
      const { error } = await supabase.from("gallery").insert({
        title: newItem.title,
        couple: newItem.couple,
        location: newItem.location,
        style: newItem.style,
        description: newItem.description || null,
        status: newItem.status,
        category: newItem.category,
        package: newItem.package || null,
        services: newItem.services.length > 0 ? newItem.services : null,
        images: uploadedImages,
        cover_image: coverImage || null,
        likes: 0,
        views: 0,
      })

      if (error) throw error

      await fetchGalleryItems()
      setNewItem({
        title: "",
        couple: "",
        location: "",
        style: "Romantic",
        description: "",
        status: "draft",
        category: "wedding",
        package: "",
        services: [],
      })
      setUploadedImages([])
      setCoverImage("")
      setIsCreateDialogOpen(false)
      toast({
        title: "Success",
        description: "Gallery item created successfully",
      })
    } catch (error) {
      console.error("Error creating gallery item:", error)
      toast({
        title: "Error",
        description: "Failed to create gallery item",
        variant: "destructive",
      })
    }
  }

  const handleEditItem = (item: any) => {
    setEditingItem({
      ...item,
    })
    setEditUploadedImages(item.images || [])
    setEditCoverImage(item.cover_image || "")
    setIsEditDialogOpen(true)
  }

  const handleUpdateItem = async () => {
    if (!editingItem.title || !editingItem.couple || !editingItem.location) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    try {
      const { error } = await supabase
        .from("gallery")
        .update({
          title: editingItem.title,
          couple: editingItem.couple,
          location: editingItem.location,
          style: editingItem.style,
          description: editingItem.description || null,
          status: editingItem.status,
          category: editingItem.category,
          package: editingItem.package || null,
          services: editingItem.services && editingItem.services.length > 0 ? editingItem.services : null,
          images: editUploadedImages,
          cover_image: editCoverImage || null,
        })
        .eq("id", editingItem.id)

      if (error) throw error

      await fetchGalleryItems()
      setIsEditDialogOpen(false)
      setEditingItem(null)
      setEditUploadedImages([])
      setEditCoverImage("")
      toast({
        title: "Success",
        description: "Gallery item updated successfully",
      })
    } catch (error) {
      console.error("Error updating gallery item:", error)
      toast({
        title: "Error",
        description: "Failed to update gallery item",
        variant: "destructive",
      })
    }
  }

  const handleDeleteItem = async (id: string) => {
    try {
      const { error } = await supabase.from("gallery").delete().eq("id", id)

      if (error) throw error

      await fetchGalleryItems()
      toast({
        title: "Success",
        description: "Gallery item deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting gallery item:", error)
      toast({
        title: "Error",
        description: "Failed to delete gallery item",
        variant: "destructive",
      })
    }
  }

  const handleBulkDelete = async () => {
    try {
      const { error } = await supabase.from("gallery").delete().in("id", selectedItems)

      if (error) throw error

      await fetchGalleryItems()
      setSelectedItems([])
      toast({
        title: "Success",
        description: `${selectedItems.length} items deleted successfully`,
      })
    } catch (error) {
      console.error("Error deleting gallery items:", error)
      toast({
        title: "Error",
        description: "Failed to delete gallery items",
        variant: "destructive",
      })
    }
  }

  const handleToggleStatus = async (id: string) => {
    try {
      const item = galleryItems.find((item) => item.id === id)
      if (!item) return

      const newStatus = item.status === "published" ? "draft" : "published"
      const { error } = await supabase.from("gallery").update({ status: newStatus }).eq("id", id)

      if (error) throw error

      await fetchGalleryItems()
      toast({
        title: "Success",
        description: `Gallery item ${newStatus === "published" ? "published" : "unpublished"} successfully`,
      })
    } catch (error) {
      console.error("Error updating status:", error)
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      })
    }
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
            <DialogContent className="max-w-2xl max-h-[90vh]">
              <DialogHeader>
                <DialogTitle>Create New Gallery Item</DialogTitle>
                <DialogDescription>Add a new event to your gallery portfolio</DialogDescription>
              </DialogHeader>
              <ScrollArea className="max-h-[60vh] pr-4">
                <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                    placeholder="e.g., Romantic Garden Wedding"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="couple">Couple Names *</Label>
                    <Input
                      id="couple"
                      value={newItem.couple}
                      onChange={(e) => setNewItem({ ...newItem, couple: e.target.value })}
                      placeholder="e.g., Emma & James"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={newItem.location}
                      onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                      placeholder="e.g., Napa Valley, CA"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Event Category *</Label>
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
                    <Label htmlFor="style">Wedding Style</Label>
                    <Select
                      value={newItem.style}
                      onValueChange={(value) => setNewItem({ ...newItem, style: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Romantic">Romantic</SelectItem>
                        <SelectItem value="Modern">Modern</SelectItem>
                        <SelectItem value="Boho">Boho</SelectItem>
                        <SelectItem value="Classic">Classic</SelectItem>
                        <SelectItem value="Rustic">Rustic</SelectItem>
                        <SelectItem value="Whimsical">Whimsical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="package">Package (Optional)</Label>
                  <Select
                    value={newItem.package || "none"}
                    onValueChange={(value) => setNewItem({ ...newItem, package: value === "none" ? "" : value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a package" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="Silver">Silver Package</SelectItem>
                      <SelectItem value="Gold">Gold Package</SelectItem>
                      <SelectItem value="Platinum">Platinum Package</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    If no package selected, services will be shown instead
                  </p>
                </div>
                <div>
                  <Label>Services Availed (Optional)</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {[
                      'Venue Coordination',
                      'Catering',
                      'Photography & Videography',
                      'Sound & Lights',
                      'Styling & Decor',
                      'HMUA',
                      'Invitations',
                      'Bridal Car',
                      'Cakes & Desserts',
                      'Attires',
                    ].map((service) => (
                      <div key={service} className="flex items-center space-x-2">
                        <Checkbox
                          id={`service-${service}`}
                          checked={newItem.services.includes(service)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setNewItem({ ...newItem, services: [...newItem.services, service] })
                            } else {
                              setNewItem({ ...newItem, services: newItem.services.filter(s => s !== service) })
                            }
                          }}
                        />
                        <Label htmlFor={`service-${service}`} className="text-sm font-normal cursor-pointer">
                          {service}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    These services will be displayed if no package is selected
                  </p>
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
                  <Label htmlFor="cover-image">Cover Image (Front Card Image) *</Label>
                  <Input
                    id="cover-image"
                    type="file"
                    accept="image/*"
                    onChange={handleCoverImageUpload}
                    disabled={uploadingCoverImage}
                    className="cursor-pointer"
                  />
                  {uploadingCoverImage && (
                    <p className="text-sm text-muted-foreground mt-2">Uploading cover image...</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    This image will be displayed on the gallery card
                  </p>
                </div>
                
                {coverImage && (
                  <div>
                    <Label>Cover Image Preview</Label>
                    <div className="relative group mt-2">
                      <img
                        src={coverImage}
                        alt="Cover"
                        className="w-full h-48 object-cover rounded border"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8"
                        onClick={() => setCoverImage("")}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
                
                <div>
                  <Label htmlFor="images">Additional Gallery Images</Label>
                  <Input
                    id="images"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImages}
                    className="cursor-pointer"
                  />
                  {uploadingImages && (
                    <p className="text-sm text-muted-foreground mt-2">Uploading images...</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    Upload multiple images for the gallery modal
                  </p>
                </div>
                
                {uploadedImages.length > 0 && (
                  <div>
                    <Label>Uploaded Images ({uploadedImages.length})</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {uploadedImages.map((url, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={url}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-24 object-cover rounded border"
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleRemoveImage(index)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

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
              </ScrollArea>
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
                      src={item.cover_image || (item.images && item.images.length > 0 ? item.images[0] : "/placeholder.svg")}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                      {item.images?.length || 0} photos
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
                        {item.event_date && (
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(item.event_date).toLocaleDateString()}
                          </div>
                        )}
                        {item.guest_count && (
                          <div className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {item.guest_count}
                          </div>
                        )}
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
        <DialogContent className="max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Edit Gallery Item</DialogTitle>
            <DialogDescription>Update gallery item information</DialogDescription>
          </DialogHeader>
          {editingItem && (
            <>
              <ScrollArea className="max-h-[60vh] pr-4">
                <div className="space-y-4">
              <div>
                <Label htmlFor="edit-title">Event Title *</Label>
                <Input
                  id="edit-title"
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="e.g., Romantic Garden Wedding"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-couple">Couple Names *</Label>
                  <Input
                    id="edit-couple"
                    value={editingItem.couple}
                    onChange={(e) => setEditingItem({ ...editingItem, couple: e.target.value })}
                    placeholder="e.g., Emma & James"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-location">Location *</Label>
                  <Input
                    id="edit-location"
                    value={editingItem.location}
                    onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                    placeholder="e.g., Napa Valley, CA"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-category">Event Category *</Label>
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
                  <Label htmlFor="edit-style">Wedding Style</Label>
                  <Select
                    value={editingItem.style}
                    onValueChange={(value) => setEditingItem({ ...editingItem, style: value })}
                  >
                    <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Romantic">Romantic</SelectItem>
                        <SelectItem value="Modern">Modern</SelectItem>
                        <SelectItem value="Boho">Boho</SelectItem>
                        <SelectItem value="Classic">Classic</SelectItem>
                        <SelectItem value="Rustic">Rustic</SelectItem>
                        <SelectItem value="Whimsical">Whimsical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              <div>
                <Label htmlFor="edit-package">Package (Optional)</Label>
                <Select
                  value={editingItem.package || "none"}
                  onValueChange={(value) => setEditingItem({ ...editingItem, package: value === "none" ? "" : value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a package" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="Silver">Silver Package</SelectItem>
                    <SelectItem value="Gold">Gold Package</SelectItem>
                    <SelectItem value="Platinum">Platinum Package</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  If no package selected, services will be shown instead
                </p>
              </div>
              <div>
                <Label>Services Availed (Optional)</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {[
                    'Venue Coordination',
                    'Catering',
                    'Photography & Videography',
                    'Sound & Lights',
                    'Styling & Decor',
                    'HMUA',
                    'Invitations',
                    'Bridal Car',
                    'Cakes & Desserts',
                    'Attires',
                  ].map((service) => (
                    <div key={service} className="flex items-center space-x-2">
                      <Checkbox
                        id={`edit-service-${service}`}
                        checked={editingItem.services?.includes(service) || false}
                        onCheckedChange={(checked) => {
                          const currentServices = editingItem.services || []
                          if (checked) {
                            setEditingItem({ ...editingItem, services: [...currentServices, service] })
                          } else {
                            setEditingItem({ ...editingItem, services: currentServices.filter(s => s !== service) })
                          }
                        }}
                      />
                      <Label htmlFor={`edit-service-${service}`} className="text-sm font-normal cursor-pointer">
                        {service}
                      </Label>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  These services will be displayed if no package is selected
                </p>
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
                <Label htmlFor="edit-cover-image">Cover Image (Front Card Image) *</Label>
                <Input
                  id="edit-cover-image"
                  type="file"
                  accept="image/*"
                  onChange={handleEditCoverImageUpload}
                  disabled={uploadingCoverImage}
                  className="cursor-pointer"
                />
                {uploadingCoverImage && (
                  <p className="text-sm text-muted-foreground mt-2">Uploading cover image...</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  This image will be displayed on the gallery card
                </p>
              </div>
              
              {editCoverImage && (
                <div>
                  <Label>Cover Image Preview</Label>
                  <div className="relative group mt-2">
                    <img
                      src={editCoverImage}
                      alt="Cover"
                      className="w-full h-48 object-cover rounded border"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8"
                      onClick={() => setEditCoverImage("")}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
              
              <div>
                <Label htmlFor="edit-images">Additional Gallery Images</Label>
                <Input
                  id="edit-images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleEditImageUpload}
                  disabled={uploadingImages}
                  className="cursor-pointer"
                />
                {uploadingImages && (
                  <p className="text-sm text-muted-foreground mt-2">Uploading images...</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  Upload multiple images for the gallery modal
                </p>
              </div>
              
              {editUploadedImages.length > 0 && (
                <div>
                  <Label>Uploaded Images ({editUploadedImages.length})</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {editUploadedImages.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-24 object-cover rounded border"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleRemoveEditImage(index)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
            </ScrollArea>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateItem}>Update Gallery Item</Button>
            </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
