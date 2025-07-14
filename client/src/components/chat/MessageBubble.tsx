import { Bot, User, Search } from "lucide-react";
import { Message } from "@shared/schema";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const isAssistant = message.role === "assistant";

  return (
    <div
      className={cn(
        "flex items-start gap-3 w-full",
        isUser && "justify-end"
      )}
    >
      {isAssistant && (
        <div className="w-8 h-8 bg-gradient-to-br from-[var(--chat-accent)] to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="text-white text-sm" size={16} />
        </div>
      )}
      
      <div
        className={cn(
          "rounded-2xl p-4 max-w-2xl shadow-sm",
          isUser
            ? "bg-[var(--chat-user-bg)] text-white rounded-tr-md"
            : "chat-card rounded-tl-md"
        )}
      >
        {isAssistant && message.webSearchUsed && (
          <div className="flex items-center gap-2 mb-2">
            <Search className="text-[var(--chat-accent)] text-sm" size={14} />
            <span className="text-xs text-[var(--chat-subtext)]">Web search enabled</span>
          </div>
        )}
        
        <div className="whitespace-pre-wrap break-words text-sm leading-relaxed">
          {message.content}
        </div>
      </div>
      
      {isUser && (
        <div className="w-8 h-8 bg-[var(--chat-accent)] bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="text-[var(--chat-accent)] text-sm" size={16} />
        </div>
      )}
    </div>
  );
}
