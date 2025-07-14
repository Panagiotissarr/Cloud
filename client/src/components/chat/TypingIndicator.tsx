import { Bot } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 w-full">
      <div className="w-8 h-8 bg-gradient-to-br from-[var(--chat-accent)] to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
        <Bot className="text-white text-sm" size={16} />
      </div>
      <div className="chat-card rounded-2xl rounded-tl-md p-4 max-w-xs sm:max-w-sm shadow-sm">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-[var(--chat-subtext)] rounded-full typing-dots"></div>
          <div className="w-2 h-2 bg-[var(--chat-subtext)] rounded-full typing-dots"></div>
          <div className="w-2 h-2 bg-[var(--chat-subtext)] rounded-full typing-dots"></div>
          <span className="ml-2 text-[var(--chat-subtext)] text-sm">Cloud is typing...</span>
        </div>
      </div>
    </div>
  );
}
