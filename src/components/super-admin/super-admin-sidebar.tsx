import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Calendar,
  Package,
  Images,
  BarChart3,
  Settings,
  Users,
  Shield,
  Database,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/super-admin",
    icon: LayoutDashboard,
  },
  {
    title: "Bookings",
    href: "/super-admin/bookings",
    icon: Calendar,
  },
  {
    title: "Events",
    href: "/super-admin/events",
    icon: Package,
  },
  {
    title: "Gallery",
    href: "/super-admin/gallery",
    icon: Images,
  },
  // {
  //   title: "Analytics",
  //   href: "/super-admin/analytics",
  //   icon: BarChart3,
  // },
  {
    title: "Admin Management",
    href: "/super-admin/admins",
    icon: Users,
  },
  {
    title: "User Management",
    href: "/super-admin/users",
    icon: Shield,
  },
  {
    title: "Security",
    href: "/super-admin/system",
    icon: Database,
  },
  {
    title: "Settings",
    href: "/super-admin/settings",
    icon: Settings,
  }
]

export function SuperAdminSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const pathname = location.pathname

  return (
    <div
      className={cn(
        "bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-16 h-16 rounded-lg flex items-center justify-center">
               <img
                src="/logo.png" 
                alt="JJ Logo"
                className="w-12 h-12 rounded-full object-cover"
              />
              </div>
              <span className="font-semibold text-sidebar-foreground">JOJEANS Super Admin</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-accent/10"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link key={item.href} to={item.href}>
              <div
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/10",
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span className="font-medium">{item.title}</span>}
              </div>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
