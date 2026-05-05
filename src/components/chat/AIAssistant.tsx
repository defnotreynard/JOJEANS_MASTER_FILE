import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Sparkles, X, Bot, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AIMessage {
  id: string;
  sender_type: "user" | "ai";
  message: string;
  created_at: string;
}

const SUGGESTIONS = [
  "I want to book an event 🎉",
  "Tell me about your packages 💍",
  "What venues do you offer? 🏛️",
  "Compare Silver vs Gold 🥇",
  "What services are included? ✨",
  "How do I get started? 🚀",
];

const WELCOME =
  "Hi! I'm Jojeans AI Assistant ✨ I can help you explore packages, venues, services, and bookings. Pick a suggestion below or ask me anything!";

export const AIAssistant = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          sender_type: "ai",
          message: WELCOME,
          created_at: new Date().toISOString(),
        },
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      const viewport = scrollRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (viewport) viewport.scrollTop = viewport.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async (text?: string) => {
    const messageText = (text ?? input).trim();
    if (!messageText || loading) return;

    const userMsg: AIMessage = {
      id: `u-${Date.now()}`,
      sender_type: "user",
      message: messageText,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const history = [...messages, userMsg]
        .filter((m) => m.id !== "welcome")
        .map((m) => ({ sender_type: m.sender_type === "ai" ? "admin" : "user", message: m.message }));

      const { data, error } = await supabase.functions.invoke("chat-ai", {
        body: { message: messageText, conversationHistory: history.slice(0, -1) },
      });

      if (error) throw error;
      const reply = (data as any)?.message || "Sorry, I couldn't generate a response.";

      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          sender_type: "ai",
          message: reply,
          created_at: new Date().toISOString(),
        },
      ]);
    } catch (err: any) {
      console.error("AI Assistant error:", err);
      toast({
        title: "Error",
        description: err?.message || "Failed to reach AI assistant",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-br from-primary to-primary/70 hover:scale-105 transition-transform"
        size="icon"
        style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 9997 }}
        aria-label="Open AI Assistant"
      >
        <Sparkles className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm"
        style={{ zIndex: 9996 }}
        onClick={() => setIsOpen(false)}
      />
      <Card
        className="shadow-2xl flex flex-col overflow-hidden border-2"
        style={{
          position: "fixed",
          width: isMobile ? "95vw" : "400px",
          height: isMobile ? "85vh" : "560px",
          maxHeight: "640px",
          left: isMobile ? "50%" : "auto",
          right: isMobile ? "auto" : "24px",
          bottom: isMobile ? "auto" : "24px",
          top: isMobile ? "50%" : "auto",
          transform: isMobile ? "translate(-50%, -50%)" : "none",
          zIndex: 9997,
        }}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 bg-gradient-to-r from-primary to-primary/70 text-primary-foreground">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-background/20 flex items-center justify-center">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold leading-tight">AI Assistant</div>
              <div className="text-xs opacity-80 font-normal">Always here to help</div>
            </div>
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="hover:bg-background/20 text-primary-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
          <ScrollArea className="flex-1 px-4 py-3" ref={scrollRef}>
            <div className="space-y-3 pb-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender_type === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender_type === "ai" && (
                    <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-1 shrink-0">
                      <Sparkles className="h-3.5 w-3.5 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap ${
                      msg.sender_type === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-muted rounded-bl-sm"
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-1">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-2 flex items-center gap-2">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span className="text-xs text-muted-foreground">Thinking...</span>
                  </div>
                </div>
              )}

              {messages.length <= 1 && !loading && (
                <div className="pt-2">
                  <p className="text-xs text-muted-foreground mb-2 px-1">💡 Try asking:</p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => sendMessage(s)}
                        className="text-xs px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors text-foreground"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-3 border-t bg-background/50">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask me anything..."
                disabled={loading}
                className="rounded-full"
              />
              <Button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                size="icon"
                className="rounded-full shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default AIAssistant;
