import { Cloud, Moon, Sun, Search, Settings } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";

interface ChatHeaderProps {
  webSearchEnabled: boolean;
  onWebSearchToggle: (enabled: boolean) => void;
}

export function ChatHeader({ webSearchEnabled, onWebSearchToggle }: ChatHeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [showSettings, setShowSettings] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettings(false);
      }
    };

    if (showSettings) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSettings]);

  return (
    <header className="chat-card border-b-0 rounded-b-none px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
          <Cloud className="text-white text-lg" size={20} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[var(--chat-text)]">Cloud</h1>
          <p className="text-sm text-[var(--chat-subtext)]">AI Assistant</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative" ref={settingsRef}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSettings(!showSettings)}
            className="hover:bg-[var(--muted)] text-[var(--chat-subtext)]"
          >
            <Settings size={18} />
          </Button>
          
          {showSettings && (
            <div className="absolute right-0 top-full mt-2 bg-[var(--chat-card)] border border-[var(--chat-border)] rounded-lg p-4 shadow-lg z-10 min-w-[200px]">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-[var(--chat-subtext)]" />
                    <span className="text-sm text-[var(--chat-subtext)]">Web Search</span>
                  </div>
                  <Switch
                    checked={webSearchEnabled}
                    onCheckedChange={onWebSearchToggle}
                    className="data-[state=checked]:bg-[var(--chat-accent)]"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
                    <span className="text-sm text-[var(--chat-subtext)]">Theme</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleTheme}
                    className="hover:bg-[var(--muted)] text-[var(--chat-subtext)] px-2"
                  >
                    {theme === "light" ? "Dark" : "Light"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
