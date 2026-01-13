import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Check, X, Loader2, PartyPopper, Heart } from "lucide-react";

const RSVPConfirm = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [rsvpStatus, setRsvpStatus] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const guestId = searchParams.get("guestId");
  const responseStatus = searchParams.get("status");

  useEffect(() => {
    const updateRSVP = async () => {
      if (!guestId || !responseStatus) {
        setStatus("error");
        setErrorMessage("Missing guest ID or status parameter.");
        return;
      }

      if (!["attending", "declined"].includes(responseStatus)) {
        setStatus("error");
        setErrorMessage("Invalid status. Must be 'attending' or 'declined'.");
        return;
      }

      try {
        const { error } = await supabase
          .from("guests")
          .update({ rsvp_status: responseStatus })
          .eq("id", guestId);

        if (error) {
          console.error("Error updating RSVP:", error);
          setStatus("error");
          setErrorMessage("We couldn't update your RSVP. Please contact the event organizer.");
          return;
        }

        setRsvpStatus(responseStatus);
        setStatus("success");
      } catch (err) {
        console.error("Unexpected error:", err);
        setStatus("error");
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    };

    updateRSVP();
  }, [guestId, responseStatus]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 flex items-center justify-center p-4">
        <div className="bg-card rounded-3xl p-12 shadow-2xl text-center max-w-md w-full">
          <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Processing Your Response</h1>
          <p className="text-muted-foreground">Please wait while we update your RSVP...</p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-destructive/10 via-background to-destructive/5 flex items-center justify-center p-4">
        <div className="bg-card rounded-3xl p-12 shadow-2xl text-center max-w-md w-full">
          <div className="w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <X className="w-12 h-12 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4">Something Went Wrong</h1>
          <p className="text-muted-foreground mb-6">{errorMessage}</p>
          <p className="text-sm text-muted-foreground">
            If you continue to experience issues, please contact the event organizer directly.
          </p>
        </div>
      </div>
    );
  }

  const isAttending = rsvpStatus === "attending";

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${
      isAttending 
        ? "bg-gradient-to-br from-emerald-500/20 via-background to-primary/20" 
        : "bg-gradient-to-br from-rose-500/10 via-background to-secondary/20"
    }`}>
      <div className="bg-card rounded-3xl p-8 md:p-12 shadow-2xl text-center max-w-lg w-full relative overflow-hidden">
        {/* Decorative elements for attending */}
        {isAttending && (
          <>
            <div className="absolute top-4 left-4 text-4xl animate-bounce">🎉</div>
            <div className="absolute top-4 right-4 text-4xl animate-bounce" style={{ animationDelay: "0.5s" }}>🎊</div>
          </>
        )}

        {/* Icon */}
        <div className={`w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg ${
          isAttending 
            ? "bg-gradient-to-br from-emerald-400 to-emerald-600" 
            : "bg-gradient-to-br from-rose-400 to-rose-600"
        }`}>
          {isAttending ? (
            <Check className="w-14 h-14 text-white" strokeWidth={3} />
          ) : (
            <Heart className="w-14 h-14 text-white" />
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          {isAttending ? "You're All Set!" : "RSVP Received"}
        </h1>

        {/* Message */}
        <p className="text-lg text-muted-foreground mb-8">
          {isAttending 
            ? "We can't wait to see you at the event! 🎉" 
            : "We're sorry you can't make it. You'll be missed! 💔"}
        </p>

        {/* Status Badge */}
        <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white mb-8 ${
          isAttending 
            ? "bg-gradient-to-r from-emerald-500 to-emerald-600" 
            : "bg-gradient-to-r from-rose-500 to-rose-600"
        }`}>
          {isAttending ? <PartyPopper className="w-5 h-5" /> : <Heart className="w-5 h-5" />}
          RSVP: {rsvpStatus.charAt(0).toUpperCase() + rsvpStatus.slice(1)}
        </div>

        {/* Info Box */}
        <div className="bg-muted/50 rounded-2xl p-6 text-left mb-8">
          <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
            {isAttending ? "✨ What's Next?" : "📝 Response Recorded"}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {isAttending 
              ? "Your attendance has been confirmed! The event host will be notified and may reach out with additional details as the event approaches." 
              : "We've recorded your response and notified the event host. Thank you for letting us know."}
          </p>
          {isAttending && (
            <p className="text-muted-foreground text-sm mt-3">
              💡 <strong>Tip:</strong> Save this event in your calendar and mark the date!
            </p>
          )}
        </div>

        {/* Change Response Note */}
        <div className="border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">
            <strong>Need to change your response?</strong><br />
            You can update your RSVP anytime by clicking the links in your original invitation email.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="font-bold text-primary text-lg">Jojean's Events</p>
          <p className="text-sm text-muted-foreground">Creating Unforgettable Moments</p>
          <p className="text-xs text-muted-foreground mt-2">
            Questions? Contact the event host or reach us at support@jojeansevents.sbs
          </p>
        </div>
      </div>
    </div>
  );
};

export default RSVPConfirm;