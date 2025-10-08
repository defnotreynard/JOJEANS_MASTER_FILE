"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Shield,
  Settings,
} from "lucide-react"
import { Link } from "react-router-dom"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const revenueData = [
  { month: "Jan", revenue: 45000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 61000 },
  { month: "May", revenue: 55000 },
  { month: "Jun", revenue: 67000 },
]

const bookingData = [
  { month: "Jan", bookings: 12 },
  { month: "Feb", bookings: 15 },
  { month: "Mar", bookings: 13 },
  { month: "Apr", bookings: 18 },
  { month: "May", bookings: 16 },
  { month: "Jun", bookings: 21 },
]

const eventTypeData = [
  { name: "Weddings", value: 45, color: "#059669" },
  { name: "Corporate", value: 25, color: "#10b981" },
  { name: "Birthdays", value: 20, color: "#475569" },
  { name: "Others", value: 10, color: "#fbbf24" },
]

const recentBookings = [
  {
    id: 1,
    client: "Maria Santos",
    event: "Wedding Reception",
    date: "2024-07-15",
    status: "confirmed",
    amount: 85000,
  },
  {
    id: 2,
    client: "ABC Corporation",
    event: "Annual Meeting",
    date: "2024-07-20",
    status: "pending",
    amount: 45000,
  },
  {
    id: 3,
    client: "John Dela Cruz",
    event: "Birthday Party",
    date: "2024-07-25",
    status: "confirmed",
    amount: 25000,
  },
  {
    id: 4,
    client: "Sarah Johnson",
    event: "Debut Party",
    date: "2024-08-01",
    status: "inquiry",
    amount: 55000,
  },
]

export function SuperAdminDashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱328,000</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-primary">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-primary">+8.2%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-primary">+15.3%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Event Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱52,400</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-primary">+5.7%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">User Management</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">1,247</div>
            <p className="text-xs text-blue-700 mb-3">Total registered users</p>
            <Link to="/super-admin/users">
              <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                Manage Users
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-900">Admin Management</CardTitle>
            <Shield className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">8</div>
            <p className="text-xs text-purple-700 mb-3">Active administrators</p>
            <Link to="/super-admin/admins">
              <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                Manage Admins
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-900">System Settings</CardTitle>
            <Settings className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">12</div>
            <p className="text-xs text-orange-700 mb-3">Configuration items</p>
            <Link to="/super-admin/system">
              <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700">
                System Config
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue for the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`₱${value.toLocaleString()}`, "Revenue"]} />
                <Line type="monotone" dataKey="revenue" stroke="#059669" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Booking Trend</CardTitle>
            <CardDescription>Monthly bookings for the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bookingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Event Types and Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Event Types</CardTitle>
            <CardDescription>Distribution of event types</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={eventTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
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
            <div className="mt-4 space-y-2">
              {eventTypeData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Latest booking inquiries and confirmations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {booking.status === "confirmed" && <CheckCircle className="h-5 w-5 text-primary" />}
                      {booking.status === "pending" && <Clock className="h-5 w-5 text-secondary" />}
                      {booking.status === "inquiry" && <AlertCircle className="h-5 w-5 text-muted-foreground" />}
                    </div>
                    <div>
                      <p className="font-medium">{booking.client}</p>
                      <p className="text-sm text-muted-foreground">{booking.event}</p>
                      <p className="text-xs text-muted-foreground">{booking.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₱{booking.amount.toLocaleString()}</p>
                    <Badge
                      variant={
                        booking.status === "confirmed"
                          ? "default"
                          : booking.status === "pending"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {booking.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full bg-transparent">
                View All Bookings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
