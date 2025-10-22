import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BookingConfirmationRequest {
  clientName: string;
  clientEmail: string;
  eventType: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  guests: string;
  referenceId: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      clientName, 
      clientEmail, 
      eventType, 
      eventDate, 
      eventTime, 
      venue, 
      guests,
      referenceId 
    }: BookingConfirmationRequest = await req.json();

    console.log(`Sending confirmation email to ${clientEmail} for booking ${referenceId}`);

    // Create a scheduling link (you can customize this with your actual scheduling system)
    const schedulingLink = `${Deno.env.get('SUPABASE_URL')?.replace('.supabase.co', '')}/user-dashboard`;

    const emailResponse = await resend.emails.send({
      from: "Event Bookings <onboarding@resend.dev>",
      to: [clientEmail],
      subject: `🎉 Booking Confirmed - ${eventType} Event`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px 20px;
              border-radius: 10px 10px 0 0;
              text-align: center;
            }
            .content {
              background: #f9fafb;
              padding: 30px 20px;
              border-radius: 0 0 10px 10px;
            }
            .booking-details {
              background: white;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .detail-row {
              display: flex;
              justify-content: space-between;
              padding: 10px 0;
              border-bottom: 1px solid #e5e7eb;
            }
            .detail-row:last-child {
              border-bottom: none;
            }
            .detail-label {
              font-weight: 600;
              color: #6b7280;
            }
            .detail-value {
              color: #111827;
            }
            .schedule-section {
              background: #eff6ff;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
              border-left: 4px solid #3b82f6;
            }
            .cta-button {
              display: inline-block;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 14px 28px;
              text-decoration: none;
              border-radius: 6px;
              font-weight: 600;
              margin: 15px 0;
              text-align: center;
            }
            .footer {
              text-align: center;
              color: #6b7280;
              font-size: 14px;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
            }
            .reference {
              background: #fef3c7;
              padding: 10px 15px;
              border-radius: 6px;
              font-weight: 600;
              display: inline-block;
              margin: 10px 0;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">✨ Booking Confirmed!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.95;">Your event booking has been approved</p>
          </div>
          
          <div class="content">
            <p style="font-size: 16px; margin-top: 0;">Hi ${clientName},</p>
            
            <p>Great news! Your <strong>${eventType}</strong> event booking has been confirmed. We're excited to help make your event memorable!</p>
            
            <div class="reference">
              📋 Reference ID: ${referenceId}
            </div>
            
            <div class="booking-details">
              <h3 style="margin-top: 0; color: #111827;">📅 Event Details</h3>
              <div class="detail-row">
                <span class="detail-label">Event Type:</span>
                <span class="detail-value">${eventType}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Date:</span>
                <span class="detail-value">${eventDate}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Time:</span>
                <span class="detail-value">${eventTime}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Venue:</span>
                <span class="detail-value">${venue}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Expected Guests:</span>
                <span class="detail-value">${guests}</span>
              </div>
            </div>
            
            <div class="schedule-section">
              <h3 style="margin-top: 0; color: #1e40af;">📝 Next Steps: Schedule Contract Signing</h3>
              <p style="margin-bottom: 15px;">To finalize everything, we need to schedule a meeting for contract signing and to discuss final details of your event.</p>
              
              <p><strong>Please provide your preferred meeting details:</strong></p>
              <ul style="margin: 10px 0;">
                <li>Preferred date and time</li>
                <li>Meeting location preference (our office or virtual)</li>
                <li>Any specific questions or requirements</li>
              </ul>
              
              <p>Reply to this email with your availability, and we'll confirm the meeting details as soon as possible.</p>
              
              <a href="${schedulingLink}" class="cta-button" style="color: white;">View Your Dashboard</a>
            </div>
            
            <div style="background: #f3f4f6; padding: 15px; border-radius: 6px; margin-top: 20px;">
              <p style="margin: 0; font-size: 14px;"><strong>💡 What to Expect:</strong></p>
              <ul style="margin: 10px 0; font-size: 14px;">
                <li>Contract review and signing</li>
                <li>Final event timeline discussion</li>
                <li>Payment terms and schedule</li>
                <li>Any special requests or modifications</li>
              </ul>
            </div>
            
            <p style="margin-top: 25px;">If you have any questions or need to make changes to your booking, please don't hesitate to reach out.</p>
            
            <p>We look forward to meeting with you soon!</p>
            
            <p style="margin-bottom: 5px;">Best regards,</p>
            <p style="margin-top: 5px;"><strong>The Event Planning Team</strong></p>
          </div>
          
          <div class="footer">
            <p>This email was sent regarding your event booking (Ref: ${referenceId})</p>
            <p>If you didn't request this booking, please contact us immediately.</p>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Confirmation email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-booking-confirmation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
