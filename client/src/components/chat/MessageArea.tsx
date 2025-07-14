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
    <div className="frappe-colors flex-1 overflow-y-auto p-4 space-y-4">
      {/* Welcome Message */}
      <div className="flex items-start gap-3 max-w-4xl mx-auto">
        <div className="w-8 h-8 bg-gradient-to-br from-[var(--color-blue)] to-[var(--color-mauve)] rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="text-white text-sm" size={16} />
        </div>
        <div className="bg-[var(--bg-mantle)] text-[var(--text-main)] rounded-2xl rounded-tl-md p-4 max-w-3xl">
          <p>
            Hey there! I'm Cloud, your friendly AI assistant! 🌤️ I'm here to help you with anything you need - from answering questions to having a chat. I can search the web for real-time information when needed. What would you like to talk about today?
          </p>
        </div>
      </div>

      {/* Messages */}
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}

      {/* Typing Indicator */}
      {isLoading && <TypingIndicator />}

      <div ref={messagesEndRef} />
    </div>
  );
}
