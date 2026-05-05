import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Send, MessageCircle, X, UserRound, MoreVertical, Trash2, Sparkles, Bot, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Message {
  id: string;
  sender_type: 'user' | 'admin';
  message: string;
  created_at: string;
  read: boolean;
}

export const UserChat = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
<<<<<<< HEAD
  const [activeTab, setActiveTab] = useState<"admin" | "ai">("ai");
  const [aiMessages, setAiMessages] = useState<{ id: string; role: "user" | "ai"; message: string }[]>([
    { id: "welcome", role: "ai", message: "Hi! I'm Jojeans AI Assistant ✨ Pick a suggestion below or ask me anything!" },
  ]);
  const [aiInput, setAiInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
=======
  // Track whether aiHistory has been seeded from DB already
  const aiHistorySeeded = useRef(false);
>>>>>>> 044db0f9679515332bc7901f8254c423309f085a
  const scrollRef = useRef<HTMLDivElement>(null);
  const aiScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (user) {
      if (isOpen) {
        loadMessages();
        const cleanup = subscribeToMessages();
        return cleanup;
      } else if (!isOpen) {
        loadUnreadCount();
      }
    }
  }, [user, isOpen]);

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
<<<<<<< HEAD
  }, [messages]);
=======
  }, [messages, aiHistory]);

  // ✅ REMOVED: the useEffect that was syncing aiHistory from messages on every change.
  // That was the root cause — it overwrote the live AI conversation every time
  // messages state updated (e.g. when switching tabs and calling loadMessages again).
>>>>>>> 044db0f9679515332bc7901f8254c423309f085a

  const loadMessages = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error loading messages:', error);
      return;
    }

    const allMessages = (data || []) as Message[];
    setMessages(allMessages);
<<<<<<< HEAD
    
=======

    // ✅ FIX: Only seed aiHistory from DB on the very first load.
    // After that, aiHistory is managed purely in memory so switching tabs
    // (AI → Admin → AI) never wipes out the ongoing AI conversation.
    if (!aiHistorySeeded.current) {
      const aiMessages = allMessages
        .filter(msg => msg.sender_type === 'user' || msg.sender_type === 'ai')
        .map(msg => ({
          sender_type: msg.sender_type,
          message: msg.message,
        }));
      setAiHistory(aiMessages);
      aiHistorySeeded.current = true;
    }

>>>>>>> 044db0f9679515332bc7901f8254c423309f085a
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

<<<<<<< HEAD
  const sendMessage = async () => {
=======
  const sendAiMessage = async () => {
    if (!newMessage.trim() || !user) return;

    const userMsg = { sender_type: 'user' as const, message: newMessage.trim() };
    const updatedHistory = [...aiHistory, userMsg];
    setAiHistory(updatedHistory);
    setNewMessage("");
    setLoading(true);

    // Save user message to database
    const { error: userMsgError } = await supabase
      .from('messages')
      .insert({
        user_id: user.id,
        sender_id: user.id,
        sender_type: 'user',
        message: userMsg.message,
      });

    if (userMsgError) {
      console.error('Error saving user message:', userMsgError);
    }

    try {
      const { data, error } = await supabase.functions.invoke('chat-ai', {
        body: {
          message: userMsg.message,
          conversationHistory: updatedHistory.slice(-10),
        },
      });

      if (error) throw error;

      const aiMsg = { sender_type: 'ai' as const, message: data.message };
      // ✅ Always append to existing aiHistory — never replace it
      setAiHistory(prev => [...prev, aiMsg]);

      // Save AI message to database
      const { error: aiMsgError } = await supabase
        .from('messages')
        .insert({
          user_id: user.id,
          sender_id: null,
          sender_type: 'ai',
          message: data.message,
        });

      if (aiMsgError) {
        console.error('Error saving AI message:', aiMsgError);
      }
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
  };

  const sendAdminMessage = async () => {
>>>>>>> 044db0f9679515332bc7901f8254c423309f085a
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

<<<<<<< HEAD
=======
  const handleSend = () => {
    if (chatMode === 'ai') {
      sendAiMessage();
    } else {
      sendAdminMessage();
    }
  };

  const switchToAdmin = async () => {
    setChatMode('admin');
    // loadMessages is triggered by the useEffect on chatMode change.
    // aiHistory is now protected by the aiHistorySeeded ref so it won't be overwritten.
  };

>>>>>>> 044db0f9679515332bc7901f8254c423309f085a
  const deleteConversation = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;

      setMessages([]);
<<<<<<< HEAD
=======
      setAiHistory([]);
      // ✅ Reset the seed flag so fresh history can be loaded next time
      aiHistorySeeded.current = false;
>>>>>>> 044db0f9679515332bc7901f8254c423309f085a
      setShowDeleteConfirm(false);

      toast({
        title: "Success",
        description: "Conversation deleted successfully",
      });
    } catch (err) {
      console.error('Error deleting conversation:', err);
      toast({
        title: "Error",
        description: "Failed to delete conversation",
        variant: "destructive",
      });
    }
  };

  const sendAIMessage = async (text?: string) => {
    const messageText = (text ?? aiInput).trim();
    if (!messageText || aiLoading) return;
    const userMsg = { id: `u-${Date.now()}`, role: "user" as const, message: messageText };
    setAiMessages((prev) => [...prev, userMsg]);
    setAiInput("");
    setAiLoading(true);
    try {
      const history = aiMessages
        .filter((m) => m.id !== "welcome")
        .map((m) => ({ sender_type: m.role === "ai" ? "admin" : "user", message: m.message }));
      const { data, error } = await supabase.functions.invoke("chat-ai", {
        body: { message: messageText, conversationHistory: history },
      });
      if (error) throw error;
      const reply = (data as any)?.message || "Sorry, I couldn't generate a response.";
      setAiMessages((prev) => [...prev, { id: `a-${Date.now()}`, role: "ai", message: reply }]);
    } catch (err: any) {
      console.error("AI error:", err);
      toast({ title: "Error", description: err?.message || "Failed to reach AI assistant", variant: "destructive" });
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    if (aiScrollRef.current) {
      const viewport = aiScrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport) viewport.scrollTop = viewport.scrollHeight;
    }
  }, [aiMessages, aiLoading]);

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

