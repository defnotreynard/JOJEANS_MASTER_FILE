import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Trash2, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const Deletion = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-16 mt-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-foreground">Account & Data Deletion</h1>
            <p className="text-lg text-muted-foreground">
              Manage your account data and deletion requests
            </p>
          </div>

          <div className="space-y-6">
            {/* Data Protection Notice */}
            <Card className="border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                  <CardTitle>Your Data Rights</CardTitle>
                </div>
                <CardDescription>
                  We respect your privacy and data rights under applicable data protection laws.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 text-foreground">What data we collect:</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Profile information (name, email, phone)</li>
                    <li>Event planning details and preferences</li>
                    <li>Guest lists and RSVP information</li>
                    <li>Communication history and messages</li>
                    <li>Service bookings and preferences</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Account Deletion */}
            <Card className="border-destructive/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Trash2 className="w-6 h-6 text-destructive" />
                  <CardTitle>Delete Your Account</CardTitle>
                </div>
                <CardDescription>
                  Permanently remove your account and all associated data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-foreground">
                    <strong>Warning:</strong> Account deletion is permanent and cannot be undone. 
                    All your events, guest lists, bookings, and data will be permanently deleted.
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-foreground">What will be deleted:</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Your profile and account information</li>
                    <li>All events and planning details</li>
                    <li>Guest lists and RSVP data</li>
                    <li>Messages and communication history</li>
                    <li>Service bookings and preferences</li>
                    <li>Any uploaded files or images</li>
                  </ul>
                </div>

                <div className="pt-4">
                  <Link to="/dashboard">
                    <Button variant="destructive" className="w-full sm:w-auto">
                      Request Account Deletion
                    </Button>
                  </Link>
                  <p className="text-sm text-muted-foreground mt-2">
                    You must be logged in to delete your account. Click the button above to go to your dashboard.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Data Export */}
            <Card>
              <CardHeader>
                <CardTitle>Export Your Data</CardTitle>
                <CardDescription>
                  Download a copy of your data before deletion
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Before deleting your account, you can request a copy of all your data in a 
                  machine-readable format (JSON/CSV). This includes all events, guests, and preferences.
                </p>
                <Link to="/dashboard">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Go to Dashboard to Export
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
                <CardDescription>
                  Contact our support team for assistance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  If you have questions about data deletion, privacy concerns, or need assistance, 
                  please contact our support team:
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-foreground">
                    <strong>Email:</strong>{" "}
                    <a href="mailto:support@jojeansevents.com" className="text-primary hover:underline">
                      support@jojeansevents.com
                    </a>
                  </p>
                  <p className="text-muted-foreground">
                    We typically respond within 24-48 hours
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Deletion;
