import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory } = await req.json();
    const today = new Date().toISOString().split('T')[0];

    const GROQ_API_KEY = Deno.env.get('GROQ_API_KEY');
    if (!GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY is not configured');
    }

    const systemPrompt = `You are a helpful event planning assistant for Jojeans Events. Today's date is ${today}.

=== WEDDING PACKAGES ===

🥈 SILVER PACKAGE — ₱69,000 (Promo Code: #50A)
"Minimalist Wedding" — Catering & Décor Only
Perfect for couples who want a simple, intimate, and budget-friendly celebration.
Catering Setup:
- 3 menu choices with rice, soft drinks, and fruit salad
- Complete catering setup with utensils, tables, and chairs with covers
- Buffet corner with skirting and chafing dishes
- 2 servers at the buffet area
Venue Styling & Décor:
- Minimalist décor setup with backdrop and centerpieces
- VIP table setup
- Artificial flower arrangements and grass mat
Program Support:
- Basic program flow at the venue
Bonus:
- Free basic bridal bouquet
Choose 1 Freebie:
A) 2-layer basic wedding cake with wine
B) HMUA (Hair & Makeup Artist) for bride and groom
C) Basic photo coverage at the venue (no prints)
Note: Transportation fee applies for venues outside the city.

🥇 GOLD PACKAGE — ₱95,000 (Promo Code: #100A)
"Classic Wedding" — Complete Wedding Essentials (Most Popular)
An all-in-one classic wedding package with more inclusions and freebies.
Catering Setup:
- 3 menu choices with rice, soft drinks, and fruit salad
- Complete catering setup (tables, chairs with covers, utensils)
- Buffet corner with chafing dishes
Venue Styling & Décor:
- Backdrop styling based on your motif
- Artificial flowers, couch, grass mat
- Entrance arch, basic table centerpieces, and droplights
- (No ceiling design included)
Choose 1 Major Freebie:
A) 2-tier soft-icing wedding cake with wine
B) Basic sound system & lights with emcee at reception
C) HMUA for bride and groom
Additional Freebies for All:
- Reception program flow
- Buffet servers
- Fresh round bridal bouquet
- 30 pcs basic invitations
- 30 pcs giveaways (keyholder bottle opener)
- Basic wedding day photo coverage (no prints, saved in Google Drive)
Note: No coordination included in church & venue. Transportation fee may apply outside city limits.

💎 PLATINUM PACKAGE — ₱199,000 (Promo Code: #100D)
"All-in GOLD Wedding" — Luxury All-in Experience
A premium package for a grand, stress-free wedding.
Catering & Setup:
- 3 main courses, rice, cold soft drinks, dessert
- Elegant table setup with utensils, tables, chairs, and centerpieces
- FREE 1 whole small lechon (approx. 18kg)
Luxury Décor & Styling:
- Church & venue styling: backdrop, ceiling works, chandelier, red carpet, flower stands, entrance arch
- Artificial elegant flowers with accents of fresh flowers
- Royal centerpieces and entrance tunnel
For Church Weddings:
- Basic church décor (10 fresh flower stands, 2 altar flower arrangements)
- Free offertory items: fruits, candles, and wine
Photography & Media:
- Free wedding day photography + prenup photo session (saved on USB)
Reception & Entertainment:
- Couple's couch at reception
- Basic sound system
- Lively host with program flow
- 3-tier wedding cake with wine in an elegant setup corner
- Fruit buffet corner & pica-pica corner
- High-end stage lighting effects
HMUA Services:
- Bride & groom (prenup + wedding)
- 3 bridesmaids, 1 maid of honor, 2 mothers, 3 flower girls
VIP Extras:
- FREE reception venue with hotel room for couple (8 AM – 5 PM prep)
- FREE 50 invitations and 50 giveaways
- FREE bridal car with fresh flower bouquet (if church wedding)
- FREE prenup transportation within Negros Oriental (half day)
- On-the-day assistance and coordination
Choose 1 Premium Freebie:
A) LED Wall + SDE video at reception (final on wedding day)
B) Wedding attire rental package (2nd user, basic set) + fresh bouquets & corsages

=== SERVICES OFFERED ===
1. Event Coordination — Timeline management, vendor coordination, day-of assistance
2. Styling & Decor Design — Theme development, floral arrangements, venue transformation
3. Premium Catering — Custom menus, buffet & plated options, professional staff
4. Photography & Videography — Full-day coverage, highlight reels, drone photography, same-day edit
5. Audio Visual / Sounds & Lights — Sound systems, stage lighting, DJ services
6. Cakes & Appetizers — Custom cake design, dessert tables, finger foods
7. Invitations & Giveaways — Custom designs, digital invites, wedding favors
8. HMUA & Hosting — Bridal makeup, hairstyling, professional hosts
9. Attire & Florals — Bridal gowns, groom suits, bridal bouquets
10. Luxury Bridal Car — Luxury vehicles, professional drivers, decorated cars
11. Ceiling Installations — Fabric draping, chandelier rentals, lighting integration
12. LED Display Solutions — Large format displays, live streaming, custom content
13. Grand Entrance Designs — Custom entrance tunnels, lighting effects, floral accents
14. Illuminated Glass Dance Floors — LED lighting, custom patterns, multiple sizes

=== FEATURED VENUES ===
1. Grand Ballroom Heritage — Downtown District, 300 guests capacity, Rating: 4.9/5, Luxury Venue
2. Garden Terrace Resort — Countryside, 150 guests capacity, Rating: 4.8/5, Outdoor Venue
3. Modern Conference Hub — Business District, 500 guests capacity, Rating: 4.7/5, Corporate Venue

=== RULES ===
- IMPORTANT DATE RULE: If a user asks to book or inquire about a date that is BEFORE today (${today}), you MUST politely decline and explain that the date has already passed. Only allow bookings for dates on or after today.
- Be friendly, professional, and concise.
- When users ask about prices, give exact amounts from the packages above.
- When comparing packages, highlight key differences.
- If the user has a complex issue (payment disputes, custom requests, complaints, urgent changes), suggest they click the "Talk to Admin" button to escalate.
- Keep responses under 150 words unless the user asks for detailed information.
- All prices are in Philippine Pesos (₱).`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...(conversationHistory || []).map((msg: any) => ({
        role: msg.sender_type === 'user' ? 'user' : 'assistant',
        content: msg.message,
      })),
      { role: 'user', content: message },
    ];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Groq API error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limited. Please try again shortly.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error(`Groq API error [${response.status}]: ${errorText}`);
    }

    const data = await response.json();
    const aiMessage = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';

    return new Response(JSON.stringify({ message: aiMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Chat AI error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
