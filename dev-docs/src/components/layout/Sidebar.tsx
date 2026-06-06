import { FolderOpen, MessageSquare, Settings as SettingsIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { IconButton } from "@/components/ui/icon-button";

type SidebarProps = {
  activeItem?: string;
};

export function Sidebar(_props: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="flex h-full w-[var(--rail-width)] shrink-0 flex-col items-center border-r border-[var(--rail-border)] bg-[var(--rail-bg)] py-3">
      <nav className="flex flex-1 flex-col items-center gap-2">
        <IconButton
          variant="rail"
          active={location.pathname === "/chat"}
          label="Chat"
          onClick={() => navigate("/chat")}
        >
          <MessageSquare className="h-5 w-5" />
        </IconButton>
        <IconButton
          variant="rail"
          active={location.pathname === "/repos"}
          label="Repos"
          onClick={() => navigate("/repos")}
        >
          <FolderOpen className="h-5 w-5" />
        </IconButton>
        <div className="flex-1" />
        <IconButton
          variant="rail"
          active={location.pathname === "/settings"}
          label="Settings"
          onClick={() => navigate("/settings")}
        >
          <SettingsIcon className="h-5 w-5" />
        </IconButton>
      </nav>
    </aside>
  );
}
