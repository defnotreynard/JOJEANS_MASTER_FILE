"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Calendar, 
  Package,
  Star,
  ArrowUpRight,
  MapPin,
} from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  ComposedChart,
} from "recharts"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"

interface DashboardStats {
  totalRevenue: number
  totalEvents: number
  confirmedEvents: number
  pendingEvents: number
  cancelledEvents: number
  totalUsers: number
  totalGuests: number
  attendingGuests: number
}

interface EventTypeData {
  name: string
  value: number
  revenue: number
  count: number
  color: string
}

interface VenueData {
  venue: string
  bookings: number
  revenue: number
}

interface RecentEvent {
  id: string
  reference_id: string
  event_type: string
  event_date: string | null
  status: string
  budget_amount: number | null
  venue_location: string | null
  created_at: string
  profile?: {
    full_name: string | null
    email: string | null
  }
}

interface MonthlyData {
  month: string
  revenue: number
  bookings: number
}

export function DashboardOverview() {
  const navigate = useNavigate()
  const [timeRange, setTimeRange] = useState("12months")
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 0,
    totalEvents: 0,
    confirmedEvents: 0,
    pendingEvents: 0,
    cancelledEvents: 0,
    totalUsers: 0,
    totalGuests: 0,
    attendingGuests: 0
  })
  const [eventTypeData, setEventTypeData] = useState<EventTypeData[]>([])
  const [venueData, setVenueData] = useState<VenueData[]>([])
  const [recentEvents, setRecentEvents] = useState<RecentEvent[]>([])
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      // Fetch all events
      const { data: events, error: eventsError } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false })

      if (eventsError) throw eventsError

      // Fetch all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')

      if (profilesError) throw profilesError

      // Fetch all guests
      const { data: guests, error: guestsError } = await supabase
        .from('guests')
        .select('*')

      if (guestsError) throw guestsError

      // Calculate stats
      const totalRevenue = events?.filter(e => e.status === 'confirmed').reduce((sum, event) => sum + (event.budget_amount || 0), 0) || 0
      const totalEvents = events?.length || 0
      const confirmedEvents = events?.filter(e => e.status === 'confirmed').length || 0
      const pendingEvents = events?.filter(e => e.status === 'pending' || e.status === 'active').length || 0
      const cancelledEvents = events?.filter(e => e.status === 'cancelled').length || 0
      const totalUsers = profiles?.length || 0
      const totalGuests = guests?.length || 0
      const attendingGuests = guests?.filter(g => g.rsvp_status === 'attending').length || 0

      setStats({
        totalRevenue,
        totalEvents,
        confirmedEvents,
        pendingEvents,
        cancelledEvents,
        totalUsers,
        totalGuests,
        attendingGuests
      })

      // Calculate event type distribution
      const eventTypes: Record<string, { count: number; revenue: number }> = {}
      events?.forEach(event => {
        const type = event.event_type || 'Other'
        if (!eventTypes[type]) {
          eventTypes[type] = { count: 0, revenue: 0 }
        }
        eventTypes[type].count++
        eventTypes[type].revenue += event.budget_amount || 0
      })

      const colors = [
        "hsl(var(--primary))",
        "hsl(var(--chart-2))",
        "hsl(var(--chart-3))",
        "hsl(var(--chart-4))",
        "hsl(var(--chart-5))"
      ]

      const eventTypeArray = Object.entries(eventTypes).map(([name, data], index) => ({
        name,
        value: totalEvents > 0 ? Math.round((data.count / totalEvents) * 100) : 0,
        revenue: data.revenue,
        count: data.count,
        color: colors[index % colors.length]
      }))

      setEventTypeData(eventTypeArray)

      // Calculate venue distribution
      const venues: Record<string, { count: number; revenue: number }> = {}
      events?.forEach(event => {
        const venue = event.venue_location || 'Not specified'
        if (!venues[venue]) {
          venues[venue] = { count: 0, revenue: 0 }
        }
        venues[venue].count++
        venues[venue].revenue += event.budget_amount || 0
      })

      const venueArray = Object.entries(venues)
        .map(([venue, data]) => ({
          venue,
          bookings: data.count,
          revenue: data.revenue
        }))
        .sort((a, b) => b.bookings - a.bookings)
        .slice(0, 5)

      setVenueData(venueArray)

      // Get recent events with profile info
      const recentEventsWithProfiles: RecentEvent[] = []
      const recentEventsData = events?.slice(0, 5) || []
      
      for (const event of recentEventsData) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name, email')
          .eq('user_id', event.user_id)
          .maybeSingle()
        
        recentEventsWithProfiles.push({
          ...event,
          profile: profile || undefined
        })
      }

      setRecentEvents(recentEventsWithProfiles)

      // Calculate monthly data
      const monthlyStats: Record<string, { revenue: number; bookings: number }> = {}
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      
      // Initialize all months
      months.forEach(month => {
        monthlyStats[month] = { revenue: 0, bookings: 0 }
      })

      events?.forEach(event => {
        const date = new Date(event.created_at)
        const month = months[date.getMonth()]
        monthlyStats[month].bookings++
        monthlyStats[month].revenue += event.budget_amount || 0
      })

      const monthlyArray = months.map(month => ({
        month,
        revenue: monthlyStats[month].revenue,
        bookings: monthlyStats[month].bookings
      }))

      setMonthlyData(monthlyArray)

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-chart-1/20 text-chart-1 hover:bg-chart-1/30">Confirmed</Badge>
      case "pending":
      case "active":
        return <Badge className="bg-yellow-500/20 text-yellow-600 hover:bg-yellow-500/30">Pending</Badge>
      case "cancelled":
        return <Badge className="bg-destructive/20 text-destructive hover:bg-destructive/30">Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const maxVenueRevenue = Math.max(...venueData.map(v => v.revenue), 1)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with Time Range Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-sm text-muted-foreground">Real-time business insights and performance metrics</p>
        </div>
        <Button variant="outline" onClick={fetchDashboardData}>
          Refresh Data
        </Button>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-none bg-gradient-to-br from-chart-1/10 via-chart-1/5 to-background">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <div className="h-10 w-10 rounded-full bg-chart-1/10 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-chart-1" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">₱{stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              From {stats.totalEvents} total events
            </p>
          </CardContent>
        </Card>

        <Card className="border-none bg-gradient-to-br from-chart-2/10 via-chart-2/5 to-background">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <div className="h-10 w-10 rounded-full bg-chart-2/10 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-chart-2" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.totalEvents}</div>
            <div className="flex items-center gap-2 text-xs mt-1">
              <span className="text-chart-1">{stats.confirmedEvents} confirmed</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-yellow-600">{stats.pendingEvents} pending</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none bg-gradient-to-br from-chart-3/10 via-chart-3/5 to-background">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registered Users</CardTitle>
            <div className="h-10 w-10 rounded-full bg-chart-3/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-chart-3" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Total registered clients
            </p>
          </CardContent>
        </Card>

        <Card className="border-none bg-gradient-to-br from-chart-4/10 via-chart-4/5 to-background">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Guests</CardTitle>
            <div className="h-10 w-10 rounded-full bg-chart-4/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-chart-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.totalGuests}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.attendingGuests} attending
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Bookings Trend</CardTitle>
            <CardDescription>Monthly performance based on event creation</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis yAxisId="left" className="text-xs" />
                <YAxis yAxisId="right" orientation="right" className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                  formatter={(value: number, name: string) => [
                    name === 'revenue' ? `₱${value.toLocaleString()}` : value,
                    name === 'revenue' ? 'Revenue' : 'Bookings'
                  ]}
                />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.1}
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
                <Bar yAxisId="right" dataKey="bookings" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Event Status Overview</CardTitle>
            <CardDescription>Current event status breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-chart-1/10">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-chart-1" />
                  <span className="font-medium">Confirmed Events</span>
                </div>
                <span className="text-2xl font-bold text-chart-1">{stats.confirmedEvents}</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-yellow-500/10">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="font-medium">Pending Events</span>
                </div>
                <span className="text-2xl font-bold text-yellow-600">{stats.pendingEvents}</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-destructive/10">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <span className="font-medium">Cancelled Events</span>
                </div>
                <span className="text-2xl font-bold text-destructive">{stats.cancelledEvents}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Event Types & Top Venues */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Event Types Distribution</CardTitle>
            <CardDescription>Revenue and booking breakdown by event type</CardDescription>
          </CardHeader>
          <CardContent>
            {eventTypeData.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={eventTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {eventTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-3">
                  {eventTypeData.map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-sm font-medium">{item.name}</span>
                        </div>
                        <span className="text-sm font-semibold">{item.value}%</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {item.count} events • ₱{item.revenue.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[220px] text-muted-foreground">
                No event data available
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Venues</CardTitle>
            <CardDescription>Most popular venues by bookings</CardDescription>
          </CardHeader>
          <CardContent>
            {venueData.length > 0 ? (
              <div className="space-y-3">
                {venueData.map((venue, index) => {
                  const colors = ['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5']
                  const color = colors[index % colors.length]
                  return (
                    <div key={index} className="flex items-center justify-between p-3 border-none rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`h-8 w-8 rounded-full bg-${color}/10 flex items-center justify-center`}>
                          <MapPin className={`h-4 w-4 text-${color}`} />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{venue.venue}</p>
                          <p className="text-xs text-muted-foreground">{venue.bookings} bookings</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">₱{venue.revenue.toLocaleString()}</p>
                        <div className="w-20 bg-muted rounded-full h-1.5 mt-1">
                          <div
                            className="bg-primary h-1.5 rounded-full transition-all"
                            style={{ width: `${(venue.revenue / maxVenueRevenue) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                No venue data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Events */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Events</CardTitle>
            <CardDescription>Latest events created in the system</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/admin/events')}>
            View All
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {recentEvents.length > 0 ? (
            <div className="space-y-3">
              {recentEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors gap-3"
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{event.profile?.full_name || 'Unknown Client'}</p>
                      <p className="text-sm text-muted-foreground">
                        {event.event_type} • {event.reference_id}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
                    <div className="text-left sm:text-right">
                      <p className="font-medium">₱{(event.budget_amount || 0).toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">
                        {event.event_date ? new Date(event.event_date).toLocaleDateString() : 'Date TBD'}
                      </p>
                    </div>
                    {getStatusBadge(event.status || 'pending')}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-[200px] text-muted-foreground">
              No events found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
