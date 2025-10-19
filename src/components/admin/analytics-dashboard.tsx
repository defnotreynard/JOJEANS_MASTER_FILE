"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, DollarSign, Users, Calendar, Package, Star } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
  PieChart,
  Pie,
  Cell,
  Area,
  ComposedChart,
} from "recharts"

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
  { name: "Weddings", value: 45, revenue: 285000, count: 18, color: "#059669" },
  { name: "Corporate", value: 25, revenue: 125000, count: 12, color: "#10b981" },
  { name: "Birthdays", value: 20, revenue: 95000, count: 15, color: "#475569" },
  { name: "Debuts", value: 10, revenue: 65000, count: 8, color: "#fbbf24" },
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

export function AnalyticsDashboard() {
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive business insights and performance metrics</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-48">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">₱705,000</div>
            <div className="flex items-center space-x-2 text-xs">
              {revenueGrowth >= 0 ? (
                <TrendingUp className="h-3 w-3 text-primary" />
              ) : (
                <TrendingDown className="h-3 w-3 text-destructive" />
              )}
              <span className={revenueGrowth >= 0 ? "text-primary" : "text-destructive"}>
                {Math.abs(revenueGrowth).toFixed(1)}% from last month
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">204</div>
            <div className="flex items-center space-x-2 text-xs">
              {bookingGrowth >= 0 ? (
                <TrendingUp className="h-3 w-3 text-primary" />
              ) : (
                <TrendingDown className="h-3 w-3 text-destructive" />
              )}
              <span className={bookingGrowth >= 0 ? "text-primary" : "text-destructive"}>
                {Math.abs(bookingGrowth).toFixed(1)}% from last month
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">175</div>
            <div className="flex items-center space-x-2 text-xs">
              {clientGrowth >= 0 ? (
                <TrendingUp className="h-3 w-3 text-primary" />
              ) : (
                <TrendingDown className="h-3 w-3 text-destructive" />
              )}
              <span className={clientGrowth >= 0 ? "text-primary" : "text-destructive"}>
                {Math.abs(clientGrowth).toFixed(1)}% from last month
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Satisfaction</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">4.8/5</div>
            <div className="flex items-center space-x-2 text-xs">
              <TrendingUp className="h-3 w-3 text-primary" />
              <span className="text-primary">+0.1 from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue and Bookings Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Bookings Trend</CardTitle>
            <CardDescription>Monthly performance over the past year</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  fill="#059669"
                  fillOpacity={0.1}
                  stroke="#059669"
                  strokeWidth={2}
                />
                <Bar yAxisId="right" dataKey="bookings" fill="#10b981" />
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
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[4, 5]} />
                <Tooltip formatter={(value) => [`${value}/5`, "Rating"]} />
                <Line
                  type="monotone"
                  dataKey="rating"
                  stroke="#fbbf24"
                  strokeWidth={3}
                  dot={{ fill: "#fbbf24", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Event Types and Venue Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Event Types Distribution</CardTitle>
            <CardDescription>Revenue and booking breakdown by event type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={eventTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
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
                      <span className="text-sm">{item.value}%</span>
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
            <CardDescription>Most popular venues by bookings and revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {venueData.map((venue, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-medium">{venue.venue}</p>
                    <p className="text-sm text-muted-foreground">{venue.bookings} bookings</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₱{venue.revenue.toLocaleString()}</p>
                    <div className="w-20 bg-muted rounded-full h-2 mt-1">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${(venue.revenue / 125000) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Service Performance</CardTitle>
          <CardDescription>Most requested services and their booking rates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topServices.map((service, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                    <Package className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{service.service}</p>
                    <p className="text-sm text-muted-foreground">{service.bookings} bookings</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${service.percentage}%` }} />
                  </div>
                  <span className="text-sm font-medium w-12 text-right">{service.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
