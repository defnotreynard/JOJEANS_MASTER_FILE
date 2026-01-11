import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { CreateEventModal } from '@/components/CreateEventModal';
import { UserChat } from '@/components/chat/UserChat';
import { 
  Calendar, 
  Users, 
  Calculator, 
  Settings,
  Plus,
  Heart,
  MapPin,
  DollarSign,
  UserPlus,
  Mail,
  Trash2,
  Download,
  Edit,
  CheckCircle2,
  XCircle,
  Clock,
  FileText
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

const UserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('home');
  const [createEventModalOpen, setCreateEventModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [userEvents, setUserEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [guests, setGuests] = useState<any[]>([]);
  const [selectedEventForGuests, setSelectedEventForGuests] = useState<string>('');
  const [showAddGuestModal, setShowAddGuestModal] = useState(false);
  const [editingGuest, setEditingGuest] = useState<any>(null);
  const [guestForm, setGuestForm] = useState({
    name: '',
    email: '',
    phone: '',
    rsvp_status: 'pending',
    meal_preference: '',
    group_name: '',
    table_number: '',
    notes: ''
  });
  const [guestSearchQuery, setGuestSearchQuery] = useState('');

  // Handle URL params to auto-open add event modal
  useEffect(() => {
    const openAddEvent = searchParams.get('openAddEvent');
    const packageParam = searchParams.get('package');
    
    if (openAddEvent === 'true') {
      setSelectedPackage(packageParam);
      setCreateEventModalOpen(true);
      // Clear the URL params after opening the modal
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

  // Check if user has admin/super_admin role and redirect
  useEffect(() => {
    const checkRoleAndRedirect = async () => {
      if (!user) return;

      const { data } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .maybeSingle();

      if (data) {
        if (data.role === 'super_admin') {
          navigate('/super-admin');
        } else if (data.role === 'admin') {
          navigate('/admin');
        }
      }
    };

    checkRoleAndRedirect();
  }, [user, navigate]);

  useEffect(() => {
    if (user) {
      fetchUserEvents();
    }
  }, [user]);

  useEffect(() => {
    if (selectedEventForGuests) {
      fetchGuests();
    }
  }, [selectedEventForGuests]);

  const fetchUserEvents = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching events:', error);
    } else {
      setUserEvents(data || []);
    }
  };

  const handleEventCreated = () => {
    fetchUserEvents();
  };

  const handleEditEvent = (event: any) => {
    setEditingEvent(event);
    setCreateEventModalOpen(true);
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      return;
    }

    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', eventId);

    if (error) {
      console.error('Error deleting event:', error);
      alert('Error deleting event: ' + error.message);
      return;
    }

    alert('Event deleted successfully!');
    fetchUserEvents();
  };

  const handleModalClose = () => {
    setCreateEventModalOpen(false);
    setEditingEvent(null);
    setSelectedPackage(null);
  };

  const fetchGuests = async () => {
    if (!selectedEventForGuests) return;

    const { data, error } = await supabase
      .from('guests')
      .select('*')
      .eq('event_id', selectedEventForGuests)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching guests:', error);
    } else {
      setGuests(data || []);
    }
  };

  const handleAddGuest = () => {
    setEditingGuest(null);
    setGuestForm({
      name: '',
      email: '',
      phone: '',
      rsvp_status: 'pending',
      meal_preference: '',
      group_name: '',
      table_number: '',
      notes: ''
    });
    setShowAddGuestModal(true);
  };

  const handleEditGuest = (guest: any) => {
    setEditingGuest(guest);
    setGuestForm({
      name: guest.name,
      email: guest.email || '',
      phone: guest.phone || '',
      rsvp_status: guest.rsvp_status,
      meal_preference: guest.meal_preference || '',
      group_name: guest.group_name || '',
      table_number: guest.table_number?.toString() || '',
      notes: guest.notes || ''
    });
    setShowAddGuestModal(true);
  };

  const handleSaveGuest = async () => {
    if (!guestForm.name.trim()) {
      alert('Please enter guest name');
      return;
    }

    if (!selectedEventForGuests) {
      alert('Please select an event first');
      return;
    }

    const guestData = {
      event_id: selectedEventForGuests,
      user_id: user?.id,
      name: guestForm.name,
      email: guestForm.email || null,
      phone: guestForm.phone || null,
      rsvp_status: guestForm.rsvp_status,
      meal_preference: guestForm.meal_preference || null,
      group_name: guestForm.group_name || null,
      table_number: guestForm.table_number ? parseInt(guestForm.table_number) : null,
      notes: guestForm.notes || null
    };

    if (editingGuest) {
      const { error } = await supabase
        .from('guests')
        .update(guestData)
        .eq('id', editingGuest.id);

      if (error) {
        console.error('Error updating guest:', error);
        alert('Error updating guest: ' + error.message);
        return;
      }

      alert('Guest updated successfully!');
    } else {
      const { data: newGuest, error } = await supabase
        .from('guests')
        .insert(guestData)
        .select()
        .single();

      if (error) {
        console.error('Error adding guest:', error);
        alert('Error adding guest: ' + error.message);
        return;
      }

      // Send invitation email if guest has an email
      if (guestForm.email && newGuest) {
        try {
          const selectedEventData = userEvents.find(e => e.id === selectedEventForGuests);
          
          // Get user's profile name
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('user_id', user?.id)
            .single();

          await supabase.functions.invoke('send-guest-invitation', {
            body: {
              guestName: guestForm.name,
              guestEmail: guestForm.email,
              eventType: selectedEventData?.event_type || 'Event',
              eventDate: selectedEventData?.event_date 
                ? new Date(selectedEventData.event_date).toLocaleDateString() 
                : 'TBD',
              eventLocation: selectedEventData?.venue_location || 'Location TBD',
              hostName: profile?.full_name || 'The Host',
              guestId: newGuest.id
            }
          });

          alert('Guest added and invitation email sent!');
        } catch (emailError) {
          console.error('Error sending invitation email:', emailError);
          alert('Guest added but failed to send invitation email. Please try again later.');
        }
      } else {
        alert('Guest added successfully!');
      }
    }

    setShowAddGuestModal(false);
    fetchGuests();
  };

  const handleDeleteGuest = async (guestId: string) => {
    if (!confirm('Are you sure you want to delete this guest?')) {
      return;
    }

    const { error } = await supabase
      .from('guests')
      .delete()
      .eq('id', guestId);

    if (error) {
      console.error('Error deleting guest:', error);
      alert('Error deleting guest: ' + error.message);
      return;
    }

    alert('Guest deleted successfully!');
    fetchGuests();
  };

  const exportGuestList = () => {
    if (guests.length === 0) {
      alert('No guests to export');
      return;
    }

    const csvContent = [
      ['Name', 'Email', 'Phone', 'RSVP Status', 'Meal Preference', 'Group', 'Table Number', 'Notes'],
      ...guests.map(g => [
        g.name,
        g.email || '',
        g.phone || '',
        g.rsvp_status,
        g.meal_preference || '',
        g.group_name || '',
        g.table_number || '',
        g.notes || ''
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `guest-list-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const getRSVPStats = () => {
    const attending = guests.filter(g => g.rsvp_status === 'attending').length;
    const declined = guests.filter(g => g.rsvp_status === 'declined').length;
    const pending = guests.filter(g => g.rsvp_status === 'pending').length;
    return { attending, declined, pending, total: guests.length };
  };

  const getRSVPIcon = (status: string) => {
    switch (status) {
      case 'attending':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'declined':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getRSVPBadgeVariant = (status: string) => {
    switch (status) {
      case 'attending':
        return 'default';
      case 'declined':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const filteredGuests = guests.filter(guest => {
    const searchLower = guestSearchQuery.toLowerCase();
    return (
      guest.name.toLowerCase().includes(searchLower) ||
      guest.email?.toLowerCase().includes(searchLower) ||
      guest.phone?.toLowerCase().includes(searchLower) ||
      guest.group_name?.toLowerCase().includes(searchLower)
    );
  });

  const formatEventDate = (dateStr: string | null) => {
    if (!dateStr) return 'Date not set';
    return new Date(dateStr).toLocaleDateString();
  };

  const getGuestDisplay = (count: number | null, range: string | null) => {
    if (count) return count.toString();
    if (range) {
      // Handle package format ranges (e.g., "50-100") directly
      if (range.includes('-')) return `${range} guests`;
      
      // Handle legacy enum format
      switch (range) {
        case 'less_than_50': return 'Less than 50';
        case '50_100': return '50-100';
        case '100_200': return '100-200';
        case 'more_than_200': return 'More than 200';
        default: return range; // Return as-is if it's a custom format
      }
    }
    return 'Not specified';
  };

  const getBudgetDisplay = (amount: number | null, range: string | null) => {
    if (amount) return `₱${amount.toLocaleString()}`;
    if (range) {
      // Handle legacy enum format
      switch (range) {
        case 'less_than_₱2000': return 'Less than ₱2,000';
        case '₱2000_₱3000': return '₱2,000-₱3,000';
        case '₱3000_₱5000': return '₱3,000-₱5,000';
        case '₱5000_plus': return '₱5,000+';
        default: return range; // Return as-is if it's a custom format
      }
    }
    return 'Not specified';
  };

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case "active":
        return "default"
      case "confirmed":
        return "default"
      case "pending":
        return "secondary"
      case "completed":
        return "outline"
      case "cancelled":
        return "destructive"
      default:
        return "secondary"
    }
  };

  const weddingEvents = [
    
  ];

  const upcomingTasks = [
    { id: 1, task: 'Book wedding photographer', dueDate: '2024-04-15', priority: 'high' },
    { id: 2, task: 'Send save the dates', dueDate: '2024-04-20', priority: 'medium' },
    { id: 3, task: 'Cake tasting appointments', dueDate: '2024-04-25', priority: 'medium' },
    { id: 4, task: 'Finalize guest list', dueDate: '2024-05-01', priority: 'low' }
  ];

  const nextSteps = [
    {
      title: 'Take the Style Quiz',
      description: 'Discover your wedding style preferences',
      action: 'Start the Quiz',
      icon: Heart,
      color: 'text-primary'
    },
    {
      title: 'Invite Your Partner',
      description: 'Collaborate on your wedding planning',
      action: 'Invite Partner',
      icon: UserPlus,
      color: 'text-wedding-gold'
    },
    {
      title: 'Manage Budget',
      description: 'Track your event expenses',
      action: 'View Budget',
      icon: DollarSign,
      color: 'text-wedding-sage'
    }
  ];

  return (
    <div className="min-h-screen bg-background page-transition">
      <Navigation />
      
      <main className="w-full">
        <div className="container mx-auto px-3 sm:px-6 py-4 sm:py-8">
          <div className="space-y-4 sm:space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-4xl font-heading font-bold text-foreground">
                  Wedding Dashboard
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
                  Plan, organize, and track your perfect day
                </p>
              </div>
              
              <Button 
                size="sm"
                className="sm:size-default w-full sm:w-auto"
                onClick={() => setCreateEventModalOpen(true)}
              >
                <Plus className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="text-xs sm:text-sm">Add Event</span>
              </Button>
            </div>

            {/* Tabs Navigation */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 gap-1 h-auto p-1">
                <TabsTrigger value="home" className="flex flex-col sm:flex-row items-center sm:space-x-2 px-2 py-2 text-xs sm:text-sm">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>Home</span>
                </TabsTrigger>
                <TabsTrigger value="guests" className="flex flex-col sm:flex-row items-center sm:space-x-2 px-2 py-2 text-xs sm:text-sm">
                  <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>Guests</span>
                </TabsTrigger>
              </TabsList>

              {/* Home Tab */}
              <TabsContent value="home" className="space-y-4 sm:space-y-8">
                {/* User Events Cards */}
                <div className="grid gap-3 sm:gap-6">
                  {userEvents.length > 0 ? userEvents.map((event) => (
                    <Card 
                      key={event.id} 
                      className="p-3 sm:p-6 hover:shadow-card transition-all cursor-pointer"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div className="grid lg:grid-cols-4 gap-3 sm:gap-6">
                        {/* Event Info */}
                        <div className="lg:col-span-2 space-y-3 sm:space-y-4">
                          <div>
                            <h2 className="text-lg sm:text-xl lg:text-2xl font-heading font-bold text-foreground">
                              {event.event_type}
                            </h2>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-muted-foreground mt-2 text-xs sm:text-sm">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span>{formatEventDate(event.event_date)}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span className="truncate">{event.venue_location || 'Location not set'}</span>
                              </div>
                            </div>
                            <div className="mt-2">
                              <Badge variant="secondary" className="text-xs">
                                Ref: {event.reference_id}
                              </Badge>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 sm:gap-4">
                            <div className="bg-primary/10 rounded-lg p-2 sm:p-3 text-center">
                              <div className="text-sm sm:text-lg lg:text-2xl font-bold text-primary">
                                {getGuestDisplay(event.guest_count, event.guest_count_range)}
                              </div>
                              <div className="text-[10px] sm:text-xs text-muted-foreground">Guests</div>
                            </div>
                            <div className="bg-wedding-sage/20 rounded-lg p-2 sm:p-3 text-center">
                              <div className="text-xs sm:text-sm lg:text-lg font-bold text-wedding-charcoal break-words">
                                {event.venue_location || 'Not booked'}
                              </div>
                              <div className="text-[10px] sm:text-xs text-muted-foreground">Venue</div>
                            </div>
                          </div>
                        </div>

                        {/* Status Section */}
                        <div className="space-y-3 sm:space-y-4">
                          <div>
                            <div className="text-xs sm:text-sm mb-2">Status</div>
                            <Badge variant={getStatusColor(event.status)} className="text-xs capitalize">
                              {event.status || 'Active'}
                            </Badge>
                          </div>
                          <div>
                            <div className="text-xs sm:text-sm mb-2">Created</div>
                            <div className="text-xs sm:text-sm text-muted-foreground">
                              {new Date(event.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-2 sm:space-y-3">
                          <Button 
                            size="sm"
                            className="w-full text-xs sm:text-sm" 
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedEvent(event);
                            }}
                          >
                            <Settings className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                            <span className="hidden sm:inline">View Details</span>
                            <span className="sm:hidden">View</span>
                          </Button>
                          <Button 
                            size="sm"
                            className="w-full text-xs sm:text-sm" 
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditEvent(event);
                            }}
                          >
                            Edit
                          </Button>
                          <Button 
                            size="sm"
                            className="w-full text-xs sm:text-sm" 
                            variant="destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteEvent(event.id);
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </Card>
                  )) : (
                    <Card className="p-6 sm:p-8 text-center">
                      <div className="space-y-3 sm:space-y-4">
                        <div className="text-3xl sm:text-4xl">🎉</div>
                        <h3 className="text-lg sm:text-xl font-semibold">No events yet</h3>
                        <p className="text-sm sm:text-base text-muted-foreground">
                          Create your first event to get started with planning!
                        </p>
                        <Button size="sm" className="text-xs sm:text-sm" onClick={() => setCreateEventModalOpen(true)}>
                          <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                          <span className="hidden sm:inline">Create Your First Event</span>
                          <span className="sm:hidden">Create Event</span>
                        </Button>
                      </div>
                    </Card>
                  )}
                </div>

                {/* Sample wedding events for reference */}
                {weddingEvents.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Sample Events</h3>
                    <div className="grid gap-6">
                      {weddingEvents.map((event) => (
                        <Card key={event.id} className="p-6 hover:shadow-card transition-all">
                          <div className="grid lg:grid-cols-4 gap-6">
                            {/* Event Info */}
                            <div className="lg:col-span-2 space-y-4">
                              <div>
                                <h2 className="text-2xl font-heading font-bold text-foreground">
                                  {event.names}
                                </h2>
                                <div className="flex items-center space-x-4 text-muted-foreground mt-2">
                                  <div className="flex items-center space-x-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>{new Date(event.date).toLocaleDateString()}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <MapPin className="h-4 w-4" />
                                    <span>{event.location}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="bg-primary/10 rounded-lg p-3 text-center">
                                  <div className="text-2xl font-bold text-primary">{event.daysLeft}</div>
                                  <div className="text-sm text-muted-foreground">Days to go</div>
                                </div>
                                <div className="bg-wedding-gold/10 rounded-lg p-3 text-center">
                                  <div className="text-2xl font-bold text-wedding-gold">{event.guests}</div>
                                  <div className="text-sm text-muted-foreground">Guests</div>
                                </div>
                                <div className="bg-wedding-sage/20 rounded-lg p-3 text-center">
                                  <div className="text-2xl font-bold text-wedding-charcoal">
                                    ${(event.spent / 1000).toFixed(0)}K
                                  </div>
                                  <div className="text-sm text-muted-foreground">Spent</div>
                                </div>
                                <div className="bg-wedding-blush/30 rounded-lg p-3 text-center">
                                  <div className="text-2xl font-bold text-wedding-charcoal">
                                    {Math.round((event.tasksCompleted / event.totalTasks) * 100)}%
                                  </div>
                                  <div className="text-sm text-muted-foreground">Complete</div>
                                </div>
                              </div>
                            </div>

                            {/* Progress Section */}
                            <div className="space-y-4">
                              <div>
                                <div className="flex justify-between text-sm mb-2">
                                  <span>Planning Progress</span>
                                  <span>{event.tasksCompleted}/{event.totalTasks} tasks</span>
                                </div>
                                <Progress 
                                  value={(event.tasksCompleted / event.totalTasks) * 100} 
                                  className="h-2"
                                />
                              </div>

                              <div>
                                <div className="flex justify-between text-sm mb-2">
                                  <span>Budget Used</span>
                                  <span>₱{event.spent.toLocaleString()} / ₱{event.budget.toLocaleString()}</span>
                                </div>
                                <Progress 
                                  value={(event.spent / event.budget) * 100} 
                                  className="h-2"
                                />
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="space-y-3">
                              <Button className="w-full" variant="outline">
                                <Settings className="h-4 w-4 mr-2" />
                                Manage Event
                              </Button>
                              <div className="text-sm text-muted-foreground text-center">
                                {event.collaborators} collaborators
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Next Steps Panel */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg lg:text-xl font-heading">Next Steps</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Complete these steps to make your planning even easier
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                      {nextSteps.map((step, index) => (
                        <div key={index} className="text-center space-y-3 sm:space-y-4">
                          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-accent flex items-center justify-center mx-auto`}>
                            <step.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${step.color}`} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-sm sm:text-base text-foreground">{step.title}</h3>
                            <p className="text-xs sm:text-sm text-muted-foreground mt-1">{step.description}</p>
                          </div>
                          <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                            {step.action}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming Tasks */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg lg:text-xl font-heading">Upcoming Tasks</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Stay on track with your wedding planning timeline
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 sm:space-y-4">
                      {upcomingTasks.map((task) => (
                        <div key={task.id} className="flex items-center justify-between p-3 sm:p-4 border rounded-lg">
                          <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                            <div className="min-w-0 flex-1">
                              <div className="font-medium text-xs sm:text-sm truncate">{task.task}</div>
                              <div className="text-[10px] sm:text-xs text-muted-foreground">
                                Due: {new Date(task.dueDate).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <Badge 
                            className="text-[10px] sm:text-xs flex-shrink-0 ml-2"
                            variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}
                          >
                            {task.priority}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full mt-3 sm:mt-4 text-xs sm:text-sm">
                      View All Tasks
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Other tabs content would go here */}
              <TabsContent value="guests" className="space-y-4">
                {/* Event Selector */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg">Select Event</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Choose an event to manage its guest list
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <select
                      className="w-full p-2 border rounded-md bg-background text-foreground"
                      value={selectedEventForGuests}
                      onChange={(e) => setSelectedEventForGuests(e.target.value)}
                    >
                      <option value="">-- Select an event --</option>
                      {userEvents.map((event) => (
                        <option key={event.id} value={event.id}>
                          {event.event_type} - {formatEventDate(event.event_date)} (Ref: {event.reference_id})
                        </option>
                      ))}
                    </select>
                  </CardContent>
                </Card>

                {selectedEventForGuests && (
                  <>
                    {/* RSVP Summary Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                      <Card className="p-3 sm:p-4">
                        <div className="text-center">
                          <div className="text-2xl sm:text-3xl font-bold text-foreground">
                            {getRSVPStats().total}
                          </div>
                          <div className="text-xs sm:text-sm text-muted-foreground mt-1">Total Guests</div>
                        </div>
                      </Card>
                      <Card className="p-3 sm:p-4">
                        <div className="text-center">
                          <div className="text-2xl sm:text-3xl font-bold text-green-500">
                            {getRSVPStats().attending}
                          </div>
                          <div className="text-xs sm:text-sm text-muted-foreground mt-1">Attending</div>
                        </div>
                      </Card>
                      <Card className="p-3 sm:p-4">
                        <div className="text-center">
                          <div className="text-2xl sm:text-3xl font-bold text-red-500">
                            {getRSVPStats().declined}
                          </div>
                          <div className="text-xs sm:text-sm text-muted-foreground mt-1">Declined</div>
                        </div>
                      </Card>
                      <Card className="p-3 sm:p-4">
                        <div className="text-center">
                          <div className="text-2xl sm:text-3xl font-bold text-yellow-500">
                            {getRSVPStats().pending}
                          </div>
                          <div className="text-xs sm:text-sm text-muted-foreground mt-1">Pending</div>
                        </div>
                      </Card>
                    </div>

                    {/* Actions Bar */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <Button onClick={handleAddGuest} size="sm" className="flex-1">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Guest
                      </Button>
                      <Button onClick={exportGuestList} size="sm" variant="outline" className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Export List
                      </Button>
                    </div>

                    {/* Search Filter */}
                    <Card className="p-3">
                      <input
                        type="text"
                        placeholder="Search guests by name, email, phone, or group..."
                        className="w-full p-2 border rounded-md bg-background text-foreground text-sm"
                        value={guestSearchQuery}
                        onChange={(e) => setGuestSearchQuery(e.target.value)}
                      />
                    </Card>

                    {/* Guest List Cards */}
                    <div className="space-y-2">
                      {filteredGuests.length > 0 ? (
                        filteredGuests.map((guest) => (
                          <Card key={guest.id} className="p-2 sm:p-3 hover:shadow-card transition-all">
                            <div className="grid sm:grid-cols-12 gap-2 sm:gap-3 items-center">
                              {/* Guest ID and Info - Similar to Booking ID */}
                              <div className="sm:col-span-5 space-y-1">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <Badge variant="secondary" className="text-[10px] font-mono px-1.5 py-0.5">
                                    ID: {guest.id.slice(0, 8)}
                                  </Badge>
                                  {guest.group_name && (
                                    <Badge variant="outline" className="text-[10px] px-1.5 py-0.5">
                                      {guest.group_name}
                                    </Badge>
                                  )}
                                </div>
                                <div>
                                  <h3 className="font-semibold text-sm">{guest.name}</h3>
                                  <div className="flex flex-col text-[11px] text-muted-foreground space-y-0.5">
                                    {guest.email && (
                                      <div className="flex items-center gap-1">
                                        <Mail className="h-2.5 w-2.5" />
                                        <span className="truncate">{guest.email}</span>
                                      </div>
                                    )}
                                    {guest.phone && (
                                      <span>📱 {guest.phone}</span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* RSVP Status and Details */}
                              <div className="sm:col-span-4 space-y-1">
                                <div className="flex items-center gap-1.5">
                                  {getRSVPIcon(guest.rsvp_status)}
                                  <Badge variant={getRSVPBadgeVariant(guest.rsvp_status)} className="text-[10px] capitalize px-1.5 py-0.5">
                                    {guest.rsvp_status}
                                  </Badge>
                                </div>
                                {guest.meal_preference && (
                                  <div className="text-[11px] text-muted-foreground">
                                    🍽️ {guest.meal_preference}
                                  </div>
                                )}
                                {guest.table_number && (
                                  <div className="text-[11px] text-muted-foreground">
                                    🪑 Table {guest.table_number}
                                  </div>
                                )}
                              </div>

                              {/* Actions */}
                              <div className="sm:col-span-3 flex gap-1.5">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex-1 text-[10px] h-7 px-2"
                                  onClick={() => handleEditGuest(guest)}
                                >
                                  <Edit className="h-2.5 w-2.5 mr-1" />
                                  Edit
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  className="flex-1 text-[10px] h-7 px-2"
                                  onClick={() => handleDeleteGuest(guest.id)}
                                >
                                  <Trash2 className="h-2.5 w-2.5 mr-1" />
                                  Delete
                                </Button>
                              </div>
                            </div>

                            {/* Notes */}
                            {guest.notes && (
                              <div className="mt-2 pt-2 border-t">
                                <div className="flex items-start gap-1.5">
                                  <FileText className="h-3 w-3 text-muted-foreground mt-0.5" />
                                  <p className="text-[11px] text-muted-foreground">{guest.notes}</p>
                                </div>
                              </div>
                            )}
                          </Card>
                        ))
                      ) : guests.length > 0 ? (
                        <Card className="p-6 text-center">
                          <div className="space-y-2">
                            <div className="text-3xl">🔍</div>
                            <h3 className="text-base font-semibold">No guests found</h3>
                            <p className="text-xs text-muted-foreground">
                              Try adjusting your search query
                            </p>
                          </div>
                        </Card>
                      ) : (
                        <Card className="p-8 text-center">
                          <div className="space-y-3">
                            <div className="text-4xl">👥</div>
                            <h3 className="text-lg font-semibold">No guests yet</h3>
                            <p className="text-sm text-muted-foreground">
                              Start building your guest list by adding your first guest
                            </p>
                            <Button size="sm" onClick={handleAddGuest}>
                              <Plus className="h-4 w-4 mr-2" />
                              Add First Guest
                            </Button>
                          </div>
                        </Card>
                      )}
                    </div>
                  </>
                )}

                {!selectedEventForGuests && (
                  <Card className="p-8 text-center">
                    <div className="space-y-3">
                      <div className="text-4xl">📋</div>
                      <h3 className="text-lg font-semibold">Select an Event</h3>
                      <p className="text-sm text-muted-foreground">
                        Choose an event from the dropdown above to manage its guest list
                      </p>
                    </div>
                  </Card>
                )}
              </TabsContent>


            </Tabs>
          </div>
        </div>
      </main>

      <CreateEventModal 
        open={createEventModalOpen} 
        onOpenChange={handleModalClose}
        onEventCreated={handleEventCreated}
        editingEvent={editingEvent}
        initialPackage={selectedPackage}
      />

      {/* Add/Edit Guest Modal */}
      <Dialog open={showAddGuestModal} onOpenChange={setShowAddGuestModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingGuest ? 'Edit Guest' : 'Add New Guest'}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Name *</Label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md bg-background text-foreground"
                  value={guestForm.name}
                  onChange={(e) => setGuestForm({ ...guestForm, name: e.target.value })}
                  placeholder="Guest full name"
                />
              </div>
              <div>
                <Label>Email</Label>
                <input
                  type="email"
                  className="w-full p-2 border rounded-md bg-background text-foreground"
                  value={guestForm.email}
                  onChange={(e) => setGuestForm({ ...guestForm, email: e.target.value })}
                  placeholder="guest@example.com"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Phone</Label>
                <input
                  type="tel"
                  className="w-full p-2 border rounded-md bg-background text-foreground"
                  value={guestForm.phone}
                  onChange={(e) => setGuestForm({ ...guestForm, phone: e.target.value })}
                  placeholder="+1 234 567 8900"
                />
              </div>
              <div>
                <Label>RSVP Status</Label>
                <select
                  className="w-full p-2 border rounded-md bg-background text-foreground"
                  value={guestForm.rsvp_status}
                  onChange={(e) => setGuestForm({ ...guestForm, rsvp_status: e.target.value })}
                >
                  <option value="pending">Pending</option>
                  <option value="attending">Attending</option>
                  <option value="declined">Declined</option>
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Meal Preference</Label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md bg-background text-foreground"
                  value={guestForm.meal_preference}
                  onChange={(e) => setGuestForm({ ...guestForm, meal_preference: e.target.value })}
                  placeholder="e.g., Vegetarian, Vegan"
                />
              </div>
              <div>
                <Label>Group Name</Label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md bg-background text-foreground"
                  value={guestForm.group_name}
                  onChange={(e) => setGuestForm({ ...guestForm, group_name: e.target.value })}
                  placeholder="e.g., Family, Friends"
                />
              </div>
            </div>

            <div>
              <Label>Table Number</Label>
              <input
                type="number"
                className="w-full p-2 border rounded-md bg-background text-foreground"
                value={guestForm.table_number}
                onChange={(e) => setGuestForm({ ...guestForm, table_number: e.target.value })}
                placeholder="Assign table number"
              />
            </div>

            <div>
              <Label>Notes</Label>
              <textarea
                className="w-full p-2 border rounded-md bg-background text-foreground"
                rows={3}
                value={guestForm.notes}
                onChange={(e) => setGuestForm({ ...guestForm, notes: e.target.value })}
                placeholder="Any special notes or requirements"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setShowAddGuestModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveGuest}>
                {editingGuest ? 'Update Guest' : 'Add Guest'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Event Details Modal */}
      {selectedEvent && (
        <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2 text-base sm:text-lg">
                <span>📋</span>
                <span>Event Details</span>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <Label className="text-xs sm:text-sm font-medium">Event Type</Label>
                  <p className="text-sm sm:text-base lg:text-lg">{selectedEvent.event_type}</p>
                </div>
                <div>
                  <Label className="text-xs sm:text-sm font-medium">Reference ID</Label>
                  <p className="text-sm sm:text-base lg:text-lg font-mono break-all">{selectedEvent.reference_id}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <Label className="text-xs sm:text-sm font-medium">Date</Label>
                  <p className="text-sm sm:text-base">{formatEventDate(selectedEvent.event_date)}</p>
                </div>
                <div>
                  <Label className="text-xs sm:text-sm font-medium">Time</Label>
                  <p className="text-sm sm:text-base">{selectedEvent.event_time || 'Time not set'}</p>
                </div>
              </div>

              <div>
                <Label className="text-xs sm:text-sm font-medium">Guests</Label>
                <p className="text-sm sm:text-base">{getGuestDisplay(selectedEvent.guest_count, selectedEvent.guest_count_range)}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <Label className="text-xs sm:text-sm font-medium">Venue Status</Label>
                  <p className="text-sm sm:text-base">{selectedEvent.venue_booked ? 'Venue Booked' : 'Venue Not Booked'}</p>
                </div>
                <div>
                  <Label className="text-xs sm:text-sm font-medium">Preferred Location</Label>
                  <p className="text-sm sm:text-base truncate">{selectedEvent.venue_location || 'Not specified'}</p>
                </div>
              </div>

              <div>
                <Label className="text-xs sm:text-sm font-medium">Created</Label>
                <p className="text-sm sm:text-base">{new Date(selectedEvent.created_at).toLocaleString()}</p>
              </div>

              {selectedEvent.date_flexible && (
                <div className="p-2 sm:p-3 bg-accent/20 rounded-lg">
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    📅 This event has flexible date and time
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-2">
              <Button size="sm" className="text-xs sm:text-sm" variant="outline" onClick={() => setSelectedEvent(null)}>
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <UserChat />
    </div>
  );
};

export default UserDashboard;
