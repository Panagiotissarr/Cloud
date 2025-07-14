import { Cloud, Moon, Sun, Search, Settings, User } from "lucide-react";
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
  const [showProfile, setShowProfile] = useState(false);
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const [userPronouns, setUserPronouns] = useState(localStorage.getItem('userPronouns') || '');
  const settingsRef = useRef<HTMLDivElement>(null);

  const saveProfile = () => {
    localStorage.setItem('userName', userName);
    localStorage.setItem('userPronouns', userPronouns);
    setShowProfile(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettings(false);
        setShowProfile(false);
      }
    };

    if (showSettings || showProfile) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSettings, showProfile]);

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
          
          {showSettings && !showProfile && (
            <div className="absolute right-0 top-full mt-2 bg-[var(--chat-card)] border border-[var(--chat-border)] rounded-lg p-4 shadow-lg z-10 min-w-[200px]">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-[var(--chat-subtext)]" />
                  </div>
                  <div className="relative">
                    <Switch
                      checked={webSearchEnabled}
                      onCheckedChange={onWebSearchToggle}
                      className="data-[state=checked]:bg-[var(--chat-accent)]"
                    />
                    <Search className={`absolute top-1/2 transform -translate-y-1/2 w-3 h-3 text-white pointer-events-none transition-all duration-200 ${webSearchEnabled ? 'right-1' : 'left-1'}`} />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="transition-all duration-200">
                      {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
                    </div>
                    <span className="text-sm text-[var(--chat-subtext)]">Theme</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleTheme}
                    className="hover:bg-[var(--muted)] text-[var(--chat-subtext)] px-2 transition-all duration-200"
                  >
                    <div className="flex items-center gap-1 transition-all duration-200">
                      {theme === "light" ? "Dark" : "Light"}
                    </div>
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[var(--chat-subtext)]" />
                    <span className="text-sm text-[var(--chat-subtext)]">Profile</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowProfile(true)}
                    className="hover:bg-[var(--muted)] text-[var(--chat-subtext)] px-2"
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          )}

          {showProfile && (
            <div className="absolute right-0 top-full mt-2 bg-[var(--chat-card)] border border-[var(--chat-border)] rounded-lg p-4 shadow-lg z-10 min-w-[250px]">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-3">
                  <User className="w-4 h-4 text-[var(--chat-subtext)]" />
                  <span className="text-sm font-medium text-[var(--chat-text)]">Profile Settings</span>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs text-[var(--chat-subtext)]">Name</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Your name"
                    className="w-full p-2 bg-[var(--input)] border border-[var(--chat-border)] rounded-lg text-sm text-[var(--chat-text)] placeholder:text-[var(--chat-subtext)] focus:outline-none focus:ring-2 focus:ring-[var(--chat-accent)]/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs text-[var(--chat-subtext)]">Pronouns</label>
                  <select
                    value={userPronouns}
                    onChange={(e) => setUserPronouns(e.target.value)}
                    className="w-full p-2 bg-[var(--input)] border border-[var(--chat-border)] rounded-lg text-sm text-[var(--chat-text)] focus:outline-none focus:ring-2 focus:ring-[var(--chat-accent)]/50"
                  >
                    <option value="">Select pronouns</option>
                    <option value="they/them">they/them</option>
                    <option value="she/her">she/her</option>
                    <option value="he/him">he/him</option>
                    <option value="xe/xem">xe/xem</option>
                    <option value="other">other</option>
                  </select>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowProfile(false)}
                    className="flex-1 hover:bg-[var(--muted)] text-[var(--chat-subtext)]"
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={saveProfile}
                    className="flex-1 bg-[var(--chat-accent)] hover:bg-[var(--chat-accent)]/90 text-white"
                  >
                    Save
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
