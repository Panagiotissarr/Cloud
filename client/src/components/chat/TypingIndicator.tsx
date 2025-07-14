import { Bot } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="frappe-colors flex items-start gap-3 max-w-4xl mx-auto">
      <div className="w-8 h-8 bg-gradient-to-br from-[var(--color-blue)] to-[var(--color-mauve)] rounded-full flex items-center justify-center flex-shrink-0">
        <Bot className="text-white text-sm" size={16} />
      </div>
      <div className="bg-[var(--bg-mantle)] text-[var(--text-main)] rounded-2xl rounded-tl-md p-4">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-[var(--text-sub1)] rounded-full typing-dots"></div>
          <div className="w-2 h-2 bg-[var(--text-sub1)] rounded-full typing-dots"></div>
          <div className="w-2 h-2 bg-[var(--text-sub1)] rounded-full typing-dots"></div>
          <span className="ml-2 text-[var(--text-sub1)] text-sm">Cloud is typing...</span>
        </div>
      </div>
    </div>
  );
}
