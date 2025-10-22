import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, MessageCircle, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  user_id: string;
  sender_type: 'user' | 'admin';
  message: string;
  created_at: string;
  read: boolean;
}

interface UserChat {
  user_id: string;
  full_name: string;
  email: string;
  unread_count: number;
  last_message: string;
  last_message_time: string;
}

export const AdminChat = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [userChats, setUserChats] = useState<UserChat[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth - 620, y: window.innerHeight - 530 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      if (isOpen) {
        loadUserChats();
        subscribeToMessages();
      } else {
        loadUserChats();
      }
    }
  }, [user, isOpen]);

  useEffect(() => {
    if (selectedUserId && isOpen) {
      loadMessages(selectedUserId);
    }
  }, [selectedUserId, isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('AdminChat: Mouse down detected', { x: e.clientX, y: e.clientY });
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
        console.log('AdminChat: Dragging to', { x: e.clientX, y: e.clientY });
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };

    const handleMouseUp = () => {
      console.log('AdminChat: Mouse up detected');
      setIsDragging(false);
    };

    if (isDragging) {
      console.log('AdminChat: Adding drag listeners');
      document.addEventListener('mousemove', handleMouseMove, { passive: false });
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const loadUserChats = async () => {
    // Get all unique user IDs from messages
    const { data: messagesData, error: messagesError } = await supabase
      .from('messages')
      .select('user_id, message, created_at, sender_type, read')
      .order('created_at', { ascending: false });

    if (messagesError) {
      console.error('Error loading user chats:', messagesError);
      return;
    }

    // Group by user_id and get profiles
    const userIds = [...new Set(messagesData.map(m => m.user_id))];
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('user_id, full_name, email')
      .in('user_id', userIds);

    if (profilesError) {
      console.error('Error loading profiles:', profilesError);
      return;
    }

    // Create user chat list with unread counts
    const chats: UserChat[] = profiles.map(profile => {
      const userMessages = messagesData.filter(m => m.user_id === profile.user_id);
      const unreadCount = userMessages.filter(m => m.sender_type === 'user' && !m.read).length;
      const lastMsg = userMessages[0];

      return {
        user_id: profile.user_id,
        full_name: profile.full_name || 'Unknown User',
        email: profile.email || '',
        unread_count: unreadCount,
        last_message: lastMsg?.message || '',
        last_message_time: lastMsg?.created_at || '',
      };
    });

    setUserChats(chats.sort((a, b) => b.unread_count - a.unread_count));
  };

  const loadMessages = async (userId: string) => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error loading messages:', error);
      return;
    }

    setMessages((data || []) as Message[]);
    markMessagesAsRead(userId);
  };

  const markMessagesAsRead = async (userId: string) => {
    await supabase
      .from('messages')
      .update({ read: true })
      .eq('user_id', userId)
      .eq('sender_type', 'user')
      .eq('read', false);

    loadUserChats();
  };

  const subscribeToMessages = () => {
    const channel = supabase
      .channel('admin-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
        },
        (payload) => {
          const newMsg = payload.new as Message;
          if (selectedUserId === newMsg.user_id) {
            setMessages(prev => [...prev, newMsg]);
          }
          if (newMsg.sender_type === 'user') {
            loadUserChats();
            toast({
              title: "New message",
              description: "You have a new message from a user",
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !user || !selectedUserId) return;

    setLoading(true);
    const { error } = await supabase
      .from('messages')
      .insert({
        user_id: selectedUserId,
        sender_id: user.id,
        sender_type: 'admin',
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

  if (!isOpen) {
    const totalUnread = userChats.reduce((sum, chat) => sum + chat.unread_count, 0);
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
        {totalUnread > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
            {totalUnread}
          </Badge>
        )}
      </Button>
    );
  }

  return (
    <>
      {/* Modal backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm"
        style={{ zIndex: 9998 }}
        onClick={() => setIsOpen(false)}
      />
      
      {/* Draggable chat card */}
      <Card 
        className="w-[600px] h-[500px] shadow-2xl flex"
        style={{
          position: 'fixed',
          left: `${position.x}px`,
          top: `${position.y}px`,
          cursor: isDragging ? 'grabbing' : 'default',
          zIndex: 9999
        }}
      >
      <div className="w-1/3 border-r">
        <CardHeader 
          className="pb-3 cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          style={{ 
            touchAction: 'none',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none'
          }}
        >
          <CardTitle className="text-sm select-none pointer-events-none" style={{ userSelect: 'none' }}>User Chats</CardTitle>
        </CardHeader>
        <ScrollArea className="h-[calc(500px-60px)]">
          <div className="space-y-1 p-2">
            {userChats.map((chat) => (
              <button
                key={chat.user_id}
                onClick={() => setSelectedUserId(chat.user_id)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedUserId === chat.user_id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-sm truncate">
                    {chat.full_name}
                  </p>
                  {chat.unread_count > 0 && (
                    <Badge variant="destructive" className="h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {chat.unread_count}
                    </Badge>
                  )}
                </div>
                <p className="text-xs opacity-70 truncate">
                  {chat.last_message}
                </p>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="flex-1 flex flex-col">
        <CardHeader 
          className="flex flex-row items-center justify-between space-y-0 pb-4 cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          style={{ 
            touchAction: 'none',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none'
          }}
        >
          <CardTitle className="text-lg select-none pointer-events-none" style={{ userSelect: 'none' }}>
            {selectedUserId 
              ? userChats.find(c => c.user_id === selectedUserId)?.full_name || 'Chat'
              : 'Select a user'}
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            onMouseDown={(e) => e.stopPropagation()}
            className="pointer-events-auto"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        {selectedUserId ? (
          <CardContent className="flex-1 flex flex-col p-4 pt-0 space-y-4">
            <ScrollArea className="flex-1 pr-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender_type === 'admin' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        msg.sender_type === 'admin'
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
                ))}
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
              <Button
                onClick={sendMessage}
                disabled={loading || !newMessage.trim()}
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        ) : (
          <CardContent className="flex-1 flex items-center justify-center text-muted-foreground">
            Select a user to start chatting
          </CardContent>
        )}
      </div>
    </Card>
    </>
  );
};
