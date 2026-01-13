import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, MessageCircle, X, Trash2, Ban, MoreVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
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
  const [position, setPosition] = useState({ x: window.innerWidth - 420, y: window.innerHeight - 530 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showBlockDialog, setShowBlockDialog] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockedByAdmin, setBlockedByAdmin] = useState(false); // Admin blocked user
  const [blockedByUser, setBlockedByUser] = useState(false); // User blocked admin
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setPosition({ 
          x: window.innerWidth / 2 - (window.innerWidth * 0.95) / 2, 
          y: window.innerHeight - (window.innerHeight * 0.8) - 20 
        });
      } else {
        setPosition({ 
          x: window.innerWidth - 420, 
          y: window.innerHeight - 530 
        });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (user) {
      checkIfBlocked();
      if (isOpen) {
        loadMessages();
        const cleanup = subscribeToMessages();
        return cleanup;
      } else {
        loadUnreadCount();
      }
    }
  }, [user, isOpen]);

  const checkIfBlocked = async () => {
    if (!user) return;
    
    // Check if admin blocked this user
    const { data: adminBlock } = await supabase
      .from('blocked_chat_users')
      .select('id, blocker_type')
      .eq('user_id', user.id)
      .eq('blocker_type', 'admin')
      .maybeSingle();
    
    // Check if user blocked admin
    const { data: userBlock } = await supabase
      .from('blocked_chat_users')
      .select('id, blocker_type')
      .eq('blocked_by', user.id)
      .eq('blocker_type', 'user')
      .maybeSingle();
    
    setBlockedByAdmin(!!adminBlock);
    setBlockedByUser(!!userBlock);
    setIsBlocked(!!adminBlock || !!userBlock);
  };

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
  }, [messages]);

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

  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const positionRef = useRef(position);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    dragOffsetRef.current = {
      x: e.clientX - positionRef.current.x,
      y: e.clientY - positionRef.current.y
    };
  };

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  useEffect(() => {
    if (!isDragging) return;

    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      animationFrameId = requestAnimationFrame(() => {
        const newX = e.clientX - dragOffsetRef.current.x;
        const newY = e.clientY - dragOffsetRef.current.y;
        setPosition({ x: newX, y: newY });
      });
    };

    const handleMouseUp = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: false });
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const sendMessage = async () => {
    // Re-check block status before sending
    await checkIfBlocked();
    if (!newMessage.trim() || !user || isBlocked) {
      if (isBlocked) {
        toast({
          title: "Message blocked",
          description: "You have been blocked from sending messages",
          variant: "destructive",
        });
      }
      return;
    }

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

  const handleDeleteConversation = async () => {
    if (!user) return;

    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting conversation:', error);
      toast({
        title: "Error",
        description: "Failed to delete conversation",
        variant: "destructive",
      });
    } else {
      setMessages([]);
      toast({
        title: "Conversation deleted",
        description: "All messages have been removed",
      });
    }
    setShowDeleteDialog(false);
  };

  const handleBlockAdmin = async () => {
    if (!user) return;
    
    const { error } = await supabase
      .from('blocked_chat_users')
      .insert({ 
        user_id: user.id, // block self from receiving admin messages
        blocked_by: user.id,
        blocker_type: 'user'
      });
    
    if (error) {
      console.error('Error blocking admin:', error);
      toast({
        title: "Error",
        description: "Failed to block admin",
        variant: "destructive",
      });
    } else {
      setBlockedByUser(true);
      setIsBlocked(true);
      toast({
        title: "Chat blocked",
        description: "You will no longer receive messages from admin",
      });
    }
    setShowBlockDialog(false);
  };

  const handleUnblock = async () => {
    if (!user) return;
    
    // User can only unblock if they initiated the block
    if (!blockedByUser) {
      toast({
        title: "Cannot unblock",
        description: "Only the admin who blocked you can unblock this chat",
        variant: "destructive",
      });
      return;
    }
    
    const { error } = await supabase
      .from('blocked_chat_users')
      .delete()
      .eq('blocked_by', user.id)
      .eq('blocker_type', 'user');
    
    if (error) {
      console.error('Error unblocking:', error);
      toast({
        title: "Error",
        description: "Failed to unblock chat",
        variant: "destructive",
      });
    } else {
      setBlockedByUser(false);
      setIsBlocked(blockedByAdmin); // Still blocked if admin blocked
      toast({
        title: "Chat unblocked",
        description: "You can now receive messages from admin",
      });
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  // Group messages by date
  const groupedMessages = messages.reduce((groups, message) => {
    const date = formatDate(message.created_at);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {} as Record<string, Message[]>);

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="h-14 w-14 rounded-full shadow-xl bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 hover:scale-105"
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
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-destructive animate-pulse">
            {unreadCount}
          </Badge>
        )}
      </Button>
    );
  }

  return (
    <>
      {/* Modal backdrop */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm animate-in fade-in duration-200"
        style={{ zIndex: 9998 }}
        onClick={() => setIsOpen(false)}
      />
      
      {/* Draggable chat card */}
      <Card 
        className="w-[95vw] h-[80vh] max-h-[600px] md:w-[400px] md:h-[520px] shadow-2xl flex flex-col overflow-hidden border-0 bg-gradient-to-b from-background to-background/95 animate-in slide-in-from-bottom-4 duration-300"
        style={{
          position: 'fixed',
          left: isMobile ? '50%' : `${position.x}px`,
          top: isMobile ? '50%' : `${position.y}px`,
          transform: isMobile ? 'translate(-50%, -50%)' : 'none',
          cursor: isDragging ? 'grabbing' : 'default',
          zIndex: 9999
        }}
      >
        {/* Header */}
        <CardHeader 
          className={`flex flex-row items-center justify-between space-y-0 p-4 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground ${!isMobile ? 'cursor-grab active:cursor-grabbing' : ''}`}
          onMouseDown={handleMouseDown}
          style={{ 
            touchAction: isMobile ? 'auto' : 'none',
            userSelect: 'none',
          }}
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-primary-foreground/20">
              <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground font-semibold">
                A
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-base">Admin Support</h3>
              <p className="text-xs text-primary-foreground/70">
                {blockedByAdmin ? 'Blocked by Admin' : blockedByUser ? 'You blocked' : 'Online'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 z-[10000] bg-popover border shadow-lg">
                <DropdownMenuItem 
                  onClick={() => setShowDeleteDialog(true)}
                  className="text-destructive focus:text-destructive cursor-pointer"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Conversation
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {blockedByUser ? (
                  <DropdownMenuItem onClick={handleUnblock} className="cursor-pointer">
                    <Ban className="h-4 w-4 mr-2" />
                    Unblock Admin
                  </DropdownMenuItem>
                ) : blockedByAdmin ? (
                  <DropdownMenuItem disabled className="cursor-not-allowed opacity-50">
                    <Ban className="h-4 w-4 mr-2" />
                    Blocked by Admin
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem 
                    onClick={() => setShowBlockDialog(true)}
                    className="text-destructive focus:text-destructive cursor-pointer"
                  >
                    <Ban className="h-4 w-4 mr-2" />
                    Block Admin
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              onMouseDown={(e) => e.stopPropagation()}
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        {/* Messages Area */}
        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
          <ScrollArea className="flex-1 px-4" ref={scrollRef}>
            <div className="py-4 space-y-4">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <MessageCircle className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-sm">No messages yet</p>
                  <p className="text-muted-foreground/70 text-xs mt-1">Start the conversation!</p>
                </div>
              ) : (
                Object.entries(groupedMessages).map(([date, msgs]) => (
                  <div key={date}>
                    {/* Date separator */}
                    <div className="flex items-center justify-center my-4">
                      <span className="px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">
                        {date}
                      </span>
                    </div>
                    {/* Messages for this date */}
                    <div className="space-y-3">
                      {msgs.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.sender_type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`flex items-end gap-2 max-w-[85%] ${msg.sender_type === 'user' ? 'flex-row-reverse' : ''}`}>
                            {msg.sender_type === 'admin' && (
                              <Avatar className="h-7 w-7 flex-shrink-0">
                                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                  A
                                </AvatarFallback>
                              </Avatar>
                            )}
                            <div
                              className={`rounded-2xl px-4 py-2.5 shadow-sm ${
                                msg.sender_type === 'user'
                                  ? 'bg-primary text-primary-foreground rounded-br-md'
                                  : 'bg-muted rounded-bl-md'
                              }`}
                            >
                              <p className="text-sm leading-relaxed break-words">{msg.message}</p>
                              <p className={`text-[10px] mt-1 ${
                                msg.sender_type === 'user' 
                                  ? 'text-primary-foreground/60' 
                                  : 'text-muted-foreground'
                              }`}>
                                {formatTime(msg.created_at)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 border-t bg-background/80 backdrop-blur-sm">
            {blockedByAdmin ? (
              <div className="text-center py-2">
                <p className="text-sm text-muted-foreground">You have been blocked by admin</p>
                <p className="text-xs text-muted-foreground/70">Only admin can unblock this chat</p>
              </div>
            ) : blockedByUser ? (
              <div className="text-center py-2">
                <p className="text-sm text-muted-foreground">You blocked this chat</p>
                <Button variant="link" size="sm" onClick={handleUnblock} className="text-primary">
                  Unblock to continue
                </Button>
              </div>
            ) : (
              <div className="flex gap-2 items-center">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message..."
                  disabled={loading}
                  className="flex-1 rounded-full bg-muted border-0 px-4 focus-visible:ring-1 focus-visible:ring-primary"
                />
                <Button
                  onClick={sendMessage}
                  disabled={loading || !newMessage.trim()}
                  size="icon"
                  className="h-10 w-10 rounded-full bg-primary hover:bg-primary/90 transition-colors"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Conversation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete all messages? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConversation}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Block Confirmation Dialog */}
      <AlertDialog open={showBlockDialog} onOpenChange={setShowBlockDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Block Admin</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to block messages from admin? You won't receive any new messages until you unblock.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleBlockAdmin}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Block
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
