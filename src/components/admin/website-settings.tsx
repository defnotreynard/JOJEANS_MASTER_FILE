import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Download, Loader2, Moon, Sun, Shield, Database } from "lucide-react";
import * as XLSX from "xlsx";

interface SecuritySettings {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface WebsiteSettingsProps {
  onDarkModeChange?: (darkMode: boolean) => void;
}

export function WebsiteSettings({ onDarkModeChange }: WebsiteSettingsProps) {
  const { toast } = useToast();
  const [exporting, setExporting] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("admin-theme") === "dark";
  });
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [changingPassword, setChangingPassword] = useState(false);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    
    // Store admin-specific theme preference
    localStorage.setItem("admin-theme", newMode ? "dark" : "light");
    
    // Notify parent component to update dark mode class
    if (onDarkModeChange) {
      onDarkModeChange(newMode);
    }

    toast({
      title: "Theme Updated",
      description: `Switched to ${newMode ? "dark" : "light"} mode (Admin Dashboard only)`,
    });
  };

  const handlePasswordChange = async () => {
    if (securitySettings.newPassword !== securitySettings.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (securitySettings.newPassword.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      });
      return;
    }

    setChangingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: securitySettings.newPassword,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Password changed successfully",
      });

      setSecuritySettings({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to change password",
        variant: "destructive",
      });
    } finally {
      setChangingPassword(false);
    }
  };

  const handleBackupData = async () => {
    setExporting(true);
    try {
      const [eventsRes, galleryRes, profilesRes] = await Promise.all([
        supabase.from("events").select("*"),
        supabase.from("gallery").select("*"),
        supabase.from("profiles").select("*"),
      ]);

      const wb = XLSX.utils.book_new();

      if (eventsRes.data && eventsRes.data.length > 0) {
        const ws = XLSX.utils.json_to_sheet(eventsRes.data);
        XLSX.utils.book_append_sheet(wb, ws, "Events");
      }

      if (galleryRes.data && galleryRes.data.length > 0) {
        const ws = XLSX.utils.json_to_sheet(galleryRes.data);
        XLSX.utils.book_append_sheet(wb, ws, "Gallery");
      }

      if (profilesRes.data && profilesRes.data.length > 0) {
        const ws = XLSX.utils.json_to_sheet(profilesRes.data);
        XLSX.utils.book_append_sheet(wb, ws, "Profiles");
      }

      const filename = `JOJEANS_Backup_${new Date().toISOString().split('T')[0]}.xlsx`;
      XLSX.writeFile(wb, filename);

      toast({
        title: "Success",
        description: "Data backup downloaded successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to export data",
        variant: "destructive",
      });
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">System Settings</h2>
        <p className="text-muted-foreground">Manage security, appearance, and data backup</p>
      </div>

      <Tabs defaultValue="appearance" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="appearance">
            {darkMode ? <Moon className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />}
            Appearance
          </TabsTrigger>
          <TabsTrigger value="backup">
            <Database className="h-4 w-4 mr-2" />
            Data Backup
          </TabsTrigger>
        </TabsList>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of your dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Toggle between light and dark theme
                  </p>
                </div>
                <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
              </div>

              <div className="pt-4 border-t">
                <div className="space-y-2">
                  <h3 className="text-base font-semibold">Theme Preview</h3>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="p-4 rounded-lg border bg-background">
                      <div className="space-y-2">
                        <div className="h-4 w-3/4 bg-foreground/20 rounded" />
                        <div className="h-4 w-1/2 bg-foreground/10 rounded" />
                      </div>
                    </div>
                    <div className="p-4 rounded-lg border bg-muted">
                      <div className="space-y-2">
                        <div className="h-4 w-3/4 bg-foreground/20 rounded" />
                        <div className="h-4 w-1/2 bg-foreground/10 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup">
          <Card>
            <CardHeader>
              <CardTitle>Data Backup & Export</CardTitle>
              <CardDescription>Download your data as Excel spreadsheets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-muted/50">
                  <h3 className="font-semibold mb-2">Full System Backup</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Export all data including events, gallery items, and user profiles to a single
                    Excel file with multiple sheets.
                  </p>
                  <Button onClick={handleBackupData} disabled={exporting}>
                    {exporting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="mr-2 h-4 w-4" />
                    )}
                    Download Full Backup
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-base font-semibold mb-4">What's Included?</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        <strong>Events:</strong> All event bookings and details
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        <strong>Gallery:</strong> Gallery items with metadata
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        <strong>Profiles:</strong> User profile information
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-start gap-2 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                    <Shield className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-amber-900 dark:text-amber-100">
                        Security Notice
                      </p>
                      <p className="text-amber-800 dark:text-amber-200 mt-1">
                        Backup files contain sensitive data. Store them securely and do not share
                        publicly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
