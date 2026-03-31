import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, MessageCircle, X, Bot, UserRound, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  sender_type: 'user' | 'admin' | 'ai';
  message: string;
  created_at: string;
  read: boolean;
}

type ChatMode = 'ai' | 'admin';

export const UserChat = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [chatMode, setChatMode] = useState<ChatMode>('ai');
  const [aiHistory, setAiHistory] = useState<{ sender_type: string; message: string }[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (user) {
      if (isOpen && chatMode === 'admin') {
        loadMessages();
        const cleanup = subscribeToMessages();
        return cleanup;
      } else if (!isOpen) {
        loadUnreadCount();
      }
    }
  }, [user, isOpen, chatMode]);

  const loadUnreadCount = async () => {
    const { count, error } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user?.id)
      .eq('sender_type', 'admin')
      .eq('read', false);

    if (!error && count !== null) {
      setUnreadCount(count);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      const viewport = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages, aiHistory]);

  const loadMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error loading messages:', error);
      return;
    }

    setMessages((data || []) as Message[]);
    markMessagesAsRead();
  };

  const markMessagesAsRead = async () => {
    await supabase
      .from('messages')
      .update({ read: true })
      .eq('user_id', user?.id)
      .eq('sender_type', 'admin')
      .eq('read', false);
    
    setUnreadCount(0);
  };

  const subscribeToMessages = () => {
    const channel = supabase
      .channel('user-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `user_id=eq.${user?.id}`
        },
        (payload) => {
          setMessages(prev => [...prev, payload.new as Message]);
          if ((payload.new as Message).sender_type === 'admin') {
            toast({
              title: "New message from admin",
              description: (payload.new as Message).message,
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const sendAiMessage = async () => {
    if (!newMessage.trim()) return;

    const userMsg = { sender_type: 'user', message: newMessage.trim() };
    const updatedHistory = [...aiHistory, userMsg];
    setAiHistory(updatedHistory);
    setNewMessage("");
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat-ai', {
        body: {
          message: userMsg.message,
          conversationHistory: updatedHistory.slice(-10), // Last 10 messages for context
        },
      });

      if (error) throw error;

      const aiMsg = { sender_type: 'ai', message: data.message };
      setAiHistory(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error('AI chat error:', err);
      const errorMsg = { sender_type: 'ai', message: 'Sorry, I encountered an error. Please try again or talk to an admin.' };
      setAiHistory(prev => [...prev, errorMsg]);
      toast({
        title: "Error",
        description: "Failed to get AI response",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const sendAdminMessage = async () => {
    if (!newMessage.trim() || !user) return;

    setLoading(true);
    const { error } = await supabase
      .from('messages')
      .insert({
        user_id: user.id,
        sender_id: user.id,
        sender_type: 'user',
        message: newMessage.trim(),
      });

    if (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    } else {
      setNewMessage("");
    }
    setLoading(false);
  };

  const handleSend = () => {
    if (chatMode === 'ai') {
      sendAiMessage();
    } else {
      sendAdminMessage();
    }
  };

  const switchToAdmin = () => {
    setChatMode('admin');
    loadMessages();
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="h-14 w-14 rounded-full shadow-lg"
        size="icon"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9998
        }}
      >
        <MessageCircle className="h-6 w-6" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
            {unreadCount}
          </Badge>
        )}
      </Button>
    );
  }

  const handleGreetingClick = (action: string) => {
    const messages: { [key: string]: string } = {
      inquire: "I want to inquire",
      report: "Report an issue"
    };
    
    if (messages[action]) {
      setNewMessage(messages[action]);
      // Auto-send after a brief delay
      setTimeout(() => {
        const userMsg = { sender_type: 'user' as const, message: messages[action] };
        const updatedHistory = [...aiHistory, userMsg];
        setAiHistory(updatedHistory);
        setNewMessage("");
        
        (async () => {
          setLoading(true);
          try {
            const { data, error } = await supabase.functions.invoke('chat-ai', {
              body: {
                message: messages[action],
                conversationHistory: updatedHistory.slice(-10),
              },
            });
            if (error) throw error;
            const aiMsg = { sender_type: 'ai' as const, message: data.message };
            setAiHistory(prev => [...prev, aiMsg]);
          } catch (err) {
            console.error('AI chat error:', err);
            const errorMsg = { sender_type: 'ai' as const, message: 'Sorry, I encountered an error. Please try again or talk to an admin.' };
            setAiHistory(prev => [...prev, errorMsg]);
            toast({
              title: "Error",
              description: "Failed to get AI response",
              variant: "destructive",
            });
          }
          setLoading(false);
        })();
      }, 100);
    }
  };

  const renderMessages = () => {
    if (chatMode === 'ai') {
      if (aiHistory.length === 0) {
        return (
          <div className="flex flex-col items-center justify-center h-full text-center p-4 space-y-4">
            <Bot className="h-10 w-10 text-muted-foreground" />
            <div className="space-y-3 w-full">
              <div className="bg-muted rounded-lg px-4 py-3">
                <p className="text-sm font-medium">Hi there! How can I help you?</p>
              </div>
              <p className="text-xs text-muted-foreground">We are here to help you</p>
              <div className="flex gap-2 justify-center pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => handleGreetingClick('inquire')}
                >
                  I want to inquire
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => handleGreetingClick('report')}
                >
                  Report an issue
                </Button>
              </div>
            </div>
          </div>
        );
      }
      return aiHistory.map((msg, idx) => (
        <div
          key={`ai-${idx}`}
          className={`flex ${msg.sender_type === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[80%] rounded-lg px-4 py-2 ${
              msg.sender_type === 'user'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted'
            }`}
          >
            {msg.sender_type === 'ai' && (
              <div className="flex items-center gap-1 mb-1">
                <Bot className="h-3 w-3" />
                <span className="text-xs font-medium">AI Assistant</span>
              </div>
            )}
            <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
          </div>
        </div>
      ));
    }

    return messages.map((msg) => (
      <div
        key={msg.id}
        className={`flex ${msg.sender_type === 'user' ? 'justify-end' : 'justify-start'}`}
      >
        <div
          className={`max-w-[80%] rounded-lg px-4 py-2 ${
            msg.sender_type === 'user'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted'
          }`}
        >
          <p className="text-sm">{msg.message}</p>
          <p className="text-xs opacity-70 mt-1">
            {new Date(msg.created_at).toLocaleTimeString()}
          </p>
        </div>
      </div>
    ));
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm"
        style={{ zIndex: 9998 }}
        onClick={() => setIsOpen(false)}
      />
      
      <Card 
        className="shadow-2xl flex flex-col"
        style={{
          position: 'fixed',
          width: isMobile ? '95vw' : '384px',
          height: isMobile ? '80vh' : '500px',
          maxHeight: '600px',
          left: isMobile ? '50%' : 'auto',
          right: isMobile ? 'auto' : '24px',
          bottom: isMobile ? 'auto' : '24px',
          top: isMobile ? '50%' : 'auto',
          transform: isMobile ? 'translate(-50%, -50%)' : 'none',
          zIndex: 9999
        }}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            {chatMode === 'ai' ? (
              <>
                <Bot className="h-5 w-5" />
                AI Assistant
              </>
            ) : (
              <>
                <UserRound className="h-5 w-5" />
                Chat with Admin
              </>
            )}
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        {/* Mode switcher */}
        <div className="flex gap-1 px-4 pb-2">
          <Button
            variant={chatMode === 'ai' ? 'default' : 'outline'}
            size="sm"
            className="flex-1 text-xs"
            onClick={() => setChatMode('ai')}
          >
            <Bot className="h-3 w-3 mr-1" />
            AI Assistant
          </Button>
          <Button
            variant={chatMode === 'admin' ? 'default' : 'outline'}
            size="sm"
            className="flex-1 text-xs"
            onClick={switchToAdmin}
          >
            <UserRound className="h-3 w-3 mr-1" />
            Talk to Admin
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-1 h-4 w-4 flex items-center justify-center p-0 text-[10px]">
                {unreadCount}
              </Badge>
            )}
          </Button>
        </div>

        <CardContent className="flex-1 flex flex-col p-4 pt-0 space-y-4 overflow-hidden">
          <ScrollArea className="flex-1 pr-4 h-full" ref={scrollRef}>
            <div className="space-y-4 pb-4">
              {renderMessages()}
              {loading && chatMode === 'ai' && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg px-4 py-2 flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">Thinking...</span>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={chatMode === 'ai' ? "Ask the AI..." : "Type a message..."}
              disabled={loading}
            />
            <Button
              onClick={handleSend}
              disabled={loading || !newMessage.trim()}
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
