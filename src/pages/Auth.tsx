import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, User, Lock, Calendar } from "lucide-react";
import { ForgotPasswordModal } from "@/components/ForgotPasswordModal";

const signUpSchema = z.object({
  fullName: z.string().trim().min(2, "Full name must be at least 2 characters").max(100, "Full name must be less than 100 characters"),
  phoneNumber: z.string().trim().min(10, "Phone number must be at least 10 digits").max(15, "Phone number must be less than 15 digits"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  password: z.string().min(8, "Password must be at least 8 characters").max(100, "Password must be less than 100 characters"),
});

const signInSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;
type SignInFormData = z.infer<typeof signInSchema>;

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const signUpForm = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      password: "",
    },
  });

  const signInForm = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const handleOAuthCallback = async () => {
      // Check if we're returning from OAuth (tokens in hash)
      if (window.location.hash) {
        console.log("🔐 Processing OAuth callback...");
        
        // Supabase SDK automatically processes hash and stores session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("❌ OAuth callback error:", error);
          toast({
            title: "Authentication Error",
            description: "Failed to process OAuth login. Please try again.",
            variant: "destructive",
          });
          return;
        }

        if (session?.user) {
          console.log("✅ OAuth session established for user:", session.user.id);
          // Clear hash from URL for security (don't expose tokens)
          window.history.replaceState({}, document.title, window.location.pathname);
          
          // Redirect based on role
          checkRoleAndRedirect(session.user.id);
          return;
        }
      }

      // Normal auth state change listener for non-OAuth flows
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        // Only redirect on initial load, not on sign_in event
        // (handleSignIn handles that directly)
        if (event === 'INITIAL_SESSION' && session?.user) {
          checkRoleAndRedirect(session.user.id);
        }
      });

      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user && !window.location.hash) {
          checkRoleAndRedirect(session.user.id);
        }
      });

      return () => subscription.unsubscribe();
    };

    handleOAuthCallback();
  }, [navigate, toast]);

  const checkRoleAndRedirect = async (userId: string) => {
  try {
    console.log("🔍 Checking role for user:", userId);

    // Query role with explicit columns for debugging
    const { data, error } = await supabase
      .from("user_roles")
      .select("id, user_id, role")
      .eq("user_id", userId)
      .maybeSingle(); // ✅ safer than single(), won’t throw if no row

    console.log("📌 Role query result:", { data, error });

    if (error) {
      console.error("⚠️ Error fetching role:", error);
      navigate("/dashboard");
      return;
    }

    if (!data || !data.role) {
      console.warn("⚠️ No role found for user, redirecting to default dashboard");
      navigate("/dashboard");
      return;
    }

    // Normalize role
    const role = data.role.trim().toLowerCase();
    console.log("✅ User role detected:", role);

    // Redirect based on role
    switch (role) {
      case "super_admin":
        console.log("➡️ Redirecting to Super Admin dashboard");
        navigate("/super-admin");
        break;
      case "admin":
        console.log("➡️ Redirecting to Admin dashboard");
        navigate("/admin");
        break;
      default:
        console.log("➡️ Redirecting to User dashboard");
        navigate("/dashboard");
        break;
    }
  } catch (err) {
    console.error("🔥 Exception checking role:", err);
    navigate("/dashboard");
  }
};

  const handleSignUp = async (data: SignUpFormData) => {
  setLoading(true);
  try {
    const { data: signUpData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: {
          full_name: data.fullName,
          phone_number: data.phoneNumber,
        },
      },
    });

    if (error) {
      if (error.message.includes("User already registered")) {
        toast({
          title: "Account exists",
          description: "An account with this email already exists. Please sign in instead.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } else {
      // ✅ Insert default role into user_roles
      if (signUpData.user) {
        const { error: roleError } = await supabase
          .from("user_roles")
          .insert([{ user_id: signUpData.user.id, role: "user" }]);

        if (roleError) {
          console.error("Error inserting role:", roleError);
        }
      }

      toast({
        title: "Account created!",
        description: "Please check your email to verify your account.",
      });
      setIsSignUp(false);
    }
  } catch (error) {
    toast({
      title: "An error occurred",
      description: "Please try again later.",
      variant: "destructive",
    });
  } finally {
    setLoading(false);
  }
};


  const handleSignIn = async (data: SignInFormData) => {
    setLoading(true);
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast({
            title: "Invalid credentials",
            description: "Please check your email and password.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Sign in failed",
            description: error.message,
            variant: "destructive",
          });
        }
      } else if (authData.user) {
        // Immediately check role after successful login
        await checkRoleAndRedirect(authData.user.id);
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4 page-transition">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">
              {isSignUp ? "Start Planning" : "Welcome Back"}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {isSignUp 
                ? "Create your account to start planning amazing events" 
                : "Sign in to continue planning your events"
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Sign Up Form */}
            {isSignUp ? (
              <Form {...signUpForm}>
                <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="space-y-4">
                  <FormField
                    control={signUpForm.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Enter your full name" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signUpForm.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Enter your phone number" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signUpForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Enter your email" type="email" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signUpForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Create a password" type="password" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </Form>
            ) : (
              /* Sign In Form */
              <Form {...signInForm}>
                <form onSubmit={signInForm.handleSubmit(handleSignIn)} className="space-y-4">
                  <FormField
                    control={signInForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Enter your email" type="email" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signInForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Password</FormLabel>
                          <Button
                            type="button"
                            variant="link"
                            className="px-0 h-auto text-xs text-muted-foreground hover:text-primary"
                            onClick={() => setShowForgotPassword(true)}
                          >
                            Forgot password?
                          </Button>
                        </div>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Enter your password" type="password" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </Form>
            )}

            <div className="text-center">
              <Button
                type="button"
                variant="link"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                {isSignUp 
                  ? "Already have an account? Sign in" 
                  : "Don't have an account? Sign up"
                }
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Forgot Password Modal */}
        <ForgotPasswordModal
          isOpen={showForgotPassword}
          onClose={() => setShowForgotPassword(false)}
          onBackToSignIn={() => setShowForgotPassword(false)}
        />
      </div>
    </div>
  );
}