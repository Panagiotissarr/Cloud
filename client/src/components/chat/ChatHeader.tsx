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
    <header className="frappe-colors bg-[var(--bg-mantle)] border-b border-[var(--bg-surface0)] px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-blue)] to-[var(--color-mauve)] rounded-xl flex items-center justify-center">
          <Cloud className="text-white text-lg" size={20} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[var(--text-main)]">Cloud</h1>
          <p className="text-sm text-[var(--text-sub1)]">AI Assistant</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-[var(--text-sub1)]" />
          <span className="text-sm text-[var(--text-sub1)]">Web Search</span>
          <Switch
            checked={webSearchEnabled}
            onCheckedChange={onWebSearchToggle}
            className="data-[state=checked]:bg-[var(--color-blue)]"
          />
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="bg-[var(--bg-surface0)] hover:bg-[var(--bg-surface1)] text-[var(--text-sub1)]"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </Button>
      </div>
    </header>
  );
}