<<<<<<< HEAD
  const renderMessages = () => {
=======
  const handleGreetingClick = (action: string) => {
    const greetingMessages: { [key: string]: string } = {
      inquire: "I want to inquire",
      report: "Report an issue"
    };

    if (greetingMessages[action] && user) {
      setNewMessage(greetingMessages[action]);
      setTimeout(async () => {
        const userMsg = { sender_type: 'user' as const, message: greetingMessages[action] };
        const updatedHistory = [...aiHistory, userMsg];
        setAiHistory(updatedHistory);
        setNewMessage("");

        // Save user message to database
        const { error: userMsgError } = await supabase
          .from('messages')
          .insert({
            user_id: user.id,
            sender_id: user.id,
            sender_type: 'user',
            message: userMsg.message,
          });

        if (userMsgError) {
          console.error('Error saving user message:', userMsgError);
        }

        setLoading(true);
        try {
          const { data, error } = await supabase.functions.invoke('chat-ai', {
            body: {
              message: greetingMessages[action],
              conversationHistory: updatedHistory.slice(-10),
            },
          });
          if (error) throw error;

          const aiMsg = { sender_type: 'ai' as const, message: data.message };
          setAiHistory(prev => [...prev, aiMsg]);

          // Save AI message to database
          const { error: aiMsgError } = await supabase
            .from('messages')
            .insert({
              user_id: user.id,
              sender_id: null,
              sender_type: 'ai',
              message: data.message,
            });

          if (aiMsgError) {
            console.error('Error saving AI message:', aiMsgError);
          }
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

>>>>>>> 044db0f9679515332bc7901f8254c423309f085a
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
            {activeTab === "ai" ? <Sparkles className="h-5 w-5 text-primary" /> : <UserRound className="h-5 w-5" />}
            {activeTab === "ai" ? "AI Assistant" : "Chat with Admin"}
          </CardTitle>
          <div className="flex items-center gap-1">
<<<<<<< HEAD
            {activeTab === "admin" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" side="top" sideOffset={8} className="z-[10000]">
                  <DropdownMenuItem
                    className="text-destructive cursor-pointer"
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Conversation
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
=======
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" side="top" sideOffset={8} className="z-[10000]">
                <DropdownMenuItem
                  className="text-destructive cursor-pointer"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Conversation
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
>>>>>>> 044db0f9679515332bc7901f8254c423309f085a
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "admin" | "ai")} className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="mx-4 grid grid-cols-2">
            <TabsTrigger value="ai" className="gap-1.5">
              <Sparkles className="h-3.5 w-3.5" /> AI Assistant
            </TabsTrigger>
            <TabsTrigger value="admin" className="gap-1.5">
              <UserRound className="h-3.5 w-3.5" /> Admin
              {unreadCount > 0 && (
                <Badge className="h-4 min-w-4 px-1 text-[10px]">{unreadCount}</Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="admin" className="flex-1 flex flex-col p-4 pt-2 space-y-4 overflow-hidden mt-0 min-h-0 data-[state=inactive]:hidden">
            <ScrollArea className="flex-1 min-h-0 pr-4 [&_[data-radix-scroll-area-viewport]]:max-h-full" ref={scrollRef}>
              <div className="space-y-4 pb-4">
                {renderMessages()}
              </div>
            </ScrollArea>
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
                disabled={loading}
              />
              <Button onClick={sendMessage} disabled={loading || !newMessage.trim()} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="ai" className="flex-1 flex flex-col p-4 pt-2 space-y-3 overflow-hidden mt-0 min-h-0 data-[state=inactive]:hidden">
            <ScrollArea className="flex-1 min-h-0 pr-4 [&_[data-radix-scroll-area-viewport]]:max-h-full" ref={aiScrollRef}>
              <div className="space-y-3 pb-2">
                {aiMessages.map((m) => (
                  <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    {m.role === "ai" && (
                      <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-1 shrink-0">
                        <Sparkles className="h-3.5 w-3.5 text-primary" />
                      </div>
                    )}
                    <div className={`max-w-[78%] rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap ${
                      m.role === "user" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-muted rounded-bl-sm"
                    }`}>
                      {m.message}
                    </div>
                  </div>
                ))}
                {aiLoading && (
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
                {aiMessages.length <= 1 && !aiLoading && (
                  <div className="pt-1">
                    <p className="text-xs text-muted-foreground mb-2">💡 Try asking:</p>
                    <div className="flex flex-wrap gap-2">
                      {["I want to book an event 🎉","Tell me about your packages 💍","What venues do you offer? 🏛️","Compare Silver vs Gold 🥇","What services are included? ✨"].map((s) => (
                        <button
                          key={s}
                          onClick={() => sendAIMessage(s)}
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
            <div className="flex gap-2">
              <Input
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendAIMessage()}
                placeholder="Ask me anything..."
                disabled={aiLoading}
                className="rounded-full"
              />
              <Button onClick={() => sendAIMessage()} disabled={aiLoading || !aiInput.trim()} size="icon" className="rounded-full">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent className="top-1/4 translate-y-0 max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Conversation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete your entire conversation history? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={deleteConversation}
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};