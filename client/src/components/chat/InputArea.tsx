import { useState, useRef, useEffect } from "react";
import { Send, Keyboard, CornerDownLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface InputAreaProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
}

export function InputArea({ onSendMessage, disabled }: InputAreaProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 128) + "px";
    }
  }, [message]);

  return (
    <div className="chat-container p-6">
      <div className="max-w-3xl mx-auto">
        <div className="chat-card p-4 shadow-lg">
          <div className="flex items-end gap-3">
            <div className="flex-1 bg-[var(--input)] rounded-2xl border border-[var(--chat-border)] focus-within:border-[var(--chat-accent)] focus-within:ring-2 focus-within:ring-[var(--chat-accent)]/20">
              <Textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
                className="w-full p-4 bg-transparent resize-none border-0 focus:ring-0 focus:outline-none placeholder:text-[var(--chat-subtext)] text-[var(--chat-text)] min-h-[60px] max-h-32"
                disabled={disabled}
              />
            </div>
            <Button
              onClick={handleSend}
              disabled={!message.trim() || disabled}
              className={cn(
                "bg-[var(--chat-accent)] hover:bg-[var(--chat-accent)]/90 text-white rounded-2xl p-4 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--chat-accent)]/50",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <Send size={18} />
            </Button>
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-4 text-xs text-[var(--chat-subtext)]">
              <span className="flex items-center gap-1">
                <Keyboard size={12} />
                Enter to send
              </span>
              <span className="flex items-center gap-1">
                <CornerDownLeft size={12} />
                Shift+Enter for new line
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[var(--chat-subtext)]">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
