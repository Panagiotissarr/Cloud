import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { MessageArea } from "@/components/chat/MessageArea";
import { InputArea } from "@/components/chat/InputArea";
import { apiRequest } from "@/lib/queryClient";
import { Message } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

interface ChatResponse {
  message: Message;
  conversationId: number;
}

export default function Chat() {
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [webSearchEnabled, setWebSearchEnabled] = useState(true);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: messages = [], isLoading: messagesLoading } = useQuery<Message[]>({
    queryKey: ["/api/conversations", conversationId, "messages"],
    enabled: !!conversationId,
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest("POST", "/api/chat", {
        message,
        conversationId,
        webSearchEnabled,
      });
      return response.json() as Promise<ChatResponse>;
    },
    onSuccess: (data) => {
      setConversationId(data.conversationId);
      queryClient.invalidateQueries({
        queryKey: ["/api/conversations", data.conversationId, "messages"],
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSendMessage = (message: string) => {
    sendMessageMutation.mutate(message);
  };

  const handleWebSearchToggle = (enabled: boolean) => {
    setWebSearchEnabled(enabled);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <ChatHeader
        webSearchEnabled={webSearchEnabled}
        onWebSearchToggle={handleWebSearchToggle}
      />
      
      <MessageArea
        messages={messages}
        isLoading={sendMessageMutation.isPending}
      />
      
      <InputArea
        onSendMessage={handleSendMessage}
        disabled={sendMessageMutation.isPending}
      />
    </div>
  );
}
