"use client"

import { useState } from "react"
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

const monthlyData = [
  { month: "Jan", revenue: 45000, bookings: 12, clients: 10, avgValue: 3750 },
  { month: "Feb", revenue: 52000, bookings: 15, clients: 13, avgValue: 3467 },
  { month: "Mar", revenue: 48000, bookings: 13, clients: 11, avgValue: 3692 },
  { month: "Apr", revenue: 61000, bookings: 18, clients: 16, avgValue: 3389 },
  { month: "May", revenue: 55000, bookings: 16, clients: 14, avgValue: 3438 },
  { month: "Jun", revenue: 67000, bookings: 21, clients: 18, avgValue: 3190 },
  { month: "Jul", revenue: 72000, bookings: 19, clients: 17, avgValue: 3789 },
  { month: "Aug", revenue: 58000, bookings: 16, clients: 14, avgValue: 3625 },
  { month: "Sep", revenue: 63000, bookings: 18, clients: 15, avgValue: 3500 },
  { month: "Oct", revenue: 69000, bookings: 20, clients: 17, avgValue: 3450 },
  { month: "Nov", revenue: 74000, bookings: 22, clients: 19, avgValue: 3364 },
  { month: "Dec", revenue: 81000, bookings: 25, clients: 21, avgValue: 3240 },
]

const eventTypeData = [
  { name: "Weddings", value: 45, revenue: 285000, count: 18, color: "hsl(var(--primary))" },
  { name: "Corporate", value: 25, revenue: 125000, count: 12, color: "hsl(var(--chart-2))" },
  { name: "Birthdays", value: 20, revenue: 95000, count: 15, color: "hsl(var(--chart-3))" },
  { name: "Debuts", value: 10, revenue: 65000, count: 8, color: "hsl(var(--chart-4))" },
]

const venueData = [
  { venue: "Garden Paradise Resort", bookings: 8, revenue: 125000 },
  { venue: "Dumaguete Convention Center", bookings: 6, revenue: 95000 },
  { venue: "Bethel Guest House", bookings: 5, revenue: 85000 },
  { venue: "Private Residences", bookings: 12, revenue: 75000 },
  { venue: "Other Venues", bookings: 4, revenue: 45000 },
]

const customerSatisfactionData = [
  { month: "Jan", rating: 4.2 },
  { month: "Feb", rating: 4.5 },
  { month: "Mar", rating: 4.3 },
  { month: "Apr", rating: 4.7 },
  { month: "May", rating: 4.6 },
  { month: "Jun", rating: 4.8 },
  { month: "Jul", rating: 4.9 },
  { month: "Aug", rating: 4.7 },
  { month: "Sep", rating: 4.8 },
  { month: "Oct", rating: 4.9 },
  { month: "Nov", rating: 4.8 },
  { month: "Dec", rating: 4.9 },
]

const topServices = [
  { service: "Catering", bookings: 45, percentage: 85 },
  { service: "Styling & Decoration", bookings: 38, percentage: 72 },
  { service: "Photography", bookings: 35, percentage: 66 },
  { service: "Sound System", bookings: 32, percentage: 60 },
  { service: "LED Wall", bookings: 15, percentage: 28 },
]

const recentBookings = [
  { id: 1, client: "Maria Santos", event: "Wedding", date: "2024-01-15", status: "confirmed", amount: 85000 },
  { id: 2, client: "John Doe", event: "Corporate Event", date: "2024-01-18", status: "pending", amount: 45000 },
  { id: 3, client: "Jane Smith", event: "Birthday Party", date: "2024-01-20", status: "confirmed", amount: 32000 },
  { id: 4, client: "Robert Johnson", event: "Debut", date: "2024-01-22", status: "confirmed", amount: 55000 },
  { id: 5, client: "Lisa Anderson", event: "Wedding", date: "2024-01-25", status: "pending", amount: 95000 },
]

