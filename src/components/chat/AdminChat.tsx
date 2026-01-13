import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, MessageCircle, X, MoreVertical, Trash2, Ban } from "lucide-react";
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
  isBlocked?: boolean;
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
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showBlockDialog, setShowBlockDialog] = useState(false);
  const [blockedUsers, setBlockedUsers] = useState<Set<string>>(new Set());
  const [userBlockedAdmin, setUserBlockedAdmin] = useState<Set<string>>(new Set()); // Users who blocked admin
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const positionRef = useRef(position);

  // Load blocked users from database on mount
  useEffect(() => {
    if (user) {
      loadBlockedUsers();
    }
  }, [user]);

  const loadBlockedUsers = async () => {
    // Load users blocked by admin
    const { data: adminBlocks } = await supabase
      .from('blocked_chat_users')
      .select('user_id')
      .eq('blocker_type', 'admin');
    
    if (adminBlocks) {
      setBlockedUsers(new Set(adminBlocks.map(b => b.user_id)));
    }
    
    // Load users who blocked admin
    const { data: userBlocks } = await supabase
      .from('blocked_chat_users')
      .select('blocked_by')
      .eq('blocker_type', 'user');
    
    if (userBlocks) {
      setUserBlockedAdmin(new Set(userBlocks.map(b => b.blocked_by)));
    }
  };
  useEffect(() => {
    if (user) {
      if (isOpen) {
        loadUserChats();
        const cleanup = subscribeToMessages();
        return cleanup;
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
    const scrollToBottom = () => {
      if (scrollRef.current) {
        const viewport = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (viewport) {
          viewport.scrollTop = viewport.scrollHeight;
        }
      }
    };
    
    setTimeout(scrollToBottom, 0);
  }, [messages]);

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    dragOffsetRef.current = {
      x: e.clientX - positionRef.current.x,
      y: e.clientY - positionRef.current.y
    };
  };

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

  const loadUserChats = async () => {
    const { data: messagesData, error: messagesError } = await supabase
      .from('messages')
      .select('user_id, message, created_at, sender_type, read')
      .order('created_at', { ascending: false });

    if (messagesError) {
      console.error('Error loading user chats:', messagesError);
      return;
    }

    const userIds = [...new Set(messagesData.map(m => m.user_id))];
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('user_id, full_name, email')
      .in('user_id', userIds);

    if (profilesError) {
      console.error('Error loading profiles:', profilesError);
      return;
    }

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
        isBlocked: blockedUsers.has(profile.user_id),
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
    if (blockedUsers.has(selectedUserId)) {
      toast({
        title: "User blocked",
        description: "Unblock user to send messages",
        variant: "destructive",
      });
      return;
    }

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

  const handleDeleteConversation = async () => {
    if (!selectedUserId) return;

    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('user_id', selectedUserId);

    if (error) {
      console.error('Error deleting conversation:', error);
      toast({
        title: "Error",
        description: "Failed to delete conversation",
        variant: "destructive",
      });
    } else {
      setMessages([]);
      setUserChats(prev => prev.filter(chat => chat.user_id !== selectedUserId));
      setSelectedUserId(null);
      toast({
        title: "Conversation deleted",
        description: "All messages have been removed",
      });
    }
    setShowDeleteDialog(false);
  };

  const handleBlockUser = async () => {
    if (!selectedUserId || !user) return;
    
    const { error } = await supabase
      .from('blocked_chat_users')
      .insert({ 
        user_id: selectedUserId, 
        blocked_by: user.id,
        blocker_type: 'admin'
      });
    
    if (error) {
      console.error('Error blocking user:', error);
      toast({
        title: "Error",
        description: "Failed to block user",
        variant: "destructive",
      });
    } else {
      setBlockedUsers(prev => new Set([...prev, selectedUserId]));
      toast({
        title: "User blocked",
        description: "This user can no longer send you messages",
      });
    }
    setShowBlockDialog(false);
  };

  const handleUnblockUser = async () => {
    if (!selectedUserId) return;
    
    // Admin can only unblock if they initiated the block
    if (!blockedUsers.has(selectedUserId)) {
      toast({
        title: "Cannot unblock",
        description: "Only the user can unblock themselves",
        variant: "destructive",
      });
      return;
    }
    
    const { error } = await supabase
      .from('blocked_chat_users')
      .delete()
      .eq('user_id', selectedUserId)
      .eq('blocker_type', 'admin');
    
    if (error) {
      console.error('Error unblocking user:', error);
      toast({
        title: "Error",
        description: "Failed to unblock user",
        variant: "destructive",
      });
    } else {
      setBlockedUsers(prev => {
        const newSet = new Set(prev);
        newSet.delete(selectedUserId);
        return newSet;
      });
      toast({
        title: "User unblocked",
        description: "This user can now send you messages",
      });
    }
  };

  const selectedUserBlocked = selectedUserId ? blockedUsers.has(selectedUserId) : false;
  const selectedUserBlockedAdmin = selectedUserId ? userBlockedAdmin.has(selectedUserId) : false;
  const selectedUserName = selectedUserId 
    ? userChats.find(c => c.user_id === selectedUserId)?.full_name || 'Chat'
    : 'Select a user';

  if (!isOpen) {
    const totalUnread = userChats.reduce((sum, chat) => sum + chat.unread_count, 0);
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
        {totalUnread > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-destructive animate-pulse">
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
        className="fixed inset-0 bg-black/30 backdrop-blur-sm animate-in fade-in duration-200"
        style={{ zIndex: 9998 }}
        onClick={() => setIsOpen(false)}
      />
      
      {/* Draggable chat card */}
      <Card 
        className="w-[600px] h-[500px] shadow-2xl flex overflow-hidden border-0 bg-gradient-to-b from-background to-background/95 animate-in slide-in-from-bottom-4 duration-300"
        style={{
          position: 'fixed',
          left: `${position.x}px`,
          top: `${position.y}px`,
          cursor: isDragging ? 'grabbing' : 'default',
          zIndex: 9999
        }}
      >
        {/* User list sidebar */}
        <div className="w-1/3 border-r border-border/50 bg-muted/30">
          <CardHeader 
            className="pb-3 cursor-grab active:cursor-grabbing bg-gradient-to-r from-primary to-primary/90 text-primary-foreground"
            onMouseDown={handleMouseDown}
            style={{ 
              touchAction: 'none',
              userSelect: 'none',
            }}
          >
            <CardTitle className="text-sm select-none pointer-events-none">User Chats</CardTitle>
          </CardHeader>
          <ScrollArea className="h-[calc(500px-60px)]">
            <div className="space-y-1 p-2">
              {userChats.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No conversations yet
                </div>
              ) : (
                userChats.map((chat) => (
                  <button
                    key={chat.user_id}
                    onClick={() => setSelectedUserId(chat.user_id)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      selectedUserId === chat.user_id
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className={`text-xs ${selectedUserId === chat.user_id ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-primary/10 text-primary'}`}>
                          {chat.full_name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <p className="font-medium text-sm truncate flex-1">
                        {chat.full_name}
                      </p>
                      {chat.unread_count > 0 && (
                        <Badge variant="destructive" className="h-5 w-5 flex items-center justify-center p-0 text-xs">
                          {chat.unread_count}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs opacity-70 truncate pl-8">
                      {chat.last_message}
                    </p>
                  </button>
                ))
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          <CardHeader 
            className="flex flex-row items-center justify-between space-y-0 p-4 cursor-grab active:cursor-grabbing bg-gradient-to-r from-primary to-primary/90 text-primary-foreground"
            onMouseDown={handleMouseDown}
            style={{ 
              touchAction: 'none',
              userSelect: 'none',
            }}
          >
            <div className="flex items-center gap-3">
              {selectedUserId && (
                <Avatar className="h-9 w-9 border-2 border-primary-foreground/20">
                  <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground font-semibold">
                    {selectedUserName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}
              <div>
                <CardTitle className="text-base select-none pointer-events-none">
                  {selectedUserName}
                </CardTitle>
                {selectedUserId && (
                  <p className="text-xs text-primary-foreground/70">
                    {selectedUserBlocked ? 'You blocked' : selectedUserBlockedAdmin ? 'User blocked you' : 'Online'}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1">
              {selectedUserId && (
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
                    {selectedUserBlocked ? (
                      <DropdownMenuItem onClick={handleUnblockUser} className="cursor-pointer">
                        <Ban className="h-4 w-4 mr-2" />
                        Unblock User
                      </DropdownMenuItem>
                    ) : selectedUserBlockedAdmin ? (
                      <DropdownMenuItem disabled className="cursor-not-allowed opacity-50">
                        <Ban className="h-4 w-4 mr-2" />
                        Blocked by User
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem 
                        onClick={() => setShowBlockDialog(true)}
                        className="text-destructive focus:text-destructive cursor-pointer"
                      >
                        <Ban className="h-4 w-4 mr-2" />
                        Block User
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
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

          {selectedUserId ? (
            <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
              <ScrollArea className="flex-1 px-4" ref={scrollRef}>
                <div className="py-4 space-y-3">
                  {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                        <MessageCircle className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground text-sm">No messages yet</p>
                      <p className="text-muted-foreground/70 text-xs mt-1">Start the conversation!</p>
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender_type === 'admin' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-end gap-2 max-w-[80%] ${msg.sender_type === 'admin' ? 'flex-row-reverse' : ''}`}>
                          {msg.sender_type === 'user' && (
                            <Avatar className="h-7 w-7 flex-shrink-0">
                              <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                                {selectedUserName.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={`rounded-2xl px-4 py-2.5 shadow-sm ${
                              msg.sender_type === 'admin'
                                ? 'bg-primary text-primary-foreground rounded-br-md'
                                : 'bg-muted rounded-bl-md'
                            }`}
                          >
                            <p className="text-sm leading-relaxed break-words">{msg.message}</p>
                            <p className={`text-[10px] mt-1 ${
                              msg.sender_type === 'admin' 
                                ? 'text-primary-foreground/60' 
                                : 'text-muted-foreground'
                            }`}>
                              {new Date(msg.created_at).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
              
              {/* Input Area */}
              <div className="p-4 border-t bg-background/80 backdrop-blur-sm">
                {selectedUserBlocked ? (
                  <div className="text-center py-2">
                    <p className="text-sm text-muted-foreground">You blocked this user</p>
                    <Button variant="link" size="sm" onClick={handleUnblockUser} className="text-primary">
                      Unblock to continue
                    </Button>
                  </div>
                ) : selectedUserBlockedAdmin ? (
                  <div className="text-center py-2">
                    <p className="text-sm text-muted-foreground">User blocked you</p>
                    <p className="text-xs text-muted-foreground/70">Only the user can unblock this chat</p>
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
          ) : (
            <CardContent className="flex-1 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Select a user to start chatting</p>
              </div>
            </CardContent>
          )}
        </div>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="z-[10001]">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Conversation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this conversation? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConversation} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Block Confirmation Dialog */}
      <AlertDialog open={showBlockDialog} onOpenChange={setShowBlockDialog}>
        <AlertDialogContent className="z-[10001]">
          <AlertDialogHeader>
            <AlertDialogTitle>Block User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to block this user? They won't be able to send you messages.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleBlockUser} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Block
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
