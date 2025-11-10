import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const guestId = url.searchParams.get("guestId");
    const status = url.searchParams.get("status");

    if (!guestId || !status) {
      return new Response(
        `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Invalid Request</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                margin: 0;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              }
              .card {
                background: white;
                border-radius: 16px;
                padding: 48px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                text-align: center;
                max-width: 400px;
              }
              .icon { font-size: 64px; margin-bottom: 20px; }
              h1 { color: #1f2937; margin: 0 0 16px 0; }
              p { color: #6b7280; margin: 0; }
            </style>
          </head>
          <body>
            <div class="card">
              <div class="icon">❌</div>
              <h1>Invalid Request</h1>
              <p>Missing guest ID or status parameter.</p>
            </div>
          </body>
        </html>
        `,
        {
          status: 400,
          headers: { "Content-Type": "text/html", ...corsHeaders },
        }
      );
    }

    if (!["attending", "declined"].includes(status)) {
      return new Response(
        `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Invalid Status</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                margin: 0;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              }
              .card {
                background: white;
                border-radius: 16px;
                padding: 48px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                text-align: center;
                max-width: 400px;
              }
              .icon { font-size: 64px; margin-bottom: 20px; }
              h1 { color: #1f2937; margin: 0 0 16px 0; }
              p { color: #6b7280; margin: 0; }
            </style>
          </head>
          <body>
            <div class="card">
              <div class="icon">❌</div>
              <h1>Invalid Status</h1>
              <p>Status must be 'attending' or 'declined'.</p>
            </div>
          </body>
        </html>
        `,
        {
          status: 400,
          headers: { "Content-Type": "text/html", ...corsHeaders },
        }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    console.log("Updating guest RSVP:", { guestId, status });

    const { data, error } = await supabase
      .from("guests")
      .update({ rsvp_status: status })
      .eq("id", guestId)
      .select()
      .single();

    if (error) {
      console.error("Error updating guest:", error);
      return new Response(
        `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Error</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                margin: 0;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              }
              .card {
                background: white;
                border-radius: 16px;
                padding: 48px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                text-align: center;
                max-width: 400px;
              }
              .icon { font-size: 64px; margin-bottom: 20px; }
              h1 { color: #1f2937; margin: 0 0 16px 0; }
              p { color: #6b7280; margin: 0; line-height: 1.6; }
            </style>
          </head>
          <body>
            <div class="card">
              <div class="icon">😞</div>
              <h1>Something Went Wrong</h1>
              <p>We couldn't update your RSVP. Please contact the event organizer.</p>
            </div>
          </body>
        </html>
        `,
        {
          status: 500,
          headers: { "Content-Type": "text/html", ...corsHeaders },
        }
      );
    }

    console.log("Guest updated successfully:", data);

    const successMessage = status === "attending"
      ? "You're all set! We can't wait to see you at the event! 🎉"
      : "We're sorry you can't make it. You'll be missed! 💔";

    const statusIcon = status === "attending" ? "✓" : "✗";
    const statusColor = status === "attending" ? "#10b981" : "#ef4444";

    return new Response(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>RSVP Confirmed ✓</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              margin: 0;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              padding: 20px;
            }
            .card {
              background: white;
              border-radius: 24px;
              padding: 60px 50px;
              box-shadow: 0 30px 80px rgba(0,0,0,0.4);
              text-align: center;
              max-width: 550px;
              width: 100%;
              animation: slideUp 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
              position: relative;
              overflow: hidden;
            }
            @keyframes slideUp {
              from {
                opacity: 0;
                transform: translateY(50px) scale(0.9);
              }
              to {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
            .confetti {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              pointer-events: none;
              overflow: hidden;
            }
            .confetti::before,
            .confetti::after {
              content: '🎉';
              position: absolute;
              font-size: 30px;
              animation: fall 3s linear infinite;
            }
            .confetti::before {
              left: 20%;
              animation-delay: 0s;
            }
            .confetti::after {
              right: 20%;
              animation-delay: 1s;
            }
            @keyframes fall {
              0% { top: -50px; transform: rotate(0deg); opacity: 1; }
              100% { top: 100%; transform: rotate(360deg); opacity: 0; }
            }
            .icon-container {
              width: 120px;
              height: 120px;
              background: ${statusColor};
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto 30px;
              animation: pulse 2s ease-in-out infinite;
              box-shadow: 0 10px 40px ${statusColor}40;
              position: relative;
              z-index: 1;
            }
            @keyframes pulse {
              0%, 100% { 
                transform: scale(1);
                box-shadow: 0 10px 40px ${statusColor}40;
              }
              50% { 
                transform: scale(1.05);
                box-shadow: 0 15px 50px ${statusColor}60;
              }
            }
            .icon {
              color: white;
              font-size: 64px;
              font-weight: bold;
            }
            h1 {
              color: #1f2937;
              margin: 0 0 20px 0;
              font-size: 36px;
              font-weight: 800;
              letter-spacing: -1px;
            }
            .message {
              color: #4b5563;
              margin: 0 0 30px 0;
              font-size: 18px;
              line-height: 1.7;
            }
            .status-badge {
              display: inline-block;
              padding: 12px 28px;
              background: ${statusColor};
              color: white;
              border-radius: 30px;
              font-weight: 700;
              margin: 20px 0;
              text-transform: capitalize;
              font-size: 16px;
              letter-spacing: 0.5px;
              box-shadow: 0 6px 20px ${statusColor}40;
            }
            .details-box {
              background: #f9fafb;
              padding: 25px;
              border-radius: 16px;
              margin: 30px 0;
              text-align: left;
              border: 2px solid #e5e7eb;
            }
            .details-box h3 {
              color: #374151;
              font-size: 16px;
              margin-bottom: 15px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .details-box p {
              color: #6b7280;
              font-size: 15px;
              margin: 8px 0;
              line-height: 1.6;
            }
            .action-section {
              margin-top: 35px;
              padding-top: 30px;
              border-top: 2px solid #e5e7eb;
            }
            .action-section p {
              color: #6b7280;
              font-size: 14px;
              margin-bottom: 15px;
            }
            .footer-note {
              margin-top: 30px;
              padding-top: 25px;
              border-top: 2px solid #f3f4f6;
              color: #9ca3af;
              font-size: 13px;
              line-height: 1.6;
            }
            @media (max-width: 600px) {
              .card {
                padding: 40px 30px;
              }
              h1 {
                font-size: 28px;
              }
              .icon-container {
                width: 100px;
                height: 100px;
              }
              .icon {
                font-size: 52px;
              }
              .message {
                font-size: 16px;
              }
            }
          </style>
        </head>
        <body>
          <div class="card">
            ${status === "attending" ? '<div class="confetti"></div>' : ''}
            <div class="icon-container">
              <div class="icon">${statusIcon}</div>
            </div>
            <h1>${status === "attending" ? "You're All Set!" : "RSVP Received"}</h1>
            <p class="message">${successMessage}</p>
            <div class="status-badge">RSVP: ${status}</div>
            
            <div class="details-box">
              <h3>${status === "attending" ? "✨ What's Next?" : "📝 Response Recorded"}</h3>
              <p>${status === "attending" 
                ? "Your attendance has been confirmed! The event host will be notified and may reach out with additional details as the event approaches." 
                : "We've recorded your response and notified the event host. Thank you for letting us know."}</p>
              ${status === "attending" 
                ? '<p style="margin-top: 12px;">💡 <strong>Tip:</strong> Save this event in your calendar and mark the date!</p>' 
                : '<p style="margin-top: 12px;">If your plans change, feel free to update your RSVP using the original invitation email.</p>'}
            </div>

            <div class="action-section">
              <p><strong>Need to change your response?</strong></p>
              <p>You can update your RSVP anytime by clicking the links in your original invitation email.</p>
            </div>

            <div class="footer-note">
              <p><strong>Jojean's Events</strong> • Creating Unforgettable Moments</p>
              <p style="margin-top: 8px;">Questions? Contact the event host directly or reach us at support@jojeansevents.sbs</p>
            </div>
          </div>
        </body>
      </html>
      `,
      {
        status: 200,
        headers: { "Content-Type": "text/html", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in confirm-guest-invitation function:", error);
    return new Response(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Error</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              margin: 0;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }
            .card {
              background: white;
              border-radius: 16px;
              padding: 48px;
              box-shadow: 0 20px 60px rgba(0,0,0,0.3);
              text-align: center;
              max-width: 400px;
            }
            .icon { font-size: 64px; margin-bottom: 20px; }
            h1 { color: #1f2937; margin: 0 0 16px 0; }
            p { color: #6b7280; margin: 0; line-height: 1.6; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="icon">😞</div>
            <h1>Unexpected Error</h1>
            <p>An unexpected error occurred. Please try again or contact the event organizer.</p>
          </div>
        </body>
      </html>
      `,
      {
        status: 500,
        headers: { "Content-Type": "text/html", ...corsHeaders },
      }
    );
  }
};

serve(handler);
