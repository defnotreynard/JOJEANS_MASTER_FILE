import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface GuestInvitationRequest {
  guestName: string;
  guestEmail: string;
  eventType: string;
  eventDate: string;
  eventLocation: string;
  hostName: string;
  guestId: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      guestName, 
      guestEmail, 
      eventType, 
      eventDate, 
      eventLocation, 
      hostName,
      guestId
    }: GuestInvitationRequest = await req.json();

    console.log("Sending invitation to:", guestEmail);

    // Use the app URL for RSVP confirmation (in-app page)
    const appBaseUrl = "https://jojeansevents.sbs";
    const confirmUrl = `${appBaseUrl}/rsvp-confirm?guestId=${guestId}&status=attending`;
    const declineUrl = `${appBaseUrl}/rsvp-confirm?guestId=${guestId}&status=declined`;

    const emailResponse = await resend.emails.send({
      from: "Jojean's Events <onboarding@resend.dev>",
      to: [guestEmail],
      subject: `✨ You're Invited! ${eventType} - ${eventDate}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #262626;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                padding: 20px;
              }
              .email-container {
                max-width: 600px;
                margin: 0 auto;
                background: white;
                border-radius: 20px;
                overflow: hidden;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
              }
              .header {
                background: linear-gradient(135deg, #00bfa6 0%, #00d4b8 100%);
                color: white;
                padding: 50px 30px;
                text-align: center;
                position: relative;
              }
              .header::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="%23ffffff" fill-opacity="0.1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>') no-repeat bottom;
                background-size: cover;
                opacity: 0.3;
              }
              .invitation-badge {
                display: inline-block;
                background: rgba(255,255,255,0.2);
                padding: 8px 20px;
                border-radius: 20px;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 15px;
                backdrop-filter: blur(10px);
              }
              .header h1 {
                font-size: 42px;
                font-weight: 800;
                margin: 15px 0;
                letter-spacing: -1px;
                position: relative;
                z-index: 1;
              }
              .header .subtitle {
                font-size: 18px;
                opacity: 0.95;
                font-weight: 400;
                position: relative;
                z-index: 1;
              }
              .content {
                padding: 45px 35px;
              }
              .greeting {
                font-size: 20px;
                color: #262626;
                margin-bottom: 20px;
                font-weight: 700;
              }
              .intro-text {
                color: #525252;
                font-size: 16px;
                margin-bottom: 30px;
                line-height: 1.8;
              }
              .event-card {
                background: linear-gradient(135deg, #f8faf9 0%, #e0f2ef 100%);
                padding: 35px;
                border-radius: 16px;
                margin: 30px 0;
                border: 3px solid #00bfa6;
                box-shadow: 0 8px 30px rgba(0, 191, 166, 0.15);
              }
              .event-card h2 {
                color: #00bfa6;
                font-size: 22px;
                margin: 0 0 25px 0;
                font-weight: 800;
                text-align: center;
                text-transform: uppercase;
                letter-spacing: 1px;
              }
              .event-detail {
                display: flex;
                align-items: center;
                padding: 16px 0;
                border-bottom: 2px solid rgba(0, 191, 166, 0.1);
              }
              .event-detail:last-child {
                border-bottom: none;
              }
              .event-icon {
                font-size: 28px;
                margin-right: 20px;
                min-width: 40px;
                text-align: center;
              }
              .event-detail-content {
                flex: 1;
              }
              .event-label {
                font-size: 12px;
                text-transform: uppercase;
                color: #047857;
                font-weight: 700;
                letter-spacing: 0.5px;
                margin-bottom: 4px;
              }
              .event-value {
                font-size: 17px;
                color: #262626;
                font-weight: 600;
              }
              .host-message {
                background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
                padding: 25px;
                border-radius: 12px;
                margin: 25px 0;
                border-left: 5px solid #f59e0b;
              }
              .host-message p {
                color: #92400e;
                font-size: 15px;
                margin: 0;
                line-height: 1.7;
              }
              .host-message strong {
                display: block;
                font-size: 16px;
                margin-bottom: 8px;
                color: #78350f;
              }
              .rsvp-section {
                text-align: center;
                margin: 35px 0;
                padding: 30px;
                background: #f9fafb;
                border-radius: 12px;
              }
              .rsvp-section h3 {
                color: #262626;
                font-size: 20px;
                margin-bottom: 15px;
                font-weight: 700;
              }
              .rsvp-section p {
                color: #525252;
                font-size: 15px;
                margin-bottom: 25px;
              }
              .button-container {
                display: flex;
                gap: 15px;
                justify-content: center;
                flex-wrap: wrap;
              }
              .button {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                padding: 16px 36px;
                text-decoration: none;
                border-radius: 12px;
                font-weight: 700;
                font-size: 16px;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                min-width: 180px;
              }
              .button-accept {
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
              }
              .button-decline {
                background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
                color: white;
              }
              .additional-info {
                background: #f0f9ff;
                padding: 25px;
                border-radius: 12px;
                margin: 25px 0;
                border-left: 5px solid #3b82f6;
              }
              .additional-info h4 {
                color: #1e40af;
                font-size: 16px;
                margin-bottom: 12px;
                font-weight: 700;
              }
              .additional-info ul {
                margin: 0;
                padding-left: 20px;
                color: #1e40af;
              }
              .additional-info li {
                margin: 8px 0;
                font-size: 14px;
                line-height: 1.6;
              }
              .footer {
                background: #f8faf9;
                text-align: center;
                padding: 35px 30px;
                color: #737373;
                font-size: 13px;
                border-top: 3px solid #e0f2ef;
              }
              .footer p {
                margin: 8px 0;
                line-height: 1.6;
              }
              .footer-logo {
                font-weight: 800;
                color: #00bfa6;
                font-size: 18px;
                margin: 15px 0 5px 0;
                letter-spacing: 1px;
              }
              .divider {
                height: 3px;
                background: linear-gradient(90deg, transparent, #00bfa6, transparent);
                margin: 30px 0;
                border-radius: 3px;
              }
              @media only screen and (max-width: 600px) {
                body {
                  padding: 10px;
                }
                .content {
                  padding: 30px 20px;
                }
                .header {
                  padding: 40px 20px;
                }
                .header h1 {
                  font-size: 32px;
                }
                .event-card {
                  padding: 25px 20px;
                }
                .button-container {
                  flex-direction: column;
                }
                .button {
                  width: 100%;
                  min-width: auto;
                }
              }
            </style>
          </head>
          <body>
            <div class="email-container">
              <div class="header">
                <div class="invitation-badge">✨ Special Invitation</div>
                <h1>You're Invited!</h1>
                <p class="subtitle">Join us for a memorable celebration</p>
              </div>
              
              <div class="content">
                <div class="greeting">Dear ${guestName},</div>
                
                <p class="intro-text">
                  We are absolutely delighted to invite you to our special ${eventType}! Your presence would mean the world to us as we celebrate this momentous occasion. ${hostName} has specifically requested your attendance to share in the joy and create unforgettable memories together.
                </p>

                <div class="divider"></div>
                
                <div class="event-card">
                  <h2>📅 Event Details</h2>
                  
                  <div class="event-detail">
                    <div class="event-icon">🎉</div>
                    <div class="event-detail-content">
                      <div class="event-label">Event Type</div>
                      <div class="event-value">${eventType}</div>
                    </div>
                  </div>
                  
                  <div class="event-detail">
                    <div class="event-icon">📆</div>
                    <div class="event-detail-content">
                      <div class="event-label">Date</div>
                      <div class="event-value">${eventDate}</div>
                    </div>
                  </div>
                  
                  <div class="event-detail">
                    <div class="event-icon">📍</div>
                    <div class="event-detail-content">
                      <div class="event-label">Location</div>
                      <div class="event-value">${eventLocation}</div>
                    </div>
                  </div>
                  
                  <div class="event-detail">
                    <div class="event-icon">👥</div>
                    <div class="event-detail-content">
                      <div class="event-label">Hosted By</div>
                      <div class="event-value">${hostName}</div>
                    </div>
                  </div>
                </div>

                <div class="host-message">
                  <strong>💌 Personal Message from ${hostName}:</strong>
                  <p>Your presence at this celebration would make it even more special. We hope you can join us to share in the happiness, laughter, and create beautiful memories that will last a lifetime. Please let us know if you can attend!</p>
                </div>

                <div class="rsvp-section">
                  <h3>🎊 Will You Join Us?</h3>
                  <p>Please respond by clicking one of the buttons below:</p>
                  
                  <div class="button-container">
                    <a href="${confirmUrl}" class="button button-accept">
                      ✓ Yes, I'll Be There!
                    </a>
                    <a href="${declineUrl}" class="button button-decline">
                      ✗ Sorry, Can't Make It
                    </a>
                  </div>
                </div>

                <div class="additional-info">
                  <h4>📋 What to Expect:</h4>
                  <ul>
                    <li>Warm welcome and celebration atmosphere</li>
                    <li>Delicious food and refreshments</li>
                    <li>Great company and memorable moments</li>
                    <li>Special activities and entertainment</li>
                    <li>Opportunity to celebrate with ${hostName} and guests</li>
                  </ul>
                </div>

                <div class="divider"></div>

                <p class="intro-text" style="text-align: center; margin-top: 30px;">
                  <strong>Need to update your RSVP later?</strong><br>
                  Don't worry! You can always change your response by clicking the links in this email again.
                </p>
              </div>
              
              <div class="footer">
                <p class="footer-logo">Jojean's Events</p>
                <p><strong>Creating Unforgettable Moments</strong></p>
                <p style="margin-top: 15px;">This invitation was sent on behalf of ${hostName}.</p>
                <p>If you have any questions about this event, please contact the host directly.</p>
                <p style="margin-top: 15px; color: #a3a3a3; font-size: 12px;">
                  Need help? Contact us at support@jojeansevents.sbs
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-guest-invitation function:", error);
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
