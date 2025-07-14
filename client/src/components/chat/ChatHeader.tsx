import { Cloud, Moon, Sun, Search } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  webSearchEnabled: boolean;
  onWebSearchToggle: (enabled: boolean) => void;
}

export function ChatHeader({ webSearchEnabled, onWebSearchToggle }: ChatHeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="chat-card border-b-0 rounded-b-none px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-[var(--chat-accent)] to-purple-500 rounded-xl flex items-center justify-center">
          <Cloud className="text-white text-lg" size={20} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[var(--chat-text)]">Cloud</h1>
          <p className="text-sm text-[var(--chat-subtext)]">AI Assistant</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-[var(--chat-subtext)]" />
          <span className="text-sm text-[var(--chat-subtext)]">Web Search</span>
          <Switch
            checked={webSearchEnabled}
            onCheckedChange={onWebSearchToggle}
            className="data-[state=checked]:bg-[var(--chat-accent)]"
          />
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="hover:bg-[var(--muted)] text-[var(--chat-subtext)]"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </Button>
      </div>
    </header>
  );
}
