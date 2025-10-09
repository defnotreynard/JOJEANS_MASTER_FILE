import { useEffect, useState } from "react";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { SuperAdminSidebar } from "@/components/super-admin/super-admin-sidebar";
import { SuperAdminHeader } from "@/components/super-admin/super-admin-header";
import { SuperAdminDashboardOverview } from "@/components/super-admin/super-admin-dashboard-overview";
import { BookingManagement } from "@/components/admin/booking-management";
import { EventManagement } from "@/components/admin/event-management";
import { GalleryManagement } from "@/components/admin/gallery-management";

export default function SuperAdminDashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
      return;
    }

    if (user) {
      checkUserRole();
    }
  }, [user, loading, navigate]);

  const checkUserRole = async () => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user?.id)
        .eq("role", "super_admin")
        .maybeSingle();

      if (error) {
        console.error("Error fetching user role:", error);
        navigate("/auth");
        return;
      }

      if (!data) {
        navigate("/auth");
        return;
      }

      setUserRole(data.role);
    } catch (error) {
      console.error("Error checking user role:", error);
      navigate("/auth");
    } finally {
      setRoleLoading(false);
    }
  };

  if (loading || roleLoading || !user || !userRole) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background w-full">
      <SuperAdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <SuperAdminHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route index element={<SuperAdminDashboardOverview />} />
            <Route path="bookings" element={<BookingManagement />} />
            <Route path="events" element={<EventManagement />} />
            <Route path="gallery" element={<GalleryManagement />} />
            <Route path="admins" element={<div className="text-2xl font-bold">Admin Management - Coming Soon</div>} />
            <Route path="users" element={<div className="text-2xl font-bold">User Management - Coming Soon</div>} />
            <Route path="system" element={<div className="text-2xl font-bold">System Security - Coming Soon</div>} />
            <Route path="settings" element={<div className="text-2xl font-bold">Settings - Coming Soon</div>} />
            <Route path="*" element={<Navigate to="/super-admin" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
