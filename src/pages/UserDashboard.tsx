import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserSidebar } from '@/components/UserSidebar';
import Navigation from '@/components/Navigation';
import { CreateEventModal } from '@/components/CreateEventModal';
import { 
  Calendar, 
  Users, 
  Calculator, 
  CheckSquare, 
  Gift, 
  Settings,
  Plus,
  Heart,
  MapPin,
  DollarSign,
  UserPlus
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
  const [activeTab, setActiveTab] = useState('home');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [createEventModalOpen, setCreateEventModalOpen] = useState(false);
  const [userEvents, setUserEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [editingEvent, setEditingEvent] = useState<any>(null);

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
  };

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
      title: 'Cash Registry',
      description: 'Set up your honeymoon fund',
      action: 'Get Started',
      icon: Gift,
      color: 'text-wedding-sage'
    }
  ];

  return (
    <div className="min-h-screen bg-background page-transition">
      <Navigation />
      
      <div className="flex">
        <UserSidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <main className="flex-1 overflow-auto">
        <div className="container mx-auto px-6 py-8">
          <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground">
                  Wedding Dashboard
                </h1>
                <p className="text-lg text-muted-foreground">
                  Plan, organize, and track your perfect day
                </p>
              </div>
              
              <Button 
                className="lg:self-end"
                onClick={() => setCreateEventModalOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </div>

            {/* Tabs Navigation */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-6 lg:w-fit">
                <TabsTrigger value="home" className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span className="hidden sm:inline">Home</span>
                </TabsTrigger>
                <TabsTrigger value="checklist" className="flex items-center space-x-2">
                  <CheckSquare className="h-4 w-4" />
                  <span className="hidden sm:inline">Checklist</span>
                </TabsTrigger>
                <TabsTrigger value="guests" className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">Guests</span>
                </TabsTrigger>
                <TabsTrigger value="budget" className="flex items-center space-x-2">
                  <Calculator className="h-4 w-4" />
                  <span className="hidden sm:inline">Budget</span>
                </TabsTrigger>
                <TabsTrigger value="registry" className="flex items-center space-x-2">
                  <Gift className="h-4 w-4" />
                  <span className="hidden sm:inline">Registry</span>
                </TabsTrigger>
              </TabsList>

              {/* Home Tab */}
              <TabsContent value="home" className="space-y-8">
                {/* User Events Cards */}
                <div className="grid gap-6">
                  {userEvents.length > 0 ? userEvents.map((event) => (
                    <Card 
                      key={event.id} 
                      className="p-6 hover:shadow-card transition-all cursor-pointer"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div className="grid lg:grid-cols-4 gap-6">
                        {/* Event Info */}
                        <div className="lg:col-span-2 space-y-4">
                          <div>
                            <h2 className="text-2xl font-heading font-bold text-foreground">
                              {event.event_type}
                            </h2>
                            <div className="flex items-center space-x-4 text-muted-foreground mt-2">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{formatEventDate(event.event_date)}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4" />
                                <span>{event.venue_location || 'Location not set'}</span>
                              </div>
                            </div>
                            <div className="mt-2">
                              <Badge variant="secondary">
                                Ref: {event.reference_id}
                              </Badge>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="bg-primary/10 rounded-lg p-3 text-center">
                              <div className="text-2xl font-bold text-primary">
                                {getGuestDisplay(event.guest_count, event.guest_count_range)}
                              </div>
                              <div className="text-sm text-muted-foreground">Guests</div>
                            </div>
                            <div className="bg-wedding-gold/10 rounded-lg p-3 text-center">
                              <div className="text-2xl font-bold text-wedding-gold">
                                {getBudgetDisplay(event.budget_amount, event.budget_range)}
                              </div>
                              <div className="text-sm text-muted-foreground">Budget</div>
                            </div>
                            <div className="bg-wedding-sage/20 rounded-lg p-3 text-center">
                              <div className="text-2xl font-bold text-wedding-charcoal">
                                {event.venue_booked ? 'Booked' : 'Not Booked'}
                              </div>
                              <div className="text-sm text-muted-foreground">Venue</div>
                            </div>
                          </div>
                        </div>

                        {/* Status Section */}
                        <div className="space-y-4">
                          <div>
                            <div className="text-sm mb-2">Status</div>
                            <Badge variant="default">Active</Badge>
                          </div>
                          <div>
                            <div className="text-sm mb-2">Created</div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(event.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-3">
                          <Button 
                            className="w-full" 
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedEvent(event);
                            }}
                          >
                            <Settings className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                          <Button 
                            className="w-full" 
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditEvent(event);
                            }}
                          >
                            Edit
                          </Button>
                          <Button 
                            className="w-full" 
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
                    <Card className="p-8 text-center">
                      <div className="space-y-4">
                        <div className="text-4xl">🎉</div>
                        <h3 className="text-xl font-semibold">No events yet</h3>
                        <p className="text-muted-foreground">
                          Create your first event to get started with planning!
                        </p>
                        <Button onClick={() => setCreateEventModalOpen(true)}>
                          <Plus className="h-4 w-4 mr-2" />
                          Create Your First Event
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
                    <CardTitle className="text-xl font-heading">Next Steps</CardTitle>
                    <CardDescription>
                      Complete these steps to make your planning even easier
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      {nextSteps.map((step, index) => (
                        <div key={index} className="text-center space-y-4">
                          <div className={`w-12 h-12 rounded-xl bg-accent flex items-center justify-center mx-auto`}>
                            <step.icon className={`h-6 w-6 ${step.color}`} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{step.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                          </div>
                          <Button variant="outline" size="sm">
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
                    <CardTitle className="text-xl font-heading">Upcoming Tasks</CardTitle>
                    <CardDescription>
                      Stay on track with your wedding planning timeline
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingTasks.map((task) => (
                        <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <div>
                              <div className="font-medium">{task.task}</div>
                              <div className="text-sm text-muted-foreground">
                                Due: {new Date(task.dueDate).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <Badge 
                            variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}
                          >
                            {task.priority} priority
                          </Badge>
                        </div>
                      ))}
                    </div>
                    
                    <Button variant="outline" className="w-full mt-4">
                      View All Tasks
                    </Button>
                  </CardContent>
                </Card>fix
              </TabsContent>

              {/* Other tabs content would go here */}
              <TabsContent value="checklist">
                <Card>
                  <CardHeader>
                    <CardTitle>Wedding Checklist</CardTitle>
                    <CardDescription>Track your wedding planning progress</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center py-8 text-muted-foreground">
                      Checklist feature coming soon...
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="guests">
                <Card>
                  <CardHeader>
                    <CardTitle>Guest Management</CardTitle>
                    <CardDescription>Manage your wedding guest list and RSVPs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center py-8 text-muted-foreground">
                      Guest management feature coming soon...
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>


              <TabsContent value="budget">
                <Card>
                  <CardHeader>
                    <CardTitle>Budget Tracker</CardTitle>
                    <CardDescription>Monitor your wedding expenses and payments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center py-8 text-muted-foreground">
                      Budget tracker feature coming soon...
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="registry">
                <Card>
                  <CardHeader>
                    <CardTitle>Wedding Registry</CardTitle>
                    <CardDescription>Create and manage your wedding gift registry</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center py-8 text-muted-foreground">
                      Registry feature coming soon...
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        </main>
      </div>

              <CreateEventModal 
                open={createEventModalOpen} 
                onOpenChange={handleModalClose}
                onEventCreated={handleEventCreated}
                editingEvent={editingEvent}
              />

      {/* Event Details Modal */}
      {selectedEvent && (
        <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <span>📋</span>
                <span>Event Details</span>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Event Type</Label>
                  <p className="text-lg">{selectedEvent.event_type}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Reference ID</Label>
                  <p className="text-lg font-mono">{selectedEvent.reference_id}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Date</Label>
                  <p>{formatEventDate(selectedEvent.event_date)}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Time</Label>
                  <p>{selectedEvent.event_time || 'Time not set'}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Guests</Label>
                  <p>{getGuestDisplay(selectedEvent.guest_count, selectedEvent.guest_count_range)}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Budget</Label>
                  <p>{getBudgetDisplay(selectedEvent.budget_amount, selectedEvent.budget_range)}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Venue Status</Label>
                  <p>{selectedEvent.venue_booked ? 'Venue Booked' : 'Venue Not Booked'}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Preferred Location</Label>
                  <p>{selectedEvent.venue_location || 'Not specified'}</p>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Created</Label>
                <p>{new Date(selectedEvent.created_at).toLocaleString()}</p>
              </div>

              {selectedEvent.date_flexible && (
                <div className="p-3 bg-accent/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    📅 This event has flexible date and time
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setSelectedEvent(null)}>
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default UserDashboard;
