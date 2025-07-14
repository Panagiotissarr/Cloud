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
        "frappe-colors flex items-start gap-3 max-w-4xl mx-auto",
        isUser && "justify-end"
      )}
    >
      {isAssistant && (
        <div className="w-8 h-8 bg-gradient-to-br from-[var(--color-blue)] to-[var(--color-mauve)] rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="text-white text-sm" size={16} />
        </div>
      )}
      
      <div
        className={cn(
          "rounded-2xl p-4 max-w-3xl",
          isUser
            ? "bg-[var(--color-blue)] text-white rounded-tr-md"
            : "bg-[var(--bg-mantle)] text-[var(--text-main)] rounded-tl-md"
        )}
      >
        {isAssistant && message.webSearchUsed && (
          <div className="flex items-center gap-2 mb-2">
            <Search className="text-[var(--color-blue)] text-sm" size={14} />
            <span className="text-xs text-[var(--text-sub1)]">Web search enabled</span>
          </div>
        )}
        
        <div className="whitespace-pre-wrap break-words">
          {message.content}
        </div>
      </div>
      
      {isUser && (
        <div className="w-8 h-8 bg-[var(--bg-surface0)] rounded-full flex items-center justify-center flex-shrink-0">
          <User className="text-[var(--text-sub1)] text-sm" size={16} />
        </div>
      )}
    </div>
  );
}
