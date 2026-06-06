import { FolderOpen, MessageSquare, Settings as SettingsIcon } from "lucide-react";
import type { ComponentType } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type SidebarItem = "chat" | "repos" | "settings";

type SidebarProps = {
  activeItem?: SidebarItem;
};

type SidebarButtonProps = {
  icon: ComponentType<{ className?: string }>;
  isActive: boolean;
  label: string;
  onClick?: () => void;
};

function SidebarButton({
  icon: Icon,
  isActive,
  label,
  onClick,
}: SidebarButtonProps) {
  return (
    <button
      aria-label={label}
      className={[
        "flex h-10 w-10 items-center justify-center rounded-md transition-colors",
        "hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60",
        isActive ? "bg-accent/20 text-white" : "text-zinc-400",
      ].join(" ")}
      onClick={onClick}
      type="button"
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}

export function Sidebar(_props: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="flex h-full w-14 shrink-0 flex-col items-center border-r border-zinc-800 bg-zinc-900 py-3">
      <nav className="flex flex-1 flex-col items-center gap-2">
        <SidebarButton
          icon={MessageSquare}
          isActive={location.pathname === "/chat"}
          label="Chat"
          onClick={() => navigate("/chat")}
        />
        <SidebarButton
          icon={FolderOpen}
          isActive={location.pathname === "/repos"}
          label="Repos"
          onClick={() => navigate("/repos")}
        />
        <div className="flex-1" />
        <SidebarButton
          icon={SettingsIcon}
          isActive={location.pathname === "/settings"}
          label="Settings"
          onClick={() => navigate("/settings")}
        />
      </nav>
    </aside>
  );
}
