import { useEffect, useRef } from "react";
import { Message } from "@shared/schema";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { Bot } from "lucide-react";

interface MessageAreaProps {
  messages: Message[];
  isLoading: boolean;
}

export function MessageArea({ messages, isLoading }: MessageAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {/* Welcome Message */}
      {messages.length === 0 && (
        <div className="chat-welcome">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 mx-auto">
            <Bot className="text-white text-2xl" size={24} />
          </div>
          <h2 className="text-2xl font-bold mb-2">Hello I'm Cloud</h2>
          <p className="text-white text-opacity-90 text-sm">
            Your AI Assistant
          </p>
          <p className="text-white text-opacity-75 text-xs mt-2">
            Ask Me Anything
          </p>
        </div>
      )}

      {/* Messages */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {/* Typing Indicator */}
        {isLoading && <TypingIndicator />}
      </div>

      <div ref={messagesEndRef} />
    </div>
  );
}