export function DashboardOverview() {
  const navigate = useNavigate()
  const [timeRange, setTimeRange] = useState("12months")

  const calculateGrowth = (current: number, previous: number): number => {
    if (previous === 0) return 0
    return ((current - previous) / previous) * 100
  }

  const currentMonthData = monthlyData[monthlyData.length - 1]
  const previousMonthData = monthlyData[monthlyData.length - 2]

  const revenueGrowth = calculateGrowth(currentMonthData.revenue, previousMonthData.revenue)
  const bookingGrowth = calculateGrowth(currentMonthData.bookings, previousMonthData.bookings)
  const clientGrowth = calculateGrowth(currentMonthData.clients, previousMonthData.clients)

  return (
    <div className="space-y-6">
      {/* Header with Time Range Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-sm text-muted-foreground">Comprehensive business insights and performance metrics</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3months">Last 3 Months</SelectItem>
            <SelectItem value="6months">Last 6 Months</SelectItem>
            <SelectItem value="12months">Last 12 Months</SelectItem>
            <SelectItem value="2years">Last 2 Years</SelectItem>
          </SelectContent>
        </Select>
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
            <div className="text-2xl font-bold">₱705,000</div>
            <div className="flex items-center space-x-2 text-xs mt-1">
              {revenueGrowth >= 0 ? (
                <TrendingUp className="h-3 w-3 text-chart-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-destructive" />
              )}
              <span className={revenueGrowth >= 0 ? "text-chart-1" : "text-destructive"}>
                {Math.abs(revenueGrowth).toFixed(1)}% from last month
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none bg-gradient-to-br from-chart-2/10 via-chart-2/5 to-background">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <div className="h-10 w-10 rounded-full bg-chart-2/10 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-chart-2" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">204</div>
            <div className="flex items-center space-x-2 text-xs mt-1">
              {bookingGrowth >= 0 ? (
                <TrendingUp className="h-3 w-3 text-chart-2" />
              ) : (
                <TrendingDown className="h-3 w-3 text-destructive" />
              )}
              <span className={bookingGrowth >= 0 ? "text-chart-2" : "text-destructive"}>
                {Math.abs(bookingGrowth).toFixed(1)}% from last month
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none bg-gradient-to-br from-chart-3/10 via-chart-3/5 to-background">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <div className="h-10 w-10 rounded-full bg-chart-3/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-chart-3" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">175</div>
            <div className="flex items-center space-x-2 text-xs mt-1">
              {clientGrowth >= 0 ? (
                <TrendingUp className="h-3 w-3 text-chart-3" />
              ) : (
                <TrendingDown className="h-3 w-3 text-destructive" />
              )}
              <span className={clientGrowth >= 0 ? "text-chart-3" : "text-destructive"}>
                {Math.abs(clientGrowth).toFixed(1)}% from last month
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none bg-gradient-to-br from-chart-4/10 via-chart-4/5 to-background">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Satisfaction</CardTitle>
            <div className="h-10 w-10 rounded-full bg-chart-4/10 flex items-center justify-center">
              <Star className="h-5 w-5 text-chart-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <div className="flex items-center space-x-2 text-xs mt-1">
              <TrendingUp className="h-3 w-3 text-chart-4" />
              <span className="text-chart-4">+0.1 from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Trends & Customer Satisfaction */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Bookings Trend</CardTitle>
            <CardDescription>Monthly performance over time</CardDescription>
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
            <CardTitle>Customer Satisfaction</CardTitle>
            <CardDescription>Average rating trends over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={customerSatisfactionData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis domain={[4, 5]} className="text-xs" />
                <Tooltip 
                  formatter={(value) => [`${value}/5`, "Rating"]}
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="rating"
                  stroke="hsl(var(--chart-4))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--chart-4))", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Event Types & Top Venues */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Event Types Distribution</CardTitle>
            <CardDescription>Revenue and booking breakdown</CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Venues</CardTitle>
            <CardDescription>Most popular venues by bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {venueData.map((venue, index) => {
                const colors = ['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5']
                const color = colors[index % colors.length]
                return (
                  <div key={index} className={`flex items-center justify-between p-3 border-none rounded-lg bg-gradient-to-r from-${color}/5 to-transparent hover:from-${color}/10 transition-colors`}>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{venue.venue}</p>
                      <p className="text-xs text-muted-foreground">{venue.bookings} bookings</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">₱{venue.revenue.toLocaleString()}</p>
                      <div className="w-20 bg-muted rounded-full h-1.5 mt-1">
                        <div
                          className={`bg-${color} h-1.5 rounded-full transition-all`}
                          style={{ width: `${(venue.revenue / 125000) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Service Performance</CardTitle>
          <CardDescription>Most requested services and booking rates</CardDescription>
        </CardHeader>
        <CardContent>
              <div className="space-y-4">
            {topServices.map((service, index) => {
              const colors = ['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5']
              const color = colors[index % colors.length]
              return (
                <div key={index} className="flex items-center justify-between gap-4">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className={`flex items-center justify-center w-10 h-10 bg-${color}/10 rounded-lg`}>
                      <Package className={`h-5 w-5 text-${color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{service.service}</p>
                      <p className="text-xs text-muted-foreground">{service.bookings} bookings</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div 
                        className={`bg-${color} h-2 rounded-full transition-all`}
                        style={{ width: `${service.percentage}%` }} 
                      />
                    </div>
                    <span className="text-sm font-medium w-12 text-right">{service.percentage}%</span>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Bookings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Latest event bookings and their status</CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate("/admin/bookings")}
            className="gap-1"
          >
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentBookings.map((booking, idx) => {
              const colors = ['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5']
              const color = colors[idx % colors.length]
              return (
                <div
                  key={booking.id}
                  className={`flex items-center justify-between p-3 border-none rounded-lg bg-gradient-to-r from-${color}/5 to-transparent hover:from-${color}/10 transition-colors`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`flex items-center justify-center w-10 h-10 bg-${color}/10 rounded-lg`}>
                      <Calendar className={`h-5 w-5 text-${color}`} />
                    </div>
                  <div>
                    <p className="font-medium text-sm">{booking.client}</p>
                    <p className="text-xs text-muted-foreground">{booking.event} • {booking.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge
                    variant={booking.status === "confirmed" ? "default" : "secondary"}
                    className="capitalize"
                  >
                    {booking.status}
                  </Badge>
                  <span className="font-medium text-sm">₱{booking.amount.toLocaleString()}</span>
                </div>
              </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
