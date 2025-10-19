import { useEffect, useState } from "react";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { DashboardOverview } from "@/components/admin/dashboard-overview";
import { BookingManagement } from "@/components/admin/booking-management";
import { EventManagement } from "@/components/admin/event-management";
import { GalleryManagement } from "@/components/admin/gallery-management";
import { WebsiteSettings } from "@/components/admin/website-settings";

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [roleLoading, setRoleLoading] = useState(true);
  const [adminDarkMode, setAdminDarkMode] = useState(() => {
    return localStorage.getItem("admin-theme") === "dark";
  });

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
      console.log("🔍 Checking role for user:", user?.id);

      const { data, error } = await supabase
        .from("user_roles")
        .select("role") // ✅ correct column
        .eq("user_id", user?.id)
        .in("role", ["admin", "super_admin"]) // ✅ correct filter
        .maybeSingle();

      console.log("📊 Role query result:", { data, error });

      if (error) {
        console.error("❌ Error fetching user role:", error);
        navigate("/auth");
        return;
      }

      if (!data) {
        console.warn("⚠️ No role found, redirecting to auth");
        navigate("/auth");
        return;
      }

      console.log("✅ User role found:", data.role);
      setUserRole(data.role);
    } catch (error) {
      console.error("❌ Error checking user role:", error);
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
    <div className={`flex h-screen bg-background w-full page-transition ${adminDarkMode ? 'dark' : ''}`}>
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route index element={<DashboardOverview />} />
            <Route path="bookings" element={<BookingManagement />} />
            <Route path="events" element={<EventManagement />} />
            <Route path="gallery" element={<GalleryManagement />} />
            <Route path="settings" element={<WebsiteSettings onDarkModeChange={setAdminDarkMode} />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
