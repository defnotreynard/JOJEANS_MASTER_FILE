import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, ArrowLeft, KeyRound, CheckCircle } from "lucide-react";

const emailSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
});

const resetPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type EmailFormData = z.infer<typeof emailSchema>;
type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToSignIn: () => void;
}

type Step = "email" | "verify" | "reset" | "success";

export function ForgotPasswordModal({ isOpen, onClose, onBackToSignIn }: ForgotPasswordModalProps) {
  const [step, setStep] = useState<Step>("email");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const { toast } = useToast();

  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const resetPasswordForm = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  // Reset state when modal closes
  React.useEffect(() => {
    if (!isOpen) {
      setStep("email");
      setEmail("");
      setOtp("");
      emailForm.reset();
      resetPasswordForm.reset();
    }
  }, [isOpen]);

  const handleSendCode = async (data: EmailFormData) => {
    setLoading(true);
    try {
      // Use Supabase's OTP recovery method
      const { error } = await supabase.auth.signInWithOtp({
        email: data.email,
        options: {
          shouldCreateUser: false,
        },
      });

      if (error) {
        // Check if user doesn't exist
        if (error.message.includes("Signups not allowed") || error.message.includes("User not found")) {
          toast({
            title: "Account not found",
            description: "No account exists with this email address.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Failed to send code",
            description: error.message,
            variant: "destructive",
          });
        }
      } else {
        setEmail(data.email);
        setStep("verify");
        toast({
          title: "Code sent!",
          description: "Please check your email for the verification code.",
        });
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

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid code",
        description: "Please enter the 6-digit code from your email.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "recovery",
      });

      if (error) {
        toast({
          title: "Invalid code",
          description: "The code you entered is incorrect or has expired.",
          variant: "destructive",
        });
      } else {
        setStep("reset");
        toast({
          title: "Code verified!",
          description: "You can now set your new password.",
        });
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

  const handleResetPassword = async (data: ResetPasswordFormData) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.password,
      });

      if (error) {
        toast({
          title: "Failed to update password",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setStep("success");
        toast({
          title: "Password updated!",
          description: "Your password has been successfully changed.",
        });
        // Sign out after password change so user can log in fresh
        await supabase.auth.signOut();
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

  const handleResendCode = async () => {
    if (!email) return;
    
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
        },
      });

      if (error) {
        toast({
          title: "Failed to resend code",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setOtp("");
        toast({
          title: "Code resent!",
          description: "Please check your email for the new verification code.",
        });
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-center pb-2">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            {step === "success" ? (
              <CheckCircle className="w-6 h-6 text-green-600" />
            ) : (
              <KeyRound className="w-6 h-6 text-primary" />
            )}
          </div>
          <DialogTitle className="text-2xl font-bold">
            {step === "email" && "Forgot Password"}
            {step === "verify" && "Enter Verification Code"}
            {step === "reset" && "Create New Password"}
            {step === "success" && "Password Reset Complete"}
          </DialogTitle>
          <DialogDescription>
            {step === "email" && "Enter your email address and we'll send you a verification code."}
            {step === "verify" && `We've sent a 6-digit code to ${email}`}
            {step === "reset" && "Enter your new password below."}
            {step === "success" && "Your password has been successfully updated."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Step 1: Email Input */}
          {step === "email" && (
            <Form {...emailForm}>
              <form onSubmit={emailForm.handleSubmit(handleSendCode)} className="space-y-4">
                <FormField
                  control={emailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            placeholder="Enter your email" 
                            type="email" 
                            className="pl-10" 
                            disabled={loading}
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Sending code..." : "Send Verification Code"}
                </Button>
              </form>
            </Form>
          )}

          {/* Step 2: OTP Verification */}
          {step === "verify" && (
            <div className="space-y-4">
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                  disabled={loading}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <Button 
                onClick={handleVerifyOtp} 
                className="w-full" 
                disabled={loading || otp.length !== 6}
              >
                {loading ? "Verifying..." : "Verify Code"}
              </Button>

              <div className="text-center">
                <Button
                  type="button"
                  variant="link"
                  onClick={handleResendCode}
                  disabled={loading}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Didn't receive the code? Resend
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Reset Password */}
          {step === "reset" && (
            <Form {...resetPasswordForm}>
              <form onSubmit={resetPasswordForm.handleSubmit(handleResetPassword)} className="space-y-4">
                <FormField
                  control={resetPasswordForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            placeholder="Enter new password" 
                            type="password" 
                            className="pl-10" 
                            disabled={loading}
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={resetPasswordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            placeholder="Confirm new password" 
                            type="password" 
                            className="pl-10" 
                            disabled={loading}
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Updating password..." : "Update Password"}
                </Button>
              </form>
            </Form>
          )}

          {/* Step 4: Success */}
          {step === "success" && (
            <Button 
              onClick={() => {
                onClose();
                onBackToSignIn();
              }} 
              className="w-full"
            >
              Back to Sign In
            </Button>
          )}

          {/* Back to Sign In link (for email and verify steps) */}
          {(step === "email" || step === "verify") && (
            <div className="text-center">
              <Button
                type="button"
                variant="link"
                onClick={() => {
                  onClose();
                  onBackToSignIn();
                }}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Sign In
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
