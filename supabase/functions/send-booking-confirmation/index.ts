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
      from: "Jojean's Events <bookings@jojeansevents.sbs>",
      to: [clientEmail],
      subject: `✨ Booking Confirmed - ${eventType} | Jojean's Events`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #262626;
              background: #f8faf9;
              padding: 20px;
            }
            .email-container {
              max-width: 600px;
              margin: 0 auto;
              background: white;
              border-radius: 16px;
              overflow: hidden;
              box-shadow: 0 10px 40px rgba(0, 191, 166, 0.08);
            }
            .header {
              background: linear-gradient(135deg, #00bfa6 0%, #00d4b8 100%);
              color: white;
              padding: 40px 30px;
              text-align: center;
              position: relative;
            }
            .logo {
              width: 80px;
              height: 80px;
              margin: 0 auto 20px;
              background: white;
              border-radius: 50%;
              padding: 12px;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            }
            .logo img {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
            .header h1 {
              font-size: 32px;
              font-weight: 700;
              margin: 0 0 8px 0;
              letter-spacing: -0.5px;
            }
            .header p {
              font-size: 16px;
              margin: 0;
              opacity: 0.95;
              font-weight: 400;
            }
            .content {
              padding: 40px 30px;
            }
            .greeting {
              font-size: 18px;
              color: #262626;
              margin-bottom: 16px;
              font-weight: 600;
            }
            .intro-text {
              color: #525252;
              font-size: 15px;
              margin-bottom: 24px;
              line-height: 1.7;
            }
            .reference-badge {
              display: inline-block;
              background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
              color: #92400e;
              padding: 12px 20px;
              border-radius: 10px;
              font-weight: 700;
              font-size: 14px;
              margin: 10px 0 30px 0;
              border: 2px solid #fbbf24;
            }
            .event-details-card {
              background: #f8faf9;
              padding: 28px;
              border-radius: 12px;
              margin: 24px 0;
              border: 2px solid #e0f2ef;
            }
            .event-details-card h3 {
              color: #00bfa6;
              font-size: 18px;
              margin: 0 0 20px 0;
              font-weight: 700;
              display: flex;
              align-items: center;
              gap: 8px;
            }
            .detail-row {
              display: flex;
              justify-content: space-between;
              padding: 14px 0;
              border-bottom: 1px solid #e0f2ef;
              align-items: center;
            }
            .detail-row:last-child {
              border-bottom: none;
            }
            .detail-label {
              font-weight: 600;
              color: #525252;
              font-size: 14px;
            }
            .detail-value {
              color: #262626;
              font-weight: 600;
              font-size: 14px;
              text-align: right;
            }
            .next-steps-card {
              background: linear-gradient(135deg, #e0f2ef 0%, #d1f0ea 100%);
              padding: 28px;
              border-radius: 12px;
              margin: 24px 0;
              border-left: 4px solid #00bfa6;
            }
            .next-steps-card h3 {
              color: #047857;
              font-size: 18px;
              margin: 0 0 16px 0;
              font-weight: 700;
              display: flex;
              align-items: center;
              gap: 8px;
            }
            .next-steps-card p {
              color: #047857;
              font-size: 15px;
              margin-bottom: 12px;
              line-height: 1.6;
            }
            .next-steps-card ul {
              margin: 16px 0;
              padding-left: 20px;
              color: #047857;
            }
            .next-steps-card li {
              margin: 8px 0;
              font-size: 14px;
            }
            .cta-button {
              display: inline-block;
              background: linear-gradient(135deg, #00bfa6 0%, #00d4b8 100%);
              color: white;
              padding: 16px 32px;
              text-decoration: none;
              border-radius: 10px;
              font-weight: 700;
              font-size: 15px;
              margin: 20px 0;
              text-align: center;
              box-shadow: 0 4px 16px rgba(0, 191, 166, 0.25);
              transition: transform 0.2s;
            }
            .info-box {
              background: #fef9f3;
              padding: 20px;
              border-radius: 10px;
              margin-top: 24px;
              border: 2px solid #fde68a;
            }
            .info-box strong {
              color: #92400e;
              font-size: 15px;
            }
            .info-box ul {
              margin: 12px 0 0 0;
              padding-left: 20px;
              color: #92400e;
            }
            .info-box li {
              margin: 8px 0;
              font-size: 14px;
            }
            .closing-text {
              color: #525252;
              font-size: 15px;
              margin-top: 28px;
              line-height: 1.6;
            }
            .signature {
              margin-top: 24px;
              color: #262626;
            }
            .signature p {
              margin: 4px 0;
              font-size: 15px;
            }
            .signature strong {
              color: #00bfa6;
              font-size: 16px;
            }
            .footer {
              background: #f8faf9;
              text-align: center;
              padding: 30px;
              color: #737373;
              font-size: 13px;
              border-top: 2px solid #e0f2ef;
            }
            .footer p {
              margin: 8px 0;
              line-height: 1.5;
            }
            .footer-logo {
              font-weight: 700;
              color: #00bfa6;
              font-size: 14px;
              margin-top: 12px;
            }
            @media only screen and (max-width: 600px) {
              body {
                padding: 10px;
              }
              .content {
                padding: 30px 20px;
              }
              .header {
                padding: 30px 20px;
              }
              .header h1 {
                font-size: 26px;
              }
              .detail-row {
                flex-direction: column;
                align-items: flex-start;
                gap: 4px;
              }
              .detail-value {
                text-align: left;
              }
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <div class="logo">
                <img src="logo.png" alt="Jojean's Events Logo" />
              </div>
              <h1>✨ Booking Confirmed!</h1>
              <p>Your event booking has been approved</p>
            </div>
            
            <div class="content">
              <div class="greeting">Hi ${clientName},</div>
              
              <p class="intro-text">Fantastic news! Your <strong>${eventType}</strong> event booking has been confirmed. We're thrilled and honored to be part of your special celebration. Our team is committed to making your event absolutely unforgettable!</p>
              
              <div class="reference-badge">
                📋 Booking Reference: ${referenceId}
              </div>
              
              <div class="event-details-card">
                <h3>📅 Your Event Details</h3>
                <div class="detail-row">
                  <span class="detail-label">Event Type:</span>
                  <span class="detail-value">${eventType}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Event Date:</span>
                  <span class="detail-value">${eventDate}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Event Time:</span>
                  <span class="detail-value">${eventTime}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Venue Location:</span>
                  <span class="detail-value">${venue}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Expected Guests:</span>
                  <span class="detail-value">${guests}</span>
                </div>
              </div>
              
              <div class="next-steps-card">
                <h3>📝 Next Step: Contract Signing & Final Details</h3>
                <p>To finalize your booking and ensure everything is perfect, we need to schedule a meeting for contract signing and to go over the final details of your event.</p>
                
                <p style="font-weight: 600; margin-top: 16px;">Please reply to this email with:</p>
                <ul>
                  <li>Your preferred date and time for the meeting</li>
                  <li>Meeting preference (in-person at our office or virtual meeting)</li>
                  <li>Any specific questions or special requirements you'd like to discuss</li>
                </ul>
                
                <p style="margin-top: 16px;">We'll confirm the meeting details as soon as we receive your response.</p>
                
                <center>
                  <a href="${schedulingLink}" class="cta-button">View Your Dashboard</a>
                </center>
              </div>
              
              <div class="info-box">
                <strong>💡 What We'll Cover in the Meeting:</strong>
                <ul>
                  <li>Contract review and signing</li>
                  <li>Detailed event timeline and coordination</li>
                  <li>Payment terms and schedule</li>
                  <li>Special requests, modifications, and customizations</li>
                  <li>Vendor coordination and logistics</li>
                </ul>
              </div>
              
              <p class="closing-text">If you have any questions right now or need to make changes to your booking details, please don't hesitate to reach out. We're here to help make your event planning experience smooth and enjoyable!</p>
              
              <div class="signature">
                <p>Warmest regards,</p>
                <p><strong>The Jojean's Events Team</strong></p>
                <p style="font-size: 14px; color: #525252; margin-top: 8px;">Creating Unforgettable Moments</p>
              </div>
            </div>
            
            <div class="footer">
              <p><strong>Booking Reference:</strong> ${referenceId}</p>
              <p>This email was sent regarding your confirmed event booking.</p>
              <p>If you didn't make this booking, please contact us immediately.</p>
              <p class="footer-logo">Jojean's Events</p>
            </div>
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
