import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Send, Paperclip } from "lucide-react";
import { FileUpload } from "./FileUpload";

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  file_url?: string;
  message_type: string;
  created_at: string;
  is_read: boolean;
  sender_profile?: {
    display_name: string;
    avatar_url: string;
  };
}

interface RealtimeMessagesProps {
  receiverId: string;
  receiverName: string;
  receiverAvatar?: string;
}

export const RealtimeMessages: React.FC<RealtimeMessagesProps> = ({
  receiverId,
  receiverName,
  receiverAvatar
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;

    // Load existing messages
    loadMessages();

    // Set up realtime subscription
    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `or(and(sender_id.eq.${user.id},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${user.id}))`
        },
        (payload) => {
          console.log('New message:', payload);
          setMessages(prev => [...prev, payload.new as Message]);
          scrollToBottom();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, receiverId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    if (!user) return;

    try {
      // Simple fallback query using any type
      const response = await (supabase as any)
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${user.id},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${user.id})`)
        .order('created_at', { ascending: true });
      
      if (response.error) throw response.error;
      setMessages(response.data || []);
    } catch (error) {
      console.error('Error loading messages:', error);
      toast({
        title: "Error",
        description: "Failed to load messages",
        variant: "destructive",
      });
    }
  };

  const sendMessage = async (content: string, fileUrl?: string, messageType: string = 'text') => {
    if (!user || (!content.trim() && !fileUrl)) return;

    setLoading(true);
    try {
      const { error } = await (supabase as any)
        .from('messages')
        .insert({
          sender_id: user.id,
          receiver_id: receiverId,
          content: content.trim(),
          file_url: fileUrl,
          message_type: messageType,
        });

      if (error) throw error;
      setNewMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(newMessage);
  };

  const handleFileUpload = (url: string, fileName: string) => {
    sendMessage(fileName, url, 'file');
    setShowFileUpload(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="flex flex-col h-[600px] border rounded-lg bg-card">
      {/* Header */}
      <div className="flex items-center space-x-3 p-4 border-b">
        <Avatar>
          <AvatarImage src={receiverAvatar} />
          <AvatarFallback>{receiverName[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{receiverName}</h3>
          <p className="text-sm text-muted-foreground">Active now</p>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => {
            const isOwn = message.sender_id === user?.id;
            
            return (
              <div
                key={message.id}
                className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md`}>
                  {!isOwn && (
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={message.sender_profile?.avatar_url} />
                      <AvatarFallback className="text-xs">
                        {message.sender_profile?.display_name?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div
                    className={`
                      rounded-lg px-3 py-2 text-sm
                      ${isOwn 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                      }
                    `}
                  >
                    {message.message_type === 'file' ? (
                      <div className="space-y-1">
                        <a
                          href={message.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 underline"
                        >
                          <Paperclip className="h-4 w-4" />
                          <span>{message.content}</span>
                        </a>
                      </div>
                    ) : (
                      <p>{message.content}</p>
                    )}
                    
                    <p className="text-xs opacity-70 mt-1">
                      {formatTime(message.created_at)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div ref={messagesEndRef} />
      </ScrollArea>

      {/* File Upload */}
      {showFileUpload && (
        <div className="p-4 border-t">
          <FileUpload
            bucket="messages"
            path={user?.id}
            onUpload={handleFileUpload}
            maxSize={25}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFileUpload(false)}
            className="mt-2"
          >
            Cancel
          </Button>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex items-center space-x-2 p-4 border-t">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setShowFileUpload(!showFileUpload)}
        >
          <Paperclip className="h-4 w-4" />
        </Button>
        
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          disabled={loading}
          className="flex-1"
        />
        
        <Button type="submit" disabled={loading || !newMessage.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};